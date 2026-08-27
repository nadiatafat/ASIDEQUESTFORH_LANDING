from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import QuestResponse
from .serializers import QuestResponseSerializer


@api_view(["GET"])
def hello(request):
    """Endpoint minimal utilisé pour valider la communication front/back."""
    return Response({"message": "Hello, Speak Up 👋"})


class QuestResponseCreateView(generics.CreateAPIView):
    """Enregistre les réponses du parcours "Side Quest"."""

    queryset = QuestResponse.objects.all()
    serializer_class = QuestResponseSerializer
