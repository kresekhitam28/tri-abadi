// src/app/heavy-equipment/double-drum-roller/page.js
import DoubleDrumRoller from "../../../components/DoubleDrumRoller";
import { createPageMetadata } from "../../../lib/metadata";

export const metadata = createPageMetadata({
  path: "/heavy-equipment/double-drum-roller",
  title: "Sewa Double Drum Roller",
  description:
    "Sewa double drum roller untuk pemadatan aspal dan hot mix. Cocok untuk proyek pengaspalan jalan dan perataan lahan.",
  image: "/proyek/proyek-50.webp",
});

export default function DoubleDrumRollerPage() {
  return <DoubleDrumRoller />;
}