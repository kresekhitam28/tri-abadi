// src/components/Layanan.jsx
"use client";

import { useState, useEffect, useRef, memo } from "react";
import Link from "next/link";

// ─────────────────────────────────────────────
// HOOK: DETEKSI MOBILE
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
// HOOK SCROLL
// ─────────────────────────────────────────────
function useInView(threshold = 0.1, enabled = true) {
  const ref = useRef(null);
  const [inView, setInView] = useState(!enabled);

  useEffect(() => {
    if (!enabled) {
      setInView(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -60px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, enabled]);

  return [ref, inView];
}

// ─────────────────────────────────────────────
// KOMPONEN: FADE UP
// ─────────────────────────────────────────────
const FadeUp = memo(function FadeUp({ children, delay = 0, className = "" }) {
  const isMobile = useIsMobile();
  const enabled = !isMobile;
  const [ref, inView] = useInView(0.08, enabled);

  return (
    <div
      ref={ref}
      className={`${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
                  ${className}`}
      style={{
        transitionProperty: "opacity, transform",
        transitionDuration: "600ms",
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        transitionDelay: `${delay}ms`,
        contain: "layout paint style",
      }}
    >
      {children}
    </div>
  );
});

// ─────────────────────────────────────────────
// KOMPONEN: SCALE IN
// ─────────────────────────────────────────────
const ScaleIn = memo(function ScaleIn({ children, delay = 0, className = "" }) {
  const isMobile = useIsMobile();
  const enabled = !isMobile;
  const [ref, inView] = useInView(0.08, enabled);

  return (
    <div
      ref={ref}
      className={`${inView ? "opacity-100 scale-100" : "opacity-0 scale-[0.98]"}
                  ${className}`}
      style={{
        transitionProperty: "opacity, transform",
        transitionDuration: "600ms",
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        transitionDelay: `${delay}ms`,
        contain: "layout paint style",
      }}
    >
      {children}
    </div>
  );
});

// ─────────────────────────────────────────────
// IKON
// ─────────────────────────────────────────────
function IconArrowRight({ className = "w-3.5 h-3.5" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14M13 5l7 7-7 7" /></svg>);
}
function IconRoad({ className = "w-5 h-5" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 4v16M20 4v16M12 4v4M12 12v4M12 20v0" /></svg>);
}
function IconBuilding({ className = "w-5 h-5" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="4" y="2" width="16" height="20" rx="1" /><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01" /></svg>);
}
function IconPencil({ className = "w-5 h-5" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z" /></svg>);
}
function IconCurb({ className = "w-5 h-5" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 16h18" /><path d="M5 16l3-8h8l3 8" /><path d="M9 12h6" /></svg>);
}
function IconMixer({ className = "w-5 h-5" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 10l9-3 9 3-9 3-9-3z" /><path d="M3 10v6l9 3 9-3v-6" /><path d="M12 13v6" /></svg>);
}
function IconGrass({ className = "w-5 h-5" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="3" y="12" width="18" height="8" rx="1" /><path d="M7 12V8M12 12V5M17 12V8" /></svg>);
}
function IconPaving({ className = "w-5 h-5" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="3" y="3" width="8" height="8" rx="1" /><rect x="13" y="3" width="8" height="8" rx="1" /><rect x="3" y="13" width="8" height="8" rx="1" /><rect x="13" y="13" width="8" height="8" rx="1" /></svg>);
}
function IconFence({ className = "w-5 h-5" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 4v16M8 4v16M12 4v16M16 4v16M20 4v16M2 9h20M2 15h20" /></svg>);
}
function IconPile({ className = "w-5 h-5" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M6 3v18M12 3v18M18 3v18M3 6h18M3 18h18" /></svg>);
}
function IconBox({ className = "w-5 h-5" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" /></svg>);
}
function IconTruck({ className = "w-5 h-5" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M1 3h15v13H1z" /><path d="M16 8h4l3 3v5h-7z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>);
}

// ─────────────────────────────────────────────
// DATA: LAYANAN UTAMA
// ─────────────────────────────────────────────
const layananUtama = [
  {
    title: "Konstruksi Infrastruktur",
    desc: "Pengerjaan jalan, drainase, dan infrastruktur publik dengan standar kualitas tinggi — didukung alat berat & tenaga ahli.",
    to: "/layanan/infrastruktur/pengaspalan",
    Icon: IconRoad,
    items: [
      { label: "Pengaspalan",          to: "/layanan/infrastruktur/pengaspalan",         Icon: IconRoad },
      { label: "Pasang Kanstin",       to: "/layanan/infrastruktur/pasang-kanstin",      Icon: IconCurb },
      { label: "Cor Beton Ready Mix",  to: "/layanan/infrastruktur/cor-beton-ready-mix", Icon: IconMixer },
      { label: "Pasang Grass Block",   to: "/layanan/infrastruktur/pasang-grass-block",  Icon: IconGrass },
      { label: "Pasang Paving Block",  to: "/layanan/infrastruktur/pasang-paving-block", Icon: IconPaving },
      { label: "Pasang Pager Panel",   to: "/layanan/infrastruktur/pasang-pager-panel",  Icon: IconFence },
      { label: "Pasang Tiang Pancang", to: "/layanan/infrastruktur/pasang-tiang-pancang", Icon: IconPile },
    ],
  },
  {
    title: "Konstruksi Bangunan",
    desc: "Pembangunan gedung, ruko, rumah tinggal, dan bangunan komersial dengan hasil rapi, kokoh, dan tepat waktu.",
    to: "/layanan/bangunan",
    Icon: IconBuilding,
    items: [],
  },
  {
    title: "Jasa Arsitektur",
    desc: "Desain rumah, bangunan komersial, 3D visualisasi, dan gambar kerja (DED) — fungsional, estetis, sesuai budget.",
    to: "/layanan/arsitektur",
    Icon: IconPencil,
    items: [],
  },
];

// ─────────────────────────────────────────────
// DATA: LAYANAN PENDUKUNG
// ─────────────────────────────────────────────
const layananPendukung = [
  {
    title: "Supplier Material",
    desc: "Jual berbagai material konstruksi: abu batu, base course, batu split, pasir, sirtu, tanah urug, dan lainnya.",
    to: "/supplier",
    Icon: IconBox,
    count: "10+ Material",
  },
  {
    title: "Heavy Equipment",
    desc: "Sewa alat berat untuk menunjang proyek: dozer, excavator, roller, asphalt finisher, dump truck, dll.",
    to: "/heavy-equipment",
    Icon: IconTruck,
    count: "9+ Alat Berat",
  },
];

// ─────────────────────────────────────────────
// SUB-KOMPONEN: LAYANAN CARD
// ─────────────────────────────────────────────
const LayananCard = memo(function LayananCard({ layanan }) {
  return (
    <div
      className="group rounded-2xl border border-slate-200 bg-white
                 hover:border-[#1e88e5]/50
                 shadow-sm hover:shadow-lg hover:shadow-[#1e88e5]/5
                 transition-all duration-300 overflow-hidden"
      style={{ contain: "layout paint style" }}
    >
      <Link
        href={layanan.to}
        className="flex items-start gap-3.5 sm:gap-4 p-4 sm:p-5 lg:p-6
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e88e5]
                   focus-visible:ring-offset-2 rounded-2xl"
      >
        <span className="shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-xl
                         bg-[#1e88e5]/10 text-[#1e88e5]
                         group-hover:bg-[#1e88e5] group-hover:text-white
                         flex items-center justify-center
                         transition-all duration-300
                         group-hover:scale-105 group-hover:shadow-md
                         group-hover:shadow-[#1e88e5]/30">
          <layanan.Icon className="w-5 h-5" />
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1.5">
            <h3
              className="font-semibold text-slate-900"
              style={{ fontSize: "clamp(0.9375rem, 2vw, 1rem)" }}
            >
              {layanan.title}
            </h3>
            <IconArrowRight className="w-3.5 h-3.5 text-slate-400
                                       group-hover:text-[#1e88e5]
                                       group-hover:translate-x-1
                                       transition-all duration-300" />
          </div>
          <p
            className="text-slate-500 leading-relaxed"
            style={{ fontSize: "clamp(0.78125rem, 1.5vw, 0.8125rem)" }}
          >
            {layanan.desc}
          </p>
        </div>
      </Link>

      {layanan.items.length > 0 && (
        <div className="px-4 sm:px-5 lg:px-6 pb-4 sm:pb-5 lg:pb-6 pt-0">
          <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100">
            {layanan.items.map((item, i) => (
              <Link
                key={i}
                href={item.to}
                className="inline-flex items-center gap-1.5
                           px-2.5 sm:px-3 py-1.5 rounded-lg
                           bg-slate-50 border border-slate-200
                           text-slate-600
                           hover:bg-[#1e88e5] hover:text-white
                           hover:border-[#1e88e5] hover:-translate-y-0.5
                           hover:shadow-md hover:shadow-[#1e88e5]/20
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e88e5]
                           focus-visible:ring-offset-1
                           transition-all duration-200"
                style={{ fontSize: "clamp(0.71875rem, 1.4vw, 0.75rem)" }}
              >
                <item.Icon className="w-3.5 h-3.5" />
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

// ─────────────────────────────────────────────
// SUB-KOMPONEN: PENDUKUNG CARD
// ─────────────────────────────────────────────
const PendukungCard = memo(function PendukungCard({ item }) {
  return (
    <Link
      href={item.to}
      className="group relative flex items-start gap-3.5 sm:gap-4 p-4 sm:p-5 lg:p-6 h-full
                 rounded-2xl bg-white border border-slate-200
                 hover:border-[#1e88e5]/60
                 shadow-sm hover:shadow-lg hover:shadow-[#1e88e5]/5
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e88e5]
                 focus-visible:ring-offset-2
                 transition-all duration-300 overflow-hidden"
      style={{ contain: "layout paint style" }}
    >
      {/* Gradient subtle saat hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0
                   group-hover:opacity-100 transition-opacity duration-300
                   bg-gradient-to-br from-[#1e88e5]/[0.03] via-transparent to-transparent"
      />

      <div className="relative shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-xl
                      bg-[#1e88e5]/10 text-[#1e88e5]
                      group-hover:bg-[#1e88e5] group-hover:text-white
                      flex items-center justify-center
                      transition-all duration-300
                      group-hover:scale-105 group-hover:shadow-md
                      group-hover:shadow-[#1e88e5]/30">
        <item.Icon className="w-5 h-5" />
      </div>

      <div className="relative min-w-0 flex-1">
        <div className="flex items-center justify-between gap-3 mb-1.5">
          <h3
            className="font-semibold text-slate-900"
            style={{ fontSize: "clamp(0.9375rem, 2vw, 1rem)" }}
          >
            {item.title}
          </h3>
          <span
            className="shrink-0 uppercase tracking-[0.15em] font-bold
                       text-[#1e88e5] px-2 py-1 rounded-md bg-[#1e88e5]/8"
            style={{ fontSize: "clamp(0.5625rem, 1vw, 0.625rem)" }}
          >
            {item.count}
          </span>
        </div>

        <p
          className="text-slate-500 leading-relaxed mb-3"
          style={{ fontSize: "clamp(0.75rem, 1.4vw, 0.78125rem)" }}
        >
          {item.desc}
        </p>

        <span className="inline-flex items-center gap-1.5
                         font-semibold uppercase tracking-[0.15em]
                         text-[#1e88e5]"
              style={{ fontSize: "clamp(0.625rem, 1.2vw, 0.6875rem)" }}>
          Lihat Selengkapnya
          <IconArrowRight className="w-3 h-3
                                     group-hover:translate-x-1
                                     transition-transform duration-300" />
        </span>
      </div>
    </Link>
  );
});

// ─────────────────────────────────────────────
// SUB-KOMPONEN: SECTION HEADER (dipakai 2x)
// ─────────────────────────────────────────────
const SectionHeader = memo(function SectionHeader({ badge, title, subtitle }) {
  return (
    <div className="text-center mb-8 sm:mb-10">
      <div className="inline-flex items-center gap-2.5 sm:gap-3 mb-3">
        <span className="w-6 sm:w-12 h-px bg-gradient-to-r from-transparent to-[#1e88e5]" />
        <span className="text-[10px] sm:text-[11px] uppercase
                         tracking-[0.25em] sm:tracking-[0.3em]
                         text-[#1e88e5] font-semibold">
          {badge}
        </span>
        <span className="w-6 sm:w-12 h-px bg-gradient-to-l from-transparent to-[#1e88e5]" />
      </div>

      <h2
        className="font-light tracking-tight text-slate-900 leading-tight"
        style={{ fontSize: "clamp(1.5rem, 3.5vw, 1.875rem)" }}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className="text-slate-500 mt-3 max-w-xl mx-auto"
          style={{ fontSize: "clamp(0.78125rem, 1.4vw, 0.8125rem)" }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
});

// ─────────────────────────────────────────────
// HALAMAN
// ─────────────────────────────────────────────
export default function Layanan() {
  const isMobile = useIsMobile();

  return (
    <div className="bg-white">

      {/* ═══ HERO SECTION ═══ */}
      <section className="relative pt-28 lg:pt-36 pb-12 lg:pb-16 overflow-hidden
                          bg-gradient-to-b from-slate-50 via-white to-white">
        {!isMobile && (
          <>
            <div className="absolute -right-40 -top-40 w-[600px] h-[600px] rounded-full
                            bg-[#1e88e5]/[0.04] blur-3xl pointer-events-none" />
            <div className="absolute -left-40 -bottom-20 w-[500px] h-[500px] rounded-full
                            bg-[#1e88e5]/[0.03] blur-3xl pointer-events-none" />
            <div className="absolute left-1/2 top-1/3 -translate-x-1/2 w-[400px] h-[400px]
                            rounded-full bg-[#1e88e5]/[0.02] blur-3xl pointer-events-none" />
          </>
        )}

        <div className="relative max-w-4xl mx-auto px-4 sm:px-5 lg:px-8 text-center">
          <FadeUp>
            <div className="inline-flex items-center gap-2.5 sm:gap-3 mb-5">
              <span className="w-6 sm:w-12 h-px bg-gradient-to-r from-transparent to-[#1e88e5]" />
              <span className="text-[10px] sm:text-[11px] uppercase
                               tracking-[0.25em] sm:tracking-[0.3em]
                               text-[#1e88e5] font-semibold">
                Layanan Kami
              </span>
              <span className="w-6 sm:w-12 h-px bg-gradient-to-l from-transparent to-[#1e88e5]" />
            </div>
          </FadeUp>

          <FadeUp delay={100}>
            <h1
              className="font-light tracking-tight text-slate-900 leading-[1.05] mb-5"
              style={{ fontSize: "clamp(2rem, 6vw, 3.75rem)" }}
            >
              Solusi <span className="font-semibold">Konstruksi</span>
              <span className="text-[#1e88e5]">.</span>
            </h1>
          </FadeUp>

          <FadeUp delay={150}>
            <p
              className="text-slate-600 leading-relaxed max-w-2xl mx-auto"
              style={{ fontSize: "clamp(0.875rem, 1.6vw, 1rem)" }}
            >
              Dari pengerjaan jalan hingga pembangunan gedung — kami siap
              menangani setiap tahap proyek Anda dengan tenaga ahli, alat
              berat lengkap, dan material berkualitas.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ═══ LAYANAN UTAMA ═══ */}
      <section className="pb-16 lg:pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-5 lg:px-8">

          <FadeUp>
            <SectionHeader
              badge="Bidang Utama"
              title={<>Tiga Pilar <span className="font-semibold">Layanan Kami</span></>}
            />
          </FadeUp>

          <div className="space-y-3.5 sm:space-y-4">
            {layananUtama.map((layanan, idx) => (
              <FadeUp key={idx} delay={idx * 80}>
                <LayananCard layanan={layanan} />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ LAYANAN PENDUKUNG ═══ */}
      <section className="bg-slate-50/70 border-y border-slate-200/70">
        <div className="max-w-5xl md:max-w-6xl mx-auto px-4 sm:px-5 lg:px-8 py-14 sm:py-16 lg:py-20">

          <FadeUp>
            <SectionHeader
              badge="Layanan Pendukung"
              title={<>Material & <span className="font-semibold">Alat Berat</span></>}
              subtitle="Menunjang kelancaran proyek Anda dari sisi material hingga kebutuhan alat berat di lapangan."
            />
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-5">
            {layananPendukung.map((item, i) => (
              <FadeUp key={i} delay={i * 80}>
                <PendukungCard item={item} />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="pb-16 lg:pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-5 lg:px-8">
          <ScaleIn delay={80}>
            <div className="mt-14 sm:mt-16 p-6 sm:p-8 lg:p-9 rounded-3xl bg-slate-900
                            text-center relative overflow-hidden
                            ring-1 ring-white/10">
              {!isMobile && (
                <>
                  <div className="absolute -right-24 -top-24 w-56 h-56 rounded-full
                                  bg-[#1e88e5]/25 blur-3xl pointer-events-none" />
                  <div className="absolute -left-24 -bottom-24 w-56 h-56 rounded-full
                                  bg-[#1e88e5]/15 blur-3xl pointer-events-none" />
                </>
              )}

              <div className="relative">
                <p className="text-[#4da3ff] text-[10px] uppercase tracking-[0.3em]
                              font-semibold mb-3">
                  Konsultasi Gratis
                </p>
                <h3
                  className="text-white font-light tracking-tight mb-5"
                  style={{ fontSize: "clamp(1.125rem, 2.8vw, 1.5rem)" }}
                >
                  Punya proyek yang ingin dikerjakan?{" "}
                  <span className="font-semibold">Kami siap membantu.</span>
                </h3>

                <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
                  <Link
                    href="/kontak"
                    className="group inline-flex items-center justify-center gap-2
                               px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl
                               bg-white text-slate-900
                               font-semibold uppercase tracking-[0.12em] sm:tracking-[0.15em]
                               hover:bg-[#1e88e5] hover:text-white
                               hover:-translate-y-0.5
                               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white
                               focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900
                               transition-all duration-300
                               shadow-lg shadow-black/20"
                    style={{ fontSize: "clamp(0.6875rem, 1.3vw, 0.75rem)" }}
                  >
                    Hubungi Kami
                    <IconArrowRight className="w-3.5 h-3.5
                                               transition-transform duration-300
                                               group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/proyek"
                    className="inline-flex items-center justify-center gap-2
                               px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl
                               bg-white/5 text-white border border-white/15
                               font-semibold uppercase tracking-[0.12em] sm:tracking-[0.15em]
                               hover:bg-white/10 hover:border-white/30
                               hover:-translate-y-0.5
                               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white
                               focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900
                               transition-all duration-300"
                    style={{ fontSize: "clamp(0.6875rem, 1.3vw, 0.75rem)" }}
                  >
                    Lihat Proyek
                  </Link>
                </div>
              </div>
            </div>
          </ScaleIn>
        </div>
      </section>

    </div>
  );
}