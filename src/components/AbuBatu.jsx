// src/components/AbuBatu.jsx
"use client";

import { useState, useCallback, memo } from "react";
import Image from "next/image";
import { useLang } from "../context/LanguageContext";
import MaterialDeliveryInfo from "./MaterialDeliveryInfo";
import Reveal from "./Reveal";
// IMPORT DARI METADATA HELPER MILIKMU
import { SITE_URL, SITE_NAME, SITE_ENTITY_ID, serializeJsonLd } from "../lib/metadata";

// ─────────────────────────────────────────────
// KONFIG — DINAMIS
// ─────────────────────────────────────────────
const PRODUCT_SLUG = "abu-batu";
const PRODUCT_URL = `${SITE_URL}/supplier/${PRODUCT_SLUG}`;
const PRODUCT_IMAGE = `${SITE_URL}/produk/abu-batu.png`;

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

const BODY_FONT = { fontSize: "clamp(0.9375rem, 1.6vw, 1rem)" };

// ─────────────────────────────────────────────
// ACCORDION
// ─────────────────────────────────────────────
const Accordion = memo(function Accordion({
  id, index, number, title, isOpen, onToggle, children,
}) {
  const buttonId = `abu-batu-btn-${id}`;
  const panelId = `abu-batu-panel-${id}`;

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
    title: "Abu Batu",
    subtitle: "Menjual Abu Batu Siap Antar",
    thumbImage: "/produk/abu-batu.png",
    imageAlt: "Tumpukan abu batu halus untuk campuran beton, mortar, dan paving block",
    sectionWhat: "Mengenal Abu Batu",

    sectionAdvantages: "Keunggulan Abu Batu",
    sectionAdvantagesTitle1: "Keunggulan ",
    sectionAdvantagesTitle2: "Abu Batu",
    sectionAdvantagesTitle3: " untuk Konstruksi",

    intro: [
      "Abu Batu merupakan salah satu material konstruksi yang berasal dari hasil sampingan proses pemecahan batu dan industri semen.",
      "Material ini umum digunakan sebagai bahan pendukung atau campuran dalam proses pengaspalan, sekaligus sebagai material pengganti pasir.",
      "Wujudnya menyerupai abu dengan tekstur butiran halus berukuran sekitar 0,075 mm, sehingga mudah diaplikasikan pada berbagai pekerjaan konstruksi.",
    ],

    advantageIntro: [
      "Pada umumnya, abu batu digunakan sebagai campuran beton, mortar, dan material dasar pembuatan paving block.",
      "Hampir 80% produksi grass block, batako, paving block, dan produk konstruksi sejenis memanfaatkan abu batu sebagai pengganti pasir.",
      "Penggunaan abu batu sebagai pengganti pasir didasari oleh berbagai keunggulan teknis dan ekonomis yang ditawarkannya.",
      "Berikut beberapa keunggulan abu batu yang perlu Anda ketahui.",
    ],

    accordionItems: [
      {
        title: "Ukuran Partikel Halus & Seragam",
        paragraphs: [
          "Butiran abu batu jauh lebih kecil dibandingkan pasir, yaitu sekitar 0,075 mm.",
          "Ukurannya yang halus menyerupai abu atau debu membuatnya mudah tercampur dengan semen dan air.",
          "Karena telah melalui proses pengayakan di tempat pemecahan batu, abu batu tidak memerlukan pengayakan ulang saat digunakan.",
          "Ukuran partikel yang seragam menghasilkan campuran yang lebih homogen dan permukaan akhir yang lebih rapi.",
        ],
      },
      {
        title: "Daya Ikat Lebih Kuat",
        paragraphs: [
          "Abu batu memiliki daya ikat yang lebih baik dibandingkan pasir, terutama saat terkena air.",
          "Pasir cenderung lebih mudah terurai jika terkena air, sedangkan abu batu justru semakin mengikat dan mengeras.",
          "Kemampuan ini berasal dari teksturnya yang tajam, sebagai hasil sampingan proses pemecahan batu.",
          "Oleh karena itu, abu batu sangat tepat digunakan sebagai material pendukung pemasangan paving block dan campuran beton.",
        ],
      },
      {
        title: "Lebih Hemat Semen",
        paragraphs: [
          "Penggunaan abu batu dapat menghemat pemakaian semen dibandingkan pasir biasa.",
          "Teksturnya yang tajam menciptakan ikatan kuat, sehingga hanya membutuhkan sedikit tambahan semen.",
          "Sebaliknya, penggunaan pasir membutuhkan lebih banyak semen untuk memperoleh daya ikat yang setara.",
          "Penghematan semen ini berdampak langsung pada efisiensi biaya proyek secara keseluruhan.",
        ],
      },
      {
        title: "Harga Lebih Ekonomis",
        paragraphs: [
          "Harga abu batu umumnya lebih murah dibandingkan pasir berkualitas.",
          "Sebagai gambaran, pasir kualitas baik dapat mencapai Rp 350.000 per m³, sedangkan abu batu berkisar Rp 260.000 per m³.",
          "Meskipun harga di setiap daerah berbeda, secara umum abu batu tetap lebih ekonomis.",
          "Dengan harga yang lebih terjangkau, Anda tetap memperoleh kualitas material yang mendukung kekuatan konstruksi.",
        ],
      },
      {
        title: "Tidak Rentan Gulma",
        paragraphs: [
          "Abu batu cenderung tidak memberi ruang bagi gulma untuk tumbuh di sela-sela paving block.",
          "Sifat ini berbeda dari pasir yang lebih mudah ditumbuhi gulma setelah pemasangan paving.",
          "Permukaan paving block yang diisi abu batu lebih rapat, bersih, dan tahan lama.",
          "Keunggulan ini sangat menguntungkan untuk area parkir, jalan lingkungan, dan trotoar.",
        ],
      },
    ],

    ctaBadge: "Konsultasi Gratis",
    ctaTitle1: "Butuh Abu Batu? ",
    ctaTitle2: "Kami siap membantu.",
    ctaButton: "Hubungi via WhatsApp",
    ctaWaText: "Halo Tri Abadi Makmur, saya ingin pesan abu batu...",

    relatedTitle: "Produk Lainnya",
    relatedSubtitle: "Material konstruksi lain yang sering dipesan bersama abu batu.",
    relatedItems: [
      {
        slug: "supplier/batu-makadam",
        name: "Batu Makadam",
        desc: "Batu pecah ukuran 5–10 cm untuk lapis pondasi jalan dan area parkir.",
        image: "/produk/batu-makadam.png",
        alt: "Batu makadam pecah untuk lapis pondasi jalan",
      },
      {
        slug: "supplier/pasir-beton",
        name: "Pasir Beton",
        desc: "Pasir berkualitas untuk campuran beton struktural dan plesteran.",
        image: "/produk/pasir-beton.png",
        alt: "Pasir beton halus untuk campuran bangunan",
      },
      {
        slug: "supplier/batu-split",
        name: "Batu Split",
        desc: "Batu split berbagai ukuran untuk cor beton dan pengaspalan.",
        image: "/produk/batu-split.png",
        alt: "Batu split pecahan untuk campuran cor beton",
      },
    ],
  },

  en: {
    title: "Stone Dust",
    subtitle: "Selling Stone Dust, Ready for Delivery",
    thumbImage: "/produk/abu-batu.png",
    imageAlt: "Pile of fine stone dust for concrete, mortar, and paving block mixtures",
    sectionWhat: "About Stone Dust",

    sectionAdvantages: "Stone Dust Advantages",
    sectionAdvantagesTitle1: "Advantages of ",
    sectionAdvantagesTitle2: "Stone Dust",
    sectionAdvantagesTitle3: " for Construction",

    intro: [
      "Stone Dust is a construction material derived from the by-product of stone crushing and the cement industry.",
      "It is commonly used as a supporting material or mixture in asphalt paving, as well as a substitute for sand.",
      "It looks like ash with a fine granular texture of about 0.075 mm in size, making it easy to apply in various construction works.",
    ],

    advantageIntro: [
      "Generally, stone dust is used as a mixture for concrete, mortar, and the base material for paving block production.",
      "Nearly 80% of grass block, brick, paving block, and similar construction products use stone dust as a sand substitute.",
      "The use of stone dust as a sand substitute is driven by the various technical and economic advantages it offers.",
      "Here are several advantages of stone dust you should know.",
    ],

    accordionItems: [
      {
        title: "Fine & Uniform Particle Size",
        paragraphs: [
          "Stone dust grains are much smaller than sand, around 0.075 mm.",
          "Its ash-like fine size makes it easy to mix with cement and water.",
          "Because it has gone through a sieving process at the stone crushing site, stone dust does not require re-sieving before use.",
          "The uniform particle size produces a more homogeneous mixture and a neater final surface.",
        ],
      },
      {
        title: "Stronger Binding Power",
        paragraphs: [
          "Stone dust has better binding power than sand, especially when exposed to water.",
          "Sand tends to break down more easily when exposed to water, whereas stone dust binds more strongly and hardens.",
          "This ability comes from its sharp texture, a characteristic of the stone crushing by-product.",
          "Therefore, stone dust is highly suitable as a supporting material for paving block installation and concrete mixtures.",
        ],
      },
      {
        title: "Saves More Cement",
        paragraphs: [
          "Using stone dust can save cement usage compared to regular sand.",
          "Its sharp texture creates a strong bond, requiring only a small amount of additional cement.",
          "Conversely, using sand requires more cement to achieve an equivalent binding strength.",
          "This cement savings directly impacts the overall cost efficiency of the project.",
        ],
      },
      {
        title: "More Economical Price",
        paragraphs: [
          "Stone dust is generally cheaper than quality sand.",
          "As an illustration, good quality sand can reach IDR 350,000 per m³, while stone dust is around IDR 260,000 per m³.",
          "Although prices vary by region, stone dust is generally more economical.",
          "With a more affordable price, you still get material quality that supports construction strength.",
        ],
      },
      {
        title: "Not Prone to Weeds",
        paragraphs: [
          "Stone dust tends not to give weeds room to grow between paving blocks.",
          "This is different from sand, which is more easily overgrown by weeds after paving installation.",
          "Paving block surfaces filled with stone dust are denser, cleaner, and more durable.",
          "This advantage is very beneficial for parking areas, neighborhood roads, and sidewalks.",
        ],
      },
    ],

    ctaBadge: "Free Consultation",
    ctaTitle1: "Need Stone Dust? ",
    ctaTitle2: "We're ready to help.",
    ctaButton: "Contact via WhatsApp",
    ctaWaText: "Hello Tri Abadi Makmur, I would like to order stone dust...",

    relatedTitle: "Other Products",
    relatedSubtitle: "Other construction materials frequently ordered together with stone dust.",
    relatedItems: [
      {
        slug: "supplier/batu-makadam",
        name: "Macadam Stone",
        desc: "5–10 cm crushed stone for road base layers and parking areas.",
        image: "/produk/batu-makadam.png",
        alt: "Crushed macadam stone for road base layer",
      },
      {
        slug: "supplier/pasir-beton",
        name: "Concrete Sand",
        desc: "Quality sand for structural concrete mixtures and plastering.",
        image: "/produk/pasir-beton.png",
        alt: "Fine concrete sand for building mixtures",
      },
      {
        slug: "supplier/batu-split",
        name: "Split Stone",
        desc: "Split stone in various sizes for concrete casting and asphalt paving.",
        image: "/produk/batu-split.png",
        alt: "Split stone for concrete casting mixtures",
      },
    ],
  },
};

