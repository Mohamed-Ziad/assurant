import { Button, Container } from "react-bootstrap";
import { ANSWER_TONES } from "./inspectionQuestions";
import type { AnswerTone } from "./types";

interface InspectionSummaryBarProps {
  answeredCount: number;
  countsByTone: Record<AnswerTone, number>;
}

/** The bottom bar: how many answers of each tone were given, and the Submit button. */
export default function InspectionSummaryBar({
  answeredCount,
  countsByTone,
}: InspectionSummaryBarProps) {
  const tones = (Object.keys(countsByTone) as AnswerTone[]).filter(
    (tone) => countsByTone[tone] > 0,
  );

  return (
    <div className="bg-white border-top py-2">
      <Container
        className="d-flex justify-content-between align-items-center"
        style={{ maxWidth: 900 }}
      >
        <div className="d-flex flex-wrap gap-1">
          {answeredCount === 0 && <span className="text-muted small">No answers yet</span>}

          {tones.map((tone) => (
            <span
              key={tone}
              className="badge rounded-pill font-monospace"
              style={{ background: ANSWER_TONES[tone].color }}
            >
              {ANSWER_TONES[tone].icon} {countsByTone[tone]} {ANSWER_TONES[tone].name}
            </span>
          ))}
        </div>

        <Button type="submit" variant="primary" className="fw-bold px-4">
          Submit
        </Button>
      </Container>
    </div>
  );
}
