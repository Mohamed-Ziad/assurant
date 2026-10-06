"use client";

import { useEffect, useRef } from "react";
import { Form as FormikForm, useFormikContext } from "formik";
import { Button, Card } from "react-bootstrap";
import ClipboardField from "@/components/ui/ClipboardField";
import { COLORS } from "@/constants/colors";
import { FORM_ERROR_KEY, getFieldErrorMessage } from "@/utils/formErrors";
import { sanitizeFieldValue } from "@/utils/sanitizeFieldValue";
import ProcessedItemBanner from "./ProcessedItemBanner";
import type { SearchFieldConfig, SearchFormHandler, SearchFormValues } from "./types";

export interface SearchFormCardProps {
  title: string;
  fields: SearchFieldConfig[];
  /** When set, a green alert at the top of the card says that this item was processed. */
  processedItem?: string;
  onDismissProcessedItem?: () => void;
  /** Name of a field that submits the form as soon as the technician pastes into it. */
  submitOnPasteInto?: string;
  onRevert?: SearchFormHandler;
  onReinspect?: SearchFormHandler;
  onLookup?: SearchFormHandler;
}

/**
 * A card with one copy/paste text input per field, a Search button and the item actions.
 * It must be inside a `SearchFormProvider`.
 */
export default function SearchFormCard({
  title,
  fields,
  processedItem,
  onDismissProcessedItem,
  submitOnPasteInto,
  onRevert,
  onReinspect,
  onLookup,
}: SearchFormCardProps) {
  const { values, errors, submitCount, setFieldValue, resetForm, submitForm } =
    useFormikContext<SearchFormValues>();

  // A pasted value reaches the form on the next render, so the submit waits for it.
  const shouldSubmitRef = useRef(false);

  useEffect(() => {
    if (!shouldSubmitRef.current) return;
    shouldSubmitRef.current = false;
    void submitForm();
  }, [values, submitForm]);

  const submitAfterPaste = (fieldName: string, pastedValue: string) => {
    if (fieldName !== submitOnPasteInto || !pastedValue) return;

    if (pastedValue === values[fieldName]) void submitForm();
    else shouldSubmitRef.current = true;
  };

  const shouldShowErrors = submitCount > 0;
  const formErrorMessage = getFieldErrorMessage(errors, FORM_ERROR_KEY);

  return (
    <Card className="shadow-sm overflow-hidden">
      {processedItem && (
        <ProcessedItemBanner
          itemNumber={processedItem}
          onClose={() => onDismissProcessedItem?.()}
        />
      )}

      <Card.Body className="p-4">
        <h4 className="fw-bold mb-3">{title}</h4>

        <FormikForm noValidate>
          {fields.map((field) => (
            <ClipboardField
              key={field.name}
              name={field.name}
              label={field.label}
              value={values[field.name]}
              placeholder={field.placeholder}
              isNumeric={field.digitsOnly}
              errorMessage={shouldShowErrors ? getFieldErrorMessage(errors, field.name) : undefined}
              sanitize={(rawValue) => sanitizeFieldValue(rawValue, field)}
              onValueChange={(value) => setFieldValue(field.name, value)}
              onPasted={(pastedValue) => submitAfterPaste(field.name, pastedValue)}
            />
          ))}

          {shouldShowErrors && formErrorMessage && (
            <div className="small mb-2" style={{ color: COLORS.danger }}>
              {formErrorMessage}
            </div>
          )}

          <div className="d-flex align-items-center gap-3 mt-4">
            <Button type="submit" variant="primary" className="fw-bold px-4">
              Search
            </Button>
            <Button
              variant="link"
              className="text-secondary fw-semibold text-decoration-none p-0"
              onClick={() => resetForm()}
            >
              Clear
            </Button>
          </div>

          <div className="d-flex flex-wrap gap-2 border-top mt-4 pt-3">
            <Button
              variant="outline-secondary"
              size="sm"
              className="fw-semibold"
              onClick={() => onRevert?.(values)}
            >
              Revert to Receipt
            </Button>
            <Button
              variant="outline-secondary"
              size="sm"
              className="fw-semibold"
              onClick={() => onReinspect?.(values)}
            >
              Re-inspect
            </Button>
            <Button
              variant="outline-secondary"
              size="sm"
              className="fw-semibold"
              onClick={() => onLookup?.(values)}
            >
              Item Lookup
            </Button>
          </div>
        </FormikForm>
      </Card.Body>
    </Card>
  );
}
