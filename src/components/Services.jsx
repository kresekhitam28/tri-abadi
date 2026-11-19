// src/components/Services.jsx
"use client";

import { useState, useRef, useEffect, lazy, Suspense } from "react";
import Link from "next/link";
import { useLang } from "../context/LanguageContext";
import { asphaltPackagePrices, formatAsphaltPrice } from "../data/asphaltPricing";

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
    title: "Layanan dan Paket Harga",
    description: "Pilih layanan untuk melihat paket harga dan lingkup pekerjaan.",
    startingPrice: `Overlay mulai ${formatAsphaltPrice(asphaltPackagePrices.A)}/m²`,
    details: "Lihat detail",
    open: "Lihat Harga",
    close: "Tutup Harga",
    services: [
      { Icon: IconRoad,    title: "Pengaspalan",          desc: "Pembangunan & perbaikan jalan dengan standar kualitas tinggi.", pricing: "aspal", featured: true },
      { Icon: IconCurb,    title: "Pasang Kanstin",       desc: "Pemasangan kanstin taman, trotoar, DKI, dan S dengan rapi.",   pricing: "kanstin" },
      { Icon: IconMixer,   title: "Cor Beton Ready Mix",  desc: "Pengecoran beton siap pakai untuk berbagai kebutuhan proyek.", pricing: "beton" },
      { Icon: IconGrass,   title: "Pasang Grass Block",   desc: "Pemasangan grass block untuk area parkir & taman.",            pricing: "grassblock" },
      { Icon: IconBlocks,  title: "Pasang Paving Block",  desc: "Pemasangan paving block berbagai motif & ukuran.",             pricing: "paving" },
      { Icon: IconPanel,   title: "Pasang Panel",         desc: "Pemasangan panel beton precast untuk pagar & dinding.",        pricing: "panel" },
      { Icon: IconPancang, title: "Pasang Tiang Pancang", desc: "Pemasangan tiang pancang untuk pondasi bangunan.",             pricing: "tiangpancang" },
    ],
  },
  en: {
    title: "Services and Pricing",
    description: "Choose a service to view package prices and the scope of work.",
    startingPrice: `Overlay from ${formatAsphaltPrice(asphaltPackagePrices.A, "en")}/m²`,
    details: "View details for",
    open: "View Prices",
    close: "Hide Prices",
    services: [
      { Icon: IconRoad,    title: "Asphalt Paving",       desc: "Road construction & repair with high quality standards.",       pricing: "aspal", featured: true },
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

const SERVICE_SLUGS = {
  aspal: "pengaspalan",
  kanstin: "pasang-kanstin",
  beton: "cor-beton-ready-mix",
  grassblock: "pasang-grass-block",
  paving: "pasang-paving-block",
  panel: "pasang-pager-panel",
  tiangpancang: "pasang-tiang-pancang",
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
  const t = content[lang];
  const [openIndex, setOpenIndex] = useState(null);
  const panelRefs = useRef([]);

  useEffect(() => {
    if (openIndex === null) return;
    const panel = panelRefs.current[openIndex];
    if (!panel) return;
    const frame = requestAnimationFrame(() => panel.scrollIntoView({ block: "nearest" }));
    return () => cancelAnimationFrame(frame);
  }, [openIndex]);

  return (
    <section aria-labelledby="services-title" className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto mb-7 max-w-2xl text-center sm:mb-9">
          <h2 id="services-title" className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">{t.title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">{t.description}</p>
        </header>

        <div className="space-y-3">
          {t.services.map(({ Icon, title, desc, pricing, featured }, index) => {
            const open = openIndex === index;
            const panelId = `service-panel-${index}`;

            return (
              <div
                key={pricing}
                ref={(node) => { panelRefs.current[index] = node; }}
                className={`scroll-mt-20 overflow-hidden rounded-xl border bg-white ${open || featured ? "border-blue-300" : "border-slate-200"}`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex((current) => (current === index ? null : index))}
                  aria-expanded={open}
                  aria-controls={panelId}
                  className="group flex w-full cursor-pointer items-start gap-2.5 px-3 py-3.5 text-left transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-600 sm:items-center sm:gap-5 sm:px-5 sm:py-4"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-700 sm:size-11">
                    <Icon className="size-4 sm:size-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-base font-semibold leading-snug text-slate-950">{title}</span>
                    <span className="mt-1 block text-xs leading-relaxed text-slate-600 sm:text-sm">{desc}</span>
                    {featured && <span className="mt-1 block text-sm font-semibold text-blue-700">{t.startingPrice}</span>}
                  </span>
                  <span className={`inline-flex min-h-9 shrink-0 items-center gap-1 rounded-lg border px-2 py-1.5 text-[11px] font-semibold group-hover:border-blue-300 sm:gap-1.5 sm:px-3 sm:text-xs ${open ? "border-blue-300 bg-blue-50 text-blue-900" : "border-blue-200 bg-white text-blue-800"}`}>
                    {open ? t.close : t.open}
                    <IconChevronDown className={`size-3 transition-transform ${open ? "rotate-180" : ""}`} />
                  </span>
                </button>

                <div className="border-t border-slate-100 px-3 sm:px-5">
                  <Link
                    href={`/layanan/infrastruktur/${SERVICE_SLUGS[pricing]}`}
                    className="inline-flex min-h-11 items-center gap-2 rounded text-xs font-semibold text-blue-800 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 sm:text-sm"
                  >
                    <span>{t.details} {title}</span>
                    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-3.5 shrink-0">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-5-5 5 5-5 5" />
                    </svg>
                  </Link>
                </div>

                <div id={panelId} hidden={!open}>
                  {open && (
                    <div className="border-t border-slate-100 bg-slate-50 px-3 py-4 sm:px-6 sm:py-6">
                      <PricingPanel type={pricing} />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
