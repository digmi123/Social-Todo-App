from rest_framework.decorators import api_view
from rest_framework.response import Response
from backend.models import User
from backend.serializers import (
    UserSerializer,
)
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.decorators import (
    api_view,
)
from rest_framework.authtoken.models import Token
from datetime import datetime, timedelta
from django.utils.http import http_date


@api_view(["POST"])
def signin(request):
    user = User.objects.get(username=request.data["username"])
    if user is None:
        return Response({"message": "User does not exist"})

    user = authenticate(
        request, username=request.data["username"], password=request.data["password"]
    )
    print(user)
    token, created = Token.objects.get_or_create(user=user)
    response = Response(data={"message": "User logged in successfully"})
    # Set the token in an HTTP-only cookie
    expires_at = datetime.utcnow() + timedelta(days=7)  # set expiration time
    response.set_cookie(
        key="auth_token",
        value=token.key,
        httponly=True,
        expires=http_date(expires_at.timestamp()),
        secure=False,  # Use secure=True in production for HTTPS
    )
    print(response.cookies)
    return response


@api_view(["POST"])
def logout(request):
    response.delete_cookie("name")
    if serializer.is_valid():
        print("valid")
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        print("valid")
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
