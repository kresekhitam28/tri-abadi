// src/components/Projects.jsx
"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";

// ─────────────────────────────────────────────
// DAFTAR FOTO PENGERJAAN
// ─────────────────────────────────────────────
const projects = [
  { src: "/proyek/proyek-1.webp" },
  { src: "/proyek/proyek-2.webp" },
  { src: "/proyek/proyek-3.webp" },
  { src: "/proyek/proyek-4.webp" },
  { src: "/proyek/proyek-5.webp" },
  { src: "/proyek/proyek-6.webp" },
  { src: "/proyek/proyek-7.webp" },
  { src: "/proyek/proyek-8.webp" },
  { src: "/proyek/proyek-9.webp" },
  { src: "/proyek/proyek-10.webp" },
  { src: "/proyek/proyek-11.webp" },
  { src: "/proyek/proyek-12.webp" },
  { src: "/proyek/proyek-13.webp" },
  { src: "/proyek/proyek-14.webp" },
  { src: "/proyek/proyek-15.webp" },
  { src: "/proyek/proyek-16.webp" },
  { src: "/proyek/proyek-17.webp" },
  { src: "/proyek/proyek-18.webp" },
  { src: "/proyek/proyek-19.webp" },
  { src: "/proyek/proyek-20.webp" },
  { src: "/proyek/proyek-21.webp" },
  { src: "/proyek/proyek-22.webp" },
  { src: "/proyek/proyek-23.webp" },
  { src: "/proyek/proyek-24.webp" },
  { src: "/proyek/proyek-25.webp" },
  { src: "/proyek/proyek-26.webp" },
  { src: "/proyek/proyek-27.webp" },
  { src: "/proyek/proyek-28.webp" },
  { src: "/proyek/proyek-29.webp" },
  { src: "/proyek/proyek-30.webp" },
  { src: "/proyek/proyek-31.webp" },
  { src: "/proyek/proyek-32.webp" },
  { src: "/proyek/proyek-33.webp" },
  { src: "/proyek/proyek-34.webp" },
  { src: "/proyek/proyek-35.webp" },
  { src: "/proyek/proyek-36.webp" },
  { src: "/proyek/proyek-37.webp" },
  { src: "/proyek/proyek-38.webp" },
  { src: "/proyek/proyek-39.webp" },
  { src: "/proyek/proyek-40.webp" },
  { src: "/proyek/proyek-41.webp" },
  { src: "/proyek/proyek-42.webp" },
  { src: "/proyek/proyek-43.webp" },
  { src: "/proyek/proyek-44.webp" },
  { src: "/proyek/proyek-45.webp" },
  { src: "/proyek/proyek-57.webp" },
  { src: "/proyek/proyek-58.webp" },
  { src: "/proyek/proyek-59.webp" },
  { src: "/proyek/proyek-60.webp" },
  { src: "/proyek/proyek-61.webp" },
  { src: "/proyek/proyek-62.webp" },
  { src: "/proyek/proyek-63.webp" },
  { src: "/proyek/proyek-64.webp" },
  { src: "/proyek/proyek-65.webp" },
  { src: "/proyek/proyek-66.webp" },
  { src: "/proyek/proyek-67.webp" },
  { src: "/proyek/proyek-68.webp" },
  { src: "/proyek/proyek-69.webp" },
  { src: "/proyek/proyek-70.webp" },
  { src: "/proyek/proyek-71.webp" },
  { src: "/proyek/proyek-72.webp" },
  { src: "/proyek/proyek-73.webp" },
  { src: "/proyek/proyek-74.webp" },
  { src: "/proyek/proyek-75.webp" },
  { src: "/proyek/proyek-76.webp" },
  { src: "/proyek/proyek-77.webp" },
  { src: "/proyek/proyek-78.webp" },
  { src: "/proyek/proyek-79.webp" },
  { src: "/proyek/proyek-80.webp" },
  { src: "/proyek/proyek-81.webp" },
  { src: "/proyek/proyek-82.webp" },
  { src: "/proyek/proyek-83.webp" },
  { src: "/proyek/proyek-84.webp" },
];

