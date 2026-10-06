"use client";

import { Button, Card } from "react-bootstrap";
import CopyableText from "@/components/ui/CopyableText";
import StatusBanner, { type BannerTone } from "@/components/ui/StatusBanner";
import StatusGlyph from "@/components/ui/StatusGlyph";
import { COLORS } from "@/constants/colors";
import StepTile from "./StepTile";
import type { Station, StationState } from "./types";

const STEPS_PER_ROW = 5;

interface StateStyle {
  badge: string;
  tone: BannerTone;
  /** Card border and the soft ring around it. */
  border: string;
  ring: string;
  headerBackground: string;
  badgeBackground: string;
}

const STATE_STYLES: Record<StationState, StateStyle> = {
  running: {
    badge: "Running",
    tone: "running",
    border: COLORS.info,
    ring: COLORS.infoBorder,
    headerBackground: COLORS.infoBannerBackground,
    badgeBackground: COLORS.info,
  },
  waiting: {
    badge: "Waiting for input",
    tone: "running",
    border: COLORS.info,
    ring: COLORS.infoBorder,
    headerBackground: COLORS.infoBannerBackground,
    badgeBackground: COLORS.info,
  },
  success: {
    badge: "Finished",
    tone: "success",
    border: COLORS.success,
    ring: COLORS.successBorder,
    headerBackground: COLORS.successBackground,
    badgeBackground: COLORS.success,
  },
  failed: {
    badge: "Failed",
    tone: "danger",
    border: COLORS.danger,
    ring: COLORS.dangerBorder,
    headerBackground: COLORS.dangerBackground,
    badgeBackground: COLORS.danger,
  },
};

interface StationCardProps {
  station: Station;
  onPrint?: (slot: string) => void;
  /** When set, a Start button restarts the process from the first step. */
  onRestart?: () => void;
}

export default function StationCard({ station, onPrint, onRestart }: StationCardProps) {
  const { slot, operatingSystem, model, modelCode, storage, serialNumber, steps, state, message } =
    station;
  const { badge, tone, border, ring, headerBackground, badgeBackground } = STATE_STYLES[state];

  const lastRowLength = steps.length % STEPS_PER_ROW;
  const lastRowStart = steps.length - lastRowLength;
  const lastRowOffset = Math.floor((STEPS_PER_ROW - lastRowLength) / 2);

  return (
    <Card
      className="h-100 overflow-hidden"
      style={{ borderColor: border, boxShadow: `0 0 0 3px ${ring}` }}
    >
      <div
        className="d-flex align-items-center justify-content-between gap-2 px-4 py-3"
        style={{ background: headerBackground, borderBottom: `1px solid ${COLORS.divider}` }}
      >
        <div className="d-flex align-items-center gap-2">
          <span className="fw-bold" style={{ fontSize: 18 }}>
            {slot}
          </span>
          <span
            className="badge rounded-pill"
            style={{ background: badgeBackground, fontSize: 12 }}
          >
            {badge}
          </span>
        </div>

        <div className="d-flex align-items-center gap-2">
          {state === "success" && (
            <Button
              size="sm"
              variant="success"
              className="fw-semibold"
              onClick={() => onPrint?.(slot)}
            >
              ⎙ Print
            </Button>
          )}
          {onRestart && (
            <Button size="sm" variant="outline-primary" className="fw-semibold" onClick={onRestart}>
              Start
            </Button>
          )}
          <span
            className="fw-bold rounded-pill px-2 bg-white"
            style={{ fontSize: 12, color: COLORS.gray700, border: `1px solid ${COLORS.gray200}` }}
          >
            {operatingSystem}
          </span>
        </div>
      </div>

      <Card.Body className="px-4 pt-3 pb-4">
        <div className="text-center fw-bold" style={{ fontSize: 18 }}>
          {model}
        </div>
        <div
          className="text-center font-monospace mt-1"
          style={{ color: COLORS.gray600, fontSize: 14 }}
        >
          <CopyableText text={modelCode} label="Model code" monospace /> · {storage} ·{" "}
          <CopyableText text={serialNumber} label="Serial number" monospace />
        </div>

        <div
          className="mt-4"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${STEPS_PER_ROW}, 1fr)`,
            gap: "14px 10px",
          }}
        >
          {steps.map((step, index) => (
            <StepTile
              key={step.label}
              step={step}
              onPrint={() => onPrint?.(slot)}
              gridColumnStart={
                lastRowLength > 0 && index === lastRowStart ? lastRowOffset + 1 : undefined
              }
            />
          ))}
        </div>

        <StatusBanner
          tone={tone}
          leading={<StatusGlyph tone={tone} />}
          className="mt-4 rounded"
          style={{ fontSize: 13.5 }}
        >
          {message}
        </StatusBanner>
      </Card.Body>
    </Card>
  );
}
