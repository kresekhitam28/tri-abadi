// src/components/Supplier.jsx
"use client";

import { memo, useMemo } from "react";
import Link from "next/link";

// ─────────────────────────────────────────────
// DATA PRODUK
// ─────────────────────────────────────────────
const products = [
  { alt: "Abu Batu",     desc: "Material pengisi & paving",    slug: "abu-batu" },
  { alt: "Base Course",  desc: "Material lapis pondasi jalan", slug: "base-course" },
  { alt: "Batu Kali",    desc: "Material pondasi & bronjong",  slug: "batu-kali" },
  { alt: "Batu Makadam", desc: "Material perkerasan jalan",    slug: "batu-makadam" },
  { alt: "Batu Split",   desc: "Material konstruksi 1-2 cm",   slug: "batu-split" },
  { alt: "Kerikil",      desc: "Material cor beton",           slug: "kerikil" },
  { alt: "Pasir Beton",  desc: "Pasir halus untuk cor",        slug: "pasir-beton" },
  { alt: "Pasir Pasang", desc: "Pasir untuk pasang & plester", slug: "pasir-pasang" },
  { alt: "Sirtu",        desc: "Material urugan jalan",        slug: "sirtu" },
  { alt: "Tanah Urug",   desc: "Material pengurugan lahan",    slug: "tanah-urug" },
];

// ─────────────────────────────────────────────
// PRODUCT ITEM (memoized)
// ─────────────────────────────────────────────
const ProductItem = memo(function ProductItem({ item, index }) {
  return (
    <Link
      href={`/supplier/${item.slug}`}
      className="group relative flex items-center justify-between gap-3 sm:gap-4
                 bg-white border border-slate-200 rounded-xl
                 px-4 sm:px-5 py-3.5 sm:py-4
                 hover:border-[#1e88e5] hover:bg-slate-50/60
                 active:bg-slate-50
                 transition-colors duration-150"
      style={{
        contain: "layout paint style",
        contentVisibility: "auto",
        containIntrinsicSize: "70px",
      }}
    >
      <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
        <span
          className="shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-lg
                     bg-[#1e88e5]/10 text-[#1e88e5]
                     font-bold font-mono
                     flex items-center justify-center"
          style={{ fontSize: "clamp(0.6875rem, 1.3vw, 0.75rem)" }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="min-w-0 flex-1">
          <h3
            className="font-semibold text-slate-900 leading-snug truncate"
            style={{ fontSize: "clamp(0.875rem, 1.8vw, 0.90625rem)" }}
          >
            {item.alt}
          </h3>
          <p
            className="text-slate-500 mt-0.5 truncate"
            style={{ fontSize: "clamp(0.71875rem, 1.4vw, 0.75rem)" }}
          >
            {item.desc}
          </p>
        </div>
      </div>

      <span
        className="shrink-0 px-2.5 sm:px-3 py-1.5 rounded-lg
                   border border-slate-300
                   font-bold uppercase tracking-[0.12em] sm:tracking-[0.15em]
                   text-slate-600 bg-white
                   group-hover:bg-[#1e88e5] group-hover:text-white
                   group-hover:border-[#1e88e5]
                   transition-colors duration-150"
        style={{ fontSize: "clamp(0.625rem, 1.2vw, 0.65625rem)" }}
      >
        Buka
      </span>
    </Link>
  );
});

// ─────────────────────────────────────────────
// SUPPLIER
// ─────────────────────────────────────────────
export default function Supplier() {
  const list = useMemo(() => products, []);

  return (
    <section
      className="bg-white pt-10 sm:pt-12 lg:pt-16 pb-16 sm:pb-20 lg:pb-28"
      style={{ contain: "layout style" }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-5 lg:px-8">

        <div className="text-center mb-10 sm:mb-14 lg:mb-20">
          <div className="inline-flex items-center gap-3 mb-4 sm:mb-6">
            <span className="w-6 sm:w-8 h-px bg-[#1e88e5]" />
            <span className="text-[10px] sm:text-xs uppercase
                             tracking-[0.25em] sm:tracking-[0.3em]
                             text-[#1e88e5] font-semibold">
              Produk
            </span>
            <span className="w-6 sm:w-8 h-px bg-[#1e88e5]" />
          </div>

          <h2
            className="font-light tracking-tight text-slate-900 leading-[1.05] mb-5 sm:mb-6"
            style={{ fontSize: "clamp(2rem, 6vw, 3.75rem)" }}
          >
            Supplier
            <span className="text-[#1e88e5]">.</span>
          </h2>

          <p
            className="max-w-2xl mx-auto text-slate-600 leading-relaxed"
            style={{ fontSize: "clamp(0.875rem, 1.6vw, 1rem)" }}
          >
            Kami menyediakan berbagai material konstruksi berkualitas —
            dari batu split hingga pasir beton, siap antar ke lokasi proyek
            Anda di seluruh Indonesia.
          </p>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3"
          style={{ contain: "layout paint style" }}
        >
          {list.map((item, i) => (
            <ProductItem key={item.slug} item={item} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}