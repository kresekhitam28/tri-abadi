// src/components/ProjectsSection.jsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { useLang } from "../context/LanguageContext";

// ═══════════════════════════════════════════════════════════════
// ⚠️ DATA PROYEK
// ═══════════════════════════════════════════════════════════════
// 
// Keterangan:
// - `image`  : Isi dengan 1 foto saja (bisa foto hasil, bisa foto proses)

const ALL_PROJECTS = [
  {
    id: "cikupa",
    title: {
      id: "Pengaspalan Jalan Kawasan Industri Cikupa, Tangerang",
      en: "Road Paving – Cikupa Industrial Estate, Tangerang",
    },
    spec: { id: "Hotmix AC-WC, tebal 3 cm", en: "Hotmix AC-WC, 3 cm thick" },
    clientType: { id: "Kawasan Industri", en: "Industrial Estate" },
    image: "/proyek/proyek-1.webp",
  },
  {
    id: "bsd",
    title: {
      id: "Pengaspalan Jalan Utama Perumahan BSD, Tangerang Selatan",
      en: "Main Road Paving – BSD Housing, South Tangerang",
    },
    spec: { id: "Hotmix AC-WC, tebal 3 cm", en: "Hotmix AC-WC, 3 cm thick" },
    clientType: { id: "Perumahan", en: "Housing" },
    image: "/proyek/proyek-20.webp",
  },
  {
    id: "rsud-tangerang",
    title: {
      id: "Pengaspalan Area Parkir RSUD Kabupaten Tangerang",
      en: "Parking Area Paving – Tangerang District Hospital",
    },
    spec: { id: "Hotmix AC-WC, tebal 3 cm", en: "Hotmix AC-WC, 3 cm thick" },
    clientType: { id: "Fasilitas Kesehatan", en: "Healthcare Facility" },
    image: "/proyek/proyek-3.webp",
  },
  {
    id: "cikarang",
    title: {
      id: "Pengaspalan Jalan Akses Kawasan Industri Cikarang, Bekasi",
      en: "Access Road Paving – Cikarang Industrial Estate, Bekasi",
    },
    spec: { id: "Hotmix AC-WC, tebal 3 cm", en: "Hotmix AC-WC, 3 cm thick" },
    clientType: { id: "Kawasan Industri", en: "Industrial Estate" },
    image: "/proyek/proyek-35.webp",
  },
  {
    id: "serpong",
    title: {
      id: "Pengaspalan Jalan Perumahan Modern Serpong",
      en: "Road Paving – Modern Serpong Housing",
    },
    spec: { id: "Hotmix AC-WC, tebal 3 cm", en: "Hotmix AC-WC, 3 cm thick" },
    clientType: { id: "Perumahan", en: "Housing" },
    image: "/proyek/proyek-26.webp",
  },
  {
    id: "parkir-pabrik",
    title: {
      id: "Pengaspalan Area Parkir Pabrik, Tangerang",
      en: "Parking Area Paving – Factory, Tangerang",
    },
    spec: { id: "Hotmix AC-WC, tebal 3 cm", en: "Hotmix AC-WC, 3 cm thick" },
    clientType: { id: "Industri", en: "Industrial" },
    image: "/proyek/proyek-10.webp",
  },
  {
    id: "depok",
    title: {
      id: "Pengaspalan Jalan Lingkungan Perumahan Depok",
      en: "Neighborhood Road Paving – Depok Housing",
    },
    spec: { id: "Hotmix AC-WC, tebal 3 cm", en: "Hotmix AC-WC, 3 cm thick" },
    clientType: { id: "Perumahan", en: "Housing" },
    image: "/proyek/proyek-31.webp",
  },
  {
    id: "karawaci",
    title: {
      id: "Pengaspalan Jalan Kawasan Komersial Karawaci",
      en: "Commercial Area Road Paving – Karawaci",
    },
    spec: { id: "Hotmix AC-WC, tebal 3 cm", en: "Hotmix AC-WC, 3 cm thick" },
    clientType: { id: "Komersial", en: "Commercial" },
    image: "/proyek/proyek-8.webp",
  },
];

const projects = ALL_PROJECTS.slice(0, 8);

// Helper: src → varian ukuran
const toSize = (src, suffix) => src.replace(/\.webp$/, `${suffix}.webp`);

// ═════════════════════════════════════════════
// KONTEN BILINGUAL
// ═════════════════════════════════════════════
const content = {
  id: {
    kicker: "Karya Hebat & Mengagumkan",
    titleBold: "Proyek",
    titleAfter: " Kami",
    openProject: "Buka detail proyek",
    prev: "Proyek sebelumnya",
    next: "Proyek berikutnya",
    close: "Tutup",
    viewer: "Penampil detail proyek",
    counter: (i, total) => `${i} / ${total}`,
  },
  en: {
    kicker: "Great & Awesome Works",
    titleLight: "Our ",
    titleBold: "Projects",
    titleAfter: "",
    openProject: "Open project detail",
    prev: "Previous project",
    next: "Next project",
    close: "Close",
    viewer: "Project detail viewer",
    counter: (i, total) => `${i} / ${total}`,
  },
};

// ═════════════════════════════════════════════
// IKON
// ═════════════════════════════════════════════
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
function IconZoom({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35M11 8v6M8 11h6" />
    </svg>
  );
}

