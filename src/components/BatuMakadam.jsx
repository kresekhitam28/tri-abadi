// src/components/BatuMakadam.jsx
"use client";

import { useState, useCallback, memo } from "react";
import Image from "next/image";
import { useLang } from "../context/LanguageContext";
import MaterialDeliveryInfo from "./MaterialDeliveryInfo";
import Reveal from "./Reveal";
// INTEGRASI DENGAN METADATA HELPER MILIKMU
import { SITE_URL, SITE_NAME, SITE_ENTITY_ID, serializeJsonLd } from "../lib/metadata";

// ─────────────────────────────────────────────
// KONFIG — DISESUAIKAN DENGAN ROUTE /supplier/
// ─────────────────────────────────────────────
const PRODUCT_SLUG = "batu-makadam";
const PRODUCT_URL = `${SITE_URL}/supplier/${PRODUCT_SLUG}`;
const PRODUCT_IMAGE = `${SITE_URL}/produk/batu-makadam.png`;

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
  const buttonId = `batu-makadam-btn-${id}`;
  const panelId = `batu-makadam-panel-${id}`;

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
    title: "Batu Makadam",
    subtitle: "Jual Batu Makadam Murah",
    thumbImage: "/produk/batu-makadam.png",
    imageAlt: "Tumpukan batu makadam untuk lapis pondasi jalan",
    sectionWhat: "Mengenal Batu Makadam",

    sectionHarga: "Cara Mendapatkan Harga Batu Makadam",
    sectionHargaTitle1: "Cara Mendapatkan ",
    sectionHargaTitle2: "Harga Batu Makadam",
    sectionHargaTitle3: " Berkualitas",

    intro: [
      "Batu makadam adalah salah satu material utama yang paling sering digunakan sebagai lapisan dasar (base course) dalam pembangunan jalan, baik jalan raya, jalan lingkungan, maupun jalan kawasan industri.",
      "Material ini terbuat dari batu alam berukuran besar yang telah melalui proses pemecahan dengan fraksi tertentu, sehingga menghasilkan butiran batu yang padat, keras, dan saling mengunci saat dipadatkan.",
      "Batu makadam umumnya berwarna hitam keabu-abuan dengan tekstur permukaan yang kasar, serta memiliki daya dukung yang sangat baik ketika digunakan sebagai pondasi jalan.",
      "Karena kekuatan dan daya tahannya, batu makadam menjadi pilihan favorit para kontraktor untuk memastikan konstruksi jalan lebih stabil, tidak mudah amblas, dan tahan lama terhadap beban kendaraan.",
    ],

    afterIntro: [
      "Proses pembuatan batu makadam dilakukan dengan menghancurkan bongkahan batu besar menggunakan alat pemecah batu (stone crusher) hingga diperoleh ukuran yang seragam sesuai kebutuhan proyek.",
      "Pada dasarnya, batu makadam berfungsi sebagai media pengerasan permukaan lahan, sehingga tanah yang sebelumnya lunak menjadi lebih padat dan siap menerima beban konstruksi di atasnya.",
      "Dengan kata lain, batu makadam digunakan untuk memperbaiki dan memperkuat struktur tanah agar lebih stabil serta tidak mudah mengalami penurunan.",
      "Kebutuhan akan batu makadam sangat tinggi pada proyek pembangunan jalan, lahan industri, area perkantoran, kawasan pergudangan, hingga jalan masuk perumahan yang akan dibuka atau diaspal.",
    ],

    priceBridge: [
      "Pertimbangan berikutnya yang tak kalah penting adalah harga. Sebelum memesan, Anda perlu memahami bagaimana cara memperoleh harga batu makadam yang wajar dan sesuai dengan kualitasnya.",
      "Bagi Anda yang sedang mempersiapkan pembangunan, mengetahui kisaran harga sekaligus kualitas batu makadam akan sangat membantu dalam menyusun anggaran proyek.",
      "Agar lebih jelas, berikut kami ulas secara rinci hal-hal yang perlu Anda perhatikan di bawah ini.",
    ],
    hargaIntro: [
      "Ada beberapa ciri dan pertimbangan penting yang perlu Anda ketahui sebelum membeli batu makadam.",
      "Agar mendapatkan harga yang tepat dan sesuai kualitas, Anda harus lebih cermat dalam memilih serta memeriksa material yang akan dibeli.",
      "Adapun cara untuk mengetahui kualitas batu makadam yang akan Anda beli, antara lain dapat dilihat dari beberapa hal berikut ini.",
    ],

    accordionItems: [
      {
        title: "Warna Batu",
        paragraphs: [
          "Ciri pertama yang perlu Anda ketahui dari batu makadam adalah warnanya. Warna menjadi indikator awal yang cukup mudah dikenali secara visual.",
          "Kualitas batu makadam yang paling baik umumnya berwarna hitam keabu-abuan hingga kehitam-hitaman, dengan permukaan yang tampak padat dan tidak berlubang.",
          "Warna tersebut mirip dengan batu kali pada umumnya. Namun perlu diingat, ada juga batu makadam yang berwarna putih hingga agak kecoklatan, tergantung dari jenis batuan asalnya.",
          "Oleh karena itu, kualitas batu makadam tidak bisa dinilai hanya dari warna semata, melainkan juga bergantung pada karakter dan kekuatan batu itu sendiri.",
          "Sebagai langkah awal, Anda bisa membandingkan warna batu dari beberapa penjual untuk memastikan material yang ditawarkan benar-benar berkualitas.",
        ],
      },
      {
        title: "Karakter Khas",
        paragraphs: [
          "Batu makadam berkualitas tinggi memiliki karakter padat, keras, dan tidak mudah pecah ketika menerima beban atau benturan.",
          "Untuk membuktikan kualitasnya, Anda dapat melakukan uji sederhana dengan merendam batu di dalam air selama kurang lebih 1 jam.",
          "Setelah itu, angkat batu dan pukulkan dengan palu secara berulang-ulang untuk melihat kekuatannya.",
          "Apabila batu pecah hanya dengan satu kali pukulan, maka kualitasnya tergolong rendah atau jelek.",
          "Sebaliknya, jika batu tetap utuh meskipun dipukul berkali-kali, maka kualitas batu tersebut tergolong baik.",
          "Perlu diketahui, akan ada variasi harga yang mengikuti kualitas material. Semakin baik kualitas yang ditawarkan, semakin tinggi pula harga yang harus dibayar.",
          "Oleh karena itu, jangan hanya tergiur harga murah, tetapi pastikan juga kualitas batunya sesuai kebutuhan proyek Anda.",
        ],
      },
      {
        title: "Ukuran Batu Yang Dijual Di Pasaran",
        paragraphs: [
          "Batu makadam yang dijual di pasaran umumnya disesuaikan dengan kebutuhan pelanggan, sehingga tersedia dalam berbagai variasi ukuran.",
          "Beberapa ukuran batu makadam yang umum dijual antara lain kategori jumbo (di atas 7 cm), ukuran 5–7 cm, 3–5 cm, dan 2–3 cm.",
          "Masing-masing ukuran memiliki peruntukan yang berbeda, misalnya untuk pengerasan konstruksi jalan, bantalan rel kereta api, pengerasan lahan, dan kebutuhan lainnya.",
          "Pemilihan ukuran harus disesuaikan dengan jenis pekerjaan serta lapisan konstruksi yang akan dibangun agar hasilnya maksimal.",
          "Perlu dicatat bahwa kategori ukuran batu turut mempengaruhi harga jual, sehingga Anda perlu menyesuaikannya dengan kebutuhan dan anggaran.",
        ],
      },
      {
        title: "Membandingkan Harga",
        paragraphs: [
          "Sebelum melakukan transaksi pembelian, Anda dapat memanfaatkan kemudahan teknologi untuk mengetahui harga batu makadam yang berlaku di pasaran.",
          "Di era serba online seperti sekarang, Anda akan dengan mudah menemukan banyak toko atau supplier yang menawarkan batu makadam melalui situs resmi mereka.",
          "Sebagai langkah bijak, Anda sebaiknya membandingkan harga dari beberapa sumber atau situs resmi untuk mendapatkan penawaran terbaik.",
          "Anda pasti akan menemukan selisih harga yang berbeda-beda antar penjual, tergantung kualitas, ukuran, dan lokasi pengiriman.",
          "Dengan membandingkan harga, Anda dapat menyesuaikan pilihan dengan anggaran yang dimiliki tanpa mengorbankan kualitas.",
        ],
      },
      {
        title: "Cara Transaksi Via Online",
        paragraphs: [
          "Setelah Anda menemukan penjual dengan harga dan kualitas yang sesuai, tahapan selanjutnya adalah melakukan transaksi secara online.",
          "Langkah pemesanan dimulai dengan mengetahui alamat perusahaan penjual secara jelas serta memastikan identitasnya terpercaya.",
          "Pastikan Anda tidak membayar di awal atau tanpa uang muka (DP), dan tidak melakukan transaksi pembayaran sebelum barang pesanan tiba di lokasi Anda.",
          "Harga yang ditawarkan sebaiknya sudah termasuk biaya pengiriman dan penurunan barang, sehingga tidak ada biaya tambahan yang mengejutkan.",
          "Yang tidak kalah penting, Anda harus mengukur kembali isi muatan barang di dalam truk saat barang tiba untuk memastikan jumlahnya sesuai pesanan.",
          "Salah satu perusahaan yang profesional dalam melayani transaksi, termasuk dalam hal penetapan harga, adalah PT Tri Abadi Makmur.",
          "Demikianlah beberapa cara untuk mengetahui harga batu makadam yang berlaku di pasaran.",
          "Untuk pemesanan material, Anda dapat menghubungi kami di PT Tri Abadi Makmur melalui tombol WhatsApp di bawah ini.",
        ],
      },
    ],

    ctaBadge: "Konsultasi Gratis",
    ctaTitle1: "Butuh Batu Makadam? ",
    ctaTitle2: "Kami siap membantu.",
    ctaButton: "Hubungi via WhatsApp",
    ctaWaText: "Halo Tri Abadi Makmur, saya ingin pesan batu makadam...",

    relatedTitle: "Produk Lainnya",
    relatedSubtitle: "Material konstruksi lain yang sering dipesan bersama batu makadam.",
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
        slug: "batu-kali",
        name: "Batu Kali",
        desc: "Batu belah untuk pondasi bangunan dan struktur penahan tanah.",
        image: "/produk/batu-kali.png",
        alt: "Tumpukan batu kali untuk pondasi bangunan",
      },
    ],
  },

  en: {
    title: "Macadam Stone",
    subtitle: "Selling Cheap Macadam Stone",
    thumbImage: "/produk/batu-makadam.png",
    imageAlt: "Pile of macadam stone for road base layers",
    sectionWhat: "About Macadam Stone",

    sectionHarga: "How to Get the Price of Macadam Stone",
    sectionHargaTitle1: "How to Get ",
    sectionHargaTitle2: "Macadam Stone Price",
    sectionHargaTitle3: " with Quality",

    intro: [
      "Macadam stone is one of the main materials most commonly used as a base course in road construction, whether for highways, neighborhood roads, or industrial estate roads.",
      "This material is made from large natural stones that have gone through a crushing process into certain fractions, producing dense, hard stone granules that interlock when compacted.",
      "Macadam stone is generally grayish-black with a rough surface texture, and has excellent bearing capacity when used as a road foundation.",
      "Because of its strength and durability, macadam stone is a favorite among contractors to ensure road construction is more stable, resistant to subsidence, and long-lasting under vehicle loads.",
    ],

    afterIntro: [
      "The production of macadam stone is done by crushing large stone chunks using a stone crusher until uniform sizes are obtained according to project needs.",
      "Basically, macadam stone functions as a medium for hardening the land surface, so that previously soft soil becomes more solid and ready to bear construction loads on top of it.",
      "In other words, macadam stone is used to repair and strengthen the soil structure so it is more stable and not easily subsided.",
      "The demand for macadam stone is very high in road construction projects, industrial land, office areas, warehousing areas, and even residential entrance roads that are about to be opened or paved.",
    ],

    priceBridge: [
      "The next consideration, which is no less important, is price. Before ordering, you need to understand how to obtain a fair price for macadam stone that matches its quality.",
      "For those of you preparing for construction, knowing the price range and quality of macadam stone will greatly help in planning your project budget.",
      "For more clarity, we will review in detail the things you need to pay attention to below.",
    ],
    hargaIntro: [
      "There are several important characteristics and considerations you need to know before buying macadam stone.",
      "To get the right price that matches the quality, you must be more careful in choosing and inspecting the material to be purchased.",
      "As for how to determine the quality of the macadam stone you are going to buy, it can be seen from several things as follows.",
    ],

    accordionItems: [
      {
        title: "Stone Color",
        paragraphs: [
          "The first characteristic you need to know about macadam stone is its color. Color is an early indicator that is quite easy to recognize visually.",
          "The best quality macadam stone is generally grayish-black to dark black in color, with a surface that looks solid and not porous.",
          "This color is similar to river stone in general. However, keep in mind that some macadam stones are white to slightly brownish, depending on the type of source rock.",
          "Therefore, the quality of macadam stone cannot be judged by color alone; it also depends on the character and strength of the stone itself.",
          "As a first step, you can compare the color of stones from several sellers to ensure the material offered is truly of good quality.",
        ],
      },
      {
        title: "Distinctive Characteristics",
        paragraphs: [
          "High-quality macadam stone has the characteristics of being dense, hard, and not easily broken when receiving loads or impacts.",
          "To prove its quality, you can do a simple test by soaking the stone in water for about 1 hour.",
          "After that, lift the stone and hit it repeatedly with a hammer to see its strength.",
          "If the stone breaks with just one hit, its quality is classified as low or poor.",
          "Conversely, if the stone remains intact even after being hit many times, then the quality of the stone is classified as good.",
          "Note that there will be price variations that follow the quality of the material. The better the quality offered, the higher the price to be paid.",
          "Therefore, do not be tempted by low prices alone, but make sure the quality of the stone matches your project needs.",
        ],
      },
      {
        title: "Stone Sizes Sold in the Market",
        paragraphs: [
          "Macadam stone sold in the market is generally adjusted to customer needs, so it is available in various size variations.",
          "Some common macadam stone sizes sold include the jumbo category (above 7 cm), 5–7 cm, 3–5 cm, and 2–3 cm.",
          "Each size has a different use, for example for road construction hardening, railway bearings, land hardening, and other needs.",
          "Size selection must be adjusted to the type of work and the construction layer to be built for maximum results.",
          "Note that the size category of the stone also affects the selling price, so you need to adjust it to your needs and budget.",
        ],
      },
      {
        title: "Comparing Prices",
        paragraphs: [
          "Before making a purchase transaction, you can take advantage of technology to find out the current market price of macadam stone.",
          "In today's all-online era, you will easily find many stores or suppliers offering macadam stone through their official websites.",
          "As a wise step, you should compare prices from several sources or official sites to get the best offer.",
          "You will certainly find different price differences between sellers, depending on quality, size, and delivery location.",
          "By comparing prices, you can adjust your choice to your budget without sacrificing quality.",
        ],
      },
      {
        title: "How to Transact Online",
        paragraphs: [
          "After you find a seller with a suitable price and quality, the next step is to make a transaction online.",
          "The ordering step begins with knowing the seller company's address clearly and ensuring its identity is trustworthy.",
          "Make sure you do not pay upfront or without a down payment (DP), and do not make payment transactions before the ordered goods arrive at your location.",
          "The offered price should already include shipping and unloading costs, so there are no surprising additional fees.",
          "No less important, you must re-measure the contents of the load in the truck when the goods arrive to ensure the quantity matches the order.",
          "One company that is professional in serving transactions, including in terms of pricing, is PT Tri Abadi Makmur.",
          "That is how to find out the current market price of macadam stone.",
          "To order materials, you can contact us at PT Tri Abadi Makmur through the WhatsApp button below.",
        ],
      },
    ],

    ctaBadge: "Free Consultation",
    ctaTitle1: "Need Macadam Stone? ",
    ctaTitle2: "We're ready to help.",
    ctaButton: "Contact via WhatsApp",
    ctaWaText: "Hello Tri Abadi Makmur, I would like to order macadam stone...",

    relatedTitle: "Other Products",
    relatedSubtitle: "Other construction materials frequently ordered together with macadam stone.",
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
        slug: "batu-kali",
        name: "River Stone",
        desc: "Split stone for building foundations and retaining structures.",
        image: "/produk/batu-kali.png",
        alt: "Pile of river stones for building foundations",
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
// HALAMAN: BATU MAKADAM
// ─────────────────────────────────────────────
export default function BatuMakadam() {
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
      aria-labelledby="batu-makadam-heading"
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
              id="batu-makadam-heading"
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
          specification={{ id: "Batu pecah berfraksi kasar untuk lapis pondasi. Konfirmasi fraksi yang dibutuhkan.", en: "Coarse crushed stone for the road base. Confirm the required fraction." }}
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
                         bg-gradient-to-r from-[#1e88e5] via-blue-400 to-emerald-400"
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

        {/* ═══ 3. CALLOUT 1 ═══ */}
        <Reveal y={20}>
          <aside
            className="relative rounded-2xl
                       bg-gradient-to-br from-slate-50 via-white to-blue-50/60
                       border border-slate-200 shadow-sm
                       p-5 sm:p-7 mb-14 sm:mb-20 overflow-hidden"
          >
            <span
              aria-hidden="true"
              className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#1e88e5] to-[#1565c0]"
            />
            <div aria-hidden="true" className="absolute top-3 right-3 opacity-[0.08]">
              <svg width="80" height="80" viewBox="0 0 80 80">
                <pattern id="dots-makadam" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1" fill="#1e88e5" />
                </pattern>
                <rect width="80" height="80" fill="url(#dots-makadam)" />
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

        {/* ═══ 4. SECTION HARGA ═══ */}
        <Reveal y={16}>
          <div className="text-center mb-6 sm:mb-8">
            <div
              className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full
                         bg-white border border-[#1e88e5]/20 shadow-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#1e88e5]" aria-hidden="true" />
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#1565c0] font-bold">
                {d.sectionHarga}
              </span>
            </div>

            <h2
              className="font-light tracking-tight text-slate-900 leading-tight text-balance max-w-2xl mx-auto"
              style={{ fontSize: "clamp(1.35rem, 3.2vw, 1.9rem)" }}
            >
              {d.sectionHargaTitle1}
              <span className="relative inline-block font-semibold text-slate-900">
                {d.sectionHargaTitle2}
                <span
                  aria-hidden="true"
                  className="absolute left-0 right-0 -bottom-1 h-1.5 bg-gradient-to-r from-[#1e88e5]/40 to-[#1e88e5]/10 rounded-full"
                />
              </span>
              {d.sectionHargaTitle3}
            </h2>
          </div>
        </Reveal>

        <Reveal y={20}>
          <aside
            className="relative rounded-2xl bg-white border border-slate-200
                       p-6 sm:p-8 mb-8 sm:mb-10 overflow-hidden
                       shadow-sm shadow-slate-200/40"
          >
            <span
              aria-hidden="true"
              className="absolute top-0 left-0 right-0 h-1.5
                         bg-gradient-to-r from-[#1e88e5] via-blue-400 to-transparent"
            />

            <div className="flex items-start gap-3 mb-4">
              <span
                className="shrink-0 w-10 h-10 rounded-xl bg-[#1e88e5] text-white
                           flex items-center justify-center
                           shadow-md shadow-[#1e88e5]/25"
              >
                <IconInfo className="w-5 h-5" />
              </span>
              <div className="pt-0.5">
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#1565c0] font-bold mb-1">
                  {d.sectionHarga}
                </p>
                <p className="text-slate-900 font-semibold text-sm sm:text-base leading-snug">
                  {d.hargaIntro[0]}
                </p>
              </div>
            </div>

            <div className="space-y-3 pl-0 sm:pl-13">
              {[...d.priceBridge, ...d.hargaIntro.slice(1)].map((p, i) => (
                <p key={i} className="text-slate-600 leading-[1.85]" style={BODY_FONT}>
                  {p}
                </p>
              ))}
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

        {/* ═══ 5. RELATED PRODUCTS ═══ */}
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

        {/* ═══ 6. CTA (Paling Bawah) ═══ */}
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
                <pattern id="cta-grid-makadam" width="32" height="32" patternUnits="userSpaceOnUse">
                  <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#cta-grid-makadam)" />
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
