import { projects } from "./projects";

export const caseStudies = [
  {
    slug: "pengaspalan-akses-pabrik-cikupa",
    path: "/proyek/pengaspalan-akses-pabrik-cikupa",
    servicePath: "/layanan/infrastruktur/pengaspalan",
    areaPath: "/layanan/infrastruktur/pengaspalan/tangerang-cikupa",
    serviceName: "Jasa Pengaspalan Hotmix",
    quoteRequest: "asphaltSurvey",
    location: "Cikupa, Tangerang",
    areaServed: ["Tangerang", "Cikupa"],
    year: 2025,
    areaM2: 1200,
    photo: projects.find(({ id }) => id === 26),
    title: { id: "Pengaspalan Akses & Area Bongkar Muat Pabrik di Cikupa", en: "Factory Access Road and Loading Area Paving in Cikupa" },
    client: { id: "Perusahaan manufaktur di Kawasan Industri Cikupa", en: "Manufacturing company in the Cikupa industrial area" },
    summary: {
      id: "Rekonstruksi akses dan area bongkar muat sekitar 1.200 m² di Cikupa, Tangerang. Tim membagi pekerjaan menjadi dua zona malam agar distribusi pabrik tetap berjalan.",
      en: "Reconstruction of about 1,200 m² of factory access and loading areas in Cikupa, Tangerang. Work was split into two nighttime zones to keep factory distribution running.",
    },
    specifications: {
      id: "Rekonstruksi pondasi agregat Base Course dan penghamparan hotmix AC-BC serta AC-WC dengan ketebalan padat total 6 cm untuk lalu lintas truk logistik berat.",
      en: "Aggregate base course reconstruction and placement of AC-BC and AC-WC hotmix with a combined compacted thickness of 6 cm for heavy logistics trucks.",
    },
    challenge: {
      id: "Aktivitas bongkar muat pabrik tetap berjalan penuh pada siang hari, sehingga jalur distribusi harus tetap tersedia.",
      en: "Daytime loading and unloading continued at full capacity, so distribution routes had to remain available.",
    },
    method: {
      id: "Pekerjaan dibagi menjadi dua zona yang dikerjakan bertahap pada malam hari, di luar jam operasional pabrik.",
      en: "The crew worked in two zones in stages at night, outside the factory’s operating hours.",
    },
    outcome: {
      id: "Jalur akses rata tanpa genangan, dapat digunakan oleh truk logistik harian, dan diserahterimakan sesuai jadwal pabrik. Distribusi tetap berjalan selama pekerjaan.",
      en: "The access road was even and free of standing water, accommodated daily logistics trucks, and was handed over on the factory’s schedule. Distribution continued during the work.",
    },
    area: {
      title: { id: "Jasa Pengaspalan Tangerang & Kawasan Industri Cikupa", en: "Asphalt Paving in Tangerang and Industrial Cikupa" },
      location: "Tangerang / Cikupa",
      summary: {
        id: "Survei pengaspalan akses pabrik, pergudangan, dan area bongkar muat di Tangerang dan Cikupa. Rencanakan pekerjaan dari arus truk, kondisi pondasi, dan jadwal operasional lokasi.",
        en: "Site surveys for factory access roads, warehouses, and loading areas in Tangerang and Cikupa. Plan around truck movements, base conditions, and site operating hours.",
      },
      guide: [
        {
          title: { id: "Rute truk dan tahapan pekerjaan", en: "Truck routes and work phases" },
          text: {
            id: "Petakan pintu masuk, titik putar kontainer, jalur forklift, dan akses bongkar muat yang harus tetap terbuka. Tentukan bersama pengelola zona yang bisa ditutup dan jadwal malam atau antarshift yang tersedia.",
            en: "Map entrances, container truck turning points, forklift routes, and loading bays that must remain open. Agree on closure zones and available night or between-shift work windows with site management.",
          },
        },
        {
          title: { id: "Pondasi, drainase, dan ketebalan", en: "Base, drainage, and pavement thickness" },
          text: {
            id: "Survei memeriksa kondisi aspal dan pondasi, titik genangan, serta jenis dan beban kendaraan. Data ini membantu menentukan bagian yang bisa dioverlay dan bagian yang perlu dibangun ulang, termasuk ketebalan lapisannya.",
            en: "The survey checks the existing asphalt and base, standing-water points, and vehicle types and loads. This helps determine which sections can be resurfaced, which need rebuilding, and the required layer thicknesses.",
          },
        },
      ],
      survey: {
        id: "Untuk survei, siapkan pin lokasi, perkiraan luas, foto kondisi jalan, jenis truk, serta jam bongkar muat yang tidak boleh terganggu.",
        en: "For a survey, share the site pin, estimated area, pavement photos, truck types, and loading hours that must remain uninterrupted.",
      },
    },
  },
  {
    slug: "pengecoran-lantai-gudang-cikarang",
    path: "/proyek/pengecoran-lantai-gudang-cikarang",
    servicePath: "/layanan/infrastruktur/cor-beton-ready-mix",
    areaPath: "/layanan/infrastruktur/cor-beton-ready-mix/bekasi-cikarang",
    serviceName: "Jasa Cor Beton & Lantai Industri",
    quoteRequest: "concreteSurvey",
    location: "Cikarang, Bekasi",
    areaServed: ["Bekasi", "Cikarang"],
    year: 2025,
    areaM2: 850,
    photo: projects.find(({ id }) => id === 64),
    title: { id: "Pengecoran & Finishing Lantai Gudang di Cikarang", en: "Warehouse Floor Casting and Finishing in Cikarang" },
    client: { id: "Fasilitas pergudangan dan logistik di Kawasan Industri Cikarang", en: "Warehousing and logistics facility in the Cikarang industrial area" },
    summary: {
      id: "Pengecoran dan finishing sekitar 850 m² lantai gudang di Cikarang, Bekasi, menggunakan beton K-300, wiremesh M8, dan finishing untuk jalur forklift.",
      en: "Casting and finishing about 850 m² of warehouse flooring in Cikarang, Bekasi, using K-300 concrete, M8 wire mesh, and a finish suited to forklift routes.",
    },
    specifications: {
      id: "Beton Ready Mix K-300 tebal 15 cm dengan wiremesh M8, finishing floor hardener, dan perataan dengan power trowel.",
      en: "A 15 cm slab of K-300 ready-mix concrete with M8 wire mesh, a floor hardener, and power-trowel finishing.",
    },
    challenge: {
      id: "Permukaan lantai perlu rata untuk manuver forklift di area rak tinggi.",
      en: "The floor needed an even surface for forklift manoeuvres around high racks.",
    },
    method: {
      id: "Pengecoran dilakukan per segmen. Pemotongan cutting joint dijadwalkan untuk membantu mengendalikan retak susut.",
      en: "The floor was poured in sections. Control joints were cut on schedule to help control shrinkage cracking.",
    },
    outcome: {
      id: "Lantai padat, bebas debu, dan rata pada jalur forklift. Area siap digunakan sesuai target waktu klien.",
      en: "The floor was compact, dust-free, and even along forklift routes. The area was ready for use by the client's target date.",
    },
    area: {
      title: { id: "Jasa Cor Beton & Lantai Industri Bekasi–Cikarang", en: "Concrete Pouring and Industrial Flooring in Bekasi and Cikarang" },
      location: "Bekasi / Cikarang",
      summary: {
        id: "Survei pengecoran lantai gudang, jalan industri, dan loading dock di Bekasi dan Cikarang. Bahas kebutuhan lantai, akses mixer, dan lingkup finishing sebelum meminta penawaran.",
        en: "Site surveys for warehouse floors, industrial roads, and loading docks in Bekasi and Cikarang. Discuss floor requirements, mixer access, and the finishing scope before requesting a quote.",
      },
      guide: [
        {
          title: { id: "Mutu beton dan kebutuhan permukaan", en: "Concrete grade and surface requirements" },
          text: {
            id: "Diskusikan pilihan mutu K-250 hingga K-350 berdasarkan fungsi lantai, beban forklift, dan spesifikasi proyek. Tentukan kebutuhan kerataan, floor hardener, serta tata letak cutting joint sebelum pengecoran.",
            en: "Discuss grades from K-250 to K-350 based on the floor's use, forklift loads, and project specifications. Establish flatness, floor-hardener, and control-joint requirements before pouring.",
          },
        },
        {
          title: { id: "Akses mixer dan penempatan pompa", en: "Mixer access and pump positioning" },
          text: {
            id: "Periksa lebar jalur masuk, tinggi portal, ruang putar truk, dan jarak dari titik bongkar ke area cor. Hasil survei membantu memilih mixer standar atau minimix serta menentukan apakah pompa dibutuhkan.",
            en: "Check the entrance width, gate clearance, truck turning space, and distance from the discharge point to the pour. The survey helps select a standard mixer or Minimix and determine whether a pump is needed.",
          },
        },
      ],
      survey: {
        id: "Untuk survei, siapkan luas atau volume, fungsi lantai, kebutuhan finishing, foto akses armada, dan jadwal pengecoran yang diinginkan.",
        en: "For a survey, share the area or volume, floor use, finishing requirements, vehicle-access photos, and preferred pouring schedule.",
      },
    },
  },
];

export const caseStudyReviewer = "Tim Teknis & Estimator PT Tri Abadi Makmur";
