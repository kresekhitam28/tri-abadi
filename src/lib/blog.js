import { articles, getArticleBySlug } from "../data/articles";

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

export function getBlogListing(page) {
  const start = (page - 1) * articlesPerPage;
  return {
    items: sortedArticles.slice(start, start + articlesPerPage).map(articleSummary),
    page,
    pageLinks: blogPageNumbers.map(blogPagePath),
  };
}

export function getArticleSummaries(slugs) {
  return slugs.map(getArticleBySlug).filter(Boolean).map(articleSummary);
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
