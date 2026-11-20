// src/components/AsphaltFinisher.jsx
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
  const buttonId = `finisher-btn-${id}`;
  const panelId = `finisher-panel-${id}`;

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
// RENDER CONTENT — parser numbered + bullet list
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
    title: "Asphalt Finisher",
    subtitle: "Menyewakan Alat Berat Asphalt Finisher Jabodetabek",
    thumbImage: "/proyek/proyek-53.webp",
    sectionWhat: "Mengenal Asphalt Finisher",

    sectionGuide: "Panduan Asphalt Finisher",
    sectionGuideTitle1: "Panduan ",
    sectionGuideTitle2: "Asphalt Finisher",
    sectionGuideTitle3: " untuk Pengaspalan Jalan",

    // ✅ Intro diperkaya — 3 paragraf padat (~150 kata)
    intro: [
      "Asphalt finisher adalah alat berat beroda crawler track yang berfungsi menghamparkan dan meratakan campuran aspal panas (hot mix) di atas permukaan jalan dengan ketebalan dan kerataan sesuai spesifikasi desain. Alat ini menjadi tulang punggung pekerjaan pengaspalan modern — menggantikan metode penghamparan manual yang lambat dan tidak konsisten.",
      "Sistem kerjanya: hot mix dituangkan ke hopper, dialirkan ke belakang melalui conveyor, lalu didistribusikan oleh screw (auger) ke seluruh lebar screed sebelum diratakan dan dipadatkan awal. Screed dilengkapi pemanas (heater) agar aspal tidak lengket dan hasil hamparan lebih presisi.",
      "Dengan kapasitas produksi hingga 50 ton per jam dan kecepatan operasional 1–1,5 meter per menit, asphalt finisher mampu menghasilkan hamparan aspal setebal 5 cm (belum dipadatkan hingga 14 cm) dengan kerataan yang jauh lebih baik dibanding cara manual. PT Tri Abadi Makmur menyediakan sewa asphalt finisher terawat beserta operator berpengalaman untuk proyek pengaspalan Anda di Jabodetabek.",
    ],

    // ✅ Callout pembuka
    afterIntro: [
      "Asphalt finisher menjadi kunci hasil akhir pengaspalan yang rata, halus, dan sesuai elevasi — sebelum masuk ke tahap pemadatan dengan tandem roller atau double drum roller. Berikut ulasan lengkap cara kerja, syarat kelayakan, dan aplikasinya untuk perbaikan jalan.",
    ],

    accordionItems: [
      {
        title: "Cara Kerja Asphalt Finisher",
        paragraphs: [
          // ✅ Konsolidasi 7 fragment → 3 paragraf utuh
          "Untuk menghasilkan bidang yang rata, ketinggian hamparan aspal harus mencapai hingga 14 cm dalam keadaan belum dipadatkan. Pisau perata (screed) di bagian belakang mesin mengatur ketebalan dan kerataan lapisan secara otomatis mengikuti elevasi yang diinginkan.",
          "Produksi asphalt finisher dapat mencapai 50 ton per jam dengan ketebalan lapisan 5 cm dan kecepatan operasional 1–1,5 meter per menit — cukup efisien untuk proyek jalan dengan target volume besar. Dengan kecepatan tersebut, mesin hanya membutuhkan tenaga penggerak sekitar 9 HP.",
          "Penghamparan dilakukan lapis demi lapis, setelah pekerjaan lapisan pondasi bawah (sub-base) selesai dikerjakan. Karena bentuk konstruksinya cukup besar, mobilisasi unit ke lokasi proyek harus menggunakan trailer — tidak bisa dikendarai sendiri di jalan raya.",
        ],
      },
      {
        title: "Syarat Asphalt Finisher Yang Layak Untuk Pekerjaan Pengaspalan",
        paragraphs: [
          // ✅ Bullets dirender sebagai <ul>
          "Asphalt finisher yang digunakan pada proyek konstruksi besar harus memenuhi beberapa persyaratan teknis yang relatif ketat, yaitu:",
          "1. Memiliki tingkat stabilitas yang cukup tinggi agar tidak mudah berubah bentuk saat menerima beban.\n2. Memiliki kemampuan daya gilas dan daya perata sehingga permukaan jalan nyaman dilalui kendaraan.\n3. Memiliki sambungan memanjang (longitudinal joint) dan melintang (transverse joint) yang baik, agar tidak mengganggu kenyamanan kendaraan yang melintas.\n4. Pada pembuatan jalan baru, asphalt finisher harus mampu mencampur material pada permukaan jalan yang baru dibuat — biasanya kondisinya masih baik karena kerikil dan batuan yang digunakan masih memiliki stabilitas tinggi.\n5. Asphalt finisher harus mampu membentuk sub-grade dengan baik, lereng yang tidak terlalu curam, dan menyiapkan base dengan material berkualitas. Apabila permukaan base tidak beraturan akibat hamparan aspal pertama, finisher harus bisa memperbaikinya pada hamparan aspal kedua bersamaan dengan proses pemadatan.",
        ],
      },
      {
        title: "Penggunaan Asphalt Finisher Untuk Perbaikan Jalan",
        paragraphs: [
          // ✅ Grammar rusak diperbaiki
          "Pelapisan ulang jalan raya berarti pemberian lapisan bituminous baru pada jalan lama yang kondisinya sudah tidak memenuhi syarat konstruksi yang baik. Pelapisan ulang umumnya dilakukan pada jalan rusak parah — baik retak, berlubang, maupun permukaan yang tidak rata.",
          "Selain memperbaiki kondisi permukaan, pelapisan ulang juga bertujuan memperpanjang usia jalan dan menciptakan lapisan anti-slip untuk keamanan kendaraan yang melintas. Asphalt finisher memainkan peran penting di sini — memastikan lapisan baru menempel sempurna dan rata dengan lapisan lama.",
        ],
      },
      {
        title: "Asphalt Finisher Untuk Pelapisan Ulang Jalan",
        paragraphs: [
          // ✅ Konsolidasi 7 fragment teknis → 3 paragraf (promosi dipindah ke penutup)
          "Pada pekerjaan pelapisan ulang, asphalt finisher berjalan di atas permukaan jalan lama dengan perhatian khusus pada traksi crawler — agar tidak selip saat mengangkut hopper berisi hot mix. Screed diselaraskan dengan elevasi perkerasan yang sudah ada agar hasil akhir menyatu sempurna.",
          "Pada penyambungan lapisan aspal baru dengan lapisan lama, penggunaan sedikit overlap akan mencegah terjadinya pengurangan ketebalan aspal di area sambungan. Ketebalan overlap harus cukup memadai sehingga saat roller memadatkan ulang, lapisan aspal baru hanya turun sampai level lapisan lama yang tepat di bawahnya.",
          "Untuk hasil maksimal, pastikan suhu hot mix tetap dalam rentang ideal (130–150°C) selama proses penghamparan. Suhu yang terlalu rendah membuat aspal mengeras sebelum sempat diratakan — sedangkan suhu terlalu tinggi membuat screed kesulitan mengontrol ketebalan.",
        ],
      },
    ],

    // ✅ Penutup — promosi dipisah dari accordion #4
    penutup: [
      "Asphalt finisher tersedia di PT Tri Abadi Makmur bersama beragam jenis kendaraan berat lainnya — mulai dari tandem roller, double drum roller, pneumatic roller, hingga dozer dan excavator. Semua unit dijamin handal, berkualitas, dan terawat untuk mendukung kelancaran proyek konstruksi Anda.",
      "Untuk informasi lebih lanjut, penawaran harga sewa, atau negosiasi paket pengaspalan, kunjungi spesialisaspal.com atau hubungi WhatsApp kami untuk konsultasi gratis.",
    ],

    ctaBadge: "Konsultasi Gratis",
    ctaTitle1: "Butuh sewa Asphalt Finisher? ",
    ctaTitle2: "Kami siap membantu.",
    ctaButton: "Hubungi via WhatsApp",
    ctaWaText: "Halo Tri Abadi Makmur, saya ingin konsultasi sewa asphalt finisher...",
  },

  en: {
    title: "Asphalt Finisher",
    subtitle: "Asphalt Finisher Heavy Equipment Rental in Jabodetabek",
    thumbImage: "/proyek/proyek-53.webp",
    sectionWhat: "About Asphalt Finisher",

    sectionGuide: "Asphalt Finisher Guide",
    sectionGuideTitle1: "Guide to ",
    sectionGuideTitle2: "Asphalt Finisher",
    sectionGuideTitle3: " for Road Paving",

    // ✅ Intro diperkaya
    intro: [
      "An asphalt finisher is a crawler-track heavy equipment that functions to spread and level hot mix asphalt on the road surface with thickness and flatness according to design specifications. This machine is the backbone of modern paving work — replacing the slow and inconsistent manual spreading method.",
      "Its working system: hot mix is poured into the hopper, flows to the rear through a conveyor, then distributed by an auger (screw) across the entire screed width before being leveled and pre-compacted. The screed is equipped with a heater so asphalt doesn't stick and the spread result is more precise.",
      "With production capacity up to 50 tons per hour and operational speed of 1–1.5 meters per minute, asphalt finishers can produce asphalt spreads 5 cm thick (up to 14 cm before compaction) with far better flatness than manual methods. PT Tri Abadi Makmur provides well-maintained asphalt finisher rentals with experienced operators for your paving projects in Jabodetabek.",
    ],

    afterIntro: [
      "Asphalt finishers are key to achieving a flat, smooth, and properly elevated paving result — before the compaction stage with tandem rollers or double drum rollers. Here is a complete review of their working principle, suitability requirements, and applications for road repair.",
    ],

    accordionItems: [
      {
        title: "How Asphalt Finisher Works",
        paragraphs: [
          "To produce a flat surface, the asphalt spread height must reach up to 14 cm in an uncompacted state. The screed blade at the rear of the machine automatically adjusts the layer's thickness and flatness following the desired elevation.",
          "Asphalt finisher production can reach 50 tons per hour with a 5 cm layer thickness and an operational speed of 1–1.5 meters per minute — efficient enough for road projects with large volume targets. At that speed, the machine only needs a drive engine of about 9 HP.",
          "Spreading is done layer by layer, after the sub-base layer work has been completed. Because its construction is quite large, mobilization to the project site must use a trailer — it cannot drive itself on public roads.",
        ],
      },
      {
        title: "Requirements for Asphalt Finisher Suitable for Paving Work",
        paragraphs: [
          "Asphalt finishers used in large construction projects must meet several relatively strict technical requirements, namely:",
          "1. Have a relatively high stability level so it does not easily deform under load.\n2. Have rolling ability and leveling capability so the road surface is comfortable for vehicles to pass through.\n3. Have good longitudinal joints and transverse joints, so as not to disturb the comfort of passing vehicles.\n4. In new road construction, the asphalt finisher must be able to mix material on the newly made road surface — usually in good condition because the gravel and rock used still have high stability.\n5. The asphalt finisher must be able to form a good sub-grade, gentle slopes, and prepare the base with quality material. If the base surface is irregular due to the first asphalt spread, the finisher must be able to fix it on the second asphalt spread together with the compaction process.",
        ],
      },
      {
        title: "Use of Asphalt Finisher for Road Repair",
        paragraphs: [
          "Road resurfacing means applying a new bituminous layer on old roads whose condition no longer meets good construction requirements. Resurfacing is generally done on heavily damaged roads — whether cracked, potholed, or with uneven surfaces.",
          "Besides repairing the surface condition, resurfacing also aims to extend the road's lifespan and create an anti-slip layer for the safety of passing vehicles. The asphalt finisher plays an important role here — ensuring the new layer adheres perfectly and is level with the old layer.",
        ],
      },
      {
        title: "Asphalt Finisher for Road Resurfacing",
        paragraphs: [
          "In resurfacing work, the asphalt finisher runs on the old road surface with special attention to crawler traction — to avoid slipping while carrying the hopper full of hot mix. The screed is aligned with the existing pavement elevation so the final result blends perfectly.",
          "When joining the new asphalt layer to the old layer, using a slight overlap prevents thickness reduction at the joint area. The overlap thickness must be adequate so that when the roller re-compacts, the new asphalt layer only drops to the level of the old layer directly below it.",
          "For maximum results, ensure the hot mix temperature stays within the ideal range (130–150°C) during the spreading process. Too low a temperature makes asphalt harden before it can be leveled — while too high a temperature makes it difficult for the screed to control thickness.",
        ],
      },
    ],

    penutup: [
      "Asphalt finishers are available at PT Tri Abadi Makmur along with various other heavy vehicles — from tandem rollers, double drum rollers, pneumatic rollers, to dozers and excavators. All units are guaranteed reliable, high-quality, and well-maintained to support the smooth running of your construction project.",
      "For further information, rental price quotes, or paving package negotiations, visit spesialisaspal.com or contact us via WhatsApp for a free consultation.",
    ],

    ctaBadge: "Free Consultation",
    ctaTitle1: "Need to rent an Asphalt Finisher? ",
    ctaTitle2: "We're ready to help.",
    ctaButton: "Contact via WhatsApp",
    ctaWaText: "Hello Tri Abadi Makmur, would like to consult about asphalt finisher rental...",
  },
};

// ─────────────────────────────────────────────
// HALAMAN: ASPHALT FINISHER
// ─────────────────────────────────────────────
export default function AsphaltFinisher() {
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
      aria-labelledby="finisher-heading"
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
              id="finisher-heading"
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

        {/* ═══ 4. SECTION: PANDUAN ASPHALT FINISHER ═══ */}

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

        {/* ═══ 5. PENUTUP ═══ */}
        <Reveal y={24}>
          <div className="mt-10 sm:mt-14 rounded-2xl bg-slate-50 border border-slate-200 p-5 sm:p-7 space-y-3">
            {d.penutup.map((p, i) => (
              <RenderContent key={i} text={p} />
            ))}
          </div>
        </Reveal>

        {/* ═══ 6. CTA PREMIUM ═══ */}
        <Reveal y={34}>
          <div className="relative mt-12 sm:mt-16 rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 p-8 sm:p-12 lg:p-14 text-center shadow-2xl shadow-slate-900/30">
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