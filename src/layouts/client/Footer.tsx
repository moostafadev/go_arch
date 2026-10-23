import Link from "next/link";
import { Suspense } from "react";

import { Brand } from "@/components/brand";
import { SocialLinks } from "@/components/social-links";
import { formatPhone, toMailHref, toTelHref } from "@/lib/contact";
import { fetchContactSettings, fetchSocialLinks } from "@/lib/site-settings";

import { CopyrightYear } from "./CopyrightYear";

const platformLinks = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses" },
  { label: "About Us", href: "/about" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Contact Us", href: "/contact" },
];

export const Footer = async () => {
  const [contact, socials] = await Promise.all([
    fetchContactSettings(),
    fetchSocialLinks(),
  ]);

  return (
    <footer className="border-t border-border bg-card pt-10 pb-24 lg:pb-12">
      <div className="container flex flex-col gap-10 lg:gap-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12 lg:grid-cols-4 lg:gap-8">
          <div className="flex flex-col gap-4">
            <Brand size="lg" />

            <p className="text-sm leading-relaxed text-foreground-second">
              The definitive A-Z program in architectural design. Master
              Competition Design, Photoshop, Rhino & Grasshopper.
            </p>

            <SocialLinks links={socials} size="sm" />
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
              Platform
            </h3>

            <ul className="flex flex-col gap-3">
              {platformLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground-second transition-colors hover:text-accent-text"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
              Legal
            </h3>

            <ul className="flex flex-col gap-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground-second transition-colors hover:text-accent-text"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
              Contact
            </h3>

            <ul className="flex flex-col gap-3 text-sm text-foreground-second">
              <li>
                <a
                  href={toMailHref(contact.email)}
                  className="hover:text-accent-text transition-colors"
                >
                  {contact.email}
                </a>
              </li>
              <li>
                <a
                  href={toTelHref(contact.phone)}
                  className="hover:text-accent-text transition-colors"
                >
                  {formatPhone(contact.phone)}
                </a>
              </li>
              <li>Cairo, Egypt (Global Online)</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-6">
          <div className="flex flex-col items-center justify-between gap-4 text-xs text-foreground-second md:flex-row">
            <p>
              <Suspense
                fallback={
                  <span>&copy; 2026 GO ARCH Academy. All rights reserved.</span>
                }
              >
                <CopyrightYear />
              </Suspense>
            </p>
            <p>Designed with architectural precision.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
