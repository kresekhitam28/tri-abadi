"use client";

import Link from "next/link";
import { useLang } from "../context/LanguageContext";
import BlogCard from "./BlogCard";
import FloatingWA from "./FloatingWA";

const content = {
  id: {
    kicker: "Artikel & Berita",
    titleLight: "Semua",
    titleBold: "Artikel",
    description:
      "Temukan panduan biaya, tips teknis, dan berita terbaru seputar konstruksi jalan, pengaspalan hotmix, paving block, dan perbaikan jalan dari PT Tri Abadi Makmur untuk area Jabodetabek, Banten & Jawa Barat.",
    empty: "Belum ada artikel.",
    pageLabel: "Halaman",
    navigationLabel: "Navigasi halaman artikel",
  },
  en: {
    kicker: "Articles & News",
    titleLight: "All",
    titleBold: "Articles",
    description:
      "Find pricing guides, technical tips, and the latest news about road construction, hotmix asphalt paving, paving blocks, and road repair from PT Tri Abadi Makmur for Greater Jakarta, Banten & West Java.",
    empty: "No articles found yet.",
    pageLabel: "Page",
    navigationLabel: "Article pages",
  },
};

export default function Blog({ items, page, pageLinks }) {
  const { lang } = useLang();
  const data = content[lang] || content.id;

  return (
    <section
      className="relative bg-white pt-24 sm:pt-28 lg:pt-36 pb-16 sm:pb-20 lg:pb-28 min-h-[80vh]"
      style={{ contain: "layout style" }}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
        {/* ═══ HEADER ═══ */}
        <div className="text-center mb-8 sm:mb-12 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2.5 sm:gap-3 mb-4 sm:mb-5">
            <span className="w-6 sm:w-10 h-px bg-[#1e88e5]" />
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#1e88e5] font-semibold">
              {data.kicker}
            </span>
            <span className="w-6 sm:w-10 h-px bg-[#1e88e5]" />
          </div>

          <h1
            className="font-light tracking-tight text-slate-900 leading-[1.05]"
            style={{ fontSize: "clamp(2rem, 6vw, 3.75rem)" }}
          >
            <span className="font-semibold">{data.titleLight}</span>{" "}
            {data.titleBold}
            {page > 1 && ` – ${data.pageLabel} ${page}`}
            <span className="text-[#1e88e5]">.</span>
          </h1>

          <p
            className="max-w-2xl mx-auto text-slate-600 leading-relaxed mt-5 sm:mt-6"
            style={{ fontSize: "clamp(0.875rem, 1.6vw, 1rem)" }}
          >
            {data.description}
          </p>
          <div className="mt-4 sm:hidden">
            <FloatingWA inline />
          </div>
        </div>

        {/* ═══ GRID ARTIKEL ═══ */}
        {items.length > 0 ? (
          <div
            className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3 lg:gap-7"
            style={{ contain: "layout paint style" }}
          >
            {items.map((item) => (
              <div
                key={item.slug}
                className="[content-visibility:auto] [contain-intrinsic-size:auto_12rem] sm:[contain-intrinsic-size:400px]"
              >
                <BlogCard item={item} heading="h2" compactMobile fullCardLink thumbnailSrcSet={item.thumbnailSrcSet} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-50 rounded-2xl border border-slate-100">
            <p className="text-slate-500">{data.empty}</p>
          </div>
        )}

        {/* ═══ NAVIGASI ANGKA 1, 2, 3... ═══ */}
        {pageLinks.length > 1 && (
          <nav
            aria-label={data.navigationLabel}
            className="mt-8 flex flex-wrap items-center justify-center gap-2 max-sm:mx-auto max-sm:max-w-[calc(100%_-_5.5rem)] sm:mt-16"
          >
            {pageLinks.map((href, index) => (
              <Link
                key={href}
                href={href}
                aria-label={`${data.pageLabel} ${index + 1}`}
                aria-current={page === index + 1 ? "page" : undefined}
                className={`flex size-11 items-center justify-center rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 max-sm:scroll-mb-20
                  ${
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
    </section>
  );
}
