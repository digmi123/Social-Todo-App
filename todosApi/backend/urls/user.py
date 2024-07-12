from django.urls import path
from ..views.user import (
    get_user_info,
    get_users_by_search,
    send_friend_request,
    accept_friend_request,
)


urlpatterns = [
    path("getUserInfo/", get_user_info, name="get_user_info"),
    path("get_users_by_search/", get_users_by_search, name="get_users"),
    path("send_friend_request/", send_friend_request, name="send_friend_request"),
    path(
        "accept_friend_request/",
        accept_friend_request,
        name="accept_friend_request",
    ),
]
