// src/components/Certifications.jsx
"use client";

import { useState, useEffect, useCallback } from "react";

// ─────────────────────────────────────────────
// DAFTAR SERTIFIKAT
// ─────────────────────────────────────────────
const certificates = [
  {
    src: "/sertifikat/sertifikat-1.png",
    alt: "The Best Improvement Contractor Company Of The Year",
    desc: "Penghargaan atas komitmen peningkatan kualitas konstruksi",
  },
  {
    src: "/sertifikat/sertifikat-2.png",
    alt: "Sertifikat Badan Usaha Jasa Konstruksi",
    desc: "Sertifikasi resmi sebagai badan usaha jasa konstruksi",
  },
  {
    src: "/sertifikat/sertifikat-3.png",
    alt: "Sertifikat Klasifikasi & Kualifikasi",
    desc: "Klasifikasi & kualifikasi usaha jasa konstruksi",
  },
];

// ─────────────────────────────────────────────
// IKON
// ─────────────────────────────────────────────
function IconChevronLeft({ className = "w-6 h-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function IconChevronRight({ className = "w-6 h-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

// ─────────────────────────────────────────────
// CERTIFICATIONS
// ─────────────────────────────────────────────
export default function Certifications() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const selected = selectedIndex !== null ? certificates[selectedIndex] : null;

  const goPrev = useCallback(() => {
    setSelectedIndex((prev) =>
      (prev - 1 + certificates.length) % certificates.length
    );
  }, []);

  const goNext = useCallback(() => {
    setSelectedIndex((prev) => (prev + 1) % certificates.length);
  }, []);

  useEffect(() => {
    if (selectedIndex === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selectedIndex, goPrev, goNext]);

  return (
    <>
      <section className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="text-center mb-14 lg:mb-20">
            <div className="inline-flex items-center gap-3 mb-5">
              <span className="w-8 h-px bg-[#1e88e5]" />
              <span className="text-xs uppercase tracking-[0.3em] text-[#1e88e5] font-semibold">
                Internationally Trusted
              </span>
              <span className="w-8 h-px bg-[#1e88e5]" />
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-gray-900 leading-[1.05]">
              Certifications
              <span className="text-[#1e88e5]">.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {certificates.map((item, i) => (
              <button
                key={i}
                onClick={() => setSelectedIndex(i)}
                className="group relative bg-white text-left
                           ring-1 ring-gray-200 hover:ring-2 hover:ring-[#1e88e5]
                           shadow-md hover:shadow-2xl hover:shadow-[#1e88e5]/15
                           hover:-translate-y-1
                           transition-all duration-300 overflow-hidden
                           cursor-pointer"
              >
                <span className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center
                                 bg-white/90 backdrop-blur-sm text-[11px] font-mono font-bold
                                 text-gray-700 ring-1 ring-gray-200">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="overflow-hidden bg-white">
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-auto object-contain
                               group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>

                <div className="p-4 border-t border-gray-100">
                  <p className="text-xs sm:text-sm font-semibold text-gray-900 leading-snug
                                group-hover:text-[#1e88e5] transition-colors line-clamp-2">
                    {item.alt}
                  </p>
                </div>

                <div className="absolute inset-0 bg-[#1e88e5]/0 group-hover:bg-[#1e88e5]/5
                                pointer-events-none transition-colors duration-300" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {selected && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md
                     flex items-center justify-center
                     animate-[fadeIn_0.2s_ease-out]"
          onClick={() => setSelectedIndex(null)}
        >
          <div className="absolute top-5 left-5 text-white/60 text-sm font-mono z-10">
            {String(selectedIndex + 1).padStart(2, "0")} / {String(certificates.length).padStart(2, "0")}
          </div>

          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute top-5 right-5 w-11 h-11 flex items-center justify-center
                       text-white/70 hover:text-white bg-white/10 hover:bg-white/20
                       rounded-full transition-colors z-10"
            aria-label="Tutup"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5}
              strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {certificates.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-3 sm:left-6 z-10 w-11 h-11 sm:w-12 sm:h-12
                         flex items-center justify-center
                         text-white/70 hover:text-white bg-white/10 hover:bg-white/20
                         rounded-full transition-colors"
              aria-label="Sebelumnya"
            >
              <IconChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          )}

          <div
            className="max-w-4xl w-full mx-auto px-16 sm:px-20"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selected.src}
              alt={selected.alt}
              className="w-full h-auto max-h-[75vh] object-contain mx-auto bg-white"
            />
            <div className="text-center mt-6">
              <h3 className="text-white text-lg sm:text-xl font-semibold">
                {selected.alt}
              </h3>
              {selected.desc && (
                <p className="text-white/60 text-sm mt-1.5">{selected.desc}</p>
              )}
            </div>
          </div>

          {certificates.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-3 sm:right-6 z-10 w-11 h-11 sm:w-12 sm:h-12
                         flex items-center justify-center
                         text-white/70 hover:text-white bg-white/10 hover:bg-white/20
                         rounded-full transition-colors"
              aria-label="Berikutnya"
            >
              <IconChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          )}
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </>
  );
}