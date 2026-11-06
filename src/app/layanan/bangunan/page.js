// src/app/layanan/bangunan/page.js
import KonstruksiBangunan from "../../../components/KonstruksiBangunan";

export const metadata = {
  title: "Jasa Konstruksi Bangunan Tangerang & Jabodetabek",
  description:
    "Jasa konstruksi bangunan untuk rumah tinggal, komersial, dan renovasi di Tangerang & Jabodetabek. Struktur kokoh, pengerjaan rapi, tepat waktu, dan bergaransi.",
  alternates: {
    canonical: "/layanan/bangunan",
  },
};

export default function KonstruksiBangunanPage() {
  return <KonstruksiBangunan />;
}