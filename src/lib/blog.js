import { articles, getArticleBySlug } from "../data/articles";
import { getProjectImageFiles } from "./projectImages";

const articlesPerPage = 6;
const sortedArticles = [...articles].sort((a, b) => b.dateISO.localeCompare(a.dateISO));

function articleSummary({ slug, title, desc, src, illustration, category }) {
  return { slug, title, desc, src, illustration, category };
}

export function blogPagePath(page) {
  return page === 1 ? "/blog" : `/blog/halaman/${page}`;
}

export const blogPageNumbers = Array.from(
  { length: Math.ceil(sortedArticles.length / articlesPerPage) },
  (_, index) => index + 1,
);

export async function getBlogListing(page) {
  const start = (page - 1) * articlesPerPage;
  const items = sortedArticles.slice(start, start + articlesPerPage).map(articleSummary);
  const { variants } = await getProjectImageFiles(items);

  return {
    items: items.map((item) => {
      // FIX: strip SEMUA ekstensi gambar, bukan hanya .webp
      const imageBase = item.src.replace(/\.(webp|jpeg|jpg|png)$/i, "");
      const thumbnailSrcSet = [320, 640]
        .flatMap((size) => {
          const src = `${imageBase}-${size}.webp`;
          const width = variants[src.split("/").pop()];
          return width ? [`${src} ${width}w`] : [];
        })
        .join(", ");

      return { ...item, thumbnailSrcSet };
    }),
    page,
    pageLinks: blogPageNumbers.map(blogPagePath),
  };
}

export function getArticleSummaries(slugs) {
  return slugs.map(getArticleBySlug).filter(Boolean).map(articleSummary);
}

export function getArticleDetail(article) {
  return {
    ...articleSummary(article),
    dateISO: article.dateISO,
    modifiedDateISO: article.modifiedDateISO,
    author: article.author,
    body: article.body,
    answer: article.answer,
    technicalReviewer: article.technicalReviewer,
    quote: article.quote,
    surveyRequest: article.surveyRequest,
  };
}

export function getArticleNavigation(article) {
  const tags = (article.tags ?? []).flatMap((tag) => {
    if (typeof tag === "string") return [{ label: tag }];
    if (tag.href) return [{ label: tag, href: tag.href }];
    if (tag.slug === article.slug) return [];
    if (tag.slug && getArticleBySlug(tag.slug)) {
      return [{ label: tag, href: `/blog/${tag.slug}` }];
    }
    return [{ label: tag }];
  });

  const matchingArticles = sortedArticles.filter((item) => item.category?.id === article.category?.id);
  const relatedSlugs = new Set([
    ...(article.tags ?? []).map((tag) => tag.slug).filter(Boolean),
    ...matchingArticles.map((item) => item.slug),
    ...sortedArticles.map((item) => item.slug),
  ]);
  relatedSlugs.delete(article.slug);

  return {
    visibleTags: tags.slice(0, 8),
    relatedArticles: getArticleSummaries([...relatedSlugs]).slice(0, 3),
  };
}