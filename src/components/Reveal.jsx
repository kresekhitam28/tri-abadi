"use client";

import { memo, useMemo } from "react";
import { useIsMobile } from "../hooks/useIsMobile";
import { useReveal } from "../hooks/useReveal";

const Reveal = memo(function Reveal({
  children,
  delay = 0,
  y = 28,
  x = 0,
  duration = 700,
  as: Tag = "div",
  className = "",
}) {
  const isMobile = useIsMobile();
  const enabled = !isMobile;
  const [ref, visible] = useReveal({ enabled });

  const style = useMemo(() => {
    if (!enabled) {
      return { contain: "layout paint style" };
    }
    return {
      transitionProperty: "opacity, transform",
      transitionDuration: `${duration}ms`,
      transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
      transitionDelay: `${delay}ms`,
      opacity: visible ? 1 : 0,
      transform: visible ? "translate3d(0,0,0)" : `translate3d(${x}px, ${y}px, 0)`,
      willChange: visible ? "auto" : "opacity, transform",
      contain: "layout paint style",
    };
  }, [enabled, visible, duration, delay, x, y]);

  return (
    <Tag ref={ref} style={style} className={className}>
      {children}
    </Tag>
  );
});

export default Reveal;
