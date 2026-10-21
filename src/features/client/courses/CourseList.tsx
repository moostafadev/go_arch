"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { m, AnimatePresence } from "framer-motion";
import { Clock } from "lucide-react";

import { Button } from "@/components/button";
import { Price } from "@/components/price";
import { Tag } from "@/components/tag";
import { Tooltip } from "@/components/tooltip";

import { ClientCourse } from "./types";

interface CourseListProps {
  courses: ClientCourse[];
}

export const CourseList = ({ courses }: CourseListProps) => {
  const [activeCategory, setActiveCategory] = useState("All Courses");

  const categories = useMemo(
    () => [
      "All Courses",
      ...Array.from(new Set(courses.map((course) => course.categoryName))),
    ],
    [courses],
  );

  const filteredCourses = useMemo(
    () =>
      activeCategory === "All Courses"
        ? courses
        : courses.filter((course) => course.categoryName === activeCategory),
    [courses, activeCategory],
  );

  if (courses.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border border-border bg-card p-8 text-center sm:p-12">
          <p className="mb-2 text-lg font-bold text-foreground">
            No courses available yet
          </p>
          <p className="text-sm text-foreground-second">
            Our team is preparing new courses. Check back soon — or{" "}
            <Link href="/contact" className="text-accent hover:underline">
              get in touch
            </Link>{" "}
            to hear first.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-wrap gap-3"
      >
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? "solid" : "outline"}
            color={activeCategory === category ? "MAIN" : "SECONDARY"}
            onClick={() => setActiveCategory(category)}
            className={
              activeCategory === category
                ? "bg-accent text-white"
                : "border-border bg-transparent text-foreground hover:bg-card"
            }
          >
            {category}
          </Button>
        ))}
      </m.div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filteredCourses.map((course, index) => (
            <m.div
              key={course.id}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group flex flex-col border border-border bg-card transition-all hover:border-accent/50"
            >
              <div className="relative aspect-video w-full overflow-hidden border-b border-border">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute left-4 top-4 z-10">
                  <Tag variant="solid" color="MAIN" size="sm">
                    {course.categoryName}
                  </Tag>
                </div>

                {course.hours && (
                  <div className="absolute right-4 top-4 z-10">
                    <Tooltip
                      content={`Course duration: ${course.hours}`}
                      side="left"
                      focusable={false}
                    >
                      <div className="flex items-center gap-1 border border-border bg-background/90 px-2 py-1 backdrop-blur-sm">
                        <Clock className="size-3 text-accent" />
                        <span className="text-[11px] font-bold text-foreground">
                          {course.hours}
                        </span>
                      </div>
                    </Tooltip>
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col p-4 sm:p-6">
                <h3 className="mb-3 text-xl font-bold text-foreground transition-colors group-hover:text-accent">
                  {course.title}
                </h3>
                <p className="mb-6 flex-1 text-sm leading-relaxed text-foreground-second line-clamp-3">
                  {course.desc}
                </p>

                <div className="mt-auto flex items-center justify-between gap-4">
                  <Link href={`/courses/${course.slug}`} className="flex-1">
                    <Button
                      variant="solid"
                      color="NEUTRAL"
                      className="w-full bg-foreground text-background hover:bg-foreground/90"
                    >
                      View Details
                    </Button>
                  </Link>
                  <div className="flex items-center justify-center border border-border bg-background px-4 py-2">
                    <Price
                      price={course.price}
                      discountPrice={course.discountPrice}
                      size="sm"
                    />
                  </div>
                </div>
              </div>
            </m.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
