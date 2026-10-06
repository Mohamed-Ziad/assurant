import { Form } from "react-bootstrap";
import { COLORS } from "@/constants/colors";
import { DEVICE_COLORS } from "./inspectionQuestions";
import InspectionRow from "./InspectionRow";

interface DeviceColorRowProps {
  number: number;
  selectedColor: string;
  errorMessage?: string;
  onChange: (color: string) => void;
}

/** The last question of the form: a dropdown with the device color. */
export default function DeviceColorRow({
  number,
  selectedColor,
  errorMessage,
  onChange,
}: DeviceColorRowProps) {
  const selectedHex = DEVICE_COLORS.find((color) => color.value === selectedColor)?.hex;

  return (
    <InspectionRow
      number={number}
      isAnswered={Boolean(selectedColor)}
      accentColor={errorMessage ? COLORS.danger : selectedColor ? COLORS.success : undefined}
      hasError={Boolean(errorMessage)}
      isLast
    >
      <Form.Label htmlFor="color" className="fw-semibold mb-1">
        Device color
      </Form.Label>

      <div className="d-flex align-items-center gap-2">
        <span
          className="rounded-circle border"
          style={{ width: 20, height: 20, background: selectedHex ?? "transparent" }}
        />
        <Form.Select
          id="color"
          name="color"
          value={selectedColor}
          onChange={(event) => onChange(event.target.value)}
          isInvalid={Boolean(errorMessage)}
          style={{ maxWidth: 240 }}
          className="fw-semibold"
        >
          <option value="" disabled>
            Select a color…
          </option>
          {DEVICE_COLORS.map((color) => (
            <option key={color.value} value={color.value}>
              {color.label}
            </option>
          ))}
        </Form.Select>
      </div>

      {errorMessage && <div className="text-danger small fw-semibold mt-2">✕ {errorMessage}</div>}
    </InspectionRow>
  );
}
