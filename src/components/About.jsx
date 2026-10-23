// src/components/About.jsx
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
// IKON
// ─────────────────────────────────────────────
function IconCheck({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}
function IconChevronDown({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}
function IconEye({ className = "w-6 h-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
function IconTarget({ className = "w-6 h-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}
function IconAward({ className = "w-6 h-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  );
}
function IconDownload({ className = "w-5 h-5" }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
  );
}

// ─────────────────────────────────────────────
// KONTEN BILINGUAL
// ─────────────────────────────────────────────
const content = {
  id: {
    heroKicker: "Tentang Kami",
    heroTitleLight: "Tentang ",
    heroTitleBold: "Kami",
    heroSubtitle: "Semua Tentang PT. Tri Abadi Makmur Indonesia",
    heroImgAlt: "Konstruksi",
    intro:
      "Tri Abadi Makmur merupakan perusahaan yang bergerak di bidang konstruksi, dengan pengalaman yang sudah bertahun-tahun kami kembangkan, tahapan proses yang mengedepankan kualitas dan kehati-hatian, serta eksekusi pengerjaan proyek yang signifikan, demi tercapainya kepuasan client sehingga terwujudnya jalinan kerjasama yang continue dan berkepanjangan.",
    sectionKicker: "pondasi Kami",
    sectionTitleLight: "Visi, Misi ",
    sectionTitleBold: "& Keunggulan",
    card1Number: "01",
    card1Title: "Visi Kami",
    card1Body: (
      <>
        Menjadi perusahaan yang berskala{" "}
        <strong className="text-slate-900">Nasional dan Internasional</strong>{" "}
        yang mampu berdaya saing secara professional.
      </>
    ),
    card2Number: "02",
    card2Title: "Misi Kami",
    misi: [
      "Perhatian terhadap isu lingkungan dan sosial.",
      "Menciptakan solusi inovatif untuk setiap hasilnya.",
      "Memberikan hasil terbaik untuk setiap hasilnya.",
    ],
    card3Number: "03",
    card3Title: "Keunggulan",
    accordionTitle: "Mengapa memilih kami?",
    mengapa: [
      "Berpengalaman bertahun-tahun di berbagai proyek konstruksi jalan dan bangunan.",
      "SDM ahli dan profesional di bidangnya, didukung peralatan modern.",
      "Mengedepankan kualitas, kehati-hatian, dan ketepatan waktu.",
      "Mampu mendengarkan dan memberikan solusi terbaik sesuai keinginan client.",
      "Harga kompetitif dengan hasil yang memuaskan dan tahan lama.",
      "Pelayanan responsif — konsultasi dan survei lokasi gratis.",
    ],
    downloadBtn: "Download Company Profile",
  },
  en: {
    heroKicker: "About Us",
    heroTitleLight: "About ",
    heroTitleBold: "Us",
    heroSubtitle: "All About PT. Tri Abadi Makmur Indonesia",
    heroImgAlt: "Construction",
    intro:
      "Tri Abadi Makmur is a company engaged in the construction sector. With years of experience, we have developed quality-focused and careful processes, along with significant project execution, to achieve client satisfaction and build continuous, long-term partnerships.",
    sectionKicker: "Our Foundation",
    sectionTitleLight: "Vision, Mission ",
    sectionTitleBold: "& Advantages",
    card1Number: "01",
    card1Title: "Our Vision",
    card1Body: (
      <>
        To become a company operating at{" "}
        <strong className="text-slate-900">National and International</strong>{" "}
        scale, capable of competing professionally.
      </>
    ),
    card2Number: "02",
    card2Title: "Our Mission",
    misi: [
      "Attention to environmental and social issues.",
      "Creating innovative solutions in every result.",
      "Delivering the best results in every outcome.",
    ],
    card3Number: "03",
    card3Title: "Advantages",
    accordionTitle: "Why choose us?",
    mengapa: [
      "Years of experience in various road and building construction projects.",
      "Expert and professional human resources, supported by modern equipment.",
      "Prioritizing quality, carefulness, and punctuality.",
      "Able to listen and provide the best solutions according to client needs.",
      "Competitive prices with satisfying and long-lasting results.",
      "Responsive service — free consultation and site survey.",
    ],
    downloadBtn: "Download Company Profile",
  },
};

// ─────────────────────────────────────────────
// HOOK: REVEAL ON SCROLL
// ─────────────────────────────────────────────
function useReveal(threshold = 0.12, enabled = true) {
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
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -60px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, enabled]);

  return [ref, visible];
}

// ─────────────────────────────────────────────
// ACCORDION ITEM (memoized)
// ─────────────────────────────────────────────
const AccordionItem = memo(function AccordionItem({ title, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = `about-accordion-${title.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div
      className={`border rounded-xl overflow-hidden bg-white transition-colors duration-200
        ${open ? "border-[#1e88e5]/50" : "border-slate-200"}`}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={panelId}
        className="w-full flex items-center justify-between gap-3 sm:gap-4 px-4 sm:px-5 py-3.5 sm:py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1e88e5]"
      >
        <h4
          className={`font-semibold transition-colors duration-150
            ${open ? "text-[#1e88e5]" : "text-slate-900"}`}
          style={{ fontSize: "clamp(0.875rem, 1.6vw, 0.9375rem)" }}
        >
          {title}
        </h4>
        <span
          className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-200
            ${open
              ? "bg-[#1e88e5] text-white"
              : "bg-slate-100 text-slate-400"}`}
        >
          <IconChevronDown
            className={`w-4 h-4 transition-transform duration-300
              ${open ? "rotate-180" : ""}`}
          />
        </span>
      </button>

      <div
        id={panelId}
        className={`grid transition-all duration-300 ease-in-out
          ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-3 border-t border-slate-100">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
});

// ─────────────────────────────────────────────
// KARTU FOUNDATION (memoized)
// ─────────────────────────────────────────────
const FoundationCard = memo(function FoundationCard({
  number, Icon, title, delay = 0, children, visible,
}) {
  return (
    <div
      className={`relative bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 lg:p-8 h-full hover:border-[#1e88e5]/50
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      style={{
        transitionProperty: "opacity, transform, border-color",
        transitionDuration: "500ms",
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        transitionDelay: `${delay}ms`,
      }}
    >
      <div className="relative w-11 h-11 sm:w-12 sm:h-12 lg:w-14 lg:h-14 mb-4 sm:mb-5 lg:mb-6">
        <div className="w-full h-full flex items-center justify-center bg-[#1e88e5]/10 text-[#1e88e5] rounded-xl">
          <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
      </div>

      <div className="relative text-[10.5px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#1e88e5] font-semibold mb-2 sm:mb-3">
        {number} — {title}
      </div>

      <div className="relative">
        {children}
      </div>
    </div>
  );
});

// ─────────────────────────────────────────────
// SUB-KOMPONEN: LIST ITEM (memoized)
// ─────────────────────────────────────────────
const ListItem = memo(function ListItem({ item, delay = 0, visible }) {
  return (
    <li
      className="flex items-start gap-2.5"
      style={{
        transitionProperty: "opacity, transform",
        transitionDuration: "400ms",
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        transitionDelay: visible ? `${delay}ms` : "0ms",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(6px)",
      }}
    >
      <span className="shrink-0 w-4 h-4 flex items-center justify-center bg-[#1e88e5]/10 text-[#1e88e5] rounded-full mt-0.5">
        <IconCheck className="w-2.5 h-2.5" />
      </span>
      <span
        className="text-slate-700 leading-relaxed"
        style={{ fontSize: "clamp(0.8125rem, 1.4vw, 0.875rem)" }}
      >
        {item}
      </span>
    </li>
  );
});

// ─────────────────────────────────────────────
// ABOUT
// ─────────────────────────────────────────────
export default function About() {
  const { lang } = useLang();
  const data = content[lang] || content.id;
  const isMobile = useIsMobile();

  const [heroRef, heroVisible]   = useReveal(0.1, !isMobile);
  const [introRef, introVisible] = useReveal(0.15, !isMobile);
  const [cardsRef, cardsVisible] = useReveal(0.1, !isMobile);

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section
        ref={heroRef}
        className="relative bg-slate-950 pt-32 pb-10 sm:pt-36 sm:pb-12 lg:pt-40 lg:pb-14"
      >
        {!isMobile && (
          <img
            src="/proyek/proyek-50.webp"
            alt={data.heroImgAlt}
            loading="eager"
            decoding="async"
            fetchPriority="high"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Overlay solid */}
        <div className="absolute inset-0 bg-slate-950/80" aria-hidden="true" />

        <div className="relative w-full max-w-3xl mx-auto px-4 sm:px-5 lg:px-8 text-center">
          <div
            className={`flex items-center justify-center gap-2 sm:gap-3 mb-2.5
              ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
            style={{
              transitionProperty: "opacity, transform",
              transitionDuration: "600ms",
              transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
              transitionDelay: "100ms",
            }}
          >
            <span className="w-6 sm:w-10 h-px bg-[#4da3ff]" aria-hidden="true" />
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#4da3ff] font-semibold">
              {data.heroKicker}
            </span>
            <span className="w-6 sm:w-10 h-px bg-[#4da3ff]" aria-hidden="true" />
          </div>

          <h1
            className={`font-light tracking-tight text-white leading-[1.1] mb-3
              ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{
              fontSize: "clamp(1.875rem, 5vw, 3rem)",
              transitionProperty: "opacity, transform",
              transitionDuration: "600ms",
              transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
              transitionDelay: "200ms",
            }}
          >
            {data.heroTitleLight}
            <span className="font-semibold text-white">
              {data.heroTitleBold}
            </span>
            <span className="text-[#4da3ff]">.</span>
          </h1>

          <div
            className={`mx-auto w-12 sm:w-16 h-px bg-white/30 mb-3
              ${heroVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"}`}
            style={{
              transitionProperty: "opacity, transform",
              transitionDuration: "600ms",
              transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
              transitionDelay: "400ms",
            }}
            aria-hidden="true"
          />

          <p
            className={`text-white/70 font-light max-w-md sm:max-w-lg mx-auto px-2 leading-relaxed
              ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
            style={{
              fontSize: "clamp(0.8125rem, 1.6vw, 1rem)",
              transitionProperty: "opacity, transform",
              transitionDuration: "600ms",
              transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
              transitionDelay: "500ms",
            }}
          >
            {data.heroSubtitle}
          </p>

          {/* TOMBOL DOWNLOAD DI SINI */}
          <div
            className={`mt-8 transition-all duration-700 ease-out
              ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
            style={{
              transitionDelay: "700ms",
            }}
          >
            <a
              href="/company-profile.pdf" // Pastikan file PDF ada di folder public
              download
              className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-3.5
                         bg-[#1e88e5] hover:bg-blue-600 text-white
                         font-medium text-sm sm:text-base rounded-full
                         transition-all duration-300 shadow-lg shadow-blue-500/30
                         hover:shadow-blue-500/50 hover:-translate-y-0.5"
            >
              <IconDownload className="w-5 h-5" />
              {data.downloadBtn}
            </a>
          </div>
        </div>
      </section>

      {/* ═══ INTRO ═══ */}
      <section
        ref={introRef}
        className="bg-white pt-8 pb-10 sm:pt-10 sm:pb-12 lg:pt-14 lg:pb-16 border-b border-slate-100"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-5 lg:px-8 text-center">
          <p
            className={`text-slate-700 leading-[1.85]
              ${introVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{
              fontSize: "clamp(0.875rem, 1.6vw, 1.125rem)",
              transitionProperty: "opacity, transform",
              transitionDuration: "700ms",
              transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            {data.intro}
          </p>
        </div>
      </section>

      {/* ═══ FOUNDATION CARDS ═══ */}
      <section
        ref={cardsRef}
        className="bg-slate-50 pt-10 pb-14 sm:pt-12 sm:pb-16 lg:pt-16 lg:pb-20"
      >
        <div className="max-w-6xl md:max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
          <div className="text-center mb-8 sm:mb-10 lg:mb-12">
            <div
              className={`inline-flex items-center gap-2 sm:gap-3 mb-3
                ${cardsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
              style={{
                transitionProperty: "opacity, transform",
                transitionDuration: "600ms",
                transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              <span className="w-6 sm:w-10 h-px bg-[#1e88e5]" aria-hidden="true" />
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#1e88e5] font-semibold">
                {data.sectionKicker}
              </span>
              <span className="w-6 sm:w-10 h-px bg-[#1e88e5]" aria-hidden="true" />
            </div>

            <h2
              className={`font-light tracking-tight text-slate-900 leading-[1.15] px-2
                ${cardsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
              style={{
                fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
                transitionProperty: "opacity, transform",
                transitionDuration: "600ms",
                transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                transitionDelay: "100ms",
              }}
            >
              {data.sectionTitleLight}
              <span className="font-semibold">{data.sectionTitleBold}</span>
              <span className="text-[#1e88e5]">.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            <FoundationCard
              number={data.card1Number}
              Icon={IconEye}
              title={data.card1Title}
              delay={0}
              visible={cardsVisible}
            >
              <p
                className="text-slate-700 leading-relaxed"
                style={{ fontSize: "clamp(0.8125rem, 1.5vw, 0.875rem)" }}
              >
                {data.card1Body}
              </p>
            </FoundationCard>

            <FoundationCard
              number={data.card2Number}
              Icon={IconTarget}
              title={data.card2Title}
              delay={100}
              visible={cardsVisible}
            >
              <ul className="space-y-2 sm:space-y-2.5">
                {data.misi.map((item, i) => (
                  <ListItem
                    key={i}
                    item={item}
                    delay={250 + i * 80}
                    visible={cardsVisible}
                  />
                ))}
              </ul>
            </FoundationCard>

            <div className="sm:col-span-2 lg:col-span-1">
              <FoundationCard
                number={data.card3Number}
                Icon={IconAward}
                title={data.card3Title}
                delay={200}
                visible={cardsVisible}
              >
                <AccordionItem title={data.accordionTitle} defaultOpen>
                  <ul className="space-y-2">
                    {data.mengapa.map((item, i) => (
                      <ListItem
                        key={i}
                        item={item}
                        delay={350 + i * 70}
                        visible={cardsVisible}
                      />
                    ))}
                  </ul>
                </AccordionItem>
              </FoundationCard>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}