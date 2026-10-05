import LoadingSpinner from "./LoadingSpinner";

export type StatusTone = "running" | "success" | "danger" | "pending" | "value";

/** The mark shown before a status: a spinner while running, a check on success, a cross on failure. */
export default function StatusGlyph({ tone }: { tone: StatusTone }) {
  switch (tone) {
    case "running":
      return <LoadingSpinner />;
    case "success":
      return <span>✓</span>;
    case "danger":
      return <span>✕</span>;
    default:
      return null;
  }
}
