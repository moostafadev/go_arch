"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

import { Button } from "@/components/button";

import { DialogOptions } from "./types";

interface Props extends DialogOptions {
  onClose: () => void;
}

const sizes = {
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
};

const Dialog = ({ title, children, size = "md", onClose }: Props) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      onMouseDown={onClose}
      className="fixed inset-0 z-9999 flex items-center justify-center bg-black/60 p-3 backdrop-blur-sm animate-[hero-fade-up_0.2s_cubic-bezier(0.22,1,0.36,1)_both]"
    >
      <div
        onMouseDown={(e) => e.stopPropagation()}
        className={`relative w-full shrink-0 ${sizes[size]} border border-border bg-card p-3 shadow-lg sm:p-4 animate-[hero-fade-up_0.2s_cubic-bezier(0.22,1,0.36,1)_both]`}
      >
        {title && (
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3 sm:mb-4 lg:gap-4">
            <h2 className="font-bold text-foreground lg:text-lg">{title}</h2>

            <Button
              type="button"
              onClick={onClose}
              className="flex items-center justify-center"
              size="icon"
              color="NEUTRAL"
              variant="soft"
              aria-label="Close dialog"
            >
              <X className="size-3 lg:size-4" />
            </Button>
          </div>
        )}

        {children}
      </div>
    </div>
  );
};

export default Dialog;
