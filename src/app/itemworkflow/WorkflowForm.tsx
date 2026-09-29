"use client";

import { useState } from "react";
import { Formik, Form as FormikForm } from "formik";
import * as Yup from "yup";
import { Card, Form, Button, InputGroup } from "react-bootstrap";
// Make sure Bootstrap CSS is imported once in your app:
// import "bootstrap/dist/css/bootstrap.min.css";

/* ---------------- Shared look (same as DeviceInspectionForm) ---------------- */

const COLORS: any = {
  good: "#15803d",
  bad: "#b91c1c",
  gray: "#6b7280",
  goodBg: "#f0fdf4",
};

/* ---------------- Fields ---------------- */

const FIELDS: any[] = [
  { name: "item", label: "Item Number", placeholder: "927468125", digitsOnly: true, length: 9 },
  { name: "invoice", label: "Invoice Number", placeholder: "INV-000123" },
  { name: "imei", label: "IMEI Number", placeholder: "490154203237518", digitsOnly: true, length: 15 },
];

// Keeps digits only for number fields and cuts to the max length
function clean(field: any, raw: any): any {
  let v = String(raw || "").trim();
  if (field.digitsOnly) v = v.replace(/\D/g, "");
  if (field.length) v = v.slice(0, field.length);
  return v;
}

// IMEI check digit (Luhn)
function isValidImei(v: any): any {
  if (!/^\d{15}$/.test(v)) return false;
  let sum = 0;
  for (let i = 0; i < 15; i++) {
    let d = +v[i];
    if (i % 2 === 1) { d *= 2; if (d > 9) d -= 9; }
    sum += d;
  }
  return sum % 10 === 0;
}

/* ---------------- Validation ---------------- */

const validationSchema = Yup.object({
  item: Yup.string().matches(/^$|^\d{9}$/, "Item number must be 9 digits"),
  invoice: Yup.string(),
  imei: Yup.string()
    .matches(/^$|^\d{15}$/, "IMEI must be 15 digits")
    .test("luhn", "Invalid IMEI", (v: any) => !v || v.length !== 15 || isValidImei(v)),
});

// At least one field must be filled (Formik merges this with the Yup schema)
const validateOneField = (v: any): any =>
  v.item || v.invoice || v.imei ? {} : { form: "Fill at least one field" };

/* ---------------- Icons ---------------- */

const CopyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M5 15V5a2 2 0 0 1 2-2h8" />
  </svg>
);

const PasteIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="6" y="4" width="12" height="17" rx="2" />
    <path d="M9 4V3h6v1M9 11h6M9 15h4" />
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M5 12l5 5L20 7" />
  </svg>
);

// Small icon button used inside the inputs
const IconBtn = ({ title, onClick, disabled, color, children }: any) => (
  <Button
    variant="link"
    size="sm"
    title={title}
    aria-label={title}
    disabled={disabled}
    onClick={onClick}
    className="p-1 lh-1 text-decoration-none"
    style={{ color: color || COLORS.gray, opacity: disabled ? 0.35 : 1 }}
  >
    {children}
  </Button>
);

/* ---------------- Component ---------------- */

/**
 * <ItemWorkflowForm
 *    processedItem="927468125"      // optional: shows the success message
 *    onSearch={(values) => ...}
 *    onRevert={(values) => ...}
 *    onReinspect={(values) => ...}
 *    onLookup={(values) => ...}
 * />
 */
