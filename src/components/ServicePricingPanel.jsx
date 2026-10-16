// src/components/ServicePricingPanel.jsx
"use client";

import { memo } from "react";
import Link from "next/link";
import { useLang } from "../context/LanguageContext";

// ─── KATEGORI BILINGUAL ─────────────────────
const categories = [
  {
    code: "A",
    accent: "#e11d48",
    price: "Rp 75.000",
    name: { id: "KATEGORI A", en: "CATEGORY A" },
    tag: {
      id: "Overlay / pelapisan ulang hotmix",
      en: "Overlay / hotmix resurfacing",
    },
    unit: { id: "Per Meter²", en: "Per Square Meter" },
    items: [
      { id: "Pembersihan badan jalan", en: "Road surface cleaning" },
      { id: "Di siram cairan emulsi (lem aspal)", en: "Sprayed with emulsion liquid (asphalt glue)" },
      { id: "Gelar aspal hotmix", en: "Lay hotmix asphalt" },
      { id: "Di padatkan dengan mesin wales / BB roller", en: "Compacted with wales / BB roller machine" },
    ],
  },
  {
    code: "B",
    accent: "#16a34a",
    price: "Rp 95.000",
    name: { id: "KATEGORI B", en: "CATEGORY B" },
    tag: {
      id: "Pecingan / tambal sulam batu split / makadam dan hotmix",
      en: "Patching / split stone / macadam and hotmix patching",
    },
    unit: { id: "Per Meter²", en: "Per Square Meter" },
    items: [
      { id: "Pembersihan lokasi pekerjaan", en: "Cleaning the work area" },
      { id: "Gelar batu split / batu makadam pada yang berlubang", en: "Lay split stone / macadam stone on potholes" },
      { id: "Pemadatan dengan mesin giling / Koting aspal", en: "Compaction with roller machine / asphalt coating" },
      { id: "Gelar aspal hotmix", en: "Lay hotmix asphalt" },
      { id: "Pemadatan finising sampai rapi", en: "Finishing compaction until neat" },
    ],
  },
  {
    code: "C",
    accent: "#eab308",
    price: "Rp 100.000",
    name: { id: "KATEGORI C", en: "CATEGORY C" },
    tag: { id: "Pengaspalan penetrasi", en: "Penetration asphalt paving" },
    unit: { id: "Per Meter²", en: "Per Square Meter" },
    items: [
      { id: "Pemadatan tanah dengan mesin giling", en: "Soil compaction with roller machine" },
      { id: "Gelar batu makadam 15 cm", en: "Lay 15 cm macadam stone" },
      { id: "Koting aspal bakar (lem aspal)", en: "Burned asphalt coating (asphalt glue)" },
      { id: "Gelar batu split 3 cm", en: "Lay 3 cm split stone" },
      { id: "Di siram aspal bakar (lem aspal)", en: "Sprayed with burned asphalt (asphalt glue)" },
      { id: "Gelar abu batu", en: "Lay stone dust" },
      { id: "Pemadatan finising pekerjaan", en: "Finishing compaction of work" },
    ],
  },
  {
    code: "D",
    accent: "#f97316",
    price: "Rp 150.000",
    name: { id: "KATEGORI D", en: "CATEGORY D" },
    tag: {
      id: "Tahap dasar bikin baru dari pemadatan tanah / 0%",
      en: "Base stage of making new from soil compaction / 0%",
    },
    unit: { id: "Per Meter²", en: "Per Square Meter" },
    items: [
      { id: "Pengupasan / perataan tanah", en: "Soil stripping / leveling" },
      { id: "Pemadatan tanah dengan mesin giling", en: "Soil compaction with roller machine" },
      { id: "Gelar batu makadam 15 cm", en: "Lay 15 cm macadam stone" },
      { id: "Gelar batu split", en: "Lay split stone" },
      { id: "Di siram aspal emulsi (lem aspal)", en: "Sprayed with emulsion asphalt (asphalt glue)" },
      { id: "Gelar aspal hotmix", en: "Lay hotmix asphalt" },
      { id: "Pemadatan finising pekerjaan", en: "Finishing compaction of work" },
    ],
  },
];

// ─── KONTEN BILINGUAL ────────────────────────
const content = {
  id: {
    headerBadge: "Paket Harga",
    headerTitle: "Berikut kami tawarkan harga paket jasa perbaikan aspal",
    footerNote: "Harga dapat berubah sesuai kondisi lapangan & volume pekerjaan.",
    ctaLabel: "Selengkapnya",
  },
  en: {
    headerBadge: "Price Package",
    headerTitle: "Here we offer price packages for asphalt repair services",
    footerNote: "Prices may change according to field conditions & work volume.",
    ctaLabel: "Learn More",
  },
};

