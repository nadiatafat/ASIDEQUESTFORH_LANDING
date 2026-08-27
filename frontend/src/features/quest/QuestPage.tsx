import { useNavigate } from "react-router-dom";
import { ConsentToggle } from "./ConsentToggle";
import { NumberKeypad } from "./NumberKeypad";
import { TextQuestion } from "./TextQuestion";
import { useQuestForm } from "./useQuestForm";

export function QuestPage() {
  const navigate = useNavigate();
  const { answers, updateField, submit, status, canSubmit } = useQuestForm();

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

  return (
    <div className="quest-page">
      <header className="quest-header">
        <span>BY TERYRYTAFAT</span>
        <span>Contact Us</span>
      </header>

      <h1 className="quest-title">A SIDE QUEST</h1>
      <div className="quest-marks">
        <span>?</span>
        <span>Y</span>
        <span>?</span>
      </div>

      <TextQuestion
        label="Tell me something:"
        value={answers.tellMeSomething}
        onChange={(value) => updateField("tellMeSomething", value)}
      />

      <TextQuestion
        label="What is your favorite color:"
        value={answers.favoriteColor}
        onChange={(value) => updateField("favoriteColor", value)}
      />

      <TextQuestion
        label="Complete:"
        value={answers.completeWord}
        onChange={(value) => updateField("completeWord", value)}
        suffix="ITY"
      />

      <NumberKeypad
        label="What is your favorite number:"
        value={answers.favoriteNumber}
        onChange={(value) => updateField("favoriteNumber", value)}
      />

      <ConsentToggle
        label="Can we keep the data for you?"
        value={answers.keepData}
        onChange={(value) => updateField("keepData", value)}
      />

      <ConsentToggle
        label="Can we create a profile for you?"
        value={answers.createProfile}
        onChange={(value) => updateField("createProfile", value)}
      />

      <div className="quest-submit">
        <button type="button" className="quest-button" disabled={!canSubmit} onClick={submit}>
          {status === "submitting" ? "Envoi..." : "C'est parti"}
        </button>
        {status === "error" && (
          <p className="quest-error">
            Une erreur est survenue, réessayez.
          </p>
        )}
      </div>
    </div>
  );
}
