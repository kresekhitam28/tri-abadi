"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useLang } from "../context/LanguageContext";
import { useBodyScrollLock } from "../hooks/useBodyScrollLock";
import { containDialogTab } from "../lib/dialogFocus";
import { WHATSAPP_URL } from "../lib/quote";

function IconChevronLeft({ className = "w-6 h-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function IconChevronRight({ className = "w-6 h-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

function IconClose({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

export function IconWhatsApp({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.031 2c-5.516 0-9.969 4.453-9.969 9.969 0 1.758.458 3.475 1.328 4.988L2 22l5.188-1.359a9.93 9.93 0 0 0 4.843 1.258h.004c5.515 0 9.969-4.453 9.969-9.969A9.93 9.93 0 0 0 19.08 4.92 9.913 9.913 0 0 0 12.031 2Zm5.805 14.234c-.246.692-1.426 1.324-1.976 1.406-.508.078-1.148.109-1.855-.117-.426-.137-.977-.316-1.68-.621-2.957-1.277-4.887-4.254-5.035-4.453-.145-.195-1.203-1.602-1.203-3.055 0-1.453.762-2.168 1.031-2.465.27-.297.59-.371.785-.371.195 0 .391.004.563.012.18.008.422-.07.66.504.246.59.836 2.043.91 2.191.074.148.121.32.023.516-.098.195-.148.32-.293.492-.148.172-.312.383-.445.516-.148.148-.301.309-.129.605.172.297.766 1.262 1.645 2.043 1.129 1.008 2.082 1.32 2.379 1.469.297.148.469.125.641-.074.172-.195.738-.859.934-1.156.195-.297.391-.246.66-.148.27.098 1.719.809 2.012.957.297.148.492.223.566.348.074.125.074.715-.172 1.406Z" />
    </svg>
  );
}

const copy = {
  id: {
    viewer: "Penampil foto proyek",
    close: "Tutup",
    previous: "Foto sebelumnya",
    next: "Foto berikutnya",
    photo: "Foto",
    of: "dari",
    cta: "Tanya Proyek Ini via WhatsApp",
    inquiry: (title) => `Halo PT Tri Abadi Makmur, saya tertarik dengan pengerjaan seperti "${title}". Mohon info estimasi biaya dan jadwal survei lokasi.`,
  },
  en: {
    viewer: "Project photo viewer",
    close: "Close",
    previous: "Previous photo",
    next: "Next photo",
    photo: "Photo",
    of: "of",
    cta: "Ask About This Project on WhatsApp",
    inquiry: (title) => `Hello PT Tri Abadi Makmur, I am interested in a project like "${title}". Could you share an estimate and arrange a site survey?`,
  },
};

export default function ProjectLightbox({ list, selectedIndex, setSelectedIndex, thumbnails, openerRef }) {
  const { lang } = useLang();
  const dialogRef = useRef(null);
  const thumbnailStripRef = useRef(null);
  const focusThumbnailRef = useRef(false);
  const t = copy[lang];
  const selected = list[selectedIndex];
  const title = selected.title[lang];
  const detail = selected.detail?.[lang];
  const count = list.length;
  const waHref = `${WHATSAPP_URL}?text=${encodeURIComponent(t.inquiry(title))}`;

  useBodyScrollLock();

  useEffect(() => {
    const dialog = dialogRef.current;
    const opener = openerRef.current;
    dialog.showModal();

    return () => {
      dialog.close();
      opener?.focus({ preventScroll: true });
    };
  }, [openerRef]);

  useEffect(() => {
    const strip = thumbnailStripRef.current;
    const active = strip?.querySelector('[aria-current="true"]');
    if (!active) return;

    const stripRect = strip.getBoundingClientRect();
    const activeRect = active.getBoundingClientRect();
    if (activeRect.left < stripRect.left || activeRect.right > stripRect.right) {
      const offset = activeRect.left - stripRect.left - (strip.clientWidth - activeRect.width) / 2;
      strip.scrollTo({ left: strip.scrollLeft + offset, behavior: "instant" });
    }
    if (focusThumbnailRef.current) active.focus({ preventScroll: true });
    focusThumbnailRef.current = false;
  }, [selectedIndex]);

  function close() {
    setSelectedIndex(null);
  }

  function step(offset) {
    setSelectedIndex((current) => current === null ? null : (current + offset + count) % count);
  }

  function handleArrows(event) {
    containDialogTab(event);
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    focusThumbnailRef.current = Boolean(event.target.closest("[data-project-thumbnail]"));
    step(event.key === "ArrowLeft" ? -1 : 1);
  }

  return createPortal(
    <dialog
      ref={dialogRef}
      aria-label={t.viewer}
      className="fixed inset-0 m-0 h-[100dvh] w-full max-h-none max-w-none flex-col overflow-hidden border-0 bg-slate-950 p-0 text-white open:flex"
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      onKeyDown={handleArrows}
    >
      <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-4 py-3 sm:px-6">
        <p className="text-sm text-slate-300" aria-live="polite">
          {t.photo} {selectedIndex + 1} {t.of} {count}
        </p>
        <button
          type="button"
          onClick={close}
          className="grid size-11 cursor-pointer place-items-center rounded-full bg-white/10 hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300"
          aria-label={t.close}
        >
          <IconClose />
        </button>
      </div>

      <div
        className="flex min-h-0 flex-1 flex-col overflow-y-auto"
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        <div className="m-auto w-full max-w-4xl px-4 py-4 sm:px-8">
          <div className="relative">
            <img
              src={selected.src}
              alt={title}
              decoding="async"
              draggable={false}
              className="mx-auto max-h-[52dvh] w-full rounded-xl object-contain sm:max-h-[62dvh]"
            />
            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label={t.previous}
                  className="absolute left-2 top-1/2 grid size-11 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-white/25 bg-slate-950/80 hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-blue-300 sm:size-12"
                >
                  <IconChevronLeft className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label={t.next}
                  className="absolute right-2 top-1/2 grid size-11 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-white/25 bg-slate-950/80 hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-blue-300 sm:size-12"
                >
                  <IconChevronRight className="size-5" />
                </button>
              </>
            )}
          </div>

          <div className="mt-3 flex flex-col gap-3 rounded-xl border border-white/10 bg-white/5 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-medium text-blue-200">{selected.location}</p>
              <h2 className="mt-1 text-base font-semibold leading-snug sm:text-lg">{title}</h2>
              {detail && <p className="mt-1 text-sm leading-relaxed text-slate-300">{detail}</p>}
            </div>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 self-start rounded-lg bg-emerald-700 px-4 py-2.5 text-xs font-semibold hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300 sm:self-center"
            >
              <IconWhatsApp />
              {t.cta}
            </a>
          </div>
        </div>
      </div>

      {count > 1 && (
        <div ref={thumbnailStripRef} className="shrink-0 overflow-x-auto overscroll-x-contain border-t border-white/10 p-3">
          <div className="mx-auto flex w-max gap-2">
            {list.map((project, index) => {
              const fileName = project.src.split("/").pop();
              const thumbnail = thumbnails.includes(fileName) ? `/proyek/thumbs/${fileName}` : project.src;
              const active = index === selectedIndex;

              return (
                <button
                  key={project.id}
                  type="button"
                  data-project-thumbnail
                  tabIndex={active ? 0 : -1}
                  onClick={() => setSelectedIndex(index)}
                  aria-label={`${t.photo} ${index + 1}: ${project.title[lang]}`}
                  aria-current={active ? "true" : undefined}
                  className={`size-11 shrink-0 cursor-pointer overflow-hidden rounded-md focus-visible:outline-2 focus-visible:outline-blue-300 sm:size-13 ${active ? "ring-2 ring-blue-400" : "opacity-60 hover:opacity-100"}`}
                >
                  <img src={thumbnail} alt="" loading="lazy" width={52} height={52} className="size-full object-cover" />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </dialog>,
    document.body,
  );
}

