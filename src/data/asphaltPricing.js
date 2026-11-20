import { pricingConfig } from "./pricingConfig";

export const asphaltPackagePrices = Object.fromEntries(
  Object.entries(pricingConfig.asphalt.packages).map(([code, { ratePerM2 }]) => [code, ratePerM2]),
);

export const asphaltCostRanges = [
  { label: { id: "Overlay / Pelapisan ulang", en: "Overlay resurfacing" }, from: asphaltPackagePrices.A, to: 100000 },
  { label: { id: "Tambal sulam", en: "Asphalt patching" }, from: asphaltPackagePrices.B, to: 120000 },
  { label: { id: "Pengaspalan baru", en: "New hotmix paving" }, from: asphaltPackagePrices.D, to: 250000 },
];

export function formatAsphaltPrice(amount, lang = "id") {
  return `Rp${new Intl.NumberFormat(lang === "en" ? "en-US" : "id-ID").format(amount)}`;
}
