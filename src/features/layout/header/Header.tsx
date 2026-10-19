"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <header
      className={`fixed z-50 w-full border-border transition-all duration-500 ease-in-out
        ${
          isOpen
            ? "bottom-0 top-0 h-screen bg-background"
            : "bottom-0 top-auto lg:top-0 lg:bottom-auto border-t lg:border-t-0 lg:border-b bg-background/60 backdrop-blur-xl"
        }
      `}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 z-50"
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

        <nav className="flex items-center gap-5 lg:hidden z-50">
          {!isOpen &&
            navLinks.slice(0, 2).map((link) => (
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
            className="flex size-10 items-center justify-center bg-card border border-border text-foreground active:scale-95 transition-transform"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-x-0 top-16 bottom-0 flex flex-col justify-between overflow-y-auto bg-background px-6 pb-8 pt-4 lg:hidden"
          >
            <nav className="flex flex-col gap-2 mt-4">
              {navLinks.map((link, i) => (
                <motion.div
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
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 flex flex-col gap-6"
            >
              <Link
                href="/courses"
                onClick={() => setIsOpen(false)}
                className="group flex w-full items-center justify-center gap-2 bg-accent px-5 py-4 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-accent-hover"
              >
                Get Started
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <div className="text-center">
                <p className="text-xs text-foreground-second uppercase tracking-widest">
                  GO ARCH ACADEMY
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
