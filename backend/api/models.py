from django.db import models


class QuestResponse(models.Model):
    """
    Réponses au parcours "Side Quest" affiché avant l'accès au site.

    Si `keep_data` est False, les champs de réponse personnelle
    (tell_me_something, favorite_color, complete_word, favorite_number)
    sont vidés avant sauvegarde : seul le fait d'avoir complété le quest
    et les deux choix de consentement sont conservés.
    """

    tell_me_something = models.TextField(blank=True)
    favorite_color = models.CharField(max_length=100, blank=True)
    complete_word = models.CharField(max_length=100, blank=True)
    favorite_number = models.CharField(max_length=50, blank=True)

    keep_data = models.BooleanField()
    create_profile = models.BooleanField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f"QuestResponse #{self.pk} ({self.created_at:%Y-%m-%d %H:%M})"
