// src/components/BlogDetail.jsx
"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useLang } from "../context/LanguageContext";
import { getArticleBySlug } from "../data/articles";

// ─────────────────────────────────────────────
// KONFIGURASI SITE URL (untuk share link)
// ─────────────────────────────────────────────
const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://spesialisaspal.com"
).replace(/\/$/, "");

// ─────────────────────────────────────────────
// HOOK: deteksi mobile
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
// HOOK: REVEAL ON SCROLL
// ─────────────────────────────────────────────
function useReveal(options = {}) {
  const {
    threshold = 0.12,
    rootMargin = "0px 0px -60px 0px",
    once = true,
    enabled = true,
  } = options;

  const ref = useRef(null);
  const [visible, setVisible] = useState(!enabled);

  useEffect(() => {
    if (!enabled) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) io.unobserve(entry.target);
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold, rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin, once, enabled]);

  return [ref, visible];
}

// ─────────────────────────────────────────────
// KOMPONEN: REVEAL WRAPPER
// ─────────────────────────────────────────────
function Reveal({
  children,
  delay = 0,
  y = 24,
  duration = 700,
  as: Tag = "div",
  className = "",
}) {
  const isMobile = useIsMobile();
  const enabled = !isMobile;
  const [ref, visible] = useReveal({ enabled });

  const style = useMemo(() => {
    if (!enabled) {
      return { contain: "layout paint style" };
    }
    return {
      transitionProperty: "opacity, transform",
      transitionDuration: `${duration}ms`,
      transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
      transitionDelay: `${delay}ms`,
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : `translateY(${y}px)`,
      willChange: visible ? "auto" : "opacity, transform",
      contain: "layout paint style",
    };
  }, [enabled, visible, duration, delay, y]);

  return (
    <Tag ref={ref} style={style} className={className}>
      {children}
    </Tag>
  );
}

