// src/app/tentang-kami/page.js
import About from "../../components/About";

export const metadata = {
  title: "Tentang Kami: Kontraktor Aspal & Infrastruktur Terpercaya",
  description:
    "Mengenal lebih dekat PT Tri Abadi Makmur, kontraktor pengaspalan jalan & infrastruktur berpengalaman di Jabodetabek, Banten & Jawa Barat. Didukung alat berat modern & bergaransi.",
  alternates: {
    canonical: "/tentang-kami",
  },
  openGraph: {
    title: "Tentang Kami: Kontraktor Aspal & Infrastruktur Terpercaya | PT Tri Abadi Makmur",
    description:
      "Mengenal lebih dekat PT Tri Abadi Makmur, kontraktor pengaspalan jalan & infrastruktur berpengalaman di Jabodetabek, Banten & Jawa Barat. Didukung alat berat modern.",
    url: "https://spesialisaspal.com/tentang-kami",
  },
};

export default function TentangKamiPage() {
  return <About />;
}