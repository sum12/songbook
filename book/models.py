from django.db import models


class Song(models.Model):
    name = models.ChartField(null=False, default='no_name')
    path = models.ChartField(null=False, default='no_path')


class Snippet(models.Model):
    song = models.ForeignKey(Song)
    start = models.PositiveIntegerField()
    end = models.PositiveIntegerField()
