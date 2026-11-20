// src/components/TandemRoller.jsx
"use client";

import { useState, useCallback, useMemo, memo } from "react";
import Image from "next/image";
import { useLang } from "../context/LanguageContext";
import Reveal from "./Reveal";

// ─────────────────────────────────────────────
// IKON
// ─────────────────────────────────────────────
function IconWhatsApp({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}
function IconArrowRight({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}
function IconChevron({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}
function IconInfo({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </svg>
  );
}

const BODY_FONT = { fontSize: "clamp(0.875rem, 1.5vw, 0.9375rem)" };
const BODY_CLASS = "text-slate-700 leading-[1.9]";

// ─────────────────────────────────────────────
// ACCORDION — WAI-ARIA + animated grid-rows
// ─────────────────────────────────────────────
const Accordion = memo(function Accordion({
  id, index, number, title, isOpen, onToggle, children,
}) {
  const buttonId = `tandem-btn-${id}`;
  const panelId = `tandem-panel-${id}`;

  return (
    <div
      className={`group relative rounded-2xl border-2 mb-3 overflow-hidden bg-white
                  transition-all duration-300
                  ${isOpen
                    ? "border-[#1e88e5] shadow-lg shadow-[#1e88e5]/10"
                    : "border-slate-200 hover:border-slate-300 hover:shadow-md hover:shadow-slate-200/60"}`}
    >
      <h3 className="m-0 p-0 text-base font-normal leading-normal">
        <button
          id={buttonId}
          type="button"
          onClick={() => onToggle(index)}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="w-full flex items-center gap-3 sm:gap-4
                     px-4 sm:px-5 py-4 sm:py-5
                     text-left cursor-pointer
                     focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-700"
        >
          <span
            aria-hidden="true"
            className={`shrink-0 flex items-center justify-center
                        w-10 h-10 sm:w-11 sm:h-11 rounded-xl
                        text-xs sm:text-sm font-bold tracking-wider
                        transition-all duration-300
                        ${isOpen
                          ? "bg-[#1e88e5] text-white shadow-md shadow-[#1e88e5]/30 scale-105"
                          : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"}`}
          >
            {number}
          </span>

          <span
            className={`flex-1 font-semibold leading-snug
                        text-sm sm:text-base
                        transition-colors duration-200
                        ${isOpen ? "text-[#1e88e5]" : "text-slate-800"}`}
          >
            {title}
          </span>

          <span
            aria-hidden="true"
            className={`shrink-0 flex items-center justify-center w-8 h-8 rounded-full
                        transition-all duration-300
                        ${isOpen
                          ? "bg-[#1e88e5]/10 text-[#1e88e5] rotate-180"
                          : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"}`}
          >
            <IconChevron className="w-4 h-4" />
          </span>
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        aria-hidden={!isOpen}
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div
            className="px-4 sm:px-6 pb-5 sm:pb-6 pt-3
                       text-slate-700 leading-[1.85]
                       border-t border-slate-100
                       ml-4 sm:ml-6 mr-4 sm:mr-6 mb-4"
            style={BODY_FONT}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
});

// ─────────────────────────────────────────────
// RENDER CONTENT — parser numbered list + warning box
// ─────────────────────────────────────────────
const RenderContent = memo(function RenderContent({ text }) {
  const parsed = useMemo(() => {
    if (!text) return null;
    const lines = text.split("\n");
    const items = [];
    let currentItem = null;
    let beforeItems = [];
    let afterItems = [];
    let inAfter = false;

    lines.forEach((line) => {
      const match = line.match(/^(\d+)\.\s+(.+)$/);
      if (match) {
        if (currentItem) items.push(currentItem);
        currentItem = { number: match[1], title: match[2], desc: [] };
        inAfter = false;
      } else if (currentItem && !inAfter) {
        if (line.trim() === "") inAfter = true;
        else currentItem.desc.push(line);
      } else if (inAfter) {
        if (line.trim() !== "") afterItems.push(line);
      } else {
        if (line.trim() !== "") beforeItems.push(line);
      }
    });
    if (currentItem) items.push(currentItem);

    return { items, beforeItems, afterItems };
  }, [text]);

  if (!text || !parsed) return null;
  const { items, beforeItems, afterItems } = parsed;

  if (items.length === 0) {
    return (
      <p className="text-slate-700 leading-[1.85] whitespace-pre-line" style={BODY_FONT}>
        {text}
      </p>
    );
  }

  return (
    <div className="text-slate-700 leading-[1.85]" style={BODY_FONT}>
      {beforeItems.length > 0 && <p className="mb-4">{beforeItems.join(" ")}</p>}
      <div className="space-y-3 sm:space-y-4">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2">
            <span className="shrink-0 w-5 text-[#1e88e5] font-semibold">{item.number}.</span>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-slate-800">{item.title}</div>
              {item.desc.length > 0 && (
                <div className="text-slate-600 mt-0.5 space-y-1">
                  {item.desc.map((d, j) => (<p key={j}>{d}</p>))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {afterItems.length > 0 && (
        <div className="mt-4 space-y-2">
          {afterItems.map((item, i) => {
            const isWarning = /^(Perhatian|Caution|Warning|Penting|Important)\s*:/i.test(item);
            if (isWarning) {
              return (
                <div
                  key={i}
                  role="note"
                  className="rounded-lg bg-amber-50 border-l-4 border-amber-500
                             px-3.5 py-2.5 text-amber-900 text-[0.8125rem] leading-[1.7] font-medium"
                >
                  {item}
                </div>
              );
            }
            return <p key={i}>{item}</p>;
          })}
        </div>
      )}
    </div>
  );
});

// ─────────────────────────────────────────────
// DATA BILINGUAL
// (subtitle H1 TIDAK diubah · intro diperkaya · fragment dikonsolidasi)
// ─────────────────────────────────────────────
const data = {
  id: {
    title: "Tandem Roller",
    subtitle: "Menyewakan Alat Berat Tandem Roller Termurah di Indonesia",
    thumbImage: "/proyek/proyek-48.webp",
    sectionWhat: "Mengenal Tandem Roller",

    sectionGuide: "Panduan Tandem Roller",
    sectionGuideTitle1: "Panduan ",
    sectionGuideTitle2: "Tandem Roller",
    sectionGuideTitle3: " untuk Pengaspalan Jalan",

    // ✅ Intro diperkaya — 3 paragraf padat (~150 kata)
    intro: [
      "Tandem roller adalah alat berat pemadat yang menggunakan dua drum baja silindris (tandem) sebagai roda gilas, berfungsi memadatkan lapisan aspal, agregat, atau tanah agar permukaan menjadi rata, padat, dan tahan lama. Konfigurasi dua drum ini menghasilkan tekanan merata di seluruh permukaan jalan.",
      "Dengan bobot operasional umumnya 8–14 ton, tandem roller menjadi tulang punggung pekerjaan pengaspalan jalan raya, jembatan, area parkir, landasan pacu, hingga jalan lingkungan perumahan. Getaran (vibratory) dan beban statis drumnya menghasilkan kepadatan maksimal pada campuran aspal hot mix yang baru dihampar.",
      "Di industri konstruksi, tandem roller bersaing dengan three-wheel roller dan pneumatic-tired roller, namun unggul pada hasil akhir yang lebih halus dan seragam — menjadikannya pilihan utama untuk penggilasan akhir (finishing) aspal beton. PT Tri Abadi Makmur menyediakan sewa tandem roller terawat beserta operator berpengalaman untuk proyek di seluruh Indonesia.",
    ],

    // ✅ Callout pembuka — grammar diperbaiki, dijadikan 1 paragraf padu
    afterIntro: [
      "Dalam praktik konstruksi, tandem roller berperan vital pada tahap finishing pengaspalan — menghasilkan permukaan jalan yang rata, padat, dan siap dilalui kendaraan. Untuk informasi spesifikasi dan jenisnya lebih lengkap, berikut ulasan kami.",
    ],

    accordionItems: [
      {
        title: "Pengertian dan Fungsi",
        paragraphs: [
          // ✅ Konsolidasi 8 fragment → 3 paragraf utuh
          "Pada pekerjaan konstruksi skala kecil, pemadatan tanah kadang dilakukan dengan menyemprotkan air ke permukaan — membiarkan air meresap dan memadatkan tanah secara alami. Namun metode ini memakan waktu lama dan hasilnya kurang maksimal. Diperlukan alat pemadat efektif seperti tandem roller untuk mendapatkan kepadatan sesuai spesifikasi teknis.",
          "Tandem roller berfungsi memadatkan timbunan tanah atau lapisan aspal yang akan diratakan. Prinsip kerjanya adalah memanfaatkan berat drum baja dan getaran mekanis untuk memaksa partikel material saling mendekat, mengurangi rongga udara, dan meningkatkan daya dukung permukaan.",
          "Selain tandem roller, terdapat beberapa alat pemadat lain yang memiliki fungsi serupa: tamping roller (untuk tanah kohesif), compactor (untuk area terbatas), dan pneumatic-tired roller (untuk aspal dan granular). Masing-masing punya keunggulan spesifik — tandem roller unggul untuk finishing aspal karena menghasilkan permukaan paling halus dan seragam.",
        ],
      },
      {
        title: "Jenis Tandem Roller",
        paragraphs: [
          // ✅ Diperkaya — sebelumnya hanya kalimat pengantar menggantung
          "Secara umum, tandem roller dibagi menjadi dua jenis berdasarkan susunan roda gilasnya: two axle tandem roller dan three axle tandem roller. Perbedaan utama terletak pada jumlah as (axle) dan aplikasi pekerjaannya di lapangan.",
          "Two axle tandem roller memiliki 2 as dan cocok untuk penggilasan akhir (finishing) aspal beton — menghasilkan lintasan merata dengan bobot 8–14 ton. Three axle tandem roller memiliki konfigurasi 3 as yang memberikan tekanan lebih besar per satuan luas — cocok untuk pekerjaan berat seperti landasan pacu pesawat dan pondasi jalan. Detail masing-masing jenis dijelaskan pada poin berikutnya.",
        ],
      },
      {
        title: "Two Axle Tandem Roller",
        paragraphs: [
          // ✅ Konsolidasi 5 fragment → 2 paragraf utuh
          "Two axle tandem roller dilengkapi dua as roda gilas yang memberikan lintasan sama pada setiap roda, sehingga hasil gilasan sangat merata. Bobot operasionalnya berkisar 8–14 ton — cukup untuk memadatkan aspal beton pada pekerjaan jalan raya standar.",
          "Alat ini paling sering digunakan untuk penggilasan akhir (finishing) agar permukaan aspal rata dan halus. Drum dapat diisi air (ballast) untuk menambah bobot 25–60%, memungkinkan operator menyesuaikan tekanan sesuai kebutuhan kepadatan di lapangan.",
        ],
      },
      {
        title: "Three Axle Tandem Roller",
        paragraphs: [
          // ✅ Konsolidasi 8 fragment → 3 paragraf utuh
          "Three axle tandem roller pada dasarnya sama dengan two axle, namun memiliki tiga as yang memberikan tekanan lebih besar per satuan luas — dirancang khusus untuk pekerjaan berat seperti landasan pacu pesawat, pondasi jalan tol, dan pemadatan lapisan base course.",
          "Konfigurasi tiga as ini sering dilengkapi walking beam — roda depan tambahan yang dipasang pada perpanjangan over head frame. Walking beam dapat bergerak naik-turun mengikuti kontur permukaan jalan, sehingga tekanan per satuan lebar drum tetap stabil meski medan tidak rata.",
          "Sistem penguncian (locking) pada walking beam memungkinkan operator mengunci pergerakannya saat dibutuhkan — misalnya untuk pemadatan titik tertentu atau saat mengerjakan permukaan yang sudah rata. Kemampuan ini membuat three axle tandem roller lebih fleksibel di kondisi medan beragam.",
        ],
      },
    ],

    // ✅ Penutup — konsolidasi 10 fragment → 4 paragraf rapi
    penutup: [
      "Itulah ulasan lengkap mengenai tandem roller yang kami gunakan dan sewakan di PT Tri Abadi Makmur. Selain tandem roller, kami juga mengoperasikan berbagai alat berat lain seperti dozer, excavator, dan self loader — semuanya terawat dan bersertifikat untuk memastikan hasil konstruksi yang optimal, tepat waktu, dan tepat spesifikasi. Dengan demikian, Anda tidak perlu ragu menggunakan jasa kami.",
      "Selain pengaspalan, kami juga melayani perbaikan jalan aspal, penetrasi aspal, dan berbagai pekerjaan konstruksi lain. Pelayanan yang kami tawarkan mencakup:",
      "1. Pemasangan paving block\n2. Pemasangan kansteen taman\n3. Kansteen trotoar\n4. Pemasangan grass block\n5. Cor beton ready hot mix, dan lain-lain.",
      "Untuk informasi lebih lanjut dan pemesanan, hubungi kontak kami yang tertera di website, atau langsung chat melalui WhatsApp untuk konsultasi gratis.",
    ],

    ctaBadge: "Konsultasi Gratis",
    ctaTitle1: "Butuh sewa Tandem Roller? ",
    ctaTitle2: "Kami siap membantu.",
    ctaButton: "Hubungi via WhatsApp",
    ctaWaText: "Halo Tri Abadi Makmur, saya ingin konsultasi sewa tandem roller...",
  },

  en: {
    title: "Tandem Roller",
    subtitle: "Cheapest Tandem Roller Heavy Equipment Rental in Indonesia",
    thumbImage: "/proyek/proyek-48.webp",
    sectionWhat: "About Tandem Roller",

    sectionGuide: "Tandem Roller Guide",
    sectionGuideTitle1: "Guide to ",
    sectionGuideTitle2: "Tandem Roller",
    sectionGuideTitle3: " for Road Paving",

    // ✅ Intro diperkaya
    intro: [
      "A tandem roller is a compaction heavy equipment that uses two cylindrical steel drums (tandem) as rolling wheels, functioning to compact asphalt layers, aggregate, or soil so the surface becomes flat, dense, and durable. This two-drum configuration produces even pressure across the entire road surface.",
      "With an operating weight typically around 8–14 tons, tandem rollers are the backbone of road paving works — highways, bridges, parking areas, runways, and residential roads. Their vibratory action and static drum load produce maximum compaction on freshly laid hot mix asphalt.",
      "In the construction industry, tandem rollers compete with three-wheel rollers and pneumatic-tired rollers, but excel at producing smoother and more uniform surface finishes — making them the primary choice for asphalt finishing passes. PT Tri Abadi Makmur provides well-maintained tandem roller rentals with experienced operators for projects across Indonesia.",
    ],

    afterIntro: [
      "In construction practice, tandem rollers play a vital role in the asphalt paving finishing stage — producing flat, dense road surfaces ready for vehicle traffic. For more complete specifications and type information, here is our review.",
    ],

    accordionItems: [
      {
        title: "Definition and Function",
        paragraphs: [
          "In small-scale construction work, soil compaction is sometimes done by spraying water onto the surface — letting the water soak in and compact the soil naturally. However, this method takes a long time and the results are suboptimal. An effective compaction tool such as a tandem roller is needed to achieve compaction according to technical specifications.",
          "The tandem roller functions to compact soil embankments or asphalt layers to be leveled. Its working principle is to use the weight of the steel drums and mechanical vibration to force material particles closer together, reduce air voids, and increase the surface's bearing capacity.",
          "Besides tandem rollers, there are several other compaction tools with similar functions: tamping rollers (for cohesive soil), compactors (for limited areas), and pneumatic-tired rollers (for asphalt and granular). Each has specific advantages — the tandem roller excels at asphalt finishing because it produces the smoothest and most uniform surface.",
        ],
      },
      {
        title: "Types of Tandem Roller",
        paragraphs: [
          "Generally, tandem rollers are divided into two types based on the arrangement of their rolling wheels: two axle tandem rollers and three axle tandem rollers. The main difference lies in the number of axles and their field applications.",
          "Two axle tandem rollers have 2 axles and are suitable for finishing passes on concrete asphalt — producing uniform tracks with an 8–14 ton weight. Three axle tandem rollers have a 3-axle configuration that provides greater pressure per unit area — suitable for heavy work such as aircraft runways and road foundations. Details of each type are explained in the following points.",
        ],
      },
      {
        title: "Two Axle Tandem Roller",
        paragraphs: [
          "The two axle tandem roller is equipped with two rolling axles that provide the same track on each wheel, so the rolling result is very even. Its operating weight is around 8–14 tons — sufficient for compacting concrete asphalt on standard road works.",
          "This tool is most often used for finishing passes so the asphalt surface becomes flat and smooth. The drum can be filled with water (ballast) to add 25–60% weight, allowing operators to adjust pressure according to field compaction needs.",
        ],
      },
      {
        title: "Three Axle Tandem Roller",
        paragraphs: [
          "The three axle tandem roller is fundamentally the same as the two axle, but has three axles that provide greater pressure per unit area — specifically designed for heavy works such as aircraft runways, toll road foundations, and base course layer compaction.",
          "This three-axle configuration is often equipped with a walking beam — an additional front wheel mounted on an over head frame extension. The walking beam can move up and down following the road surface contour, so the pressure per unit drum width remains stable even on uneven terrain.",
          "The locking system on the walking beam allows the operator to lock its movement when needed — for example, for spot compaction or when working on an already flat surface. This capability makes the three axle tandem roller more flexible in varied terrain conditions.",
        ],
      },
    ],

    penutup: [
      "That is the complete review of the tandem roller we use and rent out at PT Tri Abadi Makmur. Besides the tandem roller, we also operate various other heavy equipment such as dozer, excavator, and self loader — all well-maintained and certified to ensure optimal construction results, on time, and on spec. With that, you don't need to hesitate to use our services.",
      "Besides asphalt paving, we also serve asphalt road repair, asphalt penetration, and various other construction works. Our offered services include:",
      "1. Paving block installation\n2. Garden curbstone installation\n3. Sidewalk curbstone\n4. Grass block installation\n5. Ready hot mix concrete casting, etc.",
      "For further information and ordering, contact us at the contact listed on the website, or chat directly via WhatsApp for a free consultation.",
    ],

    ctaBadge: "Free Consultation",
    ctaTitle1: "Need to rent a Tandem Roller? ",
    ctaTitle2: "We're ready to help.",
    ctaButton: "Contact via WhatsApp",
    ctaWaText: "Hello Tri Abadi Makmur, would like to consult about tandem roller rental...",
  },
};

// ─────────────────────────────────────────────
// HALAMAN: TANDEM ROLLER
// ─────────────────────────────────────────────
export default function TandemRoller() {
  const { lang } = useLang();
  const d = data[lang] || data.id;

  const [openIndex, setOpenIndex] = useState(0);
  const [imgError, setImgError] = useState(false);

  const toggle = useCallback(
    (i) => setOpenIndex((prev) => (prev === i ? null : i)),
    []
  );

  return (
    <section
      aria-labelledby="tandem-heading"
      className="relative bg-white pt-28 lg:pt-36 pb-20 lg:pb-28 overflow-hidden"
    >
      {/* Ornamen background halus */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-40 -left-32 w-80 h-80 bg-[#1e88e5] rounded-full blur-3xl opacity-[0.04]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-40 -right-32 w-80 h-80 bg-amber-500 rounded-full blur-3xl opacity-[0.05]"
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-5 lg:px-8">

        {/* ═══ 1. HEADER ═══ */}
        <Reveal delay={100} y={24}>
          <div className="text-center mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2.5 sm:gap-3 mb-4">
              <span className="w-8 sm:w-12 h-px bg-[#1e88e5]" aria-hidden="true" />
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#1e88e5] font-bold">
                {d.title}
              </span>
              <span className="w-8 sm:w-12 h-px bg-[#1e88e5]" aria-hidden="true" />
            </div>
            <h1
              id="tandem-heading"
              className="font-light tracking-tight text-slate-900 leading-[1.15] text-balance max-w-3xl mx-auto"
              style={{ fontSize: "clamp(1.5rem, 4vw, 2.25rem)" }}
            >
              {d.subtitle}
              <span className="text-[#1e88e5]">.</span>
            </h1>
          </div>
        </Reveal>

        {/* ═══ 2. INTRO CARD ═══ */}
        <Reveal y={34} duration={800}>
          <div className="rounded-3xl bg-gradient-to-br from-slate-50 via-white to-blue-50/40 border border-slate-200 shadow-xl shadow-slate-200/40 p-6 sm:p-8 lg:p-10 mb-8 sm:mb-10">
            <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-6 md:gap-8 lg:gap-10 items-start">
              <div className="relative w-full max-w-[260px] mx-auto md:mx-0 aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 ring-1 ring-slate-200/80 shadow-lg shadow-slate-300/30">
                {imgError ? (
                  <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-xs font-semibold uppercase tracking-[0.2em] text-center px-3">
                    {d.title}
                  </div>
                ) : (
                  <Image
                    src={d.thumbImage}
                    alt={`${d.title} — ${d.subtitle}`}
                    width={520}
                    height={520}
                    priority
                    sizes="(max-width: 768px) 260px, 260px"
                    className="w-full h-full object-cover"
                    onError={() => setImgError(true)}
                  />
                )}
              </div>

              <div>
                <p className="text-[#1e88e5] uppercase tracking-[0.25em] text-[10px] sm:text-[11px] font-bold mb-3">
                  {d.sectionWhat}
                </p>
                <div className="space-y-3.5">
                  {d.intro.map((p, i) => (
                    <p key={i} className={BODY_CLASS} style={BODY_FONT}>
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ═══ 3. CALLOUT PEMBUKA ═══ */}
        <Reveal y={24}>
          <div className="relative rounded-2xl bg-slate-50 border border-slate-200 p-5 sm:p-7 mb-12 sm:mb-16 overflow-hidden">
            <span
              aria-hidden="true"
              className="absolute left-0 top-0 bottom-0 w-1 bg-[#1e88e5]"
            />
            <div className="flex items-start gap-3">
              <span className="shrink-0 w-9 h-9 rounded-lg bg-[#1e88e5]/10 text-[#1e88e5]
                              flex items-center justify-center mt-0.5">
                <IconInfo className="w-5 h-5" />
              </span>
              <div className="space-y-3 flex-1">
                {d.afterIntro.map((p, i) => (
                  <p key={i} className="text-slate-600 leading-[1.85]" style={BODY_FONT}>
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* ═══ 4. SECTION: PANDUAN TANDEM ROLLER ═══ */}

        {/* 4a. Kicker + H2 */}
        <Reveal y={20}>
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="w-8 sm:w-12 h-px bg-[#1e88e5]" aria-hidden="true" />
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#1e88e5] font-bold">
                {d.sectionGuide}
              </span>
              <span className="w-8 sm:w-12 h-px bg-[#1e88e5]" aria-hidden="true" />
            </div>

            <h2
              className="font-light tracking-tight text-slate-900 leading-tight text-balance max-w-2xl mx-auto"
              style={{ fontSize: "clamp(1.25rem, 3vw, 1.75rem)" }}
            >
              {d.sectionGuideTitle1}
              <span className="font-semibold">{d.sectionGuideTitle2}</span>
              {d.sectionGuideTitle3}
            </h2>
          </div>
        </Reveal>

        {/* 4b. ACCORDION ITEMS */}
        {d.accordionItems.map((item, i) => {
          const number = String(i + 1).padStart(2, "0");
          return (
            <Reveal key={item.title} delay={80 + i * 60} y={24}>
              <Accordion
                id={`item-${i + 1}`}
                index={i}
                number={number}
                title={item.title}
                isOpen={openIndex === i}
                onToggle={toggle}
              >
                <div className="space-y-4">
                  {item.paragraphs.map((p, j) => (
                    <RenderContent key={j} text={p} />
                  ))}
                </div>
              </Accordion>
            </Reveal>
          );
        })}

        {/* ═══ 5. PENUTUP ═══ */}
        <Reveal y={24}>
          <div className="mt-10 sm:mt-14 rounded-2xl bg-slate-50 border border-slate-200 p-5 sm:p-7 space-y-3">
            {d.penutup.map((p, i) => (
              <RenderContent key={i} text={p} />
            ))}
          </div>
        </Reveal>

        {/* ═══ 6. CTA PREMIUM ═══ */}
        <Reveal y={34}>
          <div className="relative mt-12 sm:mt-16 rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 p-8 sm:p-12 lg:p-14 text-center shadow-2xl shadow-slate-900/30">
            <div
              aria-hidden="true"
              className="absolute top-0 right-0 w-72 h-72 bg-[#1e88e5] rounded-full blur-3xl opacity-25 pointer-events-none"
            />
            <div
              aria-hidden="true"
              className="absolute bottom-0 left-0 w-72 h-72 bg-[#25D366] rounded-full blur-3xl opacity-[0.12] pointer-events-none"
            />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4da3ff]/10 border border-[#4da3ff]/25 mb-5">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"
                  aria-hidden="true"
                />
                <span className="text-[#4da3ff] text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-bold">
                  {d.ctaBadge}
                </span>
              </div>

              <h2
                className="text-white font-light tracking-tight leading-snug mb-6 sm:mb-8 text-balance"
                style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)" }}
              >
                {d.ctaTitle1}
                <span className="font-bold">{d.ctaTitle2}</span>
              </h2>

              <a
                href={`https://wa.me/6282258089367?text=${encodeURIComponent(d.ctaWaText)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2.5
                           px-7 sm:px-9 py-4 rounded-xl
                           bg-emerald-700 hover:bg-emerald-600
                           text-white font-bold
                           uppercase tracking-[0.12em] sm:tracking-[0.15em]
                           shadow-xl shadow-emerald-900/30
                           transition-all duration-300
                           hover:scale-[1.02]
                           focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                style={{ fontSize: "clamp(0.75rem, 1.2vw, 0.875rem)" }}
              >
                <IconWhatsApp className="w-5 h-5 shrink-0" />
                {d.ctaButton}
                <IconArrowRight className="w-4 h-4 shrink-0" />
              </a>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}