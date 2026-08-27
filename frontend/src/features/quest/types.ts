export interface QuestAnswers {
  tellMeSomething: string;
  favoriteColor: string;
  completeWord: string;
  favoriteNumber: string;
  keepData: boolean | null;
  createProfile: boolean | null;
}

export const initialQuestAnswers: QuestAnswers = {
  tellMeSomething: "",
  favoriteColor: "",
  completeWord: "",
  favoriteNumber: "",
  keepData: null,
  createProfile: null,
};

/**
 * Le quiz est prêt à être soumis quand tous les champs texte sont
 * renseignés et que les deux choix de consentement ont été faits
 * explicitement (ni l'un ni l'autre ne doit rester à `null`).
 */
export function isQuestComplete(answers: QuestAnswers): boolean {
  return (
    answers.tellMeSomething.trim().length > 0 &&
    answers.favoriteColor.trim().length > 0 &&
    answers.completeWord.trim().length > 0 &&
    answers.favoriteNumber.trim().length > 0 &&
    answers.keepData !== null &&
    answers.createProfile !== null
  );
}

export const QUEST_COMPLETED_STORAGE_KEY = "speakup:quest-completed";

export function hasCompletedQuest(): boolean {
  return localStorage.getItem(QUEST_COMPLETED_STORAGE_KEY) === "true";
}

export function markQuestCompleted(): void {
  localStorage.setItem(QUEST_COMPLETED_STORAGE_KEY, "true");
}
