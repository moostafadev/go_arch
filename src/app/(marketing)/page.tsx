import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { Accordion, AccordionItem } from "@/components/accordion";
import { Carousel, CarouselItem } from "@/components/carousel";
import { PLACEHOLDER_IMAGE } from "@/constants/placeholders";
import { STUDENT_WORK_PLACEHOLDER_COUNT } from "@/constants/student-work";
import { Hero } from "@/features/client/home/hero";
import { FeaturedCourses } from "@/features/client/home/FeaturedCourses";
import { fetchClientCourses } from "@/lib/courses";
import { fetchFaqs } from "@/lib/faqs";
import { fetchSectionImages } from "@/lib/images";
import { buildPageMetadata } from "@/lib/seo";
import { fetchStudentWork } from "@/lib/student-work";
import { fetchTestimonials } from "@/lib/testimonials";

export const generateMetadata = (): Promise<Metadata> =>
  buildPageMetadata("home");

const features = [
  {
    num: "01",
    title: "Learn to think architecturally",
    desc: "Develop strong design concepts and the 2D/3D communication skills needed to express them effectively.",
  },
  {
    num: "02",
    title: "Learn from an architect",
    desc: "Learn from an architect who has won multiple architectural competitions and has real-world experience.",
  },
  {
    num: "03",
    title: "Master industrial architectural tools",
    desc: "Rhino, Grasshopper, and AI tools for parametric designs and professional architectural presentations.",
  },
  {
    num: "04",
    title: "Learn to produce high-quality results",
    desc: "Learn to produce high-quality 2D/3D visualizations and presentations that make you stand out for global competitions.",
  },
];

export default async function Home() {
  const [courses, testimonials, heroImages, studentWork, faqs] =
    await Promise.all([
      fetchClientCourses(),
      fetchTestimonials(),
      fetchSectionImages("hero"),
      fetchStudentWork(),
      fetchFaqs(),
    ]);

  const studentWorkDisplay =
    studentWork.length > 0
      ? studentWork
      : Array.from({ length: STUDENT_WORK_PLACEHOLDER_COUNT }, (_, index) => ({
          id: `placeholder-${index}`,
          title: "Student work",
          image: PLACEHOLDER_IMAGE,
        }));

  return (
    <div className="flex flex-col w-full bg-background">
      <Hero image={heroImages.hero} />

      <section className="border-t border-border bg-card py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-3xl">
            <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
              Taught by someone who actually practices
            </h2>
            <p className="text-foreground-second">
              The definitive A-Z training from an award-winning practicing
              architect who applies academic architectural thinking in real
              life.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((item) => (
              <div
                key={item.num}
                className="flex flex-col border-t border-border pt-6"
              >
                <span className="mb-4 text-4xl font-light text-foreground-second/50">
                  {item.num}
                </span>
                <h3 className="mb-3 text-lg font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-foreground-second">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FeaturedCourses courses={courses} />

      <section className="border-t border-border bg-card py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-3xl font-bold text-foreground sm:text-4xl">
            Students&apos; work
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {studentWorkDisplay.map((item) => (
              <div
                key={item.id}
                className="relative aspect-4/3 w-full overflow-hidden border border-border bg-background"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover grayscale transition-all duration-500 hover:grayscale-0"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-3xl font-bold text-foreground sm:text-4xl">
            What students say
          </h2>
          <Carousel>
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id}>
                <div className="flex h-full flex-col border border-border bg-card p-4 sm:p-6 md:p-8">
                  <p className="mb-6 flex-1 text-base italic text-foreground-second sm:mb-8 lg:text-lg">
                    &quot;{testimonial.text}&quot;
                  </p>

                  <div className="flex items-center gap-3 border-t border-border pt-4">
                    <div className="relative size-10 shrink-0 overflow-hidden border border-border bg-background">
                      <Image
                        src={testimonial.image || PLACEHOLDER_IMAGE}
                        alt={testimonial.name}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-bold text-foreground">
                        {testimonial.name}
                      </p>
                      <p className="truncate text-sm text-foreground-second">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </Carousel>
        </div>
      </section>

      <section className="border-t border-border py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-3xl font-bold text-foreground sm:text-4xl">
            Frequently asked
          </h2>
          <Accordion allowMultiple={false}>
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={`faq-${faq.id}`}
                trigger={
                  <span className="text-lg font-medium">{faq.question}</span>
                }
              >
                <p className="p-4 text-foreground-second sm:p-6">
                  {faq.answer}
                </p>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-border bg-card py-24 text-center">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 h-px w-3/4 -translate-x-1/2 bg-linear-to-r from-transparent via-accent/50 to-transparent" />
          <div className="absolute inset-0 bg-arch-grid-fade" />
          <div className="absolute left-1/2 top-0 h-75 w-150 -translate-x-1/2 bg-accent/10 blur-[100px] animate-[float-glow_12s_ease-in-out_infinite_alternate]" />
        </div>

        <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-4xl font-black text-foreground sm:text-5xl">
            Start becoming a real architect.
          </h2>
          <p className="mb-10 text-lg text-foreground-second sm:text-xl">
            Join 250+ students across 20 countries. Master Photoshop,
            Competition Design, Rhino & Grasshopper through professional courses
            designed to shape the next generation of architects.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/courses"
              className="w-full bg-white px-8 py-4 text-sm font-bold text-black transition-colors hover:bg-gray-200 sm:w-auto"
            >
              Get full courses
            </Link>
            <Link
              href="/contact"
              className="w-full border border-border bg-background px-8 py-4 text-sm font-bold text-foreground transition-colors hover:bg-card-hover sm:w-auto"
            >
              Message Us Before you buy
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
