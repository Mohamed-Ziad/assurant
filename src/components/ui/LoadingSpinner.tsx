"use client";

import { Spinner } from "react-bootstrap";
import { COLORS } from "@/constants/colors";

/** Small spinner with a gray track and a blue arc. */
export default function LoadingSpinner() {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        width: 12,
        height: 12,
        borderWidth: 2,
        borderTopColor: COLORS.info,
        borderRightColor: COLORS.spinnerTrack,
        borderBottomColor: COLORS.spinnerTrack,
        borderLeftColor: COLORS.spinnerTrack,
        flexShrink: 0,
      }}
    >
      <span className="visually-hidden">Loading…</span>
    </Spinner>
  );
}
