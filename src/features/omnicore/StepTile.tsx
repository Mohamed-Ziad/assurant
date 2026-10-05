"use client";

import { Button } from "react-bootstrap";
import StatusGlyph, { type StatusTone } from "@/components/ui/StatusGlyph";
import { COLORS } from "@/constants/colors";
import type { StationStep, ValueStep } from "./types";

const TILE_HEIGHT = 34;
const LABEL_HEIGHT = 32;

const TILE_COLORS: Record<StatusTone, { background: string; text: string; border: string }> = {
  success: {
    background: COLORS.successBackground,
    text: COLORS.success,
    border: COLORS.successBorder,
  },
  danger: { background: COLORS.dangerBackground, text: COLORS.danger, border: COLORS.dangerBorder },
  running: { background: COLORS.infoBackground, text: COLORS.info, border: COLORS.infoBorder },
  pending: { background: COLORS.gray50, text: COLORS.gray400, border: COLORS.pendingBorder },
  value: { background: COLORS.white, text: COLORS.gray900, border: COLORS.gray200 },
};

interface StepTileProps {
  step: StationStep;
  onAction?: (action: "print") => void;
}

/** One step of a station: its label on top and its value (or action button) below. */
export default function StepTile({ step, onAction }: StepTileProps) {
  return (
    <div>
      {/* Fixed height, so the tiles line up even when a label wraps to two lines. */}
      <div
        className="d-flex align-items-end justify-content-center text-center fw-semibold mb-1"
        style={{ height: LABEL_HEIGHT, fontSize: 12, color: COLORS.gray500, lineHeight: 1.2 }}
      >
        {step.label}
      </div>

      {"action" in step ? (
        <Button
          variant="outline-secondary"
          className="w-100 fw-semibold d-flex align-items-center justify-content-center gap-1"
          style={{
            height: TILE_HEIGHT,
            fontSize: 13.5,
            borderRadius: 7,
            background: COLORS.white,
            color: COLORS.gray700,
            borderColor: COLORS.gray300,
          }}
          onClick={() => onAction?.(step.action)}
        >
          ⎙ {step.label}
        </Button>
      ) : (
        <ValueTile step={step} />
      )}
    </div>
  );
}

function ValueTile({ step }: { step: ValueStep }) {
  const { background, text, border } = TILE_COLORS[step.tone];

  return (
    <div
      className={`d-flex align-items-center justify-content-center gap-1 fw-semibold ${
        step.monospace ? "font-monospace" : ""
      }`}
      style={{
        height: TILE_HEIGHT,
        fontSize: 13.5,
        borderRadius: 7,
        background,
        color: text,
        border: `1px solid ${border}`,
      }}
    >
      <StatusGlyph tone={step.tone} />
      {step.value}
    </div>
  );
}
