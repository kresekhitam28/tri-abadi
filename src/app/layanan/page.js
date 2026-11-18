// src/app/layanan/page.js
import Layanan from "../../components/Layanan";
import { createPageMetadata } from "../../lib/metadata";

export const metadata = createPageMetadata({
  path: "/layanan",
  title: "Layanan Konstruksi & Pengaspalan",
  description:
    "Layanan konstruksi PT Tri Abadi Makmur: pengaspalan jalan, paving block, kanstin, cor beton, tiang pancang, konstruksi bangunan, dan jasa arsitektur.",
  image: "/proyek/proyek-1.webp",
});

export default function LayananPage() {
  return <Layanan />;
}