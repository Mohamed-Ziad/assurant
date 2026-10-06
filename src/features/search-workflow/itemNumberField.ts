import * as Yup from "yup";
import type { SearchFieldConfig } from "./types";

export const ITEM_NUMBER_LENGTH = 9;

export const ITEM_NUMBER_FIELD: SearchFieldConfig = {
  name: "item",
  label: "Item number",
  placeholder: "927468125",
  digitsOnly: true,
  maxLength: ITEM_NUMBER_LENGTH,
};

/** Empty, or exactly 9 digits. */
export const itemNumberSchema = Yup.string().matches(
  new RegExp(`^$|^\\d{${ITEM_NUMBER_LENGTH}}$`),
  `Item number must be ${ITEM_NUMBER_LENGTH} digits`,
);
