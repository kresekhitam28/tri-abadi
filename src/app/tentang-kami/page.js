// src/app/tentang-kami/page.js
import About from "../../components/About";
import { createPageMetadata } from "../../lib/metadata";

export const metadata = createPageMetadata({
  path: "/tentang-kami",
  title: "Tentang Kami: Kontraktor Aspal & Infrastruktur Terpercaya",
  description:
    "Mengenal lebih dekat PT Tri Abadi Makmur, kontraktor pengaspalan jalan & infrastruktur berpengalaman di Jabodetabek, Banten & Jawa Barat. Didukung alat berat modern & bergaransi.",
  image: "/proyek/proyek-50.webp",
  socialDescription:
    "Mengenal lebih dekat PT Tri Abadi Makmur, kontraktor pengaspalan jalan & infrastruktur berpengalaman di Jabodetabek, Banten & Jawa Barat. Didukung alat berat modern.",
});

export default function TentangKamiPage() {
  return <About />;
}