from django.urls import path
from ..views.auth import signin, register, logout


urlpatterns = [
    path("login/", signin, name="login"),
    path("logout/", logout, name="login"),
    path("register/", register, name="register"),
]
