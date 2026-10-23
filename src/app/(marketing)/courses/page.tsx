import type { Metadata } from "next";

import { CourseList, CoursesHeader } from "@/features/client/courses";
import { fetchClientCourses } from "@/lib/courses";
import { buildPageMetadata } from "@/lib/seo";

export const generateMetadata = (): Promise<Metadata> =>
  buildPageMetadata("courses");

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
