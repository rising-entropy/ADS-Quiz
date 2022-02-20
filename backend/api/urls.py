from .views import *
from django.urls import path, include

urlpatterns = [
    path('/login', LoginAPI.as_view(), name='LoginAPI'),
]