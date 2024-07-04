from django.contrib import admin
from .models import Todo

# from django.contrib.auth.admin import UserAdmin
from .models import User

# Register your models here.

admin.site.register(User)
admin.site.register(Todo)
