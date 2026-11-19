import { projectQuoteHref } from "../lib/quote";

export default function ArticleQuotePanel({ quote, lang }) {
  const number = new Intl.NumberFormat(lang === "en" ? "en-US" : "id-ID");

  return (
    <section aria-labelledby="article-quote-title" className="flex flex-col gap-2 rounded-2xl border border-blue-200 bg-blue-50/60 p-3 text-left sm:gap-3 sm:p-6">
      <h2 id="article-quote-title" className="text-balance text-lg font-semibold leading-snug tracking-tight text-slate-950 sm:text-xl">
        {quote.title[lang]}
      </h2>
      <div className={`grid gap-2 sm:order-3 sm:gap-3 ${quote.options.length > 1 ? "sm:grid-cols-2" : ""}`}>
        {quote.options.map(({ request, label, prices, scope }) => (
          <div key={request} className={scope ? "flex min-w-0 flex-col gap-1 rounded-xl border border-blue-100 bg-white p-2.5 sm:gap-2 sm:p-3" : "grid min-w-0 gap-2"}>
            {scope && <p className="text-xs font-semibold text-slate-800">{scope[lang]}</p>}
            <a
              href={projectQuoteHref(request, lang)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center rounded-lg bg-blue-700 px-4 py-2.5 text-center text-sm font-semibold leading-snug text-white transition-colors hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
            >
              {label[lang]}
            </a>
            {prices && (
              <a
                href={`#${prices.id}`}
                className="inline-flex min-h-11 items-center self-center rounded px-2 text-center text-sm font-medium text-blue-800 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-blue-700"
              >
                {prices.label[lang]}
              </a>
            )}
          </div>
        ))}
      </div>
      {quote.ranges && (
        <ul className="grid gap-2 sm:order-1 sm:grid-cols-3 sm:gap-3">
          {quote.ranges.map(({ label, from, to }) => (
            <li key={label.id} className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 rounded-xl border border-blue-100 bg-white px-3 py-2 sm:block sm:p-3">
              <p className="text-xs font-semibold text-slate-700">{label[lang]}</p>
              <p className="text-sm font-semibold tabular-nums text-slate-950 sm:mt-1.5">
                Rp{number.format(from)}–{number.format(to)}
                <span className="ml-1 whitespace-nowrap text-xs font-normal text-slate-600">/ m²</span>
              </p>
            </li>
          ))}
        </ul>
      )}
      <p className="text-sm leading-relaxed text-slate-600 sm:order-2">{quote.note[lang]}</p>
    </section>
  );
}
