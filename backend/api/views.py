from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

from . models import *
from . serializer import *
from rest_framework.views import APIView

# @api_view(['POST'])
# def autocorrect_text(request):
#     text = request.data.get('text', '')
#     # Implement your RAG logic here
#     corrected_text = text  # Replace with actual autocorrect logic
#     return Response({'corrected_text': corrected_text})

class ReactView(APIView):
    def get(self,request):
        output = [{"textInput": output.textInput} for output in React.objects.all()]
        return Response(output)
    
    def post(self,request):
        serializer = ReactSerializer(data = request.data)
        if serializer.is_valid(raise_exception = True):
            serializer.save()
            return Response(serializer.data)
