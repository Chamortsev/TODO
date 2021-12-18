from rest_framework.viewsets import ModelViewSet
from .serializers import ProjectModelSerializer, TodoModelSerializer
from .models import Project, Todo
from rest_framework.pagination import LimitOffsetPagination
from .filters import ProjectFilter, TodoFilter


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 5


class TodoLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 5


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    pagination_class = ProjectLimitOffsetPagination
    filterset_class = ProjectFilter


class TodoModelViewSet(ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoModelSerializer
    pagination_class = TodoLimitOffsetPagination
    filter_class = TodoFilter

    def perform_create(self, serializer):
        serializer.save(is_active=True)