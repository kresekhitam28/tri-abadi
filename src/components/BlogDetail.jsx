// src/components/BlogDetail.jsx
"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLang } from "../context/LanguageContext";
import { SITE_URL } from "../lib/metadata";
import { useIsMobile } from "../hooks/useIsMobile";
import { useReveal } from "../hooks/useReveal";
import ArticleQuotePanel from "./ArticleQuotePanel";

// ─────────────────────────────────────────────
// HOOK: deteksi mobile
// ─────────────────────────────────────────────
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
// HELPER: pick bilingual & format tanggal
// ─────────────────────────────────────────────
const pick = (field, lang) => {
  if (!field) return "";
  if (typeof field === "string") return field;
  return field[lang] || field.id || field.en || "";
};

const formatDate = (dateISO, lang) => {
  if (!dateISO) return "";
  try {
    return new Date(dateISO).toLocaleDateString(
      lang === "en" ? "en-US" : "id-ID",
      { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }
    );
  } catch {
    return dateISO;
  }
};

// ─────────────────────────────────────────────
// KONTEN BILINGUAL
// ─────────────────────────────────────────────
const content = {
  id: {
    breadcrumb: "Jejak navigasi",
    home: "Beranda",
    publishedLabel: "Dipublikasikan pada",
    modifiedLabel: "Diperbarui pada",
    tagsLabel: "Tag",
    shareLabel: "Bagikan",
    relatedTitle: "Artikel Terkait Lainnya",
    ctaKicker: "Butuh Bantuan?",
    ctaTitleLight: "Punya Pertanyaan Seputar",
    ctaTitleBold: "Proyek Anda?",
    ctaDesc:
      "Tim PT Tri Abadi Makmur siap membantu konsultasi, survei lokasi gratis, dan memberikan penawaran terbaik untuk kebutuhan pengaspalan atau konstruksi Anda di Jabodetabek, Banten & Jawa Barat.",
    ctaBtn: "Konsultasi via WhatsApp",
    ctaWaMsg:
      "Halo PT Tri Abadi Makmur, saya baru saja membaca artikel Anda dan ingin berkonsultasi mengenai proyek saya.",
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
      "PT Tri Abadi Makmur merupakan perusahaan kontraktor pengaspalan jalan dan konstruksi umum di Jabodetabek, Banten & Jawa Barat yang mengedepankan kualitas material, ketepatan waktu, dan garansi hasil pekerjaan.",
    authorDesc:
      "Melayani jasa pengaspalan hotmix, pemasangan paving block, pagar panel beton, serta penyewaan alat berat.",
    copied: "Link disalin!",
    share: "Bagikan",
    copyLink: "Salin Link",
  },
  en: {
    breadcrumb: "Breadcrumb",
    home: "Home",
    publishedLabel: "Published on",
    modifiedLabel: "Updated on",
    tagsLabel: "Tags",
    shareLabel: "Share",
    relatedTitle: "Related Articles",
    ctaKicker: "Need Assistance?",
    ctaTitleLight: "Have Questions About",
    ctaTitleBold: "Your Project?",
    ctaDesc:
      "PT Tri Abadi Makmur is ready to help with free site surveys, consultations, and competitive quotes for your asphalt paving or construction needs across Greater Jakarta, Banten & West Java.",
    ctaBtn: "Consult via WhatsApp",
    ctaWaMsg:
      "Hello PT Tri Abadi Makmur, I just read your article and would like to consult about my project.",
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
      "PT Tri Abadi Makmur is an asphalt paving and general construction contractor across Greater Jakarta, Banten & West Java prioritizing material quality, punctuality, and guaranteed workmanship.",
    authorDesc:
      "Providing hotmix asphalt paving, paving block installation, precast panel fencing, and heavy equipment rental.",
    copied: "Link copied!",
    share: "Share",
    copyLink: "Copy Link",
  },
};

