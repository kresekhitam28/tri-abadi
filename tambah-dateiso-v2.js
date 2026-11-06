// tambah-dateiso-v2.js
// Script perbaikan: hanya menambahkan dateISO ke artikel utama (bukan tags)
// Jalankan: node tambah-dateiso-v2.js

const fs = require('fs');
const path = require('path');

const ARTICLES_PATH = path.join(__dirname, 'src', 'data', 'articles.js');

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
    process.exit(1);
  }

  let content = fs.readFileSync(ARTICLES_PATH, 'utf8');
  let updated = 0;
  let alreadyHad = 0;
  let notFound = 0;

  for (const [slug, iso] of Object.entries(dateISOBySlug)) {
    // Cari slug UTAMA: slug yang diikuti src: dalam jarak dekat (max 300 char)
    // Ini membedakan slug artikel utama dari slug di dalam tags[]
    const mainSlugRegex = new RegExp(
      `(slug:\\s*["']${slug}["']\\s*,[\\s\\S]{0,300}?src:\\s*["'][^"']+["']\\s*,)`,
      'm'
    );

    const mainSlugMatch = content.match(mainSlugRegex);
    if (!mainSlugMatch) {
      console.warn(`⚠️  Tidak ketemu slug UTAMA untuk: ${slug}`);
      notFound++;
      continue;
    }

    // Cek apakah dateISO sudah ada DI DALAM blok artikel ini
    // Caranya: cari dari posisi mainSlugMatch sampai 600 char setelahnya,
    // apakah ada dateISO:
    const startPos = content.indexOf(mainSlugMatch[1]);
    const blockAfterSlug = content.substring(startPos, startPos + 800);
    if (blockAfterSlug.includes('dateISO:')) {
      console.log(`⏭️  Skip (sudah ada dateISO di artikel ini): ${slug}`);
      alreadyHad++;
      continue;
    }

    // Cari `date: { ... },` di blok artikel ini, lalu tambahkan dateISO setelahnya
    const dateRegex = new RegExp(
      `(slug:\\s*["']${slug}["']\\s*,[\\s\\S]{0,300}?src:\\s*["'][^"']+["']\\s*,[\\s\\S]{0,500}?date:\\s*\\{[^}]*\\},)`,
      'm'
    );

    const dateMatch = content.match(dateRegex);
    if (!dateMatch) {
      console.warn(`⚠️  Tidak ketemu pola date untuk: ${slug}`);
      notFound++;
      continue;
    }

    const replacement = `${dateMatch[1]}\n    dateISO: "${iso}",`;
    content = content.replace(dateMatch[1], replacement);
    console.log(`✅ Ditambahkan dateISO="${iso}" → ${slug}`);
    updated++;
  }

  if (updated > 0) {
    const backupPath = ARTICLES_PATH + '.backup-v2';
    fs.copyFileSync(ARTICLES_PATH, backupPath);
    console.log(`\n💾 Backup: ${backupPath}`);
    fs.writeFileSync(ARTICLES_PATH, content, 'utf8');
  }

  console.log(`\n📊 Ringkasan:`);
  console.log(`   ✅ Ditambahkan: ${updated}`);
  console.log(`   ⏭️  Sudah ada : ${alreadyHad}`);
  console.log(`   ⚠️  Tidak ketemu: ${notFound}`);
  console.log(`   📝 Total artikel: ${Object.keys(dateISOBySlug).length}`);
}

main();