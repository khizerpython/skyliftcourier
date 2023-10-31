from django.urls import path, include
from django.contrib.auth.views import LogoutView
# from my_app import urls
from my_app.views.auth import views


urlpatterns = [
    path("", views.Login.as_view(), name="login_url"),
    path("logout/", views.LogoutView.as_view(), name="logout_url")
]