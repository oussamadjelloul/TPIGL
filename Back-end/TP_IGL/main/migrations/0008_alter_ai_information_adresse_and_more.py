# Generated by Django 4.1.4 on 2023-02-02 16:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0007_alter_aiimage_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ai',
            name='information_adresse',
            field=models.CharField(blank=True, default='', max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='ai',
            name='information_email',
            field=models.EmailField(blank=True, max_length=254, null=True),
        ),
        migrations.AlterField(
            model_name='ai',
            name='information_nom',
            field=models.CharField(blank=True, default='', max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='ai',
            name='information_prenom',
            field=models.CharField(blank=True, default='', max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='ai',
            name='type_ai',
            field=models.CharField(blank=True, choices=[('Terrain', 'Terrain'), ('Terrain_Agricole', 'Terrain Agricole'), ('Appartement', 'Appartement'), ('Maison', 'Maison'), ('Bungalow', 'Bungalow')], max_length=50, null=True),
        ),
    ]
