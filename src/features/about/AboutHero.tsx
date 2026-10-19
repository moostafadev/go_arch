"use client";

import { motion } from "framer-motion";

export const AboutHero = () => {
  return (
    <section className="relative overflow-hidden border-b border-border bg-card py-16 pt-28 lg:py-24 lg:pt-32">
      <div className="absolute inset-0 bg-arch-grid opacity-20 pointer-events-none" />
      <div className="absolute left-1/2 top-0 h-75 w-150 -translate-x-1/2 bg-accent/10 blur-[100px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6 inline-flex items-center gap-2 border border-accent/30 bg-accent/10 px-3 py-1"
        >
          <span className="flex h-2 w-2 bg-accent" />
          <span className="text-xs font-semibold uppercase tracking-wider text-accent">
            Our Story
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-6 text-4xl font-black uppercase leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl"
        >
          Redefining <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-accent to-red-400">
            Architectural Education.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mx-auto max-w-2xl text-base text-foreground-second lg:text-lg"
        >
          We bridge the gap between academic theory and real-world practice. GO
          ARCH is built by architects, for the next generation of architects.
        </motion.p>
      </div>
    </section>
  );
};
