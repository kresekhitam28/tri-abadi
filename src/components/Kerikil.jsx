// src/components/Kerikil.jsx
"use client";

import { useState, useCallback, memo } from "react";
import Image from "next/image";
import { useLang } from "../context/LanguageContext";
import MaterialDeliveryInfo from "./MaterialDeliveryInfo";
import Reveal from "./Reveal";
// INTEGRASI METADATA HELPER MILIKMU
import { SITE_URL, serializeJsonLd } from "../lib/metadata";

// ─────────────────────────────────────────────
// KONFIG — DISESUAIKAN ROUTE /supplier/
// ─────────────────────────────────────────────
const PRODUCT_SLUG = "kerikil";
const PRODUCT_URL = `${SITE_URL}/supplier/${PRODUCT_SLUG}`;

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

// ─────────────────────────────────────────────
// HELPER: group paragraf & bullet
// ─────────────────────────────────────────────
function groupParagraphs(items) {
  const groups = [];
  let listBuffer = null;
  for (const text of items) {
    const isBullet = text.startsWith("•");
    if (isBullet) {
      if (!listBuffer) {
        listBuffer = [];
        groups.push({ type: "list", items: listBuffer });
      }
      listBuffer.push(text.replace(/^•\s*/, ""));
    } else {
      listBuffer = null;
      groups.push({ type: "paragraph", text });
    }
  }
  return groups;
}

const BODY_FONT = { fontSize: "clamp(0.875rem, 1.5vw, 0.9375rem)" };
const BODY_CLASS = "text-slate-700 leading-[1.9]";

