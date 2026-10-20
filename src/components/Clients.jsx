// src/components/Clients.jsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "../context/LanguageContext";

// ─────────────────────────────────────────────
// DAFTAR KLIEN
// ─────────────────────────────────────────────
const clients = [
  { src: "/klien/totalindo.png",       alt: "Totalindo Building Construction" },
  { src: "/klien/nrc.png",             alt: "Nusa Raya Cipta" },
  { src: "/klien/ks.png",              alt: "Jaya Konstruksi" },
  { src: "/klien/wika.png",            alt: "WIKA" },
  { src: "/klien/pertamina.png",       alt: "Pertamina" },
  { src: "/klien/waskita.png",         alt: "Waskita" },
  { src: "/klien/yasa.png",            alt: "Yasa" },
  { src: "/klien/alfa.png",            alt: "Alfa" },
  { src: "/klien/sumar.png",           alt: "Sumar" },
  { src: "/klien/sinarmas.png",        alt: "Sinarmas" },
  { src: "/klien/marunda-center.png",  alt: "Marunda Center" },
  { src: "/klien/kst.png",             alt: "Krakatau" },
  { src: "/klien/jasa-marga.png",      alt: "Jasa Marga" },
  { src: "/klien/dunkin-donuts.png",   alt: "Dunkin Donuts" },
  { src: "/klien/frisian-flag.png",    alt: "Frisian Flag" },
  { src: "/klien/polsatwa.png",        alt: "Polsatwa" },
  { src: "/klien/mabes-tni.png",       alt: "Mabes TNI" },
];

// ─────────────────────────────────────────────
// KONTEN BILINGUAL
// ─────────────────────────────────────────────
const content = {
  id: {
    kicker: "Mereka Selalu Mempercayai Kami",
    titleBold: "Klien",
    titleAfter: " Kami",
    description:
      "Dipercaya oleh perusahaan konstruksi & BUMN terkemuka di Indonesia.",
  },
  en: {
    kicker: "They Always Trust Us",
    titleLight: "Our ",
    titleBold: "Clients",
    titleAfter: "",
    description:
      "Trusted by leading construction companies & state-owned enterprises in Indonesia.",
  },
};

const SPEED = 80;

// ─────────────────────────────────────────────
// HOOK: deteksi reduced motion
// ─────────────────────────────────────────────
function useDisableMarquee() {
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setDisabled(mqReduce.matches);
    update();
    if (mqReduce.addEventListener) {
      mqReduce.addEventListener("change", update);
      return () => mqReduce.removeEventListener("change", update);
    } else {
      mqReduce.addListener(update);
      return () => mqReduce.removeListener(update);
    }
  }, []);
  return disabled;
}

