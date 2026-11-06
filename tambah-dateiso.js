// tambah-dateiso.js
// Script untuk menambahkan dateISO ke articles.js
// Jalankan: node tambah-dateiso.js

const fs = require('fs');
const path = require('path');

const ARTICLES_PATH = path.join(__dirname, 'src', 'data', 'articles.js');

// Tabel konversi: slug → dateISO
const dateISOBySlug = {
  'aspal-jalan-murah': '2026-07-21',
  'pekerjaan-aspal-hotmix': '2026-07-21',
  'distributor-aspal': '2026-07-21',
  'perbaikan-jalan-aspal': '2026-07-21',
  'pemasangan-kansteen': '2026-07-21',
  'aspal-jalan-murah-2': '2026-07-21',
  'pekerjaan-aspal-hotmix-2': '2026-07-21',
  'distributor-aspal-2': '2026-07-21',
  'perbaikan-jalan-aspal-2': '2026-07-21',
  'pemasangan-paving-block': '2026-07-21',
  'pengaspalan-jalan-perumahan': '2026-07-21',
  'hotmix-untuk-jalan-perkantoran': '2026-07-21',
  'jasa-pengecoran-beton': '2026-09-28',
  'biaya-aspal-per-meter': '2026-09-28',
  'pemasangan-grass-block': '2026-10-15',
  'pemasangan-pagar-panel': '2026-10-18',
  'pemasangan-tiang-pancang': '2026-10-20',
  'lapisan-aspal-hotmix': '2026-10-25',
  'harga-aspal-hotmix': '2026-11-01',
};

function main() {
  if (!fs.existsSync(ARTICLES_PATH)) {
    console.error(`❌ File tidak ditemukan: ${ARTICLES_PATH}`);
    console.error('   Pastikan path-nya benar. Cek apakah articles.js ada di src/data/');
    process.exit(1);
  }

  let content = fs.readFileSync(ARTICLES_PATH, 'utf8');
  let updated = 0;
  let skipped = 0;

  // Untuk setiap artikel, cari pola:
  //   slug: "nama-slug",
  //   ...
  //   date: { id: "...", en: "..." },
  //
  // Lalu tambahkan dateISO setelah date.
  for (const [slug, iso] of Object.entries(dateISOBySlug)) {
    // Cek apakah sudah ada dateISO untuk slug ini (untuk idempotensi)
    const alreadyHasISO = new RegExp(
      `slug:\\s*["']${slug}["'][\\s\\S]*?dateISO:`
    ).test(content);

    if (alreadyHasISO) {
      console.log(`⏭️  Skip (sudah ada dateISO): ${slug}`);
      skipped++;
      continue;
    }

    // Regex: cari blok slug ini, lalu cari `date: { ... },` setelahnya
    // Kita pakai regex non-greedy dan batasi hingga 2000 karakter setelah slug
    const regex = new RegExp(
      `(slug:\\s*["']${slug}["'][\\s\\S]{0,2000}?date:\\s*\\{[^}]*\\},)`,
      'm'
    );

    const match = content.match(regex);
    if (!match) {
      console.warn(`⚠️  Tidak ketemu pola date untuk: ${slug}`);
      continue;
    }

    const replacement = `${match[1]}\n    dateISO: "${iso}",`;
    content = content.replace(regex, replacement);
    console.log(`✅ Ditambahkan dateISO="${iso}" → ${slug}`);
    updated++;
  }

  if (updated === 0) {
    console.log('\nℹ️  Tidak ada perubahan. Semua artikel mungkin sudah punya dateISO.');
  } else {
    // Backup dulu
    const backupPath = ARTICLES_PATH + '.backup';
    if (!fs.existsSync(backupPath)) {
      fs.copyFileSync(ARTICLES_PATH, backupPath);
      console.log(`\n💾 Backup dibuat: ${backupPath}`);
    }

    fs.writeFileSync(ARTICLES_PATH, content, 'utf8');
    console.log(`\n✅ Selesai. ${updated} artikel diupdate, ${skipped} dilewati.`);
    console.log('   File: src/data/articles.js');
  }
}

main();