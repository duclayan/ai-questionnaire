from django.db import models

# Create your models here.
class React(models.Model):
    textinput = models.CharField(max_length = 30)