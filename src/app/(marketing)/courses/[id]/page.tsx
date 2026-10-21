import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, CheckCircle2, Clock } from "lucide-react";

import { EnrollCard } from "@/features/client/courses/EnrollCard";
import { fetchClientCourseBySlug } from "@/lib/courses";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const course = await fetchClientCourseBySlug(id);

  if (!course) {
    return {
      title: "Course Not Found | GO ARCH",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${course.title} | GO ARCH`,
    description: course.desc.slice(0, 160),
    openGraph: {
      title: course.title,
      description: course.desc.slice(0, 160),
      images: [{ url: course.image }],
    },
  };
}

export default async function CourseDetailsPage({ params }: Props) {
  const { id } = await params;
  const course = await fetchClientCourseBySlug(id);

  if (!course) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
        <h1 className="mb-3 text-2xl font-bold text-foreground">
          Course not found
        </h1>
        <p className="mb-6 max-w-md text-foreground-second">
          This course may have been removed, renamed, or the URL is incorrect.
        </p>
        <Link
          href="/courses"
          className="inline-flex items-center gap-2 bg-accent px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-accent-hover"
        >
          <ArrowLeft className="size-4" />
          Browse all courses
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 lg:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/courses"
          className="mb-8 inline-flex items-center gap-2 text-sm text-foreground-second hover:text-accent transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back to Courses
        </Link>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-4">
              <span className="border border-accent/30 bg-accent/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
                {course.categoryName}
              </span>
            </div>

            <h1 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
              {course.title}
            </h1>

            {course.hours && (
              <div className="mb-4 inline-flex items-center gap-2 text-sm text-foreground-second">
                <Clock className="size-4" />
                {course.hours}
              </div>
            )}

            <p className="mb-8 whitespace-pre-line text-foreground-second">
              {course.desc}
            </p>

            <div className="relative mb-12 aspect-video w-full overflow-hidden border border-border">
              <Image
                src={course.image}
                alt={course.title}
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover"
                priority
              />
            </div>

            <h2 className="mb-4 text-2xl font-bold text-foreground">
              What you&apos;ll learn
            </h2>
            <ul className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                "Master advanced architectural software.",
                "Develop a professional portfolio.",
                "Learn real-world design workflows.",
                "Get personalized feedback from experts.",
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
          </div>

          <div className="lg:col-span-1">
            <EnrollCard
              courseTitle={course.title}
              price={course.price}
              discountPrice={course.discountPrice}
              courseId={course.id}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
