"use client";

import { Col, Container, Row } from "react-bootstrap";
import SectionHeading from "@/components/ui/SectionHeading";
import HeroSection from "./HeroSection";
import { PAGE_SUMMARIES, STUDY_FILES, STUDY_SECTION_ID } from "./homeContent";
import PageCard from "./PageCard";
import PrincipleList from "./PrincipleList";
import StudyFileCard from "./StudyFileCard";

export default function HomeLanding() {
  return (
    <Container className="py-5" style={{ maxWidth: 1100 }}>
      <HeroSection />
      <PrincipleList />

      <SectionHeading
        id="pages"
        title="Pages"
        caption={`${PAGE_SUMMARIES.length} updated`}
        className="mb-3"
      />
      <Row className="g-4">
        {PAGE_SUMMARIES.map((page) => (
          <Col md={6} key={page.href}>
            <PageCard page={page} />
          </Col>
        ))}
      </Row>

      <SectionHeading
        id={STUDY_SECTION_ID}
        title="The Study"
        caption={`${STUDY_FILES.length} files`}
        className="mt-5 mb-3"
      />
      <Row className="g-3">
        {STUDY_FILES.map((file) => (
          <Col md={6} key={file.downloadUrl}>
            <StudyFileCard file={file} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
