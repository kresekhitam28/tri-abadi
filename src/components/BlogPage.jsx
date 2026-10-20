// src/components/Blog.jsx
"use client";

import { useEffect, useMemo, lazy, Suspense } from "react";
import { useLang } from "../context/LanguageContext";
import { articles } from "../data/articles";

// Lazy-load BlogCard — hanya di-load saat benar-benar dirender
const BlogCard = lazy(() => import("./BlogCard"));

const content = {
  id: {
    kicker: "Beberapa Tips Untuk Anda",
    titleLight: "Blog",
    titleBold: "& Berita",
    description:
      "Tips, info, dan berita terbaru seputar konstruksi dan pengaspalan jalan dari tim kami.",
  },
  en: {
    kicker: "Some Tips For You",
    titleLight: "Blog",
    titleBold: "& News",
    description:
      "Tips, info, and the latest news about construction and road paving from our team.",
  },
};

function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-200 overflow-hidden
                    animate-pulse bg-white">
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

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const list = useMemo(() => articles, []);

  return (
    <section
      className="relative bg-white pt-24 sm:pt-28 lg:pt-36 pb-16 sm:pb-20 lg:pb-28"
      style={{ contain: "layout style" }}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">

        {/* ═══ HEADER ═══ */}
        <div className="text-center mb-10 sm:mb-14 lg:mb-20 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2.5 sm:gap-3 mb-4 sm:mb-5">
            <span className="w-6 sm:w-10 h-px bg-[#1e88e5]" />
            <span className="text-[10px] sm:text-xs uppercase
                             tracking-[0.25em] sm:tracking-[0.3em]
                             text-[#1e88e5] font-semibold">
              {data.kicker}
            </span>
            <span className="w-6 sm:w-10 h-px bg-[#1e88e5]" />
          </div>

          <h2
            className="font-light tracking-tight text-slate-900 leading-[1.05]"
            style={{ fontSize: "clamp(2rem, 6vw, 3.75rem)" }}
          >
            <span className="font-semibold">{data.titleLight}</span>{" "}
            {data.titleBold}
            <span className="text-[#1e88e5]">.</span>
          </h2>

          <p
            className="max-w-2xl mx-auto text-slate-600 leading-relaxed mt-5 sm:mt-6"
            style={{ fontSize: "clamp(0.875rem, 1.6vw, 1rem)" }}
          >
            {data.description}
          </p>
        </div>

        {/* ═══ GRID ARTIKEL ═══ */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
                     gap-5 sm:gap-6 lg:gap-7"
          style={{ contain: "layout paint style" }}
        >
          {list.map((item, i) => (
            <div
              key={item.slug}
              style={{
                contentVisibility: "auto",
                containIntrinsicSize: "400px",
              }}
            >
              <Suspense fallback={<CardSkeleton />}>
                <BlogCard item={item} />
              </Suspense>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}