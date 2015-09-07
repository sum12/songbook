# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('book', '0002_song_type'),
    ]

    operations = [
        migrations.AddField(
            model_name='song',
            name='comment',
            field=models.TextField(default=b''),
        ),
    ]
