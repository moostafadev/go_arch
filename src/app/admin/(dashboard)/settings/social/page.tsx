import type { Metadata } from "next";

import { SocialSettingsMain } from "@/features/admin/settings/social";

export const metadata: Metadata = {
  title: "Social Media Settings | GO ARCH Admin",
  robots: { index: false, follow: false },
};

export default function SocialSettingsPage() {
  return <SocialSettingsMain />;
}
