from django.shortcuts import render
from rest_framework.generics import GenericAPIView
from .serializers import *
from django.http.response import JsonResponse
from rest_framework import status,permissions
from .model_call import model_predict

# Create your views here.

class ModelPredictAPI(GenericAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = ModelPredictSerializer

    def post(self, request):
        data = request.data
        pred = model_predict(data)
        return JsonResponse({'rent':list(pred)[0]}, status= status.HTTP_200_OK)