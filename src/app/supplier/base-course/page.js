// src/app/supplier/base-course/page.js
import BaseCourse from "../../../components/BaseCourse";
import { createPageMetadata } from "../../../lib/metadata";

export const metadata = createPageMetadata({
  path: "/supplier/base-course",
  title: "Base Course",
  description:
    "Jual batu base course untuk kebutuhan konstruksi jalan, lahan parkir, dan lainnya. Kualitas super, siap antar.",
  image: "/produk/base-course.png",
});

export default function BaseCoursePage() {
  return <BaseCourse />;
}