import type { Metadata } from "next";

import { ContactSettingsMain } from "@/features/admin/settings/contact";

export const metadata: Metadata = {
  title: "Contact Settings | GO ARCH Admin",
  robots: { index: false, follow: false },
};

export default function ContactSettingsPage() {
  return <ContactSettingsMain />;
}
