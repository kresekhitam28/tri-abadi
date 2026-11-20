// src/app/supplier/base-course/page.js
import BaseCourse from "../../../components/BaseCourse";
import { createPageMetadata } from "../../../lib/metadata";

export const metadata = createPageMetadata({
  path: "/supplier/base-course",
  title: "Jual Base Course Siap Antar",
  description:
    "Jual batu base course Kelas A & Kelas B untuk konstruksi jalan, lahan parkir, dan area industri. Kualitas terjamin, siap antar ke lokasi proyek.",
  image: "/produk/base-course.png",
});

export default function BaseCoursePage() {
  return <BaseCourse />;
}