// src/components/PasangTiangPancang.jsx
"use client";

import { useState, useEffect, useRef, useCallback, useMemo, memo } from "react";
import { useLang } from "../context/LanguageContext";
import TiangPancangPricingPanel from "./TiangPancangPricingPanel";

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
function IconCheck({ className = "w-4 h-4" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 6L9 17l-5-5" /></svg>);
}
function IconShield({ className = "w-4 h-4" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>);
}
function IconHammer({ className = "w-4 h-4" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 12l-8.5 8.5a2.12 2.12 0 1 1-3-3L12 9" /><path d="M17.64 15L22 10.64" /><path d="M20.91 11.7l-1.25-1.25c-.6-.6-.93-1.4-.93-2.25v-.86L16.01 4.6a5.56 5.56 0 0 0-3.94-1.64H9l.92.82A6.18 6.18 0 0 1 12 8.4v1.56l2 2h2.47l2.26 1.91" /></svg>);
}
function IconLayers({ className = "w-4 h-4" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5M2 12l10 5 10-5" /></svg>);
}
function IconRuler({ className = "w-4 h-4" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21.3 8.7l-9-9a1 1 0 0 0-1.4 0l-9 9a1 1 0 0 0 0 1.4l9 9a1 1 0 0 0 1.4 0l9-9a1 1 0 0 0 0-1.4z" /><path d="M7.5 10.5l2-2M10.5 13.5l2-2M13.5 16.5l2-2" /></svg>);
}
function IconSparkles({ className = "w-4 h-4" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" /></svg>);
}
function IconBuilding({ className = "w-4 h-4" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="4" y="2" width="16" height="20" rx="1" /><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01" /></svg>);
}
function IconFactory({ className = "w-4 h-4" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 20h20M4 20V10l5 3V10l5 3V10l5 3v7" /><path d="M4 10V4h2v6" /></svg>);
}
function IconBridge({ className = "w-4 h-4" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 18h20M4 18V8M20 18V8M2 12c6-8 18-8 20 0" /></svg>);
}
function IconAnchor({ className = "w-4 h-4" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="5" r="3" /><path d="M12 22V8M5 12H2a10 10 0 0 0 20 0h-3" /></svg>);
}
function IconTower({ className = "w-4 h-4" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 2v6M12 22v-6M8 4l8 0M8 20l8 0" /><path d="M6 8l12 8M6 16L18 8" /></svg>);
}
function IconHome({ className = "w-4 h-4" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><path d="M9 22V12h6v10" /></svg>);
}

// ─────────────────────────────────────────────
// DATA BILINGUAL
// ─────────────────────────────────────────────
const keunggulanPancang = [
  {
    Icon: IconShield,
    title: { id: "Pondasi Kokoh", en: "Sturdy Foundation" },
    desc: {
      id: "Tiang pancang memberikan daya dukung tinggi sehingga bangunan lebih stabil dan aman dari penurunan tanah.",
      en: "Piles provide high bearing capacity so buildings are more stable and safe from soil settlement.",
    },
  },
  {
    Icon: IconHammer,
    title: { id: "Pemasangan Presisi", en: "Precise Installation" },
    desc: {
      id: "Dipancang dengan alat berat sesuai titik yang telah diukur, memastikan posisi presisi dan hasil yang seragam.",
      en: "Driven with heavy equipment at pre-measured points, ensuring precise positioning and uniform results.",
    },
  },
  {
    Icon: IconLayers,
    title: { id: "Cocok Tanah Lunak", en: "Ideal for Soft Soil" },
    desc: {
      id: "Sangat ideal untuk kondisi tanah lunak, rawa, atau bekas area tambak yang tidak bisa menggunakan pondasi dangkal.",
      en: "Ideal for soft soil, swamps, or former pond areas where shallow foundations cannot be used.",
    },
  },
  {
    Icon: IconCheck,
    title: { id: "Tahan Lama", en: "Long-Lasting" },
    desc: {
      id: "Material beton precast bertulang, tahan terhadap tekanan, kelembaban, dan cuaca ekstrem.",
      en: "Reinforced precast concrete material, resistant to pressure, moisture, and extreme weather.",
    },
  },
];

const fungsiPancang = [
  { Icon: IconBuilding, label: { id: "Pondasi bangunan bertingkat (ruko, kantor, apartemen)", en: "Foundations for multi-storey buildings (shop-houses, offices, apartments)" } },
  { Icon: IconFactory,  label: { id: "Pondasi gudang & pabrik dengan beban berat",              en: "Foundations for warehouses & factories with heavy loads" } },
  { Icon: IconBridge,   label: { id: "Pondasi jembatan & infrastruktur jalan",                   en: "Foundations for bridges & road infrastructure" } },
  { Icon: IconAnchor,   label: { id: "Pondasi dermaga & area pinggir pantai",                    en: "Foundations for piers & coastal areas" } },
  { Icon: IconTower,    label: { id: "Pondasi menara & tiang listrik tegangan tinggi",           en: "Foundations for towers & high-voltage electricity poles" } },
  { Icon: IconHome,     label: { id: "Pondasi rumah pada tanah lunak / bekas sawah",             en: "House foundations on soft soil / former rice fields" } },
];

const tahapanPemasangan = [
  {
    no: "01",
    Icon: IconRuler,
    title: { id: "Survey & Pengukuran Titik", en: "Survey & Point Measurement" },
    desc: {
      id: "Menentukan titik-titik pancang berdasarkan gambar struktur, menggunakan alat ukur presisi (total station / waterpass).",
      en: "Determining pile points based on structural drawings, using precision measuring tools (total station / water level).",
    },
  },
  {
    no: "02",
    Icon: IconLayers,
    title: { id: "Persiapan Alat & Material", en: "Equipment & Material Preparation" },
    desc: {
      id: "Mobilisasi alat pancang (drop hammer / hydraulic static pile driver) dan pengaturan tiang pancang di lokasi.",
      en: "Mobilization of piling equipment (drop hammer / hydraulic static pile driver) and arranging piles on site.",
    },
  },
  {
    no: "03",
    Icon: IconHammer,
    title: { id: "Pemancangan Tiang", en: "Pile Driving" },
    desc: {
      id: "Tiang dipancang satu per satu sesuai titik. Kedalaman dan kekuatan pemancangan dicatat untuk memastikan daya dukung.",
      en: "Piles are driven one by one at each point. Depth and driving resistance are recorded to ensure bearing capacity.",
    },
  },
  {
    no: "04",
    Icon: IconSparkles,
    title: { id: "Pemotongan & Finishing", en: "Cutting & Finishing" },
    desc: {
      id: "Kepala tiang dipotong sesuai elevasi rencana, dibersihkan, dan siap disambung dengan struktur pondasi selanjutnya.",
      en: "Pile heads are cut to the design elevation, cleaned, and ready to be connected to the next foundation structure.",
    },
  },
];

const areaJangkauan = [
  { region: "DKI Jakarta",
    kota: ["Jakarta Barat", "Jakarta Utara", "Jakarta Pusat", "Jakarta Timur", "Jakarta Selatan"],
    kabupaten: ["Kepulauan Seribu"] },
  { region: "Jawa Barat",
    kota: ["Bandung", "Bekasi", "Bogor", "Depok", "Cimahi", "Sukabumi", "Tasikmalaya", "Banjar", "Cirebon"],
    kabupaten: ["Bandung", "Bandung Barat", "Bekasi", "Bogor", "Cianjur", "Cirebon", "Garut", "Indramayu", "Karawang", "Kuningan", "Majalengka", "Pangandaran", "Purwakarta", "Subang", "Sukabumi", "Sumedang", "Tasikmalaya", "Ciamis"] },
  { region: "Banten",
    kota: ["Serang", "Tangerang", "Tangerang Selatan", "Cilegon"],
    kabupaten: ["Lebak", "Pandeglang", "Serang", "Tangerang"] },
  { region: "Jawa Tengah",
    kota: ["Semarang", "Pekalongan", "Tegal", "Magelang", "Salatiga", "Surakarta (Solo)"],
    kabupaten: ["Banjarnegara", "Banyumas", "Batang", "Blora", "Boyolali", "Brebes", "Cilacap", "Demak", "Grobogan", "Jepara", "Karanganyar", "Kebumen", "Kendal", "Klaten", "Kudus", "Magelang", "Pati", "Pekalongan", "Pemalang", "Purbalingga", "Purworejo", "Rembang", "Semarang", "Sragen", "Sukoharjo", "Tegal", "Temanggung", "Wonogiri", "Wonosobo"] },
  { region: "DI Yogyakarta",
    kota: ["Yogyakarta"],
    kabupaten: ["Bantul", "Gunungkidul", "Kulon Progo", "Sleman"] },
  { region: "Jawa Timur",
    kota: ["Surabaya", "Malang", "Madiun", "Kediri", "Blitar", "Banyuwangi", "Probolinggo", "Pasuruan", "Mojokerto", "Batu"],
    kabupaten: ["Bangkalan", "Banyuwangi", "Blitar", "Bojonegoro", "Bondowoso", "Gresik", "Jember", "Jombang", "Kediri", "Lamongan", "Madiun", "Lumajang", "Magetan", "Pacitan", "Malang", "Mojokerto", "Nganjuk", "Ngawi", "Pamekasan", "Pasuruan", "Ponorogo", "Probolinggo", "Sampang", "Sidoarjo", "Situbondo", "Sumenep", "Trenggalek", "Tuban", "Tulungagung"] },
  { region: "Bangka Belitung",
    kota: ["Pangkal Pinang"],
    kabupaten: ["Bangka", "Bangka Barat", "Bangka Selatan", "Bangka Tengah", "Belitung", "Belitung Timur"] },
  { region: "Bali",
    kota: ["Denpasar"],
    kabupaten: ["Badung", "Bangli", "Buleleng", "Gianyar", "Jembrana", "Karangasem", "Klungkung", "Tabanan"] },
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
    heroTitle: "Pasang Tiang Pancang",
    heroDesc: "Jasa pasang tiang pancang untuk pondasi bangunan bertingkat, pabrik, dan infrastruktur. Kokoh, presisi, dan cocok untuk tanah lunak.",
    figKicker: "Proyek",
    figCaption: "Pemasangan Tiang Pancang — Tri Abadi Makmur",
    figAlt: "Pasang Tiang Pancang",
    introTitle: "Jasa Pasang Tiang Pancang Beton Precast",
    introBody: " — tiang pancang adalah elemen struktur yang ditanam ke dalam tanah untuk meneruskan beban bangunan ke lapisan tanah yang lebih keras. Cocok untuk pondasi bangunan bertingkat, pabrik, dan infrastruktur di lahan yang memiliki karakter tanah lunak.",
    quote: "Pada kondisi tanah lunak atau bekas area tambak, pondasi dangkal tidak bisa diandalkan. Tiang pancang memberikan solusi daya dukung tinggi dengan pemasangan yang presisi dan terukur.",
    aboutKicker: "Informasi",
    aboutTitleLight: "Tentang ",
    aboutTitleBold: "Tiang Pancang",
    aboutP1: "Tiang pancang adalah elemen struktural beton bertulang yang dipancang ke dalam tanah untuk menyalurkan beban bangunan ke lapisan tanah yang lebih keras dan stabil di bawahnya.",
    aboutP2: "Umumnya diproduksi di pabrik dalam bentuk precast, sehingga mutu dan dimensinya sudah terstandar. Pemancangan dilakukan dengan alat berat khusus — drop hammer atau hydraulic static pile driver.",
    aboutP3: "Cocok digunakan untuk berbagai jenis proyek, mulai dari rumah tinggal di tanah lunak, ruko, bangunan bertingkat, hingga infrastruktur jalan dan jembatan.",
    fungsiKicker: "Fungsi Umum Tiang Pancang",
    stepKicker: "Tahapan Pemasangan",
    priceKicker: "Paket Harga",
    priceTitleLight: "Jasa Pasang ",
    priceTitleBold: "Tiang Pancang",
    priceDesc: "Spesifikasi harga jasa pasang tiang pancang beton precast.",
    areaKicker: "Layanan",
    areaTitleLight: "Area ",
    areaTitleBold: "Jangkauan Kami",
    areaDesc: "Melayani jasa pasang tiang pancang di berbagai kota & kabupaten berikut.",
    areaToggle: "Lihat Daftar Kota & Kabupaten",
    areaCity: "Kota",
    areaRegency: "Kab.",
    ctaKicker: "Konsultasi Gratis",
    ctaTitleLight: "Butuh jasa pasang tiang pancang? ",
    ctaTitleBold: "Kami siap membantu.",
    ctaBtn: "Hubungi via WhatsApp",
    ctaWaMessage: "Halo Tri Abadi Makmur, saya ingin konsultasi mengenai Project...",
  },
  en: {
    heroKicker: "Our Services",
    heroTitle: "Pile Driving Installation",
    heroDesc: "Pile driving installation services for multi-storey building foundations, factories, and infrastructure. Sturdy, precise, and ideal for soft soil.",
    figKicker: "Project",
    figCaption: "Pile Driving Installation — Tri Abadi Makmur",
    figAlt: "Pile Driving Installation",
    introTitle: "Precast Concrete Pile Installation Services",
    introBody: " — piles are structural elements driven into the ground to transfer building loads to harder soil layers. Ideal for foundations of multi-storey buildings, factories, and infrastructure on soft soil.",
    quote: "In soft soil conditions or former pond areas, shallow foundations cannot be relied upon. Piles provide a high-bearing-capacity solution with precise and measurable installation.",
    aboutKicker: "Information",
    aboutTitleLight: "About ",
    aboutTitleBold: "Piles",
    aboutP1: "Piles are reinforced concrete structural elements driven into the ground to transfer building loads to harder and more stable soil layers beneath.",
    aboutP2: "They are generally factory-produced in precast form, so their quality and dimensions are standardized. Driving is carried out with special heavy equipment — drop hammer or hydraulic static pile driver.",
    aboutP3: "Suitable for various types of projects, from houses on soft soil, shop-houses, multi-storey buildings, to road and bridge infrastructure.",
    fungsiKicker: "Common Functions of Piles",
    stepKicker: "Installation Stages",
    priceKicker: "Price Packages",
    priceTitleLight: "Pile Driving ",
    priceTitleBold: "Installation Services",
    priceDesc: "Price specifications for precast concrete pile installation services.",
    areaKicker: "Services",
    areaTitleLight: "Our ",
    areaTitleBold: "Coverage Area",
    areaDesc: "Serving pile driving installation services in the following cities & regencies.",
    areaToggle: "View City & Regency List",
    areaCity: "City",
    areaRegency: "Regency",
    ctaKicker: "Free Consultation",
    ctaTitleLight: "Need pile driving installation? ",
    ctaTitleBold: "We are ready to help.",
    ctaBtn: "Contact via WhatsApp",
    ctaWaMessage: "Hello Tri Abadi Makmur, I would like to consult about an project...",
  },
};

// ─────────────────────────────────────────────
// SUB-KOMPONEN: KEUNGGULAN CARD (memoized)
// ─────────────────────────────────────────────
const KeunggulanCard = memo(function KeunggulanCard({ item, t }) {
  return (
    <div className="flex items-start gap-3.5" style={{ contain: "layout paint style" }}>
      <span className="shrink-0 w-10 h-10 rounded-lg bg-[#1e88e5]/10 text-[#1e88e5]
                       flex items-center justify-center">
        <item.Icon className="w-4 h-4" />
      </span>
      <div className="min-w-0">
        <div
          className="text-slate-900 font-semibold leading-snug"
          style={{ fontSize: "clamp(0.8125rem, 1.5vw, 0.84375rem)" }}
        >
          {t(item.title)}
        </div>
        <div
          className="text-slate-500 leading-snug mt-1"
          style={{ fontSize: "clamp(0.71875rem, 1.4vw, 0.75rem)" }}
        >
          {t(item.desc)}
        </div>
      </div>
    </div>
  );
});

// ─────────────────────────────────────────────
// SUB-KOMPONEN: FUNGSI ITEM (memoized)
// ─────────────────────────────────────────────
const FungsiItem = memo(function FungsiItem({ item, t }) {
  return (
    <div className="flex items-start gap-2.5" style={{ contain: "layout paint style" }}>
      <span className="shrink-0 mt-0.5 w-7 h-7 rounded-md
                       bg-[#1e88e5]/10 text-[#1e88e5]
                       flex items-center justify-center">
        <item.Icon className="w-3.5 h-3.5" />
      </span>
      <span
        className="text-slate-700 leading-snug pt-1"
        style={{ fontSize: "clamp(0.78125rem, 1.4vw, 0.8125rem)" }}
      >
        {t(item.label)}
      </span>
    </div>
  );
});

// ─────────────────────────────────────────────
// SUB-KOMPONEN: TAHAPAN ROW (memoized)
// ─────────────────────────────────────────────
const TahapanRow = memo(function TahapanRow({ item, index, total, t }) {
  const isLast = index === total - 1;
  return (
    <div className="relative flex gap-4" style={{ contain: "layout paint style" }}>
      {!isLast && (
        <span className="absolute left-4 top-10 bottom-[-24px] w-px bg-slate-200" />
      )}
      <div className="relative shrink-0">
        <div className="w-8 h-8 rounded-full flex items-center justify-center
                        bg-[#1e88e5]/10 text-[#1e88e5]">
          <item.Icon className="w-3.5 h-3.5" />
        </div>
      </div>
      <div className="min-w-0 pb-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-bold font-mono text-slate-400">
            {item.no}
          </span>
          <h4
            className="font-semibold text-slate-900"
            style={{ fontSize: "clamp(0.8125rem, 1.5vw, 0.84375rem)" }}
          >
            {t(item.title)}
          </h4>
        </div>
        <p
          className="text-slate-600 leading-relaxed"
          style={{ fontSize: "clamp(0.75rem, 1.4vw, 0.78125rem)" }}
        >
          {t(item.desc)}
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
// HALAMAN
// ─────────────────────────────────────────────
export default function PasangTiangPancang() {
  const { lang } = useLang();
  const data = content[lang] || content.id;

  const t = useCallback((field) => {
    if (!field) return "";
    if (typeof field === "string") return field;
    return field[lang] || field.id || field.en || "";
  }, [lang]);

  const [showArea, setShowArea] = useState(false);

  return (
    <div className="bg-white overflow-x-clip">

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
            <figure className="relative rounded-3xl overflow-hidden bg-slate-100 mb-8
                              ring-1 ring-slate-200"
                    style={{ contain: "layout paint style" }}>
              <div className="aspect-[16/10]">
                <img
                  src="/proyek/proyek-42.webp"
                  alt={data.figAlt}
                  loading="eager"
                  decoding="async"
                  width={1200}
                  height={750}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/proyek/proyek-42.webp";
                  }}
                />
              </div>

              <figcaption className="absolute bottom-0 inset-x-0
                                     bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent
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

          {/* Pengantar */}
          <Reveal y={24}>
            <p className="text-slate-700 leading-[1.9] mb-6 max-w-3xl"
               style={{ fontSize: "clamp(0.875rem, 1.6vw, 0.90625rem)" }}>
              <span className="font-semibold text-slate-900">{data.introTitle}</span>
              {data.introBody}
            </p>
          </Reveal>

          {/* Quote */}
          <Reveal delay={80} y={22}>
            <div className="relative max-w-3xl mx-auto text-center mb-10">
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 leading-none
                               text-[#1e88e5]/15 font-serif select-none"
                    style={{ fontSize: "clamp(3rem, 8vw, 4rem)" }}>
                "
              </span>
              <p className="relative text-slate-700 leading-[1.9] italic"
                 style={{ fontSize: "clamp(0.875rem, 1.6vw, 0.90625rem)" }}>
                {data.quote}
              </p>
            </div>
          </Reveal>

          {/* TENTANG */}
          <div className="mb-10">
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

            <div className="max-w-3xl mx-auto text-center mb-10">
              {[data.aboutP1, data.aboutP2, data.aboutP3].map((txt, i) => (
                <Reveal key={i} delay={i * 80} y={18}>
                  <p className="text-slate-700 leading-[1.9] mb-4 last:mb-0"
                     style={{ fontSize: "clamp(0.875rem, 1.6vw, 0.90625rem)" }}>
                    {txt}
                  </p>
                </Reveal>
              ))}
            </div>

            {/* Kartu keunggulan */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5 mb-12">
              {keunggulanPancang.map((item, i) => (
                <Reveal key={i} delay={i * 60} y={24}>
                  <KeunggulanCard item={item} t={t} />
                </Reveal>
              ))}
            </div>

            {/* Fungsi */}
            <Reveal y={30}>
              <div className="mb-12">
                <div className="flex items-center gap-2 mb-5">
                  <span className="w-5 sm:w-6 h-px bg-[#1e88e5]" />
                  <h3 className="text-[10px] sm:text-[11px] uppercase
                                 tracking-[0.25em] text-slate-500 font-semibold">
                    {data.fungsiKicker}
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                  {fungsiPancang.map((item, i) => (
                    <Reveal key={i} delay={i * 50} y={16}>
                      <FungsiItem item={item} t={t} />
                    </Reveal>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Tahapan */}
            <Reveal y={30}>
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <span className="w-5 sm:w-6 h-px bg-[#1e88e5]" />
                  <h3 className="text-[10px] sm:text-[11px] uppercase
                                 tracking-[0.25em] text-slate-500 font-semibold">
                    {data.stepKicker}
                  </h3>
                </div>

                <div className="space-y-6">
                  {tahapanPemasangan.map((tp, i) => (
                    <Reveal key={i} delay={i * 80} y={20}>
                      <TahapanRow
                        item={tp}
                        index={i}
                        total={tahapanPemasangan.length}
                        t={t}
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
                <p className="text-slate-500 mt-3 max-w-xl mx-auto"
                   style={{ fontSize: "clamp(0.78125rem, 1.4vw, 0.8125rem)" }}>
                  {data.priceDesc}
                </p>
              </div>
            </Reveal>

            <Reveal y={34} delay={80}>
              <TiangPancangPricingPanel hideCta />
            </Reveal>
          </div>
        </div>

        {/* Lanjut */}
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
                           bg-slate-900 text-white
                           hover:bg-[#1e88e5]
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