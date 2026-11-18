// src/app/supplier/batu-split/page.js
import BatuSplit from "../../../components/BatuSplit";
import { createPageMetadata } from "../../../lib/metadata";

export const metadata = createPageMetadata({
  path: "/supplier/batu-split",
  title: "Batu Split",
  description:
    "Jual batu split segala bentuk dan ukuran untuk konstruksi, pengaspalan, cor beton, dan lainnya. Siap antar.",
  image: "/produk/batu-split.png",
});

export default function BatuSplitPage() {
  return <BatuSplit />;
}