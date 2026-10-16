// src/components/Sirtu.jsx
"use client";

import { useState, useEffect, useRef, useCallback, useMemo, memo } from "react";
import { useLang } from "../context/LanguageContext";

// ─────────────────────────────────────────────
// HOOK: DETEKSI MOBILE
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

// ─────────────────────────────────────────────
// HOOK: REVEAL ON SCROLL
// ─────────────────────────────────────────────
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

// ─────────────────────────────────────────────
// REVEAL WRAPPER (memoized, no blur)
// ─────────────────────────────────────────────
const Reveal = memo(function Reveal({
  children,
  delay = 0,
  y = 28,
  x = 0,
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
      transform: visible ? "translate3d(0,0,0)" : `translate3d(${x}px, ${y}px, 0)`,
      willChange: visible ? "auto" : "opacity, transform",
      contain: "layout paint style",
    };
  }, [enabled, visible, duration, delay, x, y]);

  return (
    <Tag ref={ref} style={style} className={className}>
      {children}
    </Tag>
  );
});

// ─────────────────────────────────────────────
// ACCORDION (controlled — memoized)
// ─────────────────────────────────────────────
const Accordion = memo(function Accordion({
  title,
  isOpen,
  onToggle,
  children,
  labels,
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
        aria-label={title}
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
        <div
          className="px-4 sm:px-5 pb-4 sm:pb-5 pt-1
                     text-slate-700 leading-[1.85]
                     border-t border-slate-100"
          style={{ fontSize: "clamp(0.8125rem, 1.5vw, 0.875rem)" }}
        >
          {children}
        </div>
      )}
    </div>
  );
});

// ─────────────────────────────────────────────
// SUB-KOMPONEN: PARAGRAPH (memoized)
// ─────────────────────────────────────────────
const Paragraph = memo(function Paragraph({ text }) {
  return (
    <p
      className="text-slate-700 leading-[1.85]"
      style={{ fontSize: "clamp(0.8125rem, 1.5vw, 0.875rem)" }}
    >
      {text}
    </p>
  );
});

// ─────────────────────────────────────────────
// SUB-KOMPONEN: ACCORDION ITEM (memoized)
// ─────────────────────────────────────────────
const AccordionItem = memo(function AccordionItem({
  title,
  paragraphs,
  isOpen,
  onToggle,
  labels,
}) {
  return (
    <Accordion
      title={title}
      isOpen={isOpen}
      onToggle={onToggle}
      labels={labels}
    >
      <div className="space-y-3.5">
        {paragraphs.map((p, j) => (
          <Paragraph key={j} text={p} />
        ))}
      </div>
    </Accordion>
  );
});

