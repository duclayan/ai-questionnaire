from django.contrib import admin
from django.urls import path, include

from .views import *

urlpatterns = [
    path("", openAIView.as_view(), name="anything"),
    path("gpt4o/", openAICleanVersion.as_view(), name="gpt4o"),
    path("gpt-omini/", openAICleanVersion_O1MINI.as_view(), name="gptomini"),
    path("questions/", QuestionListView.as_view(), name="questions"),
    path("process-document/", ProcessDocumentView.as_view(), name="process_document"),
    path("submit-answers/", AnswersView.as_view(), name="submit_answers"),
    path("generate-report/", GenerateReportView.as_view(), name="generate_report"),
    path("projects/", ProjectsView.as_view(), name="projects"),
    path('projects/<int:pk>/', ProjectsView.as_view(), name='project-detail'), 
    path("login/", UserView.as_view(), name="users"),
    path("save-diagram/", SaveDiagram.as_view(), name='save_diagram'),
]