// ─────────────────────────────────────────────
// JSON-LD HELPER (DIOPTIMALKAN)
// ─────────────────────────────────────────────
function buildJsonLd(d) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `${PRODUCT_URL}#product`,
        name: d.title,
        image: [PRODUCT_IMAGE],
        description: d.intro.join(" "),
        brand: { 
          "@type": "Brand", 
          "@id": SITE_ENTITY_ID,
          name: SITE_NAME 
        },
        category: "Construction Materials",
      },
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
            text: item.paragraphs.join(" "),
          },
        })),
      },
    ],
  };
}

// ─────────────────────────────────────────────
// HALAMAN: ABU BATU
// ─────────────────────────────────────────────
export default function AbuBatu() {
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
      aria-labelledby="abu-batu-heading"
      className="relative bg-gradient-to-b from-slate-50 via-white to-slate-50/70
                 pt-28 lg:pt-36 pb-20 lg:pb-28 overflow-hidden antialiased
                 selection:bg-[#1e88e5]/20 [text-wrap:pretty]"
    >
      {/* ── JSON-LD: Product + Breadcrumb + FAQ ── */}
      <script
        type="application/ld+json"
        // MENGGUNAKAN serializeJsonLd UNTUK KEAMANAN XSS
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
          <div className="text-center mb-14 sm:mb-20">
            <div className="inline-flex items-center gap-2.5 sm:gap-3 mb-6">
              <span
                className="w-8 sm:w-14 h-px bg-gradient-to-r from-transparent to-[#1565c0]"
                aria-hidden="true"
              />
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.28em] sm:tracking-[0.32em] text-[#1565c0] font-bold">
                {d.title}
              </span>
              <span
                className="w-8 sm:w-14 h-px bg-gradient-to-l from-transparent to-[#1565c0]"
                aria-hidden="true"
              />
            </div>
            <h1
              id="abu-batu-heading"
              className="font-semibold tracking-tight text-slate-900 leading-[1.1] text-balance max-w-3xl mx-auto"
              style={{ fontSize: "clamp(2rem, 5.2vw, 3.1rem)" }}
            >
              {d.subtitle}
              <span className="text-[#1e88e5]">.</span>
            </h1>

            <div className="flex items-center justify-center gap-1.5 mt-7" aria-hidden="true">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
              <span className="w-10 h-1.5 rounded-full bg-[#1e88e5]" />
            </div>
          </div>
        </Reveal>

        <MaterialDeliveryInfo
          lang={lang}
          specification={{ id: "Abu batu berbutir halus. Konfirmasi gradasi sesuai kebutuhan campuran.", en: "Fine stone dust. Confirm the grading for your mix." }}
        />

        {/* ═══ 2. INTRO CARD ═══ */}
        <Reveal y={28} duration={600}>
          <div
            className="relative rounded-3xl bg-white border border-slate-200/80
                       shadow-xl shadow-slate-300/30
                       mb-12 sm:mb-16 overflow-hidden"
          >
            <div
              aria-hidden="true"
              className="absolute top-0 left-0 right-0 h-1.5
                         bg-gradient-to-r from-[#1e88e5] via-blue-400 to-amber-400"
            />

            <div className="p-6 sm:p-9 lg:p-12">
              <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8 md:gap-10 lg:gap-12 items-start">

                <div className="relative">
                  <div
                    className="relative w-full max-w-[280px] mx-auto md:mx-0
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
                        sizes="(max-width: 768px) 280px, 280px"
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
                  <div className="space-y-4">
                    {d.intro.map((p, i) => (
                      <p
                        key={i}
                        className="text-slate-600 leading-[1.9]
                                   first:text-slate-900 first:font-medium first:text-[1.0625rem] first:leading-[1.8]"
                        style={BODY_FONT}
                      >
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
          <div className="text-center mb-7 sm:mb-9">
            <div
              className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full
                         bg-white border border-[#1e88e5]/20 shadow-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#1e88e5]" aria-hidden="true" />
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#1565c0] font-bold">
                {d.sectionAdvantages}
              </span>
            </div>

            <h2
              className="font-light tracking-tight text-slate-900 leading-tight text-balance max-w-2xl mx-auto"
              style={{ fontSize: "clamp(1.5rem, 3.6vw, 2.15rem)" }}
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
                       bg-gradient-to-br from-slate-50 via-white to-blue-50/60
                       border border-slate-200 shadow-sm
                       p-6 sm:p-8 mb-9 sm:mb-12 overflow-hidden"
          >
            <span
              aria-hidden="true"
              className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#1e88e5] to-[#1565c0]"
            />
            <div aria-hidden="true" className="absolute top-3 right-3 opacity-[0.08]">
              <svg width="80" height="80" viewBox="0 0 80 80">
                <pattern id="dots-abu" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1" fill="#1e88e5" />
                </pattern>
                <rect width="80" height="80" fill="url(#dots-abu)" />
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
                {d.advantageIntro.map((p, i) => (
                  <p
                    key={i}
                    className="text-slate-600 leading-[1.85]
                               first:text-slate-800 first:font-medium"
                    style={BODY_FONT}
                  >
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
                    href={`/${item.slug}`}
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
                <pattern id="cta-grid-abu" width="32" height="32" patternUnits="userSpaceOnUse">
                  <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#cta-grid-abu)" />
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
                style={{ fontSize: "clamp(1.6rem, 4.4vw, 2.5rem)" }}
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
