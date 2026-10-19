"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export const AboutMission = () => {
  return (
    // أضفنا overflow-hidden هنا كحماية إضافية
    <section className="py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Text Content */}
          <motion.div
            // تم التعديل: استخدام y بدلاً من x
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-6 text-3xl font-bold text-foreground sm:text-4xl">
              Why we exist
            </h2>
            <div className="space-y-6 text-foreground-second">
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

            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-border pt-8">
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
          </motion.div>

          {/* Image */}
          <motion.div
            // تم التعديل: استخدام y بدلاً من x
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative aspect-square w-full border border-border"
          >
            <Image
              src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1000&auto=format&fit=crop"
              alt="Architectural sketching and design"
              fill
              className="object-cover grayscale transition-all duration-700 hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-background/10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
