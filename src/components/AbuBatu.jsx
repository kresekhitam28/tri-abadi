// src/components/AbuBatu.jsx
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
// KOMPONEN: REVEAL WRAPPER (memoized, no blur)
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
// IKON
// ─────────────────────────────────────────────
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
// DATA BILINGUAL
// ─────────────────────────────────────────────
const data = {
  id: {
    title: "Abu Batu",
    subtitle: "Menjual Abu Batu Siap Antar",
    thumbImage: "/produk/abu-batu.png",
    fallbackImage: "/produk/abu-batu.png",
    intro: [
      "abu batu – merupakan salah satu dari material konstruksi yang berasal dari hasil sampingan proses pemecahan batu dan industri semen.",
      "Nah, biasanya material ini digunakan sebagai bahan pendukung atau campuran dalam proses pengaspalan sebagai material pengganti dari pasir.",
      "Wujud dari material ini menyerupai abu yang teksturnya berbentuk seperti butiran dengan ukuran sekitar <0.075 mm.",
    ],
    after: [
      "Pada umumnya, material abu dari batu ini digunakan sebagai campuran beton.",
      "Bahkan, hampir 80% pembuatan grass block, batako, paving block, dan konstruksi semacamnya menggunakan abu ini sebagai material pengganti pasir.",
      "Mengapa menggunakan material ini sebagai pengganti pasir? Hal ini tak terlepas dari berbagai kelebihan yang ditawarkan jika dibandingkan dengan pasir.",
      "Kira-kira apa saja kelebihannya tersebut? Berikut ulasan selengkapnya.",
    ],
    accordion0Title: "Ukuran Partikel Lebih Kecil",
    ukuranPartikel: [
      "Kelebihan abu batu daripada pasir yang pertama adalah dalam hal ukuran.",
      "Ya, memiliki ukuran yang lebih kecil jika dibandingkan dengan pasir.",
      "Bisa dikatakan ukurannya seperti abu atau pun debu.",
      "Dengan demikian, abu batu tidak membutuhkan pengayakan seperti halnya pasir dalam penggunaannya.",
      "Mengapa abu batu memiliki ukuran yang sangat kecil? Pasalnya, melalui proses pengayakan di tempat pemecahan batu lebih dahulu.",
    ],
    accordionItems: [
      {
        title: "Memiliki Daya Ikat Yang Lebih Baik",
        paragraphs: [
          "Abu batu memang memiliki daya ikat yang lebih baik jika dibandingkan dengan pasir.",
          "Pasalnya, pasir cenderung lebih mudah terurai jika terkena air.",
          "Sedangkan, abu batu jika terkena air akan lebih mengikat dan juga lebih keras.",
          "Kemampuan ini tak terlepas dari teksturnya yang masih sangat tajam.",
          "Faktor penyebab abu batu memiliki tekstur yang tajam yaitu karena material ini merupakan hasil sampingan dari proses pemecahan batu yang juga tajam.",
          "Oleh karena itu, material ini sangat tepat Anda gunakan sebagai material pendukung pemasangan paving block.",
        ],
      },
      {
        title: "Lebih Menghemat Semen",
        paragraphs: [
          "Jika Anda menggunakan abu batu, penggunaan semen dapat lebih hemat jika dibandingkan dengan penggunaan pasir biasa.",
          "Mengapa demikian? Seperti yang telah dijelaskan sebelumnya, abu batu memiliki tekstur yang tajam.",
          "Hal ini dapat membuat ikatan yang sangat kuat sehingga hanya dibutuhkan penambahan semen sedikit saja.",
          "Nah, jika Anda menggunakan material pasir, Anda tentu membutuhkan banyak semen agar material tersebut memiliki daya ikat yang kuat.",
        ],
      },
      {
        title: "Harga Lebih Ekonomis",
        paragraphs: [
          "Kelebihan selanjutnya bisa Anda dapatkan dari sisi harganya.",
          "Ya, memiliki harga yang lebih murah jika dibandingkan dengan pasir yang memiliki kualitas.",
          "Pada umumnya, harga pasir dengan kualitas yang bagus bisa mencapai Rp 350 ribu per m3.",
          "Sedangkan, jika Anda membeli abu batu, harganya cenderung lebih murah yaitu Rp 260 ribu per m3.",
          "Harga di setiap daerah memang berbeda.",
          "Namun, pada umumnya harga abu batu lebih murah.",
          "Dengan demikian, Anda dapat lebih berhemat bukan?",
        ],
      },
      {
        title: "Tidak Rentan Gulma",
        paragraphs: [
          "Abu batu cenderung tidak memberi kesempatan gulma untuk hidup di sela-sela paving yang dipasang.",
          "Nah, jika Anda memilih material dari pasir, kelebihan ini tentu tidak akan Anda dapatkan.",
          "Kelebihan ini tentu sangat menguntungkan bagi Anda.",
          "Itulah pengertian dan kelebihan dari abu batu jika dibandingkan dengan material pasir.",
          "Nah, jika Anda tertarik untuk melakukan paving block dengan material terbaik, Anda dapat mempercayakannya kepada kami, Jasa Konstruksi Tinggi Jaya Abadi.",
          "Selain pemasangan paving block, kami juga melayani pengaspalan jalan, pemasangan grass block, cor beton ready hot mix, konsteen trotoar, dan lainnya.",
          "Untuk informasi lebih lanjut, Anda dapat menghubungi kami pada kontak yang tertera pada website.",
        ],
      },
    ],
    ctaBadge: "Konsultasi Gratis",
    ctaTitle1: "Butuh Abu Batu? ",
    ctaTitle2: "Kami siap membantu.",
    ctaButton: "Hubungi via WhatsApp",
    ctaWaText: "Halo%20Tri%20Abadi%20Makmur%2c%20saya%20ingin%20pesan%20abu%20batu...",
  },
  en: {
    title: "Stone Dust",
    subtitle: "Selling Stone Dust Ready for Delivery",
    thumbImage: "/produk/abu-batu.png",
    fallbackImage: "/produk/abu-batu.png",
    intro: [
      "Stone dust — is one of the construction materials derived from the by-product of stone crushing and the cement industry.",
      "Usually, this material is used as a supporting material or mixture in the asphalt paving process as a substitute for sand.",
      "This material looks like ash with a granular texture around <0.075 mm in size.",
    ],
    after: [
      "Generally, this stone dust material is used as a concrete mixture.",
      "In fact, almost 80% of grass block, brick, paving block, and similar construction productions use this dust as a substitute for sand.",
      "Why use this material as a substitute for sand? This is due to the various advantages it offers compared to sand.",
      "What are those advantages? Here is the full review.",
    ],
    accordion0Title: "Smaller Particle Size",
    ukuranPartikel: [
      "The first advantage of stone dust over sand is its size.",
      "Yes, it has a smaller size compared to sand.",
      "You could say its size is like ash or dust.",
      "Therefore, stone dust does not require sieving like sand in its use.",
      "Why does stone dust have such a small size? Because it goes through a sieving process at the stone crushing site first.",
    ],
    accordionItems: [
      {
        title: "Better Binding Power",
        paragraphs: [
          "Stone dust indeed has better binding power compared to sand.",
          "This is because sand tends to break down more easily when exposed to water.",
          "Meanwhile, stone dust when exposed to water binds better and becomes harder.",
          "This ability is due to its still very sharp texture.",
          "The factor that causes stone dust to have a sharp texture is because this material is a by-product of the stone crushing process which is also sharp.",
          "Therefore, this material is very suitable for you to use as a supporting material for paving block installation.",
        ],
      },
      {
        title: "Saves More Cement",
        paragraphs: [
          "If you use stone dust, cement usage can be more economical compared to using regular sand.",
          "Why is that? As explained earlier, stone dust has a sharp texture.",
          "This can create a very strong bond so only a small amount of cement is needed.",
          "Now, if you use sand, you will certainly need a lot of cement for the material to have strong binding power.",
        ],
      },
      {
        title: "More Economical Price",
        paragraphs: [
          "The next advantage you can get is from its price.",
          "Yes, it has a cheaper price compared to quality sand.",
          "Generally, the price of good quality sand can reach IDR 350 thousand per m3.",
          "Meanwhile, if you buy stone dust, the price tends to be cheaper at IDR 260 thousand per m3.",
          "Prices in each region are indeed different.",
          "However, in general, stone dust is cheaper.",
          "So, you can save more, right?",
        ],
      },
      {
        title: "Not Prone to Weeds",
        paragraphs: [
          "Stone dust tends not to give weeds a chance to grow between the installed paving.",
          "Now, if you choose sand as the material, you certainly won't get this advantage.",
          "This advantage is certainly very beneficial for you.",
          "That is the definition and advantages of stone dust compared to sand material.",
          "Now, if you are interested in doing paving block with the best material, you can entrust it to us, Tinggi Jaya Abadi Construction Services.",
          "Besides paving block installation, we also serve road asphalt paving, grass block installation, ready hot mix concrete casting, sidewalk curbs, and more.",
          "For more information, you can contact us at the contact listed on the website.",
        ],
      },
    ],
    ctaBadge: "Free Consultation",
    ctaTitle1: "Need Stone Dust? ",
    ctaTitle2: "We're ready to help.",
    ctaButton: "Contact via WhatsApp",
    ctaWaText: "Hello%20Tri%20Abadi%20Makmur%2c%20I%20would%20like%20to%20order%20stone%20dust...",
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
// HALAMAN: ABU BATU
// ─────────────────────────────────────────────
export default function AbuBatu() {
  const { lang } = useLang();
  const d = data[lang] || data.id;
  const L = labels[lang] || labels.id;

  // openIndex: 0 = ukuran partikel, 1..N = accordion items, null = semua tertutup
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
              className="font-light tracking-tight text-slate-900 leading-tight"
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

          <div className="space-y-3">
            {d.intro.map((p, i) => (
              <Reveal key={i} delay={i * 80} y={20}>
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

        {/* Paragraf lanjutan */}
        <div className="space-y-3 mb-10">
          {d.after.map((p, i) => (
            <Reveal key={i} delay={i * 60} y={18}>
              <p
                className="text-slate-700 leading-[1.85]"
                style={{ fontSize: "clamp(0.8125rem, 1.5vw, 0.875rem)" }}
              >
                {p}
              </p>
            </Reveal>
          ))}
        </div>

        {/* Accordion — Ukuran Partikel (index 0) */}
        <Reveal y={24}>
          <Accordion
            title={d.accordion0Title}
            isOpen={openIndex === 0}
            onToggle={() => toggle(0)}
            labels={L}
          >
            <div className="space-y-3.5">
              {d.ukuranPartikel.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Accordion>
        </Reveal>

        {/* Accordion Items — multi-paragraf (index 1..N) */}
        {d.accordionItems.map((item, i) => {
          const index = i + 1;
          return (
            <Reveal key={i} delay={80 + i * 60} y={24}>
              <Accordion
                title={item.title}
                isOpen={openIndex === index}
                onToggle={() => toggle(index)}
                labels={L}
              >
                <div className="space-y-3.5">
                  {item.paragraphs.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
              </Accordion>
            </Reveal>
          );
        })}

        {/* ═══════ CTA ═══════ */}
        <Reveal y={34}>
          <div className="mt-16 pb-16 text-center max-w-2xl mx-auto">
            <p
              className="text-[#1e88e5] uppercase tracking-[0.3em] font-semibold mb-3"
              style={{ fontSize: "clamp(0.5625rem, 1vw, 0.625rem)" }}
            >
              {d.ctaBadge}
            </p>
            <h3
              className="text-slate-900 font-light tracking-tight mb-6"
              style={{ fontSize: "clamp(1.25rem, 3vw, 1.5rem)" }}
            >
              {d.ctaTitle1}
              <span className="font-semibold">{d.ctaTitle2}</span>
            </h3>

            <a
              href={`https://wa.me/6282258089367?text=${d.ctaWaText}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2
                         px-6 sm:px-7 py-3.5 rounded-xl
                         bg-slate-900 text-white
                         hover:bg-[#1e88e5]
                         font-semibold uppercase tracking-[0.15em]
                         transition-colors duration-300"
              style={{ fontSize: "clamp(0.6875rem, 1.2vw, 0.75rem)" }}
            >
              <IconWhatsApp className="w-4 h-4" />
              {d.ctaButton}
              <IconArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </Reveal>

      </div>
    </section>
  );
}