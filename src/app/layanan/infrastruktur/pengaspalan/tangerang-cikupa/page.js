import LocalServiceAreaPage from "../../../../../components/LocalServiceAreaPage";
import { caseStudies } from "../../../../../data/caseStudies";
import { caseStudyMetadata, caseStudySchema } from "../../../../../lib/caseStudySeo";
import { serializeJsonLd } from "../../../../../lib/metadata";

const study = caseStudies.find(({ slug }) => slug === "pengaspalan-akses-pabrik-cikupa");

export const metadata = caseStudyMetadata(study, true);

export default function ServiceAreaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(caseStudySchema(study, true)) }} />
      <LocalServiceAreaPage study={study} />
    </>
  );
}
