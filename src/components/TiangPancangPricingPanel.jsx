// src/components/TiangPancangPricingPanel.jsx
"use client";

import { useState, useMemo, useCallback, memo } from "react";
import Link from "next/link";
import { useLang } from "../context/LanguageContext";

const WA_NUMBER = "6282258089367";

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
function IconCheck({ className = "w-3 h-3" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M5 12l5 5L20 7" />
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

// ─────────────────────────────────────────────
// KONTEN BILINGUAL
// ─────────────────────────────────────────────
const content = {
  id: {
    headerBadge1: "Paket Harga",
    headerBadge2: "Pasang Tiang Pancang",
    headerTitle: "Jasa pasang tiang pancang",
    headerSubtitle: "Harga borongan tiang pancang beton precast + alat berat",
    itemTitle: "Jasa Pasang Tiang Pancang",
    itemDesc: "Borongan bahan + tenaga + alat berat",
    priceTagLabel: "Harga Borongan",
    priceLabel: "Rp 280.000",
    priceUnit: "/ m¹",
    priceNote: "Per meter lari (m¹) — harga sudah termasuk bahan, tenaga, & operasional alat berat",
    includeLabel: "Sudah Termasuk",
    includeItems: [
      "Tiang pancang beton precast",
      "Tenaga kerja & pengawasan",
      "Alat berat (drop hammer / diesel hammer)",
    ],
    infoLabel: "Konsultasi & Survey",
    infoValue: "Gratis",
    infoNote: "Konsultasi teknis & survey lokasi gratis untuk wilayah Jabodetabek & sekitarnya.",
    footerNote: "Harga dapat menyesuaikan volume, kedalaman, & kondisi tanah di lapangan.",
    ctaLabel: "Selengkapnya",
    waBtn: "Konsultasi via WA",
    waText: "Halo PT Tri Abadi Makmur, saya mau tanya harga & konsultasi jasa pasang tiang pancang...",
  },
  en: {
    headerBadge1: "Price Package",
    headerBadge2: "Pile Installation",
    headerTitle: "Pile installation service",
    headerSubtitle: "Contract price for precast concrete pile + heavy equipment",
    itemTitle: "Precast Concrete Pile Installation",
    itemDesc: "Material + labor + heavy equipment contract price",
    priceTagLabel: "Contract Price",
    priceLabel: "Rp 280,000",
    priceUnit: "/ m¹",
    priceNote: "Per linear meter (m¹) — price already includes material, labor, & heavy equipment operation",
    includeLabel: "Includes",
    includeItems: [
      "Precast concrete pile",
      "Labor & supervision",
      "Heavy equipment (drop hammer / diesel hammer)",
    ],
    infoLabel: "Consultation & Survey",
    infoValue: "Free",
    infoNote: "Free technical consultation & site survey for Jabodetabek & surrounding areas.",
    footerNote: "Prices may adjust based on volume, depth, & field soil conditions.",
    ctaLabel: "Learn More",
    waBtn: "Consult via WA",
    waText: "Hello PT Tri Abadi Makmur, I would like to ask about pile installation price & consult...",
  },
};

// ─────────────────────────────────────────────
// ACCORDION ITEM (memoized)
// ─────────────────────────────────────────────
const AccordionItem = memo(function AccordionItem({
  item, index, isOpen, onToggle,
}) {
  return (
    <div>
      <button
        type="button"
        onClick={() => onToggle(index)}
        aria-expanded={isOpen}
        className={`w-full flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-3.5 sm:py-4 text-left transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-600
          ${isOpen ? "bg-indigo-600/[0.04]" : "hover:bg-slate-50"}`}
      >
        <span
          className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-150
            ${isOpen ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600"}`}
        >
          {isOpen ? <IconMinus className="w-3.5 h-3.5" /> : <IconPlus className="w-3.5 h-3.5" />}
        </span>

        <span className="flex-1 min-w-0">
          <span
            className={`block font-semibold leading-snug transition-colors duration-150
              ${isOpen ? "text-indigo-700" : "text-slate-800"}`}
            style={{ fontSize: "clamp(0.8125rem, 1.7vw, 0.84375rem)" }}
          >
            {item.title}
          </span>
          <span className="block text-[11px] sm:text-[11.5px] text-slate-400 mt-0.5">
            {item.desc}
          </span>
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
export default function TiangPancangPricingPanel({ hideCta = false }) {
  const { lang } = useLang();
  const t = content[lang] || content.id;

  const [open, setOpen] = useState(0);
  const toggle = useCallback((i) => {
    setOpen((prev) => (prev === i ? -1 : i));
  }, []);

  const items = useMemo(
    () => [
      {
        title: t.itemTitle,
        desc: t.itemDesc,
        content: (
          <div className="space-y-3 sm:space-y-4">
            {/* ── Hero price (indigo/industrial) ── */}
            <div className="relative overflow-hidden rounded-xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 via-slate-50 to-indigo-50 p-4 sm:p-5">
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" aria-hidden="true" />
                <span className="text-[10px] uppercase tracking-[0.15em] font-bold text-indigo-700">
                  {t.priceTagLabel}
                </span>
              </div>
              <div className="flex items-baseline gap-1 flex-wrap">
                <span
                  className="font-extrabold text-slate-900 tracking-tight leading-none"
                  style={{ fontSize: "clamp(1.75rem, 4vw, 2.25rem)" }}
                >
                  {t.priceLabel}
                </span>
                <span className="text-sm text-slate-500 font-medium">{t.priceUnit}</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
                {t.priceNote}
              </p>
            </div>

            {/* ── Feature cards ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Includes */}
              <div className="rounded-lg border border-slate-200 bg-white p-3">
                <div className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-2">
                  {t.includeLabel}
                </div>
                <ul className="space-y-1.5">
                  {t.includeItems.map((it, i) => (
                    <li key={i} className="flex items-start gap-2 text-[12px] text-slate-700">
                      <span className="mt-0.5 w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                        <IconCheck className="w-2.5 h-2.5" />
                      </span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Free survey */}
              <div className="rounded-lg border border-indigo-200 bg-indigo-50/60 p-3">
                <div className="text-[10px] uppercase tracking-wider font-bold text-indigo-700 mb-1">
                  {t.infoLabel}
                </div>
                <div className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-none">
                  {t.infoValue}
                </div>
                <p className="text-[10.5px] text-slate-500 mt-1.5 leading-snug">
                  {t.infoNote}
                </p>
              </div>
            </div>
          </div>
        ),
      },
    ],
    [t]
  );

  return (
    <section
      className="w-full bg-white border border-slate-200 rounded-2xl overflow-hidden"
      aria-labelledby="tiang-pancang-panel-title"
    >
      {/* Header */}
      <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-slate-200 bg-gradient-to-r from-indigo-50/50 to-white">
        <div className="flex items-start gap-3">
          <span
            className="mt-1 w-1 h-9 rounded-full bg-indigo-600 shrink-0"
            aria-hidden="true"
          />
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-[10px] sm:text-[10.5px] uppercase tracking-[0.18em] text-indigo-700 font-semibold mb-1">
              <span>{t.headerBadge1}</span>
              <IconChevron className="w-2.5 h-2.5" />
              <span>{t.headerBadge2}</span>
            </div>
            <h3
              id="tiang-pancang-panel-title"
              className="text-slate-900 font-semibold leading-snug"
              style={{ fontSize: "clamp(1rem, 2.2vw, 1.1875rem)" }}
            >
              {t.headerTitle}
            </h3>
            <p className="text-[11.5px] sm:text-[12px] text-slate-500 italic mt-1">
              {t.headerSubtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Accordion */}
      <div className="divide-y divide-slate-100">
        {items.map((it, i) => (
          <AccordionItem
            key={i}
            item={it}
            index={i}
            isOpen={open === i}
            onToggle={toggle}
          />
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
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0">
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(t.waText)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.waBtn}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] rounded-lg bg-[#25D366] text-white text-[12px] font-bold hover:bg-[#20bd5a] shadow-sm transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
            >
              <IconWhatsApp className="w-4 h-4 shrink-0" />
              {t.waBtn}
            </a>
            <Link
              href="/layanan/infrastruktur/pasang-tiang-pancang"
              aria-label={t.ctaLabel}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] rounded-lg bg-slate-900 text-white text-[12px] font-semibold hover:bg-indigo-600 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
            >
              {t.ctaLabel}
              <IconArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}