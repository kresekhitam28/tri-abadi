// src/app/supplier/pasir-beton/page.js
import PasirBeton from "../../../components/PasirBeton";
import { createPageMetadata } from "../../../lib/metadata";

export const metadata = createPageMetadata({
  path: "/supplier/pasir-beton",
  title: "Pasir Beton",
  description:
    "Jual pasir beton halus untuk cor beton, plesteran, dan acian. Butiran seragam, bersih dari kotoran, kualitas terjamin.",
  image: "/produk/pasir-beton.png",
});

export default function PasirBetonPage() {
  return <PasirBeton />;
}