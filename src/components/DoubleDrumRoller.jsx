// src/components/DoubleDrumRoller.jsx
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
  const buttonId = `ddr-btn-${id}`;
  const panelId = `ddr-panel-${id}`;

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
// (subtitle H1 TIDAK diubah · intro diperkaya · accordion #4 diisi sesuai judul)
// ─────────────────────────────────────────────
const data = {
  id: {
    title: "Double Drum Roller",
    subtitle: "Menyewakan Double Drum Roller Kebutuhan Pengaspalan Anda",
    thumbImage: "/proyek/proyek-50.webp",
    sectionWhat: "Mengenal Double Drum Roller",

    sectionGuide: "Panduan Double Drum Roller",
    sectionGuideTitle1: "Panduan ",
    sectionGuideTitle2: "Double Drum Roller",
    sectionGuideTitle3: " untuk Pengaspalan Jalan",

    // ✅ Intro diperkaya — 3 paragraf padat (~150 kata)
    intro: [
      "Double drum roller adalah alat berat pemadat dengan dua drum baja silindris yang dipasang di depan dan belakang, dirancang khusus untuk memadatkan lapisan aspal dan hot mix agar permukaan jalan menjadi rata, padat, dan tahan lama. Berbeda dari tandem roller yang fokus pada finishing halus, double drum roller lebih ideal untuk pemadatan awal pada area permukaan yang lebih rata.",
      "Bobot operasionalnya berkisar 1,5–13 ton tergantung tipe (mini hingga heavy-duty), dengan sistem vibratory yang menghasilkan getaran untuk memaksa partikel aspal saling mengunci rapat. Kecepatan operasional biasanya dibatasi 4–10 km/jam agar kepadatan maksimal tercapai tanpa merusak struktur aspal yang masih plastis.",
      "Double drum roller banyak digunakan pada pengaspalan jalan raya, jalan lingkungan perumahan, area parkir, trotoar aspal, hingga perbaikan jalan (patching). PT Tri Abadi Makmur menyediakan sewa double drum roller terawat beserta operator berpengalaman untuk kebutuhan pengaspalan Anda di seluruh Indonesia.",
    ],

    // ✅ Callout pembuka — grammar diperbaiki, dijadikan 1 paragraf padu
    afterIntro: [
      "Biasanya langkah awal dalam pengaspalan adalah pembentukan dan pemadatan dasar permukaan jalan. Double drum roller berperan vital pada tahap ini — memadatkan lapisan aspal dan hot mix agar diperoleh permukaan yang rata, padat, dan siap dilalui kendaraan.",
    ],

    accordionItems: [
      {
        title: "Tentukan Alat Yang Tepat",
        paragraphs: [
          // ✅ Typo "dumb" → "drum" + konsolidasi 3 fragment
          "Dalam membeli atau menyewa double drum roller, Anda harus memilih alat yang tepat sesuai kebutuhan konstruksi. Langkah pertama adalah memeriksa jenis tanah dan permukaan yang akan dikerjakan — untuk area kerikil dan berpasir, drum roller sangat cocok karena mampu memadatkan agregat secara merata.",
          "Namun double drum roller tidak cocok untuk semua pekerjaan. Jika tujuan Anda memecah aspal atau beton lama, alat yang digunakan adalah jack hammer, bukan roller. Memahami perbedaan fungsi alat akan menghemat biaya sewa dan waktu pengerjaan proyek Anda.",
        ],
      },
      {
        title: "Kualitas Alat",
        paragraphs: [
          // ✅ Konsolidasi 3 fragment → 2 paragraf utuh
          "Ketika memilih alat untuk proyek perataan jalan, perhatikan kualitas alat yang akan digunakan — karena ini akan menentukan hasil pengerjaan akhir. Sebelum menyewa, lakukan uji coba (trial) unit untuk memastikan kondisi mesin, drum, dan sistem hidroliknya berfungsi optimal.",
          "Jika saat percobaan alat dalam kondisi baik — tidak ada getaran abnormal, drum tidak aus berlebihan, dan sistem hidrolik responsif — maka unit siap disewa untuk proyek Anda. Jangan ragu menolak unit yang menunjukkan tanda-tanda keausan karena akan berdampak langsung pada hasil pemadatan.",
        ],
      },
      {
        title: "Jaminan Atau Garansi",
        paragraphs: [
          // ✅ Konsolidasi 4 fragment → 2 paragraf utuh
          "Jasa penyewaan alat roller biasanya memberikan garansi kepada pelanggannya. Garansi ini penting karena jika alat rusak saat digunakan (bukan akibat kelalaian operator), biaya perbaikan tidak menjadi tanggungan Anda sepenuhnya.",
          "Semakin lama masa garansi yang diberikan, semakin baik kualitas mesin yang disewakan — karena penyedia layanan yakin unitnya dalam kondisi prima. Pastikan juga alat pemadat selalu terawat dengan baik, dan tanyakan jadwal maintenance rutin sebelum menyewa.",
        ],
      },
      {
        title: "Ketersediaan Teknisi",
        paragraphs: [
          // ✅ ISI DIPERBAIKI TOTAL — sebelumnya tentang basecose, sekarang sesuai judul
          "Ketersediaan teknisi adalah faktor krusial dalam penyewaan double drum roller. Jika unit mengalami masalah teknis di tengah proyek, Anda membutuhkan teknisi yang siap datang cepat — bukan hanya menunggu berhari-hari. Pastikan penyedia layanan memiliki tim teknisi bersertifikat dan sistem panggilan darurat 24 jam.",
          "Selain teknisi perbaikan, ketersediaan operator berpengalaman juga tak kalah penting. Operator double drum roller harus terlatih mengatur kecepatan, frekuensi getaran, dan pola pemadatan — karena kesalahan kecil bisa membuat permukaan aspal tidak rata atau justru rusak.",
          "Di PT Tri Abadi Makmur, setiap penyewaan unit disertai operator bersertifikat dan dukungan teknisi yang siaga. Kami juga menyediakan konsultasi teknis sebelum proyek dimulai untuk memastikan alat yang dipilih sesuai medan dan spesifikasi pekerjaan.",
        ],
      },
      {
        title: "Ketersediaan Suku Cadang",
        paragraphs: [
          // ✅ Difokuskan ke suku cadang + maintenance preventif (tidak campur aduk)
          "Peralatan mesin seperti double drum roller pasti membutuhkan suku cadang seiring pemakaian — terutama pada komponen aus seperti drum, bearing, dan sistem hidrolik. Jika Anda menyewa unit tanpa jaminan ketersediaan suku cadang, kerugian terbesar adalah waktu tunggu perbaikan yang bisa menghentikan proyek berhari-hari.",
          "Pastikan penyedia sewa memiliki stok suku cadang original untuk tipe unit yang Anda gunakan. Suku cadang aftermarket murah kadang tampak menguntungkan, tapi memperpendek umur pakai mesin dan menurunkan kualitas pemadatan dalam jangka panjang.",
          "Sebagai langkah preventif, lakukan perawatan rutin: lumasi mesin dengan oli sebelum digunakan, pantau indikator suhu agar tidak overheat, dan berhenti sejenak jika mesin terlalu panas. Perawatan sederhana ini terbukti memperpanjang usia suku cadang hingga dua kali lipat.",
        ],
      },
    ],

    // ✅ Penutup — konsolidasi 12 fragment → 3 paragraf rapi
    penutup: [
      "Dalam proses pemadatan aspal dengan alat berat, ada beberapa hal penting yang harus diperhatikan. Saat hot mix dituangkan ke permukaan jalan, gunakan alat pemadat beroda baja (steel drum) untuk pemadatan awal, dengan kecepatan maksimal 4 km/jam — jangan terlalu cepat agar pemadatan tercapai sempurna.",
      "Setelah pemadatan awal, lanjutkan dengan pemadatan kedua menggunakan alat beroda karet (pneumatic-tired roller) pada kecepatan hingga 10 km/jam. Pengerjaan biasanya dilakukan memanjang, dan pada proses akhir kembali gunakan roller beroda baja agar permukaan lebih rapat, kuat, dan tahan lama. Untuk lajur menanjak, pemadatan dilakukan dari bagian yang lebih tinggi ke bagian yang lebih rendah agar material tidak bergeser.",
      "Kami menyarankan Anda menggunakan jasa konstruksi dari spesialisaspal.com — pelayanan 24 jam, menyediakan segala kebutuhan konstruksi, dan tenaga konstruksi berpengalaman yang siap mengerjakan seluruh tugas pemadatan jalan. Hubungi kami untuk konsultasi gratis atau penawaran sewa double drum roller sesuai kebutuhan proyek Anda.",
    ],

    ctaBadge: "Konsultasi Gratis",
    ctaTitle1: "Butuh sewa Double Drum Roller? ",
    ctaTitle2: "Kami siap membantu.",
    ctaButton: "Hubungi via WhatsApp",
    ctaWaText: "Halo Tri Abadi Makmur, saya ingin konsultasi sewa double drum roller...",
  },

  en: {
    title: "Double Drum Roller",
    subtitle: "Double Drum Roller Rental for Your Paving Needs",
    thumbImage: "/proyek/proyek-50.webp",
    sectionWhat: "About Double Drum Roller",

    sectionGuide: "Double Drum Roller Guide",
    sectionGuideTitle1: "Guide to ",
    sectionGuideTitle2: "Double Drum Roller",
    sectionGuideTitle3: " for Road Paving",

    // ✅ Intro diperkaya
    intro: [
      "A double drum roller is a compaction heavy equipment with two cylindrical steel drums mounted at front and rear, specifically designed to compact asphalt and hot mix layers so the road surface becomes flat, dense, and durable. Unlike tandem rollers that focus on fine finishing, double drum rollers are more ideal for initial compaction on flatter surface areas.",
      "Its operating weight ranges from 1.5–13 tons depending on type (mini to heavy-duty), with a vibratory system that generates vibration to force asphalt particles to interlock tightly. Operational speed is typically limited to 4–10 km/h so maximum density is achieved without damaging the still-plastic asphalt structure.",
      "Double drum rollers are widely used for paving highways, residential roads, parking areas, asphalt sidewalks, and road repairs (patching). PT Tri Abadi Makmur provides well-maintained double drum roller rentals with experienced operators for your paving needs across Indonesia.",
    ],

    afterIntro: [
      "Usually the first step in asphalt paving is the forming and compaction of the road surface base. Double drum rollers play a vital role at this stage — compacting asphalt and hot mix layers to obtain a flat, dense surface ready for vehicle traffic.",
    ],

    accordionItems: [
      {
        title: "Determine the Right Equipment",
        paragraphs: [
          "When buying or renting a double drum roller, you must choose the right equipment according to construction needs. The first step is to check the type of soil and surface to be worked on — for gravel and sandy areas, a drum roller is very suitable because it can compact aggregate evenly.",
          "However, a double drum roller is not suitable for all jobs. If your goal is to break old asphalt or concrete, the equipment used is a jack hammer, not a roller. Understanding the different functions of equipment will save on rental costs and project work time.",
        ],
      },
      {
        title: "Equipment Quality",
        paragraphs: [
          "When choosing equipment for a road leveling project, pay attention to the quality of the equipment to be used — because this will determine the final work result. Before renting, do a trial run of the unit to ensure the engine, drum, and hydraulic system are functioning optimally.",
          "If during the trial the equipment is in good condition — no abnormal vibration, drums not excessively worn, and responsive hydraulic system — the unit is ready to rent for your project. Do not hesitate to reject units showing signs of wear as this will directly affect the compaction result.",
        ],
      },
      {
        title: "Guarantee or Warranty",
        paragraphs: [
          "Services that rent out roller equipment usually give a warranty to their customers. This warranty is important because if the equipment is damaged during use (not due to operator negligence), the repair cost will not be your full responsibility.",
          "The longer the warranty period given, the better the quality of the engine being rented — because the service provider is confident in the pristine condition of the unit. Also make sure the compactor equipment is always well-maintained, and ask about the routine maintenance schedule before renting.",
        ],
      },
      {
        title: "Technician Availability",
        paragraphs: [
          "Technician availability is a crucial factor in double drum roller rental. If a unit experiences technical problems mid-project, you need a technician who can arrive quickly — not wait days. Make sure the service provider has a certified technician team and a 24-hour emergency call system.",
          "Beyond repair technicians, the availability of experienced operators is equally important. A double drum roller operator must be trained to adjust speed, vibration frequency, and compaction patterns — because a small mistake can make the asphalt surface uneven or even damaged.",
          "At PT Tri Abadi Makmur, every unit rental comes with a certified operator and on-call technician support. We also provide technical consultation before the project begins to ensure the chosen equipment matches the terrain and work specifications.",
        ],
      },
      {
        title: "Spare Parts Availability",
        paragraphs: [
          "Machine equipment like double drum rollers certainly requires spare parts over time — especially on wear components such as drums, bearings, and hydraulic systems. If you rent a unit without spare parts availability assurance, the biggest loss is the repair wait time that can halt your project for days.",
          "Make sure the rental provider has original spare parts stock for the type of unit you are using. Cheap aftermarket parts sometimes seem advantageous, but they shorten machine lifespan and reduce compaction quality in the long run.",
          "As a preventive step, do routine maintenance: lubricate the engine with oil before use, monitor temperature indicators to prevent overheating, and pause briefly if the engine is too hot. This simple maintenance is proven to extend spare parts lifespan by up to two times.",
        ],
      },
    ],

    penutup: [
      "In the asphalt compaction process with heavy equipment, there are several important things to observe. When hot mix is poured onto the road surface, use a steel drum compactor for initial compaction at a maximum speed of 4 km/h — don't go too fast so compaction is achieved perfectly.",
      "After the initial compaction, proceed with a second compaction using rubber-wheeled equipment (pneumatic-tired roller) at speeds up to 10 km/h. The work is usually done lengthwise, and in the final process, use a steel-wheeled roller again so the surface is denser, stronger, and more durable. For uphill lanes, compaction is done from the higher part to the lower part so material does not shift.",
      "We recommend you use construction services from spesialisaspal.com — 24-hour service, providing all construction needs, and experienced construction workers ready to carry out all road compaction tasks. Contact us for a free consultation or a double drum roller rental quote according to your project needs.",
    ],

    ctaBadge: "Free Consultation",
    ctaTitle1: "Need to rent a Double Drum Roller? ",
    ctaTitle2: "We're ready to help.",
    ctaButton: "Contact via WhatsApp",
    ctaWaText: "Hello Tri Abadi Makmur, would like to consult about double drum roller rental...",
  },
};

// ─────────────────────────────────────────────
// HALAMAN: DOUBLE DRUM ROLLER
// ─────────────────────────────────────────────
export default function DoubleDrumRoller() {
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
      aria-labelledby="ddr-heading"
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
              id="ddr-heading"
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

        {/* ═══ 4. SECTION: PANDUAN DOUBLE DRUM ROLLER ═══ */}

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