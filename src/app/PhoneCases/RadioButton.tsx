"use client";

import { Form } from "react-bootstrap";

interface IProps {
  name: string;
  label: string
}

export default function RadioButton({ name, label }: IProps) {
  return (
    <Form.Check // prettier-ignore
      type={"radio"}
      id={Math.random().toString()}
      label={label}
      className="me-2 "
      name={name}
    />
  );
}


export  function RadioButtonAfter({ name, label }: IProps) {
  return (
    <Form.Check // prettier-ignore
      type={"radio"}
      id={Math.random().toString()}
      label={label}
      className="text-muted me-1 "
      name={name}
      style={{ fontSize: "14px", textTransform: "capitalize" }}
    />
  );
}
