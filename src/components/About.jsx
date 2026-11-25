"use client";

import { useLang } from "../context/LanguageContext";
import Link from "next/link";

function IconCheck({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}
function IconEye({ className = "w-6 h-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
function IconTarget({ className = "w-6 h-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}
function IconDownload({ className = "w-5 h-5" }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
  );
}

const content = {
  id: {
    heroKicker: "Profil Perusahaan",
    heroTitle: "Kontraktor Aspal",
    heroEmphasis: "Berpengalaman",
    heroSubtitle: "PT Tri Abadi Makmur Indonesia melayani pengaspalan jalan, pemasangan paving block, pengecoran beton, dan pekerjaan konstruksi lainnya.",
    download: "Download Company Profile",
    profileTitle: "Profil Singkat",
    intro: "PT Tri Abadi Makmur Indonesia merupakan perusahaan yang bergerak di bidang konstruksi dan infrastruktur, dengan layanan pengaspalan jalan, pemasangan paving block, pengecoran beton, serta pekerjaan konstruksi lainnya. Kami mengutamakan kualitas pekerjaan, ketelitian, dan komunikasi yang baik dalam memenuhi kebutuhan setiap proyek.",
    foundationTitle: "Visi dan Misi",
    visionTitle: "Visi Kami",
    vision: "Menjadi perusahaan berskala nasional dan internasional yang mampu berdaya saing secara profesional.",
    missionTitle: "Misi Kami",
    mission: [
      "Memberikan perhatian terhadap isu lingkungan dan sosial.",
      "Menciptakan solusi inovatif dalam setiap pekerjaan.",
      "Memberikan hasil terbaik dalam setiap pekerjaan.",
    ],
    advantagesTitle: "Keunggulan Kami",
    advantages: [
      "Berpengalaman bertahun-tahun di berbagai proyek konstruksi jalan dan bangunan.",
      "Tenaga ahli dan profesional di bidangnya, didukung peralatan modern.",
      "Mengedepankan kualitas, kehati-hatian, dan ketepatan waktu.",
      "Mendengarkan klien dan memberikan solusi sesuai kebutuhan proyek.",
      "Harga kompetitif dengan hasil yang memuaskan dan tahan lama.",
      "Pelayanan responsif dengan konsultasi dan survei lokasi gratis.",
    ],
  },
  en: {
    heroKicker: "Company Profile",
    heroTitle: "Experienced Asphalt",
    heroEmphasis: "Contractor",
    heroSubtitle: "PT Tri Abadi Makmur Indonesia provides road paving, paving block installation, concrete pouring, and other construction services.",
    download: "Download Company Profile",
    profileTitle: "Company Overview",
    intro: "PT Tri Abadi Makmur Indonesia is a construction and infrastructure company offering road paving, paving block installation, concrete pouring, and other construction services. We prioritize quality workmanship, attention to detail, and clear communication to meet each project's needs.",
    foundationTitle: "Vision and Mission",
    visionTitle: "Our Vision",
    vision: "To become a company that can compete professionally at the national and international levels.",
    missionTitle: "Our Mission",
    mission: [
      "Pay attention to environmental and social issues.",
      "Develop innovative solutions in every project.",
      "Deliver the best results in every project.",
    ],
    advantagesTitle: "Our Strengths",
    advantages: [
      "Years of experience in road and building construction projects.",
      "Skilled professionals supported by modern equipment.",
      "A focus on quality, attention to detail, and timely delivery.",
      "We listen to clients and propose solutions that fit their project needs.",
      "Competitive prices and satisfactory, durable results.",
      "Responsive service with free consultations and site surveys.",
    ],
  },
};

function FoundationCard({ icon: Icon, title, children }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:p-7">
      <div className="mb-4 flex items-center gap-3">
        <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-700">
          <Icon className="size-5" />
        </span>
        <h3 className="text-lg font-semibold text-slate-950 sm:text-xl">{title}</h3>
      </div>
      {children}
    </article>
  );
}

export default function About() {
  const { lang } = useLang();
  const data = content[lang] || content.id;

  return (
    <>
      <section aria-labelledby="about-title" className="relative isolate overflow-hidden bg-slate-950 pb-10 pt-26 text-white sm:pb-14 sm:pt-32 lg:pb-16 lg:pt-36">
        <img
          src="/proyek/proyek-50.webp"
          srcSet="/proyek/proyek-50-320.webp 320w, /proyek/proyek-50-640.webp 640w, /proyek/proyek-50.webp 800w"
          sizes="100vw"
          alt=""
          decoding="async"
          fetchPriority="high"
          className="absolute inset-0 -z-10 size-full object-cover object-center"
        />
        <div className="absolute inset-0 -z-10 bg-linear-to-b from-slate-950/85 via-slate-950/75 to-slate-950/90" aria-hidden="true" />

        <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-200">{data.heroKicker}</p>
          <h1 id="about-title" className="mt-3 text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            {data.heroTitle} <span className="text-blue-200">{data.heroEmphasis}<span className="text-[#4da3ff]">.</span></span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-slate-100 sm:text-base lg:text-lg">
            {data.heroSubtitle}
          </p>
          <a
            href="/company-profile.pdf"
            download
            className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-200 sm:mt-7 sm:px-6 sm:text-base"
          >
            <IconDownload className="size-5 shrink-0" />
            {data.download}
          </a>
        </div>
      </section>

      <section aria-labelledby="about-profile-title" className="border-b border-slate-100 bg-white py-9 sm:py-11 lg:py-12">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <h2 id="about-profile-title" className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">{data.profileTitle}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-700 sm:text-base sm:leading-7">{data.intro}</p>
          <Link href="/proyek" className="mt-3 inline-flex min-h-11 items-center font-semibold text-blue-800 underline">
            {lang === "en" ? "View project photos and case studies" : "Lihat dokumentasi dan studi kasus proyek"}
          </Link>
        </div>
      </section>

      <section aria-labelledby="about-foundation-title" className="bg-slate-50 py-8 sm:py-11 lg:py-12">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <h2 id="about-foundation-title" className="mb-5 text-center text-2xl font-semibold tracking-tight text-slate-950 sm:mb-6 sm:text-3xl">{data.foundationTitle}</h2>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
            <FoundationCard icon={IconEye} title={data.visionTitle}>
              <p className="text-sm leading-relaxed text-slate-700 sm:text-base">{data.vision}</p>
            </FoundationCard>
            <FoundationCard icon={IconTarget} title={data.missionTitle}>
              <ul className="space-y-2 text-sm leading-relaxed text-slate-700 sm:text-base">
                {data.mission.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <IconCheck className="mt-1 size-4 shrink-0 text-blue-700" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </FoundationCard>
          </div>
        </div>
      </section>

      <section aria-labelledby="about-advantages-title" className="border-t border-slate-100 bg-white py-8 sm:py-11 lg:py-12">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <h2 id="about-advantages-title" className="mb-5 text-center text-2xl font-semibold tracking-tight text-slate-950 sm:mb-6 sm:text-3xl">{data.advantagesTitle}</h2>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
            {data.advantages.map((item) => (
              <li key={item} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm leading-relaxed text-slate-700">
                <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-700">
                  <IconCheck className="size-4" />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
