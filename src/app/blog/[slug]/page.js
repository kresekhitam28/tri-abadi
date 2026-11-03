// src/app/blog/[slug]/page.js
import BlogDetail from "../../../components/BlogDetail";
import { articles } from "../../../data/articles";

export async function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }) {
  // Next.js 15+ menggunakan await params. 
  // Jika Anda menggunakan Next.js 14, hapus kata "await" di samping params.
  const { slug } = await params; 
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return { title: "Artikel Tidak Ditemukan" };
  }

  const pick = (f) => {
    if (!f) return "";
    if (typeof f === "string") return f;
    return f.id || f.en || "";
  };

  const title = pick(article.title);
  const desc = pick(article.desc);
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://spesialisaspal.com";

  return {
    title: `${title} | PT Tri Abadi Makmur`,
    description: desc,
    openGraph: {
      title,
      description: desc,
      images: [`${SITE_URL}${article.src}`],
      type: "article",
      siteName: "PT Tri Abadi Makmur",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: desc,
      images: [`${SITE_URL}${article.src}`],
    },
    alternates: {
      // Ini adalah bagian Canonical dinamis yang sangat tepat
      canonical: `${SITE_URL}/blog/${slug}`,
    },
  };
}

export default function BlogDetailPage() {
  return <BlogDetail />;
}