// src/lib/betonJsonLd.js
const SITE_NAME = "PT Tri Abadi Makmur";
const CURRENCY = "IDR";
const SITE_URL = "https://spesialisaspal.com";
const BETON_PATH = "/layanan/infrastruktur/cor-beton-ready-mix";

export const betonData = [
  {
    no: 1,
    nama: { id: "Klas A (K 500)", en: "Class A (K 500)" },
    ket: {
      id: "Beton untuk precast / prestressed",
      en: "Concrete for precast / prestressed",
    },
    harga: null,
    slump: "±12",
  },
  {
    no: 2,
    nama: { id: "Klas P (K 400)", en: "Class P (K 400)" },
    ket: {
      id: "Beton untuk rabat jalan klas 1 (jalan negara / jalan tol)",
      en: "Concrete for class 1 road slab (national road / toll road)",
    },
    harga: 1200000,
    slump: "±12",
  },
  {
    no: 3,
    nama: { id: "Klas B (K 375)", en: "Class B (K 375)" },
    ket: {
      id: "Beton untuk lantai dan bangunan pabrik / rigid jalan",
      en: "Concrete for floors and factory buildings / rigid pavement",
    },
    harga: 1050000,
    slump: "±12",
  },
  {
    no: 4,
    nama: { id: "Klas B (K 350)", en: "Class B (K 350)" },
    ket: {
      id: "Beton untuk lantai dan bangunan pabrik / rigid jalan",
      en: "Concrete for floors and factory buildings / rigid pavement",
    },
    harga: 1000000,
    slump: "±12",
  },
  {
    no: 5,
    nama: { id: "Klas K 325", en: "Class K 325" },
    ket: {
      id: "Beton untuk konstruksi bangunan ruko / rumah bertingkat 3–5 lantai",
      en: "Concrete for shophouse / 3–5 story residential buildings",
    },
    harga: 950000,
    slump: "±12",
  },
  {
    no: 6,
    nama: { id: "Klas K 300", en: "Class K 300" },
    ket: {
      id: "Beton untuk konstruksi bangunan ruko / rumah bertingkat 3–5 lantai",
      en: "Concrete for shophouse / 3–5 story residential buildings",
    },
    harga: 920000,
    slump: "±12",
  },
  {
    no: 7,
    nama: { id: "Klas K 275", en: "Class K 275" },
    ket: {
      id: "Konstruksi bangunan bertingkat dua lantai, ruko / rumah tinggal / standar",
      en: "Two-story building construction, shophouse / residential / standard",
    },
    harga: 880000,
    slump: "±12",
  },
  {
    no: 8,
    nama: { id: "Klas K 250", en: "Class K 250" },
    ket: {
      id: "Konstruksi bangunan bertingkat dua lantai, ruko / rumah tinggal / standar",
      en: "Two-story building construction, shophouse / residential / standard",
    },
    harga: 850000,
    slump: "±12",
  },
  {
    no: 9,
    nama: { id: "Klas K 225", en: "Class K 225" },
    ket: {
      id: "Konstruksi bangunan bertingkat dua lantai, ruko / rumah tinggal / standar",
      en: "Two-story building construction, shophouse / residential / standard",
    },
    harga: 820000,
    slump: "±12",
  },
  {
    no: 10,
    nama: { id: "Klas D (K 175)", en: "Class D (K 175)" },
    ket: {
      id: "Konstruksi bangunan non-struktural / jalan lingkungan",
      en: "Non-structural building construction / neighborhood roads",
    },
    harga: 790000,
    slump: "±12",
  },
  {
    no: 11,
    nama: { id: "Klas E (K 125)", en: "Class E (K 125)" },
    ket: {
      id: "Konstruksi lantai dasar / LC (Lean Concrete)",
      en: "Ground floor construction / LC (Lean Concrete)",
    },
    harga: 750000,
    slump: "±12",
  },
  {
    no: 12,
    nama: { id: "Klas B-0", en: "Class B-0" },
    ket: {
      id: "Dasar perkerasan sebelum rigid / lantai kerja",
      en: "Base pavement before rigid / lean concrete work",
    },
    harga: 720000,
    slump: "±12",
  },
];

const pick = (field, lang) => {
  if (!field) return "";
  if (typeof field === "string") return field;
  return field[lang] || field.id || field.en || "";
};

export function getBetonJsonLd(lang = "id") {
  const headerTitle =
    lang === "en"
      ? "Ready-Mix Concrete Prices Tangerang & Greater Jakarta"
      : "Daftar Harga Cor Beton Ready Mix Tangerang & Jabodetabek";

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: headerTitle,
    itemListElement: betonData.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: pick(b.nama, lang),
        description: pick(b.ket, lang),
        category: "Ready Mix Concrete",
        brand: { "@type": "Brand", name: SITE_NAME },
        ...(b.harga
          ? {
              offers: {
                "@type": "Offer",
                price: b.harga,
                priceCurrency: CURRENCY,
                availability: "https://schema.org/InStock",
                url: `${SITE_URL}${BETON_PATH}`,
                priceSpecification: {
                  "@type": "UnitPriceSpecification",
                  price: b.harga,
                  priceCurrency: CURRENCY,
                  unitText: "m³",
                },
              },
            }
          : {}),
      },
    })),
  };
}
