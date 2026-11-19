// src/components/FloatingWA.jsx
"use client";

import { useLang } from "../context/LanguageContext";
import { usePathname } from "next/navigation";

const WA_NUMBER = "6282258089367";

// Teks bilingual (label tooltip, aria, dan pesan awal WhatsApp)
const texts = {
  id: {
    label: "Hubungi kami",
    aria: "Chat WhatsApp",
    message: "Halo, saya ingin konsultasi",
  },
  en: {
    label: "Contact us",
    aria: "Chat on WhatsApp",
    message: "Hello, I would like to consult about a project",
  },
};

export default function FloatingWA({ inline = false }) {
  const { lang } = useLang();
  const t = texts[lang] || texts.id;
  const pathname = usePathname();
  const blogListing = /^\/blog(?:\/halaman\/\d+)?\/?$/.test(pathname);

  return (
    <a
      href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(t.message)}`}
      target="_blank"
      rel="noreferrer"
      aria-label={t.aria}
      className={inline
        ? "group mx-auto flex min-h-11 w-fit items-center gap-2 rounded-full border border-slate-200 bg-white py-1 pr-3 pl-1 text-sm font-semibold text-slate-800 hover:border-green-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 sm:hidden"
        : `fixed right-3 z-[60] group flex items-center gap-3 rounded-full focus-visible:outline-none sm:right-6 ${blogListing ? "max-sm:hidden" : ""}`}
      style={inline ? undefined : {
        bottom: "max(1rem, env(safe-area-inset-bottom, 1rem))",
      }}
    >
      {/* Label — hanya muncul di desktop saat hover / fokus keyboard */}
      <span
        className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap sm:flex items-center px-4 py-2 bg-white text-slate-800 text-sm font-semibold
                   rounded-xl shadow-[0_10px_30px_-8px_rgba(0,0,0,0.25)] ring-1 ring-slate-900/5
                   opacity-0 translate-x-3
                   group-hover:opacity-100 group-hover:translate-x-0
                   group-focus-visible:opacity-100 group-focus-visible:translate-x-0
                   motion-safe:transition-all motion-safe:duration-200 motion-safe:ease-out"
      >
        {t.label}
        {/* Ekor kecil menunjuk ke tombol */}
        <span
          className="absolute -right-1 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rotate-45 bg-white"
          aria-hidden="true"
        />
      </span>

      {/* Tombol WA */}
      <span
          className={`relative ${inline ? "size-8" : "w-12 h-12 sm:w-14 sm:h-14"}
                   rounded-full bg-gradient-to-br from-[#3ee07f] to-[#1fb855]
                   flex items-center justify-center
                   ring-2 ring-white/70
                   shadow-md shadow-green-900/30
                   group-hover:brightness-95 group-active:brightness-90
                   group-focus-visible:outline-2 group-focus-visible:outline-offset-2 group-focus-visible:outline-blue-700
                   motion-safe:transition-[filter] motion-safe:duration-150`}
      >
        <svg viewBox="0 0 32 32" aria-hidden="true"
             className={`relative fill-white drop-shadow-sm ${inline ? "size-4" : "w-6 h-6 sm:w-7 sm:h-7"}`}>
          <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.888 2.722.888.817 0 2.15-.515 2.478-1.318.13-.33.215-.673.215-1.017 0-.058-.014-.115-.043-.158-.13-.244-2.22-1.29-2.407-1.39-.158-.086-.33-.13-.5-.13z" />
          <path d="M16.005 3C8.83 3 3 8.83 3 16.005c0 2.286.595 4.435 1.636 6.297L3 29l6.87-1.61a12.96 12.96 0 0 0 6.135 1.55h.005c7.174 0 13.005-5.83 13.005-13.005 0-3.474-1.353-6.74-3.808-9.195A12.92 12.92 0 0 0 16.005 3zm0 23.845h-.004a10.8 10.8 0 0 1-5.504-1.507l-.395-.234-4.08.956.955-3.978-.258-.41a10.77 10.77 0 0 1-1.65-5.667c0-5.957 4.85-10.806 10.81-10.806 2.885 0 5.594 1.125 7.632 3.164a10.73 10.73 0 0 1 3.16 7.65c0 5.96-4.85 10.808-10.81 10.808z" />
        </svg>
      </span>
      {inline && <span>{t.aria}</span>}
    </a>
  );
}
