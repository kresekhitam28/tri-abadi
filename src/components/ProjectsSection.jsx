// src/components/ProjectsSection.jsx
"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
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
      className="fixed inset-0 z-[9999] flex flex-col bg-slate-950/95"
      onClick={() => setSelectedIndex(null)}
    >
      <div className="flex items-center justify-end p-3 sm:p-5 z-10 shrink-0
                      border-b border-white/10">
        <button
          onClick={(e) => { e.stopPropagation(); setSelectedIndex(null); }}
          className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center
                     text-white/70 hover:text-white bg-white/10 hover:bg-white/20
                     rounded-full transition-colors duration-200 cursor-pointer"
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
                     rounded-full transition-colors duration-200 cursor-pointer"
          aria-label={lang === "en" ? "Previous" : "Sebelumnya"}
        >
          <IconChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <div
          className="relative max-w-4xl w-full h-[72vh] flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            key={selectedIndex}
            src={selected.src}
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-contain select-none rounded-lg"
          />
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); goNext(); }}
          className="absolute right-2 sm:right-6 z-10 w-10 h-10 sm:w-12 sm:h-12
                     flex items-center justify-center
                     text-white/70 hover:text-white bg-white/10 hover:bg-white/20
                     rounded-full transition-colors duration-200 cursor-pointer"
          aria-label={lang === "en" ? "Next" : "Berikutnya"}
        >
          <IconChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      <div
        className="shrink-0 p-3 sm:p-4 overflow-x-auto border-t border-white/10"
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
              className={`relative shrink-0 w-12 h-12 sm:w-16 sm:h-16
                          overflow-hidden rounded-md cursor-pointer
                          transition-opacity duration-200
                          ${i === selectedIndex
                            ? "ring-2 ring-[#1e88e5] opacity-100"
                            : "opacity-40 hover:opacity-90"}`}
              style={{ scrollSnapAlign: "center" }}
              aria-label={lang === "en" ? `Photo ${i + 1}` : `Foto ${i + 1}`}
            >
              <Image
                src={thumb.src}
                alt=""
                fill
                sizes="64px"
                className="object-cover"
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
        className="relative bg-white pt-4 sm:pt-6 lg:pt-8 pb-16 sm:pb-20 lg:pb-28"
        style={{ contain: "layout style" }}
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">

          {/* ═══ HEADER ═══ */}
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <div className="inline-flex items-center gap-2.5 sm:gap-3 mb-4 sm:mb-5">
              <span className="w-6 sm:w-10 h-px bg-[#1e88e5]" />
              <span className="text-[10px] sm:text-xs uppercase
                               tracking-[0.25em] sm:tracking-[0.3em]
                               text-[#1e88e5] font-semibold">
                {labels.kicker}
              </span>
              <span className="w-6 sm:w-10 h-px bg-[#1e88e5]" />
            </div>

            <h2
              className="font-light tracking-tight text-slate-900 leading-[1.05]"
              style={{ fontSize: "clamp(2rem, 6vw, 3.75rem)" }}
            >
              {labels.light}
              <span className="font-semibold">{labels.bold}</span>
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
                           transition-colors duration-200"
                aria-label={`Buka proyek ${i + 1}`}
              >
                <Image
                  src={item.src}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  priority={i < 4}
                  className="object-cover
                             transition-transform duration-500 ease-out
                             group-hover:scale-[1.05]"
                />

                {/* Overlay tipis saat hover */}
                <div
                  className="absolute inset-0 bg-slate-950/40
                             opacity-0 group-hover:opacity-100
                             transition-opacity duration-300"
                  aria-hidden="true"
                />

                {/* Zoom icon */}
                <div
                  className="absolute inset-0 flex items-center justify-center
                             opacity-0 group-hover:opacity-100
                             transition-opacity duration-300"
                  aria-hidden="true"
                >
                  <span
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-full
                               bg-white/20 border border-white/40
                               flex items-center justify-center
                               text-white"
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