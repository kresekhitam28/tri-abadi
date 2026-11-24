"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useLang } from "../context/LanguageContext";
import FloatingWA from "./FloatingWA";

const content = {
  id: {
    kicker: "Artikel & Berita",
    titleLight: "Semua",
    titleBold: "Artikel",
    description:
      "Temukan panduan biaya, tips teknis, dan berita terbaru seputar konstruksi jalan, pengaspalan hotmix, paving block, dan perbaikan jalan dari PT Tri Abadi Makmur untuk area Jabodetabek, Banten & Jawa Barat.",
    empty: "Belum ada artikel.",
    emptySearch: "Artikel tidak ditemukan.",
    searchPlaceholder: "Cari artikel...",
    pageLabel: "Halaman",
    navigationLabel: "Navigasi halaman artikel",
    breaking: "Terkini",
    latest: "Artikel Terbaru",
    popular: "Terpopuler",
    searchResult: "Hasil Pencarian",
    categoryFallback: "Artikel",
    justNow: "Baru saja",
    minutesAgo: "menit lalu",
    hoursAgo: "jam lalu",
    yesterday: "Kemarin",
    daysAgo: "hari lalu",
  },
  en: {
    kicker: "Articles & News",
    titleLight: "All",
    titleBold: "Articles",
    description:
      "Find pricing guides, technical tips, and the latest news about road construction, hotmix asphalt paving, paving blocks, and road repair from PT Tri Abadi Makmur for Greater Jakarta, Banten & West Java.",
    empty: "No articles found yet.",
    emptySearch: "No articles found.",
    searchPlaceholder: "Search articles...",
    pageLabel: "Page",
    navigationLabel: "Article pages",
    breaking: "Latest",
    latest: "Latest Articles",
    popular: "Most Popular",
    searchResult: "Search Results",
    categoryFallback: "Article",
    justNow: "Just now",
    minutesAgo: "min ago",
    hoursAgo: "hr ago",
    yesterday: "Yesterday",
    daysAgo: "days ago",
  },
};

function getLocalized(value, lang) {
  if (!value) return "";
  if (typeof value === "string") return value;
  return value[lang] || value.id || value.en || "";
}

function formatDate(item, lang) {
  if (item?.dateISO) {
    const d = new Date(item.dateISO);
    if (!Number.isNaN(d.getTime())) {
      const months_id = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
      const months_en = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const m = (lang === "id" ? months_id : months_en)[d.getMonth()];
      return `${d.getDate()} ${m} ${d.getFullYear()}`;
    }
  }
  if (item?.date) return getLocalized(item.date, lang);
  return "";
}

function formatRelative(item, lang, data) {
  if (!item?.dateISO) return formatDate(item, lang);
  const d = new Date(item.dateISO);
  if (Number.isNaN(d.getTime())) return formatDate(item, lang);
  const diffMin = Math.floor((Date.now() - d.getTime()) / 60000);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffMin < 1) return data.justNow;
  if (diffMin < 60) return `${diffMin} ${data.minutesAgo}`;
  if (diffHour < 24) return `${diffHour} ${data.hoursAgo}`;
  if (diffDay === 1) return data.yesterday;
  if (diffDay < 7) return `${diffDay} ${data.daysAgo}`;
  return formatDate(item, lang);
}

function imageOf(item) {
  // Fallback ke gambar placeholder jika tidak ada gambar
  return item?.src || item?.thumbnail || item?.image || "https://placehold.co/600x400/f1f5f9/94a3b8?text=No+Image";
}

