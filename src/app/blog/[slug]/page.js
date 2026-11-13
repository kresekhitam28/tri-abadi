// src/app/blog/[slug]/page.js
import BlogDetail from "../../../components/BlogDetail";
import { articles } from "../../../data/articles";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://spesialisaspal.com";

const pick = (f) => {
  if (!f) return "";
  if (typeof f === "string") return f;
  return f.id || f.en || "";
};

export async function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return {
      title: "Artikel Tidak Ditemukan",
      robots: { index: false, follow: false },
    };
  }

  const title = pick(article.title);
  const desc = pick(article.desc);
  const imageUrl = article.src?.startsWith("http")
    ? article.src
    : `${SITE_URL}${article.src}`;

  return {
    title,
    description: desc,
    openGraph: {
      title: `${title} | PT Tri Abadi Makmur`,
      description: desc,
      url: `${SITE_URL}/blog/${slug}`,
      images: [imageUrl],
      type: "article",
      publishedTime: article.dateISO || undefined,
      siteName: "PT Tri Abadi Makmur",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | PT Tri Abadi Makmur`,
      description: desc,
      images: [imageUrl],
    },
    alternates: {
      canonical: `${SITE_URL}/blog/${slug}`,
    },
  };
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

  const title = article ? pick(article.title) : "";
  const desc = article ? pick(article.desc) : "";
  const imageUrl = article?.src?.startsWith("http")
    ? article.src
    : `${SITE_URL}${article?.src || "/proyek/hero-1.webp"}`;

  const jsonLd = article
    ? [
        {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: title,
          description: desc,
          image: [imageUrl],
          datePublished: article.dateISO || "2026-10-01",
          dateModified: article.dateISO || "2026-10-01",
          author: {
            "@type": "Organization",
            name: "PT Tri Abadi Makmur",
            url: SITE_URL,
          },
          publisher: {
            "@type": "Organization",
            name: "PT Tri Abadi Makmur",
            logo: {
              "@type": "ImageObject",
              url: `${SITE_URL}/logo.png`,
            },
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${SITE_URL}/blog/${slug}`,
          },
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Beranda",
              item: SITE_URL,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Blog",
              item: `${SITE_URL}/blog`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: title,
              item: `${SITE_URL}/blog/${slug}`,
            },
          ],
        },
      ]
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <BlogDetail />
    </>
  );
}