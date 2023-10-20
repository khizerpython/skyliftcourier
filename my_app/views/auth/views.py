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

# class CustomLoginView(LoginView):
#     template_name="auth/login.html"
#     redirect_authenticated_user = True
    
#     def get_success_url(self):
#         print("Here") 
#         return reverse_lazy('home')
        
    
#     def form_invalid(self, form):
#         print("the form is invalid")
#         messages.error(self.request,'Invalid username or password')
#         print("the error is:", self.get_context_data(form=form))
#         return self.render_to_response(self.get_context_data(form=form))


# class CustomLoginView(LoginView):
#     template_name="auth/login.html"
#     form_class=CustomAuthenticationForm
#     extra_context = {"title": "BPM Login"}
#     redirect_authenticated_user= True # So users can't be able to access Login Page after login

    

#     def form_valid(self, form):
#         """Security check complete. Log the user in."""
#         print("@$@##@!$#@%@#%##$#$%")
#         auth_login(self.request, form.get_user())
        
#         user = form.get_user()
        
        
        
#         return HttpResponseRedirect(self.get_success_url())

class Login(View):
    def get(self, request):
        return render(request, 'auth/login.html')
    
    def post(self, request):
            print("the request.POST is :", request.POST)
            data = json.loads(request.body)
            
            print(data)
            username = data.get('username')
            password = data.get('password')
            
        
            user = authenticate(request, username=username, password=password)
            print("the userxzdfsgfd is :",user)
            if user is not None:
                print("Yes there is user")
                
                login(request, user)
                url = reverse('home')
                print("the url is :",url)
                url = reverse('home')
                # return redirect('home')
                # return HttpResponseRedirect(redirect_to=url)
                return JsonResponse({"Status":"Success","Redirect":url})
            else:
                error_message = "Invalid username or password."
                print(error_message)
                return JsonResponse({"Status":"Failure","Message":"Invalid Username or Password!"},)
            
            