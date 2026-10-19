"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

export const Hero = () => {
  return (
    // 1. تم إزالة min-h-[90vh] من الموبايل وإضافتها فقط للشاشات الكبيرة (lg:min-h-[90vh])
    // 2. تم تقليل py-20 إلى py-12 في الموبايل
    <section className="relative flex items-center bg-background py-12 lg:min-h-[90vh] lg:py-0 lg:pt-16">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-arch-grid opacity-30" />
        <div className="absolute -top-40 left-1/2 h-125 w-125 -translate-x-1/2 rounded-full bg-accent/20 blur-[120px]" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-background to-transparent" />
      </div>

      {/* 3. تم تقليل الـ gap من 16 إلى 10 في الموبايل */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-10 px-4 sm:gap-16 sm:px-6 lg:flex-row lg:justify-between lg:gap-8 lg:px-8">
        <div className="flex max-w-2xl flex-col items-center text-center lg:items-start lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 flex items-center gap-2 border border-accent/30 bg-accent/10 px-3 py-1"
          >
            <span className="flex h-2 w-2 bg-accent" />
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">
              250+ Students Across 20 Countries
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-6 text-3xl font-black uppercase leading-tight tracking-tight text-foreground sm:text-5xl lg:text-7xl"
          >
            Get ready to become <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-accent to-red-400">
              a Real Architect.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-8 max-w-xl text-sm text-foreground-second sm:text-lg"
          >
            The definitive A-Z program in architectural design. Master
            Competition Design, Photoshop, Rhino & Grasshopper through projects
            designed to shape the next generation of architects.
          </motion.p>

          <motion.div
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
              className="group flex items-center justify-center gap-2 border border-border bg-transparent px-8 py-3.5 text-sm font-bold text-foreground transition-all hover:bg-card sm:py-4"
            >
              <Play className="size-4" />
              Watch Students&apos; Work
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="relative w-full max-w-md lg:max-w-none lg:flex-1 mt-4 lg:mt-0"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="relative aspect-4/3 w-full border border-border sm:aspect-square lg:aspect-4/5">
            <Image
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1000&auto=format&fit=crop"
              alt="Modern Architectural Design"
              fill
              className="object-cover grayscale transition-all duration-700 hover:grayscale-0 hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-background/20" />
          </div>

          <motion.div
            className="absolute -bottom-4 -left-2 border border-border bg-card p-3 shadow-2xl sm:-bottom-6 sm:-left-6 sm:p-4 z-20"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="size-6 sm:size-8 border-2 border-card bg-foreground-second"
                  />
                ))}
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-foreground">
                  Join the Elite
                </p>
                <p className="text-[10px] sm:text-xs text-foreground-second">
                  Master Parametric Design
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
