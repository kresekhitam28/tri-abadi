"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useLang } from "../context/LanguageContext";
import ProjectCard from "./ProjectCard";
import ProjectLightbox from "./ProjectLightbox";

const content = {
  id: {
    eyebrow: "Dokumentasi Pekerjaan",
    title: "Portofolio Proyek Kami",
    description: "Jelajahi dokumentasi berbagai proyek konstruksi dan infrastruktur yang telah kami kerjakan, mulai dari pengaspalan jalan, pemasangan paving block, hingga pengecoran beton.",
    viewAll: "Lihat Semua Proyek",
    viewPhoto: "Lihat Foto",
  },
  en: {
    eyebrow: "Project Documentation",
    title: "Our Project Portfolio",
    description: "Explore our completed construction and infrastructure projects, from asphalt road paving and paving block installation to concrete pouring.",
    viewAll: "View All Projects",
    viewPhoto: "View Photo",
  },
};

export default function ProjectsSection({ featured, variants, thumbnails }) {
  const { lang } = useLang();
  const t = content[lang];
  const [selectedIndex, setSelectedIndex] = useState(null);
  const openerRef = useRef(null);

  return (
    <section id="proyek-unggulan" aria-labelledby="featured-title" className="scroll-mt-[76px] bg-slate-50 pb-8 pt-11 sm:pb-11 sm:pt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto mb-6 max-w-2xl px-1 text-center sm:mb-8">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-blue-700 sm:text-xs">
            {t.eyebrow}
          </p>
          <h2 id="featured-title" className="mt-2 text-balance text-3xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
            {t.title}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-pretty text-sm leading-relaxed text-slate-600 sm:text-base">
            {t.description}
          </p>
          <Link href="/proyek" className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-lg border border-slate-300 bg-white px-3.5 text-sm font-semibold text-blue-800 transition-colors hover:border-blue-300 hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 max-sm:mt-4 max-sm:px-3">
            {t.viewAll}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
            </svg>
          </Link>
        </header>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:auto-rows-fr lg:grid-cols-3">
          {featured.map((project, index) => (
            <ProjectCard
              key={project.id}
              featured
              compactMobile
              project={project}
              lang={lang}
              viewPhoto={t.viewPhoto}
              variants={variants}
              sizes="(min-width: 1280px) 395px, (min-width: 1024px) calc((100vw - 96px) / 3), (min-width: 640px) calc((100vw - 64px) / 2), calc((100vw - 44px) / 2)"
              onOpen={(event) => {
                openerRef.current = event.currentTarget;
                setSelectedIndex(index);
              }}
            />
          ))}
        </div>
      </div>

      {selectedIndex !== null && (
        <ProjectLightbox
          list={featured}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          openerRef={openerRef}
          thumbnails={thumbnails}
        />
      )}
    </section>
  );
}
