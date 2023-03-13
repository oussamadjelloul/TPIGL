from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model
from .models import AI, AiImage, Message, UserAccount, Favorite
from rest_framework import serializers

User = get_user_model()


class AiImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = AiImage
        fields = ["id", "ai", "image"]


# class MessageSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Message
#         fields = ['id', "vue", "body", "user_reciever", "user_sender", "ai"]


class AISerializer(serializers.ModelSerializer):
    images = AiImageSerializer(many=True, read_only=True)
    uploaded_images = serializers.ListField(
        child=serializers.FileField(
            max_length=1000000, allow_empty_file=False, use_url=False),
        write_only=True)

    class Meta:
        model = AI
        fields = ['id', 'titre', 'description', 'date_Publication', 'type_ai', 'category', 'surface',
                  'prix', 'wilaya', 'commune', 'adresse_ai', 'information_tel', 'information_email',
                  'information_nom', 'information_prenom', 'information_adresse', 'user', 'images', 'uploaded_images' , 'lng','lat']

    def create(self, validated_data):
        uploaded_images = validated_data.pop("uploaded_images")
        ai = AI.objects.create(**validated_data)
        for image in uploaded_images:
            ai_image = AiImage.objects.create(
                ai=ai, image=image)
        return ai


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['id', 'vue', 'body', 'user_reciever', 'user_sender', 'ai']

    def create(self, validated_data):
        message = Message.objects.create(**validated_data)
        message.ai = AI.objects.get(id=self.context.get("ai"))
        message.user_reciever = UserAccount.objects.get(
            email=self.context.get("user_reciever_email"))
        message.save()
        return message


class FavoriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorite
        fields = ['id', 'ai', 'user']



class UserCreateSerializer(UserCreateSerializer):
    # ais = AISerializer(many=True, read_only=True)
    # uploaded_ais = serializers.ListField(
    #     child=AISerializer(), write_only=True)

    # messages = MessageSerializer(many=True, read_only=True)
    # uploaded_messages = serializers.ListField(
    #     child=MessageSerializer(), write_only=True)

    class Meta(UserCreateSerializer.Meta):
        model = User
        # fields = {'id', 'email', 'name', 'password'}
        fields = ['id', 'email', 'first_name', 'last_name', 'password']
        # fields = ['id', 'email', 'first_name', 'last_name',
        #           'password', 'messages', 'uploaded_messages', 'ais', 'uploaded_ais']

    # def create(self, validated_data):
    #     uploaded_messages = validated_data.pop("uploaded_messages")
    #     user = UserAccount.objects.create(**validated_data)
    #     uploaded_ais = validated_data.pop("uploaded_ais")
    #     for message in uploaded_messages:
    #         user_message = Message.objects.create(
    #             user=user, name_ai=message.name_ai, name_sender=message.name_sender, vue=message.vue, body=message.body)
    #     for ai in uploaded_ais:
    #         user_ai = AI.objects.create(
    #             user=user, titre=ai.titre, description=ai.description, date_Publication=ai.date_Publication, type_ai=ai.type_ai, category=ai.category, surface=ai.surface, prix=ai.prix, information_name=ai.information_name, information_tel=ai.information_tel, information_email=ai.information_email, uploaded_images=ai.uploaded_images)
    #     return user
