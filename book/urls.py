from django.conf.urls import url, patterns
from book.views import SongPlayer


urlpatterns = patterns('', 
        url(r"$", SongPlayer.as_view()),
        )
