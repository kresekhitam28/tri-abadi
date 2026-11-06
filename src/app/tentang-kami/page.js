// src/app/tentang-kami/page.js
import About from "../../components/About";

export const metadata = {
  title: "Tentang PT Tri Abadi Makmur: Kontraktor Aspal Berpengalaman",
  description:
    "PT Tri Abadi Makmur adalah kontraktor pengaspalan dan infrastruktur berpengalaman di Tangerang & Jabodetabek. Didukung tim profesional & alat berat modern. Lihat profil kami.",
  alternates: {
    canonical: "/tentang-kami",
  },
};

export default function TentangKamiPage() {
  return <About />;
}