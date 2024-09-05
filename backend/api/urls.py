from django.contrib import admin
from django.urls import path, include

from .views import *

urlpatterns = [
    path("", openAIView.as_view(), name="anything"),
    path("questions/", QuestionListView.as_view(), name="questions"),
    path("submit-answers/", AnswersView.as_view(), name="submit_answers"),
    path("generate-report/", GenerateReportView.as_view(), name="generate_report"),
    path("projects/", ProjectsView.as_view(), name="projects"),

    path("login/", UserView.as_view(), name="users"),
]
