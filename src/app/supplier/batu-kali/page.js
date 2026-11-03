// src/app/supplier/batu-kali/page.js
import BatuKali from "../../../components/BatuKali";

export const metadata = {
  title: "Batu Kali / Batu Belah | PT Tri Abadi Makmur",
  description:
    "Jual batu kali atau batu belah murah berkualitas untuk pondasi, campuran beton, dan konstruksi. Siap antar.",
  alternates: {
    canonical: "/supplier/batu-kali",
  },
};

export default function BatuKaliPage() {
  return <BatuKali />;
}