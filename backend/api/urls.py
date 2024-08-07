from django.urls import path
from .views import autocorrect_text

urlpatterns = [
    path('', autocorrect_text, name='autocorrect_text'),
]