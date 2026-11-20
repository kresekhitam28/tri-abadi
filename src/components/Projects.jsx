// src/components/Projects.jsx
"use client";

import { useState, useMemo, useRef } from "react";
import Link from "next/link";
import { useLang } from "../context/LanguageContext";
import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";
import ProjectLightbox, { IconWhatsApp } from "./ProjectLightbox";

const featuredIds = [26, 30, 1];
const orderedProjects = [
  ...featuredIds.map((id) => projects.find((project) => project.id === id)),
  ...projects.filter((project) => !featuredIds.includes(project.id)),
];

const content = {
  id: {
    eyebrow: "Dokumentasi Pekerjaan",
    title: "Portofolio Proyek Kami",
    subtitle:
      "Jelajahi dokumentasi berbagai pekerjaan konstruksi dan infrastruktur yang telah kami tangani, mulai dari pengaspalan jalan, paving block, pengecoran beton, hingga pekerjaan lainnya.",
    filters: [
      { id: "all", label: "Semua Proyek" },
      { id: "aspal", label: "Pengaspalan Hotmix" },
      { id: "paving", label: "Paving & Kanstin" },
      { id: "panel", label: "Pagar & Tiang Pancang" },
      { id: "beton", label: "Cor Beton & Lahan" },
    ],
    badges: {
      aspal: "Aspal Hotmix",
      paving: "Paving & Kanstin",
      panel: "Pagar & Tiang Pancang",
      beton: "Cor Beton & Lahan",
    },
    viewPhoto: "Lihat Foto",
    filterLabel: "Filter kategori proyek",
    ctaHighlight: "Konsultasikan kebutuhan proyek Anda sekarang",
    ctaSubtitle: "Kami siap membantu dengan survei lokasi dan estimasi biaya gratis.",
    ctaButton: "Konsultasi via WhatsApp",
    waMessage:
      "Halo PT Tri Abadi Makmur, saya melihat galeri proyek Anda dan ingin konsultasi kebutuhan pengaspalan/konstruksi.",
  },
  en: {
    eyebrow: "Project Documentation",
    title: "Our Project Portfolio",
    subtitle:
      "Explore our construction and infrastructure work, from asphalt road paving, paving block installation, and concrete pouring to other projects.",
    filters: [
      { id: "all", label: "All Projects" },
      { id: "aspal", label: "Asphalt Paving" },
      { id: "paving", label: "Paving & Curbs" },
      { id: "panel", label: "Fences & Piling" },
      { id: "beton", label: "Concrete & Grading" },
    ],
    badges: {
      aspal: "Asphalt Paving",
      paving: "Paving & Curbs",
      panel: "Fences & Piling",
      beton: "Concrete & Grading",
    },
    viewPhoto: "View Photo",
    filterLabel: "Filter projects by category",
    ctaHighlight: "Consult your project requirements today",
    ctaSubtitle: "We can help with a free site survey and cost estimate.",
    ctaButton: "Consult via WhatsApp",
    waMessage:
      "Hello PT Tri Abadi Makmur, I saw your project gallery and would like to consult about an asphalt paving/construction project.",
  },
};

function IconArrowRight({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

export default function Projects({ variants, thumbnails, caseStudies }) {
  const { lang } = useLang();
  const data = content[lang];
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const openerRef = useRef(null);

  const filtered = useMemo(
    () => activeFilter === "all" ? orderedProjects : orderedProjects.filter((project) => project.category === activeFilter),
    [activeFilter],
  );
  const waHref = `https://wa.me/6282258089367?text=${encodeURIComponent(data.waMessage)}`;

  function selectFilter(category) {
    setActiveFilter(category);
    setSelectedIndex(null);
  }

  return (
    <section className="bg-slate-50 pb-16 pt-21 sm:pb-20 sm:pt-24 lg:pt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-blue-700 sm:text-xs">
            {data.eyebrow}
          </p>
          <h1 className="mt-1.5 text-balance text-3xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-5xl">
            {data.title}
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-slate-600 sm:text-base">{data.subtitle}</p>
        </header>

        <section aria-labelledby="portfolio-case-studies" className="mx-auto mt-6 max-w-4xl">
          <h2 id="portfolio-case-studies" className="text-lg font-semibold text-slate-950">{lang === "en" ? "Project case studies" : "Studi Kasus Proyek"}</h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {caseStudies.map((study) => (
              <li key={study.slug}>
                <Link href={study.path} className="inline-flex h-full min-h-11 w-full items-center rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-blue-800 hover:underline">
                  {study.title[lang]}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <div role="group" aria-label={data.filterLabel} className="my-5 grid grid-cols-6 gap-1.5 sm:my-9 sm:flex sm:flex-wrap sm:justify-center sm:gap-2">
          {data.filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              aria-pressed={activeFilter === filter.id}
              onClick={() => selectFilter(filter.id)}
              className={`min-h-11 cursor-pointer rounded-full border px-1.5 py-1.5 text-xs font-semibold leading-tight transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:px-4 sm:py-2 sm:text-sm ${
                filter.id === "all" || filter.id === "aspal" ? "col-span-3" : "col-span-2"
              } ${activeFilter === filter.id
                ? "border-blue-700 bg-blue-700 text-white"
                : "border-slate-200 bg-white text-slate-700 hover:border-blue-400 hover:text-blue-700"}`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
          {filtered.map((project, index) => (
            <ProjectCard
              compactMobile
              heading="h2"
              key={project.id}
              project={project}
              lang={lang}
              category={data.badges[project.category]}
              viewPhoto={data.viewPhoto}
              variants={variants}
              onOpen={(event) => {
                openerRef.current = event.currentTarget;
                setSelectedIndex(index);
              }}
            />
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-5 rounded-2xl bg-slate-900 px-5 py-6 text-white sm:mt-16 sm:flex-row sm:items-center sm:px-8">
          <div className="max-w-xl">
            <h2 className="text-xl font-semibold">{data.ctaHighlight}</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">{data.ctaSubtitle}</p>
          </div>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300 max-sm:max-w-[calc(100%_-_2rem)] max-sm:scroll-mb-20"
          >
            <IconWhatsApp />
            {data.ctaButton}
            <IconArrowRight />
          </a>
        </div>
      </div>

      {selectedIndex !== null && (
        <ProjectLightbox
          list={filtered}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          openerRef={openerRef}
          thumbnails={thumbnails}
        />
      )}
    </section>
  );
}
