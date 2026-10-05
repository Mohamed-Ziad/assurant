import type { Station, StationStep, ValueStep } from "./types";

/** The slot of the station that is currently downloading files. */
export const DOWNLOADING_STATION_SLOT = "A6";

const SAMPLE_STEPS: StationStep[] = [
  { label: "Connected", value: "26.02.01", tone: "value", monospace: true },
  { label: "Scan Item", value: "758412758", tone: "value", monospace: true },
  { label: "Taptic", value: "OK", tone: "success" },
  { label: "iOS", value: "TRUE", tone: "success" },
  { label: "Carrier Check", value: "OK", tone: "success" },
  { label: "NGR API", value: "OK", tone: "success" },
  { label: "Color", value: "Dark Red", tone: "value" },
  { label: "Cosmetic Grade", value: "C", tone: "value" },
  { label: "Cracked Device?", value: "NO", tone: "success" },
  { label: "C Grade", value: "NO", tone: "success" },
  { label: "iOS Setup", value: "NAN", tone: "pending" },
  { label: "Diagnostics", value: "NAN", tone: "pending" },
  { label: "Erase", value: "OK", tone: "success" },
  { label: "ATT eSIM API", value: "OK", tone: "success" },
  { label: "Sleep", value: "OK", tone: "success" },
];

const SAMPLE_FINAL_STEPS: StationStep[] = [
  { label: "NGT API", value: "OK", tone: "success" },
  { label: "Print", action: "print" },
  { label: "Finish", value: "OK", tone: "success" },
];

/** Replaces the value and tone of the steps whose label is a key of `changesByLabel`. */
function changeSteps(
  steps: StationStep[],
  changesByLabel: Record<string, Pick<ValueStep, "value" | "tone">>,
): StationStep[] {
  return steps.map((step) => {
    if ("action" in step) return step;
    const change = changesByLabel[step.label];
    return change ? { ...step, ...change } : step;
  });
}

const SAMPLE_DEVICE = {
  operatingSystem: "iOS",
  model: "iPhone 14 Pro Max",
  modelCode: "A5678",
  storage: "512GB",
  serialNumber: "12345678912346",
};

export const STATIONS: Station[] = [
  {
    slot: "A1",
    ...SAMPLE_DEVICE,
    steps: SAMPLE_STEPS,
    finalSteps: SAMPLE_FINAL_STEPS,
    status: { tone: "running", message: "Wiping — don't unplug the device" },
  },
  {
    slot: "A2",
    ...SAMPLE_DEVICE,
    steps: SAMPLE_STEPS,
    finalSteps: SAMPLE_FINAL_STEPS,
    status: { tone: "success", message: "Finished — ready to unplug" },
  },
  {
    slot: "A3",
    ...SAMPLE_DEVICE,
    steps: changeSteps(SAMPLE_STEPS, {
      Erase: { value: "FAIL", tone: "danger" },
      "ATT eSIM API": { value: "Running", tone: "running" },
      Sleep: { value: "NAN", tone: "pending" },
    }),
    finalSteps: changeSteps(SAMPLE_FINAL_STEPS, {
      "NGT API": { value: "NAN", tone: "pending" },
      Finish: { value: "NAN", tone: "pending" },
    }),
    status: { tone: "danger", message: "Erase failed — check the device" },
  },
];
