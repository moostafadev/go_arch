"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SubItemsProps } from "./types";

const SubItems = ({ items, setIsOpen }: SubItemsProps) => {
  const pathName = usePathname();

  const activeLink = items
    .filter(({ link }) => pathName === link || pathName.startsWith(`${link}/`))
    .sort((a, b) => b.link.length - a.link.length)[0]?.link;

  return (
    <ul className="flex flex-col gap-1 mt-1 max-w-full">
      {items.map(({ icon: Icon, link, title, isActive }) => {
        const isCurrent = link === activeLink;

        return (
          <li key={link} className="w-full">
            <Link
              href={isActive ? link : pathName}
              onClick={() => setIsOpen(false)}
              className={`
                  flex items-center gap-3 w-full duration-300
                  ${isActive ? "" : "cursor-not-allowed opacity-50"}
                  ${
                    isCurrent
                      ? "bg-accent/10 text-accent"
                      : "text-foreground-second hover:bg-card-hover hover:text-foreground"
                  }
                  px-3 py-2 pl-12 text-sm font-medium
                `}
            >
              <Icon className="size-4 shrink-0" />
              <span>{title}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default SubItems;
