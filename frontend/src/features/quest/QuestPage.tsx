import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ConsentToggle } from "./ConsentToggle";
import { NumberKeypad } from "./NumberKeypad";
import { TextQuestion } from "./TextQuestion";
import type { QuestAnswers } from "./types";
import { useQuestForm } from "./useQuestForm";

// step 0 = écran d'intro (pas de question). Les questions vont de 1 à QUESTION_COUNT.
const QUESTION_COUNT = 6;
const LAST_STEP = QUESTION_COUNT;

function isStepValid(step: number, answers: QuestAnswers): boolean {
  switch (step) {
    case 0:
      return true; // écran d'intro, rien à valider
    case 1:
      return answers.tellMeSomething.trim().length > 0;
    case 2:
      return answers.favoriteColor.trim().length > 0;
    case 3:
      return answers.completeWord.trim().length > 0;
    case 4:
      return answers.favoriteNumber.trim().length > 0;
    case 5:
      return answers.keepData !== null;
    case 6:
      return answers.createProfile !== null;
    default:
      return false;
  }
}

export function QuestPage() {
  const navigate = useNavigate();
  const { answers, updateField, submit, status } = useQuestForm();
  const [step, setStep] = useState(0);

  if (status === "success") {
    return (
      <div className="quest-welcome">
        <p className="quest-welcome__text">Welcome</p>
        <button type="button" className="quest-button" onClick={() => navigate("/home")}>
          Entrer sur le site
        </button>
      </div>
    );
  }

  const isIntro = step === 0;
  const isLastStep = step === LAST_STEP;
  const stepIsValid = isStepValid(step, answers);

  function handleContinue() {
    if (!stepIsValid) {
      return;
    }
    if (isLastStep) {
      submit();
    } else {
      setStep((current) => current + 1);
    }
  }

  return (
    <div className="quest-page">
      <header className="quest-header">
        <span>BY TERYRYTAFAT</span>
        <span>Contact Us</span>
      </header>

      {isIntro && (
        <div className="quest-intro" key="intro">
          <h1 className="quest-title">A SIDE QUEST</h1>
          <div className="quest-marks">
            <span>?</span>
            <span>Y</span>
            <span>?</span>
          </div>
        </div>
      )}

      {!isIntro && (
        <>
          <p className="quest-step-indicator">
            {step} / {QUESTION_COUNT}
          </p>

          <div className="quest-step" key={step}>
            {step === 1 && (
              <TextQuestion
                label="Tell me something:"
                value={answers.tellMeSomething}
                onChange={(value) => updateField("tellMeSomething", value)}
              />
            )}
            {step === 2 && (
              <TextQuestion
                label="What is your favorite color:"
                value={answers.favoriteColor}
                onChange={(value) => updateField("favoriteColor", value)}
              />
            )}
            {step === 3 && (
              <TextQuestion
                label="Complete:"
                value={answers.completeWord}
                onChange={(value) => updateField("completeWord", value)}
                suffix="ITY"
              />
            )}
            {step === 4 && (
              <NumberKeypad
                label="What is your favorite number:"
                value={answers.favoriteNumber}
                onChange={(value) => updateField("favoriteNumber", value)}
              />
            )}
            {step === 5 && (
              <ConsentToggle
                label="Can we keep the data for you?"
                value={answers.keepData}
                onChange={(value) => updateField("keepData", value)}
              />
            )}
            {step === 6 && (
              <ConsentToggle
                label="Can we create a profile for you?"
                value={answers.createProfile}
                onChange={(value) => updateField("createProfile", value)}
              />
            )}
          </div>
        </>
      )}

      <div className="quest-continue-wrapper">
        {status === "error" && (
          <p className="quest-error">Une erreur est survenue, réessayez.</p>
        )}
        <button
          type="button"
          className="quest-button quest-button--fixed"
          disabled={!stepIsValid || status === "submitting"}
          onClick={handleContinue}
        >
          {isLastStep ? (status === "submitting" ? "Envoi..." : "C'est parti") : "Continuer"}
        </button>
      </div>
    </div>
  );
}

