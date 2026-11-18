// src/app/supplier/sirtu/page.js
import Sirtu from "../../../components/Sirtu";
import { createPageMetadata } from "../../../lib/metadata";

export const metadata = createPageMetadata({
  path: "/supplier/sirtu",
  title: "Sirtu (Pasir Batu)",
  description:
    "Jual sirtu untuk urugan jalan dan pengurugan lahan. Kuat, stabil, ekonomis untuk proyek bervolume besar.",
  image: "/produk/sirtu.png",
});

export default function SirtuPage() {
  return <Sirtu />;
}