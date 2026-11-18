// src/app/heavy-equipment/self-loader/page.js
import SelfLoader from "../../../components/SelfLoader";
import { createPageMetadata } from "../../../lib/metadata";

export const metadata = createPageMetadata({
  path: "/heavy-equipment/self-loader",
  title: "Sewa Self Loader",
  description:
    "Sewa self loader harga terjangkau untuk angkutan kayu log dan material berat. Tersedia berbagai ukuran, cocok untuk proyek konstruksi, pertanian, dan kehutanan.",
  image: "/proyek/proyek-49.webp",
});

export default function SelfLoaderPage() {
  return <SelfLoader />;
}