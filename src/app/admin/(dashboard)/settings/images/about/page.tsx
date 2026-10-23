import type { Metadata } from "next";

import { ImagesMain } from "@/features/admin/settings/images";

export const metadata: Metadata = {
  title: "About Page Images | GO ARCH Admin",
  robots: { index: false, follow: false },
};

export default function AdminAboutImagesPage() {
  return (
    <ImagesMain
      section="about"
      title="About Page Images"
      description="Images used across the about page. Missing images fall back to a placeholder."
    />
  );
}
