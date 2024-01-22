from django.db import models
from django.contrib.auth.models import AbstractBaseUser , BaseUserManager
from django.apps import apps
from my_app.models.regex import *

from my_app.models.others import ModelUUIDField, CreatedAndUpdatedModelFields,IsActive

class CustomAuthUserManager(BaseUserManager):
    

    contact_number  = models.IntegerField(max_length=255)
    def create_user(self  ,first_name , last_name, username , email , contact_number ,password = None, **extra_fields):
        if not first_name:
            raise ValueError("User Must Have a first name")

        if not last_name:
            raise ValueError("User Must Have a last name")

        if not username:
            raise ValueError("User Must Have a username")
        if not email:
            raise ValueError("User Must Have a email") 
        if not contact_number:
            raise ValueError("User Must Have a contact number")       
        
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)

        # Lookup the real model class from the global app registry so this
        # manager method can be used in migrations. This is fine because
        # managers are by definition working on the real model.
        GlobalUserModel = apps.get_model(
            self.model._meta.app_label, self.model._meta.object_name
        )
        username = GlobalUserModel.normalize_username(username)
        user = self.model(first_name=first_name, last_name=last_name, username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user


    def create_superuser(self , first_name, last_name, username , password = None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_admin", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")
        user = self.create_user(
            first_name = first_name,
            last_name = last_name,
            username = username,
            password = password,
            **extra_fields
        )
        user.save(using = self._db)
        return user

class AuthUser(AbstractBaseUser, ModelUUIDField, CreatedAndUpdatedModelFields,IsActive):
    first_name = models.CharField(max_length=250, validators=[first_name_regex])
    last_name = models.CharField(max_length=250,validators=[last_name_regex])
    username = models.CharField(max_length=200 , unique=True, validators=[username_regex]) 
    email = models.EmailField(max_length=255, unique=False)
    contact_number = models.CharField(max_length=255)
    
    is_lock = models.BooleanField(default=False)
    is_first_login = models.BooleanField(default=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default = False)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ('first_name','last_name' ,'email' ,'contact_number' ,'password')

    objects = CustomAuthUserManager()

    def __str__(self):
        return self.username