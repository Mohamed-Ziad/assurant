import type { CSSProperties, ReactNode } from "react";
import { COLORS } from "@/constants/colors";
import type { PanelVariant } from "./types";

interface LabelStyle {
  className: string;
  style?: CSSProperties;
}

const LABEL_STYLES: Record<PanelVariant, LabelStyle> = {
  legacy: { className: "d-block mt-2" },
  redesigned: { className: "d-block mt-3 fw-bold", style: { color: COLORS.questionLabel } },
};

interface QuestionLabelProps {
  variant: PanelVariant;
  children: ReactNode;
  /** Id of the control this label describes. Leave it out for a group of radio choices. */
  htmlFor?: string;
  id?: string;
}

export default function QuestionLabel({ variant, children, htmlFor, id }: QuestionLabelProps) {
  const { className, style } = LABEL_STYLES[variant];

  return (
    <label id={id} htmlFor={htmlFor} className={className} style={style}>
      {children}
    </label>
  );
}
