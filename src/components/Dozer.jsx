// src/components/Dozer.jsx
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
                        border-t border-slate-100 space-y-3.5"
             style={{ fontSize: "clamp(0.8125rem, 1.5vw, 0.875rem)" }}>
          {children}
        </div>
      )}
    </div>
  );
});

// ─── DATA BILINGUAL ──────────────────────────
const data = {
  id: {
    title: "Dozer",
    subtitle: "Menyewakan Dozer Jabodetabek",
    thumbImage: "/proyek/proyek-46.webp",
    fallbackImage: "/proyek/proyek-46.webp",
    intro: [
      "Dozer – Dalam suatu proses konstruksi, pasti kita membutuhkan adanya alat berat.",
      "Fungsinya sendiri adalah mempermudah pekerjaan kita.",
      "Dozer atau buldozer merupakan alat berat yang di gunakan untuk menggusur di daerah lereng ataupun membersihkan tanah.",
      "Alat ini sangat besar dan dikendalikan hanya satu orang saja.",
    ],
    tipsIntro: [
      "Dalam menggunakan alat berat ini tidak sembarangan dalam pengoprasiannya.",
      "Ada beberapa hal yang harus di perhatikan.",
      "Jika seluruh hal itu sudah kita pahami, maka akan tercipta keselamatan dalam bekerja.",
      "Jika kita mengoprasikannya dengan sembarangan kemungkinan alat ini akan cepat rusak.",
      "Berikut ini cara mengoprasikan alat berat ini sesuai prosedur:",
    ],
    tipsSectionTitle1: "Tips Pengoprasian ",
    tipsSectionTitle2: "Dozer",
    tipsSectionTitle3: " Untuk Konstruksi",
    accordionItems: [
      {
        title: "Slot Dizing",
        paragraphs: [
          "Cara ini memungkinkan dozer mendorong miatan dalam jumlah besar.",
          "Teknik ini dilakukan ketika ada kegiatan penggusuran besar.",
          "Jika menggunakan alat ini sebaiknya selalu menggunakan gigi satu jaga agar mesin tetap stabil ketika membawa beban yang berat.",
          "Jika anda ingin menggerakan buldozer untuk mundur, pastikan benar-benar berhenti dan oper gigi untuk menggerakannya mundur.",
          "Ketika akan berbelok ke kanan ataupun ke kiri, seimbangkan dahulu dengan alat pengendalinya.",
        ],
      },
      {
        title: "Straight Dozing",
        paragraphs: [
          "Isilah buldozer dengan muatan yang maksimal.",
          "Jika sudah terisi, selalu berjalan dengan gigi satu dan jangan memaksakan mesin.",
          "Agar dorongannya tetap maksimal, jaga ketinggian blade agar selalu rata.",
          "Pastikan tempat bekerja tetap bersih, jangan sampai kotor dan menyebabkan track shoe slip.",
          "Jika ingin melakukan perataan isi blade dengan muatan penuh agar lebih efektif pengerjaannya.",
        ],
      },
      {
        title: "Dozing Up And Down",
        paragraphs: [
          "Pengerjaan ini berfungsi ketika berada di daerah tebing.",
          "Ketika area yang sedang dikerjakan memiliki kemiringan, dorongla material ke posisi yang lebih rendah.",
          "Gerakan traktor dengan hati-hati, jangan sampai tergelincir dan mengarah ke jurang.",
          "Potonglah bagian bawah tebing secukupnya, jika anda memotong berlebihan maka akan membuat tebing bertambah curam.",
          "Perhatikan indikator oli, jaga agar mesin tidak overheating.",
        ],
      },
      {
        title: "Dozing Di Disposal",
        paragraphs: [
          "Buatlah lantai disposal selalu bersih dan rapi.",
          "Kemudian anda harus membuat tanggul pengaman untuk ban truck dan samakan tingginya dengan ban tersebut.",
          "Selalu jaga kestabilan agar disposal tidak amblas.",
          "Pastikan juga bahwa disposal telah aman dan bersih dari lumpur dan semak-semak.",
        ],
      },
      {
        title: "Membuat Parit",
        paragraphs: [
          "Pembuatan parit dengan buldozer sangatlah mudah.",
          "Anda bisa memiringkan blade dan meletakannya di tengah-tengah untuk membentuk parit.",
          "Gali tanah dengan blade hingga mencapai ukuran 90 derajat.",
          "Setelah bagian pinggir parit sedikit terbentuk, lakukanlah perataan parit.",
        ],
      },
      {
        title: "Menggusur Dengan Dua Blade",
        paragraphs: [
          "Kegiatan yang dilakukan dengan dua traktor sekaligus.",
          "Gunanya untuk membersihkan material yang menghalangi pekerjaan.",
          "Kedua traktor di posisikan secara berdampingan dan selalu gunakan gigi satu agar tetap stabil.",
        ],
      },
      {
        title: "Blade Angle",
        paragraphs: [
          "Pengoprasian untuk mengatur sudut blade pada dozer.",
          "Bukalah pin yang di gunakan untuk menahan blade kemudian cabut penahan yang ada.",
          "Aturlah kemiringan blade sesuai dengan pemakaian kemudian kencangkan kembali pin bladenya.",
          "Tahapan dalam pengoprasian alat besar ini memang harus di perhatikan dengan baik.",
          "Selain terhindar dari kecelakaan kerja, juga dapat menjaga alat besar ini tetap bisa di gunakan dalam jangka panjang.",
          "Traktor ini juga bisa di gunakan untuk membersihkan belukar yang tinggi dari lahan yang akan digunakan.",
          "Kami melayani penggarapan lapangan dengan alat bulldozer ini, silakan buka website kami di www.konstruksi-jasa.com.",
          "Solusi yang tepat bagi anda yang ingin mengelola suatu lahan.",
          "Selain itu anda juga dapat memesan layanan pengaspalan jalan sempit seperti di daerah perkampungan.",
          "Tidak diragukan lagi harga di sini juga sangat bersaing dan kualitas pengerjaan yang bertaraf nasional.",
        ],
      },
    ],
    ctaBadge: "Konsultasi Gratis",
    ctaTitle1: "Butuh sewa Dozer? ",
    ctaTitle2: "Kami siap membantu.",
    ctaButton: "Hubungi via WhatsApp",
    ctaWaText: "Halo%20Tri%20Abadi%20Makmur%2c%20saya%20ingin%20konsultasi%20mengenai%20project...",
  },
  en: {
    title: "Dozer",
    subtitle: "Dozer Rental in Jabodetabek",
    thumbImage: "/proyek/proyek-46.webp",
    fallbackImage: "/proyek/proyek-46.webp",
    intro: [
      "Dozer – In a construction process, we definitely need heavy equipment.",
      "Its function is to make our work easier.",
      "Dozer or bulldozer is heavy equipment used to bulldoze on slopes or clear land.",
      "This machine is very large and is controlled by just one person.",
    ],
    tipsIntro: [
      "Using this heavy equipment is not arbitrary in its operation.",
      "There are several things that must be considered.",
      "If we understand all of these things, then safety at work will be created.",
      "If we operate it carelessly, this machine will likely break down quickly.",
      "Here is how to operate this heavy equipment according to procedure:",
    ],
    tipsSectionTitle1: "Tips for Operating ",
    tipsSectionTitle2: "Dozer",
    tipsSectionTitle3: " for Construction",
    accordionItems: [
      {
        title: "Slot Dozing",
        paragraphs: [
          "This method allows the dozer to push a large amount of load.",
          "This technique is done when there is a large bulldozing activity.",
          "When using this machine, it is best to always use first gear to keep the engine stable when carrying heavy loads.",
          "If you want to move the bulldozer backward, make sure it has completely stopped and shift gears to move it backward.",
          "When turning right or left, first balance with the control lever.",
        ],
      },
      {
        title: "Straight Dozing",
        paragraphs: [
          "Fill the bulldozer with maximum load.",
          "Once filled, always drive in first gear and do not force the engine.",
          "To keep the push at maximum, keep the blade height always even.",
          "Make sure the work area stays clean, don't let it get dirty and cause track shoe slip.",
          "For leveling, fill the blade with a full load for more effective work.",
        ],
      },
      {
        title: "Dozing Up and Down",
        paragraphs: [
          "This work functions when on cliff areas.",
          "When the area being worked on has a slope, push the material to a lower position.",
          "Move the tractor carefully, do not let it slip and head into the ravine.",
          "Cut the bottom of the cliff as needed; if you cut excessively, it will make the cliff steeper.",
          "Pay attention to the oil indicator, keep the engine from overheating.",
        ],
      },
      {
        title: "Dozing at Disposal",
        paragraphs: [
          "Make the disposal floor always clean and tidy.",
          "Then you must create a safety embankment for truck tires and match its height with the tires.",
          "Always maintain stability so the disposal does not sink.",
          "Also make sure the disposal is safe and clean of mud and bushes.",
        ],
      },
      {
        title: "Making Trenches",
        paragraphs: [
          "Making trenches with a bulldozer is very easy.",
          "You can tilt the blade and place it in the middle to form a trench.",
          "Dig the ground with the blade until reaching a 90-degree angle.",
          "After the trench edges are slightly formed, level the trench.",
        ],
      },
      {
        title: "Bulldozing with Two Blades",
        paragraphs: [
          "An activity done with two tractors at once.",
          "Its purpose is to clear material blocking the work.",
          "Both tractors are positioned side by side and always use first gear to stay stable.",
        ],
      },
      {
        title: "Blade Angle",
        paragraphs: [
          "Operation to adjust the blade angle on the dozer.",
          "Open the pin used to hold the blade then remove the existing retainer.",
          "Adjust the blade tilt as needed then re-tighten the blade pin.",
          "The stages of operating this large machine must indeed be carefully observed.",
          "Besides avoiding work accidents, it can also keep this large machine usable in the long term.",
          "This tractor can also be used to clear tall bushes from land to be used.",
          "We serve field work with this bulldozer, please visit our website at www.konstruksi-jasa.com.",
          "The right solution for those who want to manage a land area.",
          "In addition, you can also order narrow road asphalt paving services such as in residential areas.",
          "Undoubtedly the price here is also very competitive and the work quality is national standard.",
        ],
      },
    ],
    ctaBadge: "Free Consultation",
    ctaTitle1: "Need to rent a Dozer? ",
    ctaTitle2: "We're ready to help.",
    ctaButton: "Contact via WhatsApp",
    ctaWaText: "Hello%20Tri%20Abadi%20Makmur%2c%20would%20like%20to%20consult%20about%20an%20project...",
  },
};

