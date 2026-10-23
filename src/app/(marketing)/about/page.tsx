import {
  AboutHero,
  AboutMission,
  AboutInstructor,
  AboutStats,
} from "@/features/client/about";
import type { Metadata } from "next";

import { fetchSectionImages } from "@/lib/images";
import { buildPageMetadata } from "@/lib/seo";

export const generateMetadata = (): Promise<Metadata> =>
  buildPageMetadata("about");

export default async function AboutPage() {
  const images = await fetchSectionImages("about");

  return (
    <div className="flex min-h-screen w-full flex-col bg-background overflow-x-hidden">
      <AboutHero />
      <AboutMission image={images["about-mission"]} />
      <AboutInstructor image={images["about-instructor"]} />
      <AboutStats />
    </div>
  );
}
