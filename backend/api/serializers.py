from rest_framework import serializers

from .models import QuestResponse


class QuestResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestResponse
        fields = [
            "id",
            "tell_me_something",
            "favorite_color",
            "complete_word",
            "favorite_number",
            "keep_data",
            "create_profile",
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]

    def create(self, validated_data):
        # Si la personne ne souhaite pas que ses données soient conservées,
        # on ne persiste que les choix de consentement, pas les réponses.
        if not validated_data.get("keep_data", False):
            validated_data["tell_me_something"] = ""
            validated_data["favorite_color"] = ""
            validated_data["complete_word"] = ""
            validated_data["favorite_number"] = ""
        return super().create(validated_data)
