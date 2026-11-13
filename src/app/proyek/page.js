// src/app/proyek/page.js
import Projects from "../../components/Projects";

export const metadata = {
  title: "Portofolio Proyek Pengaspalan & Infrastruktur",
  description:
    "Dokumentasi proyek nyata PT Tri Abadi Makmur di Jabodetabek: pengaspalan jalan hotmix, pemasangan paving block, kanstin & cor beton area komersial maupun jalan raya.",
  alternates: {
    canonical: "/proyek",
  },
  openGraph: {
    title: "Portofolio Proyek Pengaspalan & Infrastruktur | PT Tri Abadi Makmur",
    description:
      "Dokumentasi proyek nyata PT Tri Abadi Makmur di Jabodetabek: pengaspalan jalan hotmix, pemasangan paving block, kanstin & cor beton.",
    url: "https://spesialisaspal.com/proyek",
  },
};

export default function ProyekPage() {
  return <Projects />;
}