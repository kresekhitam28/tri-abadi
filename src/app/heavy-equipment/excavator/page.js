// src/app/heavy-equipment/excavator/page.js
import Excavator from "../../../components/Excavator";
import { createPageMetadata } from "../../../lib/metadata";

export const metadata = createPageMetadata({
  path: "/heavy-equipment/excavator",
  title: "Sewa Excavator / Backhoe",
  description:
    "Sewa excavator dan backhoe murah di Jabodetabek untuk penggalian, pembongkaran, dan pekerjaan konstruksi skala besar. Tersedia spesifikasi lengkap dan tips pengoperasian.",
  image: "/proyek/proyek-47.webp",
});

export default function ExcavatorPage() {
  return <Excavator />;
}