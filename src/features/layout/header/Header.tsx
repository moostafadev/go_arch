"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses" },
  { label: "Mentorship", href: "/mentorship" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const Header = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      className={`fixed z-50 w-full border-border bg-background/60 backdrop-blur-xl transition-all duration-300
        ${isOpen ? "bottom-0 top-0 h-screen lg:h-auto" : "bottom-0 top-auto lg:top-0 lg:bottom-auto"}
        border-t lg:border-t-0 lg:border-b
      `}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2"
          onClick={() => setIsOpen(false)}
        >
          <Image
            src="/logo.png"
            alt="GO ARCH"
            width={150}
            height={40}
            className="h-8 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex lg:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-accent ${
                pathname === link.href ? "text-accent" : "text-foreground/80"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex">
          <Link
            href="/courses"
            className="bg-accent px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Navigation (Bottom Bar Style) */}
        <nav className="flex items-center gap-5 lg:hidden">
          {navLinks.slice(0, 2).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-xs font-medium transition-colors ${
                pathname === link.href
                  ? "text-accent"
                  : "text-foreground-second"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex size-9 items-center justify-center text-foreground"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </nav>
      </div>

      {/* Mobile Full Menu */}
      {isOpen && (
        <div className="flex flex-col gap-6 px-6 py-8 lg:hidden">
          <nav className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-lg font-medium transition-colors ${
                  pathname === link.href ? "text-accent" : "text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/courses"
            onClick={() => setIsOpen(false)}
            className="mt-4 flex w-full items-center justify-center bg-accent px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
          >
            Get Started
          </Link>
        </div>
      )}
    </header>
  );
};
