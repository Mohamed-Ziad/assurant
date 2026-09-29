"use client";
import { useMemo, useState } from "react";
import { Formik, Form as FormikForm } from "formik";
import * as Yup from "yup";
import { Container, Card, Form, Button, ButtonGroup, Badge, ProgressBar } from "react-bootstrap";
// Make sure Bootstrap CSS is imported once in your app:
// import "bootstrap/dist/css/bootstrap.min.css";

/* ---------------- Data ---------------- */

// Which questions each mode shows (question ids). The color select is always shown at the end.
const MODES : any = {
  BDP: ["power", "actlock", "screenOn", "ports", "charge"],
  NTO: ["power"],
  SRC: ["power", "actlock", "screenOn", "charge"],
  ALL: "all",
};

// Tones: every tone has its own color AND its own icon,
// so answers are readable without relying on color (color-blind / low vision).
const TONES: any = {
  good:  { color: "#15803d", icon: "✓", name: "Pass" },        // green
  bad:   { color: "#b91c1c", icon: "✕", name: "Fail" },        // red
  minor: { color: "#1d4ed8", icon: "!", name: "Minor" },       // blue (instead of yellow)
  unv:   { color: "#4b5563", icon: "?", name: "Unverified" },  // gray
};

const YNU: any = [
  { value: "yes", label: "Yes", tone: "good" },
  { value: "no", label: "No", tone: "bad" },
  { value: "unv", label: "Unverified", tone: "unv" },
];

const QUESTIONS = [
  { id: "power", title: "Powers on", sub: "Does the device turn on?", options: YNU },
  { id: "actlock", title: "Activation lock cleared", sub: "Customer activation lock removed", options: YNU },
  { id: "screenOn", title: "Screen turns on", options: YNU },
  {
    id: "cracks", title: "Screen free of cracks",
    options: [
      { value: "yes", label: "Yes, no cracks", tone: "good" },
      { value: "major", label: "Major cracks", tone: "bad" },
      { value: "minor", label: "Minor cracks", tone: "minor" },
      { value: "unv", label: "Unverified", tone: "unv" },
    ],
  },
  {
    id: "burnin", title: "Screen free of bruising / burn-in",
    options: [
      { value: "yes", label: "Yes, clean", tone: "good" },
      { value: "major", label: "Major burn-in", tone: "bad" },
      { value: "minor", label: "Minor burn-in", tone: "minor" },
      { value: "unv", label: "Unverified", tone: "unv" },
    ],
  },
  {
    id: "surfaces", title: "Surfaces perfect", sub: "Scratches or scuff marks",
    options: [
      { value: "yes", label: "Yes, perfect", tone: "good" },
      { value: "light", label: "Small / light scratches", tone: "minor" },
      { value: "heavy", label: "Large / heavy scratches", tone: "bad" },
      { value: "unv", label: "Unverified", tone: "unv" },
    ],
  },
  {
    id: "ports", title: "Connectors / ports / covers perfect", options: YNU,
    followUp: {
      when: "no",
      label: "What's wrong?",
      items: [
        { value: "damaged", label: "Damaged connectors" },
        { value: "sim", label: "SIM tray missing or damaged" },
        { value: "parts", label: "Missing parts" },
      ],
    },
  },
  {
    id: "battery", title: "Battery health",
    options: [
      { value: "ok", label: "≥ 70%", tone: "good" },
      { value: "low", label: "< 70%", tone: "bad" },
      { value: "unv", label: "Unverified", tone: "unv" },
    ],
  },
  { id: "audio", title: "Speaker & microphone work", options: YNU },
  { id: "charge", title: "Takes a charge", options: YNU },
  { id: "buttons", title: "Exterior buttons work", sub: "Home, volume, mute, keypad", options: YNU },
  { id: "pixels", title: "Fewer than 3 dead pixels", options: YNU },
  { id: "frontCam", title: "Front camera works", options: YNU },
  { id: "rearCam", title: "Rear camera works", options: YNU },
  { id: "proofClear", title: "Automation tool proof of data clear", options: YNU },
  { id: "wiped", title: "Device data wiped", options: YNU },
];

const COLORS = [
  { value: "black", label: "Black", hex: "#111827" },
  { value: "blue", label: "Blue", hex: "#2563eb" },
  { value: "gold", label: "Gold", hex: "#d4af37" },
  { value: "silver", label: "Silver", hex: "#c0c4cc" },
];

/* ---------------- Helpers ---------------- */

