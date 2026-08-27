interface TextQuestionProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  suffix?: string;
}

export function TextQuestion({ label, value, onChange, suffix }: TextQuestionProps) {
  return (
    <div className="quest-question">
      <label className="quest-question__label">{label}</label>
      <div className="quest-question__input-group">
        <input
          type="text"
          className="quest-input"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
        {suffix && <span className="quest-question__suffix">{suffix}</span>}
      </div>
    </div>
  );
}
