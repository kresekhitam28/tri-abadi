// src/components/Services.jsx
"use client";

import { useState, useRef, useEffect, lazy, Suspense, useMemo, useCallback } from "react";
import { useLang } from "../context/LanguageContext";
import { useIsMobile } from "../hooks/useIsMobile";

// ─────────────────────────────────────────────
// LAZY-LOAD PANEL PRICING
// ─────────────────────────────────────────────
const ServicePricingPanel      = lazy(() => import("./ServicePricingPanel"));
const KanstinPricingPanel      = lazy(() => import("./KanstinPricingPanel"));
const BetonPricingPanel        = lazy(() => import("./BetonPricingPanel"));
const PavingPricingPanel       = lazy(() => import("./PavingPricingPanel"));
const GrassBlockPricingPanel   = lazy(() => import("./GrassBlockPricingPanel"));
const PanelPricingPanel        = lazy(() => import("./PanelPricingPanel"));
const TiangPancangPricingPanel = lazy(() => import("./TiangPancangPricingPanel"));

// ─────────────────────────────────────────────
// IKON
// ─────────────────────────────────────────────
const iconProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

function IconRoad({ className = "w-6 h-6" }) {
  return (
    <svg viewBox="0 0 24 24" {...iconProps} className={className} aria-hidden="true">
      <path d="M4 20L8 4" /><path d="M20 20l-4-16" />
      <path d="M12 4v3M12 11v3M12 18v3" />
    </svg>
  );
}
function IconCurb({ className = "w-6 h-6" }) {
  return (
    <svg viewBox="0 0 24 24" {...iconProps} className={className} aria-hidden="true">
      <path d="M3 16h18" /><path d="M5 16l3-8h8l3 8" /><path d="M9 12h6" />
    </svg>
  );
}
function IconMixer({ className = "w-6 h-6" }) {
  return (
    <svg viewBox="0 0 24 24" {...iconProps} className={className} aria-hidden="true">
      <path d="M3 10l9-3 9 3-9 3-9-3z" />
      <path d="M3 10v6l9 3 9-3v-6" /><path d="M12 13v6" />
    </svg>
  );
}
function IconGrass({ className = "w-6 h-6" }) {
  return (
    <svg viewBox="0 0 24 24" {...iconProps} className={className} aria-hidden="true">
      <rect x="3" y="12" width="18" height="8" rx="1" />
      <path d="M7 12V8M12 12V5M17 12V8" /><path d="M5 20v2M19 20v2" />
    </svg>
  );
}
function IconBlocks({ className = "w-6 h-6" }) {
  return (
    <svg viewBox="0 0 24 24" {...iconProps} className={className} aria-hidden="true">
      <rect x="3" y="3" width="8" height="8" rx="1" />
      <rect x="13" y="3" width="8" height="8" rx="1" />
      <rect x="3" y="13" width="8" height="8" rx="1" />
      <rect x="13" y="13" width="8" height="8" rx="1" />
    </svg>
  );
}
function IconPanel({ className = "w-6 h-6" }) {
  return (
    <svg viewBox="0 0 24 24" {...iconProps} className={className} aria-hidden="true">
      <rect x="3" y="6" width="5" height="12" />
      <rect x="9.5" y="6" width="5" height="12" />
      <rect x="16" y="6" width="5" height="12" />
    </svg>
  );
}
function IconPancang({ className = "w-6 h-6" }) {
  return (
    <svg viewBox="0 0 24 24" {...iconProps} className={className} aria-hidden="true">
      <path d="M12 2v20" /><path d="M8 6l4-4 4 4" />
      <path d="M5 12h14" /><path d="M7 18h10" />
    </svg>
  );
}
function IconChevronDown({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

// ─────────────────────────────────────────────
// KONTEN BILINGUAL
// ─────────────────────────────────────────────
const content = {
  id: {
    kicker: "Yang Bisa Kami Kerjakan",
    description:
      "Kami menyediakan solusi konstruksi menyeluruh — dari perencanaan hingga eksekusi, dengan standar kualitas dan profesionalisme tinggi.",
    services: [
      { Icon: IconRoad,    title: "Pengaspalan",          desc: "Pembangunan & perbaikan jalan dengan standar kualitas tinggi.", pricing: "aspal" },
      { Icon: IconCurb,    title: "Pasang Kanstin",       desc: "Pemasangan kanstin taman, trotoar, DKI, dan S dengan rapi.",   pricing: "kanstin" },
      { Icon: IconMixer,   title: "Cor Beton Ready Mix",  desc: "Pengecoran beton siap pakai untuk berbagai kebutuhan proyek.", pricing: "beton" },
      { Icon: IconGrass,   title: "Pasang Grass Block",   desc: "Pemasangan grass block untuk area parkir & taman.",            pricing: "grassblock" },
      { Icon: IconBlocks,  title: "Pasang Paving Block",  desc: "Pemasangan paving block berbagai motif & ukuran.",             pricing: "paving" },
      { Icon: IconPanel,   title: "Pasang Panel",         desc: "Pemasangan panel beton precast untuk pagar & dinding.",        pricing: "panel" },
      { Icon: IconPancang, title: "Pasang Tiang Pancang", desc: "Pemasangan tiang pancang untuk pondasi bangunan.",             pricing: "tiangpancang" },
    ],
  },
  en: {
    kicker: "What We Can Do",
    description:
      "We provide end-to-end construction solutions — from planning to execution, with high standards of quality and professionalism.",
    services: [
      { Icon: IconRoad,    title: "Asphalt Paving",       desc: "Road construction & repair with high quality standards.",       pricing: "aspal" },
      { Icon: IconCurb,    title: "Curb Installation",    desc: "Neat installation of curbs for gardens, sidewalks, DKI, and S.", pricing: "kanstin" },
      { Icon: IconMixer,   title: "Ready-Mix Concrete",   desc: "Ready-to-use concrete casting for various project needs.",      pricing: "beton" },
      { Icon: IconGrass,   title: "Grass Block",          desc: "Grass block installation for parking areas & gardens.",         pricing: "grassblock" },
      { Icon: IconBlocks,  title: "Paving Block",         desc: "Paving block installation in various patterns & sizes.",        pricing: "paving" },
      { Icon: IconPanel,   title: "Precast Panel",        desc: "Precast concrete panel installation for fences & walls.",       pricing: "panel" },
      { Icon: IconPancang, title: "Pile Driving",         desc: "Pile driving installation for building foundations.",           pricing: "tiangpancang" },
    ],
  },
};

// ─────────────────────────────────────────────
// MAP PANEL (lazy component)
// ─────────────────────────────────────────────
const PANEL_MAP = {
  aspal: ServicePricingPanel,
  kanstin: KanstinPricingPanel,
  beton: BetonPricingPanel,
  paving: PavingPricingPanel,
  grassblock: GrassBlockPricingPanel,
  panel: PanelPricingPanel,
  tiangpancang: TiangPancangPricingPanel,
};

function PanelSkeleton() {
  return (
    <div className="space-y-3 animate-pulse">
      <div className="h-4 w-1/3 bg-slate-200 rounded" />
      <div className="h-3 w-2/3 bg-slate-200 rounded" />
      <div className="h-3 w-1/2 bg-slate-200 rounded" />
    </div>
  );
}

function PricingPanel({ type }) {
  const Panel = PANEL_MAP[type];
  if (!Panel) return null;
  return (
    <Suspense fallback={<PanelSkeleton />}>
      <Panel />
    </Suspense>
  );
}

// ─────────────────────────────────────────────
// SERVICES
// ─────────────────────────────────────────────
export default function Services() {
  const { lang } = useLang();
  const data = content[lang] || content.id;
  const isMobile = useIsMobile();

  const [openIndex, setOpenIndex] = useState(null);
  const panelRefs = useRef([]);

  const toggle = useCallback(
    (i) => setOpenIndex((prev) => (prev === i ? null : i)),
    []
  );

  // Auto-scroll ke panel yang terbuka
  useEffect(() => {
    if (openIndex === null) return;
    const el = panelRefs.current[openIndex];
    if (!el) return;
    requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: "auto", block: "nearest" });
    });
  }, [openIndex]);

  const btnOpen  = lang === "en" ? "Open"  : "Buka";
  const btnClose = lang === "en" ? "Close" : "Tutup";

  const services = useMemo(() => data.services, [data.services]);

  return (
    <section className="relative bg-white pt-14 sm:pt-16 lg:pt-20 pb-14 sm:pb-16 lg:pb-24">
      <div className="relative max-w-5xl mx-auto px-4 sm:px-5 lg:px-8">
        {/* ═══ HEADER ═══ */}
        <div className="text-center mb-10 sm:mb-14 lg:mb-20">
          <div className="inline-flex items-center gap-2.5 sm:gap-3 mb-5 sm:mb-6">
            <span className="w-6 sm:w-10 h-px bg-[#1e88e5]" aria-hidden="true" />
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#1e88e5] font-semibold">
              {data.kicker}
            </span>
            <span className="w-6 sm:w-10 h-px bg-[#1e88e5]" aria-hidden="true" />
          </div>

          <h2
            className="font-light tracking-tight text-slate-900 leading-[1.05] mb-5 sm:mb-6"
            style={{ fontSize: "clamp(2rem, 6vw, 3.75rem)" }}
          >
            {lang === "en" ? (
              <>
                Our <span className="font-semibold">Services</span>
                <span className="text-[#1e88e5]">.</span>
              </>
            ) : (
              <>
                <span className="font-semibold">Layanan</span> Kami
                <span className="text-[#1e88e5]">.</span>
              </>
            )}
          </h2>

          <p
            className="max-w-2xl mx-auto text-slate-600 leading-relaxed"
            style={{ fontSize: "clamp(0.875rem, 1.6vw, 1rem)" }}
          >
            {data.description}
          </p>
        </div>

        {/* ═══ DAFTAR LAYANAN ═══ */}
        <div className="space-y-3 sm:space-y-3.5">
          {services.map(({ Icon, title, desc, pricing }, i) => {
            const isOpen = openIndex === i;
            const isExpandable = Boolean(pricing);

            return (
              <div
                key={title}
                ref={(el) => (panelRefs.current[i] = el)}
                className={`bg-white border rounded-2xl overflow-hidden scroll-mt-20 sm:scroll-mt-24 transition-colors duration-200
                  ${isOpen
                    ? "border-[#1e88e5]"
                    : "border-slate-200 hover:border-[#1e88e5]/50"}`}
              >
                <button
                  type="button"
                  onClick={() => isExpandable && toggle(i)}
                  disabled={!isExpandable}
                  aria-expanded={isOpen}
                  aria-controls={`service-panel-${i}`}
                  className={`w-full flex items-center gap-3 sm:gap-5 px-4 sm:px-6 py-4 sm:py-5 text-left transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1e88e5]
                    ${isExpandable ? "cursor-pointer" : "cursor-default"}`}
                >
                  <span
                    className={`shrink-0 w-11 h-11 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center transition-colors duration-200
                      ${isOpen
                        ? "bg-[#1e88e5] text-white"
                        : "bg-[#1e88e5]/10 text-[#1e88e5]"}`}
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </span>

                  <span className="flex-1 min-w-0">
                    <span
                      className={`block font-semibold leading-snug transition-colors duration-200 text-[15px] sm:text-[16px]
                        ${isOpen ? "text-[#1e88e5]" : "text-slate-900"}`}
                    >
                      {title}
                    </span>
                    <span className="block text-[12px] sm:text-[12px] text-slate-500 leading-relaxed mt-0.5 sm:mt-1 line-clamp-2">
                      {desc}
                    </span>
                  </span>

                  {isExpandable && (
                    <span
                      className={`shrink-0 flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-full border text-[10px] sm:text-[10.5px] font-bold uppercase tracking-[0.12em] sm:tracking-[0.15em] transition-colors duration-200
                        ${isOpen
                          ? "bg-[#1e88e5] text-white border-[#1e88e5]"
                          : "bg-white text-slate-600 border-slate-300"}`}
                    >
                      {isOpen ? btnClose : btnOpen}
                      <IconChevronDown
                        className={`w-3 h-3 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                      />
                    </span>
                  )}
                </button>

                {isExpandable && (
                  <div
                    id={`service-panel-${i}`}
                    className="grid transition-[grid-template-rows,opacity] duration-300 ease-out"
                    style={{
                      gridTemplateRows: isOpen ? "1fr" : "0fr",
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <div className="overflow-hidden">
                      <div className="border-t border-slate-100 bg-slate-50 px-3 sm:px-6 py-4 sm:py-6">
                        {isOpen && <PricingPanel type={pricing} />}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}