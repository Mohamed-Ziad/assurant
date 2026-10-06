import type { ReactNode } from "react";
import { classNames } from "@/utils/classNames";

const NUMBER_BADGE_SIZE = 22;

interface InspectionRowProps {
  /** Position of the row in the form, starting at 1. */
  number: number;
  isAnswered: boolean;
  /** Color of the bar on the left edge of the row. */
  accentColor?: string;
  hasError: boolean;
  /** The last row has no line under it. */
  isLast?: boolean;
  children: ReactNode;
}

/** The frame around one question: number badge, colored left bar and error background. */
export default function InspectionRow({
  number,
  isAnswered,
  accentColor,
  hasError,
  isLast = false,
  children,
}: InspectionRowProps) {
  return (
    <div
      className={classNames(
        "d-flex gap-2 px-3 py-2",
        !isLast && "border-bottom",
        hasError && "bg-danger-subtle",
      )}
      style={{ borderLeft: `4px solid ${accentColor ?? "transparent"}` }}
    >
      <span
        className={classNames(
          "rounded-circle d-inline-flex align-items-center justify-content-center flex-shrink-0 fw-bold",
          isAnswered ? "bg-dark text-white" : "bg-light text-muted",
        )}
        style={{ width: NUMBER_BADGE_SIZE, height: NUMBER_BADGE_SIZE, fontSize: 12 }}
      >
        {number}
      </span>

      <div className="flex-grow-1">{children}</div>
    </div>
  );
}
