// src/components/BatuSplit.jsx
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
const PRODUCT_SLUG = "batu-split";
const PRODUCT_URL = `${SITE_URL}/supplier/${PRODUCT_SLUG}`;
const PRODUCT_IMAGE = `${SITE_URL}/produk/batu-split.png`;

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
function IconExternalLink({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <path d="M15 3h6v6M10 14L21 3" />
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
  const buttonId = `batu-split-btn-${id}`;
  const panelId = `batu-split-panel-${id}`;

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
    title: "Batu Split",
    subtitle: "Jual Batu Split Segala Bentuk",
    thumbImage: "/produk/batu-split.png",
    imageAlt: "Tumpukan batu split berbagai ukuran untuk campuran beton dan pengaspalan",
    sectionWhat: "Mengenal Batu Split",

    sectionTips: "Tips Penggunaan Batu Split Sesuai Ukuran",
    sectionTipsTitle1: "Tips Penggunaan ",
    sectionTipsTitle2: "Batu Split",
    sectionTipsTitle3: " Sesuai Ukuran",

    intro: [
      "Batu split adalah batu alam berukuran besar yang dipecahkan menjadi bagian-bagian kecil dengan ukuran tertentu menggunakan mesin pemecah batu (stone crusher), sehingga menghasilkan butiran bersudut tajam yang padat dan kuat.",
      "Material ini juga dikenal dengan sebutan batu belah, dan menjadi salah satu bahan utama yang berperan sangat penting dalam campuran bahan bangunan, terutama untuk struktur beton dan konstruksi jalan.",
      "Batu split diproduksi melalui proses penambangan, pemecahan, dan penyaringan agar diperoleh ukuran yang seragam sesuai kebutuhan proyek.",
      "Karena sifatnya yang keras dan mampu saling mengunci antar butiran, batu split banyak dimanfaatkan sebagai agregat kasar pada beton, campuran aspal, hingga pengerasan lahan.",
    ],

    afterIntro: [
      "Biasanya batu split dicampur dengan pasir dan semen dalam komposisi tertentu untuk menghasilkan adonan cor beton yang kuat, padat, dan tahan lama.",
      "Yang perlu Anda ketahui, batu split tersedia dalam beragam jenis ukuran yang telah disesuaikan dengan kegunaannya masing-masing, mulai dari ukuran paling halus hingga paling besar.",
      "Pemilihan ukuran yang tepat akan sangat mempengaruhi kekuatan, kepadatan, serta hasil akhir dari pekerjaan konstruksi yang sedang dikerjakan.",
      "Nah, penasaran bukan apa saja ukuran dari batu split beserta kegunaannya? Untuk lebih jelasnya, berikut akan kami ulas secara tuntas di bawah ini.",
    ],

    tipsIntro: [
      "Umumnya, pembagian jenis batu split selalu disesuaikan dengan kegunaannya dalam pekerjaan konstruksi.",
      "Mulai dari bentuk yang sangat halus menyerupai pasir, ukuran sedang, hingga ukuran super jumbo untuk kebutuhan tertentu.",
      "Semua kategori ukuran tersebut pada umumnya disesuaikan dengan kebutuhan pengguna dan jenis proyek yang sedang dikerjakan.",
      "Adapun beberapa tips khusus penggunaan batu split sesuai ukurannya akan dijelaskan sebagai berikut.",
    ],

    accordionItems: [
      {
        title: "Ukuran 0-5 MM",
        paragraphs: [
          "Bentuknya yang super halus, bahkan hampir menyerupai pasir, menjadikan batu split ukuran ini lebih populer dikenal dengan nama abu batu.",
          "Kegunaan utamanya adalah sebagai campuran lapisan pengaspalan jalan, karena mampu mengisi rongga dan memperhalus permukaan aspal.",
          "Selain itu, abu batu juga dapat digunakan sebagai pengganti pasir, bahan pemasangan batako, maupun pemasangan paving block.",
          "Karena teksturnya yang halus, abu batu sangat cocok untuk pekerjaan finishing yang membutuhkan permukaan rata dan padat.",
        ],
      },
      {
        title: "Ukuran 5-10 MM",
        paragraphs: [
          "Batu split ukuran ini lebih populer dengan nama screening, dan bentuknya sedikit lebih besar dibanding abu batu.",
          "Meskipun demikian, kegunaannya tidak jauh berbeda dengan jenis yang pertama, di mana fungsi pokoknya adalah sebagai campuran utama dalam pengaspalan jalan.",
          "Screening juga sering dimanfaatkan sebagai bahan pengisi (filler) pada pekerjaan aspal agar menghasilkan permukaan jalan yang lebih padat dan rata.",
        ],
      },
      {
        title: "Ukuran 10-20 MM",
        paragraphs: [
          "Bentuk dan ukurannya yang sangat ideal menjadikan batu split 10-20 mm identik sebagai campuran pengecoran beton, mulai dari konstruksi ringan hingga konstruksi berat.",
          "Pada umumnya ukuran ini sering digunakan sebagai bahan utama dalam produksi beton Ready Mix.",
          "Ukuran 10-20 mm juga menjadi pilihan favorit untuk pengecoran struktur bangunan seperti sloof, kolom, balok, dan plat lantai.",
        ],
      },
      {
        title: "Ukuran 20-30 MM",
        paragraphs: [
          "Karena ukurannya yang dapat dikategorikan lumayan sedang, batu split 20-30 mm biasanya digunakan sebagai bahan campuran dalam kegiatan cor.",
          "Lebih tepatnya untuk pembetonan maupun pengecoran lantai yang bersifat datar dan horizontal.",
          "Misalnya saja seperti pondasi, kolam, tiang, selup, paku bumi beton, dan lain sebagainya.",
          "Ukuran ini dipilih karena memberikan kekuatan yang baik sekaligus kemudahan dalam proses pengecoran.",
        ],
      },
      {
        title: "Ukuran 30-50 MM",
        paragraphs: [
          "Dengan bentuknya yang lumayan cukup besar, batu split 30-50 mm biasanya sangat jarang digunakan untuk campuran adonan cor.",
          "Akan tetapi, kegunaannya lebih dimanfaatkan untuk penyangga bantalan rel kereta api, bahan paling dasar sebelum material lain ditumpuk, hingga pemberat pipa di dasar laut.",
          "Ukuran besar ini memberikan stabilitas dan daya dukung yang tinggi terhadap beban berat.",
        ],
      },
      {
        title: "Campuran Agregat Halus",
        paragraphs: [
          "Jenis batu split ini dikenal pula dengan nama Base Course, yaitu agregat halus untuk lapisan pondasi.",
          "Merupakan campuran batu split dengan ukuran yang relatif kecil, yakni di bawah 0-50 mm, yang dipadatkan sebagai lapisan dasar.",
          "Umumnya digunakan sebagai media pemadatan lahan parkir atau jalan sebelum dilapisi aspal, paving block, ataupun cor beton.",
          "Base Course terdiri dari dua jenis, yakni kategori A dan B, yang dibedakan berdasarkan komposisi dan kekuatannya.",
          "Lapisan ini berperan penting untuk memastikan permukaan atas tidak mudah amblas dan memiliki daya dukung yang merata.",
        ],
      },
      {
        title: "Batu Gajah",
        paragraphs: [
          "Jenis ini memiliki nama lain boulder atau elephant stone, yaitu batu split dengan ukuran paling besar.",
          "Pada umumnya, batu ini digunakan untuk menimbun lahan yang berada tepat di pinggir pantai maupun rawa, karena mampu menahan pergerakan tanah.",
          "Selain itu, terkadang digunakan pula sebagai media pemecah atau penahan ombak di kawasan pesisir.",
          "Sementara para kontraktor proyek sering memanfaatkan batu ini untuk reklamasi pantai maupun pembuatan dermaga dengan kapasitas kecil.",
        ],
      },
    ],

    serviceCallout: {
      eyebrow: "Layanan Kami",
      title: "Pesan Batu Split & Layanan Konstruksi",
      paragraphs: [
        "Demikianlah beberapa tips penggunaan batu split sesuai ukurannya. Untuk pemesanan semua produk batu split, Anda dapat menghubungi perusahaan PT Tri Abadi Makmur.",
        "Anda juga dapat melakukan transaksi dan menyewa layanan jasa pengerjaan melalui situs resmi spesialisaspal.com.",
      ],
      linkText: "Kunjungi spesialisaspal.com",
      linkUrl: "https://spesialisaspal.com",
    },

    ctaBadge: "Konsultasi Gratis",
    ctaTitle1: "Butuh Batu Split? ",
    ctaTitle2: "Kami siap membantu.",
    ctaButton: "Hubungi via WhatsApp",
    ctaWaText: "Halo Tri Abadi Makmur, saya ingin pesan batu split...",

    relatedTitle: "Produk Lainnya",
    relatedSubtitle: "Material konstruksi lain yang sering dipesan bersama batu split.",
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
    title: "Crushed Stone",
    subtitle: "Selling Crushed Stone of All Shapes",
    thumbImage: "/produk/batu-split.png",
    imageAlt: "Pile of crushed stone in various sizes for concrete and asphalt paving",
    sectionWhat: "About Crushed Stone",

    sectionTips: "Tips for Using Crushed Stone by Size",
    sectionTipsTitle1: "Tips for Using ",
    sectionTipsTitle2: "Crushed Stone",
    sectionTipsTitle3: " by Size",

    intro: [
      "Crushed stone is large natural stone that is broken into small pieces of a certain size using a stone crusher, producing dense, strong, and sharply angled granules.",
      "This material is also known as split stone, and is one of the main ingredients that plays a very important role in building material mixtures, especially for concrete structures and road construction.",
      "Crushed stone is produced through a process of mining, crushing, and screening to obtain uniform sizes according to project needs.",
      "Because it is hard and the granules can interlock with each other, crushed stone is widely used as coarse aggregate in concrete, asphalt mixtures, and land hardening.",
    ],

    afterIntro: [
      "Usually, crushed stone is mixed with sand and cement in a certain composition to produce a strong, dense, and durable concrete casting mixture.",
      "What you should know is that crushed stone comes in various sizes adjusted to their respective uses, ranging from the finest to the largest size.",
      "Choosing the right size will greatly affect the strength, density, and final result of the construction work being carried out.",
      "Well, curious about the sizes of crushed stone and their uses? For more clarity, we will review this thoroughly below.",
    ],

    tipsIntro: [
      "Generally, the classification of crushed stone types is always adjusted to their use in construction work.",
      "From a very fine shape resembling sand, medium sizes, to super jumbo sizes for specific needs.",
      "All these size categories are generally adjusted to the needs of the user and the type of project being worked on.",
      "As for some specific tips for using crushed stone according to its size, they will be explained as follows.",
    ],

    accordionItems: [
      {
        title: "Size 0-5 MM",
        paragraphs: [
          "Its super smooth shape, almost resembling sand, makes this size of crushed stone more popularly known as stone dust.",
          "Its main use is as a mixture for the asphalt paving layer, because it can fill voids and smooth the asphalt surface.",
          "In addition, stone dust can also be used as a substitute for sand, brick installation material, or paving block installation.",
          "Because of its fine texture, stone dust is very suitable for finishing work that requires a flat and dense surface.",
        ],
      },
      {
        title: "Size 5-10 MM",
        paragraphs: [
          "This size of crushed stone is more popular under the name screening, and its shape is slightly larger than stone dust.",
          "Even so, its use is not much different from the first type, where its main function is as the main mixture in asphalt paving.",
          "Screening is also often used as a filler material in asphalt work to produce a denser and flatter road surface.",
        ],
      },
      {
        title: "Size 10-20 MM",
        paragraphs: [
          "Its very ideal shape and size make 10-20 mm crushed stone identical to concrete casting mixtures, from light to heavy construction.",
          "Generally, this size is often used as the main material in Ready Mix concrete production.",
          "The 10-20 mm size is also a favorite choice for casting building structures such as sloof, columns, beams, and floor plates.",
        ],
      },
      {
        title: "Size 20-30 MM",
        paragraphs: [
          "Because its size can be categorized as fairly medium, 20-30 mm crushed stone is usually used as a mixture material in casting activities.",
          "More precisely for concrete casting or floor casting that is flat and horizontal.",
          "For example, such as foundations, ponds, pillars, sill, earth concrete nails, and so on.",
          "This size is chosen because it provides good strength while remaining easy to handle during the casting process.",
        ],
      },
      {
        title: "Size 30-50 MM",
        paragraphs: [
          "With its fairly large shape, 30-50 mm crushed stone is usually very rarely used for casting mixtures.",
          "However, its use is more utilized for railway bearing supports, the most basic material before other materials are stacked, up to ballast for pipes at the bottom of the sea.",
          "This large size provides high stability and bearing capacity for heavy loads.",
        ],
      },
      {
        title: "Fine Aggregate Mixture",
        paragraphs: [
          "This type of crushed stone is also known as Base Course, which is fine aggregate for the foundation layer.",
          "It is a crushed stone mixture with a relatively small size, namely below 0-50 mm, which is compacted as the base layer.",
          "Generally, it is used as a medium for compacting parking lots or roads before being coated with asphalt, paving block, or cast concrete.",
          "Base Course consists of two types, namely categories A and B, which are distinguished by their composition and strength.",
          "This layer plays an important role in ensuring the upper surface does not easily subside and has an even bearing capacity.",
        ],
      },
      {
        title: "Boulder Stone",
        paragraphs: [
          "This type has another name, boulder or elephant stone, which is the largest size of crushed stone.",
          "Generally, this stone is used to fill land located right on the coast or in swamps, because it can hold back soil movement.",
          "In addition, it is sometimes used as a breakwater or wave barrier in coastal areas.",
          "Meanwhile, project contractors often use this stone for beach reclamation or small-capacity dock construction.",
        ],
      },
    ],

    serviceCallout: {
      eyebrow: "Our Services",
      title: "Order Crushed Stone & Construction Services",
      paragraphs: [
        "Those are some tips for using crushed stone according to its size. To order all crushed stone products, you can contact the company PT Tri Abadi Makmur.",
        "You can also make transactions and hire construction services through the official website spesialisaspal.com.",
      ],
      linkText: "Visit spesialisaspal.com",
      linkUrl: "https://spesialisaspal.com",
    },

    ctaBadge: "Free Consultation",
    ctaTitle1: "Need Crushed Stone? ",
    ctaTitle2: "We're ready to help.",
    ctaButton: "Contact via WhatsApp",
    ctaWaText: "Hello Tri Abadi Makmur, I would like to order crushed stone...",

    relatedTitle: "Other Products",
    relatedSubtitle: "Other construction materials frequently ordered together with crushed stone.",
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
          price: "200000", // DIISI HARGA REALISTIS
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
// HALAMAN: BATU SPLIT
// ─────────────────────────────────────────────
export default function BatuSplit() {
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
      aria-labelledby="batu-split-heading"
      className="relative bg-gradient-to-b from-slate-50 via-white to-slate-50/70
                 pt-28 lg:pt-36 pb-20 lg:pb-28 overflow-hidden antialiased
                 selection:bg-[#1e88e5]/20 [text-wrap:pretty]"
    >
      {/* ── JSON-LD: Product + Breadcrumb + FAQ ── */}
      <script
        type="application/ld+json"
        // GUNAKAN serializeJsonLd UNTUK KEAMANAN
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
              id="batu-split-heading"
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
                         bg-gradient-to-r from-[#1e88e5] via-blue-400 to-rose-400"
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
                       bg-gradient-to-br from-slate-50 via-white to-blue-50/60
                       border border-slate-200 shadow-sm
                       p-5 sm:p-7 mb-12 sm:mb-16 overflow-hidden"
          >
            <span
              aria-hidden="true"
              className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#1e88e5] to-[#1565c0]"
            />
            <div aria-hidden="true" className="absolute top-3 right-3 opacity-[0.08]">
              <svg width="80" height="80" viewBox="0 0 80 80">
                <pattern id="dots-split-1" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1" fill="#1e88e5" />
                </pattern>
                <rect width="80" height="80" fill="url(#dots-split-1)" />
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
                {d.afterIntro.map((p, i) => (
                  <p key={i} className="text-slate-600 leading-[1.85] first:text-slate-800 first:font-medium" style={BODY_FONT}>
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </aside>
        </Reveal>

        {/* ═══ 4. SECTION TIPS ═══ */}
        <Reveal y={16}>
          <div className="text-center mb-6 sm:mb-8">
            <div
              className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full
                         bg-white border border-[#1e88e5]/20 shadow-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#1e88e5]" aria-hidden="true" />
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#1565c0] font-bold">
                {d.sectionTips}
              </span>
            </div>

            <h2
              className="font-light tracking-tight text-slate-900 leading-tight text-balance max-w-2xl mx-auto"
              style={{ fontSize: "clamp(1.35rem, 3.2vw, 1.9rem)" }}
            >
              {d.sectionTipsTitle1}
              <span className="relative inline-block font-semibold text-slate-900">
                {d.sectionTipsTitle2}
                <span
                  aria-hidden="true"
                  className="absolute left-0 right-0 -bottom-1 h-1.5 bg-gradient-to-r from-[#1e88e5]/40 to-[#1e88e5]/10 rounded-full"
                />
              </span>
              {d.sectionTipsTitle3}
            </h2>
          </div>
        </Reveal>

        <Reveal y={20}>
          <aside
            className="relative rounded-2xl
                       bg-gradient-to-br from-slate-50 via-white to-rose-50/60
                       border border-slate-200 shadow-sm
                       p-5 sm:p-7 mb-8 sm:mb-10 overflow-hidden"
          >
            <span
              aria-hidden="true"
              className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#1e88e5] to-[#1565c0]"
            />
            <div aria-hidden="true" className="absolute top-3 right-3 opacity-[0.08]">
              <svg width="80" height="80" viewBox="0 0 80 80">
                <pattern id="dots-split-2" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1" fill="#1e88e5" />
                </pattern>
                <rect width="80" height="80" fill="url(#dots-split-2)" />
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
                {d.tipsIntro.map((p, i) => (
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

        {/* ═══ 5. SERVICE CALLOUT ═══ */}
        <Reveal y={24}>
          <aside
            className="relative mt-12 sm:mt-16 rounded-2xl overflow-hidden
                       bg-white border border-slate-200
                       p-6 sm:p-8 shadow-sm"
          >
            <span
              aria-hidden="true"
              className="absolute top-0 left-0 right-0 h-1.5
                         bg-gradient-to-r from-[#1e88e5] via-blue-400 to-rose-400"
            />

            <div className="flex items-start gap-3 mb-4">
              <span
                className="shrink-0 w-10 h-10 rounded-xl bg-[#1e88e5] text-white
                           flex items-center justify-center shadow-md shadow-[#1e88e5]/25"
              >
                <IconInfo className="w-5 h-5" />
              </span>
              <div className="pt-0.5">
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#1565c0] font-bold mb-1">
                  {d.serviceCallout.eyebrow}
                </p>
                <h2
                  className="font-semibold text-slate-900 leading-tight"
                  style={{ fontSize: "clamp(1.0625rem, 2.3vw, 1.3125rem)" }}
                >
                  {d.serviceCallout.title}
                </h2>
              </div>
            </div>

            <div className="space-y-3 mb-6 sm:pl-13">
              {d.serviceCallout.paragraphs.map((p, i) => (
                <p key={i} className={BODY_CLASS} style={BODY_FONT}>
                  {p}
                </p>
              ))}
            </div>

            <div className="sm:pl-13">
              <a
                href={d.serviceCallout.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${d.serviceCallout.linkText} (buka di tab baru)`}
                className="group inline-flex items-center gap-2
                           px-4 py-2.5 rounded-lg
                           bg-[#1e88e5]/5 border border-[#1e88e5]/20
                           text-[#1565c0] font-semibold text-sm
                           hover:bg-[#1e88e5] hover:text-white hover:border-[#1e88e5]
                           transition-colors duration-200
                           focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e88e5]"
              >
                {d.serviceCallout.linkText}
                <IconExternalLink className="w-4 h-4" />
              </a>
            </div>
          </aside>
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
                    href={`/supplier/${item.slug}`}
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
                <pattern id="cta-grid-split" width="32" height="32" patternUnits="userSpaceOnUse">
                  <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#cta-grid-split)" />
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