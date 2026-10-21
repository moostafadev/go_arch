"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const Header = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const scrollY = window.scrollY;
    const body = document.body;
    const originalStyle = body.getAttribute("style") ?? "";

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";

    return () => {
      body.setAttribute("style", originalStyle);
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  return (
    <>
      <header
        className={`fixed bottom-0 z-40 w-full border-t border-border backdrop-blur-md lg:top-0 lg:bottom-auto lg:border-t-0 lg:border-b ${
          isOpen ? "bg-background" : "bg-background/60"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="flex shrink-0 items-center gap-2"
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

          <div className="hidden lg:flex">
            <Link
              href="/courses"
              className="bg-accent px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
            >
              Get Started
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            {!isOpen && (
              <Link
                href="/courses"
                className="bg-accent px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-accent-hover sm:px-5 sm:text-sm"
              >
                Get Started
              </Link>
            )}

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              className={`flex size-10 shrink-0 items-center justify-center border transition-all active:scale-95 ${
                isOpen
                  ? "border-accent bg-accent text-white hover:bg-accent-hover"
                  : "border-border bg-card text-foreground hover:bg-card-hover"
              }`}
            >
              {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-0 bottom-16 z-30 flex flex-col overflow-y-auto overscroll-none bg-background px-4 pb-4 pt-4 scrollbar-none [&::-webkit-scrollbar]:hidden sm:px-6 lg:hidden"
          >
            <nav className="flex flex-col gap-2 mt-2">
              {navLinks.map((link, i) => (
                <m.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between border-b border-border/50 py-4 text-2xl font-bold uppercase tracking-tight transition-colors ${
                      pathname === link.href
                        ? "text-accent"
                        : "text-foreground hover:text-accent"
                    }`}
                  >
                    {link.label}
                    <ArrowRight
                      className={`size-5 transition-transform ${
                        pathname === link.href
                          ? "opacity-100"
                          : "opacity-0 -translate-x-2"
                      }`}
                    />
                  </Link>
                </m.div>
              ))}
            </nav>

            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-auto pt-6"
            >
              <Link
                href="/courses"
                onClick={() => setIsOpen(false)}
                className="group flex w-full items-center justify-center gap-2 bg-accent px-5 py-4 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-accent-hover"
              >
                Get Started
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
};
