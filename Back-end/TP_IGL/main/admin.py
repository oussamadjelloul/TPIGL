from django.contrib import admin
from .models import AI, Message, AiImage, UserAccount,UserAccountManager

# Register your models here.
admin.site.register(AI)
admin.site.register(Message)
admin.site.register(AiImage)
admin.site.register(UserAccount)
#admin.site.register(UserAccountManager)
