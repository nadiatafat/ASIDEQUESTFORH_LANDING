import { Navigate } from "react-router-dom";
import { hasCompletedQuest } from "../quest/types";
import { HomePage } from "./HomePage";

/**
 * Point d'entrée "/home" : accessible uniquement si le Side Quest a été
 * complété (accès obligatoire, cf. QuestGate).
 */
export function HomeGate() {
  if (!hasCompletedQuest()) {
    return <Navigate to="/" replace />;
  }

  return <HomePage />;
}
