// src/components/PneumaticRoller.jsx
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

// ─── RENDER CONTENT (memoized) ───────────────
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
    title: "Pneumatic Roller",
    subtitle: "Rental Alat Berat Pneumatic Roller Murah Jabodetabek",
    thumbImage: "/proyek/proyek-51.webp",
    fallbackImage: "/proyek/proyek-51.webp",
    intro: [
      "Pneumatic Roller – Salah satu alat berat yang digunakan di dunia konstruksi adalah penggilas roda dengan angin asal biasa disebut dengan Pneumatic Tired Roller.",
      "Namun, tak sedikit orang yang menyebutnya Pneumatic Roller saja.",
      "Alat penggilas ini memang pada umumnya digunakan di dunia konstruksi, baik terkoordinasi di perusahaan tinggi.",
      "Lebih detailnya, berikut akan dibahas lebih lanjut mengenai alat berat tersebut.",
    ],
    accordionItems: [
      {
        title: "Pengertian",
        paragraphs: [
          "Mesin gilas Pneumatic merupakan mesin gilas dengan roda karet yang memiliki tekanan angin.",
          "Selain itu, alat ini dilengkapi dengan susunan roda pada bagian depan dan juga belakang yang susunannya berselang-seling.",
          "Hal ini bertujuan agar bagian yang tidak tergilas oleh roda depan dapat tergilas oleh roda yang ada pada bagian belakang.",
          "Jumlah roda pada alat Pneumatic pada umumnya berjumlah 9 sampai 19 buah.",
          "Dengan konfigurasi roda sebagai berikut:",
          "• 9 buah roda (4 roda di depan dan 5 di belakang)\n• 11 buah roda (5 roda depan dan 6 roda belakang)\n• 13 buah roda (6 roda depan dan 7 roda belakang)\n• 15 buah roda (7 roda depan dan 8 roda belakang)",
        ],
      },
      {
        title: "Fungsi",
        paragraphs: [
          "Pada umumnya, Pneumatic Roller digunakan pada pengerjaan material granular.",
          "Selain itu, alat ini juga digunakan pada pemadatan lapisan hotmix dimana lapisan tersebut berperan sebagai pemadatan antara.",
          "Namun, pastikan Anda tidak menggunakan alat ini pada tanah berbatu dan tajam.",
          "Mengapa demikian? Pasalnya, roda pada mesin akan lebih cepat mengalami kerusakan.",
          "Roda pada alat penggilas ini dapat bergerak maju dan digetarkan. Selain itu, alat ini juga bisa Anda gerakkan naik turun agar alat tersebut mampu memberikan tumbukan yang lebih kuat.",
        ],
      },
      {
        title: "Prinsip Kerja",
        paragraphs: [
          "Roda mesin Pneumatic Tired Roller bekerja dengan cara memadatkan tanah dengan efek meremas untuk pemadatan tanah yang ada di bagian bawah permukaan.",
          "Efek tersebut dapat ditingkatkan dengan cara menggoyang sumbu as pada roda guna mengikuti perubahan yang terjadi pada permukaan tanah.",
          "Lalu bagaimana dengan tekanannya? Tekanan yang diberikan roda bergantung pada tekanan angin roda tersebut.",
          "Jika tekanan pada angin roda semakin besar maka tekanan roda terhadap tanah juga semakin besar.",
          "Dengan demikian, besarnya tekanan dapat dilakukan dengan cara merubah tekanan pada roda alat tersebut.",
          "Alat penggilas Pneumatic memiliki berat kira-kira 80 ton.",
          "Dalam satu kali lintasan, alat ini mampu memadatkan material timbunan dengan dalam kurang lebih 24 inci.",
          "Bobot alat penggilas ini dapat ditingkatkan agar dapat bekerja dengan lebih maksimal.",
          "Caranya yaitu dengan cara menambah zat cair atau pun pasir pada bagian dinding-dinding mesin.",
        ],
      },
      {
        title: "Syarat Pemadatan Dengan Alat Pneumatic",
        paragraphs: [
          "Alat penggilas Pneumatic memiliki beberapa syarat pemadatan.",
          "Persyaratan tersebut didasarkan pada beberapa hal berikut ini:",
          "• Berat kotor peralatan\n• Berat per cm² lebar ban\n• Tekanan angin ban",
          "Kondisi tanah dan juga tahap pemadatan dapat merubah tekanan ban angin pada alat penggilas tersebut.",
          "Nah, agar alat Pneumatic Roller dapat bekerja dengan hasil yang optimal, sebaiknya alat tersebut menggunakan tekanan angin yang rendah.",
          "Hal ini bertujuan untuk menimbulkan efek pengapungan dan peliputan permukaan tanah yang akan digilas.",
          "Dengan demikian, pada lintasan berikutnya tanah yang digilas akan semakin padat sehingga tekanan angin harus dinaikkan hingga mencapai tekanan maksimum pada lintasan akhir.",
          "Beberapa alat berat yang berfungsi sebagai penggilas sudah ada yang dilengkapi dengan alat pengubah tekanan ban.",
          "Bahkan, penambahan tersebut dapat dilakukan tanpa menghentikan roller yang sedang bekerja.",
          "Penambahan tekanan angin pada alat Pneumatic tersebut dapat dilakukan dengan beberapa cara sebagai berikut:",
          "• Merubah tekanan yang ada pada bagian dalam ban\n• Mengatur berat pemberat pada alat tersebut (ballasi)\n• Menjaga roller dengan berat yang berbeda",
        ],
      },
    ],
    ctaBadge: "Konsultasi Gratis",
    ctaTitle1: "Butuh sewa Pneumatic Roller? ",
    ctaTitle2: "Kami siap membantu.",
    ctaButton: "Hubungi via WhatsApp",
    ctaWaText: "Halo%20Tri%20Abadi%20Makmur%2c%20saya%20ingin%20konsultasi%20sewa%20pneumatic%20roller...",
  },
  en: {
    title: "Pneumatic Roller",
    subtitle: "Affordable Pneumatic Roller Heavy Equipment Rental in Jabodetabek",
    thumbImage: "/proyek/proyek-51.webp",
    fallbackImage: "/proyek/proyek-51.webp",
    intro: [
      "Pneumatic Roller – One of the heavy equipment used in the construction world is the pneumatic-tired roller.",
      "However, many people simply call it Pneumatic Roller.",
      "This roller equipment is generally used in the construction world, whether coordinated at high-level companies.",
      "For more details, the following will further discuss this heavy equipment.",
    ],
    accordionItems: [
      {
        title: "Definition",
        paragraphs: [
          "The Pneumatic roller machine is a roller machine with rubber wheels that have air pressure.",
          "In addition, this tool is equipped with an arrangement of wheels on the front and rear with alternating arrangements.",
          "This aims to ensure that parts not rolled by the front wheels can be rolled by the wheels at the rear.",
          "The number of wheels on the Pneumatic tool is generally 9 to 19 pieces.",
          "With the following wheel configurations:",
          "• 9 wheels (4 front and 5 rear)\n• 11 wheels (5 front and 6 rear)\n• 13 wheels (6 front and 7 rear)\n• 15 wheels (7 front and 8 rear)",
        ],
      },
      {
        title: "Function",
        paragraphs: [
          "Generally, Pneumatic Rollers are used in granular material work.",
          "In addition, this tool is also used in compacting the hotmix layer where this layer acts as intermediate compaction.",
          "However, make sure you do not use this tool on rocky and sharp soil.",
          "Why so? Because the wheels on the machine will be damaged more quickly.",
          "The wheels on this roller can move forward and be vibrated. In addition, you can also move this tool up and down so the tool is able to provide a stronger impact.",
        ],
      },
      {
        title: "Working Principle",
        paragraphs: [
          "The wheels of the Pneumatic Tired Roller work by compacting the soil with a squeezing effect for compacting the soil below the surface.",
          "This effect can be increased by shaking the axle on the wheel to follow the changes occurring on the soil surface.",
          "Then what about the pressure? The pressure given by the wheel depends on the air pressure of that wheel.",
          "If the air pressure of the wheel is greater, the wheel pressure on the soil is also greater.",
          "Thus, the amount of pressure can be done by changing the pressure on the wheels of the tool.",
          "The Pneumatic roller weighs approximately 80 tons.",
          "In one pass, this tool is able to compact fill material to a depth of about 24 inches.",
          "The weight of this roller can be increased so it can work more optimally.",
          "The way is by adding liquid or sand to the walls of the machine.",
        ],
      },
      {
        title: "Compaction Requirements with Pneumatic Equipment",
        paragraphs: [
          "The Pneumatic roller has several compaction requirements.",
          "The requirements are based on the following:",
          "• Gross weight of equipment\n• Weight per cm² tire width\n• Tire air pressure",
          "Soil conditions and also the compaction stage can change the tire air pressure on the roller.",
          "Well, so that the Pneumatic Roller can work with optimal results, it is better for the tool to use low air pressure.",
          "This aims to create a floating effect and covering of the soil surface to be rolled.",
          "Thus, on the next pass the rolled soil will become denser so the air pressure must be increased to reach maximum pressure on the final pass.",
          "Some heavy equipment functioning as rollers already come with tire pressure changing devices.",
          "In fact, this addition can be done without stopping the roller that is working.",
          "The addition of air pressure to the Pneumatic tool can be done in several ways as follows:",
          "• Changing the pressure inside the tire\n• Adjusting the ballast weight on the tool\n• Maintaining rollers with different weights",
        ],
      },
    ],
    ctaBadge: "Free Consultation",
    ctaTitle1: "Need to rent a Pneumatic Roller? ",
    ctaTitle2: "We're ready to help.",
    ctaButton: "Contact via WhatsApp",
    ctaWaText: "Hello%20Tri%20Abadi%20Makmur%2c%20would%20like%20to%20consult%20about%20pneumatic%20roller%20rental...",
  },
};

const labels = {
  id: { open: "Buka", close: "Tutup" },
  en: { open: "Open", close: "Close" },
};

// ─── HALAMAN ─────────────────────────────────
export default function PneumaticRoller() {
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

        {/* ═══ ACCORDION ═══ */}
        {d.accordionItems.map((item, i) => (
          <Reveal key={i} delay={i * 40} y={24}>
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