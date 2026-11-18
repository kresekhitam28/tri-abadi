// src/app/supplier/page.js
import Supplier from "../../components/Supplier";
import { createPageMetadata } from "../../lib/metadata";

export const metadata = createPageMetadata({
  path: "/supplier",
  title: "Supplier Material Konstruksi",
  description:
    "Jual material konstruksi: abu batu, base course, batu split, pasir, sirtu, tanah urug, dan lainnya. Harga bersaing, pengiriman cepat.",
  image: "/produk/batu-split.png",
});

export default function SupplierPage() {
  return <Supplier />;
}