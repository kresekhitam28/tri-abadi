# Optimasi SEO lokal · 25 November 2026

Dasar prioritas adalah audit 26 Oktober–22 November 2026. Halaman pengaspalan mendapat 43 impresi Google, posisi rata-rata 12,19 dan 0 klik. Kueri “jasa aspal murah” mendapat 15 impresi, posisi 12,8. GA4 mencatat 83 sesi Organic Search dan 9 event klik WhatsApp. Sampel ini mendukung uji yang terfokus. Dampak terhadap permintaan survei baru dapat dinilai setelah rilis dan rekonsiliasi dengan sales.

## Perubahan dan rollback per paket

| Paket | File | Alasan dan perubahan | Risiko dan cara membatalkan |
|---|---|---|---|
| A | `public/_headers` | Persembit cache panjang dari `/proyek/*` ke `/proyek/*.jpg`. WebP termasuk thumbnail sudah dicakup aturan ekstensi global. | Cache browser lama dapat bertahan hingga kedaluwarsa. Mengembalikan pola lama akan mengembalikan masalah HTML immutable. |
| C | `src/components/CaseStudyPage.jsx` | Tambah tautan kontekstual dari dua studi kasus ke lingkup dan harga layanan induk menggunakan `study.servicePath`. Halaman wilayah, kontak survei dan panduan harga sudah memiliki tautan relevan. | Risiko tautan salah bila data kasus baru keliru. Hapus hanya elemen Link untuk layanan induk. |
| B | `src/components/Hero.jsx`, `src/app/layanan/infrastruktur/pengaspalan/page.js` | Lengkapi label area bahasa Indonesia yang sebelumnya kosong. Deskripsi halaman jasa membantu pembeli membandingkan paket dan mengenali syarat overlay. Nilai harga tetap berasal dari konfigurasi. | Google dapat memilih cuplikan lain. Hapus label tambahan dan pulihkan deskripsi lama bila diperlukan. |
| D | `src/data/articles.js` | Perbarui satu artikel, `aspal-jalan-murah`. Ganti anjuran ketebalan seragam dengan evaluasi dasar jalan, kendaraan, persiapan, dan perbandingan penawaran. Perbarui tanggal modifikasi. | Perubahan teks dapat memengaruhi kueri. Untuk rollback, pulihkan dua butir panduan dalam kedua bahasa serta tanggal modifikasi artikel. |
| E | `src/components/About.jsx` | Beri akses langsung dari profil perusahaan ke dokumentasi dan studi kasus yang sudah dipublikasikan. | Kualitas bukti tetap bergantung pada arsip perusahaan. Hapus tautan baru dan import Link bila perlu. |
| G | `src/components/Kontak.jsx` | Jelaskan tujuan konsultasi dan informasi yang diperlukan untuk estimasi lewat judul serta pengantar Indonesia dan Inggris. | Pengaruh pada rasio prospek perlu data sales. Pulihkan empat string dalam `draftCopy`. |
| F | `src/lib/blog.js`, `src/app/blog/[slug]/page.js` | Batasi properti artikel yang dikirim ke komponen klien. Metadata, schema publik dan perhitungan artikel terkait tetap menggunakan data lengkap di server. | Jika template memakai field baru, tambahkan field tersebut ke `getArticleDetail`. Untuk rollback, teruskan kembali objek artikel lengkap dan lepaskan fungsi serta import terkait. |

## Validasi

