"use client";

import Link from "next/link";
import Image from "next/image";
import { m } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden border-b border-border bg-background py-12 lg:py-0">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 h-px w-3/4 -translate-x-1/2 bg-linear-to-r from-transparent via-accent/50 to-transparent" />
        <div className="absolute inset-0 bg-arch-grid-fade" />
        <div className="absolute top-[-20%] left-[20%] h-125 w-125 rounded-full bg-accent/15 blur-[120px] animate-[float-glow_12s_ease-in-out_infinite_alternate]" />
        <div className="absolute bottom-[-10%] right-[10%] h-100 w-100 rounded-full bg-blue-500/10 blur-[100px] animate-[float-glow_15s_ease-in-out_infinite_alternate-reverse]" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-background to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-12 px-4 sm:px-6 lg:flex-row lg:justify-between lg:gap-8 lg:px-8">
        <div className="flex max-w-2xl flex-col items-center text-center lg:items-start lg:text-left">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 flex items-center gap-2 border border-accent/30 bg-accent/5 px-3 py-1 backdrop-blur-sm"
          >
            <span className="flex h-2 w-2 animate-pulse bg-accent" />
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">
              250+ Students Across 20 Countries
            </span>
          </m.div>

          <m.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-6 text-4xl font-black uppercase leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-7xl"
          >
            Get ready to become <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-accent to-red-400">
              a Real Architect.
            </span>
          </m.h1>

          <m.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-8 max-w-xl text-sm text-foreground-second sm:text-base lg:text-lg"
          >
            The definitive A-Z program in architectural design. Master
            Competition Design, Photoshop, Rhino & Grasshopper through projects
            designed to shape the next generation of architects.
          </m.p>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4"
          >
            <Link
              href="/courses"
              className="group flex items-center justify-center gap-2 bg-accent px-8 py-3.5 text-sm font-bold text-white transition-all hover:bg-accent-hover sm:py-4"
            >
              Get Full Courses
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/portfolio"
              className="group flex items-center justify-center gap-2 border border-border bg-background/50 backdrop-blur-sm px-8 py-3.5 text-sm font-bold text-foreground transition-all hover:bg-card sm:py-4"
            >
              <Play className="size-4" />
              Watch Students&apos; Work
            </Link>
          </m.div>
        </div>

        <m.div
          className="relative w-full max-w-md lg:max-w-none lg:flex-1"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="absolute -inset-1 bg-linear-to-tr from-accent/30 to-transparent blur-sm" />
          <div className="relative aspect-4/3 w-full overflow-hidden border border-border bg-card sm:aspect-square lg:aspect-4/5 lg:max-h-[75vh]">
            <Image
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1000&auto=format&fit=crop"
              alt="Modern Architectural Design"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover grayscale transition-all duration-700 hover:grayscale-0 hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-background/20" />
          </div>
        </m.div>
      </div>
    </section>
  );
};