// ═════════════════════════════════════════════
// HOOK: body scroll lock
// ═════════════════════════════════════════════
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

// ═════════════════════════════════════════════
// LIGHTBOX (1 Gambar Full, Teks Polos)
// ═════════════════════════════════════════════
function Lightbox({ selectedIndex, setSelectedIndex, lang, goPrev, goNext }) {
  const data = content[lang] || content.id;
  const selected = projects[selectedIndex];

  const total = projects.length;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={data.viewer}
      className="fixed inset-0 z-[9999] flex flex-col bg-slate-950/95"
      onClick={() => setSelectedIndex(null)}
    >
      {/* ═══ TOP BAR ═══ */}
      <div className="flex items-start sm:items-center gap-3 p-3 sm:p-5 z-10 shrink-0 border-b border-white/10">
        <div className="min-w-0 flex-1">
          {/* Teks polos tanpa kotak */}
          <p className="text-[10px] sm:text-xs uppercase tracking-wider text-[#1e88e5] font-semibold mb-0.5">
            {selected.clientType[lang]}
          </p>
          <h3 className="text-white text-sm sm:text-base font-medium leading-snug line-clamp-2">
            {selected.title[lang]}
          </h3>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <span
            className="text-white/60 text-xs sm:text-sm tabular-nums font-medium"
            aria-label={data.counter(selectedIndex + 1, total)}
          >
            {data.counter(selectedIndex + 1, total)}
          </span>
          <button
            onClick={(e) => { e.stopPropagation(); setSelectedIndex(null); }}
            className="w-10 h-10 flex items-center justify-center text-white/80 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label={data.close}
          >
            <IconClose />
          </button>
        </div>
      </div>

      {/* ═══ BODY: Gambar Full Width (Tanpa Tab) ═══ */}
      <div
        className="flex-1 flex min-h-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full flex items-center justify-center px-3 sm:px-6 py-3 min-h-0">
          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-1.5 sm:left-4 z-10 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-white/80 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label={data.prev}
          >
            <IconChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <img
            key={selectedIndex}
            src={toSize(selected.image, "-1024")}
            alt={selected.title[lang]}
            decoding="async"
            loading="eager"
            draggable={false}
            className="max-w-full max-h-[75vh] object-contain select-none rounded-lg"
          />

          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-1.5 sm:right-4 z-10 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-white/80 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label={data.next}
          >
            <IconChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════
// PROJECTS SECTION
// ═════════════════════════════════════════════
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

  return (
    <>
      <section className="relative bg-white pt-4 sm:pt-6 lg:pt-8 pb-16 sm:pb-20 lg:pb-28">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">

          {/* ═══ HEADER ═══ */}
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <div className="inline-flex items-center gap-2.5 sm:gap-3 mb-4 sm:mb-5">
              <span className="w-6 sm:w-10 h-px bg-[#1e88e5]" aria-hidden="true" />
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#1e88e5] font-semibold">
                {data.kicker}
              </span>
              <span className="w-6 sm:w-10 h-px bg-[#1e88e5]" aria-hidden="true" />
            </div>

            <h2
              className="font-light tracking-tight text-slate-900 leading-[1.05]"
              style={{ fontSize: "clamp(2rem, 6vw, 3.75rem)" }}
            >
              {data.titleLight || ""}
              <span className="font-semibold">{data.titleBold}</span>
              {data.titleAfter || ""}
              <span className="text-[#1e88e5]">.</span>
            </h2>
          </div>

          {/* ═══ GRID PROYEK ═══ */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3 lg:gap-4">
            {projects.map((item, i) => (
              <button
                key={item.id}
                onClick={() => setSelectedIndex(i)}
                className="group relative overflow-hidden rounded-xl bg-slate-100 aspect-square cursor-pointer border border-slate-200 hover:border-[#1e88e5] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e88e5] focus-visible:ring-offset-2 text-left"
                aria-label={`${data.openProject}: ${item.title[lang]}`}
              >
                <img
                  src={toSize(item.image, "-640")}
                  srcSet={`
                    ${toSize(item.image, "-320")} 320w,
                    ${toSize(item.image, "-640")} 640w,
                    ${toSize(item.image, "-1024")} 1024w
                  `}
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  alt={`${item.title[lang]} — ${item.spec[lang]}`}
                  fetchPriority={i < 4 ? "high" : "auto"}
                  loading={i < 4 ? "eager" : "lazy"}
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                />

                {/* Gradient overlay untuk keterbacaan teks */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent"
                  aria-hidden="true"
                />

                {/* Konten teks (Polos tanpa kotak) */}
                <div className="absolute inset-x-0 bottom-0 p-2.5 sm:p-3.5">
                  <p className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#1e88e5] font-semibold mb-0.5 sm:mb-1">
                    {item.clientType[lang]}
                  </p>
                  <h3 className="text-white text-[11px] sm:text-sm font-medium leading-snug line-clamp-2">
                    {item.title[lang]}
                  </h3>
                </div>

                {/* Zoom icon */}
                <div
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  aria-hidden="true"
                >
                  <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 border border-white/40 backdrop-blur-sm flex items-center justify-center text-white">
                    <IconZoom className="w-4 h-4 sm:w-5 sm:h-5" />
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