// src/components/BaseCourse.jsx
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
// DATA BILINGUAL
// ─────────────────────────────────────────────
const data = {
  id: {
    title: "Base Course",
    subtitle: "Jual Batu Base Course Untuk Kebutuhan Konstruksi Jalan dan lain-lain",
    thumbImage: "/produk/base-course.png",
    fallbackImage: "/produk/base-course.png",
    intro: [
      "Base Course – Salah satu jenis batu berkualitas yang digunakan Tinggi Jaya Abadi sebagai material untuk konstruksi adalah batu base course.",
      "Biasanya batu ini juga disebut dengan batu base course.",
      "Batu ini merupakan campuran pecahan batu kecil yang memiliki ukuran 1 – 5 cm dengan abu batu yang telah diformulasikan khusus untuk filter lahan.",
    ],
    after: [
      "Selain itu, batu ini dibagi menjadi beberapa jenis",
      "Untuk lebih detailnya, berikut akan diulas lebih lanjut informasi mengenai batu tersebut",
    ],
    karakteristik: [
      "Kami pastikan, material batu base course yang kami gunakan memiliki mutu atau kualitas super atau terbaik.",
      "Hal tersebut dapat Anda lihat dari karakteristik atau ciri fisiknya.",
      "Ciri tersebut yaitu 70% batu terdiri dari campuran batu pecahan berwarna hitam dan abu keputihan yang mempunyai ukuran 1 – 5 cm.",
      "Sedangkan, 30 % dari batu tersebut berisi campuran abu batu yang berukuran sangat kecil seperti abu atau debu.",
      "Jika batu basecose berisi campuran kolotan atau tanah, bisa dikatakan batu tersebut tidak memiliki kualitas yang baik.",
      "Jangan sampai Anda menggunakan material ini untuk konstruksi Anda.",
      "Oleh karena itu, pastikan Anda memiliki kontraktor yang amanah seperti halnya Tinggi Jaya Abadi.",
      "Pasalnya, kami selalu berkomitmen untuk menggunakan material berkualitas untuk hasil konstruksi yang optimal.",
    ],
    jenis: [
      "Batu basecose dibedakan menjadi dua macam. Jenis tersebut didasarkan pada jenis campuran dari materialnya. Berikut ulasan selengkapnya.",
      "Pertama, batu basecose kelas A. Batu jenis ini berwarna abu keputihan. Materialnya sendiri 70% berupa batu. Sedangkan 30% bagiannya merupakan abu batu.",
      "Kedua, batu basecose kelas B. Batu jenis ini terdiri dari campuran batu dan abu batu dengan perbandingan 50:50.",
      "Kedua jenis batu tersebut sebenarnya memiliki kualitas yang baik.",
      "Hanya saja masing-masing jenis batu tersebut dibuat berdasarkan permintaan pasar.",
      "Selain itu, hal tersebut juga didasarkan pada jenis konstruksi, peralatan yang digunakan, dan juga kondisi cuaca saat pengerjaan konstruksi.",
      "Agar konstruksi berjalan optimal, penelitian lebih mendalam diperlukan untuk memilih material yang cocok sesuai dengan kondisi dari lokasi konstruksi.",
      "Di sisi lain, material dari batu basecose alami mudah dipengaruhi oleh cuaca.",
      "Selain itu, material tersebut juga membutuhkan sedikit kontrol teknis.",
    ],
    manfaat: [
      "Batu basecose digunakan sebagai pemadat untuk konstruksi pembangunan jalan.",
      "Selain itu, material ini juga digunakan untuk mengisi celah diantara batu makadam atau sebagai bahan pelapis pada pembuatan lapangan atau lahan parkir yang baru dibuka.",
      "Cara kerjanya yaitu lahan parkir, jalan, atau konstruksi lainnya yang masih berupa tanah dilapisi atau dipadatkan dengan batu makadam.",
      "Kemudian, konstruksi tersebut dilapisi kembali dengan menggunakan batu basecose sebagai lapisan kedua.",
      "Setelah itu, baru konstruksi dicor atau pun diaspal. Secara umum, berikut fungsi dari batu basecose.",
      "• bahan peresapan untuk lapisan bagian bawahnya",
      "• bahan perletakkan untuk lapisan bagian permukaan",
      "• sebagai bahan perkerasan dimana bahan tersebut mampu menahan gaya lintang dari beban roda atau pun beban lain yang melewati konstruksi tersebut nantinya.",
      "Itulah berbagai informasi mengenai batu base course yang perlu Anda ketahui.",
      "Keberadaan batu tersebut memang sangat penting dalam pengerjaan konstruksi.",
      "Perusahaan jasa konstruksi Tinggi Jaya Abadi juga menggunakan material bahan tersebut sebagai konstruksi.",
      "Pastinya material yang digunakan memiliki kualitas super sehingga konstruksi memiliki umur yang panjang atau awet.",
      "Selain menggunakan material yang berkualitas, Tinggi Jaya Abadi juga menawarkan keunggulan lain.",
      "Pertama, kami selalu berkomitmen untuk mengerjakan konstruksi tepat waktu.",
      "Kedua, kami berkomitmen untuk menjadi kontraktor yang amanah atau terpercaya.",
      "Oleh karena itu, material yang didatangkan dan digunakan dalam pengerjaan proyek harus sesuai dengan apa yang telah disepakati dalam SPK atau RAB.",
    ],
    accordion0Title: "Karakteristik",
    accordion1Title: "Jenis",
    accordion2Title: "Manfaat",
  },

  en: {
    title: "Base Course",
    subtitle: "Selling Base Course Stone for Road Construction Needs and More",
    thumbImage: "/produk/base-course.png",
    fallbackImage: "/produk/base-course.png",
    intro: [
      "Base Course – One type of quality stone used by Tinggi Jaya Abadi as a construction material is base course stone.",
      "Usually this stone is also called base course stone.",
      "This stone is a mixture of small stone fragments measuring 1 – 5 cm with stone dust specially formulated for land filtering.",
    ],
    after: [
      "In addition, this stone is divided into several types",
      "For more details, the following will further review information about this stone",
    ],
    karakteristik: [
      "We ensure that the base course stone material we use has super or the best quality.",
      "You can see this from its characteristics or physical features.",
      "The characteristic is that 70% of the stone consists of a mixture of black and whitish-gray crushed stone measuring 1 – 5 cm.",
      "Meanwhile, 30% of the stone contains a mixture of stone dust that is very small in size, like ash or dust.",
      "If the base course stone contains a mixture of dirt or soil, it can be said that the stone does not have good quality.",
      "Do not use this material for your construction.",
      "Therefore, make sure you have a trustworthy contractor like Tinggi Jaya Abadi.",
      "Because we are always committed to using quality materials for optimal construction results.",
    ],
    jenis: [
      "Base course stone is divided into two types. These types are based on the type of material mixture. Here is the full review.",
      "First, class A base course stone. This type of stone is whitish-gray in color. The material itself is 70% stone. While 30% is stone dust.",
      "Second, class B base course stone. This type of stone consists of a mixture of stone and stone dust in a 50:50 ratio.",
      "Both types of stone actually have good quality.",
      "It's just that each type of stone is made based on market demand.",
      "In addition, this is also based on the type of construction, the equipment used, and also the weather conditions during construction.",
      "For construction to run optimally, more in-depth research is needed to choose a suitable material according to the conditions of the construction site.",
      "On the other hand, natural base course stone material is easily affected by weather.",
      "In addition, the material also requires a bit of technical control.",
    ],
    manfaat: [
      "Base course stone is used as a compacting material for road construction.",
      "In addition, this material is also used to fill gaps between macadam stones or as a coating material in the construction of newly opened fields or parking lots.",
      "The way it works is that parking lots, roads, or other constructions that are still in the form of soil are coated or compacted with macadam stone.",
      "Then, the construction is coated again using base course stone as the second layer.",
      "After that, the construction is cast or paved. In general, here are the functions of base course stone.",
      "• absorption material for the lower layer",
      "• placement material for the surface layer",
      "• as a pavement material where the material is able to withstand lateral forces from wheel loads or other loads that will pass over the construction later.",
      "That is various information about base course stone that you need to know.",
      "The existence of this stone is indeed very important in construction work.",
      "The construction service company Tinggi Jaya Abadi also uses this material as construction material.",
      "Certainly the material used has super quality so that the construction has a long or durable life.",
      "Besides using quality materials, Tinggi Jaya Abadi also offers other advantages.",
      "First, we are always committed to completing construction on time.",
      "Second, we are committed to being a trustworthy or reliable contractor.",
      "Therefore, the materials brought in and used in project work must comply with what has been agreed in the SPK or RAB.",
    ],
    accordion0Title: "Characteristics",
    accordion1Title: "Types",
    accordion2Title: "Benefits",
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
// HALAMAN: BASE COURSE
// ─────────────────────────────────────────────
export default function BaseCourse() {
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
              className="w-full sm:w-[180px] aspect-square rounded-xl bg-slate-100 p-2"
              style={{ contain: "layout paint style" }}
            >
              <div className="w-full h-full rounded-lg overflow-hidden">
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
        <div className="space-y-3 mb-8">
          {d.after.map((p, i) => (
            <Reveal key={i} delay={i * 80} y={18}>
              <Paragraph text={p} />
            </Reveal>
          ))}
        </div>

        {/* Accordion — Karakteristik (index 0) */}
        <Reveal y={24}>
          <Accordion
            title={d.accordion0Title}
            isOpen={openIndex === 0}
            onToggle={() => toggle(0)}
            labels={L}
          >
            <div className="space-y-3.5">
              {d.karakteristik.map((p, i) => (
                <Paragraph key={i} text={p} />
              ))}
            </div>
          </Accordion>
        </Reveal>

        {/* Accordion — Jenis (index 1) */}
        <Reveal delay={80} y={24}>
          <Accordion
            title={d.accordion1Title}
            isOpen={openIndex === 1}
            onToggle={() => toggle(1)}
            labels={L}
          >
            <div className="space-y-3.5">
              {d.jenis.map((p, i) => (
                <Paragraph key={i} text={p} />
              ))}
            </div>
          </Accordion>
        </Reveal>

        {/* Accordion — Manfaat (index 2) */}
        <Reveal delay={140} y={24}>
          <Accordion
            title={d.accordion2Title}
            isOpen={openIndex === 2}
            onToggle={() => toggle(2)}
            labels={L}
          >
            <div className="space-y-3.5">
              {d.manfaat.map((p, i) => (
                <Paragraph key={i} text={p} />
              ))}
            </div>
          </Accordion>
        </Reveal>

      </div>
    </section>
  );
}