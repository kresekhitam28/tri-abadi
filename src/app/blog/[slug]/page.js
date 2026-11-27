// src/app/blog/[slug]/page.js
import { notFound } from "next/navigation";
import BlogDetail from "../../../components/BlogDetail";
import { articles, getArticleBySlug } from "../../../data/articles";
import { getArticleDetail, getArticleNavigation } from "../../../lib/blog";
import { createPageMetadata, serializeJsonLd, SITE_ENTITY_ID, SITE_NAME, SITE_URL } from "../../../lib/metadata";

const pick = (f) => {
  if (!f) return "";
  if (typeof f === "string") return f;
  return f.id || f.en || "";
};

export async function generateStaticParams() {
  // PENGAMAN: Pastikan articles adalah array dan punya slug
  if (!Array.isArray(articles)) return [];
  
  return articles
    .filter((article) => article && article.slug) // Saring jika ada data yang tidak punya slug
    .map((article) => ({
      slug: article.slug,
    }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  return createPageMetadata({
    path: `/blog/${slug}`,
    title: pick(article.title),
    description: pick(article.desc),
    image: article.src,
    type: "article",
    publishedTime: article.dateISO,
    modifiedTime: article.modifiedDateISO,
  });
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const title = pick(article.title);
  const articleUrl = `${SITE_URL}/blog/${slug}`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: title,
      description: pick(article.desc),
      image: [new URL(article.src || "/logo.webp", SITE_URL).href],
      datePublished: article.dateISO,
      ...(article.modifiedDateISO ? { dateModified: article.modifiedDateISO } : {}),
      author: { "@id": SITE_ENTITY_ID, "@type": "Organization", name: SITE_NAME, url: SITE_URL },
      publisher: {
        "@id": SITE_ENTITY_ID,
        "@type": "Organization",
        name: SITE_NAME,
        logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": articleUrl,
        ...(article.technicalReviewer && {
          reviewedBy: { "@type": "Organization", name: article.technicalReviewer, parentOrganization: { "@id": SITE_ENTITY_ID } },
        }),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Beranda", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
        { "@type": "ListItem", position: 3, name: title, item: articleUrl },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <BlogDetail key={slug} article={getArticleDetail(article)} {...getArticleNavigation(article)} />
    </>
  );
}