from django.shortcuts import render
from django.views import View
from my_app.models import *
from django.core.exceptions import ObjectDoesNotExist

# Create your views here.

class HomeView(View):
    def get(self, request):
        return render(request,template_name='home.html')

class LocationView(View):
    def post(self,request):
            try:
                airway_bill_instance = AirwayBill.objects.get(tracking_number=request.POST.get('tracking_number'))
                location = airway_bill_instance.locations.all().order_by('-created_at')
                context = {
                    "obj":airway_bill_instance,
                    "locations":location
                }
                return render(request,template_name='locations.html',context=context)
            except ObjectDoesNotExist:
             context = {
                    "not_found":"Invalid Tracking Id",
                }
             return render(request,template_name='locations.html',context=context)

            
class AboutUsView(View):

    def get(self, request):
        return render(request,template_name='aboutus.html')
    

class ContactUsView(View):

    def get(self, request):
        return render(request,template_name='contactus.html')
    

class OurServicesView(View):

    def get(self, request):
        return render(request,template_name='ourservices.html')


class OurTrackRecordView(View):

    def get(self, request):
        return render(request,template_name='ourtrackrecord.html')