// ─────────────────────────────────────────────
// SUB-KOMPONEN: render groups
// ─────────────────────────────────────────────
function Paragraphs({ items }) {
  const groups = groupParagraphs(items);
  return (
    <div className="space-y-3.5">
      {groups.map((g, i) => {
        if (g.type === "list") {
          return (
            <ul
              key={i}
              className="list-disc list-outside pl-5 space-y-2 text-slate-600 leading-[1.85] marker:text-[#1565c0] marker:font-semibold"
              style={BODY_FONT}
            >
              {g.items.map((t, j) => (
                <li key={j}>{t}</li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="text-slate-600 leading-[1.85]" style={BODY_FONT}>
            {g.text}
          </p>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────
// ACCORDION — versi ringan
// ─────────────────────────────────────────────
const Accordion = memo(function Accordion({
  id, index, number, title, isOpen, onToggle, children,
}) {
  const buttonId = `kerikil-btn-${id}`;
  const panelId = `kerikil-panel-${id}`;

  return (
    <div
      className={`group relative rounded-2xl border mb-4 overflow-hidden
                  transition-colors duration-200
                  ${isOpen
                    ? "border-[#1e88e5]/30 bg-gradient-to-br from-white to-blue-50/40 shadow-lg shadow-[#1e88e5]/10"
                    : "border-slate-200 bg-white hover:border-[#1e88e5]/30"}`}
    >
      <span
        aria-hidden="true"
        className={`absolute left-0 top-0 bottom-0 w-1
                    bg-gradient-to-b from-[#1e88e5] to-[#1565c0]
                    transition-opacity duration-200
                    ${isOpen ? "opacity-100" : "opacity-0"}`}
      />

      <h3 className="m-0 p-0 text-base font-normal leading-normal">
        <button
          id={buttonId}
          type="button"
          onClick={() => onToggle(index)}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="w-full flex items-center gap-3 sm:gap-4
                     px-4 sm:px-6 py-4 sm:py-5
                     text-left cursor-pointer
                     focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-700"
        >
          <span
            aria-hidden="true"
            className={`shrink-0 flex items-center justify-center
                        w-10 h-10 sm:w-11 sm:h-11 rounded-xl
                        font-mono tabular-nums text-xs sm:text-[13px] font-bold tracking-tight
                        transition-colors duration-200
                        ${isOpen
                          ? "bg-gradient-to-br from-[#1e88e5] to-[#1565c0] text-white shadow-md shadow-[#1e88e5]/30"
                          : "bg-slate-100 text-slate-500"}`}
          >
            {number}
          </span>

          <span
            className={`flex-1 font-semibold leading-snug tracking-tight
                        text-[0.9375rem] sm:text-base
                        ${isOpen ? "text-slate-900" : "text-slate-800"}`}
          >
            {title}
          </span>

          <span
            aria-hidden="true"
            className={`shrink-0 flex items-center justify-center w-9 h-9 rounded-full
                        transition-colors duration-200
                        ${isOpen ? "bg-[#1e88e5] text-white" : "bg-slate-50 text-slate-400"}`}
          >
            <IconChevron
              className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            />
          </span>
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        aria-hidden={!isOpen}
        className="grid transition-[grid-template-rows] duration-200 ease-out"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div
            className="px-4 sm:px-6 pb-5 sm:pb-6
                       ml-4 sm:ml-6 mr-4 sm:mr-6 mb-4
                       border-t border-slate-200/70"
            style={BODY_FONT}
          >
            <div className="pt-5">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const data = {
  id: {
    title: "Kerikil",
    subtitle: "Material Cor Beton & Drainase",
    thumbImage: "/produk/kerikil.webp",
    imageAlt: "Tumpukan kerikil untuk material cor beton dan drainase",
    sectionWhat: "Mengenal Kerikil",

    sectionAdvantages: "Keunggulan Kerikil",
    sectionAdvantagesTitle1: "Keunggulan ",
    sectionAdvantagesTitle2: "Kerikil",
    sectionAdvantagesTitle3: " untuk Konstruksi",

    intro: [
      "Kerikil – Salah satu material konstruksi yang sering digunakan dalam berbagai proyek pembangunan.",
      "Kerikil merupakan material batuan kecil yang biasanya digunakan sebagai campuran beton, pengerasan jalan, dan drainase.",
      "Ukurannya bervariasi, mulai dari beberapa milimeter hingga beberapa sentimeter, menyesuaikan kebutuhan proyek.",
    ],

    advantagesIntro: [
      "Kerikil banyak digunakan sebagai agregat kasar dalam campuran beton karena mampu memperkuat struktur.",
      "Selain itu, kerikil juga efektif membantu drainase pada area yang membutuhkan penyerapan air lebih baik.",
      "Beberapa kelebihan kerikil untuk kebutuhan konstruksi Anda diantaranya sebagai berikut.",
    ],

    accordionItems: [
      {
        title: "Cocok untuk Campuran Beton",
        paragraphs: [
          "Kerikil menjadi salah satu agregat utama dalam campuran beton karena mampu memperkuat dan menstabilkan struktur bangunan.",
          "Butiran kerikil yang keras dan bersudut membantu mengunci antar material, sehingga beton yang dihasilkan lebih padat dan tidak mudah retak.",
          "Selain itu, kerikil juga membantu mengurangi pemakaian semen karena volumenya mengisi sebagian besar campuran.",
          "Untuk konstruksi struktural seperti pondasi, kolom, balok, dan plat lantai, kerikil dengan ukuran 10-20 mm biasanya menjadi pilihan utama.",
        ],
      },
      {
        title: "Membantu Drainase",
        paragraphs: [
          "Kerikil memudahkan air meresap ke dalam tanah, sehingga cocok digunakan pada area yang membutuhkan sistem drainase baik.",
          "Rongga antar butir kerikil berfungsi sebagai jalur aliran air, sehingga air hujan tidak menggenang di permukaan.",
          "Aplikasi umum kerikil untuk drainase antara lain: taman, halaman, area parkir, saluran resapan, dan dasar pot tanaman.",
          "Dengan drainase yang baik, risiko genangan dan kerusakan struktur akibat kelembaban berlebih dapat diminimalkan.",
        ],
      },
      {
        title: "Ukuran Bervariasi",
        paragraphs: [
          "Tersedia dalam berbagai ukuran, sehingga bisa disesuaikan dengan kebutuhan proyek, dari beton struktural hingga taman.",
          "Beberapa ukuran kerikil yang umum di pasaran antara lain:",
          "• 5-10 mm — untuk campuran beton halus, plester, dan taman.",
          "• 10-20 mm — untuk beton struktural, kolom, dan balok.",
          "• 20-30 mm — untuk pondasi dan pengerasan jalan.",
          "• 30-50 mm — untuk drainase dan lapisan dasar jalan.",
          "Pemilihan ukuran yang tepat sangat mempengaruhi kekuatan, kerapian, dan efisiensi pengerjaan proyek Anda.",
        ],
      },
      {
        title: "Mudah Diaplikasikan",
        paragraphs: [
          "Kerikil mudah ditata dan dipadatkan di lapangan, sehingga proses pengerjaan menjadi lebih cepat dan efisien.",
          "Tidak seperti material yang perlu dicampur khusus, kerikil dapat langsung dihamparkan dan dipadatkan sesuai kebutuhan.",
          "Hal ini membuat kerikil sangat cocok untuk proyek yang membutuhkan pengerjaan cepat, seperti pengerasan lahan parkir, jalan lingkungan, atau area taman.",
          "Selain itu, kerikil juga mudah diganti atau ditambah jika terjadi penurunan permukaan di kemudian hari.",
        ],
      },
    ],

    ctaBadge: "Konsultasi Gratis",
    ctaTitle1: "Butuh Kerikil? ",
    ctaTitle2: "Kami siap membantu.",
    ctaButton: "Hubungi via WhatsApp",
    ctaWaText: "Halo Tri Abadi Makmur, saya ingin pesan kerikil...",

    relatedTitle: "Produk Lainnya",
    relatedSubtitle: "Material konstruksi lain yang sering dipesan bersama kerikil.",
    relatedItems: [
      {
        slug: "abu-batu",
        name: "Abu Batu",
        desc: "Material pengganti pasir halus untuk campuran beton dan pengaspalan.",
        image: "/produk/abu-batu.png",
        alt: "Tumpukan abu batu halus untuk campuran konstruksi",
      },
      {
        slug: "batu-split",
        name: "Batu Split",
        desc: "Batu split berbagai ukuran untuk cor beton dan pengaspalan.",
        image: "/produk/batu-split.png",
        alt: "Batu split pecahan untuk campuran cor beton",
      },
      {
        slug: "base-course",
        name: "Base Course",
        desc: "Lapis pondasi atas jalan dari campuran batu pecah dan abu batu.",
        image: "/produk/base-course.png",
        alt: "Tumpukan batu base course untuk lapis pondasi jalan",
      },
    ],
  },

  en: {
    title: "Gravel",
    subtitle: "Concrete Casting & Drainage Material",
    thumbImage: "/produk/kerikil.webp",
    imageAlt: "Pile of gravel for concrete casting and drainage material",
    sectionWhat: "About Gravel",

    sectionAdvantages: "Gravel Advantages",
    sectionAdvantagesTitle1: "Advantages of ",
    sectionAdvantagesTitle2: "Gravel",
    sectionAdvantagesTitle3: " for Construction",

    intro: [
      "Gravel – One of the construction materials often used in various building projects.",
      "Gravel is a small stone material usually used as a concrete mixture, road hardening, and drainage.",
      "Its size varies, from a few millimeters to a few centimeters, adjusting to project needs.",
    ],

    advantagesIntro: [
      "Gravel is widely used as a coarse aggregate in concrete mixtures because it strengthens the structure.",
      "In addition, gravel is also effective in helping drainage in areas that need better water absorption.",
      "Some advantages of gravel for your construction needs include the following.",
    ],

    accordionItems: [
      {
        title: "Suitable for Concrete Mixtures",
        paragraphs: [
          "Gravel is one of the main aggregates in concrete mixtures because it strengthens and stabilizes the building structure.",
          "The hard and angular gravel grains help lock the material together, so the resulting concrete is denser and less prone to cracking.",
          "In addition, gravel also helps reduce cement usage because its volume fills most of the mixture.",
          "For structural construction such as foundations, columns, beams, and floor slabs, gravel with a size of 10-20 mm is usually the main choice.",
        ],
      },
      {
        title: "Helps Drainage",
        paragraphs: [
          "Gravel allows water to seep into the soil easily, making it suitable for areas that need a good drainage system.",
          "The cavities between gravel grains function as water flow paths, so rainwater does not pool on the surface.",
          "Common applications of gravel for drainage include: gardens, yards, parking areas, absorption channels, and the bottom of plant pots.",
          "With good drainage, the risk of pooling and structural damage due to excess moisture can be minimized.",
        ],
      },
      {
        title: "Varied Sizes",
        paragraphs: [
          "Available in various sizes, so it can be adjusted to project needs, from structural concrete to gardens.",
          "Some gravel sizes that are common in the market include:",
          "• 5-10 mm — for fine concrete mixtures, plaster, and gardens.",
          "• 10-20 mm — for structural concrete, columns, and beams.",
          "• 20-30 mm — for foundations and road hardening.",
          "• 30-50 mm — for drainage and road base layers.",
          "Choosing the right size greatly affects the strength, neatness, and efficiency of your project work.",
        ],
      },
      {
        title: "Easy to Apply",
        paragraphs: [
          "Gravel is easy to arrange and compact in the field, making the work process faster and more efficient.",
          "Unlike materials that need to be specially mixed, gravel can be directly spread and compacted as needed.",
          "This makes gravel very suitable for projects that require quick work, such as hardening parking lots, neighborhood roads, or garden areas.",
          "In addition, gravel is also easy to replace or add if surface settling occurs later.",
        ],
      },
    ],

    ctaBadge: "Free Consultation",
    ctaTitle1: "Need Gravel? ",
    ctaTitle2: "We're ready to help.",
    ctaButton: "Contact via WhatsApp",
    ctaWaText: "Hello Tri Abadi Makmur, I would like to order gravel...",

    relatedTitle: "Other Products",
    relatedSubtitle: "Other construction materials frequently ordered together with gravel.",
    relatedItems: [
      {
        slug: "abu-batu",
        name: "Stone Dust",
        desc: "Fine sand substitute material for concrete mixtures and asphalt paving.",
        image: "/produk/abu-batu.png",
        alt: "Pile of fine stone dust for construction mixtures",
      },
      {
        slug: "batu-split",
        name: "Split Stone",
        desc: "Split stone in various sizes for concrete casting and asphalt paving.",
        image: "/produk/batu-split.png",
        alt: "Split stone for concrete casting mixtures",
      },
      {
        slug: "base-course",
        name: "Base Course",
        desc: "Road upper foundation layer made from a mixture of crushed stone and stone dust.",
        image: "/produk/base-course.png",
        alt: "Pile of base course stone for road foundation layer",
      },
    ],
  },
};

// ─────────────────────────────────────────────
// JSON-LD HELPER
// ─────────────────────────────────────────────
function buildJsonLd(d) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${PRODUCT_URL}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Beranda",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Supplier",
            item: `${SITE_URL}/supplier`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: d.title,
            item: PRODUCT_URL,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${PRODUCT_URL}#faq`,
        mainEntity: d.accordionItems.map((item) => ({
          "@type": "Question",
          name: item.title,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.paragraphs.join(" ").replace(/•/g, ""),
          },
        })),
      },
    ],
  };
}

// ─────────────────────────────────────────────
// HALAMAN: KERIKIL
// ─────────────────────────────────────────────
export default function Kerikil() {
  const { lang } = useLang();
  const d = data[lang] || data.id;

  const [openIndex, setOpenIndex] = useState(0);
  const [imgError, setImgError] = useState(false);

  const toggle = useCallback(
    (i) => setOpenIndex((prev) => (prev === i ? null : i)),
    []
  );

  const jsonLd = buildJsonLd(d);

  return (
    <section
      aria-labelledby="kerikil-heading"
      className="relative bg-gradient-to-b from-slate-50 via-white to-slate-50/70
                 pt-28 lg:pt-36 pb-20 lg:pb-28 overflow-hidden antialiased
                 selection:bg-[#1e88e5]/20 [text-wrap:pretty]"
    >
      {/* ── JSON-LD: Breadcrumb + FAQ ── */}
      <script
        type="application/ld+json"
        // MENGGUNAKAN serializeJsonLd MILIKMU
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />

      {/* Ornamen background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-32 -left-40 w-[24rem] h-[24rem] bg-[#1e88e5] rounded-full blur-3xl opacity-[0.06]"
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-5 lg:px-8">

        {/* ═══ 1. HERO HEADER ═══ */}
        <Reveal delay={50} y={20}>
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2.5 sm:gap-3 mb-5">
              <span
                className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent to-[#1565c0]"
                aria-hidden="true"
              />
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.28em] sm:tracking-[0.32em] text-[#1565c0] font-bold">
                {d.title}
              </span>
              <span
                className="w-8 sm:w-12 h-px bg-gradient-to-l from-transparent to-[#1565c0]"
                aria-hidden="true"
              />
            </div>
            <h1
              id="kerikil-heading"
              className="font-semibold tracking-tight text-slate-900 leading-[1.15] text-balance max-w-3xl mx-auto"
              style={{ fontSize: "clamp(1.75rem, 4.5vw, 2.5rem)" }}
            >
              {d.subtitle}
              <span className="text-[#1e88e5]">.</span>
            </h1>

            <div className="flex items-center justify-center gap-1.5 mt-6" aria-hidden="true">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
              <span className="w-8 h-1.5 rounded-full bg-[#1e88e5]" />
            </div>
          </div>
        </Reveal>

        <MaterialDeliveryInfo
          lang={lang}
          specification={{ id: "Kerikil agregat kasar. Tentukan ukuran sesuai campuran beton atau kebutuhan drainase.", en: "Coarse gravel. Specify the size for the concrete mix or drainage application." }}
        />

        {/* ═══ 2. INTRO CARD ═══ */}
        <Reveal y={28} duration={600}>
          <div
            className="relative rounded-3xl bg-white border border-slate-200/80
                       shadow-xl shadow-slate-300/30
                       mb-10 sm:mb-14 overflow-hidden"
          >
            <div
              aria-hidden="true"
              className="absolute top-0 left-0 right-0 h-1.5
                         bg-gradient-to-r from-[#1e88e5] via-blue-400 to-teal-400"
            />

            <div className="p-6 sm:p-8 lg:p-10">
              <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6 md:gap-8 lg:gap-10 items-start">

                <div className="relative">
                  <div
                    className="relative w-full max-w-[240px] mx-auto md:mx-0
                               aspect-square rounded-2xl overflow-hidden
                               bg-gradient-to-br from-slate-100 to-slate-200
                               shadow-lg shadow-slate-400/25 ring-1 ring-slate-200"
                  >
                    {imgError ? (
                      <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-xs font-semibold uppercase tracking-[0.2em] text-center px-3">
                        {d.title}
                      </div>
                    ) : (
                      <Image
                        src={d.thumbImage}
                        alt={d.imageAlt}
                        width={520}
                        height={520}
                        priority
                        sizes="(max-width: 768px) 240px, 240px"
                        className="w-full h-full object-cover"
                        onError={() => setImgError(true)}
                      />
                    )}
                  </div>
                  <span
                    aria-hidden="true"
                    className="hidden md:block absolute -top-3 -left-3 w-8 h-8
                               border-t-2 border-l-2 border-[#1e88e5]/60 rounded-tl-xl"
                  />
                  <span
                    aria-hidden="true"
                    className="hidden md:block absolute -bottom-3 -right-3 w-8 h-8
                               border-b-2 border-r-2 border-[#1e88e5]/60 rounded-br-xl"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2.5 mb-4">
                    <span className="w-8 h-0.5 rounded-full bg-[#1565c0]" aria-hidden="true" />
                    <p className="text-[#1565c0] uppercase tracking-[0.25em] text-[10px] sm:text-xs font-bold">
                      {d.sectionWhat}
                    </p>
                  </div>
                  <div className="space-y-3.5">
                    {d.intro.map((p, i) => (
                      <p key={i} className={`${BODY_CLASS} first:text-slate-900 first:font-medium`} style={BODY_FONT}>
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ═══ 3. KEUNGGULAN ═══ */}
        <Reveal y={16}>
          <div className="text-center mb-6 sm:mb-8">
            <div
              className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full
                         bg-white border border-[#1e88e5]/20 shadow-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#1e88e5]" aria-hidden="true" />
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#1565c0] font-bold">
                {d.sectionAdvantages}
              </span>
            </div>

            <h2
              className="font-light tracking-tight text-slate-900 leading-tight text-balance max-w-2xl mx-auto"
              style={{ fontSize: "clamp(1.35rem, 3.2vw, 1.9rem)" }}
            >
              {d.sectionAdvantagesTitle1}
              <span className="relative inline-block font-semibold text-slate-900">
                {d.sectionAdvantagesTitle2}
                <span
                  aria-hidden="true"
                  className="absolute left-0 right-0 -bottom-1 h-1.5 bg-gradient-to-r from-[#1e88e5]/40 to-[#1e88e5]/10 rounded-full"
                />
              </span>
              {d.sectionAdvantagesTitle3}
            </h2>
          </div>
        </Reveal>

        <Reveal y={20}>
          <aside
            className="relative rounded-2xl
                       bg-gradient-to-br from-slate-50 via-white to-teal-50/60
                       border border-slate-200 shadow-sm
                       p-5 sm:p-7 mb-8 sm:mb-10 overflow-hidden"
          >
            <span
              aria-hidden="true"
              className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#1e88e5] to-[#1565c0]"
            />
            <div aria-hidden="true" className="absolute top-3 right-3 opacity-[0.08]">
              <svg width="80" height="80" viewBox="0 0 80 80">
                <pattern id="dots-kerikil" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1" fill="#1e88e5" />
                </pattern>
                <rect width="80" height="80" fill="url(#dots-kerikil)" />
              </svg>
            </div>

            <div className="relative flex items-start gap-4 pl-0 sm:pl-2">
              <span
                className="shrink-0 w-11 h-11 rounded-xl bg-white border border-slate-200
                           text-[#1565c0] flex items-center justify-center mt-0.5"
              >
                <IconInfo className="w-5 h-5" />
              </span>
              <div className="space-y-3 flex-1">
                {d.advantagesIntro.map((p, i) => (
                  <p key={i} className="text-slate-600 leading-[1.85] first:text-slate-800 first:font-medium" style={BODY_FONT}>
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </aside>
        </Reveal>

        <Reveal y={20}>
          <div>
            {d.accordionItems.map((item, i) => {
              const number = String(i + 1).padStart(2, "0");
              return (
                <Accordion
                  key={item.title}
                  id={`item-${i + 1}`}
                  index={i}
                  number={number}
                  title={item.title}
                  isOpen={openIndex === i}
                  onToggle={toggle}
                >
                  <Paragraphs items={item.paragraphs} />
                </Accordion>
              );
            })}
          </div>
        </Reveal>

        {/* ═══ 4. RELATED PRODUCTS ═══ */}
        <Reveal y={24}>
          <section
            aria-labelledby="related-heading"
            className="mt-16 sm:mt-24"
          >
            <div className="text-center mb-8 sm:mb-10">
              <h2
                id="related-heading"
                className="font-semibold tracking-tight text-slate-900 leading-tight text-balance"
                style={{ fontSize: "clamp(1.4rem, 3.2vw, 1.9rem)" }}
              >
                {d.relatedTitle}
              </h2>
              <p
                className="text-slate-600 mt-2 max-w-xl mx-auto"
                style={BODY_FONT}
              >
                {d.relatedSubtitle}
              </p>
            </div>

            <ul
              role="list"
              className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6"
            >
              {d.relatedItems.map((item) => (
                <li key={item.slug}>
                  <a
                    href={`/supplier/${item.slug}`} // RUTE DIPERBAIKI
                    className="group block h-full rounded-2xl bg-white
                               border border-slate-200 overflow-hidden
                               hover:border-[#1e88e5]/40
                               transition-colors duration-200
                               focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                  >
                    <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.alt}
                        width={400}
                        height={300}
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4 sm:p-5">
                      <h3 className="font-semibold text-slate-900 text-[0.9375rem] sm:text-base leading-snug">
                        {item.name}
                      </h3>
                      <p className="text-slate-600 mt-1.5 text-sm leading-relaxed">
                        {item.desc}
                      </p>
                      <span className="inline-flex items-center gap-1 mt-3 text-[#1565c0] text-xs font-semibold">
                        {lang === "en" ? "View detail" : "Lihat detail"}
                        <IconArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </Reveal>

        {/* ═══ 5. CTA (Paling Bawah) ═══ */}
        <Reveal y={24}>
          <div
            className="relative mt-16 sm:mt-24 rounded-3xl overflow-hidden
                       bg-gradient-to-br from-slate-900 via-slate-900 to-[#0f2744]
                       p-9 sm:p-14 lg:p-16 text-center
                       shadow-xl shadow-slate-900/30 border border-slate-800 ring-1 ring-white/5"
          >
            <div
              aria-hidden="true"
              className="absolute -top-10 right-0 w-72 h-72 bg-[#1e88e5] rounded-full blur-3xl opacity-30 pointer-events-none"
            />
            <div aria-hidden="true" className="absolute inset-0 opacity-[0.05]">
              <svg className="w-full h-full">
                <pattern id="cta-grid-kerikil" width="32" height="32" patternUnits="userSpaceOnUse">
                  <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#cta-grid-kerikil)" />
              </svg>
            </div>

            <div className="relative z-10">
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                           bg-white/10 border border-white/15 mb-6"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                <span className="text-[#4da3ff] text-[10px] sm:text-xs uppercase tracking-[0.25em] font-bold">
                  {d.ctaBadge}
                </span>
              </div>

              <h2
                className="text-white font-light tracking-tight leading-snug mb-8 sm:mb-10 text-balance"
                style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)" }}
              >
                {d.ctaTitle1}
                <span className="font-bold">{d.ctaTitle2}</span>
              </h2>

              <a
                href={`https://wa.me/6282258089367?text=${encodeURIComponent(d.ctaWaText)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${d.ctaButton} (buka di tab baru)`}
                className="inline-flex min-h-14 items-center justify-center gap-2.5
                           px-8 sm:px-10 py-4 rounded-xl
                           bg-gradient-to-r from-[#25D366] to-[#1fbe5c]
                           hover:from-[#2be172] hover:to-[#25D366]
                           text-slate-900 font-bold
                           uppercase tracking-[0.12em] sm:tracking-[0.15em]
                           shadow-lg shadow-[#25D366]/30 ring-1 ring-white/20
                           transition-colors duration-200
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
