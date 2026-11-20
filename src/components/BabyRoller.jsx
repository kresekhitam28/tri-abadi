// src/components/BabyRoller.jsx
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
  const buttonId = `baby-btn-${id}`;
  const panelId = `baby-panel-${id}`;

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
// RENDER CONTENT — paragraf per newline
// ─────────────────────────────────────────────
const RenderContent = memo(function RenderContent({ text }) {
  const paragraphs = useMemo(() => {
    if (!text) return null;
    return text.split("\n").filter((line) => line.trim() !== "");
  }, [text]);

  if (!text || !paragraphs) return null;

  if (paragraphs.length === 1) {
    return (
      <p className="text-slate-700 leading-[1.85]" style={BODY_FONT}>
        {paragraphs[0]}
      </p>
    );
  }

  return (
    <div className="space-y-3 text-slate-700 leading-[1.85]" style={BODY_FONT}>
      {paragraphs.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
});

// ─────────────────────────────────────────────
// DATA BILINGUAL
// (subtitle H1 TIDAK diubah · intro diperkaya · typo fixed · "Hemat Daya" dipindah ke kelebihan)
// ─────────────────────────────────────────────
const data = {
  id: {
    title: "Baby Roller",
    subtitle: "Sewa Mesin Baby Roller Murah",
    thumbImage: "/proyek/proyek-52.webp",
    sectionWhat: "Mengenal Baby Roller",

    sectionGuide: "Panduan Baby Roller",
    sectionGuideTitle1: "Kelebihan & ",
    sectionGuideTitle2: "Spesifikasi",
    sectionGuideTitle3: " Baby Roller",

    // ✅ Intro 3 paragraf padat (~140 kata), typo fixed
    intro: [
      "Baby roller — lebih populer dengan istilah vibratory roller — adalah alat berat pemadat berukuran mini dengan bobot sekitar 3 ton yang berfungsi memadatkan dan meratakan permukaan tanah maupun lapisan aspal. Ukurannya yang kompak membuatnya sangat cocok untuk pekerjaan di area terbatas seperti trotoar, jalan lingkungan perumahan, dan perbaikan jalan (patching).",
      "Meski berukuran kecil, baby roller mampu menghasilkan daya pemadatan hingga beberapa ton — cukup untuk memadatkan timbunan tanah, lapisan base course, dan hot mix asphalt. Banyak kontraktor jalan memanfaatkannya untuk mempercepat pekerjaan pemadatan di area yang tidak bisa dijangkau roller besar.",
      "Baby roller tersedia dalam dua tipe: single drum (satu drum penggerak) dan double drum (dua drum penggerak), masing-masing dengan kapasitas dan spesifikasi berbeda. PT Tri Abadi Makmur menyediakan beberapa tipe baby roller terawat beserta operator berpengalaman untuk kebutuhan proyek Anda di Jabodetabek.",
    ],

    // ✅ Callout pembuka
    afterIntro: [
      "Baby roller menjadi pilihan ekonomis untuk pekerjaan pemadatan skala kecil hingga menengah — dengan biaya sewa lebih hemat dibanding roller besar, namun hasil tetap maksimal. Berikut ulasan kelebihan dan spesifikasi tipe baby roller yang kami sediakan.",
    ],

    // ✅ "Hemat Daya" DIPINDAH ke sini (sebelumnya salah tempat di tipeItems)
    kelebihanItems: [
      {
        title: "Kelebihan Baby Roller",
        paragraphs: [
          "Penggunaan alat pemadatan disesuaikan dengan kebutuhan pembangunan yang sedang dilakukan. Baby roller menawarkan biaya sewa lebih hemat dibanding alat berat lain, dengan hasil pemadatan yang tetap maksimal.",
          "Berikut beberapa kelebihan baby roller untuk pekerjaan pemadatan lahan:",
        ],
      },
      {
        title: "Lebih Efisien",
        paragraphs: [
          "Bagi Anda yang mengerjakan proyek jalan dan meratakan permukaan lahan dengan target jadwal ketat, baby roller membantu menyelesaikan pekerjaan sesuai ekspektasi yang direncanakan di awal.",
          "Ukurannya yang mini memudahkan manuver di area terbatas — mengefisienkan waktu, tenaga kerja, dan biaya operasional secara keseluruhan.",
        ],
      },
      {
        title: "Hasil Yang Maksimal",
        paragraphs: [
          "Dengan beberapa pilihan tipe baby roller (single drum dan double drum), Anda dapat memilih unit sesuai kebutuhan dan budget. Untuk hasil pemadatan maksimal, kenali spesifikasi teknis masing-masing tipe — mulai dari operating weight, drum width, hingga kapasitas penetrasi per jam.",
          "Pemilihan tipe yang tepat akan menghasilkan kepadatan sesuai standar teknis proyek, sekaligus menghindari biaya sewa unit yang over-spec.",
        ],
      },
      {
        title: "Hemat Daya",
        paragraphs: [
          "Dengan mengandalkan baby roller, Anda dapat lebih menghemat sumber daya — terutama tenaga manusia. Ukurannya yang lebih mini membuat alat ini mudah dikendalikan oleh satu operator, mengurangi kebutuhan tim besar di lapangan.",
          "Selain hemat tenaga kerja, konsumsi bahan bakar baby roller juga jauh lebih efisien dibanding roller berukuran besar — menurunkan biaya operasional keseluruhan proyek.",
        ],
      },
    ],

    penghubung: "Adapun spesifikasi tipe baby roller yang kami sediakan adalah sebagai berikut:",

    tipeItems: [
      {
        title: "Tipe GTM-RD 7HS",
        paragraphs: [
          "Tipe GTM-RD 7HS memiliki operating weight 810 kg dengan daya tekanan alat 2,1 ton. Drum width 650 mm dan diameter drum 420 mm, dengan kapasitas penetrasi area 2.613 meter persegi per jam.",
          "Mesin penggerak Hatz Diesel 7 HP, dimensi alat 1.475 x 915 x 2.310 mm, dan sistem aplikasi menggunakan gas tangan — cocok untuk pekerjaan pemadatan skala kecil dengan mobilitas tinggi.",
        ],
      },
      {
        title: "Tipe GTM-RD 12A-90",
        paragraphs: [
          "Tipe GTM-RD 12A-90 memiliki operating weight 1.200 kg dengan diameter drum 560 mm. Jumlah drum penggerak 1 buah, konfigurasi penetrasi per drum 15 kN, dan kapasitas pengerjaan area 7.800 meter persegi per jam.",
          "Mesin penggerak Honda Gasoline 17 HP, dimensi 1.825 x 1.035 x 2.300 mm, dengan sistem kerja elektrik — pilihan ideal untuk proyek jalan skala menengah.",
        ],
      },
      {
        title: "Tipe GTM-RD 16-90",
        paragraphs: [
          "Tipe GTM-RD 16-90 memiliki operating weight 1.500 kg dengan diameter drum 560 mm. Drum penggerak 2 buah, konfigurasi penetrasi per drum 15 kN, dan kapasitas pengerjaan area 8.386 meter persegi per jam.",
          "Mesin kemudi Lombardini Gasoline 27 HP, dimensi 1.825 x 1.032 x 2.300 mm, sistem kerja elektrik — paling produktif di antara ketiga tipe, cocok untuk proyek dengan target volume besar.",
        ],
      },
    ],

    // ✅ Penutup baru (dipisahkan dari "Hemat Daya")
    penutup: [
      "Itulah beberapa kelebihan dan spesifikasi tipe baby roller yang kami sediakan di PT Tri Abadi Makmur. Untuk informasi lebih lanjut atau penawaran sewa, Anda dapat mengunjungi spesialisaspal.com, datang langsung ke kantor kami, atau hubungi WhatsApp untuk konsultasi gratis.",
    ],

    ctaBadge: "Konsultasi Gratis",
    ctaTitle1: "Butuh sewa Baby Roller? ",
    ctaTitle2: "Kami siap membantu.",
    ctaButton: "Hubungi via WhatsApp",
    ctaWaText: "Halo Tri Abadi Makmur, saya ingin konsultasi sewa baby roller...",
  },

  en: {
    title: "Baby Roller",
    subtitle: "Affordable Baby Roller Machine Rental",
    thumbImage: "/proyek/proyek-52.webp",
    sectionWhat: "About Baby Roller",

    sectionGuide: "Baby Roller Guide",
    sectionGuideTitle1: "Advantages & ",
    sectionGuideTitle2: "Specifications",
    sectionGuideTitle3: " of Baby Roller",

    // ✅ Intro 3 paragraf padat
    intro: [
      "Baby roller — more commonly known as a vibratory roller — is a mini compaction heavy equipment weighing around 3 tons, functioning to compact and level soil surfaces as well as asphalt layers. Its compact size makes it ideal for work in confined areas such as sidewalks, residential roads, and road patching.",
      "Despite its small size, a baby roller can generate compaction force reaching several tons — sufficient for compacting soil embankments, base course layers, and hot mix asphalt. Many road contractors use it to speed up compaction work in areas that larger rollers cannot reach.",
      "Baby rollers come in two types: single drum (one drive drum) and double drum (two drive drums), each with different capacities and specifications. PT Tri Abadi Makmur provides several well-maintained baby roller types with experienced operators for your project needs in Jabodetabek.",
    ],

    afterIntro: [
      "Baby rollers are the economical choice for small to medium-scale compaction work — offering lower rental costs than large rollers while still delivering maximum results. Here is a review of the advantages and specifications of the baby roller types we provide.",
    ],

    kelebihanItems: [
      {
        title: "Advantages of Baby Roller",
        paragraphs: [
          "The use of compaction equipment is tailored to the construction needs being carried out. Baby rollers offer lower rental costs compared to other heavy equipment, while still delivering maximum compaction results.",
          "Here are several advantages of baby rollers for land compaction work:",
        ],
      },
      {
        title: "More Efficient",
        paragraphs: [
          "For those of you working on road projects and leveling land surfaces with tight schedules, baby rollers help complete work according to expectations planned at the start.",
          "Its mini size makes maneuvering in confined areas easier — streamlining time, labor, and overall operational costs.",
        ],
      },
      {
        title: "Maximum Results",
        paragraphs: [
          "With several baby roller type options (single drum and double drum), you can choose the unit according to your needs and budget. For maximum compaction results, understand the technical specifications of each type — from operating weight, drum width, to penetration capacity per hour.",
          "Choosing the right type will produce compaction according to project technical standards, while avoiding over-spec rental costs.",
        ],
      },
      {
        title: "Power Saving",
        paragraphs: [
          "By relying on a baby roller, you can save more resources — especially human labor. Its smaller size makes the machine easy to control by a single operator, reducing the need for a large team in the field.",
          "Besides saving labor, baby roller fuel consumption is also far more efficient than large rollers — lowering the project's overall operational costs.",
        ],
      },
    ],

    penghubung: "Here are the specifications of the baby roller types we provide:",

    tipeItems: [
      {
        title: "Type GTM-RD 7HS",
        paragraphs: [
          "The GTM-RD 7HS type has an operating weight of 810 kg with tool pressure power of 2.1 tons. Drum width 650 mm and drum diameter 420 mm, with an area penetration capacity of 2,613 square meters per hour.",
          "Hatz Diesel 7 HP drive engine, tool dimensions 1,475 x 915 x 2,310 mm, and application system using hand gas — suitable for small-scale compaction work with high mobility.",
        ],
      },
      {
        title: "Type GTM-RD 12A-90",
        paragraphs: [
          "The GTM-RD 12A-90 type has an operating weight of 1,200 kg with drum diameter 560 mm. Number of drive drums 1 piece, penetration configuration per drum 15 kN, and area work capacity of 7,800 square meters per hour.",
          "Honda Gasoline 17 HP drive engine, dimensions 1,825 x 1,035 x 2,300 mm, with an electric working system — ideal choice for medium-scale road projects.",
        ],
      },
      {
        title: "Type GTM-RD 16-90",
        paragraphs: [
          "The GTM-RD 16-90 type has an operating weight of 1,500 kg with drum diameter 560 mm. Drive drums 2 pieces, penetration configuration per drum 15 kN, and area work capacity of 8,386 square meters per hour.",
          "Lombardini Gasoline 27 HP steering engine, dimensions 1,825 x 1,032 x 2,300 mm, electric working system — the most productive of the three types, suitable for projects with large volume targets.",
        ],
      },
    ],

    penutup: [
      "Those are some of the advantages and specifications of the baby roller types we provide at PT Tri Abadi Makmur. For further information or a rental quote, you can visit spesialisaspal.com, come directly to our office, or contact us via WhatsApp for a free consultation.",
    ],

    ctaBadge: "Free Consultation",
    ctaTitle1: "Need to rent a Baby Roller? ",
    ctaTitle2: "We're ready to help.",
    ctaButton: "Contact via WhatsApp",
    ctaWaText: "Hello Tri Abadi Makmur, would like to consult about baby roller rental...",
  },
};

// ─────────────────────────────────────────────
// HALAMAN: BABY ROLLER
// ─────────────────────────────────────────────
export default function BabyRoller() {
  const { lang } = useLang();
  const d = data[lang] || data.id;

  const [openIndex, setOpenIndex] = useState(0);
  const [imgError, setImgError] = useState(false);

  const toggle = useCallback(
    (i) => setOpenIndex((prev) => (prev === i ? null : i)),
    []
  );

  const kelebihanOffset = 0;
  const tipeOffset = d.kelebihanItems.length;

  return (
    <section
      aria-labelledby="baby-heading"
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
              id="baby-heading"
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

        {/* ═══ 4. SECTION: KELEBIHAN & SPESIFIKASI ═══ */}

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

        {/* 4b. ACCORDION: KELEBIHAN */}
        {d.kelebihanItems.map((item, i) => {
          const idx = kelebihanOffset + i;
          const number = String(i + 1).padStart(2, "0");
          return (
            <Reveal key={`kelebihan-${i}`} delay={80 + i * 60} y={24}>
              <Accordion
                id={`kelebihan-${i + 1}`}
                index={idx}
                number={number}
                title={item.title}
                isOpen={openIndex === idx}
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

        {/* 4c. PENGHUBUNG */}
        <Reveal y={18}>
          <p
            className="text-slate-900 font-medium leading-[1.6] mt-6 sm:mt-8 mb-4 sm:mb-5
                       pl-4 border-l-2 border-[#1e88e5]"
            style={{ fontSize: "clamp(0.875rem, 1.8vw, 1rem)" }}
          >
            {d.penghubung}
          </p>
        </Reveal>

        {/* 4d. ACCORDION: TIPE */}
        {d.tipeItems.map((item, i) => {
          const idx = tipeOffset + i;
          const number = String(i + 1).padStart(2, "0");
          return (
            <Reveal key={`tipe-${i}`} delay={80 + i * 60} y={24}>
              <Accordion
                id={`tipe-${i + 1}`}
                index={idx}
                number={number}
                title={item.title}
                isOpen={openIndex === idx}
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