// src/app/page.js
import Hero from "../components/Hero";
import Services from "../components/Services";
import ProjectsSection from "../components/ProjectsSection";
import Clients from "../components/Clients";
import BlogPreview from "../components/BlogPreview";

export default function Home() {
  return (
    <main className="flex-1 pt-[76px]">
      <Hero />
      <Services />
      <ProjectsSection />
      <BlogPreview />
      <Clients />
    </main>
  );
}