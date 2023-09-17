from django.urls import path, include
from my_app import urls
from my_app import views


urlpatterns = [
    path('', views.HomeView.as_view(), name='home'),
]