"use client";

import { Card, Row, Col, Spinner, Button } from "react-bootstrap";
import CopyText from "../TextCopy";

/* ---------------- Data ---------------- */

// tone: good | bad | run | pend | val
const BASE_STEPS: any[] = [
  { label: "Connected", value: "26.02.01", tone: "val", mono: true },
  { label: "Scan Item", value: "758412758", tone: "val", mono: true },
  { label: "Taptic", value: "OK", tone: "good" },
  { label: "iOS", value: "TRUE", tone: "good" },
  { label: "Carrier Check", value: "OK", tone: "good" },
  { label: "NGR API", value: "OK", tone: "good" },
  { label: "Color", value: "Dark Red", tone: "val" },
  { label: "Cosmetic Grade", value: "C", tone: "val" },
  { label: "Cracked Device?", value: "NO", tone: "good" },
  { label: "C Grade", value: "NO", tone: "good" },
  { label: "iOS Setup", value: "NAN", tone: "pend" },
  { label: "Diagnostics", value: "NAN", tone: "pend" },
  { label: "Erase", value: "OK", tone: "good" },
  { label: "ATT eSIM API", value: "OK", tone: "good" },
  { label: "Sleep", value: "OK", tone: "good" },
];

const STATIONS: any[] = [
  {
    slot: "A1", os: "iOS", model: "iPhone 14 Pro Max", code: "A5678", storage: "512GB", serial: "12345678912346",
    line2: "A5678 512GB-12345678912346",
    steps: BASE_STEPS,
    last: [
      { label: "NGT API", value: "OK", tone: "good" },
      { label: "Print", action: true },
      { label: "Finish", value: "OK", tone: "good" },
    ],
    status: { tone: "run", text: "Wiping — don't unplug the device" },
  },
  {
    slot: "A2", os: "iOS", model: "iPhone 14 Pro Max", code: "A5678", storage: "512GB", serial: "12345678912346",
    line2: "A5678 512GB-12345678912346",
    steps: BASE_STEPS,
    last: [
      { label: "NGT API", value: "OK", tone: "good" },
      { label: "Print", action: true },
      { label: "Finish", value: "OK", tone: "good" },
    ],
    status: { tone: "good", text: "Finished — ready to unplug" },
  },
  {
    slot: "A3", os: "iOS", model: "iPhone 14 Pro Max", code: "A5678", storage: "512GB", serial: "12345678912346",
    line2: "A5678 512GB-12345678912346",
    steps: BASE_STEPS.map((s: any) =>
      s.label === "Erase" ? { ...s, value: "FAIL", tone: "bad" }
      : s.label === "ATT eSIM API" ? { ...s, value: "Running", tone: "run" }
      : s.label === "Sleep" ? { ...s, value: "NAN", tone: "pend" }
      : s
    ),
    last: [
      { label: "NGT API", value: "NAN", tone: "pend" },
      { label: "Print", action: true },
      { label: "Finish", value: "NAN", tone: "pend" },
    ],
    status: { tone: "bad", text: "Erase failed — check the device" },
  },
];

const DOWNLOADING_STATION: any = "A6";

/* ---------------- Look (same colors as the forms) ---------------- */

const TONE: any = {
  good: { bg: "#f0fdf4", color: "#15803d", border: "#bbf7d0", icon: "✓" },
  bad:  { bg: "#fef2f2", color: "#b91c1c", border: "#fecaca", icon: "✕" },
  run:  { bg: "#eff6ff", color: "#1d4ed8", border: "#bfdbfe", icon: "" },
  pend: { bg: "#f9fafb", color: "#9ca3af", border: "#eef0f2", icon: "" },
  val:  { bg: "#ffffff", color: "#111827", border: "#e5e7eb", icon: "" },
};

const STATUS: any = {
  run:  { bg: "#f8faff", color: "#1e3a8a", bar: "#1d4ed8" },
  good: { bg: "#f0fdf4", color: "#14532d", bar: "#15803d" },
  bad:  { bg: "#fef2f2", color: "#7f1d1d", bar: "#b91c1c" },
};

