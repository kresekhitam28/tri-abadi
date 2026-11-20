// src/components/Dozer.jsx
"use client";

import { useState, useCallback, memo } from "react";
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
function IconUserCheck({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M17 11l2 2 4-4" />
    </svg>
  );
}
function IconWrench({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
    </svg>
  );
}
function IconClock({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
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

// ─────────────────────────────────────────────
// ACCORDION
// ─────────────────────────────────────────────
const Accordion = memo(function Accordion({
  id, index, number, title, isOpen, onToggle, children,
}) {
  const buttonId = `dozer-btn-${id}`;
  const panelId = `dozer-panel-${id}`;

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
            style={{ fontSize: "clamp(0.875rem, 1.5vw, 0.9375rem)" }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
});

// ─────────────────────────────────────────────
// DATA BILINGUAL
// (subtitle H1 TIDAK diubah · typo "Pengoprasian" → "Pengoperasian" diperbaiki)
// ─────────────────────────────────────────────
const data = {
  id: {
    title: "Dozer",
    subtitle: "Menyewakan Dozer Jabodetabek",
    thumbImage: "/proyek/proyek-46.webp",
    sectionWhat: "Mengenal Dozer",

    intro: [
      "Dozer atau bulldozer adalah alat berat beroda rantai (crawler) yang dilengkapi blade di bagian depan, berfungsi utama untuk mendorong, menggusur, meratakan, dan memindahkan material tanah dalam jumlah besar.",
      "Dalam setiap proses konstruksi—mulai dari pembukaan lahan, pembangunan jalan, hingga pekerjaan tambang—keberadaan dozer sangat dibutuhkan, terutama pada medan yang tidak bisa dijangkau alat berat lain.",
      "Di wilayah Jabodetabek, dozer banyak digunakan untuk penggusuran lahan, perataan tanah proyek perumahan, pembersihan lahan (land clearing), pembuatan embung, hingga pekerjaan cut and fill.",
    ],

    highlights: [
      {
        title: "Operator Berpengalaman",
        description: "Dozer hanya dikendalikan satu operator terlatih. Setiap operator kami bersertifikat dan berpengalaman di berbagai medan proyek.",
      },
      {
        title: "Armada Terawat",
        description: "Seluruh unit melewati inspeksi rutin dan perawatan berkala. Armada dozer kami selalu siap kerja tanpa hambatan teknis.",
      },
      {
        title: "Dukungan 24 Jam",
        description: "Tim teknis kami siaga membantu proyek Anda kapan saja, dari konsultasi awal hingga purna sewa.",
      },
    ],

    sectionTips: "Tips Pengoperasian Dozer",
    // ✅ FIX: "Pengoprasian" → "Pengoperasian"
    tipsSectionTitle1: "Tips Pengoperasian ",
    tipsSectionTitle2: "Dozer",
    tipsSectionTitle3: " Untuk Konstruksi",

    tipsIntro: [
      "Mengoperasikan dozer bukan pekerjaan sembarangan. Alat berat ini memiliki bobot belasan hingga puluhan ton, dan kesalahan kecil bisa berakibat fatal—baik bagi operator, pekerja sekitar, maupun kondisi mesin itu sendiri.",
      "Ada beberapa hal penting yang wajib diperhatikan sebelum, selama, dan setelah pengoperasian—mulai dari inspeksi harian (daily check), pemanasan mesin, teknik pengoperasian sesuai medan, hingga prosedur parkir dan penyimpanan.",
      "Jika seluruh prosedur dipahami dan dijalankan dengan benar, keselamatan kerja (K3) akan tercipta, umur pakai mesin lebih panjang, dan hasil pekerjaan lebih presisi.",
      "Sebaliknya, jika dozer dioperasikan secara asal-asalan, komponen seperti track shoe, blade, dan sistem hidrolik akan cepat rusak. Biaya perbaikan bisa membengkak dan proyek pun tertunda.",
    ],

    accordionItems: [
      {
        title: "Slot Dizing",
        paragraphs: [
          "Slot dozing adalah teknik mendorong material dengan cara membuat 'parit kerja' (slot) selebar blade, sehingga material yang didorong tidak tumpah ke samping dan volume dorongan menjadi jauh lebih besar.",
          "Teknik ini sangat efektif digunakan pada pekerjaan penggusuran besar, seperti cut and fill, penimbunan lahan, atau pemindahan overburden di area tambang.",
          "Selalu gunakan gigi satu (first gear) saat mendorong beban berat agar torsi mesin tetap stabil dan tidak terjadi slip pada track.",
          "Jika ingin memundurkan dozer, pastikan unit benar-benar berhenti terlebih dahulu, netralkan transmisi, lalu oper gigi mundur secara perlahan. Jangan pernah membalik arah secara mendadak.",
          "Saat akan berbelok ke kanan atau kiri, seimbangkan terlebih dahulu dengan control lever, kurangi beban dorongan, dan lakukan manuver di area yang rata agar track tidak tergelincir atau lepas.",
        ],
      },
      {
        title: "Straight Dozing",
        paragraphs: [
          "Straight dozing adalah teknik mendorong material lurus ke depan dengan muatan blade maksimal, cocok untuk pemindahan tanah jarak pendek (di bawah 50 meter).",
          "Isi blade hingga penuh, namun jangan memaksakan mesin bila material terlalu padat—gunakan ripper terlebih dahulu untuk menggemburkan tanah keras.",
          "Setelah blade terisi penuh, berjalanlah dengan gigi satu dan jaga putaran RPM tetap stabil agar dorongan tetap kuat dan konsumsi bahan bakar efisien.",
          "Jaga ketinggian blade selalu rata dengan permukaan tanah. Blade yang terlalu dalam akan membuat mesin bekerja berat, sedangkan blade yang terlalu tinggi membuat hasil tidak rata.",
          "Pastikan area kerja selalu bersih dari batu lepas, ranting, atau lumpur. Material asing dapat menyebabkan track shoe slip (selip) yang mempercepat keausan track.",
          "Untuk hasil perataan akhir, gunakan muatan blade penuh dan gerakan mundur-maju secara halus agar permukaan benar-benar rata dan padat.",
        ],
      },
      {
        title: "Dozing Up And Down",
        paragraphs: [
          "Teknik ini digunakan ketika bekerja di area berkemiringan atau tebing, seperti pembuatan terasering, jalan tambang, atau lereng perbukitan.",
          "Saat medan menurun, dorong material ke posisi yang lebih rendah dengan blade sedikit diangkat agar tidak 'menancap' dan membuat dozer kehilangan kendali.",
          "Gerakkan traktor dengan hati-hati—jangan berbelok tajam di lereng karena berisiko tergelincir dan jatuh ke jurang. Gunakan gigi rendah dan rem secara bergantian.",
          "Potong bagian bawah tebing secukupnya. Pemotongan berlebihan akan membuat tebing makin curam dan rawan longsor, sehingga membahayakan pekerja di bawahnya.",
          "Selalu perhatikan indikator oli dan temperatur mesin. Bekerja di tanjakan membuat mesin lebih cepat panas—jika overheating, segera hentikan unit dan dinginkan.",
        ],
      },
      {
        title: "Dozing Di Disposal",
        paragraphs: [
          "Disposal adalah area pembuangan material sisa. Pekerjaan dozing di disposal bertujuan meratakan dan memadatkan timbunan agar aman untuk dilalui dump truck.",
          "Buat dan jaga lantai disposal selalu bersih, rata, dan tidak berlubang. Permukaan yang tidak rata berisiko membuat dump truck terbalik saat menumpahkan muatan.",
          "Buat tanggul pengaman (safety berm) di tepi disposal dengan tinggi minimal sama dengan ban dump truck. Tanggul ini berfungsi sebagai penghenti jika truck mundur terlalu jauh.",
          "Jaga kestabilan permukaan disposal agar tidak amblas. Timbunan yang tidak dipadatkan dengan benar bisa menyebabkan longsor atau unit terperosok.",
          "Pastikan area disposal bersih dari lumpur, semak, dan material organik yang bisa membuat track slip atau menutupi jalur keluar-masuk truck.",
        ],
      },
      {
        title: "Membuat Parit",
        paragraphs: [
          "Dozer dapat digunakan untuk membuat parit drainase, saluran air, atau batas lahan dengan hasil rapi dan cepat.",
          "Miringkan blade (menggunakan tilt function) dan posisikan bagian tengah blade sebagai titik penggalian sehingga terbentuk alur parit yang simetris.",
          "Gali tanah dengan blade hingga kemiringan sisi parit mencapai sudut 90 derajat atau sesuai spesifikasi desain. Lakukan bertahap—jangan menggali sekaligus dalam.",
          "Setelah pinggiran parit terbentuk, lakukan perataan (leveling) dengan menggerakkan dozer searah alur parit agar dinding dan dasar menjadi rapi.",
          "Untuk parit panjang, kerjakan per segmen 20–30 meter agar hasil lebih presisi dan operator tidak kelelahan.",
        ],
      },
      {
        title: "Menggusur Dengan Dua Blade",
        paragraphs: [
          "Teknik ini menggunakan dua unit dozer yang bekerja berdampingan (side by side) untuk membersihkan material dalam volume besar sekaligus.",
          "Tujuannya adalah mempercepat pembersihan area kerja dari material penghalang, terutama pada pekerjaan land clearing skala besar.",
          "Kedua traktor diposisikan sejajar dengan jarak aman sekitar 1,5–2 meter, dan wajib menggunakan gigi satu agar kecepatan keduanya sinkron.",
          "Operator kedua unit harus berkomunikasi intens (via radio atau hand signal) untuk menghindari tabrakan blade atau saling menghalangi.",
          "Teknik ini sangat efisien untuk membuka lahan perumahan, jalan baru, atau area tambang dengan target waktu ketat.",
        ],
      },
      {
        title: "Blade Angle",
        paragraphs: [
          "Blade angle adalah prosedur pengaturan sudut blade pada dozer, baik tilt (kemiringan vertikal) maupun pitch (kemiringan horizontal). Pengaturan yang tepat sangat menentukan hasil kerja.",
          "Sebelum mengatur, matikan mesin, turunkan blade ke tanah, lalu buka pin pengunci blade dan cabut penahan (retainer) yang ada di sisi blade.",
          "Atur kemiringan blade sesuai kebutuhan: untuk menggali, miringkan sedikit ke depan; untuk meratakan, posisikan blade datar; untuk membuat parit, gunakan tilt ke samping.",
          "Setelah posisi sesuai, kencangkan kembali pin blade dengan torsi sesuai manual unit. Pin yang longgar bisa menyebabkan blade lepas saat bekerja—sangat berbahaya.",
          "Lakukan pemeriksaan berkala pada sistem hidrolik dan pin blade setiap 250 jam operasional. Perawatan rutin ini terbukti memperpanjang umur pakai unit hingga 30%.",
          "Dozer yang dirawat dengan baik bukan hanya aman dipakai, tetapi juga tetap produktif dalam jangka panjang—dan itu berarti penghematan biaya bagi pemilik proyek.",
        ],
      },
    ],

    serviceCallout: {
      eyebrow: "Layanan Kami",
      title: "Sewa Dozer & Pengaspalan Jabodetabek",
      paragraphs: [
        "Kami melayani penyewaan dozer untuk area Jabodetabek dan sekitarnya, termasuk penggarapan lahan, land clearing, dan pekerjaan cut and fill. Dozer juga efektif membersihkan belukar tinggi, akar pohon, dan sisa vegetasi dari lahan yang akan dibangun.",
        "Selain sewa dozer, kami menyediakan layanan pengaspalan jalan—termasuk jalan sempit di area perkampungan—dengan kualitas pengerjaan bertaraf nasional dan harga yang kompetitif.",
      ],
      linkText: "Kunjungi spesialisaspal.com",
      linkUrl: "https://spesialisaspal.com",
    },

    ctaBadge: "Konsultasi Gratis",
    ctaTitle1: "Butuh sewa Dozer? ",
    ctaTitle2: "Kami siap membantu.",
    ctaButton: "Hubungi via WhatsApp",
    ctaWaText: "Halo Tri Abadi Makmur, saya ingin konsultasi mengenai project...",
  },

  en: {
    title: "Dozer",
    subtitle: "Dozer Rental in Jabodetabek",
    thumbImage: "/proyek/proyek-46.webp",
    sectionWhat: "About Dozer",

    intro: [
      "A dozer (bulldozer) is a crawler-type heavy equipment equipped with a front blade, primarily used to push, bulldoze, level, and move large volumes of soil material.",
      "In every construction process—from land clearing and road building to mining works—a dozer is essential, especially on terrain that other heavy equipment cannot reach.",
      "In the Jabodetabek area, dozers are widely used for land clearing, leveling housing project sites, cleaning land, building retention ponds, and cut-and-fill works.",
    ],

    highlights: [
      {
        title: "Experienced Operators",
        description: "A dozer is controlled by a single trained operator. Every operator on our team is certified and experienced across various project terrains.",
      },
      {
        title: "Well-Maintained Fleet",
        description: "All units pass routine inspection and scheduled maintenance. Our dozer fleet is always ready to work without technical issues.",
      },
      {
        title: "24-Hour Support",
        description: "Our technical team is on standby to help your project anytime—from initial consultation to post-rental service.",
      },
    ],

    sectionTips: "Tips for Operating Dozer",
    tipsSectionTitle1: "Tips for Operating ",
    tipsSectionTitle2: "Dozer",
    tipsSectionTitle3: " for Construction",

    tipsIntro: [
      "Operating a dozer is not a casual job. This heavy equipment weighs from tens to hundreds of tons, and a small mistake can be fatal—both for the operator, surrounding workers, and the machine itself.",
      "There are several important things that must be considered before, during, and after operation—from daily checks, engine warm-up, terrain-specific operating techniques, to parking and storage procedures.",
      "If all these procedures are understood and followed correctly, work safety (K3) will be created, machine lifespan will be longer, and work results will be more precise.",
      "Conversely, if the dozer is operated carelessly, components such as track shoes, blades, and hydraulic systems will wear out quickly. Repair costs can balloon and the project will be delayed.",
    ],

    accordionItems: [
      {
        title: "Slot Dozing",
        paragraphs: [
          "Slot dozing is a technique of pushing material by creating a blade-width 'work slot' so that the pushed material does not spill sideways and the push volume becomes much larger.",
          "This technique is highly effective for large bulldozing works, such as cut and fill, land backfilling, or overburden removal in mining areas.",
          "Always use first gear when pushing heavy loads so that engine torque remains stable and no track slip occurs.",
          "If you want to reverse the dozer, make sure the unit has completely stopped first, neutralize the transmission, then shift to reverse gear slowly. Never reverse direction abruptly.",
          "When turning right or left, first balance with the control lever, reduce the pushing load, and maneuver on flat areas so the track does not slip or detach.",
        ],
      },
      {
        title: "Straight Dozing",
        paragraphs: [
          "Straight dozing is a technique of pushing material straight ahead with maximum blade load, suitable for short-distance soil movement (under 50 meters).",
          "Fill the blade to the maximum, but do not force the engine if the material is too compact—use a ripper first to loosen hard soil.",
          "Once the blade is fully loaded, drive in first gear and keep RPM stable so the push remains strong and fuel consumption stays efficient.",
          "Keep the blade height always even with the ground surface. A blade that is too deep will make the engine work hard, while a blade that is too high makes the result uneven.",
          "Make sure the work area is always clean from loose stones, twigs, or mud. Foreign material can cause track shoe slip that accelerates track wear.",
          "For the final leveling result, use a full blade load and move back and forth smoothly so the surface is truly flat and compacted.",
        ],
      },
      {
        title: "Dozing Up and Down",
        paragraphs: [
          "This technique is used when working on sloped or cliff areas, such as terracing, mining roads, or hilly slopes.",
          "When the terrain slopes downward, push material to a lower position with the blade slightly lifted so it does not 'sink in' and cause the dozer to lose control.",
          "Move the tractor carefully—do not turn sharply on slopes as it risks slipping and falling into a ravine. Use low gear and alternate braking.",
          "Cut the bottom of the cliff as needed. Excessive cutting will make the cliff steeper and prone to landslides, endangering workers below.",
          "Always pay attention to the oil indicator and engine temperature. Working on inclines makes the engine heat up faster—if overheating, immediately stop the unit and let it cool.",
        ],
      },
      {
        title: "Dozing at Disposal",
        paragraphs: [
          "A disposal area is where leftover material is dumped. Dozing work at the disposal aims to level and compact the embankment so it is safe for dump trucks to pass.",
          "Keep the disposal floor always clean, flat, and free of holes. An uneven surface risks causing dump trucks to overturn while unloading.",
          "Create a safety berm at the disposal edge with a height at least equal to the dump truck tire. This berm serves as a stopper if the truck reverses too far.",
          "Maintain the stability of the disposal surface so it does not sink. Embankments that are not properly compacted can cause landslides or units to fall through.",
          "Make sure the disposal area is clean of mud, bushes, and organic material that can cause track slip or block truck entry and exit routes.",
        ],
      },
      {
        title: "Making Trenches",
        paragraphs: [
          "A dozer can be used to make drainage trenches, water channels, or land boundaries with neat and fast results.",
          "Tilt the blade (using the tilt function) and position the middle of the blade as the digging point so a symmetrical trench channel is formed.",
          "Dig the ground with the blade until the trench side slope reaches a 90-degree angle or according to design specifications. Do it gradually—do not dig all at once in depth.",
          "After the trench edges are formed, do the leveling by moving the dozer along the trench channel so the walls and floor become neat.",
          "For long trenches, work in 20–30 meter segments so the result is more precise and the operator does not get fatigued.",
        ],
      },
      {
        title: "Bulldozing with Two Blades",
        paragraphs: [
          "This technique uses two dozer units working side by side to clear large-volume material simultaneously.",
          "Its purpose is to speed up the cleaning of the work area from blocking material, especially for large-scale land clearing works.",
          "Both tractors are positioned parallel with a safe distance of about 1.5–2 meters, and both must use first gear so their speeds are synchronized.",
          "Both unit operators must communicate intensively (via radio or hand signals) to avoid blade collisions or blocking each other.",
          "This technique is very efficient for opening housing land, new roads, or mining areas with tight time targets.",
        ],
      },
      {
        title: "Blade Angle",
        paragraphs: [
          "Blade angle is the procedure for adjusting the blade angle on the dozer, both tilt (vertical slope) and pitch (horizontal slope). Proper adjustment greatly determines work results.",
          "Before adjusting, turn off the engine, lower the blade to the ground, then open the blade locking pin and remove the existing retainer on the blade side.",
          "Adjust the blade slope as needed: for digging, tilt slightly forward; for leveling, position the blade flat; for making trenches, use side tilt.",
          "After the position is correct, re-tighten the blade pin with the torque specified in the unit manual. A loose pin can cause the blade to detach during work—very dangerous.",
          "Perform regular inspections on the hydraulic system and blade pins every 250 operating hours. This routine maintenance is proven to extend the unit's lifespan by up to 30%.",
          "A well-maintained dozer is not only safe to use but also remains productive in the long term—and that means cost savings for the project owner.",
        ],
      },
    ],

    serviceCallout: {
      eyebrow: "Our Services",
      title: "Dozer Rental & Asphalt Paving in Jabodetabek",
      paragraphs: [
        "We serve dozer rentals for the Jabodetabek area and surroundings, including land work, land clearing, and cut-and-fill works. The dozer is also effective at clearing tall bushes, tree roots, and vegetation remnants from land to be developed.",
        "In addition to dozer rental, we provide asphalt paving services—including narrow roads in residential areas—with national-standard work quality and competitive prices.",
      ],
      linkText: "Visit spesialisaspal.com",
      linkUrl: "https://spesialisaspal.com",
    },

    ctaBadge: "Free Consultation",
    ctaTitle1: "Need to rent a Dozer? ",
    ctaTitle2: "We're ready to help.",
    ctaButton: "Contact via WhatsApp",
    ctaWaText: "Hello Tri Abadi Makmur, would like to consult about a project...",
  },
};

// ─────────────────────────────────────────────
// HALAMAN: DOZER
// ─────────────────────────────────────────────
export default function Dozer() {
  const { lang } = useLang();
  const d = data[lang] || data.id;

  const [openIndex, setOpenIndex] = useState(0);
  const [imgError, setImgError] = useState(false);

  const toggle = useCallback(
    (i) => setOpenIndex((prev) => (prev === i ? null : i)),
    []
  );

  const highlightIcons = [IconUserCheck, IconWrench, IconClock];

  return (
    <section
      aria-labelledby="dozer-heading"
      className="relative bg-white pt-28 lg:pt-36 pb-20 lg:pb-28 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-40 -left-32 w-80 h-80 bg-[#1e88e5] rounded-full blur-3xl opacity-[0.04]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-40 -right-32 w-80 h-80 bg-slate-500 rounded-full blur-3xl opacity-[0.05]"
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
              id="dozer-heading"
              className="font-light tracking-tight text-slate-900 leading-[1.15] text-balance max-w-3xl mx-auto"
              style={{ fontSize: "clamp(1.75rem, 4.5vw, 2.5rem)" }}
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
                    <p
                      key={i}
                      className="text-slate-700 leading-[1.85]"
                      style={{ fontSize: "clamp(0.875rem, 1.5vw, 0.9375rem)" }}
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ═══ 3. HIGHLIGHT STRIP (h2 → h3 untuk semantik) ═══ */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-12 sm:mb-16">
          {d.highlights.map((h, i) => {
            const Icon = highlightIcons[i];
            return (
              <Reveal key={h.title} delay={80 + i * 60} y={20}>
                <div className="h-full rounded-2xl border border-slate-200 bg-white p-5
                                hover:border-[#1e88e5]/40 hover:shadow-md hover:shadow-[#1e88e5]/5
                                transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-[#1e88e5]/10 text-[#1e88e5]
                                  flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  {/* ✅ FIX: h2 → h3 */}
                  <h3 className="text-sm font-bold text-slate-900 mb-1.5">
                    {h.title}
                  </h3>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    {h.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* ═══ 4. TIPS SECTION ═══ */}
        <Reveal y={20}>
          <div className="text-center mb-6 sm:mb-8">
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
              {d.tipsSectionTitle1}
              <span className="font-semibold">{d.tipsSectionTitle2}</span>
              {d.tipsSectionTitle3}
            </h2>
          </div>
        </Reveal>

        {/* ✅ 4b. TIPS INTRO CALLOUT — heading duplikat dihapus */}
        <Reveal y={24}>
          <div className="relative rounded-2xl bg-slate-50 border border-slate-200 p-5 sm:p-7 mb-8 sm:mb-10 overflow-hidden">
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
                {d.tipsIntro.map((p, i) => (
                  <p
                    key={i}
                    className="text-slate-600 leading-[1.85]"
                    style={{ fontSize: "clamp(0.875rem, 1.5vw, 0.9375rem)" }}
                  >
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* 4c. ACCORDION */}
        {d.accordionItems.map((item, i) => {
          const number = String(i + 1).padStart(2, "0");
          return (
            <Reveal key={item.title} delay={80 + i * 60} y={24}>
              <Accordion
                id={`item-${i + 1}`}
                index={i}
                number={number}
                title={item.title}
                isOpen={openIndex === i}
                onToggle={toggle}
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

        {/* ═══ 5. SERVICE CALLOUT ═══ */}
        <Reveal y={28}>
          <div className="mt-12 sm:mt-16 rounded-2xl border border-slate-200
                          bg-gradient-to-br from-slate-50 to-blue-50/40 p-6 sm:p-8">
            <p className="text-[#1e88e5] uppercase tracking-[0.25em] text-[10px] sm:text-[11px] font-bold mb-3">
              {d.serviceCallout.eyebrow}
            </p>
            <h2
              className="font-semibold text-slate-900 leading-tight mb-4"
              style={{ fontSize: "clamp(1.125rem, 2.5vw, 1.375rem)" }}
            >
              {d.serviceCallout.title}
            </h2>
            <div className="space-y-3 mb-5">
              {d.serviceCallout.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-slate-700 leading-[1.85]"
                  style={{ fontSize: "clamp(0.875rem, 1.5vw, 0.9375rem)" }}
                >
                  {p}
                </p>
              ))}
            </div>
            <a
              href={d.serviceCallout.linkUrl}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 text-[#1e88e5]
                         font-semibold text-sm
                         hover:gap-3 transition-all duration-200"
            >
              {d.serviceCallout.linkText}
              <IconArrowRight className="w-4 h-4" />
            </a>
          </div>
        </Reveal>

        {/* ═══ 6. CTA ═══ */}
        <Reveal y={34}>
          <div className="relative mt-12 sm:mt-16 rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 p-8 sm:p-12 lg:p-14 text-center shadow-2xl shadow-slate-900/30">
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