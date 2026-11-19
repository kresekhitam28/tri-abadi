// src/app/layanan/infrastruktur/pasang-paving-block/page.js
import PasangPavingBlock from "../../../../components/PasangPavingBlock";
import { projects } from "../../../../data/projects";
import { createPageMetadata } from "../../../../lib/metadata";

const project = projects.find(({ id }) => id === 40);

export const metadata = createPageMetadata({
  path: "/layanan/infrastruktur/pasang-paving-block",
  title: "Jasa Pasang Paving Block untuk Parkir dan Jalan",
  description:
    "Jasa pemasangan paving block untuk area parkir, jalan lingkungan, dan industri. Bandingkan upah pasang dan paket dengan material. Minta estimasi via WhatsApp.",
  image: project.src,
});

export default function PasangPavingBlockPage() {
  return <PasangPavingBlock project={project} />;
}
