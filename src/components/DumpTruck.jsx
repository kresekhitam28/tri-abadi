// src/components/DumpTruck.jsx
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
  const buttonId = `dump-btn-${id}`;
  const panelId = `dump-panel-${id}`;

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
// RENDER CONTENT — paragraph + numbered + bullets
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
    title: "Troncon / Dump Truck",
    subtitle: "Sewa Tronton atau Dump Truck Murah Jabodetabek",
    thumbImage: "/proyek/proyek-54.webp",
    sectionWhat: "Mengenal Dump Truck",

    sectionGuide: "Panduan Dump Truck",
    sectionGuideTitle1: "Jenis & ",
    sectionGuideTitle2: "Kegunaan",
    sectionGuideTitle3: " Dump Truck",

    // ✅ Intro 3 paragraf padat (~150 kata) — sebelumnya hanya 2 paragraf promosi
    intro: [
      "Dump truck (atau tronton untuk konfigurasi sumbu roda tertentu) adalah kendaraan angkut berat yang dirancang khusus untuk mengangkut material curah seperti tanah, pasir, batu, agregat, dan bahan bangunan. Bedanya dengan truk biasa: bak muatannya bisa diangkat secara hidrolik untuk menumpahkan isi dengan cepat — tanpa perlu bongkar manual.",
      "Sistem kerjanya mengandalkan komponen hidrolik berupa ram (silinder) yang dipasang di antara kabin dan bak. Saat ram diaktifkan, bak terangkat dan material meluncur keluar karena gravitasi. Efisiensi bongkar-muat inilah yang menjadikan dump truck tulang punggung proyek konstruksi, pertambangan, dan pekerjaan infrastruktur jalan.",
      "Dump truck tersedia dalam banyak varian — dari standar jalan raya (on-road), off-road untuk tambang, hingga konfigurasi trailer untuk kapasitas ekstra. PT Tri Abadi Makmur menyediakan sewa dump truck dan tronton terawat untuk kebutuhan proyek Anda di Jabodetabek dengan harga kompetitif dan operator berpengalaman.",
    ],

    // ✅ Callout pembuka
    afterIntro: [
      "Memilih tipe dump truck yang tepat sangat menentukan efisiensi biaya dan kelancaran proyek — karena setiap varian punya kapasitas, medan operasi, dan batasan regulasi yang berbeda. Berikut ulasan lengkap kegunaan dan berbagai varian dump truck yang kami sediakan.",
    ],

    accordionItems: [
      {
        title: "Kegunaan Dump Truck",
        paragraphs: [
          // ✅ Konsolidasi 2 fragment → 2 paragraf utuh
          "Hampir semua proyek konstruksi — mulai dari pembangunan gedung, jalan, jembatan, hingga pekerjaan tambang — membutuhkan dump truck untuk kelancaran operasional. Tanpa alat ini, proses pemindahan material akan jauh lebih lambat dan mahal.",
          "Dump truck berfungsi memindahkan agregat (pasir, kerikil, batu, tanah) dari satu titik ke titik lain secara efisien. Sistem hidrolik pada bagian belakang memungkinkan bak terangkat dan menumpahkan muatan dengan cepat — menghemat waktu dan tenaga kerja bongkar-muat secara signifikan.",
        ],
      },
      {
        title: "Dump Truck Dan Berbagai Variannya",
        paragraphs: [
          // ✅ Konsolidasi + diperkaya sedikit
          "Dump truck tersedia dalam banyak bentuk dan ukuran — disesuaikan dengan medan operasi, kapasitas muatan, dan regulasi jalan raya setempat. Memahami jenis-jenisnya akan membantu Anda memilih unit yang paling efisien untuk proyek.",
          "Berikut akan dijelaskan jenis-jenis dump truck yang biasa digunakan dalam industri konstruksi dan bisa Anda dapatkan di spesialisaspal.com — mulai dari off-road, transfer, side dump, standar, hingga konfigurasi trailer khusus.",
        ],
      },
      {
        title: "Dump Truck Off Road",
        paragraphs: [
          // ✅ Konsolidasi 4 fragment → 2 paragraf
          "Off-road dump truck — juga dikenal sebagai truk artikulasi (articulated dump truck) — adalah truk berukuran besar yang digunakan untuk operasi penambangan atau situasi di mana sejumlah besar agregat harus diangkut di medan kasar. Ukurannya yang masif dan body yang berat membuatnya ideal untuk medan off-road, namun tidak disarankan untuk jalan perkotaan.",
          "Jenis ini mampu mengangkut beban hingga 60 ton per trip. Konstruksinya dilengkapi engsel (articulation joint) di antara kabin dan ruang kemudi — memungkinkan truk bermanuver di jalur sempit dan berbelok tajam meski bertubuh besar.",
        ],
      },
      {
        title: "Transfer Dump Truck",
        paragraphs: [
          // ✅ Konsolidasi 6 fragment → 3 paragraf
          "Transfer dump truck adalah truk yang ditarik oleh trailer terpisah. Karakteristik utamanya: trailer memiliki kontainer kargo yang bisa dipindahkan secara mandiri dari truk utama. Konfigurasi ini memaksimalkan kapasitas muatan tanpa mengorbankan kemampuan manuver.",
          "Kontainer terpisah ini didukung motor listrik yang dipasang pada traktor dan berjalan di atas roda yang menggelinding ke kerangka trailer dump truck utama. Ada variasi yang memungkinkan penambahan kontainer kargo lain ke truk utama — menghasilkan kapasitas angkut berganda.",
          "Perhatian: konfigurasi transfer dump truck tidak diizinkan di semua negara karena pembatasan berat kendaraan. Pastikan Anda memeriksa regulasi setempat sebelum menggunakan tipe ini di jalan raya umum.",
        ],
      },
      {
        title: "Side Dump Truk",
        paragraphs: [
          // ✅ Konsolidasi 5 fragment → 2 paragraf
          "Side dump truck adalah salah satu dump truck tercepat untuk membongkar muatan — karena baknya miring ke samping (bukan ke belakang) untuk membuang material. Truk ini memiliki salah satu kapasitas terbesar di antara semua jenis dump truck.",
          "Namun, side dump truck punya keterbatasan: kemampuan manuver yang lebih rendah dibanding tipe standar, dan muatannya lebih sedikit dibanding dump truck standar. Karena karakteristiknya, tipe ini tidak selalu cocok untuk semua kegiatan proyek — lebih ideal untuk pekerjaan di area terbuka dengan ruang bongkar yang lebar.",
        ],
      },
      {
        title: "Dump Truk Standar",
        paragraphs: [
          // ✅ Konsolidasi 5 fragment → 2 paragraf
          "Dump truck standar adalah jenis yang paling umum digunakan di industri konstruksi. Sasis truk diangkat oleh ram hidrolik yang dipasang di antara kabin dan bodi truk — memungkinkan pembongkaran cepat dan efisien ke arah belakang.",
          "Jenis ini memiliki satu as roda depan dan satu atau lebih as belakang, dengan konfigurasi umum roda enam (6x4) atau roda sepuluh (10x4). Dump truck standar punya kemampuan bermanuver yang sangat baik di jalan raya, namun tidak dapat dioperasikan di atas tanah lunak atau medan off-road ekstrem.",
        ],
      },
      {
        title: "Truck Dan PUP",
        paragraphs: [
          // ✅ 1 kalimat diperkaya konteks (PUP = Pup Trailer)
          "Truk dan PUP (Pup Trailer) sangat mirip dengan dump truck standar, namun memiliki perbedaan utama: trailer PUP dilengkapi ram hidrolik sendiri — sehingga mampu melakukan dumping secara mandiri tanpa bergantung pada hidrolik truk utama. Konfigurasi ini meningkatkan fleksibilitas operasional dan kapasitas angkut total, dengan catatan membutuhkan keterampilan operator lebih tinggi saat bermanuver.",
        ],
      },
      {
        title: "Superdump Truck",
        paragraphs: [
          // ✅ Konsolidasi 2 fragment → 1 paragraf padat
          "Superdump truck adalah varian unik yang dirancang untuk membawa beban besar dengan distribusi berat yang lebih baik di sepanjang sasis. Truk ini sangat berguna untuk aplikasi aspal dan paving beton — karena mampu mengangkut hot mix dalam volume besar sekaligus menjaga kualitas material tetap konsisten hingga tiba di lokasi hamparan.",
        ],
      },
      {
        title: "Semi Trailer End",
        paragraphs: [
          // ✅ 1 kalimat diperkaya
          "Semi trailer end (end dump semi trailer) adalah truk dengan trailer dua poros yang memiliki sistem hidrolik sendiri. Pembongkaran dilakukan dengan mengangkat bagian depan trailer ke atas — material meluncur keluar dari ujung belakang. Konfigurasi ini cocok untuk pengangkutan material curah jarak jauh dengan kapasitas besar, dan banyak digunakan di proyek infrastruktur skala besar.",
        ],
      },
      {
        title: "Semi Trailer Bottom",
        paragraphs: [
          // ✅ Konsolidasi 2 fragment → 1 paragraf
          "Semi trailer bottom serupa dengan semi trailer end, namun sistem dump-nya menggunakan clamshell dump gate di bagian tengah bawah trailer — bukan di ujung belakang. Keuntungan terbesar dari tipe ini adalah kemampuannya meletakkan material di lokasi spesifik dan area sempit, seperti untuk pengaspalan jalan dengan elevasi presisi atau penimbunan area terbatas.",
        ],
      },
      {
        title: "Double And Triple Trailer Bottom",
        paragraphs: [
          // ✅ Konsolidasi 2 fragment → 1 paragraf
          "Double and triple trailer bottom terdiri dari traktor dua poros yang menarik semi-trailer gandar tunggal hingga dua trailer penuh — menghasilkan kapasitas angkut yang sangat besar dalam sekali perjalanan. Kekurangan utama tipe ini adalah kesulitan bermanuver, terutama saat harus mundur di area sempit atau berbelok tajam.",
        ],
      },
    ],

    // ✅ Penutup baru — recap + CTA
    penutup: [
      "Itulah berbagai jenis dan kegunaan dump truck yang kami sediakan di PT Tri Abadi Makmur. Setiap tipe memiliki keunggulan spesifik — pemilihan yang tepat akan mengoptimalkan biaya operasional dan memperlancar proyek Anda.",
      "Untuk informasi lebih lanjut, konsultasi pemilihan tipe, atau penawaran harga sewa dump truck dan tronton, kunjungi spesialisaspal.com atau hubungi WhatsApp kami untuk konsultasi gratis.",
    ],

    ctaBadge: "Konsultasi Gratis",
    ctaTitle1: "Butuh sewa Dump Truck? ",
    ctaTitle2: "Kami siap membantu.",
    ctaButton: "Hubungi via WhatsApp",
    ctaWaText: "Halo Tri Abadi Makmur, saya ingin konsultasi sewa dump truck...",
  },

  en: {
    title: "Troncon / Dump Truck",
    subtitle: "Affordable Tronton or Dump Truck Rental in Jabodetabek",
    thumbImage: "/proyek/proyek-54.webp",
    sectionWhat: "About Dump Truck",

    sectionGuide: "Dump Truck Guide",
    sectionGuideTitle1: "Types & ",
    sectionGuideTitle2: "Uses",
    sectionGuideTitle3: " of Dump Truck",

    // ✅ Intro diperkaya
    intro: [
      "A dump truck (or tronton for certain axle configurations) is a heavy transport vehicle specifically designed to haul bulk materials such as soil, sand, stone, aggregate, and construction materials. The key difference from a regular truck: its cargo bed can be lifted hydraulically to dump the contents quickly — without manual unloading.",
      "The working system relies on a hydraulic component called a ram (cylinder) mounted between the cabin and the bed. When the ram is activated, the bed lifts and material slides out by gravity. This loading-unloading efficiency is what makes dump trucks the backbone of construction projects, mining operations, and road infrastructure work.",
      "Dump trucks come in many variants — from standard on-road trucks, off-road for mining, to trailer configurations for extra capacity. PT Tri Abadi Makmur provides well-maintained dump truck and tronton rentals for your project needs in Jabodetabek with competitive prices and experienced operators.",
    ],

    afterIntro: [
      "Choosing the right dump truck type greatly determines cost efficiency and project smoothness — because each variant has different capacity, operating terrain, and regulatory restrictions. Here is a complete review of the uses and various dump truck variants we provide.",
    ],

    accordionItems: [
      {
        title: "Uses of Dump Truck",
        paragraphs: [
          "Almost all construction projects — from building construction, roads, bridges, to mining work — require dump trucks for operational smoothness. Without this machine, the material transfer process would be much slower and more expensive.",
          "Dump trucks function to move aggregates (sand, gravel, stone, soil) from one point to another efficiently. The hydraulic system at the rear allows the bed to lift and dump the load quickly — significantly saving unloading time and labor.",
        ],
      },
      {
        title: "Dump Truck and Its Various Variants",
        paragraphs: [
          "Dump trucks come in many shapes and sizes — tailored to operating terrain, load capacity, and local road regulations. Understanding the types will help you choose the most efficient unit for your project.",
          "Here we will explain the types of dump trucks commonly used in the construction industry that you can get at spesialisaspal.com — from off-road, transfer, side dump, standard, to special trailer configurations.",
        ],
      },
      {
        title: "Off-Road Dump Truck",
        paragraphs: [
          "An off-road dump truck — also known as an articulated dump truck — is a large truck used for mining operations or situations where large amounts of aggregate must be hauled on rough terrain. Its massive size and heavy body make it ideal for off-road conditions, but not recommended for urban roads.",
          "This type can haul loads up to 60 tons per trip. Its construction features an articulation joint between the cabin and the cab — allowing the truck to maneuver on narrow paths and make sharp turns despite its large body.",
        ],
      },
      {
        title: "Transfer Dump Truck",
        paragraphs: [
          "A transfer dump truck is a truck pulled by a separate trailer. Its main characteristic: the trailer has a cargo container that can be moved independently from the main truck. This configuration maximizes load capacity without sacrificing maneuverability.",
          "This separate container is supported by an electric motor mounted on the tractor and runs on wheels that roll onto the trailer frame of the main dump truck. There are variations that allow adding another cargo container to the main truck — resulting in multiplied hauling capacity.",
          "Caution: the transfer dump truck configuration is not permitted in all countries due to vehicle weight restrictions. Make sure to check local regulations before using this type on public roads.",
        ],
      },
      {
        title: "Side Dump Truck",
        paragraphs: [
          "The side dump truck is one of the fastest dump trucks for unloading loads — because its bed tilts to the side (not rearward) to dispose of material. This truck has one of the largest capacities among all dump truck types.",
          "However, side dump trucks have limitations: lower maneuverability compared to standard types, and their load is smaller than what standard dump trucks can carry. Because of its characteristics, this type is not always suitable for all project activities — more ideal for work in open areas with wide unloading space.",
        ],
      },
      {
        title: "Standard Dump Truck",
        paragraphs: [
          "The standard dump truck is the most commonly used type in the construction industry. The truck chassis is lifted by a hydraulic ram mounted between the cabin and the truck body — allowing quick and efficient rearward dumping.",
          "This type has one front axle and one or more rear axles, with common six-wheel (6x4) or ten-wheel (10x4) configurations. Standard dump trucks have excellent maneuverability on roads, but cannot be operated on soft ground or extreme off-road terrain.",
        ],
      },
      {
        title: "Truck and PUP",
        paragraphs: [
          "Truck and PUP (Pup Trailer) is very similar to a standard dump truck, but with a key difference: the PUP trailer is equipped with its own hydraulic ram — so it can perform dumping independently without relying on the main truck's hydraulics. This configuration increases operational flexibility and total hauling capacity, though it requires higher operator skill when maneuvering.",
        ],
      },
      {
        title: "Superdump Truck",
        paragraphs: [
          "The superdump truck is a unique variant designed to carry large loads with better weight distribution along the chassis. This truck is very useful for asphalt and concrete paving applications — because it can haul hot mix in large volumes while maintaining material quality consistently until it reaches the paving site.",
        ],
      },
      {
        title: "Semi Trailer End",
        paragraphs: [
          "The semi trailer end (end dump semi trailer) is a truck with a two-axle trailer that has its own hydraulic system. Dumping is done by lifting the front of the trailer upward — material slides out from the rear end. This configuration is suitable for long-distance bulk material transport with large capacity, and is widely used in large-scale infrastructure projects.",
        ],
      },
      {
        title: "Semi Trailer Bottom",
        paragraphs: [
          "Semi trailer bottom is similar to semi trailer end, but its dump system uses a clamshell dump gate at the middle bottom of the trailer — not at the rear end. The biggest advantage of this type is its ability to place material at specific locations and narrow areas, such as for precise-elevation road paving or limited-area backfilling.",
        ],
      },
      {
        title: "Double and Triple Trailer Bottom",
        paragraphs: [
          "Double and triple trailer bottom consists of a two-axle tractor pulling a single-axle semi-trailer up to two full trailers — producing very large hauling capacity in a single trip. The main disadvantage of this type is maneuvering difficulty, especially when reversing in tight areas or making sharp turns.",
        ],
      },
    ],

    penutup: [
      "Those are the various types and uses of dump trucks we provide at PT Tri Abadi Makmur. Each type has specific advantages — the right choice will optimize operational costs and smooth your project.",
      "For further information, type selection consultation, or dump truck and tronton rental quotes, visit spesialisaspal.com or contact us via WhatsApp for a free consultation.",
    ],

    ctaBadge: "Free Consultation",
    ctaTitle1: "Need to rent a Dump Truck? ",
    ctaTitle2: "We're ready to help.",
    ctaButton: "Contact via WhatsApp",
    ctaWaText: "Hello Tri Abadi Makmur, would like to consult about dump truck rental...",
  },
};

// ─────────────────────────────────────────────
// HALAMAN: DUMP TRUCK
// ─────────────────────────────────────────────
export default function DumpTruck() {
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
      aria-labelledby="dump-heading"
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
              id="dump-heading"
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

        {/* ═══ 4. SECTION: PANDUAN DUMP TRUCK ═══ */}

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