from django.db import models


class Project(models.Model):
    project_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    owner = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Question(models.Model):
    question_id = models.AutoField(primary_key=True)
    category = models.CharField(max_length=100, default="General Information")
    question = models.TextField()
    prompt = models.TextField()
    sample_answer = models.TextField()

    def __str__(self):
        return self.question


class Answer(models.Model):
    answer_id = models.AutoField(primary_key=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    input_answer = models.TextField()
    corrected_answer = models.TextField()

    def __str__(self):
        return self.corrected_answer
