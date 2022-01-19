from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import User
from .serializers import UserModelSerializer, UserModelSerializerV2
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.renderers import JSONRenderer,  BrowsableAPIRenderer

class UserModelViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer

    def get_serializer_class(self):
        if self.request.version == 'v2':
            return UserModelSerializerV2
        return UserModelSerializer

class UserCustomViewSet(ListModelMixin,
                        RetrieveModelMixin,
                        UpdateModelMixin,
                        GenericViewSet):
   renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
   queryset = User.objects.all()
   serializer_class = UserModelSerializer