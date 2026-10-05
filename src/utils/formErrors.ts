import type { FormikErrors } from "formik";

/** Returns the error text of a field, or `undefined` when the field has no error. */
export function getFieldErrorMessage<Values>(
  errors: FormikErrors<Values>,
  fieldName: string,
): string | undefined {
  const error = (errors as Record<string, unknown>)[fieldName];
  return typeof error === "string" ? error : undefined;
}

/** Form-level error key used when no field-specific error applies. */
export const FORM_ERROR_KEY = "form";

/** Formik `validate` function: at least one text field must be filled. */
export function requireAtLeastOneField(values: Record<string, string>): Record<string, string> {
  const hasFilledField = Object.values(values).some(Boolean);
  return hasFilledField ? {} : { [FORM_ERROR_KEY]: "Fill at least one field" };
}
