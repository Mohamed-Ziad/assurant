export type AnswerTone = "pass" | "fail" | "minor" | "unverified";

export interface AnswerOption {
  value: string;
  label: string;
  tone: AnswerTone;
}

/** Extra checkboxes that appear under a question when a certain answer is picked. */
export interface FollowUp {
  /** The answer that makes the checkboxes appear. */
  triggerValue: string;
  label: string;
  /** Form field that stores the checked values. */
  fieldName: string;
  items: { value: string; label: string }[];
}

export interface InspectionQuestion {
  id: string;
  title: string;
  subtitle?: string;
  options: AnswerOption[];
  followUp?: FollowUp;
}

export type InspectionMode = "BDP" | "NTO" | "SRC" | "ALL";

export interface DeviceColor {
  value: string;
  label: string;
  hex: string;
}

/**
 * Values of the inspection form: one answer per question id, the checked follow-up values
 * as lists, and the device color.
 */
export type InspectionFormValues = Record<string, string | string[]>;

export interface InspectionSubmission extends InspectionFormValues {
  mode: InspectionMode;
  questionIds: string[];
}
