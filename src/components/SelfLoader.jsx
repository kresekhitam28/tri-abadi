// src/components/SelfLoader.jsx
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
    let afterParagraphs = [];
    let currentAfterParagraph = [];
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
        if (line.trim() === "") {
          if (currentAfterParagraph.length > 0) {
            afterParagraphs.push(currentAfterParagraph.join(" "));
            currentAfterParagraph = [];
          }
        } else {
          currentAfterParagraph.push(line.trim());
        }
      } else {
        if (line.trim() !== "") beforeItems.push(line.trim());
      }
    });
    if (currentItem) items.push(currentItem);
    if (currentAfterParagraph.length > 0) {
      afterParagraphs.push(currentAfterParagraph.join(" "));
    }

    return { items, beforeItems, afterParagraphs };
  }, [text]);

  if (!text || !parsed) return null;
  const { items, beforeItems, afterParagraphs } = parsed;

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
      {beforeItems.length > 0 && (
        <p className="mb-4">{beforeItems.join(" ")}</p>
      )}

      <div className="space-y-3 sm:space-y-4">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2">
            <span className="shrink-0 w-5 text-slate-700">{item.number}.</span>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-slate-800">{item.title}</div>
              {item.desc.length > 0 && (
                <div className="text-slate-600 mt-0.5">
                  {item.desc.map((d, j) => (
                    <p key={j}>{d}</p>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {afterParagraphs.length > 0 && (
        <div className="mt-4 space-y-3">
          {afterParagraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      )}
    </div>
  );
});

// ─── DATA BILINGUAL ──────────────────────────
const data = {
  id: {
    title: "Self Loader",
    subtitle: "Sewa Alat Berat Self Loader Harga Terjangkau",
    thumbImage: "/proyek/proyek-49.webp",
    fallbackImage: "/proyek/proyek-49.webp",
    intro: [
      "Self loader – merupakan salah satu jenis kendaraan alat angkut berat.",
      "Dalam memilih, para operator akan mempertimbangkan dua hal, pertama suku cadang dan ketersediaan layanan perawatan kendaraannya, kedua keandalan dan kapasitas angkat dari self loader itu sendiri.",
      "Kebanyakan operator memilih grapple yang dipasang sebagai standar oleh pihak pabrikan.",
    ],
    after: [
      "Di konstruksi-jasa.com anda disediakan self loader yang mempunyai kapasitas dan kualitas mumpuni.",
    ],
    accordionItems: [
      {
        title: "Plus Minus Penggunaan Loader",
        paragraphs: [
          "Beberapa operator merasa bahwa beberapa self loader kurang bertenaga untuk menghasilkan kapasitas angkut yang memadai.",
          "Memiliki loader yang dipasang di belakang kabin akan memungkinkan untuk membawa trailer ke atas truk.",
          "Kerugian dari loader yang dipasang di depan (dengan unit trailer penuh) adalah bahwa untuk dapat memuat trailer ke atas, maka trailer tersebut harus dilepas dari truk dan diposisikan di sampingnya.",
        ],
      },
      {
        title: "Bahan Pembuatan Self Loader",
        paragraphs: [
          "Sasis yang dirancang pada self loader sudah sesuai dengan standar transportasi internasional dan juga memiliki panel “I” yang dilas oleh mesin las.",
          "Panel ini dilas antara bagian bawah 120/12 mm atau baja datar atas dan pelat hub 5 mm dengan daya tahan tinggi untuk memungkinkan untuk dapat lebih efisien di bawah semua kondisi jalan dan cuaca.",
          "Self loader ini dilengkapi dengan silinder hidrolik kerja ganda, dibuat dari bahan berkekuatan tinggi (mutu ST 52-3).",
          "Bermesin presisi, material berkekuatan tinggi yang dilapisi krom keras (kualitas O -1040).",
          "Dalam sistem kerja hidroliknya meliputi ; kerja mesin, dan sistem hidroliknya itu sendiri, dirancang untuk dapat menaikkan muatan ke atas truk.",
        ],
      },
      {
        title: "Peraturan Terkait Pengoperasian Self Loader di Jalan Raya",
        paragraphs: [
          "Peraturan kendaraan angkutan berat (tentang berat kotor kendaraan yang berlaku untuk pengangkutan di jalan raya).",
          "Berimplikasi pada self loader yang pada chasisnya ditambahi dengan perlengkapan loader yang dipasang secara permanen, hal ini akan mengurangi kapasitas muatan truk tersebut.",
          "Kerugian muatan yang berkurang ini hingga mencapai 2,5 ton, alhasil akan mengakibatkan biaya angkut akan menjadi bertambah banyak dan semakin mahal.",
        ],
      },
      {
        title: "Tips Menggunakan Self Loader Untuk Angkutan Kayu",
        paragraphs: [
          "Di konstruksi-jasa.com anda dapat menyewa self loader dengan berbagai ukuran dan dapat disesuaikan dengan pekerjaan yang akan anda lakukan.",
          "Apabila anda bergerak di bidang angkutan perkayuan, maka hal-hal berikut ini dapat anda terapkan guna meningkatkan kapasitas muatan:",
          "1. Memastikan cara penyusunan tumpukan kayu log diatur sedemikian rupa dengan cara merakit tumpukan secara rapi dan bebas dari puing.\n2. Membentuk tumpukan pada sudut ke jalan untuk mengurangi atau menghemat waktu bongkar.\n3. Menyambungkan grapple yang lebih besar ke unit-unit yang menangani kayu log panjang.\n4. Menggunakan loader yang dapat dibongkar pasang, terutama ketika truk melakukan perjalanan ke area yang sama. Hal ini bertujuan untuk dapat meningkatkan kapasitas.\n5. Memberikan pelatihan khusus untuk meningkatkan produktivitas operator kendaraan dan keamanan operasional truk.\n\nItu tadi lima tips agar dapat memuat kayu log secara maksimal ke atas self loader dan di konstruksi-jasa.com.\n\nJuga menyediakan berbagai jenis kendaraan angkutan berat yang bisa disewa untuk pekerjaan proyek-proyek konstruksi, pertanian, kehutanan, jembatan, pertambangan dan lainnya.\n\nBila anda berminat menyewa kendaraan berat tersebut silahkan kunjungi website konstruksi-jasa.com atau bisa juga menghubungi kontak nomor telepon yang tersedia di website tersebut.\n\nAtau kalau anda berdomisili di Tangerang Selatan, silahkan datang langsung ke alamat Jalan Elang Raya No 1 Ciputat Kedaung Pamulang Tangerang Selatan.",
        ],
      },
    ],
    ctaBadge: "Konsultasi Gratis",
    ctaTitle1: "Butuh sewa Self Loader? ",
    ctaTitle2: "Kami siap membantu.",
    ctaButton: "Hubungi via WhatsApp",
    ctaWaText: "Halo%20Tri%20Abadi%20Makmur%2c%20saya%20ingin%20konsultasi%20sewa%20self%20loader...",
  },
  en: {
    title: "Self Loader",
    subtitle: "Affordable Self Loader Heavy Equipment Rental",
    thumbImage: "/proyek/proyek-49.webp",
    fallbackImage: "/proyek/proyek-49.webp",
    intro: [
      "Self loader – is one type of heavy transport vehicle.",
      "When choosing, operators will consider two things: first, spare parts and vehicle maintenance service availability; second, the reliability and lifting capacity of the self loader itself.",
      "Most operators choose grapple that is installed as standard by the manufacturer.",
    ],
    after: [
      "At konstruksi-jasa.com you are provided with a self loader that has capable capacity and quality.",
    ],
    accordionItems: [
      {
        title: "Pros and Cons of Using a Loader",
        paragraphs: [
          "Some operators feel that some self loaders are underpowered to produce adequate transport capacity.",
          "Having a loader mounted behind the cabin will allow for carrying trailers onto the truck.",
          "The disadvantage of the front-mounted loader (with a full trailer unit) is that in order to load the trailer on top, the trailer must be detached from the truck and positioned alongside.",
        ],
      },
      {
        title: "Materials Used to Make Self Loader",
        paragraphs: [
          "The chassis designed on the self loader complies with international transportation standards and also has an \"I\" panel welded by a welding machine.",
          "This panel is welded between a 120/12 mm bottom or flat top steel and a 5 mm hub plate with high durability to allow for more efficiency under all road and weather conditions.",
          "This self loader is equipped with double-acting hydraulic cylinders, made of high-strength material (grade ST 52-3).",
          "Precision-machined, high-strength material coated with hard chrome (quality O-1040).",
          "Its hydraulic working system includes engine work, and the hydraulic system itself, designed to be able to raise loads onto the truck.",
        ],
      },
      {
        title: "Regulations Related to Operating Self Loader on Public Roads",
        paragraphs: [
          "Regulations on heavy transport vehicles (concerning gross vehicle weight applicable to road transport).",
          "Implies that the self loader, whose chassis is fitted with permanently mounted loader equipment, will reduce the truck's load capacity.",
          "The loss of load reduced by up to 2.5 tons will result in transport costs increasing and becoming more expensive.",
        ],
      },
      {
        title: "Tips on Using Self Loader for Timber Transport",
        paragraphs: [
          "At konstruksi-jasa.com you can rent a self loader of various sizes and can be adjusted to the work you will do.",
          "If you are in the timber transport business, the following can be applied to increase load capacity:",
          "1. Ensuring the arrangement of the log pile is managed in such a way by assembling the pile neatly and free of debris.\n2. Forming the pile at an angle to the road to reduce or save unloading time.\n3. Attaching a larger grapple to units handling long logs.\n4. Using a loader that can be disassembled, especially when the truck travels to the same area. This aims to be able to increase capacity.\n5. Providing special training to increase vehicle operator productivity and truck operational safety.\n\nThose are five tips to load logs maximally onto the self loader and at konstruksi-jasa.com.\n\nAlso provides various types of heavy transport vehicles that can be rented for construction, agriculture, forestry, bridge, mining, and other project work.\n\nIf you are interested in renting these heavy vehicles, please visit the konstruksi-jasa.com website or you can also contact the telephone number available on that website.\n\nOr if you are domiciled in South Tangerang, please come directly to the address Jalan Elang Raya No 1 Ciputat Kedaung Pamulang South Tangerang.",
        ],
      },
    ],
    ctaBadge: "Free Consultation",
    ctaTitle1: "Need to rent a Self Loader? ",
    ctaTitle2: "We're ready to help.",
    ctaButton: "Contact via WhatsApp",
    ctaWaText: "Hello%20Tri%20Abadi%20Makmur%2c%20would%20like%20to%20consult%20about%20self%20loader%20rental...",
  },
};

const labels = {
  id: { open: "Buka", close: "Tutup" },
  en: { open: "Open", close: "Close" },
};

// ─── HALAMAN ─────────────────────────────────
export default function SelfLoader() {
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
                        gap-4 sm:gap-5 mt-5 sm:mt-6 mb-6 sm:mb-8">
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

        {/* ═══ AFTER INTRO ═══ */}
        <div className="space-y-2.5 sm:space-y-3 mb-8 sm:mb-10">
          {d.after.map((p, i) => (
            <Reveal key={i} delay={i * 50} y={18}>
              <p
                className="text-slate-700 leading-[1.85]"
                style={{ fontSize: "clamp(0.8125rem, 1.5vw, 0.875rem)" }}
              >
                {p}
              </p>
            </Reveal>
          ))}
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