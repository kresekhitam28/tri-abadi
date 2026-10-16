// src/components/DoubleDrumRoller.jsx
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

// ─── KOMPONEN: RENDER KONTEN DENGAN LIST BERJENJANG (memoized) ────
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
    title: "Double Drum Roller",
    subtitle: "Menyewakan Double Drum Roller Kebutuhan Pengaspalan Anda",
    thumbImage: "/proyek/proyek-50.webp",
    fallbackImage: "/proyek/proyek-50.webp",
    intro: [
      "Double Drum Roller – Dalam sebuah konstruksi, tidak begitu saja kita berharap membutuhkan 2–3 drum, tetapi begitu anda bekerja di permukaan yang lebih rata dan rata.",
      "Ada banyak perusahaan yang harus diketahui untuk pengaspalan.",
      "Bila dibutuhkan juga mempersiapkan lahan yang ingin digunakan seperti jalan raya.",
    ],
    after: [
      "Biasanya langkah awal adalah dilakukan pembentukan terlebih dahulu terhadap pemadatan dasar permukaan jalan.",
      "Double drum roller merupakan alat yang digunakan dalam proses pekerjaan lahan yang sesuai landasan tanah, umum digunakan untuk memadatkan lebih aspal dan hot mix dengan cara meratakan.",
    ],
    accordionItems: [
      {
        title: "Tentukan Alat Yang Tepat",
        paragraphs: [
          "Dalam membeli atau menyewa alat double dumb roller anda harus memilih alat yang tepat sesuai kebutuhan konstruksi.",
          "Periksalah dahulu jenis tanah yang akan dikerjakan, pada daerah krikil dan berpasir memang cocok menggunakan drum roller.",
          "Lain halnya jika kita akan memecah aspal ataupun beton yang menggunakan jack hammer.",
        ],
      },
      {
        title: "Kualitas Alat",
        paragraphs: [
          "Ketika memilih alat untuk proyek perataan jalan, perhatikan juga kualitas alat yang akan digunakan.",
          "Hal tersebut akan menentukan hasil pengerjaan, uji alat yang akan disewa ini sangat di perlukan.",
          "Jika saat percobaan alat ini dalam kondisi baik, bisa anda sewa untuk segera penggarapan proyek.",
        ],
      },
      {
        title: "Jaminan Atau Garansi",
        paragraphs: [
          "Jasa yang menyewakan alat roller biasanya memberikan garansi pada pelanggannya.",
          "Hal ini di perlukan jika suatu saat alat yang anda gunakan rusak, tidak menjadi tanggungan anda sepenuhnya.",
          "Semakin lama garansi yang di berikan maka semakin baik mesin yang akan digunakan.",
          "Pastikan juga alat pemadat ini selalu terawat.",
        ],
      },
      {
        title: "Ketersediaan Teknisi",
        paragraphs: [
          "Batu basecose digunakan sebagai pemadat untuk konstruksi pembangunan jalan.",
          "Kedua, kami berkomitmen untuk menjadi kontraktor yang amanah atau terpercaya.",
          "Oleh karena itu, material yang didatangkan dan digunakan dalam pengerjaan proyek harus sesuai dengan apa yang telah disepakati dalam SPK atau RAB.",
        ],
      },
      {
        title: "Ketersediaan Suku Cadang",
        paragraphs: [
          "Peralatan mesin yang digunakan pastinya akan membutuhkan suku cadang.",
          "Jika anda menyewa double drum roller tanpa suku cadang yang disediakan akan membuat rugi.",
          "Salah satu kerugiannya adalah waktu yang digunakan.",
          "Lumasi mesin dengan oli sebelum digunakan agar lebih terawat.",
          "Jaga jangan sampai mesin mengalami overheat dengan melihat indikator yang ada.",
          "Jika mesin sudah panas, berhenti untuk istirahat sangatlah diperlukan.",
        ],
      },
    ],
    penutup: [
      "Dalam beberapa proses pemadatan aspal dengan alat berat ada hal yang harus di perhatikan.",
      "Ketika hotmix dituangkan kedalam aspal yang akan dipadatkan gunakan alat pemadat yang memiliki roda baja.",
      "Ketika menjalankan alat ini gunakan kecepatan maksimal hanya 4km/jam, jangan terlalu cepat agar pemadatan sempurna.",
      "Setelah itu pemadatan yang ke dua, gunakan alat yang beroda karet.",
      "Kecepatan yang di gunakan biasanya 10 km/jam.",
      "Biasanya pengerjaan untuk memadatkan jalan ini dilakukan secara memanjang.",
      "Pada proses akhir pemadatan, kembali gunakan roller yang beroda baja.",
      "Fungsinya agar pemadatan lebih rapat sehingga jalan tidak cepat rusak, kuat, dan tahan lama.",
      "Pemadatan di lajur yang menanjak dilakukan dari bagian yang lebih tinggi ke bagian rendah.",
      "Kami menyarankan anda untuk menggunakan jasa konstruksi dari website www.konstruksi-jasa.com.",
      "Pelayanan 24 jam dan menyediakan segala kebutuhan konstruksi.",
      "Jika anda membutuhkan tenaga konstruksi juga tersedia disini yang siap mengerjakan seluruh tugas konstruksi pemadatan jalan.",
    ],
    ctaBadge: "Konsultasi Gratis",
    ctaTitle1: "Butuh sewa Double Drum Roller? ",
    ctaTitle2: "Kami siap membantu.",
    ctaButton: "Hubungi via WhatsApp",
    ctaWaText: "Halo%20Tri%20Abadi%20Makmur%2c%20saya%20ingin%20konsultasi%20sewa%20double%20drum%20roller...",
  },
  en: {
    title: "Double Drum Roller",
    subtitle: "Double Drum Roller Rental for Your Paving Needs",
    thumbImage: "/proyek/proyek-50.webp",
    fallbackImage: "/proyek/proyek-50.webp",
    intro: [
      "Double Drum Roller – In a construction, we don't just expect to need 2–3 drums, but when you work on a flatter and more even surface.",
      "There are many companies that must be known for asphalt paving.",
      "If needed, also prepare the land to be used such as highways.",
    ],
    after: [
      "Usually the first step is to first form the compaction of the road surface base.",
      "Double drum roller is a tool used in land work processes that match the soil base, commonly used to compact asphalt and hot mix by leveling.",
    ],
    accordionItems: [
      {
        title: "Determine the Right Equipment",
        paragraphs: [
          "When buying or renting a double drum roller, you must choose the right equipment according to construction needs.",
          "First check the type of soil to be worked on; in gravel and sandy areas, using a drum roller is indeed suitable.",
          "It's different if we are going to break asphalt or concrete using a jack hammer.",
        ],
      },
      {
        title: "Equipment Quality",
        paragraphs: [
          "When choosing equipment for a road leveling project, also pay attention to the quality of the equipment to be used.",
          "This will determine the work result; testing the equipment to be rented is very necessary.",
          "If during the trial this equipment is in good condition, you can rent it to immediately start working on the project.",
        ],
      },
      {
        title: "Guarantee or Warranty",
        paragraphs: [
          "Services that rent out roller equipment usually give a warranty to their customers.",
          "This is needed in case the equipment you use gets damaged, so it doesn't become your full responsibility.",
          "The longer the warranty given, the better the engine that will be used.",
          "Also make sure this compactor equipment is always maintained.",
        ],
      },
      {
        title: "Technician Availability",
        paragraphs: [
          "Base course stone is used as a compactor for road construction.",
          "Second, we are committed to being a trustworthy or reliable contractor.",
          "Therefore, the materials brought in and used in project work must comply with what has been agreed in the SPK or RAB.",
        ],
      },
      {
        title: "Spare Parts Availability",
        paragraphs: [
          "The machine equipment used will certainly require spare parts.",
          "If you rent a double drum roller without available spare parts, it will cause a loss.",
          "One of the losses is the time used.",
          "Lubricate the engine with oil before use for better maintenance.",
          "Keep the engine from overheating by checking the existing indicators.",
          "If the engine is already hot, stopping to rest is very necessary.",
        ],
      },
    ],
    penutup: [
      "In some asphalt compaction processes with heavy equipment, there are things that must be considered.",
      "When hotmix is poured into the asphalt to be compacted, use a compactor that has steel wheels.",
      "When running this tool, use a maximum speed of only 4 km/h, don't go too fast so the compaction is perfect.",
      "After that, for the second compaction, use equipment with rubber wheels.",
      "The speed used is usually 10 km/h.",
      "Usually the work to compact this road is done lengthwise.",
      "In the final compaction process, use a steel-wheeled roller again.",
      "Its function is to make the compaction denser so the road doesn't get damaged quickly, is strong, and durable.",
      "Compaction on uphill lanes is done from the higher part to the lower part.",
      "We recommend you use construction services from the website www.konstruksi-jasa.com.",
      "24-hour service and provides all construction needs.",
      "If you need construction workers, they are also available here, ready to carry out all road compaction construction tasks.",
    ],
    ctaBadge: "Free Consultation",
    ctaTitle1: "Need to rent a Double Drum Roller? ",
    ctaTitle2: "We're ready to help.",
    ctaButton: "Contact via WhatsApp",
    ctaWaText: "Hello%20Tri%20Abadi%20Makmur%2c%20would%20like%20to%20consult%20about%20double%20drum%20roller%20rental...",
  },
};

const labels = {
  id: { open: "Buka", close: "Tutup" },
  en: { open: "Open", close: "Close" },
};

// ─── HALAMAN ─────────────────────────────────
export default function DoubleDrumRoller() {
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
          <Reveal key={i} delay={i * 50} y={24}>
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

        {/* ═══ PENUTUP ═══ */}
        <div className="mt-8 sm:mt-10 space-y-3 sm:space-y-4">
          {d.penutup.map((p, i) => (
            <Reveal key={i} delay={i * 40} y={18}>
              <RenderContent text={p} />
            </Reveal>
          ))}
        </div>

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