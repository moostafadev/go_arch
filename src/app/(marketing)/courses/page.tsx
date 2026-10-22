import type { Metadata } from "next";

import { CourseList, CoursesHeader } from "@/features/client/courses";
import { fetchClientCourses } from "@/lib/courses";

export const metadata: Metadata = {
  title: "Courses & Diplomas | GO ARCH",
  description:
    "Master architectural design, parametric tools, and visualization through our professional courses and diplomas.",
};

export default async function CoursesPage() {
  const courses = await fetchClientCourses();

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <CoursesHeader />
      <div className="py-12">
        <CourseList courses={courses} />
      </div>
    </div>
  );
}
