// src/app/kontak/page.js
import Kontak from "../../components/Kontak";
import { createPageMetadata } from "../../lib/metadata";

export const metadata = createPageMetadata({
  path: "/kontak",
  title: "Kontak & Konsultasi Gratis",
  description:
    "Hubungi PT Tri Abadi Makmur untuk konsultasi pengaspalan jalan, paving block, kanstin, cor beton, dan konstruksi infrastruktur. Konsultasi & survei gratis.",
});

export default function KontakPage() {
  return <Kontak />;
}