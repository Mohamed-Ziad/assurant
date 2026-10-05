export interface ConditionalChecklist {
  /** Small caption above the checkboxes, such as "Just if No". */
  caption: string;
  items: string[];
}

export interface PhoneCaseQuestion {
  /** Unique within one panel. It names the radio group. */
  id: string;
  text: string;
  options: string[];
  checklist?: ConditionalChecklist;
}

/** The two layouts that are shown side by side: the current form and the redesigned one. */
export type PanelVariant = "legacy" | "redesigned";