// ─────────────────────────────────────────────
// DATA BILINGUAL
// ─────────────────────────────────────────────
const data = {
  id: {
    title: "Sirtu",
    subtitle: "Material Urugan Jalan & Lahan",
    thumbImage: "/produk/sirtu.png",
    fallbackImage: "/produk/sirtu.png",
    intro: [
      "Sirtu – Salah satu material urugan yang paling sering digunakan dalam proyek jalan dan pengurugan lahan.",
      "Sirtu (pasir batu) adalah campuran pasir dan batu yang digunakan sebagai material urugan jalan.",
      "Kandungan batunya membuat sirtu lebih kuat dan stabil dibandingkan pasir urug biasa.",
    ],
    after: [
      "Sirtu sangat efektif digunakan sebagai lapisan dasar sebelum pengaspalan atau pemasangan paving block.",
      "Selain untuk urugan jalan, sirtu juga sering dipakai untuk pengurugan lahan yang akan didirikan bangunan.",
      "Beberapa kelebihan sirtu untuk kebutuhan proyek Anda diantaranya sebagai berikut.",
    ],
    accordionItems: [
      {
        title: "Cocok untuk Urugan Jalan",
        paragraphs: [
          "Sirtu menjadi lapisan dasar yang kuat dan stabil sebelum proses pengaspalan maupun pemasangan paving.",
          "Kandungan batu pada sirtu membantu menahan beban kendaraan sehingga permukaan jalan tidak mudah amblas atau bergelombang.",
          "Sirtu juga berfungsi sebagai lapisan perataan sebelum material utama (aspal atau paving) dipasang di atasnya.",
          "Untuk jalan lingkungan, lahan parkir, dan area industri, sirtu merupakan pilihan urugan yang paling umum dan efisien.",
        ],
      },
      {
        title: "Mengikat dengan Baik",
        paragraphs: [
          "Campuran pasir dan batu membuat sirtu mudah dipadatkan dan mengikat, sehingga permukaan lebih stabil.",
          "Pasir mengisi rongga antar batu, sementara batunya saling mengunci — menciptakan lapisan yang padat dan tahan lama.",
          "Semakin baik proses pemadatannya, semakin kuat dan stabil permukaan jalan atau lahan yang dihasilkan.",
          "Untuk hasil maksimal, sirtu sebaiknya dipadatkan berlapis (per 20-30 cm) menggunakan alat berat seperti vibro roller.",
        ],
      },
      {
        title: "Ekonomis untuk Volume Besar",
        paragraphs: [
          "Harga sirtu relatif lebih murah dibandingkan material urugan lain, sangat efisien untuk proyek bervolume besar.",
          "Dengan harga yang terjangkau, Anda bisa mengurug lahan yang luas tanpa harus mengeluarkan biaya material yang besar.",
          "Sirtu juga mudah didapatkan karena banyak diproduksi di berbagai daerah, sehingga biaya distribusi lebih rendah.",
          "Untuk proyek pengurugan lahan, jalan lingkungan, atau area parkir, sirtu adalah solusi paling ekonomis dan efisien.",
        ],
      },
      {
        title: "Cepat dalam Pemadatan",
        paragraphs: [
          "Sirtu cepat memadat saat dipadatkan dengan alat berat, sehingga mempercepat proses pengerjaan.",
          "Kandungan pasir dan batu yang seimbang membuat sirtu mudah diratakan dan dipadatkan tanpa memerlukan banyak lapisan tambahan.",
          "Hal ini sangat menguntungkan untuk proyek dengan tenggat waktu ketat, karena pekerjaan urugan bisa selesai lebih cepat.",
          "Setelah dipadatkan, permukaan sirtu siap untuk langsung dilapisi aspal, paving block, atau cor beton.",
        ],
      },
    ],
  },

  en: {
    title: "Sirtu (Sand-Stone Mix)",
    subtitle: "Road & Land Fill Material",
    thumbImage: "/produk/sirtu.png",
    fallbackImage: "/produk/sirtu.png",
    intro: [
      "Sirtu – One of the most commonly used fill materials in road and land filling projects.",
      "Sirtu (sand-stone) is a mixture of sand and stone used as road fill material.",
      "Its stone content makes sirtu stronger and more stable than ordinary fill sand.",
    ],
    after: [
      "Sirtu is very effective as a base layer before asphalt paving or paving block installation.",
      "Besides for road filling, sirtu is also often used for filling land where buildings will be constructed.",
      "Some of the advantages of sirtu for your project needs include the following.",
    ],
    accordionItems: [
      {
        title: "Suitable for Road Fill",
        paragraphs: [
          "Sirtu becomes a strong and stable base layer before the asphalt paving or paving installation process.",
          "The stone content in sirtu helps withstand vehicle loads so the road surface does not easily sink or become wavy.",
          "Sirtu also functions as a leveling layer before the main material (asphalt or paving) is installed on top.",
          "For neighborhood roads, parking lots, and industrial areas, sirtu is the most common and efficient fill choice.",
        ],
      },
      {
        title: "Binds Well",
        paragraphs: [
          "The mixture of sand and stone makes sirtu easy to compact and bind, so the surface is more stable.",
          "Sand fills the cavities between stones, while the stones interlock — creating a dense and durable layer.",
          "The better the compaction process, the stronger and more stable the resulting road or land surface.",
          "For maximum results, sirtu should be compacted in layers (per 20-30 cm) using heavy equipment such as a vibro roller.",
        ],
      },
      {
        title: "Economical for Large Volumes",
        paragraphs: [
          "Sirtu's price is relatively cheaper than other fill materials, very efficient for large-volume projects.",
          "With an affordable price, you can fill a large land area without having to spend a lot on material costs.",
          "Sirtu is also easily available because it is widely produced in various regions, so distribution costs are lower.",
          "For land filling, neighborhood roads, or parking lot projects, sirtu is the most economical and efficient solution.",
        ],
      },
      {
        title: "Fast Compaction",
        paragraphs: [
          "Sirtu compacts quickly when compacted with heavy equipment, thus speeding up the work process.",
          "The balanced content of sand and stone makes sirtu easy to level and compact without requiring many additional layers.",
          "This is very advantageous for projects with tight deadlines, because the fill work can be completed faster.",
          "After compacting, the sirtu surface is ready to be directly coated with asphalt, paving block, or concrete.",
        ],
      },
    ],
  },
};

// ─────────────────────────────────────────────
// LABEL BILINGUAL
// ─────────────────────────────────────────────
const labels = {
  id: { open: "Buka", close: "Tutup" },
  en: { open: "Open", close: "Close" },
};

// ─────────────────────────────────────────────
// HALAMAN: SIRTU
// ─────────────────────────────────────────────
export default function Sirtu() {
  const { lang } = useLang();
  const d = data[lang] || data.id;
  const L = labels[lang] || labels.id;

  const [openIndex, setOpenIndex] = useState(0);

  const toggle = useCallback(
    (i) => setOpenIndex((prev) => (prev === i ? null : i)),
    []
  );

  return (
    <section className="bg-white pt-28 lg:pt-36 pb-20 lg:pb-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-5 lg:px-8">

        {/* Judul center + kicker */}
        <Reveal delay={100} y={24}>
          <div className="text-center mb-10">
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
              style={{ fontSize: "clamp(1.5rem, 4vw, 2.25rem)" }}
            >
              {d.subtitle}<span className="text-[#1e88e5]">.</span>
            </h1>
          </div>
        </Reveal>

        <Reveal delay={150} y={18}>
          <hr className="border-slate-300 mb-8" />
        </Reveal>

        {/* Gambar kiri + paragraf kanan */}
        <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-5 mt-6 mb-6">
          <Reveal y={34} duration={800}>
            <div
              className="w-full sm:w-[180px] aspect-square overflow-hidden
                         border border-slate-300 rounded-xl bg-slate-100"
              style={{ contain: "layout paint style" }}
            >
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

          <div className="space-y-3">
            {d.intro.map((p, i) => (
              <Reveal key={i} delay={i * 80} y={20}>
                <Paragraph text={p} />
              </Reveal>
            ))}
          </div>
        </div>

        {/* Paragraf lanjutan */}
        <div className="space-y-3 mb-10">
          {d.after.map((p, i) => (
            <Reveal key={i} delay={i * 60} y={18}>
              <Paragraph text={p} />
            </Reveal>
          ))}
        </div>

        {/* Accordion Items */}
        {d.accordionItems.map((item, i) => (
          <Reveal key={i} delay={i * 60} y={24}>
            <AccordionItem
              title={item.title}
              paragraphs={item.paragraphs}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
              labels={L}
            />
          </Reveal>
        ))}

      </div>
    </section>
  );
}