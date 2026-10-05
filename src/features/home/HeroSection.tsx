import Link from "next/link";
import { COLORS } from "@/constants/colors";
import {
  HERO_DESCRIPTION,
  HERO_EYEBROW,
  HERO_TITLE,
  PAGE_SUMMARIES,
  STUDY_SECTION_ID,
} from "./homeContent";

export default function HeroSection() {
  const [firstPage] = PAGE_SUMMARIES;

  return (
    <div className="mb-5" style={{ maxWidth: 680 }}>
      <div
        className="text-uppercase fw-semibold small mb-2"
        style={{ color: COLORS.gray500, letterSpacing: ".06em" }}
      >
        {HERO_EYEBROW}
      </div>

      <h1 className="fw-bold mb-3" style={{ fontSize: 40, lineHeight: 1.15 }}>
        {HERO_TITLE}
      </h1>

      <p className="mb-4" style={{ fontSize: 18, color: COLORS.gray600 }}>
        {HERO_DESCRIPTION}
      </p>

      <div className="d-flex gap-2 flex-wrap">
        <Link href={firstPage.href} className="btn btn-primary fw-bold px-4">
          Open {firstPage.name}
        </Link>
        <a href={`#${STUDY_SECTION_ID}`} className="btn btn-outline-secondary fw-semibold px-4">
          Read the study
        </a>
      </div>
    </div>
  );
}
