from django.urls import path
from . import views

urlpatterns = [
    path("login/", views.signin, name="login"),
    path("register/", views.register, name="register"),
    path("getUserInfo/", views.get_user_info, name="get_user_info"),
    path("get_all_todos/", views.get_all_todos, name="get_all_todos"),
    path("getTodo/<int:pk>/", views.get_todo, name="get_todo"),
    path("get_users_by_search/", views.get_users_by_search, name="get_users"),
    path("send_friend_request/", views.send_friend_request, name="send_friend_request"),
    path(
        "accept_friend_request/",
        views.accept_friend_request,
        name="accept_friend_request",
    ),
    path("create_todo/", views.create_todo, name="create_todo"),
    path("like_todo/", views.like_todo, name="like_todo"),
    path("comment_todo/", views.comment_todo, name="comment_todo"),
    path("save_todo/", views.save_todo, name="save_todo"),
    path("get_liked_todos/", views.get_liked_todos, name="get_liked_todos"),
]
