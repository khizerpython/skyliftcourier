from django.urls import path, include
# from my_app import urls
from my_app.views.auth import views


urlpatterns = [
    path("", views.CustomLoginView.as_view(), name="login_url"),
]