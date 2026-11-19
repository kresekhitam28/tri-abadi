// src/app/layanan/infrastruktur/pengaspalan/page.js
import Pengaspalan from "../../../../components/Pengaspalan";
import { asphaltPackagePrices, formatAsphaltPrice } from "../../../../data/asphaltPricing";
import { projects } from "../../../../data/projects";
import { createPageMetadata } from "../../../../lib/metadata";

const project = projects.find(({ id }) => id === 26);

export const metadata = createPageMetadata({
  path: "/layanan/infrastruktur/pengaspalan",
  title: "Jasa Pengaspalan Jalan & Aspal Hotmix Bergaransi",
  description:
    `Jasa pengaspalan jalan dan parkiran di Jabodetabek, Banten & Jawa Barat. Overlay mulai ${formatAsphaltPrice(asphaltPackagePrices.A)}/m². Minta estimasi dan survei lokasi.`,
  image: project.src,
});

export default function PengaspalanPage() {
  return <Pengaspalan project={project} />;
}
