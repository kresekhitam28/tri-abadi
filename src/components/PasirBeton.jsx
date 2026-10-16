// src/components/PasirBeton.jsx
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
    title: "Pasir Beton",
    subtitle: "Pasir Halus untuk Cor Beton",
    thumbImage: "/produk/pasir-beton.png",
    fallbackImage: "/produk/pasir-beton.png",
    intro: [
      "Pasir Beton – Salah satu material utama yang dibutuhkan dalam pekerjaan struktur bangunan.",
      "Pasir beton adalah pasir dengan butiran halus yang digunakan untuk campuran cor beton, plesteran, dan acian.",
      "Butirannya seragam dan bersih dari kotoran, sehingga menghasilkan campuran beton yang kuat dan rata.",
    ],
    after: [
      "Kualitas pasir beton sangat menentukan kekuatan struktur bangunan yang dihasilkan.",
      "Oleh karena itu, kami hanya menyediakan pasir beton dengan kualitas terbaik yang telah melalui proses penyaringan.",
      "Beberapa kelebihan pasir beton kami diantaranya sebagai berikut.",
    ],
    accordionItems: [
      {
        title: "Butiran Halus & Seragam",
        paragraphs: [
          "Butirannya halus dan seragam sehingga menghasilkan campuran beton yang rata dan tidak mudah retak.",
          "Keseragaman butiran membuat pasir beton lebih mudah tercampur dengan semen dan air, sehingga adonan lebih homogen.",
          "Dengan campuran yang homogen, hasil cor beton akan lebih padat, tidak keropos, dan memiliki kekuatan yang merata di seluruh permukaan.",
          "Selain itu, permukaan beton yang dihasilkan lebih halus dan rapi, sehingga mengurangi kebutuhan pekerjaan finishing tambahan.",
        ],
      },
      {
        title: "Cocok untuk Cor Beton",
        paragraphs: [
          "Kualitasnya ideal untuk campuran cor beton struktural, mulai dari pondasi, kolom, hingga plat lantai.",
          "Pasir beton merupakan salah satu dari tiga komponen utama dalam campuran beton, selain semen dan kerikil.",
          "Dengan kualitas pasir yang tepat, beton yang dihasilkan mampu menahan beban berat dan tahan terhadap perubahan cuaca.",
          "Pasir beton juga cocok digunakan untuk pekerjaan plesteran dinding, acian, dan pembuatan lantai beton yang membutuhkan permukaan halus.",
        ],
      },
      {
        title: "Bersih dari Kotoran",
        paragraphs: [
          "Pasir telah disaring dan dibersihkan dari lumpur maupun kotoran lain yang dapat menurunkan kualitas beton.",
          "Kandungan lumpur yang tinggi pada pasir dapat menghambat proses pengerasan beton dan menurunkan daya rekat antar material.",
          "Selain itu, pasir yang kotor juga membuat beton lebih mudah retak dan tidak tahan lama.",
          "Oleh karena itu, semua pasir beton kami melewati proses pencucian dan penyaringan sebelum dikirim ke lokasi proyek Anda.",
        ],
      },
      {
        title: "Kualitas Terjamin",
        paragraphs: [
          "Kami memastikan setiap pasir yang dikirim telah memenuhi standar kualitas material konstruksi.",
          "Mulai dari proses pengambilan, penyaringan, hingga pengiriman — semua dikerjakan dengan pengawasan ketat.",
          "Kami juga memastikan pasir yang dikirim memiliki kadar air yang sesuai, sehingga tidak mengurangi kualitas campuran beton.",
          "Dengan komitmen pada kualitas, kami berharap dapat mendukung kelancaran dan keberhasilan proyek konstruksi Anda.",
        ],
      },
    ],
  },

  en: {
    title: "Concrete Sand",
    subtitle: "Fine Sand for Concrete Casting",
    thumbImage: "/produk/pasir-beton.png",
    fallbackImage: "/produk/pasir-beton.png",
    intro: [
      "Concrete Sand – One of the main materials needed in building structural work.",
      "Concrete sand is sand with fine grains used for concrete casting mixtures, plastering, and skim coating.",
      "Its grains are uniform and clean of impurities, resulting in a strong and even concrete mixture.",
    ],
    after: [
      "The quality of concrete sand greatly determines the strength of the resulting building structure.",
      "Therefore, we only provide the best quality concrete sand that has gone through a sieving process.",
      "Some of the advantages of our concrete sand include the following.",
    ],
    accordionItems: [
      {
        title: "Fine & Uniform Grains",
        paragraphs: [
          "The grains are fine and uniform, resulting in an even concrete mixture that is not easily cracked.",
          "The uniformity of grains makes concrete sand easier to mix with cement and water, resulting in a more homogeneous mixture.",
          "With a homogeneous mixture, the concrete casting result will be denser, non-porous, and have even strength across the entire surface.",
          "In addition, the resulting concrete surface is smoother and neater, reducing the need for additional finishing work.",
        ],
      },
      {
        title: "Suitable for Concrete Casting",
        paragraphs: [
          "Its quality is ideal for structural concrete casting mixtures, from foundations, columns, to floor slabs.",
          "Concrete sand is one of the three main components in a concrete mixture, along with cement and gravel.",
          "With the right sand quality, the resulting concrete is able to withstand heavy loads and resist weather changes.",
          "Concrete sand is also suitable for wall plastering, skim coating, and making concrete floors that require a smooth surface.",
        ],
      },
      {
        title: "Clean from Impurities",
        paragraphs: [
          "The sand has been sieved and cleaned of mud and other impurities that can reduce concrete quality.",
          "High mud content in sand can hinder the concrete hardening process and reduce the adhesion between materials.",
          "In addition, dirty sand also makes concrete more prone to cracking and not durable.",
          "Therefore, all of our concrete sand goes through a washing and sieving process before being sent to your project site.",
        ],
      },
      {
        title: "Guaranteed Quality",
        paragraphs: [
          "We ensure that every sand delivered meets construction material quality standards.",
          "From the extraction process, sieving, to delivery — all are done with strict supervision.",
          "We also ensure the delivered sand has the appropriate moisture content, so it does not reduce the quality of the concrete mixture.",
          "With our commitment to quality, we hope to support the smoothness and success of your construction project.",
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
// HALAMAN: PASIR BETON
// ─────────────────────────────────────────────
export default function PasirBeton() {
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