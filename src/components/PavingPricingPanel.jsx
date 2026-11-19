// src/components/PavingPricingPanel.jsx
"use client";

import { useState, useMemo, useCallback, memo, Fragment } from "react";
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
function IconWhatsApp({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
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
    headerTitle: "Jasa pasang paving block Jabodetabek, Banten & Jawa Barat",
    headerSubtitle: "Spesifikasi harga borongan jasa pasang paving block (Tebal 6 cm & 8 cm · Mutu K-250 – K-300)",
    colType: "Type", colTebal: "Tebal", colTebalUnit: "Cm",
    colNatural: "Harga", colNaturalLine2: "Natural",
    colWarna: "Harga", colWarnaLine2: "Warna",
    colIsi: "Isi", colIsiLine2: "/ m²",
    footnoteTable: "Harga material dalam ribuan Rupiah per m²",
    mobileIsi: "Isi:", mobileNatural: "Natural", mobileWarna: "Warna",
    installationAreaNote: "Harga tercantum untuk area di atas 100 m². Untuk area 100 m² atau kurang, hubungi kami untuk penawaran.",
    footerNote: "Gratis survei lokasi & konsultasi RAB. Harga dapat menyesuaikan luas area & kondisi lapangan.",
    ctaLabel: "Tanya Harga & Survei via WA",
    waText: "Halo Tri Abadi Makmur, saya mau tanya rincian harga pemasangan paving block & jadwalkan survei lokasi...",
  },
  en: {
    headerBadge1: "Price Package",
    headerBadge2: "Paving & Grass Block",
    headerTitle: "Paving block installation services in Jabodetabek, Banten & Jawa Barat",
    headerSubtitle: "Price specification for paving block installation services (Thickness 6 cm & 8 cm · Grade K-250 – K-300)",
    colType: "Type", colTebal: "Thickness", colTebalUnit: "Cm",
    colNatural: "Price", colNaturalLine2: "Natural",
    colWarna: "Price", colWarnaLine2: "Colored",
    colIsi: "Qty", colIsiLine2: "/ m²",
    footnoteTable: "Material prices are in thousands of Rupiah per m²",
    mobileIsi: "Qty:", mobileNatural: "Natural", mobileWarna: "Colored",
    installationAreaNote: "Listed prices apply to areas above 100 m². For areas of 100 m² or less, contact us for a quote.",
    footerNote: "Free site survey & budget consultation. Prices may adjust based on area size & field conditions.",
    ctaLabel: "Ask Price & Survey via WA",
    waText: "Hello Tri Abadi Makmur, I would like to ask about paving block installation prices & schedule a site survey...",
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
          ${isOpen ? "bg-blue-700 text-white" : "bg-slate-100 text-slate-600"}`}>
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

  // Default buka indeks 1 ("Jasa + Bahan") karena paling banyak dicari dari Google Ads
  const [open, setOpen] = useState(1);
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
              * {t.installationAreaNote}
            </p>
          </div>
        ),
      },
      {
        label: { id: "Jasa + bahan", en: "Service + material" },
        title: { id: "Jasa pasang paving block berikut Bahan (Terima Beres)", en: "Paving block installation service including Material" },
        desc: { id: "Tenaga + material paving K-250/K-300 + abu batu / sirtu", en: "Labor + paving material K-250/K-300 + stone dust / sirtu" },
        content: (
          <div className="space-y-3">
            <div className="rounded-lg border border-slate-200 divide-y divide-dashed divide-slate-200">
              <div className="flex items-start sm:items-center justify-between gap-3 sm:gap-4 px-4 py-3">
                <span className="text-[12.5px] text-slate-700 min-w-0">
                  {lang === "en" ? "Labor + Material (6 cm)" : "Tenaga + Bahan (Tebal 6 cm)"}{" "}
                  <span className="text-slate-400">({lang === "en" ? "Stone dust & Paving" : "Abu batu & Paving"})</span>
                </span>
                <span className="text-[13px] font-semibold text-slate-900 whitespace-nowrap shrink-0">Rp 120.000<span className="text-[11px] text-slate-500">/m²</span></span>
              </div>
              <div className="flex items-start sm:items-center justify-between gap-3 sm:gap-4 px-4 py-3">
                <span className="text-[12.5px] text-slate-700 min-w-0">
                  {lang === "en" ? "Labor + Material (6 cm + Sirtu)" : "Tenaga + Bahan (Tebal 6 cm + Sirtu)"}{" "}
                  <span className="text-slate-400">({lang === "en" ? "Sirtu, Stone dust & Paving" : "Sirtu, Abu batu & Paving"})</span>
                </span>
                <span className="text-[13px] font-semibold text-slate-900 whitespace-nowrap shrink-0">Rp 135.000<span className="text-[11px] text-slate-500">/m²</span></span>
              </div>
              <div className="flex items-start sm:items-center justify-between gap-3 sm:gap-4 px-4 py-3 bg-slate-50/50">
                <span className="text-[12.5px] text-slate-700 min-w-0">
                  {lang === "en" ? "Labor + Material (8 cm)" : "Tenaga + Bahan (Tebal 8 cm)"}{" "}
                  <span className="text-slate-400">({lang === "en" ? "Stone dust & Paving K-300" : "Abu batu & Paving K-300"})</span>
                </span>
                <span className="text-[13px] font-semibold text-slate-900 whitespace-nowrap shrink-0">Rp 130.000<span className="text-[11px] text-slate-500">/m²</span></span>
              </div>
              <div className="flex items-start sm:items-center justify-between gap-3 sm:gap-4 px-4 py-3 bg-slate-50/50">
                <span className="text-[12.5px] text-slate-700 min-w-0">
                  {lang === "en" ? "Labor + Material (8 cm + Sirtu)" : "Tenaga + Bahan (Tebal 8 cm + Sirtu)"}{" "}
                  <span className="text-slate-400">({lang === "en" ? "Sirtu, Stone dust & Paving K-300" : "Sirtu, Abu batu & Paving K-300"})</span>
                </span>
                <span className="text-[13px] font-semibold text-slate-900 whitespace-nowrap shrink-0">Rp 145.000<span className="text-[11px] text-slate-500">/m²</span></span>
              </div>
            </div>
            <ul className="space-y-1 text-[11px] text-slate-500">
              <li className="flex gap-2">
                <span className="text-slate-300" aria-hidden="true">•</span>
                {lang === "en" ? (<>Standard concrete grade <b className="text-slate-700">K-250 to K-300</b> (Hydraulic Press)</>) : (<>Mutu beton standar <b className="text-slate-700">K-250 s/d K-300</b> (Press Hidrolik)</>)}
              </li>
              <li className="flex gap-2">
                <span className="text-slate-300" aria-hidden="true">•</span>
                <span>
                  {lang === "en"
                    ? (<>Package prices use <b className="text-slate-700">natural-colored paving</b>. For red or black, confirm the estimated surcharge of <b className="text-slate-700">Rp 10,000/m²</b> when requesting a quote.</>)
                    : (<>Harga paket menggunakan <b className="text-slate-700">paving warna natural</b>. Untuk warna merah atau hitam, konfirmasikan estimasi tambahan <b className="text-slate-700">Rp 10.000/m²</b> saat meminta penawaran.</>)}
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-slate-300" aria-hidden="true">•</span>
                <span>{t.installationAreaNote}</span>
              </li>
            </ul>
          </div>
        ),
      },
      {
        label: { id: "Bentuk paving", en: "Paving shape" },
        title: { id: "Harga Material Paving Block per m² (Bata, Cacing, Hexagonal)", en: "Paving Block Material Price per m² (Brick, Worm, Hexagonal)" },
        desc: { id: "Tebal 6 cm & 8 cm · Natural & Warna", en: "Thickness 6 cm & 8 cm · Natural & Colored" },
        content: (
          <>
            <ProductTable data={pavingTypes} imageMap={imageMapPaving} t={t} lang={lang} />
            <ProductCards data={pavingTypes} imageMap={imageMapPaving} t={t} lang={lang} />
          </>
        ),
      },
      {
        label: { id: "Grass block", en: "Grass block" },
        title: { id: "Harga Material & Pasang Grass Block", en: "Grass Block Material & Installation Price" },
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
      className="w-full bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm"
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

      {/* Footer dengan CTA WhatsApp Langsung */}
      <div className={`px-4 sm:px-6 py-4 border-t border-slate-200 bg-slate-50/80 ${hideCta ? "" : "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"}`}>
        <span className="text-[11px] text-slate-500 leading-relaxed">{t.footerNote}</span>
        {!hideCta && (
          <a
            href={`https://wa.me/6282258089367?text=${encodeURIComponent(t.waText)}`}
            target="_blank"
            rel="noreferrer"
            aria-label={t.ctaLabel}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 min-h-[44px] rounded-xl shrink-0 bg-emerald-700 text-white text-[12px] font-bold hover:bg-emerald-800 shadow-sm transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
          >
            <IconWhatsApp className="w-4 h-4 shrink-0" />
            {t.ctaLabel}
          </a>
        )}
      </div>
    </section>
  );
}
