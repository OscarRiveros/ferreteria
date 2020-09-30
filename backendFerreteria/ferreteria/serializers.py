from rest_framework import serializers
from ferreteria.models import Categoria, Proveedor, UnidadDeMedida, Producto, ProductoPorUnidadDeMedida

# Categoria serializars


class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = "__all__"


class ProveedorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proveedor
        fields = "__all__"


class UnidadDeMedidaSerializer(serializers.ModelSerializer):
    class Meta:
        model = UnidadDeMedida
        fields = "__all__"


class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = "__all__"


class ProductoPorUnidadDeMedidaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductoPorUnidadDeMedida
        fields = "__all__"
