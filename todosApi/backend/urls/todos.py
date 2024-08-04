from django.urls import path
from ..views.todos import (
    get_all_todos,
    get_todo,
    create_todo,
    delete_todo,
    like_todo,
    comment_todo,
    save_todo,
    get_liked_todos,
    get_saved_todos,
    update_todo,
)

urlpatterns = [
    path("get_all_todos/", get_all_todos, name="get_all_todos"),
    path("getTodo/<int:pk>/", get_todo, name="get_todo"),
    path("create_todo/", create_todo, name="create_todo"),
    path("delete_todo/<int:pk>", delete_todo, name="delete_todo"),
    path("like_todo/", like_todo, name="like_todo"),
    path("comment_todo/", comment_todo, name="comment_todo"),
    path("save_todo/", save_todo, name="save_todo"),
    path("get_liked_todos/", get_liked_todos, name="get_liked_todos"),
    path("get_saved_todos/", get_saved_todos, name="get_saved_todos"),
    path("update_todo/<int:pk>/", update_todo, name="update_todo"),
]
