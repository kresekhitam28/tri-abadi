"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useLang } from "../context/LanguageContext";
import ProjectCard from "./ProjectCard";
import ProjectLightbox from "./ProjectLightbox";

const content = {
  id: {
    title: "Proyek Pengaspalan Pilihan",
    viewAll: "Lihat Semua Proyek",
    viewPhoto: "Lihat Foto",
  },
  en: {
    title: "Featured Asphalt Paving Projects",
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
    <section id="proyek-unggulan" aria-labelledby="featured-title" className="scroll-mt-[76px] bg-slate-50 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-x-5 gap-y-3 sm:mb-8">
          <h2 id="featured-title" className="text-balance text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            {t.title}
          </h2>
          <Link href="/proyek" className="inline-flex min-h-10 items-center gap-2 rounded text-sm font-semibold text-blue-700 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
            {t.viewAll}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
            </svg>
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {featured.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              lang={lang}
              viewPhoto={t.viewPhoto}
              variants={variants}
              sizes="(min-width: 1280px) 392px, (min-width: 768px) calc((100vw - 104px) / 3), calc(100vw - 32px)"
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
