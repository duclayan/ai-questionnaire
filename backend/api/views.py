from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import *
from .serializer import *
from rest_framework.views import APIView

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
                    Improve the text that is provided and return the final text. For reference here is the information
                    question: {question}
                    prompt strategy: {prompt},
                    user input: {data}

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
