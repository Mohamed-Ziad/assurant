"use client";

import { Form, InputGroup } from "react-bootstrap";
import { COLORS } from "@/constants/colors";
import { useClipboard } from "@/hooks/useClipboard";
import IconButton from "./IconButton";

interface ClipboardFieldProps {
  name: string;
  label: string;
  value: string;
  placeholder?: string;
  /** Opens the numeric keyboard on touch devices. */
  isNumeric?: boolean;
  errorMessage?: string;
  /** Cleans typed and pasted text before it reaches `onValueChange`. */
  sanitize?: (rawValue: string) => string;
  onValueChange: (value: string) => void;
}

const keepValueAsIs = (rawValue: string) => rawValue;

/** A text input with a copy button and a paste button inside it. */
export default function ClipboardField({
  name,
  label,
  value,
  placeholder,
  isNumeric = false,
  errorMessage,
  sanitize = keepValueAsIs,
  onValueChange,
}: ClipboardFieldProps) {
  const { copiedKey, copy, paste } = useClipboard();

  const pasteIntoField = async () => {
    const clipboardText = await paste();
    if (clipboardText !== null) onValueChange(sanitize(clipboardText));
  };

  return (
    <Form.Group controlId={`field-${name}`} className="mb-3">
      <Form.Label className="fw-semibold small mb-1 text-secondary">{label}</Form.Label>

      <InputGroup>
        <Form.Control
          name={name}
          value={value}
          onChange={(event) => onValueChange(sanitize(event.target.value))}
          placeholder={placeholder}
          inputMode={isNumeric ? "numeric" : "text"}
          autoComplete="off"
          isInvalid={Boolean(errorMessage)}
          className="font-monospace border-end-0"
          style={{ fontSize: 15 }}
        />
        <InputGroup.Text
          className="bg-white gap-1 px-1"
          style={errorMessage ? { borderColor: COLORS.danger } : undefined}
        >
          <IconButton
            icon={copiedKey === name ? "check" : "copy"}
            label={`Copy ${label}`}
            disabled={!value}
            onClick={() => copy(value, name)}
          />
          <span className="vr my-1" />
          <IconButton icon="paste" label={`Paste ${label}`} onClick={pasteIntoField} />
        </InputGroup.Text>
      </InputGroup>

      {errorMessage && (
        <div className="small mt-1" style={{ color: COLORS.danger }}>
          {errorMessage}
        </div>
      )}
    </Form.Group>
  );
}
