from django.shortcuts import render
from django.views.generic import View
from django.http.response import JsonResponse

from my_app.models.billings import *
from my_app.forms.billings import BillingsForm
import json
class AirwayBillView(View):
    def get(self, request):
        # <view logic>
        services = Service.objects.all()
        payments = Payment.objects.all()
        shipments = ShipmentType.objects.all()
        airway_bills = AirwayBill.objects.all()

        context = {
            'services': services,
            'payments':payments,
            'shipments':shipments,
            'airway_bills':airway_bills
        }
        return render(request,template_name='billings/list.html', context=context)
    
    def post(self,request):
        data=json.loads(request.body)
        dimension = data.get('dimensions')
        invoice_details = data.get('invoice_details')
        
        form_validation = BillingsForm(data)

        if form_validation.is_valid():
            # print("yes valid")
            form_validation.cleaned_data['data'] = {'dimensions': dimension, 'invoice_details': invoice_details}
            # print(form_validation.cleaned_data)
            tracking_number = form_validation.cleaned_data.get('tracking_number')
            # shipper_company_name = form_validation.cleaned_data.get('shipper_company_name')
            AirwayBill.objects.create(**form_validation.cleaned_data)
            return JsonResponse({"detail": f"Air way bill with tracking ID {tracking_number} has been initiated successfully"}, status=200)

            # print("the service id is :", service_id)

        else:
            print("the errors are :",form_validation.errors)