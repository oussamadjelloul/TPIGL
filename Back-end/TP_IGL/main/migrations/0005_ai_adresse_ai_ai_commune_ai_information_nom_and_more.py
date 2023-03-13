# Generated by Django 4.1.4 on 2023-01-07 16:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0004_alter_ai_options'),
    ]

    operations = [
        migrations.AddField(
            model_name='ai',
            name='adresse_ai',
            field=models.CharField(default='', max_length=255),
        ),
        migrations.AddField(
            model_name='ai',
            name='commune',
            field=models.CharField(default='', max_length=50),
        ),
        migrations.AddField(
            model_name='ai',
            name='information_nom',
            field=models.CharField(default='', max_length=50),
        ),
        migrations.AddField(
            model_name='ai',
            name='information_prenom',
            field=models.CharField(default='', max_length=50),
        ),
        migrations.AddField(
            model_name='ai',
            name='wilaya',
            field=models.CharField(default='', max_length=50),
        ),
    ]