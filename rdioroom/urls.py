from django.conf.urls import patterns, include, url
from queue import views
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'rdioroom.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^$', views.Queue.as_view(), name = "queue"),
    url(r'^admin/', include(admin.site.urls)),
)
