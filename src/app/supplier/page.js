// src/app/supplier/page.js
import Supplier from "../../components/Supplier";

export const metadata = {
  title: "Supplier Material Konstruksi | PT Tri Abadi Makmur",
  description:
    "Jual material konstruksi: abu batu, base course, batu split, pasir, sirtu, tanah urug, dan lainnya. Harga bersaing, pengiriman cepat.",
  alternates: {
    canonical: "/supplier",
  },
};

export default function SupplierPage() {
  return <Supplier />;
}