// src/app/layanan/infrastruktur/pasang-grass-block/page.js
import PasangGrassBlock from "../../../../components/PasangGrassBlock";
import { createPageMetadata } from "../../../../lib/metadata";

export const metadata = createPageMetadata({
  path: "/layanan/infrastruktur/pasang-grass-block",
  title: "Pasang Grass Block",
  description:
    "Jasa pasang grass block untuk area parkir, jalan lingkungan, dan taman. Rapi, kuat, ramah lingkungan, dan hemat biaya.",
});

export default function PasangGrassBlockPage() {
  return <PasangGrassBlock />;
}
