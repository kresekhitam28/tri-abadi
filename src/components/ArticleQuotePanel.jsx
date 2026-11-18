import { projectQuoteHref } from "../lib/quote";

export default function ArticleQuotePanel({ quote, lang }) {
  const number = new Intl.NumberFormat(lang === "en" ? "en-US" : "id-ID");

  return (
    <section aria-labelledby="article-quote-title" className="rounded-2xl border border-blue-100 bg-blue-50/70 p-4 text-left sm:p-6">
      <h2 id="article-quote-title" className="text-lg font-semibold text-slate-950 sm:text-xl">
        {quote.title[lang]}
      </h2>
      {quote.ranges && (
        <ul className="mt-3 grid gap-2 sm:grid-cols-3">
          {quote.ranges.map(({ label, from, to }) => (
            <li key={label.id} className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 rounded-lg border border-blue-100 bg-white px-3 py-2 sm:block sm:p-3">
              <p className="text-xs font-medium text-slate-600">{label[lang]}</p>
              <p className="text-sm font-semibold text-slate-950 sm:mt-1">
                Rp{number.format(from)}–{number.format(to)}
                <span className="ml-1 whitespace-nowrap text-xs font-normal text-slate-600">/ m²</span>
              </p>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-3 text-sm leading-relaxed text-slate-600">{quote.note[lang]}</p>
      <div className={`mt-4 grid gap-3 ${quote.options.length > 1 ? "sm:grid-cols-2" : ""}`}>
        {quote.options.map(({ request, label, prices }, index) => (
          <div key={request} className="grid min-w-0 content-start gap-2">
            <a
              href={projectQuoteHref(request, lang)}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex min-h-11 items-center justify-center rounded-lg px-4 py-2.5 text-center text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${index === 0
                ? "bg-blue-700 text-white hover:bg-blue-800"
                : "border border-blue-300 bg-white text-blue-800 hover:bg-blue-100"}`}
            >
              {label[lang]}
            </a>
            {prices && (
              <a
                href={`#${prices.id}`}
                className="justify-self-center rounded px-2 py-1 text-sm font-medium text-blue-800 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-blue-700"
              >
                {prices.label[lang]}
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
