"use client";

import SearchFormCard, { type SearchFormCardProps } from "./SearchFormCard";
import SearchFormProvider, { type SearchFormProviderProps } from "./SearchFormProvider";

type SearchWorkflowFormProps = Omit<SearchFormProviderProps, "children"> & SearchFormCardProps;

/** A complete search form: its state and its card. */
export default function SearchWorkflowForm({
  validationSchema,
  onSearch,
  ...cardProps
}: SearchWorkflowFormProps) {
  return (
    <SearchFormProvider
      fields={cardProps.fields}
      validationSchema={validationSchema}
      onSearch={onSearch}
    >
      <SearchFormCard {...cardProps} />
    </SearchFormProvider>
  );
}
