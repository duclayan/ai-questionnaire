from django.contrib import admin
from django.urls import path,include
from api.views import *  # Import your view

admin.site.site_title = "Blanco GPT Admin"
admin.site.site_header = "Blanco GPT Administration"
admin.site.index_title = "Welcome to Blanco GPT Admin"

urlpatterns = [  # This is the correct variable name
    path("/", admin.site.urls),  # Admin path
    path("api/", include('api.urls')),  # Root path for ReactView
]
