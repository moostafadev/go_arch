import Image from "next/image";
import Link from "next/link";
import { Accordion, AccordionItem } from "@/components/accordion";
import { Carousel, CarouselItem } from "@/components/carousel";
import { Hero } from "@/features/client/home/hero";
import { FeaturedCourses } from "@/features/client/home/FeaturedCourses";

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

const testimonials = [
  {
    name: "Ahmed Hassan",
    role: "Architecture Student",
    text: "This program completely changed how I approach architectural design. The parametric design modules are top-notch.",
  },
  {
    name: "Sarah Smith",
    role: "Junior Architect",
    text: "The best investment I've made in my career. The competition workshop helped me land my first international internship.",
  },
  {
    name: "Omar Khaled",
    role: "Freelance Designer",
    text: "The AI rendering techniques taught here saved me hours of work and elevated the quality of my presentations.",
  },
  {
    name: "Laila Mahmoud",
    role: "Architecture Student",
    text: "Having an actual practicing architect as a mentor is a game-changer. The feedback is incredibly valuable.",
  },
];

const faqs = [
  {
    q: "Are the courses in Arabic or English?",
    a: "All courses are taught in a mix of Arabic and English, focusing on the technical terminology used globally in the architecture industry.",
  },
  {
    q: "What's the difference between a diploma, a bundle, and a course?",
    a: "A course focuses on one specific skill (like Photoshop). A bundle combines related courses at a discount. A diploma is a comprehensive program covering all aspects of architectural design.",
  },
  {
    q: "Is access really for life?",
    a: "Yes, once you enroll, you get lifetime access to the course materials, including any future updates.",
  },
  {
    q: "Who teaches the courses?",
    a: "Courses are taught by practicing architects with years of experience in winning international competitions and real-world projects.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-background">
      <Hero />

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

      <FeaturedCourses />

      <section className="border-t border-border bg-card py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-3xl font-bold text-foreground sm:text-4xl">
            Students&apos; work
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="relative aspect-4/3 w-full overflow-hidden border border-border bg-background"
              >
                <Image
                  src={`https://images.unsplash.com/photo-${i === 1 ? "1487958449943-2429e8be8625" : i === 2 ? "1511818966892-d7d671e672a2" : "1600585154340-be6161a56a0c"}?q=80&w=800&auto=format&fit=crop`}
                  alt={`Student Project ${i}`}
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
            {testimonials.map((testimonial, idx) => (
              <CarouselItem key={idx}>
                <div className="flex h-full flex-col border border-border bg-card p-6 lg:p-8">
                  <p className="mb-8 flex-1 text-base italic text-foreground-second lg:text-lg">
                    &quot;{testimonial.text}&quot;
                  </p>
                  <div>
                    <p className="font-bold text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-foreground-second">
                      {testimonial.role}
                    </p>
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
            {faqs.map((faq, idx) => (
              <AccordionItem
                key={idx}
                value={`faq-${idx}`}
                trigger={<span className="text-lg font-medium">{faq.q}</span>}
              >
                <p className="p-6 text-foreground-second">{faq.a}</p>
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
