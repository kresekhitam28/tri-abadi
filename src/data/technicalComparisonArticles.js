import { formatAsphaltPrice } from "./asphaltPricing";
import { caseStudies, caseStudyReviewer } from "./caseStudies";
import { pricingConfig } from "./pricingConfig";

const { packages, simulations } = pricingConfig.asphalt;
const [asphaltCase, concreteCase] = ["pengaspalan-akses-pabrik-cikupa", "pengecoran-lantai-gudang-cikarang"]
  .map((slug) => caseStudies.find((study) => study.slug === slug));
const asphaltService = asphaltCase.servicePath;
const concreteService = concreteCase.servicePath;
const comparisonSlug = "aspal-hotmix-vs-cor-beton-akses-truk";
const repairSlug = "overlay-aspal-vs-tambal-sulam";
const category = { id: "Pengaspalan", en: "Asphalt Paving" };
const price = (code, lang) => `${formatAsphaltPrice(packages[code].ratePerM2, lang)}/m²`;
const warranty = (code) => packages[code].warrantyMonths.join("–");
const link = (href, label) => `<a href="${href}" class="font-semibold text-blue-800 underline">${label}</a>`;
const text = (id, en) => ({ id, en });
const paragraph = (id, en) => ({ type: "paragraph", text: text(id, en) });
const heading = (id, en) => ({ type: "heading", text: text(id, en) });
const shared = {
  dateISO: "2026-11-20",
  category,
  technicalReviewer: caseStudyReviewer,
};

