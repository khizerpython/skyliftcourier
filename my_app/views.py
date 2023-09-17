from django.shortcuts import render
from django.views import View
from django.views.generic import ListView

# Create your views here.

# def home(request):
#     return render(request,template_name="home.html")

class HomeView(View):
    def get(self, request):
        # <view logic>
        return render(request,template_name='home.html')
