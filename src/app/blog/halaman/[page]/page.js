import { notFound } from "next/navigation";
import Blog from "../../../../components/BlogPage";
import { blogPageNumbers, blogPagePath, getBlogListing } from "../../../../lib/blog";
import { createPageMetadata } from "../../../../lib/metadata";

const pages = blogPageNumbers.slice(1).map(String);

export function generateStaticParams() {
  return pages.map((page) => ({ page }));
}

export async function generateMetadata({ params }) {
  const { page } = await params;
  if (!pages.includes(page)) notFound();

  return createPageMetadata({
    path: blogPagePath(Number(page)),
    title: `Blog & Berita – Halaman ${page}`,
    description: `Halaman ${page} panduan biaya, perawatan, dan pekerjaan konstruksi jalan dari PT Tri Abadi Makmur.`,
    image: "/proyek/proyek-30.webp",
  });
}

export default async function PaginatedBlogPage({ params }) {
  const { page } = await params;
  if (!pages.includes(page)) notFound();

  const listing = await getBlogListing(Number(page));
  return <Blog {...listing} />;
}
