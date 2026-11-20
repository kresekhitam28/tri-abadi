// src/components/TanahUrug.jsx
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
const PRODUCT_SLUG = "tanah-urug";
const PRODUCT_URL = `${SITE_URL}/supplier/${PRODUCT_SLUG}`;
const PRODUCT_IMAGE = `${SITE_URL}/produk/tanah-urug.png`;

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
  const buttonId = `tanah-urug-btn-${id}`;
  const panelId = `tanah-urug-panel-${id}`;

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
    title: "Tanah Urug",
    subtitle: "Material Pengurugan Lahan",
    thumbImage: "/produk/tanah-urug.png",
    imageAlt: "Tumpukan tanah urug untuk peninggian lahan dan perataan kontur tanah",
    sectionWhat: "Mengenal Tanah Urug",

    sectionAdvantages: "Keunggulan Tanah Urug",
    sectionAdvantagesTitle1: "Keunggulan ",
    sectionAdvantagesTitle2: "Tanah Urug",
    sectionAdvantagesTitle3: " untuk Proyek Konstruksi",

    intro: [
      "Tanah urug adalah material penting untuk meninggikan permukaan tanah sebelum proses pembangunan dimulai, yang berfungsi sebagai lapisan dasar (sub-grade) sebelum material lain ditumpuk di atasnya.",
      "Tanah urug umumnya berasal dari galian tanah gunung, tanah sawah, maupun tanah sisa proyek, dengan jenis yang beragam seperti tanah merah, tanah padas, tanah liat, dan tanah campuran — masing-masing memiliki karakteristik dan peruntukan yang berbeda.",
      "Ciri khas tanah urug terletak pada butirannya yang lepas, mudah dipadatkan, serta bebas dari sampah organik dan bahan bangunan, sehingga mampu menciptakan permukaan lahan yang stabil dan tidak mudah amblas.",
      "Berbeda dengan sirtu atau puing yang mengandung batu, tanah urug murni tanpa campuran batu sehingga lebih cocok untuk peninggian lahan awal, sebelum nantinya dilapisi sirtu atau material urugan yang lebih padat di atasnya.",
    ],

    advantagesIntro: [
      "Tanah urug menjadi tahap awal yang sangat penting dalam proyek konstruksi, karena menentukan kestabilan lahan sekaligus mencegah penurunan permukaan (settlement) yang dapat merusak bangunan di atasnya.",
      "Kualitas tanah urug sangat mempengaruhi hasil akhir pengurugan, mulai dari tingkat kepadatan, kemampuan menahan beban, hingga ketahanan terhadap genangan air dan pergerakan tanah.",
      "Tanah urug yang baik umumnya bebas dari sampah organik, tidak mengandung lumpur berlebih, memiliki plastisitas yang sesuai, serta kadar air yang tidak terlalu basah, sehingga mudah dipadatkan secara optimal.",
      "Kami menyediakan tanah urug dengan kualitas terpilih yang telah melalui proses sortir agar mudah dipadatkan, stabil, dan siap mendukung kelancaran proyek pengurugan lahan Anda.",
      "Beberapa kelebihan tanah urug kami untuk kebutuhan proyek Anda di antaranya sebagai berikut.",
    ],

    accordionItems: [
      {
        title: "Cocok untuk Urugan Lahan",
        paragraphs: [
          "Tanah urug kami ideal digunakan untuk meninggikan dan meratakan permukaan lahan sebelum dibangun, termasuk untuk lahan yang lebih rendah dari jalan, bekas sawah, rawa, maupun lahan berkontur.",
          "Tanah urug membantu menciptakan lahan yang datar dan stabil, sehingga memudahkan proses pembangunan pondasi, jalan lingkungan, maupun area parkir di atasnya.",
          "Untuk lahan yang lebih rendah dari jalan atau lahan bekas sawah, penggunaan tanah urug sangat dianjurkan agar permukaan tidak tergenang air dan elevasi lahan sesuai dengan rencana bangunan.",
          "Setelah dipadatkan secara berlapis (per 20–30 cm), tanah urug siap untuk dilapisi material lain seperti sirtu, pasir urug, atau langsung didirikan bangunan di atasnya.",
          "Tanah urug juga banyak dimanfaatkan untuk perataan kontur tanah pada proyek perumahan, kawasan industri, hingga pembangunan jalan akses baru.",
        ],
      },
      {
        title: "Volume Besar Tersedia",
        paragraphs: [
          "Kami mampu menyediakan tanah urug dalam volume besar, siap dikirim ke lokasi proyek Anda sesuai kebutuhan pengurugan.",
          "Dengan stok yang melimpah, kami dapat memenuhi kebutuhan proyek pengurugan lahan skala kecil hingga besar, mulai dari rumah tinggal hingga kawasan perumahan dan industri.",
          "Pengiriman dilakukan secara bertahap sesuai kebutuhan proyek, sehingga lahan bisa langsung dikerjakan tanpa menunggu material datang sekaligus.",
          "Volume pengiriman disesuaikan dengan kapasitas armada dan kondisi jalan menuju lokasi proyek, sehingga proses bongkar muat berjalan aman dan efisien.",
          "Untuk proyek dengan volume sangat besar, kami juga dapat mengatur jadwal pengiriman khusus agar pasokan material tetap lancar sesuai progres pekerjaan.",
        ],
      },
      {
        title: "Harga Ekonomis",
        paragraphs: [
          "Harga tanah urug kami sangat bersaing, cocok untuk proyek dengan kebutuhan urugan bervolume besar tanpa mengorbankan kualitas material.",
          "Dengan harga yang terjangkau, Anda bisa mengurug lahan yang luas tanpa harus mengeluarkan biaya material yang membengkak, sehingga anggaran proyek lebih terkendali.",
          "Biaya pengiriman juga bisa disesuaikan dengan jarak lokasi proyek dari sumber tanah urug, sehingga total biaya lebih transparan dan efisien.",
          "Tips menghemat biaya: pesan tanah urug dalam volume besar sekaligus, pilih supplier terdekat, dan pastikan akses jalan menuju lokasi cukup lebar agar truk dapat masuk dengan lancar.",
          "Hubungi kami untuk mendapatkan penawaran harga khusus sesuai volume dan lokasi proyek Anda, termasuk kemungkinan diskon untuk pembelian dalam jumlah besar.",
        ],
      },
      {
        title: "Pengiriman Cepat",
        paragraphs: [
          "Didukung armada sendiri, pengiriman tanah urug dapat dilakukan dengan cepat dan tepat waktu sesuai jadwal proyek Anda.",
          "Kami memiliki dump truck dengan kapasitas beragam — mulai dari truk kecil untuk akses jalan sempit hingga truk besar untuk volume pengurugan besar — sehingga dapat menyesuaikan kebutuhan proyek Anda.",
          "Pengiriman bisa dijadwalkan sesuai progres pekerjaan, sehingga material datang tepat saat dibutuhkan dan tidak menumpuk di lokasi proyek.",
          "Dengan pengiriman yang cepat dan terjadwal, proyek pengurugan lahan Anda bisa selesai lebih efisien dan menghemat waktu pengerjaan.",
          "Kami juga memastikan setiap pengiriman tanah urug sesuai dengan volume yang dipesan, sehingga Anda dapat menghitung kebutuhan material dengan lebih akurat.",
        ],
      },
    ],

    ctaBadge: "Konsultasi Gratis",
    ctaTitle1: "Butuh Tanah Urug? ",
    ctaTitle2: "Kami siap membantu.",
    ctaButton: "Hubungi via WhatsApp",
    ctaWaText: "Halo Tri Abadi Makmur, saya ingin pesan tanah urug...",

    relatedTitle: "Produk Lainnya",
    relatedSubtitle: "Material konstruksi lain yang sering dipesan bersama tanah urug.",
    relatedItems: [
      {
        slug: "sirtu",
        name: "Sirtu",
        desc: "Material urugan jalan dan lahan dari campuran pasir dan batu.",
        image: "/produk/sirtu.png",
        alt: "Tumpukan sirtu (pasir batu) untuk urugan jalan dan lahan",
      },
      {
        slug: "base-course",
        name: "Base Course",
        desc: "Lapis pondasi atas jalan dari campuran batu pecah dan abu batu.",
        image: "/produk/base-course.png",
        alt: "Tumpukan batu base course untuk lapis pondasi jalan",
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
    title: "Fill Soil",
    subtitle: "Land Filling Material",
    thumbImage: "/produk/tanah-urug.png",
    imageAlt: "Pile of fill soil for raising land and leveling soil contours",
    sectionWhat: "About Fill Soil",

    sectionAdvantages: "Fill Soil Advantages",
    sectionAdvantagesTitle1: "Advantages of ",
    sectionAdvantagesTitle2: "Fill Soil",
    sectionAdvantagesTitle3: " for Construction Projects",

    intro: [
      "Fill soil is an important material for raising the ground surface before the construction process begins, functioning as a sub-grade layer before other materials are stacked on top of it.",
      "Fill soil generally comes from mountain soil, rice field soil, or leftover project soil excavations, with diverse types such as red soil, padas soil, clay soil, and mixed soil — each with different characteristics and uses.",
      "The distinctive characteristic of fill soil lies in its loose grains, easy to compact, and free from organic waste and building materials, so it can create a stable land surface that does not easily subside.",
      "Unlike sirtu or rubble that contains stone, fill soil is pure without stone mixture, making it more suitable for initial land elevation, before being coated with sirtu or denser fill materials on top.",
    ],

    advantagesIntro: [
      "Fill soil is a very important initial stage in a construction project, because it determines land stability and prevents surface settlement that can damage the building above it.",
      "The quality of fill soil greatly affects the final result of the filling, from the level of density, load-bearing capacity, to resistance to water pooling and soil movement.",
      "Good fill soil is generally free from organic waste, does not contain excessive mud, has appropriate plasticity, and moisture content that is not too wet, so it can be optimally compacted.",
      "We provide fill soil of selected quality that has gone through a sorting process so it is easy to compact, stable, and ready to support the smooth running of your land filling project.",
      "Some of the advantages of our fill soil for your project needs include the following.",
    ],

    accordionItems: [
      {
        title: "Suitable for Land Filling",
        paragraphs: [
          "Our fill soil is ideal for raising and leveling the land surface before construction, including land that is lower than the road, former rice fields, swamps, and contoured land.",
          "Fill soil helps create flat and stable land, making the construction process of foundations, neighborhood roads, and parking areas on top of it easier.",
          "For land that is lower than the road or former rice fields, using fill soil is highly recommended so the surface does not flood and the land elevation matches the building plan.",
          "After being compacted in layers (per 20–30 cm), fill soil is ready to be coated with other materials such as sirtu, fill sand, or immediately built upon.",
          "Fill soil is also widely used for leveling soil contours in residential projects, industrial areas, and new access road construction.",
        ],
      },
      {
        title: "Large Volume Available",
        paragraphs: [
          "We are able to provide fill soil in large volumes, ready to be delivered to your project site according to the filling needs.",
          "With abundant stock, we can meet the needs of small to large-scale land filling projects, from residential houses to housing and industrial estates.",
          "Delivery is done in stages according to project needs, so the land can be worked on immediately without waiting for materials to arrive all at once.",
          "Delivery volume is adjusted to fleet capacity and road conditions leading to the project site, so the loading and unloading process runs safely and efficiently.",
          "For projects with very large volumes, we can also arrange a special delivery schedule so the material supply remains smooth according to work progress.",
        ],
      },
      {
        title: "Economical Price",
        paragraphs: [
          "Our fill soil price is very competitive, suitable for projects with large-volume fill needs without sacrificing material quality.",
          "With an affordable price, you can fill a large area of land without having to spend excessively on material costs, so the project budget is more controlled.",
          "Delivery costs can also be adjusted based on the distance of the project site from the fill soil source, so the total cost is more transparent and efficient.",
          "Cost-saving tip: order fill soil in large volumes at once, choose the nearest supplier, and ensure the access road to the location is wide enough for trucks to enter smoothly.",
          "Contact us to get a special price offer according to your project's volume and location, including possible discounts for large quantity purchases.",
        ],
      },
      {
        title: "Fast Delivery",
        paragraphs: [
          "Supported by our own fleet, fill soil delivery can be done quickly and on time according to your project schedule.",
          "We have dump trucks with various capacities — from small trucks for narrow road access to large trucks for large filling volumes — so they can adjust to your project needs.",
          "Delivery can be scheduled according to work progress, so materials arrive exactly when needed and do not accumulate at the project site.",
          "With fast and scheduled delivery, your land filling project can be completed more efficiently and save work time.",
          "We also ensure that every fill soil delivery matches the ordered volume, so you can calculate material needs more accurately.",
        ],
      },
    ],

    ctaBadge: "Free Consultation",
    ctaTitle1: "Need Fill Soil? ",
    ctaTitle2: "We're ready to help.",
    ctaButton: "Contact via WhatsApp",
    ctaWaText: "Hello Tri Abadi Makmur, I would like to order fill soil...",

    relatedTitle: "Other Products",
    relatedSubtitle: "Other construction materials frequently ordered together with fill soil.",
    relatedItems: [
      {
        slug: "sirtu",
        name: "Sirtu",
        desc: "Road and land fill material made from a mixture of sand and stone.",
        image: "/produk/sirtu.png",
        alt: "Pile of sirtu (sand-stone mix) for road and land fill",
      },
      {
        slug: "base-course",
        name: "Base Course",
        desc: "Road upper foundation layer made from a mixture of crushed stone and stone dust.",
        image: "/produk/base-course.png",
        alt: "Pile of base course stone for road foundation layer",
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
        offers: {
          "@type": "Offer",
          url: PRODUCT_URL,
          priceCurrency: "IDR",
          price: "120000", // Silakan sesuaikan dengan harga riil tanah urug
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
// HALAMAN: TANAH URUG
// ─────────────────────────────────────────────
export default function TanahUrug() {
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
      aria-labelledby="tanah-urug-heading"
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
              id="tanah-urug-heading"
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
                         bg-gradient-to-r from-[#1e88e5] via-blue-400 to-amber-600"
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
                <pattern id="dots-tanah-urug" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1" fill="#1e88e5" />
                </pattern>
                <rect width="80" height="80" fill="url(#dots-tanah-urug)" />
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
                <pattern id="cta-grid-tanah-urug" width="32" height="32" patternUnits="userSpaceOnUse">
                  <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#cta-grid-tanah-urug)" />
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