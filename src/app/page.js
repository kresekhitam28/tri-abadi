// src/app/page.js
import Hero from "../components/Hero";
import Services from "../components/Services";
import ProjectsSection from "../components/ProjectsSection";
import Clients from "../components/Clients";
import BlogPreview from "../components/BlogPreview";
import { asphaltPackagePrices, formatAsphaltPrice } from "../data/asphaltPricing";
import { projects } from "../data/projects";
import { createPageMetadata } from "../lib/metadata";
import { getProjectImageFiles } from "../lib/projectImages";

const featuredProjects = [27, 25, 30].map((id) => projects.find((project) => project.id === id));

export const metadata = createPageMetadata({
  path: "/",
  title: "Jasa Pengaspalan Jalan Hotmix & Kontraktor Aspal",
  description:
    `Kontraktor aspal hotmix, paving, dan cor beton di Jabodetabek, Banten & Jawa Barat. Paket overlay mulai ${formatAsphaltPrice(asphaltPackagePrices.A)}/m². Survei lokasi gratis.`,
  image: "/proyek/proyek-30.webp",
});

export default function Home() {
  return (
    <div className="pt-[72px] sm:pt-[76px]">
      <Hero />
      <ProjectsSection featured={featuredProjects} {...getProjectImageFiles(featuredProjects)} />
      <Clients />
      <Services />
      <BlogPreview />
    </div>
  );
}
