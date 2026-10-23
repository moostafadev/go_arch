import type { Metadata } from "next";

import { TestimonialsMain } from "@/features/admin/settings/testimonials";

export const metadata: Metadata = {
  title: "Testimonials | GO ARCH Admin",
  robots: { index: false, follow: false },
};

export default function AdminTestimonialsPage() {
  return <TestimonialsMain />;
}
