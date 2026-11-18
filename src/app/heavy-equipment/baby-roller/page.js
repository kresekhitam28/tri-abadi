// src/app/heavy-equipment/baby-roller/page.js
import BabyRoller from "../../../components/BabyRoller";
import { createPageMetadata } from "../../../lib/metadata";

export const metadata = createPageMetadata({
  path: "/heavy-equipment/baby-roller",
  title: "Sewa Baby Roller",
  description:
    "Sewa baby roller / vibratory roller murah untuk pemadatan tanah dan perataan lahan. Tersedia beberapa tipe GTM dengan spesifikasi lengkap.",
  image: "/proyek/proyek-52.webp",
});

export default function BabyRollerPage() {
  return <BabyRoller />;
}