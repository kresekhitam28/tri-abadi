// src/components/AsphaltFinisher.jsx
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

// ─── KOMPONEN: ACCORDION (memoized) ──────────
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

// ─── KOMPONEN: RENDER CONTENT (memoized) ─────
const RenderContent = memo(function RenderContent({ text }) {
  // Parsing di-memoize via useMemo di dalam komponen
  const parsed = useMemo(() => {
    if (!text) return null;
    const lines = text.split("\n");
    const items = [];
    let currentItem = null;
    let beforeItems = [];
    let afterItems = [];
    let inAfter = false;

    lines.forEach((line) => {
      const match = line.match(/^(\d+)\.\s+(.+)$/);
      if (match) {
        if (currentItem) items.push(currentItem);
        currentItem = { number: match[1], title: match[2], desc: [] };
        inAfter = false;
      } else if (currentItem && !inAfter) {
        if (line.trim() === "") inAfter = true;
        else currentItem.desc.push(line);
      } else if (inAfter) {
        if (line.trim() !== "") afterItems.push(line);
      } else {
        if (line.trim() !== "") beforeItems.push(line);
      }
    });
    if (currentItem) items.push(currentItem);

    return { items, beforeItems, afterItems };
  }, [text]);

  if (!text || !parsed) return null;
  const { items, beforeItems, afterItems } = parsed;

  if (items.length === 0) {
    return (
      <p className="text-slate-700 leading-[1.85] whitespace-pre-line"
         style={{ fontSize: "clamp(0.8125rem, 1.5vw, 0.875rem)" }}>
        {text}
      </p>
    );
  }

  return (
    <div className="text-slate-700 leading-[1.85]"
         style={{ fontSize: "clamp(0.8125rem, 1.5vw, 0.875rem)" }}>
      {beforeItems.length > 0 && (<p className="mb-4">{beforeItems.join(" ")}</p>)}
      <div className="space-y-3 sm:space-y-4">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2">
            <span className="shrink-0 w-5 text-slate-700">{item.number}.</span>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-slate-800">{item.title}</div>
              {item.desc.length > 0 && (
                <div className="text-slate-600 mt-0.5">
                  {item.desc.map((d, j) => (<p key={j}>{d}</p>))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {afterItems.length > 0 && (<p className="mt-4">{afterItems.join(" ")}</p>)}
    </div>
  );
});

// ─── DATA BILINGUAL ──────────────────────────
const data = {
  id: {
    title: "Asphalt Finisher",
    subtitle: "Menyewakan Alat Berat Asphalt Finisher Jabodetabek",
    thumbImage: "/proyek/proyek-53.webp",
    fallbackImage: "/proyek/proyek-53.webp",
    intro: [
      "Asphalt Finisher – adalah alat berat yang dipakai untuk menghamparkan aspal.",
      "Hasil olahan yang berasal dari mesin pengolah dan menabalkan setiap lapisannya.",
      "Kendaraan yang rodanya berbentuk crawler track ini mempunyai keunggulan berupa hopper yang tidak mempunyai alas, di bawahnya hopper terdapat pisau penekan hopper-nya.",
      "Proses penghamparan aspal dengan menuangkan aspal ke dalam hopper, aspal kemudian bergerak turun ke permukaan sisi dan \"doser\" oleh \"screw\".",
    ],
    accordionItems: [
      {
        title: "Cara Kerja Asphalt Finisher",
        paragraphs: [
          "Untuk mendapatkan bidang yang rata yang dilakukan oleh pisau tadi maka ketinggian hamparan aspal harus dapat mencapai sampai dengan 14 cm dalam keadaan belum dipadatkan.",
          "Produksi asphalt finisher ini dapat mencapai 50 ton per jam dengan setiap lapisan setebal 5 cm dan mempunyai kecepatan 1 sampai 1,5 meter per menit.",
          "Penghamparan lapis demi lapis aspal dilaksanakan setelah pekerjaan pelapisan pondasi bagian bawah telah rampung dikerjakan.",
          "Dengan kecepatan yang ada tersebut, maka mesin cukup hanya dioperasikan dengan power 9 HP.",
          "Bentuk konstruksi kendaraan ini terbilang cukup besar, sehingga untuk mengangkutnya harus menggunakan kendaraan trailer.",
          "Pembuatan beton aspal yang dikerjakan oleh Barber Green Finisher.",
          "Anda dapat menyewa kendaraan ini di konstruksi-jasa.com.",
        ],
      },
      {
        title: "Syarat Asphalt Finisher Yang Layak Untuk Pekerjaan Pengaspalan",
        paragraphs: [
          "Yang digunakan pada proyek konstruksi besar harus memenuhi beberapa persyaratan yang relatif ketat, yaitu:",
          "1. Mempunyai tingkat stabilitas yang relatif cukup tinggi.\n2. Mempunyai kemampuan daya gilasan dan kemampuan perataan agar dapat dilalui oleh kendaraan.\n3. Mempunyai koneksi memanjang serta melintang yang baik, sehingga tidak mengganggu kenyamanan kendaraan yang melaluinya.\n4. Pada pembuatan jalan baru asphalt finisher harus bisa mencampur material bahan pada permukaan jalan yang baru dibuat. Jalan yang baru biasanya kondisinya baik, karena keadaan kerikil dan batuan yang digunakan tingkat stabilitasnya masih tinggi.\n5. Asphalt finisher harus dapat membuat sub grade dengan baik, lereng yang tidak curam, menyiapkan base dengan material yang baik. Apabila permukaan base tidak beraturan bentuknya sebagai akibat penghamparan aspal pertama maka finisher harus dapat memperbaikinya pada hamparan aspal kedua bersamaan dengan proses pemadatannya.",
        ],
      },
      {
        title: "Penggunaan Asphalt Finisher Untuk Perbaikan Jalan",
        paragraphs: [
          "Pelapisan ulang pada jalan raya itu berarti pemberian lapisan berupa bituminous.",
          "Yang sudah lama dan kondisi jalan dalam keadaan tidak memenuhi syarat suatu konstruksi jalan yang baik.",
          "Pelapisan ulang umumnya dilakukan pada jalan yang kondisinya rusak.",
          "Pelapisan juga dilakukan dengan maksud memperpanjang usia jalan tersebut dan membuat lapisan anti slip untuk keamanan kendaraan yang melintas.",
        ],
      },
      {
        title: "Asphalt Finisher Untuk Pelapisan Ulang Jalan",
        paragraphs: [
          "Asphalt finisher berjalan di atas permukaan jalan, yang mana pada pekerjaan pelapisan ulang harus diperhatikan adalah traksi crawler tersebut.",
          "Screed menyelaraskan dengan fungsi perkerasan jalan.",
          "Pada pekerjaan sambungan lapisan aspal pada lapisan yang lama, penggunaan sedikit overlap akan mencegah terjadinya pengurangan ketebalan aspal.",
          "Saat penyelarasan lapisan dilakukan, tebal overlapping harus cukup memadai sehingga pemadatan ulang dari roller akan membuat lapisan aspal yang baru hanya turun sampai level lapisan lama yang tepat dibawahnya.",
          "Asphalt finisher tersedia di website konstruksi-jasa.com, apabila anda membutuhkan kendaraan tersebut maka silahkan langsung mengunjungi website tersebut.",
          "Tersedia juga beragam jenis kendaraan berat lainnya.",
          "Anda dapat bernegosiasi mengenai harga sewa kendaraan-kendaraan tersebut, dijamin alat berat seperti asphalt finisher dan lainnya merupakan kendaraan yang handal dan berkualitas yang disediakan oleh konstruksi-jasa.com.",
        ],
      },
    ],
    ctaBadge: "Konsultasi Gratis",
    ctaTitle1: "Butuh sewa Asphalt Finisher? ",
    ctaTitle2: "Kami siap membantu.",
    ctaButton: "Hubungi via WhatsApp",
    ctaWaText: "Halo%20Tri%20Abadi%20Makmur%2c%20saya%20ingin%20konsultasi%20sewa%20asphalt%20finisher...",
  },
  en: {
    title: "Asphalt Finisher",
    subtitle: "Asphalt Finisher Heavy Equipment Rental in Jabodetabek",
    thumbImage: "/proyek/proyek-53.webp",
    fallbackImage: "/proyek/proyek-53.webp",
    intro: [
      "Asphalt Finisher – is heavy equipment used to spread asphalt.",
      "The processed result comes from a processing machine and installs each layer.",
      "This crawler-track-wheeled vehicle has the advantage of a hopper that has no base; below the hopper there is a hopper-pressing blade.",
      "The asphalt spreading process pours asphalt into the hopper, the asphalt then moves down to the side surface and is \"dosed\" by a \"screw\".",
    ],
    accordionItems: [
      {
        title: "How Asphalt Finisher Works",
        paragraphs: [
          "To obtain a flat surface done by the blade, the asphalt spread height must be able to reach up to 14 cm in an uncompacted state.",
          "The production of this asphalt finisher can reach 50 tons per hour with each layer 5 cm thick and has a speed of 1 to 1.5 meters per minute.",
          "Layer-by-layer asphalt spreading is carried out after the lower foundation coating work has been completed.",
          "With that speed, the machine only needs to be operated with 9 HP power.",
          "The construction shape of this vehicle is quite large, so to transport it a trailer vehicle must be used.",
          "Production of asphalt concrete done by Barber Green Finisher.",
          "You can rent this vehicle at konstruksi-jasa.com.",
        ],
      },
      {
        title: "Requirements for Asphalt Finisher Suitable for Paving Work",
        paragraphs: [
          "Those used in large construction projects must meet several relatively strict requirements, namely:",
          "1. Have a relatively high level of stability.\n2. Have rolling ability and leveling ability so vehicles can pass through.\n3. Have good longitudinal and transverse connections, so as not to disturb the comfort of vehicles passing through them.\n4. In making new roads, the asphalt finisher must be able to mix material on the newly made road surface. New roads usually have good conditions, because the gravel and rock used still have high stability.\n5. The asphalt finisher must be able to make a good sub grade, gentle slopes, and prepare the base with good material. If the base surface is irregular in shape as a result of the first asphalt spread, the finisher must be able to fix it on the second asphalt spread together with the compaction process.",
        ],
      },
      {
        title: "Use of Asphalt Finisher for Road Repair",
        paragraphs: [
          "Resurfacing on highways means giving a layer in the form of bituminous.",
          "That has been long and the road condition is in a state of not meeting the requirements of a good road construction.",
          "Resurfacing is generally done on roads whose condition is damaged.",
          "Coating is also done with the intention of extending the life of the road and making an anti-slip layer for the safety of vehicles passing through.",
        ],
      },
      {
        title: "Asphalt Finisher for Road Resurfacing",
        paragraphs: [
          "The asphalt finisher runs on the road surface, in which on resurfacing work, attention must be paid to the crawler traction.",
          "The screed aligns with the function of the road pavement.",
          "In the asphalt layer connection work on the old layer, using a slight overlap will prevent a reduction in asphalt thickness.",
          "When the layer alignment is done, the overlap thickness must be adequate so that re-compaction from the roller will make the new asphalt layer only drop to the level of the old layer directly below it.",
          "Asphalt finisher is available on the konstruksi-jasa.com website; if you need this vehicle, please directly visit the website.",
          "Various other types of heavy vehicles are also available.",
          "You can negotiate the rental price of these vehicles; heavy equipment such as asphalt finisher and others are guaranteed to be reliable and quality vehicles provided by konstruksi-jasa.com.",
        ],
      },
    ],
    ctaBadge: "Free Consultation",
    ctaTitle1: "Need to rent an Asphalt Finisher? ",
    ctaTitle2: "We're ready to help.",
    ctaButton: "Contact via WhatsApp",
    ctaWaText: "Hello%20Tri%20Abadi%20Makmur%2c%20would%20like%20to%20consult%20about%20asphalt%20finisher%20rental...",
  },
};

const labels = {
  id: { open: "Buka", close: "Tutup" },
  en: { open: "Open", close: "Close" },
};

// ─── HALAMAN ─────────────────────────────────
export default function AsphaltFinisher() {
  const { lang } = useLang();
  const d = data[lang] || data.id;
  const L = labels[lang] || labels.id;

  const [openIndex, setOpenIndex] = useState(0);
  const toggle = useCallback((i) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  }, []);

  return (
    <section
      className="bg-white pt-20 sm:pt-24 lg:pt-28 pb-16 sm:pb-20 lg:pb-28"
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
        <div className="grid grid-cols-1 sm:grid-cols-[240px_1fr]
                        gap-4 sm:gap-5 mt-5 sm:mt-6 mb-8 sm:mb-10">
          <Reveal y={34} duration={800}>
            <div className="w-full sm:w-[240px] aspect-[4/3] overflow-hidden rounded-lg bg-slate-100"
                 style={{ contain: "layout paint style" }}>
              <img
                src={d.thumbImage}
                alt={d.title}
                loading="eager"
                decoding="async"
                width={240}
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
              <Reveal key={i} delay={i * 60} y={20}>
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
          <Reveal key={i} delay={60 + i * 50} y={24}>
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