import { useState } from "react";
import { submitQuestAnswers } from "./api";
import { initialQuestAnswers, isQuestComplete, markQuestCompleted, type QuestAnswers } from "./types";

type SubmitStatus = "idle" | "submitting" | "error" | "success";

export function useQuestForm() {
  const [answers, setAnswers] = useState<QuestAnswers>(initialQuestAnswers);
  const [status, setStatus] = useState<SubmitStatus>("idle");

  function updateField<K extends keyof QuestAnswers>(field: K, value: QuestAnswers[K]) {
    setAnswers((prev) => ({ ...prev, [field]: value }));
  }

  async function submit() {
    if (!isQuestComplete(answers) || status === "submitting") {
      return;
    }

    setStatus("submitting");
    try {
      await submitQuestAnswers(answers);
      markQuestCompleted();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return {
    answers,
    updateField,
    submit,
    status,
    canSubmit: isQuestComplete(answers),
  };
}
