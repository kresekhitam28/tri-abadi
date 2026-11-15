// src/components/BetonPricingPanel.jsx
"use client";

import { memo, useMemo } from "react";
import { useLang } from "../context/LanguageContext";

// ─── HELPER: pick bilingual ─────────────────
const pick = (field, lang) => {
  if (!field) return "";
  if (typeof field === "string") return field;
  return field[lang] || field.id || field.en || "";
};

// ─── IKON ────────────────────────────────────
function IconWhatsApp({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

// ─── DATA BETON (bilingual) ──────────────────
const betonData = [
  { no: 1, nama: "Klas A ( K 500 )", ket: { id: "Beton untuk precast / prestressed", en: "Concrete for precast / prestressed" }, harga: null, slump: "12 ± 2 cm" },
  { no: 2, nama: "Klas P ( K 400 )", ket: { id: "Beton untuk rabat jalan klas 1 (jl negara / jl tol)", en: "Concrete for class 1 road slab (national road / toll road)" }, harga: "Rp 1.200.000", slump: "12 ± 2 cm" },
  { no: 3, nama: "Klas B ( K 375 )", ket: { id: "Beton untuk lantai dan bangunan pabrik / rigid jalan", en: "Concrete for floors and factory buildings / rigid pavement" }, harga: "Rp 1.050.000", slump: "12 ± 2 cm" },
  { no: 4, nama: "Klas B ( K 350 )", ket: { id: "Beton untuk lantai dan bangunan pabrik / rigid jalan", en: "Concrete for floors and factory buildings / rigid pavement" }, harga: "Rp 1.000.000", slump: "12 ± 2 cm" },
  { no: 5, nama: "Klas K 325", ket: { id: "Beton untuk konstruksi bangunan ruko / rumah bertingkat 3 lantai s/d 5 lantai", en: "Concrete for shophouse construction / 3 to 5 story houses" }, harga: "Rp 950.000", slump: "12 ± 2 cm" },
  { no: 6, nama: "Klas K 300", ket: { id: "Beton untuk konstruksi bangunan ruko / rumah bertingkat 3 lantai s/d 5 lantai", en: "Concrete for shophouse construction / 3 to 5 story houses" }, harga: "Rp 920.000", slump: "12 ± 2 cm" },
  { no: 7, nama: "Klas K 275", ket: { id: "Konstruksi bangunan bertingkat dua lantai, ruko / rumah tinggal / standar", en: "Two-story building construction, shophouse / residential / standard" }, harga: "Rp 880.000", slump: "12 ± 2 cm" },
  { no: 8, nama: "Klas K 250", ket: { id: "Konstruksi bangunan bertingkat dua lantai, ruko / rumah tinggal / standar", en: "Two-story building construction, shophouse / residential / standard" }, harga: "Rp 850.000", slump: "12 ± 2 cm" },
  { no: 9, nama: "Klas K 225 (mobil standar)", ket: { id: "Konstruksi bangunan bertingkat dua lantai, ruko / rumah tinggal", en: "Two-story building construction, shophouse / residential" }, harga: "Rp 830.000", slump: "12 ± 2 cm" },
  { no: 10, nama: "Klas K 225 (MINI MIX / mobil kecil)", ket: { id: "Konstruksi bangunan bertingkat dua lantai, ruko / rumah tinggal (akses jalan sempit)", en: "Two-story building construction, shophouse / residential (narrow access)" }, harga: "Rp 1.290.000", slump: "12 ± 2 cm" },
  { no: 11, nama: "Klas D ( K 175 )", ket: { id: "Konstruksi bangunan ringan", en: "Lightweight building construction" }, harga: null, slump: "12 ± 2 cm" },
  { no: 12, nama: "Klas E ( K 125 )", ket: { id: "Konstruksi LC / lantai dasar", en: "LC construction / ground floor" }, harga: null, slump: "12 ± 2 cm" },
  { no: 13, nama: "Klas B0", ket: { id: "Konstruksi LC / lantai dasar", en: "LC construction / ground floor" }, harga: null, slump: "12 ± 2 cm" },
];

// ─── KONTEN BILINGUAL ────────────────────────
const content = {
  id: {
    headerBadge: "Paket Harga",
    headerTitle: "Harga Jasa Cor Beton Ready Mix (Jabodetabek, Banten & Jawa Barat)",
    colNo: "No", colKelas: "Kelas", colKegunaan: "Kegunaan",
    colSlump: "Slump", colHarga: "Harga / m³",
    mobileSlump: "Slump", mobileHarga: "Harga / m³",
    priceOnCall: "Hubungi Kami",
    footerNote: "Harga dapat berubah sesuai jarak batching plant, kondisi akses lokasi & volume (m³).",
    ctaLabel: "Tanya Harga & Jadwal Cor via WA",
    ctaWaMessage: "Halo Tri Abadi Makmur, saya tertarik dengan paket Cor Beton Ready Mix. Boleh minta info harga & jadwal pengiriman ke lokasi saya?",
  },
  en: {
    headerBadge: "Price Package",
    headerTitle: "Ready Mix Concrete Casting Price (Jabodetabek, Banten & West Java)",
    colNo: "No", colKelas: "Class", colKegunaan: "Usage",
    colSlump: "Slump", colHarga: "Price / m³",
    mobileSlump: "Slump", mobileHarga: "Price / m³",
    priceOnCall: "Contact Us",
    footerNote: "Prices may vary depending on batching plant distance, site access & volume (m³).",
    ctaLabel: "Ask Price & Schedule via WA",
    ctaWaMessage: "Hello Tri Abadi Makmur, I am interested in your Ready-Mix Concrete package. Could you share the pricing and delivery schedule for my site?",
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
                  <span className="text-[11px] font-medium text-[#1e88e5] whitespace-nowrap">{t.priceOnCall}</span>
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
            {b.harga || <span className="text-[12px] font-semibold text-[#1e88e5]">{t.priceOnCall}</span>}
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
      className="w-full bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm"
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
          <a
            href={`https://wa.me/6282258089367?text=${encodeURIComponent(t.ctaWaMessage)}`}
            target="_blank"
            rel="noreferrer"
            aria-label={t.ctaLabel}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 sm:py-2.5 min-h-[44px] sm:min-h-0 rounded-xl shrink-0 bg-[#25D366] text-white hover:bg-[#20bd5a] text-[12.5px] font-bold shadow-md shadow-[#25D366]/20 hover:shadow-[#25D366]/40 hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
          >
            <IconWhatsApp className="w-4 h-4 shrink-0" />
            {t.ctaLabel}
          </a>
        )}
      </div>
    </section>
  );
}