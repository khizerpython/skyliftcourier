from django.urls import path, include

from my_app.views.others import views


urlpatterns = [
    path('', views.HomeView.as_view(), name='home'),
    path('location/', views.LocationView.as_view(), name='location_page'),
    path('aboutus/', views.AboutUsView.as_view(), name='aboutus'),
    path('contactus/', views.ContactUsView.as_view(), name='contactus'),
    path('ourservices/', views.OurServicesView.as_view(), name='ourservices'),
    path('ourtrackrecord/', views.OurTrackRecordView.as_view(), name='ourtrackrecord'),
    path('login/', include('my_app.views.auth.urls')),
]