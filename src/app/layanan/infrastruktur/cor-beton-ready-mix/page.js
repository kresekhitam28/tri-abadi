// src/app/layanan/infrastruktur/cor-beton-ready-mix/page.js
import CorBetonReadyMix from "../../../../components/CorBetonReadyMix";
import { createPageMetadata } from "../../../../lib/metadata";

export const metadata = createPageMetadata({
  path: "/layanan/infrastruktur/cor-beton-ready-mix",
  title: "Jasa Cor Beton Ready Mix Tangerang & Jabodetabek",
  description:
    "Jasa pengecoran beton ready mix untuk jalan, halaman pabrik, dan rumah di Tangerang & Jabodetabek. Mutu beton terjamin, pengerjaan cepat, dan harga transparan.",
  image: "/proyek/proyek-10.webp",
});

export default function CorBetonReadyMixPage() {
  return <CorBetonReadyMix />;
}