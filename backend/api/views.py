from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

from . models import *
from . serializer import *
from rest_framework.views import APIView

from openai import AzureOpenAI


# @api_view(['POST'])
# def autocorrect_text(request):
#     text = request.data.get('text', '')
#     # Implement your RAG logic here
#     corrected_text = text  # Replace with actual autocorrect logic
#     return Response({'corrected_text': corrected_text})

class ReactView(APIView):
    def get(self,request):
        output = [{"textinput": output.textinput} for output in React.objects.all()]
        return Response(output)
    
    def post(self,request):
        serializer = ReactSerializer(data = request.data)
        if serializer.is_valid(raise_exception = True):
            serializer.save()
            return Response(serializer.data)

class openAIView(APIView):
    def post(self,request):
        data = request.data
            # Initialize the Azure OpenAI client
        client = AzureOpenAI(
            azure_endpoint = azure_oai_endpoint, 
            api_key=azure_oai_key,  
            api_version="2024-02-15-preview"
        )
        system_message = 
        """

        """

        # Add code to send request...
        # Send request to Azure OpenAI model
        response = client.chat.completions.create(
            model=azure_oai_deployment,
            temperature=0.7,
            max_tokens=400,
            messages=[
                {"role": "system", "content": system_message},
                {"role": "user", "content": input_text}
            ]
        )

        generated_text = response.choices[0].message.content

        # Print the response
        print("Response: " + generated_text + "\n")

        return generated_text