from rest_framework.serializers import ModelSerializer, SerializerMethodField, PrimaryKeyRelatedField
from rest_framework.reverse import reverse
from book import models

class SnippetSerializer(ModelSerializer):
    song = PrimaryKeyRelatedField(queryset=models.Song.objects.all())

#    def get_song_id (self, obj):
#        return obj.song.id

    class Meta:
        model = models.Snippet
        fields = ('id', 'start', 'end', 'song')



class SongSerializer(ModelSerializer):
    snippet_links = SerializerMethodField()
    snippet_set = SnippetSerializer(many=True)

    def get_snippet_links(self, obj):
        return dict([(snip.id, reverse('snippet-detail',kwargs={'pk':snip.id})) for snip in obj.snippet_set.all()])

    class Meta:
        model = models.Song
        fields = ('id', 'name','snippet_set', 'comment', 'type', 'snippet_links', 'path')


