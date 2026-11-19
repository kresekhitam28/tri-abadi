export default function ServiceProjectPhoto({ project, lang }) {
  const title = project.title[lang];
  const imageBase = project.src.replace(/\.webp$/, "");

  return (
    <figure id="contoh-proyek" className="relative mb-10 scroll-mt-24 overflow-hidden rounded-2xl bg-slate-100 shadow-xl shadow-slate-200/50 ring-1 ring-slate-900/5 sm:mb-12">
      <div className="aspect-[16/10]">
        <img
          src={project.src}
          srcSet={`${imageBase}-320.webp 320w, ${imageBase}-640.webp 640w, ${project.src} 800w`}
          sizes="(min-width: 896px) 832px, calc(100vw - 40px)"
          alt={project.detail?.[lang] || title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </div>
      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 to-transparent px-5 pb-5 pt-16 sm:px-8 sm:pb-8 sm:pt-20">
        <p className="text-sm font-medium text-blue-200">{project.location}</p>
        <p className="mt-1 font-semibold text-white sm:text-lg">{title}</p>
      </figcaption>
    </figure>
  );
}
