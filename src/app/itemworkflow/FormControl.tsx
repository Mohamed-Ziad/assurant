"use client";

import { Form, InputGroup } from "react-bootstrap";

export default function FormControlWithCPControles() {
  return (
    <>
      <Form.Label>Item Number</Form.Label>
      <InputGroup className="mb-3 w-75 cutsom-paste-input">
        <small>
          {" "}
          <i className="icofont-copy"></i>{" "}
        </small>
        <Form.Control aria-label="Username" aria-describedby="basic-addon1" />
        <button className="input-group-text" id="basic-addon2">
          Paste
        </button>
      </InputGroup>
    </>
  );
}
