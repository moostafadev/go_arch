"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react"; // Changed to ChevronRight

import { BreadcrumbProps } from "./types";
import { usePathname } from "next/navigation";
import { Tooltip } from "@/components/tooltip";

const Breadcrumb = ({ items, className = "" }: BreadcrumbProps) => {
  const pathName = usePathname();
  return (
    <nav
      aria-label="Breadcrumb"
      tabIndex={0}
      className={`scrollbar-hide w-full overflow-x-auto overscroll-x-contain focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${className}`}
    >
      <ol className="flex w-max min-w-full flex-nowrap items-center gap-1.5 text-sm sm:gap-2">
        <li className="flex shrink-0 items-center">
          <Tooltip content="Home" focusable={false}>
            <Link
              href={pathName.startsWith("/admin") ? "/admin" : "/"}
              aria-label="Home"
              className="flex size-8 items-center justify-center text-foreground-second transition-colors hover:bg-card hover:text-accent sm:size-9"
            >
              <Home aria-hidden="true" className="size-4 sm:size-4.5" />
            </Link>
          </Tooltip>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li
              key={index}
              className="flex shrink-0 items-center gap-1.5 sm:gap-2"
            >
              <ChevronRight
                aria-hidden="true"
                className="size-4 shrink-0 text-foreground-second/50"
              />

              {isLast ? (
                <span className="flex shrink-0 items-center gap-1.5 whitespace-nowrap font-semibold text-foreground">
                  {item.icon && <span className="shrink-0">{item.icon}</span>}
                  <span>{item.label}</span>
                </span>
              ) : item.href ? (
                <Link
                  href={item.href}
                  className="flex shrink-0 items-center gap-1.5 whitespace-nowrap text-foreground-second transition-colors hover:text-accent"
                >
                  {item.icon && <span className="shrink-0">{item.icon}</span>}
                  <span>{item.label}</span>
                </Link>
              ) : (
                <span className="flex shrink-0 items-center gap-1.5 whitespace-nowrap text-foreground-second">
                  {item.icon && <span className="shrink-0">{item.icon}</span>}
                  <span>{item.label}</span>
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
