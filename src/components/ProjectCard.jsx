const gridSizes = "(min-width: 1280px) 392px, (min-width: 1024px) calc((100vw - 104px) / 3), (min-width: 640px) calc((100vw - 68px) / 2), calc((100vw - 44px) / 2)";

// Keep the crews visible in the cropped previews of these wide photos.
const previewPositions = {
  64: "object-right",
  70: "object-left",
};

const featuredPreviewPositions = {
  21: "object-[50%_41%]",
  30: "object-[50%_44%]",
};

export default function ProjectCard({ project, lang, category, viewPhoto, variants, onOpen, heading: Heading = "h3", sizes = gridSizes, featured = false, compactMobile = false }) {
  const title = project.title[lang];
  const detail = project.detail?.[lang];
  const fileName = project.src.split("/").pop();
  const small = fileName.replace(/\.webp$/, "-320.webp");
  const medium = fileName.replace(/\.webp$/, "-640.webp");
  const smallWidth = variants[small];
  const mediumWidth = variants[medium];
  const cropPosition = (featured ? featuredPreviewPositions[project.id] : undefined) ?? previewPositions[project.id];
  const srcSet = [
    smallWidth && `/proyek/${small} ${smallWidth}w`,
    mediumWidth && mediumWidth !== smallWidth && `/proyek/${medium} ${mediumWidth}w`,
  ].filter(Boolean).join(", ");

  return (
    <article className={`h-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:border-blue-300 ${featured ? "transition-[border-color,box-shadow] duration-200 hover:shadow-md focus-within:border-blue-300" : "transition-colors"}`}>
      <button
        type="button"
        onClick={onOpen}
        aria-haspopup="dialog"
        aria-label={`${viewPhoto}: ${title} (${project.location})`}
        className={`group relative block w-full cursor-zoom-in scroll-mt-24 overflow-hidden bg-slate-100 focus-visible:z-10 focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-blue-700 ${featured ? "aspect-[2/1] max-h-44 lg:aspect-auto lg:h-40 xl:h-44" : "aspect-[16/10]"} ${compactMobile ? "max-sm:aspect-[4/3] max-sm:scroll-mb-20" : ""}`}
      >
        <img
          src={project.src}
          srcSet={srcSet || undefined}
          sizes={srcSet ? sizes : undefined}
          alt=""
          loading="lazy"
          decoding="async"
          className={`absolute inset-0 h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:scale-[1.03] ${cropPosition ?? ""}`}
        />
        <span aria-hidden="true" className={`absolute right-3 top-3 grid place-items-center rounded-full ${featured ? "size-10 bg-white/95 text-slate-900 shadow-sm transition-colors group-hover:bg-blue-700 group-hover:text-white" : "size-9 bg-slate-950/65 text-white"} ${compactMobile ? "max-sm:left-2 max-sm:right-auto max-sm:top-2 max-sm:size-7" : ""}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-4">
            <circle cx="10.5" cy="10.5" r="6.5" />
            <path strokeLinecap="round" d="m16 16 4 4m-9.5-12v5m-2.5-2.5h5" />
          </svg>
        </span>
      </button>

      <div className={`${featured ? "p-3" : "p-4 sm:p-5"} ${compactMobile ? "max-sm:p-2.5" : ""}`}>
        <p className={`flex flex-wrap items-center gap-x-2 gap-y-1 ${featured ? "text-[0.6875rem] font-semibold leading-4 text-blue-800" : "text-xs font-medium text-slate-600"} ${compactMobile ? "max-sm:gap-x-1 max-sm:gap-y-0.5 max-sm:text-[0.6875rem] max-sm:leading-4" : ""}`}>
          {category && (
            <>
              <span className="text-blue-700">{category}</span>
              <span aria-hidden="true" className="size-1 rounded-full bg-slate-300" />
            </>
          )}
          <span className={featured ? "rounded-md bg-blue-50 px-1.5 py-0.5" : undefined}>{project.location}</span>
        </p>
        <Heading className={`font-semibold text-slate-950 ${featured ? "mt-1.5 line-clamp-2 text-[0.9375rem] leading-5 sm:min-h-10" : "mt-2 text-base leading-snug sm:text-[1.0625rem]"} ${compactMobile ? "max-sm:mt-1.5 max-sm:line-clamp-2 max-sm:text-sm max-sm:leading-5" : ""}`}>{title}</Heading>
        {detail && <p className={`text-slate-600 ${featured ? "mt-1 line-clamp-2 text-[0.8125rem] leading-5" : "mt-2 text-sm leading-relaxed"} ${compactMobile ? "max-sm:hidden" : ""}`}>{detail}</p>}
      </div>
    </article>
  );
}
