"use client";

import { useState } from "react";
import { Card, Form, Button, Table } from "react-bootstrap";
import CopyText from "../TextCopy";

const ROWS: any[] = [
  { label: "Tracking ID", value: "0120120120120120" },
  { label: "CEII", value: "0120120120120120" },
  { label: "IMEI", value: "0120120120120120" },
  { label: "SH", value: "0120120120120120" },
  { label: "Item Number", value: "0120120120120120" },
  { label: "Order Number", value: "0120120120120120" },
];

const CopyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M5 15V5a2 2 0 0 1 2-2h8" />
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M5 12l5 5L20 7" />
  </svg>
);

export default function UuidLookup() {
  const [uuid, setUuid] = useState<any>("");
  const [copied, setCopied] = useState<any>(null);

  const copy = async (text: any, key: any) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied(null), 1500);
    } catch (e: any) {}
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(uuid);
  };

  return (
    <Card className="shadow-sm">
      <Card.Body className="p-4">
        <h4 className="fw-bold mb-3">UUID</h4>

        <Form onSubmit={handleSubmit} className="d-flex gap-2">
          <Form.Control
            value={uuid}
            onChange={(e: any) => setUuid(e.target.value)}
            placeholder="Enter UUID"
            className="font-monospace"
          />
          <Button type="submit" variant="primary" className="fw-bold px-4">
            Submit
          </Button>
        </Form>

        <Table className="mt-4 mb-0 align-middle">
          <tbody>
            {ROWS.map((r: any) => (
              <tr key={r.label}>
                <td className="text-secondary fw-semibold small ps-0" style={{ width: "35%" }}>
                  {r.label}
                </td>
                <td className="font-monospace">
                    <CopyText text={r.value}  />
                    </td>
                
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}
