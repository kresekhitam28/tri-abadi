// src/data/articles.js
import { asphaltCostRanges, asphaltPackagePrices, formatAsphaltPrice } from "./asphaltPricing";
import { projectQuoteHref } from "../lib/quote";
import { caseStudies } from "./caseStudies";
import { technicalComparisonArticles } from "./technicalComparisonArticles";

const asphaltStudy = caseStudies.find(({ slug }) => slug === "pengaspalan-akses-pabrik-cikupa");
const concreteStudy = caseStudies.find(({ slug }) => slug === "pengecoran-lantai-gudang-cikarang");

export const articles = [
  ...technicalComparisonArticles,
  {
    slug: "aspal-jalan-murah",
    modifiedDateISO: "2026-11-19",
    date: { id: "28 September 2026", en: "September 28, 2026" },
    dateISO: "2026-10-14",
    src: "/proyek/proyek-1.webp",
    category: { id: "Pengaspalan", en: "Asphalt Paving" },
    title: {
      id: "Cara Menghemat Biaya Pengaspalan Jalan",
      en: "How to Save on Road Paving Costs",
    },
    desc: {
      id: "Pelajari cara merencanakan pengaspalan yang sesuai anggaran, mulai dari memilih waktu pengerjaan hingga membandingkan material dan penawaran.",
      en: "Learn how to plan asphalt paving within your budget, from choosing a work schedule to comparing materials and project quotes.",
    },
    author: {
      name: "PT. Tri Abadi Makmur Indonesia",
      phone: "082258089367",
      avatar: "/logo.webp",
      lastUpdated: { id: "5 Oktober 2026", en: "October 5, 2026" },
      bio: {
        id: "Tri Abadi Makmur merupakan perusahaan yang bergerak di bidang konstruksi, dengan pengalaman yang sudah bertahun – tahun kami kembangkan, tahapan proses yang mengedepankan kualitas dan kehati-hatian, serta eksekusi pengerjaan proyek yang signifikan, demi tercapainya kepuasan client sehingga terwujudnya jalinan kerjasama yang continue dan berkelanjutan.",
        en: "Tri Abadi Makmur is a construction company with years of experience we have developed, a process that prioritizes quality and prudence, as well as the execution of significant projects, in order to achieve client satisfaction so that continuous and long-term cooperation is realized.",
      },
    },
    tags: [
      { id: "Pekerjaan Aspal Hotmix", en: "Hotmix Asphalt Works", slug: "pekerjaan-aspal-hotmix" },
      { id: "Distributor Aspal", en: "Asphalt Distributor", slug: "distributor-aspal" },
      { id: "Perbaikan Jalan Aspal", en: "Asphalt Road Repair", slug: "perbaikan-jalan-aspal" },
      { id: "Pemasangan Kansteen", en: "Kansteen Installation", slug: "pemasangan-kansteen" },
      { id: "Aspal Jalan Murah Alternatif", en: "Affordable Asphalt Alternative", slug: "aspal-jalan-murah-2" },
      { id: "Pekerjaan Aspal Hotmix Alternatif", en: "Hotmix Asphalt Works Alternative", slug: "pekerjaan-aspal-hotmix-2" },
      { id: "Distributor Aspal Alternatif", en: "Asphalt Distributor Alternative", slug: "distributor-aspal-2" },
      { id: "Perbaikan Jalan Aspal Alternatif", en: "Asphalt Road Repair Alternative", slug: "perbaikan-jalan-aspal-2" },
      { id: "Pemasangan Paving Block", en: "Paving Block Installation", slug: "pemasangan-paving-block" },
      { id: "Pengaspalan Jalan Perumahan", en: "Residential Road Asphalt Paving", slug: "pengaspalan-jalan-perumahan" },
      { id: "Hotmix untuk Jalan Perkantoran", en: "Hotmix for Office Roads", slug: "hotmix-untuk-jalan-perkantoran" },
    ],
    body: [
      {
        type: "paragraph",
        text: {
          id: "Saat membandingkan penawaran, periksa kondisi jalan, luas area, dan lingkup pekerjaan yang dicakup. Gunakan <a href='/blog/biaya-aspal-per-meter' class='text-[#1e88e5] hover:underline font-semibold'>panduan biaya pengaspalan per m²</a> untuk gambaran awal, lalu lihat <a href='/layanan/infrastruktur/pengaspalan' class='text-[#1e88e5] hover:underline font-semibold'>jasa pengaspalan hotmix</a> jika Anda membutuhkan survei atau estimasi proyek.",
          en: "When comparing quotes, check the condition of the road, the project area, and what each quote covers. Use the <a href='/blog/biaya-aspal-per-meter' class='text-[#1e88e5] hover:underline font-semibold'>road paving cost guide</a> for an initial estimate, then see our <a href='/layanan/infrastruktur/pengaspalan' class='text-[#1e88e5] hover:underline font-semibold'>hotmix asphalt paving services</a> if you need a survey or project quote.",
        },
      },
      {
        type: "heading",
        text: {
          id: "Tips Mendapatkan Aspal Jalan Murah Tapi Berkualitas",
          en: "Tips to Get Affordable but Quality Asphalt",
        },
      },
      {
        type: "list",
        ordered: true,
        items: [
          {
            id: "<strong>Pilih Waktu yang Tepat:</strong> Menghindari musim hujan sangat disarankan. Pengaspalan saat cuaca cerah membuat proses lebih cepat dan hemat biaya operasional.",
            en: "<strong>Choose the Right Time:</strong> Avoiding the rainy season is highly recommended. Paving in sunny weather makes the process faster and saves operational costs.",
          },
          {
            id: "<strong>Sesuaikan Ketebalan:</strong> Untuk jalan lingkungan perumahan, aspal hotmix dengan ketebalan 3-4 cm sudah cukup kuat dan lebih murah dibanding jalan pabrik.",
            en: "<strong>Adjust Thickness:</strong> For residential neighborhood roads, 3-4 cm thick hotmix asphalt is strong enough and cheaper than factory roads.",
          },
          {
            id: "<strong>Bandingkan Penawaran:</strong> Jangan langsung menerima harga pertama. Bandingkan penawaran dari beberapa kontraktor, tapi pastikan spesifikasi materialnya sama.",
            en: "<strong>Compare Quotes:</strong> Don't just accept the first price. Compare quotes from several contractors, but make sure the material specifications are the same.",
          },
        ],
      },
      {
        type: "paragraph",
        text: {
          id: "Untuk melihat rincian estimasi biaya, Anda bisa membaca artikel kami tentang <a href='/blog/biaya-aspal-per-meter' class='text-[#1e88e5] hover:underline font-semibold'>Biaya Aspal Per Meter</a>.",
          en: "To see detailed cost estimates, you can read our article on <a href='/blog/biaya-aspal-per-meter' class='text-[#1e88e5] hover:underline font-semibold'>Asphalt Cost Per Meter</a>.",
        },
      },
      {
        type: "paragraph",
        text: {
          id: "PT Tri Abadi Makmur adalah solusi tepat untuk proyek pengaspalan dengan budget terbatas namun tetap mengutamakan kualitas. Kami melayani pengaspalan jalan perumahan, gang, hingga area komersial. Dapatkan penawaran terbaik hari ini dengan menghubungi kami via WhatsApp.",
          en: "PT Tri Abadi Makmur is the right solution for paving projects with a limited budget while still prioritizing quality. We serve residential road paving, alleys, and commercial areas. Get the best offer today by contacting us via WhatsApp.",
        },
      },
    ],
  },
  {
    slug: "pekerjaan-aspal-hotmix",
    date: { id: "15 Oktober 2026", en: "October 15, 2026" },
    dateISO: "2026-10-18",
    src: "/proyek/proyek-17.webp",
    category: { id: "Hotmix", en: "Hotmix" },
    title: {
      id: "Kontraktor Pekerjaan Aspal Hotmix Standar Bina Marga",
      en: "Bina Marga Standard Hotmix Asphalt Paving Contractor",
    },
    desc: {
      id: "Panduan lengkap jenis dan spesifikasi pekerjaan aspal hotmix (AC-WC, AC-BC, ATB) untuk jalan pabrik & raya. Dikerjakan alat berat modern & bergaransi.",
      en: "Complete guide to hotmix asphalt types and specifications (AC-WC, AC-BC, ATB) for factory & main roads. Executed with modern heavy equipment & warranty.",
    },
    author: {
      name: "PT. Tri Abadi Makmur Indonesia",
      phone: "082258089367",
      avatar: "/logo.webp",
      lastUpdated: { id: "5 Oktober 2026", en: "October 5, 2026" },
      bio: {
        id: "Tri Abadi Makmur merupakan perusahaan yang bergerak di bidang konstruksi, dengan pengalaman yang sudah bertahun – tahun kami kembangkan, tahapan proses yang mengedepankan kualitas dan kehati-hatian, serta eksekusi pengerjaan proyek yang signifikan, demi tercapainya kepuasan client sehingga terwujudnya jalinan kerjasama yang continue dan berkelanjutan.",
        en: "Tri Abadi Makmur is a construction company with years of experience we have developed, a process that prioritizes quality and prudence, as well as the execution of significant projects, in order to achieve client satisfaction so that continuous and long-term cooperation is realized.",
      },
    },
    tags: [
      { id: "Aspal Jalan Murah", en: "Affordable Asphalt Paving", slug: "aspal-jalan-murah" },
      { id: "Distributor Aspal", en: "Asphalt Distributor", slug: "distributor-aspal" },
      { id: "Perbaikan Jalan Aspal", en: "Asphalt Road Repair", slug: "perbaikan-jalan-aspal" },
      { id: "Pemasangan Kansteen", en: "Kansteen Installation", slug: "pemasangan-kansteen" },
      { id: "Aspal Jalan Murah Alternatif", en: "Affordable Asphalt Alternative", slug: "aspal-jalan-murah-2" },
      { id: "Pekerjaan Aspal Hotmix Alternatif", en: "Hotmix Asphalt Works Alternative", slug: "pekerjaan-aspal-hotmix-2" },
      { id: "Distributor Aspal Alternatif", en: "Asphalt Distributor Alternative", slug: "distributor-aspal-2" },
      { id: "Perbaikan Jalan Aspal Alternatif", en: "Asphalt Road Repair Alternative", slug: "perbaikan-jalan-aspal-2" },
      { id: "Pemasangan Paving Block", en: "Paving Block Installation", slug: "pemasangan-paving-block" },
      { id: "Pengaspalan Jalan Perumahan", en: "Residential Road Asphalt Paving", slug: "pengaspalan-jalan-perumahan" },
      { id: "Hotmix untuk Jalan Perkantoran", en: "Hotmix for Office Roads", slug: "hotmix-untuk-jalan-perkantoran" },
    ],
    body: [
      {
        type: "paragraph",
        text: {
          id: "Pekerjaan aspal hotmix — Aspal hotmix adalah standar tertinggi untuk pembangunan jalan saat ini. Kualitasnya yang padat, awet, dan tahan cuaca membuatnya menjadi pilihan utama untuk jalan perumahan, pabrik, hingga jalan raya. Jika Anda membutuhkan kontraktor untuk <a href='/layanan/infrastruktur/pengaspalan' class='text-[#1e88e5] hover:underline font-semibold'>pekerjaan aspal hotmix</a> di area Jabodetabek, Banten & Jawa Barat, PT Tri Abadi Makmur adalah ahlinya.",
          en: "Hotmix asphalt works — Hotmix asphalt is the highest standard for road construction today. Its dense, durable, and weather-resistant qualities make it the main choice for residential roads, factories, and highways. If you need a contractor for hotmix asphalt works in Greater Jakarta, Banten & West Java, PT Tri Abadi Makmur is the expert.",
        },
      },
      {
        type: "heading",
        text: {
          id: "Apa Saja Jenis Aspal Hotmix dan Kegunaannya?",
          en: "What Are the Types of Hotmix Asphalt and Their Uses?",
        },
      },
      {
        type: "paragraph",
        text: {
          id: "Tidak semua aspal hotmix itu sama. Ketebalan dan jenis campurannya disesuaikan dengan beban jalan:",
          en: "Not all hotmix asphalt is the same. The thickness and type of mix are adjusted to the road load:",
        },
      },
      {
        type: "list",
        ordered: false,
        items: [
          {
            id: "<strong>AC-WC (Asphalt Concrete Wearing Course):</strong> Lapisan permukaan, ketebalan 4 cm. Cocok untuk jalan raya dan jalan perumahan.",
            en: "<strong>AC-WC (Asphalt Concrete Wearing Course):</strong> Surface layer, 4 cm thick. Suitable for highways and residential roads.",
          },
          {
            id: "<strong>AC-BC (Asphalt Concrete Binder Course):</strong> Lapisan pengikat, ketebalan 4-6 cm. Digunakan untuk jalan dengan beban berat seperti jalan pabrik.",
            en: "<strong>AC-BC (Asphalt Concrete Binder Course):</strong> Binder layer, 4-6 cm thick. Used for heavy load roads like factory roads.",
          },
          {
            id: "<strong>ATB (Asphalt Treated Base):</strong> Lapisan pondasi atas, ketebalan 5 cm. Menambah stabilitas jalan.",
            en: "<strong>ATB (Asphalt Treated Base):</strong> Upper base layer, 5 cm thick. Adds road stability.",
          },
        ],
      },
      {
        type: "paragraph",
        text: {
          id: "Untuk melihat rincian harga paket pengaspalan, Anda bisa membaca artikel kami tentang <a href='/blog/harga-aspal-hotmix' class='text-[#1e88e5] hover:underline font-semibold'>Harga Aspal Hotmix</a>.",
          en: "To see detailed paving package prices, you can read our article on Hotmix Asphalt Prices.",
        },
      },
      {
        type: "heading",
        text: {
          id: "Kenapa Memilih Jasa Pengaspalan Kami?",
          en: "Why Choose Our Paving Services?",
        },
      },
      {
        type: "paragraph",
        text: {
          id: "PT Tri Abadi Makmur didukung oleh alat berat modern (seperti Asphalt Finisher dan Tandem Roller) serta tim berpengalaman. Kami menjamin hasil yang rata, tidak bergelombang, dan tahan lama. Kami juga memberikan garansi pengerjaan untuk kepuasan Anda.",
          en: "PT Tri Abadi Makmur is supported by modern heavy equipment (such as Asphalt Finisher and Tandem Roller) and an experienced team. We guarantee flat, non-wavy, and durable results. We also provide a work warranty for your satisfaction.",
        },
      },
      {
        type: "paragraph",
        text: {
          id: "Punya proyek jalan pabrik, perumahan, atau area parkir? Konsultasikan kebutuhan Anda sekarang dan dapatkan survei lokasi gratis.",
          en: "Have a factory road, residential, or parking area project? Consult your needs now and get a free site survey.",
        },
      },
    ],
  },
  {
    slug: "distributor-aspal",
    date: { id: "18 Oktober 2026", en: "October 18, 2026" },
    dateISO: "2026-10-20",
    src: "/proyek/proyek-15.webp",
    category: { id: "Distributor", en: "Distributor" },
    title: {
      id: "Distributor Aspal Hotmix & Cair Terpercaya Jabodetabek",
      en: "Trusted Hotmix & Liquid Asphalt Distributor in Greater Jakarta",
    },
    desc: {
      id: "Cari distributor aspal penetrasi 60/70 & hotmix dengan pasokan stabil? Dapatkan material standar proyek plus layanan gelar aspal dari PT Tri Abadi Makmur.",
      en: "Looking for a penetration 60/70 & hotmix asphalt distributor with stable supply? Get project-grade materials plus paving services from PT Tri Abadi Makmur.",
    },
    author: {
      name: "PT. Tri Abadi Makmur Indonesia",
      phone: "082258089367",
      avatar: "/logo.webp",
      lastUpdated: { id: "5 Oktober 2026", en: "October 5, 2026" },
      bio: {
        id: "Tri Abadi Makmur merupakan perusahaan yang bergerak di bidang konstruksi, dengan pengalaman yang sudah bertahun – tahun kami kembangkan, tahapan proses yang mengedepankan kualitas dan kehati-hatian, serta eksekusi pengerjaan proyek yang signifikan, demi tercapainya kepuasan client sehingga terwujudnya jalinan kerjasama yang continue dan berkelanjutan.",
        en: "Tri Abadi Makmur is a construction company with years of experience we have developed, a process that prioritizes quality and prudence, as well as the execution of significant projects, in order to achieve client satisfaction so that continuous and long-term cooperation is realized.",
      },
    },
    tags: [
      { id: "Aspal Jalan Murah", en: "Affordable Asphalt Paving", slug: "aspal-jalan-murah" },
      { id: "Pekerjaan Aspal Hotmix", en: "Hotmix Asphalt Works", slug: "pekerjaan-aspal-hotmix" },
      { id: "Perbaikan Jalan Aspal", en: "Asphalt Road Repair", slug: "perbaikan-jalan-aspal" },
      { id: "Pemasangan Kansteen", en: "Kansteen Installation", slug: "pemasangan-kansteen" },
      { id: "Aspal Jalan Murah Alternatif", en: "Affordable Asphalt Alternative", slug: "aspal-jalan-murah-2" },
      { id: "Pekerjaan Aspal Hotmix Alternatif", en: "Hotmix Asphalt Works Alternative", slug: "pekerjaan-aspal-hotmix-2" },
      { id: "Distributor Aspal Alternatif", en: "Asphalt Distributor Alternative", slug: "distributor-aspal-2" },
      { id: "Perbaikan Jalan Aspal Alternatif", en: "Asphalt Road Repair Alternative", slug: "perbaikan-jalan-aspal-2" },
      { id: "Pemasangan Paving Block", en: "Paving Block Installation", slug: "pemasangan-paving-block" },
      { id: "Pengaspalan Jalan Perumahan", en: "Residential Road Asphalt Paving", slug: "pengaspalan-jalan-perumahan" },
      { id: "Hotmix untuk Jalan Perkantoran", en: "Hotmix for Office Roads", slug: "hotmix-untuk-jalan-perkantoran" },
    ],
    body: [
      {
        type: "paragraph",
        text: {
          id: "Pasokan aspal untuk proyek perumahan, pabrik, dan jalan di Jabodetabek serta kawasan industri sekitarnya tersedia berdasarkan penawaran. Lihat juga <a href='/supplier' class='text-[#1e88e5] hover:underline font-semibold'>halaman Supplier</a> untuk pilihan material konstruksi dan ketentuan pengiriman.",
          en: "Asphalt supply for housing, factory, and road projects in Greater Jakarta and surrounding industrial areas is available by quotation. See our <a href='/supplier' class='text-[#1e88e5] hover:underline font-semibold'>Supplier page</a> for construction materials and delivery terms.",
        },
      },
      {
        type: "heading",
        text: {
          id: "Tips Memilih Distributor Aspal yang Tepat",
          en: "Tips for Choosing the Right Asphalt Distributor",
        },
      },
      {
        type: "paragraph",
        text: {
          id: "Jangan asal membeli aspal. Pastikan distributor Anda memenuhi kriteria berikut agar proyek tidak gagal:",
          en: "Don't just buy asphalt carelessly. Make sure your distributor meets the following criteria so the project doesn't fail:",
        },
      },
      {
        type: "list",
        ordered: true,
        items: [
          {
            id: "<strong>Kualitas Material Terjamin:</strong> Pastikan aspal memiliki spesifikasi yang sesuai standar (misalnya penetrasi 60/70) dan tidak tercampur kotoran.",
            en: "<strong>Guaranteed Material Quality:</strong> Make sure the asphalt has specifications that meet standards (e.g., penetration 60/70) and is not mixed with dirt.",
          },
          {
            id: "<strong>Pengalaman & Reputasi:</strong> Pilih distributor yang sudah lama bergerak di bidang konstruksi jalan dan memiliki rekam jejak yang baik.",
            en: "<strong>Experience & Reputation:</strong> Choose a distributor that has been engaged in road construction for a long time and has a good track record.",
          },
          {
            id: "<strong>Ketepatan Waktu Pengiriman:</strong> Keterlambatan material bisa menghentikan proyek. Pastikan distributor memiliki armada transportasi yang memadai.",
            en: "<strong>On-Time Delivery:</strong> Material delays can halt a project. Make sure the distributor has an adequate transportation fleet.",
          },
          {
            id: "<strong>Harga Transparan:</strong> Waspadai harga yang terlalu murah karena biasanya kualitasnya di bawah standar. Pilih yang menawarkan harga wajar sesuai kualitas.",
            en: "<strong>Transparent Pricing:</strong> Beware of prices that are too cheap because the quality is usually below standard. Choose one that offers a reasonable price according to quality.",
          },
        ],
      },
      {
        type: "paragraph",
        text: {
          id: "PT Tri Abadi Makmur adalah distributor aspal yang juga melayani <a href='/layanan/infrastruktur/pengaspalan' class='text-[#1e88e5] hover:underline font-semibold'>jasa pengaspalan</a> secara lengkap. Artinya, Anda tidak perlu repot mencari kontraktor terpisah jika membeli material dari kami.",
          en: "PT Tri Abadi Makmur is an asphalt distributor that also provides complete paving services. This means you don't need to bother looking for a separate contractor if you buy materials from us.",
        },
      },
      {
        type: "paragraph",
        text: {
          id: "Butuh pasokan aspal atau konsultasi material untuk proyek Anda? Hubungi kami sekarang via WhatsApp untuk mendapatkan penawaran terbaik.",
          en: "Need asphalt supply or material consultation for your project? Contact us now via WhatsApp to get the best offer.",
        },
      },
    ],
  },
  {
    slug: "perbaikan-jalan-aspal",
    modifiedDateISO: "2026-11-19",
    date: { id: "20 Oktober 2026", en: "October 20, 2026" },
    dateISO: "2026-10-22",
    src: "/proyek/proyek-2.webp",
    category: { id: "Pengaspalan", en: "Asphalt Paving" },
    title: {
      id: "Jasa Perbaikan Jalan Aspal Berlubang & Amblas Cepat",
      en: "Fast Pothole & Sunken Asphalt Road Repair Services",
    },
    desc: {
      id: "Jalan aspal rusak, retak, atau berlubang? Kami tangani tambal sulam (patching) hingga overlay hotmix agar jalan kembali mulus & tahan lama. Survei gratis!",
      en: "Damaged, cracked, or potholed asphalt road? We handle patching to hotmix overlay so your road is smooth & durable again. Free site survey!",
    },
    author: {
      name: "PT. Tri Abadi Makmur Indonesia",
      phone: "082258089367",
      avatar: "/logo.webp",
      lastUpdated: { id: "5 Oktober 2026", en: "October 5, 2026" },
      bio: {
        id: "Tri Abadi Makmur merupakan perusahaan yang bergerak di bidang konstruksi, dengan pengalaman yang sudah bertahun – tahun kami kembangkan, tahapan proses yang mengedepankan kualitas dan kehati-hatian, serta eksekusi pengerjaan proyek yang signifikan, demi tercapainya kepuasan client sehingga terwujudnya jalinan kerjasama yang continue dan berkelanjutan.",
        en: "Tri Abadi Makmur is a construction company with years of experience we have developed, a process that prioritizes quality and prudence, as well as the execution of significant projects, in order to achieve client satisfaction so that continuous and long-term cooperation is realized.",
      },
    },
    tags: [
      { id: "Aspal Jalan Murah", en: "Affordable Asphalt Paving", slug: "aspal-jalan-murah" },
      { id: "Pekerjaan Aspal Hotmix", en: "Hotmix Asphalt Works", slug: "pekerjaan-aspal-hotmix" },
      { id: "Distributor Aspal", en: "Asphalt Distributor", slug: "distributor-aspal" },
      { id: "Pemasangan Kansteen", en: "Kansteen Installation", slug: "pemasangan-kansteen" },
      { id: "Aspal Jalan Murah Alternatif", en: "Affordable Asphalt Alternative", slug: "aspal-jalan-murah-2" },
      { id: "Pekerjaan Aspal Hotmix Alternatif", en: "Hotmix Asphalt Works Alternative", slug: "pekerjaan-aspal-hotmix-2" },
      { id: "Distributor Aspal Alternatif", en: "Asphalt Distributor Alternative", slug: "distributor-aspal-2" },
      { id: "Perbaikan Jalan Aspal Alternatif", en: "Asphalt Road Repair Alternative", slug: "perbaikan-jalan-aspal-2" },
      { id: "Pemasangan Paving Block", en: "Paving Block Installation", slug: "pemasangan-paving-block" },
      { id: "Pengaspalan Jalan Perumahan", en: "Residential Road Asphalt Paving", slug: "pengaspalan-jalan-perumahan" },
      { id: "Hotmix untuk Jalan Perkantoran", en: "Hotmix for Office Roads", slug: "hotmix-untuk-jalan-perkantoran" },
    ],
    body: [
      {
        type: "paragraph",
        text: {
          id: "Perbaikan jalan Aspal Hotmix — Beberapa area yang perlu mendapatkan perhatian lebih untuk dilakukan perbaikan agar jalan lebih mulus dan nyaman dilalui. Namun, sebelum perbaikan jalan tersebut dilakukan, anda harus tahu bahwa ada beberapa faktor yang mempengaruhi biaya perbaikan jalan aspal hotmix. Faktor-faktor tersebut antara lain: luas area yang akan diperbaiki, tingkat kerusakan jalan, jenis aspal yang digunakan, dan kondisi lingkungan sekitar. Dengan mengetahui faktor-faktor tersebut, anda bisa lebih mudah memprediksi berapa biaya yang akan dikeluarkan untuk perbaikan jalan aspal hotmix.",
          en: "Hotmix Asphalt Road Repair — Several areas need more attention for repairs so roads are smoother and more comfortable to pass. However, before the repair is carried out, you should know that several factors affect the cost of hotmix asphalt road repair. These factors include: the area to be repaired, the level of road damage, the type of asphalt used, and the surrounding environmental conditions. By knowing these factors, you can more easily predict the cost of the hotmix asphalt road repair.",
        },
      },
      {
        type: "heading",
        text: { id: "Perbaikan Jalan Aspal Hotmix", en: "Hotmix Asphalt Road Repair" },
      },
      {
        type: "paragraph",
        text: {
          id: "Jika Anda membutuhkan perbaikan jalan, lihat <a href='/layanan/infrastruktur/pengaspalan' class='text-[#1e88e5] hover:underline font-semibold'>layanan tambal sulam dan overlay</a> atau bandingkan <a href='/blog/biaya-aspal-per-meter' class='text-[#1e88e5] hover:underline font-semibold'>kisaran biaya per jenis pekerjaan</a> sebelum meminta estimasi.",
          en: "If you need road repairs, see our <a href='/layanan/infrastruktur/pengaspalan' class='text-[#1e88e5] hover:underline font-semibold'>patching and resurfacing services</a> or compare the <a href='/blog/biaya-aspal-per-meter' class='text-[#1e88e5] hover:underline font-semibold'>cost ranges by type of work</a> before requesting a quote.",
        },
      },
      {
        type: "paragraph",
        text: {
          id: "Perbaikan jalan aspal hotmix bisa dilakukan di beberapa area dan salah satu area yang perlu diperhatikan adalah area perbaikan jalan yang harus dilakukan sesuai dengan tingkat kerusakan jalan. Berikut adalah beberapa area yang perlu diperhatikan untuk perbaikan jalan aspal hotmix.",
          en: "Hotmix asphalt road repair can be done in several areas, and one area that needs attention is repair work according to the level of road damage. Here are several areas that need attention for hotmix asphalt road repair.",
        },
      },
      {
        type: "heading",
        text: {
          id: "5 Area Perbaikan Jalan Yang Menjadi Fokus Pemerintah",
          en: "5 Road Repair Areas That Are the Government's Focus",
        },
      },
      {
        type: "list",
        ordered: true,
        items: [
          {
            id: "Parkir Basement — Basement merupakan area parkir yang berada di bawah tanah yang biasanya digunakan untuk lahan parkir di area perkotaan. Area parkir ini biasanya digunakan untuk memarkir kendaraan bagi orang-orang yang bekerja di gedung perkantoran. Untuk itu penting bagi anda untuk melakukan perawatan pada area basement agar tidak terjadi kerusakan yang dapat membahayakan pengguna. Perawatan atau perbaikan aspal basement bisa anda lakukan secara berkala untuk menghindari kerusakan yang lebih parah.",
            en: "Basement Parking — The basement is an underground parking area usually used for parking in urban areas. This parking area is commonly used to park vehicles for people working in office buildings. Therefore it is important for you to maintain the basement area so that no damage occurs that could endanger users. Maintenance or repair of basement asphalt can be done periodically to avoid further damage.",
          },
          {
            id: "Sarana Pengisian Bahan Bakar Umum — Sarana pengisian bahan bakar umum atau biasa disebut SPBU merupakan kawasan yang lalu lalang. Yang merupakan perusahaan yang memang harus tetap mulus dan rata. Untuk itu penting untuk dilakukan perbaikan atau perawatan pada area SPBU agar tidak terjadi kerusakan yang dapat membahayakan pengguna. Selain itu juga untuk kenyamanan pengguna kendaraan bermotor. Maka dari itu untuk menjaga kenyamanan pengguna dan kualitas aspal yang bagus, anda bisa melakukan perbaikan aspal secara berkala.",
            en: "Public Fuel Filling Stations — Public fuel filling stations, commonly called gas stations, are busy areas that must remain smooth and level. Therefore it is important to repair or maintain the gas station area to prevent damage that could endanger users, and also for the comfort of motorized vehicle users. So to maintain user comfort and good asphalt quality, you can do periodic asphalt repairs.",
          },
          {
            id: "Perbaikan Jalan Raya — Perbaikan jalan raya merupakan perbaikan jalan yang dilakukan oleh pemerintah untuk jalan umum yang banyak dilalui. Jalan raya merupakan akses utama untuk mobilitas masyarakat. Untuk itu penting untuk dilakukan perbaikan jalan agar tetap mulus dan nyaman dilalui. Perbaikan jalan raya biasanya dilakukan dengan metode pengaspalan ulang. Bila tidak segera diperbaiki, jalan raya yang rusak bisa membahayakan pengguna dan bisa memicu kecelakaan lalu lintas.",
            en: "Highway Repair — Highway repair is road work carried out by the government for busy public roads. Highways are the main access for public mobility. Therefore it is important to repair them so they remain smooth and comfortable. Highway repair is usually done using the re-paving method. If not repaired immediately, damaged highways can endanger users and trigger traffic accidents.",
          },
          {
            id: "Jalan Lingkungan — Lingkungan merupakan sarana paling kecil yang dijadikan objek perbaikan jalan. Lingkungan juga merupakan salah satu akses jalan yang banyak dilalui masyarakat. Untuk itu penting untuk dilakukan perbaikan jalan lingkungan agar tetap mulus dan nyaman dilalui. Perbaikan jalan lingkungan bisa dilakukan dengan metode pengaspalan ulang atau penambalan. Hal ini penting agar akses jalan lingkungan tetap bisa dilalui dengan nyaman.",
            en: "Neighborhood Roads — Neighborhood roads are the smallest unit of road repair work. They are also one of the access roads frequently used by the community. Therefore it is important to repair neighborhood roads so they remain smooth and comfortable. Repair can be done using re-paving or patching methods. This is important so that neighborhood road access remains comfortably passable.",
          },
          {
            id: "Jalan MHT — Jalan MHT merupakan salah satu jalan yang digunakan untuk lalu lintas pengendara sepeda motor. Jalan MHT biasanya digunakan sebagai jalur alternatif ketika jalan utama macet. Selain itu juga sebagai jalur alternatif ketika jalan utama sedang diperbaiki. Maka dari itu penting untuk dilakukan perbaikan jalan MHT agar tetap mulus dan nyaman dilalui. Perbaikan jalan MHT bisa dilakukan dengan metode pengaspalan ulang atau penambalan.",
            en: "MHT Roads — MHT roads are roads designated for motorcycle traffic. MHT roads are usually used as an alternative route when the main road is congested. They also serve as an alternative when the main road is under repair. Therefore it is important to repair MHT roads so they remain smooth and comfortable. Repair can be done using re-paving or patching methods.",
          },
        ],
      },
      {
        type: "paragraph",
        text: {
          id: "Itulah beberapa area perbaikan jalan aspal hotmix yang perlu diperhatikan. Semoga bermanfaat dan menambah wawasan anda. Untuk memenuhi kebutuhan perbaikan jalan aspal hotmix yang berkualitas dan terpercaya, anda bisa menghubungi kami. Kami melayani berbagai kebutuhan aspal hotmix seperti jasa pengaspalan, jual aspal hotmix, dan lain sebagainya. Kami melayani seluruh Indonesia dengan tim yang profesional dan berpengalaman.",
          en: "Those are several hotmix asphalt road repair areas that need attention. We hope this is useful and expands your insight. To meet your need for quality and trusted hotmix asphalt road repair, you can contact us. We serve various hotmix asphalt needs such as paving services, hotmix asphalt sales, and more. We serve all of Indonesia with a professional and experienced team.",
        },
      },
    ],
  },
  {
    slug: "pemasangan-kansteen",
    date: { id: "25 Oktober 2026", en: "October 25, 2026" },
    dateISO: "2026-10-25",
    src: "/proyek/pasang-kanstin.webp",
    category: { id: "Kanstin", en: "kanstin" },
    title: {
      id: "Jasa Pasang Kanstin Beton Jalan & Taman Rapi Presisi",
      en: "Precise Concrete Road & Garden Curb Installation Services",
    },
    desc: {
      id: "Layanan pemasangan kanstin DKI, taman, dan car stopper untuk pembatas jalan & trotoar. Pengerjaan rapi, kokoh, dan bergaransi di area Jabodetabek.",
      en: "DKI, garden, and car stopper curb installation services for road dividers & sidewalks. Neat, sturdy, and guaranteed workmanship in Greater Jakarta.",
    },
    author: {
      name: "PT. Tri Abadi Makmur Indonesia",
      phone: "082258089367",
      avatar: "/logo.webp",
      lastUpdated: { id: "5 Oktober 2026", en: "October 5, 2026" },
      bio: {
        id: "Tri Abadi Makmur merupakan perusahaan yang bergerak di bidang konstruksi, dengan pengalaman yang sudah bertahun – tahun kami kembangkan, tahapan proses yang mengedepankan kualitas dan kehati-hatian, serta eksekusi pengerjaan proyek yang signifikan, demi tercapainya kepuasan client sehingga terwujudnya jalinan kerjasama yang continue dan berkelanjutan.",
        en: "Tri Abadi Makmur is a construction company with years of experience we have developed, a process that prioritizes quality and prudence, as well as the execution of significant projects, in order to achieve client satisfaction so that continuous and long-term cooperation is realized.",
      },
    },
    tags: [
      { id: "Aspal Jalan Murah", en: "Affordable Asphalt Paving", slug: "aspal-jalan-murah" },
      { id: "Pekerjaan Aspal Hotmix", en: "Hotmix Asphalt Works", slug: "pekerjaan-aspal-hotmix" },
      { id: "Distributor Aspal", en: "Asphalt Distributor", slug: "distributor-aspal" },
      { id: "Perbaikan Jalan Aspal", en: "Asphalt Road Repair", slug: "perbaikan-jalan-aspal" },
      { id: "Aspal Jalan Murah Alternatif", en: "Affordable Asphalt Alternative", slug: "aspal-jalan-murah-2" },
      { id: "Pekerjaan Aspal Hotmix Alternatif", en: "Hotmix Asphalt Works Alternative", slug: "pekerjaan-aspal-hotmix-2" },
      { id: "Distributor Aspal Alternatif", en: "Asphalt Distributor Alternative", slug: "distributor-aspal-2" },
      { id: "Perbaikan Jalan Aspal Alternatif", en: "Asphalt Road Repair Alternative", slug: "perbaikan-jalan-aspal-2" },
      { id: "Pemasangan Paving Block", en: "Paving Block Installation", slug: "pemasangan-paving-block" },
      { id: "Pengaspalan Jalan Perumahan", en: "Residential Road Asphalt Paving", slug: "pengaspalan-jalan-perumahan" },
      { id: "Hotmix untuk Jalan Perkantoran", en: "Hotmix for Office Roads", slug: "hotmix-untuk-jalan-perkantoran" },
    ],
    body: [
      {
        type: "paragraph",
        text: {
          id: "Pemasangan kansteen — Kansteen (atau kanstin) adalah komponen penting dalam pembangunan jalan. Fungsinya sebagai pembatas antara jalan dan trotoar, serta mengarahkan aliran air agar tidak menggenang di badan jalan. Jika Anda membutuhkan <a href='/layanan/infrastruktur/pasang-kanstin' class='text-[#1e88e5] hover:underline font-semibold'>jasa pasang kanstin</a> yang rapi di area Jakarta, Tangerang, Bekasi, Depok & Bogor, PT Tri Abadi Makmur solusinya.",
          en: "Kansteen installation — Kansteen (or curb) is an important component in road construction. Its function is as a divider between the road and sidewalk, and directs water flow so it doesn't stagnate on the road body. If you need neat curb installation services in Jakarta, Tangerang, Bekasi, Depok & Bogor, PT Tri Abadi Makmur is the solution.",
        },
      },
      {
        type: "heading",
        text: {
          id: "Jenis-Jenis Kanstin yang Sering Digunakan",
          en: "Types of Curbs Commonly Used",
        },
      },
      {
        type: "list",
        ordered: false,
        items: [
          {
            id: "<strong>Kanstin DKI / Jalan:</strong> Ukuran standar untuk pembatas jalan raya, kokoh menahan benturan.",
            en: "<strong>DKI / Road Curbs:</strong> Standard size for highway dividers, sturdy against impacts.",
          },
          {
            id: "<strong>Kanstin Taman:</strong> Ukuran lebih kecil dan estetis, cocok untuk pembatas taman atau jalan setapak.",
            en: "<strong>Garden Curbs:</strong> Smaller and aesthetic size, suitable for garden or footpath dividers.",
          },
          {
            id: "<strong>Kanstin Car Stopper:</strong> Berfungsi sebagai pembatas ban mobil agar tidak melewati batas taman atau area parkir.",
            en: "<strong>Car Stopper Curbs:</strong> Functions as a car tire barrier so it doesn't cross the garden or parking area boundary.",
          },
          {
            id: "<strong>Kanstin S:</strong> Memiliki bentuk profil S, sering digunakan untuk trotoar dan jalan lingkungan.",
            en: "<strong>S Curbs:</strong> Has an S profile shape, often used for sidewalks and neighborhood roads.",
          },
        ],
      },
      {
        type: "paragraph",
        text: {
          id: "Untuk pemasangan kanstin yang rapi dan presisi, dibutuhkan tenaga ahli dan alat yang tepat. PT Tri Abadi Makmur telah berpengalaman dalam pemasangan kanstin untuk berbagai proyek perumahan, pabrik, dan jalan raya. Kami juga melayani <a href='/layanan/infrastruktur/pasang-paving-block' class='text-[#1e88e5] hover:underline font-semibold'>pemasangan paving block</a> untuk melengkapi trotoar Anda.",
          en: "For neat and precise curb installation, expert workers and the right tools are needed. PT Tri Abadi Makmur is experienced in curb installation for various residential, factory, and highway projects. We also provide paving block installation to complete your sidewalk.",
        },
      },
      {
        type: "paragraph",
        text: {
          id: "Hubungi kami sekarang untuk konsultasi dan survei lokasi gratis. Dapatkan harga kanstin terbaik untuk proyek Anda.",
          en: "Contact us now for free consultation and site survey. Get the best curb price for your project.",
        },
      },
    ],
  },
  {
    slug: "aspal-jalan-murah-2",
    date: { id: "25 Oktober 2026", en: "October 25, 2026" },
    dateISO: "2026-10-25",
    src: "/proyek/proyek-30.webp",
    category: { id: "Pengaspalan", en: "Asphalt Paving" },
    title: {
      id: "3 Cara Hemat Biaya Pengaspalan Jalan Tanpa Turun Mutu",
      en: "3 Ways to Cut Road Paving Costs Without Sacrificing Quality",
    },
    desc: {
      id: "Ingin menghemat anggaran pengaspalan jalan lingkungan atau parkir? Simak trik memilih ketebalan hotmix dan waktu pengerjaan yang tepat dari ahlinya.",
      en: "Want to save on residential or parking lot paving budgets? Learn expert tricks on choosing hotmix thickness and optimal timing.",
    },
    author: {
      name: "PT. Tri Abadi Makmur Indonesia",
      phone: "082258089367",
      avatar: "/logo.webp",
      lastUpdated: { id: "5 Oktober 2026", en: "October 5, 2026" },
      bio: {
        id: "Tri Abadi Makmur merupakan perusahaan yang bergerak di bidang konstruksi, dengan pengalaman yang sudah bertahun – tahun kami kembangkan, tahapan proses yang mengedepankan kualitas dan kehati-hatian, serta eksekusi pengerjaan proyek yang signifikan, demi tercapainya kepuasan client sehingga terwujudnya jalinan kerjasama yang continue dan berkelanjutan.",
        en: "Tri Abadi Makmur is a construction company with years of experience we have developed, a process that prioritizes quality and prudence, as well as the execution of significant projects, in order to achieve client satisfaction so that continuous and long-term cooperation is realized.",
      },
    },
    tags: [
      { id: "Aspal Jalan Murah", en: "Affordable Asphalt Paving", slug: "aspal-jalan-murah" },
      { id: "Pekerjaan Aspal Hotmix", en: "Hotmix Asphalt Works", slug: "pekerjaan-aspal-hotmix" },
      { id: "Distributor Aspal", en: "Asphalt Distributor", slug: "distributor-aspal" },
      { id: "Perbaikan Jalan Aspal", en: "Asphalt Road Repair", slug: "perbaikan-jalan-aspal" },
      { id: "Pemasangan Kansteen", en: "Kansteen Installation", slug: "pemasangan-kansteen" },
      { id: "Pekerjaan Aspal Hotmix Alternatif", en: "Hotmix Asphalt Works Alternative", slug: "pekerjaan-aspal-hotmix-2" },
      { id: "Distributor Aspal Alternatif", en: "Asphalt Distributor Alternative", slug: "distributor-aspal-2" },
      { id: "Perbaikan Jalan Aspal Alternatif", en: "Asphalt Road Repair Alternative", slug: "perbaikan-jalan-aspal-2" },
      { id: "Pemasangan Paving Block", en: "Paving Block Installation", slug: "pemasangan-paving-block" },
      { id: "Pengaspalan Jalan Perumahan", en: "Residential Road Asphalt Paving", slug: "pengaspalan-jalan-perumahan" },
      { id: "Hotmix untuk Jalan Perkantoran", en: "Hotmix for Office Roads", slug: "hotmix-untuk-jalan-perkantoran" },
    ],
    body: [
      {
        type: "paragraph",
        text: {
          id: "Aspal Jalan Murah Alternatif — Banyak orang menganggap pengaspalan jalan itu mahal. Padahal, dengan strategi yang tepat, Anda bisa mendapatkan aspal jalan murah tanpa mengurangi kualitas. Jika Anda sedang mencari <a href='/layanan/infrastruktur/pengaspalan' class='text-[#1e88e5] hover:underline font-semibold'>jasa pengaspalan murah</a> di area Jabodetabek & sekitarnya, berikut adalah tips hemat dari PT Tri Abadi Makmur.",
          en: "Affordable Asphalt Alternative — Many people think road paving is expensive. In fact, with the right strategy, you can get cheap asphalt roads without reducing quality. If you are looking for affordable paving services in Greater Jakarta & surrounding areas, here are saving tips from PT Tri Abadi Makmur.",
        },
      },
      {
        type: "heading",
        text: {
          id: "Cara Menghemat Biaya Pengaspalan Jalan",
          en: "How to Save on Road Paving Costs",
        },
      },
      {
        type: "list",
        ordered: true,
        items: [
          {
            id: "<strong>Pilih Jenis Aspal yang Tepat:</strong> Untuk jalan lingkungan, aspal hotmix tipis (3-4 cm) sudah cukup. Tidak perlu menggunakan spesifikasi jalan tol yang jauh lebih mahal.",
            en: "<strong>Choose the Right Asphalt Type:</strong> For neighborhood roads, thin hotmix asphalt (3-4 cm) is sufficient. No need to use toll road specifications which are much more expensive.",
          },
          {
            id: "<strong>Lakukan Perbaikan Sejak Dini:</strong> Menambal lubang kecil jauh lebih murah daripada membongkar dan mengaspal ulang seluruh jalan yang sudah rusak parah.",
            en: "<strong>Repair Early:</strong> Patching small potholes is much cheaper than dismantling and re-paving an entire severely damaged road.",
          },
          {
            id: "<strong>Gabungkan dengan Proyek Tetangga:</strong> Jika area di sekitar Anda juga membutuhkan pengaspalan, mengerjakannya bersamaan (satu alat berat) bisa menekan biaya mobilisasi.",
            en: "<strong>Combine with Neighbor Projects:</strong> If the surrounding area also needs paving, doing it together (one heavy equipment) can reduce mobilization costs.",
          },
        ],
      },
      {
        type: "paragraph",
        text: {
          id: "Untuk melihat perbandingan harga yang lebih detail, Anda bisa membaca artikel kami tentang <a href='/blog/biaya-aspal-per-meter' class='text-[#1e88e5] hover:underline font-semibold'>Biaya Aspal Per Meter</a>.",
          en: "To see a more detailed price comparison, you can read our article on Asphalt Cost Per Meter.",
        },
      },
      {
        type: "paragraph",
        text: {
          id: "PT Tri Abadi Makmur menawarkan harga aspal jalan murah dengan material berkualitas. Dapatkan penawaran terbaik hari ini dengan menghubungi kami via WhatsApp.",
          en: "PT Tri Abadi Makmur offers cheap asphalt road prices with quality materials. Get the best offer today by contacting us via WhatsApp.",
        },
      },
    ],
  },
  {
    slug: "pekerjaan-aspal-hotmix-2",
    date: { id: "25 Oktober 2026", en: "October 25, 2026" },
    dateISO: "2026-10-25",
    src: "/proyek/proyek-31.webp",
    category: { id: "Hotmix", en: "Hotmix" },
    title: {
      id: "5 Tahapan Metode Kerja Pengaspalan Hotmix Agar Awet",
      en: "5 Stages of Hotmix Asphalt Paving Methods for Durability",
    },
    desc: {
      id: "Ketahui standar metode kerja pengaspalan hotmix mulai dari pemadatan subgrade, prime coat, hingga finishing tandem roller agar jalan tidak cepat rusak.",
      en: "Learn standard hotmix paving work methods from subgrade compaction and prime coat to tandem roller finishing so roads stay durable.",
    },
    author: {
      name: "PT. Tri Abadi Makmur Indonesia",
      phone: "082258089367",
      avatar: "/logo.webp",
      lastUpdated: { id: "5 Oktober 2026", en: "October 5, 2026" },
      bio: {
        id: "Tri Abadi Makmur merupakan perusahaan yang bergerak di bidang konstruksi, dengan pengalaman yang sudah bertahun – tahun kami kembangkan, tahapan proses yang mengedepankan kualitas dan kehati-hatian, serta eksekusi pengerjaan proyek yang signifikan, demi tercapainya kepuasan client sehingga terwujudnya jalinan kerjasama yang continue dan berkelanjutan.",
        en: "Tri Abadi Makmur is a construction company with years of experience we have developed, a process that prioritizes quality and prudence, as well as the execution of significant projects, in order to achieve client satisfaction so that continuous and long-term cooperation is realized.",
      },
    },
    tags: [
      { id: "Aspal Jalan Murah", en: "Affordable Asphalt Paving", slug: "aspal-jalan-murah" },
      { id: "Pekerjaan Aspal Hotmix", en: "Hotmix Asphalt Works", slug: "pekerjaan-aspal-hotmix" },
      { id: "Distributor Aspal", en: "Asphalt Distributor", slug: "distributor-aspal" },
      { id: "Perbaikan Jalan Aspal", en: "Asphalt Road Repair", slug: "perbaikan-jalan-aspal" },
      { id: "Pemasangan Kansteen", en: "Kansteen Installation", slug: "pemasangan-kansteen" },
      { id: "Aspal Jalan Murah Alternatif", en: "Affordable Asphalt Alternative", slug: "aspal-jalan-murah-2" },
      { id: "Distributor Aspal Alternatif", en: "Asphalt Distributor Alternative", slug: "distributor-aspal-2" },
      { id: "Perbaikan Jalan Aspal Alternatif", en: "Asphalt Road Repair Alternative", slug: "perbaikan-jalan-aspal-2" },
      { id: "Pemasangan Paving Block", en: "Paving Block Installation", slug: "pemasangan-paving-block" },
      { id: "Pengaspalan Jalan Perumahan", en: "Residential Road Asphalt Paving", slug: "pengaspalan-jalan-perumahan" },
      { id: "Hotmix untuk Jalan Perkantoran", en: "Hotmix for Office Roads", slug: "hotmix-untuk-jalan-perkantoran" },
    ],
    body: [
      {
        type: "paragraph",
        text: {
          id: "Pekerjaan Aspal Hotmix Alternatif — Kualitas jalan sangat bergantung pada metode dan spesifikasi pengerjaannya. Jika Anda mencari kontraktor yang menerapkan standar tinggi untuk <a href='/layanan/infrastruktur/pengaspalan' class='text-[#1e88e5] hover:underline font-semibold'>pekerjaan aspal hotmix</a> di area Jabodetabek, Banten & Jawa Barat, PT Tri Abadi Makmur adalah pilihan tepat. Kami tidak hanya mengandalkan alat berat modern, tetapi juga kepatuhan pada setiap tahapan spesifikasi teknis.",
          en: "Hotmix Asphalt Work Alternative — Road quality heavily depends on the method and specifications of the work. If you are looking for a contractor that applies high standards for hotmix asphalt works in Greater Jakarta, Banten & West Java, PT Tri Abadi Makmur is the right choice. We not only rely on modern heavy equipment but also compliance with every stage of technical specifications.",
        },
      },
      {
        type: "heading",
        text: {
          id: "Tahapan Metode Kerja Aspal Hotmix",
          en: "Hotmix Asphalt Work Method Stages",
        },
      },
      {
        type: "paragraph",
        text: {
          id: "Agar hasil maksimal, tim PT Tri Abadi Makmur selalu mengikuti prosedur standar berikut:",
          en: "To get maximum results, the PT Tri Abadi Makmur team always follows these standard procedures:",
        },
      },
      {
        type: "list",
        ordered: true,
        items: [
          {
            id: "<strong>Persiapan Lahan:</strong> Pembersihan area dari material lepas dan pemadatan tanah dasar (subgrade) agar tidak amblas.",
            en: "<strong>Land Preparation:</strong> Cleaning the area from loose material and compacting the subgrade so it doesn't sink.",
          },
          {
            id: "<strong>Lapisan Pondasi (Base Course):</strong> Penghamparan batu makadam atau sirtu yang dipadatkan sebagai penopang utama beban kendaraan.",
            en: "<strong>Base Course Layer:</strong> Spreading macadam stone or sirtu that is compacted as the main support for vehicle loads.",
          },
          {
            id: "<strong>Lapisan Perekat (Prime Coat / Tack Coat):</strong> Penyemprotan aspal cair (emulsi) agar lapisan hotmix menempel sempurna pada pondasi.",
            en: "<strong>Binder Layer (Prime Coat / Tack Coat):</strong> Spraying liquid asphalt (emulsion) so the hotmix layer adheres perfectly to the foundation.",
          },
          {
            id: "<strong>Penghamparan Hotmix (Asphalt Finisher):</strong> Aspal panas dihampar dengan ketebalan merata menggunakan mesin khusus, bukan tenaga manual, agar hasilnya rata.",
            en: "<strong>Hotmix Spreading (Asphalt Finisher):</strong> Hot asphalt is spread with even thickness using a special machine, not manual labor, so the result is flat.",
          },
          {
            id: "<strong>Pemadatan (Tandem Roller):</strong> Pemadatan awal dan akhir menggunakan alat berat agar aspal benar-benar padat dan tidak keropos.",
            en: "<strong>Compaction (Tandem Roller):</strong> Initial and final compaction using heavy equipment so the asphalt is truly dense and not porous.",
          },
        ],
      },
      {
        type: "paragraph",
        text: {
          id: "Ingin melihat daftar harga untuk metode pekerjaan di atas? Anda bisa membaca artikel kami tentang <a href='/blog/harga-aspal-hotmix' class='text-[#1e88e5] hover:underline font-semibold'>Harga Aspal Hotmix</a>.",
          en: "Want to see the price list for the work methods above? You can read our article on Hotmix Asphalt Prices.",
        },
      },
      {
        type: "paragraph",
        text: {
          id: "Punya proyek jalan yang membutuhkan spesifikasi khusus? Hubungi kami sekarang untuk konsultasi teknis dan survei lokasi gratis.",
          en: "Have a road project that requires special specifications? Contact us now for technical consultation and free site survey.",
        },
      },
    ],
  },
  {
    slug: "distributor-aspal-2",
    date: { id: "25 Oktober 2026", en: "October 25, 2026" },
    dateISO: "2026-10-25",
    src: "/proyek/proyek-55.webp",
    category: { id: "Distributor", en: "Distributor" },
    title: {
      id: "4 Kriteria Memilih Supplier & Distributor Aspal Proyek",
      en: "4 Criteria for Choosing a Project Asphalt Supplier & Distributor",
    },
    desc: {
      id: "Hindari proyek molor akibat pasokan terlambat. Pelajari cara menilai kualitas material dan kapasitas armada distributor aspal terpercaya di Jabodetabek.",
      en: "Avoid project delays from late material deliveries. Learn how to evaluate material quality and fleet capacity of trusted asphalt distributors in Greater Jakarta.",
    },
    author: {
      name: "PT. Tri Abadi Makmur Indonesia",
      phone: "082258089367",
      avatar: "/logo.webp",
      lastUpdated: { id: "5 Oktober 2026", en: "October 5, 2026" },
      bio: {
        id: "Tri Abadi Makmur merupakan perusahaan yang bergerak di bidang konstruksi, dengan pengalaman yang sudah bertahun – tahun kami kembangkan, tahapan proses yang mengedepankan kualitas dan kehati-hatian, serta eksekusi pengerjaan proyek yang signifikan, demi tercapainya kepuasan client sehingga terwujudnya jalinan kerjasama yang continue dan berkelanjutan.",
        en: "Tri Abadi Makmur is a construction company with years of experience we have developed, a process that prioritizes quality and prudence, as well as the execution of significant projects, in order to achieve client satisfaction so that continuous and long-term cooperation is realized.",
      },
    },
    tags: [
      { id: "Aspal Jalan Murah", en: "Affordable Asphalt Paving", slug: "aspal-jalan-murah" },
      { id: "Pekerjaan Aspal Hotmix", en: "Hotmix Asphalt Works", slug: "pekerjaan-aspal-hotmix" },
      { id: "Distributor Aspal", en: "Asphalt Distributor", slug: "distributor-aspal" },
      { id: "Perbaikan Jalan Aspal", en: "Asphalt Road Repair", slug: "perbaikan-jalan-aspal" },
      { id: "Pemasangan Kansteen", en: "Kansteen Installation", slug: "pemasangan-kansteen" },
      { id: "Aspal Jalan Murah Alternatif", en: "Affordable Asphalt Alternative", slug: "aspal-jalan-murah-2" },
      { id: "Pekerjaan Aspal Hotmix Alternatif", en: "Hotmix Asphalt Works Alternative", slug: "pekerjaan-aspal-hotmix-2" },
      { id: "Perbaikan Jalan Aspal Alternatif", en: "Asphalt Road Repair Alternative", slug: "perbaikan-jalan-aspal-2" },
      { id: "Pemasangan Paving Block", en: "Paving Block Installation", slug: "pemasangan-paving-block" },
      { id: "Pengaspalan Jalan Perumahan", en: "Residential Road Asphalt Paving", slug: "pengaspalan-jalan-perumahan" },
      { id: "Hotmix untuk Jalan Perkantoran", en: "Hotmix for Office Roads", slug: "hotmix-untuk-jalan-perkantoran" },
    ],
    body: [
      {
        type: "paragraph",
        text: {
          id: "Distributor Aspal Alternatif — Memilih mitra distributor aspal tidak boleh sembarangan. Pasokan material yang terlambat atau kualitas aspal yang buruk bisa menggagalkan seluruh proyek konstruksi Anda. Jika Anda sedang mencari mitra penyedia aspal untuk proyek di area Jabodetabek & sekitarnya, PT Tri Abadi Makmur menawarkan kerja sama yang saling menguntungkan. Lihat juga <a href='/supplier' class='text-[#1e88e5] hover:underline font-semibold'>halaman Supplier</a> kami.",
          en: "Asphalt Distributor Alternative — Choosing an asphalt distributor partner cannot be done carelessly. Late material supply or poor asphalt quality can ruin your entire construction project. If you are looking for an asphalt supply partner for a project in Greater Jakarta & surrounding areas, PT Tri Abadi Makmur offers mutually beneficial cooperation. Also see our Supplier page.",
        },
      },
      {
        type: "heading",
        text: {
          id: "Kriteria Mitra Distributor Aspal yang Baik",
          en: "Criteria for a Good Asphalt Distributor Partner",
        },
      },
      {
        type: "list",
        ordered: true,
        items: [
          {
            id: "<strong>Konsistensi Kualitas:</strong> Pastikan aspal yang dipasok selalu memiliki spesifikasi yang sama di setiap pengiriman.",
            en: "<strong>Quality Consistency:</strong> Ensure the asphalt supplied always has the same specifications in every delivery.",
          },
          {
            id: "<strong>Kemampuan Suplai Skala Besar:</strong> Untuk proyek jalan raya, Anda butuh distributor yang mampu menyuplai aspal dalam jumlah besar secara berkelanjutan.",
            en: "<strong>Large-Scale Supply Capability:</strong> For highway projects, you need a distributor capable of supplying asphalt in large quantities sustainably.",
          },
          {
            id: "<strong>Layanan Purna Jual:</strong> Distributor yang baik akan membantu Anda jika ada kendala teknis terkait material aspal yang digunakan.",
            en: "<strong>After-Sales Service:</strong> A good distributor will help you if there are technical issues related to the asphalt material used.",
          },
        ],
      },
      {
        type: "paragraph",
        text: {
          id: "Selain menyediakan material aspal, PT Tri Abadi Makmur juga merupakan kontraktor yang menyediakan <a href='/layanan/infrastruktur/pengaspalan' class='text-[#1e88e5] hover:underline font-semibold'>jasa pengaspalan</a>. Ini memudahkan Anda karena semua kebutuhan proyek jalan bisa ditangani oleh satu perusahaan yang sama.",
          en: "Besides providing asphalt materials, PT Tri Abadi Makmur is also a contractor providing paving services. This makes it easier for you because all road project needs can be handled by the same company.",
        },
      },
      {
        type: "paragraph",
        text: {
          id: "Butuh mitra distribusi aspal yang andal? Hubungi PT Tri Abadi Makmur sekarang untuk konsultasi dan kerja sama jangka panjang.",
          en: "Need a reliable asphalt distribution partner? Contact PT Tri Abadi Makmur now for consultation and long-term cooperation.",
        },
      },
    ],
  },
  {
    slug: "perbaikan-jalan-aspal-2",
    date: { id: "1 November 2026", en: "November 1, 2026" },
    dateISO: "2026-11-01",
    src: "/proyek/proyek-21.webp",
    category: { id: "Pengaspalan", en: "Asphalt Paving" },
    title: {
      id: "Metode Perbaikan Jalan Aspal: Patching vs Overlay",
      en: "Asphalt Road Repair Methods: Patching vs Overlay",
    },
    desc: {
      id: "Bingung memilih tambal sulam atau pelapisan ulang (overlay)? Pahami metode perbaikan jalan aspal yang paling tepat sesuai tingkat kerusakan lapangan.",
      en: "Unsure whether to choose patching or resurfacing (overlay)? Understand the right asphalt road repair method based on actual field damage.",
    },
    author: {
      name: "PT. Tri Abadi Makmur Indonesia",
      phone: "082258089367",
      avatar: "/logo.webp",
      lastUpdated: { id: "5 Oktober 2026", en: "October 5, 2026" },
      bio: {
        id: "Tri Abadi Makmur merupakan perusahaan yang bergerak di bidang konstruksi, dengan pengalaman yang sudah bertahun – tahun kami kembangkan, tahapan proses yang mengedepankan kualitas dan kehati-hatian, serta eksekusi pengerjaan proyek yang signifikan, demi tercapainya kepuasan client sehingga terwujudnya jalinan kerjasama yang continue dan berkelanjutan.",
        en: "Tri Abadi Makmur is a construction company with years of experience we have developed, a process that prioritizes quality and prudence, as well as the execution of significant projects, in order to achieve client satisfaction so that continuous and long-term cooperation is realized.",
      },
    },
    tags: [
      { id: "Aspal Jalan Murah", en: "Affordable Asphalt Paving", slug: "aspal-jalan-murah" },
      { id: "Pekerjaan Aspal Hotmix", en: "Hotmix Asphalt Works", slug: "pekerjaan-aspal-hotmix" },
      { id: "Distributor Aspal", en: "Asphalt Distributor", slug: "distributor-aspal" },
      { id: "Perbaikan Jalan Aspal", en: "Asphalt Road Repair", slug: "perbaikan-jalan-aspal" },
      { id: "Pemasangan Kansteen", en: "Kansteen Installation", slug: "pemasangan-kansteen" },
      { id: "Aspal Jalan Murah Alternatif", en: "Affordable Asphalt Alternative", slug: "aspal-jalan-murah-2" },
      { id: "Pekerjaan Aspal Hotmix Alternatif", en: "Hotmix Asphalt Works Alternative", slug: "pekerjaan-aspal-hotmix-2" },
      { id: "Distributor Aspal Alternatif", en: "Asphalt Distributor Alternative", slug: "distributor-aspal-2" },
      { id: "Pemasangan Paving Block", en: "Paving Block Installation", slug: "pemasangan-paving-block" },
      { id: "Pengaspalan Jalan Perumahan", en: "Residential Road Asphalt Paving", slug: "pengaspalan-jalan-perumahan" },
      { id: "Hotmix untuk Jalan Perkantoran", en: "Hotmix for Office Roads", slug: "hotmix-untuk-jalan-perkantoran" },
    ],
    body: [
      {
        type: "paragraph",
        text: {
          id: "Perbaikan Jalan Aspal Alternatif — Jalan yang rusak tidak bisa hanya ditambal dengan aspal dingin biasa. Agar perbaikan bertahan lama, dibutuhkan metode yang tepat sesuai tingkat kerusakannya. Jika Anda mencari <a href='/layanan/infrastruktur/pengaspalan' class='text-[#1e88e5] hover:underline font-semibold'>jasa perbaikan jalan aspal</a> yang menerapkan metode profesional di area Jakarta, Tangerang, Bekasi, Depok & Bogor, PT Tri Abadi Makmur siap membantu.",
          en: "Asphalt Road Repair Alternative — A damaged road cannot just be patched with ordinary cold asphalt. For repairs to last long, the right method is needed according to the level of damage. If you are looking for asphalt road repair services that apply professional methods in Jakarta, Tangerang, Bekasi, Depok & Bogor, PT Tri Abadi Makmur is ready to help.",
        },
      },
      {
        type: "heading",
        text: {
          id: "Metode Perbaikan Jalan Aspal Berdasarkan Kerusakan",
          en: "Asphalt Road Repair Methods Based on Damage",
        },
      },
      {
        type: "list",
        ordered: true,
        items: [
          {
            id: "<strong>Metode Penambalan (Patching):</strong> Untuk lubang kecil. Area lubang dibersihkan, dipotong rapi, diberi perekat (tack coat), lalu diisi aspal hotmix dan dipadatkan.",
            en: "<strong>Patching Method:</strong> For small potholes. The hole area is cleaned, cut neatly, given a binder (tack coat), then filled with hotmix asphalt and compacted.",
          },
          {
            id: "<strong>Metode Pelapisan Ulang (Overlay):</strong> Untuk jalan yang retak merata tapi masih kokoh. Aspal lama dibersihkan, lalu dihampar lapisan aspal hotmix baru di atasnya.",
            en: "<strong>Overlay Method:</strong> For roads that are evenly cracked but still solid. The old asphalt is cleaned, then a new layer of hotmix asphalt is spread over it.",
          },
          {
            id: "<strong>Metode Pembongkaran (Rekonstruksi):</strong> Untuk jalan yang amblas parah atau berlumpur. Aspal lama dibongkar, tanah dasar dipadatkan ulang, lalu diaspal dari nol.",
            en: "<strong>Demolition Method (Reconstruction):</strong> For roads that are severely sunken or muddy. The old asphalt is dismantled, the subgrade is re-compacted, then paved from scratch.",
          },
        ],
      },
      {
        type: "paragraph",
        text: {
          id: "Untuk mengetahui estimasi biaya dari masing-masing metode di atas, Anda bisa membaca panduan lengkap di artikel kami tentang <a href='/blog/biaya-aspal-per-meter' class='text-[#1e88e5] hover:underline font-semibold'>Biaya Aspal Per Meter</a>.",
          en: "To find out the estimated cost of each method above, you can read the complete guide in our article on Asphalt Cost Per Meter.",
        },
      },
      {
        type: "paragraph",
        text: {
          id: "Jangan biarkan jalan rusak membahayakan pengguna. Konsultasikan jenis kerusakan jalan Anda dan dapatkan solusi perbaikan terbaik dari PT Tri Abadi Makmur. Hubungi kami via WhatsApp sekarang.",
          en: "Do not let damaged roads endanger users. Consult your road damage type and get the best repair solution from PT Tri Abadi Makmur. Contact us via WhatsApp now.",
        },
      },
    ],
  },
  {
    slug: "pemasangan-paving-block",
    date: { id: "25 Oktober 2026", en: "October 25, 2026" },
    dateISO: "2026-10-25",
    src: "/proyek/proyek-36.webp",
    category: { id: "Paving", en: "Paving" },
    title: {
      id: "Jasa Pasang Paving Block Halaman & Parkir (Harga/m²)",
      en: "Paving Block Installation for Yards & Parking (Price/m²)",
    },
    desc: {
      id: "Pasang paving block rapi, kuat menahan beban kendaraan, dan bebas genangan. Cek tahapan pemasangan serta kisaran harga per meter di Jabodetabek.",
      en: "Neat paving block installation, strong enough for vehicle loads, and puddle-free. Check installation stages and price per square meter in Greater Jakarta.",
    },
    author: {
      name: "PT. Tri Abadi Makmur Indonesia",
      phone: "082258089367",
      avatar: "/logo.webp",
      lastUpdated: { id: "25 Oktober 2026", en: "October 25, 2026" },
      bio: {
        id: "Tri Abadi Makmur merupakan perusahaan yang bergerak di bidang konstruksi, dengan pengalaman yang sudah bertahun – tahun kami kembangkan, tahapan proses yang mengedepankan kualitas dan kehati-hatian, serta eksekusi pengerjaan proyek yang signifikan, demi tercapainya kepuasan client sehingga terwujudnya jalinan kerjasama yang continue dan berkelanjutan.",
        en: "Tri Abadi Makmur is a construction company with years of experience we have developed, a process that prioritizes quality and prudence, as well as the execution of significant projects, in order to achieve client satisfaction so that continuous and long-term cooperation is realized.",
      },
    },
    tags: [
      { id: "Aspal Jalan Murah", en: "Affordable Asphalt Paving", slug: "aspal-jalan-murah" },
      { id: "Pekerjaan Aspal Hotmix", en: "Hotmix Asphalt Works", slug: "pekerjaan-aspal-hotmix" },
      { id: "Distributor Aspal", en: "Asphalt Distributor", slug: "distributor-aspal" },
      { id: "Perbaikan Jalan Aspal", en: "Asphalt Road Repair", slug: "perbaikan-jalan-aspal" },
      { id: "Pemasangan Kansteen", en: "Kansteen Installation", slug: "pemasangan-kansteen" },
      { id: "Aspal Jalan Murah Alternatif", en: "Affordable Asphalt Alternative", slug: "aspal-jalan-murah-2" },
      { id: "Pekerjaan Aspal Hotmix Alternatif", en: "Hotmix Asphalt Works Alternative", slug: "pekerjaan-aspal-hotmix-2" },
      { id: "Distributor Aspal Alternatif", en: "Asphalt Distributor Alternative", slug: "distributor-aspal-2" },
      { id: "Perbaikan Jalan Aspal Alternatif", en: "Asphalt Road Repair Alternative", slug: "perbaikan-jalan-aspal-2" },
      { id: "Pengaspalan Jalan Perumahan", en: "Residential Road Asphalt Paving", slug: "pengaspalan-jalan-perumahan" },
      { id: "Hotmix untuk Jalan Perkantoran", en: "Hotmix for Office Roads", slug: "hotmix-untuk-jalan-perkantoran" },
    ],
    body: [
      {
        type: "paragraph",
        text: {
          id: "Pemasangan paving block adalah pilihan tepat untuk halaman, area parkir, dan trotoar. Selain rapi, paving block juga mudah dipasang dan tahan lama. Jika Anda sedang mencari <a href='/layanan/infrastruktur/pasang-paving-block' class='text-[#1e88e5] hover:underline font-semibold'>jasa pasang paving block</a> di Jabodetabek & sekitarnya, PT Tri Abadi Makmur menawarkan pemasangan yang rapi, presisi, dan tentunya bergaransi.",
          en: "Paving block installation is the right choice for yards, parking areas, and sidewalks. Besides looking neat, paving blocks are also easy to install and durable. If you are looking for paving block installation services in Greater Jakarta & surrounding areas, PT Tri Abadi Makmur offers neat, precise, and guaranteed installation.",
        },
      },
      {
        type: "heading",
        text: {
          id: "Mengapa Memilih Paving Block untuk Halaman Anda?",
          en: "Why Choose Paving Block for Your Yard?",
        },
      },
      {
        type: "paragraph",
        text: {
          id: "Banyak orang beralih dari cor beton ke paving block karena beberapa alasan kuat. Salah satunya adalah kemampuan resapan air. Paving block memiliki celah yang memungkinkan air hujan meresap ke tanah, sehingga mengurangi risiko genangan (banjir) di halaman Anda. Selain itu, paving block lebih mudah diperbaiki jika ada bagian yang rusak tanpa harus membongkar seluruh area.",
          en: "Many people switch from concrete to paving blocks for several strong reasons. One of them is water absorption capability. Paving blocks have gaps that allow rainwater to seep into the soil, reducing the risk of puddles in your yard. Besides that, paving blocks are easier to repair if there is damage without having to dismantle the entire area.",
        },
      },
      {
        type: "heading",
        text: {
          id: "Tahapan Pemasangan Paving Block yang Benar",
          en: "Proper Paving Block Installation Stages",
        },
      },
      {
        type: "list",
        ordered: true,
        items: [
          {
            id: "<strong>Pengukuran & Pembersihan Area:</strong> Menentukan area dan membersihkan tanah dari rumput liar atau batu.",
            en: "<strong>Measurement & Area Cleaning:</strong> Determining the area and clearing the land from weeds or rocks.",
          },
          {
            id: "<strong>Pemadatan Tanah Dasar:</strong> Tanah dipadatkan menggunakan alat (stamper) agar tidak bergelombang.",
            en: "<strong>Base Soil Compaction:</strong> The soil is compacted using a tool (stamper) so it doesn't become wavy.",
          },
          {
            id: "<strong>Lapisan Pasir/Abu Batu:</strong> Menghamparkan pasir setebal 5-10 cm sebagai bantalan paving.",
            en: "<strong>Sand/Stone Dust Layer:</strong> Spreading 5-10 cm thick sand as a paving cushion.",
          },
          {
            id: "<strong>Pemasangan Paving:</strong> Paving disusun sesuai motif (bata, cacing, atau hexagon) dengan rapi.",
            en: "<strong>Paving Installation:</strong> Paving is arranged neatly according to the pattern.",
          },
          {
            id: "<strong>Pengisian Celah & Pemadatan:</strong> Celah diisi abu batu, lalu dipadatkan dengan baby roller agar saling mengunci.",
            en: "<strong>Filling Gaps & Compaction:</strong> Gaps are filled with stone dust, then compacted with a baby roller to interlock.",
          },
        ],
      },
      {
        type: "heading",
        text: {
          id: "Berapa Harga Pemasangan Paving Block?",
          en: "How Much Does Paving Block Installation Cost?",
        },
      },
      {
        type: "paragraph",
        text: {
          id: "Harga pemasangan paving block berkisar antara Rp 100.000 hingga Rp 200.000 per meter persegi, tergantung pada ketebalan paving, motif, dan luas area. Untuk pemasangan kanstin sebagai pembatas, Anda bisa membaca artikel kami tentang <a href='/blog/pemasangan-kansteen' class='text-[#1e88e5] hover:underline font-semibold'>Pemasangan Kansteen</a>.",
          en: "Paving block installation costs range from Rp 100,000 to Rp 200,000 per square meter, depending on the paving thickness, pattern, and area size. For curb installation as a divider, you can read our article on Kansteen Installation.",
        },
      },
      {
        type: "paragraph",
        text: {
          id: "Percayakan kebutuhan paving block Anda kepada ahlinya. Hubungi PT Tri Abadi Makmur sekarang untuk konsultasi gratis dan survei lokasi. Kami melayani seluruh area Tangerang, Jakarta, Bekasi, Depok, dan Bogor.",
          en: "Entrust your paving block needs to the experts. Contact PT Tri Abadi Makmur now for free consultation and site survey. We serve the entire Tangerang, Jakarta, Bekasi, Depok, and Bogor areas.",
        },
      },
    ],
  },
  {
    slug: "pengaspalan-jalan-perumahan",
    date: { id: "1 November 2026", en: "November 1, 2026" },
    dateISO: "2026-11-01",
    src: "/proyek/proyek-56.webp",
    category: { id: "Pengaspalan", en: "Asphalt Paving" },
    title: {
      id: "Jasa Pengaspalan Jalan Perumahan & Komplek Bergaransi",
      en: "Guaranteed Residential & Housing Complex Road Paving Services",
    },
    desc: {
      id: "Tingkatkan kenyamanan warga dan nilai properti dengan jalan perumahan yang mulus & bebas genangan. Kontraktor aspal hotmix berpengalaman di Jabodetabek.",
      en: "Boost resident comfort and property value with smooth, puddle-free residential roads. Experienced hotmix asphalt contractor across Greater Jakarta.",
    },
    author: {
      name: "PT. Tri Abadi Makmur Indonesia",
      phone: "082258089367",
      avatar: "/logo.webp",
      lastUpdated: { id: "1 November 2026", en: "November 1, 2026" },
      bio: {
        id: "Tri Abadi Makmur merupakan perusahaan yang bergerak di bidang konstruksi, dengan pengalaman yang sudah bertahun – tahun kami kembangkan, tahapan proses yang mengedepankan kualitas dan kehati-hatian, serta eksekusi pengerjaan proyek yang signifikan, demi tercapainya kepuasan client sehingga terwujudnya jalinan kerjasama yang continue dan berkelanjutan.",
        en: "Tri Abadi Makmur is a construction company with years of experience we have developed, a process that prioritizes quality and prudence, as well as the execution of significant projects, in order to achieve client satisfaction so that continuous and long-term cooperation is realized.",
      },
    },
    tags: [
      { id: "Aspal Jalan Murah", en: "Affordable Asphalt Paving", slug: "aspal-jalan-murah" },
      { id: "Pekerjaan Aspal Hotmix", en: "Hotmix Asphalt Works", slug: "pekerjaan-aspal-hotmix" },
      { id: "Distributor Aspal", en: "Asphalt Distributor", slug: "distributor-aspal" },
      { id: "Perbaikan Jalan Aspal", en: "Asphalt Road Repair", slug: "perbaikan-jalan-aspal" },
      { id: "Pemasangan Kansteen", en: "Kansteen Installation", slug: "pemasangan-kansteen" },
      { id: "Aspal Jalan Murah Alternatif", en: "Affordable Asphalt Alternative", slug: "aspal-jalan-murah-2" },
      { id: "Pekerjaan Aspal Hotmix Alternatif", en: "Hotmix Asphalt Works Alternative", slug: "pekerjaan-aspal-hotmix-2" },
      { id: "Distributor Aspal Alternatif", en: "Asphalt Distributor Alternative", slug: "distributor-aspal-2" },
      { id: "Perbaikan Jalan Aspal Alternatif", en: "Asphalt Road Repair Alternative", slug: "perbaikan-jalan-aspal-2" },
      { id: "Pemasangan Paving Block", en: "Paving Block Installation", slug: "pemasangan-paving-block" },
      { id: "Hotmix untuk Jalan Perkantoran", en: "Hotmix for Office Roads", slug: "hotmix-untuk-jalan-perkantoran" },
    ],
    body: [
      {
        type: "paragraph",
        text: {
          id: "Pengaspalan Jalan Perumahan — Jalan yang mulus di dalam kawasan perumahan bukan sekadar soal estetika. Ini adalah investasi jangka panjang yang meningkatkan kenyamanan penghuni, mengurangi kerusakan kendaraan, dan menaikkan nilai jual properti. Jika Anda adalah pengurus komplek atau pengembang yang mencari <a href='/layanan/infrastruktur/pengaspalan' class='text-[#1e88e5] hover:underline font-semibold'>jasa pengaspalan jalan perumahan</a> di Jakarta, Tangerang, Bekasi, Depok & Bogor, PT Tri Abadi Makmur adalah mitra yang tepat.",
          en: "Residential Road Paving — A smooth road within a residential area is not just about aesthetics. It is a long-term investment that increases residents' comfort, reduces vehicle damage, and raises property value. If you are a complex manager or developer looking for residential road paving services in Jakarta, Tangerang, Bekasi, Depok & Bogor, PT Tri Abadi Makmur is the right partner.",
        },
      },
      {
        type: "heading",
        text: {
          id: "Kenapa Kualitas Aspal Sangat Penting untuk Perumahan?",
          en: "Why is Asphalt Quality Crucial for Residential Areas?",
        },
      },
      {
        type: "list",
        ordered: false,
        items: [
          {
            id: "<strong>Aktivitas Kendaraan Sehari-hari:</strong> Jalan perumahan dilalui oleh berbagai kendaraan ringan dan berat (seperti truk sampah). Kualitas hotmix yang baik akan mencegah jalan cepat berlubang.",
            en: "<strong>Daily Vehicle Activity:</strong> Residential roads are passed by various light and heavy vehicles (like garbage trucks). Good hotmix quality will prevent the road from quickly getting potholes.",
          },
          {
            id: "<strong>Drainase & Genangan:</strong> Pengaspalan yang tepat (dengan kemiringan yang benar) akan mencegah air menggenang di depan rumah warga saat hujan.",
            en: "<strong>Drainage & Puddles:</strong> Proper paving (with the correct slope) will prevent water from pooling in front of residents' houses when it rains.",
          },
          {
            id: "<strong>Keselamatan Pengguna Jalan:</strong> Permukaan aspal yang rata dan tidak bergelombang mengurangi risiko kecelakaan, terutama bagi pengendara sepeda motor dan anak-anak.",
            en: "<strong>Road User Safety:</strong> A flat and non-wavy asphalt surface reduces the risk of accidents, especially for motorcyclists and children.",
          },
        ],
      },
      {
        type: "paragraph",
        text: {
          id: "PT Tri Abadi Makmur memiliki pengalaman bertahun-tahun dalam menangani proyek pengaspalan perumahan. Kami menggunakan material hotmix standar tinggi dan alat berat modern (seperti tandem roller) agar hasilnya padat, rata, dan rapi. Kami juga menyediakan layanan <a href='/layanan/infrastruktur/pasang-paving-block' class='text-[#1e88e5] hover:underline font-semibold'>pemasangan paving block</a> untuk area trotoar atau taman perumahan Anda.",
          en: "PT Tri Abadi Makmur has years of experience in handling residential paving projects. We use high-standard hotmix materials and modern heavy equipment (like tandem rollers) so the results are dense, flat, and neat. We also provide paving block installation services for your residential sidewalk or garden area.",
        },
      },
      {
        type: "paragraph",
        text: {
          id: "Dapatkan penawaran terbaik untuk pengaspalan perumahan Anda. Hubungi kami sekarang via WhatsApp untuk survei lokasi gratis.",
          en: "Get the best offer for your residential paving. Contact us now via WhatsApp for a free site survey.",
        },
      },
    ],
  },
  {
    slug: "hotmix-untuk-jalan-perkantoran",
    date: { id: "18 Oktober 2026", en: "October 18, 2026" },
    dateISO: "2026-10-20",
    src: "/proyek/proyek-57.webp",
    category: { id: "Hotmix", en: "Hotmix" },
    title: {
      id: "Jasa Aspal Hotmix Jalan Perkantoran, Ruko & Komersial",
      en: "Hotmix Asphalt Paving for Office, Shophouse & Commercial Roads",
    },
    desc: {
      id: "Wujudkan akses masuk dan area parkir kantor yang rapi, hitam merata, dan cepat kering tanpa mengganggu operasional bisnis. Konsultasi & survei gratis!",
      en: "Create neat, evenly black, fast-drying office entrances and parking areas without disrupting business operations. Free consultation & site survey!",
    },
    author: {
      name: "PT. Tri Abadi Makmur Indonesia",
      phone: "082258089367",
      avatar: "/logo.webp",
      lastUpdated: { id: "18 Oktober 2026", en: "October 18, 2026" },
      bio: {
        id: "Tri Abadi Makmur merupakan perusahaan yang bergerak di bidang konstruksi, dengan pengalaman yang sudah bertahun – tahun kami kembangkan, tahapan proses yang mengedepankan kualitas dan kehati-hatian, serta eksekusi pengerjaan proyek yang signifikan, demi tercapainya kepuasan client sehingga terwujudnya jalinan kerjasama yang continue dan berkelanjutan.",
        en: "Tri Abadi Makmur is a construction company with years of experience we have developed, a process that prioritizes quality and prudence, as well as the execution of significant projects, in order to achieve client satisfaction so that continuous and long-term cooperation is realized.",
      },
    },
    tags: [
      { id: "Aspal Jalan Murah", en: "Affordable Asphalt Paving", slug: "aspal-jalan-murah" },
      { id: "Pekerjaan Aspal Hotmix", en: "Hotmix Asphalt Works", slug: "pekerjaan-aspal-hotmix" },
      { id: "Distributor Aspal", en: "Asphalt Distributor", slug: "distributor-aspal" },
      { id: "Perbaikan Jalan Aspal", en: "Asphalt Road Repair", slug: "perbaikan-jalan-aspal" },
      { id: "Pemasangan Kansteen", en: "Kansteen Installation", slug: "pemasangan-kansteen" },
      { id: "Aspal Jalan Murah Alternatif", en: "Affordable Asphalt Alternative", slug: "aspal-jalan-murah-2" },
      { id: "Pekerjaan Aspal Hotmix Alternatif", en: "Hotmix Asphalt Works Alternative", slug: "pekerjaan-aspal-hotmix-2" },
      { id: "Distributor Aspal Alternatif", en: "Asphalt Distributor Alternative", slug: "distributor-aspal-2" },
      { id: "Perbaikan Jalan Aspal Alternatif", en: "Asphalt Road Repair Alternative", slug: "perbaikan-jalan-aspal-2" },
      { id: "Pemasangan Paving Block", en: "Paving Block Installation", slug: "pemasangan-paving-block" },
      { id: "Pengaspalan Jalan Perumahan", en: "Residential Road Asphalt Paving", slug: "pengaspalan-jalan-perumahan" },
    ],
    body: [
      {
        type: "paragraph",
        text: {
          id: "Hotmix untuk Jalan Perkantoran — Bagi sebuah perusahaan atau kawasan komersial, jalan akses yang mulus adalah cerminan profesionalisme. Karyawan, klien, dan tamu akan merasa lebih nyaman jika area parkir dan jalan masuk tertata rapi. Jika Anda membutuhkan kontraktor untuk <a href='/layanan/infrastruktur/pengaspalan' class='text-[#1e88e5] hover:underline font-semibold'>pekerjaan aspal hotmix</a> di area perkantoran Anda di Jabodetabek, Banten & Jawa Barat, PT Tri Abadi Makmur siap membantu.",
          en: "Hotmix for Office Roads — For a company or commercial area, a smooth access road is a reflection of professionalism. Employees, clients, and guests will feel more comfortable if the parking area and entrance are neatly arranged. If you need a contractor for hotmix asphalt works in your office area in Greater Jakarta, Banten & West Java, PT Tri Abadi Makmur is ready to help.",
        },
      },
      {
        type: "heading",
        text: {
          id: "Mengapa Memilih Hotmix untuk Area Komersial?",
          en: "Why Choose Hotmix for Commercial Areas?",
        },
      },
      {
        type: "list",
        ordered: false,
        items: [
          {
            id: "<strong>Tahan Beban Berat:</strong> Area perkantoran sering dilalui kendaraan operasional dan tamu. Hotmix AC-BC sangat kuat menahan beban tersebut.",
            en: "<strong>Withstands Heavy Loads:</strong> Office areas are often passed by operational and guest vehicles. AC-BC hotmix is very strong to withstand these loads.",
          },
          {
            id: "<strong>Cepat Kering & Rapi:</strong> Pengerjaan hotmix tidak memakan waktu lama. Jalan bisa segera digunakan kembali sehingga tidak mengganggu operasional kantor.",
            en: "<strong>Fast Drying & Neat:</strong> Hotmix work doesn't take long. The road can be used again immediately so it doesn't disrupt office operations.",
          },
          {
            id: "<strong>Tampilan Estetis:</strong> Permukaan hotmix yang padat dan hitam merata memberikan kesan mewah dan bersih pada area perkantoran.",
            en: "<strong>Aesthetic Appearance:</strong> The dense and evenly black hotmix surface gives a luxurious and clean impression to the office area.",
          },
        ],
      },
      {
        type: "paragraph",
        text: {
          id: "Kami memahami bahwa waktu adalah uang dalam bisnis. Oleh karena itu, tim PT Tri Abadi Makmur selalu mengedepankan ketepatan waktu dan kerapian. Kami juga menyediakan layanan <a href='/layanan/infrastruktur/pasang-paving-block' class='text-[#1e88e5] hover:underline font-semibold'>pemasangan paving block</a> untuk area parkir atau jalur pejalan kaki di kantor Anda.",
          en: "We understand that time is money in business. Therefore, the PT Tri Abadi Makmur team always prioritizes punctuality and neatness. We also provide paving block installation services for parking areas or pedestrian paths in your office.",
        },
      },
      {
        type: "paragraph",
        text: {
          id: "Konsultasikan kebutuhan pengaspalan area komersial Anda sekarang. Hubungi kami via WhatsApp untuk survei lokasi dan penawaran terbaik.",
          en: "Consult your commercial area paving needs now. Contact us via WhatsApp for site survey and the best offer.",
        },
      },
    ],
  },
  {
    slug: "jasa-pengecoran-beton",
    date: { id: "18 Oktober 2026", en: "October 18, 2026" },
    dateISO: "2026-10-20",
    src: "/proyek/proyek-13.webp",
    category: { id: "Cor Beton", en: "Ready-Mix Concrete" },
    title: {
      id: "Jasa Pengecoran Beton Ready Mix & Cara Hitung Kubikasi",
      en: "Ready-Mix Concrete Casting Services & Cubic Calculation Guide",
    },
    desc: {
      id: "Butuh cor beton jalan atau halaman? Pelajari rumus praktis menghitung kebutuhan kubikasi truk mixer sekaligus layanan pengecoran ready mix Jabodetabek.",
      en: "Need road or yard concrete casting? Learn practical formulas to calculate mixer truck cubic volume alongside ready-mix services in Greater Jakarta.",
    },
    author: {
      name: "PT. Tri Abadi Makmur Indonesia",
      phone: "082258089367",
      avatar: "/logo.webp",
      lastUpdated: { id: "5 Oktober 2026", en: "October 5, 2026" },
      bio: {
        id: "Tri Abadi Makmur merupakan perusahaan yang bergerak di bidang konstruksi, dengan pengalaman yang sudah bertahun – tahun kami kembangkan, tahapan proses yang mengedepankan kualitas dan kehati-hatian, serta eksekusi pengerjaan proyek yang signifikan, demi tercapainya kepuasan client sehingga terwujudnya jalinan kerjasama yang continue dan berkelanjutan.",
        en: "Tri Abadi Makmur is a construction company with years of experience we have developed, a process that prioritizes quality and prudence, as well as the execution of significant projects, in order to achieve client satisfaction so that continuous and long-term cooperation is realized.",
      },
    },
    tags: [
      { id: "Pemasangan Paving Block", en: "Paving Block Installation", slug: "pemasangan-paving-block" },
      { id: "Pemasangan Grass Block", en: "Grass Block Installation Guide", slug: "pemasangan-grass-block" },
      { id: "Pemasangan Pagar Panel", en: "Panel Fence Installation Guide", slug: "pemasangan-pagar-panel" },
      { id: "Pemasangan Tiang Pancang", en: "Pile Driving Installation Guide", slug: "pemasangan-tiang-pancang" },
      { id: "Pemasangan Kansteen", en: "Kansteen Installation", slug: "pemasangan-kansteen" },
      { id: "Pengaspalan Jalan Perumahan", en: "Residential Road Asphalt Paving", slug: "pengaspalan-jalan-perumahan" },
      { id: "Hotmix untuk Jalan Perkantoran", en: "Hotmix for Office Roads", slug: "hotmix-untuk-jalan-perkantoran" },
    ],
    body: [
      {
        type: "paragraph",
        text: {
          id: "Jasa pengecoran beton | Cara menghitung cor jalan perkubik — Cor beton jalan merupakan salah satu proses paling penting dalam pembangunan infrastruktur. Jika Anda membutuhkan <a href='/layanan/infrastruktur/cor-beton-ready-mix' class='text-[#1e88e5] hover:underline font-semibold'>jasa pengecoran beton ready mix</a> di area Jabodetabek, Banten & Jawa Barat, PT Tri Abadi Makmur menyediakan layanan pengecoran yang presisi dan berkualitas. Simak panduan cara menghitung volume cor berikut agar anggaran Anda tidak membengkak.",
          en: "Concrete casting services | How to calculate concrete per cubic meter — Concrete road casting is one of the most important processes in infrastructure development. If you need ready-mix concrete casting services in Greater Jakarta, Banten & West Java, PT Tri Abadi Makmur provides precise and quality casting services. Read the following guide on how to calculate cast volume so your budget doesn't swell.",
        },
      },
      {
        type: "paragraph",
        text: {
          id: "Sebagai informasi saja, jalan beton itu memiliki kekuatan yang sangat baik sehingga bisa bertahan dalam waktu sangat lama. Oleh karena itu perlu menghitung jumlah material yang dibutuhkan dengan tepat dan menentukan ukuran sebelum memulai pekerjaan. Selain digunakan untuk pembangunan jalan, cor beton juga biasanya umum digunakan di halaman rumah. Jadi secara tidak langsung dapat berfungsi seperti paving block untuk menutup tanah.",
          en: "For your information, concrete roads have excellent strength so they can last a very long time. Therefore, it is necessary to calculate the required material quantities accurately and determine the dimensions before starting work. Besides being used for road construction, concrete casting is also commonly used in home yards. So it can indirectly function like paving blocks to cover the ground.",
        },
      },
      {
        type: "heading",
        text: {
          id: "Cara Menghitung Cor Jalan Perkubik",
          en: "How to Calculate Concrete Road Per Cubic Meter",
        },
      },
      {
        type: "paragraph",
        text: {
          id: "Jika ingin menghitung berapa jumlah cara yang diperlukan, itu akan sangat bergantung dengan rumus yang digunakan. Pada bagian pertama, kami akan memberitahu Anda bagaimana caranya menghitung volume cor jalan dari beton.",
          en: "If you want to calculate the required amount, it will highly depend on the formula used. In the first part, we will tell you how to calculate the concrete road volume.",
        },
      },
      {
        type: "paragraph",
        text: {
          id: "Kamu harus menghitung volume sendiri yaitu panjang x lebar x tinggi. Mungkin sebagian besar dari Anda sudah tidak asing lagi dengan rumus tersebut karena sudah diajarkan sejak duduk di bangku sekolah dasar. Untuk itu menggunakan beton ready mix menjadi pilihan sangat tepat ketika membangun cor jalan. Karena dari sisi penyelesaiannya akan menjadi lebih cepat serta memiliki kualitas yang sangat baik.",
          en: "You have to calculate the volume yourself, which is length x width x height. Most of you are probably already familiar with this formula because it has been taught since elementary school. For that reason, using ready-mix concrete is a very appropriate choice when building concrete roads, because it will be completed faster and have excellent quality.",
        },
      },
      {
        type: "paragraph",
        text: {
          id: "Bagian selanjutnya yaitu menghitung jumlah truk mixer beton. Sebagai contoh saja Anda membutuhkan 450 meter kubik beton cor. Dari situ Anda bisa memesan kepada vendor sesuai dengan volume tersebut. Tentu saja tidak perlu terburu-buru dalam membelinya. Karena ada beberapa aspek penting perlu diperhatikan dari mulai harga sampai dengan kualitas. Penting untuk memilih vendor berkualitas supaya bisa mendapatkan hasil terbaik serta harga terjangkau.",
          en: "The next part is calculating the number of concrete mixer trucks. For example, you need 450 cubic meters of cast concrete. From there you can order from a vendor according to that volume. Of course, there is no need to rush in buying it. Because there are several important aspects to pay attention to, from price to quality. It is important to choose a quality vendor so you can get the best results at an affordable price.",
        },
      },
      {
        type: "paragraph",
        text: {
          id: "Anda bisa bertanya terlebih dahulu mengenai kemampuan truk muatan per meter kubik. Dengan begitu akan lebih mudah untuk mengenali Berapa jumlah truk mixer beton yang dibutuhkan. Cara menghitungnya sendiri yaitu cukup sederhana yaitu menggunakan rumus volume cor dibagi dengan muatan truk. Jadi misalkan saja membutuhkan volume cor beton sebanyak 450 M kubik dengan kapasitas maksimal muatan truk 7 meter kubik perhitungannya yaitu 450 / 7 = 65 meter kubik.",
          en: "You can ask in advance about the truck's load capacity per cubic meter. That way it will be easier to identify how many concrete mixer trucks are needed. The calculation method itself is quite simple, which is using the formula: cast volume divided by truck load. So for example, if you need a concrete cast volume of 450 cubic meters with a maximum truck load capacity of 7 cubic meters, the calculation is 450 / 7 = 65 cubic meters.",
        },
      },
      {
        type: "paragraph",
        text: {
          id: "Dalam menghitung cor jalan perkubik itu butuh ketelitian, ini sangat penting supaya nantinya tidak ada kesalahan estimasi mengenai kebutuhan biaya dan juga material.",
          en: "Calculating concrete road per cubic meter requires precision; this is very important so that there are no estimation errors regarding cost and material requirements.",
        },
      },
      {
        type: "heading",
        text: {
          id: "Contoh Menghitung Volume Cor Jalan Beton",
          en: "Example of Calculating Concrete Road Volume",
        },
      },
      {
        type: "paragraph",
        text: {
          id: "Sebagai contoh saja Anda akan melakukan pengecoran pada sebuah jalan dengan memanfaatkan beton readymix. Jalan tersebut memiliki panjang 25 m serta lebar 2 m. Dari data-data tersebut Anda bisa memanfaatkan rumus menghitung cor jalan perkubik yang sudah kami sampaikan sebelumnya. Dari data tersebut artinya volume cor yang dibutuhkan yaitu 10 meter kubik. Sementara itu, Anda bisa memanfaatkan rumus selanjutnya untuk menghitung jumlah truk mixer yang dibutuhkan.",
          en: "As an example, you will perform casting on a road using ready-mix concrete. The road has a length of 25 m and a width of 2 m. From these data, you can use the concrete road per cubic meter calculation formula we have conveyed earlier. From the data, it means the required cast volume is 10 cubic meters. Meanwhile, you can use the next formula to calculate the number of mixer trucks needed.",
        },
      },
      {
        type: "paragraph",
        text: {
          id: "Jika Anda tidak ingin repot ketika melakukan pengecoran jalan bisa memanfaatkan jasa konstruksi. Pastikan untuk memilih dengan bijak supaya bisa mendapatkan harga terjangkau serta kualitas terbaik. Karena sekarang ini jasa konstruksi pembangunan jalan itu jumlahnya cukup banyak. Akan tetapi tidak semuanya memiliki kualitas yang baik sehingga Anda harus memilihnya dengan detail.",
          en: "If you do not want to be troubled when doing road casting, you can use construction services. Make sure to choose wisely so you can get affordable prices and the best quality. Because nowadays there are quite a lot of road construction services. However, not all have good quality, so you must choose them in detail.",
        },
      },
      {
        type: "paragraph",
        text: {
          id: "Percayakan kebutuhan pengecoran beton Anda kepada PT Tri Abadi Makmur. Kami menyediakan material ready mix berkualitas tinggi dengan tim yang profesional. Hubungi kami sekarang via WhatsApp untuk konsultasi volume, harga, dan jadwal pengecoran.",
          en: "Entrust your concrete casting needs to PT Tri Abadi Makmur. We provide high-quality ready-mix materials with a professional team. Contact us now via WhatsApp for consultation on volume, price, and casting schedule.",
        },
      },
      {
        type: "paragraph",
        text: {
          id: `Lihat bagaimana pengecoran lantai gudang di Cikarang dikerjakan per segmen. <a href='${concreteStudy.path}' class='text-blue-800 underline font-semibold'>Baca studi kasus proyek</a>.`,
          en: `See how the Cikarang warehouse floor was poured in sections. <a href='${concreteStudy.path}' class='text-blue-800 underline font-semibold'>Read the project case study</a>.`,
        },
      },
    ],
  },
  {
    slug: "biaya-aspal-per-meter",
    modifiedDateISO: "2026-11-19",
    date: { id: "15 Oktober 2026", en: "October 15, 2026" },
    dateISO: "2026-10-18",
    src: "/proyek/proyek-22.webp",
    category: { id: "Pengaspalan", en: "Asphalt Paving" },
    title: {
      id: "Biaya Pengaspalan Jalan per m²: Overlay, Tambal Sulam & Jalan Baru",
      en: "Road Paving Costs per m²: Resurfacing, Patching & New Paving",
    },
    desc: {
      id: "Bandingkan kisaran biaya overlay, tambal sulam, dan pengaspalan baru per m². Cek faktor biaya lalu minta estimasi sesuai luas dan kondisi lokasi.",
      en: "Compare costs per m² for resurfacing, patching, and new paving. Check the factors and request a quote based on the area and site conditions.",
    },
    quote: {
      title: { id: "Kisaran Biaya Pengaspalan per m²", en: "Estimated Paving Costs per m²" },
      note: {
        id: "Kisaran ini untuk pekerjaan pengaspalan per m². Harga penawaran mengikuti lingkup pekerjaan, luas, ketebalan aspal, dan kondisi lokasi.",
        en: "These are estimates for asphalt paving work per m². Your quote depends on the scope, area, asphalt thickness, and site conditions.",
      },
      ranges: asphaltCostRanges,
      options: [
        { request: "asphalt", label: { id: "Minta Estimasi Proyek via WhatsApp", en: "Request a Project Quote on WhatsApp" } },
      ],
    },
    author: {
      name: "PT. Tri Abadi Makmur Indonesia",
      phone: "082258089367",
      avatar: "/logo.webp",
      lastUpdated: { id: "5 Oktober 2026", en: "October 5, 2026" },
      bio: {
        id: "Tri Abadi Makmur merupakan perusahaan yang bergerak di bidang konstruksi, dengan pengalaman yang sudah bertahun – tahun kami kembangkan, tahapan proses yang mengedepankan kualitas dan kehati-hatian, serta eksekusi pengerjaan proyek yang signifikan, demi tercapainya kepuasan client sehingga terwujudnya jalinan kerjasama yang continue dan berkelanjutan.",
        en: "Tri Abadi Makmur is a construction company with years of experience we have developed, a process that prioritizes quality and prudence, as well as the execution of significant projects, in order to achieve client satisfaction so that continuous and long-term cooperation is realized.",
      },
    },
    tags: [
      { id: "Aspal Jalan Murah", en: "Affordable Asphalt Paving", slug: "aspal-jalan-murah" },
      { id: "Pekerjaan Aspal Hotmix", en: "Hotmix Asphalt Works", slug: "pekerjaan-aspal-hotmix" },
      { id: "Distributor Aspal", en: "Asphalt Distributor", slug: "distributor-aspal" },
      { id: "Perbaikan Jalan Aspal", en: "Asphalt Road Repair", slug: "perbaikan-jalan-aspal" },
      { id: "Pemasangan Kansteen", en: "Kansteen Installation", slug: "pemasangan-kansteen" },
      { id: "Aspal Jalan Murah Alternatif", en: "Affordable Asphalt Alternative", slug: "aspal-jalan-murah-2" },
      { id: "Pekerjaan Aspal Hotmix Alternatif", en: "Hotmix Asphalt Works Alternative", slug: "pekerjaan-aspal-hotmix-2" },
      { id: "Distributor Aspal Alternatif", en: "Asphalt Distributor Alternative", slug: "distributor-aspal-2" },
      { id: "Perbaikan Jalan Aspal Alternatif", en: "Asphalt Road Repair Alternative", slug: "perbaikan-jalan-aspal-2" },
      { id: "Pengaspalan Jalan Perumahan", en: "Residential Road Asphalt Paving", slug: "pengaspalan-jalan-perumahan" },
      { id: "Hotmix untuk Jalan Perkantoran", en: "Hotmix for Office Roads", slug: "hotmix-untuk-jalan-perkantoran" },
    ],
    body: [
      {
        type: "paragraph",
        text: {
          id: "Biaya aspal per meter | Jasa pengaspalan | Aspal jalan murah – Memiliki jalan yang mulus dan enak dilalui adalah impian setiap orang. Utamanya mereka yang memiliki mobilitas kendaraan tinggi. Namun, berapa sebenarnya <strong>biaya aspal per meter</strong> terbaru? Jika Anda sedang mencari <a href='/layanan/infrastruktur/pengaspalan' class='text-[#1e88e5] hover:underline font-semibold'>jasa pengaspalan murah</a> di Jabodetabek & sekitarnya untuk perumahan, pabrik, atau area parkir, PT Tri Abadi Makmur siap membantu dengan survei lokasi gratis.",
          en: "Asphalt cost per meter | Paving services | Affordable asphalt – Having a smooth and comfortable road is everyone's dream. Especially those with high vehicle mobility. But what is the actual asphalt cost per meter? If you are looking for affordable paving services in Greater Jakarta & surrounding areas, PT Tri Abadi Makmur is ready to help with a free site survey.",
        },
      },
      {
        type: "paragraph",
        text: {
          id: "Untuk rincian paket harga yang lebih spesifik, Anda bisa membaca artikel kami tentang <a href='/blog/harga-aspal-hotmix' class='text-[#1e88e5] hover:underline font-semibold'>Harga Aspal Hotmix</a>. Penting untuk diingat bahwa harga di atas adalah estimasi awal. Biaya pasti akan ditentukan setelah tim kami melakukan survei lokasi.",
          en: "For detailed package prices, you can read our article on Hotmix Asphalt Prices. It is important to note that the prices above are initial estimates. The exact cost will be determined after our team conducts a site survey.",
        },
      },
      {
        type: "heading",
        text: {
          id: "Faktor Apa Saja yang Mempengaruhi Harga Aspal?",
          en: "What Factors Influence Asphalt Prices?",
        },
      },
      {
        type: "paragraph",
        text: {
          id: "Ada beberapa faktor yang membuat harga aspal bisa naik atau turun. Memahami hal ini akan membantu Anda menghemat budget:",
          en: "Several factors can make asphalt prices go up or down. Understanding this will help you save your budget:",
        },
      },
      {
        type: "list",
        ordered: true,
        items: [
          {
            id: "<strong>Luas Area Pekerjaan:</strong> Semakin luas area yang diaspal, biasanya harga per meter akan semakin murah (efisiensi alat berat).",
            en: "<strong>Work Area Size:</strong> The larger the area, the cheaper the price per meter usually is (heavy equipment efficiency).",
          },
          {
            id: "<strong>Ketebalan Aspal:</strong> Semakin tebal lapisan aspal, semakin banyak material yang dibutuhkan, sehingga biaya naik.",
            en: "<strong>Asphalt Thickness:</strong> The thicker the asphalt layer, the more material is needed, thus increasing the cost.",
          },
          {
            id: "<strong>Jarak ke Lokasi Proyek:</strong> Jarak dari Asphalt Mixing Plant (AMP) ke lokasi proyek mempengaruhi biaya transportasi material.",
            en: "<strong>Distance to Project:</strong> The distance from the Asphalt Mixing Plant (AMP) to the project site affects material transportation costs.",
          },
          {
            id: "<strong>Akses Jalan:</strong> Jika lokasi sulit dijangkau alat berat, biaya operasional bisa meningkat.",
            en: "<strong>Road Access:</strong> If the location is difficult for heavy equipment to reach, operational costs may increase.",
          },
        ],
      },
      {
        type: "heading",
        text: {
          id: "Tips Mendapatkan Aspal Jalan Murah Tapi Berkualitas",
          en: "Tips for Getting Affordable but Quality Asphalt",
        },
      },
      {
        type: "paragraph",
        text: {
          id: "Jangan hanya tergiur dengan harga termurah. Pastikan penyedia jasa aspal Anda menggunakan material standar dan memiliki tim berpengalaman. PT Tri Abadi Makmur selalu mengedepankan kualitas hotmix dan kepuasan klien. Kami melayani pengaspalan untuk jalan perumahan, kawasan industri, hingga area komersial.",
          en: "Don't just be tempted by the cheapest price. Make sure your asphalt service provider uses standard materials and has an experienced team. PT Tri Abadi Makmur always prioritizes hotmix quality and client satisfaction. We serve paving for residential roads, industrial areas, and commercial areas.",
        },
      },
      {
        type: "paragraph",
        text: {
          id: `Bandingkan <a href='/layanan/infrastruktur/pengaspalan#paket-harga-aspal' class='text-blue-800 underline font-semibold'>paket pengaspalan A–D</a> berdasarkan kondisi jalan. Untuk estimasi proyek, <a href='${projectQuoteHref("asphaltSurvey", "id")}' target='_blank' rel='noopener noreferrer' class='text-blue-800 underline font-semibold'>minta survei lokasi via WhatsApp</a> dan sertakan lokasi serta perkiraan luas.`,
          en: `Compare <a href='/layanan/infrastruktur/pengaspalan#paket-harga-aspal' class='text-blue-800 underline font-semibold'>paving packages A–D</a> based on road conditions. For a project estimate, <a href='${projectQuoteHref("asphaltSurvey", "en")}' target='_blank' rel='noopener noreferrer' class='text-blue-800 underline font-semibold'>request a site survey on WhatsApp</a> with your location and estimated area.`,
        },
      },
      {
        type: "paragraph",
        text: {
          id: `Lihat pekerjaan akses pabrik di Cikupa dan cara tim membagi jadwal pengerjaannya. <a href='${asphaltStudy.path}' class='text-blue-800 underline font-semibold'>Baca studi kasus proyek</a>.`,
          en: `See the Cikupa factory access project and how the crew phased the work. <a href='${asphaltStudy.path}' class='text-blue-800 underline font-semibold'>Read the project case study</a>.`,
        },
      },
    ],
  },
  {
    slug: "pemasangan-grass-block",
    date: { id: "25 Oktober 2026", en: "October 25, 2026" },
    dateISO: "2026-10-25",
    src: "/proyek/proyek-94.jpg",
    category: { id: "Grass Block", en: "Grass Block" },
    title: {
      id: "Jasa Pasang Grass Block Parkir & Taman Ramah Lingkungan",
      en: "Eco-Friendly Parking & Garden Grass Block Installation Services",
    },
    desc: {
      id: "Solusi area parkir hijau dan resapan air optimal dengan grass block kuat & rapi. Simak tahapan pemasangan serta penawaran harga terbaik Jabodetabek.",
      en: "Green parking and optimal water absorption solutions with strong, neat grass blocks. Check installation stages and best offers across Greater Jakarta.",
    },
    author: {
      name: "PT. Tri Abadi Makmur Indonesia",
      phone: "082258089367",
      avatar: "/logo.webp",
      lastUpdated: { id: "15 Oktober 2026", en: "October 15, 2026" },
      bio: {
        id: "Tri Abadi Makmur merupakan perusahaan yang bergerak di bidang konstruksi, dengan pengalaman yang sudah bertahun – tahun kami kembangkan, tahapan proses yang mengedepankan kualitas dan kehati-hatian, serta eksekusi pengerjaan proyek yang signifikan, demi tercapainya kepuasan client sehingga terwujudnya jalinan kerjasama yang continue dan berkelanjutan.",
        en: "Tri Abadi Makmur is a construction company with years of experience we have developed, a process that prioritizes quality and prudence, as well as the execution of significant projects, in order to achieve client satisfaction so that continuous and long-term cooperation is realized.",
      },
    },
    tags: [
      { id: "Pemasangan Paving Block", en: "Paving Block Installation", slug: "pemasangan-paving-block" },
      { id: "Pemasangan Kansteen", en: "Kansteen Installation", slug: "pemasangan-kansteen" },
      { id: "Pengaspalan Jalan Perumahan", en: "Residential Road Asphalt Paving", slug: "pengaspalan-jalan-perumahan" },
      { id: "Hotmix untuk Jalan Perkantoran", en: "Hotmix for Office Roads", slug: "hotmix-untuk-jalan-perkantoran" },
      { id: "Jasa Pengecoran Beton", en: "Concrete Casting Services", slug: "jasa-pengecoran-beton" },
      { id: "Pemasangan Pagar Panel", en: "Panel Fence Installation Guide", slug: "pemasangan-pagar-panel" },
      { id: "Pemasangan Tiang Pancang", en: "Pile Driving Installation Guide", slug: "pemasangan-tiang-pancang" },
    ],
    body: [
      {
        type: "paragraph",
        text: {
          id: "Pasang grass block — Memiliki area terbuka dengan permukaan rapi sekaligus ramah lingkungan adalah dambaan pemilik properti. Jika Anda mencari <a href='/layanan/infrastruktur/pasang-grass-block' class='text-[#1e88e5] hover:underline font-semibold'>jasa pasang grass block</a> di Jakarta, Tangerang, Bekasi, Depok & Bogor, PT Tri Abadi Makmur menawarkan pemasangan yang rapi, kuat, dan bergaransi.",
          en: "Grass block installation — Having an open area with a neat surface while remaining eco-friendly is the dream of property owners. If you are looking for grass block installation services in Jakarta, Tangerang, Bekasi, Depok & Bogor, PT Tri Abadi Makmur offers neat, strong, and guaranteed installation.",
        },
      },
      {
        type: "heading",
        text: { id: "Mengapa Memilih Grass Block?", en: "Why Choose Grass Block?" },
      },
      {
        type: "list",
        ordered: false,
        items: [
          {
            id: "Ramah Lingkungan — Membantu penyerapan air dan mengurangi genangan saat hujan.",
            en: "Eco-Friendly — Helps water absorption and reduces puddles during rain.",
          },
          {
            id: "Estetika Tinggi — Memberikan sentuhan hijau pada halaman atau area parkir.",
            en: "High Aesthetics — Provides a green touch to the yard or parking area.",
          },
          {
            id: "Kuat dan Tahan Lama — Mampu menahan beban kendaraan jika dipasang dengan standar yang benar.",
            en: "Strong and Durable — Able to withstand vehicle loads if installed with the correct standards.",
          },
        ],
      },
      {
        type: "heading",
        text: {
          id: "Tahapan Pemasangan Grass Block yang Benar",
          en: "Proper Grass Block Installation Stages",
        },
      },
      {
        type: "paragraph",
        text: {
          id: "Agar hasil rapi dan tidak mudah amblas, ada tahapan yang harus dilakukan oleh tim PT Tri Abadi Makmur:",
          en: "So that the results are neat and not easily sink, there are stages that must be done by the PT Tri Abadi Makmur team:",
        },
      },
      {
        type: "list",
        ordered: true,
        items: [
          {
            id: "Pengukuran dan Pembersihan Area.",
            en: "Measurement and Area Cleaning.",
          },
          {
            id: "Pemadatan Tanah Dasar (Leveling).",
            en: "Base Soil Compaction (Leveling).",
          },
          {
            id: "Lapisan Pasir / Abu Batu setebal 5-10 cm.",
            en: "Sand / Stone Dust Layer 5-10 cm thick.",
          },
          {
            id: "Pemasangan Grass Block sesuai pola.",
            en: "Grass Block Installation according to the pattern.",
          },
          {
            id: "Pengisian Celah dan Pemadatan dengan baby roller.",
            en: "Filling Gaps and Compaction with a baby roller.",
          },
          {
            id: "Penanaman Rumput pada rongga yang sudah terisi tanah.",
            en: "Planting Grass in the cavities filled with soil.",
          },
        ],
      },
      {
        type: "paragraph",
        text: {
          id: "Butuh jasa pasang grass block profesional? Hubungi PT Tri Abadi Makmur sekarang untuk konsultasi gratis dan survei lokasi.",
          en: "Need professional grass block installation services? Contact PT Tri Abadi Makmur now for free consultation and site survey.",
        },
      },
    ],
  },
  {
    slug: "pemasangan-pagar-panel",
    date: { id: "25 Oktober 2026", en: "October 25, 2026" },
    dateISO: "2026-10-25",
    src: "/proyek/proyek-83.webp",
    category: { id: "Pagar Panel", en: "Panel Fence" },
    title: {
      id: "Jasa Pasang Pagar Panel Beton Precast Kokoh & Cepat",
      en: "Sturdy & Fast Precast Concrete Panel Fence Installation",
    },
    desc: {
      id: "Amankan batas lahan proyek, pabrik, atau perumahan dengan pagar panel beton precast. Pengerjaan cepat, presisi, dan hemat biaya di Jabodetabek.",
      en: "Secure project, factory, or residential land boundaries with precast concrete panel fences. Fast, precise, and cost-effective installation in Greater Jakarta.",
    },
    author: {
      name: "PT. Tri Abadi Makmur Indonesia",
      phone: "082258089367",
      avatar: "/logo.webp",
      lastUpdated: { id: "18 Oktober 2026", en: "October 18, 2026" },
      bio: {
        id: "Tri Abadi Makmur merupakan perusahaan yang bergerak di bidang konstruksi, dengan pengalaman yang sudah bertahun – tahun kami kembangkan, tahapan proses yang mengedepankan kualitas dan kehati-hatian, serta eksekusi pengerjaan proyek yang signifikan, demi tercapainya kepuasan client sehingga terwujudnya jalinan kerjasama yang continue dan berkelanjutan.",
        en: "Tri Abadi Makmur is a construction company with years of experience we have developed, a process that prioritizes quality and prudence, as well as the execution of significant projects, in order to achieve client satisfaction so that continuous and long-term cooperation is realized.",
      },
    },
    tags: [
      { id: "Pemasangan Tiang Pancang", en: "Pile Driving Installation Guide", slug: "pemasangan-tiang-pancang" },
      { id: "Jasa Pengecoran Beton", en: "Concrete Casting Services", slug: "jasa-pengecoran-beton" },
      { id: "Pemasangan Grass Block", en: "Grass Block Installation Guide", slug: "pemasangan-grass-block" },
      { id: "Pemasangan Paving Block", en: "Paving Block Installation", slug: "pemasangan-paving-block" },
      { id: "Pemasangan Kansteen", en: "Kansteen Installation", slug: "pemasangan-kansteen" },
      { id: "Pengaspalan Jalan Perumahan", en: "Residential Road Asphalt Paving", slug: "pengaspalan-jalan-perumahan" },
      { id: "Hotmix untuk Jalan Perkantoran", en: "Hotmix for Office Roads", slug: "hotmix-untuk-jalan-perkantoran" },
    ],
    body: [
      {
        type: "paragraph",
        text: {
          id: "Pasang pagar panel — Membangun proyek konstruksi atau perumahan tentu membutuhkan batas wilayah yang jelas dan aman. Pagar panel beton (precast) menjadi solusi paling diminati karena kokoh, rapi, dan cepat dipasang. Jika Anda mencari <a href='/layanan/infrastruktur/pasang-pager-panel' class='text-[#1e88e5] hover:underline font-semibold'>jasa pasang pagar panel</a> di area Jabodetabek & seluruh Indonesia, PT Tri Abadi Makmur solusinya.",
          en: "Panel fence installation — Building a construction project or residential area certainly requires clear and safe territorial boundaries. Concrete panel fences (precast) have become the most sought-after solution because they are sturdy, neat, and quick to install. If you are looking for panel fence installation services in Greater Jakarta & across Indonesia, PT Tri Abadi Makmur is the solution.",
        },
      },
      {
        type: "heading",
        text: {
          id: "Keunggulan Pagar Panel Beton",
          en: "Advantages of Concrete Panel Fences",
        },
      },
      {
        type: "list",
        ordered: false,
        items: [
          {
            id: "<strong>Pengerjaan Cepat:</strong> Tidak membutuhkan waktu lama seperti memasang bata satu per satu.",
            en: "<strong>Fast Work:</strong> Does not take as long as installing bricks one by one.",
          },
          {
            id: "<strong>Sangat Kokoh:</strong> Mampu menahan angin kencang dan memiliki daya tahan lama terhadap cuaca ekstrem.",
            en: "<strong>Very Sturdy:</strong> Able to withstand strong winds and has long durability against extreme weather.",
          },
          {
            id: "<strong>Tampilan Rapi & Modern:</strong> Desain minimalis dengan garis presisi, cocok untuk kawasan industri maupun perumahan.",
            en: "<strong>Neat & Modern Appearance:</strong> Minimalist design with precise lines, suitable for industrial areas and residential areas.",
          },
          {
            id: "<strong>Hemat Biaya:</strong> Lebih efisien secara biaya dibandingkan pagar bata merah manual.",
            en: "<strong>Cost-Effective:</strong> More cost-efficient compared to manual red brick fences.",
          },
        ],
      },
      {
        type: "heading",
        text: {
          id: "Tahapan Pasang Pagar Panel yang Benar",
          en: "Proper Panel Fence Installation Stages",
        },
      },
      {
        type: "paragraph",
        text: {
          id: "Agar pagar panel berdiri tegak dan tidak mudah roboh, pemasangan harus dilakukan oleh tenaga ahli. Berikut tahapan standar dari PT Tri Abadi Makmur:",
          en: "So that the panel fence stands upright and does not easily collapse, installation must be done by experts. Here are the standard stages from PT Tri Abadi Makmur:",
        },
      },
      {
        type: "list",
        ordered: true,
        items: [
          {
            id: "Pengukuran dan Pemasangan Patok (jarak antar tiang biasanya 2,5 meter).",
            en: "Measurement and Pile Installation (distance between posts is usually 2.5 meters).",
          },
          {
            id: "Penggalian Tanah untuk Pondasi tiang.",
            en: "Soil Excavation for Post Foundation.",
          },
          {
            id: "Pengecoran Pondasi dan Pemasangan Tiang beton.",
            en: "Foundation Casting and Concrete Post Installation.",
          },
          {
            id: "Pemasangan Panel Beton menggunakan alat berat (crane/ekskavator).",
            en: "Concrete Panel Installation using heavy equipment (crane/excavator).",
          },
          {
            id: "Finishing dan Pengecekan kerapian panel.",
            en: "Finishing and Checking the neatness of the panels.",
          },
        ],
      },
      {
        type: "paragraph",
        text: {
          id: "Percayakan kebutuhan pagar panel beton proyek Anda kepada PT Tri Abadi Makmur. Kami menyediakan tim berpengalaman, peralatan modern, serta harga yang kompetitif. Hubungi kami sekarang untuk mendapatkan penawaran terbaik!",
          en: "Entrust your project's concrete panel fence needs to PT Tri Abadi Makmur. We provide an experienced team, modern equipment, and competitive prices. Contact us now to get the best offer!",
        },
      },
    ],
  },
  {
    slug: "pemasangan-tiang-pancang",
    date: { id: "25 Oktober 2026", en: "October 25, 2026" },
    dateISO: "2026-10-25",
    src: "/proyek/proyek-80.webp",
    category: { id: "Tiang Pancang", en: "Pile Driving" },
    title: {
      id: "Jasa Pasang Tiang Pancang Beton (Hydraulic & Hammer)",
      en: "Concrete Pile Driving Services (Hydraulic Jacking & Hammer)",
    },
    desc: {
      id: "Layanan pemancangan tiang beton untuk fondasi gedung, gudang, dan jembatan. Tersedia metode hydraulic jacking minim getaran untuk area padat penduduk.",
      en: "Concrete pile driving services for building, warehouse, and bridge foundations. Low-vibration hydraulic jacking available for dense residential areas.",
    },
    author: {
      name: "PT. Tri Abadi Makmur Indonesia",
      phone: "082258089367",
      avatar: "/logo.webp",
      lastUpdated: { id: "20 Oktober 2026", en: "October 20, 2026" },
      bio: {
        id: "Tri Abadi Makmur merupakan perusahaan yang bergerak di bidang konstruksi, dengan pengalaman yang sudah bertahun – tahun kami kembangkan, tahapan proses yang mengedepankan kualitas dan kehati-hatian, serta eksekusi pengerjaan proyek yang signifikan, demi tercapainya kepuasan client sehingga terwujudnya jalinan kerjasama yang continue dan berkelanjutan.",
        en: "Tri Abadi Makmur is a construction company with years of experience we have developed, a process that prioritizes quality and prudence, as well as the execution of significant projects, in order to achieve client satisfaction so that continuous and long-term cooperation is realized.",
      },
    },
    tags: [
      { id: "Pemasangan Pagar Panel", en: "Panel Fence Installation Guide", slug: "pemasangan-pagar-panel" },
      { id: "Jasa Pengecoran Beton", en: "Concrete Casting Services", slug: "jasa-pengecoran-beton" },
      { id: "Pemasangan Grass Block", en: "Grass Block Installation Guide", slug: "pemasangan-grass-block" },
      { id: "Pemasangan Paving Block", en: "Paving Block Installation", slug: "pemasangan-paving-block" },
      { id: "Pemasangan Kansteen", en: "Kansteen Installation", slug: "pemasangan-kansteen" },
      { id: "Pengaspalan Jalan Perumahan", en: "Residential Road Asphalt Paving", slug: "pengaspalan-jalan-perumahan" },
      { id: "Hotmix untuk Jalan Perkantoran", en: "Hotmix for Office Roads", slug: "hotmix-untuk-jalan-perkantoran" },
    ],
    body: [
      {
        type: "paragraph",
        text: {
          id: "Pasang tiang pancang — Dalam dunia konstruksi, kekuatan bangunan sangat ditentukan oleh fondasinya. Untuk bangunan bertingkat, jembatan, atau proyek di atas tanah lunak, penggunaan tiang pancang adalah keharusan. Jika Anda mencari <a href='/layanan/infrastruktur/pasang-tiang-pancang' class='text-[#1e88e5] hover:underline font-semibold'>jasa pasang tiang pancang</a> di Jabodetabek & seluruh Indonesia, PT Tri Abadi Makmur didukung oleh tenaga ahli dan alat berat modern.",
          en: "Pile driving installation — In the world of construction, the strength of a building is largely determined by its foundation. For multi-story buildings, bridges, or projects on soft soil, the use of piles is a necessity. If you are looking for pile driving installation services in Greater Jakarta & across Indonesia, PT Tri Abadi Makmur is supported by expert staff and modern heavy equipment.",
        },
      },
      {
        type: "heading",
        text: { id: "Jenis-Jenis Tiang Pancang", en: "Types of Piles" },
      },
      {
        type: "list",
        ordered: false,
        items: [
          {
            id: "<strong>Tiang Pancang Beton (Precast):</strong> Paling umum digunakan, dicetak di pabrik dengan mutu beton tinggi (K-450 ke atas).",
            en: "<strong>Concrete Piles (Precast):</strong> Most commonly used, cast in factories with high concrete quality (K-450 and above).",
          },
          {
            id: "<strong>Tiang Pancang Baja (Spun Pile):</strong> Digunakan untuk proyek dengan beban sangat berat atau kondisi tanah ekstrem.",
            en: "<strong>Steel Piles (Spun Pile):</strong> Used for projects with very heavy loads or extreme soil conditions.",
          },
        ],
      },
      {
        type: "heading",
        text: {
          id: "Metode Pasang Tiang Pancang",
          en: "Pile Driving Installation Methods",
        },
      },
      {
        type: "paragraph",
        text: {
          id: "Ada dua metode utama yang biasa digunakan oleh PT Tri Abadi Makmur di lapangan:",
          en: "There are two main methods commonly used by PT Tri Abadi Makmur in the field:",
        },
      },
      {
        type: "list",
        ordered: true,
        items: [
          {
            id: "<strong>Metode Jacking (Hidrolik):</strong> Tiang ditekan ke dalam tanah. Tidak menimbulkan getaran dan suara bising, sangat cocok untuk area pemukiman padat.",
            en: "<strong>Jacking Method (Hydraulic):</strong> Piles are pressed into the soil. Does not cause vibration and noise, very suitable for densely populated residential areas.",
          },
          {
            id: "<strong>Metode Drop Hammer:</strong> Tiang dipancang menggunakan alat berat (crane) yang menjatuhkan palu. Lebih cepat untuk area proyek yang luas.",
            en: "<strong>Drop Hammer Method:</strong> Piles are driven using heavy equipment (crane) that drops a hammer. Faster for large project areas.",
          },
        ],
      },
      {
        type: "paragraph",
        text: {
          id: "Pemasangan tiang pancang yang salah dapat berakibat fatal pada kekuatan struktur bangunan. Percayakan proyek Anda kepada ahlinya. Hubungi PT Tri Abadi Makmur hari ini untuk konsultasi teknis dan penawaran terbaik.",
          en: "Incorrect pile driving installation can have fatal consequences on the building structure's strength. Entrust your project to the experts. Contact PT Tri Abadi Makmur today for technical consultation and the best offer.",
        },
      },
    ],
  },
  {
    slug: "lapisan-aspal-hotmix",
    date: { id: "25 Oktober 2026", en: "October 25, 2026" },
    dateISO: "2026-10-25",
    src: "/proyek/proyek-31.webp",
    category: { id: "Hotmix", en: "Hotmix" },
    title: {
      id: "Urutan Struktur Lapisan Aspal Hotmix dari Bawah ke Atas",
      en: "Hotmix Asphalt Layer Structure Order from Bottom to Top",
    },
    desc: {
      id: "Pahami fungsi subgrade, subbase, base course, AC-BC, dan AC-WC dalam konstruksi jalan hotmix agar fondasi jalan kuat menahan beban kendaraan berat.",
      en: "Understand the functions of subgrade, subbase, base course, AC-BC, and AC-WC in hotmix road construction to support heavy vehicle loads.",
    },
    author: {
      name: "PT. Tri Abadi Makmur Indonesia",
      phone: "082258089367",
      avatar: "/logo.webp",
      lastUpdated: { id: "25 Oktober 2026", en: "October 25, 2026" },
      bio: {
        id: "Tri Abadi Makmur merupakan perusahaan yang bergerak di bidang konstruksi, dengan pengalaman yang sudah bertahun – tahun kami kembangkan, tahapan proses yang mengedepankan kualitas dan kehati-hatian, serta eksekusi pengerjaan proyek yang signifikan, demi tercapainya kepuasan client sehingga terwujudnya jalinan kerjasama yang continue dan berkelanjutan.",
        en: "Tri Abadi Makmur is a construction company with years of experience we have developed, a process that prioritizes quality and prudence, as well as the execution of significant projects, in order to achieve client satisfaction so that continuous and long-term cooperation is realized.",
      },
    },
    tags: [
      { id: "Aspal Jalan Murah", en: "Affordable Asphalt Paving", slug: "aspal-jalan-murah" },
      { id: "Pekerjaan Aspal Hotmix", en: "Hotmix Asphalt Works", slug: "pekerjaan-aspal-hotmix" },
      { id: "Distributor Aspal", en: "Asphalt Distributor", slug: "distributor-aspal" },
      { id: "Perbaikan Jalan Aspal", en: "Asphalt Road Repair", slug: "perbaikan-jalan-aspal" },
      { id: "Pemasangan Kansteen", en: "Kansteen Installation", slug: "pemasangan-kansteen" },
      { id: "Aspal Jalan Murah Alternatif", en: "Affordable Asphalt Alternative", slug: "aspal-jalan-murah-2" },
      { id: "Pekerjaan Aspal Hotmix Alternatif", en: "Hotmix Asphalt Works Alternative", slug: "pekerjaan-aspal-hotmix-2" },
      { id: "Distributor Aspal Alternatif", en: "Asphalt Distributor Alternative", slug: "distributor-aspal-2" },
      { id: "Perbaikan Jalan Aspal Alternatif", en: "Asphalt Road Repair Alternative", slug: "perbaikan-jalan-aspal-2" },
      { id: "Pemasangan Paving Block", en: "Paving Block Installation", slug: "pemasangan-paving-block" },
      { id: "Pengaspalan Jalan Perumahan", en: "Residential Road Asphalt Paving", slug: "pengaspalan-jalan-perumahan" },
      { id: "Hotmix untuk Jalan Perkantoran", en: "Hotmix for Office Roads", slug: "hotmix-untuk-jalan-perkantoran" },
    ],
    body: [
      {
        type: "paragraph",
        text: {
          id: "Lapisan aspal hotmix — Jalan yang mulus dan tahan lama tidak tercipta begitu saja. Di balik permukaan aspal yang rata, terdapat struktur lapisan aspal hotmix yang tersusun berlapis sesuai fungsinya. Jika Anda sedang merencanakan proyek jalan dan mencari <a href='/layanan/infrastruktur/pengaspalan' class='text-[#1e88e5] hover:underline font-semibold'>jasa pengaspalan hotmix</a> di Jabodetabek, Banten & Jawa Barat, PT Tri Abadi Makmur menerapkan standar lapisan yang tepat untuk hasil maksimal.",
          en: "Hotmix asphalt layers — A smooth and durable road is not created just like that. Behind the flat asphalt surface, there is a hotmix asphalt layer structure arranged in layers according to their functions. If you are planning a road project and looking for hotmix asphalt services in Greater Jakarta, Banten & West Java, PT Tri Abadi Makmur applies the correct layer standards for maximum results.",
        },
      },
      {
        type: "heading",
        text: {
          id: "Struktur Lapisan Aspal Hotmix dari Bawah ke Atas",
          en: "Hotmix Asphalt Layer Structure from Bottom to Top",
        },
      },
      {
        type: "list",
        ordered: true,
        items: [
          {
            id: "<strong>Lapisan Tanah Dasar (Subgrade):</strong> Lapisan paling bawah berupa tanah yang dipadatkan. Menjadi pondasi utama penopang beban jalan.",
            en: "<strong>Subgrade Layer:</strong> The bottom-most layer consisting of compacted soil. It is the main foundation supporting the road load.",
          },
          {
            id: "<strong>Lapisan Pondasi Bawah (Subbase Course):</strong> Material berbutir (batu pecah/sirtu) setebal 15–30 cm. Berfungsi sebagai drainase agar air tidak naik.",
            en: "<strong>Subbase Course:</strong> Granular material (crushed stone/sirtu) 15–30 cm thick. Functions as drainage to prevent water from rising.",
          },
          {
            id: "<strong>Lapisan Pondasi Atas (Base Course):</strong> Bisa menggunakan agregat padat atau aspal hotmix jenis ATB. Menahan gaya geser kendaraan.",
            en: "<strong>Base Course:</strong> Can use dense aggregate or hotmix asphalt type ATB. Resists vehicle shear forces.",
          },
          {
            id: "<strong>Lapisan Pengikat (Binder Course / AC-BC):</strong> Aspal hotmix setebal 4–6 cm. Berfungsi mengikat lapisan pondasi dan permukaan, serta menahan beban berat.",
            en: "<strong>Binder Course (AC-BC):</strong> Hotmix asphalt 4–6 cm thick. Functions to bind the base and surface layers, and bear heavy loads.",
          },
          {
            id: "<strong>Lapisan Permukaan (Wearing Course / AC-WC):</strong> Lapisan teratas setebal 4 cm. Bersentuhan langsung dengan ban, harus tahan gesekan dan kedap air.",
            en: "<strong>Wearing Course (AC-WC):</strong> Top layer 4 cm thick. In direct contact with tires, must be friction-resistant and waterproof.",
          },
        ],
      },
      {
        type: "paragraph",
        text: {
          id: `Struktur lapisan perlu disesuaikan dengan kondisi tanah dan beban kendaraan. Lihat <a href='/layanan/infrastruktur/pengaspalan#paket-harga-aspal' class='text-blue-800 underline font-semibold'>lingkup paket pengaspalan hotmix</a> atau <a href='${projectQuoteHref("asphaltSurvey", "id")}' target='_blank' rel='noopener noreferrer' class='text-blue-800 underline font-semibold'>minta survei lokasi via WhatsApp</a> untuk membahas kebutuhan proyek.`,
          en: `The pavement structure depends on ground conditions and vehicle loads. See the <a href='/layanan/infrastruktur/pengaspalan#paket-harga-aspal' class='text-blue-800 underline font-semibold'>hotmix paving package scopes</a> or <a href='${projectQuoteHref("asphaltSurvey", "en")}' target='_blank' rel='noopener noreferrer' class='text-blue-800 underline font-semibold'>request a site survey on WhatsApp</a> to discuss your project.`,
        },
      },
    ],
  },
  {
    slug: "harga-aspal-hotmix",
    modifiedDateISO: "2026-11-19",
    date: { id: "1 November 2026", en: "November 1, 2026" },
    dateISO: "2026-11-01",
    src: "/proyek/proyek-22.webp",
    category: { id: "Hotmix", en: "Hotmix" },
    title: {
      id: "Daftar Harga Paket Jasa Pengaspalan Hotmix 2026 (Per m²)",
      en: "2026 Hotmix Asphalt Paving Package Price List (Per m²)",
    },
    desc: {
      id: `Paket overlay (Kategori A) mulai ${formatAsphaltPrice(asphaltPackagePrices.A)}/m². Bandingkan paket hotmix A–D berdasarkan lingkup pekerjaan dan kondisi jalan.`,
      en: `The overlay package (Category A) starts at ${formatAsphaltPrice(asphaltPackagePrices.A, "en")}/m². Compare packages A–D by scope and site conditions.`,
    },
    author: {
      name: "PT. Tri Abadi Makmur Indonesia",
      phone: "082258089367",
      avatar: "/logo.webp",
      lastUpdated: { id: "1 November 2026", en: "November 1, 2026" },
      bio: {
        id: "Tri Abadi Makmur merupakan perusahaan yang bergerak di bidang konstruksi, dengan pengalaman yang sudah bertahun – tahun kami kembangkan, tahapan proses yang mengedepankan kualitas dan kehati-hatian, serta eksekusi pengerjaan proyek yang signifikan, demi tercapainya kepuasan client sehingga terwujudnya jalinan kerjasama yang continue dan berkelanjutan.",
        en: "Tri Abadi Makmur is a construction company with years of experience we have developed, a process that prioritizes quality and prudence, as well as the execution of significant projects, in order to achieve client satisfaction so that continuous and long-term cooperation is realized.",
      },
    },
    tags: [
      { id: "Aspal Jalan Murah", en: "Affordable Asphalt Paving", slug: "aspal-jalan-murah" },
      { id: "Pekerjaan Aspal Hotmix", en: "Hotmix Asphalt Works", slug: "pekerjaan-aspal-hotmix" },
      { id: "Biaya Aspal Per Meter", en: "Asphalt Cost Per Meter", slug: "biaya-aspal-per-meter" },
    ],
    body: [
      {
        type: "paragraph",
        text: {
          id: "Mencari penyedia jasa pengaspalan seringkali membingungkan karena harga yang ditawarkan bisa sangat bervariasi. Agar Anda tidak salah anggaran, berikut kami tawarkan transparansi harga paket <a href='/layanan/infrastruktur/pengaspalan' class='text-[#1e88e5] hover:underline font-semibold'>jasa pengaspalan hotmix</a> menggunakan material berkualitas untuk area Jabodetabek & sekitarnya.",
          en: "Finding a paving service provider is often confusing because the prices offered can vary widely. To ensure you don't miscalculate your budget, here we offer price transparency for hotmix asphalt service packages using quality materials for Greater Jakarta & surrounding areas.",
        },
      },
      {
        type: "paragraph",
        text: {
          id: "Harga di bawah ini dihitung per meter persegi (m²) dan sudah termasuk material serta tenaga kerja. Anda bisa menyesuaikan pilihan paket dengan kondisi jalan yang akan diperbaiki.",
          en: "The prices below are calculated per square meter (m²) and already include materials and labor. You can adjust the package choice with the condition of the road to be repaired.",
        },
      },

      // --- GRID KATEGORI (4 KOLOM SEJAJAR) ---
      {
        type: "heading",
        text: { id: "Perbandingan Paket Aspal Hotmix", en: "Hotmix Asphalt Package Comparison" },
      },
      {
        type: "paragraph",
        text: {
          id: `
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px; margin: 30px 0; align-items: stretch;">
              
              <!-- KATEGORI A -->
              <div style="position: relative; display: flex; flex-direction: column; background-color: #fff; border: 1px solid #e2e8f0; border-radius: 8px; border-top: 4px solid #e11d48; padding: 20px 16px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.02);">
                <span style="position: absolute; top: 10px; right: 10px; font-size: 64px; font-weight: 900; color: #e11d48; opacity: 0.06; line-height: 1; pointer-events: none;">A</span>
                
                <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px; z-index: 1;">
                  <span style="width: 8px; height: 8px; border-radius: 50%; background-color: #e11d48;"></span>
                  <h3 style="font-size: 12px; font-weight: 700; color: #0f172a; margin: 0; letter-spacing: 0.05em;">KATEGORI A</h3>
                </div>
                <p style="font-size: 11px; color: #64748b; font-style: italic; margin: 0 0 16px 0; line-height: 1.4; min-height: 32px; z-index: 1;">Overlay / pelapisan ulang hotmix</p>
                
                <div style="margin-bottom: 4px; z-index: 1;">
                  <span style="font-size: 22px; font-weight: 800; color: #0f172a;">${formatAsphaltPrice(asphaltPackagePrices.A)}</span>
                  <span style="font-size: 12px; color: #94a3b8;"> / m²</span>
                </div>
                <p style="font-size: 11px; color: #94a3b8; margin: 0 0 16px 0;">Per Meter²</p>
                
                <div style="height: 1px; background-color: #f1f5f9; margin-bottom: 16px;"></div>
                
                <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; font-size: 12px; color: #475569; line-height: 1.4;">
                  <li style="display: flex; gap: 6px; align-items: flex-start;"><span style="color: #e11d48; font-size: 14px; line-height: 1;">•</span> <span>Pembersihan badan jalan</span></li>
                  <li style="display: flex; gap: 6px; align-items: flex-start;"><span style="color: #e11d48; font-size: 14px; line-height: 1;">•</span> <span>Di siram cairan emulsi (lem aspal)</span></li>
                  <li style="display: flex; gap: 6px; align-items: flex-start;"><span style="color: #e11d48; font-size: 14px; line-height: 1;">•</span> <span>Gelar aspal hotmix</span></li>
                  <li style="display: flex; gap: 6px; align-items: flex-start;"><span style="color: #e11d48; font-size: 14px; line-height: 1;">•</span> <span>Di padatkan dengan mesin wales / BB roller</span></li>
                </ul>
              </div>

              <!-- KATEGORI B -->
              <div style="position: relative; display: flex; flex-direction: column; background-color: #fff; border: 1px solid #e2e8f0; border-radius: 8px; border-top: 4px solid #16a34a; padding: 20px 16px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.02);">
                <span style="position: absolute; top: 10px; right: 10px; font-size: 64px; font-weight: 900; color: #16a34a; opacity: 0.06; line-height: 1; pointer-events: none;">B</span>
                
                <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px; z-index: 1;">
                  <span style="width: 8px; height: 8px; border-radius: 50%; background-color: #16a34a;"></span>
                  <h3 style="font-size: 12px; font-weight: 700; color: #0f172a; margin: 0; letter-spacing: 0.05em;">KATEGORI B</h3>
                </div>
                <p style="font-size: 11px; color: #64748b; font-style: italic; margin: 0 0 16px 0; line-height: 1.4; min-height: 32px; z-index: 1;">Pecingan / tambal sulam batu split / makadam dan hotmix</p>
                
                <div style="margin-bottom: 4px; z-index: 1;">
                  <span style="font-size: 22px; font-weight: 800; color: #0f172a;">${formatAsphaltPrice(asphaltPackagePrices.B)}</span>
                  <span style="font-size: 12px; color: #94a3b8;"> / m²</span>
                </div>
                <p style="font-size: 11px; color: #94a3b8; margin: 0 0 16px 0;">Per Meter²</p>
                
                <div style="height: 1px; background-color: #f1f5f9; margin-bottom: 16px;"></div>
                
                <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; font-size: 12px; color: #475569; line-height: 1.4;">
                  <li style="display: flex; gap: 6px; align-items: flex-start;"><span style="color: #16a34a; font-size: 14px; line-height: 1;">•</span> <span>Pembersihan lokasi pekerjaan</span></li>
                  <li style="display: flex; gap: 6px; align-items: flex-start;"><span style="color: #16a34a; font-size: 14px; line-height: 1;">•</span> <span>Gelar batu split / batu makadam pada yang berlubang</span></li>
                  <li style="display: flex; gap: 6px; align-items: flex-start;"><span style="color: #16a34a; font-size: 14px; line-height: 1;">•</span> <span>Pemadatan dengan mesin giling / Koting aspal</span></li>
                  <li style="display: flex; gap: 6px; align-items: flex-start;"><span style="color: #16a34a; font-size: 14px; line-height: 1;">•</span> <span>Gelar aspal hotmix</span></li>
                  <li style="display: flex; gap: 6px; align-items: flex-start;"><span style="color: #16a34a; font-size: 14px; line-height: 1;">•</span> <span>Pemadatan finising sampai rapi</span></li>
                </ul>
              </div>

              <!-- KATEGORI C -->
              <div style="position: relative; display: flex; flex-direction: column; background-color: #fff; border: 1px solid #e2e8f0; border-radius: 8px; border-top: 4px solid #eab308; padding: 20px 16px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.02);">
                <span style="position: absolute; top: 10px; right: 10px; font-size: 64px; font-weight: 900; color: #eab308; opacity: 0.06; line-height: 1; pointer-events: none;">C</span>
                
                <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px; z-index: 1;">
                  <span style="width: 8px; height: 8px; border-radius: 50%; background-color: #eab308;"></span>
                  <h3 style="font-size: 12px; font-weight: 700; color: #0f172a; margin: 0; letter-spacing: 0.05em;">KATEGORI C</h3>
                </div>
                <p style="font-size: 11px; color: #64748b; font-style: italic; margin: 0 0 16px 0; line-height: 1.4; min-height: 32px; z-index: 1;">Pengaspalan penetrasi</p>
                
                <div style="margin-bottom: 4px; z-index: 1;">
                  <span style="font-size: 22px; font-weight: 800; color: #0f172a;">${formatAsphaltPrice(asphaltPackagePrices.C)}</span>
                  <span style="font-size: 12px; color: #94a3b8;"> / m²</span>
                </div>
                <p style="font-size: 11px; color: #94a3b8; margin: 0 0 16px 0;">Per Meter²</p>
                
                <div style="height: 1px; background-color: #f1f5f9; margin-bottom: 16px;"></div>
                
                <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; font-size: 12px; color: #475569; line-height: 1.4;">
                  <li style="display: flex; gap: 6px; align-items: flex-start;"><span style="color: #eab308; font-size: 14px; line-height: 1;">•</span> <span>Pemadatan tanah dengan mesin giling</span></li>
                  <li style="display: flex; gap: 6px; align-items: flex-start;"><span style="color: #eab308; font-size: 14px; line-height: 1;">•</span> <span>Gelar batu makadam 15 cm</span></li>
                  <li style="display: flex; gap: 6px; align-items: flex-start;"><span style="color: #eab308; font-size: 14px; line-height: 1;">•</span> <span>Koting aspal bakar (lem aspal)</span></li>
                  <li style="display: flex; gap: 6px; align-items: flex-start;"><span style="color: #eab308; font-size: 14px; line-height: 1;">•</span> <span>Gelar batu split 3 cm</span></li>
                  <li style="display: flex; gap: 6px; align-items: flex-start;"><span style="color: #eab308; font-size: 14px; line-height: 1;">•</span> <span>Di siram aspal bakar (lem aspal)</span></li>
                  <li style="display: flex; gap: 6px; align-items: flex-start;"><span style="color: #eab308; font-size: 14px; line-height: 1;">•</span> <span>Gelar abu batu</span></li>
                  <li style="display: flex; gap: 6px; align-items: flex-start;"><span style="color: #eab308; font-size: 14px; line-height: 1;">•</span> <span>Pemadatan finising pekerjaan</span></li>
                </ul>
              </div>

              <!-- KATEGORI D -->
              <div style="position: relative; display: flex; flex-direction: column; background-color: #fff; border: 1px solid #e2e8f0; border-radius: 8px; border-top: 4px solid #f97316; padding: 20px 16px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.02);">
                <span style="position: absolute; top: 10px; right: 10px; font-size: 64px; font-weight: 900; color: #f97316; opacity: 0.06; line-height: 1; pointer-events: none;">D</span>
                
                <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px; z-index: 1;">
                  <span style="width: 8px; height: 8px; border-radius: 50%; background-color: #f97316;"></span>
                  <h3 style="font-size: 12px; font-weight: 700; color: #0f172a; margin: 0; letter-spacing: 0.05em;">KATEGORI D</h3>
                </div>
                <p style="font-size: 11px; color: #64748b; font-style: italic; margin: 0 0 16px 0; line-height: 1.4; min-height: 32px; z-index: 1;">Tahap dasar bikin baru dari pemadatan tanah / 0%</p>
                
                <div style="margin-bottom: 4px; z-index: 1;">
                  <span style="font-size: 22px; font-weight: 800; color: #0f172a;">${formatAsphaltPrice(asphaltPackagePrices.D)}</span>
                  <span style="font-size: 12px; color: #94a3b8;"> / m²</span>
                </div>
                <p style="font-size: 11px; color: #94a3b8; margin: 0 0 16px 0;">Per Meter²</p>
                
                <div style="height: 1px; background-color: #f1f5f9; margin-bottom: 16px;"></div>
                
                <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; font-size: 12px; color: #475569; line-height: 1.4;">
                  <li style="display: flex; gap: 6px; align-items: flex-start;"><span style="color: #f97316; font-size: 14px; line-height: 1;">•</span> <span>Pengupasan / perataan tanah</span></li>
                  <li style="display: flex; gap: 6px; align-items: flex-start;"><span style="color: #f97316; font-size: 14px; line-height: 1;">•</span> <span>Pemadatan tanah dengan mesin giling</span></li>
                  <li style="display: flex; gap: 6px; align-items: flex-start;"><span style="color: #f97316; font-size: 14px; line-height: 1;">•</span> <span>Gelar batu makadam 15 cm</span></li>
                  <li style="display: flex; gap: 6px; align-items: flex-start;"><span style="color: #f97316; font-size: 14px; line-height: 1;">•</span> <span>Gelar batu split</span></li>
                  <li style="display: flex; gap: 6px; align-items: flex-start;"><span style="color: #f97316; font-size: 14px; line-height: 1;">•</span> <span>Di siram aspal emulsi (lem aspal)</span></li>
                  <li style="display: flex; gap: 6px; align-items: flex-start;"><span style="color: #f97316; font-size: 14px; line-height: 1;">•</span> <span>Gelar aspal hotmix</span></li>
                  <li style="display: flex; gap: 6px; align-items: flex-start;"><span style="color: #f97316; font-size: 14px; line-height: 1;">•</span> <span>Pemadatan finising pekerjaan</span></li>
                </ul>
              </div>

            </div>
          `,
          en: `
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px; margin: 30px 0; align-items: stretch;">
              
              <!-- CATEGORY A -->
              <div style="position: relative; display: flex; flex-direction: column; background-color: #fff; border: 1px solid #e2e8f0; border-radius: 8px; border-top: 4px solid #e11d48; padding: 20px 16px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.02);">
                <span style="position: absolute; top: 10px; right: 10px; font-size: 64px; font-weight: 900; color: #e11d48; opacity: 0.06; line-height: 1; pointer-events: none;">A</span>
                
                <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px; z-index: 1;">
                  <span style="width: 8px; height: 8px; border-radius: 50%; background-color: #e11d48;"></span>
                  <h3 style="font-size: 12px; font-weight: 700; color: #0f172a; margin: 0; letter-spacing: 0.05em;">CATEGORY A</h3>
                </div>
                <p style="font-size: 11px; color: #64748b; font-style: italic; margin: 0 0 16px 0; line-height: 1.4; min-height: 32px; z-index: 1;">Overlay / hotmix resurfacing</p>
                
                <div style="margin-bottom: 4px; z-index: 1;">
                  <span style="font-size: 22px; font-weight: 800; color: #0f172a;">${formatAsphaltPrice(asphaltPackagePrices.A, "en")}</span>
                  <span style="font-size: 12px; color: #94a3b8;"> / m²</span>
                </div>
                <p style="font-size: 11px; color: #94a3b8; margin: 0 0 16px 0;">Per Square Meter</p>
                
                <div style="height: 1px; background-color: #f1f5f9; margin-bottom: 16px;"></div>
                
                <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; font-size: 12px; color: #475569; line-height: 1.4;">
                  <li style="display: flex; gap: 6px; align-items: flex-start;"><span style="color: #e11d48; font-size: 14px; line-height: 1;">•</span> <span>Road surface cleaning</span></li>
                  <li style="display: flex; gap: 6px; align-items: flex-start;"><span style="color: #e11d48; font-size: 14px; line-height: 1;">•</span> <span>Sprayed with emulsion liquid (asphalt glue)</span></li>
                  <li style="display: flex; gap: 6px; align-items: flex-start;"><span style="color: #e11d48; font-size: 14px; line-height: 1;">•</span> <span>Lay hotmix asphalt</span></li>
                  <li style="display: flex; gap: 6px; align-items: flex-start;"><span style="color: #e11d48; font-size: 14px; line-height: 1;">•</span> <span>Compacted with wales / BB roller machine</span></li>
                </ul>
              </div>

              <!-- CATEGORY B -->
              <div style="position: relative; display: flex; flex-direction: column; background-color: #fff; border: 1px solid #e2e8f0; border-radius: 8px; border-top: 4px solid #16a34a; padding: 20px 16px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.02);">
                <span style="position: absolute; top: 10px; right: 10px; font-size: 64px; font-weight: 900; color: #16a34a; opacity: 0.06; line-height: 1; pointer-events: none;">B</span>
                
                <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px; z-index: 1;">
                  <span style="width: 8px; height: 8px; border-radius: 50%; background-color: #16a34a;"></span>
                  <h3 style="font-size: 12px; font-weight: 700; color: #0f172a; margin: 0; letter-spacing: 0.05em;">CATEGORY B</h3>
                </div>
                <p style="font-size: 11px; color: #64748b; font-style: italic; margin: 0 0 16px 0; line-height: 1.4; min-height: 32px; z-index: 1;">Patching / split stone / macadam and hotmix</p>
                
                <div style="margin-bottom: 4px; z-index: 1;">
                  <span style="font-size: 22px; font-weight: 800; color: #0f172a;">${formatAsphaltPrice(asphaltPackagePrices.B, "en")}</span>
                  <span style="font-size: 12px; color: #94a3b8;"> / m²</span>
                </div>
                <p style="font-size: 11px; color: #94a3b8; margin: 0 0 16px 0;">Per Square Meter</p>
                
                <div style="height: 1px; background-color: #f1f5f9; margin-bottom: 16px;"></div>
                
                <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; font-size: 12px; color: #475569; line-height: 1.4;">
                  <li style="display: flex; gap: 6px; align-items: flex-start;"><span style="color: #16a34a; font-size: 14px; line-height: 1;">•</span> <span>Cleaning the work area</span></li>
                  <li style="display: flex; gap: 6px; align-items: flex-start;"><span style="color: #16a34a; font-size: 14px; line-height: 1;">•</span> <span>Lay split stone / macadam stone on potholes</span></li>
                  <li style="display: flex; gap: 6px; align-items: flex-start;"><span style="color: #16a34a; font-size: 14px; line-height: 1;">•</span> <span>Compaction with roller machine / asphalt coating</span></li>
                  <li style="display: flex; gap: 6px; align-items: flex-start;"><span style="color: #16a34a; font-size: 14px; line-height: 1;">•</span> <span>Lay hotmix asphalt</span></li>
                  <li style="display: flex; gap: 6px; align-items: flex-start;"><span style="color: #16a34a; font-size: 14px; line-height: 1;">•</span> <span>Finishing compaction until neat</span></li>
                </ul>
              </div>

              <!-- CATEGORY C -->
              <div style="position: relative; display: flex; flex-direction: column; background-color: #fff; border: 1px solid #e2e8f0; border-radius: 8px; border-top: 4px solid #eab308; padding: 20px 16px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.02);">
                <span style="position: absolute; top: 10px; right: 10px; font-size: 64px; font-weight: 900; color: #eab308; opacity: 0.06; line-height: 1; pointer-events: none;">C</span>
                
                <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px; z-index: 1;">
                  <span style="width: 8px; height: 8px; border-radius: 50%; background-color: #eab308;"></span>
                  <h3 style="font-size: 12px; font-weight: 700; color: #0f172a; margin: 0; letter-spacing: 0.05em;">CATEGORY C</h3>
                </div>
                <p style="font-size: 11px; color: #64748b; font-style: italic; margin: 0 0 16px 0; line-height: 1.4; min-height: 32px; z-index: 1;">Penetration asphalt paving</p>
                
                <div style="margin-bottom: 4px; z-index: 1;">
                  <span style="font-size: 22px; font-weight: 800; color: #0f172a;">${formatAsphaltPrice(asphaltPackagePrices.C, "en")}</span>
                  <span style="font-size: 12px; color: #94a3b8;"> / m²</span>
                </div>
                <p style="font-size: 11px; color: #94a3b8; margin: 0 0 16px 0;">Per Square Meter</p>
                
                <div style="height: 1px; background-color: #f1f5f9; margin-bottom: 16px;"></div>
                
                <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; font-size: 12px; color: #475569; line-height: 1.4;">
                  <li style="display: flex; gap: 6px; align-items: flex-start;"><span style="color: #eab308; font-size: 14px; line-height: 1;">•</span> <span>Soil compaction with roller machine</span></li>
                  <li style="display: flex; gap: 6px; align-items: flex-start;"><span style="color: #eab308; font-size: 14px; line-height: 1;">•</span> <span>Lay 15 cm macadam stone</span></li>
                  <li style="display: flex; gap: 6px; align-items: flex-start;"><span style="color: #eab308; font-size: 14px; line-height: 1;">•</span> <span>Burned asphalt coating (asphalt glue)</span></li>
                  <li style="display: flex; gap: 6px; align-items: flex-start;"><span style="color: #eab308; font-size: 14px; line-height: 1;">•</span> <span>Lay 3 cm split stone</span></li>
                  <li style="display: flex; gap: 6px; align-items: flex-start;"><span style="color: #eab308; font-size: 14px; line-height: 1;">•</span> <span>Sprayed with burned asphalt (asphalt glue)</span></li>
                  <li style="display: flex; gap: 6px; align-items: flex-start;"><span style="color: #eab308; font-size: 14px; line-height: 1;">•</span> <span>Lay stone dust</span></li>
                  <li style="display: flex; gap: 6px; align-items: flex-start;"><span style="color: #eab308; font-size: 14px; line-height: 1;">•</span> <span>Finishing compaction of work</span></li>
                </ul>
              </div>

              <!-- CATEGORY D -->
              <div style="position: relative; display: flex; flex-direction: column; background-color: #fff; border: 1px solid #e2e8f0; border-radius: 8px; border-top: 4px solid #f97316; padding: 20px 16px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.02);">
                <span style="position: absolute; top: 10px; right: 10px; font-size: 64px; font-weight: 900; color: #f97316; opacity: 0.06; line-height: 1; pointer-events: none;">D</span>
                
                <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px; z-index: 1;">
                  <span style="width: 8px; height: 8px; border-radius: 50%; background-color: #f97316;"></span>
                  <h3 style="font-size: 12px; font-weight: 700; color: #0f172a; margin: 0; letter-spacing: 0.05em;">CATEGORY D</h3>
                </div>
                <p style="font-size: 11px; color: #64748b; font-style: italic; margin: 0 0 16px 0; line-height: 1.4; min-height: 32px; z-index: 1;">Base stage of making new from soil compaction / 0%</p>
                
                <div style="margin-bottom: 4px; z-index: 1;">
                  <span style="font-size: 22px; font-weight: 800; color: #0f172a;">${formatAsphaltPrice(asphaltPackagePrices.D, "en")}</span>
                  <span style="font-size: 12px; color: #94a3b8;"> / m²</span>
                </div>
                <p style="font-size: 11px; color: #94a3b8; margin: 0 0 16px 0;">Per Square Meter</p>
                
                <div style="height: 1px; background-color: #f1f5f9; margin-bottom: 16px;"></div>
                
                <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; font-size: 12px; color: #475569; line-height: 1.4;">
                  <li style="display: flex; gap: 6px; align-items: flex-start;"><span style="color: #f97316; font-size: 14px; line-height: 1;">•</span> <span>Soil stripping / leveling</span></li>
                  <li style="display: flex; gap: 6px; align-items: flex-start;"><span style="color: #f97316; font-size: 14px; line-height: 1;">•</span> <span>Soil compaction with roller machine</span></li>
                  <li style="display: flex; gap: 6px; align-items: flex-start;"><span style="color: #f97316; font-size: 14px; line-height: 1;">•</span> <span>Lay 15 cm macadam stone</span></li>
                  <li style="display: flex; gap: 6px; align-items: flex-start;"><span style="color: #f97316; font-size: 14px; line-height: 1;">•</span> <span>Lay split stone</span></li>
                  <li style="display: flex; gap: 6px; align-items: flex-start;"><span style="color: #f97316; font-size: 14px; line-height: 1;">•</span> <span>Sprayed with emulsion asphalt (asphalt glue)</span></li>
                  <li style="display: flex; gap: 6px; align-items: flex-start;"><span style="color: #f97316; font-size: 14px; line-height: 1;">•</span> <span>Lay hotmix asphalt</span></li>
                  <li style="display: flex; gap: 6px; align-items: flex-start;"><span style="color: #f97316; font-size: 14px; line-height: 1;">•</span> <span>Finishing compaction of work</span></li>
                </ul>
              </div>

            </div>
          `,
        },
      },

      // --- TAMBAHAN EDUKASI: CARA MEMILIH PAKET ---
      {
        type: "heading",
        text: {
          id: "Bingung Pilih Paket yang Mana? Ini Panduannya",
          en: "Confused About Which Package to Choose? Here's the Guide",
        },
      },
      {
        type: "paragraph",
        text: {
          id: "Setiap jalan punya tingkat kerusakan yang berbeda. Agar uang Anda tidak terbuang sia-sia, sesuaikan paket di atas dengan kondisi lapangan:",
          en: "Every road has a different level of damage. To ensure your money is not wasted, match the package above with the field conditions:",
        },
      },
      {
        type: "list",
        ordered: true,
        items: [
          {
            id: "Pilih Kategori A jika jalan lama Anda kondisinya masih relatif rata dan kokoh, hanya butuh lapisan baru agar lebih halus.",
            en: "Choose Category A if your old road is still relatively level and solid, just needs a new layer to be smoother.",
          },
          {
            id: "Pilih Kategori B jika ada lubang parah atau jalan amblas di beberapa titik, sehingga butuh tambalan batu makadam sebelum dilapisi aspal.",
            en: "Choose Category B if there are severe potholes or sunken roads at several points, so it needs macadam stone patches before being coated with asphalt.",
          },
          {
            id: "Pilih Kategori C atau D jika jalanan benar-benar rusak parah, berlumpur, atau Anda ingin membangun jalan baru dari nol (tanah belum diaspal).",
            en: "Choose Category C or D if the road is heavily damaged, muddy, or you want to build a new road from scratch (the land has never been paved).",
          },
        ],
      },

      // --- TAMBAHAN EDUKASI: FAKTOR PENENTU HARGA ---
      {
        type: "heading",
        text: {
          id: "Catatan Penting Sebelum Memesan",
          en: "Important Notes Before Ordering",
        },
      },
      {
        type: "paragraph",
        text: {
          id: "Harga di atas adalah estimasi awal (harga mulai dari) untuk memberikan gambaran anggaran Anda. Harga dapat berubah sesuai kondisi lapangan & volume pekerjaan. Beberapa faktor yang biasanya mempengaruhi harga akhir antara lain:",
          en: "The prices above are initial estimates (starting prices) to provide an overview of your budget. Prices may change according to field conditions & work volume. Several factors usually affect the final price, including:",
        },
      },
      {
        type: "list",
        ordered: false,
        items: [
          {
            id: "Luas area pekerjaan (semakin luas, biasanya harga per meter bisa lebih efisien).",
            en: "Work area size (the larger the area, usually the price per meter can be more efficient).",
          },
          {
            id: "Tingkat kerusakan jalan aktual di lapangan.",
            en: "The actual level of road damage in the field.",
          },
          {
            id: "Jarak lokasi proyek dari Asphalt Mixing Plant (AMP).",
            en: "The distance of the project location from the Asphalt Mixing Plant (AMP).",
          },
          {
            id: "Tingkat kesulitan akses jalan untuk alat berat.",
            en: "The difficulty level of road access for heavy equipment.",
          },
        ],
      },
      {
        type: "paragraph",
        text: {
          id: "Ingin mendapatkan harga pasti yang sesuai dengan kondisi jalan Anda? Tim PT Tri Abadi Makmur siap melakukan survei lokasi secara gratis. Hubungi kami sekarang via WhatsApp untuk konsultasi dan penawaran terbaik.",
          en: "Want to get a definite price that matches your road conditions? The PT Tri Abadi Makmur team is ready to conduct a free site survey. Contact us now via WhatsApp for consultation and the best offer.",
        },
      },
    ],
  },
      {
    slug: "harga-paving-block-bata-hexagon-topi-uskup",
    modifiedDateISO: "2026-11-19",
    date: { id: "17 November 2026", en: "November 17, 2026" },
    dateISO: "2026-11-17",
    src: "/proyek/proyek-88.webp",
    category: { id: "Paving", en: "Paving" },
    title: {
      id: "Harga Paving Block per m² 2026: Bata, Hexagon & Topi Uskup",
      en: "Paving Block Price per m² 2026: Brick, Hexagon & Bishop's Hat",
    },
    desc: {
      id: "Bandingkan harga material & jasa pasang paving block bata, cacing, hexagon, dan topi uskup per m² 2026. Survei lokasi & hitung kebutuhan gratis di Jabodetabek!",
      en: "Compare 2026 material & installation prices per m² for brick, worm, hexagon, and bishop's hat paving blocks. Free site survey & quantity calculation in Greater Jakarta!",
    },
    quote: {
      title: { id: "Harga Material & Jasa Pasang Paving", en: "Paving Supply & Installation Prices" },
      note: {
        id: "Bandingkan harga material 6 cm dan 8 cm. Untuk pemasangan, pilih upah pasang saja atau paket dengan material. Siapkan lokasi dan perkiraan luas.",
        en: "Compare supply prices for 6 cm and 8 cm pavers. For installation, choose labor only or a package with materials. Have the location and estimated area ready.",
      },
      options: [
        {
          request: "pavingMaterial",
          scope: { id: "Material paving block", en: "Paving block supply" },
          label: { id: "Minta Harga Material via WhatsApp", en: "Request Supply Prices on WhatsApp" },
          prices: { id: "harga-material-paving", label: { id: "Lihat daftar harga material", en: "View supply price list" } },
        },
        {
          request: "paving",
          scope: { id: "Jasa pasang atau paket dengan material", en: "Installation or a package with materials" },
          label: { id: "Minta Estimasi Pasang via WhatsApp", en: "Request an Installation Quote on WhatsApp" },
          prices: { id: "harga-pasang-paving", label: { id: "Lihat harga jasa dan paket", en: "View installation and package prices" } },
        },
      ],
    },
    author: {
      name: "PT. Tri Abadi Makmur Indonesia",
      phone: "082258089367",
      avatar: "/logo.webp",
      lastUpdated: { id: "17 November 2026", en: "November 17, 2026" },
      bio: {
        id: "Tri Abadi Makmur merupakan perusahaan yang bergerak di bidang konstruksi, dengan pengalaman yang sudah bertahun – tahun kami kembangkan, tahapan proses yang mengedepankan kualitas dan kehati-hatian, serta eksekusi pengerjaan proyek yang signifikan, demi tercapainya kepuasan client sehingga terwujudnya jalinan kerjasama yang continue dan berkelanjutan.",
        en: "Tri Abadi Makmur is a construction company with years of experience we have developed, a process that prioritizes quality and prudence, as well as the execution of significant projects, in order to achieve client satisfaction so that continuous and long-term cooperation is realized.",
      },
    },
    tags: [
      { id: "Pemasangan Paving Block", en: "Paving Block Installation", slug: "pemasangan-paving-block" },
      { id: "Jasa Pasang Paving Block", en: "Paving Block Installation Services", href: "/layanan/infrastruktur/pasang-paving-block" },
      { id: "Pemasangan Grass Block", en: "Grass Block Installation Guide", slug: "pemasangan-grass-block" },
      { id: "Pemasangan Kansteen", en: "Kansteen Installation", slug: "pemasangan-kansteen" },
      { id: "Pengaspalan Jalan Perumahan", en: "Residential Road Asphalt Paving", slug: "pengaspalan-jalan-perumahan" },
    ],
    body: [
      {
        type: "paragraph",
        text: {
          id: "Harga paving block per m² — Bentuk paving block menentukan harga, tampilan, dan kekuatan hasil akhir. Tiga jenis yang paling sering dipilih adalah bata (persegi panjang), hexagon, dan topi uskup. Jika Anda sedang membandingkan sebelum memesan <a href='/layanan/infrastruktur/pasang-paving-block' class='text-[#1e88e5] hover:underline font-semibold'>jasa pasang paving block</a> di Jakarta, Tangerang, Bekasi, Depok & Bogor, panduan ini membantu Anda memilih sesuai fungsi dan anggaran.",
          en: "Paving block price per m² — The shape of the paving block determines the price, appearance, and strength of the final result. The three most popular types are brick (rectangular), hexagon, and bishop's hat. If you are comparing options before ordering <a href='/layanan/infrastruktur/pasang-paving-block' class='text-[#1e88e5] hover:underline font-semibold'>paving block installation services</a> in Jakarta, Tangerang, Bekasi, Depok & Bogor, this guide helps you choose by function and budget.",
        },
      },
      {
        type: "heading",
        id: "harga-material-paving",
        text: {
          id: "Harga Material Paving Block per m²",
          en: "Paving Block Material Price per m²",
        },
      },
      {
        type: "paragraph",
        text: {
          id: "Harga material paving block untuk model bata, cacing (intepave), dan hexagon relatif sama, yang membedakan adalah tampilan dan pola pemasangannya. Berikut daftar harga material per m² (mutu K-250 – K-300, press hidrolik):",
          en: "Paving block material prices for brick, worm (intepave), and hexagon models are relatively the same; what differs is the appearance and installation pattern. Here is the material price list per m² (grade K-250 – K-300, hydraulic press):",
        },
      },
      {
        type: "price-list",
        text: {
          id: `<span class='not-prose block rounded-xl border border-slate-200 overflow-hidden mb-3 bg-white shadow-sm'>
  <span class='flex items-center justify-between gap-2 px-4 py-2.5 bg-slate-50 border-b border-slate-200'>
    <span class='flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1'>
      <span class='inline-flex items-center justify-center w-7 h-7 rounded-lg bg-[#1e88e5] text-white text-[11px] font-black shrink-0'>6</span>
      <span class='text-sm font-semibold text-slate-800'>Tebal 6 cm</span>
      <span class='text-xs text-slate-600'>· Bata / Cacing / Hexagon</span>
    </span>
    <span class='text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500 text-white shrink-0'>Populer</span>
  </span>
  <span class='flex'>
    <span class='min-w-0 flex-1 px-2.5 py-3 sm:px-4 border-r border-slate-100'>
      <span class='block text-[9px] uppercase tracking-widest text-slate-400 font-bold mb-1'>Natural</span>
      <span class='block text-base font-bold tabular-nums sm:text-lg text-slate-900 leading-none'>Rp 75.000<span class='text-[10px] font-semibold text-slate-400 ml-0.5'>/m²</span></span>
    </span>
    <span class='min-w-0 flex-1 px-2.5 py-3 sm:px-4 bg-[#1e88e5]'>
      <span class='block text-[9px] uppercase tracking-widest text-white/80 font-bold mb-1'>Warna</span>
      <span class='block text-base font-bold tabular-nums sm:text-lg text-white leading-none'>Rp 90.000<span class='text-[10px] font-semibold text-white/70 ml-0.5'>/m²</span></span>
    </span>
  </span>
</span>
<span class='not-prose block rounded-xl border border-slate-200 overflow-hidden mb-3 bg-white shadow-sm'>
  <span class='flex items-center justify-between gap-2 px-4 py-2.5 bg-slate-50 border-b border-slate-200'>
    <span class='flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1'>
      <span class='inline-flex items-center justify-center w-7 h-7 rounded-lg bg-slate-700 text-white text-[11px] font-black shrink-0'>8</span>
      <span class='text-sm font-semibold text-slate-800'>Tebal 8 cm</span>
      <span class='text-xs text-slate-600'>· Bata / Cacing / Hexagon</span>
    </span>
  </span>
  <span class='flex'>
    <span class='min-w-0 flex-1 px-2.5 py-3 sm:px-4 border-r border-slate-100'>
      <span class='block text-[9px] uppercase tracking-widest text-slate-400 font-bold mb-1'>Natural</span>
      <span class='block text-base font-bold tabular-nums sm:text-lg text-slate-900 leading-none'>Rp 85.000<span class='text-[10px] font-semibold text-slate-400 ml-0.5'>/m²</span></span>
    </span>
    <span class='min-w-0 flex-1 px-2.5 py-3 sm:px-4 bg-[#1e88e5]'>
      <span class='block text-[9px] uppercase tracking-widest text-white/80 font-bold mb-1'>Warna</span>
      <span class='block text-base font-bold tabular-nums sm:text-lg text-white leading-none'>Rp 100.000<span class='text-[10px] font-semibold text-white/70 ml-0.5'>/m²</span></span>
    </span>
  </span>
</span>
<span class='not-prose block rounded-xl border border-slate-200 overflow-hidden mb-3 bg-white shadow-sm'>
  <span class='flex items-center justify-between gap-2 px-4 py-2.5 bg-slate-50 border-b border-slate-200'>
    <span class='flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1'>
      <span class='inline-flex items-center justify-center w-7 h-7 rounded-lg bg-amber-500 text-white text-[11px] font-black shrink-0'>◆</span>
      <span class='text-sm font-semibold text-slate-800'>Topi Uskup</span>
      <span class='text-xs text-slate-600'>· Border / tepian</span>
    </span>
    <span class='text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 shrink-0'>Per Buah</span>
  </span>
  <span class='block px-4 py-2 text-[11px] text-slate-500 border-b border-slate-100'>Ukuran 28 × 21 × 10.5 cm · dijual per pcs</span>
  <span class='flex'>
    <span class='min-w-0 flex-1 px-2.5 py-3 sm:px-4 border-r border-slate-100'>
      <span class='block text-[9px] uppercase tracking-widest text-slate-400 font-bold mb-1'>Tebal 6 cm</span>
      <span class='block text-base font-bold tabular-nums sm:text-lg text-slate-900 leading-none'>Rp 8.000<span class='text-[10px] font-semibold text-slate-400 ml-0.5'>/pcs</span></span>
    </span>
    <span class='min-w-0 flex-1 px-2.5 py-3 sm:px-4 bg-amber-50/60'>
      <span class='block text-[9px] uppercase tracking-widest text-amber-700 font-bold mb-1'>Tebal 8 cm</span>
      <span class='block text-base font-bold tabular-nums sm:text-lg text-amber-700 leading-none'>Rp 9.000<span class='text-[10px] font-semibold text-amber-700/60 ml-0.5'>/pcs</span></span>
    </span>
  </span>
</span>`,
          en: `<span class='not-prose block rounded-xl border border-slate-200 overflow-hidden mb-3 bg-white shadow-sm'>
  <span class='flex items-center justify-between gap-2 px-4 py-2.5 bg-slate-50 border-b border-slate-200'>
    <span class='flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1'>
      <span class='inline-flex items-center justify-center w-7 h-7 rounded-lg bg-[#1e88e5] text-white text-[11px] font-black shrink-0'>6</span>
      <span class='text-sm font-semibold text-slate-800'>6 cm Thick</span>
      <span class='text-xs text-slate-600'>· Brick / Worm / Hexagon</span>
    </span>
    <span class='text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500 text-white shrink-0'>Popular</span>
  </span>
  <span class='flex'>
    <span class='min-w-0 flex-1 px-2.5 py-3 sm:px-4 border-r border-slate-100'>
      <span class='block text-[9px] uppercase tracking-widest text-slate-400 font-bold mb-1'>Natural</span>
      <span class='block text-base font-bold tabular-nums sm:text-lg text-slate-900 leading-none'>Rp 75,000<span class='text-[10px] font-semibold text-slate-400 ml-0.5'>/m²</span></span>
    </span>
    <span class='min-w-0 flex-1 px-2.5 py-3 sm:px-4 bg-[#1e88e5]'>
      <span class='block text-[9px] uppercase tracking-widest text-white/80 font-bold mb-1'>Colored</span>
      <span class='block text-base font-bold tabular-nums sm:text-lg text-white leading-none'>Rp 90,000<span class='text-[10px] font-semibold text-white/70 ml-0.5'>/m²</span></span>
    </span>
  </span>
</span>
<span class='not-prose block rounded-xl border border-slate-200 overflow-hidden mb-3 bg-white shadow-sm'>
  <span class='flex items-center justify-between gap-2 px-4 py-2.5 bg-slate-50 border-b border-slate-200'>
    <span class='flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1'>
      <span class='inline-flex items-center justify-center w-7 h-7 rounded-lg bg-slate-700 text-white text-[11px] font-black shrink-0'>8</span>
      <span class='text-sm font-semibold text-slate-800'>8 cm Thick</span>
      <span class='text-xs text-slate-600'>· Brick / Worm / Hexagon</span>
    </span>
  </span>
  <span class='flex'>
    <span class='min-w-0 flex-1 px-2.5 py-3 sm:px-4 border-r border-slate-100'>
      <span class='block text-[9px] uppercase tracking-widest text-slate-400 font-bold mb-1'>Natural</span>
      <span class='block text-base font-bold tabular-nums sm:text-lg text-slate-900 leading-none'>Rp 85,000<span class='text-[10px] font-semibold text-slate-400 ml-0.5'>/m²</span></span>
    </span>
    <span class='min-w-0 flex-1 px-2.5 py-3 sm:px-4 bg-[#1e88e5]'>
      <span class='block text-[9px] uppercase tracking-widest text-white/80 font-bold mb-1'>Colored</span>
      <span class='block text-base font-bold tabular-nums sm:text-lg text-white leading-none'>Rp 100,000<span class='text-[10px] font-semibold text-white/70 ml-0.5'>/m²</span></span>
    </span>
  </span>
</span>
<span class='not-prose block rounded-xl border border-slate-200 overflow-hidden mb-3 bg-white shadow-sm'>
  <span class='flex items-center justify-between gap-2 px-4 py-2.5 bg-slate-50 border-b border-slate-200'>
    <span class='flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1'>
      <span class='inline-flex items-center justify-center w-7 h-7 rounded-lg bg-amber-500 text-white text-[11px] font-black shrink-0'>◆</span>
      <span class='text-sm font-semibold text-slate-800'>Bishop's Hat</span>
      <span class='text-xs text-slate-600'>· Border / edging</span>
    </span>
    <span class='text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 shrink-0'>Per Piece</span>
  </span>
  <span class='block px-4 py-2 text-[11px] text-slate-500 border-b border-slate-100'>Size 28 × 21 × 10.5 cm · sold per pc</span>
  <span class='flex'>
    <span class='min-w-0 flex-1 px-2.5 py-3 sm:px-4 border-r border-slate-100'>
      <span class='block text-[9px] uppercase tracking-widest text-slate-400 font-bold mb-1'>6 cm Thick</span>
      <span class='block text-base font-bold tabular-nums sm:text-lg text-slate-900 leading-none'>Rp 8,000<span class='text-[10px] font-semibold text-slate-400 ml-0.5'>/pc</span></span>
    </span>
    <span class='min-w-0 flex-1 px-2.5 py-3 sm:px-4 bg-amber-50/60'>
      <span class='block text-[9px] uppercase tracking-widest text-amber-700 font-bold mb-1'>8 cm Thick</span>
      <span class='block text-base font-bold tabular-nums sm:text-lg text-amber-700 leading-none'>Rp 9,000<span class='text-[10px] font-semibold text-amber-700/60 ml-0.5'>/pc</span></span>
    </span>
  </span>
</span>`,
        },
      },
      {
        type: "heading",
        id: "harga-pasang-paving",
        text: {
          id: "Harga Jasa Pasang & Paket Terima Beres",
          en: "Installation Service & Turnkey Package Prices",
        },
      },
      {
        type: "paragraph",
        text: {
          id: "Harga material di atas belum termasuk jasa pemasangan. Berikut rincian biaya jasa pasang dan paket terima beres (jasa + material):",
          en: "The material prices above do not include installation services. Here are the details of installation costs and turnkey packages (labor + material):",
        },
      },
      {
        type: "price-list",
        text: {
          id: `<span class='not-prose block rounded-xl border border-slate-200 overflow-hidden mb-3 bg-white shadow-sm'>
  <span class='block px-4 py-2.5 bg-slate-50 border-b border-slate-200'>
    <span class='text-[10px] font-bold uppercase tracking-widest text-slate-600'>Jasa Pasang</span>
  </span>
  <span class='flex items-center justify-between gap-3 px-4 py-3 border-b border-slate-100'>
    <span class='flex-1 min-w-0'>
      <span class='block text-sm font-bold text-slate-800'>Jasa Pasang Saja</span>
      <span class='block text-[11px] text-slate-500 mt-0.5'>Tenaga + Finishing Stamper</span>
    </span>
    <span class='shrink-0 inline-flex items-baseline gap-0.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-900 whitespace-nowrap'>
      <span class='text-sm font-bold leading-snug tabular-nums sm:text-base'>Rp 30.000</span>
      <span class='text-[10px] font-semibold text-slate-500'>/m²</span>
    </span>
  </span>
  <span class='flex items-center justify-between gap-3 px-4 py-3'>
    <span class='flex-1 min-w-0'>
      <span class='block text-sm font-bold text-slate-800'>Jasa + Abu Batu</span>
      <span class='block text-[11px] text-slate-500 mt-0.5'>Tenaga + Abu Batu + Finishing</span>
    </span>
    <span class='shrink-0 inline-flex items-baseline gap-0.5 px-3 py-1.5 rounded-lg bg-[#1e88e5] text-white whitespace-nowrap'>
      <span class='text-sm font-bold leading-snug tabular-nums sm:text-base'>Rp 40.000</span>
      <span class='text-[10px] font-semibold text-white/80'>/m²</span>
    </span>
  </span>
</span>
<span class='not-prose block rounded-xl border border-slate-200 overflow-hidden mb-3 bg-white shadow-sm'>
  <span class='block px-4 py-2.5 bg-slate-50 border-b border-slate-200'>
    <span class='text-[10px] font-bold uppercase tracking-widest text-slate-600'>Terima Beres (Jasa + Material)</span>
  </span>
  <span class='flex flex-wrap'>
    <span class='flex-1 min-w-[140px] px-4 py-3 border-b border-r border-slate-100'>
      <span class='flex items-center justify-between mb-1'>
        <span class='text-[10px] font-bold uppercase tracking-wider text-slate-500'>Tebal 6 cm</span>
        <span class='text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700'>Populer</span>
      </span>
      <span class='block text-[11px] text-slate-500 mb-1.5'>Tanpa Sirtu</span>
      <span class='block text-base font-bold tabular-nums sm:text-lg text-slate-900 leading-none'>Rp 120.000<span class='text-[10px] font-semibold text-slate-400 ml-0.5'>/m²</span></span>
    </span>
    <span class='flex-1 min-w-[140px] px-4 py-3 border-b border-slate-100'>
      <span class='flex items-center justify-between mb-1'>
        <span class='text-[10px] font-bold uppercase tracking-wider text-slate-500'>Tebal 6 cm</span>
        <span class='text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-100 text-slate-600'>+ Sirtu</span>
      </span>
      <span class='block text-[11px] text-slate-500 mb-1.5'>Dengan Sirtu</span>
      <span class='block text-base font-bold tabular-nums sm:text-lg text-slate-900 leading-none'>Rp 135.000<span class='text-[10px] font-semibold text-slate-400 ml-0.5'>/m²</span></span>
    </span>
    <span class='flex-1 min-w-[140px] px-4 py-3 border-r border-slate-100'>
      <span class='flex items-center justify-between mb-1'>
        <span class='text-[10px] font-bold uppercase tracking-wider text-slate-500'>Tebal 8 cm</span>
        <span class='text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-100 text-slate-600'>K-300</span>
      </span>
      <span class='block text-[11px] text-slate-500 mb-1.5'>Tanpa Sirtu</span>
      <span class='block text-base font-bold tabular-nums sm:text-lg text-slate-900 leading-none'>Rp 130.000<span class='text-[10px] font-semibold text-slate-400 ml-0.5'>/m²</span></span>
    </span>
    <span class='flex-1 min-w-[140px] px-4 py-3'>
      <span class='flex items-center justify-between mb-1'>
        <span class='text-[10px] font-bold uppercase tracking-wider text-slate-500'>Tebal 8 cm</span>
        <span class='text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-100 text-slate-600'>+ Sirtu</span>
      </span>
      <span class='block text-[11px] text-slate-500 mb-1.5'>Dengan Sirtu</span>
      <span class='block text-base font-bold tabular-nums sm:text-lg text-slate-900 leading-none'>Rp 145.000<span class='text-[10px] font-semibold text-slate-400 ml-0.5'>/m²</span></span>
    </span>
  </span>
</span>`,
          en: `<span class='not-prose block rounded-xl border border-slate-200 overflow-hidden mb-3 bg-white shadow-sm'>
  <span class='block px-4 py-2.5 bg-slate-50 border-b border-slate-200'>
    <span class='text-[10px] font-bold uppercase tracking-widest text-slate-600'>Installation Service</span>
  </span>
  <span class='flex items-center justify-between gap-3 px-4 py-3 border-b border-slate-100'>
    <span class='flex-1 min-w-0'>
      <span class='block text-sm font-bold text-slate-800'>Labor Only</span>
      <span class='block text-[11px] text-slate-500 mt-0.5'>Labor + Stamper Finishing</span>
    </span>
    <span class='shrink-0 inline-flex items-baseline gap-0.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-900 whitespace-nowrap'>
      <span class='text-sm font-bold leading-snug tabular-nums sm:text-base'>Rp 30,000</span>
      <span class='text-[10px] font-semibold text-slate-500'>/m²</span>
    </span>
  </span>
  <span class='flex items-center justify-between gap-3 px-4 py-3'>
    <span class='flex-1 min-w-0'>
      <span class='block text-sm font-bold text-slate-800'>Labor + Stone Dust</span>
      <span class='block text-[11px] text-slate-500 mt-0.5'>Labor + Stone Dust + Finishing</span>
    </span>
    <span class='shrink-0 inline-flex items-baseline gap-0.5 px-3 py-1.5 rounded-lg bg-[#1e88e5] text-white whitespace-nowrap'>
      <span class='text-sm font-bold leading-snug tabular-nums sm:text-base'>Rp 40,000</span>
      <span class='text-[10px] font-semibold text-white/80'>/m²</span>
    </span>
  </span>
</span>
<span class='not-prose block rounded-xl border border-slate-200 overflow-hidden mb-3 bg-white shadow-sm'>
  <span class='block px-4 py-2.5 bg-slate-50 border-b border-slate-200'>
    <span class='text-[10px] font-bold uppercase tracking-widest text-slate-600'>Turnkey (Labor + Material)</span>
  </span>
  <span class='flex flex-wrap'>
    <span class='flex-1 min-w-[140px] px-4 py-3 border-b border-r border-slate-100'>
      <span class='flex items-center justify-between mb-1'>
        <span class='text-[10px] font-bold uppercase tracking-wider text-slate-500'>6 cm Thick</span>
        <span class='text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700'>Popular</span>
      </span>
      <span class='block text-[11px] text-slate-500 mb-1.5'>Without Sirtu</span>
      <span class='block text-base font-bold tabular-nums sm:text-lg text-slate-900 leading-none'>Rp 120,000<span class='text-[10px] font-semibold text-slate-400 ml-0.5'>/m²</span></span>
    </span>
    <span class='flex-1 min-w-[140px] px-4 py-3 border-b border-slate-100'>
      <span class='flex items-center justify-between mb-1'>
        <span class='text-[10px] font-bold uppercase tracking-wider text-slate-500'>6 cm Thick</span>
        <span class='text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-100 text-slate-600'>+ Sirtu</span>
      </span>
      <span class='block text-[11px] text-slate-500 mb-1.5'>With Sirtu</span>
      <span class='block text-base font-bold tabular-nums sm:text-lg text-slate-900 leading-none'>Rp 135,000<span class='text-[10px] font-semibold text-slate-400 ml-0.5'>/m²</span></span>
    </span>
    <span class='flex-1 min-w-[140px] px-4 py-3 border-r border-slate-100'>
      <span class='flex items-center justify-between mb-1'>
        <span class='text-[10px] font-bold uppercase tracking-wider text-slate-500'>8 cm Thick</span>
        <span class='text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-100 text-slate-600'>K-300</span>
      </span>
      <span class='block text-[11px] text-slate-500 mb-1.5'>Without Sirtu</span>
      <span class='block text-base font-bold tabular-nums sm:text-lg text-slate-900 leading-none'>Rp 130,000<span class='text-[10px] font-semibold text-slate-400 ml-0.5'>/m²</span></span>
    </span>
    <span class='flex-1 min-w-[140px] px-4 py-3'>
      <span class='flex items-center justify-between mb-1'>
        <span class='text-[10px] font-bold uppercase tracking-wider text-slate-500'>8 cm Thick</span>
        <span class='text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-100 text-slate-600'>+ Sirtu</span>
      </span>
      <span class='block text-[11px] text-slate-500 mb-1.5'>With Sirtu</span>
      <span class='block text-base font-bold tabular-nums sm:text-lg text-slate-900 leading-none'>Rp 145,000<span class='text-[10px] font-semibold text-slate-400 ml-0.5'>/m²</span></span>
    </span>
  </span>
</span>`,
        },
      },
      {
        type: "paragraph",
        text: {
          id: `<span class='not-prose block my-4 p-4 rounded-r-xl border-l-4 border-amber-400 bg-amber-50'>
  <span class='block text-[10px] font-bold uppercase tracking-widest text-amber-700 mb-1.5'>Catatan Penting</span>
  <span class='block text-sm text-amber-900 leading-relaxed'>Untuk pembelian material saja, bandingkan kolom <b class='font-extrabold'>Natural</b> dan <b class='font-extrabold'>Warna</b> pada daftar harga material. Harga paket terima beres menggunakan paving warna natural. Untuk warna merah atau hitam, konfirmasikan estimasi tambahan <b class='font-extrabold'>Rp 10.000/m²</b> saat meminta penawaran. Harga jasa pasang dan paket terima beres yang tercantum berlaku untuk area <b class='font-extrabold'>di atas 100 m²</b>. Untuk area <b class='font-extrabold'>100 m² atau kurang</b>, hubungi kami untuk penawaran.</span>
</span>`,
          en: `<span class='not-prose block my-4 p-4 rounded-r-xl border-l-4 border-amber-400 bg-amber-50'>
  <span class='block text-[10px] font-bold uppercase tracking-widest text-amber-700 mb-1.5'>Important Note</span>
  <span class='block text-sm text-amber-900 leading-relaxed'>For material-only purchases, compare the <b class='font-extrabold'>Natural</b> and <b class='font-extrabold'>Colored</b> prices in the material price list. Turnkey package prices use natural-colored paving. For red or black, confirm the estimated surcharge of <b class='font-extrabold'>Rp 10,000/m²</b> when requesting a quote. Listed installation and turnkey package prices apply to areas <b class='font-extrabold'>above 100 m²</b>. For areas of <b class='font-extrabold'>100 m² or less</b>, contact us for a quote.</span>
</span>`,
        },
      },
      {
        type: "heading",
        text: { id: "1. Paving Block Bata (Persegi Panjang)", en: "1. Brick Paving Block (Rectangular)" },
      },
      {
        type: "paragraph",
        text: {
          id: "Paving bata hadir dalam ukuran standar dengan pola susunan yang fleksibel (herringbone, anyam, atau lurus) dan sisa potongan relatif sedikit. Pilihan tepat untuk teras, carport, halaman, dan jalur pejalan kaki dengan anggaran terbatas. Material bata 6 cm natural mulai <span class='inline-flex items-baseline gap-0.5 px-2 py-0.5 mx-0.5 rounded-md bg-[#1e88e5]/10 text-[#1e88e5] font-bold text-[0.92em] whitespace-nowrap'>Rp 75.000<span class='text-[0.72em] font-semibold text-[#1e88e5]/70'>/m²</span></span>, sedangkan tebal 8 cm mulai <span class='inline-flex items-baseline gap-0.5 px-2 py-0.5 mx-0.5 rounded-md bg-[#1e88e5]/10 text-[#1e88e5] font-bold text-[0.92em] whitespace-nowrap'>Rp 85.000<span class='text-[0.72em] font-semibold text-[#1e88e5]/70'>/m²</span></span>. Tim kami akan menghitungkan kebutuhan material dan jumlah paving sesuai luas area Anda.",
          en: "Brick paving comes in standard sizes with flexible layout patterns (herringbone, basket weave, or straight) and relatively low cutting waste. A good choice for terraces, carports, yards, and walkways on a limited budget. Natural brick 6 cm starts at <span class='inline-flex items-baseline gap-0.5 px-2 py-0.5 mx-0.5 rounded-md bg-[#1e88e5]/10 text-[#1e88e5] font-bold text-[0.92em] whitespace-nowrap'>Rp 75,000<span class='text-[0.72em] font-semibold text-[#1e88e5]/70'>/m²</span></span>, while 8 cm starts at <span class='inline-flex items-baseline gap-0.5 px-2 py-0.5 mx-0.5 rounded-md bg-[#1e88e5]/10 text-[#1e88e5] font-bold text-[0.92em] whitespace-nowrap'>Rp 85,000<span class='text-[0.72em] font-semibold text-[#1e88e5]/70'>/m²</span></span>. Our team will calculate the material and paver quantity needed for your area size.",
        },
      },
      {
        type: "heading",
        text: { id: "2. Paving Block Topi Uskup", en: "2. Bishop's Hat Paving Block" },
      },
      {
        type: "paragraph",
        text: {
          id: "Topi uskup tersedia dalam ketebalan 6 cm dan 8 cm dengan bentuk saling mengunci yang membuat permukaan lebih stabil menahan beban kendaraan. Banyak dipakai di jalan lingkungan, area parkir, kawasan komersial, serta sebagai border / tepian paving. Berbeda dari jenis lain yang dijual per m², topi uskup umumnya dijual <b>per buah (pcs)</b> dengan harga <span class='inline-flex items-baseline gap-0.5 px-2 py-0.5 mx-0.5 rounded-md bg-amber-100 text-amber-800 font-bold text-[0.92em] whitespace-nowrap'>Rp 8.000<span class='text-[0.72em] font-semibold text-amber-700/70'>/pcs</span></span> untuk tebal 6 cm dan <span class='inline-flex items-baseline gap-0.5 px-2 py-0.5 mx-0.5 rounded-md bg-amber-100 text-amber-800 font-bold text-[0.92em] whitespace-nowrap'>Rp 9.000<span class='text-[0.72em] font-semibold text-amber-700/70'>/pcs</span></span> untuk tebal 8 cm. Tim kami akan membantu menghitungkan kebutuhan topi uskup sesuai panjang tepian area Anda.",
          en: "Bishop's hat is available in 6 cm and 8 cm thicknesses with an interlocking shape that makes the surface more stable under vehicle loads. It is widely used on neighborhood roads, parking areas, commercial zones, and as a paving border / edging. Unlike other types sold per m², bishop's hat is generally sold <b>per piece (pc)</b> at <span class='inline-flex items-baseline gap-0.5 px-2 py-0.5 mx-0.5 rounded-md bg-amber-100 text-amber-800 font-bold text-[0.92em] whitespace-nowrap'>Rp 8,000<span class='text-[0.72em] font-semibold text-amber-700/70'>/pc</span></span> for 6 cm thickness and <span class='inline-flex items-baseline gap-0.5 px-2 py-0.5 mx-0.5 rounded-md bg-amber-100 text-amber-800 font-bold text-[0.92em] whitespace-nowrap'>Rp 9,000<span class='text-[0.72em] font-semibold text-amber-700/70'>/pc</span></span> for 8 cm thickness. Our team will help calculate the bishop's hat quantity needed according to your area's edge length.",
        },
      },
      {
        type: "heading",
        text: { id: "3. Paving Block Hexagon (Segi Enam)", en: "3. Hexagon Paving Block" },
      },
      {
        type: "paragraph",
        text: {
          id: "Hexagon punya tampilan khas yang rapi dan dekoratif, tetapi pemasangannya butuh ketelitian lebih dan sisa potongan di tepian lebih banyak, sehingga biaya pasangnya bisa sedikit lebih tinggi. Cocok untuk taman, area santai, dan halaman yang mengutamakan estetika. Harga material hexagon sama dengan bata dan cacing, yaitu <span class='inline-flex items-baseline gap-0.5 px-2 py-0.5 mx-0.5 rounded-md bg-[#1e88e5]/10 text-[#1e88e5] font-bold text-[0.92em] whitespace-nowrap'>Rp 75.000<span class='text-[0.72em] font-semibold text-[#1e88e5]/70'>/m²</span></span> (6 cm natural) hingga <span class='inline-flex items-baseline gap-0.5 px-2 py-0.5 mx-0.5 rounded-md bg-[#1e88e5]/10 text-[#1e88e5] font-bold text-[0.92em] whitespace-nowrap'>Rp 100.000<span class='text-[0.72em] font-semibold text-[#1e88e5]/70'>/m²</span></span> (8 cm warna). Tim kami akan membantu memperkirakan kebutuhan material dan area potongan agar hasil akhir rapi dan efisien.",
          en: "Hexagon has a distinctive neat and decorative look, but installation needs more precision and edge cutting waste is higher, so installation costs may be slightly higher. Suitable for gardens, lounge areas, and yards that prioritize aesthetics. Hexagon material prices are the same as brick and worm: from <span class='inline-flex items-baseline gap-0.5 px-2 py-0.5 mx-0.5 rounded-md bg-[#1e88e5]/10 text-[#1e88e5] font-bold text-[0.92em] whitespace-nowrap'>Rp 75,000<span class='text-[0.72em] font-semibold text-[#1e88e5]/70'>/m²</span></span> (6 cm natural) to <span class='inline-flex items-baseline gap-0.5 px-2 py-0.5 mx-0.5 rounded-md bg-[#1e88e5]/10 text-[#1e88e5] font-bold text-[0.92em] whitespace-nowrap'>Rp 100,000<span class='text-[0.72em] font-semibold text-[#1e88e5]/70'>/m²</span></span> (8 cm colored). Our team will help estimate material needs and cutting areas so the final result is neat and efficient.",
        },
      },
      {
        type: "heading",
        text: { id: "Mana yang Paling Cocok untuk Kebutuhan Anda?", en: "Which One Best Fits Your Needs?" },
      },
      {
        type: "list",
        ordered: true,
        items: [
          {
            id: "<strong>Halaman dan teras rumah:</strong> paving bata tebal 6 cm. Paling ekonomis, rapi, mudah diperbaiki.",
            en: "<strong>Home yards and terraces:</strong> 6 cm brick paving. Most economical, neat, easy to repair.",
          },
          {
            id: "<strong>Carport, parkir, dan jalan lingkungan:</strong> paving tebal 8 cm (bata/cacing/hexagon) atau topi uskup tebal 8 cm sebagai border.",
            en: "<strong>Carports, parking, and neighborhood roads:</strong> 8 cm paving (brick/worm/hexagon) or 8 cm bishop's hat as border.",
          },
          {
            id: "<strong>Taman dan area dekoratif:</strong> hexagon, atau kombinasi dengan <a href='/blog/pemasangan-grass-block' class='text-[#1e88e5] hover:underline font-semibold'>grass block</a> untuk resapan air.",
            en: "<strong>Gardens and decorative areas:</strong> hexagon, or a combination with <a href='/blog/pemasangan-grass-block' class='text-[#1e88e5] hover:underline font-semibold'>grass block</a> for water absorption.",
          },
        ],
      },
      {
        type: "heading",
        text: { id: "Yang Membuat Harga Bisa Naik atau Turun", en: "What Makes the Price Go Up or Down" },
      },
      {
        type: "list",
        ordered: false,
        items: [
          {
            id: "Ketebalan paving (6 cm atau 8 cm) dan pilihan warna sesuai daftar harga material atau penawaran paket.",
            en: "Paving thickness (6 cm or 8 cm) and color choice based on the material price list or package quote.",
          },
          {
            id: "Luas area. Cantumkan perkiraan luas saat meminta penawaran jasa pasang atau paket terima beres.",
            en: "Area size. Include the estimated area when requesting an installation or turnkey package quote.",
          },
          {
            id: "Kondisi tanah dan kebutuhan urugan atau pemadatan tambahan (sirtu).",
            en: "Soil condition and the need for extra fill or compaction (sirtu).",
          },
          {
            id: "Pola susunan dan pemasangan <a href='/blog/pemasangan-kansteen' class='text-[#1e88e5] hover:underline font-semibold'>kanstin</a> atau topi uskup di tepian.",
            en: "Layout pattern and <a href='/blog/pemasangan-kansteen' class='text-[#1e88e5] hover:underline font-semibold'>curb</a> or bishop's hat installation along the edges.",
          },
        ],
      },
      {
        type: "heading",
        text: { id: "Kami Bantu Hitung Kebutuhan Paving Anda—Gratis", en: "We Help Calculate Your Paving Needs—Free" },
      },
      {
        type: "paragraph",
        text: {
          id: "Tidak perlu bingung menghitung jumlah paving atau memperkirakan sisa potongan sendiri. Tim PT Tri Abadi Makmur akan menghitungkan kebutuhan material paving sesuai jenis, ukuran area, pola susunan, dan ketebalan yang Anda pilih. Cukup sampaikan luas area dan fungsi penggunaannya, kami akan memberikan estimasi kebutuhan material, rekomendasi jenis paving, serta penawaran harga yang jelas. Layanan perhitungan ini gratis sebagai bagian dari survei lokasi.",
          en: "No need to be confused about calculating the number of pavers or estimating cutting waste yourself. The PT Tri Abadi Makmur team will calculate the paving material needs according to the type, area size, layout pattern, and thickness you choose. Just provide the area size and intended use, and we will give a material estimate, paving type recommendation, and a clear price quote. This calculation service is free as part of the site survey.",
        },
      },
      {
        type: "paragraph",
        text: {
          id: "Dengan perhitungan yang tepat, Anda terhindar dari risiko kekurangan material di tengah pemasangan atau kelebihan paving yang membuang anggaran. Kami juga memastikan pola susunan dan pemasangan kanstin atau topi uskup di tepian dikerjakan rapi sesuai rencana.",
          en: "With accurate calculation, you avoid the risk of material shortage during installation or excess pavers that waste budget. We also ensure the layout pattern and curb or bishop's hat installation along the edges are done neatly according to plan.",
        },
      },
      {
        type: "paragraph",
        text: {
          id: "Untuk membandingkan pilihan sebelum memesan, lihat <a href='#harga-material-paving' class='text-[#1e88e5] hover:underline font-semibold'>harga material per m²</a> dan <a href='/blog/pemasangan-paving-block' class='text-[#1e88e5] hover:underline font-semibold'>tahapan pemasangan paving block</a>.",
          en: "Before ordering, compare the <a href='#harga-material-paving' class='text-[#1e88e5] hover:underline font-semibold'>supply prices per m²</a> and review the <a href='/blog/pemasangan-paving-block' class='text-[#1e88e5] hover:underline font-semibold'>paving block installation stages</a>.",
        },
      },
      {
        type: "paragraph",
        text: {
          id: "Bingung memilih jenis paving yang pas? Tim PT Tri Abadi Makmur siap survei lokasi gratis, menghitungkan kebutuhan material, dan memberi rekomendasi sesuai fungsi area Anda. Hubungi kami via WhatsApp untuk konsultasi dan penawaran terbaik.",
          en: "Unsure which paving type fits? The PT Tri Abadi Makmur team is ready for a free site survey, material quantity calculation, and recommendations based on your area's function. Contact us via WhatsApp for consultation and the best offer.",
        },
      },
    ],
  },
      {
    slug: "harga-cor-beton-ready-mix",
    modifiedDateISO: "2026-11-19",
    date: { id: "17 November 2026", en: "November 17, 2026" },
    dateISO: "2026-11-17",
    src: "/proyek/proyek-13.webp",
    category: { id: "Cor Beton", en: "Ready-Mix Concrete" },
    title: {
      id: "Harga Beton Ready Mix per m³: Mutu Beton dan Minimix",
      en: "Ready-Mix Concrete Prices per m³ by Grade and Truck Type",
    },
    desc: {
      id: "Bandingkan harga pasokan beton ready mix per m³ menurut mutu, termasuk pilihan Minimix. Minta harga material atau estimasi jasa cor sesuai kebutuhan proyek.",
      en: "Compare ready-mix supply prices per m³ by concrete grade, including Minimix. Request a supply or pouring quote based on your project needs.",
    },
    quote: {
      title: { id: "Harga Ready Mix & Estimasi Pengecoran", en: "Ready-Mix Prices & Pouring Quotes" },
      note: {
        id: "Untuk pasokan beton, siapkan mutu, volume perkiraan dalam m³, dan lokasi kirim. Untuk jasa cor, ceritakan jenis pekerjaan dan lokasi proyek.",
        en: "For concrete supply, have your grade, estimated volume in m³, and delivery location ready. For pouring services, share the type of work and project location.",
      },
      options: [
        {
          request: "concreteMaterial",
          scope: { id: "Pasokan ready mix per m³", en: "Ready-mix supply per m³" },
          label: { id: "Minta Harga Ready Mix via WhatsApp", en: "Request Ready-Mix Prices on WhatsApp" },
          prices: { id: "harga-ready-mix", label: { id: "Lihat daftar harga per m³", en: "View prices per m³" } },
        },
        {
          request: "concrete",
          scope: { id: "Jasa pengecoran sesuai lingkup proyek", en: "Pouring services based on project scope" },
          label: { id: "Minta Estimasi Jasa Cor via WhatsApp", en: "Request a Pouring Quote on WhatsApp" },
        },
      ],
    },
    author: {
      name: "PT. Tri Abadi Makmur Indonesia",
      phone: "082258089367",
      avatar: "/logo.webp",
      lastUpdated: { id: "17 November 2026", en: "November 17, 2026" },
      bio: {
        id: "Tri Abadi Makmur merupakan perusahaan yang bergerak di bidang konstruksi, dengan pengalaman yang sudah bertahun – tahun kami kembangkan, tahapan proses yang mengedepankan kualitas dan kehati-hatian, serta eksekusi pengerjaan proyek yang signifikan, demi tercapainya kepuasan client sehingga terwujudnya jalinan kerjasama yang continue dan berkelanjutan.",
        en: "Tri Abadi Makmur is a construction company with years of experience we have developed, a process that prioritizes quality and prudence, as well as the execution of significant projects, in order to achieve client satisfaction so that continuous and long-term cooperation is realized.",
      },
    },
    tags: [
      { id: "Jasa Pengecoran Beton", en: "Concrete Casting Services", slug: "jasa-pengecoran-beton" },
      { id: "Jasa Cor Beton Ready Mix", en: "Ready-Mix Concrete Pouring", href: "/layanan/infrastruktur/cor-beton-ready-mix" },
      { id: "Harga Pasokan Beton", en: "Concrete Supply Prices", href: "#harga-ready-mix" },
      { id: "Pemasangan Paving Block", en: "Paving Block Installation", slug: "pemasangan-paving-block" },
      { id: "Pemasangan Grass Block", en: "Grass Block Installation Guide", slug: "pemasangan-grass-block" },
      { id: "Pengaspalan Jalan Perumahan", en: "Residential Road Asphalt Paving", slug: "pengaspalan-jalan-perumahan" },
      { id: "Hotmix untuk Jalan Perkantoran", en: "Hotmix for Office Roads", slug: "hotmix-untuk-jalan-perkantoran" },
    ],
    body: [
      {
        type: "paragraph",
        text: {
          id: "Harga cor beton per kubik — Cor beton ready mix menjadi pilihan utama untuk pekerjaan jalan, halaman, area parkir, hingga struktur bangunan karena mutunya lebih terkontrol dan pengerjaannya lebih cepat. Jika Anda sedang mencari <a href='/layanan/infrastruktur/cor-beton-ready-mix' class='text-[#1e88e5] hover:underline font-semibold'>jasa pengecoran beton ready mix</a> di Jabodetabek, Banten & Jawa Barat, PT Tri Abadi Makmur siap membantu—termasuk menghitungkan kebutuhan volume cor beton Anda secara gratis.",
          en: "Ready-mix concrete price per cubic meter — Ready-mix concrete is a top choice for roads, yards, parking areas, and building structures because its quality is more controlled and the work is faster. If you are looking for ready-mix concrete casting services in Greater Jakarta, Banten & West Java, PT Tri Abadi Makmur is ready to help—including calculating your concrete volume needs for free.",
        },
      },
      {
        type: "heading",
        id: "harga-ready-mix",
        text: {
          id: "Daftar Harga Pasokan Beton Ready Mix per m³",
          en: "Ready-Mix Concrete Price List per Cubic Meter",
        },
      },
      {
        type: "paragraph",
        text: {
          id: "Tabel ini memberi referensi harga pasokan per m³ berdasarkan mutu beton, dengan slump standar 12 ± 2 cm. Untuk estimasi jasa cor, konfirmasi kebutuhan tenaga, pompa, dan finishing dalam penawaran proyek.",
          en: "This table lists supply price estimates per m³ by concrete grade, with a standard slump of 12 ± 2 cm. For a pouring quote, discuss labor, pumping, and finishing based on your project.",
        },
      },
      {
        type: "price-list",
        text: {
          id: `<span class='not-prose block space-y-3'>

  <!-- TIER 1 -->
  <span class='block rounded-xl border border-slate-200 overflow-hidden bg-white shadow-sm'>
    <span class='flex items-center justify-between gap-2 px-4 py-2.5 bg-slate-900 border-b border-slate-800'>
      <span class='flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1'>
        <span class='inline-flex items-center justify-center w-6 h-6 rounded-md bg-white/15 text-white text-[10px] font-black shrink-0'>1</span>
        <span class='text-[13px] font-semibold leading-snug text-white'>Struktur Berat & Jalan Raya</span>
      </span>
      <span class='text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/15 text-white shrink-0 whitespace-nowrap'>K 350–500</span>
    </span>

    <span class='flex items-center justify-between gap-2 px-3 sm:px-4 py-2.5'>
      <span class='flex items-center gap-2.5 min-w-0 flex-1'>
        <span class='inline-flex items-center justify-center min-w-[48px] sm:min-w-[56px] h-7 sm:h-8 px-1.5 rounded-md bg-slate-100 text-slate-900 text-[10px] sm:text-[11px] font-black shrink-0 whitespace-nowrap'>K 500</span>
        <span class='min-w-0'>
          <span class='block text-[12.5px] sm:text-[13px] font-bold text-slate-800 leading-tight break-words'>Klas A · Precast</span>
          <span class='hidden sm:block text-[11px] text-slate-500 mt-0.5 truncate'>Precast / prestressed</span>
        </span>
      </span>
      <span class='shrink-0 inline-flex items-center px-2 sm:px-2.5 py-1 rounded-lg bg-[#1e88e5] text-white text-[9.5px] sm:text-[10.5px] font-bold whitespace-nowrap'>Hubungi Kami</span>
    </span>

    <span class='flex items-center justify-between gap-2 px-3 sm:px-4 py-2.5 border-t border-slate-100'>
      <span class='flex items-center gap-2.5 min-w-0 flex-1'>
        <span class='inline-flex items-center justify-center min-w-[48px] sm:min-w-[56px] h-7 sm:h-8 px-1.5 rounded-md bg-slate-100 text-slate-900 text-[10px] sm:text-[11px] font-black shrink-0 whitespace-nowrap'>K 400</span>
        <span class='min-w-0'>
          <span class='block text-[12.5px] sm:text-[13px] font-bold text-slate-800 leading-tight break-words'>Klas P · Rabat Jalan</span>
          <span class='hidden sm:block text-[11px] text-slate-500 mt-0.5 truncate'>Jalan negara / jalan tol</span>
        </span>
      </span>
      <span class='shrink-0 inline-flex items-baseline gap-0.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-slate-900 text-white whitespace-nowrap'>
        <span class='text-xs font-bold leading-snug tabular-nums sm:text-sm'>Rp 1.200.000</span>
        <span class='hidden sm:inline text-[9px] font-semibold text-white/70'>/m³</span>
      </span>
    </span>

    <span class='flex items-center justify-between gap-2 px-3 sm:px-4 py-2.5 border-t border-slate-100'>
      <span class='flex items-center gap-2.5 min-w-0 flex-1'>
        <span class='inline-flex items-center justify-center min-w-[48px] sm:min-w-[56px] h-7 sm:h-8 px-1.5 rounded-md bg-slate-100 text-slate-900 text-[10px] sm:text-[11px] font-black shrink-0 whitespace-nowrap'>K 375</span>
        <span class='min-w-0'>
          <span class='block text-[12.5px] sm:text-[13px] font-bold text-slate-800 leading-tight break-words'>Klas B · Lantai Pabrik</span>
          <span class='hidden sm:block text-[11px] text-slate-500 mt-0.5 truncate'>Lantai pabrik / rigid jalan</span>
        </span>
      </span>
      <span class='shrink-0 inline-flex items-baseline gap-0.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-slate-900 text-white whitespace-nowrap'>
        <span class='text-xs font-bold leading-snug tabular-nums sm:text-sm'>Rp 1.050.000</span>
        <span class='hidden sm:inline text-[9px] font-semibold text-white/70'>/m³</span>
      </span>
    </span>

    <span class='flex items-center justify-between gap-2 px-3 sm:px-4 py-2.5 border-t border-slate-100'>
      <span class='flex items-center gap-2.5 min-w-0 flex-1'>
        <span class='inline-flex items-center justify-center min-w-[48px] sm:min-w-[56px] h-7 sm:h-8 px-1.5 rounded-md bg-slate-100 text-slate-900 text-[10px] sm:text-[11px] font-black shrink-0 whitespace-nowrap'>K 350</span>
        <span class='min-w-0'>
          <span class='block text-[12.5px] sm:text-[13px] font-bold text-slate-800 leading-tight break-words'>Klas B · Lantai Pabrik</span>
          <span class='hidden sm:block text-[11px] text-slate-500 mt-0.5 truncate'>Lantai pabrik / rigid jalan</span>
        </span>
      </span>
      <span class='shrink-0 inline-flex items-baseline gap-0.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-slate-900 text-white whitespace-nowrap'>
        <span class='text-xs font-bold leading-snug tabular-nums sm:text-sm'>Rp 1.000.000</span>
        <span class='hidden sm:inline text-[9px] font-semibold text-white/70'>/m³</span>
      </span>
    </span>
  </span>

  <!-- TIER 2 -->
  <span class='block rounded-xl border border-slate-200 overflow-hidden bg-white shadow-sm'>
    <span class='flex items-center justify-between gap-2 px-4 py-2.5 bg-slate-700 border-b border-slate-600'>
      <span class='flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1'>
        <span class='inline-flex items-center justify-center w-6 h-6 rounded-md bg-white/15 text-white text-[10px] font-black shrink-0'>2</span>
        <span class='text-[13px] font-semibold leading-snug text-white'>Ruko & Bangunan Bertingkat</span>
      </span>
      <span class='text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/15 text-white shrink-0 whitespace-nowrap'>K 275–325</span>
    </span>

    <span class='flex items-center justify-between gap-2 px-3 sm:px-4 py-2.5'>
      <span class='flex items-center gap-2.5 min-w-0 flex-1'>
        <span class='inline-flex items-center justify-center min-w-[48px] sm:min-w-[56px] h-7 sm:h-8 px-1.5 rounded-md bg-slate-100 text-slate-800 text-[10px] sm:text-[11px] font-black shrink-0 whitespace-nowrap'>K 325</span>
        <span class='min-w-0'>
          <span class='block text-[12.5px] sm:text-[13px] font-bold text-slate-800 leading-tight break-words'>Ruko / Rumah 3–5 Lantai</span>
          <span class='hidden sm:block text-[11px] text-slate-500 mt-0.5 truncate'>Ruko / rumah bertingkat 3–5 lantai</span>
        </span>
      </span>
      <span class='shrink-0 inline-flex items-baseline gap-0.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-slate-700 text-white whitespace-nowrap'>
        <span class='text-xs font-bold leading-snug tabular-nums sm:text-sm'>Rp 950.000</span>
        <span class='hidden sm:inline text-[9px] font-semibold text-white/70'>/m³</span>
      </span>
    </span>

    <span class='flex items-center justify-between gap-2 px-3 sm:px-4 py-2.5 border-t border-slate-100'>
      <span class='flex items-center gap-2.5 min-w-0 flex-1'>
        <span class='inline-flex items-center justify-center min-w-[48px] sm:min-w-[56px] h-7 sm:h-8 px-1.5 rounded-md bg-slate-100 text-slate-800 text-[10px] sm:text-[11px] font-black shrink-0 whitespace-nowrap'>K 300</span>
        <span class='min-w-0'>
          <span class='block text-[12.5px] sm:text-[13px] font-bold text-slate-800 leading-tight break-words'>Ruko / Rumah 3–5 Lantai</span>
          <span class='hidden sm:block text-[11px] text-slate-500 mt-0.5 truncate'>Ruko / rumah bertingkat 3–5 lantai</span>
        </span>
      </span>
      <span class='shrink-0 inline-flex items-baseline gap-0.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-slate-700 text-white whitespace-nowrap'>
        <span class='text-xs font-bold leading-snug tabular-nums sm:text-sm'>Rp 920.000</span>
        <span class='hidden sm:inline text-[9px] font-semibold text-white/70'>/m³</span>
      </span>
    </span>

    <span class='flex items-center justify-between gap-2 px-3 sm:px-4 py-2.5 border-t border-slate-100'>
      <span class='flex items-center gap-2.5 min-w-0 flex-1'>
        <span class='inline-flex items-center justify-center min-w-[48px] sm:min-w-[56px] h-7 sm:h-8 px-1.5 rounded-md bg-slate-100 text-slate-800 text-[10px] sm:text-[11px] font-black shrink-0 whitespace-nowrap'>K 275</span>
        <span class='min-w-0'>
          <span class='block text-[12.5px] sm:text-[13px] font-bold text-slate-800 leading-tight break-words'>Ruko / Rumah 2 Lantai</span>
          <span class='hidden sm:block text-[11px] text-slate-500 mt-0.5 truncate'>Rumah bertingkat dua lantai</span>
        </span>
      </span>
      <span class='shrink-0 inline-flex items-baseline gap-0.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-slate-700 text-white whitespace-nowrap'>
        <span class='text-xs font-bold leading-snug tabular-nums sm:text-sm'>Rp 880.000</span>
        <span class='hidden sm:inline text-[9px] font-semibold text-white/70'>/m³</span>
      </span>
    </span>
  </span>

  <!-- TIER 3 -->
  <span class='block rounded-xl border border-slate-200 overflow-hidden bg-white shadow-sm'>
    <span class='flex items-center justify-between gap-2 px-4 py-2.5 bg-[#1e88e5] border-b border-[#1a76c7]'>
      <span class='flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1'>
        <span class='inline-flex items-center justify-center w-6 h-6 rounded-md bg-white/20 text-white text-[10px] font-black shrink-0'>3</span>
        <span class='text-[13px] font-semibold leading-snug text-white'>Rumah Tinggal</span>
      </span>
      <span class='text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white text-[#1e88e5] shrink-0 whitespace-nowrap'>Populer</span>
    </span>

    <span class='flex items-center justify-between gap-2 px-3 sm:px-4 py-2.5'>
      <span class='flex items-center gap-2.5 min-w-0 flex-1'>
        <span class='inline-flex items-center justify-center min-w-[48px] sm:min-w-[56px] h-7 sm:h-8 px-1.5 rounded-md bg-[#1e88e5]/10 text-[#1e88e5] text-[10px] sm:text-[11px] font-black shrink-0 whitespace-nowrap'>K 250</span>
        <span class='min-w-0'>
          <span class='block text-[12.5px] sm:text-[13px] font-bold text-slate-800 leading-tight break-words'>Rumah / Ruko 2 Lantai</span>
          <span class='hidden sm:block text-[11px] text-slate-500 mt-0.5 truncate'>Rumah tinggal / ruko standar</span>
        </span>
      </span>
      <span class='shrink-0 inline-flex items-baseline gap-0.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-[#1e88e5] text-white whitespace-nowrap'>
        <span class='text-xs font-bold leading-snug tabular-nums sm:text-sm'>Rp 850.000</span>
        <span class='hidden sm:inline text-[9px] font-semibold text-white/80'>/m³</span>
      </span>
    </span>

    <span class='flex items-center justify-between gap-2 px-3 sm:px-4 py-2.5 border-t border-slate-100'>
      <span class='flex items-center gap-2.5 min-w-0 flex-1'>
        <span class='inline-flex items-center justify-center min-w-[48px] sm:min-w-[56px] h-7 sm:h-8 px-1.5 rounded-md bg-[#1e88e5]/10 text-[#1e88e5] text-[10px] sm:text-[11px] font-black shrink-0 whitespace-nowrap'>K 225</span>
        <span class='min-w-0'>
          <span class='block text-[12.5px] sm:text-[13px] font-bold text-slate-800 leading-tight break-words'>Rumah Tinggal · Standar <span class='inline-block align-middle ml-1 text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-500 text-white'>Populer</span></span>
          <span class='hidden sm:block text-[11px] text-slate-500 mt-0.5 truncate'>Rumah tinggal / ruko, truk standar</span>
        </span>
      </span>
      <span class='shrink-0 inline-flex items-baseline gap-0.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-[#1e88e5] text-white whitespace-nowrap'>
        <span class='text-xs font-bold leading-snug tabular-nums sm:text-sm'>Rp 830.000</span>
        <span class='hidden sm:inline text-[9px] font-semibold text-white/80'>/m³</span>
      </span>
    </span>
  </span>

  <!-- TIER 4 -->
  <span class='block rounded-xl border border-slate-200 overflow-hidden bg-white shadow-sm'>
    <span class='flex items-center justify-between gap-2 px-4 py-2.5 bg-amber-500 border-b border-amber-600'>
      <span class='flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1'>
        <span class='inline-flex items-center justify-center w-6 h-6 rounded-md bg-white/20 text-white text-[10px] font-black shrink-0'>4</span>
        <span class='text-[13px] font-semibold leading-snug text-white'>Akses Jalan Sempit (Mini Mix)</span>
      </span>
      <span class='text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white text-amber-600 shrink-0 whitespace-nowrap'>Khusus</span>
    </span>

    <span class='flex items-center justify-between gap-2 px-3 sm:px-4 py-2.5'>
      <span class='flex items-center gap-2.5 min-w-0 flex-1'>
        <span class='inline-flex items-center justify-center min-w-[48px] sm:min-w-[56px] h-7 sm:h-8 px-1.5 rounded-md bg-amber-100 text-amber-700 text-[10px] sm:text-[11px] font-black shrink-0 whitespace-nowrap'>K 225</span>
        <span class='min-w-0'>
          <span class='block text-[12.5px] sm:text-[13px] font-bold text-slate-800 leading-tight break-words'>K 225 · Mini Mix</span>
          <span class='hidden sm:block text-[11px] text-slate-500 mt-0.5 truncate'>Truk kecil untuk gang / jalan sempit</span>
        </span>
      </span>
      <span class='shrink-0 inline-flex items-baseline gap-0.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-amber-500 text-white whitespace-nowrap'>
        <span class='text-xs font-bold leading-snug tabular-nums sm:text-sm'>Rp 1.290.000</span>
        <span class='hidden sm:inline text-[9px] font-semibold text-white/80'>/m³</span>
      </span>
    </span>
  </span>

  <!-- TIER 5 -->
  <span class='block rounded-xl border border-slate-200 overflow-hidden bg-white shadow-sm'>
    <span class='flex items-center justify-between gap-2 px-4 py-2.5 bg-slate-500 border-b border-slate-600'>
      <span class='flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1'>
        <span class='inline-flex items-center justify-center w-6 h-6 rounded-md bg-white/15 text-white text-[10px] font-black shrink-0'>5</span>
        <span class='text-[13px] font-semibold leading-snug text-white'>Konstruksi Ringan & LC</span>
      </span>
      <span class='text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/15 text-white shrink-0 whitespace-nowrap'>K 125–175 · B0</span>
    </span>

    <span class='flex items-center justify-between gap-2 px-3 sm:px-4 py-2.5'>
      <span class='flex items-center gap-2.5 min-w-0 flex-1'>
        <span class='inline-flex items-center justify-center min-w-[48px] sm:min-w-[56px] h-7 sm:h-8 px-1.5 rounded-md bg-slate-100 text-slate-700 text-[10px] sm:text-[11px] font-black shrink-0 whitespace-nowrap'>K 175</span>
        <span class='min-w-0'>
          <span class='block text-[12.5px] sm:text-[13px] font-bold text-slate-800 leading-tight break-words'>Klas D · Bangunan Ringan</span>
          <span class='hidden sm:block text-[11px] text-slate-500 mt-0.5 truncate'>Konstruksi bangunan ringan</span>
        </span>
      </span>
      <span class='shrink-0 inline-flex items-center px-2 sm:px-2.5 py-1 rounded-lg bg-[#1e88e5] text-white text-[9.5px] sm:text-[10.5px] font-bold whitespace-nowrap'>Hubungi Kami</span>
    </span>

    <span class='flex items-center justify-between gap-2 px-3 sm:px-4 py-2.5 border-t border-slate-100'>
      <span class='flex items-center gap-2.5 min-w-0 flex-1'>
        <span class='inline-flex items-center justify-center min-w-[48px] sm:min-w-[56px] h-7 sm:h-8 px-1.5 rounded-md bg-slate-100 text-slate-700 text-[10px] sm:text-[11px] font-black shrink-0 whitespace-nowrap'>K 125</span>
        <span class='min-w-0'>
          <span class='block text-[12.5px] sm:text-[13px] font-bold text-slate-800 leading-tight break-words'>Klas E · LC / Lantai Dasar</span>
          <span class='hidden sm:block text-[11px] text-slate-500 mt-0.5 truncate'>LC / lantai dasar</span>
        </span>
      </span>
      <span class='shrink-0 inline-flex items-center px-2 sm:px-2.5 py-1 rounded-lg bg-[#1e88e5] text-white text-[9.5px] sm:text-[10.5px] font-bold whitespace-nowrap'>Hubungi Kami</span>
    </span>

    <span class='flex items-center justify-between gap-2 px-3 sm:px-4 py-2.5 border-t border-slate-100'>
      <span class='flex items-center gap-2.5 min-w-0 flex-1'>
        <span class='inline-flex items-center justify-center min-w-[48px] sm:min-w-[56px] h-7 sm:h-8 px-1.5 rounded-md bg-slate-100 text-slate-700 text-[10px] sm:text-[11px] font-black shrink-0 whitespace-nowrap'>B0</span>
        <span class='min-w-0'>
          <span class='block text-[12.5px] sm:text-[13px] font-bold text-slate-800 leading-tight break-words'>Klas B0 · LC / Lantai Dasar</span>
          <span class='hidden sm:block text-[11px] text-slate-500 mt-0.5 truncate'>LC / lantai dasar</span>
        </span>
      </span>
      <span class='shrink-0 inline-flex items-center px-2 sm:px-2.5 py-1 rounded-lg bg-[#1e88e5] text-white text-[9.5px] sm:text-[10.5px] font-bold whitespace-nowrap'>Hubungi Kami</span>
    </span>
  </span>

</span>`,
          en: `<span class='not-prose block space-y-3'>

  <!-- TIER 1 -->
  <span class='block rounded-xl border border-slate-200 overflow-hidden bg-white shadow-sm'>
    <span class='flex items-center justify-between gap-2 px-4 py-2.5 bg-slate-900 border-b border-slate-800'>
      <span class='flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1'>
        <span class='inline-flex items-center justify-center w-6 h-6 rounded-md bg-white/15 text-white text-[10px] font-black shrink-0'>1</span>
        <span class='text-[13px] font-semibold leading-snug text-white'>Heavy Structures & Highways</span>
      </span>
      <span class='text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/15 text-white shrink-0 whitespace-nowrap'>K 350–500</span>
    </span>

    <span class='flex items-center justify-between gap-2 px-3 sm:px-4 py-2.5'>
      <span class='flex items-center gap-2.5 min-w-0 flex-1'>
        <span class='inline-flex items-center justify-center min-w-[48px] sm:min-w-[56px] h-7 sm:h-8 px-1.5 rounded-md bg-slate-100 text-slate-900 text-[10px] sm:text-[11px] font-black shrink-0 whitespace-nowrap'>K 500</span>
        <span class='min-w-0'>
          <span class='block text-[12.5px] sm:text-[13px] font-bold text-slate-800 leading-tight break-words'>Class A · Precast</span>
          <span class='hidden sm:block text-[11px] text-slate-500 mt-0.5 truncate'>Precast / prestressed</span>
        </span>
      </span>
      <span class='shrink-0 inline-flex items-center px-2 sm:px-2.5 py-1 rounded-lg bg-[#1e88e5] text-white text-[9.5px] sm:text-[10.5px] font-bold whitespace-nowrap'>Contact Us</span>
    </span>

    <span class='flex items-center justify-between gap-2 px-3 sm:px-4 py-2.5 border-t border-slate-100'>
      <span class='flex items-center gap-2.5 min-w-0 flex-1'>
        <span class='inline-flex items-center justify-center min-w-[48px] sm:min-w-[56px] h-7 sm:h-8 px-1.5 rounded-md bg-slate-100 text-slate-900 text-[10px] sm:text-[11px] font-black shrink-0 whitespace-nowrap'>K 400</span>
        <span class='min-w-0'>
          <span class='block text-[12.5px] sm:text-[13px] font-bold text-slate-800 leading-tight break-words'>Class P · Road Slab</span>
          <span class='hidden sm:block text-[11px] text-slate-500 mt-0.5 truncate'>National road / toll road</span>
        </span>
      </span>
      <span class='shrink-0 inline-flex items-baseline gap-0.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-slate-900 text-white whitespace-nowrap'>
        <span class='text-xs font-bold leading-snug tabular-nums sm:text-sm'>Rp 1,200,000</span>
        <span class='hidden sm:inline text-[9px] font-semibold text-white/70'>/m³</span>
      </span>
    </span>

    <span class='flex items-center justify-between gap-2 px-3 sm:px-4 py-2.5 border-t border-slate-100'>
      <span class='flex items-center gap-2.5 min-w-0 flex-1'>
        <span class='inline-flex items-center justify-center min-w-[48px] sm:min-w-[56px] h-7 sm:h-8 px-1.5 rounded-md bg-slate-100 text-slate-900 text-[10px] sm:text-[11px] font-black shrink-0 whitespace-nowrap'>K 375</span>
        <span class='min-w-0'>
          <span class='block text-[12.5px] sm:text-[13px] font-bold text-slate-800 leading-tight break-words'>Class B · Factory Floor</span>
          <span class='hidden sm:block text-[11px] text-slate-500 mt-0.5 truncate'>Factory floor / rigid pavement</span>
        </span>
      </span>
      <span class='shrink-0 inline-flex items-baseline gap-0.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-slate-900 text-white whitespace-nowrap'>
        <span class='text-xs font-bold leading-snug tabular-nums sm:text-sm'>Rp 1,050,000</span>
        <span class='hidden sm:inline text-[9px] font-semibold text-white/70'>/m³</span>
      </span>
    </span>

    <span class='flex items-center justify-between gap-2 px-3 sm:px-4 py-2.5 border-t border-slate-100'>
      <span class='flex items-center gap-2.5 min-w-0 flex-1'>
        <span class='inline-flex items-center justify-center min-w-[48px] sm:min-w-[56px] h-7 sm:h-8 px-1.5 rounded-md bg-slate-100 text-slate-900 text-[10px] sm:text-[11px] font-black shrink-0 whitespace-nowrap'>K 350</span>
        <span class='min-w-0'>
          <span class='block text-[12.5px] sm:text-[13px] font-bold text-slate-800 leading-tight break-words'>Class B · Factory Floor</span>
          <span class='hidden sm:block text-[11px] text-slate-500 mt-0.5 truncate'>Factory floor / rigid pavement</span>
        </span>
      </span>
      <span class='shrink-0 inline-flex items-baseline gap-0.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-slate-900 text-white whitespace-nowrap'>
        <span class='text-xs font-bold leading-snug tabular-nums sm:text-sm'>Rp 1,000,000</span>
        <span class='hidden sm:inline text-[9px] font-semibold text-white/70'>/m³</span>
      </span>
    </span>
  </span>

  <!-- TIER 2 -->
  <span class='block rounded-xl border border-slate-200 overflow-hidden bg-white shadow-sm'>
    <span class='flex items-center justify-between gap-2 px-4 py-2.5 bg-slate-700 border-b border-slate-600'>
      <span class='flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1'>
        <span class='inline-flex items-center justify-center w-6 h-6 rounded-md bg-white/15 text-white text-[10px] font-black shrink-0'>2</span>
        <span class='text-[13px] font-semibold leading-snug text-white'>Shophouses & Multi-Story</span>
      </span>
      <span class='text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/15 text-white shrink-0 whitespace-nowrap'>K 275–325</span>
    </span>

    <span class='flex items-center justify-between gap-2 px-3 sm:px-4 py-2.5'>
      <span class='flex items-center gap-2.5 min-w-0 flex-1'>
        <span class='inline-flex items-center justify-center min-w-[48px] sm:min-w-[56px] h-7 sm:h-8 px-1.5 rounded-md bg-slate-100 text-slate-800 text-[10px] sm:text-[11px] font-black shrink-0 whitespace-nowrap'>K 325</span>
        <span class='min-w-0'>
          <span class='block text-[12.5px] sm:text-[13px] font-bold text-slate-800 leading-tight break-words'>Shophouse / 3–5 Story</span>
          <span class='hidden sm:block text-[11px] text-slate-500 mt-0.5 truncate'>Shophouse / 3–5 story buildings</span>
        </span>
      </span>
      <span class='shrink-0 inline-flex items-baseline gap-0.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-slate-700 text-white whitespace-nowrap'>
        <span class='text-xs font-bold leading-snug tabular-nums sm:text-sm'>Rp 950,000</span>
        <span class='hidden sm:inline text-[9px] font-semibold text-white/70'>/m³</span>
      </span>
    </span>

    <span class='flex items-center justify-between gap-2 px-3 sm:px-4 py-2.5 border-t border-slate-100'>
      <span class='flex items-center gap-2.5 min-w-0 flex-1'>
        <span class='inline-flex items-center justify-center min-w-[48px] sm:min-w-[56px] h-7 sm:h-8 px-1.5 rounded-md bg-slate-100 text-slate-800 text-[10px] sm:text-[11px] font-black shrink-0 whitespace-nowrap'>K 300</span>
        <span class='min-w-0'>
          <span class='block text-[12.5px] sm:text-[13px] font-bold text-slate-800 leading-tight break-words'>Shophouse / 3–5 Story</span>
          <span class='hidden sm:block text-[11px] text-slate-500 mt-0.5 truncate'>Shophouse / 3–5 story buildings</span>
        </span>
      </span>
      <span class='shrink-0 inline-flex items-baseline gap-0.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-slate-700 text-white whitespace-nowrap'>
        <span class='text-xs font-bold leading-snug tabular-nums sm:text-sm'>Rp 920,000</span>
        <span class='hidden sm:inline text-[9px] font-semibold text-white/70'>/m³</span>
      </span>
    </span>

    <span class='flex items-center justify-between gap-2 px-3 sm:px-4 py-2.5 border-t border-slate-100'>
      <span class='flex items-center gap-2.5 min-w-0 flex-1'>
        <span class='inline-flex items-center justify-center min-w-[48px] sm:min-w-[56px] h-7 sm:h-8 px-1.5 rounded-md bg-slate-100 text-slate-800 text-[10px] sm:text-[11px] font-black shrink-0 whitespace-nowrap'>K 275</span>
        <span class='min-w-0'>
          <span class='block text-[12.5px] sm:text-[13px] font-bold text-slate-800 leading-tight break-words'>Shophouse / 2 Story</span>
          <span class='hidden sm:block text-[11px] text-slate-500 mt-0.5 truncate'>Two-story building</span>
        </span>
      </span>
      <span class='shrink-0 inline-flex items-baseline gap-0.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-slate-700 text-white whitespace-nowrap'>
        <span class='text-xs font-bold leading-snug tabular-nums sm:text-sm'>Rp 880,000</span>
        <span class='hidden sm:inline text-[9px] font-semibold text-white/70'>/m³</span>
      </span>
    </span>
  </span>

  <!-- TIER 3 -->
  <span class='block rounded-xl border border-slate-200 overflow-hidden bg-white shadow-sm'>
    <span class='flex items-center justify-between gap-2 px-4 py-2.5 bg-[#1e88e5] border-b border-[#1a76c7]'>
      <span class='flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1'>
        <span class='inline-flex items-center justify-center w-6 h-6 rounded-md bg-white/20 text-white text-[10px] font-black shrink-0'>3</span>
        <span class='text-[13px] font-semibold leading-snug text-white'>Residential Homes</span>
      </span>
      <span class='text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white text-[#1e88e5] shrink-0 whitespace-nowrap'>Popular</span>
    </span>

    <span class='flex items-center justify-between gap-2 px-3 sm:px-4 py-2.5'>
      <span class='flex items-center gap-2.5 min-w-0 flex-1'>
        <span class='inline-flex items-center justify-center min-w-[48px] sm:min-w-[56px] h-7 sm:h-8 px-1.5 rounded-md bg-[#1e88e5]/10 text-[#1e88e5] text-[10px] sm:text-[11px] font-black shrink-0 whitespace-nowrap'>K 250</span>
        <span class='min-w-0'>
          <span class='block text-[12.5px] sm:text-[13px] font-bold text-slate-800 leading-tight break-words'>House / 2-Story Shop</span>
          <span class='hidden sm:block text-[11px] text-slate-500 mt-0.5 truncate'>Residential / standard shophouse</span>
        </span>
      </span>
      <span class='shrink-0 inline-flex items-baseline gap-0.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-[#1e88e5] text-white whitespace-nowrap'>
        <span class='text-xs font-bold leading-snug tabular-nums sm:text-sm'>Rp 850,000</span>
        <span class='hidden sm:inline text-[9px] font-semibold text-white/80'>/m³</span>
      </span>
    </span>

    <span class='flex items-center justify-between gap-2 px-3 sm:px-4 py-2.5 border-t border-slate-100'>
      <span class='flex items-center gap-2.5 min-w-0 flex-1'>
        <span class='inline-flex items-center justify-center min-w-[48px] sm:min-w-[56px] h-7 sm:h-8 px-1.5 rounded-md bg-[#1e88e5]/10 text-[#1e88e5] text-[10px] sm:text-[11px] font-black shrink-0 whitespace-nowrap'>K 225</span>
        <span class='min-w-0'>
          <span class='block text-[12.5px] sm:text-[13px] font-bold text-slate-800 leading-tight break-words'>Residential · Standard <span class='inline-block align-middle ml-1 text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-500 text-white'>Popular</span></span>
          <span class='hidden sm:block text-[11px] text-slate-500 mt-0.5 truncate'>Residential / shophouse, standard truck</span>
        </span>
      </span>
      <span class='shrink-0 inline-flex items-baseline gap-0.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-[#1e88e5] text-white whitespace-nowrap'>
        <span class='text-xs font-bold leading-snug tabular-nums sm:text-sm'>Rp 830,000</span>
        <span class='hidden sm:inline text-[9px] font-semibold text-white/80'>/m³</span>
      </span>
    </span>
  </span>

  <!-- TIER 4 -->
  <span class='block rounded-xl border border-slate-200 overflow-hidden bg-white shadow-sm'>
    <span class='flex items-center justify-between gap-2 px-4 py-2.5 bg-amber-500 border-b border-amber-600'>
      <span class='flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1'>
        <span class='inline-flex items-center justify-center w-6 h-6 rounded-md bg-white/20 text-white text-[10px] font-black shrink-0'>4</span>
        <span class='text-[13px] font-semibold leading-snug text-white'>Narrow Access (Mini Mix)</span>
      </span>
      <span class='text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white text-amber-600 shrink-0 whitespace-nowrap'>Special</span>
    </span>

    <span class='flex items-center justify-between gap-2 px-3 sm:px-4 py-2.5'>
      <span class='flex items-center gap-2.5 min-w-0 flex-1'>
        <span class='inline-flex items-center justify-center min-w-[48px] sm:min-w-[56px] h-7 sm:h-8 px-1.5 rounded-md bg-amber-100 text-amber-700 text-[10px] sm:text-[11px] font-black shrink-0 whitespace-nowrap'>K 225</span>
        <span class='min-w-0'>
          <span class='block text-[12.5px] sm:text-[13px] font-bold text-slate-800 leading-tight break-words'>K 225 · Mini Mix</span>
          <span class='hidden sm:block text-[11px] text-slate-500 mt-0.5 truncate'>Small truck for narrow alleys / streets</span>
        </span>
      </span>
      <span class='shrink-0 inline-flex items-baseline gap-0.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-amber-500 text-white whitespace-nowrap'>
        <span class='text-xs font-bold leading-snug tabular-nums sm:text-sm'>Rp 1,290,000</span>
        <span class='hidden sm:inline text-[9px] font-semibold text-white/80'>/m³</span>
      </span>
    </span>
  </span>

  <!-- TIER 5 -->
  <span class='block rounded-xl border border-slate-200 overflow-hidden bg-white shadow-sm'>
    <span class='flex items-center justify-between gap-2 px-4 py-2.5 bg-slate-500 border-b border-slate-600'>
      <span class='flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1'>
        <span class='inline-flex items-center justify-center w-6 h-6 rounded-md bg-white/15 text-white text-[10px] font-black shrink-0'>5</span>
        <span class='text-[13px] font-semibold leading-snug text-white'>Light Structures & LC</span>
      </span>
      <span class='text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/15 text-white shrink-0 whitespace-nowrap'>K 125–175 · B0</span>
    </span>

    <span class='flex items-center justify-between gap-2 px-3 sm:px-4 py-2.5'>
      <span class='flex items-center gap-2.5 min-w-0 flex-1'>
        <span class='inline-flex items-center justify-center min-w-[48px] sm:min-w-[56px] h-7 sm:h-8 px-1.5 rounded-md bg-slate-100 text-slate-700 text-[10px] sm:text-[11px] font-black shrink-0 whitespace-nowrap'>K 175</span>
        <span class='min-w-0'>
          <span class='block text-[12.5px] sm:text-[13px] font-bold text-slate-800 leading-tight break-words'>Class D · Lightweight</span>
          <span class='hidden sm:block text-[11px] text-slate-500 mt-0.5 truncate'>Lightweight building construction</span>
        </span>
      </span>
      <span class='shrink-0 inline-flex items-center px-2 sm:px-2.5 py-1 rounded-lg bg-[#1e88e5] text-white text-[9.5px] sm:text-[10.5px] font-bold whitespace-nowrap'>Contact Us</span>
    </span>

    <span class='flex items-center justify-between gap-2 px-3 sm:px-4 py-2.5 border-t border-slate-100'>
      <span class='flex items-center gap-2.5 min-w-0 flex-1'>
        <span class='inline-flex items-center justify-center min-w-[48px] sm:min-w-[56px] h-7 sm:h-8 px-1.5 rounded-md bg-slate-100 text-slate-700 text-[10px] sm:text-[11px] font-black shrink-0 whitespace-nowrap'>K 125</span>
        <span class='min-w-0'>
          <span class='block text-[12.5px] sm:text-[13px] font-bold text-slate-800 leading-tight break-words'>Class E · LC / Ground Floor</span>
          <span class='hidden sm:block text-[11px] text-slate-500 mt-0.5 truncate'>LC / ground floor</span>
        </span>
      </span>
      <span class='shrink-0 inline-flex items-center px-2 sm:px-2.5 py-1 rounded-lg bg-[#1e88e5] text-white text-[9.5px] sm:text-[10.5px] font-bold whitespace-nowrap'>Contact Us</span>
    </span>

    <span class='flex items-center justify-between gap-2 px-3 sm:px-4 py-2.5 border-t border-slate-100'>
      <span class='flex items-center gap-2.5 min-w-0 flex-1'>
        <span class='inline-flex items-center justify-center min-w-[48px] sm:min-w-[56px] h-7 sm:h-8 px-1.5 rounded-md bg-slate-100 text-slate-700 text-[10px] sm:text-[11px] font-black shrink-0 whitespace-nowrap'>B0</span>
        <span class='min-w-0'>
          <span class='block text-[12.5px] sm:text-[13px] font-bold text-slate-800 leading-tight break-words'>Class B0 · LC / Ground Floor</span>
          <span class='hidden sm:block text-[11px] text-slate-500 mt-0.5 truncate'>LC / ground floor</span>
        </span>
      </span>
      <span class='shrink-0 inline-flex items-center px-2 sm:px-2.5 py-1 rounded-lg bg-[#1e88e5] text-white text-[9.5px] sm:text-[10.5px] font-bold whitespace-nowrap'>Contact Us</span>
    </span>
  </span>

</span>`,
        },
      },
      {
        type: "paragraph",
        text: {
          id: "<span class='not-prose block my-4 p-4 rounded-r-xl border-l-4 border-slate-400 bg-slate-50'><span class='block text-[10px] font-bold uppercase tracking-widest text-slate-600 mb-1.5'>Catatan</span><span class='block text-sm text-slate-700 leading-relaxed'>Harga di atas dapat berubah sesuai jarak batching plant, kondisi akses lokasi, dan volume pemesanan (m³). Untuk penawaran pasti sesuai proyek Anda, silakan hubungi kami. Baca juga panduan terkait <a href='/blog/jasa-pengecoran-beton' class='text-[#1e88e5] hover:underline font-semibold'>Jasa Pengecoran Beton</a>.</span></span>",
          en: "<span class='not-prose block my-4 p-4 rounded-r-xl border-l-4 border-slate-400 bg-slate-50'><span class='block text-[10px] font-bold uppercase tracking-widest text-slate-600 mb-1.5'>Note</span><span class='block text-sm text-slate-700 leading-relaxed'>Prices above may vary depending on batching plant distance, site access conditions, and order volume (m³). For a definite quote for your project, please contact us. Also read the guide on Concrete Casting Services.</span></span>",
        },
      },
      {
        type: "heading",
        text: {
          id: "Faktor yang Mempengaruhi Harga Cor Beton",
          en: "Factors That Influence Concrete Prices",
        },
      },
      {
        type: "list",
        ordered: true,
        items: [
          {
            id: "<strong>Mutu Beton:</strong> Semakin tinggi mutu beton (K), semakin banyak semen dan material pendukung, sehingga harga naik.",
            en: "<strong>Concrete Grade:</strong> The higher the concrete grade (K), the more cement and supporting materials are needed, so the price increases.",
          },
          {
            id: "<strong>Volume Pemesanan:</strong> Pemesanan dalam jumlah besar biasanya lebih efisien per meter kubik.",
            en: "<strong>Order Volume:</strong> Larger orders are usually more efficient per cubic meter.",
          },
          {
            id: "<strong>Jarak ke Lokasi:</strong> Jarak dari batching plant ke lokasi mempengaruhi biaya transportasi dan waktu pengiriman.",
            en: "<strong>Distance to Site:</strong> The distance from the batching plant to the site affects transportation costs and delivery time.",
          },
          {
            id: "<strong>Akses Jalan:</strong> Lokasi dengan akses sempit membutuhkan Mini Mix, sehingga biaya per m³ lebih tinggi (lihat perbandingan K 225 standar vs Mini Mix).",
            en: "<strong>Road Access:</strong> Locations with narrow access require Mini Mix, so the cost per m³ is higher (see comparison of standard K 225 vs Mini Mix).",
          },
          {
            id: "<strong>Slump & Aditif:</strong> Kebutuhan tingkat kekentalan beton atau bahan tambahan khusus dapat mempengaruhi harga.",
            en: "<strong>Slump & Additives:</strong> The required concrete consistency or special additives can affect the price.",
          },
        ],
      },
      {
        type: "heading",
        text: {
          id: "Kami Bantu Hitung Kebutuhan Cor Beton Anda—Gratis",
          en: "We Help Calculate Your Concrete Needs—Free",
        },
      },
      {
        type: "paragraph",
        text: {
          id: "Tidak perlu bingung menghitung sendiri. Tim PT Tri Abadi Makmur akan membantu menghitungkan volume cor beton yang dibutuhkan sesuai ukuran area, ketebalan, dan jenis pekerjaan Anda. Cukup sampaikan panjang, lebar, dan rencana ketebalan, kami akan memberikan estimasi volume serta rekomendasi mutu beton yang tepat—termasuk menentukan apakah proyek Anda membutuhkan truk standar atau Mini Mix. Layanan konsultasi dan perhitungan ini gratis sebagai bagian dari survei lokasi.",
          en: "No need to be confused about calculating it yourself. The PT Tri Abadi Makmur team will help calculate the concrete volume needed according to your area size, thickness, and type of work. Just provide the length, width, and planned thickness, and we will give a volume estimate and recommend the right concrete grade—including determining whether your project needs a standard truck or Mini Mix. This consultation and calculation service is free as part of the site survey.",
        },
      },
      {
        type: "paragraph",
        text: {
          id: "Dengan perhitungan yang tepat dari ahlinya, Anda terhindar dari risiko kekurangan material di tengah pengecoran atau kelebihan volume yang membuang anggaran. Kami juga memastikan jadwal pengiriman truk mixer sesuai kebutuhan lapangan.",
          en: "With accurate calculation from experts, you avoid the risk of material shortage during casting or excess volume that wastes budget. We also ensure mixer truck delivery schedules match field needs.",
        },
      },
      {
        type: "heading",
        text: {
          id: "Tips Memilih Penyedia Cor Beton yang Tepat",
          en: "Tips for Choosing the Right Concrete Provider",
        },
      },
      {
        type: "list",
        ordered: true,
        items: [
          {
            id: "<strong>Pastikan mutu sesuai beban:</strong> Tidak semua pekerjaan membutuhkan K-400. Untuk rumah tinggal, K-250 atau K-275 umumnya sudah cukup. Konsultasikan agar tidak boros.",
            en: "<strong>Ensure the grade matches the load:</strong> Not all work requires K-400. For residential houses, K-250 or K-275 is generally sufficient. Consult so you don't overspend.",
          },
          {
            id: "<strong>Pilih penyedia yang membantu perhitungan:</strong> Penyedia profesional akan menghitungkan volume dan merekomendasikan mutu, bukan sekadar menjual material.",
            en: "<strong>Choose a provider that helps with calculations:</strong> A professional provider will calculate volume and recommend a grade, not just sell materials.",
          },
          {
            id: "<strong>Siapkan akses truk mixer:</strong> Jika akses sempit, gunakan Mini Mix (K 225 Mini Mix) agar pengiriman tetap lancar tanpa biaya tambahan di luar perhitungan.",
            en: "<strong>Prepare mixer truck access:</strong> If access is narrow, use Mini Mix (K 225 Mini Mix) so delivery remains smooth without unexpected additional costs.",
          },
          {
            id: "<strong>Perhatikan jadwal pengiriman:</strong> Pengecoran beton harus kontinu. Pastikan penyedia mampu mengatur pengiriman tepat waktu.",
            en: "<strong>Pay attention to delivery schedule:</strong> Concrete casting must be continuous. Make sure the provider can manage on-time deliveries.",
          },
        ],
      },
      {
        type: "paragraph",
        text: {
          id: "Butuh cor beton untuk jalan, halaman, parkir, atau struktur bangunan? Konsultasikan kebutuhan Anda dengan PT Tri Abadi Makmur. Kami melayani pengecoran ready mix di Jabodetabek, Banten, dan Jawa Barat dengan tim profesional serta material berkualitas. Hubungi kami via WhatsApp untuk survei lokasi, perhitungan volume gratis, dan penawaran terbaik.",
          en: "Need concrete casting for roads, yards, parking, or building structures? Consult your needs with PT Tri Abadi Makmur. We provide ready-mix casting in Greater Jakarta, Banten, and West Java with a professional team and quality materials. Contact us via WhatsApp for a site survey, free volume calculation, and the best offer.",
        },
      },
      {
        type: "paragraph",
        text: {
          id: `Lihat contoh lingkup cor dan finishing lantai gudang di Cikarang. <a href='${concreteStudy.path}' class='text-blue-800 underline font-semibold'>Baca studi kasus proyek</a>.`,
          en: `See an example of warehouse floor casting and finishing in Cikarang. <a href='${concreteStudy.path}' class='text-blue-800 underline font-semibold'>Read the project case study</a>.`,
        },
      },
    ],
  },
  {
  slug: "harga-kanstin-2026",
  modifiedDateISO: "2026-11-24",
  date: { id: "24 November 2026", en: "November 24, 2026" },
  dateISO: "2026-11-24",
  canonical: "https://triabadimakmur.co.id/blog/harga-kanstin-2026",
  src: "/proyek/pasang-kanstin.webp",
  category: { id: "Kanstin", en: "Curb" },

  meta: {
    title: {
      id: "Harga Kanstin 2026: Rp42.500–Rp99.200/m Lari (Taman, Trotoar, DKI, S)",
      en: "Curb Prices 2026: Rp42,500–Rp99,200 per Running Meter (Garden, Sidewalk, DKI, S)",
    },
    description: {
      id: "Daftar harga kanstin 2026 per buah & per meter lari: taman Rp42.500, trotoar Rp67.500, DKI Rp99.200, kanstin S Rp75.000. Lengkap rumus estimasi biaya, faktor waste, mutu beton SNI, dan survei gratis Jabodetabek.",
      en: "2026 curb price list per piece & per running meter: garden Rp42,500, sidewalk Rp67,500, DKI Rp99,200, S curb Rp75,000. Includes a full cost estimation formula, waste factor, SNI concrete grades, and free surveys in Greater Jakarta.",
    },
  },

  title: {
    id: "Harga Kanstin 2026 per Meter: DKI, S, Trotoar & Taman",
    en: "Curb Prices 2026 per Meter: DKI, S, Sidewalk & Garden",
  },
  desc: {
    id: "Harga kanstin 2026 per buah dan per meter lari untuk taman, trotoar, DKI, dan S. Cara hitung estimasi dan survei gratis di Jabodetabek.",
    en: "2026 curb prices per piece and per running meter for garden, sidewalk, DKI, and S types. How to estimate costs and a free survey in Greater Jakarta.",
  },

  author: {
    name: "PT. Tri Abadi Makmur Indonesia",
    phone: "082258089367",
    avatar: "/logo.webp",
    lastUpdated: { id: "24 November 2026", en: "November 24, 2026" },
    bio: {
      id: "Tri Abadi Makmur merupakan perusahaan yang bergerak di bidang konstruksi, dengan pengalaman yang sudah bertahun – tahun kami kembangkan, tahapan proses yang mengedepankan kualitas dan kehati-hatian, serta eksekusi pengerjaan proyek yang signifikan, demi tercapainya kepuasan client sehingga terwujudnya jalinan kerjasama yang continue dan berkelanjutan.",
      en: "Tri Abadi Makmur is a construction company with years of experience we have developed, a process that prioritizes quality and prudence, as well as the execution of significant projects, in order to achieve client satisfaction so that continuous and long-term cooperation is realized.",
    },
  },

  tags: [
    { id: "Pemasangan Kansteen", en: "Kansteen Installation", slug: "pemasangan-kansteen" },
    { id: "Pemasangan Paving Block", en: "Paving Block Installation", slug: "pemasangan-paving-block" },
    { id: "Biaya Aspal Per Meter", en: "Asphalt Cost Per Meter", slug: "biaya-aspal-per-meter" },
    { id: "Layanan Pasang Kanstin", en: "Curb Installation Service", href: "/layanan/infrastruktur/pasang-kanstin" },
  ],

  schema: [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Harga Kanstin 2026 per Meter: DKI, S, Trotoar & Taman",
      "description": "Harga kanstin 2026 per buah dan per meter lari untuk taman, trotoar, DKI, dan S, lengkap dengan rumus estimasi biaya, faktor waste, mutu beton SNI, dan survei gratis Jabodetabek.",
      "image": "https://triabadimakmur.co.id/proyek/pasang-kanstin.webp",
      "datePublished": "2026-11-24",
      "dateModified": "2026-11-24",
      "author": {
        "@type": "Organization",
        "name": "PT. Tri Abadi Makmur Indonesia",
        "telephone": "082258089367",
        "logo": "https://triabadimakmur.co.id/logo.webp"
      },
      "publisher": {
        "@type": "Organization",
        "name": "PT. Tri Abadi Makmur Indonesia",
        "logo": { "@type": "ImageObject", "url": "https://triabadimakmur.co.id/logo.webp" }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://triabadimakmur.co.id/blog/harga-kanstin-2026"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Kanstin Beton 2026 (Taman, Trotoar, DKI, S)",
      "image": "https://triabadimakmur.co.id/proyek/pasang-kanstin.webp",
      "description": "Kanstin beton precast untuk taman, trotoar, jalan lingkungan, dan pembatas. Tersedia tipe Taman, Trotoar, DKI, dan S dengan harga Rp42.500–Rp99.200 per meter lari.",
      "brand": { "@type": "Brand", "name": "Tri Abadi Makmur" },
      "category": "Kanstin Beton / Concrete Curb",
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "IDR",
        "lowPrice": "42500",
        "highPrice": "99200",
        "offerCount": "7",
        "availability": "https://schema.org/InStock",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "priceCurrency": "IDR",
          "unitText": "running meter",
          "unitCode": "MTR"
        }
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Berapa harga kanstin per meter di 2026?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Perkiraan harga kanstin mulai dari Rp42.500 per meter lari (taman 40 × 20 × 10 cm) sampai Rp99.200 per meter lari (DKI 60 × 30 × 25 × 20 cm). Harga final mengikuti volume dan lokasi."
          }
        },
        {
          "@type": "Question",
          "name": "Apakah harga sudah termasuk pemasangan?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Tabel menampilkan harga kanstin per buah dan konversinya per meter lari. Jasa pasang, pekerjaan dasar, dan mobilisasi dihitung terpisah dalam penawaran."
          }
        },
        {
          "@type": "Question",
          "name": "Apakah survei lokasi gratis?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ya. Survei mengukur panjang, melihat kondisi tanah, dan memberi estimasi awal tanpa biaya di area Jabodetabek, Banten, dan Jawa Barat."
          }
        },
        {
          "@type": "Question",
          "name": "Berapa lama pemasangan kanstin?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Tergantung panjang dan akses lokasi. Estimasi waktu diberikan setelah survei."
          }
        },
        {
          "@type": "Question",
          "name": "Apa beda kanstin dan kansteen?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Keduanya merujuk pada benda yang sama. Kanstin adalah ejaan yang lebih umum di daftar harga, sedangkan kansteen sering dipakai di spesifikasi teknis dan RAB proyek. Istilah lain yang juga dipakai adalah kerb atau curb."
          }
        },
        {
          "@type": "Question",
          "name": "Mutu beton apa yang dipakai untuk kanstin?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Kanstin umumnya dicetak dengan mutu beton K-250 hingga K-350 (setara f'c sekitar 20–30 MPa). Kanstin taman cukup K-250, sedangkan kanstin DKI yang menahan beban kendaraan disarankan K-300 ke atas dengan metode cetak vibro press."
          }
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Beranda", "item": "https://triabadimakmur.co.id/" },
        { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://triabadimakmur.co.id/blog" },
        { "@type": "ListItem", "position": 3, "name": "Harga Kanstin 2026", "item": "https://triabadimakmur.co.id/blog/harga-kanstin-2026" }
      ]
    }
  ],

  body: [
    {
      type: "paragraph",
      text: {
        id: `<div class='not-prose my-6 rounded-2xl border-l-4 border-[#1e88e5] bg-blue-50/70 p-5 sm:p-6'><span class='block text-base leading-relaxed text-slate-800'>Harga kanstin 2026 berkisar <strong>Rp42.500 – Rp99.200 per meter lari</strong>, tergantung jenis, ukuran, dan kondisi lokasi. Artikel ini merinci harga kanstin taman, trotoar, DKI, dan S per buah, cara menghitung estimasi kansteen (kanstin) untuk proyek Anda, serta layanan pemasangan di Jabodetabek, Banten, dan Jawa Barat.</span></div>`,
        en: `<div class='not-prose my-6 rounded-2xl border-l-4 border-[#1e88e5] bg-blue-50/70 p-5 sm:p-6'><span class='block text-base leading-relaxed text-slate-800'>Curb prices in 2026 range from <strong>Rp42,500 to Rp99,200 per running meter</strong>, depending on type, size, and site conditions. This article covers garden, sidewalk, DKI, and S curb prices per piece, how to estimate curb (kansteen) costs for your project, and our installation services in Greater Jakarta, Banten, and West Java.</span></div>`,
      },
    },
    {
      type: "paragraph",
      text: {
        id: `<figure class='not-prose my-6 overflow-hidden rounded-2xl shadow-lg ring-1 ring-slate-900/5'><img src='/proyek/pasang-kanstin.webp' alt='Pemasangan kanstin di lokasi proyek PT Tri Abadi Makmur' loading='lazy' decoding='async' class='h-auto w-full object-cover' style='aspect-ratio:16/9'><figcaption class='bg-slate-50 px-4 py-2.5 text-xs text-slate-500'>Pemasangan kanstin di lokasi proyek.</figcaption></figure>`,
        en: `<figure class='not-prose my-6 overflow-hidden rounded-2xl shadow-lg ring-1 ring-slate-900/5'><img src='/proyek/pasang-kanstin.webp' alt='Curb installation at a PT Tri Abadi Makmur project site' loading='lazy' decoding='async' class='h-auto w-full object-cover' style='aspect-ratio:16/9'><figcaption class='bg-slate-50 px-4 py-2.5 text-xs text-slate-500'>Curb installation at a project site.</figcaption></figure>`,
      },
    },
    {
      type: "heading",
      text: { id: "Kenapa kanstin dihitung per meter lari?", en: "Why are curbs priced per running meter?" },
    },
    {
      type: "paragraph",
      text: {
        id: "Kanstin berbentuk memanjang, jadi satuan yang paling tepat adalah panjang, bukan luas. Itu sebabnya harga kanstin disebut <strong>per meter lari</strong>. Pengaspalan dan <a href='/blog/pemasangan-paving-block' class='font-semibold text-[#1e88e5] underline underline-offset-2'>paving block</a> dihitung per m² karena menutup area, sedangkan kanstin mengikuti garis tepi.",
        en: "Curbs are linear, so length is the most accurate unit, not area. That is why curb prices are quoted <strong>per running meter</strong>. Asphalt and <a href='/blog/pemasangan-paving-block' class='font-semibold text-[#1e88e5] underline underline-offset-2'>paving blocks</a> are priced per m² because they cover an area, while curbs follow an edge line.",
      },
    },
    {
      type: "heading",
      text: { id: "Jenis kanstin dan kegunaannya", en: "Curb types and their uses" },
    },
    {
      type: "paragraph",
      text: {
        id: `<div class='not-prose my-5 grid gap-4 sm:grid-cols-2'>
<div class='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'><span class='block h-1 w-10 rounded-full bg-[#16a34a]'></span><span class='mt-3 block font-bold text-slate-900'>Kanstin Taman</span><span class='mt-1.5 block text-sm leading-relaxed text-slate-600'>Ukuran paling kecil untuk batas taman, bedengan, dan area tanaman.</span></div>
<div class='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'><span class='block h-1 w-10 rounded-full bg-[#3b82f6]'></span><span class='mt-3 block font-bold text-slate-900'>Kanstin Trotoar</span><span class='mt-1.5 block text-sm leading-relaxed text-slate-600'>Dirancang untuk tepi trotoar dan jalur pejalan kaki yang rapi.</span></div>
<div class='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'><span class='block h-1 w-10 rounded-full bg-[#e11d48]'></span><span class='mt-3 block font-bold text-slate-900'>Kanstin DKI</span><span class='mt-1.5 block text-sm leading-relaxed text-slate-600'>Ukuran paling besar dan kokoh untuk jalan lingkungan, jalan kawasan, dan pembatas yang menahan beban.</span></div>
<div class='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'><span class='block h-1 w-10 rounded-full bg-[#d97706]'></span><span class='mt-3 block font-bold text-slate-900'>Kanstin S</span><span class='mt-1.5 block text-sm leading-relaxed text-slate-600'>Berprofil S yang khas, sering dipakai sebagai pembatas jalan dan trotoar dengan tampilan lebih lembut.</span></div>
</div>`,
        en: `<div class='not-prose my-5 grid gap-4 sm:grid-cols-2'>
<div class='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'><span class='block h-1 w-10 rounded-full bg-[#16a34a]'></span><span class='mt-3 block font-bold text-slate-900'>Garden Curb</span><span class='mt-1.5 block text-sm leading-relaxed text-slate-600'>The smallest size, used as a border for gardens, planters, and planting areas.</span></div>
<div class='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'><span class='block h-1 w-10 rounded-full bg-[#3b82f6]'></span><span class='mt-3 block font-bold text-slate-900'>Sidewalk Curb</span><span class='mt-1.5 block text-sm leading-relaxed text-slate-600'>Designed for sidewalk edges and neat pedestrian paths.</span></div>
<div class='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'><span class='block h-1 w-10 rounded-full bg-[#e11d48]'></span><span class='mt-3 block font-bold text-slate-900'>DKI Curb</span><span class='mt-1.5 block text-sm leading-relaxed text-slate-600'>The largest and sturdiest size for neighborhood roads, estate roads, and load-bearing borders.</span></div>
<div class='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'><span class='block h-1 w-10 rounded-full bg-[#d97706]'></span><span class='mt-3 block font-bold text-slate-900'>S Curb</span><span class='mt-1.5 block text-sm leading-relaxed text-slate-600'>Distinctive S-shaped profile, often used as road and sidewalk edging for a softer look.</span></div>
</div>`,
      },
    },
    {
      type: "paragraph",
      text: {
        id: "<span class='not-prose block text-sm leading-relaxed text-slate-600'>Di lapangan, istilah <strong>kansteen</strong>, <strong>kanstin</strong>, dan <strong>kerb</strong> dipakai bergantian untuk benda yang sama. Jika Anda menyusun RAB, pastikan spesifikasi menulis satu istilah secara konsisten agar tidak terjadi salah tafsir saat pengadaan.</span>",
        en: "<span class='not-prose block text-sm leading-relaxed text-slate-600'>On site, the terms <strong>kansteen</strong>, <strong>kanstin</strong>, and <strong>kerb</strong> are used interchangeably for the same item. If you are drafting a bill of quantities, keep one term consistent to avoid procurement misunderstandings.</span>",
      },
    },
    {
      type: "heading",
      id: "harga-per-meter",
      text: {
        id: "Harga kanstin 2026 per buah dan per meter lari",
        en: "2026 curb prices per piece and per running meter",
      },
    },
    {
      type: "paragraph",
      text: {
        id: `<div class='not-prose my-6'>
<div class='rounded-2xl bg-slate-900 p-6 text-white sm:p-7'>
<span class='block text-[10px] font-bold uppercase tracking-[0.25em] text-[#4da3ff]'>Kisaran perkiraan harga kanstin per meter lari</span>
<span class='mt-2 block text-2xl font-extrabold tabular-nums sm:text-3xl'>Rp42.500 – Rp99.200 <span class='text-sm font-medium text-slate-300'>/m lari</span></span>
<span class='mt-2 block text-xs leading-relaxed text-slate-300'>Dari harga per buah × buah per meter. Jasa pasang, pekerjaan dasar, dan mobilisasi dihitung terpisah.</span>
</div>
<div class='mt-4 grid gap-4 sm:grid-cols-2'>
<div class='overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
<div class='px-5 py-4' style='background:#f0fdf4'><span class='text-xs font-bold uppercase tracking-[0.18em]' style='color:#15803d'>Kanstin Taman</span></div>
<div class='px-5'>
<div class='border-t border-slate-100 py-3.5'><div class='flex items-baseline justify-between gap-3'><span class='text-sm font-semibold text-slate-800'>40 × 20 × 10 cm</span><span class='text-base font-extrabold tabular-nums text-slate-950'>Rp42.500<span class='ml-0.5 text-[11px] font-semibold text-slate-400'>/m lari</span></span></div><div class='mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100'><div class='h-full rounded-full' style='width:43%;background:#16a34a'></div></div><span class='mt-1.5 block text-[11px] text-slate-500'>Rp17.000 per buah · 2,5 buah per meter</span></div>
<div class='border-t border-slate-100 py-3.5'><div class='flex items-baseline justify-between gap-3'><span class='text-sm font-semibold text-slate-800'>40 × 20 × 15 × 13 cm</span><span class='text-base font-extrabold tabular-nums text-slate-950'>Rp57.500<span class='ml-0.5 text-[11px] font-semibold text-slate-400'>/m lari</span></span></div><div class='mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100'><div class='h-full rounded-full' style='width:58%;background:#16a34a'></div></div><span class='mt-1.5 block text-[11px] text-slate-500'>Rp23.000 per buah · 2,5 buah per meter</span></div>
</div>
</div>
<div class='overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
<div class='px-5 py-4' style='background:#eff6ff'><span class='text-xs font-bold uppercase tracking-[0.18em]' style='color:#1d4ed8'>Kanstin Trotoar</span></div>
<div class='px-5'>
<div class='border-t border-slate-100 py-3.5'><div class='flex items-baseline justify-between gap-3'><span class='text-sm font-semibold text-slate-800'>40 × 25 × 16 × 13 cm</span><span class='text-base font-extrabold tabular-nums text-slate-950'>Rp67.500<span class='ml-0.5 text-[11px] font-semibold text-slate-400'>/m lari</span></span></div><div class='mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100'><div class='h-full rounded-full' style='width:68%;background:#3b82f6'></div></div><span class='mt-1.5 block text-[11px] text-slate-500'>Rp27.000 per buah · 2,5 buah per meter</span></div>
<div class='border-t border-slate-100 py-3.5'><div class='flex items-baseline justify-between gap-3'><span class='text-sm font-semibold text-slate-800'>40 × 28 × 15 × 13 cm</span><span class='text-base font-extrabold tabular-nums text-slate-950'>Rp72.500<span class='ml-0.5 text-[11px] font-semibold text-slate-400'>/m lari</span></span></div><div class='mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100'><div class='h-full rounded-full' style='width:73%;background:#3b82f6'></div></div><span class='mt-1.5 block text-[11px] text-slate-500'>Rp29.000 per buah · 2,5 buah per meter</span></div>
</div>
</div>
<div class='overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
<div class='px-5 py-4' style='background:#fff1f2'><span class='text-xs font-bold uppercase tracking-[0.18em]' style='color:#be123c'>Kanstin DKI</span></div>
<div class='px-5'>
<div class='border-t border-slate-100 py-3.5'><div class='flex items-baseline justify-between gap-3'><span class='text-sm font-semibold text-slate-800'>60 × 25 × 22 × 18 cm</span><span class='text-base font-extrabold tabular-nums text-slate-950'>Rp92.800<span class='ml-0.5 text-[11px] font-semibold text-slate-400'>/m lari</span></span></div><div class='mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100'><div class='h-full rounded-full' style='width:94%;background:#e11d48'></div></div><span class='mt-1.5 block text-[11px] text-slate-500'>Rp58.000 per buah · 1,6 buah per meter</span></div>
<div class='border-t border-slate-100 py-3.5'><div class='flex items-baseline justify-between gap-3'><span class='text-sm font-semibold text-slate-800'>60 × 30 × 25 × 20 cm</span><span class='text-base font-extrabold tabular-nums text-slate-950'>Rp99.200<span class='ml-0.5 text-[11px] font-semibold text-slate-400'>/m lari</span></span></div><div class='mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100'><div class='h-full rounded-full' style='width:100%;background:#e11d48'></div></div><span class='mt-1.5 block text-[11px] text-slate-500'>Rp62.000 per buah · 1,6 buah per meter</span></div>
</div>
</div>
<div class='overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
<div class='px-5 py-4' style='background:#fffbeb'><span class='text-xs font-bold uppercase tracking-[0.18em]' style='color:#b45309'>Kanstin S</span></div>
<div class='px-5'>
<div class='border-t border-slate-100 py-3.5'><div class='flex items-baseline justify-between gap-3'><span class='text-sm font-semibold text-slate-800'>40 × 30 × 16 cm</span><span class='text-base font-extrabold tabular-nums text-slate-950'>Rp75.000<span class='ml-0.5 text-[11px] font-semibold text-slate-400'>/m lari</span></span></div><div class='mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100'><div class='h-full rounded-full' style='width:76%;background:#d97706'></div></div><span class='mt-1.5 block text-[11px] text-slate-500'>Rp30.000 per buah · 2,5 buah per meter</span></div>
</div>
</div>
</div>
</div>`,
        en: `<div class='not-prose my-6'>
<div class='rounded-2xl bg-slate-900 p-6 text-white sm:p-7'>
<span class='block text-[10px] font-bold uppercase tracking-[0.25em] text-[#4da3ff]'>Estimated curb price range per running meter</span>
<span class='mt-2 block text-2xl font-extrabold tabular-nums sm:text-3xl'>Rp42,500 – Rp99,200 <span class='text-sm font-medium text-slate-300'>/running m</span></span>
<span class='mt-2 block text-xs leading-relaxed text-slate-300'>Price per piece × pieces per meter. Installation, base work, and mobilization are quoted separately.</span>
</div>
<div class='mt-4 grid gap-4 sm:grid-cols-2'>
<div class='overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
<div class='px-5 py-4' style='background:#f0fdf4'><span class='text-xs font-bold uppercase tracking-[0.18em]' style='color:#15803d'>Garden Curb</span></div>
<div class='px-5'>
<div class='border-t border-slate-100 py-3.5'><div class='flex items-baseline justify-between gap-3'><span class='text-sm font-semibold text-slate-800'>40 × 20 × 10 cm</span><span class='text-base font-extrabold tabular-nums text-slate-950'>Rp42,500<span class='ml-0.5 text-[11px] font-semibold text-slate-400'>/running m</span></span></div><div class='mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100'><div class='h-full rounded-full' style='width:43%;background:#16a34a'></div></div><span class='mt-1.5 block text-[11px] text-slate-500'>Rp17,000 per piece · 2.5 pieces per meter</span></div>
<div class='border-t border-slate-100 py-3.5'><div class='flex items-baseline justify-between gap-3'><span class='text-sm font-semibold text-slate-800'>40 × 20 × 15 × 13 cm</span><span class='text-base font-extrabold tabular-nums text-slate-950'>Rp57,500<span class='ml-0.5 text-[11px] font-semibold text-slate-400'>/running m</span></span></div><div class='mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100'><div class='h-full rounded-full' style='width:58%;background:#16a34a'></div></div><span class='mt-1.5 block text-[11px] text-slate-500'>Rp23,000 per piece · 2.5 pieces per meter</span></div>
</div>
</div>
<div class='overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
<div class='px-5 py-4' style='background:#eff6ff'><span class='text-xs font-bold uppercase tracking-[0.18em]' style='color:#1d4ed8'>Sidewalk Curb</span></div>
<div class='px-5'>
<div class='border-t border-slate-100 py-3.5'><div class='flex items-baseline justify-between gap-3'><span class='text-sm font-semibold text-slate-800'>40 × 25 × 16 × 13 cm</span><span class='text-base font-extrabold tabular-nums text-slate-950'>Rp67,500<span class='ml-0.5 text-[11px] font-semibold text-slate-400'>/running m</span></span></div><div class='mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100'><div class='h-full rounded-full' style='width:68%;background:#3b82f6'></div></div><span class='mt-1.5 block text-[11px] text-slate-500'>Rp27,000 per piece · 2.5 pieces per meter</span></div>
<div class='border-t border-slate-100 py-3.5'><div class='flex items-baseline justify-between gap-3'><span class='text-sm font-semibold text-slate-800'>40 × 28 × 15 × 13 cm</span><span class='text-base font-extrabold tabular-nums text-slate-950'>Rp72,500<span class='ml-0.5 text-[11px] font-semibold text-slate-400'>/running m</span></span></div><div class='mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100'><div class='h-full rounded-full' style='width:73%;background:#3b82f6'></div></div><span class='mt-1.5 block text-[11px] text-slate-500'>Rp29,000 per piece · 2.5 pieces per meter</span></div>
</div>
</div>
<div class='overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
<div class='px-5 py-4' style='background:#fff1f2'><span class='text-xs font-bold uppercase tracking-[0.18em]' style='color:#be123c'>DKI Curb</span></div>
<div class='px-5'>
<div class='border-t border-slate-100 py-3.5'><div class='flex items-baseline justify-between gap-3'><span class='text-sm font-semibold text-slate-800'>60 × 25 × 22 × 18 cm</span><span class='text-base font-extrabold tabular-nums text-slate-950'>Rp92,800<span class='ml-0.5 text-[11px] font-semibold text-slate-400'>/running m</span></span></div><div class='mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100'><div class='h-full rounded-full' style='width:94%;background:#e11d48'></div></div><span class='mt-1.5 block text-[11px] text-slate-500'>Rp58,000 per piece · 1.6 pieces per meter</span></div>
<div class='border-t border-slate-100 py-3.5'><div class='flex items-baseline justify-between gap-3'><span class='text-sm font-semibold text-slate-800'>60 × 30 × 25 × 20 cm</span><span class='text-base font-extrabold tabular-nums text-slate-950'>Rp99,200<span class='ml-0.5 text-[11px] font-semibold text-slate-400'>/running m</span></span></div><div class='mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100'><div class='h-full rounded-full' style='width:100%;background:#e11d48'></div></div><span class='mt-1.5 block text-[11px] text-slate-500'>Rp62,000 per piece · 1.6 pieces per meter</span></div>
</div>
</div>
<div class='overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
<div class='px-5 py-4' style='background:#fffbeb'><span class='text-xs font-bold uppercase tracking-[0.18em]' style='color:#b45309'>S Curb</span></div>
<div class='px-5'>
<div class='border-t border-slate-100 py-3.5'><div class='flex items-baseline justify-between gap-3'><span class='text-sm font-semibold text-slate-800'>40 × 30 × 16 cm</span><span class='text-base font-extrabold tabular-nums text-slate-950'>Rp75,000<span class='ml-0.5 text-[11px] font-semibold text-slate-400'>/running m</span></span></div><div class='mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100'><div class='h-full rounded-full' style='width:76%;background:#d97706'></div></div><span class='mt-1.5 block text-[11px] text-slate-500'>Rp30,000 per piece · 2.5 pieces per meter</span></div>
</div>
</div>
</div>
</div>`,
      },
    },
    {
      type: "paragraph",
      text: {
        id: "<span class='not-prose block text-xs leading-relaxed text-slate-500'>Harga per buah mengikuti daftar harga kami. Harga final tergantung volume pekerjaan dan kondisi lokasi.</span>",
        en: "<span class='not-prose block text-xs leading-relaxed text-slate-500'>Prices per piece follow our price list. The final price depends on work volume and site conditions.</span>",
      },
    },

    {
      type: "heading",
      text: {
        id: "Cara menghitung estimasi biaya (rumus + 3 contoh)",
        en: "How to estimate the cost (formula + 3 worked examples)",
      },
    },
    {
      type: "list",
      ordered: true,
      items: [
        {
          id: "Ukur panjang tepi yang akan dipasang, termasuk sudut dan belokan. Ukur mengikuti garis tepi aktual, bukan garis lurus terpendek.",
          en: "Measure the edge length to be installed, including corners and bends. Measure along the actual edge line, not the shortest straight line.",
        },
        {
          id: "Tentukan faktor cadangan (waste): 5% untuk jalur lurus, 10% untuk 1–4 sudut, 15% untuk pola taman dengan banyak tikungan.",
          en: "Set the waste factor: 5% for straight runs, 10% for 1–4 corners, 15% for garden patterns with many bends.",
        },
        {
          id: "Kalikan panjang setelah cadangan dengan harga per meter lari sesuai tabel di atas.",
          en: "Multiply the length after waste by the running meter price in the table above.",
        },
        {
          id: "Tambahkan jasa pasang (per meter), pekerjaan dasar (lantai kerja + pemadatan), dan mobilisasi alat/material.",
          en: "Add installation (per meter), base work (bedding + compaction), and mobilization of tools/materials.",
        },
      ],
    },
    {
      type: "paragraph",
      text: {
        id: `<div class='not-prose my-5 rounded-2xl bg-slate-900 p-5 text-center sm:p-6'>
<span class='block text-[10px] font-bold uppercase tracking-[0.25em] text-[#4da3ff]'>Rumus lengkap</span>
<span class='mt-2 block font-mono text-sm text-white sm:text-base'>Total = (P × (1 + w) × H) + (P × J) + D + M</span>
<span class='mt-2 block text-[11px] text-slate-400'>P = panjang (m) · w = faktor cadangan · H = harga/m lari · J = jasa pasang/m · D = pekerjaan dasar · M = mobilisasi</span>
</div>
<div class='not-prose my-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
<div class='bg-blue-50 px-5 py-3.5 text-sm font-bold text-blue-900'>Arti setiap variabel</div>
<div class='divide-y divide-slate-100 px-5'>
<div class='flex items-start justify-between gap-4 py-3 text-sm'><span class='font-bold text-slate-950'>P</span><span class='text-right text-slate-600'>Panjang tepi aktual yang dipasang, termasuk keliling sudut dan belokan</span></div>
<div class='flex items-start justify-between gap-4 py-3 text-sm'><span class='font-bold text-slate-950'>w</span><span class='text-right text-slate-600'>Faktor cadangan: 5% lurus · 10% 1–4 sudut · 15% banyak tikungan</span></div>
<div class='flex items-start justify-between gap-4 py-3 text-sm'><span class='font-bold text-slate-950'>H</span><span class='text-right text-slate-600'>Harga kanstin per meter lari sesuai jenis & ukuran (lihat tabel)</span></div>
<div class='flex items-start justify-between gap-4 py-3 text-sm'><span class='font-bold text-slate-950'>J</span><span class='text-right text-slate-600'>Jasa pasang per meter (tenaga, mortar, alat bantu)</span></div>
<div class='flex items-start justify-between gap-4 py-3 text-sm'><span class='font-bold text-slate-950'>D</span><span class='text-right text-slate-600'>Pekerjaan dasar: lantai kerja, pasir, dan pemadatan</span></div>
<div class='flex items-start justify-between gap-4 py-3 text-sm'><span class='font-bold text-slate-950'>M</span><span class='text-right text-slate-600'>Mobilisasi: angkut material, alat, dan bongkaran kanstin lama bila ada</span></div>
</div>
</div>
<div class='not-prose my-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
<div class='bg-emerald-50 px-5 py-3.5 text-sm font-bold text-emerald-900'>Panduan cepat menentukan faktor cadangan (w)</div>
<div class='divide-y divide-slate-100 px-5'>
<div class='flex items-center justify-between gap-4 py-3 text-sm'><span class='text-slate-600'>Jalur lurus, tanpa potongan sudut</span><span class='font-bold text-slate-950'>5%</span></div>
<div class='flex items-center justify-between gap-4 py-3 text-sm'><span class='text-slate-600'>1–4 sudut 90° atau belokan</span><span class='font-bold text-slate-950'>10%</span></div>
<div class='flex items-center justify-between gap-4 py-3 text-sm'><span class='text-slate-600'>Banyak sudut, tikungan radius kecil, atau pola taman</span><span class='font-bold text-slate-950'>15%</span></div>
</div>
</div>`,
        en: `<div class='not-prose my-5 rounded-2xl bg-slate-900 p-5 text-center sm:p-6'>
<span class='block text-[10px] font-bold uppercase tracking-[0.25em] text-[#4da3ff]'>Full formula</span>
<span class='mt-2 block font-mono text-sm text-white sm:text-base'>Total = (P × (1 + w) × H) + (P × J) + D + M</span>
<span class='mt-2 block text-[11px] text-slate-400'>P = length (m) · w = waste factor · H = price per running m · J = installation per m · D = base work · M = mobilization</span>
</div>
<div class='not-prose my-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
<div class='bg-blue-50 px-5 py-3.5 text-sm font-bold text-blue-900'>What each variable means</div>
<div class='divide-y divide-slate-100 px-5'>
<div class='flex items-start justify-between gap-4 py-3 text-sm'><span class='font-bold text-slate-950'>P</span><span class='text-right text-slate-600'>Actual edge length installed, including corner perimeters and bends</span></div>
<div class='flex items-start justify-between gap-4 py-3 text-sm'><span class='font-bold text-slate-950'>w</span><span class='text-right text-slate-600'>Waste factor: 5% straight · 10% 1–4 corners · 15% many bends</span></div>
<div class='flex items-start justify-between gap-4 py-3 text-sm'><span class='font-bold text-slate-950'>H</span><span class='text-right text-slate-600'>Curb price per running meter by type & size (see table)</span></div>
<div class='flex items-start justify-between gap-4 py-3 text-sm'><span class='font-bold text-slate-950'>J</span><span class='text-right text-slate-600'>Installation per meter (labor, mortar, hand tools)</span></div>
<div class='flex items-start justify-between gap-4 py-3 text-sm'><span class='font-bold text-slate-950'>D</span><span class='text-right text-slate-600'>Base work: bedding, sand, and compaction</span></div>
<div class='flex items-start justify-between gap-4 py-3 text-sm'><span class='font-bold text-slate-950'>M</span><span class='text-right text-slate-600'>Mobilization: material transport, tools, and old curb demolition if any</span></div>
</div>
</div>
<div class='not-prose my-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
<div class='bg-emerald-50 px-5 py-3.5 text-sm font-bold text-emerald-900'>Quick guide to choosing the waste factor (w)</div>
<div class='divide-y divide-slate-100 px-5'>
<div class='flex items-center justify-between gap-4 py-3 text-sm'><span class='text-slate-600'>Straight run, no cut corners</span><span class='font-bold text-slate-950'>5%</span></div>
<div class='flex items-center justify-between gap-4 py-3 text-sm'><span class='text-slate-600'>1–4 right angles or bends</span><span class='font-bold text-slate-950'>10%</span></div>
<div class='flex items-center justify-between gap-4 py-3 text-sm'><span class='text-slate-600'>Many corners, tight radius bends, or garden patterns</span><span class='font-bold text-slate-950'>15%</span></div>
</div>
</div>`,
      },
    },
    {
      type: "paragraph",
      text: {
        id: `<div class='not-prose my-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
<div class='bg-slate-50 px-5 py-3.5 text-sm font-bold text-slate-900'>Contoh 1 — Taman lurus, 20 meter</div>
<div class='divide-y divide-slate-100 px-5'>
<div class='flex items-center justify-between gap-4 py-3 text-sm'><span class='text-slate-600'>Jenis & ukuran</span><span class='font-bold text-slate-950'>Kanstin taman 40 × 20 × 10 cm</span></div>
<div class='flex items-center justify-between gap-4 py-3 text-sm'><span class='text-slate-600'>Panjang + cadangan 5%</span><span class='font-bold text-slate-950'>20 × 1,05 = 21 meter</span></div>
<div class='flex items-center justify-between gap-4 py-3 text-sm'><span class='text-slate-600'>Biaya kanstin</span><span class='font-bold text-slate-950'>21 × Rp42.500 = Rp892.500</span></div>
<div class='flex items-center justify-between gap-4 py-3 text-sm'><span class='text-slate-600'>Jasa pasang (asumsi Rp15.000/m)</span><span class='font-bold text-slate-950'>20 × Rp15.000 = Rp300.000</span></div>
<div class='flex items-center justify-between gap-4 py-3 text-sm'><span class='text-slate-600'>Pekerjaan dasar (asumsi)</span><span class='font-bold text-slate-950'>Rp300.000</span></div>
<div class='flex items-center justify-between gap-4 py-3 text-sm'><span class='text-slate-600'>Mobilisasi (asumsi)</span><span class='font-bold text-slate-950'>Rp250.000</span></div>
</div>
<div class='bg-emerald-50 px-5 py-3 text-sm font-bold text-emerald-900'>Total estimasi ≈ Rp1.742.500</div>
</div>
<div class='not-prose my-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
<div class='bg-slate-50 px-5 py-3.5 text-sm font-bold text-slate-900'>Contoh 2 — Trotoar dengan 4 sudut, 40 meter</div>
<div class='divide-y divide-slate-100 px-5'>
<div class='flex items-center justify-between gap-4 py-3 text-sm'><span class='text-slate-600'>Jenis & ukuran</span><span class='font-bold text-slate-950'>Kanstin trotoar 40 × 25 × 16 × 13 cm</span></div>
<div class='flex items-center justify-between gap-4 py-3 text-sm'><span class='text-slate-600'>Panjang + cadangan 10%</span><span class='font-bold text-slate-950'>40 × 1,10 = 44 meter</span></div>
<div class='flex items-center justify-between gap-4 py-3 text-sm'><span class='text-slate-600'>Biaya kanstin</span><span class='font-bold text-slate-950'>44 × Rp67.500 = Rp2.970.000</span></div>
<div class='flex items-center justify-between gap-4 py-3 text-sm'><span class='text-slate-600'>Jasa pasang (asumsi Rp20.000/m)</span><span class='font-bold text-slate-950'>40 × Rp20.000 = Rp800.000</span></div>
<div class='flex items-center justify-between gap-4 py-3 text-sm'><span class='text-slate-600'>Pekerjaan dasar (asumsi)</span><span class='font-bold text-slate-950'>Rp800.000</span></div>
<div class='flex items-center justify-between gap-4 py-3 text-sm'><span class='text-slate-600'>Mobilisasi (asumsi)</span><span class='font-bold text-slate-950'>Rp400.000</span></div>
</div>
<div class='bg-emerald-50 px-5 py-3 text-sm font-bold text-emerald-900'>Total estimasi ≈ Rp4.970.000</div>
</div>
<div class='not-prose my-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
<div class='bg-slate-50 px-5 py-3.5 text-sm font-bold text-slate-900'>Contoh 3 — Jalan kawasan, DKI, 100 meter, tanah lunak</div>
<div class='divide-y divide-slate-100 px-5'>
<div class='flex items-center justify-between gap-4 py-3 text-sm'><span class='text-slate-600'>Jenis & ukuran</span><span class='font-bold text-slate-950'>Kanstin DKI 60 × 30 × 25 × 20 cm</span></div>
<div class='flex items-center justify-between gap-4 py-3 text-sm'><span class='text-slate-600'>Panjang + cadangan 10%</span><span class='font-bold text-slate-950'>100 × 1,10 = 110 meter</span></div>
<div class='flex items-center justify-between gap-4 py-3 text-sm'><span class='text-slate-600'>Biaya kanstin</span><span class='font-bold text-slate-950'>110 × Rp99.200 = Rp10.912.000</span></div>
<div class='flex items-center justify-between gap-4 py-3 text-sm'><span class='text-slate-600'>Jasa pasang (asumsi Rp25.000/m)</span><span class='font-bold text-slate-950'>100 × Rp25.000 = Rp2.500.000</span></div>
<div class='flex items-center justify-between gap-4 py-3 text-sm'><span class='text-slate-600'>Pekerjaan dasar tanah lunak (asumsi)</span><span class='font-bold text-slate-950'>Rp2.500.000</span></div>
<div class='flex items-center justify-between gap-4 py-3 text-sm'><span class='text-slate-600'>Mobilisasi (asumsi)</span><span class='font-bold text-slate-950'>Rp700.000</span></div>
</div>
<div class='bg-emerald-50 px-5 py-3 text-sm font-bold text-emerald-900'>Total estimasi ≈ Rp16.612.000</div>
</div>
<div class='not-prose my-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
<div class='bg-slate-900 px-5 py-3.5 text-sm font-bold text-white'>Rekap ketiga contoh</div>
<div class='divide-y divide-slate-100 px-5'>
<div class='flex items-center justify-between gap-4 py-3 text-sm'><span class='text-slate-600'>Taman 20 m · lurus</span><span class='font-bold text-slate-950'>Rp1.742.500</span></div>
<div class='flex items-center justify-between gap-4 py-3 text-sm'><span class='text-slate-600'>Trotoar 40 m · 4 sudut</span><span class='font-bold text-slate-950'>Rp4.970.000</span></div>
<div class='flex items-center justify-between gap-4 py-3 text-sm'><span class='text-slate-600'>DKI 100 m · tanah lunak</span><span class='font-bold text-slate-950'>Rp16.612.000</span></div>
</div>
<div class='bg-slate-50 px-5 py-3 text-xs text-slate-500'>Nilai J, D, dan M di atas hanya ilustrasi. Nilai sebenarnya diberikan setelah survei lokasi.</div>
</div>`,
        en: `<div class='not-prose my-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
<div class='bg-slate-50 px-5 py-3.5 text-sm font-bold text-slate-900'>Example 1 — Straight garden edge, 20 meters</div>
<div class='divide-y divide-slate-100 px-5'>
<div class='flex items-center justify-between gap-4 py-3 text-sm'><span class='text-slate-600'>Type & size</span><span class='font-bold text-slate-950'>Garden curb 40 × 20 × 10 cm</span></div>
<div class='flex items-center justify-between gap-4 py-3 text-sm'><span class='text-slate-600'>Length + 5% waste</span><span class='font-bold text-slate-950'>20 × 1.05 = 21 meters</span></div>
<div class='flex items-center justify-between gap-4 py-3 text-sm'><span class='text-slate-600'>Curb cost</span><span class='font-bold text-slate-950'>21 × Rp42,500 = Rp892,500</span></div>
<div class='flex items-center justify-between gap-4 py-3 text-sm'><span class='text-slate-600'>Installation (assumed Rp15,000/m)</span><span class='font-bold text-slate-950'>20 × Rp15,000 = Rp300,000</span></div>
<div class='flex items-center justify-between gap-4 py-3 text-sm'><span class='text-slate-600'>Base work (assumed)</span><span class='font-bold text-slate-950'>Rp300,000</span></div>
<div class='flex items-center justify-between gap-4 py-3 text-sm'><span class='text-slate-600'>Mobilization (assumed)</span><span class='font-bold text-slate-950'>Rp250,000</span></div>
</div>
<div class='bg-emerald-50 px-5 py-3 text-sm font-bold text-emerald-900'>Estimated total ≈ Rp1,742,500</div>
</div>
<div class='not-prose my-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
<div class='bg-slate-50 px-5 py-3.5 text-sm font-bold text-slate-900'>Example 2 — Sidewalk with 4 corners, 40 meters</div>
<div class='divide-y divide-slate-100 px-5'>
<div class='flex items-center justify-between gap-4 py-3 text-sm'><span class='text-slate-600'>Type & size</span><span class='font-bold text-slate-950'>Sidewalk curb 40 × 25 × 16 × 13 cm</span></div>
<div class='flex items-center justify-between gap-4 py-3 text-sm'><span class='text-slate-600'>Length + 10% waste</span><span class='font-bold text-slate-950'>40 × 1.10 = 44 meters</span></div>
<div class='flex items-center justify-between gap-4 py-3 text-sm'><span class='text-slate-600'>Curb cost</span><span class='font-bold text-slate-950'>44 × Rp67,500 = Rp2,970,000</span></div>
<div class='flex items-center justify-between gap-4 py-3 text-sm'><span class='text-slate-600'>Installation (assumed Rp20,000/m)</span><span class='font-bold text-slate-950'>40 × Rp20,000 = Rp800,000</span></div>
<div class='flex items-center justify-between gap-4 py-3 text-sm'><span class='text-slate-600'>Base work (assumed)</span><span class='font-bold text-slate-950'>Rp800,000</span></div>
<div class='flex items-center justify-between gap-4 py-3 text-sm'><span class='text-slate-600'>Mobilization (assumed)</span><span class='font-bold text-slate-950'>Rp400,000</span></div>
</div>
<div class='bg-emerald-50 px-5 py-3 text-sm font-bold text-emerald-900'>Estimated total ≈ Rp4,970,000</div>
</div>
<div class='not-prose my-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
<div class='bg-slate-50 px-5 py-3.5 text-sm font-bold text-slate-900'>Example 3 — Estate road, DKI, 100 meters, soft soil</div>
<div class='divide-y divide-slate-100 px-5'>
<div class='flex items-center justify-between gap-4 py-3 text-sm'><span class='text-slate-600'>Type & size</span><span class='font-bold text-slate-950'>DKI curb 60 × 30 × 25 × 20 cm</span></div>
<div class='flex items-center justify-between gap-4 py-3 text-sm'><span class='text-slate-600'>Length + 10% waste</span><span class='font-bold text-slate-950'>100 × 1.10 = 110 meters</span></div>
<div class='flex items-center justify-between gap-4 py-3 text-sm'><span class='text-slate-600'>Curb cost</span><span class='font-bold text-slate-950'>110 × Rp99,200 = Rp10,912,000</span></div>
<div class='flex items-center justify-between gap-4 py-3 text-sm'><span class='text-slate-600'>Installation (assumed Rp25,000/m)</span><span class='font-bold text-slate-950'>100 × Rp25,000 = Rp2,500,000</span></div>
<div class='flex items-center justify-between gap-4 py-3 text-sm'><span class='text-slate-600'>Base work on soft soil (assumed)</span><span class='font-bold text-slate-950'>Rp2,500,000</span></div>
<div class='flex items-center justify-between gap-4 py-3 text-sm'><span class='text-slate-600'>Mobilization (assumed)</span><span class='font-bold text-slate-950'>Rp700,000</span></div>
</div>
<div class='bg-emerald-50 px-5 py-3 text-sm font-bold text-emerald-900'>Estimated total ≈ Rp16,612,000</div>
</div>
<div class='not-prose my-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
<div class='bg-slate-900 px-5 py-3.5 text-sm font-bold text-white'>Summary of the three examples</div>
<div class='divide-y divide-slate-100 px-5'>
<div class='flex items-center justify-between gap-4 py-3 text-sm'><span class='text-slate-600'>Garden 20 m · straight</span><span class='font-bold text-slate-950'>Rp1,742,500</span></div>
<div class='flex items-center justify-between gap-4 py-3 text-sm'><span class='text-slate-600'>Sidewalk 40 m · 4 corners</span><span class='font-bold text-slate-950'>Rp4,970,000</span></div>
<div class='flex items-center justify-between gap-4 py-3 text-sm'><span class='text-slate-600'>DKI 100 m · soft soil</span><span class='font-bold text-slate-950'>Rp16,612,000</span></div>
</div>
<div class='bg-slate-50 px-5 py-3 text-xs text-slate-500'>The J, D, and M values above are illustrative only. Actual values are given after a site survey.</div>
</div>`,
      },
    },
    {
      type: "paragraph",
      text: {
        id: "<span class='not-prose block text-sm leading-relaxed text-slate-600'>Catatan sudut: setiap belokan 90° memotong satu buah kanstin, sehingga panjang aktual bertambah dan sisa potongan tidak bisa dipakai. Itulah alasan faktor cadangan naik dari 5% ke 10–15% pada jalur bersudut banyak.</span>",
        en: "<span class='not-prose block text-sm leading-relaxed text-slate-600'>Corner note: each 90° bend cuts one curb piece, so the actual length increases and the offcut cannot be reused. This is why the waste factor rises from 5% to 10–15% on edges with many corners.</span>",
      },
    },

    {
      type: "heading",
      text: { id: "Mutu beton dan standar SNI", en: "Concrete grade and SNI standards" },
    },
    {
      type: "paragraph",
      text: {
        id: "Selisih harga kanstin tidak hanya soal ukuran. Mutu beton dan metode cetak menentukan daya tahan, dan itulah yang membedakan produk murah dari produk yang benar-benar awet. Kanstin umumnya mengacu pada SNI beton (SNI 2847:2019) dengan mutu K-250 hingga K-350.",
        en: "Curb price differences are not only about size. Concrete grade and casting method determine durability, and that is what separates cheap products from genuinely long-lasting ones. Curbs generally follow the Indonesian concrete standard (SNI 2847:2019) with grades from K-250 to K-350.",
      },
    },
    {
      type: "paragraph",
      text: {
        id: `<div class='not-prose my-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
<div class='bg-slate-50 px-5 py-3.5 text-sm font-bold text-slate-900'>Mutu beton, penggunaan, dan dampaknya ke harga</div>
<div class='divide-y divide-slate-100 px-5'>
<div class='py-3.5'><div class='flex items-baseline justify-between gap-3'><span class='text-sm font-semibold text-slate-800'>K-250 (≈ f'c 20 MPa)</span><span class='text-xs font-bold text-emerald-700'>Paling ekonomis</span></div><span class='mt-1 block text-xs text-slate-500'>Cocok untuk kanstin taman dan pembatas area tanaman.</span></div>
<div class='py-3.5'><div class='flex items-baseline justify-between gap-3'><span class='text-sm font-semibold text-slate-800'>K-300 (≈ f'c 25 MPa)</span><span class='text-xs font-bold text-blue-700'>Standar trotoar</span></div><span class='mt-1 block text-xs text-slate-500'>Umum dipakai untuk trotoar dan tepi jalur pejalan kaki.</span></div>
<div class='py-3.5'><div class='flex items-baseline justify-between gap-3'><span class='text-sm font-semibold text-slate-800'>K-350 (≈ f'c 30 MPa)</span><span class='text-xs font-bold text-rose-700'>Paling kuat</span></div><span class='mt-1 block text-xs text-slate-500'>Disarankan untuk kanstin DKI yang menahan beban kendaraan dan gesekan ban.</span></div>
</div>
<div class='bg-slate-50 px-5 py-3 text-xs text-slate-500'>Semakin tinggi mutu, semakin banyak semen dan semakin lama curing, sehingga harga naik.</div>
</div>
<div class='not-prose my-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
<div class='bg-slate-50 px-5 py-3.5 text-sm font-bold text-slate-900'>Metode cetak</div>
<div class='divide-y divide-slate-100 px-5'>
<div class='flex items-start justify-between gap-4 py-3 text-sm'><span class='font-semibold text-slate-800'>Cetak manual</span><span class='text-right text-slate-600'>Lebih murah, kepadatan beton kurang merata, permukaan bisa sedikit bergelombang</span></div>
<div class='flex items-start justify-between gap-4 py-3 text-sm'><span class='font-semibold text-slate-800'>Vibro press / hidrolik</span><span class='text-right text-slate-600'>Lebih padat dan presisi, permukaan rapi, harga di kisaran atas tabel</span></div>
</div>
<div class='bg-amber-50 px-5 py-3 text-xs text-amber-800'>Kanstin dengan harga jauh di bawah Rp42.500/m patut dicurigai mutunya—bisa jadi K-175 atau cetak manual tanpa curing yang cukup.</div>
</div>`,
        en: `<div class='not-prose my-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
<div class='bg-slate-50 px-5 py-3.5 text-sm font-bold text-slate-900'>Concrete grade, use, and price impact</div>
<div class='divide-y divide-slate-100 px-5'>
<div class='py-3.5'><div class='flex items-baseline justify-between gap-3'><span class='text-sm font-semibold text-slate-800'>K-250 (≈ f'c 20 MPa)</span><span class='text-xs font-bold text-emerald-700'>Most economical</span></div><span class='mt-1 block text-xs text-slate-500'>Suitable for garden curbs and planting-area borders.</span></div>
<div class='py-3.5'><div class='flex items-baseline justify-between gap-3'><span class='text-sm font-semibold text-slate-800'>K-300 (≈ f'c 25 MPa)</span><span class='text-xs font-bold text-blue-700'>Sidewalk standard</span></div><span class='mt-1 block text-xs text-slate-500'>Commonly used for sidewalks and pedestrian path edges.</span></div>
<div class='py-3.5'><div class='flex items-baseline justify-between gap-3'><span class='text-sm font-semibold text-slate-800'>K-350 (≈ f'c 30 MPa)</span><span class='text-xs font-bold text-rose-700'>Strongest</span></div><span class='mt-1 block text-xs text-slate-500'>Recommended for DKI curbs that carry vehicle loads and tire abrasion.</span></div>
</div>
<div class='bg-slate-50 px-5 py-3 text-xs text-slate-500'>Higher grades require more cement and longer curing, which raises the price.</div>
</div>
<div class='not-prose my-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
<div class='bg-slate-50 px-5 py-3.5 text-sm font-bold text-slate-900'>Casting method</div>
<div class='divide-y divide-slate-100 px-5'>
<div class='flex items-start justify-between gap-4 py-3 text-sm'><span class='font-semibold text-slate-800'>Manual casting</span><span class='text-right text-slate-600'>Cheaper, less uniform density, surface may be slightly uneven</span></div>
<div class='flex items-start justify-between gap-4 py-3 text-sm'><span class='font-semibold text-slate-800'>Vibro press / hydraulic</span><span class='text-right text-slate-600'>Denser and more precise, clean surface, priced at the upper end of the table</span></div>
</div>
<div class='bg-amber-50 px-5 py-3 text-xs text-amber-800'>Curbs priced far below Rp42,500/m warrant suspicion—they may be K-175 or manually cast without adequate curing.</div>
</div>`,
      },
    },

    {
      type: "heading",
      text: { id: "Yang membuat harga naik atau turun", en: "What makes prices go up or down" },
    },
    {
      type: "list",
      ordered: false,
      items: [
        {
          id: "<strong>Ukuran buah:</strong> profil yang lebih besar memakai beton lebih banyak, sehingga biaya naik.",
          en: "<strong>Piece size:</strong> larger profiles use more concrete, which raises the cost.",
        },
        {
          id: "<strong>Mutu beton:</strong> K-350 memerlukan semen lebih banyak dan curing lebih lama dibanding K-250.",
          en: "<strong>Concrete grade:</strong> K-350 requires more cement and longer curing than K-250.",
        },
        {
          id: "<strong>Panjang pekerjaan:</strong> pekerjaan panjang lebih efisien per meter karena biaya mobilisasi terbagi.",
          en: "<strong>Length of work:</strong> longer jobs are more efficient per meter because mobilization is shared.",
        },
        {
          id: "<strong>Kondisi tanah:</strong> tanah lunak butuh dudukan dan pemadatan tambahan agar kanstin tidak bergeser.",
          en: "<strong>Ground condition:</strong> soft soil needs extra bedding and compaction so the curb does not shift.",
        },
        {
          id: "<strong>Akses dan bongkaran:</strong> lokasi sempit menambah waktu kerja, dan kanstin lama yang harus dibongkar menambah biaya.",
          en: "<strong>Access and demolition:</strong> narrow access adds work time, and removing old curbs adds cost.",
        },
      ],
    },
    {
      type: "heading",
      text: { id: "Tips agar anggaran lebih hemat", en: "Tips to keep the budget lean" },
    },
    {
      type: "list",
      ordered: false,
      items: [
        {
          id: "Pilih jenis sesuai fungsi. Kanstin taman tidak untuk jalur kendaraan.",
          en: "Choose the type that fits the function. Garden curbs are not meant for vehicle lanes.",
        },
        {
          id: "Gabungkan dengan pekerjaan lain di lokasi yang sama, seperti <a href='/blog/biaya-aspal-per-meter' class='font-semibold text-[#1e88e5] underline underline-offset-2'>pengaspalan</a> atau paving, agar mobilisasi tidak ganda.",
          en: "Combine with other work on the same site, such as <a href='/blog/biaya-aspal-per-meter' class='font-semibold text-[#1e88e5] underline underline-offset-2'>asphalt paving</a> or paving blocks, so mobilization is not doubled.",
        },
        {
          id: "Bandingkan penawaran dengan spesifikasi yang sama: jenis, ukuran, mutu beton, panjang, dan pekerjaan dasar.",
          en: "Compare quotes with the same specifications: type, size, concrete grade, length, and base work.",
        },
        {
          id: "Pasang saat cuaca kering. Pekerjaan dasar lebih mudah dan lebih cepat selesai.",
          en: "Install in dry weather. Base work is easier and faster to finish.",
        },
        {
          id: "Minta survei lebih dulu agar faktor waste dan pekerjaan dasar dihitung realistis, bukan sekadar perkiraan.",
          en: "Request a survey first so the waste factor and base work are calculated realistically, not just guessed.",
        },
      ],
    },
    {
      type: "heading",
      text: { id: "Pertanyaan yang sering diajukan", en: "Frequently asked questions" },
    },
    {
      type: "paragraph",
      text: {
        id: `<div class='not-prose my-5 space-y-3'>
<details class='group rounded-xl border border-slate-200 bg-white p-5 open:shadow-sm'>
<summary class='flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900 [&::-webkit-details-marker]:hidden'>Berapa harga kanstin per meter di 2026?<span aria-hidden='true' class='text-xl leading-none text-[#1e88e5] transition-transform duration-200 group-open:rotate-45'>+</span></summary>
<div class='mt-3 text-sm leading-relaxed text-slate-600'>Perkiraan harga kanstin mulai dari Rp42.500 per meter lari (taman 40 × 20 × 10 cm) sampai Rp99.200 per meter lari (DKI 60 × 30 × 25 × 20 cm). Harga final mengikuti volume dan lokasi.</div>
</details>
<details class='group rounded-xl border border-slate-200 bg-white p-5 open:shadow-sm'>
<summary class='flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900 [&::-webkit-details-marker]:hidden'>Apakah harga sudah termasuk pemasangan?<span aria-hidden='true' class='text-xl leading-none text-[#1e88e5] transition-transform duration-200 group-open:rotate-45'>+</span></summary>
<div class='mt-3 text-sm leading-relaxed text-slate-600'>Tabel menampilkan harga kanstin per buah dan konversinya per meter lari. Jasa pasang, pekerjaan dasar, dan mobilisasi dihitung terpisah dalam penawaran.</div>
</details>
<details class='group rounded-xl border border-slate-200 bg-white p-5 open:shadow-sm'>
<summary class='flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900 [&::-webkit-details-marker]:hidden'>Bagaimana cara menghitung kebutuhan kanstin kalau lokasi banyak sudut?<span aria-hidden='true' class='text-xl leading-none text-[#1e88e5] transition-transform duration-200 group-open:rotate-45'>+</span></summary>
<div class='mt-3 text-sm leading-relaxed text-slate-600'>Ukur panjang mengikuti garis tepi aktual, lalu tambahkan cadangan 10% untuk 1–4 sudut atau 15% untuk banyak tikungan. Setiap belokan 90° memotong satu buah kanstin dan sisa potongannya tidak bisa dipakai ulang.</div>
</details>
<details class='group rounded-xl border border-slate-200 bg-white p-5 open:shadow-sm'>
<summary class='flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900 [&::-webkit-details-marker]:hidden'>Apa beda kanstin dan kansteen?<span aria-hidden='true' class='text-xl leading-none text-[#1e88e5] transition-transform duration-200 group-open:rotate-45'>+</span></summary>
<div class='mt-3 text-sm leading-relaxed text-slate-600'>Keduanya merujuk pada benda yang sama. Kanstin lebih umum dipakai di daftar harga, sedangkan kansteen sering muncul di spesifikasi teknis dan RAB proyek. Istilah lain yang juga dipakai adalah kerb atau curb.</div>
</details>
<details class='group rounded-xl border border-slate-200 bg-white p-5 open:shadow-sm'>
<summary class='flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900 [&::-webkit-details-marker]:hidden'>Mutu beton apa yang dipakai untuk kanstin?<span aria-hidden='true' class='text-xl leading-none text-[#1e88e5] transition-transform duration-200 group-open:rotate-45'>+</span></summary>
<div class='mt-3 text-sm leading-relaxed text-slate-600'>Umumnya K-250 hingga K-350. Kanstin taman cukup K-250, sedangkan kanstin DKI yang menahan beban kendaraan disarankan K-300 ke atas dengan metode cetak vibro press agar lebih padat dan tidak mudah retak.</div>
</details>
<details class='group rounded-xl border border-slate-200 bg-white p-5 open:shadow-sm'>
<summary class='flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900 [&::-webkit-details-marker]:hidden'>Apakah survei lokasi gratis?<span aria-hidden='true' class='text-xl leading-none text-[#1e88e5] transition-transform duration-200 group-open:rotate-45'>+</span></summary>
<div class='mt-3 text-sm leading-relaxed text-slate-600'>Ya. Survei mengukur panjang, melihat kondisi tanah, dan memberi estimasi awal tanpa biaya di area Jabodetabek, Banten, dan Jawa Barat.</div>
</details>
<details class='group rounded-xl border border-slate-200 bg-white p-5 open:shadow-sm'>
<summary class='flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900 [&::-webkit-details-marker]:hidden'>Berapa lama pemasangan kanstin?<span aria-hidden='true' class='text-xl leading-none text-[#1e88e5] transition-transform duration-200 group-open:rotate-45'>+</span></summary>
<div class='mt-3 text-sm leading-relaxed text-slate-600'>Tergantung panjang dan akses lokasi. Estimasi waktu diberikan setelah survei.</div>
</details>
</div>`,
        en: `<div class='not-prose my-5 space-y-3'>
<details class='group rounded-xl border border-slate-200 bg-white p-5 open:shadow-sm'>
<summary class='flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900 [&::-webkit-details-marker]:hidden'>How much is curb per meter in 2026?<span aria-hidden='true' class='text-xl leading-none text-[#1e88e5] transition-transform duration-200 group-open:rotate-45'>+</span></summary>
<div class='mt-3 text-sm leading-relaxed text-slate-600'>Estimated curb prices start at Rp42,500 per running meter (garden 40 × 20 × 10 cm) up to Rp99,200 (DKI 60 × 30 × 25 × 20 cm). The final price depends on volume and location.</div>
</details>
<details class='group rounded-xl border border-slate-200 bg-white p-5 open:shadow-sm'>
<summary class='flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900 [&::-webkit-details-marker]:hidden'>Does the price include installation?<span aria-hidden='true' class='text-xl leading-none text-[#1e88e5] transition-transform duration-200 group-open:rotate-45'>+</span></summary>
<div class='mt-3 text-sm leading-relaxed text-slate-600'>The table shows the curb price per piece and its running-meter equivalent. Installation, base work, and mobilization are quoted separately.</div>
</details>
<details class='group rounded-xl border border-slate-200 bg-white p-5 open:shadow-sm'>
<summary class='flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900 [&::-webkit-details-marker]:hidden'>How do I calculate curb needs when the site has many corners?<span aria-hidden='true' class='text-xl leading-none text-[#1e88e5] transition-transform duration-200 group-open:rotate-45'>+</span></summary>
<div class='mt-3 text-sm leading-relaxed text-slate-600'>Measure along the actual edge line, then add 10% waste for 1–4 corners or 15% for many bends. Each 90° turn cuts one curb piece and the offcut cannot be reused.</div>
</details>
<details class='group rounded-xl border border-slate-200 bg-white p-5 open:shadow-sm'>
<summary class='flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900 [&::-webkit-details-marker]:hidden'>What is the difference between kanstin and kansteen?<span aria-hidden='true' class='text-xl leading-none text-[#1e88e5] transition-transform duration-200 group-open:rotate-45'>+</span></summary>
<div class='mt-3 text-sm leading-relaxed text-slate-600'>They refer to the same item. Kanstin is more common in price lists, while kansteen often appears in technical specifications and project bills of quantities. Other terms used are kerb and curb.</div>
</details>
<details class='group rounded-xl border border-slate-200 bg-white p-5 open:shadow-sm'>
<summary class='flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900 [&::-webkit-details-marker]:hidden'>What concrete grade is used for curbs?<span aria-hidden='true' class='text-xl leading-none text-[#1e88e5] transition-transform duration-200 group-open:rotate-45'>+</span></summary>
<div class='mt-3 text-sm leading-relaxed text-slate-600'>Generally K-250 to K-350. Garden curbs are fine with K-250, while DKI curbs carrying vehicle loads are best at K-300 or above using vibro press casting for higher density and crack resistance.</div>
</details>
<details class='group rounded-xl border border-slate-200 bg-white p-5 open:shadow-sm'>
<summary class='flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900 [&::-webkit-details-marker]:hidden'>Is the site survey free?<span aria-hidden='true' class='text-xl leading-none text-[#1e88e5] transition-transform duration-200 group-open:rotate-45'>+</span></summary>
<div class='mt-3 text-sm leading-relaxed text-slate-600'>Yes. The survey measures the length, checks soil conditions, and gives an initial estimate at no cost in Greater Jakarta, Banten, and West Java.</div>
</details>
<details class='group rounded-xl border border-slate-200 bg-white p-5 open:shadow-sm'>
<summary class='flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900 [&::-webkit-details-marker]:hidden'>How long does curb installation take?<span aria-hidden='true' class='text-xl leading-none text-[#1e88e5] transition-transform duration-200 group-open:rotate-45'>+</span></summary>
<div class='mt-3 text-sm leading-relaxed text-slate-600'>It depends on the length and site access. A time estimate is given after the survey.</div>
</details>
</div>`,
      },
    },
    {
      type: "paragraph",
      text: {
        id: `<div class='not-prose relative my-8 overflow-hidden rounded-3xl bg-slate-900 p-7 text-center text-white sm:p-10'>
<div aria-hidden='true' class='pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#1e88e5] opacity-20 blur-3xl'></div>
<div class='relative'>
<span class='block text-[11px] font-bold uppercase tracking-[0.3em] text-[#4da3ff]'>Estimasi gratis</span>
<span class='mt-3 block text-xl font-bold sm:text-2xl'>Mau tahu total biaya untuk lokasi Anda?</span>
<span class='mx-auto mt-3 block max-w-xl text-sm leading-relaxed text-slate-300'>Kirim panjang, jenis kanstin, jumlah sudut, dan lokasi proyek. Tim kami bantu hitung estimasinya, lalu survei lapangan bila diperlukan.</span>
<a href='https://wa.me/6282258089367?text=Halo%2C%20saya%20ingin%20estimasi%20harga%20kanstin%20untuk%20proyek%20saya.' target='_blank' rel='noopener noreferrer' class='mt-6 inline-flex min-h-12 items-center justify-center rounded-xl bg-emerald-700 px-7 py-3 text-sm font-bold text-white hover:bg-emerald-800'>Estimasi via WhatsApp</a>
<span class='mt-6 block text-xs text-slate-400'>Baca juga: <a href='/layanan/infrastruktur/pasang-kanstin' class='font-semibold text-[#4da3ff] underline underline-offset-4 hover:text-white'>Layanan pasang kanstin</a> · <a href='/blog/pemasangan-kansteen' class='font-semibold text-[#4da3ff] underline underline-offset-4 hover:text-white'>Pemasangan kansteen</a> · <a href='/blog/pemasangan-paving-block' class='font-semibold text-[#4da3ff] underline underline-offset-4 hover:text-white'>Pemasangan paving block</a> · <a href='/blog/biaya-aspal-per-meter' class='font-semibold text-[#4da3ff] underline underline-offset-4 hover:text-white'>Biaya aspal per meter</a></span>
</div>
</div>`,
        en: `<div class='not-prose relative my-8 overflow-hidden rounded-3xl bg-slate-900 p-7 text-center text-white sm:p-10'>
<div aria-hidden='true' class='pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#1e88e5] opacity-20 blur-3xl'></div>
<div class='relative'>
<span class='block text-[11px] font-bold uppercase tracking-[0.3em] text-[#4da3ff]'>Free estimate</span>
<span class='mt-3 block text-xl font-bold sm:text-2xl'>Want to know the total cost for your site?</span>
<span class='mx-auto mt-3 block max-w-xl text-sm leading-relaxed text-slate-300'>Send us the length, curb type, number of corners, and project location. We will help estimate it and arrange a site survey if needed.</span>
<a href='https://wa.me/6282258089367?text=Hello%2C%20I%20would%20like%20a%20curb%20price%20estimate%20for%20my%20project.' target='_blank' rel='noopener noreferrer' class='mt-6 inline-flex min-h-12 items-center justify-center rounded-xl bg-emerald-700 px-7 py-3 text-sm font-bold text-white hover:bg-emerald-800'>Get an estimate on WhatsApp</a>
<span class='mt-6 block text-xs text-slate-400'>Read also: <a href='/layanan/infrastruktur/pasang-kanstin' class='font-semibold text-[#4da3ff] underline underline-offset-4 hover:text-white'>Curb installation service</a> · <a href='/blog/pemasangan-kansteen' class='font-semibold text-[#4da3ff] underline underline-offset-4 hover:text-white'>Curb installation guide</a> · <a href='/blog/pemasangan-paving-block' class='font-semibold text-[#4da3ff] underline underline-offset-4 hover:text-white'>Paving block installation</a> · <a href='/blog/biaya-aspal-per-meter' class='font-semibold text-[#4da3ff] underline underline-offset-4 hover:text-white'>Asphalt cost per meter</a></span>
</div>
</div>`,
      },
    },
  ],
},
{
  slug: "pentingnya-k3-proyek-konstruksi",
  modifiedDateISO: "2026-11-24",
  date: { id: "24 November 2026", en: "November 24, 2026" },
  dateISO: "2026-11-24",
  canonical: "https://triabadimakmur.co.id/blog/pentingnya-k3-proyek-konstruksi",
  src: "/proyek/proyek-93.jpg",
  category: { id: "K3 Konstruksi", en: "Construction Safety" },

  meta: {
    title: {
      id: "Pentingnya K3 di Proyek Konstruksi: 6 Contoh Nyata & Hitungan Biayanya",
      en: "Why Construction Safety Matters: 6 Real Cases & the True Cost",
    },
    description: {
      id: "K3 bukan formalitas. Lihat 6 contoh kecelakaan kerja konstruksi nyata, penyebabnya, cara mencegahnya, dan hitungan biaya kecelakaan vs biaya pencegahan. Dasar hukum UU 1/1970, UU 2/2017, dan Permen PUPR 10/2021.",
      en: "Safety is not paperwork. See 6 real construction accidents, their causes, how to prevent them, and the cost of an accident vs the cost of prevention. Legal basis: UU 1/1970, UU 2/2017, and Permen PUPR 10/2021.",
    },
  },

  title: {
    id: "Pentingnya K3 di Proyek Konstruksi: Contoh Nyata, Biaya, dan Konsekuensinya",
    en: "Why Construction Safety Matters: Real Cases, Costs, and Consequences",
  },
  desc: {
    id: "K3 konstruksi bukan formalitas. 6 contoh kecelakaan nyata, penyebab, pencegahan, dan hitungan biaya kecelakaan vs pencegahan.",
    en: "Construction safety is not paperwork. 6 real accidents, their causes, prevention, and the cost of an accident vs prevention.",
  },

  author: {
    name: "PT. Tri Abadi Makmur Indonesia",
    phone: "082258089367",
    avatar: "/logo.webp",
    lastUpdated: { id: "24 November 2026", en: "November 24, 2026" },
    bio: {
      id: "Tri Abadi Makmur merupakan perusahaan yang bergerak di bidang konstruksi, dengan pengalaman yang sudah bertahun – tahun kami kembangkan, tahapan proses yang mengedepankan kualitas dan kehati-hatian, serta eksekusi pengerjaan proyek yang signifikan, demi tercapainya kepuasan client sehingga terwujudnya jalinan kerjasama yang continue dan berkelanjutan.",
      en: "Tri Abadi Makmur is a construction company with years of experience we have developed, a process that prioritizes quality and prudence, as well as the execution of significant projects, in order to achieve client satisfaction so that continuous and long-term cooperation is realized.",
    },
  },

  tags: [
    { id: "K3 Konstruksi", en: "Construction Safety", slug: "k3-konstruksi" },
    { id: "Manajemen Proyek", en: "Project Management", slug: "manajemen-proyek" },
    { id: "Keselamatan Kerja", en: "Workplace Safety", slug: "keselamatan-kerja" },
    { id: "Layanan Konsultasi K3", en: "Safety Consulting Service", href: "/layanan/konsultasi-k3" },
  ],

  schema: [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Pentingnya K3 di Proyek Konstruksi: Contoh Nyata, Biaya, dan Konsekuensinya",
      "description": "K3 konstruksi bukan formalitas. 6 contoh kecelakaan nyata, penyebab, pencegahan, dan hitungan biaya kecelakaan vs pencegahan.",
      "image": "https://triabadimakmur.co.id/proyek/k3-proyek-konstruksi.webp",
      "datePublished": "2026-11-24",
      "dateModified": "2026-11-24",
      "author": {
        "@type": "Organization",
        "name": "PT. Tri Abadi Makmur Indonesia",
        "telephone": "082258089367",
        "logo": "https://triabadimakmur.co.id/logo.webp"
      },
      "publisher": {
        "@type": "Organization",
        "name": "PT. Tri Abadi Makmur Indonesia",
        "logo": { "@type": "ImageObject", "url": "https://triabadimakmur.co.id/logo.webp" }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://triabadimakmur.co.id/blog/pentingnya-k3-proyek-konstruksi"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Apakah proyek kecil juga wajib menerapkan K3?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Wajib. UU No. 1 Tahun 1970 berlaku untuk semua tempat kerja, termasuk proyek kecil. Skala penerapannya boleh disesuaikan, tetapi kewajiban identifikasi bahaya, penyediaan APD, dan prosedur kerja aman tetap ada."
          }
        },
        {
          "@type": "Question",
          "name": "Berapa minimal alokasi biaya K3 dalam RAB?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Permen PUPR No. 10/2021 mengatur Biaya Penerapan SMKK yang dihitung terpisah dalam RAB, bukan bagian dari overhead. Besarannya bervariasi tergantung skala dan risiko proyek, umumnya berkisar 1–3% dari nilai kontrak untuk proyek bangunan gedung dan infrastruktur."
          }
        },
        {
          "@type": "Question",
          "name": "Apa sanksi jika proyek tidak menerapkan K3?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sanksi berlapis: administratif (teguran, denda, penghentian pekerjaan, blacklist dari proyek pemerintah), perdata (ganti rugi kepada pekerja atau keluarga korban), dan pidana (kurungan atau denda berdasarkan UU 1/1970 dan UU 2/2017)."
          }
        },
        {
          "@type": "Question",
          "name": "Apa beda HIRADC dan JSA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "HIRADC (Hazard Identification, Risk Assessment, and Determining Control) menilai risiko secara menyeluruh per area atau aktivitas. JSA (Job Safety Analysis) mengurai satu pekerjaan menjadi langkah-langkah dan bahaya di tiap langkah. HIRADC dipakai di level manajemen, JSA dipakai di level pelaksana."
          }
        },
        {
          "@type": "Question",
          "name": "Apakah kecelakaan ringan tetap harus dilaporkan?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ya. Semua kecelakaan kerja, termasuk yang hanya menyebabkan hilangnya hari kerja (lost time injury), wajib dicatat dan dilaporkan. Pencatatan ini menjadi bahan evaluasi dan bukti kepatuhan saat audit K3."
          }
        },
        {
          "@type": "Question",
          "name": "Siapa yang bertanggung jawab atas K3 di proyek?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Tanggung jawab utama ada pada pengusaha atau kontraktor utama, bukan hanya petugas K3. Pengawas pekerjaan dan pemilik proyek juga memiliki tanggung jawab sesuai perannya. Petugas K3 bertugas memfasilitasi, bukan menanggung seluruh risiko sendirian."
          }
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Beranda", "item": "https://triabadimakmur.co.id/" },
        { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://triabadimakmur.co.id/blog" },
        { "@type": "ListItem", "position": 3, "name": "Pentingnya K3 di Proyek Konstruksi", "item": "https://triabadimakmur.co.id/blog/pentingnya-k3-proyek-konstruksi" }
      ]
    }
  ],

  body: [
    {
      type: "paragraph",
      text: {
        id: `<div class='not-prose my-6 rounded-2xl border-l-4 border-[#e11d48] bg-rose-50/70 p-5 sm:p-6'><span class='block text-base leading-relaxed text-slate-800'>Konstruksi adalah salah satu sektor dengan risiko kecelakaan kerja tertinggi di Indonesia. Masalahnya, banyak kontraktor masih memperlakukan K3 sebagai <strong>dokumen untuk memenuhi syarat tender</strong>, bukan sebagai bagian dari cara kerja. Artikel ini menunjukkan <strong>enam contoh kecelakaan nyata</strong>, penyebabnya, cara mencegahnya, dan <strong>hitungan biaya</strong> antara kecelakaan vs pencegahan — supaya terlihat jelas bahwa K3 bukan biaya, tapi penghematan.</span></div>`,
        en: `<div class='not-prose my-6 rounded-2xl border-l-4 border-[#e11d48] bg-rose-50/70 p-5 sm:p-6'><span class='block text-base leading-relaxed text-slate-800'>Construction is one of the highest-risk sectors for workplace accidents in Indonesia. The problem is that many contractors still treat safety as <strong>paperwork to pass a tender</strong>, not as part of how work is done. This article shows <strong>six real accident scenarios</strong>, their causes, how to prevent them, and the <strong>cost comparison</strong> between an accident and prevention — so it becomes clear that safety is not a cost, but a saving.</span></div>`,
      },
    },
    {
      type: "paragraph",
      text: {
        id: `<figure class='not-prose my-6 overflow-hidden rounded-2xl shadow-lg ring-1 ring-slate-900/5'><img src='/proyek/k3-proyek-konstruksi.webp' alt='Penerapan K3 di proyek konstruksi PT Tri Abadi Makmur' loading='lazy' decoding='async' class='h-auto w-full object-cover' style='aspect-ratio:16/9'><figcaption class='bg-slate-50 px-4 py-2.5 text-xs text-slate-500'>Briefing K3 sebelum pekerjaan dimulai.</figcaption></figure>`,
        en: `<figure class='not-prose my-6 overflow-hidden rounded-2xl shadow-lg ring-1 ring-slate-900/5'><img src='/proyek/k3-proyek-konstruksi.webp' alt='Safety implementation at a PT Tri Abadi Makmur construction project' loading='lazy' decoding='async' class='h-auto w-full object-cover' style='aspect-ratio:16/9'><figcaption class='bg-slate-50 px-4 py-2.5 text-xs text-slate-500'>Safety briefing before work begins.</figcaption></figure>`,
      },
    },

    {
      type: "heading",
      text: { id: "kenapa-k3-penting", en: "Why safety matters on site" },
    },
    {
      type: "paragraph",
      text: {
        id: "Ada tiga alasan mengapa K3 di proyek konstruksi tidak bisa ditawar. <strong>Pertama, manusia.</strong> Setiap kecelakaan berarti ada orang yang terluka, kehilangan penghasilan, atau bahkan nyawa. <strong>Kedua, hukum.</strong> K3 bukan imbauan, tetapi kewajiban yang diatur UU dan peraturan menteri, dengan sanksi berlapis. <strong>Ketiga, uang.</strong> Biaya satu kecelakaan serius hampir selalu lebih besar daripada biaya pencegahan sepanjang proyek.",
        en: "There are three reasons why construction safety is non-negotiable. <strong>First, people.</strong> Every accident means someone is injured, loses income, or worse. <strong>Second, law.</strong> Safety is not a suggestion; it is a legal obligation with layered sanctions. <strong>Third, money.</strong> The cost of one serious accident almost always exceeds the cost of prevention for the entire project.",
      },
    },
    {
      type: "paragraph",
      text: {
        id: `<div class='not-prose my-5 grid gap-4 sm:grid-cols-3'>
<div class='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'><span class='block text-3xl font-extrabold text-rose-600'>1</span><span class='mt-2 block font-bold text-slate-900'>Manusia</span><span class='mt-1.5 block text-sm leading-relaxed text-slate-600'>Cedera, kehilangan hari kerja, hingga kematian. Dampaknya tidak berhenti di pekerja—keluarga ikut menanggung.</span></div>
<div class='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'><span class='block text-3xl font-extrabold text-amber-600'>2</span><span class='mt-2 block font-bold text-slate-900'>Hukum</span><span class='mt-1.5 block text-sm leading-relaxed text-slate-600'>Teguran, denda, penghentian proyek, blacklist, hingga pidana bagi penanggung jawab.</span></div>
<div class='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'><span class='block text-3xl font-extrabold text-emerald-600'>3</span><span class='mt-2 block font-bold text-slate-900'>Uang</span><span class='mt-1.5 block text-sm leading-relaxed text-slate-600'>Biaya langsung dan tidak langsung kecelakaan bisa 4–10× lipat biaya pencegahan.</span></div>
</div>`,
        en: `<div class='not-prose my-5 grid gap-4 sm:grid-cols-3'>
<div class='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'><span class='block text-3xl font-extrabold text-rose-600'>1</span><span class='mt-2 block font-bold text-slate-900'>People</span><span class='mt-1.5 block text-sm leading-relaxed text-slate-600'>Injury, lost workdays, even death. The impact does not stop at the worker—families bear it too.</span></div>
<div class='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'><span class='block text-3xl font-extrabold text-amber-600'>2</span><span class='mt-2 block font-bold text-slate-900'>Law</span><span class='mt-1.5 block text-sm leading-relaxed text-slate-600'>Warnings, fines, project stoppage, blacklisting, even criminal liability for those in charge.</span></div>
<div class='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'><span class='block text-3xl font-extrabold text-emerald-600'>3</span><span class='mt-2 block font-bold text-slate-900'>Money</span><span class='mt-1.5 block text-sm leading-relaxed text-slate-600'>Direct and indirect accident costs can be 4–10× the cost of prevention.</span></div>
</div>`,
      },
    },

    {
      type: "heading",
      text: { id: "enam-contoh", en: "Six real accident scenarios" },
    },
    {
      type: "paragraph",
      text: {
        id: "Enam contoh di bawah adalah skenario yang paling sering terjadi di proyek konstruksi Indonesia. Semuanya bisa dicegah dengan kontrol sederhana—tetapi sering dilewatkan karena dianggap 'tidak akan terjadi'.",
        en: "The six scenarios below are the most common on Indonesian construction sites. All are preventable with simple controls—but are often skipped because 'it won't happen'.",
      },
    },
    {
      type: "paragraph",
      text: {
        id: `<div class='not-prose my-6 space-y-4'>

<div class='overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
<div class='flex items-center gap-3 bg-rose-50 px-5 py-3.5'><span class='flex h-7 w-7 items-center justify-center rounded-full bg-rose-600 text-xs font-bold text-white'>1</span><span class='text-sm font-bold text-rose-900'>Jatuh dari ketinggian saat pemasangan bekisting</span></div>
<div class='divide-y divide-slate-100 px-5'>
<div class='py-3 text-sm'><span class='font-semibold text-slate-900'>Skenario:</span> <span class='text-slate-600'>Pekerja memasang bekisting di lantai 3 tanpa <em>safety harness</em> karena 'hanya sebentar'. Pijakan tergelincir, jatuh setinggi 9 meter.</span></div>
<div class='py-3 text-sm'><span class='font-semibold text-slate-900'>Penyebab:</span> <span class='text-slate-600'>Tidak ada <em>guardrail</em>, tidak ada <em>lifeline</em>, pengawasan lemah, APD tidak dipakai karena dianggap menghambat.</span></div>
<div class='py-3 text-sm'><span class='font-semibold text-slate-900'>Pencegahan:</span> <span class='text-slate-600'>Pasang <em>guardrail</em> di semua tepi lantai, sediakan <em>anchor point</em> bersertifikat, lakukan <em>toolbox meeting</em> harian, dan terapkan <em>zero tolerance</em> untuk pekerjaan ketinggian tanpa harness.</span></div>
</div>
</div>

<div class='overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
<div class='flex items-center gap-3 bg-amber-50 px-5 py-3.5'><span class='flex h-7 w-7 items-center justify-center rounded-full bg-amber-600 text-xs font-bold text-white'>2</span><span class='text-sm font-bold text-amber-900'>Kejatuhan material dari atas</span></div>
<div class='divide-y divide-slate-100 px-5'>
<div class='py-3 text-sm'><span class='font-semibold text-slate-900'>Skenario:</span> <span class='text-slate-600'>Besi beton ukuran 12 mm terjatuh dari lantai 2 saat diangkat dengan tali tanpa ikatan ganda. Pekerja di bawah tertimpa.</span></div>
<div class='py-3 text-sm'><span class='font-semibold text-slate-900'>Penyebab:</span> <span class='text-slate-600'>Tidak ada <em>toe board</em>, area di bawah tidak steril, metode ikatan tidak sesuai, tidak ada <em>flagman</em>.</span></div>
<div class='py-3 text-sm'><span class='font-semibold text-slate-900'>Pencegahan:</span> <span class='text-slate-600'>Pasang jaring pengaman dan <em>toe board</em>, sterilkan area di bawah, gunakan ikatan ganda untuk material panjang, dan wajibkan helm SNI di seluruh area proyek.</span></div>
</div>
</div>

<div class='overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
<div class='flex items-center gap-3 bg-blue-50 px-5 py-3.5'><span class='flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white'>3</span><span class='text-sm font-bold text-blue-900'>Tertabrak alat berat saat <em>spotting</em></span></div>
<div class='divide-y divide-slate-100 px-5'>
<div class='py-3 text-sm'><span class='font-semibold text-slate-900'>Skenario:</span> <span class='text-slate-600'>Pekerja berjalan di belakang <em>excavator</em> yang sedang mundur. Operator tidak melihat karena <em>blind spot</em> besar dan tidak ada pengawas.</span></div>
<div class='py-3 text-sm'><span class='font-semibold text-slate-900'>Penyebab:</span> <span class='text-slate-600'>Jalur pejalan kaki dan jalur alat berat tidak dipisah, tidak ada <em>spotter</em>, alarm mundur mati, operator tanpa SIO.</span></div>
<div class='py-3 text-sm'><span class='font-semibold text-slate-900'>Pencegahan:</span> <span class='text-slate-600'>Pisahkan jalur pejalan kaki dengan <em>barrier</em> fisik, wajibkan <em>spotter</em> saat alat mundur, pastikan alarm mundur berfungsi, dan verifikasi SIO operator.</span></div>
</div>
</div>

<div class='overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
<div class='flex items-center gap-3 bg-orange-50 px-5 py-3.5'><span class='flex h-7 w-7 items-center justify-center rounded-full bg-orange-600 text-xs font-bold text-white'>4</span><span class='text-sm font-bold text-orange-900'>Sengatan listrik saat kerja dekat jaringan udara</span></div>
<div class='divide-y divide-slate-100 px-5'>
<div class='py-3 text-sm'><span class='font-semibold text-slate-900'>Skenario:</span> <span class='text-slate-600'>Boom truk mixer menyentuh kabel listrik 20 kV saat pengecoran. Operator dan pekerja di sekitar terkena aliran.</span></div>
<div class='py-3 text-sm'><span class='font-semibold text-slate-900'>Penyebab:</span> <span class='text-slate-600'>Tidak ada survei utilitas bawah/atas tanah, tidak ada <em>goalpost</em> atau pembatas ketinggian, jarak aman tidak diketahui.</span></div>
<div class='py-3 text-sm'><span class='font-semibold text-slate-900'>Pencegahan:</span> <span class='text-slate-600'>Lakukan survei utilitas sebelum mobilisasi alat, pasang pembatas ketinggian (<em>goalpost</em>), koordinasi dengan PLN untuk <em>outage</em> jika perlu, dan briefing khusus ke operator.</span></div>
</div>
</div>

<div class='overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
<div class='flex items-center gap-3 bg-violet-50 px-5 py-3.5'><span class='flex h-7 w-7 items-center justify-center rounded-full bg-violet-600 text-xs font-bold text-white'>5</span><span class='text-sm font-bold text-violet-900'>Keruntuhan galian tanpa penahan</span></div>
<div class='divide-y divide-slate-100 px-5'>
<div class='py-3 text-sm'><span class='font-semibold text-slate-900'>Skenario:</span> <span class='text-slate-600'>Galian sedalam 2,5 meter untuk pondasi dibiarkan terbuka tanpa <em>shoring</em> selama dua hari. Tanah longsor menimpa pekerja.</span></div>
<div class='py-3 text-sm'><span class='font-semibold text-slate-900'>Penyebab:</span> <span class='text-slate-600'>Tidak ada analisis stabilitas tanah, tidak ada penahan (<em>shoring</em>/<em>sheet pile</em>), area galian tidak dibatasi, air hujan tidak dikelola.</span></div>
<div class='py-3 text-sm'><span class='font-semibold text-slate-900'>Pencegahan:</span> <span class='text-slate-600'>Pasang penahan galian sesuai desain, batasi area dengan <em>barricade</em> dan rambu, kendalikan air hujan, dan lakukan inspeksi harian sebelum pekerja masuk.</span></div>
</div>
</div>

<div class='overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
<div class='flex items-center gap-3 bg-teal-50 px-5 py-3.5'><span class='flex h-7 w-7 items-center justify-center rounded-full bg-teal-600 text-xs font-bold text-white'>6</span><span class='text-sm font-bold text-teal-900'>Kebakaran dari pekerjaan panas di area mudah terbakar</span></div>
<div class='divide-y divide-slate-100 px-5'>
<div class='py-3 text-sm'><span class='font-semibold text-slate-900'>Skenario:</span> <span class='text-slate-600'>Pengelasan di dekat tumpukan bekisting kayu dan drum solvent. Percikan api memicu kebakaran kecil yang membesar cepat.</span></div>
<div class='py-3 text-sm'><span class='font-semibold text-slate-900'>Penyebab:</span> <span class='text-slate-600'>Tidak ada <em>hot work permit</em>, tidak ada pemisahan material mudah terbakar, APAR tidak tersedia di lokasi kerja.</span></div>
<div class='py-3 text-sm'><span class='font-semibold text-slate-900'>Pencegahan:</span> <span class='text-slate-600'>Terapkan <em>hot work permit</em>, pindahkan material mudah terbakar minimal 10 meter, sediakan APAR dan <em>fire watch</em> selama dan 30 menit setelah pekerjaan panas selesai.</span></div>
</div>
</div>

</div>`,
        en: `<div class='not-prose my-6 space-y-4'>

<div class='overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
<div class='flex items-center gap-3 bg-rose-50 px-5 py-3.5'><span class='flex h-7 w-7 items-center justify-center rounded-full bg-rose-600 text-xs font-bold text-white'>1</span><span class='text-sm font-bold text-rose-900'>Fall from height during formwork installation</span></div>
<div class='divide-y divide-slate-100 px-5'>
<div class='py-3 text-sm'><span class='font-semibold text-slate-900'>Scenario:</span> <span class='text-slate-600'>A worker installs formwork on the 3rd floor without a safety harness because 'it's just a moment'. The footing slips, and he falls 9 meters.</span></div>
<div class='py-3 text-sm'><span class='font-semibold text-slate-900'>Cause:</span> <span class='text-slate-600'>No guardrail, no lifeline, weak supervision, PPE not worn because it is seen as slowing work.</span></div>
<div class='py-3 text-sm'><span class='font-semibold text-slate-900'>Prevention:</span> <span class='text-slate-600'>Install guardrails on all floor edges, provide certified anchor points, run daily toolbox meetings, and enforce zero tolerance for height work without a harness.</span></div>
</div>
</div>

<div class='overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
<div class='flex items-center gap-3 bg-amber-50 px-5 py-3.5'><span class='flex h-7 w-7 items-center justify-center rounded-full bg-amber-600 text-xs font-bold text-white'>2</span><span class='text-sm font-bold text-amber-900'>Falling material from above</span></div>
<div class='divide-y divide-slate-100 px-5'>
<div class='py-3 text-sm'><span class='font-semibold text-slate-900'>Scenario:</span> <span class='text-slate-600'>A 12 mm rebar falls from the 2nd floor while being lifted with a single-tie rope. A worker below is struck.</span></div>
<div class='py-3 text-sm'><span class='font-semibold text-slate-900'>Cause:</span> <span class='text-slate-600'>No toe board, area below not cleared, wrong tying method, no flagman.</span></div>
<div class='py-3 text-sm'><span class='font-semibold text-slate-900'>Prevention:</span> <span class='text-slate-600'>Install safety nets and toe boards, clear the area below, use double ties for long materials, and require SNI helmets site-wide.</span></div>
</div>
</div>

<div class='overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
<div class='flex items-center gap-3 bg-blue-50 px-5 py-3.5'><span class='flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white'>3</span><span class='text-sm font-bold text-blue-900'>Struck by heavy equipment during spotting</span></div>
<div class='divide-y divide-slate-100 px-5'>
<div class='py-3 text-sm'><span class='font-semibold text-slate-900'>Scenario:</span> <span class='text-slate-600'>A worker walks behind a reversing excavator. The operator cannot see due to the large blind spot and no spotter.</span></div>
<div class='py-3 text-sm'><span class='font-semibold text-slate-900'>Cause:</span> <span class='text-slate-600'>Pedestrian and equipment paths not separated, no spotter, reverse alarm broken, unlicensed operator.</span></div>
<div class='py-3 text-sm'><span class='font-semibold text-slate-900'>Prevention:</span> <span class='text-slate-600'>Separate pedestrian paths with physical barriers, require a spotter during reversing, ensure reverse alarms work, and verify operator SIO licenses.</span></div>
</div>
</div>

<div class='overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
<div class='flex items-center gap-3 bg-orange-50 px-5 py-3.5'><span class='flex h-7 w-7 items-center justify-center rounded-full bg-orange-600 text-xs font-bold text-white'>4</span><span class='text-sm font-bold text-orange-900'>Electric shock near overhead lines</span></div>
<div class='divide-y divide-slate-100 px-5'>
<div class='py-3 text-sm'><span class='font-semibold text-slate-900'>Scenario:</span> <span class='text-slate-600'>A mixer truck boom touches a 20 kV power line during pouring. The operator and nearby workers are electrocuted.</span></div>
<div class='py-3 text-sm'><span class='font-semibold text-slate-900'>Cause:</span> <span class='text-slate-600'>No utility survey, no goalpost or height barrier, safe distance unknown.</span></div>
<div class='py-3 text-sm'><span class='font-semibold text-slate-900'>Prevention:</span> <span class='text-slate-600'>Survey utilities before mobilizing equipment, install height barriers (goalposts), coordinate with the utility for outages if needed, and brief operators specifically.</span></div>
</div>
</div>

<div class='overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
<div class='flex items-center gap-3 bg-violet-50 px-5 py-3.5'><span class='flex h-7 w-7 items-center justify-center rounded-full bg-violet-600 text-xs font-bold text-white'>5</span><span class='text-sm font-bold text-violet-900'>Excavation collapse without shoring</span></div>
<div class='divide-y divide-slate-100 px-5'>
<div class='py-3 text-sm'><span class='font-semibold text-slate-900'>Scenario:</span> <span class='text-slate-600'>A 2.5-meter foundation excavation is left open without shoring for two days. The soil collapses onto a worker.</span></div>
<div class='py-3 text-sm'><span class='font-semibold text-slate-900'>Cause:</span> <span class='text-slate-600'>No soil stability analysis, no shoring or sheet pile, excavation area not bounded, rainwater unmanaged.</span></div>
<div class='py-3 text-sm'><span class='font-semibold text-slate-900'>Prevention:</span> <span class='text-slate-600'>Install shoring per design, bound the area with barricades and signs, manage rainwater, and conduct daily inspections before entry.</span></div>
</div>
</div>

<div class='overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
<div class='flex items-center gap-3 bg-teal-50 px-5 py-3.5'><span class='flex h-7 w-7 items-center justify-center rounded-full bg-teal-600 text-xs font-bold text-white'>6</span><span class='text-sm font-bold text-teal-900'>Fire from hot work in a flammable area</span></div>
<div class='divide-y divide-slate-100 px-5'>
<div class='py-3 text-sm'><span class='font-semibold text-slate-900'>Scenario:</span> <span class='text-slate-600'>Welding near stacked wooden formwork and solvent drums. Sparks ignite a small fire that spreads rapidly.</span></div>
<div class='py-3 text-sm'><span class='font-semibold text-slate-900'>Cause:</span> <span class='text-slate-600'>No hot work permit, no separation of flammable materials, no fire extinguisher on site.</span></div>
<div class='py-3 text-sm'><span class='font-semibold text-slate-900'>Prevention:</span> <span class='text-slate-600'>Apply a hot work permit, move flammable materials at least 10 meters away, and provide extinguishers and a fire watch during and 30 minutes after hot work.</span></div>
</div>
</div>

</div>`,
      },
    },

    {
      type: "heading",
      text: { id: "biaya-kecelakaan", en: "The cost of an accident vs prevention" },
    },
    {
      type: "paragraph",
      text: {
        id: "Banyak kontraktor hanya menghitung <strong>biaya langsung</strong> kecelakaan: rumah sakit, santunan, dan perbaikan alat. Padahal <strong>biaya tidak langsung</strong>—proyek berhenti, denda keterlambatan, penyelidikan, hilangnya jam kerja, hingga reputasi yang membuat klien ragu—bisa jauh lebih besar. Piramida kecelakaan kerja klasik (Heinrich/Bird) menunjukkan bahwa setiap kecelakaan berat didahului ratusan kejadian hampir celaka yang tidak pernah dicatat.",
        en: "Many contractors only count the <strong>direct costs</strong> of an accident: hospital bills, compensation, and equipment repair. Yet the <strong>indirect costs</strong>—project stoppage, delay penalties, investigations, lost work hours, and a reputation that makes clients hesitate—can be far larger. The classic accident pyramid (Heinrich/Bird) shows that every serious accident is preceded by hundreds of unrecorded near misses.",
      },
    },
    {
      type: "paragraph",
      text: {
        id: `<div class='not-prose my-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
<div class='bg-slate-900 px-5 py-3.5 text-sm font-bold text-white'>Contoh hitungan: kecelakaan jatuh dari ketinggian di proyek 20 pekerja</div>
<div class='overflow-x-auto'>
<table class='w-full text-sm'>
<thead><tr class='bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500'><th class='px-5 py-2.5'>Komponen</th><th class='px-5 py-2.5 text-right'>Biaya Kecelakaan</th><th class='px-5 py-2.5 text-right'>Biaya Pencegahan</th></tr></thead>
<tbody class='divide-y divide-slate-100'>
<tr><td class='px-5 py-3 text-slate-700'>Pengobatan & rumah sakit</td><td class='px-5 py-3 text-right font-semibold text-slate-900'>Rp35.000.000</td><td class='px-5 py-3 text-right text-slate-500'>—</td></tr>
<tr><td class='px-5 py-3 text-slate-700'>Santunan / kompensasi</td><td class='px-5 py-3 text-right font-semibold text-slate-900'>Rp50.000.000</td><td class='px-5 py-3 text-right text-slate-500'>—</td></tr>
<tr><td class='px-5 py-3 text-slate-700'>Proyek berhenti 5 hari (investigasi)</td><td class='px-5 py-3 text-right font-semibold text-slate-900'>Rp40.000.000</td><td class='px-5 py-3 text-right text-slate-500'>—</td></tr>
<tr><td class='px-5 py-3 text-slate-700'>Denda keterlambatan</td><td class='px-5 py-3 text-right font-semibold text-slate-900'>Rp25.000.000</td><td class='px-5 py-3 text-right text-slate-500'>—</td></tr>
<tr><td class='px-5 py-3 text-slate-700'>Penggantian pekerja pengganti & training ulang</td><td class='px-5 py-3 text-right font-semibold text-slate-900'>Rp15.000.000</td><td class='px-5 py-3 text-right text-slate-500'>—</td></tr>
<tr><td class='px-5 py-3 text-slate-700'>Guardrail, lifeline, dan anchor point</td><td class='px-5 py-3 text-right text-slate-500'>—</td><td class='px-5 py-3 text-right font-semibold text-emerald-700'>Rp12.000.000</td></tr>
<tr><td class='px-5 py-3 text-slate-700'>Pelatihan pekerja ketinggian & sertifikasi</td><td class='px-5 py-3 text-right text-slate-500'>—</td><td class='px-5 py-3 text-right font-semibold text-emerald-700'>Rp8.000.000</td></tr>
<tr><td class='px-5 py-3 text-slate-700'>Toolbox meeting & pengawasan harian</td><td class='px-5 py-3 text-right text-slate-500'>—</td><td class='px-5 py-3 text-right font-semibold text-emerald-700'>Rp5.000.000</td></tr>
<tr class='bg-slate-50'><td class='px-5 py-3 font-bold text-slate-900'>Total</td><td class='px-5 py-3 text-right font-extrabold text-rose-700'>Rp165.000.000</td><td class='px-5 py-3 text-right font-extrabold text-emerald-700'>Rp25.000.000</td></tr>
</tbody>
</table>
</div>
<div class='bg-amber-50 px-5 py-3 text-xs text-amber-800'>Selisih: biaya kecelakaan <strong>6,6× lebih besar</strong> daripada biaya pencegahan. Belum termasuk kerugian reputasi dan potensi kehilangan tender berikutnya.</div>
</div>`,
        en: `<div class='not-prose my-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
<div class='bg-slate-900 px-5 py-3.5 text-sm font-bold text-white'>Worked example: a fall-from-height accident on a 20-worker project</div>
<div class='overflow-x-auto'>
<table class='w-full text-sm'>
<thead><tr class='bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500'><th class='px-5 py-2.5'>Component</th><th class='px-5 py-2.5 text-right'>Accident Cost</th><th class='px-5 py-2.5 text-right'>Prevention Cost</th></tr></thead>
<tbody class='divide-y divide-slate-100'>
<tr><td class='px-5 py-3 text-slate-700'>Medical & hospital</td><td class='px-5 py-3 text-right font-semibold text-slate-900'>Rp35,000,000</td><td class='px-5 py-3 text-right text-slate-500'>—</td></tr>
<tr><td class='px-5 py-3 text-slate-700'>Compensation / benefits</td><td class='px-5 py-3 text-right font-semibold text-slate-900'>Rp50,000,000</td><td class='px-5 py-3 text-right text-slate-500'>—</td></tr>
<tr><td class='px-5 py-3 text-slate-700'>Project stoppage 5 days (investigation)</td><td class='px-5 py-3 text-right font-semibold text-slate-900'>Rp40,000,000</td><td class='px-5 py-3 text-right text-slate-500'>—</td></tr>
<tr><td class='px-5 py-3 text-slate-700'>Delay penalties</td><td class='px-5 py-3 text-right font-semibold text-slate-900'>Rp25,000,000</td><td class='px-5 py-3 text-right text-slate-500'>—</td></tr>
<tr><td class='px-5 py-3 text-slate-700'>Replacement worker & retraining</td><td class='px-5 py-3 text-right font-semibold text-slate-900'>Rp15,000,000</td><td class='px-5 py-3 text-right text-slate-500'>—</td></tr>
<tr><td class='px-5 py-3 text-slate-700'>Guardrails, lifeline, anchor points</td><td class='px-5 py-3 text-right text-slate-500'>—</td><td class='px-5 py-3 text-right font-semibold text-emerald-700'>Rp12,000,000</td></tr>
<tr><td class='px-5 py-3 text-slate-700'>Height work training & certification</td><td class='px-5 py-3 text-right text-slate-500'>—</td><td class='px-5 py-3 text-right font-semibold text-emerald-700'>Rp8,000,000</td></tr>
<tr><td class='px-5 py-3 text-slate-700'>Daily toolbox meetings & supervision</td><td class='px-5 py-3 text-right text-slate-500'>—</td><td class='px-5 py-3 text-right font-semibold text-emerald-700'>Rp5,000,000</td></tr>
<tr class='bg-slate-50'><td class='px-5 py-3 font-bold text-slate-900'>Total</td><td class='px-5 py-3 text-right font-extrabold text-rose-700'>Rp165,000,000</td><td class='px-5 py-3 text-right font-extrabold text-emerald-700'>Rp25,000,000</td></tr>
</tbody>
</table>
</div>
<div class='bg-amber-50 px-5 py-3 text-xs text-amber-800'>Difference: the accident costs <strong>6.6× more</strong> than prevention. This excludes reputation loss and the potential loss of the next tender.</div>
</div>`,
      },
    },

    {
      type: "heading",
      text: { id: "dasar-hukum", en: "Legal basis" },
    },
    {
      type: "paragraph",
      text: {
        id: "K3 konstruksi bukan kebijakan internal perusahaan. Ada dasar hukum yang mengikat, dan pelanggarannya berlapis sanksinya.",
        en: "Construction safety is not an internal company policy. There is binding legal basis, with layered sanctions for violations.",
      },
    },
    {
      type: "paragraph",
      text: {
        id: `<div class='not-prose my-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
<div class='divide-y divide-slate-100 px-5'>
<div class='py-3.5'><span class='text-sm font-bold text-slate-900'>UU No. 1 Tahun 1970 tentang Keselamatan Kerja</span><span class='mt-1 block text-xs leading-relaxed text-slate-600'>Dasar utama. Mewajibkan pengusaha menyediakan tempat kerja aman, APD, dan prosedur kerja. Sanksi pidana hingga 3 bulan kurungan atau denda.</span></div>
<div class='py-3.5'><span class='text-sm font-bold text-slate-900'>UU No. 2 Tahun 2017 tentang Jasa Konstruksi</span><span class='mt-1 block text-xs leading-relaxed text-slate-600'>Mewajibkan penerapan SMKK (Sistem Manajemen Keselamatan Konstruksi). Pelanggaran bisa berujung pada blacklist dari proyek pemerintah.</span></div>
<div class='py-3.5'><span class='text-sm font-bold text-slate-900'>PP No. 50 Tahun 2012 tentang SMK3</span><span class='mt-1 block text-xs leading-relaxed text-slate-600'>Mengatur penerapan SMK3 untuk perusahaan dengan 100 pekerja atau lebih, atau yang memiliki risiko bahaya tinggi—termasuk proyek konstruksi.</span></div>
<div class='py-3.5'><span class='text-sm font-bold text-slate-900'>Permen PUPR No. 10 Tahun 2021 tentang SMKK</span><span class='mt-1 block text-xs leading-relaxed text-slate-600'>Mengatur teknis SMKK, termasuk kewajiban Biaya Penerapan SMKK yang dihitung terpisah dalam RAB, bukan bagian dari overhead.</span></div>
<div class='py-3.5'><span class='text-sm font-bold text-slate-900'>Permenaker No. 1 Tahun 1980 tentang K3 pada Konstruksi Bangunan</span><span class='mt-1 block text-xs leading-relaxed text-slate-600'>Mengatur keselamatan pada pekerjaan konstruksi: penggalian, ketinggian, alat berat, dan pekerjaan panas.</span></div>
</div>
</div>`,
        en: `<div class='not-prose my-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
<div class='divide-y divide-slate-100 px-5'>
<div class='py-3.5'><span class='text-sm font-bold text-slate-900'>UU No. 1 of 1970 on Occupational Safety</span><span class='mt-1 block text-xs leading-relaxed text-slate-600'>The primary basis. Requires employers to provide a safe workplace, PPE, and safe work procedures. Criminal sanctions up to 3 months' imprisonment or fines.</span></div>
<div class='py-3.5'><span class='text-sm font-bold text-slate-900'>UU No. 2 of 2017 on Construction Services</span><span class='mt-1 block text-xs leading-relaxed text-slate-600'>Mandates SMKK (Construction Safety Management System). Violations can lead to blacklisting from government projects.</span></div>
<div class='py-3.5'><span class='text-sm font-bold text-slate-900'>PP No. 50 of 2012 on SMK3</span><span class='mt-1 block text-xs leading-relaxed text-slate-600'>Governs SMK3 implementation for companies with 100+ workers or high-risk hazards—including construction projects.</span></div>
<div class='py-3.5'><span class='text-sm font-bold text-slate-900'>Permen PUPR No. 10 of 2021 on SMKK</span><span class='mt-1 block text-xs leading-relaxed text-slate-600'>Governs SMKK technicalities, including mandatory SMKK Implementation Cost in the budget (RAB), not part of overhead.</span></div>
<div class='py-3.5'><span class='text-sm font-bold text-slate-900'>Permenaker No. 1 of 1980 on Construction Safety</span><span class='mt-1 block text-xs leading-relaxed text-slate-600'>Governs safety in construction work: excavation, height work, heavy equipment, and hot work.</span></div>
</div>
</div>`,
      },
    },

    {
      type: "heading",
      text: { id: "kesalahan-umum", en: "Common mistakes on site" },
    },
    {
      type: "list",
      ordered: false,
      items: [
        {
          id: "<strong>JSA dibuat sekali, dipakai selamanya.</strong> JSA harus diperbarui setiap kali metode kerja, alat, atau kondisi lokasi berubah. JSA tahun lalu tidak berlaku untuk pekerjaan bulan ini.",
          en: "<strong>JSA written once, used forever.</strong> A JSA must be updated whenever the method, tool, or site condition changes. Last year's JSA does not apply to this month's work.",
        },
        {
          id: "<strong>APD hanya dipakai saat ada tamu.</strong> Jika APD dipakai hanya saat audit, yang rusak adalah budayanya, bukan APD-nya.",
          en: "<strong>PPE only worn when guests arrive.</strong> If PPE is worn only during audits, the culture is broken—not the PPE.",
        },
        {
          id: "<strong>Safety officer dijadikan 'polisi', bukan 'penasihat'.</strong> Jika peran K3 hanya menghukum, pekerja akan menyembunyikan bahaya, bukan melaporkannya.",
          en: "<strong>Safety officers turned into 'police', not 'advisors'.</strong> If safety only punishes, workers hide hazards instead of reporting them.",
        },
        {
          id: "<strong>Tidak ada pencatatan near miss.</strong> Kejadian hampir celaka adalah peringatan gratis. Jika tidak dicatat, kecelakaan besar berikutnya hanya soal waktu.",
          en: "<strong>No near-miss reporting.</strong> A near miss is a free warning. If it is not recorded, the next serious accident is only a matter of time.",
        },
        {
          id: "<strong>Alokasi biaya K3 di bawah 1%.</strong> Ini sering terjadi karena Biaya Penerapan SMKK dimasukkan ke overhead. Akibatnya, anggaran K3 habis sebelum pekerjaan berisiko dimulai.",
          en: "<strong>Safety budget below 1%.</strong> This often happens because SMKK cost is folded into overhead. As a result, the safety budget runs out before high-risk work even begins.",
        },
      ],
    },

    {
      type: "heading",
      text: { id: "checklist", en: "Practical daily checklist" },
    },
    {
      type: "paragraph",
      text: {
        id: "Berikut checklist minimal yang bisa dipakai <em>setiap hari</em> sebelum pekerjaan dimulai. Tidak perlu panjang—yang penting konsisten.",
        en: "Here is the minimal checklist you can use <em>every day</em> before work starts. It does not need to be long—consistency matters more.",
      },
    },
    {
      type: "paragraph",
      text: {
        id: `<div class='not-prose my-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
<div class='divide-y divide-slate-100 px-5'>
<div class='flex items-start gap-3 py-3 text-sm'><span class='mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border border-slate-300 text-xs text-slate-400'>✓</span><span class='text-slate-700'>Toolbox meeting 5–10 menit: bahaya hari ini, kontrol, dan jalur evakuasi</span></div>
<div class='flex items-start gap-3 py-3 text-sm'><span class='mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border border-slate-300 text-xs text-slate-400'>✓</span><span class='text-slate-700'>APD lengkap: helm SNI, safety shoes, rompi, sarung tangan sesuai pekerjaan</span></div>
<div class='flex items-start gap-3 py-3 text-sm'><span class='mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border border-slate-300 text-xs text-slate-400'>✓</span><span class='text-slate-700'>Area kerja steril: tidak ada material menumpuk di jalur evakuasi</span></div>
<div class='flex items-start gap-3 py-3 text-sm'><span class='mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border border-slate-300 text-xs text-slate-400'>✓</span><span class='text-slate-700'>Alat berat: SIO operator, alarm mundur, lampu, dan rem dicek</span></div>
<div class='flex items-start gap-3 py-3 text-sm'><span class='mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border border-slate-300 text-xs text-slate-400'>✓</span><span class='text-slate-700'>Pekerjaan ketinggian: harness, lifeline, dan anchor point diperiksa</span></div>
<div class='flex items-start gap-3 py-3 text-sm'><span class='mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border border-slate-300 text-xs text-slate-400'>✓</span><span class='text-slate-700'>Galian: penahan galian terpasang, tidak ada air tergenang, area dibatasi</span></div>
<div class='flex items-start gap-3 py-3 text-sm'><span class='mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border border-slate-300 text-xs text-slate-400'>✓</span><span class='text-slate-700'>Pekerjaan panas: hot work permit, APAR, fire watch siap</span></div>
<div class='flex items-start gap-3 py-3 text-sm'><span class='mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border border-slate-300 text-xs text-slate-400'>✓</span><span class='text-slate-700'>Cuaca: jika hujan/angin kencang, pekerjaan ketinggian dan alat berat ditinjau ulang</span></div>
</div>
<div class='bg-slate-50 px-5 py-3 text-xs text-slate-500'>Checklist ini bukan pengganti HIRADC/JSA, tetapi pelengkap harian agar kontrol benar-benar dijalankan di lapangan.</div>
</div>`,
        en: `<div class='not-prose my-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
<div class='divide-y divide-slate-100 px-5'>
<div class='flex items-start gap-3 py-3 text-sm'><span class='mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border border-slate-300 text-xs text-slate-400'>✓</span><span class='text-slate-700'>Toolbox meeting 5–10 min: today's hazards, controls, and evacuation routes</span></div>
<div class='flex items-start gap-3 py-3 text-sm'><span class='mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border border-slate-300 text-xs text-slate-400'>✓</span><span class='text-slate-700'>Complete PPE: SNI helmet, safety shoes, vest, task-appropriate gloves</span></div>
<div class='flex items-start gap-3 py-3 text-sm'><span class='mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border border-slate-300 text-xs text-slate-400'>✓</span><span class='text-slate-700'>Clear work area: no material blocking evacuation routes</span></div>
<div class='flex items-start gap-3 py-3 text-sm'><span class='mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border border-slate-300 text-xs text-slate-400'>✓</span><span class='text-slate-700'>Heavy equipment: operator SIO, reverse alarms, lights, and brakes checked</span></div>
<div class='flex items-start gap-3 py-3 text-sm'><span class='mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border border-slate-300 text-xs text-slate-400'>✓</span><span class='text-slate-700'>Height work: harness, lifeline, and anchor points inspected</span></div>
<div class='flex items-start gap-3 py-3 text-sm'><span class='mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border border-slate-300 text-xs text-slate-400'>✓</span><span class='text-slate-700'>Excavation: shoring in place, no standing water, area bounded</span></div>
<div class='flex items-start gap-3 py-3 text-sm'><span class='mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border border-slate-300 text-xs text-slate-400'>✓</span><span class='text-slate-700'>Hot work: permit, extinguishers, and fire watch ready</span></div>
<div class='flex items-start gap-3 py-3 text-sm'><span class='mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border border-slate-300 text-xs text-slate-400'>✓</span><span class='text-slate-700'>Weather: in rain/strong wind, review height work and heavy equipment</span></div>
</div>
<div class='bg-slate-50 px-5 py-3 text-xs text-slate-500'>This checklist does not replace HIRADC/JSA, but complements it so controls are actually executed on site.</div>
</div>`,
      },
    },

    {
      type: "heading",
      text: { id: "faq", en: "Frequently asked questions" },
    },
    {
      type: "paragraph",
      text: {
        id: `<div class='not-prose my-5 space-y-3'>
<details class='group rounded-xl border border-slate-200 bg-white p-5 open:shadow-sm'>
<summary class='flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900 [&::-webkit-details-marker]:hidden'>Apakah proyek kecil juga wajib menerapkan K3?<span aria-hidden='true' class='text-xl leading-none text-[#1e88e5] transition-transform duration-200 group-open:rotate-45'>+</span></summary>
<div class='mt-3 text-sm leading-relaxed text-slate-600'>Wajib. UU No. 1 Tahun 1970 berlaku untuk semua tempat kerja, termasuk proyek kecil. Skala penerapannya boleh disesuaikan, tetapi kewajiban identifikasi bahaya, penyediaan APD, dan prosedur kerja aman tetap ada.</div>
</details>
<details class='group rounded-xl border border-slate-200 bg-white p-5 open:shadow-sm'>
<summary class='flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900 [&::-webkit-details-marker]:hidden'>Berapa minimal alokasi biaya K3 dalam RAB?<span aria-hidden='true' class='text-xl leading-none text-[#1e88e5] transition-transform duration-200 group-open:rotate-45'>+</span></summary>
<div class='mt-3 text-sm leading-relaxed text-slate-600'>Permen PUPR No. 10/2021 mengatur Biaya Penerapan SMKK yang dihitung terpisah dalam RAB, bukan bagian dari overhead. Besarannya bervariasi tergantung skala dan risiko proyek, umumnya berkisar 1–3% dari nilai kontrak.</div>
</details>
<details class='group rounded-xl border border-slate-200 bg-white p-5 open:shadow-sm'>
<summary class='flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900 [&::-webkit-details-marker]:hidden'>Apa sanksi jika proyek tidak menerapkan K3?<span aria-hidden='true' class='text-xl leading-none text-[#1e88e5] transition-transform duration-200 group-open:rotate-45'>+</span></summary>
<div class='mt-3 text-sm leading-relaxed text-slate-600'>Sanksi berlapis: administratif (teguran, denda, penghentian pekerjaan, blacklist dari proyek pemerintah), perdata (ganti rugi kepada pekerja atau keluarga korban), dan pidana (kurungan atau denda berdasarkan UU 1/1970 dan UU 2/2017).</div>
</details>
<details class='group rounded-xl border border-slate-200 bg-white p-5 open:shadow-sm'>
<summary class='flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900 [&::-webkit-details-marker]:hidden'>Apa beda HIRADC dan JSA?<span aria-hidden='true' class='text-xl leading-none text-[#1e88e5] transition-transform duration-200 group-open:rotate-45'>+</span></summary>
<div class='mt-3 text-sm leading-relaxed text-slate-600'>HIRADC menilai risiko secara menyeluruh per area atau aktivitas. JSA mengurai satu pekerjaan menjadi langkah-langkah dan bahaya di tiap langkah. HIRADC dipakai di level manajemen, JSA dipakai di level pelaksana.</div>
</details>
<details class='group rounded-xl border border-slate-200 bg-white p-5 open:shadow-sm'>
<summary class='flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900 [&::-webkit-details-marker]:hidden'>Apakah kecelakaan ringan tetap harus dilaporkan?<span aria-hidden='true' class='text-xl leading-none text-[#1e88e5] transition-transform duration-200 group-open:rotate-45'>+</span></summary>
<div class='mt-3 text-sm leading-relaxed text-slate-600'>Ya. Semua kecelakaan kerja, termasuk yang hanya menyebabkan hilangnya hari kerja (lost time injury), wajib dicatat dan dilaporkan. Pencatatan ini menjadi bahan evaluasi dan bukti kepatuhan saat audit K3.</div>
</details>
<details class='group rounded-xl border border-slate-200 bg-white p-5 open:shadow-sm'>
<summary class='flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900 [&::-webkit-details-marker]:hidden'>Siapa yang bertanggung jawab atas K3 di proyek?<span aria-hidden='true' class='text-xl leading-none text-[#1e88e5] transition-transform duration-200 group-open:rotate-45'>+</span></summary>
<div class='mt-3 text-sm leading-relaxed text-slate-600'>Tanggung jawab utama ada pada pengusaha atau kontraktor utama, bukan hanya petugas K3. Pengawas pekerjaan dan pemilik proyek juga memiliki tanggung jawab sesuai perannya. Petugas K3 bertugas memfasilitasi, bukan menanggung seluruh risiko sendirian.</div>
</details>
</div>`,
        en: `<div class='not-prose my-5 space-y-3'>
<details class='group rounded-xl border border-slate-200 bg-white p-5 open:shadow-sm'>
<summary class='flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900 [&::-webkit-details-marker]:hidden'>Are small projects also required to implement safety?<span aria-hidden='true' class='text-xl leading-none text-[#1e88e5] transition-transform duration-200 group-open:rotate-45'>+</span></summary>
<div class='mt-3 text-sm leading-relaxed text-slate-600'>Yes. UU No. 1 of 1970 applies to all workplaces, including small projects. The scale of implementation can be adjusted, but the obligations to identify hazards, provide PPE, and establish safe work procedures remain.</div>
</details>
<details class='group rounded-xl border border-slate-200 bg-white p-5 open:shadow-sm'>
<summary class='flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900 [&::-webkit-details-marker]:hidden'>What is the minimum safety budget in the RAB?<span aria-hidden='true' class='text-xl leading-none text-[#1e88e5] transition-transform duration-200 group-open:rotate-45'>+</span></summary>
<div class='mt-3 text-sm leading-relaxed text-slate-600'>Permen PUPR No. 10/2021 mandates a SMKK Implementation Cost calculated separately in the RAB, not part of overhead. The amount varies by project scale and risk, generally around 1–3% of the contract value.</div>
</details>
<details class='group rounded-xl border border-slate-200 bg-white p-5 open:shadow-sm'>
<summary class='flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900 [&::-webkit-details-marker]:hidden'>What are the sanctions if safety is not implemented?<span aria-hidden='true' class='text-xl leading-none text-[#1e88e5] transition-transform duration-200 group-open:rotate-45'>+</span></summary>
<div class='mt-3 text-sm leading-relaxed text-slate-600'>Layered sanctions: administrative (warnings, fines, work stoppage, blacklisting from government projects), civil (compensation to workers or victims' families), and criminal (imprisonment or fines under UU 1/1970 and UU 2/2017).</div>
</details>
<details class='group rounded-xl border border-slate-200 bg-white p-5 open:shadow-sm'>
<summary class='flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900 [&::-webkit-details-marker]:hidden'>What is the difference between HIRADC and JSA?<span aria-hidden='true' class='text-xl leading-none text-[#1e88e5] transition-transform duration-200 group-open:rotate-45'>+</span></summary>
<div class='mt-3 text-sm leading-relaxed text-slate-600'>HIRADC assesses risk comprehensively per area or activity. JSA breaks a single job into steps and hazards at each step. HIRADC is used at the management level; JSA is used at the execution level.</div>
</details>
<details class='group rounded-xl border border-slate-200 bg-white p-5 open:shadow-sm'>
<summary class='flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900 [&::-webkit-details-marker]:hidden'>Do minor accidents still need to be reported?<span aria-hidden='true' class='text-xl leading-none text-[#1e88e5] transition-transform duration-200 group-open:rotate-45'>+</span></summary>
<div class='mt-3 text-sm leading-relaxed text-slate-600'>Yes. All workplace accidents, including those that only cause lost workdays (lost time injury), must be recorded and reported. This record serves as evaluation material and compliance evidence during safety audits.</div>
</details>
<details class='group rounded-xl border border-slate-200 bg-white p-5 open:shadow-sm'>
<summary class='flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900 [&::-webkit-details-marker]:hidden'>Who is responsible for safety on site?<span aria-hidden='true' class='text-xl leading-none text-[#1e88e5] transition-transform duration-200 group-open:rotate-45'>+</span></summary>
<div class='mt-3 text-sm leading-relaxed text-slate-600'>Primary responsibility lies with the employer or main contractor, not only the safety officer. Supervisors and project owners also bear responsibility according to their roles. Safety officers facilitate; they do not carry the entire risk alone.</div>
</details>
</div>`,
      },
    },
    {
      type: "paragraph",
      text: {
        id: `<div class='not-prose relative my-8 overflow-hidden rounded-3xl bg-slate-900 p-7 text-center text-white sm:p-10'>
<div aria-hidden='true' class='pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#1e88e5] opacity-20 blur-3xl'></div>
<div class='relative'>
<span class='block text-[11px] font-bold uppercase tracking-[0.3em] text-[#4da3ff]'>Konsultasi K3</span>
<span class='mt-3 block text-xl font-bold sm:text-2xl'>Ingin proyek Anda siap audit K3?</span>
<span class='mx-auto mt-3 block max-w-xl text-sm leading-relaxed text-slate-300'>Tim kami membantu menyusun HIRADC, JSA, checklist harian, dan pendampingan penerapan SMKK di lapangan—bukan hanya dokumen, tapi benar-benar dijalankan.</span>
<a href='https://wa.me/6282258089367?text=Halo%2C%20saya%20ingin%20konsultasi%20K3%20untuk%20proyek%20saya.' target='_blank' rel='noopener noreferrer' class='mt-6 inline-flex min-h-12 items-center justify-center rounded-xl bg-emerald-700 px-7 py-3 text-sm font-bold text-white hover:bg-emerald-800'>Konsultasi via WhatsApp</a>
<span class='mt-6 block text-xs text-slate-400'>Baca juga: <a href='/layanan/infrastruktur/pasang-kanstin' class='font-semibold text-[#4da3ff] underline underline-offset-4 hover:text-white'>Layanan konstruksi</a> · <a href='/blog/pemasangan-kansteen' class='font-semibold text-[#4da3ff] underline underline-offset-4 hover:text-white'>Panduan pemasangan</a></span>
</div>
</div>`,
        en: `<div class='not-prose relative my-8 overflow-hidden rounded-3xl bg-slate-900 p-7 text-center text-white sm:p-10'>
<div aria-hidden='true' class='pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#1e88e5] opacity-20 blur-3xl'></div>
<div class='relative'>
<span class='block text-[11px] font-bold uppercase tracking-[0.3em] text-[#4da3ff]'>Safety Consultation</span>
<span class='mt-3 block text-xl font-bold sm:text-2xl'>Want your project ready for a safety audit?</span>
<span class='mx-auto mt-3 block max-w-xl text-sm leading-relaxed text-slate-300'>Our team helps prepare HIRADC, JSA, daily checklists, and on-site SMKK implementation support—not just documents, but real execution.</span>
<a href='https://wa.me/6282258089367?text=Hello%2C%20I%20would%20like%20a%20safety%20consultation%20for%20my%20project.' target='_blank' rel='noopener noreferrer' class='mt-6 inline-flex min-h-12 items-center justify-center rounded-xl bg-emerald-700 px-7 py-3 text-sm font-bold text-white hover:bg-emerald-800'>Consult on WhatsApp</a>
<span class='mt-6 block text-xs text-slate-400'>Read also: <a href='/layanan/infrastruktur/pasang-kanstin' class='font-semibold text-[#4da3ff] underline underline-offset-4 hover:text-white'>Construction services</a> · <a href='/blog/pemasangan-kansteen' class='font-semibold text-[#4da3ff] underline underline-offset-4 hover:text-white'>Installation guide</a></span>
</div>
</div>`,
      },
    },
  ],
},
 {
  slug: "harga-grass-block-2026",
  modifiedDateISO: "2026-11-24",
  date: { id: "24 November 2026", en: "November 24, 2026" },
  dateISO: "2026-11-24",
  canonical: "https://triabadimakmur.co.id/blog/harga-grass-block-2026",
  src: "/proyek/proyek-39-1024.webp",
  category: { id: "Grass Block", en: "Grass Block" },

  meta: {
    title: {
      id: "Harga Grass Block 2026 per m²: Fullpave, Halfpave & Set",
      en: "Grass Block Prices 2026 per m²: Fullpave, Halfpave & Set",
    },
    description: {
      id: "Harga grass block 2026 per m²: Fullpave, Halfpave, dan Fullpave Set, tebal 6 cm dan 8 cm, natural maupun warna. Plus jasa pasang Jabodetabek, rumus estimasi, dan survei gratis.",
      en: "2026 grass block prices per m²: Fullpave, Halfpave, and Fullpave Set, in 6 cm and 8 cm, natural or colored. Plus Jabodetabek installation rates, an estimation formula, and a free survey.",
    },
  },

  title: {
    id: "Harga Grass Block 2026 per m²: Fullpave, Halfpave & Set",
    en: "Grass Block Prices 2026 per m²: Fullpave, Halfpave & Set",
  },
  desc: {
    id: "Harga grass block 2026 per m² tebal 6 cm dan 8 cm, natural dan warna, plus jasa pasang Jabodetabek. Cara hitung estimasi dan survei gratis.",
    en: "2026 grass block prices per m² in 6 cm and 8 cm, natural and colored, plus Jabodetabek installation rates. How to estimate costs and a free survey.",
  },

  author: {
    name: "PT. Tri Abadi Makmur Indonesia",
    phone: "082258089367",
    avatar: "/logo.webp",
    lastUpdated: { id: "24 November 2026", en: "November 24, 2026" },
    bio: {
      id: "Tri Abadi Makmur merupakan perusahaan yang bergerak di bidang konstruksi, dengan pengalaman yang sudah bertahun – tahun kami kembangkan, tahapan proses yang mengedepankan kualitas dan kehati-hatian, serta eksekusi pengerjaan proyek yang signifikan, demi tercapainya kepuasan client sehingga terwujudnya jalinan kerjasama yang continue dan berkelanjutan.",
      en: "Tri Abadi Makmur is a construction company with years of experience we have developed, a process that prioritizes quality and prudence, as well as the execution of significant projects, in order to achieve client satisfaction so that continuous and long-term cooperation is realized.",
    },
  },

  tags: [
    { id: "Grass Block", en: "Grass Block", slug: "grass-block" },
    { id: "Pemasangan Paving Block", en: "Paving Block Installation", slug: "pemasangan-paving-block" },
    { id: "Biaya Aspal Per Meter", en: "Asphalt Cost Per Meter", slug: "biaya-aspal-per-meter" },
    { id: "Pemasangan Kansteen", en: "Kansteen Installation", slug: "pemasangan-kansteen" },
  ],

  schema: [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Harga Grass Block 2026 per m²: Fullpave, Halfpave & Set",
      "description": "Harga grass block 2026 per m² untuk Fullpave, Halfpave, dan Fullpave Set, tebal 6 cm dan 8 cm, natural maupun warna, lengkap dengan harga jasa pasang dan rumus estimasi.",
      "image": "https://triabadimakmur.co.id/proyek/pasang-grass-block.webp",
      "datePublished": "2026-11-24",
      "dateModified": "2026-11-24",
      "author": {
        "@type": "Organization",
        "name": "PT. Tri Abadi Makmur Indonesia",
        "telephone": "082258089367",
        "logo": "https://triabadimakmur.co.id/logo.webp"
      },
      "publisher": {
        "@type": "Organization",
        "name": "PT. Tri Abadi Makmur Indonesia",
        "logo": { "@type": "ImageObject", "url": "https://triabadimakmur.co.id/logo.webp" }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://triabadimakmur.co.id/blog/harga-grass-block-2026"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Grass Block 2026 (Fullpave, Halfpave, Fullpave Set)",
      "image": "https://triabadimakmur.co.id/proyek/pasang-grass-block.webp",
      "description": "Grass block untuk taman dan area halaman. Tersedia tipe Fullpave, Halfpave, dan Fullpave Set, tebal 6 cm dan 8 cm, natural maupun warna, dengan harga Rp75.000–Rp115.000 per m².",
      "brand": { "@type": "Brand", "name": "Tri Abadi Makmur" },
      "category": "Grass Block / Paving Grass Block",
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "IDR",
        "lowPrice": "75000",
        "highPrice": "115000",
        "offerCount": "6",
        "availability": "https://schema.org/InStock",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "priceCurrency": "IDR",
          "unitText": "square metre",
          "unitCode": "MTK"
        }
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Berapa harga grass block per m² di 2026?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Harga bahan mulai Rp75.000 per m² untuk Halfpave dan Fullpave tebal 6 cm natural, hingga Rp115.000 per m² untuk Fullpave Set tebal 8 cm warna. Harga jasa pasang dihitung terpisah."
          }
        },
        {
          "@type": "Question",
          "name": "Apakah harga per m² sudah termasuk jasa pasang?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Tidak. Harga per m² adalah harga bahan. Jasa pasang Rp30.000 per m² (tenaga saja) atau Rp40.000 per m² (tenaga + abu batu) untuk area di atas 100 m²."
          }
        },
        {
          "@type": "Question",
          "name": "Apa beda harga natural dan warna?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Harga warna Rp15.000 per m² lebih tinggi dibanding natural pada setiap tipe dan tebal."
          }
        },
        {
          "@type": "Question",
          "name": "Apa beda tebal 6 cm dan 8 cm?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Tebal 8 cm Rp10.000 per m² lebih tinggi dibanding 6 cm pada tipe yang sama, baik natural maupun warna."
          }
        },
        {
          "@type": "Question",
          "name": "Berapa harga jasa pasang untuk area di bawah 100 m²?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Harga jasa pasang yang tercantum berlaku untuk area di atas 100 m². Untuk area yang lebih kecil, tanyakan harganya kepada tim kami."
          }
        },
        {
          "@type": "Question",
          "name": "Apa beda grass block dan paving block?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Paving block menutup permukaan secara penuh. Grass block berlubang sehingga bisa ditumbuhi rumput."
          }
        },
        {
          "@type": "Question",
          "name": "Apakah survei lokasi gratis?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ya. Survei mengukur luas, melihat kondisi lokasi, dan memberi estimasi awal tanpa biaya di area Jabodetabek, Banten, dan Jawa Barat."
          }
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Beranda", "item": "https://triabadimakmur.co.id/" },
        { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://triabadimakmur.co.id/blog" },
        { "@type": "ListItem", "position": 3, "name": "Harga Grass Block 2026", "item": "https://triabadimakmur.co.id/blog/harga-grass-block-2026" }
      ]
    }
  ],

  body: [
    {
      type: "paragraph",
      text: {
        id: `<div class='not-prose my-6 rounded-2xl border-l-4 border-[#16a34a] bg-emerald-50/70 p-5 sm:p-6'><span class='block text-base leading-relaxed text-slate-800'>Harga grass block 2026 mulai <strong>Rp75.000 per m²</strong> untuk bahan (Halfpave atau Fullpave tebal 6 cm, natural) hingga <strong>Rp115.000 per m²</strong> (Fullpave Set tebal 8 cm, warna). Artikel ini merinci harga per tipe, tebal, dan warna, rumus estimasi biaya, serta harga jasa pasang di Jabodetabek.</span></div>`,
        en: `<div class='not-prose my-6 rounded-2xl border-l-4 border-[#16a34a] bg-emerald-50/70 p-5 sm:p-6'><span class='block text-base leading-relaxed text-slate-800'>Grass block prices in 2026 start at <strong>Rp75,000 per m²</strong> for material (Halfpave or Fullpave, 6 cm thick, natural) and go up to <strong>Rp115,000 per m²</strong> (Fullpave Set, 8 cm thick, colored). This article covers prices by type, thickness, and color, how to estimate costs, and installation rates in Greater Jakarta.</span></div>`,
      },
    },
    {
      type: "paragraph",
      text: {
        id: `<figure class='not-prose my-6 overflow-hidden rounded-2xl shadow-lg ring-1 ring-slate-900/5'><img src='/proyek/pasang-grass-block.webp' alt='Pemasangan grass block di lokasi proyek PT Tri Abadi Makmur' loading='lazy' decoding='async' class='h-auto w-full object-cover' style='aspect-ratio:16/9'><figcaption class='bg-slate-50 px-4 py-2.5 text-xs text-slate-500'>Pemasangan grass block di lokasi proyek.</figcaption></figure>`,
        en: `<figure class='not-prose my-6 overflow-hidden rounded-2xl shadow-lg ring-1 ring-slate-900/5'><img src='/proyek/pasang-grass-block.webp' alt='Grass block installation at a PT Tri Abadi Makmur project site' loading='lazy' decoding='async' class='h-auto w-full object-cover' style='aspect-ratio:16/9'><figcaption class='bg-slate-50 px-4 py-2.5 text-xs text-slate-500'>Grass block installation at a project site.</figcaption></figure>`,
      },
    },
    {
      type: "heading",
      text: { id: "Kenapa grass block dihitung per m²?", en: "Why are grass blocks priced per m²?" },
    },
    {
      type: "paragraph",
      text: {
        id: "Grass block menutup sebuah bidang, jadi satuan yang paling tepat adalah luas. Karena itu harga bahan dan jasa pasang grass block disebut <strong>per m²</strong>. Kanstin berbeda karena mengikuti garis tepi dan dihitung per meter lari, lihat <a href='/blog/harga-kanstin-2026' class='font-semibold text-[#1e88e5] underline underline-offset-2'>harga kanstin 2026</a>. Grass block juga berbeda dengan <a href='/blog/pemasangan-paving-block' class='font-semibold text-[#1e88e5] underline underline-offset-2'>paving block</a> yang menutup permukaan secara penuh, karena grass block berlubang sehingga bisa ditumbuhi rumput.",
        en: "Grass blocks cover a surface, so area is the most accurate unit. That is why both material and installation for grass block are priced <strong>per m²</strong>. Curbs are different: they follow an edge line and are priced per running meter, see <a href='/blog/harga-kanstin-2026' class='font-semibold text-[#1e88e5] underline underline-offset-2'>curb prices 2026</a>. Grass block also differs from <a href='/blog/pemasangan-paving-block' class='font-semibold text-[#1e88e5] underline underline-offset-2'>paving block</a>, which covers the surface completely, because grass block has openings where grass can grow.",
      },
    },
    {
      type: "heading",
      text: { id: "Tipe grass block", en: "Grass block types" },
    },
    {
      type: "paragraph",
      text: {
        id: `<div class='not-prose my-5 grid gap-4 sm:grid-cols-3'>
<div class='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'><span class='block h-1 w-10 rounded-full bg-[#16a34a]'></span><span class='mt-3 block font-bold text-slate-900'>Fullpave</span><span class='mt-1.5 block text-sm leading-relaxed text-slate-600'>Ukuran 21 × 21 cm. Tersedia tebal 6 cm dan 8 cm, natural atau warna.</span></div>
<div class='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'><span class='block h-1 w-10 rounded-full bg-[#3b82f6]'></span><span class='mt-3 block font-bold text-slate-900'>Halfpave</span><span class='mt-1.5 block text-sm leading-relaxed text-slate-600'>Ukuran 10,5 × 10,5 cm, setengah dari Fullpave, dengan jumlah buah per m² lebih banyak. Tersedia tebal 6 cm dan 8 cm.</span></div>
<div class='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'><span class='block h-1 w-10 rounded-full bg-[#e11d48]'></span><span class='mt-3 block font-bold text-slate-900'>Fullpave Set</span><span class='mt-1.5 block text-sm leading-relaxed text-slate-600'>Set kombinasi dengan tebal 6 cm dan 8 cm, natural atau warna. Tipe dengan harga tertinggi di daftar ini.</span></div>
</div>`,
        en: `<div class='not-prose my-5 grid gap-4 sm:grid-cols-3'>
<div class='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'><span class='block h-1 w-10 rounded-full bg-[#16a34a]'></span><span class='mt-3 block font-bold text-slate-900'>Fullpave</span><span class='mt-1.5 block text-sm leading-relaxed text-slate-600'>Size 21 × 21 cm. Available in 6 cm and 8 cm thickness, natural or colored.</span></div>
<div class='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'><span class='block h-1 w-10 rounded-full bg-[#3b82f6]'></span><span class='mt-3 block font-bold text-slate-900'>Halfpave</span><span class='mt-1.5 block text-sm leading-relaxed text-slate-600'>Size 10.5 × 10.5 cm, half of Fullpave, with more pieces per m². Available in 6 cm and 8 cm thickness.</span></div>
<div class='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'><span class='block h-1 w-10 rounded-full bg-[#e11d48]'></span><span class='mt-3 block font-bold text-slate-900'>Fullpave Set</span><span class='mt-1.5 block text-sm leading-relaxed text-slate-600'>Combination set in 6 cm and 8 cm thickness, natural or colored. The highest-priced type in this list.</span></div>
</div>`,
      },
    },
    {
      type: "heading",
      id: "harga-per-m2",
      text: { id: "Harga grass block 2026 per m²", en: "2026 grass block prices per m²" },
    },
    {
      type: "paragraph",
      text: {
        id: `<div class='not-prose my-6'>

<div class='rounded-2xl bg-slate-900 p-6 text-white sm:p-7'>
<span class='block text-[10px] font-bold uppercase tracking-[0.25em] text-[#4da3ff]'>Kisaran harga grass block per m²</span>
<span class='mt-2 block text-2xl font-extrabold tabular-nums sm:text-3xl'>Rp75.000 – Rp115.000 <span class='text-sm font-medium text-slate-300'>/m²</span></span>
<span class='mt-2 block text-xs leading-relaxed text-slate-300'>Harga bahan. Jasa pasang Rp30.000–Rp40.000 per m² dihitung terpisah.</span>
</div>

<div class='mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>

<div class='overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
<div class='px-5 py-4' style='background:#f0fdf4'>
<div class='flex items-center justify-between gap-2'>
<span class='text-xs font-bold uppercase tracking-[0.18em]' style='color:#15803d'>Fullpave</span>
<span class='rounded-full bg-white/70 px-2 py-0.5 text-[10px] font-bold' style='color:#15803d'>22 pcs/m²</span>
</div>
<span class='mt-1 block text-[11px] text-slate-500'>21 × 21 cm</span>
</div>
<div class='px-5'>
<div class='border-t border-slate-100 py-3.5'>
<div class='flex items-start justify-between gap-3'>
<span class='text-sm font-semibold text-slate-800'>6 cm</span>
<div class='text-right'>
<span class='block text-base font-extrabold tabular-nums text-slate-950'>Rp75.000<span class='ml-0.5 text-[11px] font-semibold text-slate-400'>/m²</span></span>
<span class='block text-[11px] text-slate-500'>Warna Rp90.000</span>
</div>
</div>
<div class='mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100'><div class='h-full rounded-full' style='width:65%;background:#16a34a'></div></div>
</div>
<div class='border-t border-slate-100 py-3.5'>
<div class='flex items-start justify-between gap-3'>
<span class='text-sm font-semibold text-slate-800'>8 cm</span>
<div class='text-right'>
<span class='block text-base font-extrabold tabular-nums text-slate-950'>Rp85.000<span class='ml-0.5 text-[11px] font-semibold text-slate-400'>/m²</span></span>
<span class='block text-[11px] text-slate-500'>Warna Rp100.000</span>
</div>
</div>
<div class='mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100'><div class='h-full rounded-full' style='width:74%;background:#16a34a'></div></div>
</div>
</div>
</div>

<div class='overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
<div class='px-5 py-4' style='background:#eff6ff'>
<div class='flex items-center justify-between gap-2'>
<span class='text-xs font-bold uppercase tracking-[0.18em]' style='color:#1d4ed8'>Halfpave</span>
<span class='rounded-full bg-white/70 px-2 py-0.5 text-[10px] font-bold' style='color:#1d4ed8'>88 pcs/m²</span>
</div>
<span class='mt-1 block text-[11px] text-slate-500'>10,5 × 10,5 cm</span>
</div>
<div class='px-5'>
<div class='border-t border-slate-100 py-3.5'>
<div class='flex items-start justify-between gap-3'>
<span class='text-sm font-semibold text-slate-800'>6 cm</span>
<div class='text-right'>
<span class='block text-base font-extrabold tabular-nums text-slate-950'>Rp75.000<span class='ml-0.5 text-[11px] font-semibold text-slate-400'>/m²</span></span>
<span class='block text-[11px] text-slate-500'>Warna Rp90.000</span>
</div>
</div>
<div class='mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100'><div class='h-full rounded-full' style='width:65%;background:#3b82f6'></div></div>
</div>
<div class='border-t border-slate-100 py-3.5'>
<div class='flex items-start justify-between gap-3'>
<span class='text-sm font-semibold text-slate-800'>8 cm</span>
<div class='text-right'>
<span class='block text-base font-extrabold tabular-nums text-slate-950'>Rp85.000<span class='ml-0.5 text-[11px] font-semibold text-slate-400'>/m²</span></span>
<span class='block text-[11px] text-slate-500'>Warna Rp100.000</span>
</div>
</div>
<div class='mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100'><div class='h-full rounded-full' style='width:74%;background:#3b82f6'></div></div>
</div>
</div>
</div>

<div class='overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:col-span-2 lg:col-span-1'>
<div class='px-5 py-4' style='background:#fff1f2'>
<div class='flex items-center justify-between gap-2'>
<span class='text-xs font-bold uppercase tracking-[0.18em]' style='color:#be123c'>Fullpave Set</span>
<span class='rounded-full bg-white/70 px-2 py-0.5 text-[10px] font-bold' style='color:#be123c'>Premium</span>
</div>
<span class='mt-1 block text-[11px] text-slate-500'>Set kombinasi</span>
</div>
<div class='px-5'>
<div class='border-t border-slate-100 py-3.5'>
<div class='flex items-start justify-between gap-3'>
<span class='text-sm font-semibold text-slate-800'>6 cm</span>
<div class='text-right'>
<span class='block text-base font-extrabold tabular-nums text-slate-950'>Rp90.000<span class='ml-0.5 text-[11px] font-semibold text-slate-400'>/m²</span></span>
<span class='block text-[11px] text-slate-500'>Warna Rp105.000</span>
</div>
</div>
<div class='mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100'><div class='h-full rounded-full' style='width:78%;background:#e11d48'></div></div>
</div>
<div class='border-t border-slate-100 py-3.5'>
<div class='flex items-start justify-between gap-3'>
<span class='text-sm font-semibold text-slate-800'>8 cm</span>
<div class='text-right'>
<span class='block text-base font-extrabold tabular-nums text-slate-950'>Rp100.000<span class='ml-0.5 text-[11px] font-semibold text-slate-400'>/m²</span></span>
<span class='block text-[11px] text-slate-500'>Warna Rp115.000</span>
</div>
</div>
<div class='mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100'><div class='h-full rounded-full' style='width:87%;background:#e11d48'></div></div>
</div>
</div>
</div>

</div>
<span class='mt-4 block text-xs leading-relaxed text-slate-500'>Harga per m² di atas adalah harga bahan. Harga final tergantung volume pekerjaan dan kondisi lokasi.</span>
</div>`,
        en: `<div class='not-prose my-6'>

<div class='rounded-2xl bg-slate-900 p-6 text-white sm:p-7'>
<span class='block text-[10px] font-bold uppercase tracking-[0.25em] text-[#4da3ff]'>Estimated grass block price range per m²</span>
<span class='mt-2 block text-2xl font-extrabold tabular-nums sm:text-3xl'>Rp75,000 – Rp115,000 <span class='text-sm font-medium text-slate-300'>/m²</span></span>
<span class='mt-2 block text-xs leading-relaxed text-slate-300'>Material prices only. Installation is Rp30,000–Rp40,000 per m², quoted separately.</span>
</div>

<div class='mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>

<div class='overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
<div class='px-5 py-4' style='background:#f0fdf4'>
<div class='flex items-center justify-between gap-2'>
<span class='text-xs font-bold uppercase tracking-[0.18em]' style='color:#15803d'>Fullpave</span>
<span class='rounded-full bg-white/70 px-2 py-0.5 text-[10px] font-bold' style='color:#15803d'>22 pcs/m²</span>
</div>
<span class='mt-1 block text-[11px] text-slate-500'>21 × 21 cm</span>
</div>
<div class='px-5'>
<div class='border-t border-slate-100 py-3.5'>
<div class='flex items-start justify-between gap-3'>
<span class='text-sm font-semibold text-slate-800'>6 cm</span>
<div class='text-right'>
<span class='block text-base font-extrabold tabular-nums text-slate-950'>Rp75,000<span class='ml-0.5 text-[11px] font-semibold text-slate-400'>/m²</span></span>
<span class='block text-[11px] text-slate-500'>Colored Rp90,000</span>
</div>
</div>
<div class='mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100'><div class='h-full rounded-full' style='width:65%;background:#16a34a'></div></div>
</div>
<div class='border-t border-slate-100 py-3.5'>
<div class='flex items-start justify-between gap-3'>
<span class='text-sm font-semibold text-slate-800'>8 cm</span>
<div class='text-right'>
<span class='block text-base font-extrabold tabular-nums text-slate-950'>Rp85,000<span class='ml-0.5 text-[11px] font-semibold text-slate-400'>/m²</span></span>
<span class='block text-[11px] text-slate-500'>Colored Rp100,000</span>
</div>
</div>
<div class='mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100'><div class='h-full rounded-full' style='width:74%;background:#16a34a'></div></div>
</div>
</div>
</div>

<div class='overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
<div class='px-5 py-4' style='background:#eff6ff'>
<div class='flex items-center justify-between gap-2'>
<span class='text-xs font-bold uppercase tracking-[0.18em]' style='color:#1d4ed8'>Halfpave</span>
<span class='rounded-full bg-white/70 px-2 py-0.5 text-[10px] font-bold' style='color:#1d4ed8'>88 pcs/m²</span>
</div>
<span class='mt-1 block text-[11px] text-slate-500'>10.5 × 10.5 cm</span>
</div>
<div class='px-5'>
<div class='border-t border-slate-100 py-3.5'>
<div class='flex items-start justify-between gap-3'>
<span class='text-sm font-semibold text-slate-800'>6 cm</span>
<div class='text-right'>
<span class='block text-base font-extrabold tabular-nums text-slate-950'>Rp75,000<span class='ml-0.5 text-[11px] font-semibold text-slate-400'>/m²</span></span>
<span class='block text-[11px] text-slate-500'>Colored Rp90,000</span>
</div>
</div>
<div class='mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100'><div class='h-full rounded-full' style='width:65%;background:#3b82f6'></div></div>
</div>
<div class='border-t border-slate-100 py-3.5'>
<div class='flex items-start justify-between gap-3'>
<span class='text-sm font-semibold text-slate-800'>8 cm</span>
<div class='text-right'>
<span class='block text-base font-extrabold tabular-nums text-slate-950'>Rp85,000<span class='ml-0.5 text-[11px] font-semibold text-slate-400'>/m²</span></span>
<span class='block text-[11px] text-slate-500'>Colored Rp100,000</span>
</div>
</div>
<div class='mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100'><div class='h-full rounded-full' style='width:74%;background:#3b82f6'></div></div>
</div>
</div>
</div>

<div class='overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:col-span-2 lg:col-span-1'>
<div class='px-5 py-4' style='background:#fff1f2'>
<div class='flex items-center justify-between gap-2'>
<span class='text-xs font-bold uppercase tracking-[0.18em]' style='color:#be123c'>Fullpave Set</span>
<span class='rounded-full bg-white/70 px-2 py-0.5 text-[10px] font-bold' style='color:#be123c'>Premium</span>
</div>
<span class='mt-1 block text-[11px] text-slate-500'>Combination set</span>
</div>
<div class='px-5'>
<div class='border-t border-slate-100 py-3.5'>
<div class='flex items-start justify-between gap-3'>
<span class='text-sm font-semibold text-slate-800'>6 cm</span>
<div class='text-right'>
<span class='block text-base font-extrabold tabular-nums text-slate-950'>Rp90,000<span class='ml-0.5 text-[11px] font-semibold text-slate-400'>/m²</span></span>
<span class='block text-[11px] text-slate-500'>Colored Rp105,000</span>
</div>
</div>
<div class='mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100'><div class='h-full rounded-full' style='width:78%;background:#e11d48'></div></div>
</div>
<div class='border-t border-slate-100 py-3.5'>
<div class='flex items-start justify-between gap-3'>
<span class='text-sm font-semibold text-slate-800'>8 cm</span>
<div class='text-right'>
<span class='block text-base font-extrabold tabular-nums text-slate-950'>Rp100,000<span class='ml-0.5 text-[11px] font-semibold text-slate-400'>/m²</span></span>
<span class='block text-[11px] text-slate-500'>Colored Rp115,000</span>
</div>
</div>
<div class='mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100'><div class='h-full rounded-full' style='width:87%;background:#e11d48'></div></div>
</div>
</div>
</div>

</div>
<span class='mt-4 block text-xs leading-relaxed text-slate-500'>Prices per m² above are material only. The final price depends on work volume and site conditions.</span>
</div>`,
      },
    },
    {
      type: "heading",
      text: { id: "Harga jasa pasang grass block", en: "Grass block installation rates" },
    },
    {
      type: "paragraph",
      text: {
        id: `<div class='not-prose my-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
<div class='bg-slate-900 px-5 py-3.5 text-sm font-bold text-white'>Harga jasa pasang grass block per m²</div>
<div class='grid grid-cols-1 divide-y divide-slate-100 sm:grid-cols-2 sm:divide-x sm:divide-y-0'>
<div class='p-5 text-center'>
<span class='block text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500'>Tenaga saja</span>
<span class='mt-2 block text-2xl font-extrabold tabular-nums text-slate-950 sm:text-3xl'>Rp30.000<span class='ml-1 text-sm font-semibold text-slate-400'>/m²</span></span>
<span class='mt-1 block text-[11px] text-slate-500'>Pemasangan oleh tukang</span>
</div>
<div class='p-5 text-center'>
<span class='block text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500'>Tenaga + Abu Batu</span>
<span class='mt-2 block text-2xl font-extrabold tabular-nums text-slate-950 sm:text-3xl'>Rp40.000<span class='ml-1 text-sm font-semibold text-slate-400'>/m²</span></span>
<span class='mt-1 block text-[11px] text-slate-500'>Termasuk material abu batu</span>
</div>
</div>
<div class='bg-amber-50 px-5 py-3 text-xs text-amber-800'>Harga jasa berlaku untuk area di atas 100 m². Untuk area yang lebih kecil, tanyakan harganya kepada tim kami.</div>
</div>`,
        en: `<div class='not-prose my-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
<div class='bg-slate-900 px-5 py-3.5 text-sm font-bold text-white'>Grass block installation rates per m²</div>
<div class='grid grid-cols-1 divide-y divide-slate-100 sm:grid-cols-2 sm:divide-x sm:divide-y-0'>
<div class='p-5 text-center'>
<span class='block text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500'>Labor only</span>
<span class='mt-2 block text-2xl font-extrabold tabular-nums text-slate-950 sm:text-3xl'>Rp30,000<span class='ml-1 text-sm font-semibold text-slate-400'>/m²</span></span>
<span class='mt-1 block text-[11px] text-slate-500'>Installation by workers</span>
</div>
<div class='p-5 text-center'>
<span class='block text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500'>Labor + Stone Dust</span>
<span class='mt-2 block text-2xl font-extrabold tabular-nums text-slate-950 sm:text-3xl'>Rp40,000<span class='ml-1 text-sm font-semibold text-slate-400'>/m²</span></span>
<span class='mt-1 block text-[11px] text-slate-500'>Stone dust material included</span>
</div>
</div>
<div class='bg-amber-50 px-5 py-3 text-xs text-amber-800'>Installation rates apply to areas above 100 m². For smaller areas, ask our team for a price.</div>
</div>`,
      },
    },
    {
      type: "heading",
      text: {
        id: "Cara menghitung estimasi biaya (rumus + 3 contoh)",
        en: "How to estimate the cost (formula + 3 worked examples)",
      },
    },
    {
      type: "list",
      ordered: true,
      items: [
        {
          id: "Ukur luas area yang akan dipasang (panjang × lebar tiap bidang), lalu jumlahkan. Area yang tidak ditutup grass block, seperti pohon atau bak kontrol, dikurangi.",
          en: "Measure the area to be installed (length × width of each section) and add them together. Areas not covered by grass block, such as trees or manholes, are subtracted.",
        },
        {
          id: "Tentukan faktor cadangan (waste): 5% untuk area persegi tanpa potongan, 10% untuk area dengan potongan tepi atau sudut, 15% untuk area dengan banyak bukaan atau pola melengkung.",
          en: "Set the waste factor: 5% for square areas without cuts, 10% for areas with edge or corner cuts, 15% for areas with many openings or curved patterns.",
        },
        {
          id: "Pilih tipe, tebal, dan warna (natural atau warna), lalu ambil harga per m² dari tabel di atas.",
          en: "Choose the type, thickness, and finish (natural or colored), then take the price per m² from the table above.",
        },
        {
          id: "Tambahkan jasa pasang per m²: Rp30.000 (tenaga saja) atau Rp40.000 (tenaga + abu batu).",
          en: "Add installation per m²: Rp30,000 (labor only) or Rp40,000 (labor + stone dust).",
        },
      ],
    },
    {
      type: "paragraph",
      text: {
        id: `<div class='not-prose my-5 rounded-2xl bg-slate-900 p-5 text-center sm:p-6'>
<span class='block text-[10px] font-bold uppercase tracking-[0.25em] text-[#4da3ff]'>Rumus</span>
<span class='mt-2 block font-mono text-sm text-white sm:text-base'>Total = (A × (1 + w) × H) + (A × J)</span>
<span class='mt-2 block text-[11px] text-slate-400'>A = luas (m²) · w = faktor cadangan · H = harga bahan per m² · J = jasa pasang per m²</span>
</div>
<div class='not-prose my-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
<div class='bg-blue-50 px-5 py-3.5 text-sm font-bold text-blue-900'>Arti setiap variabel</div>
<div class='divide-y divide-slate-100 px-5'>
<div class='flex items-start justify-between gap-4 py-3 text-sm'><span class='font-bold text-slate-950'>A</span><span class='text-right text-slate-600'>Luas area yang dipasang, dihitung per bidang lalu dijumlahkan</span></div>
<div class='flex items-start justify-between gap-4 py-3 text-sm'><span class='font-bold text-slate-950'>w</span><span class='text-right text-slate-600'>Faktor cadangan: 5% persegi · 10% potongan tepi atau sudut · 15% banyak bukaan atau pola melengkung</span></div>
<div class='flex items-start justify-between gap-4 py-3 text-sm'><span class='font-bold text-slate-950'>H</span><span class='text-right text-slate-600'>Harga bahan per m² sesuai tipe, tebal, dan warna (lihat tabel)</span></div>
<div class='flex items-start justify-between gap-4 py-3 text-sm'><span class='font-bold text-slate-950'>J</span><span class='text-right text-slate-600'>Jasa pasang per m²: Rp30.000 tenaga saja atau Rp40.000 tenaga + abu batu</span></div>
</div>
</div>`,
        en: `<div class='not-prose my-5 rounded-2xl bg-slate-900 p-5 text-center sm:p-6'>
<span class='block text-[10px] font-bold uppercase tracking-[0.25em] text-[#4da3ff]'>Formula</span>
<span class='mt-2 block font-mono text-sm text-white sm:text-base'>Total = (A × (1 + w) × H) + (A × J)</span>
<span class='mt-2 block text-[11px] text-slate-400'>A = area (m²) · w = waste factor · H = material price per m² · J = installation per m²</span>
</div>
<div class='not-prose my-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
<div class='bg-blue-50 px-5 py-3.5 text-sm font-bold text-blue-900'>What each variable means</div>
<div class='divide-y divide-slate-100 px-5'>
<div class='flex items-start justify-between gap-4 py-3 text-sm'><span class='font-bold text-slate-950'>A</span><span class='text-right text-slate-600'>Area installed, measured per section and added together</span></div>
<div class='flex items-start justify-between gap-4 py-3 text-sm'><span class='font-bold text-slate-950'>w</span><span class='text-right text-slate-600'>Waste factor: 5% square areas · 10% edge or corner cuts · 15% many openings or curved patterns</span></div>
<div class='flex items-start justify-between gap-4 py-3 text-sm'><span class='font-bold text-slate-950'>H</span><span class='text-right text-slate-600'>Material price per m² by type, thickness, and finish (see table)</span></div>
<div class='flex items-start justify-between gap-4 py-3 text-sm'><span class='font-bold text-slate-950'>J</span><span class='text-right text-slate-600'>Installation per m²: Rp30,000 labor only or Rp40,000 labor + stone dust</span></div>
</div>
</div>`,
      },
    },
    {
      type: "paragraph",
      text: {
        id: `<div class='not-prose my-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
<div class='bg-slate-50 px-5 py-3.5 text-sm font-bold text-slate-900'>Contoh 1 — Area 120 m², Halfpave 6 cm natural</div>
<div class='divide-y divide-slate-100 px-5'>
<div class='flex items-center justify-between gap-4 py-3 text-sm'><span class='text-slate-600'>Tipe, tebal & warna</span><span class='font-bold text-slate-950'>Halfpave 10,5 × 10,5 cm, 6 cm, natural</span></div>
<div class='flex items-center justify-between gap-4 py-3 text-sm'><span class='text-slate-600'>Luas + cadangan 5%</span><span class='font-bold text-slate-950'>120 × 1,05 = 126 m²</span></div>
<div class='flex items-center justify-between gap-4 py-3 text-sm'><span class='text-slate-600'>Biaya bahan</span><span class='font-bold text-slate-950'>126 × Rp75.000 = Rp9.450.000</span></div>
<div class='flex items-center justify-between gap-4 py-3 text-sm'><span class='text-slate-600'>Jasa pasang tenaga saja</span><span class='font-bold text-slate-950'>120 × Rp30.000 = Rp3.600.000</span></div>
</div>
<div class='bg-emerald-50 px-5 py-3 text-sm font-bold text-emerald-900'>Estimasi total ≈ Rp13.050.000</div>
</div>
<div class='not-prose my-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
<div class='bg-slate-50 px-5 py-3.5 text-sm font-bold text-slate-900'>Contoh 2 — Area 150 m², Fullpave 8 cm natural</div>
<div class='divide-y divide-slate-100 px-5'>
<div class='flex items-center justify-between gap-4 py-3 text-sm'><span class='text-slate-600'>Tipe, tebal & warna</span><span class='font-bold text-slate-950'>Fullpave 21 × 21 cm, 8 cm, natural</span></div>
<div class='flex items-center justify-between gap-4 py-3 text-sm'><span class='text-slate-600'>Luas + cadangan 10%</span><span class='font-bold text-slate-950'>150 × 1,10 = 165 m²</span></div>
<div class='flex items-center justify-between gap-4 py-3 text-sm'><span class='text-slate-600'>Biaya bahan</span><span class='font-bold text-slate-950'>165 × Rp85.000 = Rp14.025.000</span></div>
<div class='flex items-center justify-between gap-4 py-3 text-sm'><span class='text-slate-600'>Jasa pasang tenaga + abu batu</span><span class='font-bold text-slate-950'>150 × Rp40.000 = Rp6.000.000</span></div>
</div>
<div class='bg-emerald-50 px-5 py-3 text-sm font-bold text-emerald-900'>Estimasi total ≈ Rp20.025.000</div>
</div>
<div class='not-prose my-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
<div class='bg-slate-50 px-5 py-3.5 text-sm font-bold text-slate-900'>Contoh 3 — Area 200 m², Fullpave Set 8 cm warna</div>
<div class='divide-y divide-slate-100 px-5'>
<div class='flex items-center justify-between gap-4 py-3 text-sm'><span class='text-slate-600'>Tipe, tebal & warna</span><span class='font-bold text-slate-950'>Fullpave Set, 8 cm, warna</span></div>
<div class='flex items-center justify-between gap-4 py-3 text-sm'><span class='text-slate-600'>Luas + cadangan 15%</span><span class='font-bold text-slate-950'>200 × 1,15 = 230 m²</span></div>
<div class='flex items-center justify-between gap-4 py-3 text-sm'><span class='text-slate-600'>Biaya bahan</span><span class='font-bold text-slate-950'>230 × Rp115.000 = Rp26.450.000</span></div>
<div class='flex items-center justify-between gap-4 py-3 text-sm'><span class='text-slate-600'>Jasa pasang tenaga saja</span><span class='font-bold text-slate-950'>200 × Rp30.000 = Rp6.000.000</span></div>
</div>
<div class='bg-emerald-50 px-5 py-3 text-sm font-bold text-emerald-900'>Estimasi total ≈ Rp32.450.000</div>
</div>
<div class='not-prose my-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
<div class='bg-slate-900 px-5 py-3.5 text-sm font-bold text-white'>Rekap ketiga contoh</div>
<div class='divide-y divide-slate-100 px-5'>
<div class='flex items-center justify-between gap-4 py-3 text-sm'><span class='text-slate-600'>Halfpave 6 cm natural · 120 m²</span><span class='font-bold text-slate-950'>Rp13.050.000</span></div>
<div class='flex items-center justify-between gap-4 py-3 text-sm'><span class='text-slate-600'>Fullpave 8 cm natural · 150 m²</span><span class='font-bold text-slate-950'>Rp20.025.000</span></div>
<div class='flex items-center justify-between gap-4 py-3 text-sm'><span class='text-slate-600'>Fullpave Set 8 cm warna · 200 m²</span><span class='font-bold text-slate-950'>Rp32.450.000</span></div>
</div>
<div class='bg-slate-50 px-5 py-3 text-xs text-slate-500'>Harga bahan dan jasa mengikuti daftar harga kami. Total final ditentukan setelah survei lokasi.</div>
</div>`,
        en: `<div class='not-prose my-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
<div class='bg-slate-50 px-5 py-3.5 text-sm font-bold text-slate-900'>Example 1 — 120 m² area, Halfpave 6 cm natural</div>
<div class='divide-y divide-slate-100 px-5'>
<div class='flex items-center justify-between gap-4 py-3 text-sm'><span class='text-slate-600'>Type, thickness & finish</span><span class='font-bold text-slate-950'>Halfpave 10.5 × 10.5 cm, 6 cm, natural</span></div>
<div class='flex items-center justify-between gap-4 py-3 text-sm'><span class='text-slate-600'>Area + 5% waste</span><span class='font-bold text-slate-950'>120 × 1.05 = 126 m²</span></div>
<div class='flex items-center justify-between gap-4 py-3 text-sm'><span class='text-slate-600'>Material cost</span><span class='font-bold text-slate-950'>126 × Rp75,000 = Rp9,450,000</span></div>
<div class='flex items-center justify-between gap-4 py-3 text-sm'><span class='text-slate-600'>Labor only installation</span><span class='font-bold text-slate-950'>120 × Rp30,000 = Rp3,600,000</span></div>
</div>
<div class='bg-emerald-50 px-5 py-3 text-sm font-bold text-emerald-900'>Estimated total ≈ Rp13,050,000</div>
</div>
<div class='not-prose my-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
<div class='bg-slate-50 px-5 py-3.5 text-sm font-bold text-slate-900'>Example 2 — 150 m² area, Fullpave 8 cm natural</div>
<div class='divide-y divide-slate-100 px-5'>
<div class='flex items-center justify-between gap-4 py-3 text-sm'><span class='text-slate-600'>Type, thickness & finish</span><span class='font-bold text-slate-950'>Fullpave 21 × 21 cm, 8 cm, natural</span></div>
<div class='flex items-center justify-between gap-4 py-3 text-sm'><span class='text-slate-600'>Area + 10% waste</span><span class='font-bold text-slate-950'>150 × 1.10 = 165 m²</span></div>
<div class='flex items-center justify-between gap-4 py-3 text-sm'><span class='text-slate-600'>Material cost</span><span class='font-bold text-slate-950'>165 × Rp85,000 = Rp14,025,000</span></div>
<div class='flex items-center justify-between gap-4 py-3 text-sm'><span class='text-slate-600'>Labor + stone dust installation</span><span class='font-bold text-slate-950'>150 × Rp40,000 = Rp6,000,000</span></div>
</div>
<div class='bg-emerald-50 px-5 py-3 text-sm font-bold text-emerald-900'>Estimated total ≈ Rp20,025,000</div>
</div>
<div class='not-prose my-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
<div class='bg-slate-50 px-5 py-3.5 text-sm font-bold text-slate-900'>Example 3 — 200 m² area, Fullpave Set 8 cm colored</div>
<div class='divide-y divide-slate-100 px-5'>
<div class='flex items-center justify-between gap-4 py-3 text-sm'><span class='text-slate-600'>Type, thickness & finish</span><span class='font-bold text-slate-950'>Fullpave Set, 8 cm, colored</span></div>
<div class='flex items-center justify-between gap-4 py-3 text-sm'><span class='text-slate-600'>Area + 15% waste</span><span class='font-bold text-slate-950'>200 × 1.15 = 230 m²</span></div>
<div class='flex items-center justify-between gap-4 py-3 text-sm'><span class='text-slate-600'>Material cost</span><span class='font-bold text-slate-950'>230 × Rp115,000 = Rp26,450,000</span></div>
<div class='flex items-center justify-between gap-4 py-3 text-sm'><span class='text-slate-600'>Labor only installation</span><span class='font-bold text-slate-950'>200 × Rp30,000 = Rp6,000,000</span></div>
</div>
<div class='bg-emerald-50 px-5 py-3 text-sm font-bold text-emerald-900'>Estimated total ≈ Rp32,450,000</div>
</div>
<div class='not-prose my-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
<div class='bg-slate-900 px-5 py-3.5 text-sm font-bold text-white'>Summary of the three examples</div>
<div class='divide-y divide-slate-100 px-5'>
<div class='flex items-center justify-between gap-4 py-3 text-sm'><span class='text-slate-600'>Halfpave 6 cm natural · 120 m²</span><span class='font-bold text-slate-950'>Rp13,050,000</span></div>
<div class='flex items-center justify-between gap-4 py-3 text-sm'><span class='text-slate-600'>Fullpave 8 cm natural · 150 m²</span><span class='font-bold text-slate-950'>Rp20,025,000</span></div>
<div class='flex items-center justify-between gap-4 py-3 text-sm'><span class='text-slate-600'>Fullpave Set 8 cm colored · 200 m²</span><span class='font-bold text-slate-950'>Rp32,450,000</span></div>
</div>
<div class='bg-slate-50 px-5 py-3 text-xs text-slate-500'>Material and installation follow our price list. The final total is determined after a site survey.</div>
</div>`,
      },
    },
    {
      type: "paragraph",
      text: {
        id: "<span class='not-prose block text-sm leading-relaxed text-slate-600'>Catatan potongan: grass block yang dipotong di tepi meninggalkan sisa yang tidak selalu bisa dipakai kembali. Itu sebabnya faktor cadangan naik dari 5% ke 10–15% ketika area memiliki banyak sudut, tepi tidak lurus, atau bukaan.</span>",
        en: "<span class='not-prose block text-sm leading-relaxed text-slate-600'>Cutting note: grass blocks cut along edges leave offcuts that cannot always be reused. This is why the waste factor rises from 5% to 10–15% when an area has many corners, uneven edges, or openings.</span>",
      },
    },
    {
      type: "heading",
      text: { id: "Yang membuat harga berbeda", en: "What makes prices differ" },
    },
    {
      type: "list",
      ordered: false,
      items: [
        {
          id: "<strong>Tebal:</strong> tebal 8 cm Rp10.000 per m² lebih mahal dibanding 6 cm, untuk natural maupun warna.",
          en: "<strong>Thickness:</strong> 8 cm is Rp10,000 per m² more expensive than 6 cm, for both natural and colored.",
        },
        {
          id: "<strong>Warna:</strong> warna Rp15.000 per m² lebih mahal dibanding natural, di semua tipe dan tebal.",
          en: "<strong>Color:</strong> colored is Rp15,000 per m² more expensive than natural, for every type and thickness.",
        },
        {
          id: "<strong>Tipe:</strong> Fullpave Set adalah tipe dengan harga tertinggi. Halfpave dan Fullpave memiliki harga yang sama pada tebal yang sama.",
          en: "<strong>Type:</strong> Fullpave Set has the highest price. Halfpave and Fullpave have the same price at the same thickness.",
        },
        {
          id: "<strong>Jasa pasang:</strong> tambahan abu batu Rp10.000 per m², dari Rp30.000 menjadi Rp40.000.",
          en: "<strong>Installation:</strong> adding stone dust costs Rp10,000 per m² more, from Rp30,000 to Rp40,000.",
        },
        {
          id: "<strong>Kondisi lapangan dan volume:</strong> harga dapat berubah sesuai kondisi lapangan dan volume pekerjaan.",
          en: "<strong>Site conditions and volume:</strong> prices may change according to field conditions and work volume.",
        },
      ],
    },
    {
      type: "heading",
      text: { id: "Tips agar anggaran lebih hemat", en: "Tips to keep the budget lean" },
    },
    {
      type: "list",
      ordered: false,
      items: [
        {
          id: "Pilih natural jika warna tidak diperlukan. Harganya Rp15.000 per m² lebih rendah dibanding warna.",
          en: "Choose natural if color is not needed. It costs Rp15,000 per m² less than colored.",
        },
        {
          id: "Pilih tebal sesuai kebutuhan. Tebal 6 cm lebih hemat Rp10.000 per m² dibanding 8 cm.",
          en: "Choose the thickness that fits your needs. 6 cm saves Rp10,000 per m² compared with 8 cm.",
        },
        {
          id: "Hitung luas bersih dan gunakan cadangan sesuai kondisi area. Cadangan yang berlebih menambah biaya bahan.",
          en: "Calculate the net area and use a waste factor that matches the site. Excess waste adds to material cost.",
        },
        {
          id: "Area di atas 100 m² mendapat harga jasa yang tercantum. Untuk area lebih kecil, tanyakan harga kepada tim kami.",
          en: "Areas above 100 m² get the listed installation rates. For smaller areas, ask our team for a price.",
        },
        {
          id: "Bandingkan penawaran dengan tipe, tebal, dan warna yang sama agar perbandingannya adil.",
          en: "Compare quotes with the same type, thickness, and finish so the comparison is fair.",
        },
      ],
    },
    {
      type: "heading",
      text: { id: "Pertanyaan yang sering diajukan", en: "Frequently asked questions" },
    },
    {
      type: "paragraph",
      text: {
        id: `<div class='not-prose my-5 space-y-3'>
<details class='group rounded-xl border border-slate-200 bg-white p-5 open:shadow-sm'>
<summary class='flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900 [&::-webkit-details-marker]:hidden'>Berapa harga grass block per m² di 2026?<span aria-hidden='true' class='text-xl leading-none text-[#1e88e5] transition-transform duration-200 group-open:rotate-45'>+</span></summary>
<div class='mt-3 text-sm leading-relaxed text-slate-600'>Harga bahan mulai Rp75.000 per m² untuk Halfpave dan Fullpave tebal 6 cm natural, hingga Rp115.000 per m² untuk Fullpave Set tebal 8 cm warna. Harga jasa pasang dihitung terpisah.</div>
</details>
<details class='group rounded-xl border border-slate-200 bg-white p-5 open:shadow-sm'>
<summary class='flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900 [&::-webkit-details-marker]:hidden'>Apakah harga per m² sudah termasuk jasa pasang?<span aria-hidden='true' class='text-xl leading-none text-[#1e88e5] transition-transform duration-200 group-open:rotate-45'>+</span></summary>
<div class='mt-3 text-sm leading-relaxed text-slate-600'>Tidak. Harga per m² adalah harga bahan. Jasa pasang Rp30.000 per m² (tenaga saja) atau Rp40.000 per m² (tenaga + abu batu) untuk area di atas 100 m².</div>
</details>
<details class='group rounded-xl border border-slate-200 bg-white p-5 open:shadow-sm'>
<summary class='flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900 [&::-webkit-details-marker]:hidden'>Apa beda harga natural dan warna?<span aria-hidden='true' class='text-xl leading-none text-[#1e88e5] transition-transform duration-200 group-open:rotate-45'>+</span></summary>
<div class='mt-3 text-sm leading-relaxed text-slate-600'>Harga warna Rp15.000 per m² lebih tinggi dibanding natural pada setiap tipe dan tebal.</div>
</details>
<details class='group rounded-xl border border-slate-200 bg-white p-5 open:shadow-sm'>
<summary class='flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900 [&::-webkit-details-marker]:hidden'>Apa beda tebal 6 cm dan 8 cm?<span aria-hidden='true' class='text-xl leading-none text-[#1e88e5] transition-transform duration-200 group-open:rotate-45'>+</span></summary>
<div class='mt-3 text-sm leading-relaxed text-slate-600'>Tebal 8 cm Rp10.000 per m² lebih tinggi dibanding 6 cm pada tipe yang sama, baik natural maupun warna.</div>
</details>
<details class='group rounded-xl border border-slate-200 bg-white p-5 open:shadow-sm'>
<summary class='flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900 [&::-webkit-details-marker]:hidden'>Berapa harga jasa pasang untuk area di bawah 100 m²?<span aria-hidden='true' class='text-xl leading-none text-[#1e88e5] transition-transform duration-200 group-open:rotate-45'>+</span></summary>
<div class='mt-3 text-sm leading-relaxed text-slate-600'>Harga jasa pasang yang tercantum berlaku untuk area di atas 100 m². Untuk area yang lebih kecil, tanyakan harganya kepada tim kami.</div>
</details>
<details class='group rounded-xl border border-slate-200 bg-white p-5 open:shadow-sm'>
<summary class='flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900 [&::-webkit-details-marker]:hidden'>Apa beda grass block dan paving block?<span aria-hidden='true' class='text-xl leading-none text-[#1e88e5] transition-transform duration-200 group-open:rotate-45'>+</span></summary>
<div class='mt-3 text-sm leading-relaxed text-slate-600'>Paving block menutup permukaan secara penuh. Grass block berlubang sehingga bisa ditumbuhi rumput.</div>
</details>
<details class='group rounded-xl border border-slate-200 bg-white p-5 open:shadow-sm'>
<summary class='flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900 [&::-webkit-details-marker]:hidden'>Apakah survei lokasi gratis?<span aria-hidden='true' class='text-xl leading-none text-[#1e88e5] transition-transform duration-200 group-open:rotate-45'>+</span></summary>
<div class='mt-3 text-sm leading-relaxed text-slate-600'>Ya. Survei mengukur luas, melihat kondisi lokasi, dan memberi estimasi awal tanpa biaya di area Jabodetabek, Banten, dan Jawa Barat.</div>
</details>
</div>`,
        en: `<div class='not-prose my-5 space-y-3'>
<details class='group rounded-xl border border-slate-200 bg-white p-5 open:shadow-sm'>
<summary class='flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900 [&::-webkit-details-marker]:hidden'>How much is grass block per m² in 2026?<span aria-hidden='true' class='text-xl leading-none text-[#1e88e5] transition-transform duration-200 group-open:rotate-45'>+</span></summary>
<div class='mt-3 text-sm leading-relaxed text-slate-600'>Material prices start at Rp75,000 per m² for Halfpave and Fullpave, 6 cm natural, and go up to Rp115,000 per m² for Fullpave Set, 8 cm colored. Installation is calculated separately.</div>
</details>
<details class='group rounded-xl border border-slate-200 bg-white p-5 open:shadow-sm'>
<summary class='flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900 [&::-webkit-details-marker]:hidden'>Does the price per m² include installation?<span aria-hidden='true' class='text-xl leading-none text-[#1e88e5] transition-transform duration-200 group-open:rotate-45'>+</span></summary>
<div class='mt-3 text-sm leading-relaxed text-slate-600'>No. The price per m² is for material. Installation is Rp30,000 per m² (labor only) or Rp40,000 per m² (labor + stone dust) for areas above 100 m².</div>
</details>
<details class='group rounded-xl border border-slate-200 bg-white p-5 open:shadow-sm'>
<summary class='flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900 [&::-webkit-details-marker]:hidden'>What is the difference between natural and colored prices?<span aria-hidden='true' class='text-xl leading-none text-[#1e88e5] transition-transform duration-200 group-open:rotate-45'>+</span></summary>
<div class='mt-3 text-sm leading-relaxed text-slate-600'>Colored is Rp15,000 per m² more expensive than natural for every type and thickness.</div>
</details>
<details class='group rounded-xl border border-slate-200 bg-white p-5 open:shadow-sm'>
<summary class='flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900 [&::-webkit-details-marker]:hidden'>What is the difference between 6 cm and 8 cm thickness?<span aria-hidden='true' class='text-xl leading-none text-[#1e88e5] transition-transform duration-200 group-open:rotate-45'>+</span></summary>
<div class='mt-3 text-sm leading-relaxed text-slate-600'>8 cm is Rp10,000 per m² more expensive than 6 cm for the same type, for both natural and colored.</div>
</details>
<details class='group rounded-xl border border-slate-200 bg-white p-5 open:shadow-sm'>
<summary class='flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900 [&::-webkit-details-marker]:hidden'>What are the installation rates for areas under 100 m²?<span aria-hidden='true' class='text-xl leading-none text-[#1e88e5] transition-transform duration-200 group-open:rotate-45'>+</span></summary>
<div class='mt-3 text-sm leading-relaxed text-slate-600'>The listed installation rates apply to areas above 100 m². For smaller areas, ask our team for a price.</div>
</details>
<details class='group rounded-xl border border-slate-200 bg-white p-5 open:shadow-sm'>
<summary class='flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900 [&::-webkit-details-marker]:hidden'>What is the difference between grass block and paving block?<span aria-hidden='true' class='text-xl leading-none text-[#1e88e5] transition-transform duration-200 group-open:rotate-45'>+</span></summary>
<div class='mt-3 text-sm leading-relaxed text-slate-600'>Paving block covers the surface completely. Grass block has openings, so grass can grow in it.</div>
</details>
<details class='group rounded-xl border border-slate-200 bg-white p-5 open:shadow-sm'>
<summary class='flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900 [&::-webkit-details-marker]:hidden'>Is the site survey free?<span aria-hidden='true' class='text-xl leading-none text-[#1e88e5] transition-transform duration-200 group-open:rotate-45'>+</span></summary>
<div class='mt-3 text-sm leading-relaxed text-slate-600'>Yes. The survey measures the area, checks site conditions, and gives an initial estimate at no cost in Greater Jakarta, Banten, and West Java.</div>
</details>
</div>`,
      },
    },
    {
      type: "paragraph",
      text: {
        id: `<div class='not-prose relative my-8 overflow-hidden rounded-3xl bg-slate-900 p-7 text-center text-white sm:p-10'>
<div aria-hidden='true' class='pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#1e88e5] opacity-20 blur-3xl'></div>
<div class='relative'>
<span class='block text-[11px] font-bold uppercase tracking-[0.3em] text-[#4da3ff]'>Estimasi gratis</span>
<span class='mt-3 block text-xl font-bold sm:text-2xl'>Mau tahu total biaya untuk area Anda?</span>
<span class='mx-auto mt-3 block max-w-xl text-sm leading-relaxed text-slate-300'>Kirim luas area, tipe, tebal, dan warna yang diinginkan, serta lokasi proyek. Tim kami bantu hitung estimasinya dan survei lapangan bila diperlukan.</span>
<a href='https://wa.me/6282258089367?text=Halo%2C%20saya%20ingin%20estimasi%20harga%20grass%20block%20untuk%20proyek%20saya.' target='_blank' rel='noopener noreferrer' class='mt-6 inline-flex min-h-12 items-center justify-center rounded-xl bg-emerald-700 px-7 py-3 text-sm font-bold text-white hover:bg-emerald-800'>Estimasi via WhatsApp</a>
<span class='mt-6 block text-xs text-slate-400'>Baca juga: <a href='/blog/harga-kanstin-2026' class='font-semibold text-[#4da3ff] underline underline-offset-4 hover:text-white'>Harga kanstin 2026</a> · <a href='/blog/pemasangan-paving-block' class='font-semibold text-[#4da3ff] underline underline-offset-4 hover:text-white'>Pemasangan paving block</a> · <a href='/blog/biaya-aspal-per-meter' class='font-semibold text-[#4da3ff] underline underline-offset-4 hover:text-white'>Biaya aspal per meter</a></span>
</div>
</div>`,
        en: `<div class='not-prose relative my-8 overflow-hidden rounded-3xl bg-slate-900 p-7 text-center text-white sm:p-10'>
<div aria-hidden='true' class='pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#1e88e5] opacity-20 blur-3xl'></div>
<div class='relative'>
<span class='block text-[11px] font-bold uppercase tracking-[0.3em] text-[#4da3ff]'>Free estimate</span>
<span class='mt-3 block text-xl font-bold sm:text-2xl'>Want to know the total cost for your area?</span>
<span class='mx-auto mt-3 block max-w-xl text-sm leading-relaxed text-slate-300'>Send us the area size, the type, thickness, and finish you want, and the project location. We will help estimate it and arrange a site survey if needed.</span>
<a href='https://wa.me/6282258089367?text=Hello%2C%20I%20would%20like%20a%20grass%20block%20price%20estimate%20for%20my%20project.' target='_blank' rel='noopener noreferrer' class='mt-6 inline-flex min-h-12 items-center justify-center rounded-xl bg-emerald-700 px-7 py-3 text-sm font-bold text-white hover:bg-emerald-800'>Get an estimate on WhatsApp</a>
<span class='mt-6 block text-xs text-slate-400'>Read also: <a href='/blog/harga-kanstin-2026' class='font-semibold text-[#4da3ff] underline underline-offset-4 hover:text-white'>Curb prices 2026</a> · <a href='/blog/pemasangan-paving-block' class='font-semibold text-[#4da3ff] underline underline-offset-4 hover:text-white'>Paving block installation</a> · <a href='/blog/biaya-aspal-per-meter' class='font-semibold text-[#4da3ff] underline underline-offset-4 hover:text-white'>Asphalt cost per meter</a></span>
</div>
</div>`,
      },
    },
  ],
}
];

export function getArticleBySlug(slug) {
  return articles.find((a) => a.slug === slug);
}
