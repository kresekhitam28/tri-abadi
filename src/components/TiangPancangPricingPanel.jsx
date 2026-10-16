// src/components/TiangPancangPricingPanel.jsx
"use client";

import { useState, useMemo, useCallback, memo } from "react";
import Link from "next/link";
import { useLang } from "../context/LanguageContext";

// ─────────────────────────────────────────────
// IKON
// ─────────────────────────────────────────────
function IconPlus({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4}
      strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}
function IconMinus({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4}
      strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 12h14" />
    </svg>
  );
}
function IconArrowRight({ className = "w-3.5 h-3.5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
function IconChevron({ className = "w-3 h-3" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4}
      strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9 18l6-6-6-6" />
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
    headerSubtitle: "Spesifikasi harga jasa pasang tiang pancang",
    itemTitle: "Jasa Pasang Tiang Pancang",
    itemDesc: "Harga borongan tenaga pasang",
    rowLabel: "Pasang tiang pancang",
    rowLabelHint: "(per meter lari)",
    rowPrice: "Rp 280.000",
    rowUnit: "/m¹",
    note1: "Harga borongan tenaga + alat",
    note2: "Harga sudah Termasuk Bahan & Jasa Pasang",
    footerNote: "Harga dapat berubah sesuai kondisi lapangan & volume pekerjaan.",
    ctaLabel: "Selengkapnya",
  },
  en: {
    headerBadge1: "Price Package",
    headerBadge2: "Pile Installation",
    headerTitle: "Pile installation service",
    headerSubtitle: "Price specification for pile installation service",
    itemTitle: "Pile Installation Service",
    itemDesc: "Contract labor installation price",
    rowLabel: "Pile installation",
    rowLabelHint: "(per linear meter)",
    rowPrice: "Rp 280.000",
    rowUnit: "/m¹",
    note1: "Contract price for labor + equipment",
    note2: "Price already includes Material & Installation Service",
    footerNote: "Prices may change according to field conditions & work volume.",
    ctaLabel: "Learn More",
  },
};

// ─────────────────────────────────────────────
// ACCORDION ITEM (memoized)
// ─────────────────────────────────────────────
const AccordionItem = memo(function AccordionItem({
  item, index, isOpen, onToggle,
}) {
  return (
    <div style={{ contain: "layout paint style" }}>
      <button
        type="button"
        onClick={() => onToggle(index)}
        aria-expanded={isOpen}
        className={`w-full flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-3.5 sm:py-4
                    text-left transition-colors duration-150
                    ${isOpen ? "bg-[#1e88e5]/[0.03]" : "hover:bg-slate-50"}`}
      >
        <span
          className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center
                      transition-colors duration-150
                      ${isOpen ? "bg-[#1e88e5] text-white" : "bg-slate-100 text-slate-600"}`}
        >
          {isOpen ? <IconMinus className="w-3.5 h-3.5" /> : <IconPlus className="w-3.5 h-3.5" />}
        </span>

        <span className="flex-1 min-w-0">
          <span
            className={`block font-semibold leading-snug transition-colors duration-150
                        ${isOpen ? "text-[#1e88e5]" : "text-slate-800"}`}
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
        <div className="px-4 sm:px-6 pb-5 sm:pb-6 pl-[60px] sm:pl-[72px]">
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
          <div className="space-y-3">
            <div className="rounded-lg border border-slate-200 divide-y divide-dashed divide-slate-200">
              <div className="flex items-center justify-between gap-3 px-4 py-3">
                <span className="text-[12.5px] text-slate-700">
                  {t.rowLabel}{" "}
                  <span className="text-slate-400">{t.rowLabelHint}</span>
                </span>
                <span className="text-[13px] font-semibold text-slate-900 whitespace-nowrap">
                  {t.rowPrice}
                  <span className="text-[11px] text-slate-500">{t.rowUnit}</span>
                </span>
              </div>
            </div>
            <ul className="space-y-1 text-[11px] text-slate-500">
              <li className="flex gap-2">
                <span className="text-slate-300">•</span>
                {t.note1}
              </li>
              <li className="flex gap-2">
                <span className="text-slate-300">•</span>
                {t.note2}
              </li>
            </ul>
          </div>
        ),
      },
    ],
    [t]
  );

  return (
    <div
      className="w-full bg-white border border-slate-200 rounded-2xl overflow-hidden"
      style={{ contain: "layout paint style" }}
    >
      <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-slate-200
                      bg-gradient-to-r from-slate-50 to-white">
        <div className="flex items-start gap-3">
          <span className="mt-1.5 w-1 h-10 rounded-full bg-[#1e88e5] shrink-0" />
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em]
                            text-[#1e88e5] font-semibold mb-1">
              <span>{t.headerBadge1}</span>
              <IconChevron className="w-2.5 h-2.5" />
              <span>{t.headerBadge2}</span>
            </div>
            <h3
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
            href="/layanan/infrastruktur/pasang-tiang-pancang"
            aria-label={t.ctaLabel}
            className="inline-flex items-center justify-center gap-2
                       px-4 py-2 rounded-lg shrink-0
                       bg-slate-900 text-white text-[12px] font-semibold
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