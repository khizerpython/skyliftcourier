from django.db import models
from django.contrib.auth.models import AbstractBaseUser , BaseUserManager
from django.apps import apps
from my_app.models.regex import *
from my_app.models.auth import AuthUser
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

class AirwayBill(ModelUUIDField,CreatedAndUpdatedModelFields):
    service_id = models.ForeignKey(Service,on_delete=models.SET_NULL, blank=True, null=True)
    user_id = models.ForeignKey(AuthUser, on_delete=models.SET_NULL, blank=True, null=True)

    # Tracking Number
    tracking_number = models.IntegerField(blank=False, null=False, default=00000000)

    # Shipper table
    shipper_company_name = models.CharField(max_length=255, blank=False)
    shipper_contact_person = models.CharField(max_length=255, blank=False)
    shipper_reference = models.CharField(max_length=255, blank=False)
    shipper_address = models.CharField(max_length=255, blank=False)
    shipper_state = models.CharField(max_length=255, blank=False)
    shipper_city = models.CharField(max_length=255, blank=False)
    shipper_post_code = models.IntegerField(blank=False)
    shipper_mobile_number = models.IntegerField(blank=False)
    shipper_phone_number = models.IntegerField(blank=False)
    shipper_ntn_cnic = models.CharField(max_length=255, blank=False)
    shipper_email_address = models.EmailField(max_length=255, blank=False)

    # Reciever table
    reciever_company_name = models.CharField(max_length=255, blank=False)
    reciever_contact_person = models.CharField(max_length=255, blank=False)
    reciever_address = models.CharField(max_length=255, blank=False)
    reciever_country = models.CharField(max_length=255, blank=False)
    reciever_state = models.CharField(max_length=255, blank=False)
    reciever_city = models.CharField(max_length=255, blank=False)
    reciever_post_code = models.IntegerField(blank=False)
    reciever_mobile_number = models.IntegerField(blank=False)
    reciever_phone_number = models.IntegerField(blank=False)
    reciever_email = models.EmailField(max_length=255, blank=False)
    reciever_fax = models.CharField(max_length=255, blank=False)

    # Shipment Details
    payment_id = models.ForeignKey(Payment, on_delete=models.SET_NULL, blank=True,null=True)
    shipment_id = models.ForeignKey(ShipmentType, on_delete=models.SET_NULL, blank=True,null=True)

    fedex_number = models.CharField(max_length=255, blank=False)
    weight = models.IntegerField(blank=False)
    pieces = models.IntegerField(blank=False)

    # Dimensions and invoice details
    data = models.JSONField(null=True)




class AirwayBillLocation(ModelUUIDField,CreatedAndUpdatedModelFields):
    name = models.CharField(max_length=400, blank=False)
    airway_bill_id = models.ForeignKey(AirwayBill, on_delete=models.SET_NULL, blank=True, null=True, related_name='locations')