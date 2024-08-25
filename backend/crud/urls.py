from django.contrib import admin
from django.urls import path
from api.views import *  # Import your view

urlpatterns = [  # This is the correct variable name
    path("admin/", admin.site.urls),  # Admin path
    path("", openAIView.as_view(), name="anything"),  # Root path for ReactView
    path("questions/", QuestionListView.as_view(), name="questions"),
    path("submit-answers/", AnswersView.as_view(), name="submit_answers"),
]
