// src/components/Projects.jsx
"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { createPortal } from "react-dom";
import { useLang } from "../context/LanguageContext";

const ITEMS_PER_PAGE = 12;

// ─────────────────────────────────────────────
// DAFTAR FOTO PENGERJAAN LENGKAP (Teraudit & Rapi)
// category : "aspal" | "paving" | "panel" | "beton"
// ─────────────────────────────────────────────
const rawProjects = [
  { id: 1, src: "/proyek/proyek-1.webp", category: "aspal", desc: "Proses pengaspalan hotmix area parkir dan akses showroom mobil — permukaan rata dan rapi", location: "Bandung Barat" },
  { id: 3, src: "/proyek/proyek-3.webp", category: "panel", desc: "Penurunan pagar panel beton precast — susunan rapi, kokoh, dan siap pakai", location: "Pelabuhan Marunda Center" },
  { id: 5, src: "/proyek/proyek-5.webp", category: "panel", desc: "Pemasangan pagar panel beton precast — susunan rapi, kokoh, dan siap pakai", location: "Pelabuhan Tegar Indonesia" },
  { id: 8, src: "/proyek/proyek-8.webp", category: "beton", desc: "Pengukuran slump beton cor — kontrol workability sebelum pengecoran", location: "Cilangkap" },
  { id: 9, src: "/proyek/proyek-9.webp", category: "beton", desc: "Pengiriman beton ready mix — distribusi material sebelum pengecoran", location: "Bogor" },
  { id: 10, src: "/proyek/proyek-10.webp", category: "beton", desc: "Hasil pengecoran lantai beton ready mix — rata, padat, dan siap digunakan", location: "Bogor" },
  { id: 11, src: "/proyek/proyek-11.webp", category: "beton", desc: "Proses pengecoran beton ready mix — finishing menggunakan trowel untuk permukaan rata dan halus", location: "Bogor" },
  { id: 13, src: "/proyek/proyek-13.webp", category: "beton", desc: "Hasil pengecoran pile cap beton ready mix — padat, rapi, dan siap pekerjaan struktur", location: "Bogor" },
  { id: 14, src: "/proyek/proyek-14.webp", category: "beton", desc: "Proses pengecoran beton ready mix — padat, rata, dan siap lanjut pekerjaan", location: "Bogor" },
  { id: 16, src: "/proyek/proyek-16.webp", category: "aspal", desc: "Proses pengaspalan hotmix area akses masuk Hotel Da Vinci — permukaan rata dan rapi", location: "Jakarta Pusat" },
  { id: 17, src: "/proyek/proyek-17.webp", category: "aspal", desc: "Proses pengaspalan hotmix area dudukan tangki Pertamina — permukaan rata dan rapi", location: "Semarang" },
  { id: 19, src: "/proyek/proyek-19.webp", category: "aspal", desc: "Proses pemadatan pengaspalan hotmix dengan alat combination roller — padat dan rata", location: "Lebak Bulus" },
  { id: 21, src: "/proyek/proyek-21.webp", category: "aspal", desc: "Proses pemadatan pengaspalan hotmix dengan alat combination roller di Komplek Vila Delima — padat dan rata", location: "Jakarta Selatan" },
  { id: 23, src: "/proyek/proyek-23.webp", category: "aspal", desc: "Pengiriman combination roller roda tiga untuk pengaspalan hotmix — armada siap digunakan di lokasi", location: "Cinere" },
  { id: 25, src: "/proyek/proyek-25.webp", category: "aspal", desc: "Pemadatan hotmix dengan baby roller di area pabrik cat Propan — padat, rata, dan sesuai elevasi", location: "Cikupa, Tangerang" },
  { id: 26, src: "/proyek/proyek-26.webp", category: "aspal", desc: "Proses pengerjaan penggelaran pengaspalan hotmix — finishing permukaan rata dan halus", location: "Cikupa, Tangerang" },
  { id: 27, src: "/proyek/proyek-27.webp", category: "aspal", desc: "Pengaspalan hotmix area masuk dan parkir Hotel Kempinski — permukaan rata, rapi, dan siap pakai", location: "Jakarta Pusat" },
  { id: 29, src: "/proyek/proyek-29.webp", category: "aspal", desc: "Pengaspalan hotmix area akses masuk Hotel Kempinski — permukaan rata, rapi, dan siap pakai", location: "Jakarta Pusat" },
  { id: 30, src: "/proyek/proyek-30.webp", category: "aspal", desc: "Proses penggelaran pengaspalan hotmix di area Perumahan Sevilage — permukaan rata dan rapi", location: "Bogor" },
  { id: 31, src: "/proyek/proyek-31.webp", category: "aspal", desc: "Proses pemadatan pengaspalan hotmix dengan alat combination roller — padat dan rata", location: "Bogor" },
  { id: 32, src: "/proyek/proyek-32.webp", category: "aspal", desc: "Proses pemadatan pengaspalan hotmix dengan alat baby roller — padat dan rata", location: "Bogor" },
  { id: 34, src: "/proyek/proyek-34.webp", category: "aspal", desc: "Pengiriman alat berat combination roller ke lokasi Perumahan Sevilage — armada siap digunakan untuk pengaspalan", location: "Bogor" },
  { id: 35, src: "/proyek/proyek-35.webp", category: "paving", desc: "Proses pemasangan paving block area jalan Perumahan Cibeureum — susunan rapi, rata, dan terkunci baik", location: "Bandung" },
  { id: 37, src: "/proyek/proyek-37.webp", category: "paving", desc: "Hasil pemasangan grass block untuk jalan perumahan — rata, rapi, dan siap pakai", location: "Bandung" },
  { id: 38, src: "/proyek/proyek-38.webp", category: "paving", desc: "Hasil pemasangan paving block untuk kompleks perumahan — rata, rapi, dan siap pakai", location: "Depok" },
  { id: 40, src: "/proyek/proyek-40.webp", category: "paving", desc: "Proses pemasangan paving hexagon untuk jalan perumahan cluster baru — permukaan rata dan rapi", location: "Cibubur" },
  { id: 42, src: "/proyek/proyek-42.webp", category: "panel", desc: "Workshop tiang pancang — stok siap pakai dan siap dikirim ke lokasi proyek", location: "Balaraja" },
  { id: 43, src: "/proyek/proyek-43.webp", category: "beton", desc: "Proses pemasangan bekisting dan pembesian pile cap", location: "Bekasi" },
  { id: 44, src: "/proyek/proyek-44.webp", category: "beton", desc: "Proses pengecoran pile cap beton struktur", location: "Bekasi" },
  { id: 45, src: "/proyek/proyek-45.webp", category: "beton", desc: "Pengecoran struktur atap dan pemasangan railing motif — siap lanjut ke tahap finishing", location: "Karawang" },
  { id: 55, src: "/proyek/proyek-55.webp", category: "aspal", desc: "Workshop aspal bakar — stok siap pakai dan siap dikirim ke lokasi proyek", location: "Balaraja" },
  { id: 56, src: "/proyek/proyek-56.webp", category: "aspal", desc: "Proses pemadatan aspal hotmix menggunakan baby roller", location: "Pamulang, Tangerang Selatan" },
  { id: 57, src: "/proyek/proyek-57.webp", category: "aspal", desc: "Proses pengaspalan hotmix di area akses gedung perkantoran", location: "Bendungan Hilir" },
  { id: 58, src: "/proyek/proyek-58.webp", category: "aspal", desc: "Proses pengaspalan hotmix di area pabrik forklift", location: "Cibitung" },
  { id: 59, src: "/proyek/proyek-59.webp", category: "aspal", desc: "Proses pemadatan pengaspalan hotmix dengan alat combination roller di pabrik forklift", location: "Cibitung" },
  { id: 60, src: "/proyek/proyek-60.webp", category: "beton", desc: "Proses pengecoran beton ready mix", location: "Jakarta Barat" },
  { id: 62, src: "/proyek/proyek-62.webp", category: "beton", desc: "Proses pengecoran beton ready mix area lapangan", location: "Serpong" },
  { id: 64, src: "/proyek/proyek-64.webp", category: "beton", desc: "Hasil pengecoran beton ready mix — permukaan rata dan kokoh", location: "Cikarang" },
  { id: 65, src: "/proyek/proyek-65.webp", category: "beton", desc: "Workshop buis beton cor lingkaran siap kirim", location: "Balaraja" },
  { id: 66, src: "/proyek/proyek-66.webp", category: "beton", desc: "Stok produksi buis beton cor lingkaran di workshop", location: "Balaraja" },
  { id: 67, src: "/proyek/proyek-67.webp", category: "beton", desc: "Proses pengecoran beton ready mix sloof pondasi", location: "Bekasi" },
  { id: 69, src: "/proyek/proyek-69.webp", category: "panel", desc: "Proses fabrikasi dan produksi pagar panel beton", location: "Depok" },
  { id: 70, src: "/proyek/proyek-70.webp", category: "aspal", desc: "Hasil pengaspalan hotmix area lobby Gedung RKP", location: "Tanah Abang" },
  { id: 71, src: "/proyek/proyek-71.webp", category: "panel", desc: "Proses pemasangan tiang pancang proyek infrastruktur", location: "Tol Jakarta-Cikampek" },
  { id: 72, src: "/proyek/proyek-72.webp", category: "panel", desc: "Proses pemasangan tiang pancang dengan alat counterweight mesin pancang hidrolik", location: "Tangerang Selatan" },
  { id: 73, src: "/proyek/proyek-73.webp", category: "panel", desc: "Proses pemancangan tiang dengan alat counterweight mesin pancang hidrolik", location: "Subang" },
  { id: 74, src: "/proyek/proyek-74.webp", category: "panel", desc: "Proses penyambungan dan pengelasan tiang pancang", location: "Tangerang" },
  { id: 75, src: "/proyek/proyek-75.webp", category: "beton", desc: "Proses pengangkatan beban counterweight mesin pancang hidrolik menggunakan excavator", location: "Jakarta Barat" },
  { id: 77, src: "/proyek/proyek-77.webp", category: "beton", desc: "Proses pengerukan dan perataan tanah menggunakan excavator", location: "Depok" },
  { id: 78, src: "/proyek/proyek-78.webp", category: "panel", desc: "Workshop produksi tiang pancang beton", location: "Karawang" },
  { id: 79, src: "/proyek/proyek-79.webp", category: "panel", desc: "Pengiriman alat counterweight mesin pancang hidrolik ke lokasi", location: "Bekasi" },
  { id: 80, src: "/proyek/proyek-80.webp", category: "panel", desc: "Workshop stok tiang pancang siap kirim", location: "Cikarang" },
  { id: 81, src: "/proyek/proyek-81.webp", category: "aspal", desc: "Proses pembuatan dan pengaspalan jalan di area Perusahaan HSCC", location: "Bandung" },
  { id: 82, src: "/proyek/proyek-82.webp", category: "panel", desc: "Workshop produksi pagar panel beton", location: "Bogor" },
  { id: 83, src: "/proyek/proyek-83.webp", category: "panel", desc: "Workshop stok pagar panel beton precast", location: "Tangerang" },
  { id: 84, src: "/proyek/proyek-84.webp", category: "panel", desc: "Workshop pagar panel beton siap distribusi", location: "Jakarta Timur" },
  { id: 85, src: "/proyek/proyek-85.webp", category: "paving", desc: "Proses persiapan perataan tanah dasar (subgrade) sebelum pemasangan paving block — memastikan struktur fondasi yang kokoh, stabil, dan presisi demi hasil akhir jalan yang rata.", location: "Tangerang" },
  { id: 86, src: "/proyek/proyek-86.webp", category: "paving", desc: "Tahap finishing pemasangan paving block area parkir — pengurugan pasir halus ke sela-sela paving dilanjutkan dengan pemadatan menggunakan alat stempel kodok getar agar permukaan kokoh.", location: "Tangerang" },
  { id: 87, src: "/proyek/proyek-87.webp", category: "paving", desc: "Proses perataan pasir alas (bedding sand) menggunakan jidar baja dan panduan benang — memastikan elevasi permukaan yang presisi sebelum paving block dipasang agar hasil akhir rata.", location: "Tangerang" },
  { id: 88, src: "/proyek/proyek-88.webp", category: "paving", desc: "Proses pemasangan paving block pada area parkir dan akses keluar kawasan — material ditata sistematis di atas alas pasir padat.", location: "Tangerang" },
  { id: 89, src: "/proyek/proyek-89.webp", category: "paving", desc: "Proses pemasangan paving block untuk akses jalan dan halaman — menghasilkan struktur permukaan yang kuat dan rapi, memberikan kenyamanan untuk aktivitas sehari-hari.", location: "Tangerang" },
  { id: 90, src: "/proyek/proyek-90.webp", category: "paving", desc: "Proses pemasangan paving block untuk akses jalan dan halaman — menunjukkan kesiapan lahan dasar yang telah dipadatkan dan diratakan.", location: "Tangerang" },
  { id: 91, src: "/proyek/proyek-91.webp", category: "paving", desc: "Proses bongkar muat material paving block di lokasi proyek — merupakan bagian dari persiapan matang untuk mempercepat proses pemasangan dengan ketersediaan material.", location: "Tangerang" },
  { id: 92, src: "/proyek/proyek-92.webp", category: "paving", desc: "Proses pemadatan akhir paving block menggunakan baby roller untuk menjamin kerataan, kekokohan, dan daya tahan struktur jalan jangka panjang.", location: "Tangerang" },
];

