from django.urls import path
# from .views import autocorrect_text

# urlpatterns = [
#     path('', autocorrect_text, name='autocorrect_text'),
# ]

# from .views import *

url = [
    path('admin/', admin.site.urls)
    path('', ReactView.as_view(), name = "anything")
]