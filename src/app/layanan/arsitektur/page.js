// src/app/layanan/arsitektur/page.js
import JasaArsitektur from "../../../components/JasaArsitektur";
import { createPageMetadata } from "../../../lib/metadata";

export const metadata = createPageMetadata({
  path: "/layanan/arsitektur",
  title: "Jasa Arsitektur & Desain Rumah Tangerang & Jabodetabek",
  description:
    "Jasa arsitektur profesional untuk desain rumah tinggal, komersial, dan renovasi. Konsultasi desain 3D, gambar kerja, dan RAB di Tangerang & Jabodetabek.",
  image: "/proyek/proyek-45.webp",
});

export default function ArsitekturPage() {
  return <JasaArsitektur />;
}