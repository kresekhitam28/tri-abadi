// src/app/layanan/bangunan/page.js
import KonstruksiBangunan from "../../../components/KonstruksiBangunan";

export const metadata = {
  title: "Jasa Kontraktor Konstruksi Bangunan & Renovasi",
  description:
    "Jasa kontraktor konstruksi bangunan rumah tinggal, ruko, gudang & renovasi di Jabodetabek, Banten & Jawa Barat. Struktur kokoh, RAB transparan & bergaransi.",
  alternates: {
    canonical: "/layanan/bangunan",
  },
  openGraph: {
    title: "Jasa Kontraktor Konstruksi Bangunan & Renovasi | PT Tri Abadi Makmur",
    description:
      "Jasa kontraktor konstruksi bangunan rumah tinggal, ruko, gudang & renovasi di Jabodetabek, Banten & Jawa Barat. Struktur kokoh, RAB transparan & bergaransi.",
    url: "https://spesialisaspal.com/layanan/bangunan",
  },
};

export default function KonstruksiBangunanPage() {
  return <KonstruksiBangunan />;
}