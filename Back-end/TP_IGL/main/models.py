from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from datetime import datetime
import uuid


class UserAccountManager(BaseUserManager):
    # def create_user(self, email, name, password=None):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('users must have an email adresse')

        email = self.normalize_email(email)
        # user = self.model(email=email, name=name)
        user = self.model(email=email, **extra_fields)

        user.set_password(password)  # hashing password
        user.save()

        return user

    def create_superuser(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('superuser must have an email adresse')

        email = self.normalize_email(email)
        superuser = self.model(email=email, **extra_fields)
        superuser.set_password(password)
        superuser.is_superuser = True
        superuser.is_staff = True
        superuser.save()

        return superuser


class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    # name = models.CharField(max_length=255)
    first_name = models.CharField(
        max_length=255, default="")  # i'll review this later
    last_name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    # REQUIRED_FIELDS = ['name']
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def get_full_name(self):
        # return self.name
        return self.first_name + self.last_name

    def get_short_name(self):
        # return self.name
        return self.first_name

    def __str__(self):
        return self.email


class AI(models.Model):
    x = [
        ("Terrain", "Terrain"),
        ("Terrain_Agricole", "Terrain Agricole"),
        ("Appartement", "Appartement"),
        ("Maison", "Maison"),
        ("Bungalow", "Bungalow")
    ]
    y = [
        ("Vente", "Vente"),
        ("Echange", "Echange"),
        ("Location", "Location")
    ]
    # id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    # PK auto generated
    titre = models.CharField(max_length=50)
    description = models.TextField()
    date_Publication = models.DateTimeField(default=datetime.now)
    type_ai = models.CharField(max_length=50, choices=x, null=True, blank=True)
    category = models.CharField(max_length=50, choices=y)
    surface = models.DecimalField(max_digits=50, decimal_places=2)
    prix = models.DecimalField(max_digits=50, decimal_places=2)
    wilaya = models.CharField(max_length=50, default="")
    commune = models.CharField(max_length=50, default="")
    adresse_ai = models.CharField(max_length=255, default="")
    information_tel = models.CharField(max_length=30)
    information_email = models.EmailField(null=True, blank=True)
    information_nom = models.CharField(
        max_length=50, default="", null=True, blank=True)
    information_prenom = models.CharField(
        max_length=50, default="", null=True, blank=True)
    information_adresse = models.CharField(
        max_length=255, default="", null=True, blank=True)
    lat = models.DecimalField(max_digits=50, decimal_places=10, default=0)
    lng = models.DecimalField(max_digits=50, decimal_places=10, default=0)
    user = models.ForeignKey(
        UserAccount, on_delete=models.CASCADE, related_name='ais', null=True, blank=True)

    def __str__(self):
        return self.titre

    class Meta:
        ordering = ['date_Publication']


class AiImage(models.Model):
    # id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    ai = models.ForeignKey(AI, on_delete=models.CASCADE,
                           related_name="images", null=True, blank=True)

    image = models.FileField(upload_to="img", null=True, blank=True)


class Message(models.Model):
    # id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    vue = models.BooleanField(default=False)
    body = models.TextField()
    # On delete CASCADE is Dangerous here because when you delete a message yoy will delete the User !!!
    user_reciever = models.ForeignKey(
        UserAccount, on_delete=models.CASCADE, related_name='messages_recieved', null=True, blank=True)
    user_sender = models.ForeignKey(
        UserAccount, on_delete=models.SET_NULL, related_name='messages_sent', null=True, blank=True)
    ai = models.ForeignKey(
        AI, on_delete=models.CASCADE, related_name='messages', null=True, blank=True)


class Favorite(models.Model):
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE,
                             related_name='user_favorite')
    ai = models.ForeignKey(
        AI, on_delete=models.CASCADE, related_name='ai_favorite')
