"use client";

import { useState, type FormEvent } from "react";
import { Button, Card, Form, Table } from "react-bootstrap";
import CopyableText from "@/components/ui/CopyableText";
import { UUID_DETAILS } from "./uuidDetails";

export default function UuidLookupCard() {
  const [uuid, setUuid] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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

        <Table className="mt-4 mb-0 align-middle">
          <tbody>
            {UUID_DETAILS.map(({ label, value }) => (
              <tr key={label}>
                <td className="text-secondary fw-semibold small ps-0" style={{ width: "35%" }}>
                  {label}
                </td>
                <td className="font-monospace">
                  <CopyableText text={value} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}
