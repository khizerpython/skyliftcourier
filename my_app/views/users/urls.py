from django.urls import path, reverse_lazy

from my_app.views.users import views


urlpatterns = [   
    path('list/',views.ListAuthUserView.as_view(),name='authuser_list'),
    path('authuser_list/',views.CreateAuthUser.as_view(),name='authuser'),
   
]