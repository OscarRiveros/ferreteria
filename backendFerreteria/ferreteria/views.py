from ferreteria.models import Categoria, Proveedor, UnidadDeMedida, Producto, ProductoPorUnidadDeMedida
from .serializers import CategoriaSerializer, ProveedorSerializer, UnidadDeMedidaSerializer, ProductoSerializer, ProductoPorUnidadDeMedidaSerializer
from rest_framework import viewsets, permissions


class CategoriaViewset(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = CategoriaSerializer


class ProveedorViewset(viewsets.ModelViewSet):
    queryset = Proveedor.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = ProveedorSerializer


class UnidadDeMedidaViewset(viewsets.ModelViewSet):
    queryset = UnidadDeMedida.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = UnidadDeMedidaSerializer


class ProductoViewset(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    permissions_classes = [permissions.AllowAny]
    serializer_class = ProductoSerializer


class ProductoPorUnidadDeMedidaViewset(viewsets.ModelViewSet):
    queryset = ProductoPorUnidadDeMedida.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = ProductoPorUnidadDeMedidaSerializer