export const technicalComparisonArticles = [
  {
    ...shared,
    slug: comparisonSlug,
    src: asphaltCase.photo.src,
    title: text("Aspal Hotmix vs Cor Beton untuk Akses Truk dan Kawasan Industri", "Hotmix Asphalt vs Concrete for Truck Access and Industrial Sites"),
    desc: text(
      "Bandingkan aspal hotmix dan cor beton untuk akses industri, parkir truk, dan lantai gudang dari sisi beban sumbu, waktu buka akses, biaya, dan perawatan.",
      "Compare asphalt and concrete for industrial roads, truck parking, and warehouse floors by axle loads, reopening time, cost, and maintenance.",
    ),
    answer: text(
      "Pilih aspal hotmix untuk jalur truk yang butuh permukaan nyaman dilalui, mudah dilapis ulang, dan bisa dibuka kembali dalam hitungan jam setelah pemadatan bila suhu dan kondisi lapangan memungkinkan. Pertimbangkan cor beton ready mix untuk truk berat yang lama parkir atau memberi beban titik pada kaki trailer, serta zona yang sering terkena tumpahan oli atau solar. Kedua perkerasan tetap memerlukan drainase yang membuang air dari permukaan.",
      "Choose hotmix asphalt for truck routes where a smooth ride, straightforward resurfacing, and reopening within hours matter, provided the compacted asphalt has cooled sufficiently and site conditions allow. Consider ready-mix concrete where heavy trucks park for long periods, trailer legs impose point loads, or oil and diesel spills are common. Both pavement types still need drainage that carries water away from the surface.",
    ),
    surveyRequest: "industrialPavementSurvey",
    tags: [
      { ...text("Overlay vs Tambal Sulam", "Overlay vs Patching"), slug: repairSlug },
      { ...text("Biaya Aspal per m²", "Asphalt Cost per m²"), slug: "biaya-aspal-per-meter" },
      { ...text("Harga Cor Beton Ready Mix", "Ready-Mix Concrete Prices"), slug: "harga-cor-beton-ready-mix" },
    ],
    body: [
      heading("Perbandingan teknis untuk lalu lintas truk", "Technical comparison for truck traffic"),
      {
        type: "table",
        id: "truck-pavement-comparison",
        caption: text("Aspal hotmix dan cor beton untuk kawasan industri", "Hotmix asphalt and concrete for industrial sites"),
        columns: [text("Aspek", "Factor"), text("Aspal hotmix", "Hotmix asphalt"), text("Cor beton ready mix", "Ready-mix concrete pavement")],
        rows: [
          [
            text("Daya dukung beban sumbu", "Axle load capacity"),
            text("Beban berulang perlu desain ketebalan lapis aspal dan pondasi sesuai beban sumbu dan frekuensi truk. Area putar dan antre lebih rentan membentuk alur.", "Repeated axle loads require asphalt and base thicknesses suited to axle weights and truck frequency. Turning and queuing areas are more prone to rutting."),
            text("Pelat yang didesain untuk beban truk dapat menahan beban statis dan beban titik. Periksa daya dukung tanah dasar, ketebalan pelat, sambungan, dan tepi pelat.", "A slab designed for truck traffic can support static and point loads. Check subgrade support, slab thickness, joints, and slab edges."),
          ],
          [
            text("Waktu pengerjaan dan buka akses", "Construction and reopening time"),
            text("Bisa dibuka per zona dalam hitungan jam jika lapis aspal selesai dipadatkan, cukup dingin, dan tim menyetujui pembukaan akses.", "Completed zones may reopen within hours once compaction is complete, the asphalt has cooled sufficiently, and the crew clears the zone for traffic."),
            text("Butuh curing dan verifikasi kuat beton yang dipersyaratkan sebelum truk masuk. Jadwalkan buka akses berdasarkan kekuatan yang tercapai.", "Concrete needs curing and verification of the specified opening strength before trucks return. Schedule reopening based on measured strength."),
          ],
          [
            text("Genangan dan tumpahan bahan kimia", "Standing water and chemical spills"),
            text("Air yang masuk lewat retak bisa melemahkan pondasi. Oli dan solar dapat melunakkan pengikat aspal, terutama bila tumpahan dibiarkan.", "Water entering through cracks can weaken the base. Oil and diesel can soften the asphalt binder, particularly when spills remain on the surface."),
            text("Permukaan beton umumnya lebih tahan terhadap tumpahan oli dan solar. Drainase tetap penting, dan paparan bahan kimia agresif mungkin memerlukan pelindung khusus.", "Concrete surfaces generally tolerate oil and diesel spills better. Drainage still matters, and aggressive chemicals may require a protective treatment."),
          ],
          [
            text("Perbaikan utilitas", "Utility repairs"),
            text("Bukaan parit utilitas dapat dipulihkan dengan tambalan berlapis setelah timbunan dipadatkan.", "Utility trenches can be reinstated with a layered asphalt patch after the backfill is compacted."),
            text("Pemotongan dan pemulihan pelat perlu memperhatikan sambungan, transfer beban, serta waktu pengerasan beton pengganti.", "Slab cutting and reinstatement require attention to joints, load transfer, and the time needed for replacement concrete to gain strength."),
          ],
          [
            text("Estimasi biaya awal", "Initial cost estimate"),
            text(`Overlay Paket A mulai ${price("A", "id")} untuk pondasi yang masih layak. Konstruksi penuh Paket D mulai ${price("D", "id")}, dengan lingkup final mengikuti survei.`, `Package A overlay starts at ${price("A", "en")} on a sound base. Package D full construction starts at ${price("D", "en")}, with final scope based on the survey.`),
            text("Bandingkan nilai terpasang per m² untuk desain yang setara. Hitung pasokan ready mix, persiapan pondasi, tulangan bila diperlukan, pengecoran, sambungan, dan finishing.", "Compare installed cost per m² for equivalent designs. Include ready-mix supply, base preparation, any specified reinforcement, placing, joints, and finishing."),
          ],
          [
            text("Perawatan jangka panjang", "Long-term maintenance"),
            text("Pantau retak dan alur roda, perbaiki titik rusak, dan rencanakan pelapisan ulang saat pondasi masih layak.", "Monitor cracking and rutting, repair localized damage, and plan resurfacing while the base is still sound."),
            text("Pantau sambungan dan tepi pelat, perbaiki kerusakan setempat, serta masukkan waktu penutupan zona ke rencana perawatan.", "Inspect joints and slab edges, repair local damage, and account for zone closures in the maintenance plan."),
          ],
        ],
      },
      heading("Pilih material berdasarkan zona operasional", "Choose pavement by operating zone"),
      {
        type: "list",
        items: [
          text("<strong>Jalur lintasan utama:</strong> Pertimbangkan hotmix untuk truk yang terus bergerak dan akses yang harus dibuka per zona. Periksa beban sumbu, jumlah lintasan harian, dan kebutuhan perkuatan di tikungan atau gerbang.", "<strong>Main access road:</strong> Consider hotmix for moving trucks and phased reopening. Check axle loads, daily truck passes, and reinforcement needs near gates or turns."),
          text("<strong>Parkir truk berat dan loading dock:</strong> Pertimbangkan pelat beton di area truk berhenti lama, berputar, atau meletakkan trailer. Petakan posisi kaki trailer, tepi pelat, dan titik buang air.", "<strong>Truck staging and loading docks:</strong> Consider concrete where trucks park, turn, or drop trailers. Map trailer leg positions, slab edges, and drainage outlets."),
          text("<strong>Lantai gudang:</strong> Tentukan kerataan jalur forklift, beban titik rak, finishing, dan lokasi sambungan sebelum menetapkan spesifikasi pelat beton.", "<strong>Warehouse floors:</strong> Set forklift flatness requirements, rack point loads, surface finish, and joint locations before specifying the concrete slab."),
        ],
      },
      paragraph(
        `Untuk Paket D, garansi pemeliharaan hingga ${packages.D.warrantyMaxMonths / 12} tahun berlaku dengan pondasi agregat sesuai rekomendasi teknis dan ketebalan struktural minimal ${packages.D.minimumStructuralThicknessCm} cm sesuai penawaran proyek. Saat membandingkan dua RAB, samakan beban desain, luas, lingkup pondasi dan drainase, serta biaya penutupan akses.`,
        `Package D carries a maintenance warranty of up to ${packages.D.warrantyMaxMonths / 12} years, subject to the recommended aggregate base and a minimum structural thickness of ${packages.D.minimumStructuralThicknessCm} cm under the project quote. Compare two estimates using the same design loads, area, base and drainage scope, and access closure costs.`,
      ),
      heading("Lihat pekerjaan sejenis sebelum meminta survei", "Review comparable projects before requesting a survey"),
      paragraph(
        `Lihat ${link(asphaltCase.path, "studi kasus akses pabrik Cikupa")} untuk contoh pengaspalan dua zona malam dan ${link(concreteCase.path, "studi kasus lantai gudang Cikarang")} untuk contoh pengecoran per segmen. Bandingkan lingkup ${link(asphaltService, "jasa pengaspalan hotmix")} dan ${link(concreteService, "jasa cor beton ready mix")}. Siapkan denah zona, beban sumbu atau jenis armada, dan jam yang tersedia untuk penutupan akses.`,
        `See the ${link(asphaltCase.path, "Cikupa factory access case study")} for phased nighttime paving and the ${link(concreteCase.path, "Cikarang warehouse floor case study")} for a segmented pour. Compare our ${link(asphaltService, "hotmix paving service")} and ${link(concreteService, "ready-mix concrete pouring service")}. Have the zone layout, axle weights or truck types, and available closure windows ready.`,
      ),
      paragraph(
        `Rujukan desain perkerasan kawasan industri dan fasilitas truk. ${link("https://www.concrete.org/Portals/0/Files/PDF/Previews/330.2R-17_preview.pdf", "Panduan ACI 330.2R")}`,
        `Industrial and trucking facility pavement design reference. ${link("https://www.concrete.org/Portals/0/Files/PDF/Previews/330.2R-17_preview.pdf", "ACI 330.2R guide")}`,
      ),
    ],
  },
  {
    ...shared,
    slug: repairSlug,
    src: "/proyek/proyek-30.webp",
    title: text("Overlay Aspal Hotmix vs Tambal Sulam: Mana yang Lebih Efisien?", "Hotmix Asphalt Overlay vs Patching: Which Is More Efficient?"),
    desc: text(
      "Bandingkan overlay Paket A dan tambal sulam Paket B dari kondisi jalan, cara kerja, tarif per m², hasil permukaan, dan garansi pemeliharaan.",
      "Compare Package A overlay and Package B patching by pavement condition, work scope, rates per m², finished surface, and maintenance warranty.",
    ),
    answer: text(
      "Jika kerusakan hanya di titik tertentu, luasnya di bawah kisaran 20–30% area, dan pondasi masih kuat, tambal sulam (Paket B) biasanya lebih efisien karena area yang dikerjakan lebih kecil. Jika retak rambut atau keausan sudah merata dan struktur masih stabil, overlay hotmix (Paket A) biasanya memberi hasil lebih awet dan mengurangi kebutuhan tambalan berulang. Kisaran luas kerusakan ini adalah patokan awal untuk survei, dan kondisi pondasi tetap menentukan metode.",
      "If damage is localized, covers less than roughly 20–30% of the area, and the base is sound, patching (Package B) is usually more efficient because it treats a smaller area. If hairline cracks or surface wear are widespread and the structure remains stable, a hotmix overlay (Package A) usually provides a longer-lasting finish and reduces repeat patching. Use the affected area as a screening rule of thumb and confirm the condition of the base during the survey.",
    ),
    surveyRequest: "asphaltSurvey",
    tags: [
      { ...text("Aspal vs Cor Beton untuk Akses Truk", "Asphalt vs Concrete for Truck Access"), slug: comparisonSlug },
      { ...text("Biaya Aspal per m²", "Asphalt Cost per m²"), slug: "biaya-aspal-per-meter" },
    ],
    body: [
      heading("Perbandingan Paket A dan Paket B", "Package A and Package B comparison"),
      {
        type: "table",
        id: "asphalt-repair-comparison",
        caption: text("Overlay hotmix dan tambal sulam aspal", "Hotmix overlay and asphalt patching"),
        columns: [text("Aspek", "Factor"), text("Overlay · Paket A", "Overlay · Package A"), text("Tambal sulam · Paket B", "Patching · Package B")],
        rows: [
          [
            text("Kondisi kerusakan", "Existing condition"),
            text("Permukaan aus atau retak halus yang meluas dengan struktur masih stabil.", "Widespread wear or hairline cracking over a stable structure."),
            text("Lubang atau kerusakan setempat, dengan lapisan di sekitar titik rusak masih stabil.", "Potholes or isolated damage surrounded by stable pavement."),
          ],
          [
            text("Cakupan area", "Treatment area"),
            text("Satu lajur atau bidang permukaan utuh sesuai batas pekerjaan.", "A full lane or continuous surface within the agreed work limits."),
            text("Titik yang dipetakan dan dibatasi hingga tepi material yang masih baik.", "Mapped repair spots cut back to sound material."),
          ],
          [
            text("Tahapan kerja", "Work sequence"),
            text("Bersihkan bidang, tangani titik rusak, aplikasikan tack coat, hampar hotmix, lalu padatkan. Atur transisi ke elevasi eksisting.", "Clean the surface, repair isolated defects, apply tack coat, place hotmix, then compact. Tie in to existing levels."),
            text("Potong batas area (cutting), bongkar bagian rusak, siapkan dasar, aplikasikan tack coat pada bidang ikatan yang sesuai, isi hotmix, lalu padatkan hingga rata dengan sekitarnya.", "Saw-cut the repair boundary, remove failed material, prepare the base, apply tack coat to appropriate bonding surfaces, then place and compact hotmix flush with the surrounding pavement."),
          ],
          [
            text("Tarif referensi", "Reference rate"),
            text(`Mulai ${price("A", "id")} per luas bidang yang dilapis.`, `From ${price("A", "en")} of resurfaced area.`),
            text(`Mulai ${price("B", "id")} per luas titik yang ditambal.`, `From ${price("B", "en")} of patched area.`),
          ],
          [
            text("Kerataan akhir", "Finished surface"),
            text("Lapisan menyambung merata di seluruh bidang. Periksa elevasi gerbang dan kemiringan ke saluran.", "Creates a consistent surface across the work area. Check gate levels and falls toward drains."),
            text("Tambalan yang dipadatkan bisa rata dengan area sekitarnya. Kondisi permukaan di luar tambalan tetap menentukan kenyamanan lintasan.", "Compacted patches can finish flush with adjoining pavement. Ride quality still depends on the surface beyond the patches."),
          ],
          [
            text("Garansi pemeliharaan", "Maintenance warranty"),
            text(`${warranty("A")} bulan sesuai ketentuan pekerjaan.`, `${warranty("A")} months under the applicable work terms.`),
            text(`${warranty("B")} bulan sesuai ketentuan pekerjaan.`, `${warranty("B")} months under the applicable work terms.`),
          ],
        ],
      },
      paragraph(
        `Bandingkan total biaya dengan mengalikan tarif dengan luas yang benar-benar dikerjakan, lalu periksa item terpisah dalam penawaran. Sebagai contoh lingkup, simulasi overlay memakai ketebalan padat ${simulations.overlay.compactedThicknessCm} cm. Ketebalan dan tarif final mengikuti survei.`,
        `Compare total cost by multiplying the rate by the actual treatment area, then check separately priced items. The overlay estimate uses a compacted thickness of ${simulations.overlay.compactedThicknessCm} cm as an example. The survey determines the final thickness and rate.`,
      ),
      heading("Risiko jika metode perbaikan keliru", "Risks of choosing the wrong repair method"),
      {
        type: "list",
        items: [
          text("<strong>Overlay di atas pondasi amblas:</strong> Pergerakan lapisan lama dapat memunculkan retak reflektif pada lapisan baru. Petakan amblas dan retak kulit buaya, telusuri sumber air, lalu evaluasi perbaikan pondasi sebelum penghamparan.", "<strong>Overlay over a settled base:</strong> Movement in the underlying pavement can lead to reflective cracking in the new layer. Map depressions and alligator cracking, trace water ingress, and assess base repairs before paving."),
          text("<strong>Tambal sulam pada permukaan yang getas merata:</strong> Kerusakan baru bisa muncul di luar tambalan. Hitung potensi kunjungan perbaikan dan penutupan jalur berulang saat membandingkan biaya perawatan.", "<strong>Patching widespread brittle pavement:</strong> New defects can appear outside the patches. Include repeat repair visits and closures in your maintenance cost comparison."),
        ],
      },
      heading("Bandingkan biaya sebelum menentukan pekerjaan", "Compare costs before selecting the repair scope"),
      paragraph(
        `Lihat ${link(asphaltService + "#paket-harga-aspal", "tabel Paket A–D")} dan ${link(asphaltService + "#simulasi-rab-aspal", "simulasi RAB overlay dan jalan baru")} di halaman jasa. Gunakan ${link("/blog/biaya-aspal-per-meter", "panduan biaya aspal per meter")} untuk menyusun perkiraan awal. Saat meminta survei, siapkan luas total, perkiraan luas rusak, foto retak atau lubang, dan jenis kendaraan yang lewat.`,
        `See the ${link(asphaltService + "#paket-harga-aspal", "Package A–D table")} and ${link(asphaltService + "#simulasi-rab-aspal", "overlay and new road estimates")} on the service page. Use the ${link("/blog/biaya-aspal-per-meter", "asphalt cost per square metre guide")} for an initial estimate. For your survey, prepare the total area, estimated damaged area, photos of cracks or potholes, and vehicle types.`,
      ),
      paragraph(
        `Rujukan teknis untuk identifikasi kerusakan dan risiko retak reflektif. ${link("https://www.fhwa.dot.gov/publications/research/infrastructure/pavements/ltpp/13092/001.cfm", "Manual kerusakan perkerasan FHWA")} dan ${link("https://www.fhwa.dot.gov/innovation/everydaycounts/edc_6/targeted_overlay_pavement.cfm", "panduan overlay FHWA")}`,
        `Technical references for pavement distress and reflective cracking. ${link("https://www.fhwa.dot.gov/publications/research/infrastructure/pavements/ltpp/13092/001.cfm", "FHWA pavement distress manual")} and ${link("https://www.fhwa.dot.gov/innovation/everydaycounts/edc_6/targeted_overlay_pavement.cfm", "FHWA overlay guidance")}`,
      ),
    ],
  },
];
