from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    # friends = models.ManyToManyField("self", symmetrical=True)

    def __str__(self):
        return self.email


class Todo(models.Model):
    creator = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="todos", null=True, blank=True
    )
    todo_title = models.CharField(max_length=200)
    todo_description = models.CharField(max_length=200)
    pub_date = models.DateTimeField("date published")

    def __str__(self):
        return self.todo_title


class Friend(models.Model):
    sender = models.ForeignKey(User, related_name="friends", on_delete=models.CASCADE)
    reciever = models.ForeignKey(
        User, related_name="friends_of", on_delete=models.CASCADE
    )
    friendship_status = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("sender", "reciever")


class SavedTodos(models.Model):
    user = models.ForeignKey(
        User, related_name="adopted_todos", on_delete=models.CASCADE
    )
    todo = models.ForeignKey(Todo, related_name="adopters", on_delete=models.CASCADE)

    class Meta:
        unique_together = ("user", "todo")

    def __str__(self):
        return f"{self.user.username} adopted {self.todo.title}"


class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    todo = models.ForeignKey(Todo, related_name="likes", on_delete=models.CASCADE)
    is_read = models.BooleanField(default=False)
    liked_at = models.DateTimeField(auto_now_add=True)


class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    todo = models.ForeignKey(Todo, related_name="comments", on_delete=models.CASCADE)
    message = models.CharField(max_length=200, null=True)
    is_read = models.BooleanField(default=False)
    commented_at = models.DateTimeField(auto_now_add=True)


class Saved(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    todo = models.ForeignKey(Todo, related_name="saved", on_delete=models.CASCADE)
    is_read = models.BooleanField(default=False)
    saved_at = models.DateTimeField(auto_now_add=True)
