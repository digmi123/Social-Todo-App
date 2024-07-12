from django.db.models import Q
from rest_framework.decorators import api_view
from rest_framework.response import Response
from backend.models import User, Friend, Like, Comment
from backend.serializers import (
    UserSerializer,
    FriendSerializer,
    LikeSerializer,
    CommentSerializer,
)
from rest_framework import status
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from backend.cookieToeknAuthentication import CookieTokenAuthentication


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


def getUserNotifications(user):
    likes = Like.objects.filter(todo__creator=user)
    user_likes_serializer = LikeSerializer(likes, many=True)

    comments = Comment.objects.filter(todo__creator=user)
    comments_serializer = CommentSerializer(comments, many=True)

    return {"likes": user_likes_serializer.data, "comments": comments_serializer.data}


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

    notifications = getUserNotifications(request.user)

    data = {
        "user": UserSerializer(request.user).data,
        "friends": friends_serializer.data,
        "friend_requests": friend_request_serializer.data,
        "likes": user_likes_serializer.data,
        "notifications": notifications,
    }
    return Response(data=data, status=status.HTTP_200_OK)


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
