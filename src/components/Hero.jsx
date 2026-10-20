// src/components/Hero.jsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useLang } from "../context/LanguageContext";
import { useIsMobile } from "../hooks/useIsMobile";

// ─────────────────────────────────────────────
// DAFTAR FOTO (background)
// ─────────────────────────────────────────────
const photos = [
  { src: "/proyek/hero-1.webp", srcSmall: "/proyek/hero-1.webp" },
  { src: "/proyek/hero-2.webp", srcSmall: "/proyek/hero-2.webp" },
  { src: "/proyek/hero-3.webp", srcSmall: "/proyek/hero-3.webp" },
];

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
    tagline: (
      <>
        Komitmen kami sebagai kontraktor adalah membangun nilai komunitas
        pada setiap proyek sekaligus memberikan{" "}
        <span className="font-semibold text-white">
          keahlian profesional
        </span>
        .
      </>
    ),
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
    tagline: (
      <>
        Our promise as a contractor is to build community value into every
        project while delivering{" "}
        <span className="font-semibold text-white">
          professional expertise
        </span>
        .
      </>
    ),
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

  // Prefetch next image via <link rel="prefetch"> (desktop only)
  useEffect(() => {
    if (isMobile || typeof document === "undefined") return;
    const next = (active + 1) % photos.length;
    const href = photos[next].src;

    // Hindari duplikasi
    const existing = document.querySelector(`link[data-hero-prefetch="${href}"]`);
    if (existing) return;

    const link = document.createElement("link");
    link.rel = "prefetch";
    link.as = "image";
    link.href = href;
    link.setAttribute("data-hero-prefetch", href);
    document.head.appendChild(link);

    // Cleanup link lama yang sudah tidak relevan (opsional)
    return () => {
      // Biarkan link tetap ada — browser akan cache, tidak masalah
    };
  }, [active, isMobile]);

  return (
    <section
      role="region"
      aria-label="Hero"
      className="relative flex items-center justify-center overflow-hidden bg-slate-950
                 min-h-[calc(100svh-76px)] sm:min-h-[calc(100dvh-76px)]"
    >
      {/* ═══ BACKGROUND ═══ */}
      {isMobile ? (
        <Image
          src={photos[0].srcSmall}
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      ) : (
        photos.map((p, i) => (
          <Image
            key={p.src}
            src={p.src}
            alt=""
            aria-hidden="true"
            fill
            priority={i === 0}
            sizes="100vw"
            className={`object-cover transition-opacity duration-[1200ms] ease-in-out
                        ${i === active ? "opacity-100" : "opacity-0"}`}
          />
        ))
      )}

      {/* ═══ OVERLAY (solid, bukan gradient) ═══ */}
      <div
        className="absolute inset-0 bg-slate-950/70"
        aria-hidden="true"
      />

      {/* ═══ CONTENT ═══ */}
      <div className="relative z-10 w-full max-w-5xl md:max-w-6xl mx-auto
                      px-5 sm:px-8 lg:px-12
                      py-12 sm:py-16 lg:py-24 text-center">

        {/* ─── LABEL ROTATOR ─── */}
        <div
          className={`flex items-center justify-center gap-2 sm:gap-4 mb-6 sm:mb-8
                      transition-all duration-700 ease-out
                      ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
          style={{ transitionDelay: "180ms" }}
        >
          <span className="w-6 sm:w-12 h-px bg-[#1e88e5]" />
          <span className="relative inline-flex items-center justify-center h-6 sm:h-7
                           min-w-[180px] xs:min-w-[220px] sm:min-w-[300px]">
            {data.labels.map((text, i) => (
              <span
                key={text}
                className={`absolute inset-0 flex items-center justify-center
                            text-[10px] sm:text-xs md:text-[13px]
                            text-[#1e88e5] font-semibold
                            tracking-[0.25em] sm:tracking-[0.35em] uppercase
                            whitespace-nowrap px-1
                            transition-all duration-500 ease-out
                            ${i === labelIdx
                              ? "opacity-100 translate-y-0"
                              : "opacity-0 translate-y-2 pointer-events-none"}`}
              >
                {text}
              </span>
            ))}
          </span>
          <span className="w-6 sm:w-12 h-px bg-[#1e88e5]" />
        </div>

        {/* ─── JUDUL ─── */}
        <h1
          className={`text-white leading-[0.95] mb-5 sm:mb-8
                      transition-all duration-1000 ease-out
                      ${mounted
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-6"}`}
          style={{
            transitionDelay: "400ms",
            fontSize: "clamp(2.5rem, 9vw, 7rem)",
            letterSpacing: "-0.02em",
          }}
        >
          <span className="block font-light tracking-tight">
            PT. TAM
          </span>
          <span className="block font-bold tracking-tight mt-1 sm:mt-2 text-white">
            Indonesia
          </span>
        </h1>

        {/* ─── TAGLINE ─── */}
        <p
          className={`max-w-2xl mx-auto text-white/80
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

      </div>
    </section>
  );
}