import type { CSSProperties, ReactNode } from "react";
import { COLORS } from "@/constants/colors";
import type { StatusTone } from "./StatusGlyph";

export type BannerTone = Extract<StatusTone, "running" | "success" | "danger">;

const BANNER_COLORS: Record<BannerTone, { background: string; text: string; accent: string }> = {
  running: { background: COLORS.infoBannerBackground, text: COLORS.infoText, accent: COLORS.info },
  success: {
    background: COLORS.successBackground,
    text: COLORS.successText,
    accent: COLORS.success,
  },
  danger: { background: COLORS.dangerBackground, text: COLORS.dangerText, accent: COLORS.danger },
};

interface StatusBannerProps {
  tone: BannerTone;
  children: ReactNode;
  /** Shown before the message, for example a spinner or a check mark. */
  leading?: ReactNode;
  /** Shown after the message, for example action buttons. */
  trailing?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/** A message bar with a colored edge. The color tells whether it is running, successful or failed. */
export default function StatusBanner({
  tone,
  children,
  leading,
  trailing,
  className = "",
  style,
}: StatusBannerProps) {
  const { background, text, accent } = BANNER_COLORS[tone];

  return (
    <div
      role="status"
      className={`d-flex align-items-center gap-2 px-3 py-2 ${className}`}
      style={{ background, color: text, borderLeft: `3px solid ${accent}`, ...style }}
    >
      {leading}
      {children}
      {trailing}
    </div>
  );
}
