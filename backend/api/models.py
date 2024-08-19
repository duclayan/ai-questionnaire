from django.db import models

# Create your models here.
class React(models.Model):
    textinput = models.CharField(max_length = 3000)
    def __str__(self):
        return self.text
    
# Model for the collection of questions
class Question(models.Model):
    question = models.CharField(max_length= 3000)
    prompt_helper = models.CharField(max_length = 3000)
