// src/components/PneumaticRoller.jsx
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
  id, index, number, title, isOpen, onToggle, children,
}) {
  const buttonId = `pneumatic-btn-${id}`;
  const panelId = `pneumatic-panel-${id}`;

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
// RENDER CONTENT — parser numbered + bullet list + warning box
// ─────────────────────────────────────────────
const RenderContent = memo(function RenderContent({ text }) {
  const blocks = useMemo(() => {
    if (!text) return null;
    const lines = text.split("\n");
    const result = [];
    let numberedItems = [];
    let currentItem = null;
    let bullets = [];
    let paragraph = [];

    const flushParagraph = () => {
      if (paragraph.length > 0) {
        result.push({ type: "paragraph", content: paragraph.join(" ") });
        paragraph = [];
      }
    };
    const flushBullets = () => {
      if (bullets.length > 0) {
        result.push({ type: "bullets", items: [...bullets] });
        bullets = [];
      }
    };
    const flushNumbered = () => {
      if (currentItem) {
        numberedItems.push(currentItem);
        currentItem = null;
      }
      if (numberedItems.length > 0) {
        result.push({ type: "numbered", items: [...numberedItems] });
        numberedItems = [];
      }
    };

    lines.forEach((line) => {
      const trimmed = line.trim();
      const numberedMatch = trimmed.match(/^(\d+)\.\s+(.+)$/);
      const bulletMatch = trimmed.startsWith("• ") || trimmed.startsWith("- ");

      if (numberedMatch) {
        flushParagraph();
        flushBullets();
        if (currentItem) numberedItems.push(currentItem);
        currentItem = { number: numberedMatch[1], title: numberedMatch[2], desc: [] };
      } else if (bulletMatch) {
        flushParagraph();
        flushNumbered();
        bullets.push(trimmed.slice(2));
      } else if (trimmed === "") {
        flushParagraph();
        flushBullets();
        flushNumbered();
      } else {
        if (currentItem) {
          currentItem.desc.push(trimmed);
        } else {
          flushBullets();
          paragraph.push(trimmed);
        }
      }
    });
    flushParagraph();
    flushBullets();
    flushNumbered();

    return result;
  }, [text]);

  if (!text || !blocks) return null;

  return (
    <div className="text-slate-700 leading-[1.85] space-y-3" style={BODY_FONT}>
      {blocks.map((block, i) => {
        if (block.type === "paragraph") {
          return <p key={i}>{block.content}</p>;
        }
        if (block.type === "bullets") {
          return (
            <ul key={i} className="space-y-1.5 pl-1">
              {block.items.map((item, j) => (
                <li key={j} className="flex gap-2">
                  <span aria-hidden="true" className="text-[#1e88e5] shrink-0 font-bold">•</span>
                  <span className="flex-1">{item}</span>
                </li>
              ))}
            </ul>
          );
        }
        if (block.type === "numbered") {
          return (
            <div key={i} className="space-y-2">
              {block.items.map((item, j) => (
                <div key={j} className="flex gap-2">
                  <span className="shrink-0 w-5 text-[#1e88e5] font-semibold">{item.number}.</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-slate-800">{item.title}</div>
                    {item.desc.length > 0 && (
                      <div className="text-slate-600 mt-0.5 space-y-1">
                        {item.desc.map((d, k) => (<p key={k}>{d}</p>))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
});

// ─────────────────────────────────────────────
// DATA BILINGUAL
// (subtitle H1 TIDAK diubah · intro diperkaya · fragment dikonsolidasi)
// ─────────────────────────────────────────────
const data = {
  id: {
    title: "Pneumatic Roller",
    subtitle: "Rental Alat Berat Pneumatic Roller Murah Jabodetabek",
    thumbImage: "/proyek/proyek-51.webp",
    sectionWhat: "Mengenal Pneumatic Roller",

    sectionGuide: "Panduan Pneumatic Roller",
    sectionGuideTitle1: "Panduan ",
    sectionGuideTitle2: "Pneumatic Roller",
    sectionGuideTitle3: " untuk Pemadatan Jalan",

    // ✅ Intro diperkaya — 3 paragraf padat (~150 kata)
    intro: [
      "Pneumatic roller (pneumatic-tired roller) adalah alat berat pemadat yang menggunakan roda karet bertekanan angin (bukan drum baja) sebagai media pemadatan. Susunan roda depan dan belakang berselang-seling dengan jumlah total 9–19 roda, dirancang agar seluruh permukaan jalan tergilas merata tanpa ada bagian yang terlewat.",
      "Dengan bobot operasional mencapai 80 ton dan kemampuan memadatkan timbunan hingga kedalaman 24 inci per lintasan, pneumatic roller sangat efektif untuk pemadatan material granular (kerikil, pasir, agregat) maupun lapisan aspal hot mix pada tahap intermediate — menghasilkan permukaan yang padat, rata, dan siap dilanjutkan ke tahap finishing.",
      "Berbeda dari roller drum baja, pneumatic roller bekerja dengan efek meremas (kneading) yang membuat partikel material saling mengunci lebih rapat — sangat cocok untuk jalan raya, landasan pacu, dan jalan lingkungan perumahan. PT Tri Abadi Makmur menyediakan sewa pneumatic roller terawat beserta operator berpengalaman untuk kebutuhan proyek Anda di Jabodetabek.",
    ],

    // ✅ Callout pembuka (konsisten dengan halaman lain)
    afterIntro: [
      "Pneumatic roller menjadi pilihan utama saat pekerjaan pemadatan membutuhkan hasil yang lebih padat dan rata dibanding roller drum baja — terutama pada lapisan aspal hot mix dan material granular. Berikut ulasan lengkap pengertian, fungsi, prinsip kerja, dan syarat pemadatannya.",
    ],

    accordionItems: [
      {
        title: "Pengertian",
        paragraphs: [
          // ✅ Konsolidasi 6 fragment → 2 paragraf + 1 bullet block
          "Mesin gilas pneumatic adalah mesin gilas dengan roda karet bertekanan angin. Alat ini dilengkapi susunan roda di bagian depan dan belakang yang berselang-seling — tujuannya agar bagian yang tidak tergilas oleh roda depan dapat tergilas oleh roda belakang, sehingga pemadatan merata di seluruh permukaan.",
          "Jumlah roda pada pneumatic roller umumnya berkisar 9–19 buah, dengan konfigurasi sebagai berikut:",
          "• 9 buah roda (4 roda di depan dan 5 di belakang)\n• 11 buah roda (5 roda depan dan 6 roda belakang)\n• 13 buah roda (6 roda depan dan 7 roda belakang)\n• 15 buah roda (7 roda depan dan 8 roda belakang)",
        ],
      },
      {
        title: "Fungsi",
        paragraphs: [
          // ✅ Konsolidasi 5 fragment → 3 paragraf utuh
          "Pneumatic roller umumnya digunakan pada pengerjaan material granular seperti kerikil, pasir, dan agregat. Alat ini juga dipakai untuk memadatkan lapisan hot mix pada tahap intermediate (pemadatan antara) sebelum finishing dengan roller drum baja.",
          "Namun alat ini tidak disarankan untuk digunakan pada tanah berbatu atau tajam — karena roda karet akan lebih cepat rusak dan aus. Pastikan medan kerja sudah dibersihkan dari material tajam sebelum pneumatic roller digunakan.",
          "Roda pneumatic roller dapat bergerak maju, digetarkan, dan digerakkan naik-turun untuk memberikan efek tumbukan yang lebih kuat pada material. Kombinasi gerakan ini menghasilkan pemadatan yang lebih dalam dibanding roller drum baja.",
        ],
      },
      {
        title: "Prinsip Kerja",
        paragraphs: [
          // ✅ Konsolidasi 10 fragment → 4 paragraf utuh
          "Roda pneumatic roller bekerja dengan cara memadatkan tanah menggunakan efek meremas (kneading effect) untuk memadatkan bagian bawah permukaan. Efek ini bisa ditingkatkan dengan menggoyang sumbu as pada roda agar mengikuti perubahan kontur permukaan tanah.",
          "Besarnya tekanan roda bergantung langsung pada tekanan angin di dalam ban. Semakin besar tekanan angin, semakin besar pula tekanan roda terhadap tanah — sehingga operator dapat mengatur intensitas pemadatan hanya dengan mengubah tekanan ban sesuai kebutuhan.",
          "Pneumatic roller memiliki bobot sekitar 80 ton dan mampu memadatkan material timbunan hingga kedalaman kurang lebih 24 inci per lintasan. Bobot ini masih bisa ditingkatkan dengan menambah ballast (air atau pasir) di dinding-dinding mesin untuk hasil pemadatan yang lebih maksimal.",
          "Kemampuan penyesuaian ballast dan tekanan angin inilah yang membuat pneumatic roller sangat fleksibel — bisa disesuaikan dari pemadatan awal dengan tekanan rendah hingga finishing dengan tekanan maksimum.",
        ],
      },
      {
        title: "Syarat Pemadatan Dengan Alat Pneumatic",
        paragraphs: [
          // ✅ Konsolidasi fragment + bullets tetap dipertahankan
          "Pneumatic roller memiliki beberapa syarat pemadatan yang didasarkan pada tiga parameter utama berikut:",
          "• Berat kotor peralatan\n• Berat per cm² lebar ban\n• Tekanan angin ban",
          "Kondisi tanah dan tahap pemadatan dapat mengubah tekanan ban yang dibutuhkan. Agar bekerja optimal, pneumatic roller sebaiknya memulai dengan tekanan angin rendah — tujuannya menimbulkan efek pengapungan dan peliputan permukaan tanah yang akan digilas.",
          "Pada lintasan berikutnya, tanah yang digilas sudah semakin padat sehingga tekanan angin harus dinaikkan hingga mencapai tekanan maksimum di lintasan akhir. Beberapa unit pneumatic roller modern sudah dilengkapi alat pengubah tekanan ban otomatis — bahkan bisa dilakukan tanpa menghentikan roller yang sedang bekerja.",
          "Penambahan tekanan angin pada pneumatic roller dapat dilakukan dengan beberapa cara berikut:",
          "• Merubah tekanan udara di dalam ban\n• Mengatur berat pemberat (ballast) pada alat\n• Menyiapkan roller dengan berat yang berbeda-beda",
        ],
      },
    ],

    ctaBadge: "Konsultasi Gratis",
    ctaTitle1: "Butuh sewa Pneumatic Roller? ",
    ctaTitle2: "Kami siap membantu.",
    ctaButton: "Hubungi via WhatsApp",
    ctaWaText: "Halo Tri Abadi Makmur, saya ingin konsultasi sewa pneumatic roller...",
  },

  en: {
    title: "Pneumatic Roller",
    subtitle: "Affordable Pneumatic Roller Heavy Equipment Rental in Jabodetabek",
    thumbImage: "/proyek/proyek-51.webp",
    sectionWhat: "About Pneumatic Roller",

    sectionGuide: "Pneumatic Roller Guide",
    sectionGuideTitle1: "Guide to ",
    sectionGuideTitle2: "Pneumatic Roller",
    sectionGuideTitle3: " for Road Compaction",

    // ✅ Intro diperkaya
    intro: [
      "A pneumatic roller (pneumatic-tired roller) is a compaction heavy equipment that uses air-pressurized rubber wheels (not steel drums) as its compaction medium. The front and rear wheel arrangement is staggered with a total of 9–19 wheels, designed so the entire road surface is rolled evenly without any section being missed.",
      "With an operating weight reaching 80 tons and the ability to compact embankments up to 24 inches deep per pass, pneumatic rollers are highly effective for compacting granular materials (gravel, sand, aggregate) and asphalt hot mix layers at the intermediate stage — producing a dense, flat surface ready for the finishing stage.",
      "Unlike steel drum rollers, pneumatic rollers work with a kneading effect that forces material particles to interlock more tightly — ideal for highways, runways, and residential roads. PT Tri Abadi Makmur provides well-maintained pneumatic roller rentals with experienced operators for your project needs in Jabodetabek.",
    ],

    afterIntro: [
      "Pneumatic rollers are the top choice when compaction work requires denser and flatter results than steel drum rollers — especially on hot mix asphalt layers and granular materials. Here is a complete review of their definition, function, working principle, and compaction requirements.",
    ],

    accordionItems: [
      {
        title: "Definition",
        paragraphs: [
          "The pneumatic roller machine is a roller machine with air-pressurized rubber wheels. This tool is equipped with a wheel arrangement at the front and rear that is staggered — the purpose is so that any section not rolled by the front wheels can be rolled by the rear wheels, achieving even compaction across the entire surface.",
          "The number of wheels on a pneumatic roller generally ranges from 9 to 19 pieces, with the following configurations:",
          "• 9 wheels (4 front and 5 rear)\n• 11 wheels (5 front and 6 rear)\n• 13 wheels (6 front and 7 rear)\n• 15 wheels (7 front and 8 rear)",
        ],
      },
      {
        title: "Function",
        paragraphs: [
          "Pneumatic rollers are generally used for granular material work such as gravel, sand, and aggregate. This tool is also used to compact hot mix layers at the intermediate stage (intermediate compaction) before finishing with a steel drum roller.",
          "However, this tool is not recommended on rocky or sharp terrain — because the rubber wheels will wear out faster and become damaged. Make sure the work area is cleared of sharp materials before using a pneumatic roller.",
          "The pneumatic roller's wheels can move forward, vibrate, and move up and down to provide a stronger impact effect on the material. This combination of movements produces deeper compaction compared to steel drum rollers.",
        ],
      },
      {
        title: "Working Principle",
        paragraphs: [
          "The pneumatic roller's wheels work by compacting the soil using a kneading effect to compact the subsurface. This effect can be enhanced by shaking the axle on the wheel to follow the changes in the soil surface contour.",
          "The amount of wheel pressure depends directly on the air pressure inside the tires. The greater the air pressure, the greater the wheel pressure on the soil — so the operator can adjust compaction intensity simply by changing the tire pressure as needed.",
          "A pneumatic roller weighs about 80 tons and can compact fill material to a depth of approximately 24 inches per pass. This weight can still be increased by adding ballast (water or sand) to the machine's walls for more optimal compaction results.",
          "This ability to adjust ballast and air pressure is what makes the pneumatic roller highly flexible — adaptable from initial compaction with low pressure to finishing with maximum pressure.",
        ],
      },
      {
        title: "Compaction Requirements with Pneumatic Equipment",
        paragraphs: [
          "The pneumatic roller has several compaction requirements based on three main parameters:",
          "• Gross weight of equipment\n• Weight per cm² tire width\n• Tire air pressure",
          "Soil conditions and the compaction stage can change the tire pressure needed. For optimal work, the pneumatic roller should start with low air pressure — the purpose is to create a floating and covering effect on the soil surface to be rolled.",
          "On the next pass, the rolled soil is already denser, so the air pressure must be increased until it reaches maximum pressure on the final pass. Some modern pneumatic roller units are already equipped with automatic tire pressure changers — this can even be done without stopping the working roller.",
          "Adding air pressure to the pneumatic roller can be done in several ways:",
          "• Changing the air pressure inside the tires\n• Adjusting the ballast weight on the tool\n• Providing rollers with different weights",
        ],
      },
    ],

    ctaBadge: "Free Consultation",
    ctaTitle1: "Need to rent a Pneumatic Roller? ",
    ctaTitle2: "We're ready to help.",
    ctaButton: "Contact via WhatsApp",
    ctaWaText: "Hello Tri Abadi Makmur, would like to consult about pneumatic roller rental...",
  },
};

// ─────────────────────────────────────────────
// HALAMAN: PNEUMATIC ROLLER
// ─────────────────────────────────────────────
export default function PneumaticRoller() {
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
      aria-labelledby="pneumatic-heading"
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
              id="pneumatic-heading"
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

        {/* ═══ 3. CALLOUT PEMBUKA ═══ */}
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

        {/* ═══ 4. SECTION: PANDUAN PNEUMATIC ROLLER ═══ */}

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