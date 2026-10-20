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

export default function BlogCard({ item }) {
  const { lang } = useLang();

  if (!item) return null;

  const title = pick(item.title, lang);
  const desc = pick(item.desc, lang);
  const readMore = lang === "en" ? "Read More" : "Baca Selengkapnya";
  const href = `/blog/${item.slug}`;

  return (
    <article
      className="group h-full flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden
                 transition-colors duration-200
                 hover:border-[#1e88e5]/50"
      style={{ contain: "layout paint style" }}
    >
      {/* FOTO */}
      <Link
        href={href}
        className="relative block w-full bg-slate-100 shrink-0
                   aspect-[16/10] overflow-hidden"
        aria-label={title}
      >
        <Image
          src={item.src}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover
                     transition-transform duration-300 ease-out
                     group-hover:scale-[1.03]"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src =
              "https://placehold.co/800x500/f1f5f9/94a3b8?text=Blog";
          }}
        />
      </Link>

      <div className="flex flex-col flex-1 p-5 sm:p-6">
        <h3
          className="font-semibold text-slate-900 leading-snug tracking-tight
                     line-clamp-2"
          style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)" }}
        >
          <Link href={href} className="hover:text-[#1e88e5] transition-colors duration-150">
            {title}
          </Link>
        </h3>

        <p
          className="mt-2.5 sm:mt-3 text-slate-600 leading-relaxed flex-1
                     line-clamp-3"
          style={{ fontSize: "clamp(0.8125rem, 1.5vw, 0.84375rem)" }}
        >
          {desc}
        </p>

        <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-slate-100">
          <Link
            href={href}
            className="inline-flex items-center gap-2
                       text-[10.5px] sm:text-[11.5px]
                       font-semibold uppercase tracking-[0.14em] sm:tracking-[0.16em]
                       text-slate-700 hover:text-[#1e88e5]
                       transition-colors duration-150"
          >
            {readMore}
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}