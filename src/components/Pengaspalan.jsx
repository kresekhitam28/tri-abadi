// src/components/Pengaspalan.jsx
"use client";

import { useState, useEffect, useRef, useCallback, useMemo, memo } from "react";
import { useLang } from "../context/LanguageContext";
import ServicePricingPanel from "./ServicePricingPanel";

// ─────────────────────────────────────────────
// HOOK: DETEKSI MOBILE
// ─────────────────────────────────────────────
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();
    if (mq.addEventListener) {
      mq.addEventListener("change", update);
      return () => mq.removeEventListener("change", update);
    } else {
      mq.addListener(update);
      return () => mq.removeListener(update);
    }
  }, []);
  return isMobile;
}

// ─────────────────────────────────────────────
// HOOK: REVEAL ON SCROLL
// ─────────────────────────────────────────────
function useReveal(options = {}) {
  const {
    threshold = 0.12,
    rootMargin = "0px 0px -60px 0px",
    once = true,
    enabled = true,
  } = options;
  const ref = useRef(null);
  const [visible, setVisible] = useState(!enabled);

  useEffect(() => {
    if (!enabled) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) io.unobserve(entry.target);
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold, rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin, once, enabled]);

  return [ref, visible];
}

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
      return { contain: "layout paint style" };
    }
    return {
      transitionProperty: "opacity, transform",
      transitionDuration: `${duration}ms`,
      transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
      transitionDelay: `${delay}ms`,
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : `translateY(${y}px)`,
      willChange: visible ? "auto" : "opacity, transform",
      contain: "layout paint style",
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
  return (<svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>);
}
function IconArrowRight({ className = "w-3.5 h-3.5" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14M13 5l7 7-7 7" /></svg>);
}
function IconPaving({ className = "w-5 h-5" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="3" y="3" width="8" height="8" rx="1" /><rect x="13" y="3" width="8" height="8" rx="1" /><rect x="3" y="13" width="8" height="8" rx="1" /><rect x="13" y="13" width="8" height="8" rx="1" /></svg>);
}
function IconCurb({ className = "w-5 h-5" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 16h18" /><path d="M5 16l3-8h8l3 8" /><path d="M9 12h6" /></svg>);
}
function IconMixer({ className = "w-5 h-5" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 10l9-3 9 3-9 3-9-3z" /><path d="M3 10v6l9 3 9-3v-6" /><path d="M12 13v6" /></svg>);
}
function IconGrass({ className = "w-5 h-5" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="3" y="12" width="18" height="8" rx="1" /><path d="M7 12V8M12 12V5M17 12V8" /></svg>);
}
function IconSidewalk({ className = "w-5 h-5" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 18h18" /><path d="M6 18V9M12 18V9M18 18V9" /><path d="M3 9h18" /></svg>);
}
function IconRuler({ className = "w-4 h-4" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21.3 8.7l-9-9a1 1 0 0 0-1.4 0l-9 9a1 1 0 0 0 0 1.4l9 9a1 1 0 0 0 1.4 0l9-9a1 1 0 0 0 0-1.4z" /><path d="M7.5 10.5l2-2M10.5 13.5l2-2M13.5 16.5l2-2" /></svg>);
}
function IconLayers({ className = "w-4 h-4" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5M2 12l10 5 10-5" /></svg>);
}
function IconHammer({ className = "w-4 h-4" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 12l-8.5 8.5a2.12 2.12 0 1 1-3-3L12 9" /><path d="M17.64 15L22 10.64" /><path d="M20.91 11.7l-1.25-1.25c-.6-.6-.93-1.4-.93-2.25v-.86L16.01 4.6a5.56 5.56 0 0 0-3.94-1.64H9l.92.82A6.18 6.18 0 0 1 12 8.4v1.56l2 2h2.47l2.26 1.91" /></svg>);
}
function IconSparkles({ className = "w-4 h-4" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" /></svg>);
}

// ─────────────────────────────────────────────
// ACCORDION (memoized)
// ─────────────────────────────────────────────
const Accordion = memo(function Accordion({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const { lang } = useLang();
  const btnOpen  = lang === "en" ? "Open"  : "Buka";
  const btnClose = lang === "en" ? "Close" : "Tutup";

  return (
    <div
      className={`border rounded-xl overflow-hidden mb-2.5 bg-white
                  transition-colors duration-200
                  ${open ? "border-[#1e88e5]" : "border-slate-200"}`}
      style={{ contain: "layout paint style" }}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center gap-3 sm:gap-4
                   px-4 sm:px-5 py-3.5 sm:py-4
                   text-left cursor-pointer transition-colors duration-150"
      >
        <span
          className={`flex-1 font-semibold uppercase tracking-[0.12em]
                      ${open ? "text-[#1e88e5]" : "text-slate-800"}`}
          style={{ fontSize: "clamp(0.75rem, 1.5vw, 0.84375rem)" }}
        >
          {title}
        </span>
        <span
          className={`shrink-0 px-2.5 sm:px-3.5 py-1.5 rounded-full border
                      font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em]
                      transition-colors duration-150
                      ${open
                        ? "bg-[#1e88e5] text-white border-[#1e88e5]"
                        : "bg-white text-slate-500 border-slate-300"}`}
          style={{ fontSize: "clamp(0.5625rem, 1vw, 0.625rem)" }}
        >
          {open ? btnClose : btnOpen}
        </span>
      </button>

      {open && (
        <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-1
                        text-slate-700 leading-[1.85]
                        border-t border-slate-100 space-y-3.5"
             style={{ fontSize: "clamp(0.8125rem, 1.5vw, 0.875rem)" }}>
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
// SECTION TITLE
// ─────────────────────────────────────────────
function SectionKicker({ children }) {
  return (
    <div className="inline-flex items-center gap-2.5 sm:gap-3 mb-3">
      <span className="w-6 sm:w-8 h-px bg-[#1e88e5]" />
      <span className="text-[10px] sm:text-[11px] uppercase
                       tracking-[0.25em] sm:tracking-[0.3em]
                       text-[#1e88e5] font-semibold">
        {children}
      </span>
      <span className="w-6 sm:w-8 h-px bg-[#1e88e5]" />
    </div>
  );
}

// ─────────────────────────────────────────────
// KONTEN BILINGUAL HALAMAN
// ─────────────────────────────────────────────
const content = {
  id: {
    heroKicker: "Layanan Kami",
    heroTitle: "Pengaspalan",
    heroDesc: "Jasa pengaspalan berkualitas tinggi dengan harga bersaing. Dikerjakan oleh tenaga konstruksi berpengalaman untuk hasil yang rapi, kuat, dan tahan lama.",
    figKicker: "Proyek",
    figCaption: "Proyek Pengaspalan — Tri Abadi Makmur",
    figAlt: "Jasa Pengaspalan",
    introTitle: "Jasa Pengaspalan Berkualitas Tinggi Harga Bersaing",
    introP1: "— menggunakan tenaga-tenaga konstruksi profesional demi memberikan service yang diutamakan.",
    introP2Prefix: "Dari team Kontraktor ",
    introP2Mid: ", kami mau menawarkan dan melayani pengerjaan jalan, perbaikan jalan, serta aspal dan pembuatan aspal.",
    otherKicker: "Bukan hanya aspal",
    contactP1: "Untuk detailnya, Anda bisa menghubungi kami melalui WhatsApp di ",
    contactEmail: "triabadimakmur@gmailcom",
    contactP2: " dan juga bisa melalui Facebook dan Instagram.",
    acc1Title: "Seperti Pengaspalan Untuk",
    acc1Intro: "Kami melayani berbagai kebutuhan pengaspalan untuk:",
    acc1Items: [
      "Jalan perumahan & komplek",
      "Jalan pabrik & kawasan industri",
      "Jalan tol & jalan nasional (sub-kontraktor)",
      "Area parkir & halaman gedung",
      "Jalan lingkungan & gang",
      "Landasan & area khusus",
    ],
    acc2Title: "Layanan Jasa Pengaspalan",
    acc2Items: [
      "Pengaspalan hotmix baru",
      "Perbaikan & penambalan aspal rusak",
      "Overlay / pelapisan ulang aspal",
      "Pembersihan & pemadatan area kerja",
      "Finishing & perapihan hasil akhir",
    ],
    priceKicker: "Paket Harga",
    priceTitleLight: "Berikut kami tawarkan ",
    priceTitleBold: "harga paket jasa perbaikan aspal",
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
    infoP1: "Dalam menentukan harga, kami akan mengacu pada apa yang ditentukan oleh pihak pembuat dan mengukur sendiri kondisi jalan nantinya. Jika pihak memakai komposisi dan volume pekerjaan yang ditentukan oleh Anda, kami akan mengerjakan sesuai dengan yang sudah ditentukan di lapangan.",
    infoP2: "Sedangkan dalam mengerjakan pengaspalan tergantung luas dan kondisi jalan, dan akan dihitung pula saat survey lokasi. Mengenai harga diatur di bawah pengaruh kualitas. Dengan adanya pekerjaan di pinggir jalan maupun untuk berbagai jenis kategori jalan, kami kerjakan aspal murah.",
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
    ctaWaMessage: "Halo Tri Abadi Makmur, saya ingin konsultasi mengenai Project...",
  },
  en: {
    heroKicker: "Our Services",
    heroTitle: "Asphalt Paving",
    heroDesc: "High-quality asphalt paving services at competitive prices. Executed by experienced construction crews for neat, strong, and long-lasting results.",
    figKicker: "Project",
    figCaption: "Asphalt Paving Project — Tri Abadi Makmur",
    figAlt: "Asphalt Paving Service",
    introTitle: "High-Quality Asphalt Paving at Competitive Prices",
    introP1: "— using professional construction crews to deliver prioritized service.",
    introP2Prefix: "From the Contractor team ",
    introP2Mid: ", we would like to offer and serve road construction, road repair, as well as asphalt works and asphalt production.",
    otherKicker: "Not just asphalt",
    contactP1: "For details, you can contact us via WhatsApp at ",
    contactEmail: "triabadimakmur@gmail.com",
    contactP2: " and also through Facebook and Instagram.",
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
    acc2Title: "Our Asphalt Paving Services",
    acc2Items: [
      "New hotmix asphalt paving",
      "Repair & patching of damaged asphalt",
      "Overlay / asphalt re-layering",
      "Cleaning & compaction of work area",
      "Finishing & final trim",
    ],
    priceKicker: "Price Packages",
    priceTitleLight: "Here we offer ",
    priceTitleBold: "asphalt repair service package prices",
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
    infoP1: "In determining the price, we will refer to what is specified by the builder and measure the road conditions ourselves. If you use a composition and work volume determined by you, we will carry out the work according to what has been determined on site.",
    infoP2: "Meanwhile, the paving work depends on the area and road conditions, and will also be calculated during the site survey. The price is influenced by quality. Whether it's roadside work or various road categories, we deliver affordable asphalt.",
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
    ctaWaMessage: "Hello Tri Abadi Makmur, I would like to consult about an project...",
  },
};

// ─────────────────────────────────────────────
// SUB-KOMPONEN: TAHAPAN CARD (memoized)
// ─────────────────────────────────────────────
const TahapanCard = memo(function TahapanCard({ item, t }) {
  return (
    <div className="relative" style={{ contain: "layout paint style" }}>
      <span className="absolute top-0 right-0 font-bold leading-none
                       text-[#1e88e5]/10 font-mono select-none"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2rem)" }}>
        {item.no}
      </span>
      <span className="relative w-9 h-9 rounded-lg bg-[#1e88e5]/10 text-[#1e88e5]
                       flex items-center justify-center mb-3">
        <item.Icon className="w-4 h-4" />
      </span>
      <h4
        className="font-semibold text-slate-900 mb-1.5 leading-snug"
        style={{ fontSize: "clamp(0.8125rem, 1.5vw, 0.84375rem)" }}
      >
        {t(item.title)}
      </h4>
      <p
        className="text-slate-500 leading-relaxed"
        style={{ fontSize: "clamp(0.71875rem, 1.4vw, 0.75rem)" }}
      >
        {t(item.desc)}
      </p>
    </div>
  );
});

// ─────────────────────────────────────────────
// SUB-KOMPONEN: KONTRUKSI LAIN CARD (memoized)
// ─────────────────────────────────────────────
const KontruksiCard = memo(function KontruksiCard({ item, t }) {
  return (
    <div className="flex items-start gap-3.5" style={{ contain: "layout paint style" }}>
      <span className="shrink-0 w-10 h-10 rounded-lg bg-[#1e88e5]/10 text-[#1e88e5]
                       flex items-center justify-center">
        <item.Icon className="w-5 h-5" />
      </span>
      <div className="min-w-0 flex-1">
        <div
          className="text-slate-900 font-semibold leading-snug"
          style={{ fontSize: "clamp(0.8125rem, 1.5vw, 0.84375rem)" }}
        >
          {t(item.label)}
        </div>
        <div
          className="text-slate-500 leading-snug mt-0.5"
          style={{ fontSize: "clamp(0.6875rem, 1.3vw, 0.71875rem)" }}
        >
          {t(item.desc)}
        </div>
      </div>
    </div>
  );
});

// ─────────────────────────────────────────────
// SUB-KOMPONEN: AREA ROW (memoized)
// ─────────────────────────────────────────────
const AreaRow = memo(function AreaRow({ area, data }) {
  return (
    <div style={{ contain: "layout paint style" }}>
      <div className="flex items-center gap-3 mb-4">
        <span className="w-4 h-px bg-[#1e88e5]" />
        <h3 className="text-[11.5px] sm:text-[12.5px] uppercase
                       tracking-[0.2em] sm:tracking-[0.22em]
                       text-[#1e88e5] font-bold">
          {area.region}
        </h3>
        <span className="flex-1 h-px bg-slate-200" />
      </div>

      <div className="space-y-3 pl-1">
        {area.kota && area.kota.length > 0 && (
          <div className="flex items-start gap-2.5 sm:gap-3">
            <span className="shrink-0 mt-[3px] text-[9.5px] sm:text-[10px] uppercase
                             tracking-wider font-bold text-slate-400 w-[50px] sm:w-[60px]">
              {data.areaCity}
            </span>
            <div className="flex flex-wrap gap-1.5 flex-1">
              {area.kota.map((k, i) => (
                <span key={i}
                  className="inline-block px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md
                             bg-[#1e88e5]/5 border border-[#1e88e5]/20
                             text-[10.5px] sm:text-[11px] text-[#1565c0] font-medium">
                  {k}
                </span>
              ))}
            </div>
          </div>
        )}

        {area.kabupaten && area.kabupaten.length > 0 && (
          <div className="flex items-start gap-2.5 sm:gap-3">
            <span className="shrink-0 mt-[3px] text-[9.5px] sm:text-[10px] uppercase
                             tracking-wider font-bold text-slate-400 w-[50px] sm:w-[60px]">
              {data.areaRegency}
            </span>
            <div className="flex flex-wrap gap-1.5 flex-1">
              {area.kabupaten.map((k, i) => (
                <span key={i}
                  className="inline-block px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md
                             bg-white border border-slate-200
                             text-[10.5px] sm:text-[11px] text-slate-600">
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
export default function Pengaspalan() {
  const { lang } = useLang();
  const data = content[lang] || content.id;

  const t = useCallback((field) => {
    if (!field) return "";
    if (typeof field === "string") return field;
    return field[lang] || field.id || field.en || "";
  }, [lang]);

  const [showArea, setShowArea] = useState(false);

  return (
    <div className="bg-white">

      {/* ═══════ HERO ═══════ */}
      <section className="pt-28 lg:pt-36 pb-16 lg:pb-24
                          bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-5 lg:px-8 text-center">
          <Reveal delay={0} y={20}>
            <div className="inline-flex items-center gap-2.5 sm:gap-3 mb-5">
              <span className="w-6 sm:w-10 h-px bg-[#1e88e5]" />
              <span className="text-[10px] sm:text-[11px] uppercase
                               tracking-[0.25em] sm:tracking-[0.3em]
                               text-[#1e88e5] font-semibold">
                {data.heroKicker}
              </span>
              <span className="w-6 sm:w-10 h-px bg-[#1e88e5]" />
            </div>
          </Reveal>

          <Reveal delay={80} y={30}>
            <h1
              className="font-light tracking-tight text-slate-900 leading-[1.05] mb-5"
              style={{ fontSize: "clamp(2rem, 6vw, 3.75rem)" }}
            >
              {data.heroTitle}<span className="text-[#1e88e5]">.</span>
            </h1>
          </Reveal>

          <Reveal delay={160} y={24}>
            <p
              className="text-slate-600 leading-relaxed max-w-2xl mx-auto"
              style={{ fontSize: "clamp(0.875rem, 1.6vw, 1rem)" }}
            >
              {data.heroDesc}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══════ KONTEN UTAMA ═══════ */}
      <section className="pb-16 lg:pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-5 lg:px-8">

          {/* Foto utama */}
          <Reveal y={40} duration={800}>
            <figure className="relative rounded-2xl overflow-hidden bg-slate-100 mb-8 ring-1 ring-slate-200"
                    style={{ contain: "layout paint style" }}>
              <div className="aspect-[16/10]">
                <img
                  src="/proyek/proyek-1.webp"
                  alt={data.figAlt}
                  loading="eager"
                  decoding="async"
                  width={1200}
                  height={750}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/proyek/proyek-1.webp";
                  }}
                />
              </div>
              <figcaption className="absolute bottom-0 inset-x-0
                                     bg-gradient-to-t from-slate-950/80 to-transparent
                                     px-4 sm:px-6 py-4 sm:py-5 pt-12 sm:pt-16">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-5 sm:w-6 h-px bg-[#4da3ff]" />
                  <span className="text-[9.5px] sm:text-[10px] uppercase
                                   tracking-[0.25em] sm:tracking-[0.28em]
                                   text-[#4da3ff] font-semibold">
                    {data.figKicker}
                  </span>
                </div>
                <p className="text-white font-medium"
                   style={{ fontSize: "clamp(0.78125rem, 1.5vw, 0.8125rem)" }}>
                  {data.figCaption}
                </p>
              </figcaption>
            </figure>
          </Reveal>

          {/* Paragraf pengantar */}
          <Reveal delay={100} y={24}>
            <div className="max-w-3xl mb-10">
              <p className="text-slate-700 leading-[1.85] mb-4"
                 style={{ fontSize: "clamp(0.875rem, 1.6vw, 0.90625rem)" }}>
                <span className="font-semibold text-slate-900">
                  {data.introTitle}
                </span>{" "}
                {data.introP1}
              </p>
              <p className="text-slate-700 leading-[1.85]"
                 style={{ fontSize: "clamp(0.875rem, 1.6vw, 0.90625rem)" }}>
                {data.introP2Prefix}
                <span className="font-medium text-slate-900">Tri Abadi Makmur</span>
                {data.introP2Mid}
              </p>
            </div>
          </Reveal>

          {/* Kartu kontruksi lain */}
          <div className="mb-12">
            <Reveal y={26}>
              <div className="flex items-center gap-2.5 sm:gap-3 mb-5">
                <span className="w-5 sm:w-6 h-px bg-[#1e88e5]" />
                <h3 className="text-[10px] sm:text-[11px] uppercase
                               tracking-[0.25em] sm:tracking-[0.28em]
                               text-slate-500 font-semibold">
                  {data.otherKicker}
                </h3>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
                            gap-x-6 gap-y-5">
              {kontruksiLain.map((item, i) => (
                <Reveal key={i} delay={i * 60} y={24}>
                  <KontruksiCard item={item} t={t} />
                </Reveal>
              ))}
            </div>
          </div>

          {/* Paragraf penutup atas accordion */}
          <Reveal delay={100} y={22}>
            <p className="text-slate-700 leading-[1.85] mb-6"
               style={{ fontSize: "clamp(0.875rem, 1.6vw, 0.90625rem)" }}>
              {data.contactP1}
              <span className="font-medium text-slate-900">{data.contactEmail}</span>
              {data.contactP2}
            </p>
          </Reveal>

          {/* Accordion atas */}
          <Reveal delay={150} y={24}>
            <Accordion title={data.acc1Title} defaultOpen={false}>
              <p className="mb-3">{data.acc1Intro}</p>
              <ul className="list-disc list-outside pl-5 space-y-1.5">
                {data.acc1Items.map((it, i) => <li key={i}>{it}</li>)}
              </ul>
            </Accordion>
          </Reveal>

          <Reveal delay={200} y={24}>
            <Accordion title={data.acc2Title} defaultOpen={false}>
              <ul className="list-disc list-outside pl-5 space-y-1.5">
                {data.acc2Items.map((it, i) => <li key={i}>{it}</li>)}
              </ul>
            </Accordion>
          </Reveal>
        </div>

        {/* ═══════ PAKET HARGA ═══════ */}
        <div className="mt-16 lg:mt-20 mb-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-5 lg:px-8">
            <Reveal y={26}>
              <div className="text-center mb-8">
                <SectionKicker>{data.priceKicker}</SectionKicker>
                <h2
                  className="font-light tracking-tight text-slate-900 leading-tight max-w-2xl mx-auto"
                  style={{ fontSize: "clamp(1.5rem, 3.5vw, 1.875rem)" }}
                >
                  {data.priceTitleLight}
                  <span className="font-semibold">{data.priceTitleBold}</span>
                </h2>
              </div>
            </Reveal>

            <Reveal y={34} delay={80}>
              <ServicePricingPanel hideCta />
            </Reveal>
          </div>
        </div>

        {/* Lanjut konten */}
        <div className="max-w-4xl mx-auto px-4 sm:px-5 lg:px-8">

          {/* SECTION: CARA PENGERJAAN */}
          <div className="mb-12 lg:mb-14">
            <Reveal y={26}>
              <div className="text-center mb-8">
                <SectionKicker>{data.methodKicker}</SectionKicker>
                <h2
                  className="font-light tracking-tight text-slate-900 leading-tight"
                  style={{ fontSize: "clamp(1.5rem, 3.5vw, 1.875rem)" }}
                >
                  {data.methodTitleLight}
                  <span className="font-semibold">{data.methodTitleBold}</span>
                </h2>
              </div>
            </Reveal>

            <Reveal delay={100} y={22}>
              <div className="max-w-3xl mx-auto text-center mb-8">
                <p className="text-slate-700 leading-[1.85]"
                   style={{ fontSize: "clamp(0.875rem, 1.6vw, 0.90625rem)" }}>
                  {data.methodDesc}
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
                            gap-x-6 gap-y-8 mb-12">
              {tahapanPengerjaan.map((tp, i) => (
                <Reveal key={i} delay={i * 80} y={24}>
                  <TahapanCard item={tp} t={t} />
                </Reveal>
              ))}
            </div>

            <Reveal delay={200} y={34}>
              <figure className="relative rounded-2xl overflow-hidden bg-slate-100 ring-1 ring-slate-200"
                      style={{ contain: "layout paint style" }}>
                <div className="aspect-[16/9]">
                  <img
                    src="/proyek/proyek-2.webp"
                    alt={data.figWorkAlt}
                    loading="lazy"
                    decoding="async"
                    width={1200}
                    height={675}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/proyek/proyek-2.webp";
                    }}
                  />
                </div>
                <figcaption className="absolute bottom-0 inset-x-0
                                       bg-gradient-to-t from-slate-950/80 to-transparent
                                       px-4 sm:px-6 py-4 sm:py-5 pt-12 sm:pt-16">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-5 sm:w-6 h-px bg-[#4da3ff]" />
                    <span className="text-[9.5px] sm:text-[10px] uppercase
                                     tracking-[0.25em] sm:tracking-[0.28em]
                                     text-[#4da3ff] font-semibold">
                      {data.figWorkKicker}
                    </span>
                  </div>
                  <p className="text-white font-medium"
                     style={{ fontSize: "clamp(0.78125rem, 1.5vw, 0.8125rem)" }}>
                    {data.figWorkCaption}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          </div>

          {/* SECTION: HARGA & BIAYA */}
          <div className="mb-12">
            <Reveal y={26}>
              <div className="text-center mb-8">
                <SectionKicker>{data.infoKicker}</SectionKicker>
                <h2
                  className="font-light tracking-tight text-slate-900 leading-tight"
                  style={{ fontSize: "clamp(1.5rem, 3.5vw, 1.875rem)" }}
                >
                  {data.infoTitleLight}
                  <span className="font-semibold">{data.infoTitleBold}</span>
                </h2>
              </div>
            </Reveal>

            <Reveal delay={100} y={22}>
              <div className="max-w-3xl mx-auto text-center">
                <p className="text-slate-700 leading-[1.85] mb-4"
                   style={{ fontSize: "clamp(0.875rem, 1.6vw, 0.90625rem)" }}>
                  {data.infoP1}
                </p>
                <p className="text-slate-700 leading-[1.85]"
                   style={{ fontSize: "clamp(0.875rem, 1.6vw, 0.90625rem)" }}>
                  {data.infoP2}
                </p>
              </div>
            </Reveal>
          </div>

          {/* ACCORDION BAWAH */}
          <Reveal y={24}>
            <Accordion title={data.acc3Title} defaultOpen={false}>
              <ul className="list-disc list-outside pl-5 space-y-1.5">
                {data.acc3Items.map((it, i) => <li key={i}>{it}</li>)}
              </ul>
            </Accordion>
          </Reveal>

          <Reveal delay={100} y={24}>
            <Accordion title={data.acc4Title} defaultOpen={false}>
              <p>{data.acc4Body}</p>
            </Accordion>
          </Reveal>

          {/* ═══════ AREA JANGKAUAN ═══════ */}
          <div className="mb-16">
            <Reveal y={26}>
              <div className="text-center mb-8">
                <SectionKicker>{data.areaKicker}</SectionKicker>
                <h2
                  className="font-light tracking-tight text-slate-900 leading-tight"
                  style={{ fontSize: "clamp(1.5rem, 3.5vw, 1.875rem)" }}
                >
                  {data.areaTitleLight}
                  <span className="font-semibold">{data.areaTitleBold}</span>
                </h2>
                <p className="text-slate-500 mt-3 max-w-xl mx-auto"
                   style={{ fontSize: "clamp(0.78125rem, 1.4vw, 0.8125rem)" }}>
                  {data.areaDesc}
                </p>
              </div>
            </Reveal>

            <Reveal y={30} delay={80}>
              <button
                type="button"
                onClick={() => setShowArea(!showArea)}
                aria-expanded={showArea}
                className="w-full flex items-center gap-3 sm:gap-4 text-left cursor-pointer
                           pb-5 border-b border-slate-200
                           transition-colors duration-150"
              >
                <span
                  className={`flex-1 font-bold uppercase
                              tracking-[0.18em] sm:tracking-[0.2em]
                              ${showArea ? "text-[#1e88e5]" : "text-slate-600"}`}
                  style={{ fontSize: "clamp(0.78125rem, 1.5vw, 0.8125rem)" }}
                >
                  {data.areaToggle}
                </span>
                <span
                  className={`shrink-0 px-2.5 sm:px-3.5 py-1.5 rounded-full border
                              font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em]
                              transition-colors duration-150
                              ${showArea
                                ? "bg-[#1e88e5] text-white border-[#1e88e5]"
                                : "bg-white text-slate-500 border-slate-300"}`}
                  style={{ fontSize: "clamp(0.5625rem, 1vw, 0.625rem)" }}
                >
                  {showArea
                    ? (lang === "en" ? "Close" : "Tutup")
                    : (lang === "en" ? "Open"  : "Buka")}
                </span>
              </button>

              {showArea && (
                <div className="mt-8 space-y-8">
                  {areaJangkauan.map((area, idx) => (
                    <Reveal key={idx} delay={idx * 40} y={16}>
                      <AreaRow area={area} data={data} />
                    </Reveal>
                  ))}
                </div>
              )}
            </Reveal>
          </div>

          {/* ═══════ CTA ═══════ */}
          <Reveal y={34}>
            <div className="mt-12 sm:mt-16 pb-12 sm:pb-16 text-center max-w-2xl mx-auto">
              <p className="text-[#1e88e5] text-[10px] uppercase tracking-[0.3em]
                            font-semibold mb-3">
                {data.ctaKicker}
              </p>
              <h3
                className="text-slate-900 font-light tracking-tight mb-5 sm:mb-6"
                style={{ fontSize: "clamp(1.125rem, 2.8vw, 1.5rem)" }}
              >
                {data.ctaTitleLight}
                <span className="font-semibold">{data.ctaTitleBold}</span>
              </h3>
              <a
                href={`https://wa.me/6282258089367?text=${encodeURIComponent(data.ctaWaMessage)}`}
                target="_blank"
                rel="noreferrer"
                aria-label={data.ctaBtn}
                className="inline-flex items-center justify-center gap-2
                           px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl
                           bg-slate-900 text-white hover:bg-[#1e88e5]
                           font-semibold uppercase
                           tracking-[0.12em] sm:tracking-[0.15em]
                           transition-colors duration-200"
                style={{ fontSize: "clamp(0.6875rem, 1.3vw, 0.75rem)" }}
              >
                <IconWhatsApp className="w-4 h-4 shrink-0" />
                {data.ctaBtn}
                <IconArrowRight className="w-3.5 h-3.5 shrink-0" />
              </a>
            </div>
          </Reveal>

        </div>
      </section>
    </div>
  );
}