import { MetadataRoute } from 'next';
// Pastikan path import ini sesuai dengan project Anda
import { articles } from '../data/articles';

// Wajib untuk output: export (Static Export)
export const dynamic = 'force-static';
export const revalidate = false;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://spesialisaspal.com';
  const today = new Date().toISOString().split('T')[0];

  // 1. Daftar halaman statis sesuai sitemap.xml lama Anda
  const staticRoutes = [
    { url: '/', priority: 1.0, changeFrequency: 'weekly' as const },
    { url: '/tentang-kami', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/layanan', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/proyek', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/supplier', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/kontak', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: '/blog', priority: 0.7, changeFrequency: 'weekly' as const },
    
    // Layanan Infrastruktur
    { url: '/layanan/infrastruktur/pengaspalan', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: '/layanan/infrastruktur/pasang-kanstin', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/layanan/infrastruktur/cor-beton-ready-mix', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/layanan/infrastruktur/pasang-grass-block', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/layanan/infrastruktur/pasang-paving-block', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/layanan/infrastruktur/pasang-pager-panel', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/layanan/infrastruktur/pasang-tiang-pancang', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/layanan/bangunan', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/layanan/arsitektur', priority: 0.7, changeFrequency: 'monthly' as const },

    // Supplier
    { url: '/supplier/abu-batu', priority: 0.6, changeFrequency: 'monthly' as const },
    { url: '/supplier/base-course', priority: 0.6, changeFrequency: 'monthly' as const },
    { url: '/supplier/batu-kali', priority: 0.6, changeFrequency: 'monthly' as const },
    { url: '/supplier/batu-makadam', priority: 0.6, changeFrequency: 'monthly' as const },
    { url: '/supplier/batu-split', priority: 0.6, changeFrequency: 'monthly' as const },
    { url: '/supplier/kerikil', priority: 0.6, changeFrequency: 'monthly' as const },
    { url: '/supplier/pasir-beton', priority: 0.6, changeFrequency: 'monthly' as const },
    { url: '/supplier/pasir-pasang', priority: 0.6, changeFrequency: 'monthly' as const },
    { url: '/supplier/sirtu', priority: 0.6, changeFrequency: 'monthly' as const },
    { url: '/supplier/tanah-urug', priority: 0.6, changeFrequency: 'monthly' as const },

    // Alat Berat (Heavy Equipment)
    { url: '/heavy-equipment/dozer', priority: 0.6, changeFrequency: 'monthly' as const },
    { url: '/heavy-equipment/excavator', priority: 0.6, changeFrequency: 'monthly' as const },
    { url: '/heavy-equipment/self-loader', priority: 0.6, changeFrequency: 'monthly' as const },
    { url: '/heavy-equipment/tandem-roller', priority: 0.6, changeFrequency: 'monthly' as const },
    { url: '/heavy-equipment/double-drum-roller', priority: 0.6, changeFrequency: 'monthly' as const },
    { url: '/heavy-equipment/pneumatic-roller', priority: 0.6, changeFrequency: 'monthly' as const },
    { url: '/heavy-equipment/baby-roller', priority: 0.6, changeFrequency: 'monthly' as const },
    { url: '/heavy-equipment/asphalt-finisher', priority: 0.6, changeFrequency: 'monthly' as const },
    { url: '/heavy-equipment/tronton-dump-truck', priority: 0.6, changeFrequency: 'monthly' as const },
  ].map((route) => ({
    url: `${baseUrl}${route.url}`,
    lastModified: today,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // 2. Daftar artikel blog (Otomatis dari articles.js)
  const blogRoutes = articles.map((post: any) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: today,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes];
}