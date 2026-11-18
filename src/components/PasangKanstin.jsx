// src/components/PasangKanstin.jsx
"use client";

import { useState, useCallback, useMemo, memo } from "react";
import Link from "next/link";
import { useLang } from "../context/LanguageContext";
import KanstinPricingPanel from "./KanstinPricingPanel";
import { useIsMobile } from "../hooks/useIsMobile";
import { useReveal } from "../hooks/useReveal";

const WA_NUMBER = "6282258089367";

const Reveal = memo(function Reveal({
  children, delay = 0, y = 28, duration = 700, as: Tag = "div", className = "",
}) {
  const isMobile = useIsMobile();
  const enabled = !isMobile;
  const [ref, visible] = useReveal({ enabled });

  const style = useMemo(() => {
    if (!enabled) return { contain: "layout" };
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

  return <Tag ref={ref} style={style} className={className}>{children}</Tag>;
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
function IconCheck({ className = "w-4 h-4" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true"><path d="M20 6L9 17l-5-5" /></svg>);
}
function IconArticle({ className = "w-4 h-4" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>);
}
function IconMapPin({ className = "w-4 h-4" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>);
}
function IconAward({ className = "w-4 h-4" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true"><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" /></svg>);
}
function IconTruck({ className = "w-4 h-4" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" /><path d="M15 18H9" /><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" /><circle cx="17" cy="18" r="2" /><circle cx="7" cy="18" r="2" /></svg>);
}
function IconUsers({ className = "w-4 h-4" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>);
}
function IconChevron({ className = "w-5 h-5" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>);
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
      className={`border rounded-xl overflow-hidden mb-2.5 bg-white transition-colors duration-200
                  ${open ? "border-[#1e88e5]" : "border-slate-200"}`}
      style={{ contain: "layout paint style" }}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-3.5 sm:py-4 text-left cursor-pointer transition-colors duration-150"
      >
        <span
          className={`flex-1 font-semibold uppercase tracking-[0.12em] ${open ? "text-[#1e88e5]" : "text-slate-800"}`}
          style={{ fontSize: "clamp(0.75rem, 1.5vw, 0.84375rem)" }}
        >
          {title}
        </span>
        <span
          className={`shrink-0 px-2.5 sm:px-3.5 py-1.5 rounded-full border font-bold uppercase tracking-[0.15em] transition-colors duration-150
                      ${open ? "bg-[#1e88e5] text-white border-[#1e88e5]" : "bg-white text-slate-500 border-slate-300"}`}
          style={{ fontSize: "clamp(0.5625rem, 1vw, 0.625rem)" }}
        >
          {open ? btnClose : btnOpen}
        </span>
      </button>

      {open && (
        <div
          className="px-4 sm:px-5 pb-4 sm:pb-5 pt-1 text-slate-700 leading-[1.85] border-t border-slate-100"
          style={{ fontSize: "clamp(0.8125rem, 1.5vw, 0.875rem)" }}
        >
          {children}
        </div>
      )}
    </div>
  );
});

// ─────────────────────────────────────────────
// DATA: FUNGSI KANSTIN
// ─────────────────────────────────────────────
const fungsiKanstin = [
  { title: { id: "Pembatas Fisik", en: "Physical Barrier" }, desc: { id: "Fungsi utama kanstin adalah sebagai elemen pembatas fisik antara jalan dan area pejalan kaki. Dengan pemasangan yang benar, kanstin membantu mencegah kendaraan naik ke trotoar atau melindungi area hijau dari injakan kendaraan.", en: "The main function of a curb is as a physical barrier between the road and pedestrian areas. With proper installation, curbs help prevent vehicles from climbing onto the sidewalk or protect green areas from vehicle intrusion." } },
  { title: { id: "Drainase", en: "Drainage" }, desc: { id: "Kanstin sering digunakan sebagai pengarah bagi saluran drainase yang ada di tepi jalan. Ini membantu air hujan mengalir dengan lancar dan mencegah genangan air di sekitar jalan atau trotoar.", en: "Curbs are often used to guide drainage channels along the roadside. This helps rainwater flow smoothly and prevents puddles around the road or sidewalk." } },
  { title: { id: "Estetika dan Penyempurna Area", en: "Aesthetics and Area Finishing" }, desc: { id: "Kanstin juga memiliki aspek visual yang penting. Mereka memberikan garis yang jelas untuk memisahkan antara jalan dengan trotoar atau taman, menciptakan tampilan yang rapi dan teratur.", en: "Curbs also have an important visual aspect. They provide a clear line separating the road from the sidewalk or garden, creating a neat and orderly appearance." } },
  { title: { id: "Keamanan Pejalan Kaki", en: "Pedestrian Safety" }, desc: { id: "Kanstin memberikan perlindungan tambahan bagi pejalan kaki dengan menciptakan batas fisik antara jalan raya dengan trotoar. Ini membantu mengurangi risiko kecelakaan antara kendaraan dan pejalan kaki.", en: "Curbs provide additional protection for pedestrians by creating a physical boundary between the road and the sidewalk. This helps reduce the risk of accidents between vehicles and pedestrians." } },
  { title: { id: "Peningkatan Kualitas Lalu Lintas", en: "Improved Traffic Quality" }, desc: { id: "Dengan membatasi kendaraan ke jalur yang sesuai, kanstin membantu menjaga aliran lalu lintas tetap teratur dan mengurangi risiko tabrakan.", en: "By keeping vehicles in their appropriate lanes, curbs help maintain orderly traffic flow and reduce the risk of collisions." } },
  { title: { id: "Stabilitas Permukaan", en: "Surface Stability" }, desc: { id: "Kanstin membantu menjaga stabilitas permukaan jalan atau trotoar dengan menahan tekanan dari lalu lintas dan mencegah pergeseran tanah atau material di bawahnya.", en: "Curbs help maintain the stability of the road or sidewalk surface by withstanding traffic pressure and preventing soil or material shifts beneath them." } },
  { title: { id: "Pemasangan Infrastruktur Tambahan", en: "Additional Infrastructure Mounting" }, desc: { id: "Kanstin dapat digunakan sebagai landasan untuk pemasangan infrastruktur tambahan seperti lampu jalan, rambu lalu lintas, atau papan penanda.", en: "Curbs can be used as a base for installing additional infrastructure such as street lights, traffic signs, or marker boards." } },
];

// ─────────────────────────────────────────────
// DATA: KEUNGGULAN (dulu layanan)
// ─────────────────────────────────────────────
const keunggulanKanstin = [
  { icon: IconMapPin, title: { id: "Survey Lokasi", en: "Site Survey" }, desc: { id: "Survey lokasi dilakukan oleh team work yang ramah dan informatif", en: "Site survey is conducted by a friendly and informative team" } },
  { icon: IconAward, title: { id: "Standar Tinggi", en: "High Standards" }, desc: { id: "Pengerjaan dilakukan dengan standar tinggi sehingga hasil sesuai harapan", en: "Work is carried out to high standards so the results meet expectations" } },
  { icon: IconTruck, title: { id: "Alat Berat Modern", en: "Modern Heavy Equipment" }, desc: { id: "Alat berat modern untuk memaksimalkan hasil akhir", en: "Modern heavy equipment to maximize the final result" } },
  { icon: IconUsers, title: { id: "Tenaga Profesional", en: "Professional Crew" }, desc: { id: "Pengerjaan dilakukan oleh tenaga kerja profesional yang sudah berpengalaman", en: "Work is carried out by experienced and professional crews" } },
];

// ─────────────────────────────────────────────
// AREA JANGKAUAN
// ─────────────────────────────────────────────
const areaJangkauan = [
  { region: "DKI Jakarta", kota: ["Jakarta Barat", "Jakarta Utara", "Jakarta Pusat", "Jakarta Timur", "Jakarta Selatan"], kabupaten: ["Kepulauan Seribu"] },
  { region: "Jawa Barat", kota: ["Bandung", "Bekasi", "Bogor", "Depok", "Cimahi", "Sukabumi", "Tasikmalaya", "Banjar", "Cirebon"], kabupaten: ["Bandung", "Bandung Barat", "Bekasi", "Bogor", "Cianjur", "Cirebon", "Garut", "Indramayu", "Karawang", "Kuningan", "Majalengka", "Pangandaran", "Purwakarta", "Subang", "Sukabumi", "Sumedang", "Tasikmalaya", "Ciamis"] },
  { region: "Banten", kota: ["Serang", "Tangerang", "Tangerang Selatan", "Cilegon"], kabupaten: ["Lebak", "Pandeglang", "Serang", "Tangerang"] },
  { region: "Jawa Tengah", kota: ["Semarang", "Pekalongan", "Tegal", "Magelang", "Salatiga", "Surakarta (Solo)"], kabupaten: ["Banjarnegara", "Banyumas", "Batang", "Blora", "Boyolali", "Brebes", "Cilacap", "Demak", "Grobogan", "Jepara", "Karanganyar", "Kebumen", "Kendal", "Klaten", "Kudus", "Magelang", "Pati", "Pekalongan", "Pemalang", "Purbalingga", "Purworejo", "Rembang", "Semarang", "Sragen", "Sukoharjo", "Tegal", "Temanggung", "Wonogiri", "Wonosobo"] },
  { region: "DI Yogyakarta", kota: ["Yogyakarta"], kabupaten: ["Bantul", "Gunungkidul", "Kulon Progo", "Sleman"] },
  { region: "Jawa Timur", kota: ["Surabaya", "Malang", "Madiun", "Kediri", "Blitar", "Banyuwangi", "Probolinggo", "Pasuruan", "Mojokerto", "Batu"], kabupaten: ["Bangkalan", "Banyuwangi", "Blitar", "Bojonegoro", "Bondowoso", "Gresik", "Jember", "Jombang", "Kediri", "Lamongan", "Madiun", "Lumajang", "Magetan", "Pacitan", "Malang", "Mojokerto", "Nganjuk", "Ngawi", "Pamekasan", "Pasuruan", "Ponorogo", "Probolinggo", "Sampang", "Sidoarjo", "Situbondo", "Sumenep", "Trenggalek", "Tuban", "Tulungagung"] },
  { region: "Bangka Belitung", kota: ["Pangkal Pinang"], kabupaten: ["Bangka", "Bangka Barat", "Bangka Selatan", "Bangka Tengah", "Belitung", "Belitung Timur"] },
  { region: "Bali", kota: ["Denpasar"], kabupaten: ["Badung", "Bangli", "Buleleng", "Gianyar", "Jembrana", "Karangasem", "Klungkung", "Tabanan"] },
];

// ─────────────────────────────────────────────
// SECTION KICKER
// ─────────────────────────────────────────────
function SectionKicker({ children }) {
  return (
    <div className="inline-flex items-center gap-2.5 sm:gap-3 mb-3">
      <span className="w-6 sm:w-8 h-px bg-[#1e88e5]" aria-hidden="true" />
      <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#1e88e5] font-semibold">{children}</span>
      <span className="w-6 sm:w-8 h-px bg-[#1e88e5]" aria-hidden="true" />
    </div>
  );
}

// ─────────────────────────────────────────────
// KONTEN BILINGUAL
// ─────────────────────────────────────────────
const content = {
  id: {
    heroKicker: "Layanan Kami",
    heroTitle: "Pasang Kanstin",
    heroSubtitle: "untuk Trotoar, Taman, DKI, dan S — Presisi, Rapi & Tahan Lama.",
    heroDesc: "Jasa pasang kanstin berkualitas untuk jalan, trotoar, taman, kawasan industri, hingga proyek pemerintah. Kualitas SNI, presisi, armada lengkap, dan gratis survei lokasi.",
    figKicker: "Proyek",
    figAlt: "Pasang Kanstin",
    figCaption: "Pemasangan Kanstin — Tri Abadi Makmur",
    priceKicker: "Paket Harga",
    priceTitleLight: "Harga Jasa ",
    priceTitleBold: "Pasang Kanstin & Kansteen",
    priceDesc: "Pilih jenis kanstin (taman, trotoar, DKI, S) sesuai kebutuhan — harga per pcs.",
    introTitle: "Jasa Pasang Kanstin Presisi & Tahan Lama",
    introP1: "— didukung tenaga konstruksi berpengalaman serta material kanstin berkualitas untuk hasil pemasangan yang rapi, presisi, dan tahan lama.",
    introP2Prefix: "Dari tim kontraktor ",
    introP2Mid: ", kami melayani pemasangan kanstin untuk trotoar, taman, jalan perumahan, hingga kawasan industri — dengan standar pengerjaan yang konsisten.",
    infoKicker: "Informasi",
    infoTitleLight: "Mengenal ",
    infoTitleBold: "Kanstin",
    infoP1: "Kanstin atau kansteen adalah elemen beton yang berbentuk seperti pembatas di antara bahu jalan, trotoar, dan area lainnya. Biasanya kanstin berbentuk persegi panjang dengan permukaan yang rata.",
    infoP2: "Pemasangan kanstin dianggap penting karena memiliki banyak fungsi vital dalam tata kota dan infrastruktur jalan. Dengan pemasangan yang benar, kanstin membantu menciptakan batas fisik yang jelas, keamanan pejalan kaki, dan sistem drainase yang lebih baik.",
    funcAccTitle: "Fungsi Kanstin",
    articleKicker: "Informasi & Edukasi",
    articleTitleLight: "Butuh wawasan seputar ",
    articleTitleBold: "Konstruksi & Kanstin?",
    articleDesc: "Jangan lewatkan artikel dan tips terbaru dari kami seputar pemasangan kanstin, pembuatan trotoar, dan perawatan infrastruktur jalan.",
    articleBtn: "Lihat Semua Artikel",
    faqTitle: "Pertanyaan Seputar Pasang Kanstin",
    faqItems: [
      { q: "Berapa harga jasa pasang kanstin per meter?", a: "Harga kanstin berkisar Rp 17.000 – Rp 62.000 per pcs tergantung jenis (taman, trotoar, DKI, S) dan dimensinya. Untuk penawaran akurat, kami lakukan survey lokasi gratis terlebih dahulu. Lihat rincian lengkap di tabel harga bagian atas halaman ini." },
      { q: "Apakah bisa survey lokasi dulu sebelum order?", a: "Ya, gratis. Tim kami akan mengukur area, cek kondisi tanah, dan memberikan estimasi biaya yang akurat. Survey bisa dijadwalkan via WhatsApp." },
      { q: "Berapa lama proses pemasangan kanstin?", a: "Tergantung panjang area. Untuk 100 m¹ standar, biasanya 2–3 hari kerja. Setelah survey, kami berikan estimasi waktu yang lebih akurat." },
      { q: "Apa beda kanstin taman, trotoar, DKI, dan S?", a: "Taman: ukuran kecil, untuk area taman. Trotoar: sedang, untuk pedestrian. DKI: besar & kokoh, standar jalan raya. S: bentuk melengkung, untuk dekorasi & pembatas." },
      { q: "Apakah ada garansi pengerjaan?", a: "Ya, garansi pemasangan hingga 2 tahun untuk mutu dan kerapian hasil kerja, tergantung jenis pekerjaan dan kondisi lapangan." },
      { q: "Berapa minimal order pemasangan kanstin?", a: "Minimal order menyesuaikan jenis kanstin dan lokasi. Detail dikonsultasikan via WhatsApp untuk memastikan efisiensi pengerjaan." },
    ],
    faqLinkText: "Butuh simulasi volume & estimasi biaya? Konsultasikan dengan tim kami.",
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
    ctaWaMessage: "Halo Tri Abadi Makmur, saya ingin konsultasi estimasi biaya & survey pasang kanstin untuk lokasi di...",
  },
  en: {
    heroKicker: "Our Services",
    heroTitle: "Curb Installation",
    heroSubtitle: "for Sidewalks, Gardens, DKI, and S Types — Precise, Neat & Durable.",
    heroDesc: "Quality curb installation services for roads, sidewalks, gardens, industrial areas, up to government projects. SNI quality, precise, and free site survey.",
    figKicker: "Project",
    figAlt: "Curb Installation",
    figCaption: "Curb Installation — Tri Abadi Makmur",
    priceKicker: "Price Packages",
    priceTitleLight: "Curb Installation ",
    priceTitleBold: "Service Pricing",
    priceDesc: "Choose the curb type (garden, sidewalk, DKI, S) according to your needs — price per pcs.",
    introTitle: "Precise & Durable Curb Installation",
    introP1: "— backed by experienced construction crews and quality curb materials for neat, precise, and durable installation results.",
    introP2Prefix: "From the contractor team ",
    introP2Mid: ", we serve curb installation for sidewalks, gardens, residential roads, up to industrial areas — with consistent work standards.",
    infoKicker: "Information",
    infoTitleLight: "Getting to Know ",
    infoTitleBold: "Curbs",
    infoP1: "A curb or kansteen is a concrete element shaped like a barrier between the road shoulder, sidewalk, and other areas. Curbs are usually rectangular with a flat surface.",
    infoP2: "Curb installation is considered important because it has many vital functions in urban planning and road infrastructure. With proper installation, curbs help create clear physical boundaries, pedestrian safety, and a better drainage system.",
    funcAccTitle: "Functions of Curbs",
    articleKicker: "Information & Education",
    articleTitleLight: "Need insights on ",
    articleTitleBold: "Construction & Curb Installation?",
    articleDesc: "Don't miss our latest articles and tips about curb installation, sidewalk construction, and road infrastructure maintenance.",
    articleBtn: "View All Articles",
    faqTitle: "Frequently Asked Questions About Curb Installation",
    faqItems: [
      { q: "How much does curb installation cost per meter?", a: "Curb prices range from Rp 17,000 – Rp 62,000 per pcs depending on the type (garden, sidewalk, DKI, S) and dimensions. For an accurate quote, we conduct a free site survey first. See the full price breakdown in the price table at the top of this page." },
      { q: "Can I have a site survey before ordering?", a: "Yes, free of charge. Our team will measure the area, check soil conditions, and give an accurate estimate. Survey can be scheduled via WhatsApp." },
      { q: "How long does curb installation take?", a: "Depends on area length. For a standard 100 m¹, usually 2–3 working days. After survey, we will give a more accurate time estimate." },
      { q: "What is the difference between garden, sidewalk, DKI, and S curbs?", a: "Garden: small size, for garden areas. Sidewalk: medium, for pedestrians. DKI: large & sturdy, road standard. S: curved shape, for decoration & barriers." },
      { q: "Is there a work warranty?", a: "Yes, up to a 2-year installation warranty for quality and neatness, depending on work type and site conditions." },
      { q: "What is the minimum order for curb installation?", a: "Minimum order depends on the curb type and location. Details are consulted via WhatsApp to ensure installation efficiency." },
    ],
    faqLinkText: "Need a volume & cost simulation? Consult with our team.",
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
    ctaWaMessage: "Hello Tri Abadi Makmur, I would like to consult curb installation cost & site survey in...",
  },
};

// ─────────────────────────────────────────────
// SUB-KOMPONEN
// ─────────────────────────────────────────────
const FungsiItem = memo(function FungsiItem({ item, t }) {
  return (
    <li>
      <div className="flex items-center gap-2 mb-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#1e88e5] shrink-0" />
        <h4 className="font-semibold text-slate-900" style={{ fontSize: "clamp(0.78125rem, 1.4vw, 0.84375rem)" }}>{t(item.title)}</h4>
      </div>
      <p className="text-slate-600 leading-[1.85] pl-3.5" style={{ fontSize: "clamp(0.78125rem, 1.4vw, 0.84375rem)" }}>{t(item.desc)}</p>
    </li>
  );
});

const KeunggulanCard = memo(function KeunggulanCard({ item, t }) {
  const Icon = item.icon || IconCheck;
  return (
    <div className="flex items-start gap-3 sm:gap-3.5">
      <span className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#1e88e5]/10 text-[#1e88e5] flex items-center justify-center">
        <Icon className="w-4 h-4" />
      </span>
      <div className="min-w-0">
        <div className="text-slate-900 font-semibold leading-snug" style={{ fontSize: "clamp(0.78125rem, 1.4vw, 0.84375rem)" }}>{t(item.title)}</div>
        <div className="text-slate-500 leading-snug mt-1" style={{ fontSize: "clamp(0.71875rem, 1.3vw, 0.75rem)" }}>{t(item.desc)}</div>
      </div>
    </div>
  );
});

const AreaRow = memo(function AreaRow({ area, data }) {
  return (
    <div style={{ contain: "layout paint style" }}>
      <div className="flex items-center gap-3 mb-4">
        <span className="w-4 h-px bg-[#1e88e5]" />
        <h3 className="text-[11.5px] sm:text-[12.5px] uppercase tracking-[0.2em] sm:tracking-[0.22em] text-[#1e88e5] font-bold">{area.region}</h3>
        <span className="flex-1 h-px bg-slate-200" />
      </div>
      <div className="space-y-3 pl-1">
        {area.kota && area.kota.length > 0 && (
          <div className="flex items-start gap-2.5 sm:gap-3">
            <span className="shrink-0 mt-[3px] text-[9.5px] sm:text-[10px] uppercase tracking-wider font-bold text-slate-400 w-[50px] sm:w-[60px]">{data.areaCity}</span>
            <div className="flex flex-wrap gap-1.5 flex-1">
              {area.kota.map((k, i) => (
                <span key={i} className="inline-block px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-[#1e88e5]/5 border border-[#1e88e5]/20 text-[10.5px] sm:text-[11px] text-[#1565c0] font-medium">{k}</span>
              ))}
            </div>
          </div>
        )}
        {area.kabupaten && area.kabupaten.length > 0 && (
          <div className="flex items-start gap-2.5 sm:gap-3">
            <span className="shrink-0 mt-[3px] text-[9.5px] sm:text-[10px] uppercase tracking-wider font-bold text-slate-400 w-[50px] sm:w-[60px]">{data.areaRegency}</span>
            <div className="flex flex-wrap gap-1.5 flex-1">
              {area.kabupaten.map((k, i) => (
                <span key={i} className="inline-block px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-white border border-slate-200 text-[10.5px] sm:text-[11px] text-slate-600">{k}</span>
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
export default function PasangKanstin() {
  const { lang } = useLang();
  const data = content[lang] || content.id;

  const t = useCallback((field) => {
    if (!field) return "";
    if (typeof field === "string") return field;
    return field[lang] || field.id || field.en || "";
  }, [lang]);

  const [showArea, setShowArea] = useState(false);
  const waHref = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(data.ctaWaMessage)}`;

  return (
    <div className="bg-slate-50/50">

      {/* ═══════ HERO (tanpa CTA, seperti beton) ═══════ */}
      <section className="pt-32 lg:pt-40 pb-12 lg:pb-16 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
          <Reveal delay={0} y={20}>
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="w-8 sm:w-12 h-px bg-[#1e88e5]" aria-hidden="true" />
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#1e88e5] font-bold">{data.heroKicker}</span>
              <span className="w-8 sm:w-12 h-px bg-[#1e88e5]" aria-hidden="true" />
            </div>
          </Reveal>

          <Reveal delay={80} y={30}>
            <h1 className="font-light tracking-tight text-slate-900 leading-[1.1] mb-6" style={{ fontSize: "clamp(2.25rem, 6vw, 4rem)" }}>
              {data.heroTitle}<span className="text-[#1e88e5]">.</span>
            </h1>
            {data.heroSubtitle && (
              <p className="text-slate-600 max-w-2xl mx-auto mt-4 mb-6" style={{ fontSize: "clamp(0.9375rem, 1.8vw, 1.125rem)" }}>
                {data.heroSubtitle}
              </p>
            )}
          </Reveal>

          <Reveal delay={160} y={24}>
            <p className="text-slate-600 leading-relaxed max-w-2xl mx-auto" style={{ fontSize: "clamp(0.9375rem, 1.6vw, 1.0625rem)" }}>
              {data.heroDesc}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══════ KONTEN ═══════ */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">

          {/* Foto utama */}
          <Reveal y={40} duration={800}>
            <figure className="relative rounded-2xl overflow-hidden bg-slate-100 mb-10 shadow-xl shadow-slate-200/50 ring-1 ring-slate-900/5">
              <div className="aspect-[16/10]">
                <img
                  src="/proyek/pasang-kanstin.webp"
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
              <figcaption className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/90 to-transparent px-5 sm:px-8 py-5 sm:py-8 pt-16 sm:pt-20">
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="w-6 sm:w-8 h-px bg-[#4da3ff]" aria-hidden="true" />
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] sm:tracking-[0.28em] text-[#4da3ff] font-bold">{data.figKicker}</span>
                </div>
                <p className="text-white font-semibold text-lg sm:text-xl" style={{ fontSize: "clamp(0.9375rem, 1.5vw, 1.125rem)" }}>
                  {data.figCaption}
                </p>
              </figcaption>
            </figure>
          </Reveal>
        </div>

        {/* ═══════ PANEL HARGA (seperti beton, tanpa hideCta) ═══════ */}
        <div className="mt-8 lg:mt-12 mb-16">
          <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
            <Reveal y={26}>
              <div className="text-center mb-10">
                <SectionKicker>{data.priceKicker}</SectionKicker>
                <h2 className="font-light tracking-tight text-slate-900 leading-tight max-w-2xl mx-auto" style={{ fontSize: "clamp(1.5rem, 3.5vw, 2rem)" }}>
                  {data.priceTitleLight}<span className="font-bold">{data.priceTitleBold}</span>
                </h2>
                <p className="text-slate-500 mt-4 max-w-xl mx-auto" style={{ fontSize: "clamp(0.875rem, 1.4vw, 0.9375rem)" }}>
                  {data.priceDesc}
                </p>
              </div>
            </Reveal>
            <Reveal y={34} delay={80}>
              <KanstinPricingPanel />
            </Reveal>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">

          {/* Pengantar */}
          <Reveal delay={100} y={24}>
            <div className="max-w-3xl mb-14">
              <p className="text-slate-700 leading-[1.9] mb-5" style={{ fontSize: "clamp(0.9375rem, 1.6vw, 1rem)" }}>
                <span className="font-bold text-slate-900 text-lg sm:text-xl block mb-2">{data.introTitle}</span>{" "}
                {data.introP1}
              </p>
              <p className="text-slate-700 leading-[1.9]" style={{ fontSize: "clamp(0.9375rem, 1.6vw, 1rem)" }}>
                {data.introP2Prefix}<span className="font-bold text-slate-900">PT Tri Abadi Makmur</span>{data.introP2Mid}
              </p>
            </div>
          </Reveal>

          {/* MENGENAL KANSTIN (info section ala beton) */}
          <div className="mb-16">
            <Reveal y={26}>
              <div className="text-center mb-10">
                <SectionKicker>{data.infoKicker}</SectionKicker>
                <h2 className="font-light tracking-tight text-slate-900 leading-tight" style={{ fontSize: "clamp(1.5rem, 3.5vw, 2rem)" }}>
                  {data.infoTitleLight}<span className="font-bold">{data.infoTitleBold}</span>
                </h2>
              </div>
            </Reveal>

            <Reveal delay={100} y={22}>
              <div className="max-w-3xl mx-auto text-center space-y-5 mb-12">
                <p className="text-slate-600 leading-[1.85]" style={{ fontSize: "clamp(0.9375rem, 1.6vw, 1rem)" }}>
                  {data.infoP1}
                </p>
                <p className="text-slate-600 leading-[1.85]" style={{ fontSize: "clamp(0.9375rem, 1.6vw, 1rem)" }}>
                  {data.infoP2}
                </p>
              </div>
            </Reveal>

            {/* Keunggulan Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5 mb-12">
              {keunggulanKanstin.map((item, i) => (
                <Reveal key={i} delay={i * 100} y={24}>
                  <KeunggulanCard item={item} t={t} />
                </Reveal>
              ))}
            </div>
          </div>

          {/* ACCORDION: FUNGSI KANSTIN (defaultOpen=false seperti beton) */}
          <Reveal y={24}>
            <Accordion title={data.funcAccTitle} defaultOpen={false}>
              <ul className="space-y-5">
                {fungsiKanstin.map((f, i) => (
                  <FungsiItem key={i} item={f} t={t} />
                ))}
              </ul>
            </Accordion>
          </Reveal>

          {/* ═══════ SECTION ARTIKEL BLOG ═══════ */}
          <Reveal y={30}>
            <div className="mt-10 sm:mt-12 p-6 sm:p-10 bg-white border border-slate-100 rounded-2xl shadow-sm text-center max-w-3xl mx-auto relative overflow-hidden group hover:shadow-md transition-shadow duration-300">
              <div className="relative z-10">
                <SectionKicker>{data.articleKicker}</SectionKicker>
                <h3 className="text-slate-900 tracking-tight mb-4" style={{ fontSize: "clamp(1.25rem, 3vw, 1.75rem)" }}>
                  <span className="font-light">{data.articleTitleLight}</span>
                  <span className="font-bold">{data.articleTitleBold}</span>
                </h3>
                <p className="text-slate-600 mx-auto mb-8 max-w-xl leading-relaxed" style={{ fontSize: "clamp(0.875rem, 1.6vw, 1rem)" }}>
                  {data.articleDesc}
                </p>
                <Link
                  href="/blog"
                  className="inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl bg-[#1e88e5] text-white font-bold tracking-wide transition-all duration-300 shadow-lg shadow-[#1e88e5]/30 hover:shadow-[#1e88e5]/50 hover:-translate-y-1 hover:bg-[#1976d2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e88e5] focus-visible:ring-offset-2"
                  style={{ fontSize: "clamp(0.8125rem, 1.4vw, 0.9375rem)" }}
                >
                  <IconArticle className="w-5 h-5" />
                  {data.articleBtn}
                  <IconArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          </Reveal>

          {/* ═══════ FAQ (pakai <details> seperti beton) ═══════ */}
          <div className="mt-16 mb-16">
            <Reveal y={26}>
              <div className="text-center mb-10">
                <SectionKicker>FAQ</SectionKicker>
                <h2 className="font-light tracking-tight text-slate-900 leading-tight" style={{ fontSize: "clamp(1.5rem, 3.5vw, 2rem)" }}>
                  {lang === "en" ? "Frequently Asked " : "Pertanyaan Seputar "}
                  <span className="font-bold">{lang === "en" ? "Questions" : "Pasang Kanstin"}</span>
                </h2>
              </div>
            </Reveal>

            <div className="max-w-3xl mx-auto space-y-4">
              {data.faqItems.map((faq, i) => (
                <Reveal key={i} delay={i * 60} y={20}>
                  <details className="group border border-slate-200 rounded-xl bg-white overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex items-center justify-between cursor-pointer p-5 sm:p-6 font-semibold text-slate-900 hover:text-[#1e88e5] transition-colors">
                      <span>{faq.q}</span>
                      <span className="shrink-0 ml-4 transition-transform duration-300 group-open:-rotate-180">
                        <IconChevron />
                      </span>
                    </summary>
                    <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-slate-600 leading-relaxed border-t border-slate-100 pt-4"
                         style={{ fontSize: "clamp(0.875rem, 1.6vw, 0.9375rem)" }}>
                      {faq.a}
                    </div>
                  </details>
                </Reveal>
              ))}
            </div>

            <Reveal delay={200}>
              <div className="text-center mt-8">
                <a href={waHref} target="_blank" rel="noopener noreferrer"
                   className="inline-flex items-center gap-2 text-[#1e88e5] font-semibold hover:underline">
                  {data.faqLinkText} <IconArrowRight className="w-4 h-4" />
                </a>
              </div>
            </Reveal>
          </div>

          {/* ═══════ AREA JANGKAUAN ═══════ */}
          <div className="mt-12 sm:mt-16 mb-16">
            <Reveal y={26}>
              <div className="text-center mb-8">
                <SectionKicker>{data.areaKicker}</SectionKicker>
                <h2 className="font-light tracking-tight text-slate-900 leading-tight" style={{ fontSize: "clamp(1.5rem, 3.5vw, 2rem)" }}>
                  {data.areaTitleLight}<span className="font-bold">{data.areaTitleBold}</span>
                </h2>
                <p className="text-slate-500 mt-4 max-w-xl mx-auto" style={{ fontSize: "clamp(0.875rem, 1.4vw, 0.9375rem)" }}>
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
                className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 bg-white border border-slate-200 rounded-xl cursor-pointer hover:border-[#1e88e5] hover:shadow-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1e88e5]"
              >
                <span className={`font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] ${showArea ? "text-[#1e88e5]" : "text-slate-700"}`}
                  style={{ fontSize: "clamp(0.8125rem, 1.5vw, 0.9375rem)" }}>
                  {data.areaToggle}
                </span>
                <span className={`shrink-0 px-4 py-1.5 rounded-full border font-bold uppercase tracking-[0.15em] transition-colors duration-150
                    ${showArea ? "bg-[#1e88e5] text-white border-[#1e88e5]" : "bg-slate-50 text-slate-500 border-slate-200"}`}
                  style={{ fontSize: "clamp(0.625rem, 1vw, 0.6875rem)" }}>
                  {showArea ? (lang === "en" ? "Close" : "Tutup") : (lang === "en" ? "Open" : "Buka")}
                </span>
              </button>

              {showArea && (
                <div className="mt-6 space-y-4">
                  {areaJangkauan.map((area, idx) => (
                    <Reveal key={idx} delay={idx * 40} y={16}>
                      <AreaRow area={area} data={data} />
                    </Reveal>
                  ))}
                </div>
              )}
            </Reveal>
          </div>

          {/* ═══════ CTA PREMIUM ═══════ */}
          <Reveal y={34}>
            <div className="mt-10 sm:mt-14 p-8 sm:p-12 bg-slate-900 rounded-3xl text-center max-w-3xl mx-auto shadow-2xl shadow-slate-900/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#1e88e5] rounded-full blur-3xl opacity-20 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-[#25D366] rounded-full blur-3xl opacity-10 pointer-events-none"></div>
              <div className="relative z-10">
                <p className="text-[#4da3ff] text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-bold mb-4">{data.ctaKicker}</p>
                <h3 className="text-white font-light tracking-tight mb-8" style={{ fontSize: "clamp(1.25rem, 3vw, 1.75rem)" }}>
                  {data.ctaTitleLight}<span className="font-bold">{data.ctaTitleBold}</span>
                </h3>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={data.ctaBtn}
                  className="inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-4 min-h-[48px] rounded-xl bg-[#25D366] text-white hover:bg-[#20bd5a] font-bold uppercase tracking-[0.1em] sm:tracking-[0.15em] shadow-lg shadow-[#25D366]/30 hover:shadow-[#25D366]/50 hover:-translate-y-0.5 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
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