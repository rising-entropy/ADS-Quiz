from rest_framework.views import APIView
from django.contrib.auth import authenticate, login, logout, update_session_auth_hash
from django.contrib.auth import login
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.core import serializers
from rest_framework.response import Response
from django.contrib.auth.models import User, Group
import jwt
from .models import *
import json
from datetime import datetime, timedelta
import pytz
from django.http import HttpResponse, HttpResponseRedirect
utc=pytz.UTC
# Create your views here.


class LoginAPI(APIView):

    def post(self, request):
        JWT_SECRET = 'HarryMaguire'
        JWT_ALGORITHM = 'HS256'
        # JWT_EXP_DELTA_SECONDS = 2628000
        JWT_EXP_DELTA_SECONDS = 2628000
        username = request.data['username']
        password = request.data['password']
        user = authenticate(username=username, password=password)
        role = ""
        if user.groups.filter(name = 'student').exists():
            role = 'student'
        elif user.groups.filter(name = 'teacher').exists():
            role = 'teacher'
        if user is not None:
            payload = {
                'exp': datetime.utcnow() + timedelta(seconds=JWT_EXP_DELTA_SECONDS),
                'fName': user.first_name,
                'lName': user.last_name,
                'username': username,
                'role': role
            }
            
            jwt_token = jwt.encode(payload, JWT_SECRET, JWT_ALGORITHM)
            
            return Response({"status": "200 OK", "username": username, "token": jwt_token})
        else:
            return Response({"status": "400 Bad Request", "message": "Invalid Password/Username"})
