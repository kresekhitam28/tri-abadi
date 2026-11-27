// src/components/BlogDetail.jsx
"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLang } from "../context/LanguageContext";
import { projectQuoteHref } from "../lib/quote";
import { SITE_URL } from "../lib/metadata";
import { useIsMobile } from "../hooks/useIsMobile";
import { useReveal } from "../hooks/useReveal";
import ArticleQuotePanel from "./ArticleQuotePanel";

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
      contain: visible ? "layout style" : "layout paint style",
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
    commentNote: "Nama, email, dan komentar dikirim ke tim kami melalui FormSubmit.",
    commentLabel: "Komentar",
    nameLabel: "Nama",
    emailLabel: "Email",
    btnSending: "Mengirim...",
    btnSuccess: "Terkirim!",
    btnError: "Komentar belum terkirim. Coba lagi atau hubungi kami melalui halaman Kontak.",
    invalidComment: "Isi nama dan komentar Anda.",
    contactLink: "Buka halaman Kontak",
    btnIdle: "Kirim Komentar",
    commentThanks: "Terima kasih! Pesan Anda sudah kami terima.",
    authorBio:
      "PT Tri Abadi Makmur merupakan perusahaan kontraktor pengaspalan jalan dan konstruksi umum di Jabodetabek, Banten & Jawa Barat yang mengedepankan kualitas material, ketepatan waktu, dan garansi hasil pekerjaan.",
    authorDesc:
      "Melayani jasa pengaspalan hotmix, pemasangan paving block, pagar panel beton, serta penyewaan alat berat.",
    copied: "Link disalin!",
    share: "Bagikan",
    copyLink: "Salin Link",
    imageFallback: "PT Tri Abadi Makmur",
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
    commentNote: "Your name, email, and comment go to our team through FormSubmit.",
    commentLabel: "Comment",
    nameLabel: "Name",
    emailLabel: "Email",
    btnSending: "Sending...",
    btnSuccess: "Sent!",
    btnError: "Your comment could not be sent. Try again or use our Contact page.",
    invalidComment: "Enter your name and comment.",
    contactLink: "Open the Contact page",
    btnIdle: "Send Comment",
    commentThanks: "Thank you! We have received your message.",
    authorBio:
      "PT Tri Abadi Makmur is an asphalt paving and general construction contractor across Greater Jakarta, Banten & West Java prioritizing material quality, punctuality, and guaranteed workmanship.",
    authorDesc:
      "Providing hotmix asphalt paving, paving block installation, precast panel fencing, and heavy equipment rental.",
    copied: "Link copied!",
    share: "Share",
    copyLink: "Copy Link",
    imageFallback: "PT Tri Abadi Makmur",
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
// KARTU ARTIKEL TERKAIT
// ─────────────────────────────────────────────
function RelatedCard({ rel, lang }) {
  const [imgError, setImgError] = useState(false);
  const alt = pick(rel.illustration, lang) || pick(rel.title, lang);

  return (
    <Link
      href={`/blog/${rel.slug}`}
      className="group flex flex-col rounded-xl overflow-hidden border border-slate-200 hover:border-[#1e88e5]/60 bg-slate-50/50 hover:bg-white transition-all"
    >
      <div className="relative aspect-video bg-slate-100 overflow-hidden">
        {rel.src && !imgError ? (
          <Image
            src={rel.src}
            alt={alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-[10px] font-semibold uppercase tracking-[0.2em]">
            PT Tri Abadi Makmur
          </div>
        )}
      </div>
      <div className="p-4 flex-1">
        <p className="text-[10px] uppercase tracking-wider text-[#1e88e5] font-semibold mb-1.5">
          {pick(rel.category, lang)}
        </p>
        <h3 className="text-sm font-semibold text-slate-900 group-hover:text-[#1e88e5] line-clamp-2 leading-snug transition-colors">
          {pick(rel.title, lang)}
        </h3>
      </div>
    </Link>
  );
}

const commentFieldClass = "block w-full rounded-xl border border-slate-500 bg-slate-50 px-4 py-3.5 text-base text-slate-800 focus:border-blue-700 focus:bg-white focus:outline-2 focus:outline-offset-1 focus:outline-blue-700";

// ─────────────────────────────────────────────
// BODY RENDERER
// ─────────────────────────────────────────────
function ArticleBody({ body, lang, priceGuide }) {
  const firstParagraphIndex = body.findIndex((block) => block.type === "paragraph");

  return (
    <div className={priceGuide ? "min-w-0 space-y-4 sm:space-y-6" : "space-y-6 sm:space-y-8"}>
      {body.map((block, i) => {
        if (block.type === "heading") {
          return (
            <Reveal key={block.id || `${block.type}-${i}`} y={16}>
              <h2
                id={block.id}
                className={`scroll-mt-24 font-semibold leading-snug tracking-tight text-slate-900 ${priceGuide ? "pt-3 sm:pt-4" : "pt-4 sm:pt-6"}`}
                style={{ fontSize: "clamp(1.0625rem, 2.2vw, 1.375rem)" }}
              >
                {pick(block.text, lang)}
              </h2>
            </Reveal>
          );
        }

        // ═══ FIX: RENDER GAMBAR TANPA REVEAL ═══
        if (block.type === "image") {
          const alt = pick(block.alt, lang) || "PT Tri Abadi Makmur";
          const caption = pick(block.caption, lang);

          return (
            <figure key={`${block.type}-${i}`} className="my-6 sm:my-8">
              <img
                src={block.src}
                alt={alt}
                className="w-full h-auto rounded-xl shadow-md mb-3"
              />
              {caption && (
                <figcaption className="text-sm text-slate-500 text-center italic">
                  {caption}
                </figcaption>
              )}
            </figure>
          );
        }
        // ═══ END FIX ═══

        if (priceGuide && block.type === "price-list") {
          return (
            <div
              key={`${block.type}-${i}`}
              className="min-w-0 text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: pick(block.text, lang) }}
            />
          );
        }

        if (block.type === "table") {
          const caption = pick(block.caption, lang);
          return (
            <div key={block.id} role="region" aria-label={caption} tabIndex={0} className="min-w-0 overflow-x-auto rounded-lg border border-slate-200 focus-visible:outline-2 focus-visible:outline-blue-700">
              <table className="w-full min-w-[36rem] border-collapse text-left text-sm leading-relaxed text-slate-700">
                <caption className="p-3 font-semibold text-slate-950">{caption}</caption>
                <thead className="bg-slate-100 text-slate-950">
                  <tr>{block.columns.map((column) => <th key={column.id} scope="col" className="p-3 align-top">{pick(column, lang)}</th>)}</tr>
                </thead>
                <tbody>
                  {block.rows.map(([label, ...cells]) => (
                    <tr key={label.id} className="border-t border-slate-200 align-top">
                      <th scope="row" className="p-3 font-semibold text-slate-950">{pick(label, lang)}</th>
                      {cells.map((cell, index) => <td key={block.columns[index + 1].id} className="p-3">{pick(cell, lang)}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }

        if (block.type === "paragraph") {
          const isFirst = i === firstParagraphIndex;
          const text = pick(block.text, lang);
          const containsHtml = text.includes("<") && text.includes(">");

          return (
            <Reveal key={`${block.type}-${i}`} y={14}>
              {isFirst && !containsHtml && !priceGuide ? (
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
                             [&>p]:mb-5 [&>p:last-child]:mb-0 [&>figure]:my-6"
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
            <Reveal key={`${block.type}-${i}`} y={14}>
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
                    return <li key={j} dangerouslySetInnerHTML={{ __html: itemText }} />;
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
function ArticleCover({ src, title, illustration, priority }) {
  const [coverError, setCoverError] = useState(false);

  return (
    <figure
      className={`relative aspect-video overflow-hidden rounded-2xl ring-1 ring-slate-200 ${illustration && !coverError ? "bg-white" : "bg-slate-100"}`}
    >
      <Image
        src={coverError ? "https://placehold.co/1200x675/e2e8f0/64748b?text=Blog" : src}
        alt={illustration || title}
        fill
        priority={priority}
        sizes="(max-width: 1024px) 100vw, 896px"
        className={illustration && !coverError ? "object-scale-down p-5 pb-12" : "object-cover"}
        onError={() => setCoverError(true)}
      />
      {illustration && !coverError && (
        <figcaption className="absolute inset-x-0 bottom-4 px-3 text-center text-sm text-slate-600">
          {illustration}
        </figcaption>
      )}
    </figure>
  );
}

export default function BlogDetail({ article, visibleTags, relatedArticles }) {
  const { slug } = article;
  const priceGuide = Boolean(article.quote);
  const { lang } = useLang();
  const t = content[lang] || content.id;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState("idle");
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef(null);
  const submission = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [slug]);

  useEffect(() => () => {
    clearTimeout(copyTimer.current);
    const request = submission.current;
    submission.current = null;
    request?.abort();
  }, []);

  const pageUrl = `${SITE_URL}/blog/${slug}`;
  const title = pick(article.title, lang);
  const illustration = pick(article.illustration, lang);
  const shareText = encodeURIComponent(`${title} — ${pageUrl}`);

  const hasModifiedDate =
    modifiedDateExists(article) && article.modifiedDateISO !== article.dateISO;

  function showCopied() {
    clearTimeout(copyTimer.current);
    setCopied(true);
    copyTimer.current = setTimeout(() => setCopied(false), 2000);
  }

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
        showCopied();
      }
    } catch (err) {
      console.error("Clipboard error:", err);
    }
  }

  async function handleCopyLink() {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(pageUrl);
        showCopied();
      }
    } catch (err) {
      console.error("Clipboard error:", err);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (submission.current) return;

    const form = new FormData(event.currentTarget);
    if (form.get("_honey")) return;
    const sender = name.trim();
    const message = comment.trim();
    if (!sender || !message) {
      setStatus("invalid");
      return;
    }

    const request = new AbortController();
    submission.current = request;
    const timeout = setTimeout(() => request.abort(), 15_000);
    setStatus("sending");

    try {
      const res = await fetch(
        "https://formsubmit.co/ajax/triabadimakmur@gmail.com",
        {
          method: "POST",
          signal: request.signal,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            _subject: `Komentar Blog: ${title}`,
            _template: "table",
            _honey: "",
            Nama: sender,
            Email: email.trim(),
            Komentar: message,
            Artikel: title,
            Halaman: pageUrl,
          }),
        }
      );

      const json = await res.json().catch(() => ({}));

      if (!res.ok || String(json.success) !== "true") {
        throw new Error("Comment submission failed");
      }

      if (submission.current !== request) return;
      setStatus("success");
      setName("");
      setEmail("");
      setComment("");
    } catch {
      if (submission.current === request) setStatus("error");
    } finally {
      clearTimeout(timeout);
      if (submission.current === request) submission.current = null;
    }
  }

  const category = pick(article.category, lang);
  const desc = pick(article.desc, lang);
  const formattedDate = formatDate(article.dateISO, lang);
  const modifiedDate = formatDate(article.modifiedDateISO, lang);

  return (
    <article className="bg-white" style={{ contain: "layout style" }}>
      {/* ═══ HERO ═══ */}
      <section className={priceGuide ? "pb-5 pt-[92px] sm:pb-6 sm:pt-[104px]" : "pt-28 sm:pt-32 lg:pt-36 pb-8 sm:pb-10 lg:pb-12"}>
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
            className={`tracking-tight text-slate-900 leading-[1.18] ${priceGuide ? "mt-3 text-balance font-semibold sm:mt-4" : "mt-5 font-light sm:mt-7"}`}
            style={{ fontSize: "clamp(1.5rem, 5vw, 2.625rem)" }}
          >
            {title}
            <span className="text-[#1e88e5]">.</span>
          </h1>
          <div className={`flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-slate-600 sm:text-sm ${priceGuide ? "mt-3" : "mt-4"}`}>
            {formattedDate && (
              <p>
                {t.publishedLabel}{" "}
                <time dateTime={article.dateISO} className="font-medium text-slate-700">
                  {formattedDate}
                </time>
              </p>
            )}
            {hasModifiedDate && (
              <p>
                {t.modifiedLabel}{" "}
                <time dateTime={article.modifiedDateISO} className="font-medium text-slate-700">
                  {modifiedDate}
                </time>
              </p>
            )}
          </div>
          {article.answer && (
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-slate-700">
              {pick(article.answer, lang)}
            </p>
          )}
          {article.technicalReviewer && (
            <p className="mt-3 text-sm text-slate-700">
              <strong>{lang === "en" ? "Technical review" : "Pemeriksa teknis"}</strong> · {article.technicalReviewer}
            </p>
          )}
        </div>
      </section>

      {article.quote && (
        <div className="mx-auto mb-6 max-w-4xl px-5 sm:px-6 lg:px-8">
          <ArticleQuotePanel quote={article.quote} lang={lang} />
        </div>
      )}

      {/* ═══ COVER ═══ */}
      <section className={`mx-auto max-w-4xl px-5 sm:px-6 lg:px-8 ${priceGuide ? "mt-4 sm:mt-6" : "mt-4 sm:mt-8 lg:mt-12"}`}>
        <Reveal y={26} duration={800}>
          <ArticleCover key={article.src} src={article.src} title={title} illustration={illustration} priority={!article.quote} />
        </Reveal>
      </section>

      {/* ═══ BODY ═══ */}
      <section className={`mx-auto max-w-3xl px-5 sm:px-6 lg:px-8 ${priceGuide ? "pt-7 sm:pt-9" : "pt-10 sm:pt-12 lg:pt-16"}`}>
        {!article.answer && <Reveal y={18}>
          <p
            className={priceGuide ? "mb-5 rounded-r-lg border-l-2 border-blue-700 bg-slate-50 px-4 py-3 leading-relaxed text-slate-700 sm:mb-6 sm:px-5" : "mb-8 border-l-2 border-[#1e88e5] pl-4 italic leading-[1.85] text-slate-600 sm:mb-10 sm:pl-5"}
            style={{ fontSize: "clamp(0.875rem, 1.6vw, 0.9375rem)" }}
          >
            {desc}
          </p>
        </Reveal>}

        <ArticleBody body={article.body} lang={lang} priceGuide={priceGuide} />
        {article.surveyRequest && (
          <a
            href={projectQuoteHref(article.surveyRequest, lang)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-12 items-center justify-center rounded-lg bg-blue-700 px-5 py-3 text-center text-sm font-semibold text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          >
            {lang === "en" ? "Request a site survey on WhatsApp" : "Minta Survei Lokasi via WhatsApp"}
          </a>
        )}

        {/* ═══ TAGS & SHARE ═══ */}
        <Reveal y={20}>
          <div className="mt-12 sm:mt-14 pt-6 sm:pt-8 border-t border-slate-200 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8 sm:gap-10">
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
                      className="inline-block px-3 py-1.5 rounded-md bg-slate-50 border border-slate-200 text-[11px] sm:text-xs text-slate-600 font-medium hover:border-[#1e88e5]/50 hover:text-[#1e88e5] transition-colors"
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
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-colors"
                >
                  <I.Share className="w-4 h-4" />
                </button>

                <a
                  href={`https://wa.me/?text=${shareText}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                  title="WhatsApp"
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-colors"
                >
                  <I.WA className="w-4 h-4" />
                </a>

                <button
                  type="button"
                  onClick={handleCopyLink}
                  aria-label={t.copyLink}
                  title={t.copyLink}
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-colors"
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
          <div className="mt-10 sm:mt-12 pt-8 sm:pt-10 border-t border-slate-200 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5 sm:gap-6">
            {article.author?.avatar && (
              <div className="relative w-20 h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden shrink-0 bg-slate-100 ring-1 ring-slate-200">
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
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-emerald-700 px-6 py-4 font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:px-8 sm:tracking-[0.15em]"
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {relatedArticles.map((rel) => (
                  <RelatedCard key={rel.slug} rel={rel} lang={lang} />
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
            <p id="article-comment-note" className="text-[12.5px] sm:text-[13px] text-slate-600 mb-6 sm:mb-8">
              {t.commentNote}
            </p>

            {status === "success" ? (
              <div
                role="status"
                className="rounded-2xl border border-emerald-200 bg-emerald-50 px-6 py-5"
              >
                <p className="font-semibold text-emerald-800 flex items-center gap-2">
                  <I.Check className="w-4 h-4 text-emerald-600" />
                  {t.btnSuccess}
                </p>
                <p className="mt-1 text-sm text-emerald-700">{t.commentThanks}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} aria-describedby="article-comment-note" className="space-y-4">
                <input className="hidden" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" />
                <div>
                  <label htmlFor="article-comment" className="mb-2 block text-sm font-semibold text-slate-700">
                    {t.commentLabel}
                  </label>
                  <textarea
                    id="article-comment"
                    rows={4}
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className={`${commentFieldClass} resize-y`}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="article-comment-name" className="mb-2 block text-sm font-semibold text-slate-700">
                      {t.nameLabel}
                    </label>
                    <input
                      id="article-comment-name"
                      type="text"
                      autoComplete="name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={commentFieldClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="article-comment-email" className="mb-2 block text-sm font-semibold text-slate-700">
                      {t.emailLabel}
                    </label>
                    <input
                      id="article-comment-email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={commentFieldClass}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="mt-2 inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-blue-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 disabled:cursor-not-allowed disabled:bg-slate-600 sm:w-auto"
                >
                  {status === "sending" ? t.btnSending : t.btnIdle}
                </button>

                {status === "error" && (
                  <div className="space-y-2">
                    <p role="alert" className="text-sm font-medium text-red-600">
                      {t.btnError}
                    </p>
                    <Link
                      href="/kontak"
                      className="inline-flex min-h-11 items-center rounded font-semibold text-blue-700 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-blue-700"
                    >
                      {t.contactLink}
                    </Link>
                  </div>
                )}

                {status === "invalid" && (
                  <p role="alert" className="text-sm font-medium text-red-600">
                    {t.invalidComment}
                  </p>
                )}
              </form>
            )}
          </div>
        </Reveal>
      </section>
    </article>
  );
}

// helper kecil di luar komponen
function modifiedDateExists(article) {
  return Boolean(article && article.modifiedDateISO);
}