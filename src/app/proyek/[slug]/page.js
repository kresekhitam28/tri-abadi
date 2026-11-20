import { notFound } from "next/navigation";
import CaseStudyPage from "../../../components/CaseStudyPage";
import { caseStudies } from "../../../data/caseStudies";
import { caseStudyMetadata, caseStudySchema } from "../../../lib/caseStudySeo";
import { serializeJsonLd } from "../../../lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const study = caseStudies.find((item) => item.slug === slug);
  if (!study) notFound();
  return caseStudyMetadata(study);
}

export default async function ProyekDetailPage({ params }) {
  const { slug } = await params;
  const study = caseStudies.find((item) => item.slug === slug);
  if (!study) notFound();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(caseStudySchema(study)) }} />
      <CaseStudyPage study={study} />
    </>
  );
}
