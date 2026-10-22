// src/components/PavingPricingPanel.jsx
"use client";

import { useState, useMemo, useCallback, memo, Fragment } from "react";
import Link from "next/link";
import { useLang } from "../context/LanguageContext";

// ─────────────────────────────────────────────
// HELPER: pick bilingual
// ─────────────────────────────────────────────
const pick = (field, lang) => {
  if (!field) return "";
  if (typeof field === "string") return field;
  return field[lang] || field.id || field.en || "";
};

// ─────────────────────────────────────────────
// IKON
// ─────────────────────────────────────────────
function IconPlus({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}
function IconMinus({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M5 12h14" />
    </svg>
  );
}
function IconArrowRight({ className = "w-3.5 h-3.5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
function IconChevron({ className = "w-3 h-3" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

// ─────────────────────────────────────────────
// PATH GAMBAR PNG
// ─────────────────────────────────────────────
const imageMapPaving = {
  "TRUEPAVE (Model Bata)":   "/images/paving-bata.png",
  "INTEPAVE (Model Cacing)": "/images/paving-cacing.png",
  "HEXAGONAL":               "/images/paving-hexagon.png",
};

const imageMapGrass = {
  "FULLPAVE":       "/images/grass-fullpave.png",
  "HALFPAVE":       "/images/grass-halfpave.png",
  "FULLPAVE - SET": "/images/grass-fullpave-set.png",
  "TOPI USKUP":     "/images/grass-topi-uskup.png",
};

const FALLBACK_IMG = "https://placehold.co/56x56/f1f5f9/94a3b8?text=IMG";

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const pavingTypes = [
  {
    name: "TRUEPAVE (Model Bata)",
    size: "21 × 10.5 cm",
    rows: [
      { tebal: "6",  natural: "75.000",  warna: "90.000",  isi: "44 Pcs" },
      { tebal: "8",  natural: "85.000",  warna: "100.000" },
      { tebal: "10", natural: "—",       warna: "—" },
    ],
  },
  {
    name: "INTEPAVE (Model Cacing)",
    size: "22.5 × 11.2 cm",
    rows: [
      { tebal: "6", natural: "75.000", warna: "90.000",  isi: "39 Pcs" },
      { tebal: "8", natural: "85.000", warna: "100.000" },
    ],
  },
  {
    name: "HEXAGONAL",
    size: "20 × 20 cm",
    rows: [
      { tebal: "6", natural: "75.000", warna: "90.000",  isi: "25 Pcs" },
      { tebal: "8", natural: "85.000", warna: "100.000" },
    ],
  },
];

const grassTypes = [
  {
    name: "FULLPAVE",
    size: "21 × 21 cm",
    rows: [
      { tebal: "6", natural: "75.000",  warna: "90.000",  isi: "22 Pcs" },
      { tebal: "8", natural: "85.000",  warna: "100.000" },
    ],
  },
  {
    name: "HALFPAVE",
    size: "10.5 × 10.5 cm",
    rows: [
      { tebal: "6", natural: "75.000",  warna: "90.000",  isi: "88 Pcs" },
      { tebal: "8", natural: "85.000",  warna: "100.000" },
    ],
  },
  {
    name: "FULLPAVE - SET",
    size: { id: "Set kombinasi", en: "Combination set" },
    rows: [
      { tebal: "6", natural: "90.000",  warna: "105.000", isi: "22 Pcs" },
      { tebal: "8", natural: "100.000", warna: "115.000", isi: "5,5 Pcs" },
    ],
  },
  {
    name: "TOPI USKUP",
    size: "28 × 21 × 10.5 cm",
    rows: [
      { tebal: "6", natural: "8.000", warna: "—", isi: "3,3 Pcs/M¹" },
      { tebal: "8", natural: "9.000", warna: "—" },
    ],
  },
];

// ─────────────────────────────────────────────
// KONTEN BILINGUAL
// ─────────────────────────────────────────────
const content = {
  id: {
    headerBadge1: "Paket Harga",
    headerBadge2: "Paving & Grass Block",
    headerTitle: "Jasa pasang paving block Jabodetabek",
    headerSubtitle: "Spesifikasi harga jasa pasang paving block",
    colType: "Type", colTebal: "Tebal", colTebalUnit: "Cm",
    colNatural: "Harga", colNaturalLine2: "Natural",
    colWarna: "Harga", colWarnaLine2: "Warna",
    colIsi: "Isi", colIsiLine2: "/ m²",
    footnoteTable: "Harga dalam ribuan Rupiah per m²",
    mobileIsi: "Isi:", mobileNatural: "Natural", mobileWarna: "Warna",
    footerNote: "Harga dapat berubah sesuai kondisi lapangan & volume pekerjaan.",
    ctaLabel: "Selengkapnya",
  },
  en: {
    headerBadge1: "Price Package",
    headerBadge2: "Paving & Grass Block",
    headerTitle: "Paving block installation services in Jabodetabek",
    headerSubtitle: "Price specification for paving block installation services",
    colType: "Type", colTebal: "Thickness", colTebalUnit: "Cm",
    colNatural: "Price", colNaturalLine2: "Natural",
    colWarna: "Price", colWarnaLine2: "Colored",
    colIsi: "Qty", colIsiLine2: "/ m²",
    footnoteTable: "Prices are in thousands of Rupiah per m²",
    mobileIsi: "Qty:", mobileNatural: "Natural", mobileWarna: "Colored",
    footerNote: "Prices may change according to field conditions & work volume.",
    ctaLabel: "Learn More",
  },
};

// ─────────────────────────────────────────────
// IMG dengan fallback
// ─────────────────────────────────────────────
function ProductImage({ src, alt }) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className="w-full h-full object-contain p-1"
      onError={(e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = FALLBACK_IMG;
      }}
    />
  );
}

// ─────────────────────────────────────────────
// TABEL PRODUK — DESKTOP
// ─────────────────────────────────────────────
const ProductTable = memo(function ProductTable({ data, imageMap, t, lang }) {
  return (
    <div className="hidden md:block rounded-xl border border-slate-200 overflow-hidden bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-[12px] border-collapse">
          <thead>
            <tr className="bg-[#faf208] text-slate-900">
              <th className="px-4 py-3 text-left text-[10px] font-bold tracking-[0.12em] uppercase border-r border-yellow-400/60 w-[28%]">{t.colType}</th>
              <th className="px-3 py-3 text-center text-[10px] font-bold tracking-[0.12em] uppercase border-r border-yellow-400/60 w-[10%]">{t.colTebal}<br />{t.colTebalUnit}</th>
              <th className="px-3 py-3 text-center text-[10px] font-bold tracking-[0.12em] uppercase border-r border-yellow-400/60 w-[18%]">{t.colNatural}<br />{t.colNaturalLine2}</th>
              <th className="px-3 py-3 text-center text-[10px] font-bold tracking-[0.12em] uppercase border-r border-yellow-400/60 w-[18%]">{t.colWarna}<br />{t.colWarnaLine2}</th>
              <th className="px-3 py-3 text-center text-[10px] font-bold tracking-[0.12em] uppercase w-[16%]">{t.colIsi}<br />{t.colIsiLine2}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((type) => (
              <Fragment key={type.name}>
                <tr className="border-t border-slate-200 align-top">
                  <td rowSpan={type.rows.length} className="px-4 py-3.5 border-r border-slate-200 bg-slate-50/60">
                    <div className="flex items-start gap-3">
                      <div className="w-14 h-14 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 overflow-hidden">
                        <ProductImage src={imageMap[type.name]} alt={type.name} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[11px] font-bold text-[#1e88e5] uppercase leading-tight tracking-wide">{type.name}</div>
                        <div className="text-[10.5px] text-slate-500 mt-1">{pick(type.size, lang)}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-center border-r border-slate-200 text-slate-700">{type.rows[0].tebal}</td>
                  <td className="px-3 py-3 text-center border-r border-slate-200 text-slate-800 font-medium">{type.rows[0].natural}</td>
                  <td className="px-3 py-3 text-center border-r border-slate-200 text-slate-800 font-medium">{type.rows[0].warna}</td>
                  <td rowSpan={type.rows.length} className="px-3 py-3 text-center text-slate-700 bg-slate-50/60 align-middle">{type.rows[0].isi}</td>
                </tr>
                {type.rows.slice(1).map((r, ri) => (
                  <tr key={`${type.name}-${ri + 1}`} className="border-t border-slate-100">
                    <td className="px-3 py-3 text-center border-r border-slate-200 text-slate-700">{r.tebal}</td>
                    <td className="px-3 py-3 text-center border-r border-slate-200 text-slate-800 font-medium">{r.natural}</td>
                    <td className="px-3 py-3 text-center border-r border-slate-200 text-slate-800 font-medium">{r.warna}</td>
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 flex items-center gap-2">
        <span className="w-1 h-1 rounded-full bg-slate-400" aria-hidden="true" />
        <span className="text-[10.5px] text-slate-500">{t.footnoteTable}</span>
      </div>
    </div>
  );
});

// ─────────────────────────────────────────────
// CARD LIST — MOBILE
// ─────────────────────────────────────────────
const ProductCards = memo(function ProductCards({ data, imageMap, t, lang }) {
  return (
    <div className="md:hidden space-y-3">
      {data.map((type) => (
        <div key={type.name} className="rounded-xl border border-slate-200 bg-white overflow-hidden">
          <div className="flex items-center gap-3 p-4 bg-slate-50/60 border-b border-slate-100">
            <div className="w-14 h-14 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 overflow-hidden">
              <ProductImage src={imageMap[type.name]} alt={type.name} />
            </div>
            <div className="min-w-0">
              <div className="text-[13px] sm:text-[12px] font-bold text-[#1e88e5] uppercase leading-tight tracking-wide">{type.name}</div>
              <div className="text-[11px] sm:text-[10.5px] text-slate-500 mt-1">{pick(type.size, lang)}</div>
              <div className="text-[11px] sm:text-[10.5px] text-slate-600 mt-0.5">{t.mobileIsi} <b className="text-slate-800">{type.rows[0].isi}</b></div>
            </div>
          </div>
          <div className="divide-y divide-slate-100">
            {type.rows.map((r, ri) => (
              <div key={ri} className="px-4 py-3">
                <div className="flex items-center justify-between gap-3 mb-2">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-700">
                    <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 text-[10.5px] font-bold">{r.tebal} cm</span>
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-[10.5px] sm:text-[9.5px] uppercase tracking-wider text-slate-400 font-semibold">{t.mobileNatural}</div>
                    <div className="text-[13px] sm:text-[12.5px] font-semibold text-slate-800 mt-0.5">{r.natural}</div>
                  </div>
                  <div>
                    <div className="text-[10.5px] sm:text-[9.5px] uppercase tracking-wider text-slate-400 font-semibold">{t.mobileWarna}</div>
                    <div className="text-[13px] sm:text-[12.5px] font-semibold text-slate-800 mt-0.5">{r.warna}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-slate-400" aria-hidden="true" />
            <span className="text-[10.5px] sm:text-[10px] text-slate-500">{t.footnoteTable}</span>
          </div>
        </div>
      ))}
    </div>
  );
});

// ─────────────────────────────────────────────
// ACCORDION ITEM
// ─────────────────────────────────────────────
const AccordionItem = memo(function AccordionItem({ item, index, isOpen, onToggle, lang }) {
  return (
    <div>
      <button
        type="button"
        onClick={() => onToggle(index)}
        aria-expanded={isOpen}
        className={`w-full flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-3.5 sm:py-4 text-left transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1e88e5]
          ${isOpen ? "bg-[#1e88e5]/[0.03]" : "hover:bg-slate-50"}`}
      >
        <span className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-150
          ${isOpen ? "bg-[#1e88e5] text-white" : "bg-slate-100 text-slate-600"}`}>
          {isOpen ? <IconMinus className="w-3.5 h-3.5" /> : <IconPlus className="w-3.5 h-3.5" />}
        </span>
        <span className="flex-1 min-w-0">
          <span className={`block font-semibold leading-snug transition-colors duration-150
            ${isOpen ? "text-[#1e88e5]" : "text-slate-800"}`}
            style={{ fontSize: "clamp(0.8125rem, 1.7vw, 0.84375rem)" }}>
            {pick(item.title, lang)}
          </span>
          <span className="block text-[11px] sm:text-[11.5px] text-slate-400 mt-0.5">{pick(item.desc, lang)}</span>
        </span>
        <span className="hidden sm:inline-block text-[10px] font-semibold uppercase tracking-wider text-slate-400 px-2 py-1 rounded bg-slate-100 shrink-0">
          {pick(item.label, lang)}
        </span>
      </button>
      {isOpen && (
        <div className="px-4 sm:px-6 sm:pl-[72px] pb-5 sm:pb-6">
          {item.content}
        </div>
      )}
    </div>
  );
});

// ─────────────────────────────────────────────
// PANEL
// ─────────────────────────────────────────────
export default function PavingPricingPanel({ hideCta = false }) {
  const { lang } = useLang();
  const t = content[lang] || content.id;

  const [open, setOpen] = useState(0);
  const toggle = useCallback((i) => {
    setOpen((prev) => (prev === i ? -1 : i));
  }, []);

  const items = useMemo(() => {
    return [
      {
        label: { id: "Jasa pasang (hanya jasa)", en: "Installation service (labor only)" },
        title: { id: "Jasa pasang paving block (Hanya jasa saja)", en: "Paving block installation service (Labor only)" },
        desc: { id: "Biaya tenaga kerja & finishing", en: "Labor cost & finishing" },
        content: (
          <div className="space-y-3">
            <div className="rounded-lg border border-slate-200 divide-y divide-dashed divide-slate-200">
              <div className="flex items-start sm:items-center justify-between gap-3 sm:gap-4 px-4 py-3">
                <span className="text-[12.5px] text-slate-700 min-w-0">
                  {lang === "en" ? "Labor only" : "Tenaga saja"}{" "}
                  <span className="text-slate-400">({lang === "en" ? "Install + Stamper Finishing" : "Pasang + Finishing Stamper"})</span>
                </span>
                <span className="text-[13px] font-semibold text-slate-900 whitespace-nowrap shrink-0">Rp 30.000<span className="text-[11px] text-slate-500">/m²</span></span>
              </div>
              <div className="flex items-start sm:items-center justify-between gap-3 sm:gap-4 px-4 py-3">
                <span className="text-[12.5px] text-slate-700 min-w-0">
                  {lang === "en" ? "Labor + Stone Dust" : "Tenaga + Abu Batu"}{" "}
                  <span className="text-slate-400">({lang === "en" ? "Install + Stamper Finishing" : "Pasang + Finishing Stamper"})</span>
                </span>
                <span className="text-[13px] font-semibold text-slate-900 whitespace-nowrap shrink-0">Rp 40.000<span className="text-[11px] text-slate-500">/m²</span></span>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 italic">
              * {lang === "en" ? "Price for area above 100 m²" : "Harga untuk ukuran di atas 100 m²"}
            </p>
          </div>
        ),
      },
      {
        label: { id: "Jasa + bahan", en: "Service + material" },
        title: { id: "Jasa pasang paving block berikut Bahan", en: "Paving block installation service including Material" },
        desc: { id: "Tenaga + material pendukung", en: "Labor + supporting material" },
        content: (
          <div className="space-y-3">
            <div className="rounded-lg border border-slate-200 divide-y divide-dashed divide-slate-200">
              <div className="flex items-start sm:items-center justify-between gap-3 sm:gap-4 px-4 py-3">
                <span className="text-[12.5px] text-slate-700 min-w-0">
                  {lang === "en" ? "Labor + Material" : "Tenaga + Bahan"}{" "}
                  <span className="text-slate-400">({lang === "en" ? "Stone dust & Paving" : "Abu batu & Paving"})</span>
                </span>
                <span className="text-[13px] font-semibold text-slate-900 whitespace-nowrap shrink-0">Rp 120.000<span className="text-[11px] text-slate-500">/m²</span></span>
              </div>
              <div className="flex items-start sm:items-center justify-between gap-3 sm:gap-4 px-4 py-3">
                <span className="text-[12.5px] text-slate-700 min-w-0">
                  {lang === "en" ? "Labor + Material" : "Tenaga + Bahan"}{" "}
                  <span className="text-slate-400">({lang === "en" ? "Sirtu, Stone dust & Paving" : "Sirtu, Abu batu & Paving"})</span>
                </span>
                <span className="text-[13px] font-semibold text-slate-900 whitespace-nowrap shrink-0">Rp 135.000<span className="text-[11px] text-slate-500">/m²</span></span>
              </div>
            </div>
            <ul className="space-y-1 text-[11px] text-slate-500">
              <li className="flex gap-2">
                <span className="text-slate-300" aria-hidden="true">•</span>
                {lang === "en" ? (<>Price for paving block thickness <b className="text-slate-700">6 cm</b> (8 cm + Rp 10.000)</>) : (<>Harga untuk paving block ketebalan <b className="text-slate-700">6 cm</b> (8 cm + Rp 10.000)</>)}
              </li>
              <li className="flex gap-2">
                <span className="text-slate-300" aria-hidden="true">•</span>
                {lang === "en" ? (<>Color <b className="text-slate-700">natural</b> (other colors + Rp 10.000)</>) : (<>Warna <b className="text-slate-700">natural</b> (warna lain + Rp 10.000)</>)}
              </li>
              <li className="flex gap-2">
                <span className="text-slate-300" aria-hidden="true">•</span>
                {lang === "en" ? (<>Price for area above <b className="text-slate-700">100 m²</b></>) : (<>Harga untuk ukuran di atas <b className="text-slate-700">100 m²</b></>)}
              </li>
            </ul>
          </div>
        ),
      },
      {
        label: { id: "Bentuk paving", en: "Paving shape" },
        title: { id: "Pilihan bentuk Paving Block", en: "Paving Block Shape Options" },
        desc: { id: "Bata · Cacing · Hexagonal", en: "Brick · Worm · Hexagonal" },
        content: (
          <>
            <ProductTable data={pavingTypes} imageMap={imageMapPaving} t={t} lang={lang} />
            <ProductCards data={pavingTypes} imageMap={imageMapPaving} t={t} lang={lang} />
          </>
        ),
      },
      {
        label: { id: "Grass block", en: "Grass block" },
        title: { id: "Jasa Pasang Grass Block", en: "Grass Block Installation Service" },
        desc: { id: "Fullpave · Halfpave · Topi Uskup", en: "Fullpave · Halfpave · Bishop's Cap" },
        content: (
          <>
            <ProductTable data={grassTypes} imageMap={imageMapGrass} t={t} lang={lang} />
            <ProductCards data={grassTypes} imageMap={imageMapGrass} t={t} lang={lang} />
          </>
        ),
      },
    ];
  }, [t, lang]);

  return (
    <section
      className="w-full bg-white border border-slate-200 rounded-2xl overflow-hidden"
      aria-labelledby="paving-panel-title"
    >
      {/* Header */}
      <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
        <div className="flex items-start gap-3">
          <span
            className="mt-1 w-1 h-9 rounded-full bg-[#1e88e5] shrink-0"
            aria-hidden="true"
          />
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-[10px] sm:text-[10.5px] uppercase tracking-[0.18em] text-[#1e88e5] font-semibold mb-1">
              <span>{t.headerBadge1}</span>
              <IconChevron className="w-2.5 h-2.5" />
              <span>{t.headerBadge2}</span>
            </div>
            <h3
              id="paving-panel-title"
              className="text-slate-900 font-semibold leading-snug"
              style={{ fontSize: "clamp(1rem, 2.2vw, 1.1875rem)" }}
            >
              {t.headerTitle}
            </h3>
            <p className="text-[11.5px] sm:text-[12px] text-slate-500 italic mt-1">{t.headerSubtitle}</p>
          </div>
        </div>
      </div>

      {/* Accordion */}
      <div className="divide-y divide-slate-100">
        {items.map((it, i) => (
          <AccordionItem key={i} item={it} index={i} isOpen={open === i} onToggle={toggle} lang={lang} />
        ))}
      </div>

      {/* Footer */}
      <div className={`px-4 sm:px-6 py-4 border-t border-slate-200 bg-slate-50/60 ${hideCta ? "" : "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"}`}>
        <span className="text-[11px] text-slate-500 leading-relaxed">{t.footerNote}</span>
        {!hideCta && (
          <Link
            href="/layanan/infrastruktur/pasang-paving-block"
            aria-label={t.ctaLabel}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:py-2 min-h-[44px] sm:min-h-0 rounded-lg shrink-0 bg-slate-900 text-white text-[12px] font-semibold hover:bg-[#1e88e5] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e88e5] focus-visible:ring-offset-2"
          >
            {t.ctaLabel}
            <IconArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>
    </section>
  );
}