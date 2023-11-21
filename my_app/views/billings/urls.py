from django.urls import path, include

from my_app.views.billings import views


urlpatterns = [
    path('billings/', views.AirwayBillView.as_view(), name='airway_bill'),
    path('update/billings/', views.UpdateAirwayBillView.as_view(), name='update_airway_bill'),
    path('billings_details/', views.GetSpecificBillingDetails.as_view(), name='airway_bill_detail'),
    path('billings/update', views.GetDataToUpdateSpecificBill.as_view(), name='get_specific_bill_to_update'),
    
]