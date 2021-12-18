from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import User
from .serializers import UserModelSerializer
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.renderers import JSONRenderer,  BrowsableAPIRenderer

class UserModelViewSet(ModelViewSet):
   queryset = User.objects.all()
   serializer_class = UserModelSerializer


class UserCustomViewSet(ListModelMixin, RetrieveModelMixin, UpdateModelMixin, GenericViewSet):
   renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
   queryset = User.objects.all()
   serializer_class = UserModelSerializer