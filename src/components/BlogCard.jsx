// src/components/BlogCard.jsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLang } from "../context/LanguageContext";

const pick = (field, lang) => {
  if (!field) return "";
  if (typeof field === "string") return field;
  return field[lang] || field.id || field.en || "";
};

const formatDate = (iso, lang) => {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString(
      lang === "en" ? "en-US" : "id-ID",
      { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }
    );
  } catch {
    return iso;
  }
};

export default function BlogCard({
  item,
  heading: Heading = "h3",
  compactMobile = false,
  fullCardLink = false,
  thumbnailSrcSet,
  thumbnailSizes = "calc((100vw - 44px) / 2)",
}) {
  const { lang } = useLang();
  const [imgError, setImgError] = useState(false);

  // Reset fallback kalau src / thumbnail berubah (misal rerender dengan item berbeda)
  useEffect(() => {
    setImgError(false);
  }, [item?.src, thumbnailSrcSet]);

  if (!item) return null;

  const title = pick(item.title, lang);
  const illustration = pick(item.illustration, lang);
  const desc = pick(item.desc, lang);
  const category = pick(item.category, lang);
  const alt = illustration || title;
  const dateText = formatDate(item.dateISO, lang);
  const readMore = lang === "en" ? "Read Article" : "Baca Artikel";
  const href = `/blog/${item.slug}`;

  // Saat fullCardLink: overlay di judul jadi satu-satunya tab stop.
  // Media & "Baca Artikel" jadi non-link (tidak menggandakan tab stop).
  const MediaWrapper = fullCardLink ? "div" : Link;
  const mediaWrapperProps = fullCardLink ? {} : { href };
  const ReadMoreTag = fullCardLink ? "span" : Link;
  const readMoreProps = fullCardLink ? {} : { href };

  const imageClassName = illustration
    ? `object-scale-down p-4 ${compactMobile ? "max-sm:p-2" : ""}`
    : "object-cover motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:scale-[1.03]";

  return (
    <article
      className={`group h-full flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden transition-colors duration-200 hover:border-[#1e88e5]/50 ${fullCardLink ? "relative" : ""}`}
      style={{ contain: "layout paint style" }}
    >
      {/* FOTO */}
      <MediaWrapper
        {...mediaWrapperProps}
        className={`relative block aspect-[16/10] w-full shrink-0 overflow-hidden focus-visible:z-10 focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-blue-700 ${illustration ? "bg-white" : "bg-slate-100"} ${compactMobile ? "max-sm:aspect-[4/3]" : ""}`}
      >
        {imgError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-100 px-3 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
            PT Tri Abadi Makmur
          </div>
        ) : (
          <picture>
            {thumbnailSrcSet && (
              <source
                media="(max-width: 639px)"
                srcSet={thumbnailSrcSet}
                sizes={thumbnailSizes}
              />
            )}
            <Image
              src={item.src}
              alt={alt}
              fill
              loading="lazy"
              sizes="(max-width: 639px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className={imageClassName}
              onError={() => setImgError(true)}
            />
          </picture>
        )}
      </MediaWrapper>

      <div className={`flex flex-1 flex-col px-4 pt-4 sm:px-5 sm:pt-5 ${compactMobile ? "max-sm:px-2.5 max-sm:pt-2.5" : ""}`}>
        {/* KATEGORI + TANGGAL */}
        {(category || dateText) && (
          <div className={`flex items-center justify-between gap-2 ${compactMobile ? "mb-1.5 sm:mb-2" : "mb-2"}`}>
            {category ? (
              <span
                className={`inline-block rounded-md bg-[#1e88e5]/10 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#1565c0] ${compactMobile ? "max-sm:px-1.5 max-sm:py-0.5 max-sm:text-[10px]" : ""}`}
              >
                {category}
              </span>
            ) : (
              <span />
            )}
            {dateText && (
              <time
                dateTime={item.dateISO}
                className={`shrink-0 text-[11px] text-slate-500 ${compactMobile ? "max-sm:hidden" : ""}`}
              >
                {dateText}
              </time>
            )}
          </div>
        )}

        <Heading
          className={`text-[clamp(1rem,2vw,1.25rem)] font-semibold leading-snug tracking-tight text-slate-900 line-clamp-3 ${compactMobile ? "max-sm:text-sm" : ""}`}
        >
          <Link
            href={href}
            className={`rounded-sm transition-colors hover:text-[#1565c0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${fullCardLink ? "after:absolute after:inset-0 after:content-['']" : ""}`}
          >
            {title}
          </Link>
        </Heading>

        {desc && (
          <p
            className={`mt-2 mb-4 line-clamp-3 leading-relaxed text-slate-600 ${compactMobile ? "max-sm:hidden" : ""}`}
            style={{ fontSize: "clamp(0.8125rem, 1.5vw, 0.84375rem)" }}
          >
            {desc}
          </p>
        )}

        {/* TOMBOL BACA */}
        <div className="mt-auto border-t border-slate-100">
          <ReadMoreTag
            {...readMoreProps}
            className={`inline-flex min-h-11 items-center gap-2 rounded-sm text-sm font-semibold text-[#1565c0] transition-colors hover:text-[#0d47a1] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${compactMobile ? "max-sm:gap-1 max-sm:text-xs" : ""}`}
          >
            {readMore}
            <span
              aria-hidden="true"
              className="motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-1"
            >
              →
            </span>
          </ReadMoreTag>
        </div>
      </div>
    </article>
  );
}