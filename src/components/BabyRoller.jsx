// src/components/BabyRoller.jsx
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

// ─── RENDER KONTEN (memoized) ────────────────
const RenderContent = memo(function RenderContent({ text }) {
  if (!text) return null;
  return (
    <p className="text-slate-700 leading-[1.85] whitespace-pre-line"
       style={{ fontSize: "clamp(0.8125rem, 1.5vw, 0.875rem)" }}>
      {text}
    </p>
  );
});

// ─── DATA BILINGUAL ──────────────────────────
const data = {
  id: {
    title: "Baby Roller",
    subtitle: "Sewa Mesin Baby Roller Murah",
    thumbImage: "/proyek/proyek-52.webp",
    fallbackImage: "/proyek/proyek-52.webp",
    intro: [
      "Baby Roller atau yang lebih populer dikenal dengan istilah Vibratory Roller merupakan alat yang memiliki fungsi untuk memadatkan dan meratakan permukaan tanah.",
      "Salah satu alat konstruksi yang berbobot kurang lebih 3 ton.",
      "Sementara kemampuan daya beban yang dimiliki oleh alat ini berkisar beberapa ton.",
      "Oleh sebab itu, sangat tidak heran apabila banyak kontraktor jalan yang memanfaatkan kemampuan alat ini.",
      "Umumnya untuk memadatkan timbunan larangan guna mendapat hasil yang maksimal.",
      "Bagi anda yang hendak melakukan pekerjaan jalan ataupun memadatkan lahan, alangkah baiknya lebih dahulu mengenai informasi penting mengenai alat ini.",
      "Untuk mengetahui lebih rinci mengenai alat ini, berikut akan kami sampaikan pembahasan di bawah ini.",
    ],
    kelebihanItems: [
      {
        title: "Kelebihan Baby Roller",
        paragraphs: [
          "Pada dasarnya penggunaan alat pemadatan ini disesuaikan dengan kebutuhan pembangunan yang akan sedang dilakukan.",
          "Selain itu, sudah barang tentu anda akan lebih menghemat biaya pengeluaran anda untuk menyewa baby roller daripada menggunakan mesin lain.",
          "Adapun beberapa hal yang menjadi kelebihan alat ini dalam melakukan pekerjaan pemadatan atau pekerjaan pemadatan lahan adalah sebagai berikut.",
        ],
      },
      {
        title: "Lebih Efisien",
        paragraphs: [
          "Bagi anda yang hendak melakukan proyek jalan dan meratakan permukaan lahan.",
          "Sudah barang tentu mengejar target yang dijadwalkan.",
          "Oleh sebab itu, kemungkinan besar dengan menggunakan baby roller, anda dapat melakukan pengerjaan proyek sesuai dengan ekspektasi yang telah direncanakan di awal.",
          "Dan hal ini berarti telah mengefesienkan segala kebutuhan.",
        ],
      },
      {
        title: "Hasil Yang Maksimal",
        paragraphs: [
          "Dengan adanya beberapa jenis dari baby roller atau vibratory roller, setidaknya anda dapat memilih sesuai dengan kebutuhan dan budget yang tersedia.",
          "Baik itu anda menggunakan tipe single drum dan double drum.",
          "Selain itu, untuk mendapatkan hasil yang maksimal dalam pengerjaan, tidak salah pula apabila anda harus mengetahui spesifikasi dari alat konstruksi ini.",
        ],
      },
    ],
    penghubung: "Adapun beberapa spesifikasi tersebut ialah sebagai berikut:",
    tipeItems: [
      {
        title: "Tipe GTM-RD 7HS",
        paragraphs: [
          "Spesifikasi yang dimiliki oleh tipe ini ialah terdiri dari, operating weight sebesar 810 kg, daya tekanan alat 2.1 ton.",
          "Drum width 650 mm dan diameter drum sekitar 420 mm.",
          "Kapasitasnya melakukan penetrasi area sepanjang 2613 meter persegi/jam.",
          "Kekuatan mesin menggunakan Hatz Diesel 7 HP.",
          "Ukuran alat ialah 1475 x 915 x 2310 mm. Sistem pengaplikasian menggunakan gas tangan.",
        ],
      },
      {
        title: "Tipe GTM-RD 12A-90",
        paragraphs: [
          "Sementara untuk tipe yang kedua ialah memiliki spesifikasi; operating weight sebesar 1200 kg.",
          "Diameter drum 560 mm. Jumlah drum penggerak 1. Konfigurasi penetrasi per drum sebesar 15 kN.",
          "Kapasitas pengerjaan panjang area 7800 meter persegi/jam.",
          "Mesin penggerak bermerek Honda Gasoline 17 HP. Ukuran alat, memiliki panjang 1825 x 1035 x 2300 mm.",
          "Sedangkan sistem kerjanya secara elektrik.",
        ],
      },
      {
        title: "Tipe GTM-RD 16-90",
        paragraphs: [
          "Untuk tipe yang ketiga, yakni memiliki spesifikasi; operating weight sebesar 1500 kg.",
          "Diameter drum 560 mm. Drum penggerak 2 buah. Konfigurasi penetrasi per drum berdaya 15 kN.",
          "Kapasitas pengerjaan area 8386 meter persegi/jam. Mesin kemudi, Lombardini Gasoline 27 HP.",
          "Ukuran baby roller ini ialah 1825 x 1032 x 2300 mm. Sistem kerjanya bersifat elektrik.",
        ],
      },
      {
        title: "Hemat Daya",
        paragraphs: [
          "Dengan mengandalkan penggunaan alat ini setidaknya anda dapat lebih menghemat daya.",
          "Utamanya sumber daya (tenaga manusia) yang dibutuhkan. Ukurannya yang lebih mini, dapat mudah dikendalikan.",
          "Nah, demikianlah beberapa kelebihan dari baby roller yang harus anda ketahui.",
          "Untuk informasi lebih lanjut, terkait alat ini anda dapat mengunjungi situs www.konstruksi-jasa.com.",
          "Atau datang langsung ke perusahaan Tinggi Jaya Abadi.",
        ],
      },
    ],
    ctaBadge: "Konsultasi Gratis",
    ctaTitle1: "Butuh sewa Baby Roller? ",
    ctaTitle2: "Kami siap membantu.",
    ctaButton: "Hubungi via WhatsApp",
    ctaWaText: "Halo%20Tri%20Abadi%20Makmur%2c%20saya%20ingin%20konsultasi%20sewa%20baby%20roller...",
  },
  en: {
    title: "Baby Roller",
    subtitle: "Affordable Baby Roller Machine Rental",
    thumbImage: "/proyek/proyek-52.webp",
    fallbackImage: "/proyek/proyek-52.webp",
    intro: [
      "Baby Roller, more popularly known as Vibratory Roller, is a machine that functions to compact and level the soil surface.",
      "One type of construction equipment weighing approximately 3 tons.",
      "Meanwhile, the load capacity of this tool ranges from a few tons.",
      "Therefore, it is no surprise that many road contractors take advantage of this tool's capability.",
      "Generally used to compact embankments to get maximum results.",
      "For those of you who want to do road work or compact land, it is better to first know the important information about this tool.",
      "For more detailed information about this tool, we will present the discussion below.",
    ],
    kelebihanItems: [
      {
        title: "Advantages of Baby Roller",
        paragraphs: [
          "Basically, the use of this compaction tool is adjusted to the construction needs being carried out.",
          "In addition, you will certainly save more on your expenses for renting a baby roller than using other machines.",
          "Here are several things that are the advantages of this tool in doing compaction work or land compaction work.",
        ],
      },
      {
        title: "More Efficient",
        paragraphs: [
          "For those of you who want to do road projects and level land surfaces.",
          "Of course, chasing the scheduled target.",
          "Therefore, it is very likely that by using a baby roller, you can carry out project work according to the expectations planned at the beginning.",
          "And this means having made all needs efficient.",
        ],
      },
      {
        title: "Maximum Results",
        paragraphs: [
          "With the existence of several types of baby roller or vibratory roller, at least you can choose according to your needs and available budget.",
          "Whether you use single drum or double drum types.",
          "In addition, to get maximum results in the work, it is also not wrong if you must know the specifications of this construction tool.",
        ],
      },
    ],
    penghubung: "Here are some of the specifications as follows:",
    tipeItems: [
      {
        title: "Type GTM-RD 7HS",
        paragraphs: [
          "The specifications of this type consist of: operating weight of 810 kg, tool pressure power of 2.1 tons.",
          "Drum width 650 mm and drum diameter around 420 mm.",
          "Its penetration capacity covers an area of 2613 square meters/hour.",
          "Engine power using Hatz Diesel 7 HP.",
          "Tool dimensions are 1475 x 915 x 2310 mm. Application system uses hand gas.",
        ],
      },
      {
        title: "Type GTM-RD 12A-90",
        paragraphs: [
          "As for the second type, it has specifications; operating weight of 1200 kg.",
          "Drum diameter 560 mm. Number of drive drums 1. Penetration configuration per drum is 15 kN.",
          "Work capacity of area length 7800 square meters/hour.",
          "Drive engine brand Honda Gasoline 17 HP. Tool dimensions, length 1825 x 1035 x 2300 mm.",
          "While its working system is electric.",
        ],
      },
      {
        title: "Type GTM-RD 16-90",
        paragraphs: [
          "For the third type, it has specifications; operating weight of 1500 kg.",
          "Drum diameter 560 mm. Drive drums 2 pieces. Penetration configuration per drum is 15 kN.",
          "Work capacity of area 8386 square meters/hour. Steering engine, Lombardini Gasoline 27 HP.",
          "The dimensions of this baby roller are 1825 x 1032 x 2300 mm. Its working system is electric.",
        ],
      },
      {
        title: "Power Saving",
        paragraphs: [
          "By relying on the use of this tool, at least you can save more power.",
          "Mainly the resources (human labor) needed. Its more mini size makes it easy to control.",
          "Well, those are some of the advantages of the baby roller that you should know.",
          "For more information regarding this tool, you can visit the site www.konstruksi-jasa.com.",
          "Or come directly to the Tinggi Jaya Abadi company.",
        ],
      },
    ],
    ctaBadge: "Free Consultation",
    ctaTitle1: "Need to rent a Baby Roller? ",
    ctaTitle2: "We're ready to help.",
    ctaButton: "Contact via WhatsApp",
    ctaWaText: "Hello%20Tri%20Abadi%20Makmur%2c%20would%20like%20to%20consult%20about%20baby%20roller%20rental...",
  },
};

const labels = {
  id: { open: "Buka", close: "Tutup" },
  en: { open: "Open", close: "Close" },
};

// ─── HALAMAN ─────────────────────────────────
export default function BabyRoller() {
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

        {/* ═══ ACCORDION: KELEBIHAN ═══ */}
        {d.kelebihanItems.map((item, i) => (
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

        {/* ═══ PENGHUBUNG ═══ */}
        <Reveal delay={80} y={18}>
          <p
            className="text-slate-900 font-medium leading-[1.6] mt-8 sm:mt-10 mb-4 sm:mb-5"
            style={{ fontSize: "clamp(0.9375rem, 1.8vw, 1.0625rem)" }}
          >
            {d.penghubung}
          </p>
        </Reveal>

        {/* ═══ ACCORDION: TIPE ═══ */}
        {d.tipeItems.map((item, i) => {
          const index = d.kelebihanItems.length + i;
          return (
            <Reveal key={i} delay={i * 50} y={24}>
              <Accordion
                title={item.title}
                isOpen={openIndex === index}
                onToggle={() => toggle(index)}
                labels={L}
              >
                {item.paragraphs.map((p, j) => (
                  <RenderContent key={j} text={p} />
                ))}
              </Accordion>
            </Reveal>
          );
        })}

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