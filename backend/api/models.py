from django.db import models
from django.contrib.auth.models import User
from captcha.models import CaptchaStore as BaseCaptchaStore

class Project(models.Model):
    project_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    owner_name = models.CharField(max_length=200)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    def __str__(self):
        return self.name

class TestModel(models.Model):
    name = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    owner = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class CaptchaStore(BaseCaptchaStore):
    class Meta:
        app_label = 'api'
class Question(models.Model):
    question_id = models.AutoField(primary_key=True)
    category = models.CharField(max_length=100, default="General Information")
    question = models.TextField()
    prompt = models.TextField()
    sample_answer = models.TextField()

    def __str__(self):
        return self.question


class Answer(models.Model):
    answer_id = models.CharField(max_length=255, primary_key=True, default="0-0") 
    # project = models.ForeignKey(Project, on_delete=models.CASCADE)
    question= models.ForeignKey(Question, on_delete=models.CASCADE, default=0)
    project_id = models.ForeignKey(Project, on_delete=models.CASCADE, default=0)
    input_answer = models.TextField()
    # temporary to see the category of each question easily
    # can later be cleaned to have access from questions to confirm category
    category = models.CharField(max_length=100, default="General Information")

    ## TO CHANGE
    def save(self, *args, **kwargs):
        if not self.answer_id:  # Only set if answer_id is not provided
            self.answer_id = Answer.objects.count() + 1  # Simple way to generate a unique ID
        super().save(*args, **kwargs)
    def __str__(self):
        return self.input_answer
class Report(models.Model):
    report = models.TextField()
    def __str__(self):
        return self.report
