"use client";

import Image from "next/image";
import { useLang } from "../context/LanguageContext";

const clients = [
  { src: "/klien/pertamina.png", alt: "Pertamina" },
  { src: "/klien/wika.png", alt: "WIKA" },
  { src: "/klien/jasa-marga.png", alt: "Jasa Marga" },
  { src: "/klien/waskita.png", alt: "Waskita" },
  { src: "/klien/totalindo.png", alt: "Totalindo Building Construction" },
  { src: "/klien/sinarmas.png", alt: "Sinarmas" },
  { src: "/klien/nrc.png", alt: "Nusa Raya Cipta" },
  { src: "/klien/ks.png", alt: "Jaya Konstruksi" },
  { src: "/klien/yasa.png", alt: "Yasa" },
  { src: "/klien/alfa.png", alt: "Alfa" },
  { src: "/klien/sumar.png", alt: "Sumar" },
  { src: "/klien/marunda-center.png", alt: "Marunda Center" },
  { src: "/klien/kst.png", alt: "Krakatau" },
  { src: "/klien/dunkin-donuts.png", alt: "Dunkin Donuts" },
  { src: "/klien/frisian-flag.png", alt: "Frisian Flag" },
  { src: "/klien/polsatwa.png", alt: "Polsatwa" },
  { src: "/klien/mabes-tni.png", alt: "Mabes TNI" },
];

const content = {
  id: { title: "Klien Kami", more: "Lihat klien lainnya" },
  en: { title: "Our Clients", more: "View more clients" },
};

function ClientLogos({ list }) {
  return (
    <ul className="grid grid-cols-3 gap-2.5 sm:grid-cols-6 sm:gap-4">
      {list.map(({ src, alt }) => (
        <li key={src} className="grid h-16 place-items-center rounded-xl border border-slate-200 bg-white p-3 sm:h-20">
          <Image src={src} alt={alt} width={140} height={56} className="h-10 w-full object-contain sm:h-12" />
        </li>
      ))}
    </ul>
  );
}

export default function Clients() {
  const { lang } = useLang();
  const t = content[lang];

  return (
    <section aria-labelledby="clients-title" className="border-y border-slate-200 bg-white py-7 sm:py-9">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 id="clients-title" className="mb-4 text-xl font-semibold tracking-tight text-slate-950 sm:mb-5 sm:text-2xl">{t.title}</h2>
        <ClientLogos list={clients.slice(0, 6)} />
        <details className="mt-3">
          <summary className="w-fit cursor-pointer rounded py-2 text-sm font-semibold text-blue-700 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
            {t.more}
          </summary>
          <div className="mt-2">
            <ClientLogos list={clients.slice(6)} />
          </div>
        </details>
      </div>
    </section>
  );
}
