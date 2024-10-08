from django.contrib import admin
from django.urls import path,include
from django.views.generic import RedirectView
from api.views import *  # Import your view

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

admin.site.site_title = "Cloud AI Security Admin"
admin.site.site_header = "Cloud AI Security Administration"
admin.site.index_title = "Welcome to Cloud AI Security Admin"

urlpatterns = [
    path('', RedirectView.as_view(url='/admin/', permanent=False)),  # Redirect root to admin
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  
    path('admin/', admin.site.urls),  # Admin path
    path('api/', include('api.urls')),  # API paths
]