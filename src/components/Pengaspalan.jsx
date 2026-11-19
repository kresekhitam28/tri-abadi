// src/components/Pengaspalan.jsx
"use client";

import { useState, useCallback, useMemo, memo, useId } from "react";
import Link from "next/link";
import { useLang } from "../context/LanguageContext";
import ServicePricingPanel from "./ServicePricingPanel";
import ServiceQuoteHero from "./ServiceQuoteHero";
import ServiceProjectPhoto from "./ServiceProjectPhoto";
import { asphaltPackagePrices, formatAsphaltPrice } from "../data/asphaltPricing";
import { projectQuoteHref } from "../lib/quote";
import { useIsMobile } from "../hooks/useIsMobile";
import { useReveal } from "../hooks/useReveal";

// ─────────────────────────────────────────────
// KOMPONEN: REVEAL WRAPPER (memoized)
// ─────────────────────────────────────────────
const Reveal = memo(function Reveal({
  children,
  delay = 0,
  y = 28,
  duration = 700,
  as: Tag = "div",
  className = "",
}) {
  const isMobile = useIsMobile();
  const enabled = !isMobile;
  const [ref, visible] = useReveal({ enabled });

  const style = useMemo(() => {
    if (!enabled) {
      return { contain: "layout" };
    }
    return {
      transitionProperty: "opacity, transform",
      transitionDuration: `${duration}ms`,
      transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
      transitionDelay: `${delay}ms`,
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : `translateY(${y}px)`,
      willChange: visible ? "auto" : "opacity, transform",
      contain: "layout",
    };
  }, [enabled, visible, duration, delay, y]);

  return (
    <Tag ref={ref} style={style} className={className}>
      {children}
    </Tag>
  );
});

