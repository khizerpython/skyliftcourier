from django.shortcuts import render
from django.views.generic import View
from my_app.models.billings import *
from my_app.forms.billings import BillingsForm
import json

class AirwayBillView(View):
    def get(self, request):
        # <view logic>
        services = Service.objects.all()
        payments = Payment.objects.all()
        shipments = ShipmentType.objects.all()

        context = {
            'services': services,
            'payments':payments,
            'shipments':shipments
        }
        return render(request,template_name='billings/list.html', context=context)
    
    def post(self,request):
        data=json.loads(request.body)
        print("the data is :",data)
        form_validation = BillingsForm(data)

        if form_validation.is_valid():
            print("yes valid")
            print(form_validation.cleaned_data)

        else:
            print("the errors are :",form_validation.errors)