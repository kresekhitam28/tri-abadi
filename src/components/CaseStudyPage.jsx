"use client";

import Link from "next/link";
import { useLang } from "../context/LanguageContext";
import { caseStudyReviewer } from "../data/caseStudies";
import { projectQuoteHref } from "../lib/quote";
import ServiceProjectPhoto from "./ServiceProjectPhoto";

export default function CaseStudyPage({ study }) {
  const { lang } = useLang();
  const en = lang === "en";
  const sections = [
    [en ? "Project specifications" : "Spesifikasi pekerjaan", study.specifications],
    [en ? "Site constraint" : "Kendala lapangan", study.challenge],
    [en ? "Work method" : "Metode kerja", study.method],
    [en ? "Project outcome" : "Hasil pekerjaan", study.outcome],
  ];
  const areaM2 = new Intl.NumberFormat(en ? "en-US" : "id-ID").format(study.areaM2);

  return (
    <article className="mx-auto max-w-4xl px-5 pb-16 pt-24 sm:px-8 sm:pt-32">
      <Link href="/proyek" className="inline-flex min-h-11 items-center font-semibold text-blue-800 underline">
        {en ? "Project portfolio" : "Portofolio proyek"}
      </Link>
      <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-slate-950 sm:text-5xl">{study.title[lang]}</h1>
      <p className="mt-4 text-base leading-relaxed text-slate-700">{study.summary[lang]}</p>
      <dl className="my-6 grid gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm sm:grid-cols-2 sm:p-5">
        <div><dt className="font-semibold">{en ? "Client" : "Klien"}</dt><dd>{study.client[lang]}</dd></div>
        <div><dt className="font-semibold">{en ? "Location" : "Lokasi"}</dt><dd>{study.location}</dd></div>
        <div><dt className="font-semibold">{en ? "Project year" : "Tahun proyek"}</dt><dd>{study.year}</dd></div>
        <div><dt className="font-semibold">{en ? "Estimated area" : "Perkiraan luas"}</dt><dd>±{areaM2} m²</dd></div>
      </dl>
      <ServiceProjectPhoto project={study.photo} lang={lang} />
      <div className="space-y-6">
        {sections.map(([heading, copy]) => (
          <section key={heading}>
            <h2 className="text-xl font-semibold text-slate-950">{heading}</h2>
            <p className="mt-2 leading-relaxed text-slate-700">{copy[lang]}</p>
          </section>
        ))}
      </div>
      <p className="mt-6 text-sm text-slate-700"><strong>{en ? "Technical review" : "Pemeriksa teknis"}</strong> · {caseStudyReviewer}</p>
      <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-slate-200 pt-5">
        <a href={projectQuoteHref(study.quoteRequest, lang, study.area.location)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center rounded-lg bg-blue-700 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-blue-800">
          {en ? "Request a site survey on WhatsApp" : "Minta survei lokasi via WhatsApp"}
        </a>
        <Link href={study.servicePath} className="inline-flex min-h-11 items-center text-sm font-semibold text-blue-800 underline">
          {en ? "Service scope and pricing" : `Lingkup dan harga ${study.serviceName.toLowerCase()}`}
        </Link>
        <Link href={study.areaPath} className="inline-flex min-h-11 items-center text-sm font-semibold text-blue-800 underline">{study.area.title[lang]}</Link>
      </div>
    </article>
  );
}
