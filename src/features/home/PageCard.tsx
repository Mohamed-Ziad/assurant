import Link from "next/link";
import { Card } from "react-bootstrap";
import Icon from "@/components/ui/Icon";
import { COLORS } from "@/constants/colors";
import type { PageSummary } from "./homeContent";

interface PageCardProps {
  page: PageSummary;
}

/** A link card that describes one improved page and what is better in it. */
export default function PageCard({ page }: PageCardProps) {
  const { name, href, description, highlights } = page;

  return (
    <Link href={href} className="text-decoration-none text-reset d-block h-100">
      <Card className="shadow-sm h-100">
        <Card.Body className="p-4 d-flex flex-column">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <h5 className="fw-bold mb-0">{name}</h5>
            <span className="font-monospace small" style={{ color: COLORS.gray400 }}>
              {href}
            </span>
          </div>

          <p className="mb-3" style={{ color: COLORS.gray600 }}>
            {description}
          </p>

          <div className="d-flex flex-column gap-1 mb-4">
            {highlights.map((highlight) => (
              <div key={highlight} className="d-flex align-items-center gap-2 small">
                <Icon name="check" size={14} color={COLORS.success} className="flex-shrink-0" />
                {highlight}
              </div>
            ))}
          </div>

          <div
            className="mt-auto d-flex align-items-center gap-1 fw-semibold"
            style={{ color: COLORS.info }}
          >
            Open {name} <Icon name="arrowRight" size={14} />
          </div>
        </Card.Body>
      </Card>
    </Link>
  );
}
