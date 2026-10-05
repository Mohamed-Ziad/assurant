"use client";

import { Col, Row } from "react-bootstrap";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { COLORS } from "@/constants/colors";
import { DOWNLOADING_STATION_SLOT, STATIONS } from "./stationData";
import StationCard from "./StationCard";

export default function StationGrid() {
  return (
    <div>
      <div
        className="d-inline-flex align-items-center gap-2 bg-white rounded px-3 py-1 mb-3"
        style={{ fontSize: 13, color: COLORS.gray700, border: `1px solid ${COLORS.gray200}` }}
      >
        <LoadingSpinner />
        Downloading files for Station <b>{DOWNLOADING_STATION_SLOT}</b>
      </div>

      <Row className="g-4">
        {STATIONS.map((station) => (
          <Col key={station.slot} lg={4}>
            <StationCard station={station} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
