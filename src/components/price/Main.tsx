"use client";

import { memo } from "react";

import { formatPrice } from "@/lib/format";

import { PriceProps, PriceSize } from "./types";

const sizeMap: Record<
  PriceSize,
  { current: string; original: string; gap: string }
> = {
  sm: {
    current: "text-xs font-bold sm:text-sm",
    original: "text-[10px] sm:text-xs",
    gap: "gap-1",
  },
  md: {
    current: "text-sm font-bold sm:text-base",
    original: "text-xs",
    gap: "gap-1",
  },
  lg: {
    current: "text-lg font-bold sm:text-xl",
    original: "text-sm",
    gap: "gap-1.5",
  },
  xl: {
    current: "text-4xl font-black",
    original: "text-sm",
    gap: "gap-2",
  },
};

const Price = ({
  price,
  discountPrice,
  size = "md",
  className = "",
}: PriceProps) => {
  const hasDiscount = Boolean(discountPrice && discountPrice !== price);
  const current = formatPrice(hasDiscount ? discountPrice : price);
  const original = formatPrice(price);
  const styles = sizeMap[size];

  if (!hasDiscount) {
    return (
      <span className={`${styles.current} text-foreground ${className}`}>
        {original}
      </span>
    );
  }

  return (
    <span className={`inline-flex items-baseline ${styles.gap} ${className}`}>
      <span className={`${styles.current} text-accent`}>{current}</span>
      <span
        className={`${styles.original} text-foreground-second line-through`}
      >
        {original}
      </span>
    </span>
  );
};

export default memo(Price);