- Setiap paket dibangun berurutan dengan `npm.cmd run build`, termasuk TypeScript, static export dan normalisasi segmen Windows. Build final menghasilkan 70 URL sitemap.
- Pada emulator Wrangler lokal, kedua studi kasus dan sampel payload navigasi mengirim 200 dengan `public, max-age=0, must-revalidate`. JPG, WebP, thumbnail dan sampel JavaScript build mengirim `max-age=31536000, immutable`. Varian slash dan .html Cikupa, redirect artikel lama, robots, sitemap, dan 404 diuji.
- Sejak Paket C, setiap build diperiksa untuk satu H1, canonical yang sesuai, penanda container GTM, dan tautan WA pada 70 URL. Kedua studi kasus mempunyai tautan induk dalam HTML awal.
- Paket F mengurangi jumlah ukuran HTML awal 26 artikel dari 3.872.031 menjadi 3.849.912 byte sebelum kompresi. Pada artikel harga kanstin, 238.135 menjadi 233.289 byte, atau 35.415 menjadi 34.523 byte dengan gzip lokal. Hash markup artikel beserta script JSON-LD identik untuk 26 artikel sebelum dan sesudah Paket F. Ini pengukuran payload lokal, belum pengukuran CWV lapangan.
- Edge headless pada viewport ponsel 390 × 844 menguji galeri → studi kasus, tombol kembali, studi kasus kedua, halaman kontak dan artikel dua bahasa. Halaman kontak lolos cek lebar viewport. Tidak ada exception JavaScript dalam alur tersebut. Klik CTA WA dan submit form valid pada localhost masing-masing menambahkan satu event `klik_whatsapp`. Pembukaan tujuan eksternal dicegah selama simulasi.
- Lint seluruh repo melaporkan 2 error dan 19 warning. Kedua error berada pada efek reset gambar di `BlogCard.jsx` dan `BlogDetail.jsx`, di luar diff paket. Uji di emulator tidak mencakup aturan akun Cloudflare dan tag produksi.

## Data untuk evaluasi berikutnya

1. Ekspor GSC Page Indexing, Sitemaps dan Crawl Stats. Dari URL Inspection, ambil status indeks, canonical pilihan Google, tanggal crawl, page fetch dan hasil live test untuk homepage, jasa aspal, Tangerang–Cikupa, studi kasus Cikupa dan panduan biaya.
2. Berikan tanggal deploy migrasi, sitemap atau landing page Vite lama. Jika fetch Google gagal, cocokkan URL dan waktu dengan Security Events Cloudflare.
3. Verifikasi nama legal, alamat, peran nomor kontak serta dokumentasi dan izin publikasi proyek sebelum perubahan identitas atau klaim baru.
4. Ambil data lapangan mobile/desktop dari GSC Core Web Vitals atau PageSpeed. Catat prospek organik unik, survei dan penawaran per minggu di sistem sales. Klik WhatsApp adalah indikator minat awal.
5. Setelah rilis yang disetujui, catat tanggal rilis dan bandingkan dua periode 28 hari untuk kelompok jasa, panduan biaya, studi kasus dan wilayah. Tinjau posisi serta CTR untuk kueri yang sama. Nilai perubahan bisnis lewat jumlah survei dan penawaran.

## Audit final sebelum deployment

**READY TO DEPLOY untuk kandidat lokal** di atas basis `4d8b821`. Build ID yang diuji adalah `9PW58NfLFmeOcNTG-OjcL`. Persetujuan commit, push, dan rilis produksi masih diperlukan.

- Review membandingkan working tree dengan HEAD dan daftar file yang disetujui sebelumnya. Ada 11 file terlacak berubah dan laporan ini sebagai satu file baru. Tidak ada penghapusan atau staging. Branch audit lama dan artefak staging lama tidak dipakai.
- **Perbaikan lint.** Di `src/components/BlogCard.jsx` dan `src/components/BlogDetail.jsx`, state fallback kini dimiliki komponen gambar dengan key berdasarkan sumber. Pergantian sumber mereset fallback tanpa memanggil setter dari effect. Uji kegagalan gambar lokal pada kartu homepage dan sampul artikel lulus. Artikel berikutnya kembali menggunakan sampul normal.
- **Koreksi saat crawl.** Pada `src/data/articles.js`, tautan K3 yang berakhir 404 diganti dengan tautan ke katalog layanan. Gambar briefing yang tidak tersedia diganti dengan petunjuk briefing, dan gambar grass block yang tidak tersedia memakai aset Fullpave yang sudah ada dengan caption deskriptif.
- **Lint dan build.** Lint keluar dengan status 0, 0 error, 19 warning. Sebanyak 18 warning menyangkut elemen img di source. Satu warning navigasi berasal dari chunk staging lama di direktori lokal .wrangler. Build produksi terbaru lulus TypeScript dan static export.
- **Preview Cloudflare Pages lokal.** Seluruh 70 URL sitemap mengembalikan 200, canonical sesuai, title dan deskripsi unik, satu H1, serta dapat dijangkau dari homepage. Seluruh JSON-LD dapat diparse. Tidak terdeteksi noindex melalui meta robots atau header. Referensi lokal img/script yang diperiksa tersedia. Ke-18 redirect menuju target yang benar. URL yang tidak ada menghasilkan 404. Hierarki H3 sebelum H2 pada halaman dozer sudah ada pada baseline.
- **Browser dan tracking.** Delapan halaman diuji pada 390 × 844 dan 1440 × 900. H1 serta tautan WA tersedia dan halaman tidak meluber horizontal. Di kedua viewport, klik CTA menambah satu event, form valid menambah satu lagi dengan tujuan WA dan teks yang benar, sedangkan form kosong dan share tanpa penerima menambah nol. Pengiriman eksternal dicegah. Container source tetap GTM-5D8KPG65. Pemeriksaan tidak menguji konfigurasi akun produksi.
- **Risiko.** Cache lama pada browser pengunjung dapat bertahan. WAF, aturan edge akun, dan canonical pilihan Google memerlukan verifikasi produksi. Baseline konversi berkualitas serta CWV lapangan masih diperlukan untuk menilai hasil bisnis.

