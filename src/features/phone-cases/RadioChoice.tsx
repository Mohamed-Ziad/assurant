import { Form } from "react-bootstrap";
import type { CSSProperties } from "react";

interface RadioChoiceProps {
  /** Unique on the whole page. It links the label to the input. */
  id: string;
  /** Choices with the same group name exclude each other. */
  groupName: string;
  label: string;
  className?: string;
  style?: CSSProperties;
}

export default function RadioChoice({ id, groupName, label, className, style }: RadioChoiceProps) {
  return (
    <Form.Check
      type="radio"
      id={id}
      name={groupName}
      label={label}
      className={className}
      style={style}
    />
  );
}
