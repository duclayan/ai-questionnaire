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

from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

import logging
logger = logging.getLogger(__name__)
class MockRequest:
    def __init__(self, data):
        self.data = data

class DocumentGenerator:
    def create_document_response(self, gpt_response):
        doc = Document()

        doc.add_heading('Report Summary', level=1)  # Main heading

        # Split the GPT response into sections based on new lines
        sections = gpt_response.strip().split("\n\n")  # Split by double newlines for sections

        for section in sections:
            if section:  
                # Ensure the section is not empty
                # Split the section into lines
                lines = section.splitlines()
                if lines:
                    # The first line is treated as the heading
                    heading = lines[0].strip()
                    if heading.startswith("## "):
                        heading = heading[3:].strip()
                    # Add the heading to the document
                    doc.add_heading(heading, level=2)  
                    
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
class UserView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=400)

        username = serializer.validated_data['username']
        password = serializer.validated_data['password']
        
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
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
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
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request):
        # Get user input
        data = request.data.get("text")
        language = request.data.get("language")
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
                    Improve the user input that is provided and return the final text. 
                    Strictly No information from the user input should be lost, sample answer is just used as a reference. 

                    Make sure all the data is retained including numbers that has been mentioned. 
                    
                    Return only the answer and no explanation for the user is required. 
                    Do not return follow up questions.
                    The text format does not include bold/itallic/underline.

                    Translate the whole text to {language}

                    For reference here is the information
                    question: {question}
                    prompt strategy: {prompt},
                    user input: {data}
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
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    # List all the projects
    def get(self, request):
        print("Request User:", request.user)
        try:
            projects = Project.objects.filter(owner=request.user.id)
            serializer = ProjectSerializer(projects, many=True)
            return Response({"project_list": serializer.data}, status=status.HTTP_200_OK)
        except Project.DoesNotExist:
            return Response({'error': 'Project not found'}, status=status.HTTP_404_NOT_FOUND)
    
    # Create a New Project
    def post(self, request):
        # Create a copy of request.data and add the current user
        print("USERNAME", request.user)
        data = request.data.copy()  # Make a mutable copy of request.data
        data['owner'] = request.user.id  # Add the current user's ID
        data['owner_name'] = request.user.username
        
        serializer = ProjectSerializer(data=data)  # Pass modified data to serializer

        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Project created successfully", "project": serializer.data}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    # Edit an existing project
    def put(self, request):

        print(request.data)

    # Delete a project
    def delete(self, request, pk):
        data = request.data
        pk = pk
        try:
            project = Project.objects.get(pk=pk)
            project.delete()
            return Response({"message": "Project deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except Project.DoesNotExist:
            return Response({'error': 'Project not found'}, status=status.HTTP_404_NOT_FOUND)
class AnswersView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        id = request.query_params.get("project_id")
        queryset = Answer.objects.all()
        print("Current Question ID", id)
        if id:
            answers = Answer.objects.filter(project_id=id)
            # print(f"For project {id} we have the following answrs: {answers}")
        else:
            answers = ""

        serializer = AnswerSerializer(answers, many=True)
        print("serialized answer", serializer.data)
        return Response({"answer_list": serializer.data}, status=status.HTTP_200_OK)
    def post(self, request):
        data = request.data
        answers_created = []

        for  answer_id, answer in data.items():
            question_id = answer['question']
            project_id = answer['project_id']
            text = answer['input_answer']

            try:
                question = Question.objects.get(question_id=question_id)
                
                # Check if the answer already exists
                existing_answer = Answer.objects.filter(project_id=project_id, question=question).first()

                if existing_answer:
                    # Update the existing answer
                    existing_answer.input_answer = text
                    existing_answer.save()
                    answers_created.append(AnswerSerializer(existing_answer).data)
                else:
                    # Create a new answer
                    answer_data = {
                        "answer_id": f"{project_id}-{question_id}",
                        "project_id": project_id,
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
                return Response({"error": f"Question with id {question_id} does not exist"}, status=status.HTTP_404_NOT_FOUND)

        return Response({"message": "Answers submitted successfully", "answers": answers_created}, status=status.HTTP_201_CREATED)
class GenerateReportView(APIView):
    def get(self, request):
        language = request.query_params.get("language")
        project_id = request.query_params.get("project_id")
        project_answers = Answer.objects.filter(project_id=project_id)
        answers = project_answers.select_related('question').order_by('category', 'question__question_id')
        # doc, answers_text = self.create_document_and_text(answers)
        answers_text = self.create_document_and_text(answers)

        gpt_response = self.generate_summary(answers_text, language)
        message = gpt_response.data.get("generated_text")
            # Create an instance of the DocumentGenerator
        generator = DocumentGenerator()
        
        # Simulate the response (in a Django view, you would return this response)
        response = generator.create_document_response(message)
        
        return response
    
    def create_document_and_text(self, answers):
        answers_text = ""
        current_category = None
        for answer in answers:
            if answer.category != current_category:
                answers_text += f"\n{answer.category}\n"
                current_category = answer.category
            q_text = f"• {answer.question}: {answer.input_answer}\n"
            answers_text += q_text
           
        return answers_text
    
    def generate_summary(self, answers_text, language):
        # Prepare the data for the OpenAIView
        data = {
            "text": answers_text,
            "language": language,
            "prompt_strategy": 
            """
            Create a concise report with the following structure:
            Name of the Application : [insert name here]
            ## Management Summary
            Briefly mention the business function and critical controls.

            ## Introduction
            Describe the business functions and general aspects.

            ## Authentication/Authorization
            Describe the authentication/authorization concept.

            ## Application Architecture
            Describe the application architecture and recommended controls.

            ## Cloud Architecture Controls
            Describe controls for the cloud architecture.

            ## Architecture Visualization (Backlog)
            Visualize the architecture.

            Note: Integrate general information (application name, confidentiality, etc.) throughout the report.

            """,
            "question": "Generate a Report summary",
            "sample_answer": ""
        }

        # Create a mock request with the data
        mock_request = MockRequest(data)

        # Create an instance of openAIView
        open_ai_view = openAIView()

        # Call the post method of openAIView with the mock request
        response = open_ai_view.post(mock_request)
        
        if response.status_code == 200:
            print("RESPONSE:", response)

            return response
        else:
            return "Failed to generate summary"