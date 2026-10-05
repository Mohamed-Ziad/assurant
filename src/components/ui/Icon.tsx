import type { ReactNode } from "react";

interface IconDefinition {
  strokeWidth: number;
  shapes: ReactNode;
}

const ICON_DEFINITIONS = {
  copy: {
    strokeWidth: 2,
    shapes: (
      <>
        <rect x="9" y="9" width="11" height="11" rx="2" />
        <path d="M5 15V5a2 2 0 0 1 2-2h8" />
      </>
    ),
  },
  paste: {
    strokeWidth: 2,
    shapes: (
      <>
        <rect x="6" y="4" width="12" height="17" rx="2" />
        <path d="M9 4V3h6v1M9 11h6M9 15h4" />
      </>
    ),
  },
  check: {
    strokeWidth: 2.5,
    shapes: <path d="M5 12l5 5L20 7" />,
  },
  arrowRight: {
    strokeWidth: 2.5,
    shapes: <path d="M5 12h14M13 6l6 6-6 6" />,
  },
  file: {
    strokeWidth: 1.8,
    shapes: (
      <>
        <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
        <path d="M14 3v5h5" />
      </>
    ),
  },
  download: {
    strokeWidth: 2.5,
    shapes: <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />,
  },
  externalLink: {
    strokeWidth: 2.5,
    shapes: (
      <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
    ),
  },
} satisfies Record<string, IconDefinition>;

export type IconName = keyof typeof ICON_DEFINITIONS;

interface IconProps {
  name: IconName;
  size?: number;
  strokeWidth?: number;
  color?: string;
  className?: string;
}

/** Line icon drawn as inline SVG. It takes the surrounding text color unless `color` is set. */
export default function Icon({
  name,
  size = 16,
  strokeWidth,
  color = "currentColor",
  className,
}: IconProps) {
  const definition: IconDefinition = ICON_DEFINITIONS[name];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth ?? definition.strokeWidth}
      className={className}
      aria-hidden="true"
    >
      {definition.shapes}
    </svg>
  );
}
