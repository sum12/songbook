from django.shortcuts import render
from django.views.generic.base import TemplateView

from book import models

class SongPlayer(TemplateView):
    template_name = 'book/player.html'

    def get_context_data(self, **kwargs):
        context = super(SongPlayer, self).get_context_data(**kwargs)
        context.update({
            'songs' : models.Song.objects.all()
            })
        return context
