from django.contrib.auth.views import LoginView, LogoutView
from django.contrib.auth import login as auth_login
from django.http.response import HttpResponseRedirect
from django.urls import reverse_lazy
from my_app.forms.auth import CustomAuthenticationForm
from django.contrib import messages



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


class CustomLoginView(LoginView):
    template_name="auth/login.html"
    form_class=CustomAuthenticationForm
    extra_context = {"title": "BPM Login"}
    redirect_authenticated_user= True # So users can't be able to access Login Page after login

    

    def form_valid(self, form):
        """Security check complete. Log the user in."""
        print("@$@##@!$#@%@#%##$#$%")
        auth_login(self.request, form.get_user())
        
        user = form.get_user()
        
        
        self._insert_event(user)
        return HttpResponseRedirect(self.get_success_url())