from django.contrib import admin
from django.urls import path, include
from api.views import *  # Import your view
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)


urlpatterns = [  # This is the correct variable name
    path("admin/", admin.site.urls),  # Admin path
    path("api/", include("api.urls")),  # Root path for ReactView
]
