// src/components/Navbar.jsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useLang } from "../context/LanguageContext";
import NavLink from "./NavLink";

// ═════════════════════════════════════════════
// KONFIGURASI BRAND
// ═════════════════════════════════════════════
const BRAND = {
  name: "TRI ABADI MAKMUR",
  tagline: "GENERAL CONTRACTOR & SUPPLIER",
  logo: "/logo.webp",
  homeTo: "/",
};

// ─────────────────────────────────────────────
// STRUKTUR MENU
// ─────────────────────────────────────────────
const menu = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/tentang-kami" },
  {
    label: "Services",
    to: "/layanan",
    children: [
      {
        label: "Konstruksi Infrastruktur",
        expandDown: true,
        children: [
          { label: "Pengaspalan",           to: "/layanan/infrastruktur/pengaspalan" },
          { label: "Pasang Kanstin",        to: "/layanan/infrastruktur/pasang-kanstin" },
          { label: "Cor Beton Ready Mix",   to: "/layanan/infrastruktur/cor-beton-ready-mix" },
          { label: "Pasang Grass Block",    to: "/layanan/infrastruktur/pasang-grass-block" },
          { label: "Pasang Paving Block",   to: "/layanan/infrastruktur/pasang-paving-block" },
          { label: "Pasang Pager Panel",    to: "/layanan/infrastruktur/pasang-pager-panel" },
          { label: "Pasang Tiang Pancang",  to: "/layanan/infrastruktur/pasang-tiang-pancang" },
        ],
      },
      { label: "Konstruksi Bangunan", to: "/layanan/bangunan" },
      { label: "Jasa Arsitektur",     to: "/layanan/arsitektur" },
    ],
  },
  { label: "Projects", to: "/proyek" },
  {
    label: "Supplier",
    to: "/supplier",
    align: "right",
    children: [
      { label: "Abu Batu",               to: "/supplier/abu-batu" },
      { label: "Base Course",            to: "/supplier/base-course" },
      { label: "Batu Kali / Batu Belah", to: "/supplier/batu-kali" },
      { label: "Batu Makadam",           to: "/supplier/batu-makadam" },
      { label: "Batu Split",             to: "/supplier/batu-split" },
      { label: "Kerikil",                to: "/supplier/kerikil" },
      { label: "Pasir Beton",            to: "/supplier/pasir-beton" },
      { label: "Pasir Pasang",           to: "/supplier/pasir-pasang" },
      { label: "Sirtu",                  to: "/supplier/sirtu" },
      { label: "Tanah Urug",             to: "/supplier/tanah-urug" },
    ],
  },
  {
    label: "Heavy Equipment",
    to: "/alat-berat",
    align: "right",
    children: [
      { label: "Dozer",                to: "/heavy-equipment/dozer" },
      { label: "Excavator / Backhoe",  to: "/heavy-equipment/excavator" },
      { label: "Self Loader",          to: "/heavy-equipment/self-loader" },
      { label: "Tandem Roller",        to: "/heavy-equipment/tandem-roller" },
      { label: "Double Drum Roller",   to: "/heavy-equipment/double-drum-roller" },
      { label: "Pneumatic Roller",     to: "/heavy-equipment/pneumatic-roller" },
      { label: "Baby Roller",          to: "/heavy-equipment/baby-roller" },
      { label: "Asphalt Finisher",     to: "/heavy-equipment/asphalt-finisher" },
      { label: "Tronton / Dump Truck", to: "/heavy-equipment/tronton-dump-truck" },
    ],
  },
];

// ─────────────────────────────────────────────
// TERJEMAHAN LABEL MENU
// ─────────────────────────────────────────────
const translations = {
  id: {
    Home: "Beranda",
    "About Us": "Tentang Kami",
    Services: "Layanan",
    Projects: "Proyek",
    Supplier: "Supplier",
    "Heavy Equipment": "Alat Berat",
    "Konstruksi Infrastruktur": "Konstruksi Infrastruktur",
    "Konstruksi Bangunan": "Konstruksi Bangunan",
    "Jasa Arsitektur": "Jasa Arsitektur",
    "Tronton / Dump Truck": "Tronton / Dump Truck",
  },
  en: {
    Home: "Home",
    "About Us": "About Us",
    Services: "Services",
    Projects: "Projects",
    Supplier: "Supplier",
    "Heavy Equipment": "Heavy Equipment",
  },
};

