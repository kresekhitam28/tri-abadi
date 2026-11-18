// src/app/layanan/infrastruktur/pasang-pager-panel/page.js
import PasangPagerPanel from "../../../../components/PasangPagerPanel";
import { createPageMetadata } from "../../../../lib/metadata";

export const metadata = createPageMetadata({
  path: "/layanan/infrastruktur/pasang-pager-panel",
  title: "Pasang Pager Panel",
  description:
    "Jasa pasang pager panel beton precast untuk lahan, pabrik, dan kawasan industri. Kokoh, rapi, dan hemat waktu pemasangan.",
  image: "/proyek/proyek-5.webp",
});

export default function PasangPagerPanelPage() {
  return <PasangPagerPanel />;
}