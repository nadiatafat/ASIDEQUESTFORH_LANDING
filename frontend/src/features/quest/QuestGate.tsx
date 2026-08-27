import { Navigate } from "react-router-dom";
import { QuestPage } from "./QuestPage";
import { hasCompletedQuest } from "./types";

/**
 * Point d'entrée "/" : affiche le Side Quest, sauf si la personne l'a
 * déjà complété sur cet appareil (flag mémorisé en localStorage).
 */
export function QuestGate() {
  if (hasCompletedQuest()) {
    return <Navigate to="/home" replace />;
  }

  return <QuestPage />;
}
