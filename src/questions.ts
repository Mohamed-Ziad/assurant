// How many random questions each mode shows. ALL = every question.
export const MODES = {
  BDP: 5,
  NTO: 2,
  SRC: 4,
  ALL: Infinity,
};

// tone: good | bad | warn | unv  (drives the colors)
const YNU = [
  { value: "yes", label: "Yes", tone: "good" },
  { value: "no", label: "No", tone: "bad" },
  { value: "unv", label: "Unverified", tone: "unv" },
];

export const QUESTIONS = [
  { id: "power", title: "Powers on", sub: "Does the device turn on?", options: YNU },
  { id: "actlock", title: "Activation lock cleared", sub: "Customer activation lock removed", options: YNU },
  { id: "screenOn", title: "Screen turns on", options: YNU },
  {
    id: "cracks", title: "Screen free of cracks",
    options: [
      { value: "yes", label: "Yes, no cracks", tone: "good" },
      { value: "major", label: "Major cracks", tone: "bad" },
      { value: "minor", label: "Minor cracks", tone: "warn" },
      { value: "unv", label: "Unverified", tone: "unv" },
    ],
  },
  {
    id: "burnin", title: "Screen free of bruising / burn-in",
    options: [
      { value: "yes", label: "Yes, clean", tone: "good" },
      { value: "major", label: "Major burn-in", tone: "bad" },
      { value: "minor", label: "Minor burn-in", tone: "warn" },
      { value: "unv", label: "Unverified", tone: "unv" },
    ],
  },
  {
    id: "surfaces", title: "Surfaces perfect", sub: "Scratches or scuff marks",
    options: [
      { value: "yes", label: "Yes, perfect", tone: "good" },
      { value: "light", label: "Small / light scratches", tone: "warn" },
      { value: "heavy", label: "Large / heavy scratches", tone: "bad" },
      { value: "unv", label: "Unverified", tone: "unv" },
    ],
  },
  {
    id: "ports", title: "Connectors / ports / covers perfect", options: YNU,
    followUp: {
      when: "no",
      label: "What's wrong?",
      items: [
        { value: "damaged", label: "Damaged connectors" },
        { value: "sim", label: "SIM tray missing or damaged" },
        { value: "parts", label: "Missing parts" },
      ],
    },
  },
  {
    id: "battery", title: "Battery health",
    options: [
      { value: "ok", label: "≥ 70%", tone: "good" },
      { value: "low", label: "< 70%", tone: "bad" },
      { value: "unv", label: "Unverified", tone: "unv" },
    ],
  },
  { id: "audio", title: "Speaker & microphone work", options: YNU },
  { id: "charge", title: "Takes a charge", options: YNU },
  { id: "buttons", title: "Exterior buttons work", sub: "Home, volume, mute, keypad", options: YNU },
  { id: "pixels", title: "Fewer than 3 dead pixels", options: YNU },
  { id: "frontCam", title: "Front camera works", options: YNU },
  { id: "rearCam", title: "Rear camera works", options: YNU },
  { id: "proofClear", title: "Automation tool proof of data clear", options: YNU },
  { id: "wiped", title: "Device data wiped", options: YNU },
];

// Pool for the color select — 4 of these are picked at random.
export const COLOR_POOL = [
  { value: "black", label: "Black", hex: "#111827" },
  { value: "white", label: "White", hex: "#f9fafb" },
  { value: "silver", label: "Silver", hex: "#c0c4cc" },
  { value: "gold", label: "Gold", hex: "#d4af37" },
  { value: "blue", label: "Blue", hex: "#2563eb" },
  { value: "red", label: "Red", hex: "#dc2626" },
  { value: "green", label: "Green", hex: "#16a34a" },
  { value: "purple", label: "Purple", hex: "#7c3aed" },
  { value: "pink", label: "Pink", hex: "#f472b6" },
  { value: "yellow", label: "Yellow", hex: "#facc15" },
  { value: "graphite", label: "Graphite", hex: "#4b5563" },
  { value: "titanium", label: "Titanium", hex: "#a8a29e" },
];

export const TONE_NAMES = { good: "Pass", warn: "Minor", bad: "Fail", unv: "Unverified" };