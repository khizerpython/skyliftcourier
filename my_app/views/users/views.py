# Create your views here.

from django.views.generic import ListView
from django.views import View
from django.http import JsonResponse
from django.core import serializers
from django.core.exceptions import ValidationError
from django.db.models.query import QuerySet
from django.urls import reverse
from django.template.loader import render_to_string
from django.core import mail 
from django.utils import timezone
from django.contrib.auth import get_user_model
from django.contrib.sessions.models import Session
from django.shortcuts import render
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from django.contrib.sites.shortcuts import get_current_site
from django.contrib.auth.views import PasswordResetConfirmView
from django.views.generic import View
from django.contrib.auth.hashers import check_password

from my_app.models import AuthUser
from my_app.forms.auth import CreateAuthUserForm
from django.contrib.auth.hashers import make_password


import os
import json
from inspect import currentframe, getframeinfo
from datetime import datetime
import traceback
import sys

import random
import string

INTERNAL_RESET_SESSION_TOKEN = "_password_reset_token"
frameinfo = getframeinfo(currentframe())
User = get_user_model()

def send_manually_exception_email(request, e):
    """
    Send Error Mails When an Exception Occur
    """
    exc_type, _, exc_tb = sys.exc_info()
    exc_type.__name__ == 'NameError'
    fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
    error_details = traceback.format_exc()
    user=request.user.id
    path = request.path
    now = datetime.now()
    dt_string = now.strftime("%d/%m/%Y %H:%M:%S")
    context= {
        'user':user,
        'path':path,
        'filename':fname,
        'errors':error_details,
        'date':dt_string,
        'type':exc_type.__name__

    }
    html_body = render_to_string("default/email_error.html", context,request=request)
    
    mail.mail_admins(subject = "bug report",message = "message body",fail_silently=True,html_message=html_body)


class ListAuthUserView(ListView):
    template_name :str = 'users/list.html'
    model = AuthUser
    _page_title: str = "User"
    ordering: tuple = ("-created_at", )

    def _get_extra_context(self) -> dict:
        
        extra_context: dict = {
        
        }
        return extra_context
    def get_queryset(self):
        qs = super().get_queryset()
        return qs
        # user= self.request.user
        # username = user.username
        # return qs.filter(is_admin=False,is_superuser=False).exclude(is_active=False,is_lock=False).exclude(username=username)

    def render_to_response(self, context, **response_kwargs):
        """
        Return a response, using the `response_class` for this view, with a
        template rendered with the given context.

        Pass response_kwargs to the constructor of the response class.
        """ 
        

        extra_context: dict = self._get_extra_context()
        context.update({'page_title':self._page_title})
        context.update(extra_context)
        return super().render_to_response(context, **response_kwargs)


class CreateAuthUser(View):

    token_generator = default_token_generator


    def post(self, request, *args, **kwargs):
        data = self.request.body
        json_data = json.loads(data)
        form_validation =  CreateAuthUserForm(data=json_data)

        if form_validation.is_valid():
            first_name= form_validation.cleaned_data['first_name']
            last_name= form_validation.cleaned_data['last_name']
            username= form_validation.cleaned_data['username']
            email= form_validation.cleaned_data['email']
            contact_number= form_validation.cleaned_data['contact_number']
            password = make_password(form_validation.cleaned_data['password'])
            user = AuthUser(first_name=first_name, last_name=last_name, username=username, email=email ,contact_number=contact_number,password=password)
            user.save()
            

            return JsonResponse({"detail": f"AuthUser '{username}' has been created successfully"}, status=200)
        
        return JsonResponse(data={"detail": "Unable to create AuthUser", "errors": dict(form_validation.errors.items()), "errors_div": "create_"}, status=400)
       
 