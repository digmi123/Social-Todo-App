from django.db.models import Q
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Todo, User, Friend, Like
from .serializers import (
    TodoSerializer,
    UserSerializer,
    FriendSerializer,
    LikeSerializer,
    CommentSerializer,
    SavedSerializer,
)
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from django.shortcuts import get_object_or_404
from datetime import datetime, timedelta
from .cookieToeknAuthentication import CookieTokenAuthentication
from django.utils.http import http_date


def getFriends(user):
    optional_friends = Friend.objects.filter(
        Q(sender=user) | Q(reciever=user), friendship_status=True
    )
    friends = []
    for friend in optional_friends:
        if friend.sender == user:
            friends.append(friend.reciever)
        else:
            friends.append(friend.sender)
    return friends


@api_view(["GET"])
@authentication_classes([CookieTokenAuthentication])
@permission_classes([IsAuthenticated])
def get_user_info(request):
    friends = getFriends(request.user)
    friends_serializer = UserSerializer(friends, many=True)

    friend_requests = Friend.objects.filter(
        reciever=request.user, friendship_status=False
    )
    friend_request_serializer = FriendSerializer(friend_requests, many=True)

    # Get user's likes
    user_likes = Like.objects.filter(user=request.user)
    user_likes_serializer = LikeSerializer(user_likes, many=True)

    data = {
        "friends": friends_serializer.data,
        "friend_requests": friend_request_serializer.data,
        "likes": user_likes_serializer.data,
    }
    return Response(data=data, status=status.HTTP_200_OK)


@api_view(["GET"])
@authentication_classes([CookieTokenAuthentication])
@permission_classes([IsAuthenticated])
def get_all_todos(request):
    todos = Todo.objects.all()
    todosSerializer = TodoSerializer(todos, many=True)
    data = {
        "todos": todosSerializer.data,
    }
    return Response(data=data, status=status.HTTP_201_CREATED)


@api_view(["POST"])
def get_users_by_search(request):
    searched_username = request.data["searched_username"]
    if searched_username:
        users = User.objects.filter(username__icontains=searched_username)
    if users.exists():
        serializer = UserSerializer(users, many=True)
        print(serializer.data)
        return Response(serializer.data)
    return Response(
        {"error": "No users found with the specified username."}, status=404
    )


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
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        print("valid")
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@authentication_classes([CookieTokenAuthentication])
@permission_classes([IsAuthenticated])
def send_friend_request(request):
    friend_id = request.data["friend_id"]
    friend = User.objects.get(id=friend_id)
    print(request.user)
    Friend.objects.create(sender=request.user, reciever=friend)
    return Response(status=status.HTTP_200_OK)


@api_view(["POST"])
@authentication_classes([CookieTokenAuthentication])
@permission_classes([IsAuthenticated])
def accept_friend_request(request):
    friend_request_id = request.data["friend_request_id"]
    friend_request = get_object_or_404(Friend, id=friend_request_id)
    friend_request.friendship_status = True
    friend_request.save()
    return Response(status=status.HTTP_200_OK)


@api_view(["POST"])
@authentication_classes([CookieTokenAuthentication])
@permission_classes([IsAuthenticated])
def create_todo(request):
    data = request.data
    data["pub_date"] = datetime.datetime.now()
    data["creator"] = request.user.id
    serializer = TodoSerializer(data=data, context={"request": request})
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    print(serializer.errors)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@authentication_classes([CookieTokenAuthentication])
@permission_classes([IsAuthenticated])
def get_todo(request, pk):
    print("im here")
    todo_item = get_object_or_404(Todo, pk=pk)
    print(todo_item)
    todo_serializer = TodoSerializer(todo_item)
    print(todo_item)
    return Response(todo_serializer.data, status=status.HTTP_201_CREATED)


@api_view(["POST"])
@authentication_classes([CookieTokenAuthentication])
@permission_classes([IsAuthenticated])
def like_todo(request):
    data = request.data
    serializer = LikeSerializer(data=data, context={"request": request})
    if serializer.is_valid():
        serializer.save()
        print(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    print(serializer.errors)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@authentication_classes([CookieTokenAuthentication])
@permission_classes([IsAuthenticated])
def comment_todo(request):
    data = request.data
    serializer = CommentSerializer(data=data, context={"request": request})
    if serializer.is_valid():
        print("valid")
        serializer.save()
        print(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    print(serializer.errors)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@authentication_classes([CookieTokenAuthentication])
@permission_classes([IsAuthenticated])
def save_todo(request):
    data = request.data
    serializer = SavedSerializer(data=data, context={"request": request})
    if serializer.is_valid():
        serializer.save()
        print(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    print(serializer.errors)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@authentication_classes([CookieTokenAuthentication])
@permission_classes([IsAuthenticated])
def like_todo(request):
    user = request.user
    todo = get_object_or_404(Todo, pk=request.data["todo_id"])
    like, created = Like.objects.get_or_create(user=user, todo=todo)
    if not created:
        like.delete()
        return Response({"liked": False}, status=status.HTTP_200_OK)
    else:
        return Response({"liked": True}, status=status.HTTP_201_CREATED)


@api_view(["GET"])
@authentication_classes([CookieTokenAuthentication])
@permission_classes([IsAuthenticated])
def get_liked_todos(request):
    user = request.user
    liked_todos = Like.objects.filter(user=user)
    like_serializer = LikeSerializer(liked_todos, many=True)
    data = {
        "liked_todos": like_serializer.data,
    }
    return Response({"liked_todos": data}, status=status.HTTP_200_OK)
