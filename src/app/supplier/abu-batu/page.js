// src/app/supplier/abu-batu/page.js
import AbuBatu from "../../../components/AbuBatu";
import { createPageMetadata } from "../../../lib/metadata";

export const metadata = createPageMetadata({
  path: "/supplier/abu-batu",
  title: "Jual Abu Batu Siap Antar",
  description:
    "Menjual abu batu siap antar untuk campuran beton, paving block, dan material konstruksi lainnya. Harga ekonomis, kualitas terjamin.",
  image: "/produk/abu-batu.png",
});

export default function AbuBatuPage() {
  return <AbuBatu />;
}