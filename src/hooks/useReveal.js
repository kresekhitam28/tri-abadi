import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const reducedMotion = "(prefers-reduced-motion: reduce)";
const observers = new Map();

function subscribe(callback) {
  const preference = window.matchMedia(reducedMotion);
  preference.addEventListener("change", callback);
  return () => preference.removeEventListener("change", callback);
}
const supportsObserver = () => typeof IntersectionObserver === "function" && !window.matchMedia(reducedMotion).matches;
const getServerSnapshot = () => false;

function observeEntry(element, threshold, reveal) {
  let group = observers.get(threshold);
  if (!group) {
    const callbacks = new Map();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) callbacks.get(entry.target)?.();
      }
    }, { threshold, rootMargin: "0px 0px -60px 0px" });
    group = { observer, callbacks };
    observers.set(threshold, group);
  }

  group.callbacks.set(element, reveal);
  group.observer.observe(element);
  return () => {
    group.observer.unobserve(element);
    group.callbacks.delete(element);
    if (group.callbacks.size === 0) {
      group.observer.disconnect();
      observers.delete(threshold);
    }
  };
}

export function useReveal({ threshold = 0.12, enabled = true } = {}) {
  const ref = useRef(null);
  const hasEntered = useRef(false);
  const [waiting, setWaiting] = useState(false);
  const canObserve = useSyncExternalStore(subscribe, supportsObserver, getServerSnapshot);

  useEffect(() => {
    const element = ref.current;
    if (!enabled || !element || !canObserve || hasEntered.current) return;

    let stopObserving;
    function reveal() {
      stopObserving?.();
      stopObserving = undefined;
      element.removeEventListener("focusin", reveal);
      hasEntered.current = true;
      setWaiting(false);
    }
    const frame = requestAnimationFrame(() => {
      // Keep server-rendered content and content already in view visible during hydration.
      if (element.getBoundingClientRect().top <= window.innerHeight) {
        reveal();
        return;
      }

      setWaiting(true);
      element.addEventListener("focusin", reveal);
      stopObserving = observeEntry(element, threshold, reveal);
    });
    return () => {
      cancelAnimationFrame(frame);
      stopObserving?.();
      element.removeEventListener("focusin", reveal);
    };
  }, [enabled, threshold, canObserve]);

  return [ref, !enabled || !canObserve || !waiting];
}
