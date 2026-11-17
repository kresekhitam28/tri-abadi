// src/components/KanstinPricingPanel.jsx
"use client";

import { memo } from "react";
import Link from "next/link";
import { useLang } from "../context/LanguageContext";

const WA_NUMBER = "6282258089367";

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

function IconWhatsApp({ className = "w-3.5 h-3.5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
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
    accent: "#16a34a",
    sizes: [
      { dim: "40x20x10cm", harga: "17.000", isi: "2,5 Pcs" },
      { dim: "40x20x15x13cm", harga: "23.000", isi: "2,5 Pcs" },
    ],
  },
  {
    name: { id: "KANSTEEN TROTOAR", en: "SIDEWALK CURBSTONE" },
    key: "KANSTEEN TROTOAR",
    accent: "#3b82f6",
    sizes: [
      { dim: "40x25x16x13cm", harga: "27.000", isi: "2,5 Pcs" },
      { dim: "40x28x15x13cm", harga: "29.000", isi: "2,5 Pcs" },
    ],
  },
  {
    name: { id: "KANSTEEN DKI", en: "DKI CURBSTONE" },
    key: "KANSTEEN DKI",
    accent: "#e11d48",
    sizes: [
      { dim: "60x25x22x18cm", harga: "58.000", isi: "1,6 Pcs" },
      { dim: "60x30x25x20cm", harga: "62.000", isi: "1,6 Pcs" },
    ],
  },
  {
    name: { id: "KANSTEEN S", en: "S CURBSTONE" },
    key: "KANSTEEN S",
    accent: "#eab308",
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
    cardWaBtn: "Tanya Harga Ini",
    footerNote: "Harga dapat berubah sesuai kondisi lapangan & volume pekerjaan.",
    ctaLabel: "Selengkapnya",
  },
  en: {
    headerBadge: "Price Package",
    headerTitle: "Here is the calculation of service price and curbstone installation",
    cardWaBtn: "Ask for This Price",
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
      className="max-w-full max-h-full object-contain"
      onError={(e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = FALLBACK_IMG;
      }}
    />
  );
}

// ─────────────────────────────────────────────
// CARD KANSTIN (memoized)
// ─────────────────────────────────────────────
const KanstinCard = memo(function KanstinCard({ c, lang, btnLabel }) {
  const displayName = pick(c.name, lang);

  const waMsg =
    lang === "en"
      ? `Hello PT Tri Abadi Makmur, I am interested in ${displayName} curbstone. Could you provide an estimate and site survey schedule for my project at...`
      : `Halo PT Tri Abadi Makmur, saya tertarik dengan ${displayName}. Mohon info estimasi biaya & jadwal survey untuk lokasi di...`;

  const waHref = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMsg)}`;

  return (
    <article className="relative flex flex-col h-full overflow-hidden bg-white border border-slate-200 rounded-xl hover:border-slate-300 hover:shadow-md transition-all duration-200">
      {/* Aksen atas */}
      <span
        className="absolute top-0 left-0 right-0 h-[3px] z-10"
        style={{ backgroundColor: c.accent }}
        aria-hidden="true"
      />

      {/* Area gambar */}
      <div className="relative bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4 pt-5 pb-4 border-b border-slate-100">
        <div className="w-full h-[86px] flex items-center justify-center">
          <KanstinImage src={gambarMap[c.key]} alt={displayName} />
        </div>
      </div>

      {/* Konten */}
      <div className="flex flex-col flex-1 p-4">
        {/* Nama produk */}
        <div className="flex items-center gap-2 mb-3">
          <span
            className="w-2 h-2 rounded-full shrink-0"
            style={{ backgroundColor: c.accent }}
            aria-hidden="true"
          />
          <span className="text-[11px] font-bold tracking-[0.12em] text-slate-700 uppercase leading-tight">
            {displayName}
          </span>
        </div>

        {/* Daftar ukuran + harga */}
        <div className="space-y-1.5 flex-1">
          {c.sizes.map((s) => (
            <div
              key={s.dim}
              className="flex items-center justify-between gap-2 rounded-lg bg-slate-50/80 border border-slate-100 px-3 py-2"
            >
              <span className="text-[11.5px] font-semibold text-slate-700 leading-tight">
                {s.dim}
              </span>
              <div className="text-right shrink-0">
                <div className="text-[13px] font-extrabold leading-none tracking-tight text-slate-900">
                  <span className="text-[10px] font-medium text-slate-400 mr-0.5">Rp</span>
                  {s.harga}
                </div>
                <div className="text-[9.5px] text-slate-500 font-medium mt-1 leading-none">
                  {s.isi}<span className="text-slate-400"> /m1</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tombol WA per card */}
        <a
          href={waHref}
          target="_blank"
          rel="noreferrer"
          className="mt-3 w-full inline-flex items-center justify-center gap-2 px-3 py-2 min-h-[36px] rounded-lg bg-[#25D366]/10 text-[#128C7E] hover:bg-[#25D366] hover:text-white border border-[#25D366]/30 font-bold text-[11px] tracking-wide transition-colors duration-200"
        >
          <IconWhatsApp className="w-3.5 h-3.5 shrink-0" />
          {btnLabel}
        </a>
      </div>
    </article>
  );
});

// ─────────────────────────────────────────────
// PANEL
// ─────────────────────────────────────────────
export default function KanstinPricingPanel({ hideCta = false }) {
  const { lang } = useLang();
  const t = content[lang] || content.id;

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
              className="text-slate-900 font-semibold leading-snug mt-1"
              style={{ fontSize: "clamp(0.9rem, 2vw, 1rem)" }}
            >
              {t.headerTitle}
            </h3>
          </div>
        </div>
      </div>

      {/* Grid kartu */}
      <div className="p-4 sm:p-5 lg:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 items-stretch">
          {kanstinData.map((c) => (
            <KanstinCard key={c.key} c={c} lang={lang} btnLabel={t.cardWaBtn} />
          ))}
        </div>
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