// ─────────────────────────────────────────────
// IKON
// ─────────────────────────────────────────────
function IconChevronLeft({ className = "w-6 h-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}
function IconChevronRight({ className = "w-6 h-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}
function IconClose({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}
function IconArrowRight({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

// ─────────────────────────────────────────────
// HOOK: deteksi mobile
// ─────────────────────────────────────────────
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();
    if (mq.addEventListener) {
      mq.addEventListener("change", update);
      return () => mq.removeEventListener("change", update);
    } else {
      mq.addListener(update);
      return () => mq.removeListener(update);
    }
  }, []);
  return isMobile;
}

// ─────────────────────────────────────────────
// HOOK: REVEAL ON SCROLL
// ─────────────────────────────────────────────
function useReveal(options = {}) {
  const {
    threshold = 0.12,
    rootMargin = "0px 0px -60px 0px",
    once = true,
    enabled = true,
  } = options;
  const ref = useRef(null);
  const [visible, setVisible] = useState(!enabled);

  useEffect(() => {
    if (!enabled) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) io.unobserve(entry.target);
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold, rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin, once, enabled]);

  return [ref, visible];
}

// ─────────────────────────────────────────────
// KOMPONEN: REVEAL WRAPPER
// ─────────────────────────────────────────────
function Reveal({
  children,
  delay = 0,
  y = 28,
  duration = 700,
  as: Tag = "div",
  className = "",
}) {
  const isMobile = useIsMobile();
  const enabled = !isMobile;
  const [ref, visible] = useReveal({ enabled });

  const style = useMemo(() => {
    if (!enabled) {
      return { contain: "layout" };
    }
    return {
      transitionProperty: "opacity, transform",
      transitionDuration: `${duration}ms`,
      transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
      transitionDelay: `${delay}ms`,
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : `translateY(${y}px)`,
      willChange: visible ? "auto" : "opacity, transform",
      contain: "layout",
    };
  }, [enabled, visible, duration, delay, y]);

  return (
    <Tag ref={ref} style={style} className={className}>
      {children}
    </Tag>
  );
}

// ─────────────────────────────────────────────
// HOOK: body scroll lock
// ─────────────────────────────────────────────
function useBodyScrollLock(locked) {
  useEffect(() => {
    if (!locked) return;
    if (typeof document === "undefined") return;

    const scrollY = window.scrollY;
    const body = document.body;
    const prev = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
    };

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";

    return () => {
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.left = prev.left;
      body.style.right = prev.right;
      body.style.width = prev.width;
      body.style.overflow = prev.overflow;
      window.scrollTo(0, scrollY);
    };
  }, [locked]);
}

// ─────────────────────────────────────────────
// LIGHTBOX
// ─────────────────────────────────────────────
function Lightbox({
  selectedIndex,
  setSelectedIndex,
  goPrev,
  goNext,
  onClose,
}) {
  const selected = projects[selectedIndex];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Penampil foto pengerjaan"
      className="fixed inset-0 z-[100] flex flex-col"
      style={{ background: "rgba(2, 6, 23, 0.97)" }}
      onClick={onClose}
    >
      {/* Topbar */}
      <div className="flex items-center justify-end px-4 sm:px-5 py-3 sm:py-4 z-10 border-b border-white/10 shrink-0">
        <button
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="w-10 h-10 flex items-center justify-center text-white/80 hover:text-white bg-white/5 hover:bg-white/15 backdrop-blur-sm rounded-full transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          aria-label="Tutup"
        >
          <IconClose />
        </button>
      </div>

      {/* Main image */}
      <div className="flex-1 flex items-center justify-center px-3 sm:px-20 relative min-h-0">
        <button
          onClick={(e) => { e.stopPropagation(); goPrev(); }}
          className="absolute left-1.5 sm:left-6 z-10 w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center text-white/80 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          aria-label="Sebelumnya"
        >
          <IconChevronLeft className="w-5 h-5" />
        </button>

        <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
          <img
            src={selected.src}
            alt=""
            decoding="async"
            draggable={false}
            className="w-full h-auto max-h-[72vh] object-contain mx-auto rounded-lg select-none"
          />
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); goNext(); }}
          className="absolute right-1.5 sm:right-6 z-10 w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center text-white/80 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          aria-label="Berikutnya"
        >
          <IconChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Thumbnail strip */}
      <div
        className="px-3 sm:px-4 py-3 sm:py-4 overflow-x-auto border-t border-white/10 shrink-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        onClick={(e) => e.stopPropagation()}
        style={{
          WebkitOverflowScrolling: "touch",
          scrollSnapType: "x mandatory",
        }}
      >
        <div className="flex items-center justify-start sm:justify-center gap-1.5 min-w-max mx-auto px-1">
          {projects.map((thumb, i) => {
            const isActive = i === selectedIndex;
            return (
              <button
                key={i}
                onClick={() => setSelectedIndex(i)}
                aria-label={`Foto ${i + 1}`}
                aria-current={isActive ? "true" : undefined}
                className={`shrink-0 w-11 h-11 sm:w-14 sm:h-14 overflow-hidden rounded-md cursor-pointer transition-opacity duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950
                  ${isActive
                    ? "ring-2 ring-[#1e88e5] opacity-100"
                    : "opacity-30 hover:opacity-80"}`}
                style={{ scrollSnapAlign: "center" }}
              >
                <img
                  src={thumb.src}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  width={56}
                  height={56}
                  className="w-full h-full object-cover"
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// PROJECTS
// ─────────────────────────────────────────────
export default function Projects() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile();
  const total = projects.length;

  useEffect(() => {
    setMounted(true);
  }, []);

  useBodyScrollLock(selectedIndex !== null);

  const goPrev = useCallback(() => {
    setSelectedIndex((prev) =>
      prev === null ? null : (prev - 1 + total) % total
    );
  }, [total]);

  const goNext = useCallback(() => {
    setSelectedIndex((prev) =>
      prev === null ? null : (prev + 1) % total
    );
  }, [total]);

  const closeLightbox = useCallback(() => setSelectedIndex(null), []);

  useEffect(() => {
    if (selectedIndex === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedIndex, goPrev, goNext]);

  useEffect(() => {
    if (selectedIndex === null) return;
    const next = (selectedIndex + 1) % total;
    const prev = (selectedIndex - 1 + total) % total;
    [next, prev].forEach((i) => {
      const img = new Image();
      img.src = projects[i].src;
    });
  }, [selectedIndex, total]);

  const getSpan = (i) => {
    const p = i % 8;
    if (p === 0 || p === 5) return "md:col-span-2 md:row-span-2";
    return "";
  };

  return (
    <>
      <section className="relative bg-white pt-12 sm:pt-14 lg:pt-20 pb-16 sm:pb-20 lg:pb-28 overflow-hidden">
        {!isMobile && (
          <>
            <div
              className="absolute inset-0 opacity-[0.45] pointer-events-none"
              style={{
                backgroundImage: `
                  linear-gradient(to right, #f1f5f9 1px, transparent 1px),
                  linear-gradient(to bottom, #f1f5f9 1px, transparent 1px)
                `,
                backgroundSize: "64px 64px",
                maskImage:
                  "radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 100%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 100%)",
              }}
              aria-hidden="true"
            />
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none" aria-hidden="true">
              <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[600px] h-[600px] rounded-full bg-[#1e88e5] blur-3xl" />
            </div>
          </>
        )}

        <div className="relative max-w-5xl mx-auto px-4 sm:px-5 lg:px-8">

          {/* ═══ HEADER ═══ */}
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 lg:mb-16">
            <Reveal delay={0} y={20}>
              <div className="inline-flex items-center gap-3 mb-4">
                <span className="w-6 sm:w-8 h-px bg-[#1e88e5]/60" aria-hidden="true" />
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#1e88e5] font-semibold">
                  What We Have Done
                </span>
                <span className="w-6 sm:w-8 h-px bg-[#1e88e5]/60" aria-hidden="true" />
              </div>
            </Reveal>

            <Reveal delay={80} y={30}>
              <h2
                className="font-light tracking-tight text-slate-900 leading-[1.15]"
                style={{ fontSize: "clamp(1.75rem, 5vw, 2.625rem)" }}
              >
                Galeri <span className="font-semibold">Pengerjaan</span>
                <span className="text-[#1e88e5]">.</span>
              </h2>
            </Reveal>

            <Reveal delay={160} y={24}>
              <p
                className="text-slate-500 leading-relaxed mt-4"
                style={{ fontSize: "clamp(0.875rem, 1.6vw, 0.9375rem)" }}
              >
                Dokumentasi nyata dari layanan yang kami kerjakan —
                dari perencanaan hingga finishing.
              </p>
            </Reveal>
          </div>

          {/* ═══ GRID GALERI ═══ */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-2.5 lg:gap-3 [grid-auto-rows:130px] sm:[grid-auto-rows:150px] lg:[grid-auto-rows:190px]">
            {projects.map((item, i) => (
              <Reveal
                key={i}
                delay={Math.min(i, 16) * 35}
                y={30}
                duration={700}
                className={getSpan(i)}
              >
                <button
                  type="button"
                  onClick={() => setSelectedIndex(i)}
                  aria-label={`Buka proyek ${i + 1}`}
                  className="group relative w-full h-full overflow-hidden rounded-xl bg-slate-100 cursor-pointer border border-slate-200/80 hover:border-[#1e88e5]/60 hover:shadow-lg hover:shadow-slate-900/5 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e88e5] focus-visible:ring-offset-2"
                >
                  <img
                    src={item.src}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    width={600}
                    height={600}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                  />

                  <div
                    className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    aria-hidden="true"
                  />
                </button>
              </Reveal>
            ))}
          </div>

          {/* ═══ CTA ═══ */}
          <Reveal y={34}>
            <div className="mt-12 sm:mt-16 lg:mt-20 pt-8 sm:pt-10 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6">
              <p
                className="text-slate-600 leading-relaxed text-center sm:text-left max-w-xl"
                style={{ fontSize: "clamp(0.875rem, 1.6vw, 0.9375rem)" }}
              >
                Butuh layanan seperti yang ada di galeri ini?{" "}
                <span className="text-slate-900 font-medium">
                  Konsultasikan kebutuhan proyek Anda
                </span>{" "}
                — kami siap membantu dari perencanaan hingga finishing.
              </p>

              <Link
                href="/kontak"
                className="group shrink-0 inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 min-h-[44px] rounded-xl bg-slate-900 text-white hover:bg-[#1e88e5] font-semibold text-[11px] sm:text-[11.5px] uppercase tracking-[0.15em] sm:tracking-[0.18em] transition-colors duration-200 shadow-md shadow-slate-900/10 hover:shadow-lg hover:shadow-[#1e88e5]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e88e5] focus-visible:ring-offset-2"
              >
                Konsultasi Gratis
                <IconArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ═══ LIGHTBOX via PORTAL ═══ */}
      {mounted && selectedIndex !== null &&
        createPortal(
          <Lightbox
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            goPrev={goPrev}
            goNext={goNext}
            onClose={closeLightbox}
          />,
          document.body
        )}
    </>
  );
}