// ─────────────────────────────────────────────
// KONTEN BILINGUAL & KATEGORI FILTER
// ─────────────────────────────────────────────
const content = {
  id: {
    kicker: "Portofolio & Dokumentasi Nyata",
    titleLight: "Galeri Proyek",
    titleBold: "Pengaspalan & Konstruksi",
    subtitle:
      "Dokumentasi hasil pengerjaan nyata proyek pengaspalan hotmix, pemasangan paving block, pagar panel beton, dan pemadatan lahan oleh tim PT Tri Abadi Makmur berstandar Bina Marga dan bergaransi resmi.",
    filters: [
      { id: "all", label: "Semua Proyek" },
      { id: "aspal", label: "Pengaspalan Hotmix" },
      { id: "paving", label: "Paving & Kanstin" },
      { id: "panel", label: "Pagar Panel & Tiang" },
      { id: "beton", label: "Cor Beton & Lahan" },
    ],
    badges: {
      aspal: "Aspal Hotmix",
      paving: "Paving & Kanstin",
      panel: "Pagar Panel & Tiang",
      beton: "Cor Beton & Lahan",
      default: "Konstruksi",
    },
    viewPhoto: "Lihat Foto",
    loadMore: "Muat Lebih Banyak",
    remainingPhotos: "foto tersisa",
    showingText: "Menampilkan",
    ctaQuestion: "Ingin hasil pengerjaan rapi, kokoh, dan bergaransi seperti di galeri ini?",
    ctaHighlight: "Konsultasikan kebutuhan proyek Anda sekarang",
    ctaSuffix: "— kami berikan gratis survei lokasi & perhitungan estimasi RAB.",
    ctaButton: "Konsultasi via WhatsApp",
    waMessage:
      "Halo PT Tri Abadi Makmur, saya melihat galeri proyek Anda dan ingin konsultasi kebutuhan pengaspalan/konstruksi.",
    lightboxCta: "Tanya Proyek Seperti Ini via WA",
    photoOf: "Foto",
    of: "dari",
  },
  en: {
    kicker: "Portfolio & Real Documentation",
    titleLight: "Asphalt & Construction",
    titleBold: "Project Gallery",
    subtitle:
      "Real-world project documentation of hotmix road paving, paving block installation, precast panel fencing, and land grading executed by PT Tri Abadi Makmur across Greater Jakarta, Banten & West Java.",
    filters: [
      { id: "all", label: "All Projects" },
      { id: "aspal", label: "Asphalt Paving" },
      { id: "paving", label: "Paving & Curbs" },
      { id: "panel", label: "Panel & Piles" },
      { id: "beton", label: "Concrete & Grading" },
    ],
    badges: {
      aspal: "Asphalt Paving",
      paving: "Paving & Curbs",
      panel: "Panel & Piles",
      beton: "Concrete & Grading",
      default: "Construction",
    },
    viewPhoto: "View Photo",
    loadMore: "Load More Projects",
    remainingPhotos: "photos remaining",
    showingText: "Showing",
    ctaQuestion: "Want durable, neat, and guaranteed construction like in this gallery?",
    ctaHighlight: "Consult your project requirements today",
    ctaSuffix: "— enjoy free site survey & transparent cost estimation.",
    ctaButton: "Consult via WhatsApp",
    waMessage:
      "Hello PT Tri Abadi Makmur, I saw your project gallery and would like to consult about an asphalt paving/construction project.",
    lightboxCta: "Inquire This Project on WA",
    photoOf: "Photo",
    of: "of",
  },
};

