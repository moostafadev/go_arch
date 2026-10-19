"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/button";
import { allCourses } from "@/constants/courses";

// التصنيفات التي ستظهر في الصفحة الرئيسية
const tabs = ["All Courses", "Diplomas", "Courses", "Workshops"];

// خريطة لربط اسم التاب بالتصنيف في البيانات
const categoryMap: Record<string, string> = {
  "All Courses": "All",
  Diplomas: "Diploma",
  Courses: "Course",
  Workshops: "Workshop",
};

export const FeaturedCourses = () => {
  const [activeTab, setActiveTab] = useState("All Courses");

  const filteredCourses =
    activeTab === "All Courses"
      ? allCourses
      : allCourses.filter(
          (course) => course.category === categoryMap[activeTab],
        );

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="mb-2 text-3xl font-bold text-foreground sm:text-4xl">
            Diplomas & courses
          </h2>
          <p className="text-foreground-second">
            Diplomas & courses give you the full path, courses let you pick one
            topic.
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-12 flex w-full flex-col gap-2 sm:flex-row">
          {tabs.map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? "solid" : "outline"}
              color={activeTab === tab ? "MAIN" : "SECONDARY"}
              onClick={() => setActiveTab(tab)}
              className={
                activeTab === tab
                  ? "w-full bg-accent text-white sm:w-auto"
                  : "w-full border-border bg-transparent text-foreground hover:bg-card sm:w-auto"
              }
            >
              {tab}
            </Button>
          ))}
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  scale: 0.95,
                  transition: { duration: 0.2 },
                }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex flex-col border border-border bg-card"
              >
                <div className="relative aspect-video w-full overflow-hidden border-b border-border">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="mb-3 text-lg font-bold text-foreground">
                    {course.title}
                  </h3>
                  <p className="mb-6 flex-1 text-sm leading-relaxed text-foreground-second line-clamp-3">
                    {course.desc}
                  </p>
                  <div className="flex items-center gap-3">
                    <Link href={`/courses/${course.id}`} className="flex-1">
                      <Button
                        variant="solid"
                        color="NEUTRAL"
                        className="w-full bg-foreground text-background hover:bg-foreground/90"
                      >
                        View Details
                      </Button>
                    </Link>
                    <div className="flex flex-1 items-center justify-center border border-border bg-transparent px-3 py-2 text-sm font-medium text-foreground">
                      {course.price}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
