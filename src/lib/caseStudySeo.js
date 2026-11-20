import { caseStudyReviewer } from "../data/caseStudies";
import { createPageMetadata, SITE_ENTITY_ID, SITE_NAME, SITE_URL } from "./metadata";

export function caseStudyMetadata(study, isArea = false) {
  const content = isArea ? study.area : study;
  return createPageMetadata({
    path: isArea ? study.areaPath : study.path,
    title: content.title.id,
    description: content.summary.id,
    image: study.photo.src,
    type: isArea ? "website" : "article",
  });
}

export function caseStudySchema(study, isArea = false) {
  const areaUrl = new URL(study.areaPath, SITE_URL).href;
  const caseUrl = new URL(study.path, SITE_URL).href;
  const url = isArea ? areaUrl : caseUrl;
  const title = (isArea ? study.area : study).title.id;
  const serviceId = `${areaUrl}#service`;
  const trail = [
    ["/", "Beranda"],
    isArea ? [study.servicePath, study.serviceName] : ["/proyek", "Portofolio"],
    [url, title],
  ];
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map(([path, name], index) => ({
      "@type": "ListItem", position: index + 1, name, item: new URL(path, SITE_URL).href,
    })),
  };

  if (isArea) {
    return [breadcrumbs, {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": serviceId,
      name: title,
      serviceType: study.serviceName,
      description: study.area.summary.id,
      url,
      provider: { "@id": SITE_ENTITY_ID },
      areaServed: study.areaServed.map((name) => ({ "@type": "Place", name })),
    }];
  }

  return [breadcrumbs, {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${url}#article`,
    headline: title,
    description: study.summary.id,
    image: new URL(study.photo.src, SITE_URL).href,
    author: { "@type": "Organization", "@id": SITE_ENTITY_ID, name: SITE_NAME },
    publisher: { "@id": SITE_ENTITY_ID },
    inLanguage: "id",
    about: { "@id": serviceId },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
      reviewedBy: { "@type": "Organization", name: caseStudyReviewer, parentOrganization: { "@id": SITE_ENTITY_ID } },
    },
  }];
}
