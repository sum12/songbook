from django.conf.urls import url, patterns, include
from book.views import SongPlayer, SongList, SnippetList
from rest_framework import routers

simple_router = routers.SimpleRouter()
simple_router.register(r'songs',SongList)
simple_router.register(r'snippets',SnippetList)
urlpatterns =  patterns('',
            url(r'',include(simple_router.urls)) ,
            url(r"^$", SongPlayer.as_view()),
            )


