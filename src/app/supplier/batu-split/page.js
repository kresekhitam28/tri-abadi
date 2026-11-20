// src/app/supplier/batu-split/page.js
import BatuSplit from "../../../components/BatuSplit";
import { createPageMetadata } from "../../../lib/metadata";

export const metadata = createPageMetadata({
  path: "/supplier/batu-split",
  title: "Jual Batu Split Segala Ukuran",
  description:
    "Jual batu split ukuran 0-5mm hingga 30-50mm untuk cor beton, pengaspalan, dan base course. Kualitas terjamin, siap antar ke lokasi proyek.",
  image: "/produk/batu-split.png",
});

export default function BatuSplitPage() {
  return <BatuSplit />;
}