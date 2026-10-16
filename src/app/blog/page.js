// src/app/blog/page.js
import Blog from "../../components/BlogPage";

export const metadata = {
  title: "Blog & Berita",
  description:
    "Tips, info, dan berita terbaru seputar konstruksi dan pengaspalan jalan dari tim PT Tri Abadi Makmur.",
};

export default function BlogPage() {
  return <Blog />;
}