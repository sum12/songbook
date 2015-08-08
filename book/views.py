from django.shortcuts import render
from django.views import TemplateView

from book import models

class SongPlayer(TemplateView):
    template_name = 'player.html'

    def get_context_data(self, **kwargs):
        context = super(SongPlayer, self).get_context_data(**kwargs)
        context.update({
            'songs' : models.Songs.objects.all()
            })
        return context
