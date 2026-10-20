// src/components/ProjectsSection.jsx
"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";
import { useLang } from "../context/LanguageContext";

// ─────────────────────────────────────────────
// DAFTAR PROYEK (untuk beranda, tampil 8 saja)
// ─────────────────────────────────────────────
const ALL_PROJECTS = [
  { src: "/proyek/proyek-1.webp" },
  { src: "/proyek/proyek-20.webp" },
  { src: "/proyek/proyek-3.webp" },
  { src: "/proyek/proyek-35.webp" },
  { src: "/proyek/proyek-26.webp" },
  { src: "/proyek/proyek-10.webp" },
  { src: "/proyek/proyek-31.webp" },
  { src: "/proyek/proyek-8.webp" },
  { src: "/proyek/proyek-33.webp" },
  { src: "/proyek/proyek-39.webp" },
  { src: "/proyek/proyek-18.webp" },
  { src: "/proyek/proyek-15.webp" },
];

const projects = ALL_PROJECTS.slice(0, 8);

// ─────────────────────────────────────────────
// KONTEN BILINGUAL
// ─────────────────────────────────────────────
const content = {
  id: {
    kicker: "Karya Hebat & Mengagumkan",
    titleBold: "Proyek",
    titleAfter: " Kami",
  },
  en: {
    kicker: "Great & Awesome Works",
    titleLight: "Our ",
    titleBold: "Projects",
    titleAfter: "",
  },
};

