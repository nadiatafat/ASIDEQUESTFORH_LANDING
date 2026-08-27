interface ConsentToggleProps {
  label: string;
  value: boolean | null;
  onChange: (value: boolean) => void;
}

export function ConsentToggle({ label, value, onChange }: ConsentToggleProps) {
  return (
    <div className="quest-consent">
      <span className="quest-consent__label">{label}</span>
      <div className="quest-consent__buttons">
        <button
          type="button"
          className={`quest-pill quest-pill--yes ${value === true ? "quest-pill--active" : ""}`}
          onClick={() => onChange(true)}
        >
          YES
        </button>
        <button
          type="button"
          className={`quest-pill quest-pill--no ${value === false ? "quest-pill--active" : ""}`}
          onClick={() => onChange(false)}
        >
          NO
        </button>
      </div>
    </div>
  );
}
