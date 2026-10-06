import { ALPHANUMERIC, mockText } from "@/utils/mockData";

export interface UuidDetail {
  label: string;
  value: string;
}

export const TRACKING_DETAIL_LABEL = "Tracking number";

/** The details of a UUID. Replace with the real API call. */
export function findUuidDetails(uuid: string): UuidDetail[] {
  return [
    { label: TRACKING_DETAIL_LABEL, value: `1Z${mockText(`${uuid}-tracking`, 16, ALPHANUMERIC)}` },
    { label: "CEII", value: mockText(`${uuid}-ceii`, 14) },
    { label: "IMEI number", value: mockText(`${uuid}-imei`, 15) },
    { label: "SH", value: mockText(`${uuid}-sh`, 10) },
    { label: "Item number", value: mockText(`${uuid}-item`, 9) },
    { label: "Order number", value: mockText(`${uuid}-order`, 10) },
  ];
}
