"use client";

import { useFormikContext } from "formik";
import * as Yup from "yup";
import { useClipboard } from "@/hooks/useClipboard";
import { ITEM_NUMBER_FIELD, itemNumberSchema } from "@/features/search-workflow/itemNumberField";
import SearchFormCard from "@/features/search-workflow/SearchFormCard";
import SearchFormProvider from "@/features/search-workflow/SearchFormProvider";
import type { SearchFieldConfig, SearchFormValues } from "@/features/search-workflow/types";
import { showSuccessToast } from "@/utils/toast";
import CartonTradesTable from "./CartonTradesTable";
import { MOCK_CARTON, type CartonTrade } from "./cartonTrades";

const TRACKING_FIELD_NAME = "tracking";
const IMEI_OR_ESN_MAX_LENGTH = 18;

/** IMEI = 15 digits, ESN = 8 hex or 11 digits, MEID = 14 hex. */
const IMEI_OR_ESN_PATTERN = /^$|^\d{15}$|^[0-9A-Fa-f]{8}$|^\d{11}$|^[0-9A-Fa-f]{14}$/;

const FIELDS: SearchFieldConfig[] = [
  {
    name: TRACKING_FIELD_NAME,
    label: "Tracking #",
    placeholder: "1Z999AA10123456784",
    stripWhitespace: true,
  },
  ITEM_NUMBER_FIELD,
  {
    name: "invoice",
    label: "Invoice # / Quote #",
    placeholder: "INV-000123",
    stripWhitespace: true,
  },
  {
    name: "imei",
    label: "IMEI / ESN",
    placeholder: "490154203237518",
    stripWhitespace: true,
    maxLength: IMEI_OR_ESN_MAX_LENGTH,
  },
];

const validationSchema = Yup.object({
  [TRACKING_FIELD_NAME]: Yup.string(),
  [ITEM_NUMBER_FIELD.name]: itemNumberSchema,
  invoice: Yup.string(),
  imei: Yup.string().matches(IMEI_OR_ESN_PATTERN, "Enter a valid IMEI or ESN"),
});

/** Shows the carton's trades once a tracking number is entered. Receive fills in and copies the item number. */
function CartonTradesPanel() {
  const { values, setFieldValue } = useFormikContext<SearchFormValues>();
  const { copy } = useClipboard();

  // Replace with the real lookup by tracking number.
  const carton = values[TRACKING_FIELD_NAME] ? MOCK_CARTON : null;
  if (!carton) return null;

  const receiveTrade = async ({ itemNumber }: CartonTrade) => {
    void setFieldValue(ITEM_NUMBER_FIELD.name, itemNumber);
    if (await copy(itemNumber, ITEM_NUMBER_FIELD.name)) showSuccessToast(`${itemNumber} copied`);
  };

  return <CartonTradesTable carton={carton} onReceive={receiveTrade} />;
}

export default function CartonWorkflowView() {
  return (
    <SearchFormProvider fields={FIELDS} validationSchema={validationSchema}>
      <div className="row">
        <div className="col-md-4">
          <SearchFormCard title="Carton Workflow" fields={FIELDS} />
        </div>
        <div className="col-md-8">
          <CartonTradesPanel />
        </div>
      </div>
    </SearchFormProvider>
  );
}
