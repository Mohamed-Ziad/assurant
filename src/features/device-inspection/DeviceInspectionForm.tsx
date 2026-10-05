"use client";

import { useMemo, useState } from "react";
import { Formik, Form as FormikForm } from "formik";
import { Button, ButtonGroup, Card, Container, ProgressBar } from "react-bootstrap";
import { COLORS } from "@/constants/colors";
import { getFieldErrorMessage } from "@/utils/formErrors";
import { showSuccessToast } from "@/utils/toast";
import AnswerChoice from "./AnswerChoice";
import DeviceColorRow from "./DeviceColorRow";
import FollowUpIssues from "./FollowUpIssues";
import InspectionRow from "./InspectionRow";
import InspectionSummaryBar from "./InspectionSummaryBar";
import {
  buildInitialValues,
  buildValidationSchema,
  countAnsweredFields,
  countAnswersByTone,
  countFieldsForMode,
  getAnswerTone,
  getListValue,
  getQuestionsForMode,
  getTextValue,
} from "./inspectionForm";
import { ANSWER_TONES, DEVICE_COLOR_FIELD, INSPECTION_MODES } from "./inspectionQuestions";
import type { InspectionFormValues, InspectionMode, InspectionSubmission } from "./types";

interface DeviceInspectionFormProps {
  defaultMode?: InspectionMode;
  onSubmit?: (submission: InspectionSubmission) => void;
}

export default function DeviceInspectionForm({
  defaultMode = "BDP",
  onSubmit,
}: DeviceInspectionFormProps) {
  const [mode, setMode] = useState<InspectionMode>(defaultMode);
  const questions = useMemo(() => getQuestionsForMode(mode), [mode]);
  const initialValues = useMemo(() => buildInitialValues(questions), [questions]);
  const validationSchema = useMemo(() => buildValidationSchema(questions), [questions]);

  return (
    <Container className="pt-4" style={{ maxWidth: 900, paddingBottom: 100 }}>
      <div className="d-flex justify-content-between align-items-end flex-wrap gap-3 mb-3">
        <div>
          <div className="text-uppercase text-muted fw-semibold small">Inspection</div>
          <h4 className="fw-bold mb-0">Device Check</h4>
        </div>

        <ButtonGroup size="sm">
          {INSPECTION_MODES.map((inspectionMode) => (
            <Button
              key={inspectionMode}
              variant={inspectionMode === mode ? "dark" : "outline-secondary"}
              className="fw-semibold px-3"
              onClick={() => setMode(inspectionMode)}
            >
              {inspectionMode}{" "}
              <span className="opacity-75 font-monospace">
                {countFieldsForMode(inspectionMode)}
              </span>
            </Button>
          ))}
        </ButtonGroup>
      </div>

      {/* The key resets the form whenever the mode (and so the question set) changes. */}
      <Formik<InspectionFormValues>
        key={mode}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          onSubmit?.({ mode, questionIds: questions.map(({ id }) => id), ...values });
          showSuccessToast("Device inspected");
          setSubmitting(false);
        }}
      >
        {({ values, errors, submitCount, setFieldValue }) => {
          const shouldShowErrors = submitCount > 0;
          const errorMessageOf = (fieldName: string) =>
            shouldShowErrors ? getFieldErrorMessage(errors, fieldName) : undefined;

          const totalFieldCount = questions.length + 1;
          const answeredCount = countAnsweredFields(questions, values);

          return (
            <FormikForm noValidate>
              <div className="d-flex align-items-center gap-3 mb-3">
                <ProgressBar
                  now={(answeredCount / totalFieldCount) * 100}
                  className="flex-grow-1"
                  style={{ height: 6 }}
                />
                <span className="fw-semibold small font-monospace text-nowrap">
                  {answeredCount} / {totalFieldCount}
                </span>
              </div>

              <Card className="shadow-sm overflow-hidden">
                {questions.map((question, index) => {
                  const answerTone = getAnswerTone(question, values);
                  const errorMessage = errorMessageOf(question.id);
                  const { followUp } = question;

                  return (
                    <InspectionRow
                      key={question.id}
                      number={index + 1}
                      isAnswered={Boolean(answerTone)}
                      accentColor={
                        errorMessage ? COLORS.danger : answerTone && ANSWER_TONES[answerTone].color
                      }
                      hasError={Boolean(errorMessage)}
                    >
                      <div className="fw-bold">{question.title}</div>
                      {question.subtitle && (
                        <div className="text-muted small">{question.subtitle}</div>
                      )}

                      <div className="d-flex flex-wrap gap-2 mt-2">
                        {question.options.map((option) => (
                          <AnswerChoice
                            key={option.value}
                            questionId={question.id}
                            option={option}
                            isSelected={getTextValue(values, question.id) === option.value}
                            onSelect={(value) => {
                              setFieldValue(question.id, value);
                              if (followUp && value !== followUp.triggerValue) {
                                setFieldValue(followUp.fieldName, []);
                              }
                            }}
                          />
                        ))}
                      </div>

                      {followUp && getTextValue(values, question.id) === followUp.triggerValue && (
                        <FollowUpIssues
                          followUp={followUp}
                          selectedValues={getListValue(values, followUp.fieldName)}
                          errorMessage={errorMessageOf(followUp.fieldName)}
                          onToggle={(value, isChecked) => {
                            const selectedValues = getListValue(values, followUp.fieldName);
                            setFieldValue(
                              followUp.fieldName,
                              isChecked
                                ? [...selectedValues, value]
                                : selectedValues.filter((selected) => selected !== value),
                            );
                          }}
                        />
                      )}

                      {errorMessage && (
                        <div className="text-danger small fw-semibold mt-2">✕ {errorMessage}</div>
                      )}
                    </InspectionRow>
                  );
                })}

                <DeviceColorRow
                  number={questions.length + 1}
                  selectedColor={getTextValue(values, DEVICE_COLOR_FIELD)}
                  errorMessage={errorMessageOf(DEVICE_COLOR_FIELD)}
                  onChange={(color) => setFieldValue(DEVICE_COLOR_FIELD, color)}
                />
              </Card>

              <InspectionSummaryBar
                answeredCount={answeredCount}
                countsByTone={countAnswersByTone(questions, values)}
              />
            </FormikForm>
          );
        }}
      </Formik>
    </Container>
  );
}
