from django.contrib import admin
from django.urls import path,include
from django.views.generic import RedirectView
from api.views import *  # Import your view

admin.site.site_title = "Blanco GPT Admin"
admin.site.site_header = "Blanco GPT Administration"
admin.site.index_title = "Welcome to Blanco GPT Admin"

urlpatterns = [
    path('', RedirectView.as_view(url='/admin/', permanent=False)),  # Redirect root to admin
    path('admin/', admin.site.urls),  # Admin path
    path('api/', include('api.urls')),  # API paths
]