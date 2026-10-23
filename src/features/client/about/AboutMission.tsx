"use client";

import Image from "next/image";

import { PLACEHOLDER_IMAGE } from "@/constants/placeholders";

interface AboutMissionProps {
  image: string | null;
}

export const AboutMission = ({ image }: AboutMissionProps) => {
  return (
    <section className="py-14 lg:py-18">
      <div className="container flex flex-col gap-6 lg:gap-8">
        <div className="grid grid-cols-1 items-center gap-6 lg:gap-8 lg:grid-cols-2">
          <div className="flex flex-col gap-6 lg:gap-8">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Why we exist
            </h2>

            <div className="flex flex-col gap-3 lg:gap-4 text-foreground-second">
              <p>
                Traditional architecture schools often focus heavily on history
                and theory, leaving students unprepared for the fast-paced,
                competitive nature of the modern industry.
              </p>
              <p>
                We founded GO ARCH to change that. Our mission is to provide
                students and junior architects with the exact tools, workflows,
                and mindset required to win competitions, build stunning
                portfolios, and secure top-tier jobs.
              </p>
              <p>
                We don&apos;t just teach software; we teach how to{" "}
                <strong className="text-foreground">
                  think architecturally
                </strong>{" "}
                and execute flawlessly under real-world constraints.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 lg:gap-8 border-t border-border pt-4 lg:pt-6">
              <div>
                <h4 className="text-2xl font-bold text-foreground">100%</h4>
                <p className="text-sm text-foreground-second">
                  Practical Approach
                </p>
              </div>
              <div>
                <h4 className="text-2xl font-bold text-foreground">
                  Real-World
                </h4>
                <p className="text-sm text-foreground-second">Project Based</p>
              </div>
            </div>
          </div>

          <div className="relative aspect-square w-full border border-border">
            <Image
              src={image || PLACEHOLDER_IMAGE}
              alt="Architectural sketching and design"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover grayscale transition-all duration-700 hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-background/10" />
          </div>
        </div>
      </div>
    </section>
  );
};
