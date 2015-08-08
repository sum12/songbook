# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Snippet',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('start', models.PositiveIntegerField()),
                ('end', models.PositiveIntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Song',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(default=b'no_name', max_length=255)),
                ('path', models.CharField(default=b'no_path', max_length=255)),
            ],
        ),
        migrations.AddField(
            model_name='snippet',
            name='song',
            field=models.ForeignKey(to='book.Song'),
        ),
    ]
