"use client";

import { Button } from "react-bootstrap";
import { COLORS } from "@/constants/colors";
import Icon, { type IconName } from "./Icon";

interface IconButtonProps {
  icon: IconName;
  /** Text read by screen readers and shown as the tooltip. */
  label: string;
  onClick: () => void;
  disabled?: boolean;
  color?: string;
  iconSize?: number;
}

/** A small button that shows only an icon. */
export default function IconButton({
  icon,
  label,
  onClick,
  disabled = false,
  color = COLORS.gray500,
  iconSize = 16,
}: IconButtonProps) {
  return (
    <Button
      variant="link"
      size="sm"
      title={label}
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="p-1 lh-1 text-decoration-none"
      style={{ color, opacity: disabled ? 0.35 : 1 }}
    >
      <Icon name={icon} size={iconSize} />
    </Button>
  );
}
