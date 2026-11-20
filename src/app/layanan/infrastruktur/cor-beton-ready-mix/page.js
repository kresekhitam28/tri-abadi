// src/app/layanan/infrastruktur/cor-beton-ready-mix/page.js
import CorBetonReadyMix from "../../../../components/CorBetonReadyMix";
import { projects } from "../../../../data/projects";
import { createPageMetadata, serializeJsonLd, SITE_ENTITY_ID, SITE_URL } from "../../../../lib/metadata";

const project = projects.find(({ id }) => id === 10);

const path = "/layanan/infrastruktur/cor-beton-ready-mix";

export const metadata = createPageMetadata({
  path,
  title: "Jasa Cor Beton Ready Mix untuk Jalan dan Lantai Pabrik",
  description:
    "Jasa pengecoran ready mix untuk jalan industri, parkir, dan lantai pabrik. Lihat referensi harga beton per m³ dan minta estimasi pengerjaan via WhatsApp.",
  image: project.src,
});

export default function CorBetonReadyMixPage() {
  const url = new URL(path, SITE_URL).href;
  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: "Jasa Cor Beton Ready Mix & Minimix",
    url,
    provider: { "@id": SITE_ENTITY_ID },
    areaServed: { "@type": "Place", name: "Jabodetabek" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(service) }} />
      <CorBetonReadyMix project={project} />
    </>
  );
}
