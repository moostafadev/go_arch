import Link from "next/link";
import { Suspense } from "react";
import { FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";
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

const socialLinks = [
  { icon: FaInstagram, href: "#", label: "Instagram" },
  { icon: FaLinkedin, href: "#", label: "LinkedIn" },
  { icon: FaXTwitter, href: "#", label: "Twitter (X)" },
];

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-card pt-10 pb-24 lg:pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8 mb-8">
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="text-2xl font-black uppercase tracking-tight text-foreground"
            >
              GO ARCH
            </Link>
            <p className="text-sm leading-relaxed text-foreground-second">
              The definitive A-Z program in architectural design. Master
              Competition Design, Photoshop, Rhino & Grasshopper.
            </p>
            <div className="flex gap-3 mt-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="flex size-9 items-center justify-center border border-border bg-background text-foreground-second transition-all hover:border-accent hover:bg-accent hover:text-white"
                  >
                    <Icon className="size-4" />
                  </a>
                );
              })}
            </div>
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
                    className="text-sm text-foreground-second transition-colors hover:text-accent"
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
                    className="text-sm text-foreground-second transition-colors hover:text-accent"
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
                  href="mailto:hello@goarch.academy"
                  className="hover:text-accent transition-colors"
                >
                  hello@goarch.academy
                </a>
              </li>
              <li>
                <a
                  href="tel:+201234567890"
                  className="hover:text-accent transition-colors"
                >
                  +20 123 456 7890
                </a>
              </li>
              <li>Cairo, Egypt (Global Online)</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col items-center justify-between gap-4 md:flex-row text-xs text-foreground-second">
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
    </footer>
  );
};
