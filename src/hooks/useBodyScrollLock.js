import { useEffect } from "react";

export function useBodyScrollLock(enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    const scrollY = window.scrollY;
    const pathname = window.location.pathname;
    const style = document.body.style;
    const previous = {
      position: style.position,
      top: style.top,
      left: style.left,
      right: style.right,
      width: style.width,
      overflow: style.overflow,
    };

    Object.assign(style, {
      position: "fixed",
      top: `-${scrollY}px`,
      left: "0",
      right: "0",
      width: "100%",
      overflow: "hidden",
    });

    return () => {
      Object.assign(style, previous);
      if (window.location.pathname === pathname) {
        window.scrollTo({ top: scrollY, behavior: "instant" });
      }
    };
  }, [enabled]);
}
