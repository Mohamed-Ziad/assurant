import * as Yup from "yup";
import {
  DEVICE_COLOR_FIELD,
  INSPECTION_QUESTIONS,
  QUESTION_IDS_BY_MODE,
} from "./inspectionQuestions";
import type { AnswerTone, InspectionFormValues, InspectionMode, InspectionQuestion } from "./types";

/** Number of questions plus the device color, which every mode asks last. */
const DEVICE_COLOR_QUESTION_COUNT = 1;

export function getQuestionsForMode(mode: InspectionMode): InspectionQuestion[] {
  const questionIds = QUESTION_IDS_BY_MODE[mode];
  if (questionIds === "all") return INSPECTION_QUESTIONS;

  return questionIds.flatMap((questionId) => {
    const question = INSPECTION_QUESTIONS.find(({ id }) => id === questionId);
    return question ? [question] : [];
  });
}

export function countFieldsForMode(mode: InspectionMode): number {
  return getQuestionsForMode(mode).length + DEVICE_COLOR_QUESTION_COUNT;
}

export function buildInitialValues(questions: InspectionQuestion[]): InspectionFormValues {
  const values: InspectionFormValues = { [DEVICE_COLOR_FIELD]: "" };

  for (const question of questions) {
    values[question.id] = "";
    if (question.followUp) values[question.followUp.fieldName] = [];
  }

  return values;
}

export function buildValidationSchema(questions: InspectionQuestion[]) {
  const shape: Record<string, Yup.Schema> = {
    [DEVICE_COLOR_FIELD]: Yup.string().required("Pick a color"),
  };

  for (const question of questions) {
    shape[question.id] = Yup.string().required("Pick an answer");

    if (question.followUp) {
      shape[question.followUp.fieldName] = Yup.array().when(question.id, {
        is: question.followUp.triggerValue,
        then: (schema) => schema.min(1, "Select at least one issue"),
        otherwise: (schema) => schema,
      });
    }
  }

  return Yup.object(shape);
}

/** The text answer stored in a form field, or an empty string when there is none. */
export function getTextValue(values: InspectionFormValues, fieldName: string): string {
  const value = values[fieldName];
  return typeof value === "string" ? value : "";
}

/** The values checked in a list field, or an empty list when there are none. */
export function getListValue(values: InspectionFormValues, fieldName: string): string[] {
  const value = values[fieldName];
  return Array.isArray(value) ? value : [];
}

/** The tone of the answer picked for a question, or `undefined` when it is not answered yet. */
export function getAnswerTone(
  question: InspectionQuestion,
  values: InspectionFormValues,
): AnswerTone | undefined {
  const answer = getTextValue(values, question.id);
  return question.options.find((option) => option.value === answer)?.tone;
}

export function countAnswersByTone(
  questions: InspectionQuestion[],
  values: InspectionFormValues,
): Record<AnswerTone, number> {
  const counts: Record<AnswerTone, number> = { pass: 0, minor: 0, fail: 0, unverified: 0 };

  for (const question of questions) {
    const tone = getAnswerTone(question, values);
    if (tone) counts[tone] += 1;
  }

  return counts;
}

export function countAnsweredFields(
  questions: InspectionQuestion[],
  values: InspectionFormValues,
): number {
  const answeredQuestions = questions.filter((question) =>
    getTextValue(values, question.id),
  ).length;
  const hasColor = getTextValue(values, DEVICE_COLOR_FIELD) ? 1 : 0;
  return answeredQuestions + hasColor;
}
