"use client";

import { useEffect, useRef, useState } from "react";

type TimerProps = {
  className?: string;
  onStop?: (elapsedMs: number) => void; // اختياري: يرجع الوقت لما توقف
};

function format(ms: number) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const millis = Math.floor(ms % 1000);
  return {
    mm: String(minutes).padStart(2, "0"),
    ss: String(seconds).padStart(2, "0"),
    ms: String(millis).padStart(3, "0"),
  };
}

export default function Timer({ className = "", onStop }: TimerProps) {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);

  const startRef = useRef(0);     // وقت بداية التشغيل الحالي
  const baseRef = useRef(0);      // الوقت المتراكم من المرات السابقة
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!running) return;

    startRef.current = performance.now();
    const tick = () => {
      setElapsed(baseRef.current + (performance.now() - startRef.current));
      frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [running]);

  const toggle = () => {
    if (running) {
      const total = baseRef.current + (performance.now() - startRef.current);
      baseRef.current = total;
      setElapsed(total);
      setRunning(false);
      onStop?.(total);
    } else {
      setRunning(true);
    }
  };

  const reset = () => {
    setRunning(false);
    baseRef.current = 0;
    setElapsed(0);
  };

  const { mm, ss, ms } = format(elapsed);

  return false ? <>
  <div className={className} style={styles.wrap}>
      <div style={styles.display}>
        <span>{mm}</span>
        <span style={styles.sep}>:</span>
        <span>{ss}</span>
        <span style={styles.sep}>.</span>
        <span style={styles.ms}>{ms}</span>
      </div>

      <div style={styles.row}>
        <button
          onClick={toggle}
          style={{ ...styles.btn, background: running ? "#dc2626" : "#16a34a" }}
        >
          {running ? "Stop" : "Run"}
        </button>
        <button
          onClick={reset}
          disabled={elapsed === 0}
          style={{ ...styles.btn, background: "#6b7280", opacity: elapsed === 0 ? 0.5 : 1 }}
        >
          Reset
        </button>
      </div>
    </div></>: null
}

const styles: Record<string, React.CSSProperties> = {
  wrap: { display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 12 },
  display: {
    direction: "ltr",
    fontFamily: "ui-monospace, Consolas, monospace",
    fontVariantNumeric: "tabular-nums",
    fontSize: 48,
    fontWeight: 700,
  },
  sep: { opacity: 0.4, margin: "0 2px" },
  ms: { fontSize: 32, opacity: 0.7 },
  row: { display: "flex", gap: 8 },
  btn: {
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "8px 20px",
    fontSize: 16,
    fontWeight: 600,
    cursor: "pointer",
  },
};
