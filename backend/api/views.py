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
import json 
from rest_framework.parsers import MultiPartParser
from django.shortcuts import get_object_or_404
import os
from django.conf import settings
logger = logging.getLogger(__name__)
class MockRequest:
    def __init__(self, data):
        self.data = data
from rest_framework.parsers import MultiPartParser, FormParser
import os
import docx
from PyPDF2 import PdfReader
from django.conf import settings
from django.db import IntegrityError
from django.http import Http404

from langchain_community.document_loaders import UnstructuredFileLoader
from langchain.text_splitter import CharacterTextSplitter
# from langchain_community.embeddings import AzureOpenAIEmbeddings
# from langchain_community.vectorstores import FAISS
# from langchain_community.chains import RetrievalQA

from langchain_openai import AzureOpenAIEmbeddings, AzureChatOpenAI
import bs4
from langchain import hub
from langchain_chroma import Chroma
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain.chains import RetrievalQA

from langchain_community.document_loaders import PyPDFLoader
class DocumentGenerator:
    def create_document_response(self, gpt_response):
        doc = Document()

        doc.add_heading('Report Summary', level=0)  # Main heading
        
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
                    if heading.startswith("### "):
                        heading = heading[4:].strip()  # Remove '### ' prefix
                        if (heading == 'Counter Measure'):
                            doc.add_heading(heading, level=3)  
                        else:
                            doc.add_heading(heading, level=1)  
                    else:
                        body = "\n".join(line.strip() for line in lines if line.strip())
                        if body:
                            doc.add_paragraph(body)  # Add the body text below the heading

        # Add Architecture Diagram
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
        file_name = 'diagram.png'
        try:
            # Assuming your diagram is saved as 'diagram.png' in MEDIA_ROOT
            file_path = os.path.join(default_storage.location, file_name)
            if os.path.exists(file_path):
                # Add picture to document with specified width
                # Adjust the width as needed (e.g., 6.0 inches)
                doc.add_heading("Architecture Diagram", level=1)  
                doc.add_picture(file_path, width=Inches(6.0))  # Set width to 6 inches
                default_storage.delete(file_name)
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
        if current_category == 'all':
            questions = Question.objects.all()
        elif current_category and current_category != "Report":
            questions = Question.objects.filter(category=current_category)
        else:
            questions = Question.objects.none()

        serializer = QuestionSerializer(questions, many=True)
        return Response({"question_list": serializer.data}, status=status.HTTP_200_OK)
    def post(self, request):
        serializer = QuestionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class openAICleanVersion(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request):
        # Get user input
        data = request.data.get("text")
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
          messages=[{ 
                        "role": "user",
                        "content": f"""
                          {data}
                        """,
                    }]
        )
        # Extract the generated text from the response
        generated_text = response.choices[0].message.content

        # Return a JSON response
        return Response({"generated_text": generated_text})
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
            temperature=0.9,
            max_tokens=2000,
          messages=[
                    {
                        "role": "user",
                        "content": f"""
                            For reference, here is the relevant information:
                            Question: {question}
                            Prompt Strategy: {prompt}
                            ---
                            Enhance the provided content while preserving all original information. Improve the text as needed without omitting any details from the initial input. Present only the refined answer in plain text format, 
                            without explanations, questions, formatting, bullet points, headings, or special symbols. Translate all text and diagram contents to the specified language. If unable to follow these instructions, respond 
                            with "We need more information."
                            ---
                            User Input: {data if isinstance(data, str) else data['input_answer']}
                            Translate text to {language}
                            ---
                            Strictly do not include the language, question and prompt strategy in the return answer.
                            If 
                            ---
                            Refine the answer so the following texts are not included in the return text:
                             - {question}
                             - {prompt}
                             - translate {language}
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
        print("Edit an existing project")

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
                Each section header should be formatted as H1 (e.g., ### General Information).
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

                ----
                On each section header measure add a detailed Counter Measure. 
                Countermeasure should include reason and how it should be implemented in deep detail.
                This subsection starts with a header 'Counter Measure' written as H1 (e.g., ### General Information).
                Write in bullet points with 4 lines each.
                ---
                Create a Counter Measure Template with the following specifications:

                1. Include a minimum of 100 words per countermeasure point.
                2. Only include sections where information is available.
                3. Format the response as follows:

                ### Counter Measure

                    1. [Title of first countermeasure]
                        [Detailed explanation of the first countermeasure, including its purpose, implementation, and benefits to security. Ensure this explanation is at least 100 words long.]

                    2. [Title of second countermeasure]
                        [Detailed explanation of the second countermeasure, including its purpose, implementation, and benefits to security. Ensure this explanation is at least 100 words long.]

                    3. [Title of third countermeasure]
                        [Detailed explanation of the third countermeasure, including its purpose, implementation, and benefits to security. Ensure this explanation is at least 100 words long.]"

                Ensure that each countermeasure explanation:
                - Clearly states the purpose of the measure
                - Explains how it enhances security
                - Describes its implementation or application
                - Mentions any potential benefits or improvements to overall system security

                Use a tone that is informative and technical, suitable for a professional cybersecurity context. Number each countermeasure and maintain the given format structure.
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
class ProcessDocumentView(APIView):
    permission_classes = [AllowAny]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        file = request.FILES.get('file')
        question = request.data.get('question')
        if not file:
            return Response({'error': 'No file uploaded'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Create a temporary file
            with tempfile.NamedTemporaryFile(delete=False) as temp_file:
                for chunk in file.chunks():
                    temp_file.write(chunk)
                temp_file_path = temp_file.name

            # Read the file content based on its type
            file_extension = os.path.splitext(file.name)[1].lower()
            if file_extension == '.docx':
                doc = docx.Document(temp_file_path)
                text = '\n'.join([paragraph.text for paragraph in doc.paragraphs])
            elif file_extension == '.pdf':
                with open(temp_file_path, 'rb') as pdf_file:
                    pdf_reader = PyPDF2.PdfReader(pdf_file)
                    text = '\n'.join([page.extract_text() for page in pdf_reader.pages])
            else:  # Assume it's a text file
                with open(temp_file_path, 'r', encoding='utf-8') as f:
                    text = f.read()

            # Create a mock request with the data
            prompt_text = {"text": f"Answer the question: '{question}' according to the following information: {text} --- If the question is not in the data, return ''"}

            mock_request = MockRequest(prompt_text)
            azure_open_ai = openAICleanVersion()
            # Process the text with Azure OpenAI
            result = azure_open_ai.post(mock_request)

            if result.status_code == 200:
                return result
            else:
                return Response({'error': 'Failed to generate summary'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        finally:
            # Delete the temporary file
            if os.path.exists(temp_file_path):
                os.unlink(temp_file_path)

    def put(self, request):
        data = json.loads(request.body)
        ref_answers = data.get('ref_answers')
        project_id = data.get('project_id')
        fill_all = data.get('fill_all', False)

        # Validate input
        if not isinstance(ref_answers, list):
            return Response({"error": "ref_answers must be a list"}, status=status.HTTP_400_BAD_REQUEST)

        project = get_object_or_404(Project, project_id=project_id)
        updated_answer_ids = []

        for ref in ref_answers:
            try:
                question = Question.objects.get(question_id=ref['question_id'])
                try:
                    answer = Answer.objects.create(
                        answer_id =  f"{project_id}-{question.question_id}",
                        question=question,
                        project_id=project,
                        input_answer=ref['ref_answer']
                    )
                except IntegrityError:
                    # Handle the duplicate case, e.g., by updating the existing answer
                    answer = Answer.objects.get(answer_id = f"{project_id}-{question.question_id}")

                isNotEmpty = True if ref.get('ref_answer', '').strip() != '' else False

                if (fill_all or not answer.input_answer) and isNotEmpty:
                    answer.input_answer = ref['ref_answer'].strip()
                    answer.save(update_fields=['input_answer'])
                    updated_answer_ids.append(answer)
                else:
                    if(len(answer.input_answer) < 1):   
                        answer.input_answer = ref['ref_answer'].strip()
                        answer.save(update_fields=['input_answer'])
                        updated_answer_ids.append(answer)
                    else:
                        updated_answer_ids.append(answer)

            except Question.DoesNotExist:
                print(f"Question with id {ref['question_id']} does not exist")
            except KeyError as e:
                print(f"Missing key in ref: {e}")
            serialized_answers = AnswerSerializer(updated_answer_ids, many=True)
            updated_answers_dict = {}
            for answer in serialized_answers.data:
                question_id = answer['question']  # Assuming 'question' field contains the question_id
                updated_answers_dict[question_id] = answer

        return Response({
            "message": "Answers updated successfully",
            "updated_answers": updated_answers_dict
        }, status=status.HTTP_200_OK)
class DocumentView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        documents = RagDocument.objects.all()
        serializer = RagDocumentSerializer(documents, many=True)
        return Response(serializer.data)

    def post(self, request):
        file = request.FILES.get('file')
        if not file:
            return Response({'error': 'No file provided'}, status=status.HTTP_400_BAD_REQUEST)
        document = RagDocument.objects.create(file=file)
        document.save()
        # document = RagDocument.objects.create(file=file)
        
        # serializer = RagDocumentSerializer(data={'file': file})
        # if serializer.is_valid():
        #     document = serializer.save()

        #     # Process the uploaded file using LangChain
        #     loader = UnstructuredFileLoader(document.file.path)
        #     documents = loader.load()

        #     # Split the document into chunks
        #     text_splitter = CharacterTextSplitter(
        #         chunk_size=1000, chunk_overlap=200, add_start_index=True
        #     )
        #     texts = text_splitter.split_documents(documents)

        #     # Create embeddings and store in vector database
        #     embeddings = AzureOpenAIEmbeddings(
        #         azure_deployment=os.getenv(
        #             "RAG_AZURE_OPENAI_EMBEDDING_DEPLOYMENT_NAME"
        #         ),
        #         openai_api_version=os.getenv("RAG_API_VERSION"),
        #     )
        #     vectorstore = Chroma.from_documents(documents=texts, embedding=embeddings)

        #     # Save the vectorstore (you might want to implement a more robust storage solution)
        #     # document.vectorstore = vectorstore  # Uncomment if you have a field for this
        #     # document.save()  # Uncomment if you save the vectorstore in the document

        #     retriever = vectorstore.as_retriever(
        #         search_type="similarity", search_kwargs={"k": 6}
        #     )
        #     document.vectorstore = vectorstore
        #     document.save()

        #     return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_201_CREATED)
        # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class DocumentDetailView(APIView):
    permission_classes = [AllowAny]

    def get_object(self, pk):
        try:
            return RagDocument.objects.get(pk=pk)
        except RagDocument.DoesNotExist:
            raise Http404("Document not found")

    def get(self, request, pk):
        document = self.get_object(pk)
        serializer = RagDocumentSerializer(document)
        return Response(serializer.data)

    def put(self, request, pk):
        document = self.get_object(pk)
        serializer = RagDocumentSerializer(document, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        document = self.get_object(pk)
        document.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
class QuestionView(APIView):
    permission_classes = [AllowAny]
    def extract_text_from_pdf(pdf_file):
        reader = PdfReader(pdf_file)
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
        return text


    def post(self, request):
        question = request.data.get("question")
        document_id = request.data.get("document_id")
        text = ""

        load_dotenv()
        import io
        try:
            document = RagDocument.objects.get(pk=document_id)
            pdf_file = f"media/{document.file}"
            reader = PdfReader(pdf_file)

            for page in reader.pages:
                text += page.extract_text() + "\n"

        except RagDocument.DoesNotExist:
            return Response(
                {"error": "Document not found"}, status=status.HTTP_404_NOT_FOUND
            )

        llm = AzureChatOpenAI(
            azure_endpoint=os.getenv("RAG_AZURE_OPENAI_ENDPOINT"),
            openai_api_version=os.getenv("RAG_API_VERSION"),
            deployment_name=os.getenv("RAG_AZURE_OPENAI_CHAT_DEPLOYMENT_NAME"),
            openai_api_key=os.getenv("RAG_AZURE_OPENAI_API_KEY"),
            openai_api_type=os.getenv("RAG_OPEN_API_TYPE"),
        )

        prompt = hub.pull("rlm/rag-prompt")

        def format_docs(docs):
            return "\n\n".join(doc.page_content for doc in docs)

        from langchain_text_splitters import RecursiveCharacterTextSplitter

        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000, chunk_overlap=200, add_start_index=True
        )
        all_splits = text_splitter.split_text(text)

        # Initialize Azure OpenAI embeddings
        embeddings = AzureOpenAIEmbeddings(
            deployment=os.getenv("RAG_AZURE_OPENAI_EMBEDDING_DEPLOYMENT_NAME"),
            model=os.getenv("RAG_AZURE_OPENAI_EMBEDDING_MODEL"),
            openai_api_version= os.getenv("RAG_API_VERSION"),
            api_key= os.getenv("RAG_AZURE_OPENAI_API_KEY"),
            azure_endpoint= os.getenv("RAG_AZURE_OPENAI_ENDPOINT")
        )

        vectorstore = Chroma.from_texts(texts=all_splits, embedding=embeddings)
        # vectorstore = Chroma.from_documents(texts=splits, embedding=embeddings)
        retriever = vectorstore.as_retriever(
            search_type="similarity", search_kwargs={"k": 6}
        )

        rag_chain = (
            {"context": retriever | format_docs, "question": RunnablePassthrough()}
            | prompt
            | llm
            | StrOutputParser()
        )

        answer_collection = []
        for chunk in rag_chain.stream(question):
            answer_collection += chunk
            # print(chunk, end="", flush=True)
        result = "".join(answer_collection)
        print(result)
        return Response({"answer": result})