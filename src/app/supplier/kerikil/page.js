// src/app/supplier/kerikil/page.js
import Kerikil from "../../../components/Kerikil";
import { createPageMetadata } from "../../../lib/metadata";

export const metadata = createPageMetadata({
  path: "/supplier/kerikil",
  title: "Kerikil",
  description:
    "Jual kerikil untuk campuran beton, pengerasan jalan, dan drainase. Berbagai ukuran tersedia, siap antar.",
  image: "/produk/kerikil.png",
});

export default function KerikilPage() {
  return <Kerikil />;
}