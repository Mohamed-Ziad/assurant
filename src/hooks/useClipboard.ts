import { useCallback, useEffect, useRef, useState } from "react";
import { showSuccessToast } from "@/utils/toast";

const COPIED_FEEDBACK_DURATION_MS = 1500;

/**
 * Copy and paste helpers for the system clipboard.
 *
 * `isCopied` is true for a short time after a copy, so a copy button can show a check mark.
 */
export function useClipboard() {
  const [isCopied, setIsCopied] = useState(false);
  const feedbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    };
  }, []);

  /**
   * Copies `text` and confirms it with a toast such as "Item number #789654123 copied".
   * Pass `isIdentifier = false` for text that is not an ID, such as a model name, to leave out the "#".
   * Returns whether the text was copied. It is `false` when the browser blocked clipboard access.
   */
  const copy = useCallback(
    async (text: string, label: string, isIdentifier = true): Promise<boolean> => {
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        return false;
      }

      if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
      setIsCopied(true);
      feedbackTimerRef.current = setTimeout(() => setIsCopied(false), COPIED_FEEDBACK_DURATION_MS);

      showSuccessToast(`${label} ${isIdentifier ? "#" : ""}${text} copied`);
      return true;
    },
    [],
  );

  /** Returns the clipboard text, or `null` when the browser blocked clipboard access. */
  const paste = useCallback(async (): Promise<string | null> => {
    try {
      return await navigator.clipboard.readText();
    } catch {
      return null;
    }
  }, []);

  return { isCopied, copy, paste };
}
