from rest_framework import serializers

class ModelPredictSerializer(serializers.Serializer):
    name = serializers.CharField()
    description = serializers.CharField(required=False)
    max_occupants = serializers.IntegerField()
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

    def get_validation_exclusions(self):
        exclusions = super(ModelPredictSerializer, self).get_validation_exclusions()
        return exclusions + ['description']

class StatisticsSerializer(serializers.Serializer):
    area_location = serializers.CharField()