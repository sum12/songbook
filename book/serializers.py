from rest_framework.serializers import ModelSerializer, SerializerMethodField
from rest_framework.reverse import reverse
from book import models

class SongSerializer(ModelSerializer):

    snippet_links = SerializerMethodField()
    snippets = SerializerMethodField()

    def get_snippets(self, obj):
        return obj.snippet_set.all().values()

    def get_snippet_links(self, obj):
        return dict([(snip.id, reverse('snippet-detail',kwargs={'pk':snip.id})) for snip in obj.snippet_set.all()])

    class Meta:
        model = models.Song
        fields = ('id', 'name', 'type', 'snippet_links', 'snippets')


class SnippetSerializer(ModelSerializer):
    song_link = SerializerMethodField()

    def get_song_link (self, obj):
        return reverse("song-detail",kwargs={'pk':obj.song_id})

    class Meta:
        model = models.Snippet
        fields = ('id', 'start', 'end', 'song_link')
