from django.contrib import admin
from django.urls import path
from api.views import ReactView  # Import your view

urlpatterns = [  # This is the correct variable name
    path('admin/', admin.site.urls),  # Admin path
    path('', ReactView.as_view(), name="anything"),  # Root path for ReactView
]