### Urutan rilis setelah persetujuan

1. Periksa HEAD dan status kembali, stage hanya 11 file kandidat dan laporan ini, lalu review diff staged sebelum commit. Jika branch tujuan berubah sejak pengujian, rekonsiliasi tanpa menimpa pekerjaan pengguna dan bangun ulang.
2. Verifikasi proyek Cloudflare Pages yang melayani spesialisaspal.com, mode integrasi, branch produksi, build command dan direktori output out. Catat ID deployment produksi yang sehat. Push ke branch dengan auto-deploy dapat langsung memublikasikan website, sehingga otorisasi produksi harus sudah tersedia sebelum push tersebut.
3. Gunakan alur rilis proyek Pages yang sudah berlaku. Pada integrasi Git, cocokkan commit deployment dengan commit yang disetujui. Pada Direct Upload, unggah hanya out dari build terverifikasi ke proyek dan branch yang telah dikonfirmasi. Jangan menjalankan kedua mekanisme sekaligus.
4. Bila HTML utama gagal, CTA rusak, atau muncul lonjakan 404/5xx, kembalikan deployment Pages sebelumnya yang tercatat sehat. Periksa ulang homepage, jasa, kontak, robots, sitemap, redirect dan cache. Selaraskan source melalui revert commit terpisah sesuai persetujuan. Rollback produksi akan mengembalikan perilaku cache HTML proyek sebelumnya.

### Monitoring setelah rilis

| Waktu dari rilis | Pemeriksaan dan keputusan |
|---|---|
| H+1 | Catat commit, deployment, waktu WIB dan baseline. Smoke test host produksi, redirect, cache gambar/HTML, kontak, serta pembacaan sitemap. Pantau event alami tanpa mengirim lead uji ke Ads. |
| H+7 | Tinjau Crawl Stats, Page Indexing, 403/429/5xx serta URL Inspection untuk jasa pengaspalan, Tangerang–Cikupa dan studi kasus. Korelasikan kegagalan fetch dengan log Cloudflare. |
| H+14 | Tinjau pasangan kueri–URL untuk jasa, metode dan biaya, dipisahkan menurut perangkat. Periksa klik WA organik, chat baru, survei, dan kualitas permintaan. Perlakukan tren awal sebagai indikasi. |
| H+30 | Bandingkan 28 hari lengkap dengan baseline setara. Ukur klik, impresi, CTR, posisi keyword komersial, sesi non-paid per kanal, survei dan penawaran. Catat perubahan aktivitas iklan pada periode pembanding. |
| H+60 | Bandingkan dua jendela 28 hari. Periksa lead berkualitas per landing page dan wilayah, canonical, serta CWV lapangan. Pilih satu perbaikan berdasarkan titik kehilangan prospek yang terlihat. |
| H+90 | Evaluasi proyek, penawaran dan proporsi prospek organik terhadap paid dengan jumlah absolut. Putuskan prioritas wilayah dan studi kasus berikut berdasarkan bukti proyek serta permintaan nyata. |
