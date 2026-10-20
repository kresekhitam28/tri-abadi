// src/components/Hero.jsx
"use client";

import { useEffect, useMemo, useState } from "react";
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
// FLOATING PARTICLES (dimatikan di mobile)
// ─────────────────────────────────────────────
function Particles({ count = 0 }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const seed = (i * 9301 + 49297) % 233280;
        const r = seed / 233280;
        const r2 = (((i + 1) * 4523 + 12345) % 1000) / 1000;
        return {
          top: `${10 + r * 75}%`,
          left: `${5 + r2 * 90}%`,
          size: 2 + (i % 3),
          delay: (i % 5) * 0.7,
          duration: 7 + (i % 4),
        };
      }),
    [count]
  );

  if (count === 0) return null;

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-[#faf208]/45 float-anim"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            animation: `float ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

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

  // Prefetch next image (desktop only)
  useEffect(() => {
    if (isMobile || typeof window === "undefined") return;
    const next = (active + 1) % photos.length;
    const img = new Image();
    img.src = photos[next].src;
  }, [active, isMobile]);

  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translate3d(0, 0, 0);     opacity: 0.35; }
          50%      { transform: translate3d(12px, -22px, 0); opacity: 0.85; }
        }
        @keyframes kenburns {
          0%   { transform: scale(1)    translate3d(0, 0, 0)     rotate(0deg); }
          100% { transform: scale(1.09) translate3d(-1.2%, -1%, 0) rotate(-0.5deg); }
        }
        @keyframes linePulse {
          0%, 100% { opacity: 0.5; transform: scaleX(1); }
          50%      { opacity: 1;   transform: scaleX(1.15); }
        }
        .hero-kenburns { animation: kenburns 22s ease-in-out infinite alternate; }
        .hero-line     { animation: linePulse 3s ease-in-out infinite; transform-origin: center; }
        @media (prefers-reduced-motion: reduce) {
          .float-anim, .hero-kenburns, .hero-line { animation: none !important; }
        }
      `}</style>

      <section
        role="region"
        aria-label="Hero"
        className="relative flex items-center justify-center overflow-hidden bg-slate-950
                   min-h-[calc(100svh-76px)] sm:min-h-[calc(100dvh-76px)]"
      >
        {/* ═══ BACKGROUND ═══ */}
        {isMobile ? (
          <img
            src={photos[0].srcSmall}
            alt=""
            aria-hidden="true"
            loading="eager"
            decoding="async"
            fetchPriority="high"
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          photos.map((p, i) => (
            <img
              key={p.src}
              src={p.src}
              alt=""
              aria-hidden="true"
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
              fetchPriority={i === 0 ? "high" : "low"}
              className={`absolute inset-0 w-full h-full object-cover
                          transition-opacity duration-[1400ms] ease-in-out
                          ${i === active ? "opacity-100 hero-kenburns" : "opacity-0"}`}
              style={{ willChange: i === active ? "opacity, transform" : "auto" }}
            />
          ))
        )}

        {/* ═══ OVERLAY GRADIENT ═══ */}
        <div
          className="absolute inset-0
                     bg-gradient-to-b from-slate-950/70 via-slate-950/55 to-slate-950/90"
          aria-hidden="true"
        />
        {/* Vignette */}
        <div
          className="absolute inset-0
                     bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_50%,rgba(2,6,23,0.55)_100%)]"
          aria-hidden="true"
        />
        {/* Grain halus */}
        <div
          className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        <Particles count={isMobile ? 0 : 10} />

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
            <span className="hero-line w-6 sm:w-12 h-px bg-gradient-to-r from-transparent to-[#1e88e5]" />
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
                                ? "opacity-100 translate-y-0 blur-0 scale-100"
                                : "opacity-0 translate-y-2 blur-[2px] scale-95 pointer-events-none"}`}
                >
                  {text}
                </span>
              ))}
            </span>
            <span className="hero-line w-6 sm:w-12 h-px bg-gradient-to-l from-transparent to-[#1e88e5]" />
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
            <span
              className="block font-light tracking-tight"
              style={{ textShadow: "0 2px 30px rgba(0,0,0,0.35)" }}
            >
              PT. TAM
            </span>
            <span
              className="block font-bold tracking-tight mt-1 sm:mt-2
                         bg-gradient-to-r from-white via-[#60a5fa] to-[#1e88e5]
                         bg-clip-text text-transparent"
              style={{ filter: "drop-shadow(0 4px 24px rgba(30,136,229,0.35))" }}
            >
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
              textShadow: "0 1px 20px rgba(0,0,0,0.4)",
            }}
          >
            {data.tagline}
          </p>

        </div>
      </section>
    </>
  );
}