// ─────────────────────────────────────────────
// IKON
// ─────────────────────────────────────────────
function IconWhatsApp({ className = "w-4 h-4" }) {
  return (<svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>);
}
function IconArrowRight({ className = "w-3.5 h-3.5" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" /></svg>);
}
function IconPaving({ className = "w-5 h-5" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true"><rect x="3" y="3" width="8" height="8" rx="1" /><rect x="13" y="3" width="8" height="8" rx="1" /><rect x="3" y="13" width="8" height="8" rx="1" /><rect x="13" y="13" width="8" height="8" rx="1" /></svg>);
}
function IconCurb({ className = "w-5 h-5" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true"><path d="M3 16h18" /><path d="M5 16l3-8h8l3 8" /><path d="M9 12h6" /></svg>);
}
function IconMixer({ className = "w-5 h-5" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true"><path d="M3 10l9-3 9 3-9 3-9-3z" /><path d="M3 10v6l9 3 9-3v-6" /><path d="M12 13v6" /></svg>);
}
function IconGrass({ className = "w-5 h-5" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true"><rect x="3" y="12" width="18" height="8" rx="1" /><path d="M7 12V8M12 12V5M17 12V8" /></svg>);
}
function IconSidewalk({ className = "w-5 h-5" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true"><path d="M3 18h18" /><path d="M6 18V9M12 18V9M18 18V9" /><path d="M3 9h18" /></svg>);
}
function IconRuler({ className = "w-4 h-4" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true"><path d="M21.3 8.7l-9-9a1 1 0 0 0-1.4 0l-9 9a1 1 0 0 0 0 1.4l9 9a1 1 0 0 0 1.4 0l9-9a1 1 0 0 0 0-1.4z" /><path d="M7.5 10.5l2-2M10.5 13.5l2-2M13.5 16.5l2-2" /></svg>);
}
function IconLayers({ className = "w-4 h-4" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5M2 12l10 5 10-5" /></svg>);
}
function IconHammer({ className = "w-4 h-4" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true"><path d="M15 12l-8.5 8.5a2.12 2.12 0 1 1-3-3L12 9" /><path d="M17.64 15L22 10.64" /><path d="M20.91 11.7l-1.25-1.25c-.6-.6-.93-1.4-.93-2.25v-.86L16.01 4.6a5.56 5.56 0 0 0-3.94-1.64H9l.92.82A6.18 6.18 0 0 1 12 8.4v1.56l2 2h2.47l2.26 1.91" /></svg>);
}
function IconSparkles({ className = "w-4 h-4" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true"><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" /></svg>);
}
function IconArticle({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

// ─────────────────────────────────────────────
// ACCORDION (memoized)
// ─────────────────────────────────────────────
const Accordion = memo(function Accordion({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const { lang } = useLang();
  const panelId = useId();
  const btnOpen  = lang === "en" ? "Open"  : "Buka";
  const btnClose = lang === "en" ? "Close" : "Tutup";

  return (
    <div
      className={`border rounded-xl overflow-hidden mb-3 bg-white transition-all duration-300
        ${open ? "border-[#1e88e5] shadow-md shadow-blue-500/5" : "border-slate-200 hover:border-slate-300"}`}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={panelId}
        className="w-full flex items-center gap-3 sm:gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left cursor-pointer transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1e88e5]"
      >
        <span
          className={`flex-1 font-semibold uppercase tracking-[0.12em]
            ${open ? "text-[#1e88e5]" : "text-slate-800"}`}
          style={{ fontSize: "clamp(0.8125rem, 1.5vw, 0.875rem)" }}
        >
          {title}
        </span>
        <span
          className={`shrink-0 px-3 sm:px-4 py-1.5 rounded-full border font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] transition-colors duration-150
            ${open
              ? "bg-blue-700 text-white border-blue-700"
              : "bg-slate-50 text-slate-500 border-slate-200"}`}
          style={{ fontSize: "clamp(0.625rem, 1vw, 0.6875rem)" }}
        >
          {open ? btnClose : btnOpen}
        </span>
      </button>

      {open && (
        <div
          id={panelId}
          className="px-5 sm:px-6 pb-5 sm:pb-6 pt-2 text-slate-700 leading-[1.85] border-t border-slate-100 space-y-3.5"
          style={{ fontSize: "clamp(0.8125rem, 1.5vw, 0.875rem)" }}
        >
          {children}
        </div>
      )}
    </div>
  );
});

// ─────────────────────────────────────────────
// DATA BILINGUAL
// ─────────────────────────────────────────────
const kontruksiLain = [
  { Icon: IconPaving,   label: { id: "Paving Block",        en: "Paving Block" },       desc: { id: "Pemasangan paving berbagai motif",    en: "Paving installation in various patterns" } },
  { Icon: IconCurb,     label: { id: "Kanstin",             en: "Curb" },               desc: { id: "Kanstin taman, trotoar, DKI, S",       en: "Curbs for gardens, sidewalks, DKI, S" } },
  { Icon: IconMixer,    label: { id: "Beton Ready Mix",     en: "Ready-Mix Concrete" }, desc: { id: "Pengecoran beton siap pakai",          en: "Ready-to-use concrete casting" } },
  { Icon: IconGrass,    label: { id: "Kanstin Taman",       en: "Garden Curb" },        desc: { id: "Kanstin untuk area taman",             en: "Curb for garden areas" } },
  { Icon: IconSidewalk, label: { id: "Trotoar",             en: "Sidewalk" },           desc: { id: "Pengerjaan trotoar & drainase",        en: "Sidewalk & drainage works" } },
];

const tahapanPengerjaan = [
  { no: "01", Icon: IconRuler,
    title: { id: "Survey Lokasi",         en: "Site Survey" },
    desc:  { id: "Mengukur luas area & mengecek kondisi jalan untuk menentukan metode terbaik.", en: "Measure area & check road conditions to determine the best method." } },
  { no: "02", Icon: IconLayers,
    title: { id: "Persiapan Area",        en: "Area Preparation" },
    desc:  { id: "Pembersihan, perataan, dan pemadatan dasar sebelum pengaspalan.", en: "Cleaning, leveling, and base compaction before paving." } },
  { no: "03", Icon: IconHammer,
    title: { id: "Gelar Aspal",           en: "Asphalt Laying" },
    desc:  { id: "Penghamparan hotmix dengan Asphalt Finisher untuk hasil rata & padat.", en: "Hotmix spreading with Asphalt Finisher for flat & dense results." } },
  { no: "04", Icon: IconSparkles,
    title: { id: "Pemadatan & Finishing", en: "Compaction & Finishing" },
    desc:  { id: "Pemadatan akhir dengan tandem roller & perapihan tepi jalan.", en: "Final compaction with tandem roller & edge trimming." } },
];

// ─────────────────────────────────────────────
// AREA JANGKAUAN
// ─────────────────────────────────────────────
const areaJangkauan = [
  {
    region: "DKI Jakarta",
    kota: ["Jakarta Barat", "Jakarta Utara", "Jakarta Pusat", "Jakarta Timur", "Jakarta Selatan"],
    kabupaten: ["Kepulauan Seribu"],
  },
  {
    region: "Jawa Barat",
    kota: ["Bandung", "Bekasi", "Bogor", "Depok", "Cimahi", "Sukabumi", "Tasikmalaya", "Banjar", "Cirebon"],
    kabupaten: [
      "Bandung", "Bandung Barat", "Bekasi", "Bogor", "Cianjur", "Cirebon",
      "Garut", "Indramayu", "Karawang", "Kuningan", "Majalengka",
      "Pangandaran", "Purwakarta", "Subang", "Sukabumi", "Sumedang", "Tasikmalaya", "Ciamis",
    ],
  },
  {
    region: "Banten",
    kota: ["Serang", "Tangerang", "Tangerang Selatan", "Cilegon"],
    kabupaten: ["Lebak", "Pandeglang", "Serang", "Tangerang"],
  },
  {
    region: "Jawa Tengah",
    kota: ["Semarang", "Pekalongan", "Tegal", "Magelang", "Salatiga", "Surakarta (Solo)"],
    kabupaten: [
      "Banjarnegara", "Banyumas", "Batang", "Blora", "Boyolali", "Brebes",
      "Cilacap", "Demak", "Grobogan", "Jepara", "Karanganyar", "Kebumen",
      "Kendal", "Klaten", "Kudus", "Magelang", "Pati", "Pekalongan",
      "Pemalang", "Purbalingga", "Purworejo", "Rembang", "Semarang",
      "Sragen", "Sukoharjo", "Tegal", "Temanggung", "Wonogiri", "Wonosobo",
    ],
  },
  {
    region: "DI Yogyakarta",
    kota: ["Yogyakarta"],
    kabupaten: ["Bantul", "Gunungkidul", "Kulon Progo", "Sleman"],
  },
  {
    region: "Jawa Timur",
    kota: ["Surabaya", "Malang", "Madiun", "Kediri", "Blitar", "Banyuwangi", "Probolinggo", "Pasuruan", "Mojokerto", "Batu"],
    kabupaten: [
      "Bangkalan", "Banyuwangi", "Blitar", "Bojonegoro", "Bondowoso", "Gresik",
      "Jember", "Jombang", "Kediri", "Lamongan", "Madiun", "Lumajang",
      "Magetan", "Pacitan", "Malang", "Mojokerto", "Nganjuk", "Ngawi",
      "Pamekasan", "Pasuruan", "Ponorogo", "Probolinggo", "Sampang",
      "Sidoarjo", "Situbondo", "Sumenep", "Trenggalek", "Tuban", "Tulungagung",
    ],
  },
  {
    region: "Bangka Belitung",
    kota: ["Pangkal Pinang"],
    kabupaten: ["Bangka", "Bangka Barat", "Bangka Selatan", "Bangka Tengah", "Belitung", "Belitung Timur"],
  },
  {
    region: "Bali",
    kota: ["Denpasar"],
    kabupaten: ["Badung", "Bangli", "Buleleng", "Gianyar", "Jembrana", "Karangasem", "Klungkung", "Tabanan"],
  },
];

// ─────────────────────────────────────────────
// SECTION KICKER
// ─────────────────────────────────────────────
function SectionKicker({ children }) {
  return (
    <div className="inline-flex items-center gap-3 mb-4">
      <span className="w-8 h-px bg-[#1e88e5]" aria-hidden="true" />
      <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#1e88e5] font-bold">
        {children}
      </span>
      <span className="w-8 h-px bg-[#1e88e5]" aria-hidden="true" />
    </div>
  );
}

// ─────────────────────────────────────────────
// KONTEN BILINGUAL HALAMAN
// ─────────────────────────────────────────────
const content = {
  id: {
    heroTitle: "Jasa Pengaspalan Jalan & Aspal Hotmix",
    heroSubtitle: "Untuk jalan pabrik, gudang, kawasan industri, dan area parkir di Jabodetabek, Banten & Jawa Barat.",
    heroDesc: "Kirim lokasi, kondisi permukaan jalan, dan perkiraan luas area melalui WhatsApp untuk meminta estimasi biaya dan survei lokasi.",
    heroPriceNote: `Paket A: pelapisan ulang (overlay) permukaan aspal yang sudah ada, mulai ${formatAsphaltPrice(asphaltPackagePrices.A)}/m².`,
    faqPriceQuestion: "Berapa biaya pengaspalan hotmix per meter persegi?",
    faqPriceAnswer: "Harga bergantung pada jenis pekerjaan, luas area, ketebalan aspal, dan kondisi lokasi. Lihat kisaran berdasarkan pekerjaan atau minta estimasi sesuai kebutuhan proyek Anda.",
    faqPriceLink: "Lihat kisaran biaya overlay, tambal sulam, dan pengaspalan baru",
    priceTitle: "Paket Pengaspalan dan Perbaikan Aspal",
    priceScope: "Paket A mencakup pembersihan permukaan, penyemprotan emulsi, penghamparan hotmix, dan pemadatan. Tambal sulam dan pengaspalan baru memiliki paket tersendiri. Estimasi akhir mengikuti spesifikasi, luas, dan kondisi lokasi.",
    priceWaBtn: "Minta Estimasi Sesuai Luas Area",
    servicesTitle: "Jenis Pekerjaan Pengaspalan",
    projectTitle: "Dokumentasi Pengaspalan",
    projectLink: "Lihat Semua Proyek",
    otherKicker: "Bukan hanya aspal",
    acc1Title: "Kami melayani berbagai kebutuhan pengaspalan untuk",
    acc1Intro: "Cakupan area & jenis proyek yang kami kerjakan:",
    acc1Items: [
      "Jalan perumahan & komplek",
      "Jalan pabrik & kawasan industri",
      "Jalan tol & jalan nasional (sub-kontraktor)",
      "Area parkir & halaman gedung",
      "Jalan lingkungan & gang",
      "Landasan & area khusus",
    ],
    workTypes: [
      { title: "Overlay (pelapisan ulang)", description: "Menambah lapisan hotmix di atas permukaan aspal yang masih layak dilapisi ulang." },
      { title: "Perbaikan jalan (tambal sulam)", description: "Menangani bagian aspal yang rusak atau berlubang pada titik tertentu." },
      { title: "Pengaspalan baru", description: "Membangun perkerasan aspal dari tahap persiapan dasar hingga penghamparan dan pemadatan hotmix." },
    ],
    methodKicker: "Metode Kerja",
    methodTitleLight: "Cara ",
    methodTitleBold: "Pengerjaan",
    methodDesc: "Metode kerja yang kami gunakan sudah teruji di berbagai kondisi lapangan. Tahapan dimulai dari survey lokasi, persiapan area kerja, penggelaran aspal hotmix, hingga pemadatan dan finishing — setiap tahap dikerjakan dengan alat berat yang sesuai dan tenaga kerja berpengalaman.",
    figWorkKicker: "Pengerjaan",
    figWorkCaption: "Pengerjaan di lapangan",
    figWorkAlt: "Cara Pengerjaan Pengaspalan",
    infoKicker: "Informasi",
    infoTitleLight: "Harga dan Biaya ",
    infoTitleBold: "Pengaspalan",
    infoP1: "Penentuan harga pengaspalan mengacu pada spesifikasi ketebalan lapisan, jenis material hotmix, serta hasil pengukuran kondisi lahan saat survey lokasi. Jika Anda sudah memiliki RAB atau volume pekerjaan tersendiri, tim kami siap menyesuaikan pengerjaan sesuai spesifikasi teknis di lapangan.",
    infoP2: "Total biaya menyesuaikan luas area (m²) dan kondisi dasar jalan yang akan diaspal. Dengan dukungan tim profesional dan pasokan material hotmix langsung, kami memberikan penawaran harga yang kompetitif tanpa mengurangi kualitas kepadatan jalan.",
    acc3Title: "Keunggulan Jasa Pengaspalan Kami",
    acc3Items: [
      "Tenaga kerja berpengalaman & profesional",
      "Material hotmix berkualitas tinggi",
      "Harga bersaing & transparan",
      "Garansi pengerjaan hingga 2 tahun",
      "Pengerjaan tepat waktu & rapi",
    ],
    acc4Title: "Kami Siap Mengerjakan Semua Sebisa Mungkin",
    acc4Body: "Kami siap mengerjakan semua proyek pengaspalan — dari skala kecil seperti perbaikan jalan lingkungan, hingga proyek besar seperti jalan kawasan industri. Konsultasikan kebutuhan Anda, dan kami akan memberikan solusi terbaik sesuai budget dan kebutuhan.",
    articleKicker: "Informasi & Edukasi",
    articleTitleLight: "Butuh wawasan seputar ",
    articleTitleBold: "Konstruksi & Aspal?",
    articleDesc: "Jangan lewatkan artikel dan tips terbaru dari kami seputar dunia konstruksi, pengaspalan, dan perawatan jalan.",
    articleBtn: "Lihat Semua Artikel",
    areaKicker: "Layanan",
    areaTitleLight: "Area ",
    areaTitleBold: "Jangkauan Kami",
    areaDesc: "Melayani jasa pengaspalan di berbagai kota & kabupaten berikut.",
    areaToggle: "Lihat Daftar Kota & Kabupaten",
    areaCity: "Kota",
    areaRegency: "Kab.",
    ctaKicker: "Konsultasi Gratis",
    ctaTitleLight: "Butuh jasa pengaspalan? ",
    ctaTitleBold: "Kami siap membantu.",
    ctaBtn: "Hubungi via WhatsApp",
  },
  en: {
    heroTitle: "Hotmix Asphalt Paving Services",
    heroSubtitle: "For factory roads, warehouses, industrial estates, and parking areas in Greater Jakarta, Banten & West Java.",
    heroDesc: "Share your site location, surface condition, and estimated area on WhatsApp to request a quote and a site survey.",
    heroPriceNote: `Package A covers resurfacing an existing asphalt surface, starting at ${formatAsphaltPrice(asphaltPackagePrices.A, "en")}/m².`,
    faqPriceQuestion: "How much does hotmix asphalt paving cost per square meter?",
    faqPriceAnswer: "Your quote depends on the type of work, area, asphalt thickness, and site conditions. Compare the estimates by type of work or request a quote for your project.",
    faqPriceLink: "View cost ranges for resurfacing, patching, and new paving",
    priceTitle: "Asphalt Paving and Repair Packages",
    priceScope: "Package A includes surface cleaning, emulsion application, hotmix placement, and compaction. Patching and new paving have separate packages. The final quote depends on specifications, area, and site conditions.",
    priceWaBtn: "Request a Quote for Your Area",
    servicesTitle: "Types of Asphalt Work",
    projectTitle: "Asphalt Paving Project",
    projectLink: "View All Projects",
    otherKicker: "Not just asphalt",
    acc1Title: "Asphalt Paving For",
    acc1Intro: "We serve various asphalt paving needs for:",
    acc1Items: [
      "Housing & residential roads",
      "Factory & industrial area roads",
      "Toll roads & national roads (sub-contractor)",
      "Parking areas & building yards",
      "Neighborhood roads & alleys",
      "Runways & special areas",
    ],
    workTypes: [
      { title: "Overlay resurfacing", description: "Adds a hotmix layer over an existing asphalt surface suitable for resurfacing." },
      { title: "Road repair and patching", description: "Repairs localized asphalt damage and potholes." },
      { title: "New asphalt paving", description: "Builds a new asphalt surface, from preparing the base through hotmix placement and compaction." },
    ],
    methodKicker: "Work Method",
    methodTitleLight: "How We ",
    methodTitleBold: "Work",
    methodDesc: "Our work method has been tested in various field conditions. The stages start from site survey, work area preparation, hotmix asphalt laying, to compaction and finishing — each stage is carried out with appropriate heavy equipment and experienced crews.",
    figWorkKicker: "Works",
    figWorkCaption: "On-site works",
    figWorkAlt: "Asphalt Paving Work Method",
    infoKicker: "Information",
    infoTitleLight: "Asphalt ",
    infoTitleBold: "Pricing",
    infoP1: "Asphalt paving pricing refers to layer thickness specifications, hotmix material grades, and site condition measurements during our survey. If you already have your own BOQ or work volume, our team can execute according to your technical specifications.",
    infoP2: "Total cost depends on total area (m²) and base road conditions. Supported by professional crews and direct hotmix supply, we deliver competitive pricing without compromising road density and durability.",
    acc3Title: "Advantages of Our Asphalt Paving Service",
    acc3Items: [
      "Experienced & professional crews",
      "High-quality hotmix materials",
      "Competitive & transparent prices",
      "Up to 2-year work warranty",
      "On-time & neat execution",
    ],
    acc4Title: "We Are Ready to Do Our Best",
    acc4Body: "We are ready to handle all asphalt paving projects — from small scale such as neighborhood road repairs, to large projects such as industrial area roads. Consult your needs, and we will provide the best solution according to your budget and needs.",
    articleKicker: "Information & Education",
    articleTitleLight: "Need insights on ",
    articleTitleBold: "Construction & Asphalt?",
    articleDesc: "Don't miss our latest articles and tips about construction, asphalt paving, and road maintenance.",
    articleBtn: "View All Articles",
    areaKicker: "Services",
    areaTitleLight: "Our ",
    areaTitleBold: "Coverage Area",
    areaDesc: "Serving asphalt paving services in the following cities & regencies.",
    areaToggle: "View City & Regency List",
    areaCity: "City",
    areaRegency: "Regency",
    ctaKicker: "Free Consultation",
    ctaTitleLight: "Need asphalt paving? ",
    ctaTitleBold: "We are ready to help.",
    ctaBtn: "Contact via WhatsApp",
  },
};

// ─────────────────────────────────────────────
// SUB-KOMPONEN: TAHAPAN CARD
// ─────────────────────────────────────────────
const TahapanCard = memo(function TahapanCard({ item, t }) {
  return (
    <div className="relative p-5 bg-white border border-slate-100 rounded-xl shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-300 h-full">
      <span
        className="absolute top-4 right-4 font-bold leading-none text-[#1e88e5]/10 font-mono select-none pointer-events-none"
        style={{ fontSize: "clamp(1.75rem, 4vw, 2.25rem)" }}
        aria-hidden="true"
      >
        {item.no}
      </span>
      <span className="relative w-10 h-10 rounded-lg bg-blue-50 text-[#1e88e5] flex items-center justify-center mb-4">
        <item.Icon className="w-5 h-5" />
      </span>
      <h3
        className="font-bold text-slate-900 mb-2 leading-snug pr-8"
        style={{ fontSize: "clamp(0.8125rem, 1.5vw, 0.9375rem)" }}
      >
        {t(item.title)}
      </h3>
      <p
        className="text-slate-600 leading-relaxed"
        style={{ fontSize: "clamp(0.75rem, 1.4vw, 0.8125rem)" }}
      >
        {t(item.desc)}
      </p>
    </div>
  );
});

// ─────────────────────────────────────────────
// SUB-KOMPONEN: KONTRUKSI LAIN CARD
// ─────────────────────────────────────────────
const KontruksiCard = memo(function KontruksiCard({ item, t }) {
  return (
    <div className="flex items-start gap-4 p-4 bg-white border border-slate-100 rounded-xl shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-300 h-full">
      <span className="shrink-0 w-11 h-11 rounded-lg bg-blue-50 text-[#1e88e5] flex items-center justify-center">
        <item.Icon className="w-5 h-5" />
      </span>
      <div className="min-w-0 flex-1">
        <div
          className="text-slate-900 font-bold leading-snug mb-1"
          style={{ fontSize: "clamp(0.8125rem, 1.5vw, 0.9375rem)" }}
        >
          {t(item.label)}
        </div>
        <div
          className="text-slate-500 leading-snug"
          style={{ fontSize: "clamp(0.75rem, 1.3vw, 0.8125rem)" }}
        >
          {t(item.desc)}
        </div>
      </div>
    </div>
  );
});

// ─────────────────────────────────────────────
// SUB-KOMPONEN: AREA ROW
// ─────────────────────────────────────────────
const AreaRow = memo(function AreaRow({ area, data }) {
  return (
    <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm">
      <div className="flex items-center gap-3 mb-5">
        <span className="w-6 h-1 bg-[#1e88e5] rounded-full" aria-hidden="true" />
        <h3 className="text-[12px] sm:text-[13px] uppercase tracking-[0.2em] sm:tracking-[0.22em] text-slate-800 font-bold">
          {area.region}
        </h3>
        <span className="flex-1 h-px bg-slate-100" aria-hidden="true" />
      </div>

      <div className="space-y-4">
        {area.kota && area.kota.length > 0 && (
          <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
            <span className="shrink-0 mt-0.5 text-[10.5px] uppercase tracking-wider font-bold text-slate-400 sm:w-[60px]">
              {data.areaCity}
            </span>
            <div className="flex flex-wrap gap-2 flex-1">
              {area.kota.map((k, i) => (
                <span
                  key={i}
                  className="inline-block px-3 py-1 rounded-md bg-blue-50 border border-blue-100 text-[11.5px] text-[#1565c0] font-medium"
                >
                  {k}
                </span>
              ))}
            </div>
          </div>
        )}

        {area.kabupaten && area.kabupaten.length > 0 && (
          <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
            <span className="shrink-0 mt-0.5 text-[10.5px] uppercase tracking-wider font-bold text-slate-400 sm:w-[60px]">
              {data.areaRegency}
            </span>
            <div className="flex flex-wrap gap-2 flex-1">
              {area.kabupaten.map((k, i) => (
                <span
                  key={i}
                  className="inline-block px-3 py-1 rounded-md bg-slate-50 border border-slate-200 text-[11.5px] text-slate-600 font-medium"
                >
                  {k}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

// ─────────────────────────────────────────────
// HALAMAN
// ─────────────────────────────────────────────
export default function Pengaspalan({ project }) {
  const { lang } = useLang();
  const data = content[lang] || content.id;

  const t = useCallback((field) => {
    if (!field) return "";
    if (typeof field === "string") return field;
    return field[lang] || field.id || field.en || "";
  }, [lang]);

  const [showArea, setShowArea] = useState(false);
  const areaPanelId = useId();
  const waHref = projectQuoteHref("asphalt", lang);

  return (
    <div className="bg-slate-50/50">

      <ServiceQuoteHero
        lang={lang}
        quoteHref={waHref}
        title={data.heroTitle}
        subtitle={data.heroSubtitle}
        description={data.heroDesc}
        priceNote={data.heroPriceNote}
        pricesId="paket-harga-aspal"
      />

      {/* ═══════ PAKET HARGA (DI ATAS AGAR LANGSUNG TERLIHAT) ═══════ */}
      <section id="paket-harga-aspal" aria-labelledby="asphalt-pricing-title" className="scroll-mt-24 border-b border-slate-100 bg-white py-9 sm:py-12 lg:py-14">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
          <Reveal y={26}>
            <div className="text-center mb-6 sm:mb-10">
              <h2 id="asphalt-pricing-title" className="mx-auto max-w-2xl text-balance text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
                {data.priceTitle}
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-slate-600 sm:text-base">{data.priceScope}</p>
            </div>
          </Reveal>

          <Reveal y={34} delay={80}>
            <ServicePricingPanel hideCta />
          </Reveal>

          <Reveal y={20} delay={120}>
            <div className="mt-6 sm:mt-8 text-center">
              <a
                href={waHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 min-h-[48px] rounded-xl bg-emerald-700 text-white hover:bg-emerald-800 font-bold text-xs sm:text-sm uppercase tracking-[0.12em] shadow-md shadow-[#25D366]/20 hover:-translate-y-0.5 transition-all duration-200"
              >
                <IconWhatsApp className="w-5 h-5 shrink-0" />
                {data.priceWaBtn}
                <IconArrowRight className="w-4 h-4 shrink-0" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════ KONTEN UTAMA ═══════ */}
      <section className="pb-16 pt-8 sm:pt-12 lg:pb-24 lg:pt-16">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">

          {/* Daftar Cakupan & Layanan */}
          <div className="mb-12 grid gap-4 md:grid-cols-2 md:gap-6 lg:mb-16">
            <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
              <h2 className="text-lg font-semibold tracking-tight text-slate-950 sm:text-xl">{data.servicesTitle}</h2>
              <dl className="mt-2 divide-y divide-slate-100">
                {data.workTypes.map(({ title, description }) => (
                  <div key={title} className="py-3 last:pb-0">
                    <dt className="text-sm font-semibold text-slate-900">{title}</dt>
                    <dd className="mt-1 text-sm leading-relaxed text-slate-600">{description}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <Reveal delay={120} y={24}>
              <div className="border border-slate-200 rounded-xl overflow-hidden bg-white h-full">
                <div className="w-full px-5 sm:px-6 py-4 sm:py-5 border-b border-slate-100">
                  <span className="font-semibold uppercase tracking-[0.12em] text-slate-800" style={{ fontSize: "clamp(0.8125rem, 1.5vw, 0.875rem)" }}>
                    {data.acc1Title}
                  </span>
                </div>
                <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-4 text-slate-700 leading-[1.85] space-y-3.5" style={{ fontSize: "clamp(0.8125rem, 1.5vw, 0.875rem)" }}>
                  <p className="mb-3 font-medium text-slate-800">{data.acc1Intro}</p>
                  <ul className="list-disc list-outside pl-5 space-y-2 marker:text-[#1e88e5]">
                    {data.acc1Items.map((it, i) => <li key={i}>{it}</li>)}
                  </ul>
                </div>
              </div>
            </Reveal>

          </div>

          {/* SECTION: CARA PENGERJAAN */}
          <div className="mb-20">
            <Reveal y={26}>
              <div className="text-center mb-10">
                <SectionKicker>{data.methodKicker}</SectionKicker>
                <h2
                  className="font-light tracking-tight text-slate-900 leading-tight"
                  style={{ fontSize: "clamp(1.5rem, 3.5vw, 2rem)" }}
                >
                  {data.methodTitleLight}
                  <span className="font-bold">{data.methodTitleBold}</span>
                </h2>
              </div>
            </Reveal>

            <Reveal delay={100} y={22}>
              <div className="max-w-3xl mx-auto text-center mb-10">
                <p
                  className="text-slate-600 leading-[1.85]"
                  style={{ fontSize: "clamp(0.9375rem, 1.6vw, 1rem)" }}
                >
                  {data.methodDesc}
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
              {tahapanPengerjaan.map((tp, i) => (
                <Reveal key={i} delay={i * 80} y={24}>
                  <TahapanCard item={tp} t={t} />
                </Reveal>
              ))}
            </div>

            <Reveal delay={200} y={34}>
              <figure className="relative rounded-2xl overflow-hidden shadow-lg ring-1 ring-slate-900/5">
                <div className="aspect-[16/9]">
                  <img
                    src="/proyek/proyek-2.webp"
                    alt={data.figWorkAlt}
                    loading="lazy"
                    decoding="async"
                    width={1200}
                    height={675}
                    className="w-full h-full object-cover"
                  />
                </div>
                <figcaption className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/90 to-transparent px-5 sm:px-8 py-5 sm:py-8 pt-16 sm:pt-20">
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className="w-6 sm:w-8 h-px bg-[#4da3ff]" aria-hidden="true" />
                    <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] sm:tracking-[0.28em] text-[#4da3ff] font-bold">
                      {data.figWorkKicker}
                    </span>
                  </div>
                  <p
                    className="text-white font-semibold"
                    style={{ fontSize: "clamp(0.9375rem, 1.5vw, 1.125rem)" }}
                  >
                    {data.figWorkCaption}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          </div>

          {/* SECTION: HARGA & BIAYA */}
          <div className="mb-20">
            <Reveal y={26}>
              <div className="text-center mb-10">
                <SectionKicker>{data.infoKicker}</SectionKicker>
                <h2
                  className="font-light tracking-tight text-slate-900 leading-tight"
                  style={{ fontSize: "clamp(1.5rem, 3.5vw, 2rem)" }}
                >
                  {data.infoTitleLight}
                  <span className="font-bold">{data.infoTitleBold}</span>
                </h2>
              </div>
            </Reveal>

            <Reveal delay={100} y={22}>
              <div className="max-w-3xl mx-auto text-center space-y-5">
                <p
                  className="text-slate-600 leading-[1.85]"
                  style={{ fontSize: "clamp(0.9375rem, 1.6vw, 1rem)" }}
                >
                  {data.infoP1}
                </p>
                <p
                  className="text-slate-600 leading-[1.85]"
                  style={{ fontSize: "clamp(0.9375rem, 1.6vw, 1rem)" }}
                >
                  {data.infoP2}
                </p>
              </div>
            </Reveal>
          </div>

          {/* ACCORDION KEUNGGULAN */}
          <Reveal y={24}>
            <Accordion title={data.acc3Title} defaultOpen={true}>
              <ul className="list-disc list-outside pl-5 space-y-2 marker:text-[#1e88e5]">
                {data.acc3Items.map((it, i) => <li key={i}>{it}</li>)}
              </ul>
            </Accordion>
          </Reveal>

          <Reveal delay={100} y={24}>
            <Accordion title={data.acc4Title} defaultOpen={false}>
              <p>{data.acc4Body}</p>
            </Accordion>
          </Reveal>

          {/* ═══════ FAQ ═══════ */}
          <div className="mt-16 mb-16">
            <Reveal y={26}>
              <div className="text-center mb-10">
                <SectionKicker>FAQ</SectionKicker>
                <h2
                  className="font-light tracking-tight text-slate-900 leading-tight"
                  style={{ fontSize: "clamp(1.5rem, 3.5vw, 2rem)" }}
                >
                  {lang === "en" ? "Frequently Asked" : "Pertanyaan yang Sering"}{" "}
                  <span className="font-bold">{lang === "en" ? "Questions" : "Diajukan"}</span>
                </h2>
              </div>
            </Reveal>

            <div className="max-w-3xl mx-auto">
              {[
                { q: data.faqPriceQuestion, a: data.faqPriceAnswer, link: data.faqPriceLink },
                { q: "Apakah bisa survei lokasi dulu sebelum order?", a: "Ya, kami menyediakan survei lokasi gratis untuk memastikan kebutuhan, mengukur luas area, dan memberikan estimasi biaya yang akurat. Survei bisa dijadwalkan via WhatsApp." },
                { q: "Berapa lama proses pengerjaan pengaspalan?", a: "Tergantung luas dan kondisi lahan. Untuk jalan perumahan standar (100–500 m²), biasanya 1–3 hari kerja. Untuk proyek lebih besar, kami berikan estimasi waktu setelah survei." },
                { q: "Apakah ada garansi pengerjaan?", a: "Ya, kami memberikan garansi pengerjaan hingga 2 tahun untuk pengaspalan hotmix, tergantung jenis pekerjaan dan kondisi lapangan. Detail garansi dijelaskan dalam penawaran." },
                { q: "Area mana saja yang dilayani?", a: "Kami melayani Jabodetabek (Jakarta, Bogor, Depok, Tangerang, Bekasi) dan sekitarnya. Untuk area di luar Jabodetabek, silakan konsultasi via WhatsApp untuk memastikan ketersediaan." },
                { q: "Apa beda pengaspalan hotmix dan aspal biasa?", a: "Aspal hotmix dicampur dan dipanaskan pada suhu tertentu sebelum dihampar, sehingga daya lekat dan kepadatannya jauh lebih baik. Hasilnya lebih rata, kuat, dan tahan lama dibanding aspal dingin atau aspal biasa." },
                { q: "Apakah bisa mengerjakan proyek skala besar seperti jalan pabrik?", a: "Ya, kami melayani proyek dari skala kecil (jalan lingkungan) hingga besar (jalan pabrik, kawasan industri, area parkir gedung). Kami didukung alat berat modern dan tim berpengalaman." },
                { q: "Bagaimana cara memesan jasa pengaspalan?", a: "Cukup hubungi kami via WhatsApp. Tim kami akan menjadwalkan survei lokasi, memberikan penawaran, dan setelah disetujui, pengerjaan bisa dijadwalkan sesuai kesepakatan." },
              ].map((faq, i) => (
                <Reveal key={i} delay={i * 60} y={20}>
                  <Accordion title={faq.q} defaultOpen={i === 0}>
                    <p>{faq.a}</p>
                    {faq.link && (
                      <Link href="/blog/biaya-aspal-per-meter" className="inline-block rounded font-semibold text-blue-700 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-blue-700">
                        {faq.link}
                      </Link>
                    )}
                  </Accordion>
                </Reveal>
              ))}
            </div>
          </div>

          {/* ═══════ KARTU KONTRUKSI LAIN ═══════ */}
          <div className="mt-16 mb-16">
            <Reveal y={26}>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-6 h-px bg-[#1e88e5]" aria-hidden="true" />
                <h3 className="text-[11px] sm:text-[12px] uppercase tracking-[0.25em] sm:tracking-[0.28em] text-slate-500 font-bold">
                  {data.otherKicker}
                </h3>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {kontruksiLain.map((item, i) => (
                <Reveal key={i} delay={i * 60} y={24}>
                  <KontruksiCard item={item} t={t} />
                </Reveal>
              ))}
            </div>
          </div>

          {/* ═══════ SECTION ARTIKEL BLOG ═══════ */}
          <Reveal y={30}>
            <div className="mt-10 sm:mt-12 p-6 sm:p-10 bg-white border border-slate-100 rounded-2xl shadow-sm text-center max-w-3xl mx-auto relative overflow-hidden group hover:shadow-md transition-shadow duration-300">
              <div className="relative z-10">
                <SectionKicker>{data.articleKicker}</SectionKicker>
                <h3
                  className="text-slate-900 tracking-tight mb-4"
                  style={{ fontSize: "clamp(1.25rem, 3vw, 1.75rem)" }}
                >
                  <span className="font-light">{data.articleTitleLight}</span>
                  <span className="font-bold">{data.articleTitleBold}</span>
                </h3>
                <p
                  className="text-slate-600 mx-auto mb-8 max-w-xl leading-relaxed"
                  style={{ fontSize: "clamp(0.875rem, 1.6vw, 1rem)" }}
                >
                  {data.articleDesc}
                </p>
                <Link
                  href="/blog"
                  className="inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl bg-blue-700 text-white
                             font-bold tracking-wide transition-all duration-300 
                             shadow-lg shadow-[#1e88e5]/30 hover:shadow-[#1e88e5]/50 hover:-translate-y-1 
                             hover:bg-[#1976d2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e88e5] focus-visible:ring-offset-2"
                  style={{ fontSize: "clamp(0.8125rem, 1.4vw, 0.9375rem)" }}
                >
                  <IconArticle className="w-5 h-5" />
                  {data.articleBtn}
                  <IconArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          </Reveal>

          {/* ═══════ AREA JANGKAUAN ═══════ */}
          <div className="mt-12 sm:mt-16 mb-16">
            <Reveal y={26}>
              <div className="text-center mb-8">
                <SectionKicker>{data.areaKicker}</SectionKicker>
                <h2
                  className="font-light tracking-tight text-slate-900 leading-tight"
                  style={{ fontSize: "clamp(1.5rem, 3.5vw, 2rem)" }}
                >
                  {data.areaTitleLight}
                  <span className="font-bold">{data.areaTitleBold}</span>
                </h2>
                <p
                  className="text-slate-500 mt-4 max-w-xl mx-auto"
                  style={{ fontSize: "clamp(0.875rem, 1.4vw, 0.9375rem)" }}
                >
                  {data.areaDesc}
                </p>
              </div>
            </Reveal>

            <Reveal y={30} delay={80}>
              <button
                type="button"
                onClick={() => setShowArea(!showArea)}
                aria-expanded={showArea}
                aria-controls={areaPanelId}
                className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 bg-white border border-slate-200 rounded-xl cursor-pointer hover:border-[#1e88e5] hover:shadow-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1e88e5]"
              >
                <span
                  className={`font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em]
                    ${showArea ? "text-[#1e88e5]" : "text-slate-700"}`}
                  style={{ fontSize: "clamp(0.8125rem, 1.5vw, 0.9375rem)" }}
                >
                  {data.areaToggle}
                </span>
                <span
                  className={`shrink-0 px-4 py-1.5 rounded-full border font-bold uppercase tracking-[0.15em] transition-colors duration-200
                    ${showArea
                      ? "bg-blue-700 text-white border-blue-700"
                      : "bg-slate-50 text-slate-500 border-slate-200"}`}
                  style={{ fontSize: "clamp(0.625rem, 1vw, 0.6875rem)" }}
                >
                  {showArea
                    ? (lang === "en" ? "Close" : "Tutup")
                    : (lang === "en" ? "Open"  : "Buka")}
                </span>
              </button>

              {showArea && (
                <div id={areaPanelId} className="mt-6 space-y-4">
                  {areaJangkauan.map((area, idx) => (
                    <Reveal key={idx} delay={idx * 40} y={16}>
                      <AreaRow area={area} data={data} />
                    </Reveal>
                  ))}
                </div>
              )}
            </Reveal>
          </div>

          <section aria-labelledby="asphalt-project-title" className="mx-auto max-w-xl">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
              <h2 id="asphalt-project-title" className="text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl">
                {data.projectTitle}
              </h2>
              <Link href="/proyek" className="inline-flex min-h-11 items-center gap-2 rounded text-sm font-semibold text-blue-800 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">
                {data.projectLink}
                <IconArrowRight className="size-4" />
              </Link>
            </div>
            <ServiceProjectPhoto project={project} lang={lang} />
          </section>

          {/* ═══════ CTA BAWAH ═══════ */}
          <Reveal y={34}>
            <div className="mt-10 sm:mt-14 p-8 sm:p-12 bg-slate-900 rounded-3xl text-center max-w-3xl mx-auto shadow-2xl shadow-slate-900/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#1e88e5] rounded-full blur-3xl opacity-20 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-[#25D366] rounded-full blur-3xl opacity-10 pointer-events-none"></div>

              <div className="relative z-10">
                <p className="text-[#4da3ff] text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-bold mb-4">
                  {data.ctaKicker}
                </p>
                <h3
                  className="text-white font-light tracking-tight mb-8"
                  style={{ fontSize: "clamp(1.25rem, 3vw, 1.75rem)" }}
                >
                  {data.ctaTitleLight}
                  <span className="font-bold">{data.ctaTitleBold}</span>
                </h3>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={data.ctaBtn}
                  className="inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-4 min-h-[48px] rounded-xl bg-emerald-700 text-white hover:bg-emerald-800 font-bold uppercase tracking-[0.1em] sm:tracking-[0.15em] shadow-lg shadow-[#25D366]/30 hover:shadow-[#25D366]/50 hover:-translate-y-0.5 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                  style={{ fontSize: "clamp(0.75rem, 1.3vw, 0.875rem)" }}
                >
                  <IconWhatsApp className="w-5 h-5 shrink-0" />
                  {data.ctaBtn}
                  <IconArrowRight className="w-4 h-4 shrink-0 ml-1" />
                </a>
              </div>
            </div>
          </Reveal>

        </div>
      </section>
    </div>
  );
}
