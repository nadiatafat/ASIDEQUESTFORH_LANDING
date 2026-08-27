from django.urls import path

from . import views

urlpatterns = [
    path("hello/", views.hello, name="hello"),
    path("quest-responses/", views.QuestResponseCreateView.as_view(), name="quest-response-create"),
]
