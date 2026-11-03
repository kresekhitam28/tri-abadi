// src/app/heavy-equipment/baby-roller/page.js
import BabyRoller from "../../../components/BabyRoller";

export const metadata = {
  title: "Sewa Baby Roller | PT Tri Abadi Makmur",
  description:
    "Sewa baby roller / vibratory roller murah untuk pemadatan tanah dan perataan lahan. Tersedia beberapa tipe GTM dengan spesifikasi lengkap.",
  alternates: {
    canonical: "/heavy-equipment/baby-roller",
  },
};

export default function BabyRollerPage() {
  return <BabyRoller />;
}