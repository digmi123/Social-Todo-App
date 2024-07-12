from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/auth/", include("backend.urls.auth")),
    path("api/user/", include("backend.urls.user")),
    path("api/todos/", include("backend.urls.todos")),
]
