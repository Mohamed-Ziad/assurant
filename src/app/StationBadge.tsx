"use client";

import { Badge } from "react-bootstrap";

interface IProps {
  label: string;
  badge: string;
}

export default function StationBadge({ label, badge }: IProps) {
  return (
    <>
      <span
        className="text-center me-2 d-flex flex-column align-items-center"
        style={{ width: "18%" }}
      >
        <div
          className="d-flex align-items-end justify-content-center w-100"
          style={{ minHeight: "32px" }} // كافي لسطرين بخط 12px، عدّلها لو الخط تغيّر
        >
          <label
            className="mb-0"
            style={{ fontSize: "12px", lineHeight: "1.3", textTransform: "capitalize" }}
          >
            {label}
          </label>
        </div>
        <Badge
          className="bg-success mx-1 mt-1 mb-3 py-2"
          style={{
            fontSize: "12px",
            fontWeight: "500",
            width: "100%",
          }}
        >
          {badge}
        </Badge>
      </span>
    </>
  );
}
