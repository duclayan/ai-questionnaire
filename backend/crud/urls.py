from django.contrib import admin
from django.urls import path
from api.views import openAIView  # Import your view

urlpatterns = [  # This is the correct variable name
    path('admin/', admin.site.urls),  # Admin path
    path('', openAIView.as_view(), name="anything"),  # Root path for ReactView
]