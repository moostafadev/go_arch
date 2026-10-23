import type { Metadata } from "next";

import { ImagesMain } from "@/features/admin/settings/images";

export const metadata: Metadata = {
  title: "Home Hero Image | GO ARCH Admin",
  robots: { index: false, follow: false },
};

export default function AdminHeroImagesPage() {
  return (
    <ImagesMain
      section="hero"
      title="Home Hero Image"
      description="Main visual in the home page hero section. Missing image falls back to a placeholder."
    />
  );
}
