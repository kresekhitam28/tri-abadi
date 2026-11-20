import { pricingConfig } from "../data/pricingConfig";

export default function MaterialDeliveryInfo({ lang, specification }) {
  const en = lang === "en";
  const { minimumTrips, standardCapacityM3, trontonCapacityM3 } = pricingConfig.materials;
  const capacity = ([min, max]) => `±${min}–${max} m³`;

  return (
    <section aria-labelledby="material-delivery-title" className="mb-8 rounded-xl border border-slate-200 bg-white p-5 text-sm leading-relaxed text-slate-700">
      <h2 id="material-delivery-title" className="mb-3 text-lg font-semibold text-slate-950">{en ? "Material quotes and delivery" : "Penawaran dan Pengiriman Material"}</h2>
      <dl className="space-y-3">
        <div>
          <dt className="font-semibold">{en ? "Material specification" : "Ukuran atau kelas material"}</dt>
          <dd>{specification[en ? "en" : "id"]}</dd>
        </div>
        <div>
          <dt className="font-semibold">{en ? "Order volume and minimum delivery" : "Satuan pemesanan dan minimum muatan"}</dt>
          <dd>{en
            ? `Specify the required volume in m³. The minimum for delivery in Greater Jakarta is ${minimumTrips} dump-truck load. Indicative capacities are ${capacity(standardCapacityM3)} for a standard truck and ${capacity(trontonCapacityM3)} for a tronton truck.`
            : `Sampaikan kebutuhan dalam m³. Minimum pengiriman di Jabodetabek adalah ${minimumTrips} rit dump truck. Kapasitas acuan ${capacity(standardCapacityM3)} untuk truk standar dan ${capacity(trontonCapacityM3)} untuk tronton.`}</dd>
        </div>
        <div>
          <dt className="font-semibold">{en ? "Coverage and delivery charges" : "Cakupan dan ongkir"}</dt>
          <dd>{en
            ? "Construction work focuses on Greater Jakarta and western West Java. For loose material deliveries in Greater Jakarta and surrounding industrial areas, shipping is quoted based on the distance from the nearest depot or quarry."
            : "Pengerjaan konstruksi berfokus di Jabodetabek dan Jawa Barat bagian barat. Untuk pengiriman material lepas di Jabodetabek dan kawasan industri sekitarnya, ongkir dihitung berdasarkan jarak dari depot atau kuari terdekat."}</dd>
        </div>
      </dl>
      <p className="mt-3 font-medium">{en
        ? "Prices are quoted on request. Send the material type, estimated volume, and delivery address."
        : "Harga berdasarkan permintaan penawaran. Kirim jenis material, perkiraan volume, dan lokasi pengiriman."}</p>
    </section>
  );
}
