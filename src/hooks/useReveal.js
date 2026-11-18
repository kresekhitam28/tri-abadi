import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const subscribe = () => () => {};
const supportsObserver = () => typeof IntersectionObserver === "function";
const getServerSnapshot = () => true;

export function useReveal({ threshold = 0.12, enabled = true } = {}) {
  const ref = useRef(null);
  const [hasEntered, setHasEntered] = useState(false);
  const canObserve = useSyncExternalStore(subscribe, supportsObserver, getServerSnapshot);

  useEffect(() => {
    const element = ref.current;
    if (!enabled || !element || !supportsObserver()) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -60px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [enabled, threshold]);

  return [ref, !enabled || !canObserve || hasEntered];
}
