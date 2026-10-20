// src/components/Footer.jsx
"use client";

import Link from "next/link";
import { useLang } from "../context/LanguageContext";
import { useMemo } from "react";

// ─────────────────────────────────────────────
// IKON
// ─────────────────────────────────────────────
function IconMap({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
      strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function IconMail({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
      strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 6l-10 7L2 6" />
    </svg>
  );
}
function IconPhone({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
      strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
function IconYouTube({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.5 15.5v-7l6.5 3.5-6.5 3.5z" />
    </svg>
  );
}
function IconTikTok({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.87a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.3z" />
    </svg>
  );
}
function IconInstagram({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01" />
    </svg>
  );
}

// ─────────────────────────────────────────────
// DATA STATIS
// ─────────────────────────────────────────────
const socials = [
  { name: "YouTube",   href: "https://www.youtube.com/@TriAbadiMakmur",     Icon: IconYouTube   },
  { name: "TikTok",    href: "https://www.tiktok.com/@spesialisaspal",       Icon: IconTikTok    },
  { name: "Instagram", href: "https://www.instagram.com/triabadi.makmur/",  Icon: IconInstagram },
];

const layananLinks = [
  { label: { id: "Pengaspalan",          en: "Asphalt Paving" },        href: "/layanan/infrastruktur/pengaspalan" },
  { label: { id: "Pasang Kanstin",       en: "Curb Installation" },     href: "/layanan/infrastruktur/pasang-kanstin" },
  { label: { id: "Cor Beton Ready Mix",  en: "Ready-Mix Concrete" },    href: "/layanan/infrastruktur/cor-beton-ready-mix" },
  { label: { id: "Pasang Paving Block",  en: "Paving Block" },          href: "/layanan/infrastruktur/pasang-paving-block" },
  { label: { id: "Pasang Grass Block",   en: "Grass Block" },           href: "/layanan/infrastruktur/pasang-grass-block" },
  { label: { id: "Pasang Pager Panel",   en: "Precast Panel" },         href: "/layanan/infrastruktur/pasang-pager-panel" },
  { label: { id: "Pasang Tiang Pancang", en: "Pile Driving" },          href: "/layanan/infrastruktur/pasang-tiang-pancang" },
  { label: { id: "Konstruksi Bangunan",  en: "Building Construction" }, href: "/layanan/bangunan" },
  { label: { id: "Jasa Arsitektur",      en: "Architecture Services" }, href: "/layanan/arsitektur" },
];

const perusahaanLinks = [
  { label: { id: "Tentang Kami", en: "About Us" },  href: "/tentang-kami" },
  { label: { id: "Layanan",      en: "Services" },  href: "/layanan" },
  { label: { id: "Proyek",       en: "Projects" },  href: "/proyek" },
  { label: { id: "Supplier",     en: "Supplier" },  href: "/supplier" },
  { label: { id: "Kontak",       en: "Contact" },   href: "/kontak" },
];

// ─────────────────────────────────────────────
// KONTEN BILINGUAL
// ─────────────────────────────────────────────
const content = {
  id: {
    visitUs: "Kunjungi Kami",
    emailUs: "Email Kami",
    callUs: "Telepon Kami",
    cityLine: "JL. Al-Hidayah, Pondok Aren, Tangerang Selatan",
    brandTagline: "KONTRAKTOR UMUM",
    brandDesc:
      "Perusahaan yang bergerak di bidang konstruksi dengan pengalaman bertahun-tahun. Mengedepankan kualitas & kehati-hatian untuk kepuasan client.",
    sectionLayanan: "Layanan",
    sectionPerusahaan: "Perusahaan",
    sectionKontak: "Hubungi Kami",
  },
  en: {
    visitUs: "Visit Us",
    emailUs: "Email Us",
    callUs: "Call Us",
    cityLine: "Pondok Aren, South Tangerang",
    streetLine: "Jl. Al-Hidayah",
    brandTagline: "GENERAL CONTRACTOR",
    brandDesc:
      "A construction company with years of experience. We prioritize quality & carefulness to ensure client satisfaction.",
    sectionLayanan: "Services",
    sectionPerusahaan: "Company",
    sectionKontak: "Contact Us",
  },
};

// ─────────────────────────────────────────────
// KONTAK
// ─────────────────────────────────────────────
const EMAIL = "triabadimakmur@gmail.com";

const EMAIL_HREF = `mailto:${EMAIL}?subject=${encodeURIComponent(
  "Konsultasi Proyek"
)}&body=${encodeURIComponent(
  "Halo Tri Abadi Makmur,\n\nSaya ingin berkonsultasi mengenai:\n\n\n\nTerima kasih."
)}`;

const ALAMAT =
  "Jl. Al Hidayah RT.06 RW.02, Pondok Jaya, Pondok Aren, Tangerang Selatan";

const MAPS_HREF =
  "https://www.google.com/maps/place/Jasa+Pengaspalan+Tri+Abadi+Makmur/@-6.26941,106.718938,3a,76.8y,90t/data=!3m8!1e2!3m6!1sCIHM0ogKEICAgID8vIfQ4gE!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgrass-cs%2FAABkmLeU-c-ojdzGX1qc673FoBPUi_RCWADNdNqTnzJwYi5eCPGLk3K6jkLQYiGmRkZwzCwVEkX_Vxw_sA__wTHnkXO1IwDyDWi6iwbmkKNUaKMOU-T_PBWwM48fgdT7ggIV2VWhlVVy_Q%3Dw114-h86-k-no!7i1032!8i774!4m7!3m6!1s0x2e69fa837518530d:0x6f054f333f762104!8m2!3d-6.26941!4d106.718938!10e5!16s%2Fg%2F11f3tjdqdc?entry=ttu&g_ep=EgoyMDI2MTAxMy4wIKXMDSoASAFQAw%3D%3D";

// ─────────────────────────────────────────────
// KONFIGURASI COPYRIGHT
// ─────────────────────────────────────────────
const COMPANY_START_YEAR = 2016;
const COMPANY_LEGAL_NAME = "PT. Tri Abadi Makmur Indonesia";
const WEBSITE_CREDIT_NAME = "spesialisaspal.com";
const WEBSITE_CREDIT_URL = "https://spesialisaspal.com";

// ─────────────────────────────────────────────
// SUB-KOMPONEN: Section Heading
// ─────────────────────────────────────────────
function SectionHeading({ children }) {
  return (
    <h4 className="relative inline-block text-white font-bold mb-5 uppercase tracking-[0.22em]"
        style={{ fontSize: "clamp(0.6875rem, 1.3vw, 0.75rem)" }}>
      {children}
      <span
        className="absolute left-0 -bottom-1.5 w-8 h-[2px] rounded-full bg-[#4da3ff]"
        aria-hidden="true"
      />
    </h4>
  );
}

// ─────────────────────────────────────────────
// SUB-KOMPONEN: Kontak Card
// ─────────────────────────────────────────────
function ContactCard({ href, Icon, label, value, secondary }) {
  const isExternal = href.startsWith("http");
  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="group flex items-start gap-3 sm:gap-4
                 p-4 sm:p-5 lg:p-6
                 rounded-xl sm:rounded-2xl
                 border border-white/10 bg-white/[0.02]
                 hover:bg-white/[0.06] hover:border-[#1e88e5]/40
                 transition-colors duration-200"
      style={{ contain: "layout paint style" }}
    >
      <span
        className="shrink-0 w-10 h-10 sm:w-11 sm:h-11
                   rounded-lg sm:rounded-xl
                   flex items-center justify-center
                   bg-[#1e88e5]/15 text-[#4da3ff]
                   group-hover:bg-[#1e88e5] group-hover:text-white
                   transition-colors duration-200"
      >
        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[9.5px] sm:text-[10px] uppercase tracking-[0.22em]
                      text-slate-500 font-semibold mb-1
                      group-hover:text-[#4da3ff] transition-colors duration-200">
          {label}
        </p>
        <p className="text-white leading-relaxed break-words"
           style={{ fontSize: "clamp(0.78125rem, 1.5vw, 0.84375rem)" }}>
          {value}
        </p>
        {secondary && (
          <p className="text-slate-400 leading-relaxed mt-0.5 break-words"
             style={{ fontSize: "clamp(0.71875rem, 1.4vw, 0.75rem)" }}>
            {secondary}
          </p>
        )}
      </div>
    </a>
  );
}

// ─────────────────────────────────────────────
// SUB-KOMPONEN: Link Column
// ─────────────────────────────────────────────
function LinkColumn({ title, links, t, onNavigate }) {
  return (
    <div style={{ contain: "layout paint style" }}>
      <SectionHeading>{title}</SectionHeading>
      <ul className="space-y-2.5 sm:space-y-3">
        {links.map((item, i) => (
          <li key={i}>
            <Link
              href={item.href}
              onClick={onNavigate}
              className="text-slate-400 hover:text-[#4da3ff]
                         transition-colors duration-150"
              style={{ fontSize: "clamp(0.78125rem, 1.5vw, 0.8125rem)" }}
            >
              {t(item.label)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─────────────────────────────────────────────
// SUB-KOMPONEN: Contact Info Row
// ─────────────────────────────────────────────
function ContactRow({ href, Icon, children, external }) {
  return (
    <li>
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="flex items-start gap-3 group"
      >
        <span className="shrink-0 mt-0.5 text-[#4da3ff]">
          <Icon className="w-4 h-4" />
        </span>
        <span className="text-slate-400 leading-relaxed break-words
                         group-hover:text-[#4da3ff] transition-colors duration-150"
              style={{ fontSize: "clamp(0.78125rem, 1.5vw, 0.8125rem)" }}>
          {children}
        </span>
      </a>
    </li>
  );
}

// ─────────────────────────────────────────────
// SUB-KOMPONEN: Social Icon
// ─────────────────────────────────────────────
function SocialIcon({ name, href, Icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={name}
      title={name}
      className="w-10 h-10 sm:w-9 sm:h-9
                 flex items-center justify-center rounded-lg
                 bg-white/5 text-slate-400 ring-1 ring-white/10
                 hover:bg-[#1e88e5] hover:text-white hover:ring-[#1e88e5]
                 transition-colors duration-200
                 relative z-10 cursor-pointer
                 touch-manipulation select-none"
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      <Icon className="w-4 h-4 pointer-events-none" />
    </a>
  );
}

// ─────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────
export default function Footer() {
  const { lang } = useLang();
  const data = content[lang] || content.id;

  const currentYear = useMemo(() => new Date().getFullYear(), []);

  const t = useMemo(() => {
    return (field) => {
      if (!field) return "";
      if (typeof field === "string") return field;
      return field[lang] || field.id || field.en || "";
    };
  }, [lang]);

  const handleNavigate = useMemo(
    () => () => window.scrollTo({ top: 0, behavior: "instant" }),
    []
  );

  return (
    <footer
      className="relative bg-slate-950"
      style={{ contain: "layout style" }}
    >
      {/* ═══════════ KONTAK CARDS ═══════════ */}
      <div className="max-w-6xl md:max-w-7xl mx-auto px-4 sm:px-5 lg:px-8
                      pt-14 sm:pt-16 lg:pt-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
                        gap-3 sm:gap-4 lg:gap-5">

          <ContactCard
            href={MAPS_HREF}
            Icon={IconMap}
            label={data.visitUs}
            value={data.cityLine}
            secondary={data.streetLine}
          />
          <ContactCard
            href={EMAIL_HREF}
            Icon={IconMail}
            label={data.emailUs}
            value={EMAIL}
          />
          <ContactCard
            href="tel:+6282258089367"
            Icon={IconPhone}
            label={data.callUs}
            value="+62 822-5808-9367"
          />
        </div>
      </div>

      {/* ═══════════ MAIN FOOTER ═══════════ */}
      <div className="max-w-6xl md:max-w-7xl mx-auto px-4 sm:px-5 lg:px-8
                      pt-12 sm:pt-14 lg:pt-20 pb-10 sm:pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
                        gap-10 sm:gap-8 lg:gap-12">

          {/* Kolom 1 — Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-4 sm:mb-5">
              <div
                className="font-extrabold tracking-tight leading-tight text-white"
                style={{ fontSize: "clamp(1rem, 2vw, 1.0625rem)" }}
              >
                TRI ABADI MAKMUR
              </div>
              <div className="text-[10px] tracking-[0.22em] text-[#4da3ff]
                              font-semibold mt-1.5">
                {data.brandTagline}
              </div>
            </div>

            <p className="text-slate-400 leading-[1.8] max-w-md"
               style={{ fontSize: "clamp(0.8125rem, 1.5vw, 0.8125rem)" }}>
              {data.brandDesc}
            </p>

            <div className="flex items-center gap-2 mt-5 sm:mt-6">
              {socials.map(({ name, href, Icon }) => (
                <SocialIcon key={name} name={name} href={href} Icon={Icon} />
              ))}
            </div>
          </div>

          {/* Kolom 2 & 3 — Layanan & Perusahaan */}
          <div className="grid grid-cols-2 gap-8 sm:gap-6 lg:contents">
            <LinkColumn
              title={data.sectionLayanan}
              links={layananLinks}
              t={t}
              onNavigate={handleNavigate}
            />
            <LinkColumn
              title={data.sectionPerusahaan}
              links={perusahaanLinks}
              t={t}
              onNavigate={handleNavigate}
            />
          </div>

          {/* Kolom 4 — Kontak */}
          <div className="sm:col-span-2 lg:col-span-1">
            <SectionHeading>{data.sectionKontak}</SectionHeading>
            <ul className="space-y-3 sm:space-y-3.5">
              <ContactRow href={MAPS_HREF} Icon={IconMap} external>
                {ALAMAT}
              </ContactRow>
              <ContactRow href="tel:+6282258089367" Icon={IconPhone}>
                +62 822-5808-9367
              </ContactRow>
              <ContactRow href="tel:+6282112999002" Icon={IconPhone}>
                +62 821-1299-9002
              </ContactRow>
              <ContactRow href={EMAIL_HREF} Icon={IconMail}>
                {EMAIL}
              </ContactRow>
            </ul>
          </div>

        </div>
      </div>

      {/* ═══════════ BOTTOM BAR ═══════════ */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl md:max-w-7xl mx-auto px-4 sm:px-5 lg:px-8 py-5 sm:py-6">
          <p
            className="text-slate-500 text-center leading-relaxed"
            style={{ fontSize: "clamp(0.71875rem, 1.4vw, 0.75rem)" }}
          >
            © {currentYear}{" "}
            <span className="text-slate-300 font-medium">
              {COMPANY_LEGAL_NAME}
            </span>
            . All Rights Reserved
          </p>

          <p
            className="text-slate-500 text-center leading-relaxed mt-1.5"
            style={{ fontSize: "clamp(0.71875rem, 1.4vw, 0.75rem)" }}
          >
            Website by{" "}
            <a
              href={WEBSITE_CREDIT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-[#4da3ff] transition-colors"
            >
              {WEBSITE_CREDIT_NAME}
            </a>
          </p>
        </div>
      </div>

    </footer>
  );
}