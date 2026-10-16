// src/components/BatuMakadam.jsx
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
    title: "Batu Makadam",
    subtitle: "Jual Batu Makadam Murah",
    thumbImage: "/produk/batu-makadam.png",
    fallbackImage: "/produk/batu-makadam.png",
    intro: [
      "Batu Makadam – Salah satu jenis material yang sering dijumpai sebagai bahan dasar dalam pembangunan jalan adalah batu makadam pada beberapa sisi atau batu makadam.",
      "Kelebihan bebatuan alam berkurasi tebal yang berwarna dipecah, batu besar.",
    ],
    after: [
      "Dinama dalam proses penghancurannya menggunakan alat khusus yang digunakan dengan Crusher.",
      "Batu ini pada dasarnya memiliki fungsi sebagai media untuk memperkeras permukaan lahan.",
      "Dalam artian bahwa untuk mengeras perbaikan dan berengnya struktur tanah yang menjadi tujuan.",
      "Biasanya, hal ini sangat diperlukan dan diperlukan dalam pembangunan jalan. Lahan industri, dan area perkantoran yang difungsikan bisa dibuka.",
      "Yang menjadi pertimbangan berikutnya, apakah setelah anda tahu bagaimana cara menggunakan harga batu jenis yang satu ini?",
      "Umumnya bagi anda yang hendak melakukan pembangunan.",
      "Nah, untuk lebih jelas, alangkah baiknya kami ulas perbedaan di bawah ini.",
    ],
    hargaIntro: [
      "Akan ada beberapa hal yang menjadi ciri khas anda hendakli dari batu makadam.",
      "Sehingga untuk mendapatkan harganya anda harus lebih berhati-hati. mengingat hal tersebut.",
      "Adapun cara untuk mengetahui bahwa batu yang akan anda beli atau beli yaitu berhubungan atau berisi dari beberapa hal sebagai berikut.",
    ],
    hargaSectionTitle1: "Cara Mendapatkan Harga ",
    hargaSectionTitle2: "Batu Makadam",
    accordion0Title: "Warna Batu",
    warnaBatu: [
      "Identitas batu jenis Makadam pertama yang harus anda ketahui adalah warnanya.",
      "Kualitas batu yang paling baik ialah berwarna hitam keabu-abuan dan kehitam-hitaman.",
      "Tentunya mempunyai jenis seperti batu kali, namun demikian, anda pabila batu makadam yang berwarna putih dan sedikit agak kecoklatan.",
      "Sehingga kualitasnya sendiri bukan hanya ditentukan oleh warna semata, melainkan bergantung juga pada karakter atas yang dimiliki oleh batu tersebut.",
    ],
    accordionItems: [
      {
        title: "Karakter Khas",
        paragraphs: [
          "Padat, keras dan tidak mudah pecah adalah karakter khas jenis Makadam yang berkualitas tinggi.",
          "Untuk membuktikan kualitasnya tersebut, anda dapat melakukan uji coba dengan cara merendam batu di dalam air kurang lebih selama 1 jam.",
          "Selanjutnya, anda harus memukul batu tersebut dengan palu berkali-kali.",
          "Apabila hanya dengan satu kali pukulan pecah berarti kualitasnya jelek.",
          "Sementara apabila berkali-kali dipukul tidak pecah, kualitas baru tersebut baik.",
          "Sudah barang tentu akan ada varinitas harga.",
          "Kualitas yang ditawarkan sudah pasti berbanding lurus dengan harga.",
        ],
      },
      {
        title: "Ukuran Batu Yang Dijual Di Pasaran",
        paragraphs: [
          "Batu Makadam yang dijual di pasaran pada umumnya selalu menyesuaikan dengan kebutuhan para pelanggan.",
          "Kemungkinan besar memiliki varinitas ukuran yang beragam.",
          "Adapun beberapa ukuran batu yang dijual di pasaran diantaranya ialah kategori jumbo (di atas 7 cm), 5-7 cm, 3-5 cm dan 2-3 cm.",
          "Selain itu, ukuran yang berlaku di pasaran tersebut menyesuaikan dengan keperluan pengerasan kontruksi jalan, bantalan rel kereta api, lahan dan lain sebagainya.",
          "Kategori ukuran batu ini juga turut mempengaruhi harga jual.",
        ],
      },
      {
        title: "Membandingkan Harga",
        paragraphs: [
          "Sebelum melakukan transaksi pembelian, anda dapat memanfaatkan kecangihan teknologi untuk mengetahui harga yang berlaku di pasaran.",
          "Ada kemungkinan besar di zaman yang serba online ini anda akan menemukan banyak toko yang menawarkan batu makadam.",
          "Untuk itu, sebagai langkah bijaknya, anda harus pandai-pandai membandingkan harga yang ditawarkan oleh masing-masing situs resmi tersebut.",
          "Sudah pasti anda akan menemukan selisih harga yang berbeda-beda.",
          "Untuk itu sesuaikanlah dengan budget yang dimiliki.",
        ],
      },
      {
        title: "Cara Transaksi Via Online",
        paragraphs: [
          "Setelah anda merasa cocok dengan salah satu lapak dengan harga yang cantik, tahapan selanjutnya ialah cara melakukan transaksi melalui online.",
          "Adapun langkah pemesannya ialah dimulai dengan mengetahui alamat perusahaan penjualan secara jelas.",
          "Pastikan tidak membayar di awal, alias tanpa DP.",
          "Tidak ada transaksi uang sebelum barang yang dipesan sampai di tempat anda.",
          "Harga yang dibandrol telah termasuk anggaran pengiriman dan penurunan.",
          "Dan yang lebih penting, anda harus mengukur kembali isi barang yang ada di dalam truk.",
          "Sebut saja perusahaan Tinggi Jaya abadi yang profesional dalam melakukan transaksi dengan bijak, termasuk masalah harga.",
          "Demikianlah beberapa cara untuk mengetahui harga batu Makadam yang berlaku di pasaran.",
          "Untuk pemesanan material anda dapat menghubungi kami di perusahaan Tinggi Jaya Abadi.",
        ],
      },
    ],
  },

  en: {
    title: "Macadam Stone",
    subtitle: "Selling Cheap Macadam Stone",
    thumbImage: "/produk/batu-makadam.png",
    fallbackImage: "/produk/batu-makadam.png",
    intro: [
      "Macadam Stone – One type of material often found as a base material in road construction is macadam stone.",
      "The advantage of natural stone with thick fractions in various colors, crushed into large pieces.",
    ],
    after: [
      "In the crushing process, it uses special equipment called a Crusher.",
      "This stone basically functions as a medium to harden the surface of the land.",
      "Meaning that it hardens and strengthens the soil structure that is the goal.",
      "Usually, this is very much needed in road construction, industrial land, and office areas that are functional and can be opened.",
      "The next consideration — do you know how to use this type of stone and its price?",
      "Generally for those of you who want to do construction.",
      "Well, for more clarity, we'd better review the differences below.",
    ],
    hargaIntro: [
      "There are several things that are the characteristics you should know about macadam stone.",
      "So to get the price, you must be more careful, considering that.",
      "As for how to know that the stone you are going to buy relates to or consists of several things as follows.",
    ],
    hargaSectionTitle1: "How to Get the Price of ",
    hargaSectionTitle2: "Macadam Stone",
    accordion0Title: "Stone Color",
    warnaBatu: [
      "The first identity of macadam stone that you must know is its color.",
      "The best quality stone is grayish-black or dark black in color.",
      "Of course it has a type like river stone, however, if the macadam stone is white and slightly brownish.",
      "So the quality itself is not only determined by color, but also depends on the character of the stone.",
    ],
    accordionItems: [
      {
        title: "Distinctive Characteristics",
        paragraphs: [
          "Dense, hard, and not easily broken are the distinctive characteristics of high-quality macadam.",
          "To prove its quality, you can test by soaking the stone in water for about 1 hour.",
          "Next, you must hit the stone with a hammer repeatedly.",
          "If it breaks with only one hit, it means the quality is poor.",
          "Meanwhile, if it does not break after many hits, the quality is good.",
          "Of course there will be price variations.",
          "The quality offered is certainly directly proportional to the price.",
        ],
      },
      {
        title: "Stone Sizes Sold in the Market",
        paragraphs: [
          "Macadam stone sold in the market generally always adjusts to customer needs.",
          "It is likely to have various size variations.",
          "Some stone sizes sold in the market include the jumbo category (above 7 cm), 5-7 cm, 3-5 cm, and 2-3 cm.",
          "In addition, the sizes available in the market adjust to the needs of road construction hardening, railway bearings, land, and so on.",
          "The size category of this stone also affects the selling price.",
        ],
      },
      {
        title: "Comparing Prices",
        paragraphs: [
          "Before making a purchase transaction, you can take advantage of technology to find out the current market price.",
          "It is very likely that in this all-online era you will find many stores offering macadam stone.",
          "Therefore, as a wise step, you must be smart in comparing the prices offered by each official site.",
          "You will certainly find different price differences.",
          "So adjust it to your budget.",
        ],
      },
      {
        title: "How to Transact Online",
        paragraphs: [
          "After you feel comfortable with one store with a good price, the next step is how to make a transaction online.",
          "The ordering step starts with knowing the address of the selling company clearly.",
          "Make sure not to pay upfront, aka without a down payment.",
          "No money transaction before the ordered goods arrive at your place.",
          "The listed price already includes shipping and unloading costs.",
          "And more importantly, you must re-measure the contents of the goods in the truck.",
          "Take for example the company Tinggi Jaya Abadi which is professional in conducting transactions wisely, including pricing.",
          "That is how to find out the current market price of Macadam stone.",
          "To order materials, you can contact us at the Tinggi Jaya Abadi company.",
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
// HALAMAN: BATU MAKADAM
// ─────────────────────────────────────────────
export default function BatuMakadam() {
  const { lang } = useLang();
  const d = data[lang] || data.id;
  const L = labels[lang] || labels.id;

  // openIndex: 0 = Warna Batu, 1..N = accordion items, null = semua tertutup
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

        {/* Garis pemisah */}
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

        {/* Section: Cara Mendapatkan Harga */}
        <div className="mb-10">
          <Reveal y={26}>
            <div className="text-center mb-6">
              <h2
                className="font-light tracking-tight text-slate-900 leading-tight"
                style={{ fontSize: "clamp(1.5rem, 3.5vw, 1.875rem)" }}
              >
                {d.hargaSectionTitle1}
                <span className="font-semibold">{d.hargaSectionTitle2}</span>
              </h2>
            </div>
          </Reveal>
          <div className="space-y-3.5">
            {d.hargaIntro.map((p, i) => (
              <Reveal key={i} delay={i * 60} y={18}>
                <Paragraph text={p} />
              </Reveal>
            ))}
          </div>
        </div>

        {/* Accordion — Warna Batu (index 0) */}
        <Reveal y={24}>
          <AccordionItem
            title={d.accordion0Title}
            paragraphs={d.warnaBatu}
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