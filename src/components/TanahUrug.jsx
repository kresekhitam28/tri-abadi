// src/components/TanahUrug.jsx
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
    title: "Tanah Urug",
    subtitle: "Material Pengurugan Lahan",
    thumbImage: "/produk/tanah-urug.png",
    fallbackImage: "/produk/tanah-urug.png",
    intro: [
      "Tanah Urug – Material penting untuk meninggikan permukaan tanah sebelum proses pembangunan dimulai.",
      "Tanah urug adalah material tanah yang digunakan untuk mengurug lahan dan meninggikan permukaan tanah.",
      "Biasanya digunakan pada lahan yang lebih rendah dari jalan atau lahan yang akan didirikan bangunan.",
    ],
    after: [
      "Tanah urug menjadi tahap awal yang sangat penting dalam proyek konstruksi, karena menentukan kestabilan lahan.",
      "Kami menyediakan tanah urug dengan kualitas baik yang telah dipilih agar mudah dipadatkan dan stabil.",
      "Beberapa kelebihan tanah urug kami diantaranya sebagai berikut.",
    ],
    accordionItems: [
      {
        title: "Cocok untuk Urugan Lahan",
        paragraphs: [
          "Tanah urug kami ideal digunakan untuk meninggikan dan meratakan permukaan lahan sebelum dibangun.",
          "Tanah urug membantu menciptakan lahan yang datar dan stabil, sehingga memudahkan proses pembangunan di atasnya.",
          "Untuk lahan yang lebih rendah dari jalan atau lahan bekas sawah, penggunaan tanah urug sangat dianjurkan agar permukaan tidak tergenang air.",
          "Setelah dipadatkan, tanah urug siap untuk dilapisi material lain seperti sirtu, pasir, atau langsung didirikan bangunan.",
        ],
      },
      {
        title: "Volume Besar Tersedia",
        paragraphs: [
          "Kami mampu menyediakan tanah urug dalam volume besar, siap dikirim ke lokasi proyek Anda.",
          "Dengan stok yang melimpah, kami dapat memenuhi kebutuhan proyek pengurugan lahan skala kecil hingga besar.",
          "Pengiriman dilakukan secara bertahap sesuai kebutuhan proyek, sehingga lahan bisa langsung dikerjakan tanpa menunggu.",
          "Volume pengiriman disesuaikan dengan kapasitas armada dan kondisi jalan menuju lokasi proyek.",
        ],
      },
      {
        title: "Harga Ekonomis",
        paragraphs: [
          "Harga tanah urug kami sangat bersaing, cocok untuk proyek dengan kebutuhan urugan bervolume besar.",
          "Dengan harga yang terjangkau, Anda bisa mengurug lahan yang luas tanpa harus mengeluarkan biaya material yang besar.",
          "Biaya pengiriman juga bisa disesuaikan dengan jarak lokasi proyek dari sumber tanah urug.",
          "Hubungi kami untuk mendapatkan penawaran harga khusus sesuai volume dan lokasi proyek Anda.",
        ],
      },
      {
        title: "Pengiriman Cepat",
        paragraphs: [
          "Didukung armada sendiri, pengiriman tanah urug dapat dilakukan dengan cepat dan tepat waktu.",
          "Kami memiliki dump truck dengan kapasitas beragam untuk menyesuaikan kebutuhan proyek Anda.",
          "Pengiriman bisa dijadwalkan sesuai progres pekerjaan, sehingga material datang tepat saat dibutuhkan.",
          "Dengan pengiriman yang cepat dan terjadwal, proyek pengurugan lahan Anda bisa selesai lebih efisien.",
        ],
      },
    ],
  },

  en: {
    title: "Fill Soil",
    subtitle: "Land Filling Material",
    thumbImage: "/produk/tanah-urug.png",
    fallbackImage: "/produk/tanah-urug.png",
    intro: [
      "Fill Soil – An important material for raising the ground surface before the construction process begins.",
      "Fill soil is soil material used to fill land and raise the ground surface.",
      "Usually used on land that is lower than the road or land where a building will be constructed.",
    ],
    after: [
      "Fill soil is a very important initial stage in a construction project, because it determines land stability.",
      "We provide fill soil of good quality that has been selected to be easily compacted and stable.",
      "Some of the advantages of our fill soil include the following.",
    ],
    accordionItems: [
      {
        title: "Suitable for Land Filling",
        paragraphs: [
          "Our fill soil is ideal for raising and leveling the land surface before construction.",
          "Fill soil helps create flat and stable land, making the construction process on top of it easier.",
          "For land that is lower than the road or former rice fields, using fill soil is highly recommended so the surface does not flood.",
          "After compacting, fill soil is ready to be coated with other materials such as sirtu, sand, or immediately built upon.",
        ],
      },
      {
        title: "Large Volume Available",
        paragraphs: [
          "We are able to provide fill soil in large volumes, ready to be delivered to your project site.",
          "With abundant stock, we can meet the needs of small to large-scale land filling projects.",
          "Delivery is done in stages according to project needs, so the land can be worked on immediately without waiting.",
          "Delivery volume is adjusted to fleet capacity and road conditions leading to the project site.",
        ],
      },
      {
        title: "Economical Price",
        paragraphs: [
          "Our fill soil price is very competitive, suitable for projects with large-volume fill needs.",
          "With an affordable price, you can fill a large area of land without having to spend a lot on material costs.",
          "Delivery costs can also be adjusted based on the distance of the project site from the fill soil source.",
          "Contact us to get a special price offer according to your project's volume and location.",
        ],
      },
      {
        title: "Fast Delivery",
        paragraphs: [
          "Supported by our own fleet, fill soil delivery can be done quickly and on time.",
          "We have dump trucks with various capacities to adjust to your project needs.",
          "Delivery can be scheduled according to work progress, so materials arrive exactly when needed.",
          "With fast and scheduled delivery, your land filling project can be completed more efficiently.",
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
// HALAMAN: TANAH URUG
// ─────────────────────────────────────────────
export default function TanahUrug() {
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