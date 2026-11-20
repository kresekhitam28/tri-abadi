export const WHATSAPP_URL = "https://wa.me/6282258089367";

const asphaltFields = ["projectLocation", "area", "work", "start"];

const requests = {
  asphalt: {
    id: "estimasi jasa pengaspalan",
    en: "an asphalt paving quote",
    fields: asphaltFields,
  },
  asphaltSurvey: {
    id: "konsultasi dan survei lokasi untuk pengaspalan",
    en: "an asphalt paving consultation and site survey",
    fields: asphaltFields,
  },
  industrialPavementSurvey: {
    id: "survei lokasi untuk membandingkan aspal hotmix dan cor beton untuk akses truk",
    en: "a site survey to compare hotmix asphalt and concrete for truck access",
    fields: asphaltFields,
  },
  paving: {
    id: "estimasi jasa pasang paving block",
    en: "a paving block installation quote",
    fields: ["projectLocation", "area", "work", "start"],
  },
  pavingMaterial: {
    id: "penawaran material paving block",
    en: "a paving block supply quote",
    fields: ["deliveryLocation", "area", "pavingSpec", "delivery"],
  },
  concrete: {
    id: "estimasi jasa pengecoran beton",
    en: "a concrete pouring quote",
    fields: ["projectLocation", "concreteSize", "work", "start"],
  },
  concreteSurvey: {
    id: "survei lokasi untuk jasa pengecoran beton",
    en: "a site survey for concrete pouring",
    fields: ["projectLocation", "concreteSize", "work", "start"],
  },
  concreteMaterial: {
    id: "penawaran pasokan beton ready mix",
    en: "a ready-mix concrete supply quote",
    fields: ["deliveryLocation", "volume", "concreteSpec", "delivery"],
  },
};

const labels = {
  id: {
    projectLocation: "Lokasi proyek",
    deliveryLocation: "Lokasi pengiriman",
    area: "Perkiraan luas (m²)",
    work: "Jenis pekerjaan",
    pavingSpec: "Model dan ketebalan paving",
    concreteSize: "Perkiraan luas (m²) atau volume (m³)",
    volume: "Perkiraan volume (m³)",
    concreteSpec: "Mutu beton yang dibutuhkan",
    start: "Target mulai",
    delivery: "Target tanggal kirim",
  },
  en: {
    projectLocation: "Project location",
    deliveryLocation: "Delivery location",
    area: "Approximate area (m²)",
    work: "Type of work",
    pavingSpec: "Paver style and thickness",
    concreteSize: "Approximate area (m²) or volume (m³)",
    volume: "Approximate volume (m³)",
    concreteSpec: "Required concrete grade",
    start: "Preferred start date",
    delivery: "Preferred delivery date",
  },
};

export function projectQuoteHref(request, lang, location = "") {
  const language = lang === "en" ? "en" : "id";
  const quote = requests[request];
  const intro = language === "en"
    ? `Hello PT Tri Abadi Makmur, I would like ${quote.en}.`
    : `Halo PT Tri Abadi Makmur, saya ingin minta ${quote.id}.`;
  const questions = quote.fields.map((field) => `${labels[language][field]}: ${field === "projectLocation" ? location : ""}`);
  const message = [intro, "", ...questions].join("\n");

  return `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
}
