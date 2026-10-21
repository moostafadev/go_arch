"use client";

import { useEffect } from "react";
import { m } from "framer-motion";
import { X } from "lucide-react";

import { DialogOptions } from "./types";
import { Button } from "../button";

interface Props extends DialogOptions {
  onClose: () => void;
}

const sizes = {
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const contentVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 12 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.96, y: 12 },
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
    <m.div
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.2, ease: "easeOut" }}
      onMouseDown={onClose}
      className="fixed inset-0 z-9999 flex items-center justify-center bg-black/60 p-3 backdrop-blur-sm"
    >
      <m.div
        variants={contentVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        onMouseDown={(e) => e.stopPropagation()}
        className={`relative w-full shrink-0 ${sizes[size]} border border-border bg-card p-3 shadow-lg sm:p-4`}
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
      </m.div>
    </m.div>
  );
};

export default Dialog;