// ─────────────────────────────────────────────
// RENDER TAG ITEM
// ─────────────────────────────────────────────
function TagItem({ tag, lang, className }) {
  const label = pick(tag.label, lang);
  if (tag.href) {
    return (
      <Link href={tag.href} className={className}>
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
  const firstParagraphIndex = body.findIndex((block) => block.type === "paragraph");

  return (
    <div className="space-y-6 sm:space-y-8">
      {body.map((block, i) => {
        if (block.type === "heading") {
          return (
            <Reveal key={i} y={16}>
              <h2
                id={block.id}
                className="scroll-mt-24 pt-4 sm:pt-6 font-semibold text-slate-900 leading-snug tracking-tight"
                style={{ fontSize: "clamp(1.0625rem, 2.2vw, 1.375rem)" }}
              >
                {pick(block.text, lang)}
              </h2>
            </Reveal>
          );
        }

        if (block.type === "paragraph") {
          const isFirst = i === firstParagraphIndex;
          const text = pick(block.text, lang);
          const containsHtml = text.includes("<") && text.includes(">");

          return (
            <Reveal key={i} y={14}>
              {isFirst && !containsHtml ? (
                <p
                  className="text-slate-700 leading-[1.9] sm:leading-[1.95]
                             first-letter:float-left first-letter:mr-3 first-letter:mt-1
                             first-letter:text-[42px] sm:first-letter:text-[46px]
                             first-letter:font-semibold
                             first-letter:leading-[0.9] first-letter:text-[#1e88e5]"
                  style={{ fontSize: "clamp(0.9375rem, 1.8vw, 1rem)" }}
                >
                  {text}
                </p>
              ) : containsHtml ? (
                <div
                  className="text-slate-700 leading-[1.9] sm:leading-[1.95] prose max-w-none w-full
                             [&>p]:mb-5 [&>p:last-child]:mb-0"
                  style={{ fontSize: "clamp(0.9375rem, 1.8vw, 1rem)" }}
                  dangerouslySetInnerHTML={{ __html: text }}
                />
              ) : (
                <p
                  className="text-slate-700 leading-[1.9] sm:leading-[1.95]"
                  style={{ fontSize: "clamp(0.9375rem, 1.8vw, 1rem)" }}
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
                            list-outside pl-5 sm:pl-6 space-y-3 sm:space-y-3.5
                            text-slate-700 leading-[1.85] sm:leading-[1.9]
                            marker:text-[#1e88e5] marker:font-semibold`}
                style={{ fontSize: "clamp(0.875rem, 1.7vw, 0.9375rem)" }}
              >
                {block.items.map((it, j) => {
                  const itemText = pick(it, lang);
                  if (itemText.includes("<") && itemText.includes(">")) {
                    return (
                      <li key={j} dangerouslySetInnerHTML={{ __html: itemText }} />
                    );
                  }
                  return <li key={j}>{itemText}</li>;
                })}
              </Tag>
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
export default function BlogDetail({ article, visibleTags, relatedArticles }) {
  const { slug } = article;
  const { lang } = useLang();
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

  const pageUrl = `${SITE_URL}/blog/${slug}`;
  const title = pick(article.title, lang);
  const illustration = pick(article.illustration, lang);
  const shareText = encodeURIComponent(`${title} — ${pageUrl}`);

  async function handleShare() {
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
  }

  async function handleCopyLink() {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(pageUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error("Clipboard error:", err);
    }
  }

  function openMailtoFallback() {
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

    window.location.assign(href);
  }

  async function handleSubmit(e) {
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
  }

  const category = pick(article.category, lang);
  const desc = pick(article.desc, lang);
  const formattedDate = formatDate(article.dateISO, lang);
  const modifiedDate = formatDate(article.modifiedDateISO, lang);

  return (
    <article className="bg-white" style={{ contain: "layout style" }}>
      {/* ═══ HERO ═══ */}
      <section className={article.quote ? "pb-5 pt-24 sm:pb-6 sm:pt-28" : "pt-28 sm:pt-32 lg:pt-36 pb-8 sm:pb-10 lg:pb-12"}>
        <div className="relative max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
          <nav aria-label={t.breadcrumb} className="mb-3 text-xs text-slate-600">
            <ol className="flex min-w-0 items-center justify-center gap-2">
              <li><Link href="/" className="hover:underline">{t.home}</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/blog" className="hover:underline">Blog</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="min-w-0 truncate text-left">{title}</li>
            </ol>
          </nav>
          <div className="inline-flex items-center gap-3">
            <span className="w-6 sm:w-8 h-px bg-[#1e88e5]" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#1e88e5] sm:text-[11px] sm:tracking-[0.3em]">
              {category}
            </span>
            <span className="w-6 sm:w-8 h-px bg-[#1e88e5]" />
          </div>
          <h1
            className="mt-5 sm:mt-7 font-light tracking-tight text-slate-900 leading-[1.18]"
            style={{ fontSize: "clamp(1.5rem, 5vw, 2.625rem)" }}
          >
            {title}
            <span className="text-[#1e88e5]">.</span>
          </h1>
          <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-slate-600 sm:text-sm">
            {formattedDate && (
              <p>
                {t.publishedLabel}{" "}
                <time dateTime={article.dateISO} className="font-medium text-slate-700">
                  {formattedDate}
                </time>
              </p>
            )}
            {modifiedDate && (
              <p>
                {t.modifiedLabel}{" "}
                <time dateTime={article.modifiedDateISO} className="font-medium text-slate-700">
                  {modifiedDate}
                </time>
              </p>
            )}
          </div>
        </div>
      </section>

      {article.quote && (
        <div className="mx-auto mb-6 max-w-4xl px-4 sm:px-6 lg:px-8">
          <ArticleQuotePanel quote={article.quote} lang={lang} />
        </div>
      )}

      {/* ═══ COVER ═══ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 sm:mt-8 lg:mt-12">
        <Reveal y={26} duration={800}>
          <figure
            className={`relative aspect-video overflow-hidden rounded-2xl ring-1 ring-slate-200 ${illustration ? "bg-white" : "bg-slate-100"}`}
          >
            <Image
              src={article.src}
              alt={illustration || title}
              fill
              priority={!article.quote}
              sizes="(max-width: 1024px) 100vw, 896px"
              className={illustration ? "object-scale-down p-5 pb-12" : "object-cover"}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src =
                  "https://placehold.co/1200x675/e2e8f0/64748b?text=Blog";
              }}
            />
            {illustration && <figcaption className="absolute inset-x-0 bottom-4 px-3 text-center text-sm text-slate-600">{illustration}</figcaption>}
          </figure>
        </Reveal>
      </section>

      {/* ═══ BODY ═══ */}
      <section className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 pt-10 sm:pt-12 lg:pt-16">
        <Reveal y={18}>
          <p
            className="text-slate-600 leading-[1.85] italic
                       border-l-2 border-[#1e88e5] pl-4 sm:pl-5 mb-8 sm:mb-10"
            style={{ fontSize: "clamp(0.875rem, 1.6vw, 0.9375rem)" }}
          >
            {desc}
          </p>
        </Reveal>

        <ArticleBody body={article.body} lang={lang} />

        {/* ═══ TAGS & SHARE ═══ */}
        <Reveal y={20}>
          <div
            className="mt-12 sm:mt-14 pt-6 sm:pt-8 border-t border-slate-200
                       flex flex-col sm:flex-row sm:items-start
                       sm:justify-between gap-8 sm:gap-10"
          >
            {visibleTags.length > 0 ? (
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-3 text-slate-400">
                  <I.Tag className="w-3.5 h-3.5" />
                  <span className="text-[10px] uppercase tracking-[0.24em] font-bold">
                    {t.tagsLabel}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {visibleTags.map((tag, i) => (
                    <TagItem
                      key={i}
                      tag={tag}
                      lang={lang}
                      className="inline-block px-3 py-1.5 rounded-md
                                 bg-slate-50 border border-slate-200
                                 text-[11px] sm:text-xs text-slate-600 font-medium
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
                  className="w-10 h-10 flex items-center justify-center rounded-full
                             border border-slate-200 text-slate-600
                             hover:bg-slate-900 hover:text-white hover:border-slate-900
                             transition-colors"
                >
                  <I.Share className="w-4 h-4" />
                </button>

                <a
                  href={`https://wa.me/?text=${shareText}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                  title="WhatsApp"
                  className="w-10 h-10 flex items-center justify-center rounded-full
                             border border-slate-200 text-slate-600
                             hover:bg-slate-900 hover:text-white hover:border-slate-900
                             transition-colors"
                >
                  <I.WA className="w-4 h-4" />
                </a>

                <button
                  type="button"
                  onClick={handleCopyLink}
                  aria-label={t.copyLink}
                  title={t.copyLink}
                  className="w-10 h-10 flex items-center justify-center rounded-full
                             border border-slate-200 text-slate-600
                             hover:bg-slate-900 hover:text-white hover:border-slate-900
                             transition-colors"
                >
                  {copied ? (
                    <I.Check className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <I.Link className="w-4 h-4" />
                  )}
                </button>
              </div>

              {copied && (
                <p className="mt-2 text-[11px] text-[#1e88e5] font-semibold text-center sm:text-right">
                  {t.copied}
                </p>
              )}
            </div>
          </div>
        </Reveal>

        {/* ═══ AUTHOR ═══ */}
        <Reveal y={22}>
          <div
            className="mt-10 sm:mt-12 pt-8 sm:pt-10 border-t border-slate-200
                       flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5 sm:gap-6"
          >
            {article.author?.avatar && (
              <div
                className="relative w-20 h-20 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden shrink-0
                           bg-slate-100 ring-1 ring-slate-200"
              >
                <Image
                  src={article.author.avatar}
                  alt={article.author?.name || "PT Tri Abadi Makmur"}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>
            )}

            <div className="flex-1 min-w-0">
              <h2 className="text-[16px] lg:text-[17px] font-semibold text-slate-900 mb-2">
                {article.author?.name || "PT Tri Abadi Makmur"}
              </h2>

              <p
                className="text-slate-600 leading-[1.8] mb-2 sm:mb-3"
                style={{ fontSize: "clamp(0.8125rem, 1.5vw, 0.875rem)" }}
              >
                {article.author?.bio ? pick(article.author.bio, lang) : t.authorBio}
              </p>

              <p
                className="text-slate-600 leading-[1.8]"
                style={{ fontSize: "clamp(0.8125rem, 1.5vw, 0.875rem)" }}
              >
                {t.authorDesc}
              </p>
            </div>
          </div>
        </Reveal>

        {/* ═══════ CTA BANTUAN ═══════ */}
        <Reveal y={22}>
          <div className="mt-12 p-8 sm:p-10 bg-slate-900 rounded-3xl text-center shadow-2xl shadow-slate-900/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#1e88e5] rounded-full blur-3xl opacity-20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-[#25D366] rounded-full blur-3xl opacity-10 pointer-events-none" />

            <div className="relative z-10">
              <p className="text-[#4da3ff] text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-bold mb-4">
                {t.ctaKicker}
              </p>
              <h2
                className="text-white font-light tracking-tight mb-4"
                style={{ fontSize: "clamp(1.25rem, 3vw, 1.75rem)" }}
              >
                {t.ctaTitleLight} <span className="font-bold">{t.ctaTitleBold}</span>
              </h2>
              <p
                className="text-slate-400 mb-8 max-w-lg mx-auto"
                style={{ fontSize: "clamp(0.875rem, 1.6vw, 1rem)" }}
              >
                {t.ctaDesc}
              </p>
              <a
                href={`https://wa.me/6282258089367?text=${encodeURIComponent(t.ctaWaMsg)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-4 min-h-[48px] rounded-xl bg-[#25D366] text-white hover:bg-[#20bd5a] font-bold uppercase tracking-[0.1em] sm:tracking-[0.15em] shadow-lg shadow-[#25D366]/30 hover:shadow-[#25D366]/50 hover:-translate-y-0.5 transition-all duration-300"
                style={{ fontSize: "clamp(0.75rem, 1.3vw, 0.875rem)" }}
              >
                <I.WA className="w-5 h-5 shrink-0" />
                {t.ctaBtn}
              </a>
            </div>
          </div>
        </Reveal>

        {/* ═══ ARTIKEL TERKAIT (INTERNAL LINKING SEO) ═══ */}
        {relatedArticles.length > 0 && (
          <Reveal y={22}>
            <div className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-slate-200">
              <h2 className="text-[17px] sm:text-[18px] font-semibold text-slate-900 mb-6">
                {t.relatedTitle}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedArticles.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/blog/${rel.slug}`}
                    className="group block p-4 rounded-xl border border-slate-200 hover:border-[#1e88e5]/60 bg-slate-50/50 hover:bg-white transition-all"
                  >
                    <p className="text-[10px] uppercase tracking-wider text-[#1e88e5] font-semibold mb-1.5">
                      {pick(rel.category, lang)}
                    </p>
                    <h3 className="text-sm font-semibold text-slate-900 group-hover:text-[#1e88e5] line-clamp-2 leading-snug transition-colors">
                      {pick(rel.title, lang)}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        )}

        {/* ═══ COMMENTS ═══ */}
        <Reveal y={22}>
          <div className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-slate-200 pb-16 sm:pb-20 lg:pb-28">
            <div className="flex items-baseline gap-3 mb-2">
              <h2 className="text-[17px] sm:text-[18px] font-semibold text-slate-900">
                {t.commentTitle}
              </h2>
              <span className="h-px flex-1 bg-slate-100" />
            </div>
            <p className="text-[12.5px] sm:text-[13px] text-slate-500 mb-6 sm:mb-8">
              {t.commentNote}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <textarea
                rows={4}
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={t.placeholderComment}
                className="w-full px-4 py-3.5 rounded-xl border border-slate-200
                           bg-slate-50 resize-none
                           focus:bg-white focus:border-[#1e88e5] focus:ring-2 focus:ring-[#1e88e5]/20
                           outline-none text-[14px] sm:text-[15px] text-slate-800 placeholder:text-slate-400
                           transition-colors duration-150"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.placeholderName}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200
                             bg-slate-50
                             focus:bg-white focus:border-[#1e88e5] focus:ring-2 focus:ring-[#1e88e5]/20
                             outline-none text-[14px] sm:text-[15px] text-slate-800 placeholder:text-slate-400
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
                             outline-none text-[14px] sm:text-[15px] text-slate-800 placeholder:text-slate-400
                             transition-colors duration-150"
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:py-3 rounded-xl
                           bg-[#1e88e5] hover:bg-[#1976d2] text-white
                           text-xs sm:text-sm font-semibold tracking-wide
                           disabled:opacity-60 disabled:cursor-not-allowed
                           transition-colors duration-150 mt-2"
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
