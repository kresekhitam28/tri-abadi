// src/components/Excavator.jsx
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
    title: "Excavator / Backhoe",
    subtitle: "Menyewakan Alat Berat Backhoe atau Excavator Murah di Jabodetabek",
    thumbImage: "/proyek/proyek-47.webp",
    fallbackImage: "/proyek/proyek-47.webp",
    intro: [
      "Backhoe – dan Excavator merupakan dua jenis kendaraan proyek.",
      "Keduanya sering dipakai untuk pekerjaan berat terutama pada bidang konstruksi, seperti jalan dan bangunan.",
      "Bagi anda yang ingin menyewa keduanya ini dapat mengunjungi konstruksi-jasa.com untuk anda yang belum pernah mengoperasikan kedua kendaraan tersebut.",
    ],
    after: [
      "Simak penjelasan dan tips pengoperasiannya dari konstruksi-jasa.com berikut ini.",
      "Selain itu batu ini dibagi menjadi beberapa jenis.",
      "Untuk lebih detailnya, berikut akan diulas lebih lanjut informasi mengenai batu tersebut.",
    ],
    accordionItems: [
      {
        title: "Spesifikasi Ekskavator",
        paragraphs: [
          "Adapun beberapa spesifikasi dari ekskavator adalah sebagai berikut:\n1. Berat kendaraan berat antara 3.500 dan 200.000 pound.\nEkskavator merupakan salah satu dari banyak jenis kendaraan proyek konstruksi yang ada dengan berat antara 3.500 dan 200.000 pound.\n2. Blade dapat diputar 360 Derajat.\nAlat ini memiliki blade/bucket yang dapat dioperasikan dengan sudut 360 derajat. \n\nSehingga anda dapat dengan mudah menggali dan memindahkan bahan dalam jangkauan yang luas dan fleksibel tanpa harus menggerakkan excavator ke lokasi yang berbeda.",
        ],
      },
      {
        title: "Kegunaan Ekskavator",
        paragraphs: [
          "Kegunaan dari ekskavator antara lain:\n1. Untuk Pengolahan Lanskap Yang Luas\nEkskavator terutama digunakan untuk lahan luas, menggali lubang dan parit, mengangkat dan menempatkan objek berukuran besar, dan menghancurkan struktur.\n2. Untuk Penggalian dan Pembongkaran Berat\nAlat lainnya juga dapat dilakukan dengan menggunakan tambahan hidraulik seperti grapple atau auger. \n\nJika anda memiliki proyek berskala besar yang membutuhkan banyak penggalian atau pembongkaran berat, ekskavator adalah alat yang ideal untuk proyek anda.",
        ],
      },
      {
        title: "Spesifikasi Backhoe",
        paragraphs: [
          "Spesifikasi dari backhoe dapat diuraikan sebagai berikut:\n1. Backhoe hanya dapat berputar 200 derajat\nSalah satu keuntungan backhoe adalah sifatnya yang serbaguna. Dilengkapi blade dan wadah untuk menampung bahan kerukan di bagian belakang alat, backhoe juga dapat menyelesaikan sebagian besar penggalian yang dapat dilakukan oleh ekskavator.\n2. Dilengkapi Dengan Wadah Untuk Menampung Dengan Kapasitas Besar\nAlat Ini adalah alat yang bagus untuk menggali lubang dan parit dalam, dan alat tambahan seperti rotator tilt atau auger dapat digunakan juga pada kendaraan ini.\n3. Dengan berat rata-rata 17.000 pound.",
        ],
      },
      {
        title: "Kegunaan Backhoe",
        paragraphs: [
          "Backhoe umumnya digunakan untuk bidang pertanian dan untuk pekerjaan ringan hingga menengah yang memerlukan penggalian dan pemindahan alat berat.",
        ],
      },
      {
        title: "Tips Penggalian Menggunakan Ekskavator dan Backhoe",
        paragraphs: [
          "Cara penggalian dengan ekskavator",
          "1. Operasikan Dozer Blade\nTurunkan gagang kontrol pada posisi kiri dan jangan lupa kenakan sabuk pengaman. Untuk mengoperasikan pisau dozer, kendalikan gagang kontrol ke ujung kanan.\n2. Gerakkan Blade ke atas dan ke bawah\nTarik gagang kontrol agar menaikkan blade, dan dorong ke depan agar blade turun. Tancapkan blade ke dalam tanah agar posisinya stabil sebelum memulai penggalian.\n3. Gunakan Gagang Kontrol\nGagang kontrol berfungsi untuk gerakan ke kanan dan ke kiri. Apabila anda ingin menggerakkan blade ke kiri maka arahkan gagang kontrol ke sebelah kiri, sebaliknya apabila ingin memutar blade ke kanan, maka gerakkan gagang kontrol ke sebelah kanan. Itu juga akan menaikkan dan menurunkan ledakan.\n4. Mulai Menggali\nGunakan gagang kontrol untuk untuk menggali lubang dan mengeruk bahan yang ada di area galian dan pindahkan sesuai tempat yang dituju.\n5. Ratakan Kembali Bidang Untuk Dikeruk\nUntuk meratakan bekas kerukan, gunakan wadah blade untuk menarik bahan-bahan dan ulangi pengerukan.\n\nPerhatian: waspadai kabel dibawah saluran listrik yang berada di atas kepala, dan pastikan untuk mematikan excavator sebelum anda keluar dari kendaraan.",
        ],
      },
      {
        title: "Cara Penggalian Dengan Backhoe",
        paragraphs: [
          "1. Buka Tuas Pengunci\nAda banyak tuas dan fungsi yang harus anda ketahui dan anda harus membuat semuanya bekerja pada saat yang sama. Mengoperasikan kendaraan ini membutuhkan banyak koordinasi antara tangan dan mata. Pertama, letakkan stabilisator untuk menstabilkan backhoe, dan lepaskan kunci blade. Dorong kontrol kiri ke depan untuk memperpanjang tongkat backhoe. Dorong kontrol kanan ke kanan untuk membuka wadah.\n2. Turunkan Blade/Pisau Dozer\nTetapkan area penggalian, dorong kontrol ke depan untuk menurunkan blade.\n3. Mulai menggali\nDorong kontrol kanan ke kiri untuk menggulung wadah ke dalam, menurunkannya ke tanah untuk mengeruk tanah.\n4. Angkat bahan yang dikeruk\nTarik kembali kontrol kiri dan kanan secara bersamaan untuk menarik dan mengangkat blade sambil menjaga posisi wadah tetap melengkung. Kebanyakan backhoe memiliki jangkauan 14 kaki. \n\nSelanjutnya dorong kontrol kiri dan kanan ke kanan untuk membuka wadah, tarik tongkat ke arah kabin dan buang beban (jangan menaikkan beban terlalu tinggi karena akan berbahaya).",
        ],
      },
    ],
    ctaBadge: "Konsultasi Gratis",
    ctaTitle1: "Butuh sewa excavator? ",
    ctaTitle2: "Kami siap membantu.",
    ctaButton: "Hubungi via WhatsApp",
    ctaWaText: "Halo%20Tri%20Abadi%20Makmur%2c%20saya%20ingin%20konsultasi%20sewa%20excavator%2f%20backhoe...",
  },
  en: {
    title: "Excavator / Backhoe",
    subtitle: "Affordable Heavy Equipment Backhoe or Excavator Rental in Jabodetabek",
    thumbImage: "/proyek/proyek-47.webp",
    fallbackImage: "/proyek/proyek-47.webp",
    intro: [
      "Backhoe – and Excavator are two types of project vehicles.",
      "Both are often used for heavy work especially in the construction sector, such as roads and buildings.",
      "For those who want to rent both, you can visit konstruksi-jasa.com for those who have never operated these two vehicles.",
    ],
    after: [
      "See the explanation and operating tips from konstruksi-jasa.com below.",
      "In addition, this stone is divided into several types.",
      "For more details, the following will further review information about this stone.",
    ],
    accordionItems: [
      {
        title: "Excavator Specifications",
        paragraphs: [
          "The specifications of the excavator are as follows:\n1. Heavy vehicle weight between 3,500 and 200,000 pounds.\nThe excavator is one of the many types of construction project vehicles available with a weight between 3,500 and 200,000 pounds.\n2. Blade can be rotated 360 Degrees.\nThis machine has a blade/bucket that can be operated at a 360-degree angle.\n\nSo you can easily dig and move materials within a wide and flexible range without having to move the excavator to a different location.",
        ],
      },
      {
        title: "Excavator Uses",
        paragraphs: [
          "The uses of the excavator include:\n1. For Large Landscape Management\nExcavators are mainly used for large areas, digging holes and trenches, lifting and placing large objects, and demolishing structures.\n2. For Heavy Excavation and Demolition\nOther work can also be done using hydraulic attachments such as grapple or auger.\n\nIf you have a large-scale project that requires a lot of excavation or heavy demolition, the excavator is the ideal tool for your project.",
        ],
      },
      {
        title: "Backhoe Specifications",
        paragraphs: [
          "Backhoe specifications can be described as follows:\n1. Backhoe can only rotate 200 degrees\nOne of the advantages of the backhoe is its versatility. Equipped with a blade and a container to hold dredged material at the back of the machine, the backhoe can also complete most of the excavation that the excavator can do.\n2. Equipped with a Large Capacity Container\nThis machine is a great tool for digging deep holes and trenches, and additional tools such as rotator tilt or auger can also be used on this vehicle.\n3. With an average weight of 17,000 pounds.",
        ],
      },
      {
        title: "Backhoe Uses",
        paragraphs: [
          "Backhoes are generally used for agriculture and for light to medium work that requires excavation and moving heavy equipment.",
        ],
      },
      {
        title: "Excavation Tips Using Excavator and Backhoe",
        paragraphs: [
          "How to dig with an excavator",
          "1. Operate the Dozer Blade\nLower the control lever to the left position and don't forget to wear a seatbelt. To operate the dozer blade, control the lever to the right end.\n2. Move the Blade Up and Down\nPull the control lever to raise the blade, and push forward to lower the blade. Insert the blade into the ground to stabilize its position before starting excavation.\n3. Use the Control Lever\nThe control lever is used for right and left movement. If you want to move the blade to the left, direct the control lever to the left; conversely, if you want to rotate the blade to the right, move the control lever to the right. It will also raise and lower the boom.\n4. Start Digging\nUse the control lever to dig holes and dredge materials in the excavation area and move them to the intended location.\n5. Level the Area Back for Dredging\nTo level the dredged area, use the blade container to pull the materials and repeat the dredging.\n\nCaution: watch out for cables under overhead power lines, and make sure to turn off the excavator before exiting the vehicle.",
        ],
      },
      {
        title: "How to Dig with a Backhoe",
        paragraphs: [
          "1. Open the Locking Lever\nThere are many levers and functions you must know and you must make them all work at the same time. Operating this vehicle requires a lot of hand-eye coordination. First, place the stabilizers to stabilize the backhoe, and release the blade lock. Push the left control forward to extend the backhoe stick. Push the right control to the right to open the container.\n2. Lower the Blade/Dozer Blade\nSet the excavation area, push the control forward to lower the blade.\n3. Start digging\nPush the right control to the left to curl the container inward, lowering it to the ground to dredge the soil.\n4. Lift the dredged material\nPull back the left and right controls simultaneously to pull and lift the blade while keeping the container position curved. Most backhoes have a 14-foot reach.\n\nNext, push the left and right controls to the right to open the container, pull the stick toward the cabin and dump the load (do not raise the load too high as it will be dangerous).",
        ],
      },
    ],
    ctaBadge: "Free Consultation",
    ctaTitle1: "Need excavator rental? ",
    ctaTitle2: "We're ready to help.",
    ctaButton: "Contact via WhatsApp",
    ctaWaText: "Hello%20Tri%20Abadi%20Makmur%2c%20would%20like%20to%20consult%20about%20excavator%20%2f%20backhoe%20rental...",
  },
};

const labels = {
  id: { open: "Buka", close: "Tutup" },
  en: { open: "Open", close: "Close" },
};

// ─── HALAMAN ─────────────────────────────────
export default function Excavator() {
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

        {/* ═══ AFTER INTRO ═══ */}
        <div className="space-y-2.5 sm:space-y-3 mb-8 sm:mb-10">
          {d.after.map((p, i) => (
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