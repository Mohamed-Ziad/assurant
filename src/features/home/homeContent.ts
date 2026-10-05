export interface PageSummary {
  name: string;
  href: string;
  description: string;
  highlights: string[];
}

export interface DesignPrinciple {
  title: string;
  description: string;
}

export type StudyFileType = "PPTX" | "XLSX";

export interface StudyFile {
  name: string;
  fileType: StudyFileType;
  description: string;
  /** Opens the file in the browser. */
  viewUrl: string;
  /** Downloads the file. The file must be shared as "Anyone with the link". */
  downloadUrl: string;
}

export const HERO_EYEBROW = "Device Repair · UI Improvements";
export const HERO_TITLE = "Same work, less time.";
export const HERO_DESCRIPTION =
  "A cleaner version of the pages we use every day — built to be read at a glance, with fewer clicks per device.";

export const STUDY_SECTION_ID = "study";

export const PAGE_SUMMARIES: PageSummary[] = [
  {
    name: "Omnicore",
    href: "/omnicore",
    description:
      "Every station at a glance. Each step shows clearly if it passed, failed, or is still running.",
    highlights: ["Status with color + icon", "Steps line up across stations"],
  },
  {
    name: "Item Workflow",
    href: "/itemworkflow",
    description: "Find an item by Item, Invoice, or IMEI. Copy and paste on every field.",
    highlights: ["One-click copy & paste", "Clear errors before search"],
  },
  {
    name: "Carton Workflow",
    href: "/cartonworkflow",
    description:
      "Search a carton and read its trades fast: model, item and IMEI in one clean table.",
    highlights: ["Numbers in monospace", "Receive / Shortage side by side"],
  },
  {
    name: "UUID",
    href: "/uuid",
    description: "Look up a UUID and copy any value by clicking on it.",
    highlights: ["Click the text to copy", "Quiet, easy-to-read table"],
  },
];

export const DESIGN_PRINCIPLES: DesignPrinciple[] = [
  {
    title: "Faster to scan",
    description: "Numbers in monospace, calm tables, and only the information that matters.",
  },
  {
    title: "Fewer clicks",
    description: "Copy any value by clicking it. Paste straight into the field.",
  },
  {
    title: "Clear status",
    description:
      "Pass, fail and running use color and an icon — readable for color-blind users too.",
  },
];

const PRESENTATION_ID = "1b244u-BpJRcTZO7dWvBQyM04nImlCYI7RQZAk5IYuzU";
const MEASUREMENTS_ID = "1kkLQ3ZKfFz75R6WLUU_zk9PaiIP5Y7Cj";

export const STUDY_FILES: StudyFile[] = [
  {
    name: "UI Study — Presentation",
    fileType: "PPTX",
    description: "The full proposal: problems found and the new design.",
    viewUrl: `https://docs.google.com/presentation/d/${PRESENTATION_ID}/edit`,
    downloadUrl: `https://docs.google.com/presentation/d/${PRESENTATION_ID}/export/pptx`,
  },
  {
    name: "UI Study — Measurements",
    fileType: "XLSX",
    description: "Time measurements before and after, per page.",
    viewUrl: `https://docs.google.com/spreadsheets/d/${MEASUREMENTS_ID}/edit`,
    downloadUrl: `https://drive.google.com/uc?export=download&id=${MEASUREMENTS_ID}`,
  },
];
