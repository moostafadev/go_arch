import type { Metadata } from "next";

import { FaqsMain } from "@/features/admin/settings/faqs";

export const metadata: Metadata = {
  title: "FAQs | GO ARCH Admin",
  robots: { index: false, follow: false },
};

export default function AdminFaqsPage() {
  return <FaqsMain />;
}
