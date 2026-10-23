"use client";

import { m } from "framer-motion";

import { Badge } from "@/components/badge";

export const CoursesHeader = () => {
  return (
    <section className="relative overflow-hidden border-b border-border bg-card py-16 pt-28 lg:py-24 lg:pt-32">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 h-px w-3/4 -translate-x-1/2 bg-linear-to-r from-transparent via-accent/50 to-transparent" />
        <div className="absolute inset-0 bg-arch-grid-fade" />
        <div className="absolute left-1/2 top-0 h-75 w-150 -translate-x-1/2 bg-accent/10 blur-[100px] animate-[float-glow_12s_ease-in-out_infinite_alternate]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <Badge delay={100} className="mb-6">
          Our Courses
        </Badge>

        <m.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-6 text-4xl font-black uppercase leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl"
        >
          Master Real <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-accent to-red-400">
            Architectural Skills.
          </span>
        </m.h1>

        <m.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mx-auto max-w-2xl text-base text-foreground-second lg:text-lg"
        >
          Focused, practical courses taught by a practicing architect. Pick the
          topic you need most and start building real work today.
        </m.p>
      </div>
    </section>
  );
};
