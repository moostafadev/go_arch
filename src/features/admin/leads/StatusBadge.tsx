"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDown } from "lucide-react";

import { Tag } from "@/components/tag";

import { LEAD_STATUSES, LeadStatus, statusColors } from "./types";

interface StatusBadgeProps {
  status: LeadStatus;
  onChange: (status: LeadStatus) => Promise<void>;
}

export const StatusBadge = ({ status, onChange }: StatusBadgeProps) => {
  const [open, setOpen] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [position, setPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!open || !triggerRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();
    const menuWidth = 140;
    const menuHeight = 160;
    const spaceBelow = window.innerHeight - rect.bottom;

    const top =
      spaceBelow > menuHeight ? rect.bottom + 4 : rect.top - menuHeight - 4;

    setPosition({
      top: Math.max(8, top),
      left: Math.min(rect.left, window.innerWidth - menuWidth - 8),
    });
  }, [open]);

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

    const closeOnScroll = () => setOpen(false);

    document.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("scroll", closeOnScroll, true);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("scroll", closeOnScroll, true);
    };
  }, [open]);

  const handleSelect = async (next: LeadStatus) => {
    if (next === status || updating) {
      setOpen(false);
      return;
    }

    setUpdating(true);

    try {
      await onChange(next);
    } finally {
      setUpdating(false);
      setOpen(false);
    }
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        disabled={updating}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex cursor-pointer items-center gap-1 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Tag color={statusColors[status]} variant="soft" size="sm">
          {updating ? "Updating..." : status}
        </Tag>
        <ChevronDown
          className={`size-3.5 text-foreground-second transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open &&
        position &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            ref={menuRef}
            role="listbox"
            style={{
              position: "fixed",
              top: position.top,
              left: position.left,
              width: 140,
            }}
            className="z-9999 border border-border bg-card shadow-lg"
          >
            {LEAD_STATUSES.map((option) => (
              <button
                key={option}
                type="button"
                role="option"
                aria-selected={option === status}
                onClick={() => handleSelect(option)}
                className={`flex w-full items-center justify-between px-3 py-2 text-start text-xs transition-colors hover:bg-card-hover ${
                  option === status
                    ? "font-semibold text-accent"
                    : "text-foreground"
                }`}
              >
                {option}
              </button>
            ))}
          </div>,
          document.body,
        )}
    </>
  );
};
