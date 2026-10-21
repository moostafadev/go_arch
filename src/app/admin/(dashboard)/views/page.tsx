import type { Metadata } from "next";

import { ViewsMain } from "@/features/admin/views";

export const metadata: Metadata = {
  title: "Page Views | GO ARCH Admin",
  robots: { index: false, follow: false },
};

export default function PageViews() {
  return <ViewsMain />;
}
