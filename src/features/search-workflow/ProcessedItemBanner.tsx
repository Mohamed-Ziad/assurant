"use client";

import { useState } from "react";
import { CloseButton } from "react-bootstrap";
import IconButton from "@/components/ui/IconButton";
import StatusBanner from "@/components/ui/StatusBanner";
import { COLORS } from "@/constants/colors";
import { useClipboard } from "@/hooks/useClipboard";

const COPY_KEY = "item-number";

/** Tells the technician that an item was processed. It can be copied and dismissed. */
export default function ProcessedItemBanner({ itemNumber }: { itemNumber: string }) {
  const [isDismissed, setIsDismissed] = useState(false);
  const { copiedKey, copy } = useClipboard();

  if (isDismissed) return null;

  return (
    <StatusBanner
      tone="success"
      trailing={
        <>
          <IconButton
            icon={copiedKey === COPY_KEY ? "check" : "copy"}
            label="Copy item number"
            color={COLORS.success}
            onClick={() => copy(itemNumber, COPY_KEY)}
          />
          <CloseButton
            className="ms-auto"
            aria-label="Close"
            onClick={() => setIsDismissed(true)}
          />
        </>
      }
    >
      <span>
        Item <span className="font-monospace fw-bold">{itemNumber}</span> has been processed
      </span>
    </StatusBanner>
  );
}
