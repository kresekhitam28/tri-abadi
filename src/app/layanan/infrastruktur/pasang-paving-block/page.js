// src/app/layanan/infrastruktur/pasang-paving-block/page.js
import PasangPavingBlock from "../../../../components/PasangPavingBlock";
import { projects } from "../../../../data/projects";
import { createPageMetadata, serializeJsonLd, SITE_ENTITY_ID, SITE_URL } from "../../../../lib/metadata";

const project = projects.find(({ id }) => id === 40);

const path = "/layanan/infrastruktur/pasang-paving-block";

export const metadata = createPageMetadata({
  path,
  title: "Jasa Pasang Paving Block untuk Parkir dan Jalan",
  description:
    "Jasa pemasangan paving block untuk area parkir, jalan lingkungan, dan industri. Bandingkan upah pasang dan paket dengan material. Minta estimasi via WhatsApp.",
  image: project.src,
});

export default function PasangPavingBlockPage() {
  const url = new URL(path, SITE_URL).href;
  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: "Jasa Pasang Paving Block",
    url,
    provider: { "@id": SITE_ENTITY_ID },
    areaServed: { "@type": "Place", name: "Jabodetabek" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(service) }} />
      <PasangPavingBlock project={project} />
    </>
  );
}
