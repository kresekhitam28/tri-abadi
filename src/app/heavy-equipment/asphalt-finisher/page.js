// src/app/heavy-equipment/asphalt-finisher/page.js
import AsphaltFinisher from "../../../components/AsphaltFinisher";
import { createPageMetadata } from "../../../lib/metadata";

export const metadata = createPageMetadata({
  path: "/heavy-equipment/asphalt-finisher",
  title: "Sewa Asphalt Finisher",
  description:
    "Sewa asphalt finisher untuk penghamparan aspal presisi. Cocok untuk proyek pengaspalan jalan, tol, dan perbaikan jalan.",
  image: "/proyek/proyek-53.webp",
});

export default function AsphaltFinisherPage() {
  return <AsphaltFinisher />;
}