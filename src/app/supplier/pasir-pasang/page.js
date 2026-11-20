// src/app/supplier/pasir-pasang/page.js
import PasirPasang from "../../../components/PasirPasang";
import { createPageMetadata } from "../../../lib/metadata";

export const metadata = createPageMetadata({
  path: "/supplier/pasir-pasang",
  title: "Jual Pasir Pasang untuk Bata & Plester",
  description:
    "Jual pasir pasang berkualitas untuk pemasangan bata merah, batako, dan bata ringan (hebel). Daya rekat kuat, harga terjangkau, siap antar ke lokasi proyek.",
  image: "/produk/pasir-pasang.png",
});

export default function PasirPasangPage() {
  return <PasirPasang />;
}