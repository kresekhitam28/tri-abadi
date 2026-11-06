// src/app/layanan/infrastruktur/pengaspalan/page.js
import Pengaspalan from "../../../../components/Pengaspalan";

export const metadata = {
  title: "Jasa Pengaspalan Murah & Hotmix Tangerang & Jabodetabek | Tri Abadi Makmur",
  description:
    "Jasa pengaspalan murah & hotmix untuk perumahan, pabrik, gudang di Tangerang & Jabodetabek. Survei gratis, garansi 2 tahun, harga transparan. Konsultasi via WhatsApp.",
  alternates: {
    canonical: "/layanan/infrastruktur/pengaspalan",
  },
};

export default function PengaspalanPage() {
  return <Pengaspalan />;
}