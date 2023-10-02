from django.contrib.auth import get_user_model, backends
from django.db.models import Q



from my_app import constants

import os



class CustomAuthUserBackend(backends.BaseBackend):
    """  Authenticate User with Contact OR Email """
    USER_MODEL = get_user_model()

  

    def authenticate(self, request, **kwargs):
        username = kwargs.get("username")
        password = kwargs.get("password")

        try:
            user = self.USER_MODEL.objects.get(Q(username=username)) # Getting user
        except self.USER_MODEL.DoesNotExist:
            return None
        # if user.is_lock: # Return user if lock, forms/auth.py is responsible for error display on frontend 
        #     return user

        is_pass_valid: bool = user.check_password(password) # Check password

        if not is_pass_valid:
            # if not user.is_lock:
            #     return user
            return None
        
        return user
    
    def get_user(self, user_id):
        try:
            return self.USER_MODEL.objects.get(pk=user_id)
        except self.USER_MODEL.DoesNotExist:
            return None