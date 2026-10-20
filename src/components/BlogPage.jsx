// src/components/Blog.jsx
"use client";

import { useEffect, useMemo, lazy, Suspense, useState } from "react";
import { useLang } from "../context/LanguageContext";
import { articles } from "../data/articles";

const BlogCard = lazy(() => import("./BlogCard"));

const content = {
  id: {
    kicker: "Artikel & Berita",
    titleLight: "Semua",
    titleBold: "Artikel",
    description: "Kumpulan tips, info, dan berita terbaru seputar konstruksi dan pengaspalan.",
    empty: "Belum ada artikel.",
  },
  en: {
    kicker: "Articles & News",
    titleLight: "All",
    titleBold: "Articles",
    description: "Collection of the latest tips, info, and news about construction and paving.",
    empty: "No articles found yet.",
  },
};

const ARTICLES_PER_PAGE = 6; // Menampilkan 6 artikel per halaman

function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-200 overflow-hidden animate-pulse bg-white">
      <div className="aspect-[16/10] bg-slate-200" />
      <div className="p-5 space-y-3">
        <div className="h-3 w-1/3 bg-slate-200 rounded" />
        <div className="h-4 w-3/4 bg-slate-200 rounded" />
        <div className="h-3 w-full bg-slate-200 rounded" />
        <div className="h-3 w-2/3 bg-slate-200 rounded" />
      </div>
    </div>
  );
}

export default function Blog() {
  const { lang } = useLang();
  const data = content[lang] || content.id;

  // State halaman aktif (0 = Halaman 1, 1 = Halaman 2, dst)
  const [activePage, setActivePage] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [activePage]);

  // Hitung total halaman berdasarkan jumlah artikel
  const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE);

  // Potong array artikel sesuai halaman yang aktif
  const currentArticles = useMemo(() => {
    const start = activePage * ARTICLES_PER_PAGE;
    const end = start + ARTICLES_PER_PAGE;
    return articles.slice(start, end);
  }, [activePage]);

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

          <h2 className="font-light tracking-tight text-slate-900 leading-[1.05]" style={{ fontSize: "clamp(2rem, 6vw, 3.75rem)" }}>
            <span className="font-semibold">{data.titleLight}</span>{" "}
            {data.titleBold}
            <span className="text-[#1e88e5]">.</span>
          </h2>

          <p className="max-w-2xl mx-auto text-slate-600 leading-relaxed mt-5 sm:mt-6" style={{ fontSize: "clamp(0.875rem, 1.6vw, 1rem)" }}>
            {data.description}
          </p>
        </div>

        {/* ═══ GRID ARTIKEL ═══ */}
        {currentArticles.length > 0 ? (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7"
            style={{ contain: "layout paint style" }}
          >
            {currentArticles.map((item) => (
              <div
                key={item.slug}
                style={{ contentVisibility: "auto", containIntrinsicSize: "400px" }}
              >
                <Suspense fallback={<CardSkeleton />}>
                  <BlogCard item={item} />
                </Suspense>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-50 rounded-2xl border border-slate-100">
            <p className="text-slate-500">{data.empty}</p>
          </div>
        )}

        {/* ═══ NAVIGASI ANGKA 1, 2, 3... ═══ */}
        {totalPages > 1 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mt-12 sm:mt-16">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setActivePage(index)}
                className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-semibold transition-all duration-200
                  ${activePage === index 
                    ? "bg-[#1e88e5] text-white shadow-md shadow-[#1e88e5]/30 scale-110" 
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}