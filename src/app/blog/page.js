// src/app/blog/page.js
import Blog from "../../components/BlogPage";
import { getBlogListing } from "../../lib/blog";
import { createPageMetadata } from "../../lib/metadata";

export const metadata = createPageMetadata({
  path: "/blog",
  title: "Blog & Berita",
  description:
    "Tips, info, dan berita terbaru seputar konstruksi dan pengaspalan jalan dari tim PT Tri Abadi Makmur.",
  image: "/proyek/proyek-30.webp",
});

export default async function BlogPage() {
  const listing = await getBlogListing(1);
  return <Blog {...listing} />;
}
