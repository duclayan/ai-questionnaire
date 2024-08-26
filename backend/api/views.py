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
import os


class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer


class openAIView(APIView):
    def post(self, request):
        # Get user input
        data = request.data.get("text")
        prompt = request.data.get("prompt_strategy")
        question = request.data.get("question")
        sample = request.data.get("sample_answer")

        # Load environment variables
        load_dotenv()
        azure_oai_endpoint = os.getenv("AZURE_OAI_ENDPOINT")
        azure_oai_key = os.getenv("AZURE_OAI_KEY")
        azure_oai_deployment = os.getenv("AZURE_OAI_DEPLOYMENT")

        # Initialize the Azure OpenAI client
        client = AzureOpenAI(
            api_key=azure_oai_key,
            api_version="2024-02-15-preview",
            base_url=f"{azure_oai_endpoint}/openai/deployments/{azure_oai_deployment}",
        )

        # Create a chat completion
        response = client.chat.completions.create(
            model=azure_oai_deployment,
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


class QuestionListView(APIView):
    def get(self, request):
        current_category = request.query_params.get("currentCategory")

        if current_category:
            questions = Question.objects.filter(category=current_category)
        else:
            questions = Question.objects.all()

        serializer = QuestionSerializer(questions, many=True)
        return Response({"question_list": serializer.data}, status=status.HTTP_200_OK)


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
