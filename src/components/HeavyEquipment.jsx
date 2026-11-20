// src/components/HeavyEquipment.jsx
"use client";

import { memo } from "react";
import Link from "next/link";
import { useIsMobile } from "../hooks/useIsMobile";
import { useReveal } from "../hooks/useReveal";

// ─────────────────────────────────────────────
// KOMPONEN: FADE UP (memoized - Animasi Tetap)
// ─────────────────────────────────────────────
const FadeUp = memo(function FadeUp({ children, delay = 0, className = "" }) {
  const isMobile = useIsMobile();
  const enabled = !isMobile;
  const [ref, inView] = useReveal({ threshold: 0.08, enabled });

  return (
    <div
      ref={ref}
      className={`${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} ${className}`}
      style={{
        transitionProperty: "opacity, transform",
        transitionDuration: "600ms",
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        transitionDelay: `${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
});

// ─────────────────────────────────────────────
// KOMPONEN: SCALE IN (memoized - Animasi Tetap)
// ─────────────────────────────────────────────
const ScaleIn = memo(function ScaleIn({ children, delay = 0, className = "" }) {
  const isMobile = useIsMobile();
  const enabled = !isMobile;
  const [ref, inView] = useReveal({ threshold: 0.08, enabled });

  return (
    <div
      ref={ref}
      className={`${inView ? "opacity-100 scale-100" : "opacity-0 scale-[0.98]"} ${className}`}
      style={{
        transitionProperty: "opacity, transform",
        transitionDuration: "600ms",
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        transitionDelay: `${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
});

// ─────────────────────────────────────────────
// IKON
// ─────────────────────────────────────────────
function IconArrowRight({ className = "w-3.5 h-3.5" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14M13 5l7 7-7 7" /></svg>);
}
function IconWhatsApp({ className = "w-4 h-4" }) {
  return (<svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>);
}
function IconDozer({ className = "w-5 h-5" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 18h18M3 18v-4h8M8 14l2-4h6l2 4M5 18a2 2 0 1 0 4 0M15 18a2 2 0 1 0 4 0" /></svg>);
}
function IconExcavator({ className = "w-5 h-5" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 18h12M18 8l3-3M18 8l2 4M18 8l-4-2M14 8h-4v6h4M5 18a2 2 0 1 0 4 0M13 18a2 2 0 1 0 4 0" /></svg>);
}
function IconLoader({ className = "w-5 h-5" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 18h18M8 18v-8h6l4 4v4M5 18a2 2 0 1 0 4 0M15 18a2 2 0 1 0 4 0M6 10h4" /></svg>);
}
function IconRoller({ className = "w-5 h-5" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="6" cy="18" r="3" /><circle cx="18" cy="18" r="3" /><path d="M3 15V9a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v6M9 6V3M15 6V3" /></svg>);
}
function IconTandemRoller({ className = "w-5 h-5" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="6" cy="18" r="3" /><circle cx="18" cy="18" r="3" /><path d="M3 15V9a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v6" /></svg>);
}
function IconPneumatic({ className = "w-5 h-5" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="6" cy="18" r="2.5" /><circle cx="12" cy="18" r="2.5" /><circle cx="18" cy="18" r="2.5" /><path d="M3 15V9a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v6" /></svg>);
}
function IconBabyRoller({ className = "w-5 h-5" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="7" cy="17" r="2.5" /><circle cx="17" cy="17" r="2.5" /><path d="M4 14V9h12l3 5" /></svg>);
}
function IconAsphalt({ className = "w-5 h-5" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 18h18M3 18l2-6h14l2 6M7 12V8h10v4M10 8V6h4v2" /></svg>);
}
function IconTruck({ className = "w-5 h-5" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M1 3h15v13H1z" /><path d="M16 8h4l3 3v5h-7z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>);
}
function IconShield({ className = "w-5 h-5" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>);
}
function IconWrench({ className = "w-5 h-5" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>);
}
function IconCheckCircle({ className = "w-5 h-5" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="M22 4 12 14.01l-3-3" /></svg>);
}

// ─────────────────────────────────────────────
// DATA: ALAT BERAT
// ─────────────────────────────────────────────
const alatBerat = [
  {
    title: "Dozer",
    slug: "dozer",
    desc: "Alat berat penggusur tanah untuk meratakan, membersihkan lahan, dan memindahkan material dalam jumlah besar.",
    Icon: IconDozer,
    tags: ["Land Clearing", "Perataan Lahan"],
  },
  {
    title: "Excavator / Backhoe",
    slug: "excavator",
    desc: "Alat penggali serbaguna untuk pondasi, parit, dan penggalian material di medan berat.",
    Icon: IconExcavator,
    tags: ["Penggalian", "Pondasi"],
  },
  {
    title: "Self Loader",
    slug: "self-loader",
    desc: "Truk dengan sistem derek mandiri, cocok untuk mengangkut alat berat kecil dan material berat.",
    Icon: IconLoader,
    tags: ["Mobilisasi", "Angkut Alat"],
  },
  {
    title: "Tandem Roller",
    slug: "tandem-roller",
    desc: "Pemadat aspal dengan dua drum besi untuk finishing akhir jalan yang halus dan padat.",
    Icon: IconTandemRoller,
    tags: ["Finishing Aspal", "Drum Besi"],
  },
  {
    title: "Double Drum Roller",
    slug: "double-drum-roller",
    desc: "Alat pemadat dengan dua drum getar untuk pemadatan aspal dan hot mix yang merata.",
    Icon: IconRoller,
    tags: ["Pemadatan", "Vibratory"],
  },
  {
    title: "Pneumatic Roller",
    slug: "pneumatic-roller",
    desc: "Pemadat aspal dengan roda karet untuk menutup pori dan menghasilkan permukaan kedap air.",
    Icon: IconPneumatic,
    tags: ["Roda Karet", "Kedap Air"],
  },
  {
    title: "Baby Roller",
    slug: "baby-roller",
    desc: "Vibratory roller compact yang lincah untuk pemadatan area sempit dan jalan lingkungan.",
    Icon: IconBabyRoller,
    tags: ["Compact", "Area Sempit"],
  },
  {
    title: "Asphalt Finisher",
    slug: "asphalt-finisher",
    desc: "Mesin penghampar aspal dengan presisi tinggi untuk hasil pengaspalan yang rata dan sesuai spesifikasi.",
    Icon: IconAsphalt,
    tags: ["Hampar Aspal", "Presisi"],
  },
  {
    title: "Tronton / Dump Truck",
    slug: "tronton-dump-truck",
    desc: "Kendaraan pengangkut material curah seperti pasir, batu split, dan tanah dengan kapasitas besar.",
    Icon: IconTruck,
    tags: ["Angkut Material", "Curah"],
  },
];

// ─────────────────────────────────────────────
// DATA: KEUNGGULAN
// ─────────────────────────────────────────────
const keunggulan = [
  {
    Icon: IconShield,
    title: "Alat Terawat",
    desc: "Semua unit dirawat secara berkala dan dipastikan layak operasi sebelum disewakan.",
  },
  {
    Icon: IconWrench,
    title: "Teknisi Siap",
    desc: "Dukungan teknisi berpengalaman di lapangan untuk meminimalisir downtime.",
  },
  {
    Icon: IconCheckCircle,
    title: "Operator Berpengalaman",
    desc: "Operator tersertifikasi yang memahami medan dan prosedur keselamatan kerja.",
  },
];

// ─────────────────────────────────────────────
// SUB-KOMPONEN: ALAT CARD (Visual Upgraded)
// ─────────────────────────────────────────────
const AlatCard = memo(function AlatCard({ item }) {
  return (
    <Link
      href={`/heavy-equipment/${item.slug}`}
      // ✅ FIX: Menghapus 'contain', menambah efek shadow, ring, dan translate (3D effect)
      className="group relative flex flex-col h-full p-5 sm:p-6
                 rounded-3xl bg-white ring-1 ring-slate-200 shadow-sm
                 hover:ring-2 hover:ring-[#1e88e5]/40 hover:shadow-[0_8px_30px_-4px_rgba(30,136,229,0.15)]
                 hover:-translate-y-1 transition-all duration-300 ease-out overflow-hidden"
    >
      {/* Efek gradient tipis di background saat hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-blue-50/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div className="relative z-10 shrink-0 w-12 h-12 rounded-xl
                      bg-[#1e88e5]/10 text-[#1e88e5]
                      group-hover:bg-[#1e88e5] group-hover:text-white group-hover:scale-110 group-hover:shadow-md group-hover:shadow-[#1e88e5]/30
                      flex items-center justify-center mb-4 transition-all duration-300">
        <item.Icon className="w-6 h-6" />
      </div>

      <div className="relative z-10 flex items-start justify-between gap-2 mb-2">
        <h3
          className="font-bold text-slate-900 leading-snug
                     group-hover:text-[#1e88e5] transition-colors duration-300 text-base sm:text-lg"
        >
          {item.title}
        </h3>
        <IconArrowRight className="shrink-0 mt-1 w-4 h-4 text-slate-300
                                   group-hover:text-[#1e88e5] group-hover:translate-x-1
                                   transition-all duration-300" />
      </div>

      <p
        className="relative z-10 text-slate-500 leading-relaxed mb-4 flex-1 text-sm sm:text-base"
      >
        {item.desc}
      </p>

      <div className="relative z-10 flex flex-wrap gap-2 pt-4 border-t border-slate-100">
        {item.tags.map((tag, i) => (
          <span
            key={i}
            className="inline-block px-2.5 py-1 rounded-full
                       bg-slate-50 border border-slate-100 text-slate-600
                       font-bold tracking-wide uppercase text-[10px]
                       group-hover:bg-blue-50 group-hover:text-[#1e88e5] group-hover:border-blue-100
                       transition-colors duration-300"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
});

// ─────────────────────────────────────────────
// SUB-KOMPONEN: KEUNGGULAN CARD (Visual Upgraded)
// ─────────────────────────────────────────────
const KeunggulanCard = memo(function KeunggulanCard({ item }) {
  return (
    <div
      className="group flex flex-col items-center text-center gap-4 p-6 sm:p-8
                 rounded-3xl bg-white ring-1 ring-slate-200 shadow-sm
                 hover:ring-2 hover:ring-[#1e88e5]/40 hover:shadow-[0_8px_30px_-4px_rgba(30,136,229,0.15)]
                 hover:-translate-y-1 transition-all duration-300 ease-out h-full relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <span className="relative z-10 shrink-0 w-14 h-14 rounded-2xl
                       bg-[#1e88e5]/10 text-[#1e88e5]
                       group-hover:bg-[#1e88e5] group-hover:text-white group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#1e88e5]/30
                       flex items-center justify-center transition-all duration-300">
        <item.Icon className="w-7 h-7" />
      </span>
      <div className="relative z-10">
        <h3
          className="font-bold text-slate-900 mb-2 leading-snug text-base sm:text-lg
                     group-hover:text-[#1e88e5] transition-colors duration-300"
        >
          {item.title}
        </h3>
        <p
          className="text-slate-500 leading-relaxed text-sm sm:text-base"
        >
          {item.desc}
        </p>
      </div>
    </div>
  );
});

// ─────────────────────────────────────────────
// HALAMAN
// ─────────────────────────────────────────────
export default function HeavyEquipment() {
  const isMobile = useIsMobile();

  return (
    // Background halaman dibuat sangat muda (slate-50/50) agar kartu putih menonjol
    <div className="bg-slate-50/50 overflow-hidden">

      {/* ═══════ HERO ═══════ */}
      <section className="relative pt-28 lg:pt-36 pb-16 lg:pb-20 bg-gradient-to-b from-white to-slate-50/50">
        {!isMobile && (
          <>
            <div className="absolute -right-40 -top-40 w-[600px] h-[600px] rounded-full bg-[#1e88e5]/[0.04] blur-3xl pointer-events-none" />
            <div className="absolute -left-40 -bottom-20 w-[500px] h-[500px] rounded-full bg-[#1e88e5]/[0.03] blur-3xl pointer-events-none" />
          </>
        )}

        <div className="relative max-w-4xl mx-auto px-4 sm:px-5 lg:px-8 text-center">
          <FadeUp>
            <div className="inline-flex items-center gap-2.5 sm:gap-3 mb-5">
              <span className="w-8 sm:w-10 h-px bg-[#1e88e5]" />
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#1e88e5] font-bold">
                Heavy Equipment
              </span>
              <span className="w-8 sm:w-10 h-px bg-[#1e88e5]" />
            </div>
          </FadeUp>

          <FadeUp delay={100}>
            <h1 className="font-light tracking-tight text-slate-900 leading-[1.05] mb-5 text-balance" style={{ fontSize: "clamp(2rem, 6vw, 3.75rem)" }}>
              Sewa <span className="font-semibold">Alat Berat</span>
              <span className="text-[#1e88e5]">.</span>
            </h1>
          </FadeUp>

          <FadeUp delay={150}>
            <p className="text-slate-600 leading-[1.8] max-w-2xl mx-auto" style={{ fontSize: "clamp(0.875rem, 1.6vw, 1rem)" }}>
              Menyediakan berbagai alat berat untuk menunjang proyek konstruksi
              Anda — dengan operator berpengalaman, teknisi siap, dan armada
              yang terawat.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ═══════ GRID ALAT BERAT ═══════ */}
      <section className="pb-16 lg:pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-5 lg:px-8">

          <FadeUp>
            <div className="text-center mb-10 sm:mb-12">
              <div className="inline-flex items-center gap-2.5 sm:gap-3 mb-4">
                <span className="w-6 sm:w-8 h-px bg-[#1e88e5]" />
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#1e88e5] font-bold">
                  Katalog Unit
                </span>
                <span className="w-6 sm:w-8 h-px bg-[#1e88e5]" />
              </div>
              <h2 className="font-light tracking-tight text-slate-900 leading-tight text-balance max-w-2xl mx-auto" style={{ fontSize: "clamp(1.5rem, 3.5vw, 2rem)" }}>
                Pilihan <span className="font-semibold">Alat Berat Kami</span>
              </h2>
              <p className="text-slate-500 mt-3 max-w-xl mx-auto text-sm sm:text-base">
                Pilih alat berat sesuai kebutuhan proyek Anda.
              </p>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {alatBerat.map((item, idx) => (
              <FadeUp key={idx} delay={idx * 60} className="h-full">
                <AlatCard item={item} />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ KEUNGGULAN ═══════ */}
      <section className="relative bg-white border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-5 lg:px-8 py-16 lg:py-24">

          <FadeUp>
            <div className="text-center mb-10 sm:mb-12">
              <div className="inline-flex items-center gap-2.5 sm:gap-3 mb-4">
                <span className="w-6 sm:w-8 h-px bg-[#1e88e5]" />
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#1e88e5] font-bold">
                  Keunggulan
                </span>
                <span className="w-6 sm:w-8 h-px bg-[#1e88e5]" />
              </div>
              <h2 className="font-light tracking-tight text-slate-900 leading-tight text-balance max-w-2xl mx-auto" style={{ fontSize: "clamp(1.5rem, 3.5vw, 2rem)" }}>
                Kenapa <span className="font-semibold">Memilih Kami</span>
              </h2>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {keunggulan.map((item, i) => (
              <FadeUp key={i} delay={i * 80} className="h-full">
                <KeunggulanCard item={item} />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CTA BANNER ═══════ */}
      <section className="pb-16 lg:pb-20 pt-10 sm:pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-5 lg:px-8">
          <ScaleIn delay={80}>
            <div className="relative mt-4 rounded-3xl overflow-hidden bg-slate-900 p-8 sm:p-14 text-center shadow-2xl shadow-slate-900/40">
              
              {/* Efek Pendaran Premium */}
              <div aria-hidden="true" className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-[#1e88e5] rounded-full blur-3xl opacity-30 pointer-events-none" />
              <div aria-hidden="true" className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-emerald-500 rounded-full blur-3xl opacity-20 pointer-events-none" />

              <div className="relative z-10">
                <p className="text-[#4da3ff] text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-bold mb-3">
                  Konsultasi Gratis
                </p>
                <h3 className="text-white font-light tracking-tight mb-8 text-balance" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>
                  Butuh sewa alat berat untuk proyek Anda?{" "}
                  <span className="font-bold">Kami siap membantu.</span>
                </h3>

                <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                  <a
                    href="https://wa.me/6282258089367?text=Halo%20Tri%20Abadi%20Makmur%2C%20saya%20ingin%20sewa%20alat%20berat"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 min-h-12
                               px-7 sm:px-9 py-3.5 rounded-xl
                               bg-[#25D366] text-slate-900
                               hover:bg-[#20bd5a] hover:scale-[1.02]
                               font-bold uppercase tracking-[0.12em] sm:tracking-[0.15em]
                               shadow-lg shadow-[#25D366]/30
                               transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    style={{ fontSize: "clamp(0.6875rem, 1.3vw, 0.75rem)" }}
                  >
                    <IconWhatsApp className="w-5 h-5 shrink-0" />
                    Hubungi via WhatsApp
                    <IconArrowRight className="w-4 h-4 shrink-0" />
                  </a>

                  <Link
                    href="/kontak"
                    className="inline-flex items-center justify-center gap-2 min-h-12
                               px-7 sm:px-9 py-3.5 rounded-xl
                               bg-white/10 text-white border border-white/20 backdrop-blur-md
                               hover:bg-white/20 hover:scale-[1.02]
                               font-bold uppercase tracking-[0.12em] sm:tracking-[0.15em]
                               transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    style={{ fontSize: "clamp(0.6875rem, 1.3vw, 0.75rem)" }}
                  >
                    Form Kontak
                  </Link>
                </div>
              </div>
            </div>
          </ScaleIn>
        </div>
      </section>

    </div>
  );
}