import type { Metadata } from "next";

import { LeadsMain } from "@/features/admin/leads";

export const metadata: Metadata = {
  title: "Leads | GO ARCH Admin",
  robots: { index: false, follow: false },
};

export default function LeadsPage() {
  return <LeadsMain />;
}
