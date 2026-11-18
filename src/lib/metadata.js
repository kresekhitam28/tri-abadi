export const SITE_NAME = "PT Tri Abadi Makmur";
export const SITE_URL = new URL(
  process.env.NEXT_PUBLIC_SITE_URL || "https://spesialisaspal.com",
).origin;

export function createPageMetadata({
  path,
  title,
  description,
  image = "/logo.webp",
  socialDescription = description,
  type = "website",
  publishedTime,
}) {
  const url = new URL(path, SITE_URL).href;
  const social = {
    title: `${title} | ${SITE_NAME}`,
    description: socialDescription,
    images: [new URL(image, SITE_URL).href],
  };

  return {
    title: social.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      ...social,
      url,
      type,
      siteName: SITE_NAME,
      locale: "id_ID",
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: { ...social, card: "summary_large_image" },
  };
}
