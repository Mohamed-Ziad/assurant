"use client";

import { useState, type FormEvent } from "react";
import { Button, Card, Form, Table } from "react-bootstrap";
import CopyableText from "@/components/ui/CopyableText";
import { useClipboard } from "@/hooks/useClipboard";
import { findUuidDetails, TRACKING_DETAIL_LABEL, type UuidDetail } from "./uuidDetails";

export default function UuidLookupCard() {
  const [uuid, setUuid] = useState("");
  const [details, setDetails] = useState<UuidDetail[]>([]);
  const { copy } = useClipboard();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const searchedUuid = uuid.trim();
    if (!searchedUuid) return;

    const foundDetails = findUuidDetails(searchedUuid);
    setDetails(foundDetails);

    const trackingDetail = foundDetails.find(({ label }) => label === TRACKING_DETAIL_LABEL);
    if (trackingDetail) await copy(trackingDetail.value, trackingDetail.label);
  };

  return (
    <Card className="shadow-sm">
      <Card.Body className="p-4">
        <h4 className="fw-bold mb-3">UUID</h4>

        <Form onSubmit={handleSubmit} className="d-flex gap-2">
          <Form.Control
            value={uuid}
            onChange={(event) => setUuid(event.target.value)}
            placeholder="Enter UUID"
            className="font-monospace"
          />
          <Button type="submit" variant="primary" className="fw-bold px-4">
            Submit
          </Button>
        </Form>

        {details.length > 0 && (
          <Table className="mt-4 mb-0 align-middle">
            <tbody>
              {details.map(({ label, value }) => (
                <tr key={label}>
                  <td className="text-secondary fw-semibold small ps-0" style={{ width: "35%" }}>
                    {label}
                  </td>
                  <td className="font-monospace">
                    <CopyableText text={value} label={label} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card.Body>
    </Card>
  );
}
