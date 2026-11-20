// src/components/PasirPasang.jsx
"use client";

import { useState, useCallback, memo } from "react";
import Image from "next/image";
import { useLang } from "../context/LanguageContext";
import MaterialDeliveryInfo from "./MaterialDeliveryInfo";
import Reveal from "./Reveal";
// INTEGRASI METADATA HELPER MILIKMU
import { SITE_URL, SITE_NAME, SITE_ENTITY_ID, serializeJsonLd } from "../lib/metadata";

// ─────────────────────────────────────────────
// KONFIG — DISESUAIKAN ROUTE /supplier/
// ─────────────────────────────────────────────
const PRODUCT_SLUG = "pasir-pasang";
const PRODUCT_URL = `${SITE_URL}/supplier/${PRODUCT_SLUG}`;
const PRODUCT_IMAGE = `${SITE_URL}/produk/pasir-pasang.png`;

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
// ACCORDION — versi ringan
// ─────────────────────────────────────────────
const Accordion = memo(function Accordion({
  id, index, number, title, isOpen, onToggle, children,
}) {
  const buttonId = `pasir-pasang-btn-${id}`;
  const panelId = `pasir-pasang-panel-${id}`;

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
    title: "Pasir Pasang",
    subtitle: "Pasir untuk Pasang Bata & Plester",
    thumbImage: "/produk/pasir-pasang.png",
    imageAlt: "Tumpukan pasir pasang untuk pekerjaan pemasangan bata dan plesteran dinding",
    sectionWhat: "Mengenal Pasir Pasang",

    sectionAdvantages: "Keunggulan Pasir Pasang",
    sectionAdvantagesTitle1: "Keunggulan ",
    sectionAdvantagesTitle2: "Pasir Pasang",
    sectionAdvantagesTitle3: " untuk Konstruksi",

    intro: [
      "Pasir pasang adalah material penting untuk pekerjaan pasang bata, plesteran, dan acian pada bangunan, yang berperan sebagai agregat halus dalam campuran mortar.",
      "Pasir pasang umumnya berasal dari tambang pasir sungai maupun pasir gunung dengan tekstur butiran yang sedikit lebih kasar dibanding pasir beton, sehingga daya rekatnya lebih kuat terhadap permukaan bata.",
      "Ciri khas pasir pasang terletak pada gradasi butirannya yang bervariasi, bersih dari lumpur, serta tidak mengandung garam atau bahan organik yang dapat mengganggu proses pengerasan mortar.",
      "Berbeda dengan pasir beton yang butirannya sangat halus untuk campuran cor, pasir pasang dirancang khusus agar mampu merekatkan bata merah, batako, maupun bata ringan (hebel) dengan hasil dinding yang rata dan kokoh.",
    ],

    advantagesIntro: [
      "Pasir pasang menjadi pilihan utama untuk pekerjaan finishing dinding karena mampu menghasilkan permukaan plesteran yang rata, padat, dan tahan lama.",
      "Kualitas pasir pasang sangat mempengaruhi hasil akhir plesteran dan acian pada dinding bangunan, mulai dari kerataan permukaan, kekuatan rekat, hingga ketahanan terhadap retak rambut.",
      "Pasir pasang yang baik umumnya memiliki kadar lumpur di bawah 5%, gradasi butiran yang bervariasi, serta tidak mengandung bahan organik, sesuai standar material konstruksi yang berlaku di Indonesia.",
      "Beberapa kelebihan pasir pasang kami untuk kebutuhan pemasangan bata dan plesteran Anda di antaranya sebagai berikut.",
    ],

    accordionItems: [
      {
        title: "Daya Rekat Kuat",
        paragraphs: [
          "Tekstur kasar pasir pasang membuatnya mampu merekatkan bata dan plesteran dengan sangat kuat, sehingga dinding lebih kokoh dan stabil.",
          "Butiran pasir pasang yang kasar dan bersudut membuat semen dapat mengunci permukaan bata maupun batako dengan lebih baik, dibandingkan pasir berbutir halus.",
          "Hal ini membuat dinding lebih kokoh, tidak mudah bergeser, dan tahan terhadap getaran maupun perubahan cuaca.",
          "Untuk pekerjaan pemasangan bata ringan (hebel), pasir pasang biasanya digunakan bersama mortar instan agar hasil rekatannya maksimal dan kerataan dinding tetap terjaga.",
          "Pada aplikasi plesteran, daya rekat yang kuat juga mencegah plesteran mengelupas atau rontok saat terjadi perubahan suhu dan kelembaban.",
        ],
      },
      {
        title: "Cocok untuk Pasang Bata",
        paragraphs: [
          "Pasir pasang ideal digunakan sebagai campuran mortar untuk pemasangan bata merah, batako, maupun bata ringan (hebel) pada berbagai jenis bangunan.",
          "Pasir pasang menjadi komponen utama dalam campuran mortar — bersama semen dan air — yang berfungsi sebagai perekat antar bata serta pengisi celah di antara bata.",
          "Komposisi campuran mortar yang umum digunakan adalah perbandingan 1 semen : 3 pasir untuk pekerjaan struktural, atau 1 semen : 4–5 pasir untuk pekerjaan non-struktural seperti plesteran dan acian.",
          "Penggunaan pasir pasang yang tepat akan menghasilkan dinding yang rata, lurus, dan tidak mudah retak, sehingga memudahkan pekerjaan finishing berikutnya.",
          "Selain untuk pasang bata, pasir pasang juga sangat cocok untuk pekerjaan plesteran dinding, acian, pembuatan lantai kerja, dan perataan permukaan sebelum pemasangan keramik.",
        ],
      },
      {
        title: "Tidak Mudah Retak",
        paragraphs: [
          "Campuran pasir pasang menghasilkan plesteran yang tidak mudah retak dan tahan lama, sehingga permukaan dinding tetap rapi dalam jangka panjang.",
          "Pasir pasang memiliki tekstur dan gradasi butiran yang mampu mengisi rongga-rongga kecil pada permukaan dinding, sehingga plesteran lebih padat dan rata.",
          "Dengan komposisi yang tepat, plesteran dinding akan lebih padat dan tahan terhadap perubahan suhu serta kelembaban yang dapat memicu retak rambut.",
          "Untuk hasil maksimal, gunakan pasir pasang yang bersih dari lumpur dan kotoran agar daya rekatnya tidak berkurang serta tidak menimbulkan noda pada permukaan dinding.",
          "Cara sederhana menguji kualitas pasir pasang adalah dengan menggenggam pasir — jika butiran terasa kasar, tidak lengket, dan tidak meninggalkan noda lumpur berlebih di telapak tangan, maka kualitasnya baik.",
        ],
      },
      {
        title: "Harga Terjangkau",
        paragraphs: [
          "Kami menyediakan pasir pasang dengan harga bersaing tanpa mengurangi kualitas material, sehingga kebutuhan proyek Anda tetap terpenuhi dengan optimal.",
          "Harga pasir pasang umumnya lebih ekonomis dibandingkan pasir beton, sehingga sangat cocok untuk proyek dengan volume pekerjaan plesteran dan pasang bata yang besar.",
          "Untuk mendapatkan harga terbaik, sebaiknya bandingkan penawaran dari beberapa supplier resmi dan pastikan harga yang ditawarkan sudah termasuk biaya pengiriman serta penurunan barang.",
          "Dengan harga yang terjangkau, Anda tetap bisa mendapatkan kualitas material terbaik untuk kebutuhan plesteran dan pemasangan bata pada proyek Anda.",
          "Hubungi kami untuk mendapatkan penawaran harga khusus sesuai volume kebutuhan proyek Anda, termasuk kemungkinan diskon untuk pembelian dalam jumlah besar.",
        ],
      },
    ],

    ctaBadge: "Konsultasi Gratis",
    ctaTitle1: "Butuh Pasir Pasang? ",
    ctaTitle2: "Kami siap membantu.",
    ctaButton: "Hubungi via WhatsApp",
    ctaWaText: "Halo Tri Abadi Makmur, saya ingin pesan pasir pasang...",

    relatedTitle: "Produk Lainnya",
    relatedSubtitle: "Material konstruksi lain yang sering dipesan bersama pasir pasang.",
    relatedItems: [
      {
        slug: "pasir-beton",
        name: "Pasir Beton",
        desc: "Pasir halus khusus untuk campuran cor beton struktural.",
        image: "/produk/pasir-beton.png",
        alt: "Tumpukan pasir beton halus untuk campuran cor dan plesteran",
      },
      
      {
        slug: "abu-batu",
        name: "Abu Batu",
        desc: "Material pengganti pasir halus untuk campuran beton dan pengaspalan.",
        image: "/produk/abu-batu.png",
        alt: "Tumpukan abu batu halus untuk campuran konstruksi",
      },
    ],
  },

  en: {
    title: "Masonry Sand",
    subtitle: "Sand for Brick Laying & Plastering",
    thumbImage: "/produk/pasir-pasang.png",
    imageAlt: "Pile of masonry sand for brick laying and wall plastering work",
    sectionWhat: "About Masonry Sand",

    sectionAdvantages: "Masonry Sand Advantages",
    sectionAdvantagesTitle1: "Advantages of ",
    sectionAdvantagesTitle2: "Masonry Sand",
    sectionAdvantagesTitle3: " for Construction",

    intro: [
      "Masonry sand is an important material for brick laying, plastering, and skim coating work on buildings, acting as fine aggregate in the mortar mixture.",
      "Masonry sand generally comes from river sand or mountain sand quarries with a slightly coarser grain texture than concrete sand, so its adhesion to brick surfaces is stronger.",
      "The distinctive characteristic of masonry sand lies in its varied grain gradation, being clean of mud, and free from salt or organic materials that can interfere with the mortar hardening process.",
      "Unlike concrete sand whose grains are very fine for casting mixtures, masonry sand is specifically designed to bond red bricks, concrete blocks, or lightweight bricks (hebel) with an even and solid wall result.",
    ],

    advantagesIntro: [
      "Masonry sand is the main choice for wall finishing work because it produces a plaster surface that is even, dense, and durable.",
      "The quality of masonry sand greatly affects the final result of plastering and skim coating on building walls, from surface flatness, adhesion strength, to resistance to hairline cracks.",
      "Good masonry sand generally has a mud content below 5%, a varied grain gradation, and contains no organic materials, in accordance with the construction material standards applicable in Indonesia.",
      "Some of the advantages of our masonry sand for your brick laying and plastering needs include the following.",
    ],

    accordionItems: [
      {
        title: "Strong Adhesion",
        paragraphs: [
          "The coarse texture of masonry sand allows it to bond bricks and plaster very strongly, making the wall more solid and stable.",
          "The coarse and angular grains of masonry sand allow cement to lock the surface of bricks and concrete blocks better than fine-grained sand.",
          "This makes the wall more solid, less prone to shifting, and resistant to vibration and weather changes.",
          "For lightweight brick (hebel) installation work, masonry sand is usually used together with instant mortar so that the adhesion result is maximum and the wall flatness is maintained.",
          "In plastering applications, strong adhesion also prevents the plaster from peeling or falling off when temperature and humidity changes occur.",
        ],
      },
      {
        title: "Suitable for Brick Laying",
        paragraphs: [
          "Masonry sand is ideal for use as a mortar mixture for installing red bricks, concrete blocks, or lightweight bricks (hebel) in various types of buildings.",
          "Masonry sand is a key component in mortar mixture — along with cement and water — which serves as an adhesive between bricks and fills the gaps between them.",
          "The commonly used mortar mixing ratio is 1 cement : 3 sand for structural work, or 1 cement : 4–5 sand for non-structural work such as plastering and skim coating.",
          "Using the right masonry sand will produce a wall that is even, straight, and not easily cracked, making the subsequent finishing work easier.",
          "Besides for brick laying, masonry sand is also very suitable for wall plastering, skim coating, making work floors, and leveling surfaces before ceramic installation.",
        ],
      },
      {
        title: "Not Easily Cracked",
        paragraphs: [
          "Masonry sand mixture produces plaster that is not easily cracked and durable, so the wall surface remains neat in the long term.",
          "Masonry sand has a texture and grain gradation capable of filling small cavities on the wall surface, so the plaster is denser and more even.",
          "With the right composition, wall plaster will be denser and resistant to temperature and humidity changes that can trigger hairline cracks.",
          "For maximum results, use masonry sand that is clean of mud and impurities so its adhesion is not reduced and it does not leave stains on the wall surface.",
          "A simple way to test the quality of masonry sand is to grab a handful — if the grains feel coarse, are not sticky, and do not leave excessive mud stains on your palm, then the quality is good.",
        ],
      },
      {
        title: "Affordable Price",
        paragraphs: [
          "We provide masonry sand at competitive prices without reducing material quality, so your project needs are still optimally met.",
          "The price of masonry sand is generally more economical than concrete sand, making it very suitable for projects with large plastering and brick laying work volumes.",
          "To get the best price, you should compare offers from several official suppliers and ensure the offered price already includes shipping and unloading costs.",
          "With an affordable price, you can still get the best material quality for your plastering and brick laying needs on your project.",
          "Contact us to get a special price offer according to your project's volume needs, including possible discounts for large quantity purchases.",
        ],
      },
    ],

    ctaBadge: "Free Consultation",
    ctaTitle1: "Need Masonry Sand? ",
    ctaTitle2: "We're ready to help.",
    ctaButton: "Contact via WhatsApp",
    ctaWaText: "Hello Tri Abadi Makmur, I would like to order masonry sand...",

    relatedTitle: "Other Products",
    relatedSubtitle: "Other construction materials frequently ordered together with masonry sand.",
    relatedItems: [
      {
        slug: "pasir-beton",
        name: "Concrete Sand",
        desc: "Fine sand specifically for structural concrete casting mixtures.",
        image: "/produk/pasir-beton.png",
        alt: "Pile of fine concrete sand for concrete casting and plastering",
      },
      {
        slug: "batu-bata",
        name: "Red Brick",
        desc: "Quality red bricks for building walls.",
        image: "/produk/batu-bata.png",
        alt: "Pile of red bricks for building walls",
      },
      {
        slug: "abu-batu",
        name: "Stone Dust",
        desc: "Fine sand substitute material for concrete mixtures and asphalt paving.",
        image: "/produk/abu-batu.png",
        alt: "Pile of fine stone dust for construction mixtures",
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
// HALAMAN: PASIR PASANG
// ─────────────────────────────────────────────
export default function PasirPasang() {
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
      aria-labelledby="pasir-pasang-heading"
      className="relative bg-gradient-to-b from-slate-50 via-white to-slate-50/70
                 pt-28 lg:pt-36 pb-20 lg:pb-28 overflow-hidden antialiased
                 selection:bg-[#1e88e5]/20 [text-wrap:pretty]"
    >
      {/* ── JSON-LD: Product + Breadcrumb + FAQ ── */}
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
              id="pasir-pasang-heading"
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
          specification={{ id: "Pasir pasang untuk mortar, pasangan bata, atau plester. Konfirmasi ukuran butir sesuai pekerjaan.", en: "Masonry sand for mortar, brickwork, or plaster. Confirm the grain size for the work." }}
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
                         bg-gradient-to-r from-[#1e88e5] via-blue-400 to-amber-400"
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
                       bg-gradient-to-br from-slate-50 via-white to-amber-50/60
                       border border-slate-200 shadow-sm
                       p-5 sm:p-7 mb-8 sm:mb-10 overflow-hidden"
          >
            <span
              aria-hidden="true"
              className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#1e88e5] to-[#1565c0]"
            />
            <div aria-hidden="true" className="absolute top-3 right-3 opacity-[0.08]">
              <svg width="80" height="80" viewBox="0 0 80 80">
                <pattern id="dots-pasir-pasang" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1" fill="#1e88e5" />
                </pattern>
                <rect width="80" height="80" fill="url(#dots-pasir-pasang)" />
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
                <pattern id="cta-grid-pasir-pasang" width="32" height="32" patternUnits="userSpaceOnUse">
                  <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#cta-grid-pasir-pasang)" />
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
