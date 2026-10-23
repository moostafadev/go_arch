"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Globe, LogOut, X } from "lucide-react";

import { Button } from "@/components/button";

import { sidebarData } from "./constants";
import SubItems from "./SubItems";
import { SidebarItem, SidebarProps } from "./types";
import { useLogout } from "@/features/admin/auth";

const isPathActive = (path: string, pathName: string) =>
  pathName === path || pathName.startsWith(`${path}/`);

const hasActiveDescendant = (node: SidebarItem, pathName: string): boolean =>
  node.items.some(
    (child) =>
      isPathActive(child.link, pathName) ||
      hasActiveDescendant(child, pathName),
  );

const collectActiveAncestors = (
  items: SidebarItem[],
  pathName: string,
): string[] => {
  const result: string[] = [];

  const walk = (node: SidebarItem) => {
    if (node.items.length > 0 && hasActiveDescendant(node, pathName)) {
      result.push(node.link);
    }
    node.items.forEach(walk);
  };

  items.forEach(walk);

  return result;
};

const SidebarAdmin = ({ isOpen, setIsOpen }: SidebarProps) => {
  const pathName = usePathname();
  const [openItems, setOpenItems] = useState<string[]>([]);
  const { handleLogout, isLoggingOut } = useLogout();

  const activeParents = collectActiveAncestors(sidebarData, pathName);

  const toggleItem = (link: string) => {
    setOpenItems((prev) =>
      prev.includes(link)
        ? prev.filter((item) => item !== link)
        : [...prev, link],
    );
  };

  const renderNav = () =>
    sidebarData.map(({ icon: Icon, items, link, title, isActive }) => {
      const hasItems = items.length > 0;
      const isOpenItem =
        openItems.includes(link) || activeParents.includes(link);
      const isCurrent = pathName === link;
      const hasActiveChild = activeParents.includes(link);

      const navControl = hasItems ? (
        <button
          type="button"
          disabled={!isActive}
          onClick={() => toggleItem(link)}
          className={`flex items-center justify-between w-full duration-300 ${
            isActive
              ? "hover:bg-card-hover cursor-pointer"
              : "cursor-not-allowed opacity-50"
          } ${
            hasActiveChild
              ? "bg-accent/10 text-accent"
              : "text-foreground-second"
          } px-4 py-3 text-sm font-medium`}
        >
          <div className="flex items-center gap-3">
            <Icon className="size-5 shrink-0" />
            <span>{title}</span>
          </div>
          <ChevronDown
            className={`size-4 duration-300 ${isOpenItem ? "rotate-180" : ""}`}
          />
        </button>
      ) : (
        <Link
          href={isActive ? link : pathName}
          onClick={() => setIsOpen(false)}
          className={`flex items-center gap-3 w-full duration-300 ${
            isActive ? "" : "cursor-not-allowed opacity-50"
          } ${
            isCurrent
              ? "bg-accent text-white"
              : "text-foreground-second hover:bg-card-hover hover:text-foreground"
          } px-4 py-3 text-sm font-medium`}
        >
          <Icon className="size-5 shrink-0" />
          <span>{title}</span>
        </Link>
      );

      return (
        <li key={link} className="w-full">
          {navControl}
          {hasItems && isOpenItem && (
            <SubItems
              items={items}
              setIsOpen={setIsOpen}
              openItems={openItems}
              activeParents={activeParents}
              onToggle={toggleItem}
            />
          )}
        </li>
      );
    });

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity lg:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      <aside
        className={`z-50 fixed top-0 left-0 h-screen w-64 bg-card border-r border-border duration-300 flex flex-col shadow-xl ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-border shrink-0">
          <Link
            href="/admin"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2"
          >
            <span className="text-xl font-black uppercase text-foreground">
              GO ARCH <span className="text-accent">Admin</span>
            </span>
          </Link>

          <button
            onClick={() => setIsOpen(false)}
            className="flex size-8 items-center justify-center text-foreground lg:hidden"
            aria-label="Close menu"
          >
            <X className="size-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="flex flex-col gap-1">{renderNav()}</ul>
        </nav>

        <div className="p-4 border-t border-border flex flex-col gap-2 shrink-0">
          <Link href="/" target="_blank" onClick={() => setIsOpen(false)}>
            <Button
              className="w-full justify-start"
              color="NEUTRAL"
              variant="outline"
              size="sm"
            >
              <Globe className="size-4 mr-2" />
              View Website
            </Button>
          </Link>

          <Button
            onClick={handleLogout}
            loading={isLoggingOut}
            className="w-full justify-start"
            color="DANGER"
            variant="outline"
            size="sm"
          >
            <LogOut className="size-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </aside>
    </>
  );
};

export default SidebarAdmin;
