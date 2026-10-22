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
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
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
    <div className="grid grid-cols-1 md:grid-cols-[minmax(180px,220px)_140px_1fr] md:items-stretch">
      {/* Kolom nama */}
      <div className="px-4 sm:px-5 py-4 sm:py-5 flex items-center md:border-r border-slate-100">
        <div className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-center bg-slate-50/70">
          <span className="text-[12px] sm:text-[11px] font-bold tracking-[0.12em] text-slate-800">
            {displayName}
          </span>
        </div>
      </div>

      {/* Kolom gambar */}
      <div className="px-4 sm:px-5 py-4 sm:py-5 flex items-center justify-center md:border-r border-slate-100 border-b md:border-b-0">
        <div className="w-[130px] sm:w-[120px] h-[76px] sm:h-[72px] flex items-center justify-center">
          <KanstinImage src={gambarMap[k.key]} alt={displayName} />
        </div>
      </div>

      {/* Kolom tabel */}
      <div className="p-4 sm:p-5 overflow-x-auto">
        <table className="w-full text-[12.5px] sm:text-[12px] border border-slate-200 border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-600">
              <th className="px-3 py-2.5 text-center text-[11px] sm:text-[10.5px] font-semibold tracking-wider uppercase border border-slate-200 w-[30%]">{t.colDim}</th>
              <th className="px-3 py-2.5 text-center text-[11px] sm:text-[10.5px] font-semibold tracking-wider uppercase border border-slate-200 w-[45%]">{t.colHarga}</th>
              <th className="px-3 py-2.5 text-center text-[11px] sm:text-[10.5px] font-semibold tracking-wider uppercase border border-slate-200 w-[25%]">{t.colIsi}</th>
            </tr>
          </thead>
          <tbody>
            {k.sizes.map((s, i) => (
              <tr key={s.dim} className={i % 2 === 1 ? "bg-slate-50/40" : "bg-white"}>
                <td className="px-3 py-3 sm:py-2.5 text-center text-slate-700 font-medium border border-slate-200">{s.dim}</td>
                <td className="px-3 py-3 sm:py-2.5 text-center text-slate-900 font-semibold border border-slate-200">
                  <span className="text-[11px] sm:text-[10.5px] text-slate-400 font-normal mr-0.5">Rp</span>
                  {s.harga}
                </td>
                <td className="px-3 py-3 sm:py-2.5 text-center text-slate-600 border border-slate-200">{s.isi}</td>
              </tr>
            ))}

            {Array.from({ length: Math.max(0, 2 - k.sizes.length) }).map((_, i) => (
              <tr key={`empty-${i}`} className="bg-white" aria-hidden="true">
                <td className="px-3 py-3 sm:py-2.5 border border-slate-200">&nbsp;</td>
                <td className="px-3 py-3 sm:py-2.5 border border-slate-200">&nbsp;</td>
                <td className="px-3 py-3 sm:py-2.5 border border-slate-200">&nbsp;</td>
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
    <section
      className="w-full bg-white border border-slate-200 rounded-2xl overflow-hidden"
      aria-labelledby="kanstin-panel-title"
    >
      {/* Header */}
      <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
        <div className="flex items-start gap-3">
          <span
            className="w-1 h-6 rounded-full bg-[#1e88e5] shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <div className="min-w-0">
            <div className="text-[10px] uppercase tracking-[0.25em] text-[#1e88e5] font-semibold">
              {t.headerBadge}
            </div>
            <h3
              id="kanstin-panel-title"
              className="text-slate-900 font-semibold leading-snug mt-1 uppercase"
              style={{ fontSize: "clamp(0.9rem, 2vw, 1rem)" }}
            >
              {t.headerTitle}
            </h3>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="divide-y divide-slate-100">
        {data.map((k) => (
          <KanstinRow key={k.key} k={k} t={t} lang={lang} />
        ))}
      </div>

      {/* Footer */}
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
            href="/layanan/infrastruktur/pasang-kanstin"
            aria-label={t.ctaLabel}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 sm:py-2 min-h-[44px] sm:min-h-0 rounded-lg shrink-0 bg-slate-900 text-white text-[12px] font-medium hover:bg-[#1e88e5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e88e5] focus-visible:ring-offset-2"
          >
            {t.ctaLabel}
            <IconArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>
    </section>
  );
}