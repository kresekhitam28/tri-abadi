// src/app/layanan/infrastruktur/pengaspalan/page.js
import Pengaspalan from "../../../../components/Pengaspalan";
import { createPageMetadata } from "../../../../lib/metadata";

export const metadata = createPageMetadata({
  path: "/layanan/infrastruktur/pengaspalan",
  title: "Jasa Pengaspalan Jalan & Aspal Hotmix Bergaransi",
  description:
    "Kontraktor jasa pengaspalan jalan & aspal hotmix (mulai Rp 75rb/m²) untuk pabrik, gudang, perumahan & area parkir di Jabodetabek, Banten & Jawa Barat. Survei gratis!",
  image: "/proyek/proyek-1.webp",
});

export default function PengaspalanPage() {
  return <Pengaspalan />;
}