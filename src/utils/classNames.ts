type ClassNameValue = string | false | null | undefined;

/** Joins the truthy class names into one `className` string. */
export function classNames(...classNameValues: ClassNameValue[]): string {
  return classNameValues.filter(Boolean).join(" ");
}
