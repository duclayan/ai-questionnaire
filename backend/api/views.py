from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import *
from .serializer import *
from rest_framework.views import APIView
from rest_framework import status

from openai import AzureOpenAI
from dotenv import load_dotenv
from io import BytesIO
from docx import Document
import os
import requests
from django.http import HttpResponse

from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
import logging
logger = logging.getLogger(__name__)

class UserView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        
        logger.info(f"Received login attempt for username: {username}")

        if not username or not password:
            return Response({'error': 'Please provide both username and password'}, status=400)

        # Ensure password is a string
        if isinstance(password, (list, tuple)):
            password = password[0] if password else ''
        password = str(password)

        logger.debug(f"Password type after conversion: {type(password)}")

        user = authenticate(request, username=username, password=password)
        
        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key})
        else:
            logger.warning(f"Failed login attempt for username: {username}")
            return Response({'error': 'Invalid credentials'}, status=401)

class QuestionListView(APIView):
    def get(self, request):
        current_category = request.query_params.get("currentCategory")
        if current_category and current_category != "Report":
            questions = Question.objects.filter(category=current_category)
        else:
            questions = ""

        serializer = QuestionSerializer(questions, many=True)
        return Response({"question_list": serializer.data}, status=status.HTTP_200_OK)
    def post(self, request):
        serializer = QuestionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class openAIView(APIView):
    def post(self, request):
        # Get user input
        data = request.data.get("text")
        prompt = request.data.get("prompt_strategy")
        question = request.data.get("question")
        sample = request.data.get("sample_answer")

        # Load environment variables
        load_dotenv()
        AZURE_OPENAI_ENDPOINT= os.getenv("AZURE_OPENAI_ENDPOINT")
        AZURE_OPENAI_API_KEY = os.getenv("AZURE_OPENAI_API_KEY")
        AZURE_OPENAI_DEPLOYMENT = os.getenv("AZURE_OPENAI_DEPLOYMENT")

        # Initialize the Azure OpenAI client
        client = AzureOpenAI(
            api_key=AZURE_OPENAI_API_KEY,
            api_version="2024-02-15-preview",
            base_url=f"{AZURE_OPENAI_ENDPOINT}/openai/deployments/{AZURE_OPENAI_DEPLOYMENT}",
        )

        # Create a chat completion
        response = client.chat.completions.create(
            model=AZURE_OPENAI_DEPLOYMENT,
            temperature=0.7,
            max_tokens=400,
            messages=[
                {
                    "role": "user",
                    "content": f"""
                    You are a company filling up a form to submit to a consulting agency.
                    Improve the user input that is provided and return the final text. For reference here is the information
                    question: {question}
                    prompt strategy: {prompt},
                    user input: {data},
                    sample answer: {sample}

                    Return only the answer and no explanation for the user is required. 
                    Do not return follow up questions.
                    The text format does not include bold/itallic/underline.
                     """,
                }
            ],
        )
        # Extract the generated text from the response
        generated_text = response.choices[0].message.content

        # Return a JSON response
        return Response({"generated_text": generated_text})
    def get(self, request):
        current_category = request.query_params.get("currentCategory")

        if current_category:
            questions = Question.objects.filter(category=current_category)
        else:
            questions = Question.objects.all()

        serializer = QuestionSerializer(questions, many=True)
        return Response({"question_list": serializer.data}, status=status.HTTP_200_OK)
