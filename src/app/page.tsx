"use client";

import Link from "next/link";
import { Container, Row, Col, Card } from "react-bootstrap";

/* ---------------- Content ---------------- */

const PAGES: any[] = [
  {
    name: "Omnicore",
    href: "/omnicore",
    text: "Every station at a glance. Each step shows clearly if it passed, failed, or is still running.",
    points: ["Status with color + icon", "Steps line up across stations"],
  },
  {
    name: "Item Workflow",
    href: "/itemworkflow",
    text: "Find an item by Item, Invoice, or IMEI. Copy and paste on every field.",
    points: ["One-click copy & paste", "Clear errors before search"],
  },
  {
    name: "Carton Workflow",
    href: "/cartonworkflow",
    text: "Search a carton and read its trades fast: model, item and IMEI in one clean table.",
    points: ["Numbers in monospace", "Receive / Shortage side by side"],
  },
  {
    name: "UUID",
    href: "/uuid",
    text: "Look up a UUID and copy any value by clicking on it.",
    points: ["Click the text to copy", "Quiet, easy-to-read table"],
  },
];

const PRINCIPLES: any[] = [
  { title: "Faster to scan", text: "Numbers in monospace, calm tables, and only the information that matters." },
  { title: "Fewer clicks", text: "Copy any value by clicking it. Paste straight into the field." },
  { title: "Clear status", text: "Pass, fail and running use color and an icon — readable for color-blind users too." },
];

// Google Drive direct-download links (files must be shared as "Anyone with the link")
const STUDY: any[] = [
  {
    name: "UI Study — Presentation",
    type: "PPTX",
    href: "https://docs.google.com/presentation/d/1b244u-BpJRcTZO7dWvBQyM04nImlCYI7RQZAk5IYuzU/export/pptx",
    open: "https://docs.google.com/presentation/d/1b244u-BpJRcTZO7dWvBQyM04nImlCYI7RQZAk5IYuzU/edit",
    text: "The full proposal: problems found and the new design.",
  },
  {
    name: "UI Study — Measurements",
    type: "XLSX",
    href: "https://drive.google.com/uc?export=download&id=1kkLQ3ZKfFz75R6WLUU_zk9PaiIP5Y7Cj",
    open: "https://docs.google.com/spreadsheets/d/1kkLQ3ZKfFz75R6WLUU_zk9PaiIP5Y7Cj/edit",
    text: "Time measurements before and after, per page.",
  },
];

/* ---------------- Look (same as the other pages) ---------------- */

const GRAY: any = "#6b7280";
const GREEN: any = "#15803d";

const Check = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="2.5" style={{ flexShrink: 0 }}>
    <path d="M5 12l5 5L20 7" />
  </svg>
);

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const FileIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={GRAY} strokeWidth="1.8" style={{ flexShrink: 0 }}>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
    <path d="M14 3v5h5" />
  </svg>
);

const DownloadIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
  </svg>
);

const OpenIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
  </svg>
);

/* ---------------- Component ---------------- */

export default function HomeLanding() {
  return (
    <Container className="py-5" style={{ maxWidth: 1100 }}>
      {/* Hero */}
      <div className="mb-5" style={{ maxWidth: 680 }}>
        <div className="text-uppercase fw-semibold small mb-2" style={{ color: GRAY, letterSpacing: ".06em" }}>
          Device Repair · UI Improvements
        </div>
        <h1 className="fw-bold mb-3" style={{ fontSize: 40, lineHeight: 1.15 }}>
          Same work, less time.
        </h1>
        <p className="mb-4" style={{ fontSize: 18, color: "#4b5563" }}>
          A cleaner version of the pages we use every day — built to be read at a glance,
          with fewer clicks per device.
        </p>
        <div className="d-flex gap-2 flex-wrap">
          <Link href={PAGES[0].href} className="btn btn-primary fw-bold px-4">
            Open Omnicore
          </Link>
          <a href="#study" className="btn btn-outline-secondary fw-semibold px-4">Read the study</a>
        </div>
      </div>

      {/* Principles */}
      <Row className="g-4 mb-5">
        {PRINCIPLES.map((p: any) => (
          <Col md={4} key={p.title}>
            <div className="h-100 ps-3" style={{ borderLeft: "3px solid #1d4ed8" }}>
              <div className="fw-bold mb-1">{p.title}</div>
              <div className="small" style={{ color: GRAY }}>{p.text}</div>
            </div>
          </Col>
        ))}
      </Row>

      {/* Pages */}
      <div id="pages" className="d-flex align-items-baseline justify-content-between mb-3">
        <h4 className="fw-bold mb-0">Pages</h4>
        <span className="small" style={{ color: GRAY }}>{PAGES.length} updated</span>
      </div>

      <Row className="g-4">
        {PAGES.map((p: any) => (
          <Col md={6} key={p.name}>
            <Link href={p.href} className="text-decoration-none text-reset d-block h-100">
              <Card className="shadow-sm h-100">
                <Card.Body className="p-4 d-flex flex-column">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <h5 className="fw-bold mb-0">{p.name}</h5>
                    <span className="font-monospace small" style={{ color: "#9ca3af" }}>{p.href}</span>
                  </div>
                  <p className="mb-3" style={{ color: "#4b5563" }}>{p.text}</p>

                  <div className="d-flex flex-column gap-1 mb-4">
                    {p.points.map((pt: any) => (
                      <div key={pt} className="d-flex align-items-center gap-2 small">
                        <Check /> {pt}
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto d-flex align-items-center gap-1 fw-semibold" style={{ color: "#1d4ed8" }}>
                    Open {p.name} <Arrow />
                  </div>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>

      {/* Study files */}
      <div id="study" className="d-flex align-items-baseline justify-content-between mt-5 mb-3">
        <h4 className="fw-bold mb-0">The Study</h4>
        <span className="small" style={{ color: GRAY }}>{STUDY.length} files</span>
      </div>

      <Row className="g-3">
        {STUDY.map((f: any) => (
          <Col md={6} key={f.href}>
            <div className="h-100 bg-white rounded p-3 d-flex align-items-start gap-3" style={{ border: "1px solid #e5e7eb" }}>
                <FileIcon />
                <div className="flex-grow-1">
                  <div className="d-flex align-items-baseline justify-content-between gap-2">
                    <span className="fw-semibold">{f.name}</span>
                    <span className="font-monospace small text-nowrap" style={{ color: "#9ca3af" }}>
                      {f.type}
                    </span>
                  </div>
                  <div className="small mt-1" style={{ color: GRAY }}>{f.text}</div>
                  <div className="d-flex align-items-center gap-3 fw-semibold small mt-2">
                    <a
                      href={f.open}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="d-flex align-items-center gap-1 text-decoration-none"
                      style={{ color: "#1d4ed8" }}
                    >
                      <OpenIcon /> Open
                    </a>
                    <a
                      href={f.href}
                      rel="noopener noreferrer"
                      className="d-flex align-items-center gap-1 text-decoration-none"
                      style={{ color: "#1d4ed8" }}
                    >
                      <DownloadIcon /> Download
                    </a>
                  </div>
                </div>
              </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
