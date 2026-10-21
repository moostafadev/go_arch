"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { m, AnimatePresence } from "framer-motion";
import { Clock } from "lucide-react";

import { Button } from "@/components/button";
import { Price } from "@/components/price";
import { Tooltip } from "@/components/tooltip";

import { ClientCourse } from "../courses/types";

interface FeaturedCoursesProps {
  courses: ClientCourse[];
}

export const FeaturedCourses = ({ courses }: FeaturedCoursesProps) => {
  const [activeTab, setActiveTab] = useState("All Courses");

  const tabs = useMemo(
    () => [
      "All Courses",
      ...Array.from(new Set(courses.map((course) => course.categoryName))),
    ],
    [courses],
  );

  const filteredCourses = useMemo(
    () =>
      activeTab === "All Courses"
        ? courses
        : courses.filter((course) => course.categoryName === activeTab),
    [courses, activeTab],
  );

  if (courses.length === 0) {
    return (
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="mb-2 text-3xl font-bold text-foreground sm:text-4xl">
              Diplomas & courses
            </h2>
            <p className="text-foreground-second">
              New courses are on the way.
            </p>
          </div>

          <div className="border border-border bg-card p-8 text-center sm:p-12">
            <p className="mb-2 text-lg font-bold text-foreground">
              Courses coming soon
            </p>
            <p className="text-sm text-foreground-second">
              <Link href="/contact" className="text-accent hover:underline">
                Contact us
              </Link>{" "}
              to hear when the first courses launch.
            </p>
          </div>
        </div>
      </section>
    );
  }

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

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredCourses.map((course, index) => (
              <m.div
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
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />

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
                  <h3 className="mb-3 text-lg font-bold text-foreground">
                    {course.title}
                  </h3>
                  <p className="mb-6 flex-1 text-sm leading-relaxed text-foreground-second line-clamp-3">
                    {course.desc}
                  </p>
                  <div className="flex items-center gap-3">
                    <Link href={`/courses/${course.slug}`} className="flex-1">
                      <Button
                        variant="solid"
                        color="NEUTRAL"
                        className="w-full bg-foreground text-background hover:bg-foreground/90"
                      >
                        View Details
                      </Button>
                    </Link>
                    <div className="flex flex-1 items-center justify-center border border-border bg-transparent px-3 py-2">
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
    </section>
  );
};
