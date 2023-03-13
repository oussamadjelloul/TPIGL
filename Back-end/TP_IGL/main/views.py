from django.shortcuts import render
from django.http import HttpResponse
from io import BytesIO
from django.http.response import JsonResponse
from .models import AI, Message
from rest_framework.decorators import api_view
from .serializers import AISerializer, MessageSerializer, FavoriteSerializer
from rest_framework import status, filters
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from django.http import Http404
from rest_framework import mixins, generics, viewsets
# from rest_framework.authentication import BasicAuthentication
# from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.hashers import make_password
from rest_framework.utils import json
from rest_framework.views import APIView
from rest_framework.response import Response
import requests
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny, IsAdminUser
# from django.contrib.auth.models import User
from .models import UserAccount, Favorite
from rest_framework.parsers import JSONParser
from django.db.models import Q
from bs4 import BeautifulSoup
import re
from django.core.files.base import File
from django.core.files.uploadedfile import InMemoryUploadedFile
import magic


class GoogleView(APIView):

    permission_classes = (AllowAny,)

    def post(self, request):
        payload = {'access_token': request.data.get(
            "token")}  # validate the token

        # r = requests.get(
        #    'https://www.googleapis.com/oauth2/v2/userinfo', params=payload)
        id_token = request.data.get("token")
        r = requests.get(
            f'https://www.googleapis.com/oauth2/v3/tokeninfo/?id_token={id_token}')

        data = json.loads(r.text)

        if 'error' in r.text:
            content = {
                'message': 'wrong google token / this google token is already expired.'}
            return Response(content)

        # create user if not exist
        try:
            user = UserAccount.objects.get(email=data['email'])
        except UserAccount.DoesNotExist:
            user = UserAccount()
            user.email = data['email']  # this was user.username
            # provider random default password
            user.password = make_password(
                BaseUserManager().make_random_password())
            user.first_name = data["given_name"]
            user.last_name = data["family_name"]
            user.save()

        # generate token without username & password
        token = RefreshToken.for_user(user)
        response = {}
        response["user_id"] = user.id
        response['username'] = user.email
        response["is_admin"] = user.is_staff
        response['access_token'] = str(token.access_token)
        response['refresh_token'] = str(token)
        return Response(response)


class AI_list(APIView):
    """List all the AI's or create a new one"""

    def get(self, request):
        """Get AI list ordered by the most recent"""

        # they are already ordered because we mentioned that in Meta class in AI
        ais = AI.objects.all()
        serializer = AISerializer(ais, many=True)
        return JsonResponse(serializer.data, safe=False)

    def post(self, request):
        serializer = AISerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AI_detail(APIView):

    """"Retrieve, update or delete an AI."""

    def get_object(self, pk):
        try:
            return AI.objects.get(pk=pk)
        except AI.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        ai = self.get_object(pk)
        serializer = AISerializer(ai)
        return JsonResponse(serializer.data)

    def put(self, request, pk):
        ai = self.get_object(pk)
        serializer = AISerializer(ai, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        ai = self.get_object(pk)
        user_email = request.user.email
        user = UserAccount.objects.get(email=user_email)
        ai_user = UserAccount.objects.get(email=ai.user)
        if (user.id != ai_user.id):
            response = {}
            response["details"] = "this AI doesn't belong to this user"
            return JsonResponse(data=response, status=status.HTTP_401_UNAUTHORIZED)
        ai.delete()
        return HttpResponse(status=status.HTTP_204_NO_CONTENT)


class AiSearch(APIView):

    def post(self, request):
        queryset_all = AI.objects.all()
        key_words = request.data["key_words"]
        key_words = key_words.split()
        result = AI.objects.none()  # empty queryset
        for word in key_words:
            # search and exclude the querysets that doesn't have "word"
            queryset = queryset_all.exclude(
                ~Q(titre__icontains=word) & ~Q(description__icontains=word))
            result = result | queryset  # join the results
        print(result)
        serializer = AISerializer(result, many=True)
        return JsonResponse(serializer.data, safe=False)


class AiUser(APIView):
    """"unable user from seeing his own AIs"""

    def get(self, request):
        user_email = request.user
        user = UserAccount.objects.get(email=user_email)
        queryset = AI.objects.filter(user=user.id)
        serializer = AISerializer(queryset, many=True)
        return JsonResponse(serializer.data, safe=False)


class AiFilter(APIView):
    """"Filter search results by Type, wilaya, commune, periode entre deux dates de publication"""

    def post(self, request):
        queryset = AI.objects.all()
        if (request.data["by_type"] == True):
            queryset = queryset.filter(type_ai=request.data["type"])

        if (request.data["by_wilaya"] == True):
            queryset = queryset.filter(wilaya=request.data["wilaya"])

        if (request.data["by_commune"] == True):
            queryset = queryset.filter(commune=request.data["commune"])

        if (request.data["by_periode"] == True):
            queryset = queryset.filter(date_Publication__gte=request.data["date1"],
                                       date_Publication__lte=request.data["date2"])

        serializer = AISerializer(queryset, many=True)
        return JsonResponse(serializer.data, safe=False)


class Messages(APIView):

    def get(self, request):
        """"Get all the messages which isn't viewed yet"""

        user_email = request.user
        user = UserAccount.objects.get(email=user_email)
        non_viewed_messages = set()
        for message in user.messages_recieved.all():
            if (message.vue == False):
                non_viewed_messages.add(message.id)

        response = Message.objects.filter(pk__in=non_viewed_messages)
        serializer = MessageSerializer(response, many=True)

        return Response(data=serializer.data)

    def post(self, request, id_ai):
        """"send message to a user ai ID is in the URL"""

        user_reciever_email = AI.objects.get(pk=id_ai).user
        serializer = MessageSerializer(
            data=request.data,
            context={
                "ai": id_ai,
                "user_reciever_email": user_reciever_email,
            }
        )
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id):
        """"Mark this message as viewd (id in URL)"""
        # check if the user who sent this is the reciever
        user_email = request.user
        user_request = UserAccount.objects.get(email=user_email)

        message = Message.objects.get(id=id)
        user_owner = message.user_reciever

        if (user_request.id != user_owner.id):  # the message doesn't belong to him
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        message.vue = True
        message.save()
        return Response(status=200)


