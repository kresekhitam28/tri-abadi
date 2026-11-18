// src/app/proyek/page.js
import Projects from "../../components/Projects";
import { projects } from "../../data/projects";
import { createPageMetadata } from "../../lib/metadata";
import { getProjectImageFiles } from "../../lib/projectImages";

export const metadata = createPageMetadata({
  path: "/proyek",
  title: "Portofolio Proyek Pengaspalan & Infrastruktur",
  description:
    "Dokumentasi proyek nyata PT Tri Abadi Makmur di Jabodetabek: pengaspalan jalan hotmix, pemasangan paving block, kanstin & cor beton area komersial maupun jalan raya.",
  image: "/proyek/proyek-1.webp",
  socialDescription:
    "Dokumentasi proyek nyata PT Tri Abadi Makmur di Jabodetabek: pengaspalan jalan hotmix, pemasangan paving block, kanstin & cor beton.",
});

export default function ProyekPage() {
  return <Projects {...getProjectImageFiles(projects)} />;
}
