// src/components/DumpTruck.jsx
"use client";

import { useState, useEffect, useRef, useCallback, useMemo, memo } from "react";
import { useLang } from "../context/LanguageContext";

// ─── HOOK: DETEKSI MOBILE ────────────────────
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

// ─── HOOK: REVEAL ON SCROLL ──────────────────
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

// ─── KOMPONEN: REVEAL WRAPPER ────────────────
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
}

// ─── IKON ────────────────────────────────────
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

// ─── ACCORDION (memoized) ────────────────────
const Accordion = memo(function Accordion({
  title, isOpen, onToggle, children, labels,
}) {
  return (
    <div
      className={`border rounded-xl overflow-hidden mb-2.5 bg-white
                  transition-colors duration-200
                  ${isOpen ? "border-[#1e88e5]" : "border-slate-200"}`}
      style={{ contain: "layout paint style" }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center gap-3 sm:gap-4
                   px-4 sm:px-5 py-3.5 sm:py-4
                   text-left cursor-pointer transition-colors duration-150"
      >
        <span
          className={`flex-1 font-semibold uppercase tracking-[0.12em]
                      ${isOpen ? "text-[#1e88e5]" : "text-slate-800"}`}
          style={{ fontSize: "clamp(0.75rem, 1.5vw, 0.84375rem)" }}
        >
          {title}
        </span>
        <span
          className={`shrink-0 px-2.5 sm:px-3.5 py-1.5 rounded-full border
                      font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em]
                      transition-colors duration-150
                      ${isOpen
                        ? "bg-[#1e88e5] text-white border-[#1e88e5]"
                        : "bg-white text-slate-500 border-slate-300"}`}
          style={{ fontSize: "clamp(0.5625rem, 1vw, 0.625rem)" }}
        >
          {isOpen ? labels.close : labels.open}
        </span>
      </button>

      {isOpen && (
        <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-1
                        text-slate-700 leading-[1.85]
                        border-t border-slate-100 space-y-4"
             style={{ fontSize: "clamp(0.8125rem, 1.5vw, 0.875rem)" }}>
          {children}
        </div>
      )}
    </div>
  );
});

// ─── RENDER CONTENT (memoized) ───────────────
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
      <p className="text-slate-700 leading-[1.85] whitespace-pre-line"
         style={{ fontSize: "clamp(0.8125rem, 1.5vw, 0.875rem)" }}>
        {text}
      </p>
    );
  }

  return (
    <div className="text-slate-700 leading-[1.85]"
         style={{ fontSize: "clamp(0.8125rem, 1.5vw, 0.875rem)" }}>
      {beforeItems.length > 0 && (<p className="mb-4">{beforeItems.join(" ")}</p>)}
      <div className="space-y-3 sm:space-y-4">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2">
            <span className="shrink-0 w-5 text-slate-700">{item.number}.</span>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-slate-800">{item.title}</div>
              {item.desc.length > 0 && (
                <div className="text-slate-600 mt-0.5">
                  {item.desc.map((d, j) => (<p key={j}>{d}</p>))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {afterItems.length > 0 && (<p className="mt-4">{afterItems.join(" ")}</p>)}
    </div>
  );
});

// ─── DATA BILINGUAL ──────────────────────────
const data = {
  id: {
    title: "Troncon / Dump Truck",
    subtitle: "Sewa Tronton atau Dump Truck Murah Jabodetabek",
    thumbImage: "/proyek/proyek-54.webp",
    fallbackImage: "/proyek/proyek-54.webp",
    intro: [
      "Dump Truck – Anda sedang mencari dump truck? Langsung saja buka website konstruksi-jasa.com, di sini Anda akan menemukan dump truck yang bisa disewa untuk pekerjaan Anda.",
      "Dump truck ini dirancang untuk mengangkut bahan bangunan dan mengangkut tanah dan batu.",
    ],
    accordionItems: [
      {
        title: "Kegunaan Dump Truck",
        paragraphs: [
          "Banyak proyek dibangun yang membutuhkan peralatan untuk membantu penyelesaian pekerjaan.",
          "Dump truck digunakan untuk memindahkan agregat dari satu titik ke titik lain dan menggunakan sistem kerja atau komponen hidrolik untuk mengangkat isi belakang sehingga muatan dapat diturunkan.",
        ],
      },
      {
        title: "Dump Truck Dan Berbagai Variannya",
        paragraphs: [
          "Dump truck ini tersedia dalam banyak bentuk dan ukuran, apakah anda tahu jenis-jenisnya?",
          "Kalau belum, berikut akan dijelaskan jenis-jenisnya yang biasa digunakan dalam industri konstruksi yang bisa anda dapatkan di konstruksi-jasa.com.",
        ],
      },
      {
        title: "Dump Truck Off Road",
        paragraphs: [
          "Juga dikenal sebagai truk artikulasi, off-road dump truck adalah truk besar yang digunakan untuk operasi penambangan atau dalam situasi di mana sejumlah besar agregat harus diangkut.",
          "Ukurannya yang besar dan body-nya yang berat membuatnya ideal untuk situasi off-road (medan kasar) dan tidak disarankan untuk digunakan di jalan perkotaan.",
          "Jenis ini mampu menangani/mengangkut beban hingga 60 ton.",
          "Dump truck artikulasi memiliki engsel di antara kabin dan ruang kemudi.",
        ],
      },
      {
        title: "Transfer Dump Truck",
        paragraphs: [
          "Transfer dump truck adalah truk yang ditarik oleh trailer terpisah.",
          "Karakteristik utama dari jenis ini adalah bahwa trailer terpisah memiliki kontainer kargo yang dapat dipindahkan.",
          "Konfigurasi ini akan memaksimalkan kapasitas muatan tanpa kehilangan kemampuan untuk bermanuver.",
          "Wadah yang terpisah ini didukung oleh motor listrik yang dipasang pada traktor yang berjalan di atas roda yang menggelinding ke kerangka trailer dari dump truck utama.",
          "Ada variasi dari jenis yang memungkinkan anda untuk menambahkan kontainer kargo lain ke truk utama.",
          "Hati-hati, karena jenis konfigurasi ini tidak diperbolehkan di semua negara karena pembatasan beratnya.",
        ],
      },
      {
        title: "Side Dump Truk",
        paragraphs: [
          "Side Dump Truk adalah salah satu dump truk tercepat untuk membongkar muatan.",
          "Truk ini merupakan kendaraan yang memiliki salah satu kapasitas terbesar dari jenis truk dan truk ini memiliki karakteristik yang mana wadahnya akan miring ke samping untuk membuang materialnya.",
          "Truk ini memiliki kemampuan manuver yang terbatas.",
          "Karena karakteristiknya, truk ini tidak selalu dapat digunakan dalam kegiatan proyek.",
          "Jenis ini bermuatan lebih sedikit bila dibandingkan dengan muatan yang bisa diangkut oleh dump truck Standard.",
        ],
      },
      {
        title: "Dump Truk Standar",
        paragraphs: [
          "Truk jenis ini adalah truk yang paling umum digunakan dalam industri konstruksi.",
          "Sasis dump truk diangkat oleh ram hidrolik yang dipasang di antara kabin dan badan truk.",
          "Jenis ini memiliki satu as roda depan dan satu atau lebih as belakang.",
          "Konfigurasi umum untuk jenis ini mempunyai roda enam dan roda sepuluh.",
          "Truk jenis ini mempunyai kemampuan untuk bermanuver yang luar biasa, namun, truk jenis ini tidak dapat digunakan di atas tanah yang lunak.",
        ],
      },
      {
        title: "Truck Dan PUP",
        paragraphs: [
          "Kendaraan ini sangat mirip dengan dump truk tetapi mempunyai perbedaan yaitu memiliki ram hidrolik sendiri. Truk ini mampu melakukan dumping yang berdiri sendiri.",
        ],
      },
      {
        title: "Superdump Truck",
        paragraphs: [
          "Dump truk yang unik yang mampu membawa beban besar.",
          "Truk Superdump sangat berguna untuk aplikasi aspal dan paving beton.",
        ],
      },
      {
        title: "Semi Trailer End",
        paragraphs: [
          "Truk jenis ini memiliki trailer dua poros memiliki hidrolik sendiri.",
        ],
      },
      {
        title: "Semi Trailer Bottom",
        paragraphs: [
          "Truk ini serupa dengan dump truk end semi trailer di mana fitur dump adalah dump gate clamshell di bagian tengah bawah trailer.",
          "Keuntungan terbesar dari jenis ini adalah kemampuannya untuk meletakkan material dalam lokasi spesifik dan area yang sempit.",
        ],
      },
      {
        title: "Double And Triple Trailer Bottom",
        paragraphs: [
          "Terdiri dari traktor dua poros yang menarik semi-trailer gandar tunggal atau antara satu sampai dua trailer penuh.",
          "Kekurangan dari truk ini adalah kesulitan untuk mundur.",
        ],
      },
    ],
    ctaBadge: "Konsultasi Gratis",
    ctaTitle1: "Butuh sewa Dump Truck? ",
    ctaTitle2: "Kami siap membantu.",
    ctaButton: "Hubungi via WhatsApp",
    ctaWaText: "Halo%20Tri%20Abadi%20Makmur%2c%20saya%20ingin%20konsultasi%20sewa%20dump%20truck...",
  },
  en: {
    title: "Tronton / Dump Truck",
    subtitle: "Affordable Tronton or Dump Truck Rental in Jabodetabek",
    thumbImage: "/proyek/proyek-54.webp",
    fallbackImage: "/proyek/proyek-54.webp",
    intro: [
      "Dump Truck – Are you looking for a dump truck? Just open the konstruksi-jasa.com website, here you will find a dump truck you can rent for your work.",
      "This dump truck is designed to transport building materials and transport soil and stone.",
    ],
    accordionItems: [
      {
        title: "Uses of Dump Truck",
        paragraphs: [
          "Many built projects require equipment to help complete the work.",
          "Dump trucks are used to move aggregates from one point to another and use a working system or hydraulic components to lift the rear contents so the load can be lowered.",
        ],
      },
      {
        title: "Dump Truck and Its Various Variants",
        paragraphs: [
          "These dump trucks are available in many shapes and sizes, do you know the types?",
          "If not, the following will explain the types commonly used in the construction industry that you can get at konstruksi-jasa.com.",
        ],
      },
      {
        title: "Off-Road Dump Truck",
        paragraphs: [
          "Also known as articulated trucks, off-road dump trucks are large trucks used for mining operations or in situations where large amounts of aggregate must be transported.",
          "Their large size and heavy body make them ideal for off-road (rough terrain) situations and are not recommended for use on urban roads.",
          "This type is capable of handling/transporting loads up to 60 tons.",
          "Articulated dump trucks have a hinge between the cabin and the cab.",
        ],
      },
      {
        title: "Transfer Dump Truck",
        paragraphs: [
          "A transfer dump truck is a truck pulled by a separate trailer.",
          "The main characteristic of this type is that the separate trailer has a removable cargo container.",
          "This configuration will maximize load capacity without losing the ability to maneuver.",
          "This separate container is supported by an electric motor mounted on the tractor which runs on wheels that roll onto the trailer frame of the main dump truck.",
          "There are variations of this type that allow you to add other cargo containers to the main truck.",
          "Be careful, as this type of configuration is not allowed in all countries due to its weight restrictions.",
        ],
      },
      {
        title: "Side Dump Truck",
        paragraphs: [
          "Side Dump Truck is one of the fastest dump trucks for unloading loads.",
          "This truck is a vehicle that has one of the largest capacities of any truck type and this truck has the characteristic that its container tilts to the side to dispose of its material.",
          "This truck has limited maneuverability.",
          "Because of its characteristics, this truck cannot always be used in project activities.",
          "This type carries less load compared to the load that can be carried by a Standard dump truck.",
        ],
      },
      {
        title: "Standard Dump Truck",
        paragraphs: [
          "This type of truck is the most commonly used truck in the construction industry.",
          "The dump truck chassis is lifted by a hydraulic ram mounted between the cabin and the truck body.",
          "This type has one front axle and one or more rear axles.",
          "Common configurations for this type have six wheels and ten wheels.",
          "This type of truck has outstanding maneuverability, however, this type of truck cannot be used on soft ground.",
        ],
      },
      {
        title: "Truck and PUP",
        paragraphs: [
          "This vehicle is very similar to a dump truck but has a difference, namely having its own hydraulic ram. This truck is capable of performing dumping independently.",
        ],
      },
      {
        title: "Superdump Truck",
        paragraphs: [
          "A unique dump truck capable of carrying large loads.",
          "The Superdump truck is very useful for asphalt and concrete paving applications.",
        ],
      },
      {
        title: "Semi Trailer End",
        paragraphs: [
          "This type of truck has a two-axle trailer with its own hydraulics.",
        ],
      },
      {
        title: "Semi Trailer Bottom",
        paragraphs: [
          "This truck is similar to the semi trailer end dump truck where the dump feature is a clamshell dump gate in the middle bottom of the trailer.",
          "The biggest advantage of this type is its ability to place material in specific locations and narrow areas.",
        ],
      },
      {
        title: "Double and Triple Trailer Bottom",
        paragraphs: [
          "Consists of a two-axle tractor pulling a single-axle semi-trailer or between one to two full trailers.",
          "The disadvantage of this truck is the difficulty of reversing.",
        ],
      },
    ],
    ctaBadge: "Free Consultation",
    ctaTitle1: "Need to rent a Dump Truck? ",
    ctaTitle2: "We're ready to help.",
    ctaButton: "Contact via WhatsApp",
    ctaWaText: "Hello%20Tri%20Abadi%20Makmur%2c%20would%20like%20to%20consult%20about%20dump%20truck%20rental...",
  },
};

const labels = {
  id: { open: "Buka", close: "Tutup" },
  en: { open: "Open", close: "Close" },
};

// ─── HALAMAN ─────────────────────────────────
export default function DumpTruck() {
  const { lang } = useLang();
  const d = data[lang] || data.id;
  const L = labels[lang] || labels.id;

  const [openIndex, setOpenIndex] = useState(0);
  const toggle = useCallback((i) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  }, []);

  return (
    <section
      className="bg-white pt-28 lg:pt-36 pb-20 lg:pb-28"
      style={{ contain: "layout style" }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-5 lg:px-8">

        {/* ═══ HEADER ═══ */}
        <Reveal delay={80} y={24}>
          <div className="text-center mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2.5 sm:gap-3 mb-4">
              <span className="w-6 sm:w-10 h-px bg-[#1e88e5]" />
              <span className="text-[10px] sm:text-[11px] uppercase
                               tracking-[0.25em] sm:tracking-[0.3em]
                               text-[#1e88e5] font-semibold">
                {d.title}
              </span>
              <span className="w-6 sm:w-10 h-px bg-[#1e88e5]" />
            </div>
            <h1
              className="font-light tracking-tight text-slate-900 leading-tight max-w-3xl mx-auto"
              style={{ fontSize: "clamp(1.25rem, 4vw, 2.25rem)" }}
            >
              {d.subtitle}<span className="text-[#1e88e5]">.</span>
            </h1>
          </div>
        </Reveal>

        <Reveal delay={120} y={18}>
          <hr className="border-slate-300 mb-6 sm:mb-8" />
        </Reveal>

        {/* ═══ INTRO + GAMBAR ═══ */}
        <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr]
                        gap-4 sm:gap-5 mt-5 sm:mt-6 mb-8 sm:mb-10">
          <Reveal y={34} duration={800}>
            <div className="w-full sm:w-[180px] aspect-square overflow-hidden
                            border border-slate-300 rounded-xl bg-slate-100"
                 style={{ contain: "layout paint style" }}>
              <img
                src={d.thumbImage}
                alt={d.title}
                loading="eager"
                decoding="async"
                width={180}
                height={180}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = d.fallbackImage;
                }}
              />
            </div>
          </Reveal>

          <div className="space-y-2.5 sm:space-y-3">
            {d.intro.map((p, i) => (
              <Reveal key={i} delay={i * 50} y={20}>
                <p
                  className="text-slate-700 leading-[1.85]"
                  style={{ fontSize: "clamp(0.8125rem, 1.5vw, 0.875rem)" }}
                >
                  {p}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ═══ ACCORDION ═══ */}
        {d.accordionItems.map((item, i) => (
          <Reveal key={i} delay={i * 40} y={24}>
            <Accordion
              title={item.title}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
              labels={L}
            >
              {item.paragraphs.map((p, j) => (
                <RenderContent key={j} text={p} />
              ))}
            </Accordion>
          </Reveal>
        ))}

        {/* ═══ CTA ═══ */}
        <Reveal y={34}>
          <div className="mt-12 sm:mt-16 pb-12 sm:pb-16 text-center max-w-2xl mx-auto">
            <p className="text-[#1e88e5] text-[10px] uppercase tracking-[0.3em]
                          font-semibold mb-3">
              {d.ctaBadge}
            </p>
            <h3
              className="text-slate-900 font-light tracking-tight mb-5 sm:mb-6"
              style={{ fontSize: "clamp(1.125rem, 2.8vw, 1.5rem)" }}
            >
              {d.ctaTitle1}
              <span className="font-semibold">{d.ctaTitle2}</span>
            </h3>

            <a
              href={`https://wa.me/6282258089367?text=${d.ctaWaText}`}
              target="_blank"
              rel="noreferrer"
              aria-label={d.ctaButton}
              className="inline-flex items-center justify-center gap-2
                         px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl
                         bg-slate-900 text-white
                         hover:bg-[#1e88e5]
                         font-semibold text-[11px] sm:text-[12px]
                         uppercase tracking-[0.12em] sm:tracking-[0.15em]
                         transition-colors duration-200"
            >
              <IconWhatsApp className="w-4 h-4 shrink-0" />
              {d.ctaButton}
              <IconArrowRight className="w-3.5 h-3.5 shrink-0" />
            </a>
          </div>
        </Reveal>

      </div>
    </section>
  );
}