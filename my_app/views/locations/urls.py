from django.urls import path, include

from my_app.views.locations import views


urlpatterns = [
    path('billings_location/', views.AirwayBillLocationView.as_view(), name='airway_bill_locations'),
    path('billings_location/details/', views.AirwayBillLocationDetailsView.as_view(), name='airway_bill_locations_details'),
    path('billings_location/delete/', views.AirwayBillLocationDeleteView.as_view(), name='delete_airway_bill_locations'),
    # path('update/billings/', views.UpdateAirwayBillView.as_view(), name='update_airway_bill'),
    # path('billings_details/', views.GetSpecificBillingDetails.as_view(), name='airway_bill_detail'),
    # path('billings/update', views.GetDataToUpdateSpecificBill.as_view(), name='get_specific_bill_to_update'),
    #  path("list/json/", views.ListOfAirwayBillsJsonFormat.as_view(), name="list_airway_bills_json"),
    
]