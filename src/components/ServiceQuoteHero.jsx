const copy = {
  id: {
    request: "Minta Estimasi via WhatsApp",
    prices: "Lihat Paket Harga",
    project: "Lihat foto proyek di",
  },
  en: {
    request: "Request a Quote on WhatsApp",
    prices: "View Price Packages",
    project: "View project photo from",
  },
};

export default function ServiceQuoteHero({ lang, quoteHref, title, subtitle, description, priceNote, pricesId, pricesLabel, projectLocation }) {
  const t = copy[lang];

  return (
    <section aria-labelledby="service-title" className="border-b border-slate-200 bg-white pb-10 pt-28 sm:pb-14 sm:pt-32 lg:pt-36">
      <div className="mx-auto max-w-5xl px-5 text-center sm:px-8">
        <h1 id="service-title" className="text-balance text-3xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-5xl">
          {title}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-pretty text-base font-medium leading-relaxed text-slate-800 sm:text-lg">
          {subtitle}
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-slate-600 sm:text-base">
          {description}
        </p>
        {priceNote && <p className="mt-4 text-sm font-semibold text-blue-800 sm:text-base">{priceNote}</p>}
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href={quoteHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          >
            {t.request}
          </a>
          <a
            href={`#${pricesId}`}
            className="inline-flex min-h-12 items-center justify-center rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 hover:border-blue-500 hover:text-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          >
            {pricesLabel ?? t.prices}
          </a>
        </div>
        <a href="#contoh-proyek" className="mt-3 inline-flex min-h-11 items-center rounded px-2 text-sm font-medium text-blue-800 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-blue-700">
          {t.project} {projectLocation}
        </a>
      </div>
    </section>
  );
}
