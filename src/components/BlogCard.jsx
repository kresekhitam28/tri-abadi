// src/components/BlogCard.jsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useLang } from "../context/LanguageContext";

const pick = (field, lang) => {
  if (!field) return "";
  if (typeof field === "string") return field;
  return field[lang] || field.id || field.en || "";
};

export default function BlogCard({ item, heading: Heading = "h3", compactMobile = false, fullCardLink = false, thumbnailSrcSet }) {
  const { lang } = useLang();

  if (!item) return null;

  const title = pick(item.title, lang);
  const illustration = pick(item.illustration, lang);
  const desc = pick(item.desc, lang);
  const category = pick(item.category, lang); // <-- Ambil data kategori
  const readMore = lang === "en" ? "Read Article" : "Baca Artikel";
  const href = `/blog/${item.slug}`;
  const image = (
    <Image
      src={item.src}
      alt={illustration || title}
      fill
      loading="lazy"
      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
      className={illustration ? `object-scale-down p-4 ${compactMobile ? "max-sm:p-2" : ""}` : "object-cover motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:scale-[1.03]"}
      onError={(e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = "https://placehold.co/800x500/f1f5f9/94a3b8?text=Blog";
      }}
    />
  );

  return (
    <article
      className={`group h-full flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden
                 transition-colors duration-200
                 hover:border-[#1e88e5]/50 ${fullCardLink ? "relative" : ""}`}
      style={{ contain: "layout paint style" }}
    >
      {/* FOTO */}
      <Link
        href={href}
        className={`relative block aspect-[16/10] w-full shrink-0 overflow-hidden focus-visible:z-10 focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-blue-700 ${illustration ? "bg-white" : "bg-slate-100"} ${compactMobile ? "max-sm:aspect-[4/3]" : ""}`}
        aria-label={title}
      >
        {thumbnailSrcSet ? (
          <picture>
            <source media="(max-width: 639px)" srcSet={thumbnailSrcSet} sizes="calc((100vw - 44px) / 2)" />
            {image}
          </picture>
        ) : image}
      </Link>

      <div className={`flex flex-1 flex-col px-4 pt-4 sm:px-5 sm:pt-5 ${compactMobile ? "max-sm:px-2.5 max-sm:pt-2.5" : ""}`}>
        
        {/* KATEGORI (BARU) */}
        {category && (
          <div className={compactMobile ? "mb-1.5 sm:mb-2" : "mb-2"}>
            <span className={`inline-block rounded-md bg-blue-50 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-blue-800 ${compactMobile ? "max-sm:px-1.5 max-sm:py-0.5 max-sm:text-[10px]" : ""}`}>
              {category}
            </span>
          </div>
        )}

        <Heading
          className={`text-[clamp(1rem,2vw,1.25rem)] font-semibold leading-snug tracking-tight text-slate-900 ${compactMobile ? "max-sm:mb-2 max-sm:line-clamp-3 max-sm:text-sm" : ""}`}
        >
          <Link href={href} className={`rounded-sm transition-colors hover:text-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${fullCardLink ? "after:absolute after:inset-0 after:content-['']" : ""}`}>
            {title}
          </Link>
        </Heading>

        <p
          className={`mt-2 mb-4 line-clamp-3 leading-relaxed text-slate-600 ${compactMobile ? "max-sm:hidden" : ""}`}
          style={{ fontSize: "clamp(0.8125rem, 1.5vw, 0.84375rem)" }}
        >
          {desc}
        </p>

        {/* TOMBOL BACA (DIPERBARUI) */}
        <div className="mt-auto border-t border-slate-100">
          <Link
            href={href}
            className={`inline-flex min-h-11 items-center gap-2 rounded-sm text-sm font-semibold text-blue-800 transition-colors hover:text-blue-950 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${compactMobile ? "max-sm:gap-1 max-sm:text-xs" : ""}`}
          >
            {readMore}
            <span
              aria-hidden="true"
              className="motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}
