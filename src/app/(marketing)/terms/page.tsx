import type { Metadata } from "next";

import { buildPageMetadata } from "@/lib/seo";

export const generateMetadata = (): Promise<Metadata> =>
  buildPageMetadata("terms");

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen bg-background py-14 lg:py-18 pt-28 lg:pt-32">
      <div className="container">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 lg:gap-8">
          <div className="flex flex-col gap-3 lg:gap-4 border-b border-border pb-6 lg:pb-8">
            <h1 className="text-3xl font-black uppercase tracking-tight text-foreground sm:text-4xl">
              Terms & Conditions
            </h1>
            <p className="text-foreground-second">Last updated: October 2026</p>
          </div>

          <div className="flex flex-col gap-6 lg:gap-8 text-sm leading-relaxed text-foreground-second sm:text-base">
            <section className="flex flex-col gap-3 lg:gap-4">
              <h2 className="text-xl font-bold text-foreground">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing and using the GO ARCH website, you agree to be
                bound by these Terms and Conditions. If you do not agree with
                any part of these terms, you must not use our services.
              </p>
            </section>

            <section className="flex flex-col gap-3 lg:gap-4">
              <h2 className="text-xl font-bold text-foreground">
                2. Enrollment and Access
              </h2>
              <p>
                Upon successful payment and registration, you will be granted
                access to the specific course or mentorship program you enrolled
                in. Access is granted for the duration specified on the course
                page. You agree not to share your login credentials or course
                materials with any third party.
              </p>
            </section>

            <section className="flex flex-col gap-3 lg:gap-4">
              <h2 className="text-xl font-bold text-foreground">
                3. Intellectual Property
              </h2>
              <p>
                All content provided in our courses, including but not limited
                to videos, text, images, files, and designs, is the intellectual
                property of GO ARCH and its instructors. You may not reproduce,
                distribute, or create derivative works from this content without
                explicit written permission.
              </p>
            </section>

            <section className="flex flex-col gap-3 lg:gap-4">
              <h2 className="text-xl font-bold text-foreground">
                4. Refund Policy
              </h2>
              <p>
                Due to the digital nature of our products, all sales are final
                unless stated otherwise. Refunds may only be issued in
                exceptional circumstances at the discretion of GO ARCH
                management. Please contact us before purchasing if you have any
                doubts.
              </p>
            </section>

            <section className="flex flex-col gap-3 lg:gap-4">
              <h2 className="text-xl font-bold text-foreground">
                5. Modifications to Services
              </h2>
              <p>
                We reserve the right to modify, suspend, or discontinue any part
                of our services at any time. We will not be liable to you or any
                third party for any such modifications.
              </p>
            </section>

            <section className="flex flex-col gap-3 lg:gap-4">
              <h2 className="text-xl font-bold text-foreground">
                6. Contact Information
              </h2>
              <p>
                For any questions regarding these Terms, please reach out to us
                at{" "}
                <a
                  href="mailto:legal@goarch.academy"
                  className="text-accent-text underline underline-offset-2 hover:text-accent-hover"
                >
                  legal@goarch.academy
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
