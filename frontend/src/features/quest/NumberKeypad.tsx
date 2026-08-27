const KEYPAD_ROWS = [
  ["1", "2", "3", "4"],
  ["5", "6", "7", "8", "9", "0"],
  ["+", "-", ".", "x"],
];

interface NumberKeypadProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export function NumberKeypad({ label, value, onChange }: NumberKeypadProps) {
  function appendChar(char: string) {
    onChange(value + char);
  }

  return (
    <div className="quest-question">
      <label className="quest-question__label">{label}</label>
      <div className="quest-keypad">
        <div className="quest-keypad__grid">
          {KEYPAD_ROWS.map((row) =>
            row.map((char) => (
              <button
                key={char}
                type="button"
                className="quest-keypad__key"
                onClick={() => appendChar(char)}
              >
                {char}
              </button>
            )),
          )}
        </div>
        <div className="quest-keypad__else-row">
          <button
            type="button"
            className="quest-keypad__key quest-keypad__key--else"
            onClick={() => onChange("")}
          >
            ELSE
          </button>
          <input
            type="text"
            className="quest-input"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder="ou tapez votre réponse ici"
          />
        </div>
      </div>
    </div>
  );
}
