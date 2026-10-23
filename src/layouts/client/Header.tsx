"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

import { Brand } from "@/components/brand";

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
          <Brand size="md" priority onNavigate={() => setIsOpen(false)} />

          <nav className="hidden lg:flex lg:items-center lg:gap-8">
            {navLinks.map((link) => {
              const active = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`text-sm transition-all duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${
                    active
                      ? "font-bold text-foreground"
                      : "font-medium text-foreground/90 hover:-translate-y-0.5 hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
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

      {isOpen && (
        <div className="fixed inset-x-0 top-0 bottom-16 z-30 flex flex-col overflow-y-auto overscroll-none bg-background px-4 pb-4 pt-4 scrollbar-none [&::-webkit-scrollbar]:hidden sm:px-6 lg:hidden animate-[hero-fade-up_0.25s_cubic-bezier(0.22,1,0.36,1)_both]">
          <nav className="flex flex-col gap-2 mt-2">
            {navLinks.map((link, i) => {
              const active = pathname === link.href;

              return (
                <div
                  key={link.href}
                  className="animate-[hero-fade-up_0.25s_cubic-bezier(0.22,1,0.36,1)_both]"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`group flex items-center justify-between border-b border-border/50 py-4 text-2xl uppercase tracking-tight transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                      active
                        ? "font-black text-accent-text"
                        : "font-bold text-foreground/90 hover:text-foreground"
                    }`}
                  >
                    {link.label}
                    <ArrowRight
                      className={`size-5 transition-all duration-200 ${
                        active
                          ? "translate-x-0 text-accent-text opacity-100"
                          : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                      }`}
                    />
                  </Link>
                </div>
              );
            })}
          </nav>

          <div
            className="mt-auto pt-6 animate-[hero-fade-up_0.3s_cubic-bezier(0.22,1,0.36,1)_both]"
            style={{ animationDelay: "0.3s" }}
          >
            <Link
              href="/courses"
              onClick={() => setIsOpen(false)}
              className="group flex w-full items-center justify-center gap-2 bg-accent px-5 py-4 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-accent-hover"
            >
              Get Started
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
