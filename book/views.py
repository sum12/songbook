from django.shortcuts import render
from django.views.generic.base import TemplateView

from book import models
from book import serializers as bookSerializers
class SongPlayer(TemplateView):
    template_name = 'book/player.html'

    def get_context_data(self, **kwargs):
        context = super(SongPlayer, self).get_context_data(**kwargs)
        context.update({
            'songs' : models.Song.objects.all()
            })
        return context



from rest_framework import viewsets


class SongList(viewsets.ModelViewSet):
    queryset = models.Song.objects.all()
    serializer_class = bookSerializers.SongSerializer


class SnippetList(viewsets.ModelViewSet):
    queryset = models.Snippet.objects.all()
    serializer_class = bookSerializers.SnippetSerializer
