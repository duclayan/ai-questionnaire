from django.contrib import admin
from django.urls import path, include

from .views import *

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", openAIView.as_view(), name="anything"),
    path("questions/", QuestionListView.as_view(), name="questions"),
    path("submit-answers/", AnswersView.as_view(), name="submit_answers"),
]