export default function ItemWorkflowForm({ processedItem, onSearch, onRevert, onReinspect, onLookup }: any) {
  const [hideToast, setHideToast] = useState<any>(false);
  const [copied, setCopied] = useState<any>(null); // key of what was just copied

  const copy = async (text: any, key: any) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied(null), 1500);
    } catch (e: any) {
      /* clipboard blocked by the browser */
    }
  };

  return (
    <Card className="shadow-sm overflow-hidden">
      {/* Success message */}
      {processedItem && !hideToast && (
        <div
          className="d-flex align-items-center gap-2 px-3 py-2"
          style={{ background: COLORS.goodBg, borderLeft: `3px solid ${COLORS.good}`, color: "#14532d" }}
          role="status"
        >
          <span>
            Item <span className="font-monospace fw-bold">{processedItem}</span> has been processed
          </span>
          <IconBtn title="Copy item number" color={COLORS.good} onClick={() => copy(processedItem, "toast")}>
            {copied === "toast" ? <CheckIcon /> : <CopyIcon />}
          </IconBtn>
          <button type="button" className="btn-close ms-auto" aria-label="Close" onClick={() => setHideToast(true)} />
        </div>
      )}

      <Card.Body className="p-4">
        <h4 className="fw-bold mb-3">Item Workflow</h4>

        <Formik
          initialValues={{ item: "", invoice: "", imei: "" }}
          validationSchema={validationSchema}
          validate={validateOneField}
          onSubmit={(values: any, { setSubmitting }: any) => {
            onSearch ? onSearch(values) : console.log("search", values);
            setSubmitting(false);
          }}
        >
          {({ values, errors, submitCount, setFieldValue, resetForm }: any) => {
            const showErr = submitCount > 0;

            const paste = async (field: any) => {
              try {
                const text = await navigator.clipboard.readText();
                setFieldValue(field.name, clean(field, text));
              } catch (e: any) {
                /* clipboard blocked — Ctrl+V still works */
              }
            };

            return (
              <FormikForm noValidate>
                {FIELDS.map((f: any) => {
                  const value = values[f.name];
                  const err = showErr && errors[f.name];
                  return (
                    <Form.Group key={f.name} controlId={`wf-${f.name}`} className="mb-3">
                      <Form.Label className="fw-semibold small mb-1 text-secondary">{f.label}</Form.Label>

                      <InputGroup>
                        <Form.Control
                          name={f.name}
                          value={value}
                          onChange={(e: any) => setFieldValue(f.name, clean(f, e.target.value))}
                          placeholder={f.placeholder}
                          inputMode={f.digitsOnly ? "numeric" : "text"}
                          autoComplete="off"
                          isInvalid={!!err}
                          className="font-monospace border-end-0"
                          style={{ fontSize: 15 }}
                        />
                        <InputGroup.Text
                          className="bg-white gap-1 px-1"
                          style={err ? { borderColor: COLORS.bad } : undefined}
                        >
                          <IconBtn title="Copy" disabled={!value} onClick={() => copy(value, f.name)}>
                            {copied === f.name ? <CheckIcon /> : <CopyIcon />}
                          </IconBtn>
                          <span className="vr my-1" />
                          <IconBtn title="Paste" onClick={() => paste(f)}>
                            <PasteIcon />
                          </IconBtn>
                        </InputGroup.Text>
                      </InputGroup>

                      {err && <div className="small mt-1" style={{ color: COLORS.bad }}>{err}</div>}
                    </Form.Group>
                  );
                })}

                {showErr && errors.form && (
                  <div className="small mb-2" style={{ color: COLORS.bad }}>{errors.form}</div>
                )}

                {/* Main actions */}
                <div className="d-flex align-items-center gap-3 mt-4">
                  <Button type="submit" variant="primary" className="fw-bold px-4">Search</Button>
                  <Button variant="link" className="text-secondary fw-semibold text-decoration-none p-0" onClick={() => resetForm()}>
                    Clear
                  </Button>
                </div>

                {/* Other actions */}
                <div className="d-flex flex-wrap gap-2 border-top mt-4 pt-3">
                  <Button variant="outline-secondary" size="sm" className="fw-semibold" onClick={() => onRevert?.(values)}>
                    Revert to Receipt
                  </Button>
                  <Button variant="outline-secondary" size="sm" className="fw-semibold" onClick={() => onReinspect?.(values)}>
                    Re-inspect
                  </Button>
                  <Button variant="outline-secondary" size="sm" className="fw-semibold" onClick={() => onLookup?.(values)}>
                    Item Lookup
                  </Button>
                </div>
              </FormikForm>
            );
          }}
        </Formik>
      </Card.Body>
    </Card>
  );
}
