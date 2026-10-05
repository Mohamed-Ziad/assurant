"use client";

import { Card } from "react-bootstrap";
import CopyableText from "@/components/ui/CopyableText";
import StatusBanner from "@/components/ui/StatusBanner";
import StatusGlyph from "@/components/ui/StatusGlyph";
import { COLORS } from "@/constants/colors";
import StepTile from "./StepTile";
import type { Station } from "./types";

const STEPS_PER_ROW = 5;

interface StationCardProps {
  station: Station;
  onPrint?: (slot: string) => void;
}

export default function StationCard({ station, onPrint }: StationCardProps) {
  const {
    slot,
    operatingSystem,
    model,
    modelCode,
    storage,
    serialNumber,
    steps,
    finalSteps,
    status,
  } = station;

  return (
    <Card className="shadow-sm h-100 overflow-hidden">
      <div
        className="d-flex align-items-center justify-content-between px-4 py-3"
        style={{ borderBottom: `1px solid ${COLORS.divider}` }}
      >
        <span className="fw-bold" style={{ fontSize: 18 }}>
          {slot}
        </span>
        <span
          className="fw-bold rounded-pill px-2"
          style={{ fontSize: 12, color: COLORS.gray700, border: `1px solid ${COLORS.gray200}` }}
        >
          {operatingSystem}
        </span>
      </div>

      <Card.Body className="px-4 pt-3 pb-4">
        <div className="text-center fw-bold" style={{ fontSize: 18 }}>
          {model}
        </div>
        <div
          className="text-center font-monospace mt-1"
          style={{ color: COLORS.gray600, fontSize: 14 }}
        >
          <CopyableText text={modelCode} monospace /> · {storage} ·{" "}
          <CopyableText text={serialNumber} monospace />
        </div>
        <div className="text-center font-monospace" style={{ color: COLORS.gray400, fontSize: 13 }}>
          {modelCode} {storage}-{serialNumber}
        </div>

        <div
          className="mt-4"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${STEPS_PER_ROW}, 1fr)`,
            gap: "14px 10px",
          }}
        >
          {steps.map((step) => (
            <StepTile key={step.label} step={step} onAction={() => onPrint?.(slot)} />
          ))}

          {/* Last row: the final steps, centered. */}
          <div
            style={{
              gridColumn: `2 / span ${finalSteps.length}`,
              display: "grid",
              gridTemplateColumns: `repeat(${finalSteps.length}, 1fr)`,
              gap: 10,
            }}
          >
            {finalSteps.map((step) => (
              <StepTile key={step.label} step={step} onAction={() => onPrint?.(slot)} />
            ))}
          </div>
        </div>

        <StatusBanner
          tone={status.tone}
          leading={<StatusGlyph tone={status.tone} />}
          className="mt-4 rounded"
          style={{ fontSize: 13.5 }}
        >
          {status.message}
        </StatusBanner>
      </Card.Body>
    </Card>
  );
}
