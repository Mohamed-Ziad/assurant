import { COLORS } from "@/constants/colors";
import type {
  AnswerOption,
  AnswerTone,
  DeviceColor,
  InspectionMode,
  InspectionQuestion,
} from "./types";

/**
 * Every tone has its own color AND its own icon, so answers can be read
 * without relying on color (color-blind and low-vision users).
 */
export const ANSWER_TONES: Record<AnswerTone, { color: string; icon: string; name: string }> = {
  pass: { color: COLORS.success, icon: "✓", name: "Pass" },
  fail: { color: COLORS.danger, icon: "✕", name: "Fail" },
  minor: { color: COLORS.info, icon: "!", name: "Minor" },
  unverified: { color: COLORS.gray600, icon: "?", name: "Unverified" },
};

/** The answer every question starts with. It does not count as an answer. */
export const UNVERIFIED_ANSWER = "unverified";

const UNVERIFIED_OPTION: AnswerOption = {
  value: UNVERIFIED_ANSWER,
  label: "Unverified",
  tone: "unverified",
};

const YES_NO_UNVERIFIED: AnswerOption[] = [
  { value: "yes", label: "Yes", tone: "pass" },
  { value: "no", label: "No", tone: "fail" },
  UNVERIFIED_OPTION,
];

export const INSPECTION_QUESTIONS: InspectionQuestion[] = [
  {
    id: "power",
    title: "Powers on",
    subtitle: "Does the device turn on?",
    options: YES_NO_UNVERIFIED,
  },
  {
    id: "activationLock",
    title: "Activation lock cleared",
    subtitle: "Customer activation lock removed",
    options: YES_NO_UNVERIFIED,
  },
  { id: "screenOn", title: "Screen turns on", options: YES_NO_UNVERIFIED },
  {
    id: "cracks",
    title: "Screen free of cracks",
    options: [
      { value: "yes", label: "Yes, no cracks", tone: "pass" },
      { value: "major", label: "Major cracks", tone: "fail" },
      { value: "minor", label: "Minor cracks", tone: "minor" },
      UNVERIFIED_OPTION,
    ],
  },
  {
    id: "burnIn",
    title: "Screen free of bruising / burn-in",
    options: [
      { value: "yes", label: "Yes, clean", tone: "pass" },
      { value: "major", label: "Major burn-in", tone: "fail" },
      { value: "minor", label: "Minor burn-in", tone: "minor" },
      UNVERIFIED_OPTION,
    ],
  },
  {
    id: "surfaces",
    title: "Surfaces perfect",
    subtitle: "Scratches or scuff marks",
    options: [
      { value: "yes", label: "Yes, perfect", tone: "pass" },
      { value: "light", label: "Small / light scratches", tone: "minor" },
      { value: "heavy", label: "Large / heavy scratches", tone: "fail" },
      UNVERIFIED_OPTION,
    ],
  },
  {
    id: "ports",
    title: "Connectors / ports / covers perfect",
    options: YES_NO_UNVERIFIED,
    followUp: {
      triggerValue: "no",
      label: "What's wrong?",
      fieldName: "portsIssues",
      items: [
        { value: "damaged", label: "Damaged connectors" },
        { value: "sim", label: "SIM tray missing or damaged" },
        { value: "parts", label: "Missing parts" },
      ],
    },
  },
  {
    id: "battery",
    title: "Battery health",
    options: [
      { value: "ok", label: "≥ 70%", tone: "pass" },
      { value: "low", label: "< 70%", tone: "fail" },
      UNVERIFIED_OPTION,
    ],
  },
  { id: "audio", title: "Speaker & microphone work", options: YES_NO_UNVERIFIED },
  { id: "charge", title: "Takes a charge", options: YES_NO_UNVERIFIED },
  {
    id: "buttons",
    title: "Exterior buttons work",
    subtitle: "Home, volume, mute, keypad",
    options: YES_NO_UNVERIFIED,
  },
  { id: "deadPixels", title: "Fewer than 3 dead pixels", options: YES_NO_UNVERIFIED },
  { id: "frontCamera", title: "Front camera works", options: YES_NO_UNVERIFIED },
  { id: "rearCamera", title: "Rear camera works", options: YES_NO_UNVERIFIED },
  {
    id: "dataClearProof",
    title: "Automation tool proof of data clear",
    options: YES_NO_UNVERIFIED,
  },
  { id: "dataWiped", title: "Device data wiped", options: YES_NO_UNVERIFIED },
];

/** Which questions each mode shows, in display order. `"all"` shows every question. */
export const QUESTION_IDS_BY_MODE: Record<InspectionMode, readonly string[] | "all"> = {
  BDP: ["power", "activationLock", "screenOn", "ports", "charge"],
  NTO: ["power"],
  SRC: ["power", "activationLock", "screenOn", "charge"],
  ALL: "all",
};

export const INSPECTION_MODES = Object.keys(QUESTION_IDS_BY_MODE) as InspectionMode[];

export const DEVICE_COLORS: DeviceColor[] = [
  { value: "black", label: "Black", hex: "#111827" },
  { value: "blue", label: "Blue", hex: "#2563eb" },
  { value: "gold", label: "Gold", hex: "#d4af37" },
  { value: "silver", label: "Silver", hex: "#c0c4cc" },
];

/** Name of the form field that stores the device color. */
export const DEVICE_COLOR_FIELD = "color";
