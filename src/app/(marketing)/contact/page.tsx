import type { Metadata } from "next";

import {
  ContactForm,
  ContactHero,
  ContactInfo,
} from "@/features/client/contact";
import { fetchCourseOptions } from "@/lib/courses";
import { buildPageMetadata } from "@/lib/seo";
import { fetchContactSettings, fetchSocialLinks } from "@/lib/site-settings";

export const generateMetadata = (): Promise<Metadata> =>
  buildPageMetadata("contact");

export default async function ContactPage() {
  const [courses, contact, socials] = await Promise.all([
    fetchCourseOptions(),
    fetchContactSettings(),
    fetchSocialLinks(),
  ]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <ContactHero />

      <section className="py-14 lg:py-18">
        <div className="container">
          <div className="grid grid-cols-1 gap-6 lg:gap-8 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <ContactForm courses={courses} />
            </div>

            <div className="order-1 lg:order-2">
              <ContactInfo
                phone={contact.phone}
                email={contact.email}
                socials={socials}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
