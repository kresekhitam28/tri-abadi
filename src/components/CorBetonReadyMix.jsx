// src/components/CorBetonReadyMix.jsx
"use client";

import { useState, useEffect, useRef, useCallback, useMemo, memo } from "react";
import { useLang } from "../context/LanguageContext";
import BetonPricingPanel from "./BetonPricingPanel";

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
function IconShield({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}
function IconClock({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}
function IconTruck({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M1 3h15v13H1z" />
      <path d="M16 8h4l3 3v5h-7z" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
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
const keunggulanBeton = [
  {
    Icon: IconShield,
    title: { id: "Kualitas Terjamin", en: "Guaranteed Quality" },
    desc: {
      id: "Beton ready mix memiliki kekuatan lebih tinggi dibanding beton yang dicampur manual. Kualitas konsisten dan sesuai standar SNI.",
      en: "Ready-mix concrete has higher strength than manually mixed concrete. Consistent quality and compliant with SNI standards.",
    },
  },
  {
    Icon: IconClock,
    title: { id: "Proses Cepat & Efisien", en: "Fast & Efficient Process" },
    desc: {
      id: "Beton diaduk menggunakan alat berat yang sudah dilengkapi komputer, hasilnya presisi dan cepat.",
      en: "Concrete is mixed using computer-equipped heavy equipment, producing precise and fast results.",
    },
  },
  {
    Icon: IconCheck,
    title: { id: "Hasil Rata & Rapi", en: "Flat & Neat Results" },
    desc: {
      id: "Permukaan cor lebih rata dan rapi, mengurangi risiko keropos atau retak akibat campuran yang tidak konsisten.",
      en: "Cast surfaces are flatter and neater, reducing the risk of porosity or cracking due to inconsistent mixing.",
    },
  },
  {
    Icon: IconTruck,
    title: { id: "Hemat Waktu & Tenaga", en: "Saves Time & Energy" },
    desc: {
      id: "Pengecoran lebih cepat karena material sudah siap pakai. Tidak perlu menyewa mixer manual atau mencampur sendiri.",
      en: "Casting is faster because the material is ready to use. No need to rent a manual mixer or mix it yourself.",
    },
  },
];

const infoBeton = [
  { id: "Kualitas K 225 memiliki kuat tekan beton sekitar 225 kg per cm²", en: "K 225 quality has a concrete compressive strength of about 225 kg per cm²" },
  { id: "Kekuatan beton ready mix bisa mencapai 250 kg per cm² setelah usia 28 hari", en: "Ready-mix concrete strength can reach 250 kg per cm² after 28 days of age" },
  { id: "Tersedia dalam berbagai kelas: K 175, K 225, K 250, K 300, K 350, K 400, K 500", en: "Available in various classes: K 175, K 225, K 250, K 300, K 350, K 400, K 500" },
  { id: "Diaduk di batching plant dengan alat berat berkomputer, bukan manual", en: "Mixed at a batching plant with computer-controlled heavy equipment, not manually" },
  { id: "Distribusi ke lokasi menggunakan truk mixer sesuai jadwal", en: "Distributed to the site using mixer trucks according to schedule" },
];

const jenisBeton = [
  { k: "K 500 / Klas A",       v: { id: "Beton untuk precast / prestressed",                              en: "Concrete for precast / prestressed" } },
  { k: "K 400 / Klas P",       v: { id: "Beton untuk rabat jalan kelas 1 (jl negara / jl tol)",          en: "Concrete for class 1 road slabs (national roads / toll roads)" } },
  { k: "K 375 / Klas B",       v: { id: "Beton untuk lantai dan bangunan pabrik / rigid jalan",           en: "Concrete for floors and factory buildings / rigid pavement" } },
  { k: "K 350 / Klas B",       v: { id: "Beton untuk lantai dan bangunan pabrik / rigid jalan",           en: "Concrete for floors and factory buildings / rigid pavement" } },
  { k: "K 325 s/d K 300",      v: { id: "Konstruksi bangunan ruko / rumah bertingkat 3 s/d 5 lantai",     en: "Shop-house / 3 to 5-storey building construction" } },
  { k: "K 275 s/d K 225",      v: { id: "Konstruksi bangunan bertingkat 2 lantai, ruko / rumah tinggal",  en: "2-storey building construction, shop-houses / residential homes" } },
  { k: "K 175 s/d K 125 & B0", v: { id: "Konstruksi bangunan ringan / LC / lantai dasar",                 en: "Light building construction / LC / ground floor" } },
];

const keunggulanAccItems = [
  { id: "Material beton ready mix berkualitas SNI",            en: "SNI-quality ready-mix concrete materials" },
  { id: "Batching plant modern dengan alat berat berkomputer", en: "Modern batching plant with computer-controlled heavy equipment" },
  { id: "Distribusi cepat dengan truk mixer sesuai jadwal",    en: "Fast distribution with mixer trucks according to schedule" },
  { id: "Tenaga kerja profesional dan berpengalaman",          en: "Professional and experienced crews" },
  { id: "Harga bersaing dan transparan",                       en: "Competitive and transparent prices" },
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
    region: "Bangka Belitung",
    kota: ["Pangkal Pinang"],
  },
  {
    region: "Bali",
    kota: ["Denpasar"],
    kabupaten: ["Badung", "Bangli", "Buleleng", "Gianyar", "Jembrana", "Karangasem", "Klungkung", "Tabanan"],
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
    heroTitle: "Cor Beton Ready Mix",
    heroDesc: "Jasa cor beton ready mix murah untuk konstruksi infrastruktur dan renovasi rumah. Kualitas SNI, presisi, dan hemat waktu.",
    figAlt: "Cor Beton Ready Mix",
    figCaption: "Pengecoran Beton Ready Mix — Tri Abadi Makmur",
    intro: "Jasa cor beton ready mix — pada abad ke-21 ini kebutuhan jasa cor beton ready mix ataupun harga jasa ready mix concrete sangat dibutuhkan sekali, terlebih bagi masyarakat yang sedang membangun rumah maupun gedung. Terlebih pada infrastruktur dan renovasi perumahan kini juga semakin marak dilakukan, salah satu contohnya dalam kasus perumahan KPR.",
    infoKicker: "Informasi",
    infoTitleLight: "Mengenal ",
    infoTitleBold: "Beton Ready Mix",
    infoP1: "Pertumbuhan pembuatan struktur bangunan yang kurang kokoh bisa sangat membahayakan penghuni rumah tersebut. Untuk menghindari hal yang tidak diinginkan, langkah paling tepat adalah memilih bahan yang berkualitas.",
    infoP2: "Berikut informasi mengenai jasa harga beton cor K 225. Perlu Anda ketahui bahwa kualitas beton ini tergolong dalam beton kelas 2 yang dapat digunakan untuk pembuatan bangunan struktur maupun atap sedang — misalnya pengecoran jalan, lantai, kolom, balok dan lain sebagainya.",
    infoP3Prefix: "Kualitas K 225 sendiri memiliki kuat tekan beton setelah umur beton 28 hari (setelah pengecoran) yang bisa mencapai ",
    infoP3Bold: "225 kg per cm²",
    infoP3Suffix: ".",
    factsKicker: "Fakta Teknis",
    acc1Title: "Keunggulan Jasa Cor Beton Ready Mix Kami",
    acc2Title: "Jenis Beton Ready Mix Yang Kami Sediakan",
    acc2Intro: "Kami menyediakan berbagai jenis beton ready mix dengan kelas yang berbeda sesuai kebutuhan proyek Anda:",
    priceKicker: "Paket Harga",
    priceTitleLight: "Harga Jasa ",
    priceTitleBold: "Cor Beton Ready Mix",
    priceDesc: "Pilih kelas beton sesuai kebutuhan — harga per meter kubik (m³).",
    areaKicker: "Layanan",
    areaTitleLight: "Area ",
    areaTitleBold: "Jangkauan Kami",
    areaDesc: "Melayani pengecoran beton ready mix di berbagai kota & kabupaten berikut.",
    areaToggle: "Lihat Daftar Kota & Kabupaten",
    areaCity: "Kota",
    areaRegency: "Kab.",
    ctaKicker: "Konsultasi Gratis",
    ctaTitleLight: "Butuh cor beton ready mix? ",
    ctaTitleBold: "Kami siap membantu.",
    ctaBtn: "Hubungi via WhatsApp",
    ctaWaMessage: "Halo Tri Abadi Makmur, saya ingin konsultasi mengenai Project...",
  },
  en: {
    heroKicker: "Our Services",
    heroTitle: "Ready-Mix Concrete",
    heroDesc: "Affordable ready-mix concrete services for infrastructure construction and home renovation. SNI quality, precise, and time-saving.",
    figAlt: "Ready-Mix Concrete",
    figCaption: "Ready-Mix Concrete Casting — Tri Abadi Makmur",
    intro: "Ready-mix concrete services — in the 21st century, the need for ready-mix concrete casting services or ready-mix concrete prices is very high, especially for those building homes or buildings. Moreover, infrastructure and housing renovation are also increasingly common, one example being KPR (subsidized housing) projects.",
    infoKicker: "Information",
    infoTitleLight: "Getting to Know ",
    infoTitleBold: "Ready-Mix Concrete",
    infoP1: "The growth of building structures that are not sturdy enough can be very dangerous to the residents of the house. To avoid unwanted things, the most appropriate step is to choose quality materials.",
    infoP2: "Here is information about K 225 concrete casting service prices. You should know that this concrete quality is classified as class 2 concrete, which can be used for structural buildings and medium roofs — for example, casting roads, floors, columns, beams, and so on.",
    infoP3Prefix: "K 225 quality itself has a concrete compressive strength after 28 days of age (after casting) that can reach ",
    infoP3Bold: "225 kg per cm²",
    infoP3Suffix: ".",
    factsKicker: "Technical Facts",
    acc1Title: "Advantages of Our Ready-Mix Concrete Service",
    acc2Title: "Types of Ready-Mix Concrete We Provide",
    acc2Intro: "We provide various types of ready-mix concrete with different classes according to your project needs:",
    priceKicker: "Price Packages",
    priceTitleLight: "Ready-Mix Concrete ",
    priceTitleBold: "Service Pricing",
    priceDesc: "Choose the concrete class according to your needs — price per cubic meter (m³).",
    areaKicker: "Services",
    areaTitleLight: "Our ",
    areaTitleBold: "Coverage Area",
    areaDesc: "Serving ready-mix concrete casting in the following cities & regencies.",
    areaToggle: "View City & Regency List",
    areaCity: "City",
    areaRegency: "Regency",
    ctaKicker: "Free Consultation",
    ctaTitleLight: "Need ready-mix concrete? ",
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
// SUB-KOMPONEN: FACT ITEM (memoized)
// ─────────────────────────────────────────────
const FactItem = memo(function FactItem({ index, item, t }) {
  return (
    <li
      className="flex gap-3 text-slate-700 leading-relaxed"
      style={{
        contain: "layout paint style",
        fontSize: "clamp(0.78125rem, 1.4vw, 0.84375rem)",
      }}
    >
      <span className="shrink-0 w-5 h-5 rounded-full
                       bg-[#1e88e5]/10 text-[#1e88e5]
                       text-[10px] font-bold font-mono
                       flex items-center justify-center mt-0.5">
        {index + 1}
      </span>
      <span>{t(item)}</span>
    </li>
  );
});

// ─────────────────────────────────────────────
// SUB-KOMPONEN: JENIS BETON ITEM (memoized)
// ─────────────────────────────────────────────
const JenisBetonItem = memo(function JenisBetonItem({ item, t }) {
  return (
    <li className="flex gap-3" style={{ contain: "layout paint style" }}>
      <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-[#1e88e5]" />
      <span>
        <strong className="text-slate-900">{item.k}</strong> — {t(item.v)}
      </span>
    </li>
  );
});

// ─────────────────────────────────────────────
// SUB-KOMPONEN: KEUNGGULAN ACC ITEM (memoized)
// ─────────────────────────────────────────────
const KeunggulanAccItem = memo(function KeunggulanAccItem({ item, t }) {
  return (
    <li className="flex gap-3" style={{ contain: "layout paint style" }}>
      <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-[#1e88e5]" />
      <span>{t(item)}</span>
    </li>
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
// HALAMAN: COR BETON READY MIX
// ─────────────────────────────────────────────
export default function CorBetonReadyMix() {
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

      {/* ═══════ KONTEN ═══════ */}
      <section className="pb-16 lg:pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-5 lg:px-8">

          {/* Foto utama */}
          <Reveal y={40} duration={800}>
            <figure className="relative rounded-2xl overflow-hidden bg-slate-100 mb-10
                              ring-1 ring-slate-200"
                    style={{ contain: "layout paint style" }}>
              <div className="aspect-[16/10]">
                <img
                  src="/proyek/proyek-10.webp"
                  alt={data.figAlt}
                  loading="eager"
                  decoding="async"
                  width={1200}
                  height={750}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/proyek/proyek-10.webp";
                  }}
                />
              </div>
              <figcaption className="absolute bottom-0 inset-x-0
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
              className="text-slate-700 leading-[1.9] mb-12 max-w-3xl"
              style={{ fontSize: "clamp(0.875rem, 1.6vw, 0.90625rem)" }}
            >
              {data.intro}
            </p>
          </Reveal>

          {/* MENGENAL BETON READY MIX */}
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
              <div className="max-w-3xl mx-auto text-center mb-10">
                <p
                  className="text-slate-700 leading-[1.9] mb-4"
                  style={{ fontSize: "clamp(0.875rem, 1.6vw, 0.90625rem)" }}
                >
                  {data.infoP1}
                </p>
                <p
                  className="text-slate-700 leading-[1.9] mb-4"
                  style={{ fontSize: "clamp(0.875rem, 1.6vw, 0.90625rem)" }}
                >
                  {data.infoP2}
                </p>
                <p
                  className="text-slate-700 leading-[1.9]"
                  style={{ fontSize: "clamp(0.875rem, 1.6vw, 0.90625rem)" }}
                >
                  {data.infoP3Prefix}
                  <span className="font-semibold text-slate-900">{data.infoP3Bold}</span>
                  {data.infoP3Suffix}
                </p>
              </div>
            </Reveal>

            {/* Kartu keunggulan */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5 mb-12">
              {keunggulanBeton.map((item, i) => (
                <Reveal key={i} delay={i * 100} y={24}>
                  <KeunggulanCard item={item} t={t} />
                </Reveal>
              ))}
            </div>

            {/* Fakta Teknis */}
            <Reveal y={30}>
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <span className="w-6 h-px bg-[#1e88e5]" />
                  <h3 className="text-[10.5px] sm:text-[11px] uppercase
                                 tracking-[0.25em] text-slate-500 font-semibold">
                    {data.factsKicker}
                  </h3>
                </div>
                <ol className="space-y-3">
                  {infoBeton.map((it, i) => (
                    <Reveal key={i} delay={i * 60} y={16}>
                      <FactItem index={i} item={it} t={t} />
                    </Reveal>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>

          {/* ACCORDION */}
          <Reveal y={24}>
            <Accordion title={data.acc1Title} defaultOpen={false}>
              <ul className="space-y-2.5">
                {keunggulanAccItems.map((it, i) => (
                  <KeunggulanAccItem key={i} item={it} t={t} />
                ))}
              </ul>
            </Accordion>
          </Reveal>

          <Reveal delay={100} y={24}>
            <Accordion title={data.acc2Title} defaultOpen={false}>
              <p className="mb-4">{data.acc2Intro}</p>
              <ul className="space-y-2.5">
                {jenisBeton.map((it, i) => (
                  <JenisBetonItem key={i} item={it} t={t} />
                ))}
              </ul>
            </Accordion>
          </Reveal>
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
              <BetonPricingPanel hideCta />
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