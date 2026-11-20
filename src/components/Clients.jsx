"use client";

import Image from "next/image";
import { useState } from "react";
import { useLang } from "../context/LanguageContext";

const clients = [
  { src: "/klien/pertamina.png", alt: "Pertamina", scale: "scale-[1.35]" },
  { src: "/klien/wika.png", alt: "WIKA" },
  { src: "/klien/jasa-marga.png", alt: "Jasa Marga" },
  { src: "/klien/waskita.png", alt: "Waskita", scale: "scale-115" },
  { src: "/klien/totalindo.png", alt: "Totalindo Building Construction", scale: "scale-110" },
  { src: "/klien/sinarmas.png", alt: "Sinarmas", scale: "scale-110" },
  { src: "/klien/nrc.png", alt: "Nusa Raya Cipta", scale: "scale-110" },
  { src: "/klien/ks.png", alt: "Jaya Konstruksi" },
  { src: "/klien/yasa.png", alt: "Yasa" },
  { src: "/klien/alfa.png", alt: "Alfa" },
  { src: "/klien/sumar.png", alt: "Sumar" },
  { src: "/klien/marunda-center.png", alt: "Marunda Center" },
  { src: "/klien/kst.png", alt: "Krakatau" },
  { src: "/klien/dunkin-donuts.png", alt: "Dunkin Donuts" },
  { src: "/klien/frisian-flag.png", alt: "Frisian Flag", scale: "scale-125" },
  { src: "/klien/polsatwa.png", alt: "Polsatwa" },
  { src: "/klien/mabes-tni.png", alt: "Mabes TNI" },
];

const content = {
  id: {
    eyebrow: "Kepercayaan & Kolaborasi",
    title: "Klien Kami",
    description: "Kepercayaan klien menjadi bagian penting dari setiap pekerjaan yang kami tangani. Kami berkomitmen memberikan hasil konstruksi yang berkualitas, profesional, dan sesuai kebutuhan proyek.",
  },
  en: {
    eyebrow: "Trust & Collaboration",
    title: "Our Clients",
    description: "Client trust is central to every project we undertake. We are committed to delivering quality construction with professionalism and meeting each project's needs.",
  },
};

function ClientLogos({ duplicate = false }) {
  return (
    <ul role="list" aria-hidden={duplicate || undefined} className="client-logos">
      {clients.map(({ src, alt, scale }) => (
        <li key={src} className="client-card grid h-[4.5rem] min-w-0 place-items-center overflow-hidden rounded-xl border border-slate-200 bg-white px-1.5 py-2 transition-colors hover:border-slate-300 sm:h-[5.5rem] sm:px-3 lg:h-24">
          <Image src={src} alt={duplicate ? "" : alt} width={144} height={64} loading="lazy" decoding="async" fetchPriority="low" draggable={false} className={`pointer-events-none h-13 w-full max-w-36 object-contain sm:h-16 ${scale ?? ""}`} />
        </li>
      ))}
    </ul>
  );
}

export default function Clients() {
  const { lang } = useLang();
  const t = content[lang];
  const [mouseOver, setMouseOver] = useState(false);
  const [touching, setTouching] = useState(false);

  function pauseOnTouch(event) {
    if (event.pointerType === "mouse" || !event.isPrimary) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    setTouching(true);
  }

  function resumeAfterTouch(event) {
    if (event.pointerType !== "mouse" && event.isPrimary) setTouching(false);
  }

  return (
    <section aria-labelledby="clients-title" className="border-b border-slate-200 bg-slate-50 pb-10 sm:pb-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white px-3.5 pb-5 pt-6 shadow-sm sm:px-6 sm:py-7 lg:px-8">
          <header className="mx-auto mb-5 max-w-2xl px-1 text-center sm:mb-7">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-blue-700 sm:text-xs">
              {t.eyebrow}
            </p>
            <h2 id="clients-title" className="mt-2 text-3xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              {t.title}<span className="text-blue-700">.</span>
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-pretty text-sm leading-relaxed text-slate-600 sm:text-base">
              {t.description}
            </p>
          </header>
          <div
            className="client-viewport"
            data-paused={mouseOver || touching}
            onPointerEnter={(event) => {
              if (event.pointerType === "mouse") setMouseOver(true);
            }}
            onPointerLeave={(event) => {
              if (event.pointerType === "mouse") setMouseOver(false);
            }}
            onPointerDown={pauseOnTouch}
            onPointerUp={resumeAfterTouch}
            onPointerCancel={resumeAfterTouch}
            onLostPointerCapture={resumeAfterTouch}
          >
            <div className="client-track">
              <ClientLogos />
              <ClientLogos duplicate />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
