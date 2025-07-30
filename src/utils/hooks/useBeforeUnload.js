import { useEffect, useRef } from "react";

/**
 * Calls handler when attempting to leave the page.
 * @param {() => boolean} shouldBlock - Function that returns whether to block navigation
 */
export default function useBeforeUnload(shouldBlock) {
  const shouldBlockRef = useRef(shouldBlock);

  useEffect(() => {
    shouldBlockRef.current = shouldBlock;
  }, [shouldBlock]);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      const shouldPrevent = shouldBlockRef.current?.();
      if (!shouldPrevent) return;
      e.preventDefault();
      e.returnValue = ""; // Required for Chrome
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
}
