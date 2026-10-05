"use client";

import { useMemo, type ReactNode } from "react";
import { Formik } from "formik";
import type * as Yup from "yup";
import { requireAtLeastOneField } from "@/utils/formErrors";
import type { SearchFieldConfig, SearchFormHandler, SearchFormValues } from "./types";

export interface SearchFormProviderProps {
  fields: SearchFieldConfig[];
  validationSchema: Yup.AnyObjectSchema;
  onSearch?: SearchFormHandler;
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
      onSubmit={(values, { setSubmitting }) => {
        onSearch?.(values);
        setSubmitting(false);
      }}
    >
      {() => children}
    </Formik>
  );
}
