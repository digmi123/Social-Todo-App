from rest_framework import serializers
from .models import Todo, User, Friend, Like, Comment, Saved


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
        )
        return user


class FriendSerializer(serializers.ModelSerializer):
    sender = UserSerializer()
    reciever = UserSerializer()

    class Meta:
        model = Friend
        fields = "__all__"


class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    todo = serializers.PrimaryKeyRelatedField(queryset=Todo.objects.all())

    class Meta:
        model = Comment
        fields = "__all__"

    def create(self, validated_data):
        validated_data["user"] = self.context["request"].user
        return super().create(validated_data)


class TodoSerializer(serializers.ModelSerializer):
    liked = serializers.SerializerMethodField()  # Defines a method field
    saved = serializers.SerializerMethodField()  # Defines a method field
    creator = UserSerializer(read_only=True)
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Todo
        fields = [
            "id",
            "todo_title",
            "todo_description",
            "pub_date",
            "creator",
            "comments",
            "liked",
            "saved",
        ]

    def get_liked(self, obj):
        # This method is automatically called for each Todo instance
        user = self.context.get("user", None)
        # Checks if there is a Like instance for this user and Todo
        return Like.objects.filter(user=user, todo=obj).exists()

    def get_saved(self, obj):
        # This method is automatically called for each Todo instance
        user = self.context.get("user", None)
        # Checks if there is a Like instance for this user and Todo
        return Saved.objects.filter(user=user, todo=obj).exists()

    def create(self, validated_data):
        validated_data["creator"] = self.context["request"].user
        return super().create(validated_data)


class LikeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Like
        fields = [
            "id",
            "is_read",
            "created_at",
            "todo",
            "user",
        ]

    user = UserSerializer(read_only=True)
    todo = TodoSerializer(read_only=True)

    def create(self, validated_data):
        validated_data["user"] = self.context["request"].user
        return super().create(validated_data)


class SavedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Saved
        fields = [
            "id",
            "is_read",
            "created_at",
            "todo",
            "user",
        ]

    user = UserSerializer(read_only=True)
    todo = TodoSerializer(read_only=True)

    def create(self, validated_data):
        validated_data["user"] = self.context["request"].user
        return super().create(validated_data)
