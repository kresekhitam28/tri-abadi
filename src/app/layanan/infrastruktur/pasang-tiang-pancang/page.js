// src/app/layanan/infrastruktur/pasang-tiang-pancang/page.js
import PasangTiangPancang from "../../../../components/PasangTiangPancang";
import { createPageMetadata } from "../../../../lib/metadata";

export const metadata = createPageMetadata({
  path: "/layanan/infrastruktur/pasang-tiang-pancang",
  title: "Pasang Tiang Pancang",
  description:
    "Jasa pasang tiang pancang untuk pondasi bangunan bertingkat, pabrik, dan infrastruktur. Kokoh, presisi, dan cocok untuk tanah lunak.",
  image: "/proyek/proyek-42.webp",
});

export default function PasangTiangPancangPage() {
  return <PasangTiangPancang />;
}