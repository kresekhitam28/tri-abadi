// src/app/layanan/infrastruktur/cor-beton-ready-mix/page.js
import CorBetonReadyMix from "../../../../components/CorBetonReadyMix";
import { projects } from "../../../../data/projects";
import { createPageMetadata } from "../../../../lib/metadata";

const project = projects.find(({ id }) => id === 10);

export const metadata = createPageMetadata({
  path: "/layanan/infrastruktur/cor-beton-ready-mix",
  title: "Jasa Cor Beton Ready Mix untuk Jalan dan Lantai Pabrik",
  description:
    "Jasa pengecoran ready mix untuk jalan industri, parkir, dan lantai pabrik. Lihat referensi harga beton per m³ dan minta estimasi pengerjaan via WhatsApp.",
  image: project.src,
});

export default function CorBetonReadyMixPage() {
  return <CorBetonReadyMix project={project} />;
}
