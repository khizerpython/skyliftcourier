from django.contrib.auth.views import LoginView, LogoutView
from django.contrib.auth import login as auth_login
from django.http.response import HttpResponseRedirect 
from django.urls import reverse_lazy
from my_app.forms.auth import CustomAuthenticationForm
from django.contrib import messages
from django.views.generic import View
from django.shortcuts import render , redirect
import json
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.urls import reverse
from my_app.auth_backends.custom_auth_backend import CustomAuthUserBackend



import os


class Login(View):
    def get(self, request):
        return render(request, 'auth/login.html')
    
    def post(self, request):
            data = json.loads(request.body)
            
            username = data.get('username')
            password = data.get('password')
            
        
            user = authenticate(request, username=username, password=password)
            if user is not None:
                
                login(request, user)
                url = reverse('home')
               
                return JsonResponse({"Status":"Success","Redirect":url})
            else:
                error_message = "Invalid username or password."
                return JsonResponse({"Status":"Failure","Message":"Invalid Username or Password!"},)
            

          
            
            