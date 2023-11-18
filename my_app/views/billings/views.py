from django.shortcuts import render
from django.views.generic import View
from django.http.response import JsonResponse
from django.core import serializers

from my_app.models.billings import *
from my_app.forms.billings import BillingsForm , BillingsDetail
import json
import datetime

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
            form_validation.cleaned_data['data'] = {'dimensions': dimension, 'invoice_details': invoice_details}
            tracking_number = form_validation.cleaned_data.get('tracking_number')
            AirwayBill.objects.create(**form_validation.cleaned_data)
            return JsonResponse({"detail": f"Air way bill with tracking ID {tracking_number} has been initiated successfully"}, status=200)
        else:
            print("the errors are :",form_validation.errors)
            return JsonResponse({"detail": f"Air way bill with tracking ID {tracking_number} can not initiated","errors": dict(form_validation.errors.items()), "errors_div": "initiate_"}, status=401)

class GetSpecificBillingDetails(View):

    def custom_serializer(self, obj):
        serialized_obj = serializers.serialize("python", [obj])[0]
        fields = serialized_obj['fields']
        # Convert datetime fields to string representation
        for field_name, field_value in fields.items():
            if isinstance(field_value, datetime.datetime):
                fields[field_name] = field_value.strftime('%Y-%m-%d %H:%M:%S')  # Adjust the format as needed


        fields['shipment_id'] = obj.shipment_id.name  
        fields['payment_id'] = obj.payment_id.name
        fields['service_id'] = obj.service_id.name
        return fields

    def _get(self, request, *args, **kwargs):
        data=json.loads(request.body)
        form_validation = BillingsDetail(data=data)
        if form_validation.is_valid():
            id: str = form_validation.cleaned_data.get("id")
            detail_obj_queryset = AirwayBill.objects.get(id=id)
            detail_obj_json = json.dumps(self.custom_serializer(detail_obj_queryset))

            # detail_obj_json: list = json.loads(serializers.serialize("json", [detail_obj_queryset] ))
            # workflows_dict: dict = self._merge_objects(history_obj_json, history_obj_queryset)
            return JsonResponse(detail_obj_json, status=200, safe=False)
        
        return JsonResponse(data={"detail": "Invalid data found."}, status=401)

    def post(self, request, *args, **kwargs):
        return self._get(request, *args, **kwargs)


class GetDataToUpdateSpecificBill(View):

    def _get(self, request, *args, **kwargs):
        data=json.loads(request.body)
        form_validation = BillingsDetail(data=data)
        if form_validation.is_valid():
            id: str = form_validation.cleaned_data.get("id")
            detail_obj_queryset = AirwayBill.objects.get(id=id)
            # detail_obj_json = json.dumps(self.custom_serializer(detail_obj_queryset))

            detail_obj_json: list = json.loads(serializers.serialize("json", [detail_obj_queryset] ))
            # workflows_dict: dict = self._merge_objects(history_obj_json, history_obj_queryset)
            return JsonResponse({"data": detail_obj_json}, status=200, safe=False)
        
        return JsonResponse(data={"detail": "Invalid data found."}, status=401)

    def post(self, request, *args, **kwargs):
        return self._get(request, *args, **kwargs)