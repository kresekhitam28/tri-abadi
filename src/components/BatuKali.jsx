// src/components/BatuKali.jsx
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
// SUB-KOMPONEN: JENIS ITEM (memoized)
// ─────────────────────────────────────────────
const JenisItem = memo(function JenisItem({ item, index, isOpen, onToggle, labels }) {
  return (
    <Accordion
      title={item.title}
      isOpen={isOpen}
      onToggle={onToggle}
      labels={labels}
    >
      <div className="space-y-3.5">
        {item.paragraphs.map((p, j) => (
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
    title: "Batu Kali / Batu Belah",
    subtitle: "Jual Batu Kali atau Batu Belah Murah Berkualitas",
    thumbImage: "/produk/batu-kali.png",
    fallbackImage: "/produk/batu-kali.png",
    intro: [
      "Batu Kali – Tinggi Jaya Abadi merupakan salah satu perusahaan yang bergerak dalam bidang konstruksi.",
      "Selain berpengalaman dan proses pengerjaan yang signifikan, kami mengutamakan material yang berkualitas.",
      "Salah satu material berkualitas yang kami gunakan adalah batu kali atau batu belah.",
      "Batu belah tersebut merupakan material alam yang diproduksi dan proses pembelahan batu besar menjadi bagian-bagian yang lebih kecil.",
    ],
    after: [
      "Batuannya sendiri bisa berasal dari kali atau sungai.",
      "Berikut akan diulas lebih lanjut informasi mengenai jenis batu tersebut.",
    ],
    manfaat: [
      "Pada umumnya, batu digunakan sebagai bahan campuran dalam pembangunan atau konstruksi, sama halnya dengan batu kali.",
      "Batu jenis ini mempunyai manfaat yang sama yaitu sebagai bahan campuran dalam material beton, pasir, semen, atau material lain.",
      "Campuran dari material beton memiliki banyak manfaat dalam dunia konstruksi.",
      "Betonnya memiliki banyak sekali kegunaan, seperti pembangunan jalan, pembangunan berbagai jenis konstruksi sipil, jembatan, dan lain sebagainya.",
      "Akan tetapi kelebihan manfaat yang dimiliki batu ini untuk material konstruksi yaitu:",
      "Salah satu diantaranya yaitu bila di dalam material konstruksi memiliki material koral dan sangat kuat.",
      "Selain itu, konstruksi juga akan memiliki umur yang lama dan tidak mudah rapuh bila komposisi adonan tepat.",
    ],
    jenisIntro: [
      "Pada umumnya, ada beberapa jenis batu kali atau batu belah yang digunakan untuk kebutuhan konstruksi.",
      "Namun, berdasarkan ukurannya, ada 5 jenis batu belah yang biasanya digunakan.",
      "Berikut akan diulas mengenai berbagai jenis batu tersebut.",
    ],
    jenisItems: [
      {
        title: "Ukuran 0 – 5 mm",
        paragraphs: [
          "Bentuk batu ini ukurannya sangat lembut dan hampir menyerupai pasir yang halus.",
          "Nah, batu ini biasanya digunakan sebagai campuran material untuk konstruksi pengaspalan jalan.",
          "Pada umumnya, material ini digunakan sebagai material pengganti pasir, pembuatan batako, pemasangan paving block, dan lain sebagainya.",
          "Hal ini tak terlepas dari banyaknya kelebihan yang dimiliki jika dibandingkan dengan pasir.",
          "Beberapa kelebihan tersebut yaitu memiliki daya ikat yang lebih kuat dan harganya lebih ekonomis.",
        ],
      },
      {
        title: "Ukuran 5 – 10 mm",
        paragraphs: [
          "Jenis batu ini memiliki ukuran yang lebih besar dari jenis batu sebelumnya tetapi memiliki fungsi yang sama.",
          "Selain itu, batu ini juga digunakan sebagai campuran untuk pembuatan aspal karena ukurannya yang relatif kecil.",
          "Nah, biasanya batu ini disebut dengan screening.",
        ],
      },
      {
        title: "Ukuran 10 – 20 mm",
        paragraphs: [
          "Biasanya batu ini digunakan untuk pengecoran beton.",
          "Namun, tak sedikit yang menggunakan batu ini untuk konstruksi ringan hingga berat.",
          "Sedangkan, batu berukuran 10 - 20 mm ini digunakan untuk campuran beton mutu K-200 ke bawah dalam produksi ready mix.",
        ],
      },
      {
        title: "Ukuran 20 – 30 mm",
        paragraphs: [
          "Jenis batu berikutnya yaitu batu belah ukuran 20 – 30 mm.",
          "Jenis batu ini biasanya digunakan untuk pengecoran lantai.",
          "Selain itu, batu jenis ini juga banyak digunakan untuk pembentonan yang berbentuk horizontal seperti pondasi, kolom, tiang, paku bumi, dan lain sebagainya.",
        ],
      },
      {
        title: "Ukuran 30 – 50 mm",
        paragraphs: [
          "Batu ini memiliki ukuran yang cukup besar sehingga batu jenis ini biasanya digunakan sebagai bahan campuran beton.",
          "Selain itu, bahan batu ini juga digunakan sebagai bahan dasar dalam pembuatan jalan sebelum ditimpa bahan atau material lainnya.",
          "Bahkan, batu jenis ini juga digunakan sebagai penyangga bantalan kereta api dan pemberat pipa yang berada di dasar laut.",
        ],
      },
      {
        title: "Batu Kali Hitam 10 – 40 cm",
        paragraphs: [
          "Pada umumnya, jenis batu ini diperoleh dari belahan batu kali atau pun batu gunung.",
          "Nah, batu tersebut memiliki kualitas yang sangat baik sebagai pondasi atau jembatan.",
          "Selain itu, batu jenis ini memiliki pinggiran batu dengan bentuk yang runcing.",
          "Dengan kelebihan tersebut, batu ini akan membentuk ikatan yang sangat erat jika dicampurkan dengan material semen.",
        ],
      },
    ],
    manfaatTitle1: "Manfaat ",
    manfaatTitle2: "Batu Kali",
    jenisTitle1: "Jenis-Jenis ",
    jenisTitle2: "Batu Kali",
  },

  en: {
    title: "River Stone / Split Stone",
    subtitle: "Selling Cheap & Quality River Stone or Split Stone",
    thumbImage: "/produk/batu-kali.png",
    fallbackImage: "/produk/batu-kali.png",
    intro: [
      "River Stone – Tinggi Jaya Abadi is a company engaged in the construction sector.",
      "Besides being experienced and having a significant work process, we prioritize quality materials.",
      "One of the quality materials we use is river stone or split stone.",
      "This split stone is a natural material produced by splitting large stones into smaller pieces.",
    ],
    after: [
      "The stones themselves can come from rivers or streams.",
      "Below we will further review information about this type of stone.",
    ],
    manfaat: [
      "Generally, stone is used as a mixture material in building or construction, just like river stone.",
      "This type of stone has the same benefit, namely as a mixture material in concrete, sand, cement, or other materials.",
      "The mixture of concrete materials has many benefits in the world of construction.",
      "Concrete has many uses, such as road construction, various types of civil construction, bridges, and so on.",
      "However, the advantages of this stone for construction materials are:",
      "One of them is that the construction material contains coral material and is very strong.",
      "In addition, the construction will also have a long life and not be easily brittle if the mixture composition is right.",
    ],
    jenisIntro: [
      "Generally, there are several types of river stone or split stone used for construction needs.",
      "However, based on size, there are 5 types of split stone commonly used.",
      "Below we will review the various types of these stones.",
    ],
    jenisItems: [
      {
        title: "Size 0 – 5 mm",
        paragraphs: [
          "This stone is very smooth in size and almost resembles fine sand.",
          "Well, this stone is usually used as a mixture material for road asphalt paving construction.",
          "Generally, this material is used as a substitute for sand, making bricks, installing paving blocks, and so on.",
          "This is inseparable from the many advantages it has compared to sand.",
          "Some of these advantages are stronger binding power and more economical price.",
        ],
      },
      {
        title: "Size 5 – 10 mm",
        paragraphs: [
          "This type of stone is larger in size than the previous type but has the same function.",
          "In addition, this stone is also used as a mixture for asphalt making because of its relatively small size.",
          "Well, usually this stone is called screening.",
        ],
      },
      {
        title: "Size 10 – 20 mm",
        paragraphs: [
          "Usually this stone is used for concrete casting.",
          "However, not a few use this stone for light to heavy construction.",
          "Meanwhile, stone measuring 10 - 20 mm is used for concrete mixtures of grade K-200 and below in ready mix production.",
        ],
      },
      {
        title: "Size 20 – 30 mm",
        paragraphs: [
          "The next type of stone is split stone size 20 – 30 mm.",
          "This type of stone is usually used for floor casting.",
          "In addition, this type of stone is also widely used for horizontal formwork such as foundations, columns, pillars, earth nails, and so on.",
        ],
      },
      {
        title: "Size 30 – 50 mm",
        paragraphs: [
          "This stone is quite large in size so this type of stone is usually used as a concrete mixture.",
          "In addition, this stone material is also used as a base material in road construction before being covered with other materials.",
          "In fact, this type of stone is also used as a support for railway bearings and ballast for pipes at the bottom of the sea.",
        ],
      },
      {
        title: "Black River Stone 10 – 40 cm",
        paragraphs: [
          "Generally, this type of stone is obtained from split river stone or mountain stone.",
          "Well, this stone has very good quality as a foundation or bridge.",
          "In addition, this type of stone has sharp edges.",
          "With these advantages, this stone will form a very tight bond when mixed with cement material.",
        ],
      },
    ],
    manfaatTitle1: "Benefits of ",
    manfaatTitle2: "River Stone",
    jenisTitle1: "Types of ",
    jenisTitle2: "River Stone",
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
// HALAMAN: BATU KALI
// ─────────────────────────────────────────────
export default function BatuKali() {
  const { lang } = useLang();
  const d = data[lang] || data.id;
  const L = labels[lang] || labels.id;

  // openIndex: null = semua tertutup, 0..N = salah satu terbuka
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = useCallback(
    (i) => setOpenIndex((prev) => (prev === i ? null : i)),
    []
  );

  return (
    <section className="bg-white pt-28 lg:pt-36 pb-20 lg:pb-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-5 lg:px-8">

        {/* Judul center */}
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

        {/* Garis pemisah */}
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
            <Reveal key={i} delay={i * 80} y={18}>
              <Paragraph text={p} />
            </Reveal>
          ))}
        </div>

        {/* Section Manfaat */}
        <div className="mb-12">
          <Reveal y={26}>
            <div className="text-center mb-6">
              <h2
                className="font-light tracking-tight text-slate-900 leading-tight"
                style={{ fontSize: "clamp(1.5rem, 3.5vw, 1.875rem)" }}
              >
                {d.manfaatTitle1}
                <span className="font-semibold">{d.manfaatTitle2}</span>
              </h2>
            </div>
          </Reveal>
          <div className="space-y-3.5">
            {d.manfaat.map((p, i) => (
              <Reveal key={i} delay={i * 60} y={18}>
                <Paragraph text={p} />
              </Reveal>
            ))}
          </div>
        </div>

        {/* Section Jenis-Jenis */}
        <div className="mb-10">
          <Reveal y={26}>
            <div className="text-center mb-6">
              <h2
                className="font-light tracking-tight text-slate-900 leading-tight"
                style={{ fontSize: "clamp(1.5rem, 3.5vw, 1.875rem)" }}
              >
                {d.jenisTitle1}
                <span className="font-semibold">{d.jenisTitle2}</span>
              </h2>
            </div>
          </Reveal>

          <div className="space-y-3.5 mb-6">
            {d.jenisIntro.map((p, i) => (
              <Reveal key={i} delay={i * 60} y={18}>
                <Paragraph text={p} />
              </Reveal>
            ))}
          </div>

          {/* Accordion jenis — eksklusif */}
          {d.jenisItems.map((item, i) => (
            <Reveal key={i} delay={i * 60} y={24}>
              <JenisItem
                item={item}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => toggle(i)}
                labels={L}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}