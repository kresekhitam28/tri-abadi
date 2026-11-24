// src/components/BatuKali.jsx
"use client";

import { useState, useCallback, memo } from "react";
import Image from "next/image";
import { useLang } from "../context/LanguageContext";
import MaterialDeliveryInfo from "./MaterialDeliveryInfo";
import Reveal from "./Reveal";
// INTEGRASI DENGAN METADATA HELPER MILIKMU
import { SITE_URL, serializeJsonLd } from "../lib/metadata";

// ─────────────────────────────────────────────
// KONFIG — DISESUAIKAN DENGAN ROUTE /supplier/
// ─────────────────────────────────────────────
const PRODUCT_SLUG = "batu-kali";
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
function IconCheck({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M5 12l5 5L20 7" />
    </svg>
  );
}

const BODY_FONT = { fontSize: "clamp(0.875rem, 1.5vw, 0.9375rem)" };
const BODY_CLASS = "text-slate-700 leading-[1.9]";

// ─────────────────────────────────────────────
// ACCORDION
// ─────────────────────────────────────────────
const Accordion = memo(function Accordion({
  id, index, number, title, isOpen, onToggle, children,
}) {
  const buttonId = `batu-kali-btn-${id}`;
  const panelId = `batu-kali-panel-${id}`;

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
            <div className="pt-5 text-slate-600 leading-[1.9] space-y-3.5">
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
    title: "Batu Kali / Batu Belah",
    subtitle: "Jual Batu Kali atau Batu Belah Murah Berkualitas",
    thumbImage: "/produk/batu-kali.png",
    imageAlt: "Tumpukan batu kali dan batu belah untuk pondasi bangunan",
    sectionWhat: "Mengenal Batu Kali",

    sectionManfaat: "Manfaat Batu Kali",
    sectionManfaatTitle1: "Manfaat ",
    sectionManfaatTitle2: "Batu Kali",
    sectionManfaatTitle3: " untuk Konstruksi",

    sectionJenis: "Jenis-Jenis Batu Belah",
    sectionJenisTitle1: "Jenis-Jenis ",
    sectionJenisTitle2: "Batu Belah",
    sectionJenisTitle3: " Berdasarkan Ukuran",

    intro: [
      "Batu Kali (batu belah) merupakan material alam yang dihasilkan dari proses pembelahan bongkahan batu besar menjadi bongkahan yang lebih kecil dengan ukuran beragam.",
      "Material ini banyak digunakan sebagai bahan campuran beton, material pondasi bangunan, hingga lapis pondasi jalan.",
      "Kami menyediakan batu kali dan batu belah dengan kualitas terjamin, siap antar ke lokasi proyek Anda.",
    ],

    generalIntro: [
      "Batu kali umumnya berasal dari sungai atau kali, sedangkan batu belah berasal dari batu gunung yang dibelah.",
      "Berdasarkan ukurannya, batu belah dikelompokkan menjadi beberapa jenis dengan aplikasi yang berbeda-beda.",
      "Berikut manfaat dan jenis-jenis batu kali yang perlu Anda ketahui.",
    ],

    manfaat: [
      "Bahan campuran beton (agregat kasar) bersama pasir, semen, dan air untuk menghasilkan struktur yang kokoh.",
      "Material pondasi bangunan — baik pondasi menerus, pondasi batu kali, maupun pondasi telapak.",
      "Lapis pondasi bawah (sub-base) pada konstruksi jalan sebelum ditutup material aspal atau paving.",
      "Bahan pengisi (rip-rap) pada tanggul, bantaran sungai, dan struktur pemecah gelombang.",
      "Pemberat pipa dasar laut, bantalan rel kereta api, dan pengisi struktur bawah air lainnya.",
      "Menghasilkan konstruksi yang kokoh, tahan lama, dan tidak mudah rapuh bila komposisi campuran tepat.",
    ],

    jenisIntro: [
      "Berdasarkan ukurannya, batu belah dikelompokkan menjadi beberapa jenis.",
      "Setiap ukuran memiliki kegunaan yang berbeda, mulai dari campuran aspal hingga pondasi bangunan.",
      "Berikut jenis-jenis batu belah yang umum digunakan dalam konstruksi.",
    ],

    jenisItems: [
      {
        title: "Ukuran 0 – 5 mm (Abu Batu Halus)",
        paragraphs: [
          "Butirannya sangat halus dan hampir menyerupai pasir halus atau abu.",
          "Umumnya digunakan sebagai campuran material pengaspalan jalan, pengganti pasir, pembuatan batako, dan pemasangan paving block.",
          "Dibandingkan pasir, material ini memiliki daya ikat yang lebih kuat dan harga yang lebih ekonomis.",
          "Karena itulah abu batu halus banyak dipakai pada pekerjaan paving block dan beton non-struktural.",
        ],
      },
      {
        title: "Ukuran 5 – 10 mm (Screening)",
        paragraphs: [
          "Ukurannya sedikit lebih besar dari jenis sebelumnya, namun fungsinya serupa.",
          "Material ini sering digunakan sebagai campuran aspal karena ukurannya relatif kecil dan mudah dipadatkan.",
          "Dalam dunia konstruksi, ukuran ini umum disebut sebagai screening.",
          "Screening juga cocok untuk campuran beton halus dan lapisan perataan.",
        ],
      },
      {
        title: "Ukuran 10 – 20 mm (Split Beton)",
        paragraphs: [
          "Ukuran ini paling umum digunakan sebagai agregat kasar untuk pengecoran beton struktural.",
          "Cocok untuk konstruksi ringan hingga berat, seperti kolom, balok, plat lantai, dan pondasi beton bertulang.",
          "Pada produksi beton ready mix, ukuran ini digunakan untuk campuran beton mutu K-200 ke bawah.",
          "Butirannya yang seragam memudahkan proses pengadukan dan menghasilkan beton yang lebih padat.",
        ],
      },
      {
        title: "Ukuran 20 – 30 mm (Split Besar)",
        paragraphs: [
          "Ukuran ini umum digunakan untuk pengecoran lantai kerja (lean concrete) dan struktur beton massal.",
          "Cocok untuk pembetonan horizontal seperti pondasi, kolom besar, tiang pancang, dan struktur sejenis.",
          "Ukuran yang lebih besar membantu mengisi volume besar dengan lebih efisien.",
          "Aplikasi biasanya dipadukan dengan alat bantu pengecoran berkapasitas besar.",
        ],
      },
      {
        title: "Ukuran 30 – 50 mm (Batu Belah Besar)",
        paragraphs: [
          "Ukuran cukup besar sehingga umum digunakan sebagai bahan dasar lapisan perkerasan jalan sebelum ditutup material lain.",
          "Berfungsi sebagai lapisan pertama yang memberikan kestabilan struktur bawah jalan.",
          "Selain itu, batu jenis ini juga digunakan sebagai penyangga bantalan rel kereta api.",
          "Aplikasi lain meliputi pemberat pipa bawah laut dan struktur penahan tanah.",
        ],
      },
      {
        title: "Batu Kali Hitam 10 – 40 cm (Batu Belah Pondasi)",
        paragraphs: [
          "Jenis ini diperoleh dari belahan batu kali atau batu gunung berwarna hitam keabu-abuan.",
          "Kualitasnya sangat baik sebagai material pondasi bangunan dan struktur jembatan.",
          "Memiliki pinggiran yang runcing sehingga mampu mengikat dengan erat saat dicampur dengan mortar semen.",
          "Karena ikatannya kuat, batu ini banyak digunakan untuk pondasi menerus, pondasi umpak, dan dinding penahan tanah.",
        ],
      },
    ],

    ctaBadge: "Konsultasi Gratis",
    ctaTitle1: "Butuh Batu Kali? ",
    ctaTitle2: "Kami siap membantu.",
    ctaButton: "Hubungi via WhatsApp",
    ctaWaText: "Halo Tri Abadi Makmur, saya ingin pesan batu kali...",

    relatedTitle: "Produk Lainnya",
    relatedSubtitle: "Material konstruksi lain yang sering dipesan bersama batu kali.",
    relatedItems: [
      {
        slug: "abu-batu",
        name: "Abu Batu",
        desc: "Material pengganti pasir halus untuk campuran beton dan pengaspalan.",
        image: "/produk/abu-batu.png",
        alt: "Tumpukan abu batu halus untuk campuran konstruksi",
      },
      {
        slug: "base-course",
        name: "Base Course",
        desc: "Lapis pondasi atas jalan dari campuran batu pecah dan abu batu.",
        image: "/produk/base-course.png",
        alt: "Tumpukan batu base course untuk lapis pondasi jalan",
      },
      {
        slug: "batu-makadam",
        name: "Batu Makadam",
        desc: "Batu pecah ukuran 5–10 cm untuk lapis pondasi jalan dan area parkir.",
        image: "/produk/batu-makadam.png",
        alt: "Batu makadam pecah untuk lapis pondasi jalan",
      },
    ],
  },

  en: {
    title: "River Stone / Split Stone",
    subtitle: "Selling Cheap & Quality River Stone or Split Stone",
    thumbImage: "/produk/batu-kali.png",
    imageAlt: "Pile of river stones and split stones for building foundations",
    sectionWhat: "About River Stone",

    sectionManfaat: "Benefits of River Stone",
    sectionManfaatTitle1: "Benefits of ",
    sectionManfaatTitle2: "River Stone",
    sectionManfaatTitle3: " for Construction",

    sectionJenis: "Types of Split Stone",
    sectionJenisTitle1: "Types of ",
    sectionJenisTitle2: "Split Stone",
    sectionJenisTitle3: " by Size",

    intro: [
      "River Stone (split stone) is a natural material produced by splitting large stone boulders into smaller chunks of various sizes.",
      "This material is widely used as a concrete mixture, building foundation material, and road foundation layer.",
      "We provide river stone and split stone with guaranteed quality, ready for delivery to your project site.",
    ],

    generalIntro: [
      "River stone generally comes from rivers or streams, while split stone comes from mountain stone that has been split.",
      "Based on size, split stone is grouped into several types with different applications.",
      "Here are the benefits and types of river stone you should know.",
    ],

    manfaat: [
      "Concrete mixture material (coarse aggregate) together with sand, cement, and water to produce a solid structure.",
      "Building foundation material — continuous foundation, river stone foundation, or pad foundation.",
      "Sub-base layer in road construction before being covered with asphalt or paving.",
      "Fill material (rip-rap) for embankments, riverbanks, and breakwater structures.",
      "Ballast for submarine pipelines, railway bearings, and underwater structure fillers.",
      "Produces solid, durable construction that is not easily brittle when the mix composition is correct.",
    ],

    jenisIntro: [
      "Based on size, split stone is grouped into several types.",
      "Each size has a different use, ranging from asphalt mixtures to building foundations.",
      "Here are the types of split stone commonly used in construction.",
    ],

    jenisItems: [
      {
        title: "Size 0 – 5 mm (Fine Stone Dust)",
        paragraphs: [
          "Its grains are very fine and almost resemble fine sand or ash.",
          "Generally used as a mixture material for road asphalt paving, sand substitute, brick making, and paving block installation.",
          "Compared to sand, this material has stronger binding power and a more economical price.",
          "That is why fine stone dust is widely used in paving block work and non-structural concrete.",
        ],
      },
      {
        title: "Size 5 – 10 mm (Screening)",
        paragraphs: [
          "Slightly larger than the previous type, but with a similar function.",
          "This material is often used as an asphalt mixture because of its relatively small size and easy compaction.",
          "In construction, this size is commonly called screening.",
          "Screening is also suitable for fine concrete mixtures and leveling layers.",
        ],
      },
      {
        title: "Size 10 – 20 mm (Concrete Split)",
        paragraphs: [
          "This size is the most commonly used as coarse aggregate for structural concrete casting.",
          "Suitable for light to heavy construction, such as columns, beams, floor slabs, and reinforced concrete foundations.",
          "In ready mix concrete production, this size is used for concrete mixtures of grade K-200 and below.",
          "Its uniform grains make mixing easier and produce denser concrete.",
        ],
      },
      {
        title: "Size 20 – 30 mm (Large Split)",
        paragraphs: [
          "This size is commonly used for lean concrete casting and mass concrete structures.",
          "Suitable for horizontal concreting such as foundations, large columns, piles, and similar structures.",
          "The larger size helps fill large volumes more efficiently.",
          "Applications are usually combined with high-capacity casting equipment.",
        ],
      },
      {
        title: "Size 30 – 50 mm (Large Split Stone)",
        paragraphs: [
          "Its size is quite large, so it is commonly used as the base layer of road pavement before being covered with other materials.",
          "It functions as the first layer providing stability to the road sub-structure.",
          "In addition, this stone is also used as a support for railway bearings.",
          "Other applications include submarine pipe ballast and retaining structures.",
        ],
      },
      {
        title: "Black River Stone 10 – 40 cm (Foundation Split Stone)",
        paragraphs: [
          "This type is obtained from split river stone or grayish-black mountain stone.",
          "Its quality is excellent as a material for building foundations and bridge structures.",
          "It has sharp edges that can bind tightly when mixed with cement mortar.",
          "Because of its strong bond, this stone is widely used for continuous foundations, pad foundations, and retaining walls.",
        ],
      },
    ],

    ctaBadge: "Free Consultation",
    ctaTitle1: "Need River Stone? ",
    ctaTitle2: "We're ready to help.",
    ctaButton: "Contact via WhatsApp",
    ctaWaText: "Hello Tri Abadi Makmur, I would like to order river stone...",

    relatedTitle: "Other Products",
    relatedSubtitle: "Other construction materials frequently ordered together with river stone.",
    relatedItems: [
      {
        slug: "abu-batu",
        name: "Stone Dust",
        desc: "Fine sand substitute material for concrete mixtures and asphalt paving.",
        image: "/produk/abu-batu.png",
        alt: "Pile of fine stone dust for construction mixtures",
      },
      {
        slug: "base-course",
        name: "Base Course",
        desc: "Road upper foundation layer made from a mixture of crushed stone and stone dust.",
        image: "/produk/base-course.png",
        alt: "Pile of base course stone for road foundation layer",
      },
      {
        slug: "batu-makadam",
        name: "Macadam Stone",
        desc: "5–10 cm crushed stone for road base layers and parking areas.",
        image: "/produk/batu-makadam.png",
        alt: "Crushed macadam stone for road base layer",
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
        mainEntity: d.jenisItems.map((item) => ({
          "@type": "Question",
          name: item.title,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.paragraphs.join(" "),
          },
        })),
      },
    ],
  };
}

