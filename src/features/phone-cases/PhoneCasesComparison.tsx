"use client";

import { Form } from "react-bootstrap";
import StopwatchTimer from "@/components/ui/StopwatchTimer";
import { LEGACY_QUESTIONS, PHONE_CASE_COLORS, REDESIGNED_QUESTIONS } from "./phoneCaseQuestions";
import QuestionLabel from "./QuestionLabel";
import QuestionPanel from "./QuestionPanel";

const COLOR_SELECT_ID = "redesigned-device-color";

/** The current inspection form next to the redesigned one, to compare them. */
export default function PhoneCasesComparison() {
  return (
    <div>
      <StopwatchTimer />

      <div className="row">
        <div className="col-md-8">
          <QuestionPanel panelId="legacy" variant="legacy" questions={LEGACY_QUESTIONS} />
        </div>

        <div className="col-md-6">
          <QuestionPanel panelId="redesigned" variant="redesigned" questions={REDESIGNED_QUESTIONS}>
            <QuestionLabel variant="redesigned" htmlFor={COLOR_SELECT_ID}>
              Device color
            </QuestionLabel>
            <Form.Select id={COLOR_SELECT_ID} defaultValue="" className="w-50">
              <option value="" disabled>
                Select color
              </option>
              {PHONE_CASE_COLORS.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Form.Select>
          </QuestionPanel>
        </div>
      </div>
    </div>
  );
}
