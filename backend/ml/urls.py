from django.urls import path
from . import views

urlpatterns = [
    path('predict/', views.ModelPredictAPI.as_view(), name = 'predict'),
    path('statistics/', views.StatisticsAPI.as_view(), name = 'statistics'),
    path('image/', views.ImageAPI.as_view(), name = 'image'),
]