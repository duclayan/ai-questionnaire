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

        doc.add_heading('Report Summary', level=0)  # Main heading
        
        # Split the GPT response into sections based on new lines
        sections = gpt_response.strip().split("\n\n")  # Split by double newlines for sections

        for section in sections:
            if section:  
                print("Processing this section", section)
                # Ensure the section is not empty
                # Split the section into lines
                lines = section.splitlines()
                if lines:
                    # The first line is treated as the heading
                    heading = lines[0].strip()
                    if heading.startswith("### "):
                        heading = heading[4:].strip()  # Remove '### ' prefix
                        doc.add_heading(heading, level=1)  
                    else:
                        body = "\n".join(line.strip() for line in lines if line.strip())
                        if body:
                            doc.add_paragraph(body)  # Add the body text below the heading

        # Add Architecture Diagram
        doc.add_heading("Architecture Diagram", level=1)  

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
        print("This is the Data", data)
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
            temperature=0.9,
            max_tokens=2000,
          messages=[
                    {
                        "role": "user",
                        "content": f"""
                            Please enhance the user input provided while ensuring that all original information is preserved. The final answer should reflect any necessary improvements without losing any details from the user input.
                            Return only the revised answer without any explanations or follow-up questions. The text format should not include bold, italic, or underline.
                            For reference, here is the relevant information:
                            Question: {question}
                            Prompt Strategy: {prompt}

                            Change the language of texts and diagram contents to {language}
                            If can not follow the given instructions, respond with "We need more information"

                            Do not include any bullet points, headings, or special symbols. Just give me the information in plain text.
                            ---

                            User Input: {data if isinstance(data, str) else data['input_answer']}

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
        # Check if data is a dictionary and not empty
        if isinstance(data, dict) and data:
            answers_created = []  
            for id, answer in data.items():                
                question_id = answer.get('question')
                project_id = answer.get('project_id')
                text = answer.get('input_answer')

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
        
        return Response({"error": "Invalid data format."}, status=status.HTTP_400_BAD_REQUEST)
class GenerateReportView(APIView):
    def get(self, request):
        # language = request.query_params.get("language")
        # project_id = request.query_params.get("project_id")
        # project_answers = Answer.objects.filter(project_id=project_id)
        # answers = project_answers.select_related('question').order_by('category', 'question__question_id')
        # # doc, answers_text = self.create_document_and_text(answers)
        # answers_text = self.create_document_and_text(answers)

        # gpt_response = self.generate_summary(answers_text, language)
        # message = gpt_response.data.get("generated_text")
        #     # Create an instance of the DocumentGenerator
        generator = DocumentGenerator()
        
        message = """
        ### General Information

        Name of application: Pop Star Cafe

        Contact Person: John Doe

        The main business purpose of the application is to provide a platform for the school's teachers to manage and upload educational materials. It ensures compliance with specific regional regulations, such as GDPR in the EU, and mandates data storage within respective countries for regions like China and Russia. The application serves teachers in Germany, with regional requirements necessitating adherence to local data protection laws.

        This confidential application includes pupils' grades, personal information, and exam questions. The confidentiality of these records must be preserved to protect pupils' academic histories. The integrity of the system is crucial to prevent tampering with exam props and results. Though not highly critical in terms of availability, the sensitive personal data within the application requires stringent encryption, access control, regular integrity checks, and secure storage solutions to maintain confidentiality and integrity.

        The application is a self-developed project, individually coded based on the unique requirements of the teachers from the specified school organization.

        ### Authentication and Authorization Concept

        The application utilizes a built-in authentication system, with users receiving account authentication via their email addresses. The authentication mechanism includes password-based authentication and multi-factor authentication (MFA). The account creation and management processes are secured through strong password policies, encryption, strict access controls, regular security audits, secure account recovery processes, and effective logging and monitoring. Measures like CAPTCHA, email verification, approval workflows, activity alerts, 
        and IP whitelisting prevent unauthorized account creation or modification.

        Role-based access control (RBAC) is used to manage different user roles such as admin, principal, and teacher. Cookies containing tokens are used to manage and validate user roles with each request, ensuring proper authorization and access control. User credentials are stored in a hashed and salted form using the Bcrypt function. Currently, there are no protective measures for password assessment, such as account suspension policies or CAPTCHA mechanisms.

        Session tokens are handled with great care to ensure secure session management. Best practices include using secure cookies, the HttpOnly and SameSite attributes, token expiry and regeneration, minimal cookie content, encryption, and server-side token validation.

        ### Application Design

        The main technology used for the application includes Python Django as the middle layer, ReactJS for the frontend, Azure SQL Database for data storage, and Azure Blob Storage for storing scanned files. The frontend is built with JavaScript, creating a single-page application that serves as a dashboard for teachers. This dashboard includes login and logout functionality, enabling teachers to upload materials easily.

        The middle layer uses an Apache Web Server to deploy a Python Django web application. This application handles all requests from the frontend, manages workflows, interacts with various services such as Azure OpenAI and OCR, and accesses the database and blob storage.

        The backend utilizes Azure Database services, employing various countermeasures to ensure security:

        1. SQL Injection Prevention: Use parameterized queries and stored procedures. Regularly update and patch database management systems.
        2. Access Control: Implement strict access controls using Azure's role-based access control (RBAC).
        3. Encryption: Utilize Azure's built-in encryption at rest and in transit.
        4. Audit Logging: Enable auditing and use Azure Monitor and Azure Security Center to respond to suspicious activities.
        5. Firewall Configuration: Limit access to trusted IP addresses.
        6. Regular Backups: Perform regular automated backups and test backup restoration procedures.
        7. Input Validation: Validate all input data on the server side.
        8. Compliance: Ensure compliance with relevant data protection regulations.
        9. Security Updates: Apply regular patches and updates.
        10. OWASP Top 10: Regularly review and address the OWASP Top 10 security risks.

        The system follows a 3-tier architecture consisting of a static layer, a middle layer, and a backend layer. Libraries and dependencies are used for authentication, security validation, and workflow management.

        ### Cloud Architecture

        The application leverages Azure as the cloud provider, utilizing various cloud resources:

        - Azure Functions: Implement network restrictions, use managed identities, enable authentication and authorization, enforce HTTPS, and apply RBAC.
        - Application Gateway: Enable Web Application Firewall (WAF), configure SSL/TLS termination, restrict access using Network Security Groups (NSGs), and enable diagnostic logging.    
        - Firewall: Configure application and network rules, enable threat intelligence-based filtering, monitor and log, and apply strict access control.
        - Database: Enable encryption at rest and in transit, use automatic backups, implement Advanced Threat Protection, enforce strong authentication, and regularly update and patch.    
        - Blob Storage: Enable encryption at rest, use private endpoints, enforce access policies, enable logging and monitoring, and configure data retention policies.
        - Azure Kubernetes Service: Implement network policies, managed identities, RBAC, pod security policies, and use Azure Policy.
        - Azure OpenAI Service: Enable network security, use managed identities, apply strict access control, monitor usage, and ensure encryption.
        - Azure AI Computer Vision: Restrict access using NSGs, enable authentication and authorization, monitor and log access, and enforce data encryption.

        There are no connections between the cloud resources and the company’s on-premises environment, with a preference for a fully cloud-based solution. Access to the web application is 
        direct from the internet.

        The current cloud governance model, managed by the school's IT Department, includes regular audits, clear policies and procedures, automated compliance checks, and ongoing staff training.
        """
        # Simulate the response (in a Django view, you would return this response)
        response = generator.create_document_response(message)
        
        return response
    
    def create_document_and_text(self, answers):
        answers_text = ""
        current_category = None
        for answer in answers:
            print(f"Category:{answer.category} // Answer: {answer.input_answer}")
            if answer.category != current_category:
                answers_text += f"\n Section Category: {answer.category}\n"
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
                You are a consultant tasked with creating a comprehensive Risk Advisory Report for your client based on their company data. The report should be professional, detailed, and structured to analyze the provided information without including the specific questions asked of the client.
                Utilize the information from the sections outlined in the "User Input" to craft a cohesive report. The report should:
                - Analyze the Data: Discuss key insights derived from the information provided.
                - Provide Actionable Recommendations: Offer practical steps based on your analysis.
                - Maintain Clarity and Engagement: Use clear and engaging language throughout.
                - Incorporate Visual Aids: Include tables or charts where appropriate to enhance understanding.
                - Ensure Cohesion: Create a narrative that connects insights to practical implications for the client.
                
                ### Formatting Instructions
                Each section header should be formatted as H3 (e.g., ### General Information).
                All other text should be presented in plain text without additional formatting (e.g., no bold or bullet points).
                Strictly follow this order in your final response, only including sections present in the "User Input":
                1. General Information
                2. Authentication and Authorization Concept
                3. Application Design
                4. Cloud Architecture
                5. Architecture Diagram (do not include user input for this section)
                Refer to the "user input" for specific details to include in each section, ensuring that your final report presents a comprehensive overview of the client's risk management strategies and practices. 
                Produce a final report format rather than a simple Q&A structure. Output should be in paragraph forms with proper sections.
                Split sections by double new lines.

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