class ProjectsView(APIView):
    # List all the projects
    def get(self, request):
        projects = Project.objects.all()
        serializer = ProjectSerializer(projects, many=True)
        return Response({"project_list": serializer.data}, status=status.HTTP_200_OK)
    
    # Create a New Project
    def post(self, request):
        serializer = ProjectSerializer(data=request.data)
        print("Serializer:", serializer)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Project created successfully", "project": serializer.data}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    # Edit an existing project
    def put(self, request):

        print(request.data)
        # try:
        #     project = Project.objects.get(pk=pk)
        # except Project.DoesNotExist:
        #     return Response({'error': 'Project not found'}, status=status.HTTP_404_NOT_FOUND)

        # serializer = ProjectSerializer(project, data=request.data)
        # if serializer.is_valid():
        #     serializer.save()
        #     return Response({"message": "Project updated successfully", "project": serializer.data}, status=status.HTTP_200_OK)
        # else:
        #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Delete a project
    def delete(self, request, pk):
        try:
            project = Project.objects.get(pk=pk)
            project.delete()
            return Response({"message": "Project deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except Project.DoesNotExist:
            return Response({'error': 'Project not found'}, status=status.HTTP_404_NOT_FOUND)
class AnswersView(APIView):
    def post(self, request):
        data = request.data
        answers_created = []

        for  answer_id, answer in data.items():
            question_id = answer['question_id']
            text = answer['input_text']
            try:
                question = Question.objects.get(question_id=question_id)
                
                answer_data = {
                "answer_id": answer_id,
                # "project": '101',
                "question": question.question_id,
                "input_answer": text,
                "category": question.category,
                }
                serializer = AnswerSerializer(data=answer_data)

                if serializer.is_valid():
                    serializer.save()
                    answers_created.append(serializer.data)
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            except Question.DoesNotExist:
                return Response({"error": f"Question with id {question_id} does not exist"}), 
        
        return Response({"message": "Answers submitted successfully", "answers": answers_created})

class GenerateReportView(APIView):
    def get(self, request):
        answers = Answer.objects.select_related('question').order_by('category', 'question__question_id')
        doc, answers_text = self.create_document_and_text(answers)
        summary = self.generate_summary(answers_text)

        return self.create_document_response(summary)
    
    def create_document_and_text(self, answers):
        doc = Document()
        doc.add_heading('Report Summary', 0)
        answers_text = ""
        current_category = None
        for answer in answers:
            if answer.category != current_category:
                answers_text += f"\n{answer.category}\n"
                doc.add_heading(answer.category, level=1)
                current_category = answer.category
            q_text = f"• {answer.question.question}: {answer.input_answer}\n"
            answers_text += q_text
            doc.add_paragraph(f"Q: {answer.question.question}", style='List Bullet')
            doc.add_paragraph(f"A: {answer.input_answer}")
        return doc, answers_text.strip()
    
    def generate_summary(self, answers_text):
        # Prepare the data for the OpenAIView
        data = {
            "text": answers_text,
            "prompt_strategy": 
            """
            Create a report based on the given information, you do not need to rewrite what is already writted but focus on the prompt points that was mentioned. The prompt points, put it as header. General information should also be mentioned only once. This should be very concise:

            Final prompting:

            Create a report with following structure:

            Management summary and mention the business function briefly and the most critical controls.

            Introduction of the business functions and general aspect description.

            Describe authentication/authorization concept.

            Describe the application architecture and its recommended controls.

            Describe controls for cloud architecture.

            Let general information such as application name, confidentiality etc. always be integrated in the following chapters.

            A further chapter for visualization of the architecture (backlog).


            """,
            "question": "Generate a Report summary",
            "sample_answer": ""
        }

        # Make a POST request to the OpenAIView
        # response = requests.post('http://localhost:8000/', json=data)
        
        # if response.status_code == 200:
        #     print("RESPONSE:", response.json()['generated_text'])
        #     return response.json()['generated_text']
        # else:
        #     return "Failed to generate summary"
        sample_response = """
        Management Summary:
        Teacher Helper – Azure OpenAI LLM is a Cloud-Based AI Application designed to assist teachers in grading and rating student exams efficiently. The most critical controls include robust encryption, access controls, regular integrity checks, and secure storage solutions to ensure confidentiality and integrity.

        Introduction:
        Teacher Helper is a confidential application due to the inclusion of pupils' grades, personal information, and exam questions. It aims to simplify the grading process for teachers by providing OCR functionality and an administrative dashboard for configuring grading criteria.

        Authentication and Authorization:
        The application employs a built-in authentication system where users receive account authentication via their email addresses. It uses a robust password-based authentication policy, requiring passwords to be at least 10 characters long, including capital letters, numbers, and symbols, and to be updated every 3 months. Account creation involves a self-registration process approved by a Principal, ensuring secure account creation and management. Role-based access control (RBAC) manages user roles (admin, principal, teacher) using cookies containing tokens validated with every request.

        Application Architecture:
        The application uses Python Django as the middle layer, ReactJS for the frontend, Azure SQL Database (MySQL, Postgres, etc.), and Azure Blob Storage for storing scanned files. Recommended controls include secure coding practices, regular security audits, and using HTTPS for data transmission.

        Controls for Cloud Architecture:
        Given the sensitive nature of the data, controls for the cloud architecture must include robust encryption for data at rest and in transit, access management, regular backups, and compliance with relevant data protection regulations.

        Visualization of the Architecture:
        A detailed visualization of the application architecture will be provided in the backlog, showcasing the interactions between the frontend, middle layer, and backend storage solutions.
        """
        return sample_response


    def create_document_response(self, gpt_response):
        doc = Document()  # Create a new Document instance

        doc.add_heading('Report Summary')
        # Split the GPT response into sections based on new lines
        sections = gpt_response.strip().split("\n\n")  # Split by double newlines for sections

        for section in sections:
            if section:  # Ensure the section is not empty
                # Split the section into lines
                lines = section.splitlines()
                if lines:
                    # The first line is treated as the heading
                    heading = lines[0].strip()
                    doc.add_heading(heading, level=1)  # Add the heading to the document
                    
                    # The rest of the lines are treated as the body text
                    body = "\n".join(line.strip() for line in lines[1:] if line.strip())
                    if body:
                        doc.add_paragraph(body)  # Add the body text below the heading

        # Save the document to a BytesIO object
        buffer = BytesIO()
        doc.save(buffer)
        buffer.seek(0)

        # Create the HTTP response with the document
        response = HttpResponse(buffer.getvalue(), content_type='application/vnd.openxmlformats-officedocument.wordprocessingml.document')
        response['Content-Disposition'] = 'attachment; filename=report_summary.docx'
        return response