import { COLORS } from "@/constants/colors";
import { ANSWER_TONES } from "./inspectionQuestions";
import type { AnswerOption } from "./types";

interface AnswerChoiceProps {
  questionId: string;
  option: AnswerOption;
  isSelected: boolean;
  onSelect: (value: string) => void;
}

/** One answer button of a question. It is outlined until picked, then filled with its tone color. */
export default function AnswerChoice({
  questionId,
  option,
  isSelected,
  onSelect,
}: AnswerChoiceProps) {
  const inputId = `${questionId}-${option.value}`;
  const { color, icon } = ANSWER_TONES[option.tone];

  return (
    <div>
      <input
        type="radio"
        className="btn-check"
        id={inputId}
        name={questionId}
        value={option.value}
        checked={isSelected}
        onChange={() => onSelect(option.value)}
      />
      <label
        htmlFor={inputId}
        className="btn btn-sm fw-semibold px-2 border-2"
        style={
          isSelected
            ? { background: color, borderColor: color, color: COLORS.white }
            : { background: COLORS.white, borderColor: COLORS.gray300, color }
        }
      >
        <span aria-hidden="true" className="me-1">
          {icon}
        </span>
        {option.label}
      </label>
    </div>
  );
}
