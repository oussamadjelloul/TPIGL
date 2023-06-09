# Generated by Django 4.1.6 on 2023-02-04 13:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0010_ai_cordonne_x_ai_cordonne_y'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='ai',
            name='cordonne_x',
        ),
        migrations.RemoveField(
            model_name='ai',
            name='cordonne_y',
        ),
        migrations.AddField(
            model_name='ai',
            name='lat',
            field=models.DecimalField(decimal_places=10, default=0, max_digits=50),
        ),
        migrations.AddField(
            model_name='ai',
            name='lng',
            field=models.DecimalField(decimal_places=10, default=0, max_digits=50),
        ),
    ]
