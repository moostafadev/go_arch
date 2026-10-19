import Link from "next/link";
import { Suspense } from "react";
import { CopyrightYear } from "./CopyrightYear";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-card pb-20 pt-12 lg:pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex flex-col items-center gap-2 md:items-start">
            <span className="text-xl font-bold text-foreground">GO ARCH</span>
            <p className="text-sm text-foreground-second">
              Master Architecture & Parametric Design.
            </p>
          </div>

          <nav className="flex gap-6 text-sm font-medium text-foreground-second">
            <Link
              href="/privacy"
              className="transition-colors hover:text-accent"
            >
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-accent">
              Terms
            </Link>
            <Link
              href="/contact"
              className="transition-colors hover:text-accent"
            >
              Contact
            </Link>
          </nav>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center text-xs text-foreground-second">
          <Suspense
            fallback={
              <span>&copy; 2026 GO ARCH Academy. All rights reserved.</span>
            }
          >
            <CopyrightYear />
          </Suspense>
        </div>
      </div>
    </footer>
  );
};
