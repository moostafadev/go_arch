"use client";

import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

import { PLACEHOLDER_IMAGE } from "@/constants/placeholders";

interface AboutInstructorProps {
  image: string | null;
}

export const AboutInstructor = ({ image }: AboutInstructorProps) => {
  return (
    <section className="border-t border-border bg-card py-14 lg:py-18">
      <div className="container flex flex-col gap-6 lg:gap-8">
        <div className="grid grid-cols-1 items-center gap-6 lg:gap-8 lg:grid-cols-2">
          <div className="relative aspect-4/5 w-full border border-border">
            <Image
              src={image || PLACEHOLDER_IMAGE}
              alt="Founder and Lead Architect"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover grayscale transition-all duration-700 hover:grayscale-0"
            />
          </div>

          <div className="flex flex-col gap-6 lg:gap-8">
            <div className="flex flex-col gap-3 lg:gap-4">
              <div className="text-sm font-bold uppercase tracking-widest text-accent-text">
                Meet the Founder
              </div>
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
                Taught by an Architect who actually practices.
              </h2>
              <p className="text-foreground-second">
                You won&apos;t be learning from just a theoretical instructor.
                Our lead mentor is an award-winning practicing architect who
                applies the exact same techniques taught in our courses to win
                international competitions and deliver real projects.
              </p>
            </div>

            <ul className="flex flex-col gap-3">
              {[
                "Winner of multiple international architectural competitions.",
                "Over a decade of experience in parametric and sustainable design.",
                "Expert in Rhino, Grasshopper, and AI-driven architectural workflows.",
                "Mentored hundreds of students into top global universities and firms.",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm text-foreground"
                >
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
