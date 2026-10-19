"use client";

import { CarouselItemProps } from "./types";

const CarouselItem = ({ children, className = "" }: CarouselItemProps) => {
  return (
    <div
      className={`min-w-0 shrink-0 flex-[0_0_100%] sm:flex-[0_0_calc(50%-0.5rem)] lg:flex-[0_0_calc(33.333%-0.66rem)] ${className}`}
    >
      {children}
    </div>
  );
};

export default CarouselItem;
