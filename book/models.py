from django.db import models


class Song(models.Model):
    name = models.CharField(max_length=255,null=False, default='no_name')
    path = models.CharField(max_length=255,null=False, default='no_path')
    type = models.CharField(max_length=10,null=False, default='mp4')
    comment = models.TextField(default='')

    def __repr__(self):
        return "<Song :%r>" % self.path

    def __str__(self):
        return "<Song :%r>" % self.name

class Snippet(models.Model):
    song = models.ForeignKey(Song)
    start = models.PositiveIntegerField()
    end = models.PositiveIntegerField()
