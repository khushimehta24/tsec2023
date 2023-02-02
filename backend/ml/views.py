from django.shortcuts import render
from rest_framework.generics import GenericAPIView
from .serializers import *
from django.http.response import JsonResponse
from rest_framework import status,permissions
from .model_call import model_predict
from .openaitest import generate_desc, generate_img

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
        data = request.data
        prompt = f"Write a fancy, attractive, tempting description for the following:\n\n    name: {data['name']}\n  \n  posted_on: {data['posted_on']}\n  bhk: {data['bhk']}\n  size: {data['size']}\n  floor: {data['floor']}\n  area_type: {data['area_type']}\n  area_location: {data['area_location']}\n  city: {data['city']}\n  furnishing_status: {data['furnishing_status']}\n  tenant_preferred: {data['tenant_preferred']}\n  bathroom: {data['bathroom']}\n  point_of_contact: {data['point_of_contact']}\n  max_occupants: {data['max_occupants']}\n\n"
        pred = model_predict(prompt)
        return JsonResponse({'rent':list(pred)[0], 'description': description}, status= status.HTTP_200_OK)


class StatisticsAPI(GenericAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = StatisticsSerializer

    def post(self, request):
        data = request.data
        prompt1 = f"What is the crime rate in {data['area_location']}?"
        crime_rate = generate_desc(prompt1)
        prompt2 = f"What is the cost of living in {data['area_location']} in rupees?"
        cost_of_living = generate_desc(prompt2)
        prompt3 = f"Top 5 colleges near {data['area_location']}"
        colleges = generate_desc(prompt3)
        return JsonResponse({'crime_rate': crime_rate, "cost_of_living": cost_of_living, "colleges": colleges}, status= status.HTTP_200_OK)


class ImageAPI(GenericAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = StatisticsSerializer

    def post(self, request):
        data = request.data
        url = generate_img(prompt=data['area_location'])
        return JsonResponse({'url': url}, status= status.HTTP_200_OK)

