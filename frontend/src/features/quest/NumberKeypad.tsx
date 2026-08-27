import { useState } from "react";

const DIGIT_ROWS = [
  ["1", "2", "3", "4"],
  ["5", "6", "7", "8", "9", "0"],
];
const OPERATOR_KEYS = ["+", "-", ".", "x", "="];

type Operator = "+" | "-" | "x";

function compute(a: number, b: number, operator: Operator): number {
  let result: number;
  switch (operator) {
    case "+":
      result = a + b;
      break;
    case "-":
      result = a - b;
      break;
    case "x":
      result = a * b;
      break;
  }
  // évite les erreurs d'arrondi flottant classiques (0.1 + 0.2 etc.)
  return Math.round(result * 1e6) / 1e6;
}

interface NumberKeypadProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export function NumberKeypad({ label, value, onChange }: NumberKeypadProps) {
  const [storedValue, setStoredValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<Operator | null>(null);
  const [waitingForNext, setWaitingForNext] = useState(false);

  function resetCalculator() {
    setStoredValue(null);
    setOperator(null);
    setWaitingForNext(false);
  }

  function pressDigit(digit: string) {
    if (waitingForNext || value === "") {
      onChange(digit === "." ? "0." : digit);
      setWaitingForNext(false);
      return;
    }
    onChange(value + digit);
  }

  function pressDecimal() {
    if (waitingForNext || value === "") {
      onChange("0.");
      setWaitingForNext(false);
      return;
    }
    if (!value.includes(".")) {
      onChange(value + ".");
    }
  }

  function pressOperator(nextOperator: Operator) {
    const current = parseFloat(value || "0");

    if (storedValue !== null && operator && !waitingForNext) {
      const result = compute(storedValue, current, operator);
      setStoredValue(result);
      onChange(String(result));
    } else {
      setStoredValue(current);
    }

    setOperator(nextOperator);
    setWaitingForNext(true);
  }

  function pressEquals() {
    if (storedValue === null || !operator) {
      return;
    }
    const current = parseFloat(value || "0");
    const result = compute(storedValue, current, operator);
    onChange(String(result));
    setStoredValue(null);
    setOperator(null);
    setWaitingForNext(true);
  }

  function pressKey(char: string) {
    if (char === ".") {
      pressDecimal();
    } else if (char === "=") {
      pressEquals();
    } else if (char === "+" || char === "-" || char === "x") {
      pressOperator(char);
    } else {
      pressDigit(char);
    }
  }

  function handleManualChange(newValue: string) {
    onChange(newValue);
    resetCalculator();
  }

  return (
    <div className="quest-question">
      <label className="quest-question__label">{label}</label>
      <div className="quest-keypad">
        <div className="quest-keypad__display">{value || "0"}</div>
        <div className="quest-keypad__grid">
          {DIGIT_ROWS.flat().map((char) => (
            <button
              key={char}
              type="button"
              className="quest-keypad__key"
              onClick={() => pressKey(char)}
            >
              {char}
            </button>
          ))}
          {OPERATOR_KEYS.map((char) => (
            <button
              key={char}
              type="button"
              className={`quest-keypad__key quest-keypad__key--operator ${char === "=" ? "quest-keypad__key--equals" : ""}`}
              onClick={() => pressKey(char)}
            >
              {char}
            </button>
          ))}
        </div>
        <div className="quest-keypad__else-row">
          <button
            type="button"
            className="quest-keypad__key quest-keypad__key--else"
            onClick={() => {
              onChange("");
              resetCalculator();
            }}
          >
            ELSE
          </button>
          <input
            type="text"
            className="quest-input"
            value={value}
            onChange={(event) => handleManualChange(event.target.value)}
            placeholder="ou tapez votre réponse ici"
          />
        </div>
      </div>
    </div>
  );
}
