// src/components/PasangGrassBlock.jsx
"use client";

import { useState, useEffect, useRef, useCallback, useMemo, memo } from "react";
import Image from "next/image";
import { useLang } from "../context/LanguageContext";
import GrassBlockPricingPanel from "./GrassBlockPricingPanel";

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
// REVEAL WRAPPER (memoized)
// ─────────────────────────────────────────────
const Reveal = memo(function Reveal({
  children,
  delay = 0,
  y = 28,
  x = 0,
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
      transform: visible ? "translate3d(0,0,0)" : `translate3d(${x}px, ${y}px, 0)`,
      willChange: visible ? "auto" : "opacity, transform",
      contain: "layout paint style",
    };
  }, [enabled, visible, duration, delay, x, y]);

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
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}
function IconArrowRight({ className = "w-3.5 h-3.5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
      strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}
function IconCheck({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6}
      strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}
function IconLeaf({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6" />
    </svg>
  );
}
function IconDroplet({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  );
}
function IconGrid({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </svg>
  );
}
function IconLayers({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  );
}
function IconRuler({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21.3 8.7l-9-9a1 1 0 0 0-1.4 0l-9 9a1 1 0 0 0 0 1.4l9 9a1 1 0 0 0 1.4 0l9-9a1 1 0 0 0 0-1.4z" />
      <path d="M7.5 10.5l2-2M10.5 13.5l2-2M13.5 16.5l2-2" />
    </svg>
  );
}
function IconSparkles({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
    </svg>
  );
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
        <div
          className="px-4 sm:px-5 pb-4 sm:pb-5 pt-1
                     text-slate-700 leading-[1.85]
                     border-t border-slate-100"
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
const keunggulanGrass = [
  {
    Icon: IconLeaf,
    title: { id: "Ramah Lingkungan", en: "Eco-Friendly" },
    desc: {
      id: "Grass block memungkinkan rumput tumbuh di sela-sela paving, membantu penyerapan air dan mengurangi panas permukaan.",
      en: "Grass block allows grass to grow between pavers, helping water absorption and reducing surface heat.",
    },
  },
  {
    Icon: IconDroplet,
    title: { id: "Drainase Alami", en: "Natural Drainage" },
    desc: {
      id: "Air hujan dapat meresap ke dalam tanah melalui celah grass block, mengurangi genangan dan membantu resapan air.",
      en: "Rainwater can seep into the ground through the gaps of grass blocks, reducing puddles and aiding water absorption.",
    },
  },
  {
    Icon: IconGrid,
    title: { id: "Kuat & Rapi", en: "Strong & Neat" },
    desc: {
      id: "Dipasang presisi dengan pola terkunci, menghasilkan permukaan yang rapi, kuat, dan tahan lama.",
      en: "Precisely installed with interlocking patterns, producing a neat, strong, and durable surface.",
    },
  },
  {
    Icon: IconCheck,
    title: { id: "Multifungsi", en: "Multifunctional" },
    desc: {
      id: "Cocok untuk area parkir, jalan lingkungan, taman, dan area publik yang membutuhkan estetika sekaligus fungsi.",
      en: "Suitable for parking areas, neighborhood roads, parks, and public areas requiring both aesthetics and function.",
    },
  },
];

const tahapanPemasangan = [
  {
    no: "01",
    Icon: IconLayers,
    title: { id: "Leveling & Perataan", en: "Leveling & Flattening" },
    desc: {
      id: "Meratakan permukaan yang akan dikerjakan dengan menggunakan alat wales/stamper agar dasar benar-benar rata.",
      en: "Leveling the surface to be worked on using a wales/stamper tool so the base is completely flat.",
    },
  },
  {
    no: "02",
    Icon: IconRuler,
    title: { id: "Pembersihan & Pengukuran", en: "Cleaning & Measuring" },
    desc: {
      id: "Sebelum proses pemasangan, dilakukan pembersihan dan pengukuran untuk menentukan titik-titik yang akan dipasang.",
      en: "Before installation, cleaning and measuring are carried out to determine the points to be installed.",
    },
  },
  {
    no: "03",
    Icon: IconGrid,
    title: { id: "Pemasangan Paving Block", en: "Paving Block Installation" },
    desc: {
      id: "Menggelar abu batu, memadatkan dengan mesin giling, kemudian memasang paving block sesuai pola yang diinginkan.",
      en: "Spreading stone dust, compacting with a roller, then installing paving blocks according to the desired pattern.",
    },
  },
  {
    no: "04",
    Icon: IconSparkles,
    title: { id: "Finishing & Pemadatan", en: "Finishing & Compaction" },
    desc: {
      id: "Menggunakan Baby Roller / wales mini untuk memastikan posisi block rapi. Celah antar paving diisi abu batu supaya tidak bergeser.",
      en: "Using a Baby Roller / mini wales to ensure blocks are neatly positioned. Gaps between pavers are filled with stone dust to prevent shifting.",
    },
  },
];

const areaUmum = [
  { id: "Jalan Perumahan", en: "Housing Roads" },
  { id: "Trotoar",         en: "Sidewalks" },
  { id: "Teras Rumah",     en: "Home Terraces" },
  { id: "Pusat Kota",      en: "City Centers" },
  { id: "Parkir Pabrik",   en: "Factory Parking" },
  { id: "Pelabuhan",       en: "Ports" },
  { id: "Taman",           en: "Parks" },
  { id: "Area Publik",     en: "Public Areas" },
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
      "Pangandaran", "Purwakarta", "Subang", "Sukabumi", "Sumedang",
      "Tasikmalaya", "Ciamis",
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
// KONTEN BILINGUAL
// ─────────────────────────────────────────────
const content = {
  id: {
    heroKicker: "Layanan Kami",
    heroTitle: "Pasang Grass Block",
    heroDesc: "Jasa pasang grass block untuk area parkir, jalan lingkungan, dan taman. Rapi, kuat, ramah lingkungan, dan hemat biaya.",
    figAlt: "Pasang Grass Block",
    figCaption: "Pemasangan Grass Block — Tri Abadi Makmur",
    introTitle: "Jasa Pasang Grass Block Jabodetabek",
    introBody: " — atau conblock adalah material bangunan yang dibuat dari campuran bahan material kasar seperti coran semen dan pasir yang dipress dengan tekanan tertentu dan dibuat dengan berbagai bentuk dan warna.",
    quote: "Grass block banyak digunakan sebagai infrastruktur karena keunggulan perawatan dan biaya yang relatif murah dibandingkan dengan bahan lain — sekaligus memberikan nilai estetika pada area terbuka.",
    aboutKicker: "Informasi",
    aboutTitleLight: "Tentang ",
    aboutTitleBold: "Grass Block",
    aboutP1: "Kontruksi Grass Block / Conblock juga merupakan metode hisa yang umum digunakan untuk pembangunan jalan maupun infrastruktur lainnya.",
    aboutP2: "Grass block / Conblock banyak sekali digunakan sebagai infrastruktur karena keunggulan perawatan dan juga jika mengingat biaya yang relatif murah dibandingkan dengan bahan lain.",
    aboutP3: "Tapi dilihat dari fungsi, grass block memang digunakan sebagai infrastruktur taman. Seperti yang kita ketahui, grass block dipasang di area terbuka, dan dipakai untuk melapisi permukaan tanah yang akan ditanami rumput atau paving.",
    usedKicker: "Biasa Digunakan Di",
    stepKicker: "Tahapan Pemasangan",
    priceKicker: "Paket Harga",
    priceTitleLight: "Jasa Pasang ",
    priceTitleBold: "Grass Block Jabodetabek",
    priceDesc: "Spesifikasi harga jasa pasang grass block & paving block.",
    areaKicker: "Layanan",
    areaTitleLight: "Area ",
    areaTitleBold: "Jangkauan Kami",
    areaDesc: "Melayani jasa pasang grass block di berbagai kota & kabupaten berikut.",
    areaToggle: "Lihat Daftar Kota & Kabupaten",
    areaCity: "Kota",
    areaRegency: "Kab.",
    ctaKicker: "Konsultasi Gratis",
    ctaTitleLight: "Butuh jasa pasang grass block? ",
    ctaTitleBold: "Kami siap membantu.",
    ctaBtn: "Hubungi via WhatsApp",
    ctaWaMessage: "Halo Tri Abadi Makmur, saya ingin konsultasi mengenai Project...",
  },
  en: {
    heroKicker: "Our Services",
    heroTitle: "Grass Block Installation",
    heroDesc: "Grass block installation services for parking areas, neighborhood roads, and parks. Neat, strong, eco-friendly, and cost-effective.",
    figAlt: "Grass Block Installation",
    figCaption: "Grass Block Installation — Tri Abadi Makmur",
    introTitle: "Grass Block Installation Services in Jabodetabek",
    introBody: " — or conblock is a building material made from a mixture of coarse materials such as cement casting and sand, pressed under specific pressure and made in various shapes and colors.",
    quote: "Grass block is widely used as infrastructure due to its easy maintenance and relatively low cost compared to other materials — while also adding aesthetic value to open areas.",
    aboutKicker: "Information",
    aboutTitleLight: "About ",
    aboutTitleBold: "Grass Block",
    aboutP1: "Grass Block / Conblock construction is also a common method used for road construction and other infrastructure.",
    aboutP2: "Grass block / Conblock is widely used as infrastructure because of its easy maintenance and relatively low cost compared to other materials.",
    aboutP3: "But in terms of function, grass block is indeed used as garden infrastructure. As we know, grass block is installed in open areas, and is used to cover ground surfaces that will be planted with grass or paving.",
    usedKicker: "Commonly Used In",
    stepKicker: "Installation Stages",
    priceKicker: "Price Packages",
    priceTitleLight: "Grass Block Installation ",
    priceTitleBold: "Services in Jabodetabek",
    priceDesc: "Price specifications for grass block & paving block installation services.",
    areaKicker: "Services",
    areaTitleLight: "Our ",
    areaTitleBold: "Coverage Area",
    areaDesc: "Serving grass block installation services in the following cities & regencies.",
    areaToggle: "View City & Regency List",
    areaCity: "City",
    areaRegency: "Regency",
    ctaKicker: "Free Consultation",
    ctaTitleLight: "Need grass block installation? ",
    ctaTitleBold: "We are ready to help.",
    ctaBtn: "Contact via WhatsApp",
    ctaWaMessage: "Hello Tri Abadi Makmur, I would like to consult about an project...",
  },
};

// ─────────────────────────────────────────────
// SUB-KOMPONEN: KEUNGGULAN CARD (memoized)
// ─────────────────────────────────────────────
const KeunggulanCard = memo(function KeunggulanCard({ item, t }) {
  const { Icon, title, desc } = item;
  return (
    <div
      className="flex items-start gap-3 sm:gap-3.5"
      style={{ contain: "layout paint style" }}
    >
      <span className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-lg
                       bg-[#1e88e5]/10 text-[#1e88e5]
                       flex items-center justify-center">
        <Icon className="w-4 h-4" />
      </span>
      <div className="min-w-0">
        <div
          className="text-slate-900 font-semibold leading-snug"
          style={{ fontSize: "clamp(0.78125rem, 1.4vw, 0.84375rem)" }}
        >
          {t(title)}
        </div>
        <div
          className="text-slate-500 leading-snug mt-1"
          style={{ fontSize: "clamp(0.71875rem, 1.3vw, 0.75rem)" }}
        >
          {t(desc)}
        </div>
      </div>
    </div>
  );
});

// ─────────────────────────────────────────────
// SUB-KOMPONEN: AREA UMUM CHIP (memoized)
// ─────────────────────────────────────────────
const AreaUmumChip = memo(function AreaUmumChip({ item, t }) {
  return (
    <div className="flex items-center gap-2" style={{ contain: "layout paint style" }}>
      <span className="w-1.5 h-1.5 rounded-full bg-[#1e88e5] shrink-0" />
      <span
        className="text-slate-700 font-medium"
        style={{ fontSize: "clamp(0.75rem, 1.4vw, 0.8125rem)" }}
      >
        {t(item)}
      </span>
    </div>
  );
});

// ─────────────────────────────────────────────
// SUB-KOMPONEN: STEP ITEM (memoized)
// ─────────────────────────────────────────────
const StepItem = memo(function StepItem({ step, t, isLast }) {
  const { Icon } = step;
  return (
    <div
      className="relative flex gap-3 sm:gap-4"
      style={{ contain: "layout paint style" }}
    >
      {!isLast && (
        <span className="absolute left-4 top-9 bottom-[-24px] w-px bg-slate-200" />
      )}

      <div className="relative shrink-0">
        <div className="w-8 h-8 rounded-full flex items-center justify-center
                        bg-[#1e88e5]/10 text-[#1e88e5]">
          <Icon className="w-3.5 h-3.5" />
        </div>
      </div>

      <div className="min-w-0 pb-1">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <span className="text-[10px] font-bold font-mono text-slate-400">
            {step.no}
          </span>
          <h4
            className="font-semibold text-slate-900"
            style={{ fontSize: "clamp(0.78125rem, 1.4vw, 0.84375rem)" }}
          >
            {t(step.title)}
          </h4>
        </div>
        <p
          className="text-slate-600 leading-relaxed"
          style={{ fontSize: "clamp(0.75rem, 1.3vw, 0.78125rem)" }}
        >
          {t(step.desc)}
        </p>
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
// HALAMAN: PASANG GRASS BLOCK
// ─────────────────────────────────────────────
export default function PasangGrassBlock() {
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
            <figure className="relative rounded-2xl overflow-hidden bg-slate-100 mb-10
                              ring-1 ring-slate-200 aspect-[16/10]"
                    style={{ contain: "layout paint style" }}>
              <Image
                src="/proyek/proyek-38.webp"
                alt={data.figAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 896px"
                className="object-cover"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/proyek/proyek-38.webp";
                }}
              />
              <figcaption className="absolute bottom-0 inset-x-0 z-10
                                     bg-gradient-to-t from-slate-950/70 to-transparent
                                     px-4 sm:px-6 py-3 sm:py-4 pt-10 sm:pt-12">
                <p className="text-white font-medium"
                   style={{ fontSize: "clamp(0.75rem, 1.4vw, 0.78125rem)" }}>
                  {data.figCaption}
                </p>
              </figcaption>
            </figure>
          </Reveal>

          {/* Pengantar */}
          <Reveal delay={100} y={24}>
            <p
              className="text-slate-700 leading-[1.9] mb-6 max-w-3xl"
              style={{ fontSize: "clamp(0.875rem, 1.6vw, 0.90625rem)" }}
            >
              <span className="font-semibold text-slate-900">{data.introTitle}</span>
              {data.introBody}
            </p>
          </Reveal>

          {/* Quote */}
          <Reveal delay={150} y={22}>
            <div className="max-w-3xl mx-auto text-center mb-12">
              <p
                className="text-slate-700 leading-[1.9] italic"
                style={{ fontSize: "clamp(0.875rem, 1.6vw, 0.90625rem)" }}
              >
                {data.quote}
              </p>
            </div>
          </Reveal>

          {/* ═══════ TENTANG GRASS BLOCK ═══════ */}
          <div className="mb-12">
            <Reveal y={26}>
              <div className="text-center mb-8">
                <SectionKicker>{data.aboutKicker}</SectionKicker>
                <h2
                  className="font-light tracking-tight text-slate-900 leading-tight"
                  style={{ fontSize: "clamp(1.5rem, 3.5vw, 1.875rem)" }}
                >
                  {data.aboutTitleLight}
                  <span className="font-semibold">{data.aboutTitleBold}</span>
                </h2>
              </div>
            </Reveal>

            <Reveal delay={100} y={22}>
              <div className="max-w-3xl mx-auto text-center mb-10">
                <p
                  className="text-slate-700 leading-[1.9] mb-4"
                  style={{ fontSize: "clamp(0.875rem, 1.6vw, 0.90625rem)" }}
                >
                  {data.aboutP1}
                </p>
                <p
                  className="text-slate-700 leading-[1.9] mb-4"
                  style={{ fontSize: "clamp(0.875rem, 1.6vw, 0.90625rem)" }}
                >
                  {data.aboutP2}
                </p>
                <p
                  className="text-slate-700 leading-[1.9]"
                  style={{ fontSize: "clamp(0.875rem, 1.6vw, 0.90625rem)" }}
                >
                  {data.aboutP3}
                </p>
              </div>
            </Reveal>

            {/* Kartu keunggulan */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5 mb-12">
              {keunggulanGrass.map((item, i) => (
                <Reveal key={i} delay={i * 100} y={24}>
                  <KeunggulanCard item={item} t={t} />
                </Reveal>
              ))}
            </div>

            {/* Biasa digunakan di */}
            <Reveal y={30}>
              <div className="mb-12">
                <div className="flex items-center gap-2 mb-5">
                  <span className="w-6 h-px bg-[#1e88e5]" />
                  <h3 className="text-[10.5px] sm:text-[11px] uppercase
                                 tracking-[0.25em] text-slate-500 font-semibold">
                    {data.usedKicker}
                  </h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-3">
                  {areaUmum.map((area, i) => (
                    <Reveal key={i} delay={i * 50} y={16}>
                      <AreaUmumChip item={area} t={t} />
                    </Reveal>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Tahapan pemasangan */}
            <Reveal y={30}>
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <span className="w-6 h-px bg-[#1e88e5]" />
                  <h3 className="text-[10.5px] sm:text-[11px] uppercase
                                 tracking-[0.25em] text-slate-500 font-semibold">
                    {data.stepKicker}
                  </h3>
                </div>

                <div className="space-y-6">
                  {tahapanPemasangan.map((tp, i) => (
                    <Reveal key={i} delay={i * 100} x={-20} y={0}>
                      <StepItem
                        step={tp}
                        t={t}
                        isLast={i === tahapanPemasangan.length - 1}
                      />
                    </Reveal>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ═══════ PANEL HARGA ═══════ */}
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
                <p
                  className="text-slate-500 mt-3 max-w-xl mx-auto"
                  style={{ fontSize: "clamp(0.78125rem, 1.4vw, 0.8125rem)" }}
                >
                  {data.priceDesc}
                </p>
              </div>
            </Reveal>

            <Reveal y={34} delay={80}>
              <GrassBlockPricingPanel hideCta />
            </Reveal>
          </div>
        </div>

        {/* Lanjut konten */}
        <div className="max-w-4xl mx-auto px-4 sm:px-5 lg:px-8">

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
                <p
                  className="text-slate-500 mt-3 max-w-xl mx-auto"
                  style={{ fontSize: "clamp(0.78125rem, 1.4vw, 0.8125rem)" }}
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
                aria-label={data.areaToggle}
                className="w-full flex items-center gap-4 text-left cursor-pointer
                           pb-5 border-b border-slate-200
                           transition-colors duration-200"
              >
                <span
                  className={`flex-1 font-bold uppercase tracking-[0.2em]
                              ${showArea ? "text-[#1e88e5]" : "text-slate-600"}`}
                  style={{ fontSize: "clamp(0.78125rem, 1.4vw, 0.8125rem)" }}
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
                    <Reveal key={idx} delay={idx * 80} y={16}>
                      <AreaRow area={area} data={data} />
                    </Reveal>
                  ))}
                </div>
              )}
            </Reveal>
          </div>

          {/* ═══════ CTA ═══════ */}
          <Reveal y={34}>
            <div className="mt-16 pb-16 text-center max-w-2xl mx-auto">
              <p
                className="text-[#1e88e5] uppercase tracking-[0.3em] font-semibold mb-3"
                style={{ fontSize: "clamp(0.5625rem, 1vw, 0.625rem)" }}
              >
                {data.ctaKicker}
              </p>
              <h3
                className="text-slate-900 font-light tracking-tight mb-6"
                style={{ fontSize: "clamp(1.25rem, 3vw, 1.5rem)" }}
              >
                {data.ctaTitleLight}
                <span className="font-semibold">{data.ctaTitleBold}</span>
              </h3>

              <a
                href={`https://wa.me/6282258089367?text=${encodeURIComponent(data.ctaWaMessage)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2
                           px-6 sm:px-7 py-3.5 rounded-xl
                           bg-slate-900 text-white
                           hover:bg-[#1e88e5]
                           font-semibold uppercase tracking-[0.15em]
                           transition-colors duration-300"
                style={{ fontSize: "clamp(0.6875rem, 1.2vw, 0.75rem)" }}
              >
                <IconWhatsApp className="w-4 h-4" />
                {data.ctaBtn}
                <IconArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </Reveal>

        </div>
      </section>
    </div>
  );
}