// ─────────────────────────────────────────────
// IKON
// ─────────────────────────────────────────────
const I = {
  Tag: ({ c = "w-3.5 h-3.5" }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={c}>
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.83z" />
      <circle cx="7" cy="7" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  ),
  Share: ({ c = "w-3.5 h-3.5" }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={c}>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
    </svg>
  ),
  WA: ({ c = "w-4 h-4" }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={c}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  ),
  Link: ({ c = "w-4 h-4" }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={c}>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  ),
  Check: ({ c = "w-4 h-4" }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" className={c}>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  ),
};

// ─────────────────────────────────────────────
// HELPER: pick bilingual
// ─────────────────────────────────────────────
const pick = (field, lang) => {
  if (!field) return "";
  if (typeof field === "string") return field;
  return field[lang] || field.id || field.en || "";
};

// ─────────────────────────────────────────────
// KONTEN BILINGUAL
// ─────────────────────────────────────────────
const content = {
  id: {
    notFoundTitle: "Artikel tidak ditemukan",
    tagsLabel: "Tag",
    shareLabel: "Bagikan",
    commentTitle: "Tinggalkan Komentar",
    commentNote: "Komentar Anda akan dikirim ke email kami.",
    placeholderComment: "Komentar Anda...",
    placeholderName: "Nama",
    placeholderEmail: "Email",
    btnSending: "Mengirim...",
    btnSuccess: "Terkirim!",
    btnError: "Gagal. Coba lagi.",
    btnIdle: "Kirim Komentar",
    authorBio:
      "Tri Abadi makmur merupakan perusahaan yang bergerak di bidang konstruksi, dengan pengalaman yang sudah bertahun – tahun kami kembangkan, tahapan proses yang mengedepankan kualitas dan kehati-hatian, serta eksekusi pengerjaan proyek yang signifikan, demi tercapainya kepuasan client sehingga terwujudnya jalinan kerjasama yang continue dan berkelanjutan.",
    authorDesc:
      "Kami menyediakan jasa pengaspalan berkualitas dengan hasil rapi dan tahan lama.",
    copied: "Link disalin!",
    share: "Bagikan",
    copyLink: "Salin Link",
  },
  en: {
    notFoundTitle: "Article not found",
    tagsLabel: "Tags",
    shareLabel: "Share",
    commentTitle: "Leave a Comment",
    commentNote: "Your comment will be sent to our email.",
    placeholderComment: "Your comment...",
    placeholderName: "Name",
    placeholderEmail: "Email",
    btnSending: "Sending...",
    btnSuccess: "Sent!",
    btnError: "Failed. Try again.",
    btnIdle: "Send Comment",
    authorBio:
      "Tri Abadi Makmur is a construction company with years of experience we have developed, a process that prioritizes quality and prudence, as well as the execution of significant projects, in order to achieve client satisfaction so that continuous and long-term cooperation is realized.",
    authorDesc:
      "We provide quality asphalt paving services with neat and durable results.",
    copied: "Link copied!",
    share: "Share",
    copyLink: "Copy Link",
  },
};

// ─────────────────────────────────────────────
// RENDER TAG ITEM
// ─────────────────────────────────────────────
function TagItem({ tag, lang, className }) {
  const isObj = typeof tag === "object" && tag !== null;
  const label = isObj ? pick(tag, lang) : tag;
  const slug = isObj && tag.slug ? tag.slug : null;

  if (slug) {
    return (
      <Link href={`/blog/${slug}`} className={className}>
        {label}
      </Link>
    );
  }
  return <span className={className}>{label}</span>;
}

// ─────────────────────────────────────────────
// BODY RENDERER
// ─────────────────────────────────────────────
function ArticleBody({ body, lang }) {
  let firstParagraphDone = false;

  return (
    <div className="space-y-5 sm:space-y-6">
      {body.map((block, i) => {
        if (block.type === "heading") {
          return (
            <Reveal key={i} y={16}>
              <h2
                className="pt-3 sm:pt-4 font-semibold text-slate-900 leading-snug tracking-tight"
                style={{ fontSize: "clamp(1.0625rem, 2.2vw, 1.375rem)" }}
              >
                {pick(block.text, lang)}
              </h2>
            </Reveal>
          );
        }

        if (block.type === "paragraph") {
          const isFirst = !firstParagraphDone;
          firstParagraphDone = true;
          const text = pick(block.text, lang);

          return (
            <Reveal key={i} y={14}>
              {isFirst ? (
                <p className="text-slate-700 leading-[1.9] sm:leading-[1.95]
                              first-letter:float-left first-letter:mr-2 first-letter:mt-1
                              first-letter:text-[42px] sm:first-letter:text-[46px]
                              first-letter:font-semibold
                              first-letter:leading-[0.9] first-letter:text-[#1e88e5]"
                   style={{ fontSize: "clamp(0.9375rem, 1.8vw, 0.96875rem)" }}
                >
                  {text}
                </p>
              ) : (
                <p
                  className="text-slate-700 leading-[1.9] sm:leading-[1.95]"
                  style={{ fontSize: "clamp(0.9375rem, 1.8vw, 0.96875rem)" }}
                >
                  {text}
                </p>
              )}
            </Reveal>
          );
        }

        if (block.type === "list") {
          const Tag = block.ordered ? "ol" : "ul";
          return (
            <Reveal key={i} y={14}>
              <Tag
                className={`${block.ordered ? "list-decimal" : "list-disc"}
                            list-outside pl-5 sm:pl-6 space-y-2.5 sm:space-y-3
                            text-slate-700 leading-[1.85] sm:leading-[1.9]
                            marker:text-[#1e88e5] marker:font-semibold`}
                style={{ fontSize: "clamp(0.875rem, 1.7vw, 0.9375rem)" }}
              >
                {block.items.map((it, j) => (
                  <li key={j}>{pick(it, lang)}</li>
                ))}
              </Tag>
            </Reveal>
          );
        }

        if (block.type === "tags") {
          return (
            <Reveal key={i} y={14}>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {block.items.map((tag, j) => (
                  <TagItem
                    key={j}
                    tag={tag}
                    lang={lang}
                    className="inline-block px-2.5 py-1 rounded-md
                               bg-slate-50 border border-slate-200
                               text-[11px] text-slate-600 font-medium
                               hover:border-[#1e88e5]/50 hover:text-[#1e88e5]
                               transition-colors"
                  />
                ))}
              </div>
            </Reveal>
          );
        }

        return null;
      })}
    </div>
  );
}

// ─────────────────────────────────────────────
// HALAMAN
// ─────────────────────────────────────────────
export default function BlogDetail() {
  const { slug } = useParams();
  const { lang } = useLang();
  const article = getArticleBySlug(slug);
  const t = content[lang] || content.id;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState("idle");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  const pageUrl = useMemo(() => `${SITE_URL}/blog/${slug}`, [slug]);

  const title = article ? pick(article.title, lang) : "";
  const shareText = useMemo(
    () => encodeURIComponent(title + " — " + pageUrl),
    [title, pageUrl]
  );

  const visibleTags = useMemo(() => {
    if (!article?.tags?.length) return [];
    return article.tags
      .filter((tag) => {
        const s = typeof tag === "object" && tag !== null ? tag.slug : null;
        return !s || s !== article.slug;
      })
      .slice(0, 8);
  }, [article]);

  const handleShare = useCallback(async () => {
    const shareData = { title, text: title, url: pageUrl };

    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share(shareData);
        return;
      }
    } catch (err) {
      if (err && err.name === "AbortError") return;
      console.error("Share error:", err);
    }

    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(`${title} — ${pageUrl}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error("Clipboard error:", err);
    }
  }, [title, pageUrl]);

  const handleCopyLink = useCallback(async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(pageUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error("Clipboard error:", err);
    }
  }, [pageUrl]);

  const openMailtoFallback = useCallback(() => {
    const subject = `Komentar Blog: ${title}`;
    const body =
      `Nama: ${name}\n` +
      `Email: ${email}\n\n` +
      `Komentar:\n${comment}\n\n` +
      `────────────────────\n` +
      `Artikel: ${title}\n` +
      `Halaman: ${pageUrl}`;

    const href =
      `mailto:triabadimakmur@gmail.com` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    window.location.href = href;
  }, [title, name, email, comment, pageUrl]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setStatus("sending");

      try {
        const res = await fetch(
          "https://formsubmit.co/ajax/triabadimakmur@gmail.com",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              _subject: `Komentar Blog: ${title}`,
              _template: "table",
              _captcha: "false",
              Nama: name,
              Email: email,
              Komentar: comment,
              Artikel: title,
              Halaman: pageUrl,
            }),
          }
        );

        const json = await res.json().catch(() => ({}));

        if (!res.ok || String(json.success) !== "true") {
          throw new Error(json.message || "Gagal kirim");
        }

        setStatus("success");
        setName("");
        setEmail("");
        setComment("");
        setTimeout(() => setStatus("idle"), 4000);
      } catch (err) {
        console.error("FormSubmit error:", err);
        openMailtoFallback();
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
      }
    },
    [title, name, email, comment, pageUrl, openMailtoFallback]
  );

  if (!article) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center px-5">
        <div className="text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#1e88e5] font-semibold mb-3">
            Blog
          </p>
          <h1 className="text-2xl font-light text-slate-900">
            {t.notFoundTitle}
          </h1>
        </div>
      </section>
    );
  }

  const category = pick(article.category, lang);
  const desc     = pick(article.desc, lang);

  return (
    <article className="bg-white" style={{ contain: "layout style" }}>

      {/* ═══ HERO ═══ */}
      <section className="pt-10 sm:pt-12 lg:pt-16 pb-8 sm:pb-10 lg:pb-12">
        <div className="relative max-w-3xl mx-auto px-4 sm:px-5 lg:px-8 text-center">
          <Reveal delay={0} y={14}>
            <div className="inline-flex items-center gap-3">
              <span className="w-6 sm:w-8 h-px bg-[#1e88e5]" />
              <span className="text-[10px] sm:text-[11px] uppercase
                               tracking-[0.25em] sm:tracking-[0.3em]
                               text-[#1e88e5] font-semibold">
                {category}
              </span>
              <span className="w-6 sm:w-8 h-px bg-[#1e88e5]" />
            </div>
          </Reveal>

          <Reveal delay={80} y={22}>
            <h1
              className="mt-5 sm:mt-7 font-light tracking-tight text-slate-900 leading-[1.18]"
              style={{ fontSize: "clamp(1.5rem, 5vw, 2.625rem)" }}
            >
              {title}
              <span className="text-[#1e88e5]">.</span>
            </h1>
          </Reveal>
        </div>
      </section>

      {/* ═══ COVER ═══ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-5 lg:px-8 mt-2 sm:mt-4 lg:mt-6">
        <Reveal y={26} duration={800}>
          <figure className="relative rounded-2xl overflow-hidden bg-slate-100
                             ring-1 ring-slate-200 aspect-[16/9]">
            <Image
              src={article.src}
              alt={title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-cover"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src =
                  "https://placehold.co/1200x675/e2e8f0/64748b?text=Blog";
              }}
            />
          </figure>
        </Reveal>
      </section>

      {/* ═══ BODY ═══ */}
      <section className="max-w-3xl mx-auto px-4 sm:px-5 lg:px-8 pt-10 sm:pt-12 lg:pt-16">
        <Reveal y={18}>
          <p className="text-slate-600 leading-[1.85] italic
                        border-l-2 border-[#1e88e5] pl-4 sm:pl-5 mb-8 sm:mb-10"
             style={{ fontSize: "clamp(0.875rem, 1.6vw, 0.9375rem)" }}>
            {desc}
          </p>
        </Reveal>

        <ArticleBody body={article.body} lang={lang} />

        {/* ═══ TAGS & SHARE ═══ */}
        <Reveal y={20}>
          <div className="mt-12 sm:mt-14 pt-6 sm:pt-8 border-t border-slate-200
                          flex flex-col sm:flex-row sm:items-start
                          sm:justify-between gap-6 sm:gap-8">
            {visibleTags.length > 0 ? (
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-3 text-slate-400">
                  <I.Tag className="w-3.5 h-3.5" />
                  <span className="text-[10px] uppercase tracking-[0.24em] font-bold">
                    {t.tagsLabel}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {visibleTags.map((tag, i) => (
                    <TagItem
                      key={i}
                      tag={tag}
                      lang={lang}
                      className="inline-block px-2.5 py-1 rounded-md
                                 bg-slate-50 border border-slate-200
                                 text-[11px] text-slate-600 font-medium
                                 hover:border-[#1e88e5]/50 hover:text-[#1e88e5]
                                 transition-colors"
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex-1" />
            )}

            <div className="shrink-0">
              <div className="flex items-center gap-2 mb-3 sm:justify-end text-slate-400">
                <I.Share className="w-3.5 h-3.5" />
                <span className="text-[10px] uppercase tracking-[0.24em] font-bold">
                  {t.shareLabel}
                </span>
              </div>

              <div className="flex items-center gap-2 sm:justify-end">
                <button
                  type="button"
                  onClick={handleShare}
                  aria-label={t.share}
                  title={t.share}
                  className="w-9 h-9 flex items-center justify-center rounded-full
                             border border-slate-200 text-slate-600
                             hover:bg-slate-900 hover:text-white hover:border-slate-900
                             transition-colors"
                >
                  <I.Share className="w-3.5 h-3.5" />
                </button>

                <a
                  href={`https://wa.me/?text=${shareText}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                  title="WhatsApp"
                  className="w-9 h-9 flex items-center justify-center rounded-full
                             border border-slate-200 text-slate-600
                             hover:bg-slate-900 hover:text-white hover:border-slate-900
                             transition-colors"
                >
                  <I.WA className="w-3.5 h-3.5" />
                </a>

                <button
                  type="button"
                  onClick={handleCopyLink}
                  aria-label={t.copyLink}
                  title={t.copyLink}
                  className="w-9 h-9 flex items-center justify-center rounded-full
                             border border-slate-200 text-slate-600
                             hover:bg-slate-900 hover:text-white hover:border-slate-900
                             transition-colors"
                >
                  {copied ? (
                    <I.Check className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                    <I.Link className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {copied && (
                <p className="mt-2 text-[10.5px] text-[#1e88e5] font-semibold
                              text-right">
                  {t.copied}
                </p>
              )}
            </div>
          </div>
        </Reveal>

        {/* ═══ AUTHOR ═══ */}
        <Reveal y={22}>
          <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-200
                          flex flex-col sm:flex-row items-start gap-4 sm:gap-5">
            {article.author?.avatar && (
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden shrink-0
                              bg-slate-100 ring-1 ring-slate-200">
                <Image
                  src={article.author.avatar}
                  alt={article.author?.name || "Author"}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>
            )}

            <div className="flex-1 min-w-0">
              <h3 className="text-[15px] sm:text-[16px] lg:text-[17px] font-semibold text-slate-900 mb-2">
                {article.author?.name}
              </h3>

              <p className="text-slate-600 leading-[1.8] mb-3"
                 style={{ fontSize: "clamp(0.8125rem, 1.5vw, 0.84375rem)" }}>
                {article.author?.bio ? pick(article.author.bio, lang) : t.authorBio}
              </p>

              <p className="text-slate-600 leading-[1.8]"
                 style={{ fontSize: "clamp(0.8125rem, 1.5vw, 0.84375rem)" }}>
                {t.authorDesc}
              </p>
            </div>
          </div>
        </Reveal>

        {/* ═══ COMMENTS ═══ */}
        <Reveal y={22}>
          <div className="mt-12 sm:mt-14 pt-8 sm:pt-10 border-t border-slate-200 pb-16 sm:pb-20 lg:pb-28">
            <div className="flex items-baseline gap-3 mb-1">
              <h3 className="text-[16px] sm:text-[17px] font-semibold text-slate-900">
                {t.commentTitle}
              </h3>
              <span className="h-px flex-1 bg-slate-100" />
            </div>
            <p className="text-[12px] sm:text-[12.5px] text-slate-500 mb-5 sm:mb-6">
              {t.commentNote}
            </p>

            <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
              <textarea
                rows={4}
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={t.placeholderComment}
                className="w-full px-4 py-3.5 rounded-xl border border-slate-200
                           bg-slate-50 resize-none
                           focus:bg-white focus:border-[#1e88e5] focus:ring-2 focus:ring-[#1e88e5]/20
                           outline-none text-[14px] text-slate-800 placeholder:text-slate-400
                           transition-colors duration-150"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.placeholderName}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200
                             bg-slate-50
                             focus:bg-white focus:border-[#1e88e5] focus:ring-2 focus:ring-[#1e88e5]/20
                             outline-none text-[14px] text-slate-800 placeholder:text-slate-400
                             transition-colors duration-150"
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.placeholderEmail}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200
                             bg-slate-50
                             focus:bg-white focus:border-[#1e88e5] focus:ring-2 focus:ring-[#1e88e5]/20
                             outline-none text-[14px] text-slate-800 placeholder:text-slate-400
                             transition-colors duration-150"
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-xl
                           bg-[#1e88e5] hover:bg-[#1976d2] text-white
                           text-[10px] sm:text-[10.5px] font-bold uppercase tracking-[0.15em] sm:tracking-[0.18em]
                           disabled:opacity-60 disabled:cursor-not-allowed
                           transition-colors duration-150"
              >
                {status === "sending"
                  ? t.btnSending
                  : status === "success"
                  ? t.btnSuccess
                  : status === "error"
                  ? t.btnError
                  : t.btnIdle}
              </button>
            </form>
          </div>
        </Reveal>
      </section>

    </article>
  );
}