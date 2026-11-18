"use client";

import { useLang } from "../context/LanguageContext";

const content = {
  id: {
    area: "Jabodetabek, Banten & Jawa Barat",
    title: "Jasa Pengaspalan Jalan",
    emphasis: "Hotmix Bergaransi",
    description: "Pengaspalan untuk jalan, pabrik, perumahan, dan area parkir. Paket mulai Rp75.000/m².",
    consult: "Konsultasi & Survei Gratis",
    results: "Lihat Hasil Proyek",
    photo: "Pengaspalan Perumahan Sevilage, Bogor",
    message: "Halo PT Tri Abadi Makmur, saya ingin konsultasi dan menjadwalkan survei gratis untuk proyek pengaspalan.",
  },
  en: {
    area: "Greater Jakarta, Banten & West Java",
    title: "Asphalt Road Paving",
    emphasis: "Guaranteed Hotmix Work",
    description: "Asphalt paving for roads, factories, housing estates, and parking areas. Packages start at Rp75,000/m².",
    consult: "Free Consultation & Site Survey",
    results: "View Completed Projects",
    photo: "Paving at the Sevilage Housing Estate, Bogor",
    message: "Hello PT Tri Abadi Makmur, I would like a free consultation and site survey for an asphalt paving project.",
  },
};

export default function Hero() {
  const { lang } = useLang();
  const t = content[lang];
  const whatsapp = `https://wa.me/6282258089367?text=${encodeURIComponent(t.message)}`;

  return (
    <section aria-labelledby="home-title" className="relative isolate overflow-hidden bg-[#071625] text-white">
      <div className="absolute inset-0 -z-10 lg:left-[43%]">
        <img
          src="/proyek/proyek-30.webp"
          srcSet="/proyek/proyek-30-320.webp 320w, /proyek/proyek-30-640.webp 640w, /proyek/proyek-30.webp 800w"
          sizes="(min-width: 1024px) 57vw, 100vw"
          alt=""
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover object-[55%_55%]"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-[#071625]/80 via-[#071625]/72 to-[#071625] lg:bg-gradient-to-r lg:from-[#071625] lg:via-[#071625]/20 lg:to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:py-28">
        <div className="max-w-[43rem]">
          <p className="mb-4 text-sm font-semibold text-blue-200">{t.area}</p>
          <h1 id="home-title" className="text-balance text-[clamp(2.2rem,5.1vw,4.5rem)] font-semibold leading-[1.04] tracking-[-0.045em]">
            {t.title} <span className="block text-blue-200">{t.emphasis}</span>
          </h1>
          <p className="mt-5 max-w-[31rem] text-pretty text-base leading-relaxed text-slate-100 sm:text-lg">
            {t.description}
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-center text-sm font-semibold hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-200 sm:text-base"
            >
              {t.consult}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="size-4 shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
              </svg>
            </a>
            <a
              href="#proyek-unggulan"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/40 bg-slate-950/25 px-5 py-3 text-center text-sm font-semibold hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-200 sm:text-base"
            >
              {t.results}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="size-4 shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m-6-6 6 6 6-6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <p className="absolute bottom-5 right-5 hidden rounded-md bg-slate-950/75 px-3 py-2 text-xs font-medium text-white lg:block">
        {t.photo}
      </p>
    </section>
  );
}
