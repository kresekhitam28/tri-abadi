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
import { getArticleSummaries } from "../lib/blog";

const featuredProjects = [27, 25, 30, 1, 21, 59].map((id) => projects.find((project) => project.id === id));
const previewArticles = getArticleSummaries([
  "aspal-jalan-murah",
  "pemasangan-kansteen",
  "pemasangan-paving-block",
  "jasa-pengecoran-beton",
  "pemasangan-tiang-pancang",
  "pemasangan-pagar-panel",
]);

export const metadata = createPageMetadata({
  path: "/",
  title: "Jasa Pengaspalan Jalan Hotmix & Kontraktor Aspal",
  description:
    `Kontraktor aspal hotmix, paving, dan cor beton di Jabodetabek, Banten & Jawa Barat. Paket overlay mulai ${formatAsphaltPrice(asphaltPackagePrices.A)}/m². Survei lokasi gratis.`,
  image: "/proyek/proyek-30.webp",
});

export default async function Home() {
  const [imageFiles, articleImageFiles] = await Promise.all([
    getProjectImageFiles(featuredProjects),
    getProjectImageFiles(previewArticles),
  ]);
  return (
    <div className="pt-[72px] sm:pt-[76px]">
      <link
        rel="preload"
        as="image"
        href="/proyek/proyek-30.webp"
        imageSrcSet="/proyek/proyek-30-320.webp 320w, /proyek/proyek-30-640.webp 640w, /proyek/proyek-30.webp 800w"
        imageSizes="100vw"
        fetchPriority="high"
      />
      <Hero />
      <ProjectsSection featured={featuredProjects} {...imageFiles} />
      <Clients />
      <Services />
      <BlogPreview items={previewArticles} variants={articleImageFiles.variants} />
    </div>
  );
}
