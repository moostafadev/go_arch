import {
  AboutHero,
  AboutMission,
  AboutInstructor,
  AboutStats,
} from "@/features/client/about";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | GO ARCH",
  description:
    "Learn about GO ARCH's mission to bridge the gap between academic theory and real-world architectural practice.",
};

export default function AboutPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background overflow-x-hidden">
      <AboutHero />
      <AboutMission />
      <AboutInstructor />
      <AboutStats />
    </div>
  );
}
