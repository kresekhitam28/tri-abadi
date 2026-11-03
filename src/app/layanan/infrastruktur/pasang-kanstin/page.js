// src/app/layanan/infrastruktur/pasang-kanstin/page.js
import PasangKanstin from "../../../../components/PasangKanstin";

export const metadata = {
  title: "Pasang Kanstin | PT Tri Abadi Makmur",
  description:
    "Jasa harga dan pasang kanstin untuk trotoar, taman, DKI, dan S. Dikerjakan rapi, presisi, dan tahan lama oleh tenaga berpengalaman.",
  alternates: {
    canonical: "/layanan/infrastruktur/pasang-kanstin",
  },
};

export default function PasangKanstinPage() {
  return <PasangKanstin />;
}