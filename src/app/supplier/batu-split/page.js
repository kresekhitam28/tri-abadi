// src/app/supplier/batu-split/page.js
import BatuSplit from "../../../components/BatuSplit";

export const metadata = {
  title: "Batu Split | PT Tri Abadi Makmur",
  description:
    "Jual batu split segala bentuk dan ukuran untuk konstruksi, pengaspalan, cor beton, dan lainnya. Siap antar.",
  alternates: {
    canonical: "/supplier/batu-split",
  },
};

export default function BatuSplitPage() {
  return <BatuSplit />;
}