import type { Metadata } from "next";

import { StudentWorkMain } from "@/features/admin/settings/student-work";

export const metadata: Metadata = {
  title: "Students' Work | GO ARCH Admin",
  robots: { index: false, follow: false },
};

export default function AdminStudentWorkPage() {
  return <StudentWorkMain />;
}
