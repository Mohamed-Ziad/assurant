import { COLORS } from "@/constants/colors";

interface SectionHeadingProps {
  title: string;
  /** Small text on the right, such as "4 updated". */
  caption?: string;
  /** Anchor id, so a link such as `#study` can scroll here. */
  id?: string;
  className?: string;
}

export default function SectionHeading({
  title,
  caption,
  id,
  className = "",
}: SectionHeadingProps) {
  return (
    <div id={id} className={`d-flex align-items-baseline justify-content-between ${className}`}>
      <h4 className="fw-bold mb-0">{title}</h4>
      {caption && (
        <span className="small" style={{ color: COLORS.gray500 }}>
          {caption}
        </span>
      )}
    </div>
  );
}
