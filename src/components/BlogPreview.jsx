// src/components/BlogPreview.jsx
"use client";

import { useMemo, lazy, Suspense } from "react";
import Link from "next/link";
import { useLang } from "../context/LanguageContext";
import { articles } from "../data/articles";

const BlogCard = lazy(() => import("./BlogCard"));

function IconArrowRight({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
      strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

const content = {
  id: {
    kicker: "Beberapa Tips Untuk Anda",
    titleLight: "Blog",
    titleBold: "& Berita",
    buttonText: "Lihat Semua Artikel",
  },
  en: {
    kicker: "Some Tips For You",
    titleLight: "Blog",
    titleBold: "& News",
    buttonText: "View All Articles",
  },
};

// =========================================================================
// ⚠️ DI SINI ANDA MENGATUR 3 KARTU UNTUK BERANDA ⚠️
// Masukkan "slug" dari artikel yang ingin Anda tampilkan.
// Pastikan slug ini persis sama dengan yang ada di src/data/articles.js
// =========================================================================
const HOMEPAGE_SLUGS = [
  "aspal-jalan-murah",       // Kartu 1 (Kiri)
  "pemasangan-kansteen",  // Kartu 2 (Tengah) - Ganti dengan slug kanstin Anda
  "pemasangan-paving-block",
  "jasa-pengecoran-beton",  
  "pemasangan-tiang-pancang",
  "pemasangan-pagar-panel",  // Kartu 3 (Kanan) - Ganti dengan slug cor beton Anda
];

function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-200 overflow-hidden animate-pulse bg-white">
      <div className="aspect-[16/10] bg-slate-200" />
      <div className="p-5 space-y-3">
        <div className="h-3 w-1/3 bg-slate-200 rounded" />
        <div className="h-4 w-3/4 bg-slate-200 rounded" />
        <div className="h-3 w-full bg-slate-200 rounded" />
      </div>
    </div>
  );
}

export default function BlogPreview() {
  const { lang } = useLang();
  const data = content[lang] || content.id;

  // Logika mengambil artikel berdasarkan urutan HOMEPAGE_SLUGS di atas
  const previewArticles = useMemo(() => {
    return HOMEPAGE_SLUGS.map((slug) => {
      // Cari artikel yang slug-nya cocok
      return articles.find((article) => article.slug === slug);
    }).filter(Boolean); // filter(Boolean) untuk membuang data yang tidak ketemu (undefined)
  }, []);

  return (
    <section
      className="relative bg-white pt-10 sm:pt-12 lg:pt-14 pb-16 sm:pb-20 lg:pb-24"
      style={{ contain: "layout style" }}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
        <div className="text-center mb-10 sm:mb-14 lg:mb-20">
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7" style={{ contain: "layout paint style" }}>
          {previewArticles.map((item) => (
            <Suspense key={item.slug} fallback={<CardSkeleton />}>
              <BlogCard item={item} />
            </Suspense>
          ))}
        </div>

        <div className="text-center mt-12 sm:mt-16 lg:mt-20">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2.5 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-slate-900 hover:bg-[#1e88e5] text-white font-semibold text-[11px] sm:text-sm uppercase tracking-[0.15em] transition-colors duration-200"
          >
            <span>{data.buttonText}</span>
            <IconArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}