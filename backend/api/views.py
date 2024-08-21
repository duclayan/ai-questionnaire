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


# @api_view(['POST'])
# def autocorrect_text(request):
#     text = request.data.get('text', '')
#     # Implement your RAG logic here
#     corrected_text = text  # Replace with actual autocorrect logic
#     return Response({'corrected_text': corrected_text})


class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer


class ReactView(APIView):
    def get(self, request):
        output = [{"textinput": output.textinput} for output in React.objects.all()]
        return Response(output)

    def post(self, request):
        serializer = ReactSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


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

    # For the Summary upon submission
    # def submit_answers(request):
    #     if request.method == 'POST':
    #         data = request.data
    #         # Process the answers and generate summary
    #         summary = generate_summary(data)  # Implement this function as needed
    #         return Response({"summary": summary})
