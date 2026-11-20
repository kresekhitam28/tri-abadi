// src/components/Layanan.jsx
"use client";

import { memo } from "react";
import Link from "next/link";
import { useLang } from "../context/LanguageContext";
import { useIsMobile } from "../hooks/useIsMobile";
import { useReveal } from "../hooks/useReveal";

// ─────────────────────────────────────────────
// KOMPONEN: FADE UP (Animasi Ringan)
// ─────────────────────────────────────────────
const FadeUp = memo(function FadeUp({ children, delay = 0, className = "" }) {
  const isMobile = useIsMobile();
  const enabled = !isMobile;
  const [ref, inView] = useReveal({ threshold: 0.08, enabled });

  return (
    <div
      ref={ref}
      className={`${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} ${className}`}
      style={{
        transitionProperty: "opacity, transform",
        transitionDuration: "600ms",
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        transitionDelay: `${delay}ms`,
        // ✅ FIX: Hapus contain, tambah willChange untuk animasi ringan 60fps
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
});

// ─────────────────────────────────────────────
// IKON
// ─────────────────────────────────────────────
function IconArrowRight({ className = "w-4 h-4" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14M13 5l7 7-7 7" /></svg>);
}
function IconRoad({ className = "w-5 h-5" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 4v16M20 4v16M12 4v4M12 12v4M12 20v0" /></svg>);
}
function IconBuilding({ className = "w-5 h-5" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="4" y="2" width="16" height="20" rx="1" /><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01" /></svg>);
}
function IconPencil({ className = "w-5 h-5" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z" /></svg>);
}
function IconCurb({ className = "w-5 h-5" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 16h18" /><path d="M5 16l3-8h8l3 8" /><path d="M9 12h6" /></svg>);
}
function IconMixer({ className = "w-5 h-5" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 10l9-3 9 3-9 3-9-3z" /><path d="M3 10v6l9 3 9-3v-6" /><path d="M12 13v6" /></svg>);
}
function IconGrass({ className = "w-5 h-5" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="3" y="12" width="18" height="8" rx="1" /><path d="M7 12V8M12 12V5M17 12V8" /></svg>);
}
function IconPaving({ className = "w-5 h-5" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="3" y="3" width="8" height="8" rx="1" /><rect x="13" y="3" width="8" height="8" rx="1" /><rect x="3" y="13" width="8" height="8" rx="1" /><rect x="13" y="13" width="8" height="8" rx="1" /></svg>);
}
function IconFence({ className = "w-5 h-5" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 4v16M8 4v16M12 4v16M16 4v16M20 4v16M2 9h20M2 15h20" /></svg>);
}
function IconPile({ className = "w-5 h-5" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M6 3v18M12 3v18M18 3v18M3 6h18M3 18h18" /></svg>);
}
function IconBox({ className = "w-5 h-5" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" /></svg>);
}
function IconTruck({ className = "w-5 h-5" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M1 3h15v13H1z" /><path d="M16 8h4l3 3v5h-7z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>);
}

// ─────────────────────────────────────────────
// DATA: LAYANAN UTAMA
// ─────────────────────────────────────────────
const layananUtama = [
  {
    title: "Konstruksi Infrastruktur",
    titleEn: "Infrastructure Construction",
    desc: "Pengerjaan jalan, drainase, dan infrastruktur publik dengan standar kualitas tinggi — didukung alat berat & tenaga ahli.",
    descEn: "Roadwork, drainage, and public infrastructure construction supported by skilled crews and heavy equipment.",
    to: "/layanan/infrastruktur/pengaspalan",
    Icon: IconRoad,
    items: [
      { label: "Pengaspalan Hotmix", labelEn: "Hotmix Asphalt Paving", to: "/layanan/infrastruktur/pengaspalan", Icon: IconRoad, primary: true },
      { label: "Pasang Kanstin", labelEn: "Curb Installation", to: "/layanan/infrastruktur/pasang-kanstin", Icon: IconCurb },
      { label: "Pengecoran Beton Ready Mix", labelEn: "Ready-Mix Concrete Pouring", to: "/layanan/infrastruktur/cor-beton-ready-mix", Icon: IconMixer, primary: true },
      { label: "Pasang Grass Block", labelEn: "Grass Block Installation", to: "/layanan/infrastruktur/pasang-grass-block", Icon: IconGrass },
      { label: "Pemasangan Paving Block", labelEn: "Paving Block Installation", to: "/layanan/infrastruktur/pasang-paving-block", Icon: IconPaving, primary: true },
      { label: "Pasang Pager Panel", labelEn: "Panel Fence Installation", to: "/layanan/infrastruktur/pasang-pager-panel", Icon: IconFence },
      { label: "Pasang Tiang Pancang", labelEn: "Pile Installation", to: "/layanan/infrastruktur/pasang-tiang-pancang", Icon: IconPile },
    ],
  },
  {
    title: "Konstruksi Bangunan",
    titleEn: "Building Construction",
    desc: "Pembangunan gedung, ruko, rumah tinggal, dan bangunan komersial dengan hasil rapi, kokoh, dan tepat waktu.",
    descEn: "Construction of buildings, shophouses, homes, and commercial properties, with a focus on quality and timely delivery.",
    to: "/layanan/bangunan",
    Icon: IconBuilding,
    items: [],
  },
  {
    title: "Jasa Arsitektur",
    titleEn: "Architectural Services",
    desc: "Desain rumah, bangunan komersial, 3D visualisasi, dan gambar kerja (DED) — fungsional, estetis, sesuai budget.",
    descEn: "Residential and commercial design, 3D visualization, and detailed engineering drawings tailored to your needs and budget.",
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
    titleEn: "Material Supply",
    desc: "Jual berbagai material konstruksi: abu batu, base course, batu split, pasir, sirtu, tanah urug, dan lainnya.",
    descEn: "Construction materials including stone dust, base course, crushed stone, sand, sand-gravel mix, and fill soil.",
    to: "/supplier",
    Icon: IconBox,
    count: "10+ Material",
    countEn: "10+ Materials",
  },
  {
    title: "Heavy Equipment",
    desc: "Sewa alat berat untuk menunjang proyek: dozer, excavator, roller, asphalt finisher, dump truck, dll.",
    descEn: "Heavy equipment rental including dozers, excavators, rollers, asphalt pavers, and dump trucks.",
    to: "/alat-berat",
    Icon: IconTruck,
    count: "9+ Alat Berat",
    countEn: "9+ Equipment Types",
  },
];

// ─────────────────────────────────────────────
// SUB-KOMPONEN: LAYANAN CARD
// ─────────────────────────────────────────────
const LayananCard = memo(function LayananCard({ layanan, english }) {
  return (
    <div className="group relative rounded-3xl bg-white ring-1 ring-slate-200 shadow-sm hover:ring-2 hover:ring-[#1e88e5]/40 hover:shadow-xl hover:shadow-[#1e88e5]/5 hover:-translate-y-1 transition-all duration-300 ease-out overflow-hidden">
      {/* Efek Gradient saat Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-blue-50/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <Link
        href={layanan.to}
        className="relative z-10 flex items-start gap-4 p-5 sm:p-6 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#1e88e5]"
      >
        <span className="shrink-0 w-12 h-12 rounded-xl bg-[#1e88e5]/10 text-[#1e88e5] flex items-center justify-center group-hover:bg-[#1e88e5] group-hover:text-white group-hover:scale-110 group-hover:shadow-md group-hover:shadow-[#1e88e5]/30 transition-all duration-300">
          <layanan.Icon className="w-6 h-6" />
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-bold text-slate-900 group-hover:text-[#1e88e5] transition-colors duration-300 text-base sm:text-lg">
              {english ? layanan.titleEn : layanan.title}
            </h3>
            <IconArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 group-hover:text-[#1e88e5] transition-all duration-300" />
          </div>
          <p className="text-slate-500 leading-relaxed text-sm sm:text-base">
            {english ? layanan.descEn : layanan.desc}
          </p>
        </div>
      </Link>

      {layanan.items.length > 0 && (
        <div className="relative z-10 px-5 sm:px-6 pb-5 sm:pb-6 pt-0">
          <div className="flex flex-wrap gap-2 border-t border-slate-100 pt-4">
            {layanan.items.map((item, i) => (
              <Link
                key={i}
                href={item.to}
                className={`inline-flex min-h-9 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e88e5] ${
                  item.primary 
                    ? "border-[#1e88e5]/20 bg-[#1e88e5]/10 font-semibold text-[#1e88e5] hover:bg-[#1e88e5] hover:text-white hover:border-[#1e88e5] shadow-sm hover:shadow-md hover:shadow-[#1e88e5]/30" 
                    : "border-slate-200 bg-slate-50 font-medium text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                }`}
              >
                <span aria-hidden="true" className="size-3.5 shrink-0">
                  <item.Icon className="size-full" />
                </span>
                {english ? item.labelEn : item.label}
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
const PendukungCard = memo(function PendukungCard({ item, english }) {
  return (
    <Link
      href={item.to}
      className="group relative flex items-start gap-4 p-5 sm:p-6 h-full rounded-3xl bg-white ring-1 ring-slate-200 shadow-sm hover:ring-2 hover:ring-[#1e88e5]/40 hover:shadow-xl hover:shadow-[#1e88e5]/5 hover:-translate-y-1 transition-all duration-300 ease-out overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-bl from-transparent to-blue-50/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div className="relative z-10 shrink-0 w-12 h-12 rounded-xl bg-[#1e88e5]/10 text-[#1e88e5] flex items-center justify-center group-hover:bg-[#1e88e5] group-hover:text-white group-hover:scale-110 group-hover:shadow-md group-hover:shadow-[#1e88e5]/30 transition-all duration-300">
        <item.Icon className="w-6 h-6" />
      </div>

      <div className="relative z-10 min-w-0 flex-1">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <h3 className="font-bold text-slate-900 group-hover:text-[#1e88e5] transition-colors duration-300 text-base sm:text-lg">
            {english ? item.titleEn ?? item.title : item.title}
          </h3>
          <span className="shrink-0 uppercase tracking-wider font-bold text-[#1e88e5] px-2.5 py-1 rounded-full bg-blue-50 ring-1 ring-blue-100 group-hover:bg-[#1e88e5] group-hover:text-white group-hover:ring-[#1e88e5] transition-colors duration-300 text-[10px]">
            {english ? item.countEn : item.count}
          </span>
        </div>

        <p className="text-slate-500 leading-relaxed mb-4 text-sm sm:text-base">
          {english ? item.descEn : item.desc}
        </p>

        <span className="inline-flex items-center gap-1.5 font-bold uppercase tracking-wider text-[#1e88e5] group-hover:gap-2.5 transition-all duration-300 text-[11px]">
          {english ? "Learn More" : "Lihat Selengkapnya"}
          <IconArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </Link>
  );
});

// ─────────────────────────────────────────────
// SUB-KOMPONEN: SECTION HEADER
// ─────────────────────────────────────────────
const SectionHeader = memo(function SectionHeader({ badge, title, subtitle }) {
  return (
    <div className="text-center mb-10 sm:mb-12">
      <div className="inline-flex items-center gap-3 mb-4">
        <span className="w-8 sm:w-10 h-px bg-[#1e88e5]" />
        <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#1e88e5] font-bold">
          {badge}
        </span>
        <span className="w-8 sm:w-10 h-px bg-[#1e88e5]" />
      </div>

      <h2 className="font-light tracking-tight text-slate-900 leading-tight text-balance max-w-2xl mx-auto" style={{ fontSize: "clamp(1.5rem, 3.5vw, 2rem)" }}>
        {title}
      </h2>

      {subtitle && (
        <p className="text-slate-500 mt-3 max-w-xl mx-auto leading-[1.8] text-sm sm:text-base">
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
  const { lang } = useLang();
  const english = lang === "en";
  
  return (
    <div className="bg-white overflow-hidden">

      {/* ═══ HERO SECTION ═══ */}
      <section className="relative pt-28 lg:pt-36 pb-16 lg:pb-20 bg-gradient-to-b from-slate-50 to-white">
        {/* Ornamen background */}
        <div aria-hidden="true" className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#1e88e5] rounded-full blur-3xl opacity-[0.04]" />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-5 lg:px-8 text-center">
          <FadeUp>
            <div className="inline-flex items-center gap-2.5 sm:gap-3 mb-5">
              <span className="w-6 sm:w-10 h-px bg-[#1e88e5]" />
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#1e88e5] font-bold">
                {english ? "Our Services" : "Layanan Kami"}
              </span>
              <span className="w-6 sm:w-10 h-px bg-[#1e88e5]" />
            </div>
          </FadeUp>

          <FadeUp delay={100}>
            <h1 className="font-light tracking-tight text-slate-900 leading-[1.05] mb-5 text-balance" style={{ fontSize: "clamp(2rem, 6vw, 3.75rem)" }}>
              {english ? "Construction &" : "Layanan Konstruksi &"}{" "}
              <span className="font-semibold">{english ? "Infrastructure Services" : "Infrastruktur"}</span>
              <span className="text-[#1e88e5]">.</span>
            </h1>
          </FadeUp>

          <FadeUp delay={150}>
            <p className="text-slate-600 leading-[1.8] max-w-2xl mx-auto" style={{ fontSize: "clamp(0.875rem, 1.6vw, 1rem)" }}>
              {english ? "From roadwork to building construction, we support each stage of your project with skilled crews, heavy equipment, and quality materials." : "Dari pengerjaan jalan hingga pembangunan gedung — kami siap menangani setiap tahap proyek Anda dengan tenaga ahli, alat berat lengkap, dan material berkualitas."}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ═══ LAYANAN UTAMA ═══ */}
      <section className="pb-16 lg:pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-5 lg:px-8">
          <FadeUp>
            <SectionHeader
              badge={english ? "Core Services" : "Bidang Utama"}
              title={<>{english ? "Our Three" : "Tiga Pilar"}{" "}<span className="font-semibold">{english ? "Service Areas" : "Layanan Kami"}</span></>}
            />
          </FadeUp>
          <ul className="mb-6 grid gap-3 sm:grid-cols-3">
            {layananUtama[0].items.filter(({ primary }) => primary).map(({ to, label, labelEn }) => (
              <li key={to}>
                <Link href={to} className="flex min-h-12 items-center rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-900 hover:underline focus-visible:outline-2">
                  {english ? labelEn : label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="space-y-4 sm:space-y-5">
            {layananUtama.map((layanan, idx) => (
              <FadeUp key={idx} delay={idx * 80}>
                <LayananCard layanan={layanan} english={english} />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ LAYANAN PENDUKUNG ═══ */}
      <section className="relative bg-slate-50 border-y border-slate-200">
        <div className="max-w-5xl md:max-w-6xl mx-auto px-4 sm:px-5 lg:px-8 py-16 lg:py-24">
          <FadeUp>
            <SectionHeader
              badge={english ? "Supporting Services" : "Layanan Pendukung"}
              title={<>{english ? "Materials &" : "Material &"}{" "}<span className="font-semibold">{english ? "Heavy Equipment" : "Alat Berat"}</span></>}
              subtitle={english ? "Support for your project, from material supply to on-site equipment needs." : "Menunjang kelancaran proyek Anda dari sisi material hingga kebutuhan alat berat di lapangan."}
            />
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {layananPendukung.map((item, i) => (
              <FadeUp key={i} delay={i * 80}>
                <PendukungCard item={item} english={english} />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA PREMIUM ═══ */}
      <section className="pb-16 lg:pb-20 pt-10 sm:pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-5 lg:px-8">
          <FadeUp delay={80}>
            <div className="relative mt-4 rounded-3xl overflow-hidden bg-slate-900 p-8 sm:p-14 text-center shadow-2xl shadow-slate-900/40">
              {/* Efek Pendaran */}
              <div aria-hidden="true" className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-[#1e88e5] rounded-full blur-3xl opacity-30 pointer-events-none" />
              <div aria-hidden="true" className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-emerald-500 rounded-full blur-3xl opacity-20 pointer-events-none" />

              <div className="relative z-10">
                <p className="text-[#4da3ff] text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-bold mb-3">
                  {english ? "Free Consultation" : "Konsultasi Gratis"}
                </p>
                <h3 className="text-white font-light tracking-tight mb-8 text-balance" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>
                  {english ? "Have a project in mind?" : "Punya proyek yang ingin dikerjakan?"}{" "}
                  <span className="font-bold">{english ? "We can help." : "Kami siap membantu."}</span>
                </h3>

                <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                  <Link
                    href="/kontak"
                    className="inline-flex items-center justify-center gap-2 min-h-12 px-7 sm:px-9 py-3.5 rounded-xl bg-[#1e88e5] text-white hover:bg-blue-600 hover:scale-[1.02] font-bold uppercase tracking-[0.15em] shadow-lg shadow-[#1e88e5]/40 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    style={{ fontSize: "clamp(0.6875rem, 1.3vw, 0.75rem)" }}
                  >
                    {english ? "Contact Us" : "Hubungi Kami"}
                    <IconArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/proyek"
                    className="inline-flex items-center justify-center gap-2 min-h-12 px-7 sm:px-9 py-3.5 rounded-xl bg-white/10 text-white border border-white/20 backdrop-blur-md hover:bg-white/20 hover:scale-[1.02] font-bold uppercase tracking-[0.15em] transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    style={{ fontSize: "clamp(0.6875rem, 1.3vw, 0.75rem)" }}
                  >
                    {english ? "View Projects" : "Lihat Proyek"}
                  </Link>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

    </div>
  );
}
