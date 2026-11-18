// src/app/heavy-equipment/tandem-roller/page.js
import TandemRoller from "../../../components/TandemRoller";
import { createPageMetadata } from "../../../lib/metadata";

export const metadata = createPageMetadata({
  path: "/heavy-equipment/tandem-roller",
  title: "Sewa Tandem Roller",
  description:
    "Sewa tandem roller termurah di Indonesia untuk pengaspalan jalan, jembatan, dan proyek konstruksi. Tersedia two axle dan three axle tandem roller.",
  image: "/proyek/proyek-48.webp",
});

export default function TandemRollerPage() {
  return <TandemRoller />;
}