from rest_framework import serializers

class ModelPredictSerializer(serializers.Serializer):
    posted_on = serializers.DateField(format="%Y-%m-%d", input_formats=['%Y-%m-%d'])
    bhk = serializers.IntegerField()
    size = serializers.IntegerField()
    floor = serializers.CharField()
    area_type = serializers.CharField()
    area_location = serializers.CharField()
    city = serializers.CharField()
    furnishing_status = serializers.CharField()
    tenant_preferred = serializers.CharField()
    bathroom = serializers.IntegerField()
    point_of_contact = serializers.CharField()