class Scrapping(APIView):
    def get(slef, request):
        # user_email = request.user.email
        # user = UserAccount.objects.get(email=user_email)
        # if (user.id==1):
        url = "http://www.annonce-algerie.com/upload/flux/rss_1.xml"
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'xml')
        items = soup.find_all('item')
        links = []
        for item in items:
            links.append(item.find('link').text)
        data_ai = []
        for link in links:
            ai = {}
            response = requests.get(link)
            data = BeautifulSoup(response.text, 'html.parser')
            tables = data.find_all('table', {'class': 'da_rub_cadre'})
            for table in tables:
                table_label = table.find_all('td', {'class': 'da_label_field'})
                table_content = table.find_all(
                    'td', {'class': 'da_field_text'})
                cpt = 0
                if len(table_label) == len(table_content):
                    titres = table.find('tr', {'class': 'da_entete'})
                    if titres != None:
                        titre = titres.text
                        titre_table = titre.split(' ')
                        co = 1
                        titre = ''
                        while len(titre_table) > co:
                            titre = titre+' '+titre_table[co]
                            co = co+1
                        ai['titre'] = titre
                        while cpt < len(table_label):
                            if table_label:
                                if ((table_label[cpt].text.strip() == 'Catégorie')):
                                    label = table_label[cpt].text
                                    content = table_content[cpt].text
                                    contents = content.split('>')
                                    if len(contents) > 2:
                                        content = contents[1].strip()
                                    if ((content == 'Vente') or (content == 'Echange') or (content == 'Location')):
                                        ai['category'] = content
                                elif (table_label[cpt].text.strip() == 'Localisation'):
                                    label = table_label[cpt].text
                                    content = table_content[cpt].text
                                    contents = content.split('>')
                                    if len(contents) > 2:
                                        ai['wilaya'] = contents[len(
                                            contents)-2].strip()
                                        ai['commune'] = contents[len(
                                            contents)-1].strip()

                                elif table_label[cpt].text.strip() == 'Prix' or table_label[cpt].text.strip() == 'Surface':
                                    label = table_label[cpt].text.strip()
                                    content = re.findall(
                                        r'\d+', table_content[cpt].text.strip())[0]
                                    if table_label[cpt].text.strip() == 'Prix':
                                        ai['prix'] = content
                                    else:
                                        ai['surface'] = content
                                elif table_label[cpt].text.strip() == 'Modifiée le':
                                    field = table_content[cpt].text.split("/")
                                    ai['date_Publication'] = field[2]+'-' + \
                                        field[1]+'-'+field[0]+'T00:00:00'
                                elif table_label[cpt].text.strip() == 'Adresse':
                                    ai['adresse_ai'] = table_content[cpt].text
                                elif table_label[cpt].text.strip() == 'Texte':
                                    ai['description'] = table_content[cpt].text
                                elif table_label[cpt].text.strip() != 'Insérée le':
                                    label = table_label[cpt].text.strip()
                                    content = table_content[cpt].text.strip()
                                    ai[label] = content
                            cpt = cpt+1
                imgs = table.find_all('img', {'class': 'PhotoMin1'})
                images = []
                if imgs != None:
                    for img in imgs:
                        image_url = "http://www.annonce-algerie.com/" + \
                            img['src']
                        response = requests.get(image_url)
                        # Create a BytesIO object from the image content
                        file_stream = BytesIO(response.content)
                        magic_obj = magic.Magic(mime=True)
                        # Get the MIME type of the file
                        file_type = magic_obj.from_buffer(
                            file_stream.getvalue())
                        name_image = "scrapping."+file_type.split('/')[1]
                        uploaded_file = InMemoryUploadedFile(
                            file_stream, None, name_image, file_type, len(
                                response.content), None
                        )
                        images.append(uploaded_file)
                    if len(images) != 0:
                        ai['uploaded_images'] = images
            data_tel = data.find('li', {'class': 'cellphone'})
            tel = data_tel.text.split(':')[1].strip()
            ai['information_tel'] = tel
            ai['lat']=0
            ai['lng']=0
            data_ai.append(ai)
            
        rel_data_ai = []
        for data in data_ai:
            if len(data) > 1:
                if not ('uploaded_images' in data):
                    data['uploaded_images'] = []
                data['user'] = 1
                rel_data_ai.append(data)

        # return Response(rel_data_ai)
        for rel_state in rel_data_ai:
            serializer = AISerializer(data=rel_state)
            if serializer.is_valid():
                serializer.save()
            else:
                continue
        return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        # return JsonResponse(status=status.HTTP_400_BAD_REQUEST)
