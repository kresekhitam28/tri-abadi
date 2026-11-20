// src/app/supplier/pasir-beton/page.js
import PasirBeton from "../../../components/PasirBeton";
import { createPageMetadata } from "../../../lib/metadata";

export const metadata = createPageMetadata({
  path: "/supplier/pasir-beton",
  title: "Jual Pasir Beton Halus untuk Cor",
  description:
    "Jual pasir beton halus, bersih dari lumpur, cocok untuk cor struktural, plesteran, dan acian. Kualitas terjamin, siap antar ke lokasi proyek Anda.",
  image: "/produk/pasir-beton.png",
});

export default function PasirBetonPage() {
  return <PasirBeton />;
}