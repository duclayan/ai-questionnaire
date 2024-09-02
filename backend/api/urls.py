# api/urls.py

from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

from .views import *
# from projects.views import ProjectViewSet  # Import the new ProjectViewSet

urlpatterns = [
    path("", openAIView.as_view(), name="anything"),
    path("questions/", QuestionListView.as_view(), name="questions"),
    path("submit-answers/", AnswersView.as_view(), name="submit_answers"),
    path("generate-report/", GenerateReportView.as_view(), name="generate_report"),
    path("login/", UserView.as_view(), name="users"),
    
    path('projects/', ProjectView.as_view(), name='project-list'),
    path('projects/<int:pk>/', ProjectView.as_view(), name='project-detail'),
    # Authentication
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("token/verify/", TokenVerifyView.as_view(), name="token_verify"),
]