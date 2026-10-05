import type { PhoneCaseQuestion } from "./types";

const YES_NO_UNVERIFIED = ["Yes", "No", "Unverified"];

export const PHONE_CASE_COLORS = [
  { value: "red", label: "Red" },
  { value: "green", label: "Green" },
  { value: "blue", label: "Blue" },
  { value: "white", label: "White" },
  { value: "black", label: "Black" },
];

/** The questions of the form as it works today. */
export const LEGACY_QUESTIONS: PhoneCaseQuestion[] = [
  { id: "deviceTurnsOn", text: "Is the device on?", options: YES_NO_UNVERIFIED },
  {
    id: "activationLockCleared",
    text: "Is the customer activation lock cleared?",
    options: YES_NO_UNVERIFIED,
  },
  { id: "screenTurnsOn", text: "Does the screen turn on?", options: YES_NO_UNVERIFIED },
  {
    id: "screenFreeOfCracks",
    text: "Is the screen free of cracks?",
    options: ["Yes", "Major burns and cracks", "Minor burns and cracks", "Unverified"],
  },
  {
    id: "screenFreeOfBurnIn",
    text: "Is the screen free of any bruising/burn-in?",
    options: [
      "Yes",
      "Major bruising/burn-in and cracks",
      "Minor bruising/burn-in and cracks",
      "Unverified",
    ],
  },
  {
    id: "surfacesPerfect",
    text: "Are all surfaces perfect?",
    options: [
      "Yes",
      "Small/light scratches and/or scuff marks",
      "Large/heavy scratches and/or scuff marks",
      "Unverified",
    ],
  },
  {
    id: "connectorsPerfect",
    text: "Are all the connectors/ports/under covers perfect?",
    options: YES_NO_UNVERIFIED,
    checklist: {
      caption: "Just if No",
      items: ["Damaged connectors", "SIM tray missing or damaged", "Missing parts"],
    },
  },
  {
    id: "batteryHealth",
    text: "Battery health",
    options: ["Greater than or equal to 70%", "Less than 70%", "Unverified"],
  },
  {
    id: "speakerAndMicrophone",
    text: "Do the speaker and microphone work?",
    options: YES_NO_UNVERIFIED,
  },
  { id: "takesCharge", text: "Does the device take charge?", options: YES_NO_UNVERIFIED },
  {
    id: "exteriorButtons",
    text: "Does the device have working exterior buttons? (home, volume, mute, keypad)",
    options: YES_NO_UNVERIFIED,
  },
  {
    id: "fewerThanThreeDeadPixels",
    text: "Does the device have fewer than 3 dead pixels?",
    options: YES_NO_UNVERIFIED,
  },
  { id: "frontCamera", text: "Does the front camera work?", options: YES_NO_UNVERIFIED },
  { id: "rearCamera", text: "Does the rear camera work?", options: YES_NO_UNVERIFIED },
  {
    id: "dataClearProof",
    text: "Automation tool proof of successful data clear",
    options: YES_NO_UNVERIFIED,
  },
  { id: "dataWiped", text: "Has the device been data wiped?", options: YES_NO_UNVERIFIED },
];

/** The shorter question set of the redesigned form. */
export const REDESIGNED_QUESTIONS: PhoneCaseQuestion[] = [
  { id: "deviceTurnsOn", text: "Is the device on?", options: YES_NO_UNVERIFIED },
  {
    id: "activationLockCleared",
    text: "Is the user lock cleared?",
    options: YES_NO_UNVERIFIED,
  },
  { id: "screenTurnsOn", text: "Is the screen on?", options: YES_NO_UNVERIFIED },
  {
    id: "screenFreeOfCracks",
    text: "Is the screen free of cracks?",
    options: ["Yes", "Major burns and cracks", "Minor burns and cracks", "Unverified"],
  },
  { id: "takesCharge", text: "Does the device take charge?", options: YES_NO_UNVERIFIED },
  { id: "exteriorButtons", text: "Do the external buttons work?", options: YES_NO_UNVERIFIED },
  {
    id: "threeOrMoreDeadPixels",
    text: "Does the screen have three or more dead pixels?",
    options: YES_NO_UNVERIFIED,
  },
  { id: "microphone", text: "Does the microphone work?", options: YES_NO_UNVERIFIED },
  { id: "frontCamera", text: "Does the front camera work?", options: YES_NO_UNVERIFIED },
  { id: "rearCamera", text: "Does the rear camera work?", options: YES_NO_UNVERIFIED },
  { id: "dataWiped", text: "Has the data been wiped?", options: YES_NO_UNVERIFIED },
];
