// src/components/BetonPricingPanel.jsx
"use client";

import { memo, useMemo } from "react";
import Link from "next/link";
import { useLang } from "../context/LanguageContext";

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
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

// ─── DATA BETON (bilingual) ──────────────────
const betonData = [
  { no: 1, nama: "Klas A ( K 500 )", ket: { id: "Beton untuk pricast / prestressed", en: "Concrete for precast / prestressed" }, harga: null, slump: "+_12" },
  { no: 2, nama: "Klas P ( K 400 )", ket: { id: "Beton untuk rabat jalan klas 1 (jl negara / jl tol)", en: "Concrete for class 1 road slab (national road / toll road)" }, harga: "Rp 1.200.000", slump: "+_12" },
  { no: 3, nama: "Klas B ( K 375 )", ket: { id: "Beton untuk lantai dan bangunan pabrik / rigid jalan", en: "Concrete for floors and factory buildings / rigid pavement" }, harga: "Rp 1.050.000", slump: "+_12" },
  { no: 4, nama: "Klas B ( K 350 )", ket: { id: "Beton untuk lantai dan bangunan pabrik / rigid jalan", en: "Concrete for floors and factory buildings / rigid pavement" }, harga: "Rp 1.000.000", slump: "+_12" },
  { no: 5, nama: "Klas K 325", ket: { id: "Beton untuk konstruksi bangunan ruko / rumah bertingkat 3 lantai s/d 5 lantai", en: "Concrete for shophouse construction / 3 to 5 story houses" }, harga: "Rp 950.000", slump: "+_12" },
  { no: 6, nama: "Klas K 300", ket: { id: "Beton untuk konstruksi bangunan ruko / rumah bertingkat 3 lantai s/d 5 lantai", en: "Concrete for shophouse construction / 3 to 5 story houses" }, harga: "Rp 920.000", slump: "+_12" },
  { no: 7, nama: "Klas K 275", ket: { id: "Konstruksi bangunan bertingkat dua lantai, ruko / rumah tinggal / standar", en: "Two-story building construction, shophouse / residential / standard" }, harga: "Rp 880.000", slump: "+_12" },
  { no: 8, nama: "Klas K 250", ket: { id: "Konstruksi bangunan bertingkat dua lantai, ruko / rumah tinggal / standar", en: "Two-story building construction, shophouse / residential / standard" }, harga: "Rp 850.000", slump: "+_12" },
  { no: 9, nama: "Klas K 225 (mobil standar)", ket: { id: "Konstruksi bangunan bertingkat dua lantai, ruko / rumah tinggal", en: "Two-story building construction, shophouse / residential" }, harga: "Rp 830.000", slump: "+_12" },
  { no: 10, nama: "Klas 225 (MINI MIX / mobil kecil)", ket: { id: "Konstruksi bangunan bertingkat dua lantai, ruko / rumah tinggal", en: "Two-story building construction, shophouse / residential" }, harga: "Rp 1.290.000", slump: "+_12" },
  { no: 11, nama: "Klas D ( K 175 )", ket: { id: "Konstruksi bangunan ringan", en: "Lightweight building construction" }, harga: null, slump: "+_12" },
  { no: 12, nama: "Klas E ( K 125 )", ket: { id: "Konstruksi LC / lantai dasar", en: "LC construction / ground floor" }, harga: null, slump: "+_12" },
  { no: 13, nama: "Klas B0", ket: { id: "Konstruksi LC / lantai dasar", en: "LC construction / ground floor" }, harga: null, slump: "+_12" },
];

// ─── KONTEN BILINGUAL ────────────────────────
const content = {
  id: {
    headerBadge: "Paket Harga",
    headerTitle: "Harga Jasa Cor Beton Ready Mix",
    colNo: "No", colKelas: "Kelas", colKegunaan: "Kegunaan",
    colSlump: "Slump", colHarga: "Harga / m³",
    mobileSlump: "Slump", mobileHarga: "Harga / m³",
    footerNote: "Harga dapat berubah sesuai kondisi lapangan & volume pekerjaan.",
    ctaLabel: "Selengkapnya",
  },
  en: {
    headerBadge: "Price Package",
    headerTitle: "Ready Mix Concrete Casting Service Price",
    colNo: "No", colKelas: "Class", colKegunaan: "Usage",
    colSlump: "Slump", colHarga: "Price / m³",
    mobileSlump: "Slump", mobileHarga: "Price / m³",
    footerNote: "Prices may change according to field conditions & work volume.",
    ctaLabel: "Learn More",
  },
};