# favorite


class Favorite_get_by_user(APIView):
    def put(self, request):
        queryset = Favorite.objects.all()
        query_favorite_with_user = queryset.filter(user=request.data["user"])
        serializer = FavoriteSerializer(query_favorite_with_user, many=True)
        return JsonResponse(serializer.data, safe=False)


class Favorite_list(APIView):
    def put(self, request):
        queryset = Favorite.objects.all()
        query_favorite_with_user = queryset.filter(user=request.data["user"])
        queryset_ai = AI.objects.all()
        ai_array = []
        for user_favorite in query_favorite_with_user:
            ai_array.append(user_favorite.ai)
        serializer = AISerializer(ai_array, many=True)
        return JsonResponse(serializer.data, safe=False)

    def post(self, request):
        serializer = FavoriteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class Favorite_detais(APIView):
    """"Retrieve, update or delete an Favorite."""

    def get_object(self, pk):
        try:
            return Favorite.objects.get(pk=pk)
        except AI.DoesNotExist:
            raise Http404

    def delete(self, request, pk):
        favorite = self.get_object(pk)
        user_email = request.user.email
        user = UserAccount.objects.get(email=user_email)
        favorite_user = UserAccount.objects.get(email=favorite.user.email)
        if (user.id != favorite_user.id):
            response = {}
            response["details"] = "this AI doesn't belong to this user"
            return JsonResponse(data=response, status=status.HTTP_401_UNAUTHORIZED)
        favorite.delete()
        return HttpResponse(status=status.HTTP_204_NO_CONTENT)


############   ADDITIONAL   ##############


class HelloView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request):
        content = {'message': 'Hello, World!'}
        return Response(content, status=200)


class AI_Function_Id(APIView):
    def get_object(self, id):
        try:
            return AI.objects.get(id=id)
        except AI.DoesNotExist:
            raise Http404

    def delete(self, request, id):
        ais = self.get_object(id)
        ais.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, id):
        ais = self.get_object(id)
        serializer = AISerializer(ais, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, id):
        ais = self.get_object(id)
        serializer = AISerializer(ais)
        return Response(serializer.data)


@api_view(['POST'])
def create_ai(request):
    serializer = AISerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)


class AI_Function(APIView):
    def get(self, request):
        ais = AI.objects.all()
        serializer = AISerializer(ais, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = AISerializer(data=request.data)
        if (serializer.is_valid()):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)
