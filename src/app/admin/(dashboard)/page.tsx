import type { Metadata } from "next";

import { DashboardMain } from "@/features/admin/dashboard";

export const metadata: Metadata = {
  title: "Dashboard | GO ARCH Admin",
  robots: { index: false, follow: false },
};

export default function AdminDashboard() {
  return <DashboardMain />;
}
