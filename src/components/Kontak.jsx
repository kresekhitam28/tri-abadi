// src/components/Kontak.jsx
"use client";

import { useState, useEffect, useRef, useCallback, memo } from "react";

// ─────────────────────────────────────────────
// HOOK: DETEKSI MOBILE
// ─────────────────────────────────────────────
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();
    if (mq.addEventListener) {
      mq.addEventListener("change", update);
      return () => mq.removeEventListener("change", update);
    } else {
      mq.addListener(update);
      return () => mq.removeListener(update);
    }
  }, []);
  return isMobile;
}

// ─────────────────────────────────────────────
// HOOK SCROLL
// ─────────────────────────────────────────────
function useInView(threshold = 0.1, enabled = true) {
  const ref = useRef(null);
  const [inView, setInView] = useState(!enabled);

  useEffect(() => {
    if (!enabled) {
      setInView(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -60px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, enabled]);

  return [ref, inView];
}

// ─────────────────────────────────────────────
// KOMPONEN: FADE UP
// ─────────────────────────────────────────────
const FadeUp = memo(function FadeUp({ children, delay = 0, className = "" }) {
  const isMobile = useIsMobile();
  const enabled = !isMobile;
  const [ref, inView] = useInView(0.08, enabled);

  return (
    <div
      ref={ref}
      className={`transition-opacity duration-500 ease-out
                  ${inView ? "opacity-100" : "opacity-0"}
                  ${inView ? "translate-y-0" : "translate-y-6"}
                  ${className}`}
      style={{
        transitionProperty: "opacity, transform",
        transitionDelay: `${delay}ms`,
        contain: "layout paint style",
      }}
    >
      {children}
    </div>
  );
});

// ─────────────────────────────────────────────
// KOMPONEN: SCALE IN
// ─────────────────────────────────────────────
const ScaleIn = memo(function ScaleIn({ children, delay = 0, className = "" }) {
  const isMobile = useIsMobile();
  const enabled = !isMobile;
  const [ref, inView] = useInView(0.08, enabled);

  return (
    <div
      ref={ref}
      className={`transition-opacity duration-500 ease-out
                  ${inView ? "opacity-100 scale-100" : "opacity-0 scale-[0.98]"}
                  ${className}`}
      style={{
        transitionProperty: "opacity, transform",
        transitionDelay: `${delay}ms`,
        contain: "layout paint style",
      }}
    >
      {children}
    </div>
  );
});

// ─────────────────────────────────────────────
// IKON
// ─────────────────────────────────────────────
function IconMail({ className = "w-5 h-5" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 6-10 7L2 6" /></svg>);
}
function IconPhone({ className = "w-5 h-5" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" /></svg>);
}
function IconMapPin({ className = "w-5 h-5" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 10c0 7-8 12-8 12s-8-5-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></svg>);
}
function IconWhatsApp({ className = "w-4 h-4" }) {
  return (<svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>);
}
function IconArrowRight({ className = "w-3.5 h-3.5" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14M13 5l7 7-7 7" /></svg>);
}
function IconCheck({ className = "w-5 h-5" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 6 9 17l-5-5" /></svg>);
}
function IconExternalLink({ className = "w-4 h-4" }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /></svg>);
}

// ─────────────────────────────────────────────
// DATA KONTAK
// ─────────────────────────────────────────────
const EMAIL = "triabadimakmur@gmail.com";
const ALAMAT = "Jl. Al Hidayah RT.06 RW.02, Pondok Jaya, Pondok Aren, Tangerang Selatan";

const MAPS_HREF =
  "https://www.google.com/maps/place/Jasa+Pengaspalan+Tri+Abadi+Makmur/@-6.26941,106.718938,3a,76.8y,90t/data=!3m8!1e2!3m6!1sCIHM0ogKEICAgID8vIfQ4gE!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgrass-cs%2FAABkmLeU-c-ojdzGX1qc673FoBPUi_RCWADNdNqTnzJwYi5eCPGLk3K6jkLQYiGmRkZwzCwVEkX_Vxw_sA__wTHnkXO1IwDyDWi6iwbmkKNUaKMOU-T_PBWwM48fgdT7ggIV2VWhlVVy_Q%3Dw114-h86-k-no!7i1032!8i774!4m7!3m6!1s0x2e69fa837518530d:0x6f054f333f762104!8m2!3d-6.26941!4d106.718938!10e5!16s%2Fg%2F11f3tjdqdc?entry=ttu&g_ep=EgoyMDI2MTAxMy4wIKXMDSoASAFQAw%3D%3D";

const MAPS_EMBED_SRC =
  "https://www.google.com/maps?q=Jasa+Pengaspalan+Tri+Abadi+Makmur&output=embed";

const kontakInfo = [
  {
    Icon: IconMail,
    label: "Email",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
  },
  {
    Icon: IconPhone,
    label: "Telepon / WhatsApp",
    value: "+62 822-5808-9367",
    href: "https://wa.me/6282258089367",
  },
  {
    Icon: IconMapPin,
    label: "Kantor",
    value: ALAMAT,
    href: MAPS_HREF,
  },
];

// ─────────────────────────────────────────────
// SUB-KOMPONEN: Contact Card
// ─────────────────────────────────────────────
const ContactCard = memo(function ContactCard({ item }) {
  const Wrapper = item.href ? "a" : "div";
  const extra = item.href
    ? { href: item.href, target: "_blank", rel: "noreferrer" }
    : {};

  return (
    <Wrapper
      {...extra}
      className={`group flex items-start gap-3.5 p-4
                  border border-slate-200 rounded-xl bg-white
                  transition-colors duration-200
                  ${item.href ? "hover:border-[#1e88e5]/50 cursor-pointer" : ""}`}
      style={{ contain: "layout paint style" }}
    >
      <span className="shrink-0 w-10 h-10 rounded-lg
                       bg-[#1e88e5]/10 text-[#1e88e5]
                       group-hover:bg-[#1e88e5] group-hover:text-white
                       flex items-center justify-center
                       transition-colors duration-200">
        <item.Icon className="w-4 h-4" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="text-[10px] uppercase tracking-[0.2em]
                        text-slate-400 font-semibold mb-0.5">
          {item.label}
        </div>
        <div className="text-[13px] sm:text-[13.5px] text-slate-800 font-medium
                        leading-snug break-words">
          {item.value}
        </div>
      </div>
    </Wrapper>
  );
});

// ─────────────────────────────────────────────
// HALAMAN
// ─────────────────────────────────────────────
export default function Kontak() {
  const [form, setForm] = useState({ nama: "", email: "", pesan: "" });
  const [sent, setSent] = useState(false);
  const isMobile = useIsMobile();

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    console.log(form);
    setSent(true);
    setForm({ nama: "", email: "", pesan: "" });
    setTimeout(() => setSent(false), 5000);
  }, [form]);

  return (
    <div className="bg-white">

      <section className="relative pt-28 lg:pt-36 pb-12 lg:pb-16 overflow-hidden
                          bg-gradient-to-b from-slate-50 via-white to-white">
        {!isMobile && (
          <>
            <div className="absolute -right-40 -top-40 w-[600px] h-[600px] rounded-full
                            bg-[#1e88e5]/[0.04] blur-3xl pointer-events-none" />
            <div className="absolute -left-40 -bottom-20 w-[500px] h-[500px] rounded-full
                            bg-[#1e88e5]/[0.03] blur-3xl pointer-events-none" />
          </>
        )}

        <div className="relative max-w-4xl mx-auto px-4 sm:px-5 lg:px-8 text-center">
          <FadeUp>
            <div className="inline-flex items-center gap-2.5 sm:gap-3 mb-5">
              <span className="w-6 sm:w-10 h-px bg-[#1e88e5]" />
              <span className="text-[10px] sm:text-[11px] uppercase
                               tracking-[0.25em] sm:tracking-[0.3em]
                               text-[#1e88e5] font-semibold">
                Hubungi Kami
              </span>
              <span className="w-6 sm:w-10 h-px bg-[#1e88e5]" />
            </div>
          </FadeUp>

          <FadeUp delay={100}>
            <h1
              className="font-light tracking-tight text-slate-900 leading-[1.05] mb-5"
              style={{ fontSize: "clamp(2rem, 6vw, 3.75rem)" }}
            >
              Mari <span className="font-semibold">Berkolaborasi</span>
              <span className="text-[#1e88e5]">.</span>
            </h1>
          </FadeUp>

          <FadeUp delay={150}>
            <p
              className="text-slate-600 leading-relaxed max-w-2xl mx-auto"
              style={{ fontSize: "clamp(0.875rem, 1.6vw, 1rem)" }}
            >
              Punya pertanyaan, butuh penawaran, atau ingin konsultasi proyek?
              Tim kami siap membantu Anda — dari kebutuhan material hingga
              pengerjaan konstruksi.
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="pb-16 sm:pb-20 lg:pb-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-5 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 sm:gap-6 lg:gap-8">

            <div className="lg:col-span-2">
              <FadeUp>
                <h2
                  className="font-light tracking-tight text-slate-900 mb-2"
                  style={{ fontSize: "clamp(1.25rem, 3vw, 1.5rem)" }}
                >
                  Informasi <span className="font-semibold">Kontak</span>
                </h2>
                <p className="text-slate-500 leading-relaxed mb-5 sm:mb-6"
                   style={{ fontSize: "clamp(0.8125rem, 1.5vw, 0.84375rem)" }}>
                  Hubungi kami melalui salah satu kanal di bawah ini.
                </p>
              </FadeUp>

              <div className="space-y-2.5 sm:space-y-3">
                {kontakInfo.map((item, i) => (
                  <FadeUp key={i} delay={i * 60}>
                    <ContactCard item={item} />
                  </FadeUp>
                ))}
              </div>

              <FadeUp delay={300}>
                <a
                  href="https://wa.me/6282258089367?text=Halo%20Tri%20Abadi%20Makmur%2C%20saya%20ingin%20konsultasi"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Chat WhatsApp"
                  className="group mt-5 sm:mt-6 flex items-center justify-between gap-3
                             p-4 rounded-2xl
                             bg-slate-900 text-white
                             hover:bg-[#1e88e5]
                             transition-colors duration-200"
                  style={{ contain: "layout paint style" }}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="shrink-0 w-10 h-10 rounded-lg
                                     bg-white/10 flex items-center justify-center
                                     group-hover:bg-white/20 transition-colors">
                      <IconWhatsApp className="w-5 h-5" />
                    </span>
                    <div className="min-w-0">
                      <div className="text-[10px] uppercase tracking-[0.2em]
                                      text-[#4da3ff] group-hover:text-white/80
                                      font-semibold mb-0.5 transition-colors">
                        Respon Cepat
                      </div>
                      <div className="text-[13px] font-semibold leading-snug">
                        Chat via WhatsApp
                      </div>
                    </div>
                  </div>
                  <IconArrowRight className="w-4 h-4 shrink-0
                                             transition-transform duration-200
                                             group-hover:translate-x-1" />
                </a>
              </FadeUp>
            </div>

            <div className="lg:col-span-3">
              <FadeUp delay={80}>
                <div className="relative p-5 sm:p-6 lg:p-8 rounded-2xl bg-white
                                border border-slate-200 shadow-sm"
                     style={{ contain: "layout paint style" }}>
                  <h2
                    className="font-light tracking-tight text-slate-900 mb-2"
                    style={{ fontSize: "clamp(1.25rem, 3vw, 1.5rem)" }}
                  >
                    Kirim <span className="font-semibold">Pesan</span>
                  </h2>
                  <p className="text-slate-500 leading-relaxed mb-5 sm:mb-6"
                     style={{ fontSize: "clamp(0.8125rem, 1.5vw, 0.84375rem)" }}>
                    Isi formulir berikut, kami akan merespons dalam 1×24 jam kerja.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                      <div>
                        <label className="block text-[11px] uppercase tracking-[0.15em]
                                          text-slate-500 font-semibold mb-1.5">
                          Nama Lengkap
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Nama Anda"
                          value={form.nama}
                          onChange={(e) => setForm({ ...form, nama: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl
                                     bg-slate-50 border border-slate-200
                                     text-[14px] text-slate-800
                                     placeholder:text-slate-400
                                     focus:outline-none focus:bg-white
                                     focus:border-[#1e88e5]
                                     focus:ring-2 focus:ring-[#1e88e5]/15
                                     transition-colors duration-150"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase tracking-[0.15em]
                                          text-slate-500 font-semibold mb-1.5">
                          Email
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="email@contoh.com"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl
                                     bg-slate-50 border border-slate-200
                                     text-[14px] text-slate-800
                                     placeholder:text-slate-400
                                     focus:outline-none focus:bg-white
                                     focus:border-[#1e88e5]
                                     focus:ring-2 focus:ring-[#1e88e5]/15
                                     transition-colors duration-150"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.15em]
                                        text-slate-500 font-semibold mb-1.5">
                        Pesan
                      </label>
                      <textarea
                        required
                        rows={5}
                        placeholder="Ceritakan kebutuhan proyek Anda…"
                        value={form.pesan}
                        onChange={(e) => setForm({ ...form, pesan: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl resize-none
                                   bg-slate-50 border border-slate-200
                                   text-[14px] text-slate-800
                                   placeholder:text-slate-400
                                   focus:outline-none focus:bg-white
                                   focus:border-[#1e88e5]
                                   focus:ring-2 focus:ring-[#1e88e5]/15
                                   transition-colors duration-150"
                      />
                    </div>

                    <button
                      type="submit"
                      className="group w-full inline-flex items-center justify-center gap-2
                                 px-6 py-3.5 rounded-xl
                                 bg-[#1e88e5] hover:bg-[#1565c0]
                                 text-white font-semibold text-[13px]
                                 uppercase tracking-[0.15em]
                                 shadow-lg shadow-[#1e88e5]/25
                                 hover:shadow-xl hover:shadow-[#1e88e5]/30
                                 transition-colors duration-200"
                    >
                      Kirim Pesan
                      <IconArrowRight className="w-3.5 h-3.5
                                                 transition-transform duration-200
                                                 group-hover:translate-x-1" />
                    </button>

                    <div className={`transition-opacity duration-300 overflow-hidden
                                     ${sent ? "max-h-20 opacity-100 mt-2" : "max-h-0 opacity-0"}`}>
                      <div className="flex items-center gap-2.5 p-3 rounded-xl
                                      bg-emerald-50 border border-emerald-200">
                        <span className="shrink-0 w-6 h-6 rounded-full
                                         bg-emerald-500 text-white
                                         flex items-center justify-center">
                          <IconCheck className="w-3.5 h-3.5" />
                        </span>
                        <span className="text-[13px] text-emerald-700 font-medium">
                          Pesan berhasil dikirim. Terima kasih!
                        </span>
                      </div>
                    </div>
                  </form>
                </div>
              </FadeUp>
            </div>
          </div>

          <FadeUp delay={150}>
            <div className="my-10 sm:my-14 flex items-center gap-4">
              <span className="flex-1 h-px bg-slate-200" />
              <span className="text-[10px] uppercase tracking-[0.3em]
                               text-slate-400 font-semibold">
                Lokasi Kami
              </span>
              <span className="flex-1 h-px bg-slate-200" />
            </div>
          </FadeUp>

          <FadeUp>
            <div className="text-center mb-5 sm:mb-6">
              <h2
                className="font-light tracking-tight text-slate-900 mb-2"
                style={{ fontSize: "clamp(1.25rem, 3vw, 1.5rem)" }}
              >
                Kunjungi <span className="font-semibold">Kantor Kami</span>
              </h2>
              <p className="text-slate-500 leading-relaxed max-w-xl mx-auto"
                 style={{ fontSize: "clamp(0.8125rem, 1.5vw, 0.84375rem)" }}>
                {ALAMAT}
              </p>
            </div>
          </FadeUp>

          <ScaleIn delay={80}>
            <a
              href={MAPS_HREF}
              target="_blank"
              rel="noreferrer"
              aria-label="Buka lokasi di Google Maps"
              className="group block relative rounded-2xl overflow-hidden
                         border border-slate-200 shadow-sm
                         hover:shadow-lg hover:border-[#1e88e5]/40
                         transition-colors duration-200"
              style={{ contain: "layout paint style" }}
            >
              <div className="aspect-[16/10] sm:aspect-[16/9] w-full bg-slate-100">
                <iframe
                  title="Lokasi Tri Abadi Makmur"
                  src={MAPS_EMBED_SRC}
                  className="w-full h-full border-0 pointer-events-none"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="absolute top-3 sm:top-4 right-3 sm:right-4
                              inline-flex items-center gap-1.5 sm:gap-2
                              px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full
                              bg-white/95 backdrop-blur-sm
                              text-[10px] sm:text-[11px] font-semibold text-slate-800
                              shadow-lg shadow-black/10
                              group-hover:bg-[#1e88e5] group-hover:text-white
                              transition-colors duration-200">
                <IconExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                Buka di Google Maps
              </div>

              <div className="absolute bottom-0 inset-x-0
                              bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent
                              px-4 sm:px-6 py-4 sm:py-5 pt-12 sm:pt-16 pointer-events-none">
                <p className="text-white text-[12px] sm:text-[13px] font-medium
                              leading-snug max-w-lg">
                  {ALAMAT}
                </p>
              </div>
            </a>
          </ScaleIn>

        </div>
      </section>
    </div>
  );
}