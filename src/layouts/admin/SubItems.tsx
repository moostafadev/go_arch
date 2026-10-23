"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

import { SubItemsProps } from "./types";

const isPathActive = (path: string, pathName: string) =>
  pathName === path || pathName.startsWith(`${path}/`);

const INDENT: Record<number, string> = {
  1: "pl-12",
  2: "pl-16",
  3: "pl-20",
  4: "pl-24",
};

const getIndent = (depth: number) => INDENT[depth] ?? "pl-24";

const SubItems = ({
  items,
  setIsOpen,
  openItems,
  activeParents,
  onToggle,
  depth = 1,
}: SubItemsProps) => {
  const pathName = usePathname();
  const indent = getIndent(depth);

  const activeLink = items
    .filter(({ link }) => isPathActive(link, pathName))
    .sort((a, b) => b.link.length - a.link.length)[0]?.link;

  return (
    <ul className="flex flex-col gap-1 mt-1 max-w-full">
      {items.map((item) => {
        const { icon: Icon, link, title, isActive, items: children } = item;

        const hasChildren = children.length > 0;
        const isCurrent = link === activeLink;
        const isOpen = openItems.includes(link) || activeParents.includes(link);
        const isActiveParent = activeParents.includes(link);

        if (hasChildren) {
          return (
            <li key={link} className="w-full">
              <button
                type="button"
                disabled={!isActive}
                onClick={() => onToggle(link)}
                className={`flex items-center justify-between w-full duration-300 ${
                  isActive
                    ? "hover:bg-card-hover cursor-pointer"
                    : "cursor-not-allowed opacity-50"
                } ${
                  isActiveParent
                    ? "bg-accent/10 text-accent"
                    : "text-foreground-second hover:bg-card-hover hover:text-foreground"
                } ${indent} pr-3 py-2 text-sm font-medium`}
              >
                <div className="flex min-w-0 items-center gap-3">
                  <Icon className="size-4 shrink-0" />
                  <span className="truncate">{title}</span>
                </div>
                <ChevronDown
                  className={`size-4 shrink-0 duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <SubItems
                  items={children}
                  setIsOpen={setIsOpen}
                  openItems={openItems}
                  activeParents={activeParents}
                  onToggle={onToggle}
                  depth={depth + 1}
                />
              )}
            </li>
          );
        }

        return (
          <li key={link} className="w-full">
            <Link
              href={isActive ? link : pathName}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 w-full duration-300 ${
                isActive ? "" : "cursor-not-allowed opacity-50"
              } ${
                isCurrent
                  ? "bg-accent/10 text-accent"
                  : "text-foreground-second hover:bg-card-hover hover:text-foreground"
              } ${indent} pr-3 py-2 text-sm font-medium`}
            >
              <Icon className="size-4 shrink-0" />
              <span className="truncate">{title}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default SubItems;
