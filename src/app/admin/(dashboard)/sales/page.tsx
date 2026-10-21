import type { Metadata } from "next";

import { SalesMain } from "@/features/admin/sales";

export const metadata: Metadata = {
  title: "Sales | GO ARCH Admin",
  robots: { index: false, follow: false },
};

export default function SalesPage() {
  return <SalesMain />;
}
