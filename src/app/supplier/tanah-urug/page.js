// src/app/supplier/tanah-urug/page.js
import TanahUrug from "../../../components/TanahUrug";
import { createPageMetadata } from "../../../lib/metadata";

export const metadata = createPageMetadata({
  path: "/supplier/tanah-urug",
  title: "Tanah Urug",
  description:
    "Jual tanah urug untuk pengurugan lahan dan meninggikan permukaan tanah. Volume besar tersedia, harga ekonomis, pengiriman cepat.",
  image: "/produk/tanah-urug.png",
});

export default function TanahUrugPage() {
  return <TanahUrug />;
}