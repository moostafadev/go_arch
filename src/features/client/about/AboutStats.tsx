"use client";

const stats = [
  { value: "250+", label: "Students Enrolled" },
  { value: "20+", label: "Countries Represented" },
  { value: "15+", label: "Global Competitions Won" },
  { value: "10+", label: "Years of Experience" },
];

export const AboutStats = () => {
  return (
    <section className="border-t border-border py-14 lg:py-18">
      <div className="container">
        <div className="grid grid-cols-2 gap-6 lg:gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center border-l border-border pl-3 text-center sm:pl-6 md:border-none md:pl-0"
            >
              <div className="mb-2 text-4xl font-black text-foreground sm:text-5xl">
                {stat.value}
              </div>
              <div className="text-xs font-medium uppercase tracking-wider text-foreground-second sm:text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
