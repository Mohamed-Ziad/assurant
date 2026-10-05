import { Col, Row } from "react-bootstrap";
import { COLORS } from "@/constants/colors";
import { DESIGN_PRINCIPLES } from "./homeContent";

export default function PrincipleList() {
  return (
    <Row className="g-4 mb-5">
      {DESIGN_PRINCIPLES.map(({ title, description }) => (
        <Col md={4} key={title}>
          <div className="h-100 ps-3" style={{ borderLeft: `3px solid ${COLORS.info}` }}>
            <div className="fw-bold mb-1">{title}</div>
            <div className="small" style={{ color: COLORS.gray500 }}>
              {description}
            </div>
          </div>
        </Col>
      ))}
    </Row>
  );
}
