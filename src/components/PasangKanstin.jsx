// src/components/PasangKanstin.jsx
"use client";

import { useState, useEffect, useRef, useCallback, useMemo, memo } from "react";
import { useLang } from "../context/LanguageContext";
import KanstinPricingPanel from "./KanstinPricingPanel";

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
                  shadow-sm hover:shadow-md
                  transition-all duration-200
                  ${open ? "border-[#1e88e5]" : "border-slate-200"}`}
      style={{ contain: "layout paint style" }}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="group w-full flex items-center gap-3 sm:gap-4
                   px-4 sm:px-5 py-3.5 sm:py-4
                   text-left cursor-pointer transition-colors duration-150
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e88e5]
                   focus-visible:ring-offset-2"
      >
        <span
          className={`flex-1 font-semibold uppercase tracking-[0.12em]
                      transition-colors duration-200
                      ${open ? "text-[#1e88e5]" : "text-slate-800 group-hover:text-[#1e88e5]"}`}
          style={{ fontSize: "clamp(0.75rem, 1.5vw, 0.84375rem)" }}
        >
          {title}
        </span>
        <span
          className={`shrink-0 px-2.5 sm:px-3.5 py-1.5 rounded-full border
                      font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em]
                      transition-all duration-300
                      ${open
                        ? "bg-[#1e88e5] text-white border-[#1e88e5] shadow-sm shadow-[#1e88e5]/30"
                        : "bg-white text-slate-500 border-slate-300 group-hover:border-[#1e88e5] group-hover:text-[#1e88e5]"}`}
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
// DATA: FUNGSI KANSTIN (bilingual)
// ─────────────────────────────────────────────
const fungsiKanstin = [
  {
    title: { id: "Pembatas Fisik", en: "Physical Barrier" },
    desc: {
      id: "Fungsi utama kanstin adalah sebagai elemen pembatas fisik antara jalan dan area pejalan kaki. Dengan pemasangan yang benar, kanstin membantu mencegah kendaraan naik ke trotoar atau melindungi area hijau dari injakan kendaraan.",
      en: "The main function of a curb is as a physical barrier between the road and pedestrian areas. With proper installation, curbs help prevent vehicles from climbing onto the sidewalk or protect green areas from vehicle intrusion.",
    },
  },
  {
    title: { id: "Drainase", en: "Drainage" },
    desc: {
      id: "Kanstin sering digunakan sebagai pengarah bagi saluran drainase yang ada di tepi jalan. Ini membantu air hujan mengalir dengan lancar dan mencegah genangan air di sekitar jalan atau trotoar.",
      en: "Curbs are often used to guide drainage channels along the roadside. This helps rainwater flow smoothly and prevents puddles around the road or sidewalk.",
    },
  },
  {
    title: { id: "Estetika dan Penyempurna Area", en: "Aesthetics and Area Finishing" },
    desc: {
      id: "Kanstin juga memiliki aspek visual yang penting. Mereka memberikan garis yang jelas untuk memisahkan antara jalan dengan trotoar atau taman, menciptakan tampilan yang rapi dan teratur.",
      en: "Curbs also have an important visual aspect. They provide a clear line separating the road from the sidewalk or garden, creating a neat and orderly appearance.",
    },
  },
  {
    title: { id: "Keamanan Pejalan Kaki", en: "Pedestrian Safety" },
    desc: {
      id: "Kanstin memberikan perlindungan tambahan bagi pejalan kaki dengan menciptakan batas fisik antara jalan raya dengan trotoar. Ini membantu mengurangi risiko kecelakaan antara kendaraan dan pejalan kaki.",
      en: "Curbs provide additional protection for pedestrians by creating a physical boundary between the road and the sidewalk. This helps reduce the risk of accidents between vehicles and pedestrians.",
    },
  },
  {
    title: { id: "Peningkatan Kualitas Lalu Lintas", en: "Improved Traffic Quality" },
    desc: {
      id: "Dengan membatasi kendaraan ke jalur yang sesuai, kanstin membantu menjaga aliran lalu lintas tetap teratur dan mengurangi risiko tabrakan.",
      en: "By keeping vehicles in their appropriate lanes, curbs help maintain orderly traffic flow and reduce the risk of collisions.",
    },
  },
  {
    title: { id: "Stabilitas Permukaan", en: "Surface Stability" },
    desc: {
      id: "Kanstin membantu menjaga stabilitas permukaan jalan atau trotoar dengan menahan tekanan dari lalu lintas dan mencegah pergeseran tanah atau material di bawahnya.",
      en: "Curbs help maintain the stability of the road or sidewalk surface by withstanding traffic pressure and preventing soil or material shifts beneath them.",
    },
  },
  {
    title: { id: "Pemasangan Infrastruktur Tambahan", en: "Additional Infrastructure Mounting" },
    desc: {
      id: "Kanstin dapat digunakan sebagai landasan untuk pemasangan infrastruktur tambahan seperti lampu jalan, rambu lalu lintas, atau papan penanda.",
      en: "Curbs can be used as a base for installing additional infrastructure such as street lights, traffic signs, or marker boards.",
    },
  },
];

// ─────────────────────────────────────────────
// DATA: LAYANAN (bilingual)
// ─────────────────────────────────────────────
const layananList = [
  {
    title: { id: "Survey Lokasi", en: "Site Survey" },
    desc: {
      id: "Survey lokasi dilakukan oleh team work yang ramah dan informatif",
      en: "Site survey is conducted by a friendly and informative team",
    },
  },
  {
    title: { id: "Standar Tinggi", en: "High Standards" },
    desc: {
      id: "Pengerjaan dilakukan dengan standar tinggi sehingga hasil sesuai harapan",
      en: "Work is carried out to high standards so the results meet expectations",
    },
  },
  {
    title: { id: "Alat Berat Modern", en: "Modern Heavy Equipment" },
    desc: {
      id: "Alat berat modern untuk memaksimalkan hasil akhir",
      en: "Modern heavy equipment to maximize the final result",
    },
  },
  {
    title: { id: "Tenaga Profesional", en: "Professional Crew" },
    desc: {
      id: "Pengerjaan dilakukan oleh tenaga kerja profesional yang sudah berpengalaman",
      en: "Work is carried out by experienced and professional crews",
    },
  },
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
      <span className="w-6 sm:w-12 h-px bg-gradient-to-r from-transparent to-[#1e88e5]" />
      <span className="text-[10px] sm:text-[11px] uppercase
                       tracking-[0.25em] sm:tracking-[0.3em]
                       text-[#1e88e5] font-semibold">
        {children}
      </span>
      <span className="w-6 sm:w-12 h-px bg-gradient-to-l from-transparent to-[#1e88e5]" />
    </div>
  );
}

// ─────────────────────────────────────────────
// KONTEN BILINGUAL HALAMAN
// ─────────────────────────────────────────────
const content = {
  id: {
    heroKicker: "Layanan Kami",
    heroTitle: "Pasang Kanstin",
    heroDesc: "Jasa harga dan pasang kanstin untuk trotoar, taman, DKI, dan S. Dikerjakan rapi, presisi, dan tahan lama oleh tenaga berpengalaman.",
    figAlt: "Pasang Kanstin",
    figCaption: "Pemasangan Kanstin — Tri Abadi Makmur",
    intro: "Jasa Harga dan Pasang Kanstin — dibawah ini merupakan rincian harga jasa pemasangan kanstin beserta spesifikasi material. Pengerjaan dilakukan dengan memperhatikan hasil akhir yang rapi dan sesuai standar.",
    defKicker: "Definisi",
    defTitleLight: "Definisi ",
    defTitleBold: "Kanstin",
    defP1: "Kanstin atau kansteen adalah elemen beton yang berbentuk seperti pembatas di antara bahu jalan, trotoar, dan area lainnya. Biasanya kanstin berbentuk persegi panjang dengan permukaan yang rata.",
    defP2: "Pemasangan kanstin dianggap penting karena memiliki banyak fungsi penting dalam tata kota dan infrastruktur jalan. Berikut adalah beberapa fungsi utama dari pemasangan kanstin.",
    funcAccTitle: "Fungsi Kanstin",
    priceKicker: "Paket Harga",
    priceTitleLight: "Berikut perhitungan ",
    priceTitleBold: "jasa harga dan pasang kanstin",
    priceDesc: "Pilih jenis kanstin sesuai kebutuhan — harga sudah termasuk jasa pasang.",
    serviceKicker: "Layanan",
    serviceTitleLight: "Layanan Jasa ",
    serviceTitleBold: "Pengaspalan",
    areaKicker: "Layanan",
    areaTitleLight: "Area ",
    areaTitleBold: "Jangkauan Kami",
    areaDesc: "Melayani jasa pasang kanstin di berbagai kota & kabupaten berikut.",
    areaToggle: "Lihat Daftar Kota & Kabupaten",
    areaCity: "Kota",
    areaRegency: "Kab.",
    ctaKicker: "Konsultasi Gratis",
    ctaTitleLight: "Butuh jasa pasang kanstin? ",
    ctaTitleBold: "Kami siap membantu.",
    ctaBtn: "Hubungi via WhatsApp",
    ctaWaMessage: "Halo Tri Abadi Makmur, saya ingin konsultasi mengenai Project...",
  },
  en: {
    heroKicker: "Our Services",
    heroTitle: "Curb Installation",
    heroDesc: "Curbs pricing and installation services for sidewalks, gardens, DKI, and S types. Neatly, precisely, and durably executed by experienced crews.",
    figAlt: "Curb Installation",
    figCaption: "Curb Installation — Tri Abadi Makmur",
    intro: "Curb Pricing and Installation Services — below is the price breakdown of curb installation services along with material specifications. The work is carried out with attention to neat and standard-compliant results.",
    defKicker: "Definition",
    defTitleLight: "Definition of ",
    defTitleBold: "Curb",
    defP1: "A curb or kansteen is a concrete element shaped like a barrier between the road shoulder, sidewalk, and other areas. Curbs are usually rectangular with a flat surface.",
    defP2: "Curb installation is considered important because it has many vital functions in urban planning and road infrastructure. The following are some of the main functions of curb installation.",
    funcAccTitle: "Functions of Curbs",
    priceKicker: "Price Packages",
    priceTitleLight: "Here is the calculation for ",
    priceTitleBold: "curb pricing and installation services",
    priceDesc: "Choose the curb type according to your needs — the price already includes installation.",
    serviceKicker: "Services",
    serviceTitleLight: "Asphalt Paving ",
    serviceTitleBold: "Services",
    areaKicker: "Services",
    areaTitleLight: "Our ",
    areaTitleBold: "Coverage Area",
    areaDesc: "Serving curb installation services in the following cities & regencies.",
    areaToggle: "View City & Regency List",
    areaCity: "City",
    areaRegency: "Regency",
    ctaKicker: "Free Consultation",
    ctaTitleLight: "Need curb installation? ",
    ctaTitleBold: "We are ready to help.",
    ctaBtn: "Contact via WhatsApp",
    ctaWaMessage: "Hello Tri Abadi Makmur, I would like to consult about an project...",
  },
};

// ─────────────────────────────────────────────
// SUB-KOMPONEN: FUNGSI ITEM (memoized)
// ─────────────────────────────────────────────
const FungsiItem = memo(function FungsiItem({ item, t }) {
  return (
    <li className="group" style={{ contain: "layout paint style" }}>
      <div className="flex items-center gap-2 mb-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#1e88e5] shrink-0
                         group-hover:scale-150 transition-transform duration-300" />
        <h4
          className="font-semibold text-slate-900 group-hover:text-[#1e88e5]
                     transition-colors duration-200"
          style={{ fontSize: "clamp(0.78125rem, 1.4vw, 0.84375rem)" }}
        >
          {t(item.title)}
        </h4>
      </div>
      <p
        className="text-slate-600 leading-[1.85] pl-3.5"
        style={{ fontSize: "clamp(0.78125rem, 1.4vw, 0.84375rem)" }}
      >
        {t(item.desc)}
      </p>
    </li>
  );
});

// ─────────────────────────────────────────────
// SUB-KOMPONEN: LAYANAN CARD (memoized)
// ─────────────────────────────────────────────
const LayananCard = memo(function LayananCard({ item, t }) {
  return (
    <div className="group flex items-start gap-3.5 p-3 rounded-xl
                    hover:bg-slate-50 transition-colors duration-200"
         style={{ contain: "layout paint style" }}>
      <span className="shrink-0 w-9 h-9 rounded-lg
                       bg-[#1e88e5]/10 text-[#1e88e5]
                       flex items-center justify-center
                       group-hover:bg-[#1e88e5] group-hover:text-white
                       group-hover:scale-105 transition-all duration-300">
        <IconCheck className="w-4 h-4" />
      </span>
      <div className="min-w-0">
        <div
          className="text-slate-900 font-semibold leading-snug
                     group-hover:text-[#1e88e5] transition-colors duration-200"
          style={{ fontSize: "clamp(0.78125rem, 1.4vw, 0.84375rem)" }}
        >
          {t(item.title)}
        </div>
        <div
          className="text-slate-500 leading-snug mt-1"
          style={{ fontSize: "clamp(0.71875rem, 1.3vw, 0.75rem)" }}
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
        <span className="flex-1 h-px bg-gradient-to-r from-slate-200 to-transparent" />
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
                             text-[10.5px] sm:text-[11px] text-[#1565c0] font-medium
                             hover:bg-[#1e88e5] hover:text-white hover:border-[#1e88e5]
                             transition-colors duration-200 cursor-default">
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
                             text-[10.5px] sm:text-[11px] text-slate-600
                             hover:border-[#1e88e5]/40 hover:text-[#1e88e5]
                             transition-colors duration-200 cursor-default">
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
// HALAMAN: PASANG KANSTIN
// ─────────────────────────────────────────────
export default function PasangKanstin() {
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
      <section className="relative pt-28 lg:pt-36 pb-16 lg:pb-24
                          bg-gradient-to-b from-slate-50 to-white overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
             aria-hidden="true"
             style={{
               backgroundImage:
                 "radial-gradient(circle at 1px 1px, #1e88e5 1px, transparent 0)",
               backgroundSize: "32px 32px",
               maskImage:
                 "radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 100%)",
               WebkitMaskImage:
                 "radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 100%)",
             }} />
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full
                        bg-[#1e88e5]/[0.04] blur-3xl pointer-events-none"
             aria-hidden="true" />
        <div className="absolute -bottom-20 -left-40 w-[400px] h-[400px] rounded-full
                        bg-[#1e88e5]/[0.03] blur-3xl pointer-events-none"
             aria-hidden="true" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-5 lg:px-8 text-center">
          <Reveal delay={0} y={20}>
            <div className="inline-flex items-center gap-2.5 sm:gap-3 mb-5">
              <span className="w-6 sm:w-12 h-px bg-gradient-to-r from-transparent to-[#1e88e5]" />
              <span className="text-[10px] sm:text-[11px] uppercase
                               tracking-[0.25em] sm:tracking-[0.3em]
                               text-[#1e88e5] font-semibold">
                {data.heroKicker}
              </span>
              <span className="w-6 sm:w-12 h-px bg-gradient-to-l from-transparent to-[#1e88e5]" />
            </div>
          </Reveal>

          <Reveal delay={80} y={30}>
            <h1
              className="font-light tracking-tight text-slate-900 leading-[1.05] mb-5"
              style={{ fontSize: "clamp(2rem, 6vw, 3.75rem)" }}
            >
              <span
                className="font-semibold
                           bg-gradient-to-r from-slate-900 to-[#1e88e5]
                           bg-clip-text text-transparent"
              >
                {data.heroTitle}
              </span>
              <span className="text-[#1e88e5]">.</span>
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
            <figure className="group relative rounded-2xl overflow-hidden bg-slate-100 mb-10
                              ring-1 ring-slate-200
                              hover:ring-[#1e88e5]/30 hover:shadow-xl hover:shadow-[#1e88e5]/5
                              transition-all duration-500"
                    style={{ contain: "layout paint style" }}>
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src="/proyek/pasang-kanstin.webp"
                  alt={data.figAlt}
                  loading="eager"
                  decoding="async"
                  width={1200}
                  height={750}
                  className="w-full h-full object-cover
                             group-hover:scale-[1.03] transition-transform duration-700"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/proyek/pasang-kanstin.webp";
                  }}
                />
              </div>

              <figcaption className="absolute bottom-0 inset-x-0
                                     bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent
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
            <p className="text-slate-700 leading-[1.9] mb-12 max-w-3xl"
               style={{ fontSize: "clamp(0.875rem, 1.6vw, 0.90625rem)" }}>
              {data.intro}
            </p>
          </Reveal>

          {/* ═══════ DEFINISI KANSTIN ═══════ */}
          <div className="mb-12">
            <Reveal y={26}>
              <div className="text-center mb-8">
                <SectionKicker>{data.defKicker}</SectionKicker>
                <h2
                  className="font-light tracking-tight text-slate-900 leading-tight"
                  style={{ fontSize: "clamp(1.5rem, 3.5vw, 1.875rem)" }}
                >
                  {data.defTitleLight}
                  <span className="font-semibold">{data.defTitleBold}</span>
                </h2>
              </div>
            </Reveal>

            <Reveal delay={100} y={22}>
              <div className="max-w-3xl mx-auto text-center">
                <p
                  className="text-slate-700 leading-[1.9] mb-4"
                  style={{ fontSize: "clamp(0.875rem, 1.6vw, 0.90625rem)" }}
                >
                  {data.defP1}
                </p>
                <p
                  className="text-slate-700 leading-[1.9]"
                  style={{ fontSize: "clamp(0.875rem, 1.6vw, 0.90625rem)" }}
                >
                  {data.defP2}
                </p>
              </div>
            </Reveal>
          </div>

          {/* ═══════ ACCORDION FUNGSI KANSTIN ═══════ */}
          <Reveal delay={150} y={24}>
            <Accordion title={data.funcAccTitle} defaultOpen={true}>
              <ul className="space-y-5">
                {fungsiKanstin.map((f, i) => (
                  <FungsiItem key={i} item={f} t={t} />
                ))}
              </ul>
            </Accordion>
          </Reveal>
        </div>

        {/* ═══════ PANEL HARGA KANSTIN ═══════ */}
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
              <KanstinPricingPanel hideCta />
            </Reveal>
          </div>
        </div>

        {/* Lanjut konten setelah panel harga */}
        <div className="max-w-4xl mx-auto px-4 sm:px-5 lg:px-8">

          {/* ═══════ LAYANAN KAMI ═══════ */}
          <div className="mb-16">
            <Reveal y={26}>
              <div className="text-center mb-8">
                <SectionKicker>{data.serviceKicker}</SectionKicker>
                <h2
                  className="font-light tracking-tight text-slate-900 leading-tight"
                  style={{ fontSize: "clamp(1.5rem, 3.5vw, 1.875rem)" }}
                >
                  {data.serviceTitleLight}
                  <span className="font-semibold">{data.serviceTitleBold}</span>
                </h2>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
              {layananList.map((l, i) => (
                <Reveal key={i} delay={i * 100} y={24}>
                  <LayananCard item={l} t={t} />
                </Reveal>
              ))}
            </div>
          </div>

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
                className="group w-full flex items-center gap-4 text-left cursor-pointer
                           pb-5 border-b border-slate-200
                           transition-colors duration-200
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e88e5]
                           focus-visible:ring-offset-2 rounded-md"
              >
                <span
                  className={`flex-1 font-bold uppercase tracking-[0.2em]
                              transition-colors duration-200
                              ${showArea ? "text-[#1e88e5]" : "text-slate-600 group-hover:text-[#1e88e5]"}`}
                  style={{ fontSize: "clamp(0.78125rem, 1.4vw, 0.8125rem)" }}
                >
                  {data.areaToggle}
                </span>
                <span
                  className={`shrink-0 px-2.5 sm:px-3.5 py-1.5 rounded-full border
                              font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em]
                              transition-all duration-300
                              ${showArea
                                ? "bg-[#1e88e5] text-white border-[#1e88e5] shadow-sm shadow-[#1e88e5]/30"
                                : "bg-white text-slate-500 border-slate-300 group-hover:border-[#1e88e5] group-hover:text-[#1e88e5]"}`}
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
            <div className="mt-16 mb-16 p-6 sm:p-8 rounded-3xl bg-slate-950
                            text-center max-w-2xl mx-auto
                            relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -right-24 -top-24 w-56 h-56 rounded-full
                                bg-[#1e88e5]/25 blur-3xl" />
                <div className="absolute -left-24 -bottom-24 w-56 h-56 rounded-full
                                bg-[#1e88e5]/15 blur-3xl" />
              </div>

              <div className="relative">
                <p
                  className="text-[#4da3ff] uppercase tracking-[0.3em] font-semibold mb-3"
                  style={{ fontSize: "clamp(0.5625rem, 1vw, 0.625rem)" }}
                >
                  {data.ctaKicker}
                </p>
                <h3
                  className="text-white font-light tracking-tight mb-6"
                  style={{ fontSize: "clamp(1.25rem, 3vw, 1.5rem)" }}
                >
                  {data.ctaTitleLight}
                  <span className="font-semibold">{data.ctaTitleBold}</span>
                </h3>

                <a
                  href={`https://wa.me/6282258089367?text=${encodeURIComponent(data.ctaWaMessage)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center justify-center gap-2
                             px-6 sm:px-7 py-3.5 rounded-xl
                             bg-white text-slate-900
                             hover:bg-[#1e88e5] hover:text-white
                             hover:-translate-y-0.5
                             font-semibold uppercase tracking-[0.15em]
                             shadow-lg shadow-black/20
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white
                             focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950
                             transition-all duration-300"
                  style={{ fontSize: "clamp(0.6875rem, 1.2vw, 0.75rem)" }}
                >
                  <IconWhatsApp className="w-4 h-4" />
                  {data.ctaBtn}
                  <IconArrowRight className="w-3.5 h-3.5
                                             transition-transform duration-200
                                             group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </Reveal>

        </div>
      </section>
    </div>
  );
}