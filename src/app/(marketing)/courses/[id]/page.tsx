import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import { allCourses } from "@/constants/courses";
import { EnrollCard } from "@/features/client/courses/EnrollCard";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function CourseDetailsPage({ params }: Props) {
  const resolvedParams = await params;
  const course = allCourses.find((c) => c.id === resolvedParams.id);

  if (!course) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <h1 className="mb-4 text-2xl font-bold text-foreground">
          Course not found.
        </h1>
        <Link href="/courses" className="text-accent hover:underline">
          Return to all courses
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-24">
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
            <h1 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
              {course.title}
            </h1>
            <p className="mb-8 text-foreground-second">
              Master the skills needed to excel in this field. This program is
              designed for architects who want to elevate their design and
              visualization capabilities.
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
              courseId={course.id}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
