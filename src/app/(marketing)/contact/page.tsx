import type { Metadata } from "next";

import {
  ContactForm,
  ContactHero,
  ContactInfo,
} from "@/features/client/contact";
import { fetchCourseOptions } from "@/lib/courses";

export const metadata: Metadata = {
  title: "Contact Us | GO ARCH",
  description:
    "Get in touch with GO ARCH. Ask about our architecture courses, mentorship programs, or general inquiries.",
};

export default async function ContactPage() {
  const courses = await fetchCourseOptions();

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <ContactHero />

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="order-2 lg:order-1">
              <ContactForm courses={courses} />
            </div>

            <div className="order-1 lg:order-2">
              <ContactInfo />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
