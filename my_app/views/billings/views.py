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
        dimension = data.get('dimensions')
        invoice_details = data.get('invoice_details')
        
        form_validation = BillingsForm(data)

        if form_validation.is_valid():
            print("yes valid")
            form_validation.cleaned_data['data'] = {'dimensions': dimension, 'invoice_details': invoice_details}
            print(form_validation.cleaned_data)
            service_id = form_validation.cleaned_data.get('service_id')
            shipper_company_name = form_validation.cleaned_data.get('shipper_company_name')

            print("the service id is :", service_id)

        else:
            print("the errors are :",form_validation.errors)