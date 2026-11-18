// src/app/supplier/pasir-pasang/page.js
import PasirPasang from "../../../components/PasirPasang";
import { createPageMetadata } from "../../../lib/metadata";

export const metadata = createPageMetadata({
  path: "/supplier/pasir-pasang",
  title: "Pasir Pasang",
  description:
    "Jual pasir pasang untuk pemasangan bata, plesteran, dan acian. Tekstur kasar, daya rekat kuat, harga terjangkau.",
  image: "/produk/pasir-pasang.png",
});

export default function PasirPasangPage() {
  return <PasirPasang />;
}