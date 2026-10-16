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
function IconArrowUpRight({ className = "w-3.5 h-3.5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}
      strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M7 17L17 7M7 7h10v10" />
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
  "https://www.google.com/maps/place/Dharmawangsa+Home+Bintaro+Jaya/@-6.273831,106.7200781,34a,90y,19.13h,88.77t/data=!3m7!1e1!3m5!1sWonZhipQn2hEPrB3eQFafA!2e0!6shttps:%2F%2Fstreetviewpixels-pa.clients6.google.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D1.2297712428963052%26panoid%3DWonZhipQn2hEPrB3eQFafA%26yaw%3D19.13175196936661!7i16384!8i8192!4m14!1m7!3m6!1s0x2e69fbc29f43e389:0x7286b097843dd259!2sDharmawangsa+Home+Bintaro+Jaya!8m2!3d-6.2736745!4d106.720095!16s%2Fg%2F11t5pqszgn!3m5!1s0x2e69fbc29f43e389:0x7286b097843dd259!8m2!3d-6.2736745!4d106.720095!16s%2Fg%2F11t5pqszgn?entry=ttu&g_ep=EgoyMDI2MTAwNy4wIKXMDSoASAFQAw%3D%3D";

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
        className="absolute left-0 -bottom-1.5 w-8 h-[2px] rounded-full
                   bg-gradient-to-r from-[#4da3ff] to-transparent"
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
      className="group relative flex items-start gap-3 sm:gap-4
                 p-4 sm:p-5 lg:p-6
                 rounded-xl sm:rounded-2xl
                 border border-white/10 bg-white/[0.02]
                 hover:bg-white/[0.06] hover:border-[#1e88e5]/40
                 hover:shadow-lg hover:shadow-[#1e88e5]/5
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4da3ff]
                 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950
                 transition-all duration-300"
      style={{ contain: "layout paint style" }}
    >
      <span
        className="shrink-0 w-10 h-10 sm:w-11 sm:h-11
                   rounded-lg sm:rounded-xl
                   flex items-center justify-center
                   bg-[#1e88e5]/15 text-[#4da3ff]
                   group-hover:bg-[#1e88e5] group-hover:text-white
                   group-hover:scale-105 group-hover:shadow-md
                   group-hover:shadow-[#1e88e5]/30
                   transition-all duration-300"
      >
        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[9.5px] sm:text-[10px] uppercase tracking-[0.22em]
                      text-slate-500 font-semibold mb-1
                      group-hover:text-[#4da3ff] transition-colors">
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

      {/* Arrow indicator saat hover */}
      <span
        className="shrink-0 self-start mt-1 w-6 h-6 rounded-full
                   flex items-center justify-center
                   bg-white/5 text-slate-500
                   opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0
                   group-hover:bg-[#1e88e5] group-hover:text-white
                   transition-all duration-300"
        aria-hidden="true"
      >
        <IconArrowUpRight className="w-3 h-3" />
      </span>
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
              className="group inline-flex items-center gap-2
                         text-slate-400 hover:text-[#4da3ff]
                         focus-visible:outline-none focus-visible:text-[#4da3ff]
                         focus-visible:underline focus-visible:underline-offset-4
                         transition-all duration-200"
              style={{ fontSize: "clamp(0.78125rem, 1.5vw, 0.8125rem)" }}
            >
              <span className="w-0 h-px bg-[#4da3ff]
                               group-hover:w-3 transition-all duration-300" />
              <span className="group-hover:translate-x-0.5 transition-transform duration-200">
                {t(item.label)}
              </span>
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
        className="flex items-start gap-3 group
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4da3ff]
                   focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 rounded-md"
      >
        <span className="shrink-0 mt-0.5 text-[#4da3ff]
                         group-hover:scale-110 transition-transform duration-200">
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
                 hover:scale-105 hover:shadow-md hover:shadow-[#1e88e5]/30
                 active:bg-[#1e88e5] active:text-white
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4da3ff]
                 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950
                 transition-all duration-200
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
      className="relative bg-slate-950 overflow-hidden"
      style={{ contain: "layout style" }}
    >
      {/* ═══ BACKGROUND DECORATION ═══ */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 100%)",
        }}
      />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full
                      bg-[#1e88e5]/[0.05] blur-3xl pointer-events-none"
           aria-hidden="true" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full
                      bg-[#1e88e5]/[0.03] blur-3xl pointer-events-none"
           aria-hidden="true" />

      {/* ═══════════ KONTAK CARDS ═══════════ */}
      <div className="relative max-w-6xl md:max-w-7xl mx-auto px-4 sm:px-5 lg:px-8
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
      <div className="relative max-w-6xl md:max-w-7xl mx-auto px-4 sm:px-5 lg:px-8
                      pt-12 sm:pt-14 lg:pt-20 pb-10 sm:pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
                        gap-10 sm:gap-8 lg:gap-12">

          {/* Kolom 1 — Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-4 sm:mb-5">
              <div
                className="font-extrabold tracking-tight leading-tight
                           bg-gradient-to-r from-white to-[#4da3ff]
                           bg-clip-text text-transparent"
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
      <div className="relative border-t border-white/10">
        {/* Gradient fade top */}
        <div
          className="absolute -top-px left-0 right-0 h-px
                     bg-gradient-to-r from-transparent via-[#4da3ff]/30 to-transparent"
          aria-hidden="true"
        />

        <div className="max-w-6xl md:max-w-7xl mx-auto px-4 sm:px-5 lg:px-8 py-5 sm:py-6">
          <p
            className="text-slate-500 text-center leading-relaxed"
            style={{ fontSize: "clamp(0.71875rem, 1.4vw, 0.75rem)" }}
          >
            © {COMPANY_START_YEAR} - {currentYear}{" "}
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
              className="text-slate-300 hover:text-[#4da3ff] transition-colors
                         focus-visible:outline-none focus-visible:underline underline-offset-4"
            >
              {WEBSITE_CREDIT_NAME}
            </a>
          </p>
        </div>
      </div>

    </footer>
  );
}