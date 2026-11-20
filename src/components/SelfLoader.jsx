// src/components/SelfLoader.jsx
"use client";

import { useState, useCallback, useMemo, memo } from "react";
import Image from "next/image";
import { useLang } from "../context/LanguageContext";
import Reveal from "./Reveal";

// ─────────────────────────────────────────────
// IKON
// ─────────────────────────────────────────────
function IconWhatsApp({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
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
function IconChevron({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}
function IconInfo({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </svg>
  );
}

const BODY_FONT = { fontSize: "clamp(0.875rem, 1.5vw, 0.9375rem)" };
const BODY_CLASS = "text-slate-700 leading-[1.9]";

// ─────────────────────────────────────────────
// ACCORDION — WAI-ARIA + animated grid-rows
// ─────────────────────────────────────────────
const Accordion = memo(function Accordion({
  id,
  index,
  number,
  title,
  isOpen,
  onToggle,
  children,
}) {
  const buttonId = `self-loader-btn-${id}`;
  const panelId = `self-loader-panel-${id}`;

  return (
    <div
      className={`group relative rounded-2xl border-2 mb-3 overflow-hidden bg-white
                  transition-all duration-300
                  ${isOpen
                    ? "border-[#1e88e5] shadow-lg shadow-[#1e88e5]/10"
                    : "border-slate-200 hover:border-slate-300 hover:shadow-md hover:shadow-slate-200/60"}`}
    >
      <h3 className="m-0 p-0 text-base font-normal leading-normal">
        <button
          id={buttonId}
          type="button"
          onClick={() => onToggle(index)}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="w-full flex items-center gap-3 sm:gap-4
                     px-4 sm:px-5 py-4 sm:py-5
                     text-left cursor-pointer
                     focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-700"
        >
          <span
            aria-hidden="true"
            className={`shrink-0 flex items-center justify-center
                        w-10 h-10 sm:w-11 sm:h-11 rounded-xl
                        text-xs sm:text-sm font-bold tracking-wider
                        transition-all duration-300
                        ${isOpen
                          ? "bg-[#1e88e5] text-white shadow-md shadow-[#1e88e5]/30 scale-105"
                          : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"}`}
          >
            {number}
          </span>

          <span
            className={`flex-1 font-semibold leading-snug
                        text-sm sm:text-base
                        transition-colors duration-200
                        ${isOpen ? "text-[#1e88e5]" : "text-slate-800"}`}
          >
            {title}
          </span>

          <span
            aria-hidden="true"
            className={`shrink-0 flex items-center justify-center w-8 h-8 rounded-full
                        transition-all duration-300
                        ${isOpen
                          ? "bg-[#1e88e5]/10 text-[#1e88e5] rotate-180"
                          : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"}`}
          >
            <IconChevron className="w-4 h-4" />
          </span>
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        aria-hidden={!isOpen}
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div
            className="px-4 sm:px-6 pb-5 sm:pb-6 pt-3
                       text-slate-700 leading-[1.85]
                       border-t border-slate-100
                       ml-4 sm:ml-6 mr-4 sm:mr-6 mb-4"
            style={BODY_FONT}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
});

// ─────────────────────────────────────────────
// RENDER CONTENT — parser numbered list + warning box
// ─────────────────────────────────────────────
const RenderContent = memo(function RenderContent({ text }) {
  const parsed = useMemo(() => {
    if (!text) return null;
    const lines = text.split("\n");
    const items = [];
    let currentItem = null;
    let beforeItems = [];
    let afterItems = [];
    let inAfter = false;

    lines.forEach((line) => {
      const match = line.match(/^(\d+)\.\s+(.+)$/);
      if (match) {
        if (currentItem) items.push(currentItem);
        currentItem = { number: match[1], title: match[2], desc: [] };
        inAfter = false;
      } else if (currentItem && !inAfter) {
        if (line.trim() === "") inAfter = true;
        else currentItem.desc.push(line);
      } else if (inAfter) {
        if (line.trim() !== "") afterItems.push(line);
      } else {
        if (line.trim() !== "") beforeItems.push(line);
      }
    });
    if (currentItem) items.push(currentItem);

    return { items, beforeItems, afterItems };
  }, [text]);

  if (!text || !parsed) return null;
  const { items, beforeItems, afterItems } = parsed;

  if (items.length === 0) {
    return (
      <p className="text-slate-700 leading-[1.85] whitespace-pre-line" style={BODY_FONT}>
        {text}
      </p>
    );
  }

  return (
    <div className="text-slate-700 leading-[1.85]" style={BODY_FONT}>
      {beforeItems.length > 0 && <p className="mb-4">{beforeItems.join(" ")}</p>}
      <div className="space-y-3 sm:space-y-4">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2">
            <span className="shrink-0 w-5 text-[#1e88e5] font-semibold">{item.number}.</span>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-slate-800">{item.title}</div>
              {item.desc.length > 0 && (
                <div className="text-slate-600 mt-0.5 space-y-1">
                  {item.desc.map((d, j) => (<p key={j}>{d}</p>))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {afterItems.length > 0 && (
        <div className="mt-4 space-y-2">
          {afterItems.map((item, i) => {
            const isWarning = /^(Perhatian|Caution|Warning|Penting|Important)\s*:/i.test(item);
            if (isWarning) {
              return (
                <div
                  key={i}
                  role="note"
                  className="rounded-lg bg-amber-50 border-l-4 border-amber-500
                             px-3.5 py-2.5 text-amber-900 text-[0.8125rem] leading-[1.7] font-medium"
                >
                  {item}
                </div>
              );
            }
            return <p key={i}>{item}</p>;
          })}
        </div>
      )}
    </div>
  );
});

// ─────────────────────────────────────────────
// DATA BILINGUAL
// (subtitle H1 TIDAK diubah · intro diperkaya · accordion #4 dipecah)
// ─────────────────────────────────────────────
const data = {
  id: {
    title: "Self Loader",
    subtitle: "Sewa Alat Berat Self Loader Harga Terjangkau",
    thumbImage: "/proyek/proyek-49.webp",
    sectionWhat: "Mengenal Self Loader",

    sectionGuide: "Panduan Self Loader",
    sectionGuideTitle1: "Panduan ",
    sectionGuideTitle2: "Self Loader",
    sectionGuideTitle3: " untuk Proyek Konstruksi",

    // ✅ Intro diperkaya — 3 paragraf padat (~180 kata total)
    intro: [
      "Self loader adalah kendaraan angkut berat yang dilengkapi crane dan grapple (cakar) terpasang permanen di atas sasis truk, memungkinkannya memuat, mengangkat, dan menurunkan material secara mandiri tanpa bantuan alat berat lain. Konfigurasi ini menjadikannya solusi efisien untuk pengangkutan kayu log, pipa, beton precast, dan material panjang lainnya.",
      "Dengan kapasitas angkat umumnya berkisar 3–10 ton tergantung tipe dan ukuran unit, self loader banyak digunakan di sektor kehutanan, konstruksi, pertanian, hingga pertambangan. Kemampuannya menjangkau area terpencil tanpa forklift atau crane tambahan membuat biaya operasional lebih hemat dibanding kombinasi truk dan alat berat terpisah.",
      "Dalam memilih self loader, ada dua pertimbangan utama: ketersediaan suku cadang dan layanan perawatan, serta keandalan kapasitas angkat unit itu sendiri. Kami menyediakan self loader dengan grapple standar pabrikan, sasis sesuai standar transportasi internasional, dan dukungan teknis penuh untuk kebutuhan proyek Anda di Jabodetabek.",
    ],

    afterIntro: [
      "Di spesialisaspal.com, Anda mendapatkan self loader dengan kapasitas dan kualitas mumpuni — siap mendukung proyek konstruksi, kehutanan, dan pertambangan dengan harga kompetitif.",
    ],

    accordionItems: [
      {
        title: "Plus Minus Penggunaan Loader",
        paragraphs: [
          "Self loader menawarkan keunggulan utama: kemampuan memuat dan menurunkan material secara mandiri tanpa forklift atau crane pendamping — menghemat waktu, tenaga kerja, dan biaya sewa alat tambahan.",
          "Loader yang dipasang di belakang kabin memungkinkan trailer dinaikkan ke atas truk dengan lebih mudah, sehingga cocok untuk pengangkutan unit trailer kosong maupun pengoperasian antar lokasi proyek.",
          "Namun ada beberapa keterbatasan yang perlu dipertimbangkan. Sebagian operator merasa tenaga self loader kurang bertenaga untuk muatan sangat berat, dan loader yang dipasang di depan (dengan trailer penuh) menuntut trailer dilepas dulu dan diposisikan di samping sebelum bisa dimuat — prosesnya lebih lambat dibanding konfigurasi rear-mounted.",
        ],
      },
      {
        title: "Bahan Pembuatan Self Loader",
        paragraphs: [
          "Kualitas material sangat menentukan durabilitas self loader di medan berat. Sasis yang kami sediakan dirancang sesuai standar transportasi internasional, dengan panel \"I\" yang dilas mesin las untuk kekuatan sambungan maksimal.",
          "Panel dilas antara bagian bawah baja 120/12 mm atau flat top steel dengan pelat hub 5 mm — kombinasi ini menghasilkan daya tahan tinggi di segala kondisi jalan dan cuaca.",
          "Silinder hidrolik kerja ganda dibuat dari bahan berkekuatan tinggi (mutu ST 52-3) dan dilapisi krom keras (kualitas O-1040) hasil pemesinan presisi, sehingga tahan aus dan karat meski dipakai intensif.",
          "Sistem hidrolik terintegrasi dengan mesin untuk mengangkat muatan berat ke atas truk secara halus, aman, dan efisien — mengurangi risiko kerusakan material maupun unit.",
        ],
      },
      {
        title: "Peraturan Terkait Pengoperasian Self Loader di Jalan Raya",
        paragraphs: [
          "Di jalan raya, self loader tunduk pada peraturan kendaraan angkutan berat, khususnya terkait berat kotor kendaraan (GVW) yang diizinkan. Karena loader terpasang permanen di sasis, berat perangkat tersebut otomatis mengurangi jatah muatan truk.",
          "Kerugian muatan bisa mencapai 2,5 ton per perjalanan — artinya setiap trip mengangkut lebih sedikit material, sehingga biaya angkut per ton menjadi lebih mahal dibanding truk biasa tanpa loader.",
          "Karena itu, self loader paling ekonomis untuk pengangkutan material panjang (log, pipa, beton precast) yang memang membutuhkan kemampuan loading mandiri — bukan untuk material curah biasa yang bisa diangkut truk standar.",
        ],
      },
      {
        title: "Tips Menggunakan Self Loader Untuk Angkutan Kayu",
        paragraphs: [
          // ✅ Paragraf 1: intro + list 5 tips (dipecah)
          "Di spesialisaspal.com Anda dapat menyewa self loader dengan berbagai ukuran yang bisa disesuaikan dengan jenis pekerjaan. Untuk angkutan perkayuan, terapkan lima tips berikut agar kapasitas muatan log maksimal:\n1. Susun tumpukan log secara rapi dan bebas puing agar tidak ada ruang terbuang.\n2. Bentuk tumpukan membentuk sudut ke arah jalan untuk memangkas waktu bongkar.\n3. Pasang grapple berukuran lebih besar untuk menangani log panjang.\n4. Gunakan loader yang bisa dibongkar-pasang saat truk beroperasi di area yang sama, sehingga kapasitas angkut bertambah.\n5. Berikan pelatihan khusus kepada operator untuk meningkatkan produktivitas dan keamanan operasional.",
          // ✅ Paragraf 2: layanan tambahan (dipisah)
          "Selain self loader, kami juga menyediakan berbagai kendaraan angkut berat lain untuk proyek konstruksi, pertanian, kehutanan, jembatan, dan pertambangan.",
          // ✅ Paragraf 3: CTA lokasi (dipisah)
          "Tertarik menyewa? Kunjungi spesialisaspal.com, hubungi nomor telepon yang tertera di website, atau datang langsung ke Jalan Elang Raya No 1, Ciputat, Kedaung, Pamulang, Tangerang Selatan.",
        ],
      },
    ],

    ctaBadge: "Konsultasi Gratis",
    ctaTitle1: "Butuh sewa Self Loader? ",
    ctaTitle2: "Kami siap membantu.",
    ctaButton: "Hubungi via WhatsApp",
    ctaWaText: "Halo Tri Abadi Makmur, saya ingin konsultasi sewa self loader...",
  },

  en: {
    title: "Self Loader",
    subtitle: "Affordable Self Loader Heavy Equipment Rental",
    thumbImage: "/proyek/proyek-49.webp",
    sectionWhat: "About Self Loader",

    sectionGuide: "Self Loader Guide",
    sectionGuideTitle1: "Guide to ",
    sectionGuideTitle2: "Self Loader",
    sectionGuideTitle3: " for Construction Projects",

    // ✅ Intro diperkaya
    intro: [
      "A self loader is a heavy transport vehicle equipped with a permanently mounted crane and grapple on its truck chassis, allowing it to load, lift, and unload materials independently without the help of other heavy equipment. This configuration makes it an efficient solution for transporting logs, pipes, precast concrete, and other long materials.",
      "With lifting capacities typically ranging from 3 to 10 tons depending on the type and unit size, self loaders are widely used in forestry, construction, agriculture, and mining sectors. Their ability to reach remote areas without an additional forklift or crane makes operational costs more economical than combining a truck with separate heavy equipment.",
      "When choosing a self loader, there are two main considerations: spare parts availability and maintenance service, as well as the reliability of the unit's lifting capacity itself. We provide self loaders with manufacturer-standard grapples, chassis compliant with international transport standards, and full technical support for your project needs in Jabodetabek.",
    ],

    afterIntro: [
      "At spesialisaspal.com, you get a self loader with capable capacity and quality — ready to support construction, forestry, and mining projects at competitive prices.",
    ],

    accordionItems: [
      {
        title: "Pros and Cons of Using a Loader",
        paragraphs: [
          "A self loader offers a major advantage: the ability to load and unload materials independently without a forklift or crane companion — saving time, labor, and the cost of renting additional equipment.",
          "A loader mounted behind the cabin allows trailers to be lifted onto the truck more easily, making it suitable for transporting empty trailer units or operating between project sites.",
          "However, there are limitations to consider. Some operators feel the self loader is underpowered for very heavy loads, and a front-mounted loader (with a full trailer) requires the trailer to be detached first and positioned alongside before it can be loaded — a slower process compared to the rear-mounted configuration.",
        ],
      },
      {
        title: "Materials Used to Make Self Loader",
        paragraphs: [
          "Material quality greatly determines the durability of a self loader in heavy terrain. The chassis we provide is designed to international transport standards, with an \"I\" panel welded by a welding machine for maximum joint strength.",
          "The panel is welded between a 120/12 mm bottom steel or flat top steel with a 5 mm hub plate — this combination produces high durability in all road and weather conditions.",
          "The double-acting hydraulic cylinders are made of high-strength material (grade ST 52-3) and coated with hard chrome (quality O-1040) through precision machining, making them resistant to wear and rust even under intensive use.",
          "The hydraulic system is integrated with the engine to lift heavy loads onto the truck smoothly, safely, and efficiently — reducing the risk of damage to both the material and the unit.",
        ],
      },
      {
        title: "Regulations Related to Operating Self Loader on Public Roads",
        paragraphs: [
          "On public roads, self loaders are subject to heavy transport vehicle regulations, particularly regarding the permitted gross vehicle weight (GVW). Because the loader is permanently mounted on the chassis, its weight automatically reduces the truck's payload allowance.",
          "Payload loss can reach up to 2.5 tons per trip — meaning each trip carries less material, so the transport cost per ton becomes more expensive than a standard truck without a loader.",
          "Therefore, self loaders are most economical for transporting long materials (logs, pipes, precast concrete) that genuinely need self-loading capability — not for bulk materials that can be hauled by standard trucks.",
        ],
      },
      {
        title: "Tips on Using Self Loader for Timber Transport",
        paragraphs: [
          "At spesialisaspal.com you can rent a self loader of various sizes that can be adjusted to the type of work. For timber transport, apply the following five tips to maximize log load capacity:\n1. Arrange the log pile neatly and free of debris so no space is wasted.\n2. Form the pile at an angle toward the road to cut unloading time.\n3. Attach a larger grapple to handle long logs.\n4. Use a loader that can be disassembled when the truck operates in the same area, so the load capacity increases.\n5. Provide special training to operators to improve productivity and operational safety.",
          "In addition to self loaders, we also provide various other heavy transport vehicles for construction, agriculture, forestry, bridge, and mining projects.",
          "Interested in renting? Visit spesialisaspal.com, contact the phone number listed on the website, or come directly to Jalan Elang Raya No 1, Ciputat, Kedaung, Pamulang, South Tangerang.",
        ],
      },
    ],

    ctaBadge: "Free Consultation",
    ctaTitle1: "Need to rent a Self Loader? ",
    ctaTitle2: "We're ready to help.",
    ctaButton: "Contact via WhatsApp",
    ctaWaText: "Hello Tri Abadi Makmur, would like to consult about self loader rental...",
  },
};

// ─────────────────────────────────────────────
// HALAMAN: SELF LOADER
// ─────────────────────────────────────────────
export default function SelfLoader() {
  const { lang } = useLang();
  const d = data[lang] || data.id;

  const [openIndex, setOpenIndex] = useState(0);
  const [imgError, setImgError] = useState(false);

  const toggle = useCallback(
    (i) => setOpenIndex((prev) => (prev === i ? null : i)),
    []
  );

  return (
    <section
      aria-labelledby="self-loader-heading"
      className="relative bg-white pt-28 lg:pt-36 pb-20 lg:pb-28 overflow-hidden"
    >
      {/* Ornamen background halus */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-40 -left-32 w-80 h-80 bg-[#1e88e5] rounded-full blur-3xl opacity-[0.04]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-40 -right-32 w-80 h-80 bg-amber-500 rounded-full blur-3xl opacity-[0.05]"
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-5 lg:px-8">

        {/* ═══ 1. HEADER ═══ */}
        <Reveal delay={100} y={24}>
          <div className="text-center mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2.5 sm:gap-3 mb-4">
              <span className="w-8 sm:w-12 h-px bg-[#1e88e5]" aria-hidden="true" />
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#1e88e5] font-bold">
                {d.title}
              </span>
              <span className="w-8 sm:w-12 h-px bg-[#1e88e5]" aria-hidden="true" />
            </div>
            <h1
              id="self-loader-heading"
              className="font-light tracking-tight text-slate-900 leading-[1.15] text-balance max-w-3xl mx-auto"
              style={{ fontSize: "clamp(1.5rem, 4vw, 2.25rem)" }}
            >
              {d.subtitle}
              <span className="text-[#1e88e5]">.</span>
            </h1>
          </div>
        </Reveal>

        {/* ═══ 2. INTRO CARD ═══ */}
        <Reveal y={34} duration={800}>
          <div className="rounded-3xl bg-gradient-to-br from-slate-50 via-white to-blue-50/40 border border-slate-200 shadow-xl shadow-slate-200/40 p-6 sm:p-8 lg:p-10 mb-8 sm:mb-10">
            <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-6 md:gap-8 lg:gap-10 items-start">
              <div className="relative w-full max-w-[260px] mx-auto md:mx-0 aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 ring-1 ring-slate-200/80 shadow-lg shadow-slate-300/30">
                {imgError ? (
                  <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-xs font-semibold uppercase tracking-[0.2em] text-center px-3">
                    {d.title}
                  </div>
                ) : (
                  <Image
                    src={d.thumbImage}
                    alt={`${d.title} — ${d.subtitle}`}
                    width={520}
                    height={520}
                    priority
                    sizes="(max-width: 768px) 260px, 260px"
                    className="w-full h-full object-cover"
                    onError={() => setImgError(true)}
                  />
                )}
              </div>

              <div>
                <p className="text-[#1e88e5] uppercase tracking-[0.25em] text-[10px] sm:text-[11px] font-bold mb-3">
                  {d.sectionWhat}
                </p>
                <div className="space-y-3.5">
                  {d.intro.map((p, i) => (
                    <p key={i} className={BODY_CLASS} style={BODY_FONT}>
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ═══ 3. CALLOUT PEMBUKA (heading duplikat dihapus) ═══ */}
        <Reveal y={24}>
          <div className="relative rounded-2xl bg-slate-50 border border-slate-200 p-5 sm:p-7 mb-12 sm:mb-16 overflow-hidden">
            <span
              aria-hidden="true"
              className="absolute left-0 top-0 bottom-0 w-1 bg-[#1e88e5]"
            />
            <div className="flex items-start gap-3">
              <span className="shrink-0 w-9 h-9 rounded-lg bg-[#1e88e5]/10 text-[#1e88e5]
                              flex items-center justify-center mt-0.5">
                <IconInfo className="w-5 h-5" />
              </span>
              <div className="space-y-3 flex-1">
                {d.afterIntro.map((p, i) => (
                  <p key={i} className="text-slate-600 leading-[1.85]" style={BODY_FONT}>
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* ═══ 4. SECTION: PANDUAN SELF LOADER ═══ */}

        {/* 4a. Kicker + H2 */}
        <Reveal y={20}>
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="w-8 sm:w-12 h-px bg-[#1e88e5]" aria-hidden="true" />
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#1e88e5] font-bold">
                {d.sectionGuide}
              </span>
              <span className="w-8 sm:w-12 h-px bg-[#1e88e5]" aria-hidden="true" />
            </div>

            <h2
              className="font-light tracking-tight text-slate-900 leading-tight text-balance max-w-2xl mx-auto"
              style={{ fontSize: "clamp(1.25rem, 3vw, 1.75rem)" }}
            >
              {d.sectionGuideTitle1}
              <span className="font-semibold">{d.sectionGuideTitle2}</span>
              {d.sectionGuideTitle3}
            </h2>
          </div>
        </Reveal>

        {/* 4b. ACCORDION ITEMS */}
        {d.accordionItems.map((item, i) => {
          const number = String(i + 1).padStart(2, "0");
          return (
            <Reveal key={item.title} delay={80 + i * 60} y={24}>
              <Accordion
                id={`item-${i + 1}`}
                index={i}
                number={number}
                title={item.title}
                isOpen={openIndex === i}
                onToggle={toggle}
              >
                <div className="space-y-4">
                  {item.paragraphs.map((p, j) => (
                    <RenderContent key={j} text={p} />
                  ))}
                </div>
              </Accordion>
            </Reveal>
          );
        })}

        {/* ═══ 5. CTA PREMIUM ═══ */}
        <Reveal y={34}>
          <div className="relative mt-16 sm:mt-20 rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 p-8 sm:p-12 lg:p-14 text-center shadow-2xl shadow-slate-900/30">
            <div
              aria-hidden="true"
              className="absolute top-0 right-0 w-72 h-72 bg-[#1e88e5] rounded-full blur-3xl opacity-25 pointer-events-none"
            />
            <div
              aria-hidden="true"
              className="absolute bottom-0 left-0 w-72 h-72 bg-[#25D366] rounded-full blur-3xl opacity-[0.12] pointer-events-none"
            />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4da3ff]/10 border border-[#4da3ff]/25 mb-5">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"
                  aria-hidden="true"
                />
                <span className="text-[#4da3ff] text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-bold">
                  {d.ctaBadge}
                </span>
              </div>

              <h2
                className="text-white font-light tracking-tight leading-snug mb-6 sm:mb-8 text-balance"
                style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)" }}
              >
                {d.ctaTitle1}
                <span className="font-bold">{d.ctaTitle2}</span>
              </h2>

              <a
                href={`https://wa.me/6282258089367?text=${encodeURIComponent(d.ctaWaText)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2.5
                           px-7 sm:px-9 py-4 rounded-xl
                           bg-emerald-700 hover:bg-emerald-600
                           text-white font-bold
                           uppercase tracking-[0.12em] sm:tracking-[0.15em]
                           shadow-xl shadow-emerald-900/30
                           transition-all duration-300
                           hover:scale-[1.02]
                           focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                style={{ fontSize: "clamp(0.75rem, 1.2vw, 0.875rem)" }}
              >
                <IconWhatsApp className="w-5 h-5 shrink-0" />
                {d.ctaButton}
                <IconArrowRight className="w-4 h-4 shrink-0" />
              </a>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}