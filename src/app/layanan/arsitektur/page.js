// src/app/layanan/arsitektur/page.js
import JasaArsitektur from "../../../components/JasaArsitektur";

export const metadata = {
  title: "Jasa Arsitektur & Desain Rumah Tangerang & Jabodetabek",
  description:
    "Jasa arsitektur profesional untuk desain rumah tinggal, komersial, dan renovasi. Konsultasi desain 3D, gambar kerja, dan RAB di Tangerang & Jabodetabek.",
  alternates: {
    canonical: "/layanan/arsitektur",
  },
};

export default function ArsitekturPage() {
  return <JasaArsitektur />;
}