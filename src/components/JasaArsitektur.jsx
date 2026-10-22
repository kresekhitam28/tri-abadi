// src/components/JasaArsitektur.jsx
"use client";

import { useState, useEffect, useRef, useCallback, useMemo, memo, useId } from "react";
import { useLang } from "../context/LanguageContext";

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
// HOOK: IN VIEW
// ─────────────────────────────────────────────
function useInView(options = {}) {
  const {
    threshold = 0.12,
    rootMargin = "0px 0px -60px 0px",
    once = true,
    enabled = true,
  } = options;
  const ref = useRef(null);
  const [inView, setInView] = useState(!enabled);

  useEffect(() => {
    if (!enabled) {
      setInView(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.unobserve(entry.target);
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once, enabled]);

  return [ref, inView];
}

// ─────────────────────────────────────────────
// BASE: ANIMASI WRAPPER (memoized, no blur)
// ─────────────────────────────────────────────
const AnimBase = memo(function AnimBase({
  children,
  delay = 0,
  y = 0,
  x = 0,
  scale = 1,
  duration = 700,
  className = "",
}) {
  const isMobile = useIsMobile();
  const enabled = !isMobile;
  const [ref, inView] = useInView({ enabled });

  const style = useMemo(() => {
    if (!enabled) {
      return { contain: "layout" };
    }
    const active = inView;
    return {
      transitionProperty: "opacity, transform",
      transitionDuration: `${duration}ms`,
      transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
      transitionDelay: `${delay}ms`,
      opacity: active ? 1 : 0,
      transform: active
        ? "translate3d(0,0,0) scale(1)"
        : `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
      willChange: active ? "auto" : "opacity, transform",
      contain: "layout",
    };
  }, [enabled, inView, duration, delay, x, y, scale]);

  return (
    <div ref={ref} style={style} className={className}>
      {children}
    </div>
  );
});

const FadeUp   = (p) => <AnimBase {...p} y={p.y ?? 28} />;
const ScaleIn  = (p) => <AnimBase {...p} scale={p.scale ?? 0.93} duration={p.duration ?? 800} />;
const FadeLeft = (p) => <AnimBase {...p} x={p.x ?? -28} y={p.y ?? 0} />;

// ─────────────────────────────────────────────
// IKON
// ─────────────────────────────────────────────
function IconWhatsApp({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}
function IconArrowRight({ className = "w-3.5 h-3.5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}
function IconCheck({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}
function IconHome({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <path d="M9 22V12h6v10" />
    </svg>
  );
}
function IconBuilding({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="4" y="2" width="16" height="20" rx="1" />
      <path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01" />
    </svg>
  );
}
function IconCompass({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}
function IconPencil({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z" />
    </svg>
  );
}
function IconCube({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
    </svg>
  );
}
function IconSparkles({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
    </svg>
  );
}

// ─────────────────────────────────────────────
// HELPER: pick bilingual
// ─────────────────────────────────────────────
const pick = (field, lang) => {
  if (!field) return "";
  if (typeof field === "string") return field;
  return field[lang] || field.id || field.en || "";
};

// ─────────────────────────────────────────────
// DATA (bilingual)
// ─────────────────────────────────────────────
const layananArsitektur = [
  {
    Icon: IconHome,
    title: { id: "Desain Rumah Tinggal", en: "Residential Design" },
    desc: {
      id: "Desain rumah modern, minimalis, klasik, atau tropis — disesuaikan dengan kebutuhan & lahan Anda.",
      en: "Modern, minimalist, classic, or tropical house design — tailored to your needs & land.",
    },
  },
  {
    Icon: IconBuilding,
    title: { id: "Desain Bangunan Komersial", en: "Commercial Building Design" },
    desc: {
      id: "Ruko, kantor, kafe, dan bangunan usaha dengan tata ruang optimal dan tampilan menarik.",
      en: "Shophouses, offices, cafes, and business buildings with optimal layout and attractive appearance.",
    },
  },
  {
    Icon: IconCube,
    title: { id: "3D Visualisasi", en: "3D Visualization" },
    desc: {
      id: "Render 3D realistis untuk melihat hasil akhir sebelum konstruksi dimulai.",
      en: "Realistic 3D rendering to preview the final result before construction begins.",
    },
  },
  {
    Icon: IconPencil,
    title: { id: "Gambar Kerja (DED)", en: "Working Drawings (DED)" },
    desc: {
      id: "Detail Engineering Design lengkap — gambar arsitektur, struktur, dan MEP.",
      en: "Complete Detail Engineering Design — architectural, structural, and MEP drawings.",
    },
  },
];

const tahapanPengerjaan = [
  {
    no: "01",
    title: { id: "Konsultasi & Brief", en: "Consultation & Brief" },
    desc: {
      id: "Diskusi kebutuhan, gaya desain yang diinginkan, budget, dan survey lokasi lahan Anda.",
      en: "Discuss needs, desired design style, budget, and survey of your land location.",
    },
    Icon: IconCompass,
  },
  {
    no: "02",
    title: { id: "Konsep Desain", en: "Design Concept" },
    desc: {
      id: "Pembuatan konsep awal — layout ruang, tampak bangunan, dan opsi material yang cocok.",
      en: "Creating initial concept — space layout, building facade, and suitable material options.",
    },
    Icon: IconSparkles,
  },
  {
    no: "03",
    title: { id: "Pengembangan Desain", en: "Design Development" },
    desc: {
      id: "Revisi konsep, penyusunan gambar detail, dan pembuatan 3D visualisasi realistis.",
      en: "Concept revision, detailed drawings, and creating realistic 3D visualization.",
    },
    Icon: IconPencil,
  },
  {
    no: "04",
    title: { id: "Gambar Kerja & RAB", en: "Working Drawings & Budget" },
    desc: {
      id: "Finalisasi gambar kerja (DED) dan penyusunan Rencana Anggaran Biaya yang transparan.",
      en: "Finalization of working drawings (DED) and transparent Budget Plan preparation.",
    },
    Icon: IconCheck,
  },
];

// ─────────────────────────────────────────────
// AREA JANGKAUAN
// ─────────────────────────────────────────────
const areaJangkauan = [
  {
    region: "DKI Jakarta",
    kota: ["Jakarta Barat", "Jakarta Utara", "Jakarta Pusat", "Jakarta Timur", "Jakarta Selatan", "Lebak Bulus", "Cilandak"],
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
    region: "Jawa Tengah & DI Yogyakarta",
    kota: ["Semarang", "Yogyakarta", "Surakarta (Solo)", "Magelang", "Salatiga", "Pekalongan", "Tegal"],
    kabupaten: ["Bantul", "Gunungkidul", "Kulon Progo", "Sleman", "Magelang", "Boyolali", "Klaten", "Sukoharjo"],
  },
  {
    region: "Jawa Timur",
    kota: ["Surabaya", "Malang", "Madiun", "Kediri", "Blitar", "Banyuwangi", "Probolinggo", "Pasuruan", "Mojokerto", "Batu"],
    kabupaten: ["Sidoarjo", "Gresik", "Malang", "Pasuruan", "Mojokerto", "Jombang", "Kediri", "Tulungagung"],
  },
  {
    region: "Sumatera",
    kota: ["Banda Aceh", "Medan", "Padang", "Pekanbaru", "Jambi", "Palembang", "Bengkulu", "Bandar Lampung", "Pangkal Pinang", "Tanjung Pinang"],
  },
  {
    region: "Kalimantan",
    kota: ["Pontianak", "Palangka Raya", "Banjarmasin", "Samarinda", "Balikpapan", "Tanjung Selor"],
  },
  {
    region: "Sulawesi",
    kota: ["Manado", "Palu", "Makassar", "Kendari", "Mamuju", "Gorontalo"],
  },
  {
    region: "Bali, Nusa Tenggara, Maluku & Papua",
    kota: ["Denpasar (Bali)", "Mataram", "Kupang", "Ambon", "Ternate", "Jayapura", "Manokwari", "Sorong"],
  },
];

// ─────────────────────────────────────────────
// KONTEN BILINGUAL
// ─────────────────────────────────────────────
const content = {
  id: {
    heroBadge: "Our Services",
    heroTitle: "Jasa Arsitektur",
    heroDesc: "Desain rumah, bangunan komersial, dan 3D visualisasi yang disesuaikan dengan gaya, lahan, dan budget Anda.",
    figcaption: "Desain",
    figcaptionText: "Desain Arsitektur — Tri Abadi Makmur",
    introStrong: "Jasa Arsitektur Profesional",
    introText: " — dari desain rumah tinggal, bangunan komersial, hingga visualisasi 3D realistis. Kami bantu wujudkan bangunan impian Anda dengan desain yang fungsional, estetis, dan sesuai budget.",
    quote: "Setiap desain kami kerjakan dengan pendekatan personal — memahami kebutuhan, gaya hidup, dan visi Anda, lalu menuangkannya ke dalam gambar kerja yang siap dibangun.",
    infoBadge: "Informasi",
    infoTitle1: "Layanan ",
    infoTitle2: "Jasa Arsitektur",
    infoParagraphs: [
      "Arsitektur adalah seni dan ilmu merancang bangunan. Kami merancang desain yang tidak hanya indah secara visual, tetapi juga fungsional, nyaman dihuni, dan efisien dalam penggunaan lahan.",
      "Setiap desain disesuaikan dengan kebutuhan klien — gaya minimalis, modern, klasik, tropis, industrial, hingga kombinasi. Semua dikerjakan dengan software arsitektur modern.",
      "Layanan kami mencakup desain arsitektur, gambar kerja (DED), visualisasi 3D, hingga Rencana Anggaran Biaya (RAB) — siap dibangun tanpa kendala di lapangan.",
    ],
    tahapanTitle: "Tahapan Pengerjaan",
    areaBadge: "Layanan",
    areaTitle1: "Area ",
    areaTitle2: "Jangkauan Kami",
    areaDesc: "Melayani jasa arsitektur di berbagai kota & kabupaten berikut.",
    areaToggle: "Lihat Daftar Kota & Kabupaten",
    areaCity: "Kota",
    areaRegency: "Kab.",
    ctaBadge: "Konsultasi Gratis",
    ctaTitle1: "Butuh jasa arsitektur? ",
    ctaTitle2: "Kami siap membantu.",
    ctaButton: "Hubungi via WhatsApp",
    ctaWaMessage: "Halo Tri Abadi Makmur, saya ingin konsultasi mengenai project...",
  },
  en: {
    heroBadge: "Our Services",
    heroTitle: "Architecture Services",
    heroDesc: "House design, commercial buildings, and 3D visualization tailored to your style, land, and budget.",
    figcaption: "Design",
    figcaptionText: "Architectural Design — Tri Abadi Makmur",
    introStrong: "Professional Architecture Services",
    introText: " — from residential home design, commercial buildings, to realistic 3D visualization. We help bring your dream building to life with functional, aesthetic, and budget-friendly design.",
    quote: "Every design is done with a personal approach — understanding your needs, lifestyle, and vision, then translating it into build-ready working drawings.",
    infoBadge: "Information",
    infoTitle1: "Our ",
    infoTitle2: "Architecture Services",
    infoParagraphs: [
      "Architecture is the art and science of designing buildings. We design not only visually beautiful structures, but also functional, comfortable to live in, and efficient in land use.",
      "Each design is tailored to the client's needs — minimalist, modern, classic, tropical, industrial, or combination styles. All done with modern architectural software.",
      "Our services include architectural design, working drawings (DED), 3D visualization, and Budget Plan (RAB) — ready to build without obstacles on site.",
    ],
    tahapanTitle: "Work Stages",
    areaBadge: "Services",
    areaTitle1: "Our ",
    areaTitle2: "Coverage Area",
    areaDesc: "We provide architecture services in the following cities & regencies.",
    areaToggle: "View City & Regency List",
    areaCity: "City",
    areaRegency: "Regency",
    ctaBadge: "Free Consultation",
    ctaTitle1: "Need architecture services? ",
    ctaTitle2: "We're ready to help.",
    ctaButton: "Contact via WhatsApp",
    ctaWaMessage: "Hello Tri Abadi Makmur, I would like to consult about an project...",
  },
};

// ─────────────────────────────────────────────
// SUB-KOMPONEN: LAYANAN CARD (memoized)
// ─────────────────────────────────────────────
const LayananCard = memo(function LayananCard({ item, lang }) {
  const { Icon, title, desc } = item;
  return (
    <div className="flex items-start gap-3 sm:gap-3.5 p-3.5 sm:p-4 h-full border border-slate-200 rounded-xl bg-white">
      <span className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#1e88e5]/10 text-[#1e88e5] flex items-center justify-center">
        <Icon className="w-4 h-4" />
      </span>
      <div className="min-w-0">
        <div
          className="text-slate-900 font-semibold leading-snug"
          style={{ fontSize: "clamp(0.8125rem, 1.4vw, 0.875rem)" }}
        >
          {pick(title, lang)}
        </div>
        <div
          className="text-slate-500 leading-snug mt-1"
          style={{ fontSize: "clamp(0.75rem, 1.3vw, 0.8125rem)" }}
        >
          {pick(desc, lang)}
        </div>
      </div>
    </div>
  );
});

// ─────────────────────────────────────────────
// SUB-KOMPONEN: STEP ITEM (memoized)
// ─────────────────────────────────────────────
const StepItem = memo(function StepItem({ step, lang, isLast }) {
  const { Icon } = step;
  return (
    <div className="relative flex gap-3 sm:gap-4">
      {!isLast && (
        <span
          className="absolute left-4 top-9 bottom-[-20px] w-px bg-slate-200"
          aria-hidden="true"
        />
      )}

      <div className="relative shrink-0">
        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#1e88e5]/10 text-[#1e88e5]">
          <Icon className="w-3.5 h-3.5" />
        </div>
      </div>

      <div className="min-w-0 pb-1">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <span className="text-[10.5px] sm:text-[10px] font-bold font-mono text-slate-400">
            {step.no}
          </span>
          <h4
            className="font-semibold text-slate-900"
            style={{ fontSize: "clamp(0.8125rem, 1.4vw, 0.875rem)" }}
          >
            {pick(step.title, lang)}
          </h4>
        </div>
        <p
          className="text-slate-600 leading-relaxed"
          style={{ fontSize: "clamp(0.75rem, 1.3vw, 0.8125rem)" }}
        >
          {pick(step.desc, lang)}
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
    <div>
      <div className="flex items-center gap-3 mb-4">
        <span className="w-4 h-px bg-[#1e88e5]" aria-hidden="true" />
        <h3 className="text-[11.5px] sm:text-[12.5px] uppercase tracking-[0.2em] sm:tracking-[0.22em] text-[#1e88e5] font-bold">
          {area.region}
        </h3>
        <span className="flex-1 h-px bg-slate-200" aria-hidden="true" />
      </div>

      <div className="space-y-3 pl-1">
        {area.kota && area.kota.length > 0 && (
          <div className="flex items-start gap-2.5 sm:gap-3">
            <span className="shrink-0 mt-[3px] text-[10.5px] sm:text-[10px] uppercase tracking-wider font-bold text-slate-400 w-[50px] sm:w-[60px]">
              {data.areaCity}
            </span>
            <div className="flex flex-wrap gap-1.5 flex-1">
              {area.kota.map((k, i) => (
                <span
                  key={i}
                  className="inline-block px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-[#1e88e5]/5 border border-[#1e88e5]/20 text-[11px] text-[#1565c0] font-medium"
                >
                  {k}
                </span>
              ))}
            </div>
          </div>
        )}

        {area.kabupaten && area.kabupaten.length > 0 && (
          <div className="flex items-start gap-2.5 sm:gap-3">
            <span className="shrink-0 mt-[3px] text-[10.5px] sm:text-[10px] uppercase tracking-wider font-bold text-slate-400 w-[50px] sm:w-[60px]">
              {data.areaRegency}
            </span>
            <div className="flex flex-wrap gap-1.5 flex-1">
              {area.kabupaten.map((k, i) => (
                <span
                  key={i}
                  className="inline-block px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-white border border-slate-200 text-[11px] text-slate-600"
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
// SUB-KOMPONEN: SECTION KICKER (memoized)
// ─────────────────────────────────────────────
const SectionKicker = memo(function SectionKicker({ children }) {
  return (
    <div className="inline-flex items-center gap-2.5 sm:gap-3 mb-3">
      <span className="w-6 sm:w-8 h-px bg-[#1e88e5]" aria-hidden="true" />
      <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#1e88e5] font-semibold">
        {children}
      </span>
      <span className="w-6 sm:w-8 h-px bg-[#1e88e5]" aria-hidden="true" />
    </div>
  );
});

// ─────────────────────────────────────────────
// HALAMAN: JASA ARSITEKTUR
// ─────────────────────────────────────────────
export default function JasaArsitektur() {
  const { lang } = useLang();
  const t = content[lang] || content.id;

  const [showArea, setShowArea] = useState(false);
  const areaPanelId = useId();

  return (
    <div className="bg-white">

      {/* ═══════ HERO ═══════ */}
      <section className="relative pt-28 lg:pt-36 pb-12 lg:pb-16 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white">
        <div
          aria-hidden="true"
          className="absolute -right-40 -top-40 w-[600px] h-[600px] pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(30,136,229,0.06) 0%, rgba(30,136,229,0) 70%)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute -left-40 -bottom-20 w-[500px] h-[500px] pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(30,136,229,0.05) 0%, rgba(30,136,229,0) 70%)",
          }}
        />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-5 lg:px-8 text-center">
          <FadeUp>
            <SectionKicker>{t.heroBadge}</SectionKicker>
          </FadeUp>

          <FadeUp delay={100} y={30}>
            <h1
              className="font-light tracking-tight text-slate-900 leading-[1.05] mb-5"
              style={{ fontSize: "clamp(2rem, 6vw, 3.75rem)" }}
            >
              {t.heroTitle}<span className="text-[#1e88e5]">.</span>
            </h1>
          </FadeUp>

          <FadeUp delay={150} y={24}>
            <p
              className="text-slate-600 leading-relaxed max-w-2xl mx-auto"
              style={{ fontSize: "clamp(0.875rem, 1.6vw, 1rem)" }}
            >
              {t.heroDesc}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ═══════ KONTEN UTAMA ═══════ */}
      <section className="pb-16 lg:pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-5 lg:px-8">

          {/* Foto utama */}
          <ScaleIn>
            <figure className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-100 mb-8 ring-1 ring-slate-200 shadow-xl shadow-slate-900/[0.06]">
              <div className="aspect-[16/10]">
                <img
                  src="/proyek/proyek-45.webp"
                  alt={t.heroTitle}
                  loading="eager"
                  decoding="async"
                  width={1200}
                  height={750}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/proyek/proyek-45.webp";
                  }}
                />
              </div>

              <figcaption className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/80 to-transparent px-4 sm:px-6 py-3 sm:py-5 pt-12 sm:pt-16">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-5 sm:w-6 h-px bg-[#4da3ff]" aria-hidden="true" />
                  <span className="text-[10px] sm:text-[10px] uppercase tracking-[0.24em] sm:tracking-[0.28em] text-[#4da3ff] font-semibold">
                    {t.figcaption}
                  </span>
                </div>
                <p
                  className="text-white font-medium"
                  style={{ fontSize: "clamp(0.8125rem, 1.4vw, 0.875rem)" }}
                >
                  {t.figcaptionText}
                </p>
              </figcaption>
            </figure>
          </ScaleIn>

          {/* Pengantar */}
          <FadeUp delay={100}>
            <p
              className="text-slate-700 leading-[1.9] mb-6 max-w-3xl"
              style={{ fontSize: "clamp(0.875rem, 1.6vw, 0.90625rem)" }}
            >
              <span className="font-semibold text-slate-900">{t.introStrong}</span>
              {t.introText}
            </p>
          </FadeUp>

          {/* Quote */}
          <FadeUp delay={150}>
            <div className="max-w-3xl mx-auto text-center mb-10">
              <p
                className="text-slate-700 leading-[1.9] italic"
                style={{ fontSize: "clamp(0.875rem, 1.6vw, 0.90625rem)" }}
              >
                {t.quote}
              </p>
            </div>
          </FadeUp>

          <div className="mb-10">
            {/* Judul informasi */}
            <FadeUp>
              <div className="text-center mb-8">
                <SectionKicker>{t.infoBadge}</SectionKicker>
                <h2
                  className="font-light tracking-tight text-slate-900 leading-tight"
                  style={{ fontSize: "clamp(1.5rem, 3.5vw, 1.875rem)" }}
                >
                  {t.infoTitle1}
                  <span className="font-semibold">{t.infoTitle2}</span>
                </h2>
              </div>
            </FadeUp>

            {/* Paragraf informasi */}
            <div className="max-w-3xl mx-auto text-center mb-8">
              {t.infoParagraphs.map((text, i) => (
                <FadeUp key={i} delay={i * 90}>
                  <p
                    className="text-slate-700 leading-[1.9] mb-4 last:mb-0"
                    style={{ fontSize: "clamp(0.875rem, 1.6vw, 0.90625rem)" }}
                  >
                    {text}
                  </p>
                </FadeUp>
              ))}
            </div>

            {/* Grid layanan */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {layananArsitektur.map((item, i) => (
                <FadeUp key={i} delay={i * 100}>
                  <LayananCard item={item} lang={lang} />
                </FadeUp>
              ))}
            </div>

            {/* Tahapan pengerjaan */}
            <FadeUp>
              <div className="p-4 sm:p-5 lg:p-6 rounded-2xl bg-white border border-slate-200">
                <div className="flex items-center gap-2 mb-6">
                  <span className="w-6 h-px bg-[#1e88e5]" aria-hidden="true" />
                  <h3 className="text-[10.5px] sm:text-[11px] uppercase tracking-[0.25em] text-slate-500 font-semibold">
                    {t.tahapanTitle}
                  </h3>
                </div>

                <div className="space-y-5">
                  {tahapanPengerjaan.map((step, i) => (
                    <FadeLeft key={i} delay={i * 120}>
                      <StepItem
                        step={step}
                        lang={lang}
                        isLast={i === tahapanPengerjaan.length - 1}
                      />
                    </FadeLeft>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-5 lg:px-8">
          {/* ═══════ AREA JANGKAUAN ═══════ */}
          <div className="mb-12">
            <FadeUp>
              <div className="text-center mb-8">
                <SectionKicker>{t.areaBadge}</SectionKicker>
                <h2
                  className="font-light tracking-tight text-slate-900 leading-tight"
                  style={{ fontSize: "clamp(1.5rem, 3.5vw, 1.875rem)" }}
                >
                  {t.areaTitle1}
                  <span className="font-semibold">{t.areaTitle2}</span>
                </h2>
                <p
                  className="text-slate-500 mt-3 max-w-xl mx-auto"
                  style={{ fontSize: "clamp(0.8125rem, 1.4vw, 0.875rem)" }}
                >
                  {t.areaDesc}
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={80}>
              <button
                type="button"
                onClick={() => setShowArea(!showArea)}
                aria-expanded={showArea}
                aria-controls={areaPanelId}
                className="w-full flex items-center gap-4 text-left cursor-pointer pb-5 border-b border-slate-200 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1e88e5]"
              >
                <span
                  className={`flex-1 font-bold uppercase tracking-[0.2em]
                    ${showArea ? "text-[#1e88e5]" : "text-slate-600"}`}
                  style={{ fontSize: "clamp(0.8125rem, 1.4vw, 0.875rem)" }}
                >
                  {t.areaToggle}
                </span>
                <span
                  className={`shrink-0 px-2.5 sm:px-3.5 py-1.5 rounded-full border font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] transition-colors duration-150
                    ${showArea
                      ? "bg-[#1e88e5] text-white border-[#1e88e5]"
                      : "bg-white text-slate-500 border-slate-300"}`}
                  style={{ fontSize: "clamp(0.625rem, 1vw, 0.6875rem)" }}
                >
                  {showArea
                    ? (lang === "en" ? "Close" : "Tutup")
                    : (lang === "en" ? "Open"  : "Buka")}
                </span>
              </button>

              {showArea && (
                <div id={areaPanelId} className="mt-8 space-y-8">
                  {areaJangkauan.map((area, idx) => (
                    <FadeUp key={idx} delay={idx * 80} y={16}>
                      <AreaRow area={area} data={t} />
                    </FadeUp>
                  ))}
                </div>
              )}
            </FadeUp>
          </div>

          {/* ═══════ CTA BANNER ═══════ */}
          <ScaleIn delay={100}>
            <div className="mt-10 p-5 sm:p-7 lg:p-9 rounded-3xl bg-slate-900 text-center relative overflow-hidden">
              <div
                aria-hidden="true"
                className="absolute -right-24 -top-24 w-56 h-56 pointer-events-none"
                style={{
                  background: "radial-gradient(circle, rgba(30,136,229,0.32) 0%, rgba(30,136,229,0) 70%)",
                }}
              />
              <div
                aria-hidden="true"
                className="absolute -left-24 -bottom-24 w-56 h-56 pointer-events-none"
                style={{
                  background: "radial-gradient(circle, rgba(30,136,229,0.20) 0%, rgba(30,136,229,0) 70%)",
                }}
              />

              <div className="relative">
                <p
                  className="text-[#4da3ff] uppercase tracking-[0.3em] font-semibold mb-3"
                  style={{ fontSize: "clamp(0.625rem, 1vw, 0.6875rem)" }}
                >
                  {t.ctaBadge}
                </p>
                <h3
                  className="text-white font-light tracking-tight mb-5"
                  style={{ fontSize: "clamp(1.25rem, 3vw, 1.5rem)" }}
                >
                  {t.ctaTitle1}
                  <span className="font-semibold">{t.ctaTitle2}</span>
                </h3>

                <a
                  href={`https://wa.me/6282258089367?text=${encodeURIComponent(t.ctaWaMessage)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 min-h-[44px] rounded-xl bg-white text-slate-900 hover:bg-[#4da3ff] hover:text-white font-semibold uppercase tracking-[0.15em] shadow-lg shadow-black/20 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                  style={{ fontSize: "clamp(0.6875rem, 1.2vw, 0.8125rem)" }}
                >
                  <IconWhatsApp className="w-4 h-4" />
                  {t.ctaButton}
                  <IconArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </ScaleIn>
        </div>
      </section>
    </div>
  );
}