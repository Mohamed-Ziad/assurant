export interface SanitizeRules {
  /** Keep digits only, dropping every other character. */
  digitsOnly?: boolean;
  /** Remove all whitespace. Ignored when `digitsOnly` is set. */
  stripWhitespace?: boolean;
  /** Cut the value to this many characters. */
  maxLength?: number;
}

/** Cleans text typed or pasted into an identifier field (item number, IMEI, tracking number...). */
export function sanitizeFieldValue(rawValue: string, rules: SanitizeRules): string {
  let value = rawValue.trim();

  if (rules.digitsOnly) {
    value = value.replace(/\D/g, "");
  } else if (rules.stripWhitespace) {
    value = value.replace(/\s/g, "");
  }

  if (rules.maxLength) {
    value = value.slice(0, rules.maxLength);
  }

  return value;
}
