// src/app/layanan/infrastruktur/pengaspalan/page.js
import Pengaspalan from "../../../../components/Pengaspalan";

export const metadata = {
  title: "Jasa Pengaspalan Jalan & Aspal Hotmix Bergaransi",
  description:
    "Kontraktor jasa pengaspalan jalan & aspal hotmix (mulai Rp 75rb/m²) untuk pabrik, gudang, perumahan & area parkir di Jabodetabek, Banten & Jawa Barat. Survei gratis!",
  alternates: {
    canonical: "/layanan/infrastruktur/pengaspalan",
  },
  openGraph: {
    title: "Jasa Pengaspalan Jalan & Aspal Hotmix Bergaransi | PT Tri Abadi Makmur",
    description:
      "Kontraktor jasa pengaspalan jalan & aspal hotmix (mulai Rp 75rb/m²) untuk pabrik, gudang, perumahan & area parkir di Jabodetabek, Banten & Jawa Barat. Survei gratis!",
    url: "https://spesialisaspal.com/layanan/infrastruktur/pengaspalan",
  },
};

export default function PengaspalanPage() {
  return <Pengaspalan />;
}