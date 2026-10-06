"use client";

import { Alert } from "react-bootstrap";
import CopyableText from "@/components/ui/CopyableText";

interface ProcessedItemBannerProps {
  itemNumber: string;
  onClose: () => void;
}

/** A green alert at the top of a form card. It tells the technician which item was processed. */
export default function ProcessedItemBanner({ itemNumber, onClose }: ProcessedItemBannerProps) {
  return (
    <Alert variant="success" dismissible onClose={onClose} className="rounded-0 border-0 mb-0 py-2">
      Item <CopyableText text={itemNumber} label="Item number" monospace bold /> has been processed
    </Alert>
  );
}
