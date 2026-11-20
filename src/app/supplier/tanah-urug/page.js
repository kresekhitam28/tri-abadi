// src/app/supplier/tanah-urug/page.js
import TanahUrug from "../../../components/TanahUrug";
import { createPageMetadata } from "../../../lib/metadata";

export const metadata = createPageMetadata({
  path: "/supplier/tanah-urug",
  title: "Jual Tanah Urug untuk Peninggian Lahan",
  description:
    "Jual tanah urug berkualitas untuk peninggian lahan, perataan kontur tanah, dan proyek konstruksi. Bebas sampah organik, siap antar volume besar.",
  image: "/produk/tanah-urug.png",
});

export default function TanahUrugPage() {
  return <TanahUrug />;
}