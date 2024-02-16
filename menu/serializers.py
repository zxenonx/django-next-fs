from rest_framework import serializers
from .models import Menu


class MenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = Menu
        fields = ["id", "name", "price", "created_at", "updated_at"]
        read_only_fields = ["created_at", "updated_at", "id"]
        
