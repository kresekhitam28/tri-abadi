// src/app/supplier/base-course/page.js
import BaseCourse from "../../../components/BaseCourse";

export const metadata = {
  title: "Base Course | PT Tri Abadi Makmur",
  description:
    "Jual batu base course untuk kebutuhan konstruksi jalan, lahan parkir, dan lainnya. Kualitas super, siap antar.",
  alternates: {
    canonical: "/supplier/base-course",
  },
};

export default function BaseCoursePage() {
  return <BaseCourse />;
}