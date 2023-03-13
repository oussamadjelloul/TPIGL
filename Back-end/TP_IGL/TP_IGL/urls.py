"""TP_IGL URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.urls import re_path as url
from django.conf.urls.static import static
from main import views
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from main import views
from django.conf.urls.static import static
from django.urls import re_path as url
from django.conf import settings


urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/', include('djoser.social.urls')),  # google
    path('google/', views.GoogleView.as_view(), name='google'),
    path('hello/', views.HelloView.as_view(), name='hello'),
    path('ai/', views.AI_list.as_view(), name='ai_list'),
    path('ai/<int:pk>/', views.AI_detail.as_view(), name='ai_datail'),
    path('ai/search/', views.AiSearch.as_view(), name='ai_search'),
    path('ai/mine/', views.AiUser.as_view(), name='ai_user'),
    path('ai/filter/', views.AiFilter.as_view(), name='ai_filter'),
    path('ai/<int:id_ai>/message/',
         views.Messages.as_view(), name='massage_sending'),
    path('messages/', views.Messages.as_view(), name='messages_get'),
    path('message/<int:id>/viewed/',
         views.Messages.as_view(), name='message_viewed'),
    path('scrapping', views.Scrapping.as_view(), name="scrapping"),
    path('favorite', views.Favorite_list.as_view(), name='favorite'),
    path('favorite/<int:pk>', views.Favorite_detais.as_view(), name='favorite'), path(
        'favorite_user', views.Favorite_get_by_user.as_view(), name='favorite')
    # path('main/', include('main.urls'))
]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [
    # for the react side
    re_path(r'^.*', TemplateView.as_view(template_name='index.html'))
]
