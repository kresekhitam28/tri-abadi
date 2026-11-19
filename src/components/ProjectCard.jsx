const gridSizes = "(min-width: 1280px) 392px, (min-width: 1024px) calc((100vw - 104px) / 3), (min-width: 640px) calc((100vw - 68px) / 2), calc(100vw - 32px)";

export default function ProjectCard({ project, lang, category, viewPhoto, variants, onOpen, heading: Heading = "h3", sizes = gridSizes }) {
  const title = project.title[lang];
  const detail = project.detail?.[lang];
  const fileName = project.src.split("/").pop();
  const small = fileName.replace(/\.webp$/, "-320.webp");
  const medium = fileName.replace(/\.webp$/, "-640.webp");
  const srcSet = [
    variants.includes(small) && `/proyek/${small} 320w`,
    variants.includes(medium) && `/proyek/${medium} 640w`,
  ].filter(Boolean).join(", ");

  return (
    <article className="h-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-colors hover:border-blue-300">
      <button
        type="button"
        onClick={onOpen}
        aria-haspopup="dialog"
        aria-label={`${viewPhoto}: ${title} (${project.location})`}
        className="group relative block aspect-[16/10] w-full cursor-zoom-in scroll-mt-24 overflow-hidden bg-slate-100 focus-visible:z-10 focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-blue-600"
      >
        <img
          src={project.src}
          srcSet={srcSet || undefined}
          sizes={srcSet ? sizes : undefined}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-105"
        />
        <span aria-hidden="true" className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-slate-950/65 text-white">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-4">
            <circle cx="10.5" cy="10.5" r="6.5" />
            <path strokeLinecap="round" d="m16 16 4 4m-9.5-12v5m-2.5-2.5h5" />
          </svg>
        </span>
      </button>

      <div className="p-4 sm:p-5">
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-slate-600">
          {category && (
            <>
              <span className="text-blue-700">{category}</span>
              <span aria-hidden="true" className="size-1 rounded-full bg-slate-300" />
            </>
          )}
          <span>{project.location}</span>
        </p>
        <Heading className="mt-2 text-base font-semibold leading-snug text-slate-950 sm:text-[1.0625rem]">{title}</Heading>
        {detail && <p className="mt-2 text-sm leading-relaxed text-slate-600">{detail}</p>}
      </div>
    </article>
  );
}
