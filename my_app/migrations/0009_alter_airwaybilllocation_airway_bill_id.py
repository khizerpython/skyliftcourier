# Generated by Django 4.2.5 on 2023-12-09 11:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('my_app', '0008_airwaybilllocation'),
    ]

    operations = [
        migrations.AlterField(
            model_name='airwaybilllocation',
            name='airway_bill_id',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='locations', to='my_app.airwaybill'),
        ),
    ]
