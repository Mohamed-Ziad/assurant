import type { SanitizeRules } from "@/utils/sanitizeFieldValue";

/** One text input of a search form. */
export interface SearchFieldConfig extends SanitizeRules {
  name: string;
  label: string;
  placeholder: string;
}

/** The text of every field, by field name. */
export type SearchFormValues = Record<string, string>;

export type SearchFormHandler = (values: SearchFormValues) => void;

/** Field values that the form fills in after a search. */
export type SearchResult = Partial<SearchFormValues> | void;

export type SearchHandler = (values: SearchFormValues) => Promise<SearchResult> | SearchResult;
