// src/app/supplier/batu-kali/page.js
import BatuKali from "../../../components/BatuKali";
import { createPageMetadata } from "../../../lib/metadata";

export const metadata = createPageMetadata({
  path: "/supplier/batu-kali",
  title: "Batu Kali / Batu Belah",
  description:
    "Jual batu kali atau batu belah murah berkualitas untuk pondasi, campuran beton, dan konstruksi. Siap antar.",
  image: "/produk/batu-kali.png",
});

export default function BatuKaliPage() {
  return <BatuKali />;
}