// ─────────────────────────────────────────────
// IKON
// ─────────────────────────────────────────────
function IconChevronLeft({ className = "w-6 h-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}
function IconChevronRight({ className = "w-6 h-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}
function IconClose({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
      strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}
function IconZoom({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35M11 8v6M8 11h6" />
    </svg>
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
function Lightbox({ selectedIndex, setSelectedIndex, lang, goPrev, goNext }) {
  const selected = projects[selectedIndex];

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col
                 bg-slate-950/95 backdrop-blur-md
                 animate-[fadeIn_200ms_ease-out]"
      onClick={() => setSelectedIndex(null)}
      style={{
        animation: "fadeIn 200ms ease-out",
      }}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.96); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>

      <div className="flex items-center justify-end p-3 sm:p-5 z-10 shrink-0
                      border-b border-white/5">
        <button
          onClick={(e) => { e.stopPropagation(); setSelectedIndex(null); }}
          className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center
                     text-white/70 hover:text-white bg-white/5 hover:bg-white/15
                     rounded-full transition-all duration-200 cursor-pointer
                     hover:scale-105
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          aria-label={lang === "en" ? "Close" : "Tutup"}
        >
          <IconClose />
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center px-3 sm:px-20
                      relative min-h-0">
        <button
          onClick={(e) => { e.stopPropagation(); goPrev(); }}
          className="absolute left-2 sm:left-6 z-10 w-10 h-10 sm:w-12 sm:h-12
                     flex items-center justify-center
                     text-white/70 hover:text-white bg-white/10 hover:bg-white/20
                     rounded-full transition-all duration-200 cursor-pointer
                     hover:scale-105
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          aria-label={lang === "en" ? "Previous" : "Sebelumnya"}
        >
          <IconChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <div
          className="max-w-4xl w-full flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            key={selectedIndex}
            src={selected.src}
            alt=""
            decoding="async"
            className="w-full h-auto max-h-[72vh] object-contain mx-auto
                       select-none rounded-lg shadow-2xl shadow-black/50"
            draggable={false}
            style={{ animation: "scaleIn 250ms ease-out" }}
          />
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); goNext(); }}
          className="absolute right-2 sm:right-6 z-10 w-10 h-10 sm:w-12 sm:h-12
                     flex items-center justify-center
                     text-white/70 hover:text-white bg-white/10 hover:bg-white/20
                     rounded-full transition-all duration-200 cursor-pointer
                     hover:scale-105
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          aria-label={lang === "en" ? "Next" : "Berikutnya"}
        >
          <IconChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      <div
        className="shrink-0 p-3 sm:p-4 overflow-x-auto border-t border-white/5"
        onClick={(e) => e.stopPropagation()}
        style={{
          WebkitOverflowScrolling: "touch",
          scrollSnapType: "x mandatory",
        }}
      >
        <div className="flex items-center justify-start sm:justify-center gap-2
                        min-w-max mx-auto px-1">
          {projects.map((thumb, i) => (
            <button
              key={i}
              onClick={() => setSelectedIndex(i)}
              className={`shrink-0 w-12 h-12 sm:w-16 sm:h-16 overflow-hidden rounded-md
                          transition-all duration-200 cursor-pointer
                          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e88e5]
                          ${i === selectedIndex
                            ? "ring-2 ring-[#1e88e5] opacity-100 shadow-lg shadow-[#1e88e5]/30"
                            : "opacity-40 hover:opacity-90 hover:scale-105"}`}
              style={{ scrollSnapAlign: "center" }}
              aria-label={lang === "en" ? `Photo ${i + 1}` : `Foto ${i + 1}`}
            >
              <img
                src={thumb.src}
                alt=""
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// PROJECTS SECTION
// ─────────────────────────────────────────────
export default function ProjectsSection() {
  const { lang } = useLang();
  const data = content[lang] || content.id;

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useBodyScrollLock(selectedIndex !== null);

  const goPrev = useCallback(() => {
    setSelectedIndex((prev) =>
      prev === null ? null : (prev - 1 + projects.length) % projects.length
    );
  }, []);

  const goNext = useCallback(() => {
    setSelectedIndex((prev) =>
      prev === null ? null : (prev + 1) % projects.length
    );
  }, []);

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
    const next = (selectedIndex + 1) % projects.length;
    const prev = (selectedIndex - 1 + projects.length) % projects.length;
    [next, prev].forEach((i) => {
      const img = new Image();
      img.src = projects[i].src;
    });
  }, [selectedIndex]);

  const labels = useMemo(
    () => ({
      kicker: data.kicker,
      bold: data.titleBold,
      light: data.titleLight || "",
      after: data.titleAfter || "",
    }),
    [data]
  );

  return (
    <>
      <section
        className="relative bg-white pt-4 sm:pt-6 lg:pt-8 pb-16 sm:pb-20 lg:pb-28 overflow-hidden"
        style={{ contain: "layout style" }}
      >
        {/* Background decoration */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          aria-hidden="true"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #1e88e5 1px, transparent 0)`,
            backgroundSize: "32px 32px",
            maskImage:
              "radial-gradient(ellipse 60% 50% at 50% 50%, black 30%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 60% 50% at 50% 50%, black 30%, transparent 100%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">

          {/* ═══ HEADER ═══ */}
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <div className="inline-flex items-center gap-2.5 sm:gap-3 mb-4 sm:mb-5">
              <span className="w-6 sm:w-12 h-px bg-gradient-to-r from-transparent to-[#1e88e5]" />
              <span className="text-[10px] sm:text-xs uppercase
                               tracking-[0.25em] sm:tracking-[0.3em]
                               text-[#1e88e5] font-semibold">
                {labels.kicker}
              </span>
              <span className="w-6 sm:w-12 h-px bg-gradient-to-l from-transparent to-[#1e88e5]" />
            </div>

            <h2
              className="font-light tracking-tight text-slate-900 leading-[1.05]"
              style={{ fontSize: "clamp(2rem, 6vw, 3.75rem)" }}
            >
              {labels.light}
              <span
                className="font-semibold
                           bg-gradient-to-r from-slate-900 to-[#1e88e5]
                           bg-clip-text text-transparent"
              >
                {labels.bold}
              </span>
              {labels.after}
              <span className="text-[#1e88e5]">.</span>
            </h2>
          </div>

          {/* ═══ GRID PROYEK ═══ */}
          <div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3 lg:gap-4"
            style={{ contain: "layout paint style" }}
          >
            {projects.map((item, i) => (
              <button
                key={i}
                onClick={() => setSelectedIndex(i)}
                className="group relative overflow-hidden rounded-xl bg-slate-100
                           aspect-square cursor-pointer
                           border border-slate-200
                           hover:border-[#1e88e5]
                           shadow-sm hover:shadow-xl hover:shadow-[#1e88e5]/10
                           transition-all duration-300
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e88e5]
                           focus-visible:ring-offset-2"
                aria-label={`Buka proyek ${i + 1}`}
              >
                <img
                  src={item.src}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover
                             transition-transform duration-500 ease-out
                             will-change-transform
                             group-hover:scale-[1.08]"
                />

                {/* Overlay gradient saat hover */}
                <div
                  className="absolute inset-0 bg-gradient-to-t
                             from-slate-950/60 via-slate-950/10 to-transparent
                             opacity-0 group-hover:opacity-100
                             transition-opacity duration-300"
                  aria-hidden="true"
                />

                {/* Zoom icon saat hover */}
                <div
                  className="absolute inset-0 flex items-center justify-center
                             opacity-0 group-hover:opacity-100
                             transition-opacity duration-300"
                  aria-hidden="true"
                >
                  <span
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-full
                               bg-white/20 backdrop-blur-md
                               border border-white/30
                               flex items-center justify-center
                               text-white
                               scale-90 group-hover:scale-100
                               transition-transform duration-300"
                  >
                    <IconZoom className="w-5 h-5" />
                  </span>
                </div>
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* ═══ LIGHTBOX via PORTAL ═══ */}
      {mounted && selectedIndex !== null &&
        createPortal(
          <Lightbox
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            lang={lang}
            goPrev={goPrev}
            goNext={goNext}
          />,
          document.body
        )}
    </>
  );
}