// src/components/BatuSplit.jsx
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
    title: "Batu Split",
    subtitle: "Jual Batu Split Segala Bentuk",
    thumbImage: "/produk/batu-split.png",
    fallbackImage: "/produk/batu-split.png",
    intro: [
      "Batu Split – Batu alam yang besar kemudian dipecahkan menjadi bagian-bagian kecil dengan melalui atau batu split.",
      "Sementara nama popular lainnya yang mungkin sudah tidak asing lagi dengannya di beberapa materialnya ialah batu belah.",
      "Salah satu material yang berperan penting dalam campuran bahan pembangunan.",
    ],
    after: [
      "Biasanya batu ini sering digunakan bertahannya bervariasi pasir dan semen yang dicampur dengan adonan khusus cor beton.",
      "Yang harus anda ketahui, batu ini memiliki beragam jenis ukuran yang disesuaikan dengan kegunaannya sendiri.",
      "Nah, penasaran bukan? Apa saja manfaat ukuran dari kegunaan batu ini.",
      "Untuk lebih jelas, berikutnya anda akan ulasan yang akan disampaikan di bawah ini sampai tuntas.",
    ],
    tipsIntro: [
      "Umumnya pembagian jenis batu alam selalu disesuaikan dengan kegunaannya.",
      "Entah itu bentuknya yang mungkin sangat dengan ukurannya yang super jumbo.",
      "Semua umumnya disesuaikan dengan kebutuhan penggunanya.",
      "Adapun beberapa tips khusus penggunaannya batu split sesuai ukurannya ialah akan dijelaskan sebagai berikut.",
    ],
    tipsSectionTitle1: "Tips Penggunaan ",
    tipsSectionTitle2: "Batu Split",
    tipsSectionTitle3: " Sesuai Ukuran",
    accordion0Title: "Ukuran 0-5 MM",
    ukuran05mm: [
      "Bentuknya yang super halus bahkan hampir menyerupai pasir, menjadikannya lebih masyhur dikenal dengan nama abu batu.",
      "Kegunaan utama batu ini, ialah sebagai campuran lapisan pengaspalan.",
      "Selain itu dapat juga sebagai pengganti pasir, pemasangan batako, ataupun pemasangan paving block.",
    ],
    accordionItems: [
      {
        title: "Ukuran 5-10 MM",
        paragraphs: [
          "Batu ini lebih populer dengan nama Screening.",
          "Namun bentuknya sedikit lebih besar dari abu batu.",
          "Meskipun demikian, tidak jauh berbeda dengan jenis yang pertama, dimana kegunaan pokok dari batu ini ialah sebagai campuran utama dalam pengaspalan.",
        ],
      },
      {
        title: "Ukuran 10-20 MM",
        paragraphs: [
          "Bentuknya yang sangat ideal, menjadikan batu ukuran ini indentik sering sebagai campuran pengecoran beton. Mulai dari kotruksi yang bersifat ringan sampai dengan yang berat sekalipun. Pada umumnya sering dijadikan bahan dalam produksi Ready Mix.",
        ],
      },
      {
        title: "Ukuran 20-30 MM",
        paragraphs: [
          "Karena ukurannya yang dapat dikategorikan lumayan sedang, biasanya batu ini dugunakan sebagai bahan campuran dalam kegiatan cor.",
          "Lebih tepatnya pembetonan ataupun pengecoran lantai yang bersifat datar, lurus (horizontal).",
          "Misalnya saja seperti pondasi, kolam, tiang, selup, paku beton bumi dan lain sebagainya.",
        ],
      },
      {
        title: "Ukuran 30-50 MM",
        paragraphs: [
          "Dengan bentuknya lumayan cukup besar, biasanya sangat jarang digunakan untuk campuran bahan adonan cor an lain sebagainya.",
          "Akan tetapi kegunaannya lebih dimanfaatkan untuk penyangga bantalan rel kereta api, bahan paling dasar sebelum material lain sampai dengan pemberat pipa di dasar laut.",
        ],
      },
      {
        title: "Campuran Agregat Halus",
        paragraphs: [
          "Jenis batu ini dikenal pula dengan nama Base Course.",
          "Campuran batu split yang relative sangat kecil dari pada 0-50 mm.",
          "Khalayaknya, batu ini digunakan sebagai media pemadatan lahan parkir atau jalan sebelum dilapisi aspal, paving block ataupun cor.",
          "Base Course ini terdiri dari dua jenis, yakni kategori A dan B.",
        ],
      },
      {
        title: "Batu Gajah",
        paragraphs: [
          "Nama lain dari jenis ini boulder elephant stone, ukuran batu split yang paling besar.",
          "Pada umumnya, batu ini digunakan untuk menimbum lahan yang berada tepat di pinggir pantai, maupun rawa.",
          "Selain itu, terkadang digunakan pula sebagai media pemecah atau penahan ombak.",
          "Sementara para kontraktor proyek sering menjadikan batu ini untuk reklamasi pantai maupun media pembuatan dermaga dengan kapasitas yang kecil.",
          "Demikianlah beberapa tips penggunaan batu split sesuai ukurannya.",
          "Untuk pemesanan semua produk batu split anda dapat mengunjungi perusahaan Tinggi Jaya Abadi.",
          "Dapat pula anda melakukan transaksi dan menyewa layanan jasa pengerjaan melalui situs resmi www.kontruksi-jasa.com.",
        ],
      },
    ],
  },

  en: {
    title: "Crushed Stone",
    subtitle: "Selling Crushed Stone of All Shapes",
    thumbImage: "/produk/batu-split.png",
    fallbackImage: "/produk/batu-split.png",
    intro: [
      "Crushed Stone – Large natural stone then broken into small pieces through a process called crushed stone.",
      "Meanwhile, another popular name that may be familiar in some of its materials is split stone.",
      "One of the materials that plays an important role in building material mixtures.",
    ],
    after: [
      "Usually this stone is often used with varying durability of sand and cement mixed with a special concrete casting mixture.",
      "What you should know, this stone has various types of sizes adjusted to its own uses.",
      "Well, curious right? What are the benefits of the size of this stone's uses.",
      "For more clarity, below we will review this in full.",
    ],
    tipsIntro: [
      "Generally, the classification of natural stone types is always adjusted to its use.",
      "Whether it's a shape that might be very with a super jumbo size.",
      "All are generally adjusted to the needs of the user.",
      "As for some specific tips for using crushed stone according to its size, they will be explained as follows.",
    ],
    tipsSectionTitle1: "Tips for Using ",
    tipsSectionTitle2: "Crushed Stone",
    tipsSectionTitle3: " by Size",
    accordion0Title: "Size 0-5 MM",
    ukuran05mm: [
      "Its super smooth shape, almost resembling sand, makes it more popularly known as stone dust.",
      "The main use of this stone is as a mixture for the asphalt paving layer.",
      "Besides that, it can also be used as a substitute for sand, brick installation, or paving block installation.",
    ],
    accordionItems: [
      {
        title: "Size 5-10 MM",
        paragraphs: [
          "This stone is more popular under the name Screening.",
          "However, its shape is slightly larger than stone dust.",
          "Even so, it is not much different from the first type, where the main use of this stone is as the main mixture in asphalt paving.",
        ],
      },
      {
        title: "Size 10-20 MM",
        paragraphs: [
          "Its very ideal shape makes this size of stone often identical as a concrete casting mixture. From light to heavy construction. Generally often used as a material in Ready Mix production.",
        ],
      },
      {
        title: "Size 20-30 MM",
        paragraphs: [
          "Because its size can be categorized as fairly medium, this stone is usually used as a mixture material in casting activities.",
          "More precisely concrete casting or floor casting that is flat, straight (horizontal).",
          "For example, such as foundations, ponds, pillars, sill, earth concrete nails, and so on.",
        ],
      },
      {
        title: "Size 30-50 MM",
        paragraphs: [
          "With its fairly large shape, it is usually very rarely used for casting mixture or others.",
          "However, its use is more utilized for railway bearing supports, the most basic material before other materials, up to ballast for pipes at the bottom of the sea.",
        ],
      },
      {
        title: "Fine Aggregate Mixture",
        paragraphs: [
          "This type of stone is also known as Base Course.",
          "A crushed stone mixture that is relatively very small compared to 0-50 mm.",
          "Generally, this stone is used as a medium for compacting parking lots or roads before being coated with asphalt, paving block, or cast concrete.",
          "This Base Course consists of two types, namely categories A and B.",
        ],
      },
      {
        title: "Boulder Stone",
        paragraphs: [
          "Another name for this type is boulder elephant stone, the largest size of crushed stone.",
          "Generally, this stone is used to fill land located right on the coast, or swamps.",
          "In addition, it is sometimes used as a breakwater or wave barrier.",
          "While project contractors often use this stone for beach reclamation or small-capacity dock construction.",
          "Those are some tips for using crushed stone according to its size.",
          "To order all crushed stone products you can visit the Tinggi Jaya Abadi company.",
          "You can also make transactions and hire construction services through the official website www.kontruksi-jasa.com.",
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
// HALAMAN: BATU SPLIT
// ─────────────────────────────────────────────
export default function BatuSplit() {
  const { lang } = useLang();
  const d = data[lang] || data.id;
  const L = labels[lang] || labels.id;

  // openIndex: 0 = Ukuran 0-5 MM, 1..N = accordion items, null = semua tertutup
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

        {/* Section Tips */}
        <div className="mb-10">
          <Reveal y={26}>
            <div className="text-center mb-6">
              <h2
                className="font-light tracking-tight text-slate-900 leading-tight"
                style={{ fontSize: "clamp(1.5rem, 3.5vw, 1.875rem)" }}
              >
                {d.tipsSectionTitle1}
                <span className="font-semibold">{d.tipsSectionTitle2}</span>
                {d.tipsSectionTitle3}
              </h2>
            </div>
          </Reveal>
          <div className="space-y-3.5">
            {d.tipsIntro.map((p, i) => (
              <Reveal key={i} delay={i * 60} y={18}>
                <Paragraph text={p} />
              </Reveal>
            ))}
          </div>
        </div>

        {/* Accordion — Ukuran 0-5 MM (index 0) */}
        <Reveal y={24}>
          <AccordionItem
            title={d.accordion0Title}
            paragraphs={d.ukuran05mm}
            isOpen={openIndex === 0}
            onToggle={() => toggle(0)}
            labels={L}
          />
        </Reveal>

        {/* Accordion Items — multi-paragraf (index 1..N) */}
        {d.accordionItems.map((item, i) => {
          const index = i + 1;
          return (
            <Reveal key={i} delay={80 + i * 60} y={24}>
              <AccordionItem
                title={item.title}
                paragraphs={item.paragraphs}
                isOpen={openIndex === index}
                onToggle={() => toggle(index)}
                labels={L}
              />
            </Reveal>
          );
        })}

      </div>
    </section>
  );
}