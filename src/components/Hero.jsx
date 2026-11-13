// src/components/Hero.jsx
"use client";

import { useEffect, useState } from "react";
import { useLang } from "../context/LanguageContext";
import { useIsMobile } from "../hooks/useIsMobile";

// ─────────────────────────────────────────────
// DAFTAR FOTO (background)
// ─────────────────────────────────────────────
const photos = [
  { src: "/proyek/hero-1.webp" },
  { src: "/proyek/hero-2.webp" },
  { src: "/proyek/hero-3.webp" },
];

const toSize = (src, suffix) => src.replace(/\.webp$/, `${suffix}.webp`);

// ─────────────────────────────────────────────
// KONTEN BILINGUAL
// ─────────────────────────────────────────────
const content = {
  id: {
    labels: [
      "Jasa Pengaspalan",
      "Jasa Pagar Panel",
      "Jasa Tiang Pancang",
      "Jasa Pasang Paving Block",
      "Jasa Pasang Kanstin",
      "Jasa Pasang Grass Block",
      "Jasa Pasang Cor Beton",
    ],
    titleTop: "Jasa Pengaspalan Jalan",
    titleBottom: "& Aspal Hotmix Profesional",
    tagline: (
      <>
        Kontraktor pengaspalan jalan, pabrik, perumahan & area parkir{" "}
        <span className="font-semibold text-white">
          bergaransi di Jabodetabek, Banten & Jawa Barat
        </span>
        . Paket lengkap mulai{" "}
        <span className="font-semibold text-white">Rp 75.000/m²</span>.
      </>
    ),
    ctaWa: "Konsultasi & Survei Gratis",
    waMessage:
      "Halo PT Tri Abadi Makmur, saya ingin konsultasi & jadwal survei gratis untuk pekerjaan pengaspalan/konstruksi.",
    ctaProfile: "Download Company Profile",
  },
  en: {
    labels: [
      "Asphalt Paving Services",
      "Panel Fence Services",
      "Pile Driving Services",
      "Paving Block Installation",
      "Curb Installation",
      "Grass Block Installation",
      "Ready-Mix Concrete Works",
    ],
    titleTop: "Professional Road Paving",
    titleBottom: "& Hotmix Asphalt Contractor",
    tagline: (
      <>
        Guaranteed road, factory, residential & parking area paving contractor{" "}
        <span className="font-semibold text-white">
          across Greater Jakarta, Banten & West Java
        </span>
        . All-in packages starting from{" "}
        <span className="font-semibold text-white">Rp 75,000/m²</span>.
      </>
    ),
    ctaWa: "Free Consultation & Survey",
    waMessage:
      "Hello PT Tri Abadi Makmur, I would like a free consultation & site survey for an asphalt paving/construction project.",
    ctaProfile: "Download Company Profile",
  },
};

