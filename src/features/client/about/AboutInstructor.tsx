"use client";

import { m } from "framer-motion";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

export const AboutInstructor = () => {
  return (
    <section className="border-t border-border bg-card py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <m.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative aspect-4/5 w-full border border-border"
          >
            <Image
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop"
              alt="Founder and Lead Architect"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover grayscale transition-all duration-700 hover:grayscale-0"
            />
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="mb-2 text-sm font-bold uppercase tracking-widest text-accent">
              Meet the Founder
            </div>
            <h2 className="mb-6 text-3xl font-bold text-foreground sm:text-4xl">
              Taught by an Architect who actually practices.
            </h2>
            <p className="mb-6 text-foreground-second">
              You won&apos;t be learning from just a theoretical instructor. Our
              lead mentor is an award-winning practicing architect who applies
              the exact same techniques taught in our courses to win
              international competitions and deliver real projects.
            </p>

            <ul className="mb-8 space-y-3">
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
          </m.div>
        </div>
      </div>
    </section>
  );
};
