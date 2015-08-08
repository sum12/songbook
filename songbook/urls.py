from django.conf.urls import include, url
from django.contrib import admin

import book

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^book/', include('book.urls')),
]
