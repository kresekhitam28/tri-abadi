// src/app/supplier/sirtu/page.js
import Sirtu from "../../../components/Sirtu";
import { createPageMetadata } from "../../../lib/metadata";

export const metadata = createPageMetadata({
  path: "/supplier/sirtu",
  title: "Jual Sirtu (Pasir Batu) untuk Urugan Jalan & Lahan",
  description:
    "Jual Sirtu (pasir batu) berkualitas untuk urugan jalan, peninggian lahan, dan lapis pondasi bawah. Cepat padat, ekonomis, siap antar ke lokasi proyek.",
  image: "/produk/sirtu.png",
});

export default function SirtuPage() {
  return <Sirtu />;
}