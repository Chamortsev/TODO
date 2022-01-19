from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APITestCase
from .views import UserModelViewSet
from .models import User

class TestUserView(TestCase):

    def test_get_list(self):
        admin = User.objects.create_user('adm', email='adm@admin.ru', password='admin')
        factory = APIRequestFactory()
        request = factory.post('/api/users/',
                               {
                                   'id':2,
                                   'username': 'one',
                                   'first_name': 'one',
                                   'last_name': 'one',
                                   'email': 'one@one.ru'
                               })
        force_authenticate(request, user=admin)
        view = UserModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['last_name'], 'one')

        request = factory.get('/api/users')
        force_authenticate(request, user=admin)
        view = UserModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_client_get_list(self):
        client = APIClient()
        admin = User.objects.create_user('adm', email='adm@admin.ru', password='admin')
        client.login(username='adm', password='admin')
        response = client.get('/api/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
