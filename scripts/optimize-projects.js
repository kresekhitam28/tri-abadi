// scripts/optimize-projects.js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SRC = path.join('public', 'proyek');
const THUMBS = path.join(SRC, 'thumbs');

async function optimizeProjects(requested = process.argv.slice(2)) {
  const originals = fs.readdirSync(SRC).filter((file) =>
    file.endsWith('.webp') && !file.includes('-min') && !/-(320|640|1024)\.webp$/.test(file),
  );
  const files = requested.length ? [...new Set(requested)] : originals;
  const unknown = files.filter((file) => !originals.includes(file));
  if (unknown.length) {
    throw new Error(`Foto asli tidak ditemukan: ${unknown.join(', ')}`);
  }
  if (files.length === 0) throw new Error('Tidak ada foto proyek WebP untuk diproses.');

  fs.mkdirSync(THUMBS, { recursive: true });
  for (const file of files) {
    const srcPath = path.join(SRC, file);
    const base = path.basename(file, '.webp');
    const img = sharp(srcPath);
    const meta = await img.metadata();

    // Varian 1024w (untuk lightbox max-w-4xl = 896px)
    await sharp(srcPath).resize({ width: 1024, withoutEnlargement: true })
      .webp({ quality: 72 }).toFile(path.join(SRC, `${base}-1024.webp`));

    // Varian 640w (untuk kartu grid span-2)
    await sharp(srcPath).resize({ width: 640, withoutEnlargement: true })
      .webp({ quality: 70 }).toFile(path.join(SRC, `${base}-640.webp`));

    // Varian 320w (untuk kartu kecil mobile)
    await sharp(srcPath).resize({ width: 320, withoutEnlargement: true })
      .webp({ quality: 68 }).toFile(path.join(SRC, `${base}-320.webp`));

    // Thumbnail 112×112 untuk strip lightbox (tampil 56-84 px, 2x retina)
    await sharp(srcPath).resize(112, 112, { fit: 'cover' })
      .webp({ quality: 60 }).toFile(path.join(THUMBS, file));

    console.log(`✅ ${file} (asli ${meta.width}×${meta.height})`);
  }
  console.log('Selesai.');
}

optimizeProjects().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
