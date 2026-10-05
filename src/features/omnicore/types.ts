import type { BannerTone } from "@/components/ui/StatusBanner";
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
}

export type StationStep = ValueStep | ActionStep;

export interface Station {
  slot: string;
  operatingSystem: string;
  model: string;
  modelCode: string;
  storage: string;
  serialNumber: string;
  /** Steps shown in rows of five. */
  steps: StationStep[];
  /** Steps shown centered in the last row. */
  finalSteps: StationStep[];
  status: { tone: BannerTone; message: string };
}
