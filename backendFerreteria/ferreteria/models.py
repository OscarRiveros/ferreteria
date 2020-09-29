# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Categoria(models.Model):
    idcategoria = models.AutoField(primary_key=True)
    descripcion = models.CharField(max_length=245, blank=True, null=True)

    class Meta:
        # managed = False
        db_table = 'categoria'


class Producto(models.Model):
    idproducto = models.IntegerField(primary_key=True)
    codigobarra = models.CharField(db_column='codigoBarra', unique=True, max_length=250)  # Field name made lowercase.
    preciocompra = models.DecimalField(db_column='precioCompra', max_digits=10, decimal_places=0)  # Field name made lowercase.
    precioventa = models.DecimalField(db_column='PrecioVenta', max_digits=10, decimal_places=0)  # Field name made lowercase.
    stock = models.IntegerField(blank=True, null=True)
    descripcion = models.CharField(max_length=45)
    categoria_idcategoria = models.ForeignKey(Categoria, models.DO_NOTHING, db_column='categoria_idcategoria')
    proveedor_idproveedor = models.ForeignKey('Proveedor', models.DO_NOTHING, db_column='proveedor_idproveedor')

    class Meta:
        # managed = False
        db_table = 'producto'
        unique_together = (('idproducto', 'categoria_idcategoria', 'proveedor_idproveedor'),)


class ProductoPorUnidadDeMedida(models.Model):
    producto_idproducto = models.OneToOneField(Producto, models.DO_NOTHING, db_column='producto_idproducto', primary_key=True)
    unidad_de_medida_idunidadmedida = models.ForeignKey('UnidadDeMedida', models.DO_NOTHING, db_column='unidad_de_medida_idunidadMedida')  # Field name made lowercase.
    precioventa = models.DecimalField(db_column='precioVenta', max_digits=10, decimal_places=0, blank=True, null=True)  # Field name made lowercase.
    cantidad = models.IntegerField(blank=True, null=True)

    class Meta:
        # managed = False
        db_table = 'producto_por_unidad_de_medida'
        unique_together = (('producto_idproducto', 'unidad_de_medida_idunidadmedida'),)


class Proveedor(models.Model):
    idproveedor = models.IntegerField(primary_key=True)
    nombre = models.CharField(db_column='Nombre', max_length=245, blank=True, null=True)  # Field name made lowercase.
    telefono = models.CharField(max_length=45, blank=True, null=True)
    ruc = models.CharField(unique=True, max_length=45)

    class Meta:
        # managed = False
        db_table = 'proveedor'


class UnidadDeMedida(models.Model):
    idunidadmedida = models.IntegerField(db_column='idunidadMedida', primary_key=True)  # Field name made lowercase.
    descripcion = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        # managed = False
        db_table = 'unidad_de_medida'
