import type { Metadata } from "next";
import { CoursesHeader, CourseList } from "@/features/courses";

export const metadata: Metadata = {
  title: "Courses & Diplomas | GO ARCH",
  description:
    "Master architectural design, parametric tools, and visualization through our professional courses and diplomas.",
};

export default function CoursesPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <CoursesHeader />

      <div className="pt-12">
        <CourseList />
      </div>
    </div>
  );
}
