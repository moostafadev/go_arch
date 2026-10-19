"use client";

import { m } from "framer-motion";

const stats = [
  { value: "250+", label: "Students Enrolled" },
  { value: "20+", label: "Countries Represented" },
  { value: "15+", label: "Global Competitions Won" },
  { value: "10+", label: "Years of Experience" },
];

export const AboutStats = () => {
  return (
    <section className="border-t border-border py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <m.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center justify-center border-l border-border pl-6 text-center md:border-none md:pl-0"
            >
              <div className="mb-2 text-4xl font-black text-foreground sm:text-5xl">
                {stat.value}
              </div>
              <div className="text-xs font-medium uppercase tracking-wider text-foreground-second sm:text-sm">
                {stat.label}
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
};
