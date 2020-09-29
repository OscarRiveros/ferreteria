from rest_framework import serializers
from ferreteria.models import Categoria

# Categoria serializars


class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = "__all__"
