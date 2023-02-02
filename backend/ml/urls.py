from django.urls import path
from . import views

urlpatterns = [
    path('predict/', views.ModelPredictAPI.as_view(), name = 'predict'),
]