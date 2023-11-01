from django.db import models
from django.contrib.auth.models import AbstractBaseUser , BaseUserManager
from django.apps import apps
from my_app.models.regex import *

from my_app.models.others import ModelUUIDField, CreatedAndUpdatedModelFields,IsActive

class Service(ModelUUIDField):
    name = models.CharField(max_length=50) 

    def __str__(self) -> str:
        return str(self.name)
    
class Payment(ModelUUIDField):
    name = models.CharField(max_length=50)

    def __str__(self) -> str:
        return str(self.name)
    
class ShipmentType(ModelUUIDField):
    name = models.CharField(max_length=50)
    
    def __str__(self) -> str:
        return str(self.name)

