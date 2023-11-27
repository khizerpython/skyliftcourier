from django.shortcuts import render
from django.views.generic import View
from django.http.response import JsonResponse
from django.core import serializers
from django.urls import reverse

from my_app.models.billings import *
from my_app.forms.billings import BillingsForm , BillingsDetail, BillingsUpdateForm
import json
import datetime

class AirwayBillLocation(View):

    def get(self, request):
        # <view logic>
        user = self.request.user

        airway_bills = AirwayBill.objects.filter(user_id=user)

        context = {
            
            'airway_bills':airway_bills
        }
        return render(request,template_name='billing_locations/list.html', context=context)
    
    def post(self,request):
        data=json.loads(request.body)
        dimension = data.get('dimensions')
        invoice_details = data.get('invoice_details')
        form_validation = BillingsForm(data)
        if form_validation.is_valid():
            form_validation.cleaned_data['data'] = {'dimensions': dimension, 'invoice_details': invoice_details}
            form_validation.cleaned_data['user_id'] = self.request.user
            tracking_number = form_validation.cleaned_data.get('tracking_number')
            AirwayBill.objects.create(**form_validation.cleaned_data)
            return JsonResponse({"detail": f"Air way bill with tracking ID {tracking_number} has been initiated successfully"}, status=200)
        else:
            return JsonResponse({"detail": f"Air way bill with tracking ID {tracking_number} can not initiated","errors": dict(form_validation.errors.items()), "errors_div": "initiate_"}, status=401)
