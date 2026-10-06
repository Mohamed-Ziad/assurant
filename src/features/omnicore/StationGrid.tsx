"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Col, ProgressBar, Row } from "react-bootstrap";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { COLORS } from "@/constants/colors";
import { DOWNLOADING_STATION_SLOT, LIVE_DEVICE, STATIC_STATIONS } from "./stationData";
import { buildStation, useStationProcess } from "./stationProcess";
import StationCard from "./StationCard";
import type { Station } from "./types";

const DOWNLOAD_STEP_MS = 300;
const PERCENT_LABEL_WIDTH = 40;

const PILL_STYLE = {
  fontSize: 13,
  color: COLORS.gray700,
  border: `1px solid ${COLORS.gray200}`,
};

/** Shows the files of a station downloading, with a progress bar that starts over when it reaches 100%. */
function DownloadProgress({ slot }: { slot: string }) {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setPercent((current) => (current >= 100 ? 0 : current + 1)),
      DOWNLOAD_STEP_MS,
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="d-inline-flex align-items-center gap-2 bg-white rounded px-3 py-2"
      style={PILL_STYLE}
    >
      <LoadingSpinner />
      <span>
        Downloading files for Station <b>{slot}</b>
      </span>
      <ProgressBar now={percent} aria-label="Download progress" style={{ width: 140, height: 6 }} />
      <span
        className="font-monospace fw-semibold text-end"
        style={{ width: PERCENT_LABEL_WIDTH, color: COLORS.info }}
      >
        {percent}%
      </span>
    </div>
  );
}

interface SummaryBadgeProps {
  background: string;
  children: ReactNode;
}

function SummaryBadge({ background, children }: SummaryBadgeProps) {
  return (
    <span className="badge rounded-pill px-3 py-2 fw-semibold" style={{ background, fontSize: 13 }}>
      {children}
    </span>
  );
}

/** Counts of the connected phones and which slots they are in, so the technician sees it at a glance. */
function StationSummary({ stations }: { stations: Station[] }) {
  const countWithState = (state: Station["state"]) =>
    stations.filter((station) => station.state === state).length;

  return (
    <div className="d-flex flex-wrap gap-2">
      <SummaryBadge background={COLORS.info}>{stations.length} Connected</SummaryBadge>
      <SummaryBadge background={COLORS.success}>
        {countWithState("success")} Successful
      </SummaryBadge>
      <SummaryBadge background={COLORS.danger}>{countWithState("failed")} Failed</SummaryBadge>
      <SummaryBadge background={COLORS.gray700}>
        Slots {stations.map((station) => station.slot).join(" · ")}
      </SummaryBadge>
    </div>
  );
}

export default function StationGrid() {
  const { activeIndex, enteredValues, confirmActiveStep, restart } = useStationProcess();

  const liveStation = buildStation(LIVE_DEVICE, { activeIndex, enteredValues }, confirmActiveStep);
  const stations = [liveStation, ...STATIC_STATIONS];

  return (
    <div>
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-3">
        <StationSummary stations={stations} />
        <DownloadProgress slot={DOWNLOADING_STATION_SLOT} />
      </div>

      <Row className="g-4">
        {stations.map((station) => (
          <Col key={station.slot} lg={6} xxl={4}>
            <StationCard
              station={station}
              onRestart={station === liveStation ? restart : undefined}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}
