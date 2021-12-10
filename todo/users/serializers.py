from rest_framework.serializers import ModelSerializer
from .models import User
from rest_framework.serializers import HyperlinkedModelSerializer


class UserModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email']
