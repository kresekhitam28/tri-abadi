// src/app/layanan/infrastruktur/pasang-kanstin/page.js
import PasangKanstin from "../../../../components/PasangKanstin";
import { createPageMetadata } from "../../../../lib/metadata";

export const metadata = createPageMetadata({
  path: "/layanan/infrastruktur/pasang-kanstin",
  title: "Jasa Pasang Kanstin",
  description:
    "Jasa pemasangan kanstin untuk trotoar, taman, area parkir, jalan lingkungan, dan kawasan industri. Tim membantu menentukan tipe kanstin, mengukur lokasi, dan menyusun estimasi pekerjaan. Hubungi kami untuk konsultasi dan jadwalkan survei.",
  image: "/proyek/pasang-kanstin.webp",
});

export default function PasangKanstinPage() {
  return <PasangKanstin />;
}