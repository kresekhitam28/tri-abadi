// src/app/supplier/batu-makadam/page.js
import BatuMakadam from "../../../components/BatuMakadam";
import { createPageMetadata } from "../../../lib/metadata";

export const metadata = createPageMetadata({
  path: "/supplier/batu-makadam",
  title: "Jual Batu Makadam Siap Antar",
  description:
    "Jual batu makadam murah berkualitas untuk lapisan pondasi jalan (base course), area parkir, dan konstruksi. Siap antar ke lokasi proyek Anda.",
  image: "/produk/batu-makadam.png",
});

export default function BatuMakadamPage() {
  return <BatuMakadam />;
}