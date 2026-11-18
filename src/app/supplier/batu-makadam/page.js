// src/app/supplier/batu-makadam/page.js
import BatuMakadam from "../../../components/BatuMakadam";
import { createPageMetadata } from "../../../lib/metadata";

export const metadata = createPageMetadata({
  path: "/supplier/batu-makadam",
  title: "Batu Makadam",
  description:
    "Jual batu makadam murah untuk pengerasan jalan, bantalan rel, dan konstruksi. Kualitas terjamin, siap antar.",
  image: "/produk/batu-makadam.png",
});

export default function BatuMakadamPage() {
  return <BatuMakadam />;
}