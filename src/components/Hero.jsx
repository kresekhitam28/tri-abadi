"use client";

import { useLang } from "../context/LanguageContext";
import { asphaltPackagePrices, formatAsphaltPrice } from "../data/asphaltPricing";
import { projectQuoteHref } from "../lib/quote";

const content = {
  id: {
    title: "Jasa Pengaspalan Jalan",
    emphasis: "Hotmix Bergaransi",
    description: `Pengaspalan untuk jalan, pabrik, perumahan, dan area parkir. Paket pelapisan ulang (overlay) mulai ${formatAsphaltPrice(asphaltPackagePrices.A)}/m².`,
    consult: "Konsultasi & Survei Gratis",
    results: "Lihat Hasil Proyek",
  },
  en: {
    area: "Greater Jakarta, Banten & West Java",
    title: "Asphalt Road Paving",
    emphasis: "Guaranteed Hotmix Work",
    description: `Asphalt paving for roads, factories, housing estates, and parking areas. Overlay resurfacing starts at ${formatAsphaltPrice(asphaltPackagePrices.A, "en")}/m².`,
    consult: "Free Consultation & Site Survey",
    results: "View Completed Projects",
  },
};

export default function Hero() {
  const { lang } = useLang();
  const t = content[lang];
  const whatsapp = projectQuoteHref("asphaltSurvey", lang);

  return (
    <section aria-labelledby="home-title" className="relative isolate overflow-hidden bg-[#071625] text-white">
      <div className="absolute inset-0 -z-10">
        <img
          src="/proyek/proyek-30.webp"
          srcSet="/proyek/proyek-30-320.webp 320w, /proyek/proyek-30-640.webp 640w, /proyek/proyek-30.webp 800w"
          sizes="100vw"
          alt=""
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover object-[68%_55%] sm:object-[55%_55%]"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,#071625bf_0%,#071625c9_54%,#071625b8_100%)] lg:bg-[radial-gradient(ellipse_at_center,#071625d9_0%,#071625bd_40%,#07162585_100%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 text-sm font-semibold text-blue-200">{t.area}</p>
          <h1 id="home-title" className="text-balance text-[clamp(2.2rem,5.1vw,4.5rem)] font-semibold leading-[1.04] tracking-[-0.045em]">
            {t.title} <span className="block text-blue-200">{t.emphasis}</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-slate-100 sm:text-lg">
            {t.description}
          </p>

          <div className="mx-auto mt-7 flex max-w-sm flex-col justify-center gap-3 sm:mt-8 sm:max-w-none sm:flex-row sm:flex-wrap">
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-center text-sm font-semibold transition-colors duration-150 hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-200 active:bg-blue-800 sm:text-base"
            >
              {t.consult}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="size-4 shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
              </svg>
            </a>
            <a
              href="#proyek-unggulan"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/40 bg-slate-950/50 px-5 py-3 text-center text-sm font-semibold transition-colors duration-150 hover:bg-slate-950/65 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-200 active:bg-slate-950/80 sm:bg-slate-950/25 sm:hover:bg-white/15 sm:active:bg-white/20 sm:text-base"
            >
              {t.results}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="size-4 shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m-6-6 6 6 6-6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