export default function Blog({ items, page, pageLinks }) {
  const { lang } = useLang();
  const data = content[lang] || content.id;
  
  const [rawSearchQuery, setRawSearchQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // State yang di-debounce
  const [isTickerPaused, setIsTickerPaused] = useState(false);

  // Efek Debounce: Menunda update searchQuery selama 300ms setelah user berhenti mengetik
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(rawSearchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [rawSearchQuery]);

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return items;
    
    const query = searchQuery.toLowerCase();
    return items.filter((item) => {
      const title = getLocalized(item.title, lang).toLowerCase();
      const desc = getLocalized(item.desc, lang).toLowerCase();
      return title.includes(query) || desc.includes(query);
    });
  }, [items, lang, searchQuery]);

  const rest = filteredItems;
  const tickerItems = items.slice(0, 4);
  const popularItems = items.slice(0, 5);

  return (
    <section
      className="relative bg-white pb-16 sm:pb-20 lg:pb-28 min-h-[80vh]"
      style={{ contain: "layout style" }}
    >
      {/* Keyframes untuk ticker berjalan */}
      <style>{`
        @keyframes tam-ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .tam-ticker-track { animation: none !important; }
        }
      `}</style>

      <div className="pt-20 sm:pt-24 lg:pt-32">
        {/* ═══ BREAKING TICKER ═══ */}
        {tickerItems.length > 0 && (
          <div className="border-y border-slate-200 bg-slate-50">
            <div className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-8">
              <div className="flex items-center gap-3 py-2.5">
                <span className="shrink-0 inline-flex items-center gap-1.5 rounded-sm bg-red-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                  <span className="size-1.5 animate-pulse rounded-full bg-white" />
                  {data.breaking}
                </span>
                
                {/* Area Ticker: Pause on Hover & Keyboard Focus */}
                <div 
                  className="relative flex-1 overflow-hidden"
                  onMouseEnter={() => setIsTickerPaused(true)}
                  onMouseLeave={() => setIsTickerPaused(false)}
                  onFocus={() => setIsTickerPaused(true)}
                  onBlur={() => setIsTickerPaused(false)}
                >
                  <div
                    className="tam-ticker-track flex w-max gap-8 whitespace-nowrap"
                    style={{ 
                      animation: "tam-ticker 40s linear infinite",
                      animationPlayState: isTickerPaused ? "paused" : "running"
                    }}
                  >
                    {[...tickerItems, ...tickerItems].map((item, i) => (
                      <Link
                        key={`${item.slug}-${i}`}
                        href={`/blog/${item.slug}`}
                        className="text-sm text-slate-700 transition-colors hover:text-[#1e88e5]"
                      >
                        <span className="mr-2 text-red-600">•</span>
                        {getLocalized(item.title, lang)}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-8">
          {/* ═══ MASTHEAD ═══ */}
          <div className="py-8 sm:py-10 lg:py-12">
            <div className="flex items-center gap-2 mb-2">
              <span className="size-1.5 rounded-full bg-[#1e88e5]" />
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#1e88e5] font-bold">
                {data.kicker}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-[1.05]">
              {data.titleLight}{" "}
              <span className="text-[#1e88e5]">{data.titleBold}</span>
              {page > 1 && !searchQuery && (
                <span className="text-slate-400"> — {data.pageLabel} {page}</span>
              )}
            </h1>
            
            {/* Deskripsi dan Search Bar */}
            <div className="mt-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <p className="max-w-2xl text-sm sm:text-base text-slate-600 leading-relaxed">
                {data.description}
              </p>
              
              <div className="relative w-full sm:w-[300px] shrink-0">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder={data.searchPlaceholder}
                  value={rawSearchQuery}
                  onChange={(e) => setRawSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 pl-9 pr-10 py-2.5 text-sm text-slate-800 outline-none transition-colors focus:border-[#1e88e5] focus:ring-1 focus:ring-[#1e88e5]"
                />
                {/* Tombol Clear Pencarian */}
                {rawSearchQuery && (
                  <button
                    onClick={() => setRawSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                    aria-label="Hapus pencarian"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            <div className="mt-4 sm:hidden">
              <FloatingWA inline />
            </div>
          </div>

          {/* ═══ 2 KOLOM: MAIN + SIDEBAR ═══ */}
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12">
            {/* MAIN */}
            <div>
              {rest.length === 0 ? (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 py-16 text-center">
                  <p className="text-slate-500">
                    {rawSearchQuery ? data.emptySearch : data.empty}
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-5 flex items-center gap-3">
                    <span className="block h-4 w-1 rounded-full bg-[#1e88e5]" />
                    <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-900">
                      {rawSearchQuery ? data.searchResult : data.latest}
                    </h2>
                    <div className="h-px flex-1 bg-slate-200" />
                  </div>
                  <div className="divide-y divide-slate-200">
                    {rest.map((item) => (
                      <NewsRow
                        key={item.slug}
                        item={item}
                        lang={lang}
                        data={data}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* SIDEBAR */}
            {popularItems.length > 0 && (
              <aside className="space-y-6">
                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                  <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
                    <span className="size-2 rounded-full bg-red-600" />
                    <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-900">
                      {data.popular}
                    </h2>
                  </div>
                  <ol className="mt-4 space-y-4">
                    {popularItems.map((item, i) => (
                      <li key={item.slug}>
                        <Link
                          href={`/blog/${item.slug}`}
                          className="group flex gap-3"
                        >
                          <span className="shrink-0 text-2xl font-black leading-none text-slate-300 transition-colors group-hover:text-[#1e88e5] tabular-nums">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <div className="min-w-0 flex-1">
                            <h3 className="text-sm font-semibold leading-snug text-slate-800 line-clamp-2 transition-colors group-hover:text-[#1e88e5]">
                              {getLocalized(item.title, lang)}
                            </h3>
                            <div className="mt-1 text-[11px] text-slate-400">
                              {formatRelative(item, lang, data)}
                            </div>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ol>
                </div>
              </aside>
            )}
          </div>

          {/* ═══ PAGINASI ═══ */}
          {/* Sembunyikan paginasi saat sedang mencari */}
          {!rawSearchQuery && pageLinks.length > 1 && (
            <nav
              aria-label={data.navigationLabel}
              className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:mt-16"
            >
              {pageLinks.map((href, index) => (
                <Link
                  key={href}
                  href={href}
                  aria-label={`${data.pageLabel} ${index + 1}`}
                  aria-current={page === index + 1 ? "page" : undefined}
                  className={`flex size-11 items-center justify-center rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${
                    page === index + 1
                      ? "bg-blue-700 text-white shadow-md shadow-blue-700/30"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {index + 1}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </div>
    </section>
  );
}

function NewsRow({ item, lang, data }) {
  return (
    <article className="group py-5 sm:py-6">
      <Link href={`/blog/${item.slug}`} className="flex gap-4 sm:gap-5">
        <div className="shrink-0 overflow-hidden rounded-lg bg-slate-100 w-24 h-24 sm:w-40 sm:h-28 relative">
          <img
            src={imageOf(item)}
            alt={getLocalized(item.title, lang)}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="min-w-0 flex-1">
          <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-[#1e88e5]">
            {getLocalized(item.category, lang) || data.categoryFallback}
          </span>
          <h3 className="mt-1 text-sm sm:text-base font-bold leading-snug text-slate-900 line-clamp-2 transition-colors group-hover:text-[#1e88e5]">
            {getLocalized(item.title, lang)}
          </h3>
          <p className="mt-1.5 hidden text-xs text-slate-500 leading-relaxed line-clamp-2 sm:block">
            {getLocalized(item.desc, lang)}
          </p>
          <div className="mt-2 flex items-center gap-2 text-[11px] text-slate-400">
            <time dateTime={item.dateISO}>
              {formatRelative(item, lang, data)}
            </time>
            <span>•</span>
            <span>{formatDate(item, lang)}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}