// ─────────────────────────────────────────────
// HALAMAN: BATU KALI
// ─────────────────────────────────────────────
export default function BatuKali() {
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
      aria-labelledby="batu-kali-heading"
      className="relative bg-gradient-to-b from-slate-50 via-white to-slate-50/70
                 pt-28 lg:pt-36 pb-20 lg:pb-28 overflow-hidden antialiased
                 selection:bg-[#1e88e5]/20 [text-wrap:pretty]"
    >
      {/* ── JSON-LD: Breadcrumb + FAQ ── */}
      <script
        type="application/ld+json"
        // GUNAKAN serializeJsonLd MILIKMU
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
              id="batu-kali-heading"
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
          specification={{ id: "Batu kali atau batu belah dengan ukuran sesuai kebutuhan pekerjaan pondasi.", en: "River stone or split stone sized for the foundation work." }}
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
                         bg-gradient-to-r from-[#1e88e5] via-blue-400 to-violet-400"
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

        {/* ═══ 3. CALLOUT PEMBUKA ═══ */}
        <Reveal y={20}>
          <aside
            className="relative rounded-2xl
                       bg-gradient-to-br from-slate-50 via-white to-violet-50/60
                       border border-slate-200 shadow-sm
                       p-5 sm:p-7 mb-12 sm:mb-16 overflow-hidden"
          >
            <span
              aria-hidden="true"
              className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#1e88e5] to-[#1565c0]"
            />
            <div aria-hidden="true" className="absolute top-3 right-3 opacity-[0.08]">
              <svg width="80" height="80" viewBox="0 0 80 80">
                <pattern id="dots-kali-1" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1" fill="#1e88e5" />
                </pattern>
                <rect width="80" height="80" fill="url(#dots-kali-1)" />
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
                {d.generalIntro.map((p, i) => (
                  <p key={i} className="text-slate-600 leading-[1.85] first:text-slate-800 first:font-medium" style={BODY_FONT}>
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </aside>
        </Reveal>

        {/* ═══ 4. MANFAAT BATU KALI ═══ */}
        <Reveal y={16}>
          <div className="text-center mb-6 sm:mb-8">
            <div
              className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full
                         bg-white border border-[#1e88e5]/20 shadow-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#1e88e5]" aria-hidden="true" />
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#1565c0] font-bold">
                {d.sectionManfaat}
              </span>
            </div>

            <h2
              className="font-light tracking-tight text-slate-900 leading-tight text-balance max-w-2xl mx-auto"
              style={{ fontSize: "clamp(1.35rem, 3.2vw, 1.9rem)" }}
            >
              {d.sectionManfaatTitle1}
              <span className="relative inline-block font-semibold text-slate-900">
                {d.sectionManfaatTitle2}
                <span
                  aria-hidden="true"
                  className="absolute left-0 right-0 -bottom-1 h-1.5 bg-gradient-to-r from-[#1e88e5]/40 to-[#1e88e5]/10 rounded-full"
                />
              </span>
              {d.sectionManfaatTitle3}
            </h2>
          </div>
        </Reveal>

        {/* 4b. MANFAAT GRID */}
        <Reveal y={20}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 mb-12 sm:mb-16">
            {d.manfaat.map((item, i) => (
              <div
                key={i}
                className="group/card flex items-start gap-3.5 p-4 sm:p-5 rounded-2xl
                           border border-slate-200 bg-white shadow-sm
                           hover:border-[#1e88e5]/40 hover:shadow-md
                           transition-colors duration-200"
              >
                <span
                  aria-hidden="true"
                  className="shrink-0 mt-0.5 w-6 h-6 rounded-full bg-[#1e88e5]/10 text-[#1565c0]
                             flex items-center justify-center
                             transition-colors duration-200
                             group-hover/card:bg-[#1e88e5] group-hover/card:text-white"
                >
                  <IconCheck className="w-3.5 h-3.5" />
                </span>
                <span className="text-slate-700 leading-[1.7]" style={BODY_FONT}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        {/* ═══ 5. JENIS-JENIS BATU BELAH ═══ */}
        <Reveal y={16}>
          <div className="text-center mb-6 sm:mb-8">
            <div
              className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full
                         bg-white border border-[#1e88e5]/20 shadow-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#1e88e5]" aria-hidden="true" />
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#1565c0] font-bold">
                {d.sectionJenis}
              </span>
            </div>

            <h2
              className="font-light tracking-tight text-slate-900 leading-tight text-balance max-w-2xl mx-auto"
              style={{ fontSize: "clamp(1.35rem, 3.2vw, 1.9rem)" }}
            >
              {d.sectionJenisTitle1}
              <span className="relative inline-block font-semibold text-slate-900">
                {d.sectionJenisTitle2}
                <span
                  aria-hidden="true"
                  className="absolute left-0 right-0 -bottom-1 h-1.5 bg-gradient-to-r from-[#1e88e5]/40 to-[#1e88e5]/10 rounded-full"
                />
              </span>
              {d.sectionJenisTitle3}
            </h2>
          </div>
        </Reveal>

        <Reveal y={20}>
          <aside
            className="relative rounded-2xl
                       bg-gradient-to-br from-slate-50 via-white to-violet-50/60
                       border border-slate-200 shadow-sm
                       p-5 sm:p-7 mb-8 sm:mb-10 overflow-hidden"
          >
            <span
              aria-hidden="true"
              className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#1e88e5] to-[#1565c0]"
            />
            <div aria-hidden="true" className="absolute top-3 right-3 opacity-[0.08]">
              <svg width="80" height="80" viewBox="0 0 80 80">
                <pattern id="dots-kali-2" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1" fill="#1e88e5" />
                </pattern>
                <rect width="80" height="80" fill="url(#dots-kali-2)" />
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
                {d.jenisIntro.map((p, i) => (
                  <p key={i} className="text-slate-600 leading-[1.85] first:text-slate-800 first:font-medium" style={BODY_FONT}>
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </aside>
        </Reveal>

        {/* 5c. ACCORDION JENIS */}
        <Reveal y={20}>
          <div>
            {d.jenisItems.map((item, i) => {
              const number = String(i + 1).padStart(2, "0");
              return (
                <Accordion
                  key={item.title}
                  id={`jenis-${i + 1}`}
                  index={i}
                  number={number}
                  title={item.title}
                  isOpen={openIndex === i}
                  onToggle={toggle}
                >
                  <div className="space-y-3.5">
                    {item.paragraphs.map((p, j) => (
                      <p key={j}>{p}</p>
                    ))}
                  </div>
                </Accordion>
              );
            })}
          </div>
        </Reveal>

        {/* ═══ 6. RELATED PRODUCTS ═══ */}
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

        {/* ═══ 7. CTA (Paling Bawah) ═══ */}
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
                <pattern id="cta-grid-kali" width="32" height="32" patternUnits="userSpaceOnUse">
                  <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#cta-grid-kali)" />
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
