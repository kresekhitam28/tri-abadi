// src/components/Projects.jsx
"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { createPortal } from "react-dom";
import { useLang } from "../context/LanguageContext";

// ─────────────────────────────────────────────
// DAFTAR FOTO PENGERJAAN + KATEGORI ALT SEO
// ─────────────────────────────────────────────
const rawProjects = [
  { src: "/proyek/proyek-1.webp", desc: "Pengaspalan jalan raya hotmix dengan alat berat finisher dan tandem roller" },
  { src: "/proyek/proyek-2.webp", desc: "Pekerjaan pengaspalan hotmix area akses perumahan Jabodetabek" },
  { src: "/proyek/proyek-3.webp", desc: "Pemasangan pagar panel beton precast area kawasan industri" },
  { src: "/proyek/proyek-4.webp", desc: "Mobilisasi dan pemasangan tiang pagar panel beton" },
  { src: "/proyek/proyek-5.webp", desc: "Proses instalasi pagar panel beton precast" },
  ...Array.from({ length: 40 }, (_, idx) => {
    const num = idx + 6;
    const labels = [
      "Jasa pengaspalan jalan hotmix bergaransi Jabodetabek",
      "Pemadatan lapisan aspal hotmix menggunakan tandem roller",
      "Pemasangan paving block dan kanstin area parkir",
      "Pekerjaan konstruksi infrastruktur jalan dan perkerasan beton",
    ];
    return {
      src: `/proyek/proyek-${num}.webp`,
      desc: `${labels[idx % labels.length]} - Proyek #${num}`,
    };
  }),
  ...Array.from({ length: 28 }, (_, idx) => {
    const num = idx + 57;
    const labels = [
      "Proyek pengaspalan hotmix jalan lingkungan dan pabrik",
      "Finishing penghamparan aspal hotmix PT Tri Abadi Makmur",
      "Pekerjaan cut and fill serta pemadatan batu makadam",
      "Pemasangan tiang pancang dan struktur pondasi",
    ];
    return {
      src: `/proyek/proyek-${num}.webp`,
      desc: `${labels[idx % labels.length]} - Proyek #${num}`,
    };
  }),
];

// ─────────────────────────────────────────────
// KONTEN BILINGUAL
// ─────────────────────────────────────────────
const content = {
  id: {
    kicker: "Portofolio & Dokumentasi",
    titleLight: "Galeri Proyek",
    titleBold: "Pengaspalan & Konstruksi",
    subtitle:
      "Dokumentasi nyata pengerjaan pengaspalan jalan hotmix, pemasangan paving block, pagar panel beton, dan pemadatan lahan oleh PT Tri Abadi Makmur di Jabodetabek, Banten & Jawa Barat.",
    ctaQuestion: "Ingin hasil pengerjaan rapi dan bergaransi seperti di galeri ini?",
    ctaHighlight: "Konsultasikan kebutuhan proyek Anda",
    ctaSuffix: "— gratis survei lokasi & perhitungan RAB.",
    ctaButton: "Konsultasi via WhatsApp",
    waMessage:
      "Halo PT Tri Abadi Makmur, saya melihat galeri proyek Anda dan ingin konsultasi kebutuhan pengaspalan/konstruksi.",
  },
  en: {
    kicker: "Portfolio & Documentation",
    titleLight: "Asphalt & Construction",
    titleBold: "Project Gallery",
    subtitle:
      "Real documentation of hotmix road paving, paving block installation, precast panel fencing, and land grading by PT Tri Abadi Makmur across Greater Jakarta, Banten & West Java.",
    ctaQuestion: "Want neat and guaranteed workmanship like in this gallery?",
    ctaHighlight: "Consult your project needs",
    ctaSuffix: "— free site survey & cost estimation.",
    ctaButton: "Consult via WhatsApp",
    waMessage:
      "Hello PT Tri Abadi Makmur, I saw your project gallery and would like to consult about an asphalt paving/construction project.",
  },
};

const toSize = (src, suffix) => src.replace(/\.webp$/, `${suffix}.webp`);
const toThumb = (src) => src.replace("/proyek/", "/proyek/thumbs/");

// ─────────────────────────────────────────────
// IKON & HOOKS (TETAP SAMA)
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
    if (!enabled) return { contain: "layout" };
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

