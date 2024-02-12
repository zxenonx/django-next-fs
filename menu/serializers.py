from rest_framework import serializers
from .models import MenuItem


class MenuItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuItem
        fields = ["id", "name", "price", "created_at", "updated_at"]
        read_only_fields = ["created_at", "updated_at", "id"]
        