// ─────────────────────────────────────────────
// ICON: Chevron
// ─────────────────────────────────────────────
function ChevronDown({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}
function ChevronRight({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}

// ─────────────────────────────────────────────
// ICON: Bendera
// ─────────────────────────────────────────────
function FlagID({ className = "w-5 h-3.5" }) {
  return (
    <svg viewBox="0 0 24 16" className={className} aria-hidden="true">
      <rect width="24" height="16" fill="#ffffff" />
      <rect width="24" height="8" fill="#CE1126" />
    </svg>
  );
}
function FlagEN({ className = "w-5 h-3.5" }) {
  return (
    <svg viewBox="0 0 24 16" className={className} aria-hidden="true">
      <rect width="24" height="16" fill="#012169" />
      <path d="M0 0 L24 16 M24 0 L0 16" stroke="#ffffff" strokeWidth="3" />
      <path d="M0 0 L24 16 M24 0 L0 16" stroke="#C8102E" strokeWidth="1.6" />
      <path d="M12 0 V16 M0 8 H24" stroke="#ffffff" strokeWidth="4" />
      <path d="M12 0 V16 M0 8 H24" stroke="#C8102E" strokeWidth="2.2" />
    </svg>
  );
}

// ─────────────────────────────────────────────
// ICON: Globe
// ─────────────────────────────────────────────
function IconGlobe({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
         className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
    </svg>
  );
}

// ─────────────────────────────────────────────
// DAFTAR BAHASA + BENDERA
// ─────────────────────────────────────────────
const LANGS = [
  { code: "id", label: "Indonesia", Flag: FlagID },
  { code: "en", label: "English",   Flag: FlagEN },
];

// ═════════════════════════════════════════════
// LANGUAGE SWITCHER (DESKTOP)
// ═════════════════════════════════════════════
function LanguageSwitcher({ lang, setLang }) {
  return (
    <div className="inline-flex items-center gap-0.5 p-0.5
                    rounded-full
                    bg-slate-50
                    border border-slate-200
                    shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      {LANGS.map((l) => {
        const Flag = l.Flag;
        const active = lang === l.code;
        return (
          <button
            key={l.code}
            type="button"
            onClick={() => setLang(l.code)}
            aria-label={`Ganti ke ${l.label}`}
            title={l.label}
            className={`relative flex items-center justify-center
                        w-9 h-7 rounded-full
                        transition-all duration-300 cursor-pointer
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e88e5]
                        ${active
                          ? "bg-white shadow-[0_1px_3px_rgba(30,136,229,0.25)]"
                          : "hover:bg-white/60 opacity-60 hover:opacity-100"}`}
          >
            <Flag
              className={`w-5 h-3.5 rounded-[2px] transition-all duration-300
                          ${active ? "ring-[0.5px] ring-slate-300" : ""}`}
            />
            <span
              className={`absolute bottom-0.5 left-1/2 -translate-x-1/2
                          h-[2px] rounded-full
                          transition-all duration-300
                          ${active ? "w-4 bg-[#1e88e5]" : "w-0 bg-transparent"}`}
              aria-hidden="true"
            />
          </button>
        );
      })}
    </div>
  );
}

// ═════════════════════════════════════════════
// LANGUAGE SWITCHER (MOBILE)
// ═════════════════════════════════════════════
function LanguageToggleMobile({ lang, setLang }) {
  return (
    <div className="flex items-center justify-between px-1 py-4
                    border-t border-slate-100 mt-3">
      <div className="flex items-center gap-2 text-[13px] font-semibold text-slate-600">
        <IconGlobe className="w-4 h-4" />
        Bahasa
      </div>

      <div className="inline-flex items-center gap-0.5 p-0.5
                      rounded-full
                      bg-slate-50
                      border border-slate-200
                      shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
        {LANGS.map((l) => {
          const Flag = l.Flag;
          const active = lang === l.code;
          return (
            <button
              key={l.code}
              type="button"
              onClick={() => setLang(l.code)}
              aria-label={`Ganti ke ${l.label}`}
              className={`relative flex items-center justify-center
                          w-10 h-8 rounded-full
                          transition-all duration-300 cursor-pointer
                          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e88e5]
                          ${active
                            ? "bg-white shadow-[0_1px_3px_rgba(30,136,229,0.25)]"
                            : "hover:bg-white/60 opacity-60 hover:opacity-100"}`}
            >
              <Flag
                className={`w-6 h-4 rounded-[2px] transition-all duration-300
                            ${active ? "ring-[0.5px] ring-slate-300" : ""}`}
              />
              <span
                className={`absolute bottom-0.5 left-1/2 -translate-x-1/2
                            h-[2px] rounded-full
                            transition-all duration-300
                            ${active ? "w-5 bg-[#1e88e5]" : "w-0 bg-transparent"}`}
                aria-hidden="true"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// LOGO BRAND
// ─────────────────────────────────────────────
function BrandLogo() {
  return (
    <Link
      href={BRAND.homeTo}
      className="flex items-center gap-2.5 sm:gap-3 shrink-0
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e88e5]
                 focus-visible:ring-offset-2 rounded-lg"
      aria-label={BRAND.name}
    >
      <img
        src={BRAND.logo}
        alt={BRAND.name}
        draggable={false}
        className="h-11 sm:h-13 lg:h-15 w-auto object-contain"
        style={{
          imageRendering: "-webkit-optimize-contrast",
          filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.08))",
        }}
        onError={(e) => { e.target.style.display = "none"; }}
      />

      <div className="leading-tight">
        <div className="text-[13px] sm:text-[14.5px] lg:text-[15.5px] font-extrabold tracking-tight text-slate-900">
          {BRAND.name}
        </div>
        <div className="text-[8.5px] sm:text-[9px] lg:text-[9.5px] tracking-[0.18em] mt-0.5 font-semibold text-slate-500">
          {BRAND.tagline}
        </div>
      </div>
    </Link>
  );
}

// ─────────────────────────────────────────────
// DROPDOWN ITEM — NESTED KE KANAN
// ─────────────────────────────────────────────
function DropdownItem({ item }) {
  return (
    <li className="relative group/sub">
      <NavLink
        to={item.to}
        className={({ isActive }) =>
          `relative flex items-center justify-between gap-4 px-4 py-2.5 text-[13.5px]
           text-slate-700 hover:bg-slate-50 hover:text-[#1e88e5]
           transition-all duration-200 whitespace-nowrap
           focus-visible:outline-none focus-visible:bg-slate-50
           ${isActive ? "text-[#1e88e5] bg-slate-50 font-semibold" : ""}`
        }
      >
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-0
                         bg-[#1e88e5] rounded-r
                         group-hover/sub:h-6 transition-all duration-300" />

        <span className="flex items-center gap-2.5
                         transition-transform duration-300
                         group-hover/sub:translate-x-0.5">
          <span className="w-1 h-1 rounded-full bg-slate-300
                           group-hover/sub:bg-[#1e88e5] transition-colors" />
          {item.label}
        </span>

        {item.children && (
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0
                                   transition-all duration-300
                                   group-hover/sub:translate-x-0.5
                                   group-hover/sub:text-[#1e88e5]" />
        )}
      </NavLink>

      {item.children && (
        <ul
          className="absolute left-full top-0 ml-1 min-w-[220px]
                     bg-white border border-slate-100 rounded-xl
                     shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] py-2
                     opacity-0 invisible translate-x-1
                     group-hover/sub:opacity-100 group-hover/sub:visible group-hover/sub:translate-x-0
                     transition-all duration-200 ease-out"
        >
          {item.children.map((child) => (
            <DropdownItem key={child.label} item={child} />
          ))}
        </ul>
      )}
    </li>
  );
}

// ─────────────────────────────────────────────
// EXPANDABLE ITEM — SUBMENU KE BAWAH
// ─────────────────────────────────────────────
function ExpandableItem({ item }) {
  const [open, setOpen] = useState(true);

  return (
    <li className="relative">
      <div className="flex items-center">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="relative flex-1 flex items-center gap-2.5 px-4 py-2.5 text-[13.5px]
                     text-slate-700 hover:bg-slate-50 hover:text-[#1e88e5]
                     transition-colors duration-200 text-left cursor-pointer
                     focus-visible:outline-none focus-visible:bg-slate-50"
        >
          <span className="w-1 h-1 rounded-full bg-slate-300" />
          {item.label}
        </button>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-label="Toggle submenu"
          aria-expanded={open}
          className="mr-2 p-1 text-slate-400 hover:text-[#1e88e5] transition-colors
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e88e5] rounded"
        >
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-300 ${
              open ? "rotate-180 text-[#1e88e5]" : ""
            }`}
          />
        </button>
      </div>

      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
          open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="ml-4 mt-0.5 space-y-0.5 border-l border-slate-100 pl-3 pb-1">
          {item.children.map((child) => (
            <li key={child.label}>
              <NavLink
                to={child.to}
                className={({ isActive }) =>
                  `block px-3 py-2 text-[13px] rounded-md
                   transition-all duration-200
                   ${isActive
                     ? "text-[#1e88e5] bg-slate-50 font-medium"
                     : "text-slate-600 hover:text-[#1e88e5] hover:bg-slate-50 hover:translate-x-0.5"}`
                }
              >
                {child.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

// ─────────────────────────────────────────────
// PARENT MENU DESKTOP
// ─────────────────────────────────────────────
function ParentMenuButton({ item, lang }) {
  const [open, setOpen] = useState(false);
  const label = translations[lang]?.[item.label] || item.label;
  const isRight = item.align === "right";

  return (
    <div className="relative group">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="relative flex items-center gap-1.5 px-3 py-2 text-[14px] rounded-lg
                   font-medium tracking-tight transition-all duration-300 cursor-pointer
                   text-slate-700 hover:text-[#1e88e5] hover:bg-slate-100/70
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e88e5]"
      >
        {label}
        <ChevronDown
          className="w-3 h-3 text-slate-400 transition-transform duration-300
                     group-hover:rotate-180 group-hover:text-[#1e88e5]"
        />

        <span className="absolute left-3 right-3 -bottom-0.5 h-0.5
                         bg-[#1e88e5] scale-x-0 group-hover:scale-x-100
                         origin-left transition-transform duration-500 rounded-full" />
      </button>

      {/* Dropdown panel */}
      <div
        className={`absolute top-full mt-3 min-w-[260px]
                   bg-white border border-slate-100 rounded-2xl
                   shadow-[0_20px_60px_-15px_rgba(0,0,0,0.18)]
                   py-2
                   opacity-0 invisible translate-y-2
                   group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
                   transition-all duration-300 ease-out
                   before:content-[''] before:absolute before:-top-3 before:left-0 before:right-0 before:h-3
                   ${isRight ? "right-0" : "left-0"}`}
      >
        {/* Arrow indicator — posisi menyesuaikan align panel */}
        <span
          className={`absolute -top-1.5 w-3 h-3 bg-white border-l border-t border-slate-100
                      rotate-45 rounded-tl-sm
                      ${isRight ? "right-6" : "left-6"}`}
          aria-hidden="true"
        />

        <ul className="relative">
          {item.children.map((child) =>
            child.expandDown ? (
              <ExpandableItem key={child.label} item={child} />
            ) : (
              <DropdownItem key={child.label} item={child} />
            )
          )}
        </ul>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MOBILE ITEM (REKURSIF)
// ─────────────────────────────────────────────
function MobileItem({ item, onNavigate, lang, level = 0 }) {
  const [open, setOpen] = useState(false);
  const hasChildren = Boolean(item.children);
  const label = translations[lang]?.[item.label] || item.label;

  return (
    <li>
      <div className="flex items-center">
        {hasChildren ? (
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className={`flex-1 py-3 text-left transition-colors cursor-pointer
             focus-visible:outline-none
             ${level === 0
               ? "text-[15px] font-semibold text-slate-800 hover:text-[#1e88e5]"
               : "text-[14px] text-slate-600 hover:text-[#1e88e5]"}`}
          >
            {label}
          </button>
        ) : (
          <NavLink
            to={item.to}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex-1 py-3 transition-colors
               focus-visible:outline-none
               ${level === 0
                 ? "text-[15px] font-semibold text-slate-800 hover:text-[#1e88e5]"
                 : "text-[14px] text-slate-600 hover:text-[#1e88e5]"}
               ${isActive ? "text-[#1e88e5]" : ""}`
            }
          >
            {label}
          </NavLink>
        )}

        {hasChildren && (
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="p-2 text-slate-400 hover:text-[#1e88e5] transition-colors
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e88e5] rounded"
            aria-label="Toggle submenu"
            aria-expanded={open}
          >
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-300 ${
                open ? "rotate-180 text-[#1e88e5]" : ""
              }`}
            />
          </button>
        )}
      </div>

      {hasChildren && (
        <div
          className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
            open ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <ul
            className={`mt-1 space-y-0.5 border-l-2 border-slate-100 ${
              level === 0 ? "ml-1 pl-4" : "ml-1 pl-3"
            }`}
          >
            {item.children.map((child) => (
              <MobileItem
                key={child.label}
                item={child}
                onNavigate={onNavigate}
                lang={lang}
                level={level + 1}
              />
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}

// ─────────────────────────────────────────────
// NAVBAR UTAMA
// ─────────────────────────────────────────────
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { lang, setLang } = useLang();

  // Scroll detection
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Body scroll lock saat mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50
                    bg-white/95 backdrop-blur-md
                    border-b transition-all duration-300
                    ${scrolled
                      ? "border-slate-200 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.08)]"
                      : "border-slate-100 shadow-[0_1px_0_rgba(0,0,0,0.02)]"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
          <div className={`flex items-center justify-between transition-all duration-300
                          ${scrolled ? "h-[68px] sm:h-[72px]" : "h-[72px] sm:h-[76px]"}`}>

            {/* KIRI: Logo + Brand */}
            <BrandLogo />

            {/* KANAN: Desktop Menu + Language */}
            <div className="hidden lg:flex items-center gap-4 xl:gap-6">
              <nav>
                <ul className="flex items-center gap-5 xl:gap-7">
                  {menu.map((item) =>
                    item.children ? (
                      <li key={item.label}>
                        <ParentMenuButton item={item} lang={lang} />
                      </li>
                    ) : (
                      <li key={item.label} className="relative">
                        <NavLink
                          to={item.to}
                          className={({ isActive }) =>
                            `relative flex items-center gap-1.5 px-1 py-2 text-[14px]
                             font-medium tracking-tight transition-all duration-300
                             text-slate-700 hover:text-[#1e88e5]
                             focus-visible:outline-none focus-visible:text-[#1e88e5]
                             ${isActive ? "!text-[#1e88e5]" : ""}`
                          }
                        >
                          {translations[lang]?.[item.label] || item.label}
                        </NavLink>
                      </li>
                    )
                  )}
                </ul>
              </nav>

              <span className="w-px h-6 bg-slate-200" />

              <LanguageSwitcher lang={lang} setLang={setLang} />
            </div>

            {/* MOBILE: HANYA HAMBURGER */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="relative w-10 h-10 flex items-center justify-center rounded-lg
                           text-slate-900 hover:bg-slate-100 transition-colors
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e88e5]"
                aria-label="Toggle menu"
                aria-expanded={mobileOpen}
              >
                <div className="w-6 h-4 relative">
                  <span
                    className={`absolute left-0 w-6 h-0.5 bg-current rounded transition-all duration-300 ${
                      mobileOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
                    }`}
                  />
                  <span
                    className={`absolute left-0 top-1/2 -translate-y-1/2 w-6 h-0.5 bg-current rounded transition-all duration-200 ${
                      mobileOpen ? "opacity-0" : "opacity-100"
                    }`}
                  />
                  <span
                    className={`absolute left-0 w-6 h-0.5 bg-current rounded transition-all duration-300 ${
                      mobileOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── MOBILE MENU ── */}
      <div
        className={`lg:hidden fixed inset-0 z-40 transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div
          className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />

        <nav
          className={`absolute top-[72px] sm:top-[76px] left-0 right-0 bottom-0
                     bg-white overflow-y-auto
                     shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.1)]
                     transition-transform duration-300 ease-out
                     ${mobileOpen ? "translate-y-0" : "-translate-y-4"}`}
        >
          <ul className="px-6 py-6 space-y-1">
            {menu.map((item) => (
              <MobileItem
                key={item.label}
                item={item}
                onNavigate={() => setMobileOpen(false)}
                lang={lang}
              />
            ))}
          </ul>

          <div className="px-6 pb-8 mb-24">
            <LanguageToggleMobile lang={lang} setLang={setLang} />
          </div>
        </nav>
      </div>
    </>
  );
}