// ─────────────────────────────────────────────
// IKON
// ─────────────────────────────────────────────
function IconChevronLeft({ className = "w-6 h-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}
function IconChevronRight({ className = "w-6 h-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}
function IconChevronDown({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}
function IconClose({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M18 6L6 18M6 6l12 12" />
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
function IconZoom({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35M11 8v6M8 11h6" />
    </svg>
  );
}
function IconWhatsApp({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.031 2c-5.516 0-9.969 4.453-9.969 9.969 0 1.758.458 3.475 1.328 4.988L2 22l5.188-1.359a9.93 9.93 0 0 0 4.843 1.258h.004c5.515 0 9.969-4.453 9.969-9.969A9.93 9.93 0 0 0 19.08 4.92 9.913 9.913 0 0 0 12.031 2Zm5.805 14.234c-.246.692-1.426 1.324-1.976 1.406-.508.078-1.148.109-1.855-.117-.426-.137-.977-.316-1.68-.621-2.957-1.277-4.887-4.254-5.035-4.453-.145-.195-1.203-1.602-1.203-3.055 0-1.453.762-2.168 1.031-2.465.27-.297.59-.371.785-.371.195 0 .391.004.563.012.18.008.422-.07.66.504.246.59.836 2.043.91 2.191.074.148.121.32.023.516-.098.195-.148.32-.293.492-.148.172-.312.383-.445.516-.148.148-.301.309-.129.605.172.297.766 1.262 1.645 2.043 1.129 1.008 2.082 1.32 2.379 1.469.297.148.469.125.641-.074.172-.195.738-.859.934-1.156.195-.297.391-.246.66-.148.27.098 1.719.809 2.012.957.297.148.492.223.566.348.074.125.074.715-.172 1.406Z" />
    </svg>
  );
}

// ─────────────────────────────────────────────
// HOOKS
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

function Reveal({
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

  return (
    <Tag ref={ref} style={style} className={className}>
      {children}
    </Tag>
  );
}

function useBodyScrollLock(locked) {
  useEffect(() => {
    if (!locked || typeof document === "undefined") return;
    const scrollY = window.scrollY;
    const body = document.body;
    const prev = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
    };

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";

    return () => {
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.left = prev.left;
      body.style.right = prev.right;
      body.style.width = prev.width;
      body.style.overflow = prev.overflow;
      window.scrollTo(0, scrollY);
    };
  }, [locked]);
}

// ─────────────────────────────────────────────
// LIGHTBOX LENGKAP DENGAN CAPTION & CTA WA
// ─────────────────────────────────────────────
function Lightbox({
  list,
  selectedIndex,
  setSelectedIndex,
  goPrev,
  goNext,
  onClose,
  t,
}) {
  const selected = list[selectedIndex] || list[0];
  if (!selected) return null;

  const waProjectHref = `https://wa.me/6282258089367?text=${encodeURIComponent(
    `Halo PT Tri Abadi Makmur, saya tertarik dengan pengerjaan seperti pada dokumentasi proyek ini: "${selected.desc}". Mohon info estimasi biaya dan jadwal survei lokasi.`
  )}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Penampil foto pengerjaan"
      className="fixed inset-0 z-[100] flex flex-col"
      style={{ background: "rgba(2, 6, 23, 0.98)" }}
      onClick={onClose}
    >
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 z-10 border-b border-white/10 shrink-0 bg-slate-950/60 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[#1e88e5] animate-pulse" />
          <span className="text-white/80 text-xs sm:text-sm font-medium tracking-wide">
            {t.photoOf} <span className="text-white font-bold">{selectedIndex + 1}</span> {t.of} {list.length}
          </span>
          {selected.location && (
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-white/10 text-white/70 text-[11px] font-medium border border-white/10">
              {selected.location}
            </span>
          )}
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-white/80 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-colors duration-150 cursor-pointer"
          aria-label="Tutup"
        >
          <IconClose className="w-5 h-5" />
        </button>
      </div>

      {/* Main Image Viewer */}
      <div className="flex-1 flex items-center justify-center px-2 sm:px-16 relative min-h-0">
        <button
          onClick={(e) => { e.stopPropagation(); goPrev(); }}
          className="absolute left-2 sm:left-6 z-10 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-white/90 hover:text-white bg-slate-900/80 hover:bg-[#1e88e5] border border-white/15 backdrop-blur-md rounded-full transition-all duration-200 cursor-pointer shadow-lg hover:scale-105"
          aria-label="Sebelumnya"
        >
          <IconChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <div className="max-w-4xl w-full flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
          <img
            src={selected.src} // <-- DIUBAH: Langsung ambil dari data
            alt={selected.desc}
            decoding="async"
            draggable={false}
            className="w-full h-auto max-h-[62vh] sm:max-h-[68vh] object-contain mx-auto rounded-lg select-none shadow-2xl"
          />

          {/* Caption Box & In-Lightbox CTA */}
          <div className="w-full mt-3 sm:mt-4 px-3 sm:px-4 flex flex-col sm:flex-row items-center justify-between gap-3 bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-sm">
            <p className="text-white/90 text-xs sm:text-sm leading-relaxed text-center sm:text-left line-clamp-2">
              {selected.desc}
            </p>

            <a
              href={waProjectHref}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold shadow-md shadow-emerald-950/20 transition-all hover:scale-[1.02]"
            >
              <IconWhatsApp className="w-4 h-4" />
              {t.lightboxCta}
            </a>
          </div>
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); goNext(); }}
          className="absolute right-2 sm:right-6 z-10 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-white/90 hover:text-white bg-slate-900/80 hover:bg-[#1e88e5] border border-white/15 backdrop-blur-md rounded-full transition-all duration-200 cursor-pointer shadow-lg hover:scale-105"
          aria-label="Berikutnya"
        >
          <IconChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Thumbnail Bar */}
      <div
        className="px-3 sm:px-4 py-2.5 sm:py-3.5 overflow-x-auto border-t border-white/10 shrink-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden bg-slate-950/80"
        onClick={(e) => e.stopPropagation()}
        style={{ WebkitOverflowScrolling: "touch", scrollSnapType: "x mandatory" }}
      >
        <div className="flex items-center justify-start sm:justify-center gap-1.5 min-w-max mx-auto px-1">
          {list.map((thumb, i) => {
            const isActive = i === selectedIndex;
            return (
              <button
                key={thumb.id}
                onClick={() => setSelectedIndex(i)}
                aria-label={`Foto ${i + 1}`}
                aria-current={isActive ? "true" : undefined}
                className={`shrink-0 w-11 h-11 sm:w-13 sm:h-13 overflow-hidden rounded-md cursor-pointer transition-all duration-150 relative
                  ${isActive ? "ring-2 ring-[#1e88e5] scale-105 opacity-100" : "opacity-35 hover:opacity-85"}`}
                style={{ scrollSnapAlign: "center" }}
              >
                <img
                  src={thumb.src} // <-- DIUBAH: Langsung ambil dari data
                  alt=""
                  loading="lazy"
                  decoding="async"
                  width={52}
                  height={52}
                  className="w-full h-full object-cover"
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// PROJECTS (MAIN COMPONENT)
// ─────────────────────────────────────────────
export default function Projects() {
  const { lang } = useLang();
  const data = content[lang] || content.id;

  const [activeFilter, setActiveFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Filter projects berdasarkan tab aktif
  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return rawProjects;
    return rawProjects.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  // Potong daftar foto yang ditampilkan sesuai visibleCount
  const visibleProjects = useMemo(() => {
    return filteredProjects.slice(0, visibleCount);
  }, [filteredProjects, visibleCount]);

  // Lightbox tetap bisa menjelajahi seluruh foto dalam kategori aktif
  const totalFiltered = filteredProjects.length;
  const remainingCount = Math.max(0, totalFiltered - visibleCount);

  useBodyScrollLock(selectedIndex !== null);

  const goPrev = useCallback(() => {
    setSelectedIndex((prev) => (prev === null ? null : (prev - 1 + totalFiltered) % totalFiltered));
  }, [totalFiltered]);

  const goNext = useCallback(() => {
    setSelectedIndex((prev) => (prev === null ? null : (prev + 1) % totalFiltered));
  }, [totalFiltered]);

  const closeLightbox = useCallback(() => setSelectedIndex(null), []);

  useEffect(() => {
    if (selectedIndex === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedIndex, goPrev, goNext]);

  // Prefetch neighboring images di lightbox
  useEffect(() => {
    if (selectedIndex === null || totalFiltered === 0) return;
    const next = (selectedIndex + 1) % totalFiltered;
    const prev = (selectedIndex - 1 + totalFiltered) % totalFiltered;
    [next, prev].forEach((i) => {
      if (filteredProjects[i]) {
        const img = new Image();
        img.src = filteredProjects[i].src; // <-- DIUBAH: Langsung ambil dari data
      }
    });
  }, [selectedIndex, totalFiltered, filteredProjects]);

  const getSpan = (i) => {
    const p = i % 8;
    if (p === 0 || p === 5) return "md:col-span-2 md:row-span-2";
    return "";
  };

  const getCategoryLabel = (cat) => {
    return data.badges[cat] || data.badges.default;
  };

  const waHref = `https://wa.me/6282258089367?text=${encodeURIComponent(data.waMessage)}`;

  return (
    <>
      <section className="relative bg-white pt-12 sm:pt-14 lg:pt-20 pb-16 sm:pb-20 lg:pb-28 overflow-hidden">
        {!isMobile && (
          <>
            <div
              className="absolute inset-0 opacity-[0.45] pointer-events-none"
              style={{
                backgroundImage: `
                  linear-gradient(to right, #f1f5f9 1px, transparent 1px),
                  linear-gradient(to bottom, #f1f5f9 1px, transparent 1px)
                `,
                backgroundSize: "64px 64px",
                maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 100%)",
                WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 100%)",
              }}
              aria-hidden="true"
            />
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none" aria-hidden="true">
              <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[600px] h-[600px] rounded-full bg-[#1e88e5] blur-3xl" />
            </div>
          </>
        )}

        <div className="relative max-w-5xl mx-auto px-4 sm:px-5 lg:px-8">
          {/* ═══ HEADER DENGAN H1 SEO ═══ */}
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 lg:mb-12">
            <Reveal delay={0} y={20}>
              <div className="inline-flex items-center gap-3 mb-4">
                <span className="w-6 sm:w-8 h-px bg-[#1e88e5]/60" aria-hidden="true" />
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#1e88e5] font-semibold">
                  {data.kicker}
                </span>
                <span className="w-6 sm:w-8 h-px bg-[#1e88e5]/60" aria-hidden="true" />
              </div>
            </Reveal>

            <Reveal delay={80} y={30}>
              <h1
                className="font-light tracking-tight text-slate-900 leading-[1.15]"
                style={{ fontSize: "clamp(1.75rem, 5vw, 2.625rem)" }}
              >
                {data.titleLight} <span className="font-semibold">{data.titleBold}</span>
                <span className="text-[#1e88e5]">.</span>
              </h1>
            </Reveal>

            <Reveal delay={160} y={24}>
              <p
                className="text-slate-600 leading-relaxed mt-4"
                style={{ fontSize: "clamp(0.875rem, 1.6vw, 0.95rem)" }}
              >
                {data.subtitle}
              </p>
            </Reveal>
          </div>

          {/* ═══ FILTER TABS ═══ */}
          <Reveal delay={200} y={20}>
            <div className="flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2 overflow-x-auto pb-4 mb-6 sm:mb-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {data.filters.map((fl) => {
                const isActive = activeFilter === fl.id;
                return (
                  <button
                    key={fl.id}
                    onClick={() => {
                      setActiveFilter(fl.id);
                      setVisibleCount(ITEMS_PER_PAGE);
                      setSelectedIndex(null);
                    }}
                    className={`shrink-0 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer
                      ${
                        isActive
                          ? "bg-[#1e88e5] text-white shadow-md shadow-blue-500/25"
                          : "bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/80"
                      }`}
                  >
                    {fl.label}
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* ═══ GRID GALERI DENGAN BADGE & HOVER OVERLAY ═══ */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-2.5 lg:gap-3 [grid-auto-rows:135px] sm:[grid-auto-rows:160px] lg:[grid-auto-rows:200px]">
            {visibleProjects.map((item, i) => (
              <Reveal
                key={`${activeFilter}-${item.id}`}
                delay={(i % ITEMS_PER_PAGE) * 35}
                y={30}
                duration={700}
                className={getSpan(i)}
              >
                <button
                  type="button"
                  onClick={() => setSelectedIndex(i)}
                  aria-label={item.desc}
                  className="group relative w-full h-full overflow-hidden rounded-xl bg-slate-100 cursor-pointer border border-slate-200/80 hover:border-[#1e88e5] hover:shadow-xl hover:shadow-slate-900/10 transition-all duration-300"
                >
                  <img
                    src={item.src} // <-- DIUBAH: Langsung ambil dari data
                    alt={item.desc}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />

                  {/* Kategori Badge */}
                  <div className="absolute top-2 left-2 z-10 pointer-events-none">
                    <span className="px-2 py-0.5 rounded-md bg-slate-950/70 backdrop-blur-md text-white text-[9px] sm:text-[10px] font-medium border border-white/10 shadow-sm">
                      {getCategoryLabel(item.category)}
                    </span>
                  </div>

                  {/* Hover Overlay Gelap & Caption */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2.5 sm:p-3 text-left"
                    aria-hidden="true"
                  >
                    <div className="flex items-center gap-1.5 text-white/80 mb-1">
                      <IconZoom className="w-3.5 h-3.5 text-[#1e88e5]" />
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#4da3ff]">
                        {data.viewPhoto}
                      </span>
                    </div>
                    <p className="text-white text-[10.5px] sm:text-xs font-medium leading-snug line-clamp-2">
                      {item.desc}
                    </p>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>

          {/* ═══ LOAD MORE BUTTON & COUNTER ═══ */}
          {remainingCount > 0 && (
            <div className="mt-8 sm:mt-10 flex flex-col items-center gap-2.5">
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 hover:text-[#1e88e5] border border-slate-200 hover:border-[#1e88e5] text-xs sm:text-sm font-semibold shadow-sm transition-all duration-200 cursor-pointer"
              >
                <span>
                  {data.loadMore} ({remainingCount} {data.remainingPhotos})
                </span>
                <IconChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:translate-y-0.5" />
              </button>
              <span className="text-[11px] sm:text-xs text-slate-400">
                {data.showingText} {visibleProjects.length} {data.of} {totalFiltered}
              </span>
            </div>
          )}

          {/* ═══ CTA (WHATSAPP) ═══ */}
          <Reveal y={34}>
            <div className="mt-12 sm:mt-16 lg:mt-20 flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6 bg-slate-50/70 p-6 sm:p-8 rounded-2xl border border-slate-200">
              <p
                className="text-slate-600 leading-relaxed text-center sm:text-left max-w-xl"
                style={{ fontSize: "clamp(0.875rem, 1.6vw, 0.9375rem)" }}
              >
                {data.ctaQuestion}{" "}
                <span className="text-slate-900 font-semibold">{data.ctaHighlight}</span>{" "}
                {data.ctaSuffix}
              </p>

              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[46px] rounded-xl bg-[#1e88e5] hover:bg-blue-600 text-white font-semibold text-xs sm:text-sm uppercase tracking-[0.14em] transition-all duration-200 shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/40"
              >
                <IconWhatsApp className="w-4 h-4" />
                {data.ctaButton}
                <IconArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ LIGHTBOX via PORTAL ═══ */}
      {mounted && selectedIndex !== null &&
        createPortal(
          <Lightbox
            list={filteredProjects}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            goPrev={goPrev}
            goNext={goNext}
            onClose={closeLightbox}
            t={data}
          />,
          document.body
        )}
    </>
  );
} 