// src/app/supplier/kerikil/page.js
import Kerikil from "../../../components/Kerikil";
import { createPageMetadata } from "../../../lib/metadata";

export const metadata = createPageMetadata({
  path: "/supplier/kerikil",
  title: "Jual Kerikil untuk Cor Beton & Drainase",
  description:
    "Jual kerikil berkualitas untuk campuran beton, pengerasan jalan, dan sistem drainase. Tersedia berbagai ukuran, siap antar ke lokasi proyek Anda.",
  image: "/produk/kerikil.webp",
});

export default function KerikilPage() {
  return <Kerikil />;
}