from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import *
from .serializer import *
from rest_framework.views import APIView
from rest_framework import status
from docx.shared import Inches
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

from rest_framework import status
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
import base64
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
                        ####### Add the diagram here
                        # Get the image name for the current project_id and category
                        # self.add_diagram_to_document(doc,image_name)

                    # Add the heading to the document
                    doc.add_heading(heading, level=2)  
                    
                    # The rest of the lines are treated as the body text
                    body = "\n".join(line.strip() for line in lines[1:] if line.strip())
                    if body:
                        doc.add_paragraph(body)  # Add the body text below the heading

        # Add the saved diagram image to the document
        self.add_diagram_to_document(doc)

        # Save the document to a BytesIO object
        buffer = BytesIO()
        doc.save(buffer)
        buffer.seek(0)

        # Create the HTTP response with the document
        response = HttpResponse(buffer.getvalue(), content_type='application/vnd.openxmlformats-officedocument.wordprocessingml.document')
        response['Content-Disposition'] = 'attachment; filename=report_summary.docx'
        return response
    def add_diagram_to_document(self, doc):
        """Add saved diagram image to Word document."""
        try:
            # Assuming your diagram is saved as 'diagram.png' in MEDIA_ROOT
            file_path = os.path.join(default_storage.location, 'diagram.png')
            if os.path.exists(file_path):
                print("Diagram Exists")
                # Add picture to document with specified width
                # Adjust the width as needed (e.g., 6.0 inches)
                doc.add_picture(file_path, width=Inches(6.0))  # Set width to 6 inches
            else:
                print("Diagram image not found.")
        except Exception as e:
            print(f"Error adding diagram to document: {e}")
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
                            Please enhance the user input provided while ensuring that all original information is preserved. The final answer should reflect any necessary improvements without losing any details from the user input.
                            Return only the revised answer without any explanations or follow-up questions. The text format should not include bold, italic, or underline.
                            For reference, here is the relevant information:
                            Question: {question}
                            Prompt Strategy: {prompt}
                            User Input: {data}
                        """,
                    }
                ]
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
        try:
            projects = Project.objects.filter(owner=request.user.id)
            serializer = ProjectSerializer(projects, many=True)
            return Response({"project_list": serializer.data}, status=status.HTTP_200_OK)
        except Project.DoesNotExist:
            return Response({'error': 'Project not found'}, status=status.HTTP_404_NOT_FOUND)
    
    # Create a New Project
    def post(self, request):
        # Create a copy of request.data and add the current user
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
        if id:
            answers = Answer.objects.filter(project_id=id)
        else:
            answers = ""

        serializer = AnswerSerializer(answers, many=True)
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
            Create a 5 page report with the following structure:

            ### Name of the Application: [insert name here]

            ## Management Summary
            - Provide an overview of the business functions supported by the application.
            - Highlight critical controls in place to ensure security and compliance.

            ## Introduction
            - Describe the key business functions the application serves.
            - Discuss general aspects, including target audience and market relevance.

            ## Authentication/Authorization
            - Explain the concepts of authentication and authorization as they pertain to the application.
            - Detail the methods used for user verification and access control.

            ## Application Architecture
            - Outline the application's architecture, including its components and interactions.
            - Recommend controls that should be implemented to enhance security and performance.

            ## Cloud Architecture Controls
            - Discuss specific controls relevant to cloud architecture, including data protection measures and compliance standards.

            ## Architecture Visualization (Backlog)
            - Provide a visual representation of the application architecture, illustrating key components and their relationships.

            ## General Information
            - Integrate relevant general information throughout the report, such as:
                - Application name
                - Confidentiality requirements
                - Regulatory compliance considerations

            Ensure that each section is well-organized and clearly communicates the necessary information for a comprehensive risk advisory report.
            Each section should have atleast 5 sentences
            """,
            "question": "Generate a Report",
            "sample_answer": ""
        }

        # Create a mock request with the data
        mock_request = MockRequest(data)

        # Create an instance of openAIView
        open_ai_view = openAIView()

        # Call the post method of openAIView with the mock request
        response = open_ai_view.post(mock_request)
        
        if response.status_code == 200:
            return response
        else:
            return "Failed to generate summary"
        

class SaveDiagram(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        # Retrieve the diagram data from the request
        diagram_data = request.data.get('diagram', None)
        diagram_name = request.data.get('diagramName')

        if not diagram_data:
            return Response({"error": "No diagram data provided."}, status=status.HTTP_400_BAD_REQUEST)

        # Check if the diagram data is in base64 format for PNG
        if diagram_data.startswith("data:image/png;base64,"):
            # Remove the prefix to get only the base64 string
            diagram_data = diagram_data.replace("data:image/png;base64,", "")
        else:
            return Response({"error": "Invalid image format. Expected PNG."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Decode the base64 string
            image_data = base64.b64decode(diagram_data)
            file_name = f"{diagram_name}.png"
            file_path = default_storage.path(file_name)  # Get full path of the file

            # Check if the file already exists and delete it
            if default_storage.exists(file_name):
                default_storage.delete(file_name)

            # Save the new image
            path = default_storage.save(file_name, ContentFile(image_data))

            return Response({"message": "Diagram saved successfully.", "path": path}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)