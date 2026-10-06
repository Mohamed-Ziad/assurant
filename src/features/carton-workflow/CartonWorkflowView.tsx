"use client";

import { useState } from "react";
import { useFormikContext } from "formik";
import * as Yup from "yup";
import { useClipboard } from "@/hooks/useClipboard";
import { ITEM_NUMBER_FIELD, itemNumberSchema } from "@/features/search-workflow/itemNumberField";
import SearchFormCard from "@/features/search-workflow/SearchFormCard";
import SearchFormProvider from "@/features/search-workflow/SearchFormProvider";
import type { SearchFieldConfig, SearchFormValues } from "@/features/search-workflow/types";
import CartonTradesTable from "./CartonTradesTable";
import { findCarton, type CartonTrade } from "./cartonTrades";

const TRACKING_FIELD_NAME = "tracking";
const IMEI_OR_ESN_MAX_LENGTH = 18;

/** IMEI = 15 digits, ESN = 8 hex or 11 digits, MEID = 14 hex. */
const IMEI_OR_ESN_PATTERN = /^$|^\d{15}$|^[0-9A-Fa-f]{8}$|^\d{11}$|^[0-9A-Fa-f]{14}$/;

/** The tracking number comes first because it is what the technician starts with. */
const FIELDS: SearchFieldConfig[] = [
  {
    name: TRACKING_FIELD_NAME,
    label: "Tracking number",
    placeholder: "1Z999AA10123456784",
    stripWhitespace: true,
  },
  ITEM_NUMBER_FIELD,
  {
    name: "invoice",
    label: "Invoice / Quote number",
    placeholder: "INV-000123",
    stripWhitespace: true,
  },
  {
    name: "imei",
    label: "IMEI / ESN number",
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

interface CartonTradesPanelProps {
  /** The tracking number that was searched. The trades are hidden while the field shows another one. */
  searchedTracking?: string;
  onReceived: (itemNumber: string) => void;
}

/** The trades of the searched carton. Receiving a trade fills in its item number and copies it. */
function CartonTradesPanel({ searchedTracking, onReceived }: CartonTradesPanelProps) {
  const { values, setFieldValue } = useFormikContext<SearchFormValues>();
  const { copy } = useClipboard();

  if (searchedTracking === undefined || searchedTracking !== values[TRACKING_FIELD_NAME]) {
    return null;
  }

  const receiveTrade = async ({ itemNumber }: CartonTrade) => {
    void setFieldValue(ITEM_NUMBER_FIELD.name, itemNumber);
    onReceived(itemNumber);
    await copy(itemNumber, ITEM_NUMBER_FIELD.label);
  };

  return <CartonTradesTable carton={findCarton(searchedTracking)} onReceive={receiveTrade} />;
}

/** The search form on the left. After a tracking number is searched, the carton's trades show on the right. */
export default function CartonWorkflowView() {
  const [searchedTracking, setSearchedTracking] = useState<string>();
  const [processedItem, setProcessedItem] = useState<string>();

  return (
    <SearchFormProvider
      fields={FIELDS}
      validationSchema={validationSchema}
      onSearch={(values) => setSearchedTracking(values[TRACKING_FIELD_NAME] || undefined)}
    >
      <div className="row">
        <div className="col-lg-4">
          <SearchFormCard
            title="Carton Workflow"
            fields={FIELDS}
            submitOnPasteInto={TRACKING_FIELD_NAME}
            processedItem={processedItem}
            onDismissProcessedItem={() => setProcessedItem(undefined)}
          />
        </div>
        <div className="col-lg-8">
          <CartonTradesPanel searchedTracking={searchedTracking} onReceived={setProcessedItem} />
        </div>
      </div>
    </SearchFormProvider>
  );
}