function useBodyScrollLock(locked) {
  useEffect(() => {
    if (!locked || typeof document === "undefined") return;
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

function Lightbox({
  selectedIndex,
  setSelectedIndex,
  goPrev,
  goNext,
  onClose,
}) {
  const selected = rawProjects[selectedIndex];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Penampil foto pengerjaan"
      className="fixed inset-0 z-[100] flex flex-col"
      style={{ background: "rgba(2, 6, 23, 0.97)" }}
      onClick={onClose}
    >
      <div className="flex items-center justify-end px-4 sm:px-5 py-3 sm:py-4 z-10 border-b border-white/10 shrink-0">
        <button
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="w-10 h-10 flex items-center justify-center text-white/80 hover:text-white bg-white/5 hover:bg-white/15 backdrop-blur-sm rounded-full transition-colors duration-150 cursor-pointer"
          aria-label="Tutup"
        >
          <IconClose />
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center px-3 sm:px-20 relative min-h-0">
        <button
          onClick={(e) => { e.stopPropagation(); goPrev(); }}
          className="absolute left-1.5 sm:left-6 z-10 w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center text-white/80 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-colors duration-150 cursor-pointer"
          aria-label="Sebelumnya"
        >
          <IconChevronLeft className="w-5 h-5" />
        </button>

        <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
          <img
            src={toSize(selected.src, "-1024")}
            alt={selected.desc}
            decoding="async"
            draggable={false}
            className="w-full h-auto max-h-[72vh] object-contain mx-auto rounded-lg select-none"
          />
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); goNext(); }}
          className="absolute right-1.5 sm:right-6 z-10 w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center text-white/80 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-colors duration-150 cursor-pointer"
          aria-label="Berikutnya"
        >
          <IconChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div
        className="px-3 sm:px-4 py-3 sm:py-4 overflow-x-auto border-t border-white/10 shrink-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        onClick={(e) => e.stopPropagation()}
        style={{ WebkitOverflowScrolling: "touch", scrollSnapType: "x mandatory" }}
      >
        <div className="flex items-center justify-start sm:justify-center gap-1.5 min-w-max mx-auto px-1">
          {rawProjects.map((thumb, i) => {
            const isActive = i === selectedIndex;
            return (
              <button
                key={i}
                onClick={() => setSelectedIndex(i)}
                aria-label={`Foto ${i + 1}`}
                aria-current={isActive ? "true" : undefined}
                className={`shrink-0 w-11 h-11 sm:w-14 sm:h-14 overflow-hidden rounded-md cursor-pointer transition-opacity duration-150
                  ${isActive ? "ring-2 ring-[#1e88e5] opacity-100" : "opacity-30 hover:opacity-80"}`}
                style={{ scrollSnapAlign: "center" }}
              >
                <img
                  src={toThumb(thumb.src)}
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
  const { lang } = useLang();
  const data = content[lang] || content.id;

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile();
  const total = rawProjects.length;

  useEffect(() => {
    setMounted(true);
  }, []);

  useBodyScrollLock(selectedIndex !== null);

  const goPrev = useCallback(() => {
    setSelectedIndex((prev) => (prev === null ? null : (prev - 1 + total) % total));
  }, [total]);

  const goNext = useCallback(() => {
    setSelectedIndex((prev) => (prev === null ? null : (prev + 1) % total));
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
      img.src = toSize(rawProjects[i].src, "-1024");
    });
  }, [selectedIndex, total]);

  const getSpan = (i) => {
    const p = i % 8;
    if (p === 0 || p === 5) return "md:col-span-2 md:row-span-2";
    return "";
  };

  const waHref = `https://wa.me/6282258089367?text=${encodeURIComponent(data.waMessage)}`;

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
                maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 100%)",
                WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 100%)",
              }}
              aria-hidden="true"
            />
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none" aria-hidden="true">
              <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[600px] h-[600px] rounded-full bg-[#1e88e5] blur-3xl" />
            </div>
          </>
        )}

        <div className="relative max-w-5xl mx-auto px-4 sm:px-5 lg:px-8">
          {/* ═══ HEADER DENGAN H1 SEO ═══ */}
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 lg:mb-16">
            <Reveal delay={0} y={20}>
              <div className="inline-flex items-center gap-3 mb-4">
                <span className="w-6 sm:w-8 h-px bg-[#1e88e5]/60" aria-hidden="true" />
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#1e88e5] font-semibold">
                  {data.kicker}
                </span>
                <span className="w-6 sm:w-8 h-px bg-[#1e88e5]/60" aria-hidden="true" />
              </div>
            </Reveal>

            <Reveal delay={80} y={30}>
              <h1
                className="font-light tracking-tight text-slate-900 leading-[1.15]"
                style={{ fontSize: "clamp(1.75rem, 5vw, 2.625rem)" }}
              >
                {data.titleLight} <span className="font-semibold">{data.titleBold}</span>
                <span className="text-[#1e88e5]">.</span>
              </h1>
            </Reveal>

            <Reveal delay={160} y={24}>
              <p
                className="text-slate-600 leading-relaxed mt-4"
                style={{ fontSize: "clamp(0.875rem, 1.6vw, 0.95rem)" }}
              >
                {data.subtitle}
              </p>
            </Reveal>
          </div>

          {/* ═══ GRID GALERI ═══ */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-2.5 lg:gap-3 [grid-auto-rows:130px] sm:[grid-auto-rows:150px] lg:[grid-auto-rows:190px]">
            {rawProjects.map((item, i) => (
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
                  aria-label={item.desc}
                  className="group relative w-full h-full overflow-hidden rounded-xl bg-slate-100 cursor-pointer border border-slate-200/80 hover:border-[#1e88e5]/60 hover:shadow-lg hover:shadow-slate-900/5 transition-colors duration-300"
                >
                  <img
                    src={toSize(item.src, "-640")}
                    srcSet={`
                      ${toSize(item.src, "-320")} 320w,
                      ${toSize(item.src, "-640")} 640w,
                      ${toSize(item.src, "-1024")} 1024w
                    `}
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 260px"
                    alt={item.desc}
                    loading="lazy"
                    decoding="async"
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

          {/* ═══ CTA (WHATSAPP) ═══ */}
          <Reveal y={34}>
            <div className="mt-12 sm:mt-16 lg:mt-20 pt-8 sm:pt-10 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6">
              <p
                className="text-slate-600 leading-relaxed text-center sm:text-left max-w-xl"
                style={{ fontSize: "clamp(0.875rem, 1.6vw, 0.9375rem)" }}
              >
                {data.ctaQuestion}{" "}
                <span className="text-slate-900 font-medium">{data.ctaHighlight}</span>{" "}
                {data.ctaSuffix}
              </p>

              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group shrink-0 inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 min-h-[44px] rounded-xl bg-[#1e88e5] hover:bg-blue-600 text-white font-semibold text-[11px] sm:text-[11.5px] uppercase tracking-[0.15em] sm:tracking-[0.18em] transition-all duration-200 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40"
              >
                {data.ctaButton}
                <IconArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
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