from django.contrib import admin
from django.urls import path, include
from django.conf.urls import *
from api.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('', include('api.urls'))
    path ('',ReactView.as_view(), name = "anything")
]