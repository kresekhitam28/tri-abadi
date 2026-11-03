import { MetadataRoute } from 'next';

// Wajib untuk output: export (Static Export)
export const dynamic = 'force-static';
export const revalidate = false;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://spesialisaspal.com/sitemap.xml',
  };
}