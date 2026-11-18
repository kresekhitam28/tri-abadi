// src/app/heavy-equipment/pneumatic-roller/page.js
import PneumaticRoller from "../../../components/PneumaticRoller";
import { createPageMetadata } from "../../../lib/metadata";

export const metadata = createPageMetadata({
  path: "/heavy-equipment/pneumatic-roller",
  title: "Sewa Pneumatic Roller",
  description:
    "Sewa pneumatic roller / pneumatic tired roller murah di Jabodetabek untuk pemadatan material granular dan hotmix. Berat hingga 80 ton dengan 9-19 roda.",
  image: "/proyek/proyek-51.webp",
});

export default function PneumaticRollerPage() {
  return <PneumaticRoller />;
}