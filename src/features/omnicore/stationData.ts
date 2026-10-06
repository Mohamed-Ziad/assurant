import { buildStation, PROCESS_STEPS } from "./stationProcess";
import type { Station, StationDevice } from "./types";

/** The slot of the station that is currently downloading files. */
export const DOWNLOADING_STATION_SLOT = "A6";

/** The phone whose process runs live on the page. */
export const LIVE_DEVICE: StationDevice = {
  slot: "A1",
  operatingSystem: "iOS",
  model: "iPhone 14 Pro Max",
  modelCode: "A2651",
  storage: "512GB",
  serialNumber: "353696747601548",
  readings: { Connected: "26.02.01", Color: "Deep Purple" },
};

const FINISHED_DEVICE: StationDevice = {
  slot: "A2",
  operatingSystem: "iOS",
  model: "iPhone 15",
  modelCode: "A3090",
  storage: "128GB",
  serialNumber: "353696747343232",
  readings: {
    Connected: "26.02.01",
    "Scan Item": "629214897",
    Color: "Blue",
    "Cosmetic Grade": "A",
  },
};

const FAILED_DEVICE: StationDevice = {
  slot: "A3",
  operatingSystem: "iOS",
  model: "iPhone 13",
  modelCode: "A2482",
  storage: "256GB",
  serialNumber: "353696748841812",
  readings: {
    Connected: "25.12.03",
    "Scan Item": "598685229",
    Color: "Midnight",
    "Cosmetic Grade": "B",
  },
};

const ERASE_STEP_INDEX = PROCESS_STEPS.findIndex((step) => step.label === "Erase");

/** Stations that are not running: one that finished and one that failed while erasing. */
export const STATIC_STATIONS: Station[] = [
  buildStation(FINISHED_DEVICE, { activeIndex: PROCESS_STEPS.length }),
  buildStation(FAILED_DEVICE, { activeIndex: ERASE_STEP_INDEX, failedIndex: ERASE_STEP_INDEX }),
];
