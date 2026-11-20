// src/app/layanan/infrastruktur/pengaspalan/page.js
import Pengaspalan from "../../../../components/Pengaspalan";
import { asphaltPackagePrices, formatAsphaltPrice } from "../../../../data/asphaltPricing";
import { projects } from "../../../../data/projects";
import { createPageMetadata, serializeJsonLd, SITE_ENTITY_ID, SITE_URL } from "../../../../lib/metadata";

const project = projects.find(({ id }) => id === 26);

const path = "/layanan/infrastruktur/pengaspalan";

export const metadata = createPageMetadata({
  path,
  title: "Jasa Pengaspalan Jalan & Aspal Hotmix Bergaransi",
  description:
    `Jasa pengaspalan jalan dan parkiran di Jabodetabek, Banten & Jawa Barat. Overlay mulai ${formatAsphaltPrice(asphaltPackagePrices.A)}/m². Minta estimasi dan survei lokasi.`,
  image: project.src,
});

export default function PengaspalanPage() {
  const url = new URL(path, SITE_URL).href;
  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: "Jasa Pengaspalan Jalan & Aspal Hotmix",
    url,
    provider: { "@id": SITE_ENTITY_ID },
    areaServed: { "@type": "Place", name: "Jabodetabek" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(service) }} />
      <Pengaspalan project={project} />
    </>
  );
}
