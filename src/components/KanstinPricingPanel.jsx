// src/components/KanstinPricingPanel.jsx
"use client";

import { memo, useMemo } from "react";
import Link from "next/link";
import { useLang } from "../context/LanguageContext";

// ─────────────────────────────────────────────
// IKON
// ─────────────────────────────────────────────
function IconArrowRight({ className = "w-3.5 h-3.5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

// ─────────────────────────────────────────────
// PATH GAMBAR PNG
// ─────────────────────────────────────────────
const gambarMap = {
  "KANSTEEN TAMAN":   "/images/kanstin-taman.png",
  "KANSTEEN TROTOAR": "/images/kanstin-trotoar.png",
  "KANSTEEN DKI":     "/images/kanstin-dki.png",
  "KANSTEEN S":       "/images/kanstin-s.png",
};

const FALLBACK_IMG = "https://placehold.co/140x80/f1f5f9/94a3b8?text=IMG";

// ─────────────────────────────────────────────
// DATA KANSTIN
// ─────────────────────────────────────────────
const kanstinData = [
  {
    name: { id: "KANSTEEN TAMAN", en: "GARDEN CURBSTONE" },
    key: "KANSTEEN TAMAN",
    sizes: [
      { dim: "40x20x10cm", harga: "17.000", isi: "2,5 Pcs" },
      { dim: "40x20x15x13cm", harga: "23.000", isi: "2,5 Pcs" },
    ],
  },
  {
    name: { id: "KANSTEEN TROTOAR", en: "SIDEWALK CURBSTONE" },
    key: "KANSTEEN TROTOAR",
    sizes: [
      { dim: "40x25x16x13cm", harga: "27.000", isi: "2,5 Pcs" },
      { dim: "40x28x15x13cm", harga: "29.000", isi: "2,5 Pcs" },
    ],
  },
  {
    name: { id: "KANSTEEN DKI", en: "DKI CURBSTONE" },
    key: "KANSTEEN DKI",
    sizes: [
      { dim: "60x25x22x18cm", harga: "58.000", isi: "1,6 Pcs" },
      { dim: "60x30x25x20cm", harga: "62.000", isi: "1,6 Pcs" },
    ],
  },
  {
    name: { id: "KANSTEEN S", en: "S CURBSTONE" },
    key: "KANSTEEN S",
    sizes: [
      { dim: "40x30x16cm", harga: "30.000", isi: "2,5 Pcs" },
    ],
  },
];

// ─────────────────────────────────────────────
// KONTEN BILINGUAL
// ─────────────────────────────────────────────
const content = {
  id: {
    headerBadge: "Paket Harga",
    headerTitle: "Berikut perhitungan jasa harga dan pasang kanstin",
    colDim: "Dimensi",
    colHarga: "Harga (Rp) / Pcs",
    colIsi: "Isi / m1",
    footerNote: "Harga dapat berubah sesuai kondisi lapangan & volume pekerjaan.",
    ctaLabel: "Selengkapnya",
  },
  en: {
    headerBadge: "Price Package",
    headerTitle: "Here is the calculation of service price and curbstone installation",
    colDim: "Dimension",
    colHarga: "Price (Rp) / Pcs",
    colIsi: "Qty / m1",
    footerNote: "Prices may change according to field conditions & work volume.",
    ctaLabel: "Learn More",
  },
};

// ─────────────────────────────────────────────
// HELPER: pick bilingual
// ─────────────────────────────────────────────
const pick = (field, lang) => {
  if (!field) return "";
  if (typeof field === "string") return field;
  return field[lang] || field.id || field.en || "";
};

// ─────────────────────────────────────────────
// GAMBAR DENGAN FALLBACK
// ─────────────────────────────────────────────
function KanstinImage({ src, alt }) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className="w-full h-full object-contain"
      onError={(e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = FALLBACK_IMG;
      }}
    />
  );
}

