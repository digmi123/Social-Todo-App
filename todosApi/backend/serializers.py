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
    creator = UserSerializer(read_only=True)
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Todo
        fields = "__all__"

    def create(self, validated_data):
        validated_data["creator"] = self.context["request"].user
        return super().create(validated_data)


class LikeSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    todo = TodoSerializer(read_only=True)

    class Meta:
        model = Like
        fields = "__all__"

    def create(self, validated_data):
        validated_data["user"] = self.context["request"].user
        return super().create(validated_data)


class SavedSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    todo = TodoSerializer(read_only=True)

    class Meta:
        model = Saved
        fields = "__all__"

    def create(self, validated_data):
        validated_data["user"] = self.context["request"].user
        return super().create(validated_data)
