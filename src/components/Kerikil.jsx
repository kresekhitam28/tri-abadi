// src/components/Kerikil.jsx
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
// SUB-KOMPONEN: PARAGRAPH (memoized, handle bullet)
// ─────────────────────────────────────────────
const Paragraph = memo(function Paragraph({ text }) {
  const isBullet = text.startsWith("•");
  return (
    <p
      className={`text-slate-700 leading-[1.85] ${isBullet ? "pl-4" : ""}`}
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
    title: "Kerikil",
    subtitle: "Material Cor Beton & Drainase",
    thumbImage: "/produk/kerikil.png",
    fallbackImage: "/produk/kerikil.png",
    intro: [
      "Kerikil – Salah satu material konstruksi yang sering digunakan dalam berbagai proyek pembangunan.",
      "Kerikil merupakan material batuan kecil yang biasanya digunakan sebagai campuran beton, pengerasan jalan, dan drainase.",
      "Ukurannya bervariasi, mulai dari beberapa milimeter hingga beberapa sentimeter, menyesuaikan kebutuhan proyek.",
    ],
    after: [
      "Kerikil banyak digunakan sebagai agregat kasar dalam campuran beton karena mampu memperkuat struktur.",
      "Selain itu, kerikil juga efektif membantu drainase pada area yang membutuhkan penyerapan air lebih baik.",
      "Beberapa kelebihan kerikil untuk kebutuhan konstruksi Anda diantaranya sebagai berikut.",
    ],
    accordionItems: [
      {
        title: "Cocok untuk Campuran Beton",
        paragraphs: [
          "Kerikil menjadi salah satu agregat utama dalam campuran beton karena mampu memperkuat dan menstabilkan struktur bangunan.",
          "Butiran kerikil yang keras dan bersudut membantu mengunci antar material, sehingga beton yang dihasilkan lebih padat dan tidak mudah retak.",
          "Selain itu, kerikil juga membantu mengurangi pemakaian semen karena volumenya mengisi sebagian besar campuran.",
          "Untuk konstruksi struktural seperti pondasi, kolom, balok, dan plat lantai, kerikil dengan ukuran 10-20 mm biasanya menjadi pilihan utama.",
        ],
      },
      {
        title: "Membantu Drainase",
        paragraphs: [
          "Kerikil memudahkan air meresap ke dalam tanah, sehingga cocok digunakan pada area yang membutuhkan sistem drainase baik.",
          "Rongga antar butir kerikil berfungsi sebagai jalur aliran air, sehingga air hujan tidak menggenang di permukaan.",
          "Aplikasi umum kerikil untuk drainase antara lain: taman, halaman, area parkir, saluran resapan, dan dasar pot tanaman.",
          "Dengan drainase yang baik, risiko genangan dan kerusakan struktur akibat kelembaban berlebih dapat diminimalkan.",
        ],
      },
      {
        title: "Ukuran Bervariasi",
        paragraphs: [
          "Tersedia dalam berbagai ukuran, sehingga bisa disesuaikan dengan kebutuhan proyek, dari beton struktural hingga taman.",
          "Beberapa ukuran kerikil yang umum di pasaran antara lain:",
          "• 5-10 mm — untuk campuran beton halus, plester, dan taman.",
          "• 10-20 mm — untuk beton struktural, kolom, dan balok.",
          "• 20-30 mm — untuk pondasi dan pengerasan jalan.",
          "• 30-50 mm — untuk drainase dan lapisan dasar jalan.",
          "Pemilihan ukuran yang tepat sangat mempengaruhi kekuatan, kerapian, dan efisiensi pengerjaan proyek Anda.",
        ],
      },
      {
        title: "Mudah Diaplikasikan",
        paragraphs: [
          "Kerikil mudah ditata dan dipadatkan di lapangan, sehingga proses pengerjaan menjadi lebih cepat dan efisien.",
          "Tidak seperti material yang perlu dicampur khusus, kerikil dapat langsung dihamparkan dan dipadatkan sesuai kebutuhan.",
          "Hal ini membuat kerikil sangat cocok untuk proyek yang membutuhkan pengerjaan cepat, seperti pengerasan lahan parkir, jalan lingkungan, atau area taman.",
          "Selain itu, kerikil juga mudah diganti atau ditambah jika terjadi penurunan permukaan di kemudian hari.",
        ],
      },
    ],
  },

  en: {
    title: "Gravel",
    subtitle: "Concrete Casting & Drainage Material",
    thumbImage: "/produk/kerikil.png",
    fallbackImage: "/produk/kerikil.png",
    intro: [
      "Gravel – One of the construction materials often used in various building projects.",
      "Gravel is a small stone material usually used as a concrete mixture, road hardening, and drainage.",
      "Its size varies, from a few millimeters to a few centimeters, adjusting to project needs.",
    ],
    after: [
      "Gravel is widely used as a coarse aggregate in concrete mixtures because it strengthens the structure.",
      "In addition, gravel is also effective in helping drainage in areas that need better water absorption.",
      "Some advantages of gravel for your construction needs include the following.",
    ],
    accordionItems: [
      {
        title: "Suitable for Concrete Mixtures",
        paragraphs: [
          "Gravel is one of the main aggregates in concrete mixtures because it strengthens and stabilizes the building structure.",
          "The hard and angular gravel grains help lock the material together, so the resulting concrete is denser and less prone to cracking.",
          "In addition, gravel also helps reduce cement usage because its volume fills most of the mixture.",
          "For structural construction such as foundations, columns, beams, and floor slabs, gravel with a size of 10-20 mm is usually the main choice.",
        ],
      },
      {
        title: "Helps Drainage",
        paragraphs: [
          "Gravel allows water to seep into the soil easily, making it suitable for areas that need a good drainage system.",
          "The cavities between gravel grains function as water flow paths, so rainwater does not pool on the surface.",
          "Common applications of gravel for drainage include: gardens, yards, parking areas, absorption channels, and the bottom of plant pots.",
          "With good drainage, the risk of pooling and structural damage due to excess moisture can be minimized.",
        ],
      },
      {
        title: "Varied Sizes",
        paragraphs: [
          "Available in various sizes, so it can be adjusted to project needs, from structural concrete to gardens.",
          "Some gravel sizes that are common in the market include:",
          "• 5-10 mm — for fine concrete mixtures, plaster, and gardens.",
          "• 10-20 mm — for structural concrete, columns, and beams.",
          "• 20-30 mm — for foundations and road hardening.",
          "• 30-50 mm — for drainage and road base layers.",
          "Choosing the right size greatly affects the strength, neatness, and efficiency of your project work.",
        ],
      },
      {
        title: "Easy to Apply",
        paragraphs: [
          "Gravel is easy to arrange and compact in the field, making the work process faster and more efficient.",
          "Unlike materials that need to be specially mixed, gravel can be directly spread and compacted as needed.",
          "This makes gravel very suitable for projects that require quick work, such as hardening parking lots, neighborhood roads, or garden areas.",
          "In addition, gravel is also easy to replace or add if surface settling occurs later.",
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
// HALAMAN: KERIKIL
// ─────────────────────────────────────────────
export default function Kerikil() {
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