from django import forms
from django.contrib.auth.forms import AuthenticationForm, UsernameField
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
from django.core.validators import RegexValidator


from my_app.constants import USERNAME_REGEX
from my_app.models import regex
from django.contrib.auth import get_user_model
from my_app.models import Service,ShipmentType,AirwayBill,Payment

class BillingsForm(forms.Form):
    service_id = forms.ChoiceField(choices=[])

    # Shipper table
    shipper_company_name = forms.CharField(max_length=255, required=True)
    shipper_contact_person = forms.CharField(max_length=255, required=True)
    shipper_reference = forms.CharField(max_length=255, required=True)
    shipper_address = forms.CharField(max_length=255, required=True)
    shipper_state = forms.CharField(max_length=255, required=True)
    shipper_city = forms.CharField(max_length=255, required=True)
    shipper_post_code = forms.IntegerField(required=True)
    shipper_mobile_number = forms.IntegerField(required=True)
    shipper_phone_number = forms.IntegerField(required=True)
    shipper_ntn_cnic = forms.CharField(max_length=255, required=True)
    shipper_email_address = forms.EmailField(max_length=255, required=True)

    # Reciever table
    reciever_company_name = forms.CharField(max_length=255, required=True)
    reciever_contact_person = forms.CharField(max_length=255, required=True)
    reciever_address = forms.CharField(max_length=255, required=True)
    reciever_country = forms.CharField(max_length=255, required=True)
    reciever_state = forms.CharField(max_length=255, required=True)
    reciever_city = forms.CharField(max_length=255, required=True)
    reciever_post_code = forms.IntegerField(required=True)
    reciever_mobile_number = forms.IntegerField(required=True)
    reciever_phone_number = forms.IntegerField(required=True)
    reciever_email = forms.EmailField(max_length=255, required=True)
    reciever_fax = forms.CharField(max_length=255, required=True)

    # Shipment Details
    payment_id = forms.ChoiceField(choices=Payment.objects.all())
    shipment_id = forms.ChoiceField(choices = ShipmentType.objects.all())

    fedex_number = forms.CharField(max_length=255, required=True)
    weight = forms.IntegerField(required=True)
    pieces = forms.IntegerField(required=True)

    def __init__(self, *args, **kwargs):
        super(BillingsForm, self).__init__(*args, **kwargs)
        
        # Populate the choices dynamically from the Service model
        services = Service.objects.all()
        payments = Payment.objects.all()
        shipments = ShipmentType.objects.all()
        self.fields['service_id'].choices = [(str(service.id), str(service)) for service in services]
        self.fields['payment_id'].choices = [(str(payment.id), str(payment)) for payment in payments]
        self.fields['shipment_id'].choices = [(str(shipment.id), str(shipment)) for shipment in shipments]