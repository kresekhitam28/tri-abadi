import { MetadataRoute } from 'next';
import { articles } from '../data/articles';

export const dynamic = 'force-static';
export const revalidate = false;

const BASE_URL = 'https://spesialisaspal.com';

// ⚠️ Hanya update tanggal saat halaman BENAR-BENAR diubah.
// Google abaikan lastmod kalau tidak sesuai perubahan aktual.
const STATIC_LAST_MODIFIED: Record<string, string> = {
  '/': '2026-01-15',
  '/tentang-kami': '2025-06-01',
  '/layanan': '2026-01-15',
  '/proyek': '2026-01-15',
  '/supplier': '2025-06-01',
  '/kontak': '2025-06-01',
  '/blog': '2026-11-01',
  '/layanan/infrastruktur/pengaspalan': '2026-01-15',
  '/layanan/infrastruktur/pasang-kanstin': '2025-06-01',
  '/layanan/infrastruktur/cor-beton-ready-mix': '2025-06-01',
  '/layanan/infrastruktur/pasang-grass-block': '2025-06-01',
  '/layanan/infrastruktur/pasang-paving-block': '2026-01-15',
  '/layanan/infrastruktur/pasang-pager-panel': '2025-06-01',
  '/layanan/infrastruktur/pasang-tiang-pancang': '2025-06-01',
  '/layanan/bangunan': '2025-06-01',
  '/layanan/arsitektur': '2025-06-01',
  '/supplier/abu-batu': '2025-06-01',
  '/supplier/base-course': '2025-06-01',
  '/supplier/batu-kali': '2025-06-01',
  '/supplier/batu-makadam': '2025-06-01',
  '/supplier/batu-split': '2025-06-01',
  '/supplier/kerikil': '2025-06-01',
  '/supplier/pasir-beton': '2025-06-01',
  '/supplier/pasir-pasang': '2025-06-01',
  '/supplier/sirtu': '2025-06-01',
  '/supplier/tanah-urug': '2025-06-01',
  '/heavy-equipment/dozer': '2025-06-01',
  '/heavy-equipment/excavator': '2025-06-01',
  '/heavy-equipment/self-loader': '2025-06-01',
  '/heavy-equipment/tandem-roller': '2025-06-01',
  '/heavy-equipment/double-drum-roller': '2025-06-01',
  '/heavy-equipment/pneumatic-roller': '2025-06-01',
  '/heavy-equipment/baby-roller': '2025-06-01',
  '/heavy-equipment/asphalt-finisher': '2025-06-01',
  '/heavy-equipment/tronton-dump-truck': '2025-06-01',
};

type ChangeFreq = 'weekly' | 'yearly' | 'monthly' | 'always' | 'hourly' | 'daily' | 'never';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = Object.entries(STATIC_LAST_MODIFIED).map(
    ([path, lastModified]) => {
      const priority =
        path === '/' ? 1.0 :
        path === '/layanan' || path === '/kontak' ||
        path === '/layanan/infrastruktur/pengaspalan' ? 0.9 :
        path.startsWith('/supplier/') || path.startsWith('/heavy-equipment/') ? 0.6 :
        path === '/layanan/arsitektur' ? 0.7 :
        0.8;

      const changeFrequency: ChangeFreq =
        path === '/' || path === '/layanan' || path === '/blog' ? 'weekly' :
        path === '/kontak' || path === '/tentang-kami' ? 'yearly' :
        'monthly';

      return {
        url: `${BASE_URL}${path}`,
        lastModified,
        changeFrequency,
        priority,
      };
    }
  );

  const blogRoutes: MetadataRoute.Sitemap = articles.map((post: any) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.dateISO || new Date().toISOString().split('T')[0],
    changeFrequency: 'monthly' as ChangeFreq,
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes];
}