// Questions for the selected mode, in the order written in MODES
function pickQuestions(mode: any) {
  if (MODES[mode] === "all") return QUESTIONS;
  return MODES[mode].map((id : any) => QUESTIONS.find((q) => q.id === id));
}

const buildInitialValues = (questions : any) => ({
  ...Object.fromEntries(questions.map((q : any) => [q.id, ""])),
  portsIssues: [],
  color: "",
});

const buildSchema = (questions : any) =>
  Yup.object({
    ...Object.fromEntries(questions.map((q: any) => [q.id, Yup.string().required("Pick an answer")])),
    portsIssues: Yup.array().when("ports", {
      is: "no",
      then: (s) => s.min(1, "Select at least one issue"),
      otherwise: (s) => s,
    }),
    color: Yup.string().required("Pick a color"),
  });

// Colored bar on the left of each row
const leftBar = (color: any) => ({ borderLeft: `4px solid ${color || "transparent"}` });

// Answer button style: outlined when not selected, filled when selected
const answerStyle = (tone: any, selected: any) => {
  const c = TONES[tone].color;
  return selected
    ? { background: c, borderColor: c, color: "#fff" }
    : { background: "#fff", borderColor: "#d1d5db", color: c };
};

/* ---------------- Component ---------------- */

export default function DeviceInspectionForm({ defaultMode = "BDP", onSubmit }: any) {
  const [mode, setMode] = useState(defaultMode);
  const questions = useMemo(() => pickQuestions(mode), [mode]);
  const initialValues = useMemo(() => buildInitialValues(questions), [questions]);
  const validationSchema = useMemo(() => buildSchema(questions), [questions]);

  return (
    <Container className="pt-4" style={{ maxWidth: 900, paddingBottom: 100 }}>
      {/* Header + mode buttons */}
      <div className="d-flex justify-content-between align-items-end flex-wrap gap-3 mb-3">
        <div>
          <div className="text-uppercase text-muted fw-semibold small">Inspection</div>
          <h4 className="fw-bold mb-0">Device Check</h4>
        </div>
        <ButtonGroup size="sm">
          {Object.keys(MODES).map((m) => (
            <Button
              key={m}
              variant={m === mode ? "dark" : "outline-secondary"}
              className="fw-semibold px-3"
              onClick={() => setMode(m)}
            >
              {m}{" "}
              <span className="opacity-75 font-monospace">
                {(MODES[m] === "all" ? QUESTIONS.length : MODES[m].length) + 1 /* + color */}
              </span>
            </Button>
          ))}
        </ButtonGroup>
      </div>

      {/* key resets the form when the mode / question set changes */}
      <Formik
        key={mode}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          const payload = { mode, questions: questions.map((q: any) => q.id), ...values };
          onSubmit ? onSubmit(payload) : console.log(payload);
          setSubmitting(false);
        }}
      >
        {({ values, errors, submitCount, setFieldValue, handleChange }: any) => {
          const showErr = submitCount > 0;
          const toneOf = (q: any) => q.options.find((o: any) => o.value === values[q.id])?.tone;

          const total = questions.length + 1;
          const answered = questions.filter((q: any) => values[q.id]).length + (values.color ? 1 : 0);

          const tally: any = { good: 0, minor: 0, bad: 0, unv: 0 };
          questions.forEach((q: any) => { const t = toneOf(q); if (t) tally[t]++; });

          const selectedColor = COLORS.find((c) => c.value === values.color);

          return (
            <FormikForm noValidate>
              {/* Progress */}
              <div className="d-flex align-items-center gap-3 mb-3">
                <ProgressBar now={(answered / total) * 100} className="flex-grow-1" style={{ height: 6 }} />
                <span className="fw-semibold small font-monospace text-nowrap">{answered} / {total}</span>
              </div>

              <Card className="shadow-sm overflow-hidden">
                {questions.map((q: any, idx: any) => {
                  const tone = toneOf(q);
                  const hasErr = showErr && errors[q.id];
                  return (
                    <div
                      key={q.id}
                      className={`d-flex gap-3 px-3 py-3 border-bottom ${hasErr ? "bg-danger-subtle" : ""}`}
                      style={leftBar(hasErr ? TONES.bad.color : tone && TONES[tone].color)}
                    >
                      <span
                        className={`rounded-circle d-inline-flex align-items-center justify-content-center flex-shrink-0 small fw-bold ${
                          tone ? "bg-dark text-white" : "bg-light text-muted"
                        }`}
                        style={{ width: 26, height: 26 }}
                      >
                        {idx + 1}
                      </span>

                      <div className="flex-grow-1">
                        <div className="fw-bold">{q.title}</div>
                        {q.sub && <div className="text-muted small">{q.sub}</div>}

                        {/* Answers */}
                        <div className="d-flex flex-wrap gap-2 mt-2">
                          {q.options.map((o: any) => {
                            const id = `${q.id}-${o.value}`;
                            const selected = values[q.id] === o.value;
                            return (
                              <div key={o.value}>
                                <input
                                  type="radio"
                                  className="btn-check"
                                  id={id}
                                  name={q.id}
                                  value={o.value}
                                  checked={selected}
                                  onChange={() => {
                                    setFieldValue(q.id, o.value);
                                    if (q.followUp && o.value !== q.followUp.when) setFieldValue("portsIssues", []);
                                  }}
                                />
                                <label
                                  htmlFor={id}
                                  className="btn btn-sm fw-semibold px-3 border-2"
                                  style={answerStyle(o.tone, selected)}
                                >
                                  <span aria-hidden="true" className="me-1">{TONES[o.tone].icon}</span>
                                  {o.label}
                                </label>
                              </div>
                            );
                          })}
                        </div>

                        {/* Follow-up checkboxes (Connectors = No) */}
                        {q.followUp && values[q.id] === q.followUp.when && (
                          <div className="mt-3 p-2 px-3 rounded border border-danger-subtle bg-danger-subtle">
                            <div className="text-danger text-uppercase fw-semibold small mb-1">{q.followUp.label}</div>
                            {q.followUp.items.map((it: any) => (
                              <Form.Check
                                key={it.value}
                                type="checkbox"
                                id={`ports-${it.value}`}
                                name="portsIssues"
                                value={it.value}
                                label={it.label}
                                checked={values.portsIssues.includes(it.value)}
                                onChange={handleChange}
                              />
                            ))}
                            {showErr && errors.portsIssues && (
                              <div className="text-danger small fw-semibold mt-1">{errors.portsIssues}</div>
                            )}
                          </div>
                        )}

                        {hasErr && <div className="text-danger small fw-semibold mt-2">✕ {errors[q.id]}</div>}
                      </div>
                    </div>
                  );
                })}

                {/* Color select */}
                <div
                  className={`d-flex gap-3 px-3 py-3 ${showErr && errors.color ? "bg-danger-subtle" : ""}`}
                  style={leftBar(showErr && errors.color ? TONES.bad.color : values.color && TONES.good.color)}
                >
                  <span
                    className={`rounded-circle d-inline-flex align-items-center justify-content-center flex-shrink-0 small fw-bold ${
                      values.color ? "bg-dark text-white" : "bg-light text-muted"
                    }`}
                    style={{ width: 26, height: 26 }}
                  >
                    {questions.length + 1}
                  </span>
                  <div className="flex-grow-1">
                    <Form.Label htmlFor="color" className="fw-bold mb-2">Device color</Form.Label>
                    <div className="d-flex align-items-center gap-2">
                      <span
                        className="rounded-circle border"
                        style={{ width: 20, height: 20, background: selectedColor?.hex ?? "transparent" }}
                      />
                      <Form.Select
                        id="color"
                        name="color"
                        value={values.color}
                        onChange={handleChange}
                        isInvalid={showErr && !!errors.color}
                        style={{ maxWidth: 240 }}
                        className="fw-semibold"
                      >
                        <option value="" disabled>Select a color…</option>
                        {COLORS.map((c) => (
                          <option key={c.value} value={c.value}>{c.label}</option>
                        ))}
                      </Form.Select>
                    </div>
                    {showErr && errors.color && (
                      <div className="text-danger small fw-semibold mt-2">✕ {errors.color}</div>
                    )}
                  </div>
                </div>
              </Card>

              {/* Sticky footer */}
              <div className=" bottom-0 start-0 end-0 bg-white border-top py-2" style={{ zIndex: 10 }}>
                <Container className="d-flex justify-content-between align-items-center" style={{ maxWidth: 900 }}>
                  <div className="d-flex flex-wrap gap-1">
                    {answered === 0 && <span className="text-muted small">No answers yet</span>}
                    {Object.entries(tally)
                      .filter(([, n]) => n)
                      .map(([t, n]) => (
                        <Badge key={t} pill className="font-monospace" style={{ background: TONES[t].color }} bg="">
                          {TONES[t].icon} {n} {TONES[t].name}
                        </Badge>
                      ))}
                  </div>
                  <Button type="submit" variant="primary" onClick={() => alert("Device Inspected")} className="fw-bold px-4">Submit</Button>
                </Container>
              </div>
            </FormikForm>
          );
        }}
      </Formik>
    </Container>
  );
}
