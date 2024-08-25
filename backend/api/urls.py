from django.contrib import admin
from django.urls import path, include

from .views import *  # Make sure to import your view

urlpatterns = [  # Corrected the variable name to urlpatterns
    path("admin/", admin.site.urls),  # Added a comma at the end of this line
    path("", openAIView.as_view(), name="anything"),
    path("questions/", QuestionListView.as_view(), name="questions"),
    path("submit-answers/", AnswersView.as_view(), name="submit_answers"),
]
