from rest_framework.decorators import api_view
from rest_framework.response import Response
from backend.models import Todo, Like, Saved
from backend.serializers import (
    TodoSerializer,
    LikeSerializer,
    CommentSerializer,
    SavedSerializer,
)
from rest_framework import status
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from datetime import datetime
from backend.cookieToeknAuthentication import CookieTokenAuthentication
from django.utils.http import http_date


@api_view(["POST"])
@authentication_classes([CookieTokenAuthentication])
@permission_classes([IsAuthenticated])
def create_todo(request):
    data = request.data
    data["pub_date"] = datetime.now()
    data["creator"] = request.user.id
    serializer = TodoSerializer(data=data, context={"request": request})
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    print(serializer.errors)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["DELETE"])
@authentication_classes([CookieTokenAuthentication])
@permission_classes([IsAuthenticated])
def delete_todo(request, pk):
    data = request
    print(data)
    todo = Todo.objects.get(id=pk)
    todo.delete()
    return Response(status=status.HTTP_201_CREATED)


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
    print("helloooo-----------------------")
    print(request.data)
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
    user = request.user
    todo = get_object_or_404(Todo, pk=request.data["todo_id"])
    saved, created = Saved.objects.get_or_create(user=user, todo=todo)

    if not created:
        saved.delete()
        return Response({"saved": False}, status=status.HTTP_200_OK)
    else:
        return Response({"saved": True}, status=status.HTTP_201_CREATED)


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
    return Response(like_serializer.data, status=status.HTTP_200_OK)


@api_view(["GET"])
@authentication_classes([CookieTokenAuthentication])
@permission_classes([IsAuthenticated])
def get_saved_todos(request):
    user = request.user
    saved_todos = Saved.objects.filter(user=user)
    saved_serializer = SavedSerializer(saved_todos, many=True)
    return Response(saved_serializer.data, status=status.HTTP_200_OK)
