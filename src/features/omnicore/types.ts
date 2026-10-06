import type { StatusTone } from "@/components/ui/StatusGlyph";

/** A step that shows a value, such as "OK" or a software version. */
export interface ValueStep {
  label: string;
  value: string;
  tone: StatusTone;
  monospace?: boolean;
}

/** A step that is a button the technician presses. */
export interface ActionStep {
  label: string;
  action: "print";
  isDisabled: boolean;
}

/** A step where the technician types a number or picks an option, then confirms to continue. */
interface NumberInputStep {
  label: string;
  input: "number";
  digits: number;
  onConfirm: (value: string) => void;
}

interface SelectInputStep {
  label: string;
  input: "select";
  options: string[];
  onConfirm: (value: string) => void;
}

export type InputStep = NumberInputStep | SelectInputStep;

export type StationStep = ValueStep | ActionStep | InputStep;

/** Running: a step loads. Waiting: the technician must confirm a step. */
export type StationState = "running" | "waiting" | "success" | "failed";

/** The phone in a station, and the values its steps show. */
export interface StationDevice {
  slot: string;
  operatingSystem: string;
  model: string;
  modelCode: string;
  storage: string;
  serialNumber: string;
  /** Values shown by steps, by step label. For example the device color or the scanned item. */
  readings: Record<string, string>;
}

export interface Station extends Omit<StationDevice, "readings"> {
  /** Shown in rows of five, the last row centered. */
  steps: StationStep[];
  state: StationState;
  message: string;
}
