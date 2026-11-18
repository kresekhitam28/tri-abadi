// src/app/heavy-equipment/dozer/page.js
import Dozer from "../../../components/Dozer";
import { createPageMetadata } from "../../../lib/metadata";

export const metadata = createPageMetadata({
  path: "/heavy-equipment/dozer",
  title: "Sewa Dozer / Bulldozer",
  description:
    "Sewa dozer / bulldozer untuk penggusuran lahan, perataan tanah, dan pekerjaan konstruksi. Melayani Jabodetabek dan sekitarnya.",
  image: "/proyek/proyek-46.webp",
});

export default function DozerPage() {
  return <Dozer />;
}