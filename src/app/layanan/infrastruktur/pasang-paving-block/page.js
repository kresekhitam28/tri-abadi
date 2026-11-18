// src/app/layanan/infrastruktur/pasang-paving-block/page.js
import PasangPavingBlock from "../../../../components/PasangPavingBlock";
import { createPageMetadata } from "../../../../lib/metadata";

export const metadata = createPageMetadata({
  path: "/layanan/infrastruktur/pasang-paving-block",
  title: "Jasa Pasang Paving Block Murah Tangerang & Jabodetabek",
  description:
    "Jasa pasang paving block untuk perumahan, trotoar, parkir & industri di Tangerang & Jabodetabek. Rapi, presisi, harga murah, dan bergaransi. Konsultasi gratis via WhatsApp.",
  image: "/proyek/proyek-40.webp",
});

export default function PasangPavingBlockPage() {
  return <PasangPavingBlock />;
}