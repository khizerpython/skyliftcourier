from django.urls import path, include
from my_app import urls
from my_app import views


urlpatterns = [
    path('', views.HomeView.as_view(), name='home'),
    path('aboutus/', views.AboutUsView.as_view(), name='aboutus'),
    path('contactus/', views.ContactUsView.as_view(), name='contactus'),
    path('ourservices/', views.OurServicesView.as_view(), name='ourservices'),
    path('ourtrackrecord/', views.OurTrackRecordView.as_view(), name='ourtrackrecord'),
]