// ─────────────────────────────────────────────
// ROW KANSTIN
// ─────────────────────────────────────────────
const KanstinRow = memo(function KanstinRow({ k, t, lang }) {
  const displayName = pick(k.name, lang);

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-[200px_160px_1fr] gap-0 md:items-stretch"
      style={{ contain: "layout paint style" }}
    >
      <div className="md:border-r border-slate-100 px-4 sm:px-5 py-4 sm:py-5 flex items-center">
        <div className="w-full border border-slate-300 rounded-lg px-3 py-3 text-center bg-slate-50">
          <span className="text-[11px] font-bold tracking-[0.12em] text-slate-800">
            {displayName}
          </span>
        </div>
      </div>

      <div className="md:border-r border-slate-100 px-4 sm:px-5 py-4 sm:py-5
                      flex items-center justify-center
                      border-b md:border-b-0 border-slate-100 bg-white/50">
        <div className="w-[120px] sm:w-[130px] h-[72px] sm:h-[80px] flex items-center justify-center">
          <KanstinImage src={gambarMap[k.key]} alt={displayName} />
        </div>
      </div>

      <div className="overflow-x-auto p-4">
        <table className="w-full text-[12px] border border-slate-300 border-collapse">
          <thead>
            <tr className="bg-slate-100 text-slate-700">
              <th className="px-3 sm:px-4 py-2.5 text-center text-[10.5px] font-semibold tracking-wider uppercase border border-slate-300 w-[30%]">{t.colDim}</th>
              <th className="px-3 sm:px-4 py-2.5 text-center text-[10.5px] font-semibold tracking-wider uppercase border border-slate-300 w-[45%]">{t.colHarga}</th>
              <th className="px-3 sm:px-4 py-2.5 text-center text-[10.5px] font-semibold tracking-wider uppercase border border-slate-300 w-[25%]">{t.colIsi}</th>
            </tr>
          </thead>
          <tbody>
            {k.sizes.map((s, i) => (
              <tr key={s.dim} className={i % 2 === 1 ? "bg-slate-50/60" : "bg-white"}>
                <td className="px-3 sm:px-4 py-2.5 text-center text-slate-700 font-medium border border-slate-300">{s.dim}</td>
                <td className="px-3 sm:px-4 py-2.5 text-center text-slate-900 font-semibold border border-slate-300">
                  <span className="text-[11px] text-slate-400 font-normal mr-0.5">Rp</span>
                  {s.harga}
                </td>
                <td className="px-3 sm:px-4 py-2.5 text-center text-slate-600 border border-slate-300">{s.isi}</td>
              </tr>
            ))}

            {Array.from({ length: Math.max(0, 2 - k.sizes.length) }).map((_, i) => (
              <tr key={`empty-${i}`} className="bg-white" aria-hidden="true">
                <td className="px-3 sm:px-4 py-2.5 border border-slate-300">&nbsp;</td>
                <td className="px-3 sm:px-4 py-2.5 border border-slate-300">&nbsp;</td>
                <td className="px-3 sm:px-4 py-2.5 border border-slate-300">&nbsp;</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

// ─────────────────────────────────────────────
// PANEL
// ─────────────────────────────────────────────
export default function KanstinPricingPanel({ hideCta = false }) {
  const { lang } = useLang();
  const t = content[lang] || content.id;

  const data = useMemo(() => kanstinData, []);

  return (
    <div className="w-full bg-white border border-slate-200 rounded-2xl overflow-hidden" style={{ contain: "layout paint style" }}>
      <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
        <div className="flex items-center gap-3">
          <span className="w-1 h-6 rounded-full bg-[#1e88e5] shrink-0" />
          <div className="min-w-0">
            <div className="text-[10px] uppercase tracking-[0.25em] text-[#1e88e5] font-semibold">{t.headerBadge}</div>
            <h3 className="text-slate-900 font-semibold leading-snug mt-0.5 uppercase" style={{ fontSize: "clamp(0.875rem, 2vw, 0.9375rem)" }}>{t.headerTitle}</h3>
          </div>
        </div>
      </div>

      <div className="divide-y divide-slate-100">
        {data.map((k) => (
          <KanstinRow key={k.key} k={k} t={t} lang={lang} />
        ))}
      </div>

      <div className={`px-4 sm:px-6 py-4 border-t border-slate-200 bg-slate-50/60 ${hideCta ? "" : "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"}`}>
        <span className="text-[11px] text-slate-500 leading-relaxed">{t.footerNote}</span>
        {!hideCta && (
          <Link
            href="/layanan/infrastruktur/pasang-kanstin"
            aria-label={t.ctaLabel}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg shrink-0 bg-slate-900 text-white text-[12px] font-medium hover:bg-[#1e88e5] transition-colors duration-150"
          >
            {t.ctaLabel}
            <IconArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>
    </div>
  );
}