// ─── HELPER: pick bilingual ─────────────────
const pick = (field, lang) => {
  if (!field) return "";
  if (typeof field === "string") return field;
  return field[lang] || field.id || field.en || "";
};

// ─── IKON ────────────────────────────────────
function IconArrowRight({ className = "w-3.5 h-3.5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

// ─────────────────────────────────────────────
// CATEGORY CARD (memoized)
// ─────────────────────────────────────────────
const CategoryCard = memo(function CategoryCard({ c, lang }) {
  return (
    <div
      className="relative p-4 sm:p-5 lg:p-6"
      style={{ contain: "layout paint style" }}
    >
      <span
        className="absolute top-0 left-0 right-0 h-[3px] rounded-b"
        style={{ backgroundColor: c.accent }}
      />

      <div
        className="absolute top-2 sm:top-3 right-3 sm:right-4
                   leading-none opacity-[0.06]
                   select-none pointer-events-none font-black"
        style={{
          color: c.accent,
          fontSize: "clamp(2.5rem, 6vw, 3.25rem)",
        }}
      >
        {c.code}
      </div>

      <div className="relative mb-4 sm:mb-5">
        <div className="flex items-center gap-2 mb-1.5">
          <span
            className="w-2 h-2 rounded-full shrink-0"
            style={{ backgroundColor: c.accent }}
          />
          <span className="text-[10.5px] sm:text-[11px] font-bold tracking-[0.15em] text-slate-700">
            {pick(c.name, lang)}
          </span>
        </div>
        <p className="text-[10.5px] sm:text-[11px] text-slate-500 leading-snug italic">
          {pick(c.tag, lang)}
        </p>
      </div>

      <div className="relative mb-4 sm:mb-5 pb-4 sm:pb-5 border-b border-slate-100">
        <div className="flex items-baseline gap-1.5">
          <span
            className="font-bold text-slate-900 tracking-tight"
            style={{ fontSize: "clamp(1.25rem, 3vw, 1.375rem)" }}
          >
            {c.price}
          </span>
        </div>
        <div className="text-[10.5px] sm:text-[11px] text-slate-500 font-medium mt-0.5">
          {pick(c.unit, lang)}
        </div>
      </div>

      <ul className="relative space-y-1.5 sm:space-y-2">
        {c.items.map((it, i) => {
          const text = pick(it, lang);
          return (
            <li
              key={i}
              className="flex gap-2 sm:gap-2.5 text-[11px] sm:text-[11.5px]
                         text-slate-600 leading-snug"
            >
              <span
                className="mt-1.5 w-1 h-1 rounded-full shrink-0"
                style={{ backgroundColor: c.accent }}
              />
              <span>{text}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
});

// ─────────────────────────────────────────────
// PANEL
// ─────────────────────────────────────────────
export default function ServicePricingPanel({ hideCta = false }) {
  const { lang } = useLang();
  const t = content[lang] || content.id;

  return (
    <div
      className="w-full bg-white border border-slate-200 rounded-2xl overflow-hidden"
      style={{ contain: "layout paint style" }}
    >
      <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-slate-200
                      bg-gradient-to-r from-slate-50 to-white">
        <div className="flex items-center gap-3">
          <span className="w-1 h-6 rounded-full bg-[#1e88e5] shrink-0" />
          <div className="min-w-0">
            <div className="text-[10px] uppercase tracking-[0.25em] text-[#1e88e5] font-semibold">
              {t.headerBadge}
            </div>
            <h3
              className="text-slate-900 font-semibold leading-snug mt-0.5"
              style={{ fontSize: "clamp(0.875rem, 2vw, 0.9375rem)" }}
            >
              {t.headerTitle}
            </h3>
          </div>
        </div>
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
                   divide-y sm:divide-y-0 sm:divide-x divide-slate-100"
      >
        {categories.map((c) => (
          <CategoryCard key={c.code} c={c} lang={lang} />
        ))}
      </div>

      <div
        className={`px-4 sm:px-6 py-4 border-t border-slate-200 bg-slate-50/60 ${
          hideCta
            ? ""
            : "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
        }`}
      >
        <span className="text-[11px] text-slate-500 leading-relaxed">
          {t.footerNote}
        </span>

        {!hideCta && (
          <Link
            href="/layanan/infrastruktur/pengaspalan"
            aria-label={t.ctaLabel}
            className="inline-flex items-center justify-center gap-1.5
                       px-4 py-2 rounded-lg shrink-0
                       bg-slate-900 text-white text-[12px] font-medium
                       hover:bg-[#1e88e5]
                       transition-colors duration-150"
          >
            {t.ctaLabel}
            <IconArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>
    </div>
  );
}