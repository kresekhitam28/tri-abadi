// src/components/BlogPreview.jsx
"use client";

import Link from "next/link";
import { useLang } from "../context/LanguageContext";
import BlogCard from "./BlogCard";

// ─────────────────────────────────────────────
// HELPER: bangun srcSet thumbnail dari variants
// Aman kalau src/variants tidak lengkap, hasil "" kalau tidak valid.
// ─────────────────────────────────────────────
function getThumbnailSrcSet(src, variants) {
  if (typeof src !== "string" || !/\.webp$/i.test(src)) return "";
  if (!variants || typeof variants !== "object") return "";

  const imageBase = src.replace(/\.webp$/i, "");
  const parts = [320, 640]
    .map((size) => {
      const thumbSrc = `${imageBase}-${size}.webp`;
      const filename = thumbSrc.split("/").pop();
      const width = variants[filename];
      return typeof width === "number" && width > 0
        ? `${thumbSrc} ${width}w`
        : null;
    })
    .filter(Boolean);

  return parts.join(", ");
}

// ─────────────────────────────────────────────
// IKON
// ─────────────────────────────────────────────
function IconArrowRight({ className = "w-4 h-4" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
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

export default function BlogPreview({ items = [], variants = {}, limit = 6 }) {
  const { lang } = useLang();
  const data = content[lang] || content.id;

  const visibleItems = items.slice(0, limit);

  // Sembunyikan section sepenuhnya kalau belum ada artikel,
  // supaya homepage tidak menampilkan blok kosong.
  if (visibleItems.length === 0) return null;

  return (
    <section
      aria-labelledby="blog-preview-heading"
      className="relative bg-white pt-10 sm:pt-12 lg:pt-14 pb-16 sm:pb-20 lg:pb-24"
      style={{ contain: "layout style" }}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
        <div className="mx-auto mb-6 max-w-3xl text-center sm:mb-14 lg:mb-20">
          <div className="inline-flex items-center gap-2.5 sm:gap-3 mb-4 sm:mb-5">
            <span className="w-6 sm:w-10 h-px bg-[#1e88e5]" aria-hidden="true" />
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#1e88e5] font-semibold">
              {data.kicker}
            </span>
            <span className="w-6 sm:w-10 h-px bg-[#1e88e5]" aria-hidden="true" />
          </div>

          <h2
            id="blog-preview-heading"
            className="font-light tracking-tight text-slate-900 leading-[1.05]"
            style={{ fontSize: "clamp(2rem, 6vw, 3.75rem)" }}
          >
            <span className="font-semibold">{data.titleLight}</span>{" "}
            {data.titleBold}
            <span className="text-[#1e88e5]">.</span>
          </h2>
        </div>

        <div
          className="grid grid-cols-2 gap-3 max-sm:auto-rows-fr sm:gap-6 lg:grid-cols-3 lg:gap-7"
          style={{ contain: "layout paint style" }}
        >
          {visibleItems.map((item) => (
            <BlogCard
              key={item.slug}
              item={item}
              compactMobile
              fullCardLink
              thumbnailSrcSet={getThumbnailSrcSet(item.src, variants)}
            />
          ))}
        </div>

        <div className="mt-7 text-center sm:mt-16 lg:mt-20">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2.5 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-slate-900 hover:bg-[#1e88e5] text-white font-semibold text-[11px] sm:text-sm uppercase tracking-[0.15em] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          >
            <span>{data.buttonText}</span>
            <IconArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}