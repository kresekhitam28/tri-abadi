"use client";

import Link from "next/link";
import { useLang } from "../context/LanguageContext";
import { projectQuoteHref } from "../lib/quote";
import ServiceProjectPhoto from "./ServiceProjectPhoto";

export default function LocalServiceAreaPage({ study }) {
  const { lang } = useLang();
  const en = lang === "en";
  const { area } = study;

  return (
    <div className="mx-auto max-w-4xl px-5 pb-16 pt-24 sm:px-8 sm:pt-32">
      <Link href={study.servicePath} className="inline-flex min-h-11 items-center font-semibold text-blue-800 underline">
        {en ? "Main service and pricing" : "Layanan utama dan paket harga"}
      </Link>
      <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-slate-950 sm:text-5xl">{area.title[lang]}</h1>
      <p className="mt-4 leading-relaxed text-slate-700">{area.summary[lang]}</p>
      <div className="my-7 grid gap-4 sm:grid-cols-2">
        {area.guide.map(({ title, text }) => (
          <section key={title.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
            <h2 className="text-xl font-semibold text-slate-950">{title[lang]}</h2>
            <p className="mt-2 leading-relaxed text-slate-700">{text[lang]}</p>
          </section>
        ))}
      </div>
      <section aria-labelledby="local-project-title">
        <h2 id="local-project-title" className="mb-4 text-xl font-semibold text-slate-950">{study.title[lang]}</h2>
        <ServiceProjectPhoto project={study.photo} lang={lang} />
        <p className="leading-relaxed text-slate-700">{study.summary[lang]}</p>
        <Link href={study.path} className="inline-flex min-h-11 items-center font-semibold text-blue-800 underline">
          {en ? "Read the case study" : "Baca studi kasus"}
        </Link>
      </section>
      <section aria-labelledby="local-survey-title" className="mt-7 rounded-xl border border-blue-100 bg-blue-50 p-4 sm:p-5">
        <h2 id="local-survey-title" className="text-xl font-semibold text-slate-950">{en ? "Preparing for a site survey" : "Persiapan Survei Lokasi"}</h2>
        <p className="mt-2 leading-relaxed text-slate-700">{area.survey[lang]}</p>
        <a href={projectQuoteHref(study.quoteRequest, lang, area.location)} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-12 items-center rounded-lg bg-blue-700 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-blue-800">
          {en ? `Request a survey in ${area.location} on WhatsApp` : `Minta survei ${area.location} via WhatsApp`}
        </a>
      </section>
    </div>
  );
}
