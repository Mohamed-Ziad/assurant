"use client";

import { useMemo, type ReactNode } from "react";
import { Formik } from "formik";
import type * as Yup from "yup";
import { requireAtLeastOneField } from "@/utils/formErrors";
import type { SearchFieldConfig, SearchFormValues, SearchHandler } from "./types";

export interface SearchFormProviderProps {
  fields: SearchFieldConfig[];
  validationSchema: Yup.AnyObjectSchema;
  /** Runs when the form is submitted. Field values it returns are filled into the form. */
  onSearch?: SearchHandler;
  children: ReactNode;
}

/**
 * Holds the values, validation and submit logic of a search form.
 * Anything inside it can read and change the form with `useFormikContext<SearchFormValues>()`.
 */
export default function SearchFormProvider({
  fields,
  validationSchema,
  onSearch,
  children,
}: SearchFormProviderProps) {
  const initialValues = useMemo<SearchFormValues>(
    () => Object.fromEntries(fields.map((field) => [field.name, ""])),
    [fields],
  );

  return (
    <Formik<SearchFormValues>
      initialValues={initialValues}
      validationSchema={validationSchema}
      validate={requireAtLeastOneField}
      onSubmit={async (values, { setFieldValue }) => {
        const filledValues = (await onSearch?.(values)) ?? {};

        for (const [fieldName, value] of Object.entries(filledValues)) {
          if (value !== undefined) await setFieldValue(fieldName, value);
        }
      }}
    >
      {() => children}
    </Formik>
  );
}
