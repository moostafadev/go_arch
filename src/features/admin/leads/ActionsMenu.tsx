"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { MoreHorizontal, type LucideIcon } from "lucide-react";

export interface MenuItem {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  danger?: boolean;
  disabled?: boolean;
}

interface ActionsMenuProps {
  items: MenuItem[];
}

export const ActionsMenu = ({ items }: ActionsMenuProps) => {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!open || !triggerRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();
    const menuWidth = 180;
    const menuHeight = items.length * 40 + 8;
    const spaceBelow = window.innerHeight - rect.bottom;

    const top =
      spaceBelow > menuHeight ? rect.bottom + 4 : rect.top - menuHeight - 4;

    setPosition({
      top: Math.max(8, top),
      left: Math.min(
        rect.left + rect.width - menuWidth,
        window.innerWidth - menuWidth - 8,
      ),
    });
  }, [open, items.length]);

  useEffect(() => {
    if (!open) return;

    const handleMouseDown = (event: MouseEvent) => {
      if (
        triggerRef.current?.contains(event.target as Node) ||
        menuRef.current?.contains(event.target as Node)
      ) {
        return;
      }
      setOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    const closeOnScroll = () => setOpen(false);

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", closeOnScroll, true);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", closeOnScroll, true);
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="More actions"
        className="flex size-8 cursor-pointer items-center justify-center text-foreground-second transition-colors hover:text-accent"
      >
        <MoreHorizontal className="size-4" />
      </button>

      {open &&
        position &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            ref={menuRef}
            role="menu"
            style={{
              position: "fixed",
              top: position.top,
              left: position.left,
              width: 180,
            }}
            className="z-9999 border border-border bg-card shadow-lg"
          >
            {items.map((item, index) => {
              const Icon = item.icon;

              if (item.disabled) {
                return (
                  <div
                    key={index}
                    role="menuitem"
                    aria-disabled="true"
                    className="flex w-full cursor-not-allowed items-center gap-2 p-3 text-xs text-foreground-second/40 sm:p-4"
                  >
                    <Icon className="size-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                );
              }

              if (item.href) {
                return (
                  <a
                    key={index}
                    href={item.href}
                    target={item.target}
                    rel={item.rel}
                    role="menuitem"
                    onClick={() => setOpen(false)}
                    className="flex w-full cursor-pointer items-center gap-2 p-3 text-xs text-foreground transition-colors hover:bg-card-hover sm:p-4"
                  >
                    <Icon className="size-4 shrink-0" />
                    <span>{item.label}</span>
                  </a>
                );
              }

              return (
                <button
                  key={index}
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    item.onClick?.();
                    setOpen(false);
                  }}
                  className={`flex w-full cursor-pointer items-center gap-2 p-3 text-xs transition-colors sm:p-4 ${
                    item.danger
                      ? "text-danger hover:bg-danger/10"
                      : "text-foreground hover:bg-card-hover"
                  }`}
                >
                  <Icon className="size-4 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>,
          document.body,
        )}
    </>
  );
};
