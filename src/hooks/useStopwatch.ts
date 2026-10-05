import { useCallback, useEffect, useRef, useState } from "react";

/**
 * A stopwatch that can be started and stopped repeatedly.
 * Elapsed time keeps adding up across runs until `reset` is called.
 */
export function useStopwatch(onStop?: (elapsedMs: number) => void) {
  const [elapsedMs, setElapsedMs] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const currentRunStartRef = useRef(0);
  const previousRunsMsRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isRunning) return;

    currentRunStartRef.current = performance.now();

    const updateElapsed = () => {
      setElapsedMs(previousRunsMsRef.current + (performance.now() - currentRunStartRef.current));
      animationFrameRef.current = requestAnimationFrame(updateElapsed);
    };
    animationFrameRef.current = requestAnimationFrame(updateElapsed);

    return () => {
      if (animationFrameRef.current !== null) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isRunning]);

  const toggle = useCallback(() => {
    if (!isRunning) {
      setIsRunning(true);
      return;
    }

    const totalMs = previousRunsMsRef.current + (performance.now() - currentRunStartRef.current);
    previousRunsMsRef.current = totalMs;
    setElapsedMs(totalMs);
    setIsRunning(false);
    onStop?.(totalMs);
  }, [isRunning, onStop]);

  const reset = useCallback(() => {
    setIsRunning(false);
    previousRunsMsRef.current = 0;
    setElapsedMs(0);
  }, []);

  return { elapsedMs, isRunning, toggle, reset };
}
