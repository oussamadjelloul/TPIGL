from datetime import datetime
from django.test import TestCase, Client
from django.urls import reverse
from .models import AI, UserAccount
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.hashers import make_password


class MyAppViewTests(TestCase):
    def test_hello_view(self):
        response = self.client.get(reverse('hello'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Hello, World!")


class AI_Function_IdTestCase(TestCase):
    def setUp(self):
        self.client = Client()

        self.user = UserAccount()
        self.user.email = 'test@email.com'

        self.user.password = make_password(
            BaseUserManager().make_random_password())
        self.user.first_name = "Jhon"
        self.user.last_name = 'Doe'
        self.user.save()

        self.ais = AI.objects.create(
            user=self.user,
            titre="Test Property",
            description="This is a test property description.",
            date_Publication=datetime.now(),
            type_ai="Maison",
            category="Vente",
            surface=150.00,
            prix=200000.00,
            wilaya="Algiers",
            commune="Algiers Center",
            adresse_ai="123 Main Street, Algiers",
            information_tel="555-555-1212",
            information_email="test@email.com",
            information_nom="John",
            information_prenom="Doe",
            information_adresse="456 Main Street, Algiers",
        )  # create an AI object to delete

    def test_delete_ais(self):
        self.client.login(email='test@email.com', password='testpassword')
        token = RefreshToken.for_user(self.user)

        HEADERS = {'Bearer': str(token.access_token)}

        response = self.client.delete(
            reverse('ai_datail', args=[self.ais.id]), headers=HEADERS)
        self.assertEqual(response.status_code, 204)
        self.assertFalse(AI.objects.filter(id=self.ais.id).exists())
        self.client.logout()
