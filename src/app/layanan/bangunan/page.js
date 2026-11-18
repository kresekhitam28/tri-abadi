// src/app/layanan/bangunan/page.js
import KonstruksiBangunan from "../../../components/KonstruksiBangunan";
import { createPageMetadata } from "../../../lib/metadata";

export const metadata = createPageMetadata({
  path: "/layanan/bangunan",
  title: "Jasa Kontraktor Konstruksi Bangunan & Renovasi",
  description:
    "Jasa kontraktor konstruksi bangunan rumah tinggal, ruko, gudang & renovasi di Jabodetabek, Banten & Jawa Barat. Struktur kokoh, RAB transparan & bergaransi.",
  image: "/proyek/proyek-43.webp",
});

export default function KonstruksiBangunanPage() {
  return <KonstruksiBangunan />;
}