"use client";

import * as Yup from "yup";
import { ITEM_NUMBER_FIELD, itemNumberSchema } from "@/features/search-workflow/itemNumberField";
import SearchWorkflowForm from "@/features/search-workflow/SearchWorkflowForm";
import type { SearchFieldConfig } from "@/features/search-workflow/types";

const IMEI_LENGTH = 15;

const ITEM_WORKFLOW_FIELDS: SearchFieldConfig[] = [
  ITEM_NUMBER_FIELD,
  { name: "invoice", label: "Invoice Number", placeholder: "INV-000123" },
  {
    name: "imei",
    label: "IMEI Number",
    placeholder: "490154203237518",
    digitsOnly: true,
    maxLength: IMEI_LENGTH,
  },
];

const itemWorkflowSchema = Yup.object({
  [ITEM_NUMBER_FIELD.name]: itemNumberSchema,
  invoice: Yup.string(),
  imei: Yup.string(),
});

export default function ItemWorkflowForm() {
  return (
    <SearchWorkflowForm
      title="Item Workflow"
      fields={ITEM_WORKFLOW_FIELDS}
      validationSchema={itemWorkflowSchema}
    />
  );
}
