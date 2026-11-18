// src/app/alat-berat/page.js
import HeavyEquipment from "../../components/HeavyEquipment";
import { createPageMetadata } from "../../lib/metadata";

export const metadata = createPageMetadata({
  path: "/alat-berat",
  title: "Sewa Alat Berat",
  description:
    "Sewa alat berat untuk proyek konstruksi — dozer, excavator, tandem roller, asphalt finisher, dump truck, dan lainnya. Operator berpengalaman & armada terawat.",
  image: "/proyek/proyek-47.webp",
});

export default function AlatBeratPage() {
  return <HeavyEquipment />;
}