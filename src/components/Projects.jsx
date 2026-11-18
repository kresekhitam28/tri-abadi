// src/components/Projects.jsx
"use client";

import { useState, useMemo } from "react";
import { useLang } from "../context/LanguageContext";
import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";
import ProjectLightbox, { IconWhatsApp } from "./ProjectLightbox";

const ITEMS_PER_PAGE = 8;

const content = {
  id: {
    titleLight: "Galeri Proyek",
    titleBold: "Pengaspalan & Konstruksi",
    subtitle:
      "Dokumentasi hasil pengerjaan nyata proyek pengaspalan hotmix, pemasangan paving block, pagar panel beton, dan pemadatan lahan oleh tim PT Tri Abadi Makmur berstandar Bina Marga dan bergaransi resmi.",
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
    loadMore: "Muat Lebih Banyak",
    photos: "foto",
    filterLabel: "Filter kategori proyek",
    showingText: "Menampilkan",
    ctaHighlight: "Konsultasikan kebutuhan proyek Anda sekarang",
    ctaSubtitle: "Kami siap membantu dengan survei lokasi dan estimasi biaya gratis.",
    ctaButton: "Konsultasi via WhatsApp",
    waMessage:
      "Halo PT Tri Abadi Makmur, saya melihat galeri proyek Anda dan ingin konsultasi kebutuhan pengaspalan/konstruksi.",
    of: "dari",
  },
  en: {
    titleLight: "Asphalt & Construction",
    titleBold: "Project Gallery",
    subtitle:
      "Real-world project documentation of hotmix road paving, paving block installation, precast panel fencing, and land grading executed by PT Tri Abadi Makmur across Greater Jakarta, Banten & West Java.",
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
    loadMore: "Load More Projects",
    photos: "photos",
    filterLabel: "Filter projects by category",
    showingText: "Showing",
    ctaHighlight: "Consult your project requirements today",
    ctaSubtitle: "We can help with a free site survey and cost estimate.",
    ctaButton: "Consult via WhatsApp",
    waMessage:
      "Hello PT Tri Abadi Makmur, I saw your project gallery and would like to consult about an asphalt paving/construction project.",
    of: "of",
  },
};

function IconChevronDown({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function IconArrowRight({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

export default function Projects({ variants, thumbnails }) {
  const { lang } = useLang();
  const data = content[lang];
  const [activeFilter, setActiveFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const filtered = useMemo(
    () => activeFilter === "all" ? projects : projects.filter((project) => project.category === activeFilter),
    [activeFilter],
  );
  const visible = filtered.slice(0, visibleCount);
  const remaining = filtered.length - visible.length;
  const waHref = `https://wa.me/6282258089367?text=${encodeURIComponent(data.waMessage)}`;

  function selectFilter(category) {
    setActiveFilter(category);
    setVisibleCount(ITEMS_PER_PAGE);
    setSelectedIndex(null);
  }

  return (
    <section className="bg-slate-50 pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pt-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="max-w-2xl">
          <h1 className="text-balance text-3xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-5xl">
            {data.titleLight} {data.titleBold}
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">{data.subtitle}</p>
        </header>

        <div role="group" aria-label={data.filterLabel} className="my-7 flex flex-wrap gap-2 sm:my-9">
          {data.filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              aria-pressed={activeFilter === filter.id}
              onClick={() => selectFilter(filter.id)}
              className={`cursor-pointer rounded-full border px-3.5 py-2 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:px-4 sm:text-sm ${activeFilter === filter.id
                ? "border-blue-700 bg-blue-700 text-white"
                : "border-slate-200 bg-white text-slate-700 hover:border-blue-400 hover:text-blue-700"}`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              lang={lang}
              category={data.badges[project.category]}
              viewPhoto={data.viewPhoto}
              variants={variants}
              onOpen={() => setSelectedIndex(index)}
            />
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center gap-3">
          {remaining > 0 && (
            <button
              type="button"
              onClick={() => setVisibleCount((previous) => previous + ITEMS_PER_PAGE)}
              className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition-colors hover:border-blue-400 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              {data.loadMore}
              <IconChevronDown />
            </button>
          )}
          <p aria-live="polite" className="text-sm text-slate-600">
            {data.showingText} {visible.length} {data.of} {filtered.length} {data.photos}
          </p>
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
            className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300"
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
          thumbnails={thumbnails}
        />
      )}
    </section>
  );
}
