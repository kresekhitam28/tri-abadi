// src/app/supplier/batu-kali/page.js
import BatuKali from "../../../components/BatuKali";
import { createPageMetadata } from "../../../lib/metadata";

export const metadata = createPageMetadata({
  path: "/supplier/batu-kali",
  title: "Jual Batu Kali & Batu Belah",
  description:
    "Jual batu kali dan batu belah murah berkualitas untuk pondasi bangunan, campuran beton, dan lapis pondasi jalan. Siap antar ke lokasi proyek.",
  image: "/produk/batu-kali.png",
});

export default function BatuKaliPage() {
  return <BatuKali />;
}