import { useCallback, useEffect, useRef, useState } from "react";

const COPIED_FEEDBACK_DURATION_MS = 1500;

/**
 * Copy and paste helpers for the system clipboard.
 *
 * `copiedKey` holds the key passed to the last `copy` call for a short time,
 * so a screen with several copy buttons can show a check mark on the right one.
 */
export function useClipboard() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const feedbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    };
  }, []);

  /** Returns whether the text was copied. It is `false` when the browser blocked clipboard access. */
  const copy = useCallback(async (text: string, key: string): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      return false;
    }

    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    setCopiedKey(key);
    feedbackTimerRef.current = setTimeout(() => setCopiedKey(null), COPIED_FEEDBACK_DURATION_MS);
    return true;
  }, []);

  /** Returns the clipboard text, or `null` when the browser blocked clipboard access. */
  const paste = useCallback(async (): Promise<string | null> => {
    try {
      return await navigator.clipboard.readText();
    } catch {
      return null;
    }
  }, []);

  return { copiedKey, copy, paste };
}
