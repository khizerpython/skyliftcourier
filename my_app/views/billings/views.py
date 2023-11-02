from django.shortcuts import render
from django.views.generic import View
from my_app.models.billings import *

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