// src/app/layanan/page.js
import Layanan from "../../components/Layanan";

export const metadata = {
  title: "Layanan Konstruksi & Pengaspalan",
  description:
    "Layanan konstruksi PT Tri Abadi Makmur: pengaspalan jalan, paving block, kanstin, cor beton, tiang pancang, konstruksi bangunan, dan jasa arsitektur.",
  alternates: {
    canonical: "/layanan",
  },
};

export default function LayananPage() {
  return <Layanan />;
}