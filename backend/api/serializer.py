from rest_framework import serializers
from .models import *

class ReactSerializer(serializers.ModelSerializer):
    class Meta:
        model = React
        fields = ['textinput']

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'
