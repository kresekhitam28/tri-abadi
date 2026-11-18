// src/app/heavy-equipment/tronton-dump-truck/page.js
import DumpTruck from "../../../components/DumpTruck";
import { createPageMetadata } from "../../../lib/metadata";

export const metadata = createPageMetadata({
  path: "/heavy-equipment/tronton-dump-truck",
  title: "Sewa Tronton / Dump Truck",
  description:
    "Sewa tronton dan dump truck murah untuk angkut material, tanah, dan batu. Melayani Jabodetabek dan sekitarnya dengan berbagai varian dump truck.",
  image: "/proyek/proyek-54.webp",
});

export default function DumpTruckPage() {
  return <DumpTruck />;
}