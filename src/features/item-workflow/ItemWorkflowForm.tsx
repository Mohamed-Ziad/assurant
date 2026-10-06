"use client";

import { useState } from "react";
import * as Yup from "yup";
import { useClipboard } from "@/hooks/useClipboard";
import {
  ITEM_NUMBER_FIELD,
  ITEM_NUMBER_LENGTH,
  itemNumberSchema,
} from "@/features/search-workflow/itemNumberField";
import SearchWorkflowForm from "@/features/search-workflow/SearchWorkflowForm";
import type {
  SearchFieldConfig,
  SearchFormValues,
  SearchHandler,
} from "@/features/search-workflow/types";
import { mockText } from "@/utils/mockData";

const IMEI_LENGTH = 15;
const IMEI_FIELD_NAME = "imei";

const ITEM_WORKFLOW_FIELDS: SearchFieldConfig[] = [
  ITEM_NUMBER_FIELD,
  { name: "invoice", label: "Invoice number", placeholder: "INV-000123" },
  {
    name: IMEI_FIELD_NAME,
    label: "IMEI number",
    placeholder: "490154203237518",
    digitsOnly: true,
    maxLength: IMEI_LENGTH,
  },
];

const itemWorkflowSchema = Yup.object({
  [ITEM_NUMBER_FIELD.name]: itemNumberSchema,
  invoice: Yup.string(),
  [IMEI_FIELD_NAME]: Yup.string().matches(
    new RegExp(`^$|^\\d{${IMEI_LENGTH}}$`),
    `IMEI must be ${IMEI_LENGTH} digits`,
  ),
});

/**
 * Finds the item number. The IMEI or invoice is searched first, so an item number left in the
 * form from the last search does not hide the result of a new one. Replace with the real API call.
 */
function findItemNumber(values: SearchFormValues): string | undefined {
  const searchedText = values[IMEI_FIELD_NAME] || values.invoice;
  if (searchedText) return mockText(searchedText, ITEM_NUMBER_LENGTH);

  return values[ITEM_NUMBER_FIELD.name] || undefined;
}

export default function ItemWorkflowForm() {
  const { copy } = useClipboard();
  const [processedItem, setProcessedItem] = useState<string>();

  const searchItem: SearchHandler = async (values) => {
    const itemNumber = findItemNumber(values);
    if (!itemNumber) return;

    setProcessedItem(itemNumber);
    await copy(itemNumber, ITEM_NUMBER_FIELD.label);
    return { [ITEM_NUMBER_FIELD.name]: itemNumber };
  };

  return (
    <SearchWorkflowForm
      title="Item Workflow"
      fields={ITEM_WORKFLOW_FIELDS}
      validationSchema={itemWorkflowSchema}
      onSearch={searchItem}
      submitOnPasteInto={IMEI_FIELD_NAME}
      processedItem={processedItem}
      onDismissProcessedItem={() => setProcessedItem(undefined)}
    />
  );
}
