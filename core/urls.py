from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('register/', views.register_view, name='register'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('diagnose/', views.diagnose, name='diagnose'),
    path('garages/', views.garages, name='garages'),
    path('api/garages/', views.garages_api, name='garages_api'),
    path('history/', views.history, name='history'),
    path('about/', views.about, name='about'),
]