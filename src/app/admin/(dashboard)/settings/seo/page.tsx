import type { Metadata } from "next";

import { SeoMain } from "@/features/admin/settings/seo";

export const metadata: Metadata = {
  title: "SEO Settings | GO ARCH Admin",
  robots: { index: false, follow: false },
};

export default function SeoSettingsPage() {
  return <SeoMain />;
}
