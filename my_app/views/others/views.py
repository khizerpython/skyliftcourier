from django.shortcuts import render
from django.views import View
import json
from my_app.models import *

from django.http import JsonResponse
from django.core.exceptions import ObjectDoesNotExist
from django.core import serializers

# Create your views here.

# def home(request):
#     return render(request,template_name="home.html")

class HomeView(View):
    def get(self, request):
        # <view logic>
        return render(request,template_name='home.html')
    
    def post(self,request):
        obj = json.loads(request.body)
        try:
            airway_bill_instance  = AirwayBill.objects.get(tracking_number=obj.get('tracking_number'))
            locations= airway_bill_instance.locations.all()
            json_obj = json.loads(serializers.serialize("json", locations ))
            return JsonResponse(data=json_obj, status=200, safe=False)
        except ObjectDoesNotExist:
             return JsonResponse({'message': 'AirwayBill not found for the given tracking number'})    
        

            
class AboutUsView(View):

    def get(self, request):
        # <view logic>
        return render(request,template_name='aboutus.html')
    

class ContactUsView(View):

    def get(self, request):
        # <view logic>
        return render(request,template_name='contactus.html')
    

class OurServicesView(View):

    def get(self, request):
        # <view logic>
        return render(request,template_name='ourservices.html')


class OurTrackRecordView(View):

    def get(self, request):
        # <view logic>
        return render(request,template_name='ourtrackrecord.html')
