// src/components/Supplier.jsx
"use client";

import { memo, useMemo } from "react";
import Link from "next/link";
import { useLang } from "../context/LanguageContext";

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
      // ✅ DESAIN STATIS: Garis tegas (ring-2), tanpa animasi transisi.
      className="group relative flex items-center justify-between gap-3 sm:gap-4
                 bg-white rounded-2xl p-3.5 sm:p-4
                 ring-2 ring-slate-100 shadow-sm
                 hover:ring-[#1e88e5] hover:bg-slate-50
                 active:bg-slate-100"
    >
      <div className="flex items-center gap-3.5 sm:gap-4 min-w-0 flex-1">
        
        {/* Indikator Angka */}
        <span
          className="shrink-0 w-10 h-10 rounded-xl
                     bg-blue-50 text-[#1e88e5] border border-blue-100
                     font-bold font-mono text-sm sm:text-base
                     flex items-center justify-center
                     group-hover:bg-[#1e88e5] group-hover:text-white group-hover:border-[#1e88e5]"
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Teks Produk */}
        <div className="min-w-0 flex-1">
          <h2
            className="font-bold text-slate-800 leading-snug truncate
                       group-hover:text-[#1e88e5] text-sm sm:text-base"
          >
            {item.alt}
          </h2>
          <p className="text-slate-500 mt-0.5 truncate text-xs sm:text-sm group-hover:text-slate-700">
            {item.desc}
          </p>
        </div>
      </div>

      {/* Tombol Buka (Pill) */}
      <span
        className="shrink-0 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full
                   border-2 border-slate-200
                   font-bold uppercase tracking-wider text-[10px] sm:text-xs
                   text-slate-600 bg-white
                   group-hover:bg-[#1e88e5] group-hover:text-white group-hover:border-[#1e88e5]"
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
  const { lang } = useLang();
  const list = useMemo(() => products, []);

  return (
    <section className="relative bg-white pt-16 sm:pt-24 pb-20 sm:pb-28 overflow-hidden">
      
      {/* Ornamen background statis (tanpa animasi) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-50 rounded-full blur-3xl opacity-60"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 w-[500px] h-[500px] bg-amber-50 rounded-full blur-3xl opacity-50"
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ═══ HEADER ═══ */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="w-8 sm:w-12 h-px bg-[#1e88e5]" />
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#1e88e5] font-bold">
              Produk
            </span>
            <span className="w-8 sm:w-12 h-px bg-[#1e88e5]" />
          </div>

          <h1
            className="font-light tracking-tight text-slate-900 leading-[1.1] mb-5 sm:mb-6 text-balance max-w-3xl mx-auto"
            style={{ fontSize: "clamp(2rem, 6vw, 3.75rem)" }}
          >
            Supplier Material Konstruksi
            <span className="text-[#1e88e5]">.</span>
          </h1>

          <p
            className="max-w-2xl mx-auto text-slate-600 leading-[1.8]"
            style={{ fontSize: "clamp(0.875rem, 1.6vw, 1rem)" }}
          >
            {lang === "en"
              ? "We quote loose material deliveries in Greater Jakarta and surrounding industrial areas, including Cikarang and Karawang. Construction work focuses on Greater Jakarta and western West Java."
              : "Kami memasok material lepas melalui penawaran untuk Jabodetabek & Kawasan Industri Sekitarnya, termasuk Cikarang dan Karawang. Pengerjaan konstruksi berfokus di Jabodetabek dan Jawa Barat bagian barat."}
          </p>
        </div>

        {/* ═══ GRID PRODUK ═══ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {list.map((item, i) => (
            <ProductItem key={item.slug} item={item} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
