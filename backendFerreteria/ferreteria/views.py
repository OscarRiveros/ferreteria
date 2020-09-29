from ferreteria.models import Categoria
from .serializers import CategoriaSerializer
from rest_framework import viewsets, permissions


class CategoriaViewset(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = CategoriaSerializer
