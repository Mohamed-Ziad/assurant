const IMEI_LENGTH = 15;

/** Checks the IMEI length and its Luhn check digit. */
export function isValidImei(value: string): boolean {
  if (!/^\d{15}$/.test(value)) return false;

  let checksum = 0;
  for (let position = 0; position < IMEI_LENGTH; position++) {
    let digit = Number(value[position]);
    if (position % 2 === 1) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    checksum += digit;
  }

  return checksum % 10 === 0;
}