// ─────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────
export default function Hero() {
  const { lang } = useLang();
  const data = content[lang] || content.id;
  const isMobile = useIsMobile();

  const [active, setActive] = useState(0);
  const [labelIdx, setLabelIdx] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  // Rotasi background (desktop only)
  useEffect(() => {
    if (isMobile || photos.length <= 1) return;
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % photos.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [isMobile]);

  // Rotasi label
  useEffect(() => {
    const interval = setInterval(() => {
      setLabelIdx((prev) => (prev + 1) % data.labels.length);
    }, isMobile ? 3500 : 3000);
    return () => clearInterval(interval);
  }, [data.labels.length, isMobile]);

  // Reset label saat ganti bahasa
  useEffect(() => {
    setLabelIdx(0);
  }, [lang]);

  // Prefetch next hero image (desktop only) — pakai varian -1024
  useEffect(() => {
    if (isMobile || typeof document === "undefined") return;
    const next = (active + 1) % photos.length;
    const href = toSize(photos[next].src, "-1024");

    const existing = document.querySelector(`link[data-hero-prefetch="${href}"]`);
    if (existing) return;

    const link = document.createElement("link");
    link.rel = "prefetch";
    link.as = "image";
    link.href = href;
    link.setAttribute("data-hero-prefetch", href);
    document.head.appendChild(link);
  }, [active, isMobile]);

  const waHref = `https://wa.me/6282258089367?text=${encodeURIComponent(
    data.waMessage
  )}`;

  return (
    <section
      role="region"
      aria-label="Hero"
      className="relative flex items-center justify-center overflow-hidden bg-slate-950
                 min-h-[calc(100svh-76px)] sm:min-h-[calc(100dvh-76px)]"
    >
      {/* ═══ BACKGROUND ═══ */}
      {isMobile ? (
        <img
          src="/proyek/hero-1-640.webp"
          srcSet="
            /proyek/hero-1-320.webp 320w,
            /proyek/hero-1-640.webp 640w,
            /proyek/hero-1-1024.webp 1024w
          "
          sizes="100vw"
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          loading="eager"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        photos.map((p, i) => (
          <img
            key={p.src}
            src={toSize(p.src, "-1024")}
            srcSet={`
              ${toSize(p.src, "-640")} 640w,
              ${toSize(p.src, "-1024")} 1024w
            `}
            sizes="100vw"
            alt=""
            aria-hidden="true"
            fetchPriority={i === 0 ? "high" : "low"}
            loading="eager"
            decoding="async"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1200ms] ease-in-out
                        ${i === active ? "opacity-100" : "opacity-0"}`}
          />
        ))
      )}

      {/* ═══ OVERLAY ═══ */}
      <div className="absolute inset-0 bg-slate-950/70" aria-hidden="true" />

      {/* ═══ CONTENT ═══ */}
      <div
        className="relative z-10 w-full max-w-5xl md:max-w-6xl mx-auto
                   px-5 sm:px-8 lg:px-12
                   py-12 sm:py-16 lg:py-24 text-center"
      >
        {/* ─── LABEL ROTATOR ─── */}
        <div
          className={`flex items-center justify-center gap-2 sm:gap-4 mb-6 sm:mb-8
                      transition-all duration-700 ease-out
                      ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
          style={{ transitionDelay: "180ms" }}
        >
          <span className="w-6 sm:w-12 h-px bg-[#1e88e5]" />
          <span
            className="relative inline-flex items-center justify-center h-6 sm:h-7
                       min-w-[180px] xs:min-w-[220px] sm:min-w-[300px]"
          >
            {data.labels.map((text, i) => (
              <span
                key={text}
                className={`absolute inset-0 flex items-center justify-center
                            text-[10px] sm:text-xs md:text-[13px]
                            text-[#1e88e5] font-semibold
                            tracking-[0.25em] sm:tracking-[0.35em] uppercase
                            whitespace-nowrap px-1
                            transition-all duration-500 ease-out
                            ${
                              i === labelIdx
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-2 pointer-events-none"
                            }`}
              >
                {text}
              </span>
            ))}
          </span>
          <span className="w-6 sm:w-12 h-px bg-[#1e88e5]" />
        </div>

        {/* ─── HEADING ─── */}
        <h1
          className={`text-white leading-[0.95] mb-5 sm:mb-8
                      transition-all duration-1000 ease-out
                      ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{
            fontSize: "clamp(2.5rem, 9vw, 7rem)",
            letterSpacing: "-0.02em",
          }}
        >
          <span className="block font-light tracking-tight text-3xl sm:text-5xl mb-2">
            {data.titleTop}
          </span>
          <span className="block font-bold tracking-tight text-white text-4xl sm:text-6xl">
            {data.titleBottom}
          </span>
        </h1>

        {/* ─── TAGLINE ─── */}
        <p
          className={`max-w-2xl mx-auto text-white/85
                      leading-[1.85] font-light tracking-wide
                      transition-all duration-700 ease-out
                      ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
          style={{
            transitionDelay: "900ms",
            fontSize: "clamp(0.875rem, 2.2vw, 1.125rem)",
          }}
        >
          {data.tagline}
        </p>

        {/* ─── TOMBOL CTA (WHATSAPP & COMPANY PROFILE) ─── */}
        <div
          className={`mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4
                      transition-all duration-700 ease-out
                      ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
          style={{ transitionDelay: "1100ms" }}
        >
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 sm:px-8 sm:py-3.5
                       bg-[#1e88e5] hover:bg-blue-600 text-white
                       font-semibold text-sm sm:text-base rounded-md
                       transition-all duration-300 shadow-lg shadow-blue-500/30
                       hover:shadow-blue-500/50 hover:-translate-y-0.5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M12.031 2c-5.516 0-9.969 4.453-9.969 9.969 0 1.758.458 3.475 1.328 4.988L2 22l5.188-1.359a9.93 9.93 0 0 0 4.843 1.258h.004c5.515 0 9.969-4.453 9.969-9.969A9.93 9.93 0 0 0 19.08 4.92 9.913 9.913 0 0 0 12.031 2Zm5.805 14.234c-.246.692-1.426 1.324-1.976 1.406-.508.078-1.148.109-1.855-.117-.426-.137-.977-.316-1.68-.621-2.957-1.277-4.887-4.254-5.035-4.453-.145-.195-1.203-1.602-1.203-3.055 0-1.453.762-2.168 1.031-2.465.27-.297.59-.371.785-.371.195 0 .391.004.563.012.18.008.422-.07.66.504.246.59.836 2.043.91 2.191.074.148.121.32.023.516-.098.195-.148.32-.293.492-.148.172-.312.383-.445.516-.148.148-.301.309-.129.605.172.297.766 1.262 1.645 2.043 1.129 1.008 2.082 1.32 2.379 1.469.297.148.469.125.641-.074.172-.195.738-.859.934-1.156.195-.297.391-.246.66-.148.27.098 1.719.809 2.012.957.297.148.492.223.566.348.074.125.074.715-.172 1.406Z" />
            </svg>
            {data.ctaWa}
          </a>

          <a
            href="/company-profile.pdf"
            download
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-7 sm:py-3.5
                       bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-sm
                       font-medium text-sm sm:text-base rounded-md
                       transition-all duration-300 hover:-translate-y-0.5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
            {data.ctaProfile}
          </a>
        </div>
      </div>
    </section>
  );
}