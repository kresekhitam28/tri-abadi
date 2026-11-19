export const asphaltPackagePrices = {
  A: 75000,
  B: 95000,
  C: 100000,
  D: 150000,
};

export const asphaltCostRanges = [
  { label: { id: "Overlay / Pelapisan ulang", en: "Overlay resurfacing" }, from: asphaltPackagePrices.A, to: 100000 },
  { label: { id: "Tambal sulam", en: "Asphalt patching" }, from: asphaltPackagePrices.B, to: 120000 },
  { label: { id: "Pengaspalan baru", en: "New hotmix paving" }, from: asphaltPackagePrices.D, to: 250000 },
];

export function formatAsphaltPrice(amount, lang = "id") {
  return `Rp${new Intl.NumberFormat(lang === "en" ? "en-US" : "id-ID").format(amount)}`;
}
