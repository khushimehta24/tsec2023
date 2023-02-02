from django.shortcuts import render
from rest_framework.generics import GenericAPIView
from .serializers import *
from django.http.response import JsonResponse
from rest_framework import status,permissions
from .model_call import model_predict
from .openaitest import generate_desc

# Create your views here.

class ModelPredictAPI(GenericAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = ModelPredictSerializer

    def post(self, request):
        try:
            request.data.pop('description')
        except: 
            pass
        description = generate_desc(request.data)
        request.data.pop('max_occupants')
        request.data.pop('name')
        
        pred = model_predict(request.data)
        return JsonResponse({'rent':list(pred)[0], 'description': description}, status= status.HTTP_200_OK)