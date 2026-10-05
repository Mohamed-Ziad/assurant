import type { CSSProperties } from "react";
import { Form } from "react-bootstrap";
import QuestionLabel from "./QuestionLabel";
import RadioChoice from "./RadioChoice";
import type { PanelVariant, PhoneCaseQuestion } from "./types";

interface ChoiceStyle {
  className: string;
  style?: CSSProperties;
}

const CHOICE_STYLES: Record<PanelVariant, ChoiceStyle> = {
  legacy: { className: "me-2" },
  redesigned: { className: "text-muted me-1", style: { fontSize: 14 } },
};

interface QuestionBlockProps {
  /** Makes the radio names and ids unique when several panels are on one page. */
  panelId: string;
  question: PhoneCaseQuestion;
  variant: PanelVariant;
}

/** One question with its radio choices and, when it has one, the checklist for a "No" answer. */
export default function QuestionBlock({ panelId, question, variant }: QuestionBlockProps) {
  const { id, text, options, checklist } = question;
  const { className: choiceClassName, style: choiceStyle } = CHOICE_STYLES[variant];
  const groupName = `${panelId}-${id}`;
  const questionLabelId = `${groupName}-label`;

  return (
    <>
      <QuestionLabel variant={variant} id={questionLabelId}>
        {text}
      </QuestionLabel>

      <div className="d-flex" role="radiogroup" aria-labelledby={questionLabelId}>
        {options.map((option, optionIndex) => (
          <RadioChoice
            key={option}
            id={`${groupName}-${optionIndex}`}
            groupName={groupName}
            label={option}
            className={choiceClassName}
            style={choiceStyle}
          />
        ))}
      </div>

      {checklist && (
        <div className="mb-2">
          <small className="text-muted d-block">{checklist.caption}</small>
          {checklist.items.map((item, itemIndex) => (
            <Form.Check
              key={item}
              type="checkbox"
              id={`${groupName}-checklist-${itemIndex}`}
              label={item}
            />
          ))}
        </div>
      )}
    </>
  );
}
