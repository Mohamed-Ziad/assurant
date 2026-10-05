import type { ReactNode } from "react";
import { COLORS } from "@/constants/colors";
import QuestionBlock from "./QuestionBlock";
import type { PanelVariant, PhoneCaseQuestion } from "./types";

const PANEL_STYLES: Record<PanelVariant, { className: string; background: string }> = {
  legacy: { className: "mt-4", background: COLORS.legacyPanelBackground },
  redesigned: {
    className: "shadow mt-4 p-4 rounded-3",
    background: COLORS.redesignedPanelBackground,
  },
};

interface QuestionPanelProps {
  panelId: string;
  variant: PanelVariant;
  questions: PhoneCaseQuestion[];
  /** Extra content shown after the last question. */
  children?: ReactNode;
}

export default function QuestionPanel({
  panelId,
  variant,
  questions,
  children,
}: QuestionPanelProps) {
  const { className, background } = PANEL_STYLES[variant];

  return (
    <div className={className} style={{ backgroundColor: background }}>
      {questions.map((question) => (
        <QuestionBlock key={question.id} panelId={panelId} question={question} variant={variant} />
      ))}
      {children}
    </div>
  );
}
