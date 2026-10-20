// src/components/BlogPreview.jsx
"use client";

import { useMemo, lazy, Suspense } from "react";
import Link from "next/link";
import { useLang } from "../context/LanguageContext";
import { articles } from "../data/articles";

// Lazy-load BlogCard → code-splitting (konsisten dengan Blog.jsx)
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

// Skeleton tipis untuk lazy BlogCard
function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-200 overflow-hidden
                    animate-pulse bg-white shadow-sm">
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

  // Memoize 3 artikel pertama
  const previewArticles = useMemo(() => articles.slice(0, 3), []);

  return (
    <section
      className="relative bg-white pt-10 sm:pt-12 lg:pt-14 pb-16 sm:pb-20 lg:pb-24 overflow-hidden"
      style={{ contain: "layout style" }}
    >
      {/* Background decoration */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #1e88e5 1px, transparent 0)",
          backgroundSize: "32px 32px",
          maskImage:
            "radial-gradient(ellipse 70% 50% at 50% 30%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 50% at 50% 30%, black 30%, transparent 100%)",
        }}
      />
      <div className="absolute top-10 -left-40 w-[500px] h-[500px] rounded-full
                      bg-[#1e88e5]/[0.04] blur-3xl pointer-events-none"
           aria-hidden="true" />
      <div className="absolute bottom-0 -right-40 w-[400px] h-[400px] rounded-full
                      bg-[#1e88e5]/[0.03] blur-3xl pointer-events-none"
           aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">

        {/* ═══ HEADER ═══ */}
        <div className="text-center mb-10 sm:mb-14 lg:mb-20">
          <div className="inline-flex items-center gap-2.5 sm:gap-3 mb-4 sm:mb-5">
            <span className="w-6 sm:w-12 h-px bg-gradient-to-r from-transparent to-[#1e88e5]" />
            <span className="text-[10px] sm:text-xs uppercase
                             tracking-[0.25em] sm:tracking-[0.3em]
                             text-[#1e88e5] font-semibold">
              {data.kicker}
            </span>
            <span className="w-6 sm:w-12 h-px bg-gradient-to-l from-transparent to-[#1e88e5]" />
          </div>

          <h2
            className="font-light tracking-tight text-slate-900 leading-[1.05]"
            style={{ fontSize: "clamp(2rem, 6vw, 3.75rem)" }}
          >
            <span
              className="font-semibold
                         bg-gradient-to-r from-slate-900 to-[#1e88e5]
                         bg-clip-text text-transparent"
            >
              {data.titleLight}
            </span>{" "}
            {data.titleBold}
            <span className="text-[#1e88e5]">.</span>
          </h2>
        </div>

        {/* ═══ GRID ═══ */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
                     gap-5 sm:gap-6 lg:gap-7"
          style={{ contain: "layout paint style" }}
        >
          {previewArticles.map((item) => (
            <Suspense key={item.slug} fallback={<CardSkeleton />}>
              <BlogCard item={item} />
            </Suspense>
          ))}
        </div>

        {/* ═══ CTA ═══ */}
        <div className="text-center mt-12 sm:mt-16 lg:mt-20">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2.5 sm:gap-3
                       px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl
                       bg-[#1e88e5] hover:bg-[#1976d2]
                       text-white font-semibold
                       text-[11px] sm:text-sm uppercase tracking-[0.15em]
                       shadow-lg shadow-[#1e88e5]/25
                       hover:shadow-xl hover:shadow-[#1e88e5]/40
                       hover:-translate-y-0.5
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e88e5]
                       focus-visible:ring-offset-2
                       transition-all duration-300"
          >
            <span>{data.buttonText}</span>
            <IconArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4
                                       transition-transform duration-200
                                       group-hover:translate-x-1" />
          </Link>
        </div>

      </div>
    </section>
  );
}