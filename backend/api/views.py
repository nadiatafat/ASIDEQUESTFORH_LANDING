from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(["GET"])
def hello(request):
    """Endpoint minimal utilisé pour valider la communication front/back."""
    return Response({"message": "A SIDE QUEST FOR HUMANITY 🌱"})
