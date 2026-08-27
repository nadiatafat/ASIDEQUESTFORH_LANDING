import { apiPost } from "../../api/client";
import type { QuestAnswers } from "./types";

interface QuestResponsePayload {
  id: number;
  created_at: string;
}

/**
 * Envoie les réponses du quest au backend.
 * Les noms de champs sont convertis en snake_case pour matcher l'API Django.
 */
export async function submitQuestAnswers(answers: QuestAnswers): Promise<void> {
  await apiPost<QuestResponsePayload>("/api/quest-responses/", {
    tell_me_something: answers.tellMeSomething,
    favorite_color: answers.favoriteColor,
    complete_word: answers.completeWord,
    favorite_number: answers.favoriteNumber,
    keep_data: answers.keepData,
    create_profile: answers.createProfile,
  });
}
