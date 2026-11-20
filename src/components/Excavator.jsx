// src/components/Excavator.jsx
"use client";

import { useState, useCallback, useMemo, memo } from "react";
import Image from "next/image";
import { useLang } from "../context/LanguageContext";
import Reveal from "./Reveal";

// ─────────────────────────────────────────────
// IKON
// ─────────────────────────────────────────────
function IconWhatsApp({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}
function IconArrowRight({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}
function IconChevron({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}
function IconInfo({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </svg>
  );
}

const BODY_FONT = { fontSize: "clamp(0.875rem, 1.5vw, 0.9375rem)" };
const BODY_CLASS = "text-slate-700 leading-[1.9]";

// ─────────────────────────────────────────────
// ACCORDION — WAI-ARIA + animated grid-rows
// ─────────────────────────────────────────────
const Accordion = memo(function Accordion({
  id, index, number, title, isOpen, onToggle, children,
}) {
  const buttonId = `excavator-btn-${id}`;
  const panelId = `excavator-panel-${id}`;

  return (
    <div
      className={`group relative rounded-2xl border-2 mb-3 overflow-hidden bg-white
                  transition-all duration-300
                  ${isOpen
                    ? "border-[#1e88e5] shadow-lg shadow-[#1e88e5]/10"
                    : "border-slate-200 hover:border-slate-300 hover:shadow-md hover:shadow-slate-200/60"}`}
    >
      <h3 className="m-0 p-0 text-base font-normal leading-normal">
        <button
          id={buttonId}
          type="button"
          onClick={() => onToggle(index)}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="w-full flex items-center gap-3 sm:gap-4
                     px-4 sm:px-5 py-4 sm:py-5
                     text-left cursor-pointer
                     focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-700"
        >
          <span
            aria-hidden="true"
            className={`shrink-0 flex items-center justify-center
                        w-10 h-10 sm:w-11 sm:h-11 rounded-xl
                        text-xs sm:text-sm font-bold tracking-wider
                        transition-all duration-300
                        ${isOpen
                          ? "bg-[#1e88e5] text-white shadow-md shadow-[#1e88e5]/30 scale-105"
                          : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"}`}
          >
            {number}
          </span>

          <span
            className={`flex-1 font-semibold leading-snug
                        text-sm sm:text-base
                        transition-colors duration-200
                        ${isOpen ? "text-[#1e88e5]" : "text-slate-800"}`}
          >
            {title}
          </span>

          <span
            aria-hidden="true"
            className={`shrink-0 flex items-center justify-center w-8 h-8 rounded-full
                        transition-all duration-300
                        ${isOpen
                          ? "bg-[#1e88e5]/10 text-[#1e88e5] rotate-180"
                          : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"}`}
          >
            <IconChevron className="w-4 h-4" />
          </span>
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        aria-hidden={!isOpen}
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div
            className="px-4 sm:px-6 pb-5 sm:pb-6 pt-3
                       text-slate-700 leading-[1.85]
                       border-t border-slate-100
                       ml-4 sm:ml-6 mr-4 sm:mr-6 mb-4"
            style={BODY_FONT}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
});

// ─────────────────────────────────────────────
// RENDER CONTENT — parser numbered list + warning box
// ─────────────────────────────────────────────
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
      <p className="text-slate-700 leading-[1.85] whitespace-pre-line" style={BODY_FONT}>
        {text}
      </p>
    );
  }

  return (
    <div className="text-slate-700 leading-[1.85]" style={BODY_FONT}>
      {beforeItems.length > 0 && <p className="mb-4">{beforeItems.join(" ")}</p>}
      <div className="space-y-3 sm:space-y-4">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2">
            <span className="shrink-0 w-5 text-[#1e88e5] font-semibold">{item.number}.</span>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-slate-800">{item.title}</div>
              {item.desc.length > 0 && (
                <div className="text-slate-600 mt-0.5 space-y-1">
                  {item.desc.map((d, j) => (<p key={j}>{d}</p>))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Warning box untuk "Perhatian:" / "Caution:" */}
      {afterItems.length > 0 && (
        <div className="mt-4 space-y-2">
          {afterItems.map((item, i) => {
            const isWarning = /^(Perhatian|Caution|Warning|Penting|Important)\s*:/i.test(item);
            if (isWarning) {
              return (
                <div
                  key={i}
                  role="note"
                  className="rounded-lg bg-amber-50 border-l-4 border-amber-500
                             px-3.5 py-2.5 text-amber-900 text-[0.8125rem] leading-[1.7] font-medium"
                >
                  {item}
                </div>
              );
            }
            return <p key={i}>{item}</p>;
          })}
        </div>
      )}
    </div>
  );
});

// ─────────────────────────────────────────────
// DATA BILINGUAL — intro dirapikan dari 5 → 3 paragraf
// ─────────────────────────────────────────────
const data = {
  id: {
    title: "Excavator / Backhoe",
    subtitle: "Menyewakan Alat Berat Backhoe atau Excavator Murah di Jabodetabek",
    thumbImage: "/proyek/proyek-47.webp",
    sectionWhat: "Mengenal Excavator & Backhoe",

    // ✅ TRIMMED: 5 → 3 paragraf (~210 → ~130 kata)
    intro: [
      "Excavator (ekskavator) dan backhoe adalah dua jenis alat berat — beroda rantai (crawler) dan beroda karet (wheel) — yang berperan vital dalam proyek konstruksi, pertambangan, perkebunan, hingga pekerjaan utilitas seperti penggalian pipa dan kabel bawah tanah di wilayah Jabodetabek.",
      "Excavator mengandalkan sistem hidrolik bertekanan tinggi untuk menggerakkan boom, arm, dan bucket, dengan kemampuan gali hingga kedalaman 6–8 meter. Backhoe memiliki konfigurasi unik dengan bucket di belakang dan loader bucket di depan, membuatnya lebih serbaguna untuk pekerjaan campuran skala kecil hingga menengah.",
      "Meski berukuran masif, kedua alat berat ini hanya dikendalikan satu operator terlatih. Kesalahan kecil berisiko merusak unit dan membahayakan pekerja di sekitar galian — inilah alasan layanan sewa kami selalu disertai operator bersertifikat SIO (Surat Izin Operator) dan armada terawat.",
    ],

    afterIntro: [
      "Sebelum memutuskan menyewa, penting bagi Anda untuk memahami perbedaan mendasar antara excavator dan backhoe — mulai dari spesifikasi teknis, kegunaan utama, hingga cara pengoperasian yang benar.",
      "Pemahaman ini akan membantu Anda memilih unit yang paling sesuai dengan jenis pekerjaan, kondisi medan, dan anggaran proyek — sehingga tidak terjadi over-spec (biaya membengkak) atau under-spec (hasil tidak maksimal).",
      "Berikut panduan lengkap spesifikasi, kegunaan, dan tips penggalian kedua alat berat ini yang kami rangkum dari praktik operator profesional di lapangan:",
    ],

    sectionSpec: "Spesifikasi & Kegunaan",
    sectionSpecTitle1: "Spesifikasi & ",
    sectionSpecTitle2: "Kegunaan",
    sectionSpecTitle3: " Excavator dan Backhoe",

    specItems: [
      {
        title: "Spesifikasi Ekskavator",
        paragraphs: [
          "Ekskavator memiliki karakteristik teknis yang membedakannya dari alat berat lain. Berikut spesifikasi utamanya:\n1. Berat unit antara 3.500 hingga 200.000 pound (1,5–90 ton), tergantung kelas mini, standar, atau heavy-duty.\nUnit kelas mini (1,5–5 ton) cocok untuk proyek perumahan dengan akses sempit, sedangkan kelas heavy-duty (30–90 ton) digunakan untuk tambang dan proyek infrastruktur skala besar.\n2. House (rumah operator) dapat berputar 360 derajat penuh.\nKemampuan swing 360° memungkinkan operator menggali, mengangkat, dan menumpahkan material ke segala arah tanpa harus memindahkan posisi unit — sangat efisien untuk pekerjaan dalam ruang terbatas.\n3. Dilengkapi boom, arm, dan bucket hidrolik berkapasitas 0,3–5 m³.\nKombinasi tiga komponen ini menghasilkan jangkauan gali (digging reach) hingga 10 meter dan kedalaman gali maksimal 6–8 meter, tergantung panjang arm yang dipasang.\n4. Sistem track crawler (roda rantai) dengan ground pressure rendah.\nTrack shoe yang lebar membuat excavator tetap stabil di medan berlumpur, berpasir, atau lereng tanpa mudah amblas — tidak seperti alat berat beroda karet.\n5. Kabin ber-AC dengan sistem monitoring digital.\nOperator dapat memantau kondisi mesin, suhu hidrolik, dan konsumsi bahan bakar secara real-time, sehingga mencegah overheating saat bekerja di cuaca ekstrem.",
        ],
      },
      {
        title: "Kegunaan Ekskavator",
        paragraphs: [
          "Ekskavator adalah alat berat serbaguna dengan aplikasi sangat luas. Berikut kegunaan utamanya:\n1. Penggalian Tanah Skala Besar\nDigunakan untuk cut and fill, pembuatan basement gedung, kolam retensi, hingga penggalian kanal — termasuk pada medan berbatu yang membutuhkan bucket dengan teeth (gigi) khusus.\n2. Pengolahan Lanskap & Pembersihan Lahan\nCocok untuk land clearing, pemindahan bongkahan batu besar, perataan kontur tanah, dan pembongkaran struktur bangunan lama.\n3. Penggalian Parit & Saluran Drainase\nDengan attachment khusus (ditching bucket), excavator dapat membuat parit pipa, saluran irigasi, atau drainase jalan dengan dinding yang rapi dan kedalaman seragam.\n4. Pekerjaan Tambang & Quarry\nExcavator kelas heavy-duty digunakan untuk memuat overburden, mengeruk material tambang, dan memuat hasil tambang ke dump truck — menjadi tulang punggung operasional tambang modern.\n5. Pekerjaan Utilitas Bawah Tanah\nUntuk penggalian pipa gas, kabel listrik, dan fiber optik, excavator mini dengan bucket sempit sangat ideal karena presisi dan tidak merusak jaringan sekitar.",
        ],
      },
      {
        title: "Spesifikasi Backhoe",
        paragraphs: [
          "Backhoe (backhoe loader) memiliki konfigurasi unik dengan dua fungsi dalam satu unit — loader di depan dan backhoe di belakang. Berikut spesifikasinya:\n1. House (rumah operator) hanya berputar 200 derajat.\nBerbeda dari excavator, backhoe hanya bisa swing 200° — cukup untuk menggali dan menumpahkan material ke samping, namun tidak sefleksibel excavator dalam ruang sempit.\n2. Dilengkapi dua bucket: loader bucket (depan) dan backhoe bucket (belakang).\nLoader bucket berkapasitas 0,8–1,2 m³ untuk memuat material, sedangkan backhoe bucket berkapasitas 0,2–0,4 m³ untuk menggali parit dan pondasi — kombinasi ini membuat backhoe sangat serbaguna.\n3. Berat unit rata-rata 17.000 pound (sekitar 7,7 ton).\nBobot yang relatif ringan membuat backhoe mudah dimobilisasi dengan trailer biasa — tidak memerlukan lowbed trailer seperti excavator kelas besar.\n4. Jangkauan gali (digging depth) hingga 14 kaki (4,3 meter).\nKedalaman ini cukup untuk sebagian besar pekerjaan utilitas, pondasi rumah tinggal, dan saluran drainase jalan lingkungan.\n5. Berjalan dengan roda karet (wheel) berkecepatan hingga 40 km/jam.\nKeunggulan utama backhoe dibanding excavator adalah kemampuannya berpindah lokasi sendiri di jalan raya tanpa perlu diangkut — sangat efisien untuk proyek dengan banyak titik pekerjaan.",
        ],
      },
      {
        title: "Kegunaan Backhoe",
        paragraphs: [
          "Backhoe adalah pilihan favorit untuk pekerjaan campuran skala kecil hingga menengah. Berikut kegunaan utamanya:\n1. Pekerjaan Pertanian & Perkebunan\nDigunakan untuk menggali saluran irigasi, membuat lubang tanam, memindahkan hasil panen, hingga membersihkan lahan dari semak dan akar pohon.\n2. Proyek Konstruksi Skala Kecil–Menengah\nBackhoe sangat efisien untuk pembuatan pondasi rumah tinggal, galian septictank, perataan lahan perumahan, dan pekerjaan cut and fill skala kecil.\n3. Penggalian Parit & Pipa Utilitas\nKombinasi backhoe bucket sempit dan kemampuan berpindah cepat membuatnya ideal untuk proyek pemasangan pipa air, gas, dan kabel bawah tanah di area perkotaan.\n4. Perawatan Jalan & Saluran Drainase\nBackhoe sering digunakan oleh dinas PU untuk membersihkan saluran drainase yang tersumbat, memperbaiki bahu jalan, dan mengeruk sedimen kolam retensi.\n5. Pekerjaan Bongkar Muat Material\nLoader bucket di bagian depan dapat digunakan untuk memuat pasir, kerikil, atau puing ke dump truck — menjadikan backhoe sebagai alat \"2-in-1\" yang menghemat biaya sewa dua unit terpisah.",
        ],
      },
    ],

    sectionTips: "Tips Penggalian",
    sectionTipsTitle1: "Tips ",
    sectionTipsTitle2: "Penggalian",
    sectionTipsTitle3: " Menggunakan Excavator & Backhoe",

    tipItems: [
      {
        title: "Cara Penggalian dengan Ekskavator",
        paragraphs: [
          "Prosedur penggalian dengan excavator membutuhkan koordinasi antara kedua tangan dan pemahaman medan. Berikut langkah-langkahnya:\n1. Lakukan Inspeksi Harian Sebelum Mulai\nPeriksa level oli hidrolik, air radiator, tekanan ban/track, dan kebocoran selang. Kenakan APD lengkap (helm, rompi reflektif, sepatu safety) dan sabuk pengaman sebelum masuk kabin.\n2. Operasikan Dozer Blade (Jika Ada)\nTurunkan gagang kontrol pada posisi kiri. Untuk mengoperasikan dozer blade, gerakkan kontrol ke ujung kanan — blade berfungsi sebagai stabilizer saat menggali di medan tidak rata.\n3. Gerakkan Blade ke Atas dan ke Bawah\nTarik gagang kontrol untuk menaikkan blade, dorong ke depan untuk menurunkannya. Tancapkan blade ke tanah untuk menstabilkan posisi excavator sebelum mulai menggali.\n4. Gunakan Gagang Kontrol (Joystick) dengan Presisi\nGagang kiri mengontrol swing (rotasi) dan arm (lengan), gagang kanan mengontrol boom dan bucket. Latih koordinasi keduanya — gerakan halus mencegah hentakan yang merusak hidrolik.\n5. Mulai Menggali dengan Pola Sistematis\nGali dari sisi terjauh menuju terdekat, angkat material, lalu swing ke dump truck atau area buang. Hindari menggali terlalu dalam dalam sekali gerakan — gunakan 2–3 pass bertahap.\n6. Ratakan Kembali Area Bekas Galian\nSetelah selesai, gunakan bucket untuk menarik material sisa dan ratakan permukaan. Padatkan dengan track excavator (track walking) untuk area urugan.\n\nPerhatian: waspadai kabel di bawah saluran listrik yang berada di atas kepala (cek jalur kabel sebelum mulai), dan pastikan untuk mematikan excavator sebelum Anda keluar dari kendaraan.",
        ],
      },
      {
        title: "Cara Penggalian dengan Backhoe",
        paragraphs: [
          "Prosedur penggalian dengan backhoe sedikit berbeda karena konfigurasi unit yang memiliki dua bucket. Berikut langkah-langkahnya:\n1. Buka Tuas Pengunci & Pasang Stabilizer\nAda banyak tuas dan fungsi yang harus dikuasai secara bersamaan — koordinasi tangan dan mata sangat penting. Pertama, turunkan stabilizer (outrigger) untuk menstabilkan backhoe, dan lepaskan kunci blade/swing lock sebelum mulai.\n2. Posisikan Backhoe di Tepi Galian\nParkir backhoe dengan posisi backhoe bucket menghadap area galian. Jarak aman dari tepi galian minimal 1 meter untuk mencegah tanah longsor akibat beban unit.\n3. Turunkan Boom dan Mulai Menggali\nDorong kontrol kiri ke depan untuk memperpanjang arm, lalu tarik kontrol kanan untuk menutup bucket. Kombinasi gerakan ini menghasilkan gaya gali maksimal.\n4. Angkat Material Hasil Galian\nTarik kembali kontrol kiri dan kanan secara bersamaan untuk mengangkat arm + bucket berisi material. Jaga posisi bucket tetap melengkung agar material tidak tumpah. Kebanyakan backhoe memiliki jangkauan gali hingga 14 kaki (4,3 meter).\n5. Swing dan Buang Material\nPutar house (swing 200°) ke arah dump truck atau area buang. Jangan swing sambil mengangkat beban terlalu tinggi — risiko unit terguling meningkat signifikan.\n6. Ratakan dan Padatkan Area Kerja\nSetelah penggalian selesai, tarik kembali stabilizer, dan gunakan loader bucket di depan untuk merapikan area kerja sebelum meninggalkan lokasi.\n\nPerhatian: jangan pernah menggali tepat di bawah pipa gas, kabel listrik tegangan tinggi, atau struktur pondasi bangunan tanpa koordinasi dengan pihak berwenang. Hubungi penyedia layanan utilitas setempat untuk mendapatkan peta jalur bawah tanah sebelum memulai.",
        ],
      },
    ],

    ctaBadge: "Konsultasi Gratis",
    ctaTitle1: "Butuh sewa excavator? ",
    ctaTitle2: "Kami siap membantu.",
    ctaButton: "Hubungi via WhatsApp",
    ctaWaText: "Halo Tri Abadi Makmur, saya ingin konsultasi sewa excavator/backhoe...",
  },

  en: {
    title: "Excavator / Backhoe",
    subtitle: "Affordable Heavy Equipment Backhoe or Excavator Rental in Jabodetabek",
    thumbImage: "/proyek/proyek-47.webp",
    sectionWhat: "About Excavator & Backhoe",

    // ✅ TRIMMED: 5 → 3 paragraf
    intro: [
      "Excavator and backhoe are two types of heavy equipment — crawler-tracked and wheeled — that play a vital role in construction, mining, agricultural, and utility projects such as underground pipe and cable excavation in the Jabodetabek area.",
      "An excavator relies on high-pressure hydraulics to drive its boom, arm, and bucket, capable of digging up to 6–8 meters deep. A backhoe has a unique configuration with a rear bucket and a front loader bucket, making it more versatile for small to medium-scale mixed jobs.",
      "Despite their massive size, both machines are controlled by just one trained operator. A small operational error risks damaging the unit and endangering workers around the excavation area — this is why our rental service always comes with a certified SIO (Operator License) operator and well-maintained fleet.",
    ],

    afterIntro: [
      "Before deciding to rent, it is important for you to understand the fundamental differences between excavators and backhoes — from technical specifications and main uses to proper operating procedures.",
      "This understanding will help you choose the unit that best fits the type of work, terrain conditions, and project budget — so there is no over-spec (inflated costs) or under-spec (suboptimal results).",
      "Here is a complete guide to specifications, uses, and excavation tips for both heavy equipment, summarized from the practices of professional field operators:",
    ],

    sectionSpec: "Specifications & Uses",
    sectionSpecTitle1: "Specifications & ",
    sectionSpecTitle2: "Uses",
    sectionSpecTitle3: " of Excavator and Backhoe",

    specItems: [
      {
        title: "Excavator Specifications",
        paragraphs: [
          "Excavators have technical characteristics that distinguish them from other heavy equipment. Here are the main specifications:\n1. Unit weight between 3,500 and 200,000 pounds (1.5–90 tons), depending on the mini, standard, or heavy-duty class.\nThe mini class (1.5–5 tons) is suitable for residential projects with narrow access, while the heavy-duty class (30–90 tons) is used for mining and large-scale infrastructure projects.\n2. House (operator cabin) can rotate a full 360 degrees.\nThe 360° swing capability allows the operator to dig, lift, and dump material in any direction without moving the unit's position — very efficient for work in confined spaces.\n3. Equipped with hydraulic boom, arm, and bucket with 0.3–5 m³ capacity.\nThe combination of these three components produces a digging reach of up to 10 meters and a maximum digging depth of 6–8 meters, depending on the arm length installed.\n4. Crawler track system (steel tracks) with low ground pressure.\nWide track shoes keep the excavator stable on muddy, sandy, or sloped terrain without easily sinking — unlike rubber-wheeled heavy equipment.\n5. Air-conditioned cabin with digital monitoring system.\nOperators can monitor engine condition, hydraulic temperature, and fuel consumption in real-time, preventing overheating when working in extreme weather.",
        ],
      },
      {
        title: "Excavator Uses",
        paragraphs: [
          "The excavator is a versatile heavy machine with very broad applications. Here are its main uses:\n1. Large-Scale Soil Excavation\nUsed for cut and fill, building basement excavation, retention ponds, and canal digging — including on rocky terrain that requires a bucket with special teeth.\n2. Landscape Management & Land Clearing\nSuitable for land clearing, moving large rock boulders, leveling soil contours, and demolishing old building structures.\n3. Trench & Drainage Channel Excavation\nWith a special attachment (ditching bucket), the excavator can create pipe trenches, irrigation channels, or road drainage with neat walls and uniform depth.\n4. Mining & Quarry Works\nHeavy-duty excavators are used to load overburden, dredge mining materials, and load mining products onto dump trucks — becoming the backbone of modern mining operations.\n5. Underground Utility Works\nFor excavating gas pipes, electrical cables, and fiber optics, mini excavators with narrow buckets are ideal because they are precise and do not damage surrounding networks.",
        ],
      },
      {
        title: "Backhoe Specifications",
        paragraphs: [
          "The backhoe (backhoe loader) has a unique configuration with two functions in one unit — loader at the front and backhoe at the rear. Here are its specifications:\n1. House (operator cabin) only rotates 200 degrees.\nUnlike the excavator, the backhoe can only swing 200° — enough to dig and dump material to the side, but not as flexible as an excavator in tight spaces.\n2. Equipped with two buckets: loader bucket (front) and backhoe bucket (rear).\nThe loader bucket has a capacity of 0.8–1.2 m³ for loading material, while the backhoe bucket has a capacity of 0.2–0.4 m³ for digging trenches and foundations — this combination makes the backhoe very versatile.\n3. Average unit weight of 17,000 pounds (about 7.7 tons).\nThe relatively light weight makes the backhoe easy to mobilize with a regular trailer — no need for a lowbed trailer like large excavators.\n4. Digging depth of up to 14 feet (4.3 meters).\nThis depth is sufficient for most utility work, residential foundations, and neighborhood road drainage channels.\n5. Runs on rubber wheels at speeds up to 40 km/h.\nThe main advantage of the backhoe over the excavator is its ability to move itself on public roads without being transported — very efficient for projects with multiple work points.",
        ],
      },
      {
        title: "Backhoe Uses",
        paragraphs: [
          "The backhoe is a favorite choice for mixed small to medium-scale work. Here are its main uses:\n1. Agricultural & Plantation Work\nUsed to dig irrigation channels, make planting holes, move harvests, and clear land of bushes and tree roots.\n2. Small–Medium Scale Construction Projects\nThe backhoe is very efficient for building residential foundations, septic tank excavation, housing land leveling, and small-scale cut and fill work.\n3. Utility Trench & Pipe Excavation\nThe combination of a narrow backhoe bucket and fast mobility makes it ideal for water, gas, and underground cable pipe installation projects in urban areas.\n4. Road & Drainage Channel Maintenance\nBackhoes are often used by public works agencies to clear clogged drainage channels, repair road shoulders, and dredge retention pond sediment.\n5. Material Loading & Unloading Work\nThe loader bucket at the front can be used to load sand, gravel, or debris into dump trucks — making the backhoe a \"2-in-1\" tool that saves on renting two separate units.",
        ],
      },
    ],

    sectionTips: "Excavation Tips",
    sectionTipsTitle1: "Excavation ",
    sectionTipsTitle2: "Tips",
    sectionTipsTitle3: " Using Excavator & Backhoe",

    tipItems: [
      {
        title: "How to Dig with an Excavator",
        paragraphs: [
          "Excavation procedures with an excavator require coordination between both hands and an understanding of the terrain. Here are the steps:\n1. Perform a Daily Inspection Before Starting\nCheck hydraulic oil level, radiator water, tire/track pressure, and hose leaks. Wear complete PPE (helmet, reflective vest, safety shoes) and seatbelt before entering the cabin.\n2. Operate the Dozer Blade (If Equipped)\nLower the control lever to the left position. To operate the dozer blade, move the control to the right end — the blade serves as a stabilizer when digging on uneven terrain.\n3. Move the Blade Up and Down\nPull the control lever to raise the blade, push forward to lower it. Insert the blade into the ground to stabilize the excavator's position before starting to dig.\n4. Use the Control Lever (Joystick) with Precision\nThe left lever controls swing (rotation) and arm, the right lever controls boom and bucket. Train coordination of both — smooth movements prevent jerks that damage hydraulics.\n5. Start Digging with a Systematic Pattern\nDig from the farthest side toward the nearest, lift the material, then swing to the dump truck or disposal area. Avoid digging too deep in one motion — use 2–3 gradual passes.\n6. Level the Excavation Area Back\nAfter finishing, use the bucket to pull remaining material and level the surface. Compact with the excavator track (track walking) for backfill areas.\n\nCaution: watch out for cables under overhead power lines (check the cable route before starting), and make sure to turn off the excavator before you exit the vehicle.",
        ],
      },
      {
        title: "How to Dig with a Backhoe",
        paragraphs: [
          "Excavation procedures with a backhoe are slightly different because of the unit's configuration with two buckets. Here are the steps:\n1. Open the Locking Lever & Set Stabilizers\nThere are many levers and functions you must master simultaneously — hand-eye coordination is crucial. First, lower the stabilizer (outrigger) to stabilize the backhoe, and release the blade/swing lock before starting.\n2. Position the Backhoe at the Edge of the Excavation\nPark the backhoe with the backhoe bucket facing the excavation area. Safe distance from the excavation edge is at least 1 meter to prevent soil collapse due to unit load.\n3. Lower the Boom and Start Digging\nPush the left control forward to extend the arm, then pull the right control to close the bucket. The combination of these movements produces maximum digging force.\n4. Lift the Excavated Material\nPull back the left and right controls simultaneously to lift the arm + bucket containing material. Keep the bucket position curved so material does not spill. Most backhoes have a digging reach of up to 14 feet (4.3 meters).\n5. Swing and Dump Material\nRotate the house (200° swing) toward the dump truck or disposal area. Do not swing while lifting loads too high — the risk of the unit tipping over increases significantly.\n6. Level and Compact the Work Area\nAfter excavation is complete, retract the stabilizer, and use the front loader bucket to tidy up the work area before leaving the site.\n\nCaution: never dig directly under gas pipes, high-voltage electrical cables, or building foundation structures without coordinating with the authorities. Contact local utility service providers to obtain an underground route map before starting.",
        ],
      },
    ],

    ctaBadge: "Free Consultation",
    ctaTitle1: "Need excavator rental? ",
    ctaTitle2: "We're ready to help.",
    ctaButton: "Contact via WhatsApp",
    ctaWaText: "Hello Tri Abadi Makmur, would like to consult about excavator / backhoe rental...",
  },
};

// ─────────────────────────────────────────────
// HALAMAN: EXCAVATOR
// ─────────────────────────────────────────────
export default function Excavator() {
  const { lang } = useLang();
  const d = data[lang] || data.id;

  const [openIndex, setOpenIndex] = useState(0);
  const [imgError, setImgError] = useState(false);

  const toggle = useCallback(
    (i) => setOpenIndex((prev) => (prev === i ? null : i)),
    []
  );

  const specOffset = 0;
  const tipOffset = d.specItems.length;

  return (
    <section
      aria-labelledby="excavator-heading"
      className="relative bg-white pt-28 lg:pt-36 pb-20 lg:pb-28 overflow-hidden"
    >
      {/* Ornamen background halus */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-40 -left-32 w-80 h-80 bg-[#1e88e5] rounded-full blur-3xl opacity-[0.04]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-40 -right-32 w-80 h-80 bg-amber-500 rounded-full blur-3xl opacity-[0.05]"
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-5 lg:px-8">

        {/* ═══ 1. HEADER ═══ */}
        <Reveal delay={100} y={24}>
          <div className="text-center mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2.5 sm:gap-3 mb-4">
              <span className="w-8 sm:w-12 h-px bg-[#1e88e5]" aria-hidden="true" />
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#1e88e5] font-bold">
                {d.title}
              </span>
              <span className="w-8 sm:w-12 h-px bg-[#1e88e5]" aria-hidden="true" />
            </div>
            <h1
              id="excavator-heading"
              className="font-light tracking-tight text-slate-900 leading-[1.15] text-balance max-w-3xl mx-auto"
              style={{ fontSize: "clamp(1.5rem, 4vw, 2.25rem)" }}
            >
              {d.subtitle}
              <span className="text-[#1e88e5]">.</span>
            </h1>
          </div>
        </Reveal>

        {/* ═══ 2. INTRO CARD ═══ */}
        <Reveal y={34} duration={800}>
          <div className="rounded-3xl bg-gradient-to-br from-slate-50 via-white to-blue-50/40 border border-slate-200 shadow-xl shadow-slate-200/40 p-6 sm:p-8 lg:p-10 mb-8 sm:mb-10">
            <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-6 md:gap-8 lg:gap-10 items-start">
              <div className="relative w-full max-w-[260px] mx-auto md:mx-0 aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 ring-1 ring-slate-200/80 shadow-lg shadow-slate-300/30">
                {imgError ? (
                  <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-xs font-semibold uppercase tracking-[0.2em] text-center px-3">
                    {d.title}
                  </div>
                ) : (
                  <Image
                    src={d.thumbImage}
                    alt={`${d.title} — ${d.subtitle}`}
                    width={520}
                    height={520}
                    priority
                    sizes="(max-width: 768px) 260px, 260px"
                    className="w-full h-full object-cover"
                    onError={() => setImgError(true)}
                  />
                )}
              </div>

              <div>
                <p className="text-[#1e88e5] uppercase tracking-[0.25em] text-[10px] sm:text-[11px] font-bold mb-3">
                  {d.sectionWhat}
                </p>
                <div className="space-y-3.5">
                  {d.intro.map((p, i) => (
                    <p key={i} className={BODY_CLASS} style={BODY_FONT}>
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ═══ 3. CALLOUT PEMBUKA ═══ */}
        <Reveal y={24}>
          <div className="relative rounded-2xl bg-slate-50 border border-slate-200 p-5 sm:p-7 mb-12 sm:mb-16 overflow-hidden">
            <span
              aria-hidden="true"
              className="absolute left-0 top-0 bottom-0 w-1 bg-[#1e88e5]"
            />
            <div className="flex items-start gap-3">
              <span className="shrink-0 w-9 h-9 rounded-lg bg-[#1e88e5]/10 text-[#1e88e5]
                              flex items-center justify-center mt-0.5">
                <IconInfo className="w-5 h-5" />
              </span>
              <div className="space-y-3 flex-1">
                {d.afterIntro.map((p, i) => (
                  <p key={i} className="text-slate-600 leading-[1.85]" style={BODY_FONT}>
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* ═══ 4. SECTION 1: SPESIFIKASI & KEGUNAAN ═══ */}
        <Reveal y={20}>
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="w-8 sm:w-12 h-px bg-[#1e88e5]" aria-hidden="true" />
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#1e88e5] font-bold">
                {d.sectionSpec}
              </span>
              <span className="w-8 sm:w-12 h-px bg-[#1e88e5]" aria-hidden="true" />
            </div>

            <h2
              className="font-light tracking-tight text-slate-900 leading-tight text-balance max-w-2xl mx-auto"
              style={{ fontSize: "clamp(1.25rem, 3vw, 1.75rem)" }}
            >
              {d.sectionSpecTitle1}
              <span className="font-semibold">{d.sectionSpecTitle2}</span>
              {d.sectionSpecTitle3}
            </h2>
          </div>
        </Reveal>

        {d.specItems.map((item, i) => {
          const idx = specOffset + i;
          const number = String(i + 1).padStart(2, "0");
          return (
            <Reveal key={`spec-${i}`} delay={80 + i * 60} y={24}>
              <Accordion
                id={`spec-${i + 1}`}
                index={idx}
                number={number}
                title={item.title}
                isOpen={openIndex === idx}
                onToggle={toggle}
              >
                <div className="space-y-4">
                  {item.paragraphs.map((p, j) => (
                    <RenderContent key={j} text={p} />
                  ))}
                </div>
              </Accordion>
            </Reveal>
          );
        })}

        {/* ═══ 5. SECTION 2: TIPS PENGGALIAN ═══ */}
        <Reveal y={20}>
          <div className="text-center mt-12 sm:mt-16 mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="w-8 sm:w-12 h-px bg-[#1e88e5]" aria-hidden="true" />
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#1e88e5] font-bold">
                {d.sectionTips}
              </span>
              <span className="w-8 sm:w-12 h-px bg-[#1e88e5]" aria-hidden="true" />
            </div>

            <h2
              className="font-light tracking-tight text-slate-900 leading-tight text-balance max-w-2xl mx-auto"
              style={{ fontSize: "clamp(1.25rem, 3vw, 1.75rem)" }}
            >
              {d.sectionTipsTitle1}
              <span className="font-semibold">{d.sectionTipsTitle2}</span>
              {d.sectionTipsTitle3}
            </h2>
          </div>
        </Reveal>

        {d.tipItems.map((item, i) => {
          const idx = tipOffset + i;
          const number = String(i + 1).padStart(2, "0");
          return (
            <Reveal key={`tip-${i}`} delay={80 + i * 60} y={24}>
              <Accordion
                id={`tip-${i + 1}`}
                index={idx}
                number={number}
                title={item.title}
                isOpen={openIndex === idx}
                onToggle={toggle}
              >
                <div className="space-y-4">
                  {item.paragraphs.map((p, j) => (
                    <RenderContent key={j} text={p} />
                  ))}
                </div>
              </Accordion>
            </Reveal>
          );
        })}

        {/* ═══ 6. CTA PREMIUM ═══ */}
        <Reveal y={34}>
          <div className="relative mt-16 sm:mt-20 rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 p-8 sm:p-12 lg:p-14 text-center shadow-2xl shadow-slate-900/30">
            <div
              aria-hidden="true"
              className="absolute top-0 right-0 w-72 h-72 bg-[#1e88e5] rounded-full blur-3xl opacity-25 pointer-events-none"
            />
            <div
              aria-hidden="true"
              className="absolute bottom-0 left-0 w-72 h-72 bg-[#25D366] rounded-full blur-3xl opacity-[0.12] pointer-events-none"
            />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4da3ff]/10 border border-[#4da3ff]/25 mb-5">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"
                  aria-hidden="true"
                />
                <span className="text-[#4da3ff] text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-bold">
                  {d.ctaBadge}
                </span>
              </div>

              <h2
                className="text-white font-light tracking-tight leading-snug mb-6 sm:mb-8 text-balance"
                style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)" }}
              >
                {d.ctaTitle1}
                <span className="font-bold">{d.ctaTitle2}</span>
              </h2>

              <a
                href={`https://wa.me/6282258089367?text=${encodeURIComponent(d.ctaWaText)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2.5
                           px-7 sm:px-9 py-4 rounded-xl
                           bg-emerald-700 hover:bg-emerald-600
                           text-white font-bold
                           uppercase tracking-[0.12em] sm:tracking-[0.15em]
                           shadow-xl shadow-emerald-900/30
                           transition-all duration-300
                           hover:scale-[1.02]
                           focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                style={{ fontSize: "clamp(0.75rem, 1.2vw, 0.875rem)" }}
              >
                <IconWhatsApp className="w-5 h-5 shrink-0" />
                {d.ctaButton}
                <IconArrowRight className="w-4 h-4 shrink-0" />
              </a>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}