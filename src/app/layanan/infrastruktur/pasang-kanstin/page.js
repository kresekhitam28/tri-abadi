// src/app/layanan/infrastruktur/pasang-kanstin/page.js
import PasangKanstin from "../../../../components/PasangKanstin";
import { createPageMetadata } from "../../../../lib/metadata";

export const metadata = createPageMetadata({
  path: "/layanan/infrastruktur/pasang-kanstin",
  title: "Pasang Kanstin",
  description:
    "Jasa harga dan pasang kanstin untuk trotoar, taman, DKI, dan S. Dikerjakan rapi, presisi, dan tahan lama oleh tenaga berpengalaman.",
  image: "/proyek/pasang-kanstin.webp",
});

export default function PasangKanstinPage() {
  return <PasangKanstin />;
}