// src/components/PasirBeton.jsx
"use client";

import { useState, useCallback, memo } from "react";
import Image from "next/image";
import { useLang } from "../context/LanguageContext";
import Reveal from "./Reveal";
// INTEGRASI METADATA HELPER MILIKMU
import { SITE_URL, SITE_NAME, SITE_ENTITY_ID, serializeJsonLd } from "../lib/metadata";

// ─────────────────────────────────────────────
// KONFIG — DISESUAIKAN ROUTE /supplier/
// ─────────────────────────────────────────────
const PRODUCT_SLUG = "pasir-beton";
const PRODUCT_URL = `${SITE_URL}/supplier/${PRODUCT_SLUG}`;
const PRODUCT_IMAGE = `${SITE_URL}/produk/pasir-beton.png`;

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
  const buttonId = `pasir-beton-btn-${id}`;
  const panelId = `pasir-beton-panel-${id}`;

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
    title: "Pasir Beton",
    subtitle: "Pasir Halus untuk Cor Beton",
    thumbImage: "/produk/pasir-beton.png",
    imageAlt: "Tumpukan pasir beton halus untuk campuran cor dan plesteran",
    sectionWhat: "Mengenal Pasir Beton",

    sectionAdvantages: "Keunggulan Pasir Beton",
    sectionAdvantagesTitle1: "Keunggulan ",
    sectionAdvantagesTitle2: "Pasir Beton",
    sectionAdvantagesTitle3: " untuk Konstruksi",

    intro: [
      "Pasir beton adalah salah satu material utama yang dibutuhkan dalam pekerjaan struktur bangunan, terutama untuk campuran cor beton, plesteran halus, hingga acian permukaan dinding.",
      "Pasir beton umumnya berasal dari tambang pasir sungai, pasir gunung, maupun pasir laut yang telah dicuci dan disaring, sehingga butirannya lebih halus dan seragam dibandingkan pasir pasang maupun pasir urug.",
      "Ciri khas pasir beton terletak pada butirannya yang kecil, bersih dari kotoran, dan tidak mengandung lumpur berlebih, sehingga menghasilkan campuran beton yang kuat, padat, dan rata.",
      "Berbeda dengan pasir pasang yang butirannya lebih kasar untuk pekerjaan pasangan bata, pasir beton dirancang khusus agar mudah menyatu dengan semen dan air pada campuran cor.",
    ],

    advantagesIntro: [
      "Kualitas pasir beton sangat menentukan kekuatan struktur bangunan yang dihasilkan, karena pasir berperan sebagai agregat halus yang mengisi rongga antar butir kerikil dalam campuran beton.",
      "Pasir beton yang baik umumnya memiliki modulus kehalusan (fineness modulus) sekitar 1,5 hingga 3,8 serta kadar lumpur di bawah 5%, sesuai standar material konstruksi yang berlaku di Indonesia.",
      "Oleh karena itu, kami hanya menyediakan pasir beton dengan kualitas terbaik yang telah melalui proses penyaringan dan pencucian sebelum dikirim ke lokasi proyek Anda.",
      "Beberapa kelebihan pasir beton kami untuk kebutuhan konstruksi Anda di antaranya sebagai berikut.",
    ],

    accordionItems: [
      {
        title: "Butiran Halus & Seragam",
        paragraphs: [
          "Butirannya halus dan seragam sehingga menghasilkan campuran beton yang rata dan tidak mudah retak pada permukaan.",
          "Keseragaman butiran membuat pasir beton lebih mudah tercampur dengan semen dan air, sehingga adonan menjadi lebih homogen dan tidak menggumpal.",
          "Dengan campuran yang homogen, hasil cor beton akan lebih padat, tidak keropos, dan memiliki kekuatan yang merata di seluruh permukaan struktur.",
          "Selain itu, permukaan beton yang dihasilkan lebih halus dan rapi, sehingga mengurangi kebutuhan pekerjaan finishing tambahan seperti pengacian ulang.",
          "Ukuran butiran yang ideal juga memudahkan proses pemompaan beton pada proyek yang menggunakan concrete pump, terutama untuk pengecoran di ketinggian.",
        ],
      },
      {
        title: "Cocok untuk Cor Beton",
        paragraphs: [
          "Kualitasnya ideal untuk campuran cor beton struktural, mulai dari pondasi, kolom, balok, hingga plat lantai bangunan bertingkat.",
          "Pasir beton merupakan salah satu dari tiga komponen utama dalam campuran beton, selain semen dan kerikil, dengan porsi sekitar 30–40% dari total volume agregat.",
          "Dengan komposisi pasir yang tepat, beton yang dihasilkan mampu menahan beban berat dan tahan terhadap perubahan cuaca serta kelembaban.",
          "Pasir beton juga cocok digunakan untuk pekerjaan plesteran halus, acian dinding, dan pembuatan lantai beton yang membutuhkan permukaan rata dan halus.",
          "Untuk kebutuhan cor struktural standar, komposisi campuran beton yang umum digunakan adalah perbandingan 1 semen : 2 pasir : 3 kerikil, yang dapat disesuaikan dengan mutu beton yang diinginkan.",
        ],
      },
      {
        title: "Bersih dari Kotoran",
        paragraphs: [
          "Pasir telah disaring dan dicuci untuk menghilangkan lumpur, tanah, maupun kotoran organik lain yang dapat menurunkan kualitas beton.",
          "Kandungan lumpur yang tinggi pada pasir dapat menghambat proses pengerasan beton serta menurunkan daya rekat antar material dalam campuran.",
          "Selain itu, pasir yang kotor membuat beton lebih mudah retak, keropos, dan tidak tahan lama terhadap perubahan cuaca.",
          "Untuk mengecek kebersihan pasir secara sederhana, Anda dapat menggenggam pasir lalu melepasnya — pasir berkualitas baik tidak meninggalkan noda lumpur berlebih di telapak tangan.",
          "Cara lain adalah dengan merendam pasir di dalam air bening; jika air tetap bening, berarti kadar lumpurnya rendah dan pasir layak digunakan untuk cor beton.",
          "Oleh karena itu, semua pasir beton kami melewati proses pencucian dan penyaringan sebelum dikirim ke lokasi proyek Anda.",
        ],
      },
      {
        title: "Kualitas Terjamin",
        paragraphs: [
          "Kami memastikan setiap pasir yang dikirim telah memenuhi standar kualitas material konstruksi yang berlaku, sehingga aman digunakan untuk struktur bangunan.",
          "Mulai dari proses pengambilan di tambang, penyaringan, pencucian, hingga pengiriman — semua dikerjakan dengan pengawasan ketat untuk menjaga konsistensi mutu.",
          "Kami juga memastikan pasir yang dikirim memiliki kadar air yang sesuai, sehingga tidak mengubah takaran air dalam campuran beton saat tiba di lokasi proyek.",
          "Pengiriman dilakukan dengan armada yang bersih dan tertutup, agar pasir tidak tercampur material lain atau kotoran selama perjalanan.",
          "Dengan komitmen penuh pada kualitas, kami berharap dapat mendukung kelancaran dan keberhasilan proyek konstruksi Anda dari awal hingga selesai.",
        ],
      },
    ],

    ctaBadge: "Konsultasi Gratis",
    ctaTitle1: "Butuh Pasir Beton? ",
    ctaTitle2: "Kami siap membantu.",
    ctaButton: "Hubungi via WhatsApp",
    ctaWaText: "Halo Tri Abadi Makmur, saya ingin pesan pasir beton...",

    relatedTitle: "Produk Lainnya",
    relatedSubtitle: "Material konstruksi lain yang sering dipesan bersama pasir beton.",
    relatedItems: [
      {
        slug: "abu-batu",
        name: "Abu Batu",
        desc: "Material pengganti pasir halus untuk campuran beton dan pengaspalan.",
        image: "/produk/abu-batu.png",
        alt: "Tumpukan abu batu halus untuk campuran konstruksi",
      },
      {
        slug: "kerikil",
        name: "Kerikil",
        desc: "Agregat kasar untuk campuran beton dan sistem drainase.",
        image: "/produk/kerikil.webp",
        alt: "Tumpukan kerikil untuk material cor beton dan drainase",
      },
      {
        slug: "batu-split",
        name: "Batu Split",
        desc: "Batu split berbagai ukuran untuk cor beton dan pengaspalan.",
        image: "/produk/batu-split.png",
        alt: "Batu split pecahan untuk campuran cor beton",
      },
    ],
  },

  en: {
    title: "Concrete Sand",
    subtitle: "Fine Sand for Concrete Casting",
    thumbImage: "/produk/pasir-beton.png",
    imageAlt: "Pile of fine concrete sand for concrete casting and plastering",
    sectionWhat: "About Concrete Sand",

    sectionAdvantages: "Concrete Sand Advantages",
    sectionAdvantagesTitle1: "Advantages of ",
    sectionAdvantagesTitle2: "Concrete Sand",
    sectionAdvantagesTitle3: " for Construction",

    intro: [
      "Concrete sand is one of the main materials needed in building structural work, especially for concrete casting mixtures, fine plastering, and wall skim coating.",
      "Concrete sand generally comes from river sand, mountain sand, or sea sand quarries that have been washed and sieved, so its grains are finer and more uniform than masonry sand or fill sand.",
      "The distinctive characteristic of concrete sand lies in its small grains, clean of impurities, and free from excessive mud content, resulting in a strong, dense, and even concrete mixture.",
      "Unlike masonry sand whose grains are coarser for brickwork, concrete sand is specifically designed to blend easily with cement and water in a casting mixture.",
    ],

    advantagesIntro: [
      "The quality of concrete sand greatly determines the strength of the resulting building structure, because sand acts as fine aggregate that fills the voids between gravel grains in the concrete mixture.",
      "Good concrete sand generally has a fineness modulus of around 1.5 to 3.8 and a mud content below 5%, in accordance with the construction material standards applicable in Indonesia.",
      "Therefore, we only provide the best quality concrete sand that has gone through a sieving and washing process before being sent to your project site.",
      "Some of the advantages of our concrete sand for your construction needs include the following.",
    ],

    accordionItems: [
      {
        title: "Fine & Uniform Grains",
        paragraphs: [
          "The grains are fine and uniform, resulting in an even concrete mixture that is not easily cracked on the surface.",
          "The uniformity of grains makes concrete sand easier to mix with cement and water, resulting in a more homogeneous mixture that does not clump.",
          "With a homogeneous mixture, the concrete casting result will be denser, non-porous, and have even strength across the entire surface of the structure.",
          "In addition, the resulting concrete surface is smoother and neater, reducing the need for additional finishing work such as re-skimming.",
          "The ideal grain size also facilitates the concrete pumping process on projects using a concrete pump, especially for casting at height.",
        ],
      },
      {
        title: "Suitable for Concrete Casting",
        paragraphs: [
          "Its quality is ideal for structural concrete casting mixtures, from foundations, columns, beams, to floor slabs of multi-story buildings.",
          "Concrete sand is one of the three main components in a concrete mixture, along with cement and gravel, with a proportion of about 30–40% of the total aggregate volume.",
          "With the right sand composition, the resulting concrete is able to withstand heavy loads and resist weather changes and humidity.",
          "Concrete sand is also suitable for fine plastering work, wall skim coating, and making concrete floors that require a flat and smooth surface.",
          "For standard structural casting needs, the commonly used concrete mixing ratio is 1 cement : 2 sand : 3 gravel, which can be adjusted to the desired concrete grade.",
        ],
      },
      {
        title: "Clean from Impurities",
        paragraphs: [
          "The sand has been sieved and washed to remove mud, soil, and other organic impurities that can reduce concrete quality.",
          "High mud content in sand can hinder the concrete hardening process and reduce the adhesion between materials in the mixture.",
          "In addition, dirty sand makes concrete more prone to cracking, porous, and not durable against weather changes.",
          "To check the cleanliness of sand simply, you can grab a handful of sand and release it — good quality sand does not leave excessive mud stains on your palm.",
          "Another way is to soak the sand in clear water; if the water remains clear, it means the mud content is low and the sand is suitable for concrete casting.",
          "Therefore, all of our concrete sand goes through a washing and sieving process before being sent to your project site.",
        ],
      },
      {
        title: "Guaranteed Quality",
        paragraphs: [
          "We ensure that every sand delivered meets the applicable construction material quality standards, so it is safe to use for building structures.",
          "From the extraction process at the quarry, sieving, washing, to delivery — all are done with strict supervision to maintain consistent quality.",
          "We also ensure the delivered sand has the appropriate moisture content, so it does not change the water dosage in the concrete mixture upon arrival at the project site.",
          "Delivery is carried out using clean and covered fleets, so the sand is not mixed with other materials or impurities during transit.",
          "With a full commitment to quality, we hope to support the smoothness and success of your construction project from start to finish.",
        ],
      },
    ],

    ctaBadge: "Free Consultation",
    ctaTitle1: "Need Concrete Sand? ",
    ctaTitle2: "We're ready to help.",
    ctaButton: "Contact via WhatsApp",
    ctaWaText: "Hello Tri Abadi Makmur, I would like to order concrete sand...",

    relatedTitle: "Other Products",
    relatedSubtitle: "Other construction materials frequently ordered together with concrete sand.",
    relatedItems: [
      {
        slug: "abu-batu",
        name: "Stone Dust",
        desc: "Fine sand substitute material for concrete mixtures and asphalt paving.",
        image: "/produk/abu-batu.png",
        alt: "Pile of fine stone dust for construction mixtures",
      },
      {
        slug: "kerikil",
        name: "Gravel",
        desc: "Coarse aggregate for concrete mixtures and drainage systems.",
        image: "/produk/kerikil.webp",
        alt: "Pile of gravel for concrete casting and drainage material",
      },
      {
        slug: "batu-split",
        name: "Split Stone",
        desc: "Split stone in various sizes for concrete casting and asphalt paving.",
        image: "/produk/batu-split.png",
        alt: "Split stone for concrete casting mixtures",
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
        offers: {
          "@type": "Offer",
          url: PRODUCT_URL,
          priceCurrency: "IDR",
          price: "280000", // Silakan sesuaikan dengan harga riil pasir beton
          priceValidUntil: "2027-12-31",
          availability: "https://schema.org/InStock",
          itemCondition: "https://schema.org/NewCondition",
          seller: { 
            "@type": "Organization", 
            "@id": SITE_ENTITY_ID, 
            name: SITE_NAME 
          },
        },
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
// HALAMAN: PASIR BETON
// ─────────────────────────────────────────────
export default function PasirBeton() {
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
      aria-labelledby="pasir-beton-heading"
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
              id="pasir-beton-heading"
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
                         bg-gradient-to-r from-[#1e88e5] via-blue-400 to-indigo-400"
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
                       bg-gradient-to-br from-slate-50 via-white to-indigo-50/60
                       border border-slate-200 shadow-sm
                       p-5 sm:p-7 mb-8 sm:mb-10 overflow-hidden"
          >
            <span
              aria-hidden="true"
              className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#1e88e5] to-[#1565c0]"
            />
            <div aria-hidden="true" className="absolute top-3 right-3 opacity-[0.08]">
              <svg width="80" height="80" viewBox="0 0 80 80">
                <pattern id="dots-pasir" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1" fill="#1e88e5" />
                </pattern>
                <rect width="80" height="80" fill="url(#dots-pasir)" />
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
                <pattern id="cta-grid-pasir" width="32" height="32" patternUnits="userSpaceOnUse">
                  <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#cta-grid-pasir)" />
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