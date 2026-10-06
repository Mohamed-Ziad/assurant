"use client";

import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import IconButton from "@/components/ui/IconButton";
import StatusGlyph, { type StatusTone } from "@/components/ui/StatusGlyph";
import { COLORS } from "@/constants/colors";
import { useClipboard } from "@/hooks/useClipboard";
import type { ActionStep, InputStep, StationStep, ValueStep } from "./types";

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

function PrintTile({ step, onPrint }: { step: ActionStep; onPrint?: () => void }) {
  return (
    <Button
      variant="outline-secondary"
      disabled={step.isDisabled}
      className="w-100 fw-semibold d-flex align-items-center justify-content-center gap-1"
      style={{
        height: TILE_HEIGHT,
        fontSize: 13.5,
        borderRadius: 7,
        background: COLORS.white,
        color: COLORS.gray700,
        borderColor: COLORS.gray300,
      }}
      onClick={onPrint}
    >
      ⎙ {step.label}
    </Button>
  );
}

/** A field with a confirm button. The process continues only after the technician confirms. */
function InputTile({ step }: { step: InputStep }) {
  const [value, setValue] = useState("");
  const { paste } = useClipboard();

  const keepDigits = (text: string) =>
    step.input === "number" ? text.replace(/\D/g, "").slice(0, step.digits) : text;

  const pasteFromClipboard = async () => {
    const clipboardText = await paste();
    if (clipboardText !== null) setValue(keepDigits(clipboardText));
  };

  const isComplete = step.input === "number" ? value.length === step.digits : value !== "";
  const confirm = () => {
    if (isComplete) step.onConfirm(value);
  };

  return (
    <div className="d-flex gap-1" style={{ height: TILE_HEIGHT }}>
      {step.input === "number" ? (
        <InputGroup className="flex-nowrap">
          <Form.Control
            value={value}
            onChange={(event) => setValue(keepDigits(event.target.value))}
            onKeyDown={(event) => {
              if (event.key === "Enter") confirm();
            }}
            inputMode="numeric"
            aria-label={step.label}
            className="font-monospace fw-semibold ps-2 pe-0 border-end-0"
            style={{ fontSize: 12, minWidth: 0 }}
          />
          <InputGroup.Text className="bg-white px-1">
            <IconButton
              icon="paste"
              label={`Paste ${step.label}`}
              iconSize={14}
              onClick={pasteFromClipboard}
            />
          </InputGroup.Text>
        </InputGroup>
      ) : (
        <Form.Select
          value={value}
          onChange={(event) => setValue(event.target.value)}
          aria-label={step.label}
          className="fw-semibold ps-1 pe-0"
          style={{
            fontSize: 13,
            minWidth: 0,
            backgroundPosition: "right 4px center",
            backgroundSize: 10,
          }}
        >
          <option value="" disabled>
            —
          </option>
          {step.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Form.Select>
      )}

      <Button
        variant="primary"
        disabled={!isComplete}
        onClick={confirm}
        aria-label={`Confirm ${step.label}`}
        className="fw-bold px-0 flex-shrink-0"
        style={{ width: 28, fontSize: 13 }}
      >
        ✓
      </Button>
    </div>
  );
}

function StepControl({ step, onPrint }: { step: StationStep; onPrint?: () => void }) {
  if ("action" in step) return <PrintTile step={step} onPrint={onPrint} />;
  if ("input" in step) return <InputTile step={step} />;
  return <ValueTile step={step} />;
}

interface StepTileProps {
  step: StationStep;
  onPrint?: () => void;
  /** Places the tile in this grid column. Used to center the last row. */
  gridColumnStart?: number;
}

/** One step of a station: its label on top and its value, field or button below. */
export default function StepTile({ step, onPrint, gridColumnStart }: StepTileProps) {
  return (
    <div style={{ gridColumnStart }}>
      {/* Fixed height, so the tiles line up even when a label wraps to two lines. */}
      <div
        className="d-flex align-items-end justify-content-center text-center fw-semibold mb-1"
        style={{ height: LABEL_HEIGHT, fontSize: 12, color: COLORS.gray500, lineHeight: 1.2 }}
      >
        {step.label}
      </div>

      <StepControl step={step} onPrint={onPrint} />
    </div>
  );
}