const labels = {
  id: { open: "Buka", close: "Tutup" },
  en: { open: "Open", close: "Close" },
};

// ─── HALAMAN ─────────────────────────────────
export default function Dozer() {
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

        {/* ═══ TIPS SECTION ═══ */}
        <div className="mb-8 sm:mb-10">
          <Reveal y={26}>
            <div className="text-center mb-5 sm:mb-6">
              <h2
                className="font-light tracking-tight text-slate-900 leading-tight"
                style={{ fontSize: "clamp(1.25rem, 3.5vw, 1.875rem)" }}
              >
                {d.tipsSectionTitle1}
                <span className="font-semibold">{d.tipsSectionTitle2}</span>
                {d.tipsSectionTitle3}
              </h2>
            </div>
          </Reveal>

          <div className="space-y-2.5 sm:space-y-3.5">
            {d.tipsIntro.map((p, i) => (
              <Reveal key={i} delay={i * 50} y={18}>
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
          <Reveal key={i} delay={i * 50} y={24}>
            <Accordion
              title={item.title}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
              labels={L}
            >
              <div className="space-y-2.5 sm:space-y-3.5">
                {item.paragraphs.map((p, j) => (
                  <p key={j}
                     className="text-slate-700 leading-[1.85]"
                     style={{ fontSize: "clamp(0.8125rem, 1.5vw, 0.875rem)" }}>
                    {p}
                  </p>
                ))}
              </div>
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