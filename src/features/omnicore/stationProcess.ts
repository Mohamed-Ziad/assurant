import { useEffect, useState } from "react";
import type { StatusTone } from "@/components/ui/StatusGlyph";
import { ITEM_NUMBER_LENGTH } from "@/features/search-workflow/itemNumberField";
import type { Station, StationDevice, StationState, StationStep, ValueStep } from "./types";

type DurationRangeMs = readonly [minMs: number, maxMs: number];

/** A step that finishes by itself after a delay. */
interface TimedProcessStep {
  kind: "timed";
  label: string;
  durationMs: DurationRangeMs;
  value: string;
  tone: StatusTone;
  monospace?: boolean;
}

interface NumberProcessStep {
  kind: "number";
  label: string;
  digits: number;
}

interface SelectProcessStep {
  kind: "select";
  label: string;
  options: string[];
}

/** The Print button. It is not a real step: it is only enabled once the process is finished. */
interface PrintProcessStep {
  kind: "print";
  label: string;
}

type ValueProcessStep = TimedProcessStep | NumberProcessStep | SelectProcessStep;
type ProcessStep = ValueProcessStep | PrintProcessStep;

const NORMAL_DURATION_MS: DurationRangeMs = [3000, 5000];
const ERASE_DURATION_MS: DurationRangeMs = [15000, 15000];
const NOT_APPLICABLE_DURATION_MS: DurationRangeMs = [0, 0];

const COSMETIC_GRADES = ["A", "B", "C"];
const NOT_STARTED_VALUE = "—";

function timedStep(
  label: string,
  value = "OK",
  tone: StatusTone = "success",
  durationMs = NORMAL_DURATION_MS,
): TimedProcessStep {
  return { kind: "timed", label, durationMs, value, tone };
}

/** A timed step whose value comes from the device, such as its color. */
function deviceValueStep(label: string, monospace = false): TimedProcessStep {
  return {
    kind: "timed",
    label,
    durationMs: NORMAL_DURATION_MS,
    value: NOT_STARTED_VALUE,
    tone: "value",
    monospace,
  };
}

/** The steps of a station, in the order they run. */
export const PROCESS_STEPS: ProcessStep[] = [
  deviceValueStep("Connected", true),
  { kind: "number", label: "Scan Item", digits: ITEM_NUMBER_LENGTH },
  timedStep("Taptic"),
  timedStep("iOS", "TRUE"),
  timedStep("Carrier Check"),
  timedStep("NGR API"),
  deviceValueStep("Color"),
  { kind: "select", label: "Cosmetic Grade", options: COSMETIC_GRADES },
  timedStep("Cracked Device?", "NO"),
  timedStep("C Grade", "NO"),
  timedStep("iOS Setup", "NAN", "pending", NOT_APPLICABLE_DURATION_MS),
  timedStep("Diagnostics", "NAN", "pending", NOT_APPLICABLE_DURATION_MS),
  timedStep("Erase", "OK", "success", ERASE_DURATION_MS),
  timedStep("ATT eSIM API"),
  timedStep("Sleep"),
  timedStep("NGT API"),
  { kind: "print", label: "Print" },
  timedStep("Finish"),
];

export interface StationProgress {
  /** The step that is running or waiting. It equals the number of steps when all are done. */
  activeIndex: number;
  /** The step that failed. The steps after it never run. */
  failedIndex?: number;
  /** What the technician entered so far, by step label. */
  enteredValues?: Record<string, string>;
}

function buildActiveStep(step: ValueProcessStep, onConfirm: (value: string) => void): StationStep {
  if (step.kind === "timed") return { label: step.label, value: "Running", tone: "running" };
  if (step.kind === "number") {
    return { label: step.label, input: "number", digits: step.digits, onConfirm };
  }
  return { label: step.label, input: "select", options: step.options, onConfirm };
}

function buildDoneStep(step: ValueProcessStep, readings: Record<string, string>): ValueStep {
  const reading = readings[step.label];

  if (step.kind === "timed") {
    return {
      label: step.label,
      value: reading ?? step.value,
      tone: step.tone,
      monospace: step.monospace,
    };
  }
  return {
    label: step.label,
    value: reading ?? NOT_STARTED_VALUE,
    tone: "value",
    monospace: step.kind === "number",
  };
}

function buildSteps(
  { activeIndex, failedIndex }: StationProgress,
  readings: Record<string, string>,
  onConfirm: (value: string) => void,
): StationStep[] {
  const stopIndex = failedIndex ?? activeIndex;
  const isFinished = failedIndex === undefined && activeIndex >= PROCESS_STEPS.length;

  return PROCESS_STEPS.map((step, index): StationStep => {
    if (step.kind === "print")
      return { label: step.label, action: "print", isDisabled: !isFinished };
    if (index === failedIndex) return { label: step.label, value: "FAIL", tone: "danger" };
    if (index > stopIndex) return { label: step.label, value: NOT_STARTED_VALUE, tone: "pending" };
    if (index === stopIndex) return buildActiveStep(step, onConfirm);
    return buildDoneStep(step, readings);
  });
}

function describeProgress({ activeIndex, failedIndex }: StationProgress): {
  state: StationState;
  message: string;
} {
  if (failedIndex !== undefined) {
    return {
      state: "failed",
      message: `${PROCESS_STEPS[failedIndex].label} failed — check the device`,
    };
  }
  if (activeIndex >= PROCESS_STEPS.length) {
    return { state: "success", message: "Finished — ready to unplug" };
  }

  const { kind, label } = PROCESS_STEPS[activeIndex];
  if (kind === "number" || kind === "select") {
    return { state: "waiting", message: `Waiting for you — confirm ${label}` };
  }
  return { state: "running", message: `Running ${label} — don't unplug the device` };
}

/** Finished and failed stations have no input waiting, so there is nothing to confirm. */
function ignoreConfirmation(): void {}

/** Puts a device and its progress together into what a station card shows. */
export function buildStation(
  { readings: deviceReadings, ...deviceInfo }: StationDevice,
  progress: StationProgress,
  onConfirm: (value: string) => void = ignoreConfirmation,
): Station {
  const readings = { ...deviceReadings, ...progress.enteredValues };

  return {
    ...deviceInfo,
    steps: buildSteps(progress, readings, onConfirm),
    ...describeProgress(progress),
  };
}

function getDelayMs(step: ProcessStep): number | null {
  if (step.kind === "number" || step.kind === "select") return null;
  if (step.kind === "print") return 0;

  const [minMs, maxMs] = step.durationMs;
  return minMs + Math.random() * (maxMs - minMs);
}

/**
 * Runs a station's steps one after another. Timed steps finish by themselves;
 * input steps wait until `confirmActiveStep` is called with the technician's value.
 */
export function useStationProcess() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [enteredValues, setEnteredValues] = useState<Record<string, string>>({});

  const activeStep: ProcessStep | undefined = PROCESS_STEPS[activeIndex];

  useEffect(() => {
    if (!activeStep) return;

    const delayMs = getDelayMs(activeStep);
    if (delayMs === null) return;

    const timer = setTimeout(() => setActiveIndex((index) => index + 1), delayMs);
    return () => clearTimeout(timer);
  }, [activeStep]);

  const confirmActiveStep = (value: string) => {
    if (!activeStep) return;
    setEnteredValues((values) => ({ ...values, [activeStep.label]: value }));
    setActiveIndex((index) => index + 1);
  };

  const restart = () => {
    setActiveIndex(0);
    setEnteredValues({});
  };

  return { activeIndex, enteredValues, confirmActiveStep, restart };
}
