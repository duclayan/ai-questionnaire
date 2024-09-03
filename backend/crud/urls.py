from django.contrib import admin
from django.urls import path,include
from api.views import *  # Import your view

urlpatterns = [  # This is the correct variable name
    path("admin/", admin.site.urls),  # Admin path
    path("", include('api.urls')),  # Root path for ReactView
]
