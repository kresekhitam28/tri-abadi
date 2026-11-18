import { useSyncExternalStore } from "react";

const MOBILE_QUERY = "(max-width: 768px)";
let mediaQuery;

function getMediaQuery() {
  mediaQuery ??= window.matchMedia(MOBILE_QUERY);
  return mediaQuery;
}

function subscribe(onChange) {
  const query = getMediaQuery();
  if (query.addEventListener) {
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }

  query.addListener(onChange);
  return () => query.removeListener(onChange);
}

function getSnapshot() {
  return getMediaQuery().matches;
}

const getServerSnapshot = () => false;

export function useIsMobile() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
