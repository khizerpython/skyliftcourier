from django.urls import path, include

from my_app.views.billings import views


urlpatterns = [
    path('billings/', views.AirwayBillView.as_view(), name='airway_bill'),
    
]