// src/components/PasirPasang.jsx
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
    title: "Pasir Pasang",
    subtitle: "Pasir untuk Pasang Bata & Plester",
    thumbImage: "/produk/pasir-pasang.png",
    fallbackImage: "/produk/pasir-pasang.png",
    intro: [
      "Pasir Pasang – Material penting untuk pekerjaan pasang bata, plesteran, dan acian pada bangunan.",
      "Pasir pasang adalah pasir dengan tekstur sedikit kasar yang digunakan untuk pemasangan bata, plesteran, dan acian.",
      "Teksturnya yang kasar membuat daya rekat pasir ini lebih kuat dibandingkan pasir beton.",
    ],
    after: [
      "Pasir pasang menjadi pilihan utama untuk pekerjaan finishing dinding karena mampu menghasilkan permukaan yang rata dan kokoh.",
      "Kualitas pasir pasang sangat mempengaruhi hasil akhir plesteran dan acian pada dinding bangunan.",
      "Beberapa kelebihan pasir pasang kami diantaranya sebagai berikut.",
    ],
    accordionItems: [
      {
        title: "Daya Rekat Kuat",
        paragraphs: [
          "Tekstur kasar pasir pasang membuatnya mampu merekatkan bata dan plesteran dengan sangat kuat.",
          "Butiran pasir pasang yang kasar dan bersudut membuat semen dapat mengunci permukaan bata maupun batako dengan lebih baik.",
          "Hal ini membuat dinding lebih kokoh, tidak mudah bergeser, dan tahan terhadap getaran maupun perubahan cuaca.",
          "Untuk pekerjaan pemasangan bata ringan (hebel), pasir pasang biasanya digunakan bersama mortar instan untuk hasil maksimal.",
        ],
      },
      {
        title: "Cocok untuk Pasang Bata",
        paragraphs: [
          "Ideal digunakan sebagai campuran mortar untuk pemasangan bata merah, batako, maupun bata ringan.",
          "Pasir pasang menjadi komponen utama dalam campuran mortar — bersama semen dan air — yang berfungsi sebagai perekat antar bata.",
          "Penggunaan pasir pasang yang tepat akan menghasilkan dinding yang rata, lurus, dan tidak mudah retak.",
          "Selain untuk pasang bata, pasir pasang juga sangat cocok untuk pekerjaan plesteran dinding, acian, dan pembuatan lantai kerja.",
        ],
      },
      {
        title: "Tidak Mudah Retak",
        paragraphs: [
          "Campuran pasir pasang menghasilkan plesteran yang tidak mudah retak dan tahan lama.",
          "Pasir pasang memiliki tekstur dan gradasi butiran yang mampu mengisi rongga-rongga kecil pada permukaan dinding.",
          "Dengan komposisi yang tepat, plesteran dinding akan lebih padat dan tahan terhadap perubahan suhu serta kelembaban.",
          "Untuk hasil maksimal, gunakan pasir pasang yang bersih dari lumpur dan kotoran agar daya rekatnya tidak berkurang.",
        ],
      },
      {
        title: "Harga Terjangkau",
        paragraphs: [
          "Kami menyediakan pasir pasang dengan harga bersaing tanpa mengurangi kualitas material.",
          "Harga pasir pasang umumnya lebih ekonomis dibandingkan pasir beton, sehingga sangat cocok untuk proyek dengan volume pekerjaan besar.",
          "Dengan harga yang terjangkau, Anda tetap bisa mendapatkan kualitas material terbaik untuk kebutuhan plesteran dan pemasangan bata.",
          "Hubungi kami untuk mendapatkan penawaran harga khusus sesuai volume kebutuhan proyek Anda.",
        ],
      },
    ],
  },

  en: {
    title: "Masonry Sand",
    subtitle: "Sand for Brick Laying & Plastering",
    thumbImage: "/produk/pasir-pasang.png",
    fallbackImage: "/produk/pasir-pasang.png",
    intro: [
      "Masonry Sand – An important material for brick laying, plastering, and skim coating work on buildings.",
      "Masonry sand is sand with a slightly coarse texture used for brick installation, plastering, and skim coating.",
      "Its coarse texture makes this sand's adhesion stronger than concrete sand.",
    ],
    after: [
      "Masonry sand is the main choice for wall finishing work because it produces an even and solid surface.",
      "The quality of masonry sand greatly affects the final result of plastering and skim coating on building walls.",
      "Some of the advantages of our masonry sand include the following.",
    ],
    accordionItems: [
      {
        title: "Strong Adhesion",
        paragraphs: [
          "The coarse texture of masonry sand allows it to bond bricks and plaster very strongly.",
          "The coarse and angular grains of masonry sand allow cement to lock the surface of bricks and concrete blocks better.",
          "This makes the wall more solid, less prone to shifting, and resistant to vibration and weather changes.",
          "For lightweight brick (hebel) installation work, masonry sand is usually used together with instant mortar for maximum results.",
        ],
      },
      {
        title: "Suitable for Brick Laying",
        paragraphs: [
          "Ideal for use as a mortar mixture for installing red bricks, concrete blocks, or lightweight bricks.",
          "Masonry sand is a key component in mortar mixture — along with cement and water — which serves as an adhesive between bricks.",
          "Using the right masonry sand will produce a wall that is even, straight, and not easily cracked.",
          "Besides for brick laying, masonry sand is also very suitable for wall plastering, skim coating, and making work floors.",
        ],
      },
      {
        title: "Not Easily Cracked",
        paragraphs: [
          "Masonry sand mixture produces plaster that is not easily cracked and durable.",
          "Masonry sand has a texture and grain gradation capable of filling small cavities on the wall surface.",
          "With the right composition, wall plaster will be denser and resistant to temperature and humidity changes.",
          "For maximum results, use masonry sand that is clean of mud and impurities so its adhesion is not reduced.",
        ],
      },
      {
        title: "Affordable Price",
        paragraphs: [
          "We provide masonry sand at competitive prices without reducing material quality.",
          "The price of masonry sand is generally more economical than concrete sand, making it very suitable for projects with large work volumes.",
          "With an affordable price, you can still get the best material quality for your plastering and brick laying needs.",
          "Contact us to get a special price offer according to your project's volume needs.",
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
// HALAMAN: PASIR PASANG
// ─────────────────────────────────────────────
export default function PasirPasang() {
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