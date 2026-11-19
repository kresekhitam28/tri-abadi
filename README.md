# SpesialisAspal.com

Website PT Tri Abadi Makmur menggunakan Next.js App Router, Tailwind CSS, dan static export. Kode route ada di `src/app`. Hasil build untuk Cloudflare ada di `out/`.

## Pengembangan dan verifikasi

Gunakan Node.js LTS 22 atau 24. Jalankan perintah dari root proyek.

```sh
npm ci
npm run dev
```

Next.js dev server biasanya berjalan di `http://localhost:3000`. Untuk menguji ekspor statis dan aturan Cloudflare secara lokal:

```sh
npm run lint
npm run build
npm start -- --port 8787
```

`npm start` menjalankan Wrangler lokal di `http://localhost:8787` pada contoh ini. `public/_redirects` dan `public/_headers` ikut disalin ke `out/`. `NEXT_PUBLIC_SITE_URL` opsional, dengan default `https://spesialisaspal.com` sebagai origin untuk canonical, metadata, dan sitemap.

## Foto proyek

Untuk membuat varian gambar dan thumbnail dari satu foto WebP yang sudah ada:

```sh
node scripts/optimize-projects.js proyek-92.webp
```

Perintah tanpa nama file memproses semua foto asli WebP di `public/proyek`. Skrip hanya menulis file varian dan thumbnail.