// ─────────────────────────────────────────────
// DESKTOP TABLE (memoized)
// ─────────────────────────────────────────────
const DesktopTable = memo(function DesktopTable({ data, t, lang }) {
  return (
    <div className="hidden md:block overflow-x-auto">
      <table className="w-full text-[12px] border border-slate-200 border-collapse">
        <thead>
          <tr className="bg-slate-50 text-slate-600">
            <th className="px-3 py-2.5 text-center text-[10.5px] font-semibold tracking-wider uppercase border border-slate-200 w-[6%]">{t.colNo}</th>
            <th className="px-3 py-2.5 text-center text-[10.5px] font-semibold tracking-wider uppercase border border-slate-200 w-[22%]">{t.colKelas}</th>
            <th className="px-3 py-2.5 text-center text-[10.5px] font-semibold tracking-wider uppercase border border-slate-200 w-[40%]">{t.colKegunaan}</th>
            <th className="px-3 py-2.5 text-center text-[10.5px] font-semibold tracking-wider uppercase border border-slate-200 w-[14%]">{t.colSlump}</th>
            <th className="px-3 py-2.5 text-center text-[10.5px] font-semibold tracking-wider uppercase border border-slate-200 w-[18%]">{t.colHarga}</th>
          </tr>
        </thead>
        <tbody>
          {data.map((b, i) => (
            <tr key={b.no} className={`align-top ${i % 2 === 1 ? "bg-slate-50/40" : "bg-white"}`}>
              <td className="px-3 py-2.5 text-center text-slate-500 font-mono text-[11px] border border-slate-200">{b.no}</td>
              <td className="px-3 py-2.5 text-slate-800 font-semibold leading-snug border border-slate-200">{b.nama}</td>
              <td className="px-3 py-2.5 text-slate-600 leading-snug border border-slate-200">{pick(b.ket, lang)}</td>
              <td className="px-3 py-2.5 text-center text-slate-600 font-mono text-[11px] border border-slate-200">{b.slump || "—"}</td>
              <td className="px-3 py-2.5 text-center border border-slate-200">
                {b.harga ? (
                  <span className="text-slate-900 font-bold whitespace-nowrap">{b.harga}</span>
                ) : (
                  <span className="text-slate-300">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

// ─────────────────────────────────────────────
// MOBILE CARD (memoized)
// ─────────────────────────────────────────────
const MobileCard = memo(function MobileCard({ b, t, lang }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-start gap-2.5 min-w-0">
          <span className="shrink-0 w-6 h-6 rounded-md bg-[#1e88e5]/10 text-[#1e88e5] text-[10.5px] font-bold font-mono flex items-center justify-center">
            {b.no}
          </span>
          <h4 className="text-[13.5px] sm:text-[13px] font-bold text-slate-800 leading-snug">{b.nama}</h4>
        </div>
      </div>
      <p className="text-[12.5px] sm:text-[12px] text-slate-600 leading-relaxed mb-3 pl-[34px]">{pick(b.ket, lang)}</p>
      <div className="flex items-center justify-between gap-3 pl-[34px] pt-3 border-t border-slate-100">
        <div>
          <div className="text-[10.5px] sm:text-[9.5px] uppercase tracking-wider text-slate-400 font-semibold">{t.mobileSlump}</div>
          <div className="text-[12px] sm:text-[11.5px] text-slate-600 font-mono mt-0.5">{b.slump || "—"}</div>
        </div>
        <div className="text-right">
          <div className="text-[10.5px] sm:text-[9.5px] uppercase tracking-wider text-slate-400 font-semibold">{t.mobileHarga}</div>
          <div className="text-[14px] sm:text-[13px] font-bold text-slate-900 mt-0.5">
            {b.harga || <span className="text-slate-300">—</span>}
          </div>
        </div>
      </div>
    </div>
  );
});

const MobileCards = memo(function MobileCards({ data, t, lang }) {
  return (
    <div className="md:hidden space-y-3 sm:space-y-2.5">
      {data.map((b) => (<MobileCard key={b.no} b={b} t={t} lang={lang} />))}
    </div>
  );
});

// ─────────────────────────────────────────────
// PANEL
// ─────────────────────────────────────────────
export default function BetonPricingPanel({ hideCta = false }) {
  const { lang } = useLang();
  const t = content[lang] || content.id;
  const data = useMemo(() => betonData, []);

  return (
    <section
      className="w-full bg-white border border-slate-200 rounded-2xl overflow-hidden"
      aria-labelledby="beton-panel-title"
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
              id="beton-panel-title"
              className="text-slate-900 font-semibold leading-snug mt-1 uppercase"
              style={{ fontSize: "clamp(0.9rem, 2vw, 1rem)" }}
            >
              {t.headerTitle}
            </h3>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 sm:p-6">
        <DesktopTable data={data} t={t} lang={lang} />
        <MobileCards data={data} t={t} lang={lang} />
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
            href="/layanan/infrastruktur/cor-beton-ready-mix"
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