// Bootstrap spinner styled like the design: small, gray track with a blue arc
const SmallSpinner = () => (
  <Spinner
    animation="border"
    role="status"
    style={{
      width: 12,
      height: 12,
      borderWidth: 2,
      borderTopColor: "#1d4ed8",
      borderRightColor: "#cbd5e1",
      borderBottomColor: "#cbd5e1",
      borderLeftColor: "#cbd5e1",
      flexShrink: 0,
    }}
  >
    <span className="visually-hidden">Loading…</span>
  </Spinner>
);

/* ---------------- Pieces ---------------- */

const Step = ({ step }: any) => {
  const t: any = TONE[step.tone] || TONE.val;
  return (
    <div>
      {/* fixed height so boxes line up even when the label wraps */}
      <div
        className="d-flex align-items-end justify-content-center text-center fw-semibold mb-1"
        style={{ height: 32, fontSize: 12, color: "#6b7280", lineHeight: 1.2 }}
      >
        {step.label}
      </div>

      {step.action ? (
        <Button
          variant="outline-secondary"
          className="w-100 fw-semibold d-flex align-items-center justify-content-center gap-1"
          style={{ height: 34, fontSize: 13.5, borderRadius: 7, background: "#fff", color: "#374151", borderColor: "#d1d5db" }}
          onClick={() => console.log("print")}
        >
          ⎙ Print
        </Button>
      ) : (
        <div
          className={`d-flex align-items-center justify-content-center gap-1 fw-semibold ${step.mono ? "font-monospace" : ""}`}
          style={{ height: 34, fontSize: 13.5, borderRadius: 7, background: t.bg, color: t.color, border: `1px solid ${t.border}` }}
        >
          {step.tone === "run" && <SmallSpinner />}
          {t.icon && <span>{t.icon}</span>}
          {step.value}
        </div>
      )}
    </div>
  );
};

const StationCard = ({ s }: any) => {
  const st: any = STATUS[s.status.tone] || STATUS.run;
  return (
    <Card className="shadow-sm h-100 overflow-hidden">
      <div className="d-flex align-items-center justify-content-between px-4 py-3" style={{ borderBottom: "1px solid #f0f1f3" }}>
        <span className="fw-bold" style={{ fontSize: 18 }}>{s.slot}</span>
        <span className="fw-bold rounded-pill px-2" style={{ fontSize: 12, color: "#374151", border: "1px solid #e5e7eb" }}>
          {s.os}
        </span>
      </div>

      <Card.Body className="px-4 pt-3 pb-4">
        <div className="text-center fw-bold" style={{ fontSize: 18 }}>{s.model}</div>
        <div className="text-center font-monospace mt-1" style={{ color: "#4b5563", fontSize: 14 }}>
          <CopyText text={s.code} mono /> · {s.storage} · <CopyText text={s.serial} mono />
        </div>
        <div className="text-center font-monospace" style={{ color: "#9ca3af", fontSize: 13 }}>{s.line2}</div>

        <div className="mt-4" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "14px 10px" }}>
          {s.steps.map((step: any) => <Step key={step.label} step={step} />)}

          {/* last row: 3 steps centered */}
          <div style={{ gridColumn: "2 / span 3", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
            {s.last.map((step: any) => <Step key={step.label} step={step} />)}
          </div>
        </div>

        <div
          className="d-flex align-items-center gap-2 mt-4 px-3 py-2 rounded"
          style={{ background: st.bg, color: st.color, borderLeft: `3px solid ${st.bar}`, fontSize: 13.5 }}
        >
          {s.status.tone === "run" ? <SmallSpinner /> : <span>{s.status.tone === "good" ? "✓" : "✕"}</span>}
          {s.status.text}
        </div>
      </Card.Body>
    </Card>
  );
};

/* ---------------- Component ---------------- */

export default function StationCards() {
  return (
    <div>
      <div
        className="d-inline-flex align-items-center gap-2 bg-white rounded px-3 py-1 mb-3"
        style={{ fontSize: 13, color: "#374151", border: "1px solid #e5e7eb" }}
      >
        <SmallSpinner />
        Downloading files for Station <b>{DOWNLOADING_STATION}</b>
      </div>

      <Row className="g-4">
        {STATIONS.map((s: any) => (
          <Col key={s.slot} lg={4}>
            <StationCard s={s} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
