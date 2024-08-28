from django.contrib import admin
from django.urls import path, include

from .views import *

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", openAIView.as_view(), name="anything"),
    path('projects/', ProjectView.as_view(), name='project-list'),  # For listing and creating projects
    path('projects/<int:project_id>/', ProjectDetailView.as_view(), name='project-detail'),  # For retrieving and deleting a specific project
    path("questions/", QuestionListView.as_view(), name="questions"),
    path("submit-answers/", AnswersView.as_view(), name="submit_answers"),
    path("generate-report/", GenerateReportView.as_view(), name="generate_report"),
]
