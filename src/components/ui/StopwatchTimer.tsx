"use client";

import type { CSSProperties } from "react";
import { SHOW_STOPWATCH } from "@/constants/featureFlags";
import { useStopwatch } from "@/hooks/useStopwatch";

interface StopwatchTimerProps {
  className?: string;
  /** Called with the total elapsed milliseconds when the stopwatch is stopped. */
  onStop?: (elapsedMs: number) => void;
}

const MS_PER_MINUTE = 60_000;
const MS_PER_SECOND = 1_000;

function splitElapsedTime(elapsedMs: number) {
  const minutes = Math.floor(elapsedMs / MS_PER_MINUTE);
  const seconds = Math.floor((elapsedMs % MS_PER_MINUTE) / MS_PER_SECOND);
  const milliseconds = Math.floor(elapsedMs % MS_PER_SECOND);

  return {
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
    milliseconds: String(milliseconds).padStart(3, "0"),
  };
}

function StopwatchDisplay({ className = "", onStop }: StopwatchTimerProps) {
  const { elapsedMs, isRunning, toggle, reset } = useStopwatch(onStop);
  const { minutes, seconds, milliseconds } = splitElapsedTime(elapsedMs);

  return (
    <div className={className} style={styles.wrapper}>
      <div style={styles.display}>
        <span>{minutes}</span>
        <span style={styles.separator}>:</span>
        <span>{seconds}</span>
        <span style={styles.separator}>.</span>
        <span style={styles.milliseconds}>{milliseconds}</span>
      </div>

      <div style={styles.buttonRow}>
        <button
          type="button"
          onClick={toggle}
          style={{ ...styles.button, background: isRunning ? "#dc2626" : "#16a34a" }}
        >
          {isRunning ? "Stop" : "Run"}
        </button>
        <button
          type="button"
          onClick={reset}
          disabled={elapsedMs === 0}
          style={{ ...styles.button, background: "#6b7280", opacity: elapsedMs === 0 ? 0.5 : 1 }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

/** Stopwatch for timing a workflow. Hidden unless `SHOW_STOPWATCH` is turned on. */
export default function StopwatchTimer(props: StopwatchTimerProps) {
  return SHOW_STOPWATCH ? <StopwatchDisplay {...props} /> : null;
}

const styles = {
  wrapper: { display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 12 },
  display: {
    direction: "ltr",
    fontFamily: "ui-monospace, Consolas, monospace",
    fontVariantNumeric: "tabular-nums",
    fontSize: 48,
    fontWeight: 700,
  },
  separator: { opacity: 0.4, margin: "0 2px" },
  milliseconds: { fontSize: 32, opacity: 0.7 },
  buttonRow: { display: "flex", gap: 8 },
  button: {
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "8px 20px",
    fontSize: 16,
    fontWeight: 600,
    cursor: "pointer",
  },
} satisfies Record<string, CSSProperties>;
