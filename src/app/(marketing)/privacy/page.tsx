import type { Metadata } from "next";

import { buildPageMetadata } from "@/lib/seo";

export const generateMetadata = (): Promise<Metadata> =>
  buildPageMetadata("privacy");

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background pb-24 pt-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 border-b border-border pb-8">
          <h1 className="mb-4 text-3xl font-black uppercase tracking-tight text-foreground sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="text-foreground-second">Last updated: October 2026</p>
        </div>

        <div className="space-y-8 text-sm leading-relaxed text-foreground-second sm:text-base">
          <section>
            <h2 className="mb-3 text-xl font-bold text-foreground">
              1. Information We Collect
            </h2>
            <p>
              When you use our website, register for a course, or contact us via
              WhatsApp, we may collect personal information such as your name,
              email address, phone number, and payment details. We only collect
              information that is necessary to provide our educational services.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-foreground">
              2. How We Use Your Information
            </h2>
            <p>We use the information we collect for the following purposes:</p>
            <ul className="mt-2 list-inside list-disc space-y-2 pl-4">
              <li>
                To process your enrollment and provide access to course
                materials.
              </li>
              <li>
                To communicate with you regarding your courses, updates, or
                support inquiries.
              </li>
              <li>
                To improve our website, services, and overall user experience.
              </li>
              <li>
                To send promotional materials, only if you have opted in to
                receive them.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-foreground">
              3. Data Sharing and Security
            </h2>
            <p>
              We do not sell, trade, or rent your personal information to third
              parties. We implement industry-standard security measures to
              protect your data. However, please note that no method of
              transmission over the Internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-foreground">
              4. Cookies
            </h2>
            <p>
              Our website may use cookies to enhance your browsing experience.
              You can choose to disable cookies through your browser settings,
              though this may affect certain functionalities of the site.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-foreground">
              5. Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at{" "}
              <a
                href="mailto:hello@goarch.academy"
                className="text-accent hover:underline"
              >
                hello@goarch.academy
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