export default function Clients() {
  const { lang } = useLang();
  const data = content[lang] || content.id;
  const disableMarquee = useDisableMarquee();

  const trackRef = useRef(null);
  const offsetRef = useRef(0);
  const lastTimeRef = useRef(0);
  const halfWidthRef = useRef(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    if (disableMarquee) {
      const track = trackRef.current;
      if (track) track.style.transform = "translateX(0px)";
      return;
    }

    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      halfWidthRef.current = track.scrollWidth / 2;
    };

    measure();
    const t1 = setTimeout(measure, 100);
    const t2 = setTimeout(measure, 500);

    const ro = new ResizeObserver(measure);
    ro.observe(track);

    const onVisibility = () => {
      pausedRef.current = document.visibilityState === "hidden";
      lastTimeRef.current = 0;
    };
    document.addEventListener("visibilitychange", onVisibility);

    let rafId;

    const animate = (time) => {
      if (pausedRef.current) {
        rafId = requestAnimationFrame(animate);
        return;
      }

      if (!lastTimeRef.current) lastTimeRef.current = time;
      const delta = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      const safeDelta = Math.min(delta, 0.1);

      offsetRef.current += SPEED * safeDelta;

      const halfWidth = halfWidthRef.current;
      if (halfWidth > 0 && offsetRef.current >= halfWidth) {
        offsetRef.current -= halfWidth;
      }

      track.style.transform = `translate3d(${-halfWidth + offsetRef.current}px, 0, 0)`;
      rafId = requestAnimationFrame(animate);
    };

    track.style.transform = "translate3d(0, 0, 0)";
    offsetRef.current = 0;
    lastTimeRef.current = 0;
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [disableMarquee]);

  return (
    <section
      className="relative bg-white pt-10 sm:pt-12 lg:pt-14 pb-16 sm:pb-20 lg:pb-24 overflow-hidden"
      style={{ contain: "layout style" }}
    >
      {/* Background decoration */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #1e88e5 1px, transparent 0)",
          backgroundSize: "32px 32px",
          maskImage:
            "radial-gradient(ellipse 70% 50% at 50% 30%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 50% at 50% 30%, black 30%, transparent 100%)",
        }}
      />
      <div className="absolute top-10 -right-40 w-[500px] h-[500px] rounded-full
                      bg-[#1e88e5]/[0.04] blur-3xl pointer-events-none"
           aria-hidden="true" />
      <div className="absolute bottom-0 -left-40 w-[400px] h-[400px] rounded-full
                      bg-[#1e88e5]/[0.03] blur-3xl pointer-events-none"
           aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
        {/* ── HEADER ── */}
        <div className="text-center mb-10 sm:mb-14 lg:mb-20">
          <div className="inline-flex items-center gap-2.5 sm:gap-3 mb-4 sm:mb-5">
            <span className="w-6 sm:w-12 h-px bg-gradient-to-r from-transparent to-[#1e88e5]" />
            <span className="text-[10px] sm:text-xs uppercase
                             tracking-[0.25em] sm:tracking-[0.3em]
                             text-[#1e88e5] font-semibold">
              {data.kicker}
            </span>
            <span className="w-6 sm:w-12 h-px bg-gradient-to-l from-transparent to-[#1e88e5]" />
          </div>

          <h2
            className="font-light tracking-tight text-slate-900 leading-[1.05]"
            style={{ fontSize: "clamp(2rem, 6vw, 3.75rem)" }}
          >
            {data.titleLight}
            <span
              className="font-semibold
                         bg-gradient-to-r from-slate-900 to-[#1e88e5]
                         bg-clip-text text-transparent"
            >
              {data.titleBold}
            </span>
            {data.titleAfter}
            <span className="text-[#1e88e5]">.</span>
          </h2>

          <p
            className="max-w-2xl mx-auto text-slate-600 leading-relaxed mt-5 sm:mt-6"
            style={{ fontSize: "clamp(0.875rem, 1.6vw, 1rem)" }}
          >
            {data.description}
          </p>
        </div>
      </div>

      {/* ═══ GRID STATIC — reduced-motion ═══ */}
      {disableMarquee && (
        <div className="relative max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4">
            {clients.map((item, i) => (
              <div
                key={i}
                className="group flex items-center justify-center
                           bg-white border border-slate-200
                           hover:border-[#1e88e5]/60
                           rounded-xl aspect-[4/3] p-3 sm:p-4
                           shadow-sm hover:shadow-md hover:shadow-[#1e88e5]/5
                           transition-all duration-300"
                style={{ contain: "layout paint style" }}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  className="max-w-full max-h-full object-contain
                             opacity-80 group-hover:opacity-100
                             transition-opacity duration-300"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═══ MARQUEE ═══ */}
      {!disableMarquee && (
        <div className="relative w-full">
          {/* Fade edge kiri */}
          <div
            className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 lg:w-40 z-10
                       bg-gradient-to-r from-white via-white/90 to-transparent
                       pointer-events-none"
            aria-hidden="true"
          />
          {/* Fade edge kanan */}
          <div
            className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 lg:w-40 z-10
                       bg-gradient-to-l from-white via-white/90 to-transparent
                       pointer-events-none"
            aria-hidden="true"
          />

          <div className="overflow-hidden">
            <div
              ref={trackRef}
              className="flex gap-4 sm:gap-6 lg:gap-8 py-1"
              style={{ willChange: "transform" }}
            >
              {[...clients, ...clients].map((item, i) => (
                <div
                  key={i}
                  className="group shrink-0
                             w-[140px] sm:w-[180px] lg:w-[220px]
                             aspect-[4/3] flex items-center justify-center
                             bg-white border border-slate-200
                             hover:border-[#1e88e5]/60
                             rounded-xl
                             p-5 sm:p-6
                             shadow-sm hover:shadow-lg hover:shadow-[#1e88e5]/10
                             transition-all duration-300"
                  style={{ contain: "layout paint style" }}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                    className="max-w-full max-h-full object-contain
                               opacity-85 group-hover:opacity-100
                               group-hover:scale-105
                               transition-all duration-300"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}