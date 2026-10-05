import { Form } from "react-bootstrap";
import type { FollowUp } from "./types";

interface FollowUpIssuesProps {
  followUp: FollowUp;
  selectedValues: string[];
  errorMessage?: string;
  onToggle: (value: string, isChecked: boolean) => void;
}

/** Checkboxes that describe what is wrong, shown after the "problem" answer is picked. */
export default function FollowUpIssues({
  followUp,
  selectedValues,
  errorMessage,
  onToggle,
}: FollowUpIssuesProps) {
  return (
    <div className="mt-3 p-2 px-3 rounded border border-danger-subtle bg-danger-subtle">
      <div className="text-danger text-uppercase fw-semibold small mb-1">{followUp.label}</div>

      {followUp.items.map((item) => (
        <Form.Check
          key={item.value}
          type="checkbox"
          id={`${followUp.fieldName}-${item.value}`}
          label={item.label}
          checked={selectedValues.includes(item.value)}
          onChange={(event) => onToggle(item.value, event.target.checked)}
        />
      ))}

      {errorMessage && <div className="text-danger small fw-semibold mt-1">{errorMessage}</div>}
    </div>
  );
}
