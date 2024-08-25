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
    # to unlock when a specific project is connected to a question
    # project = models.ForeignKey(Project, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    input_answer = models.TextField()
    # temporary to see the category of each question easily
    # can later be cleaned to have access from questions to confirm category
    category = models.CharField(max_length=100, default="General Information")

    def __str__(self):
        return self.input_answer
