"use client";

// In LTR, scrollLeft natively starts at 0 and goes positive
export const toNativeScrollLeft = (
  _container: HTMLElement,
  logicalOffset: number,
) => logicalOffset;

export const toLogicalScrollLeft = (container: HTMLElement) =>
  container.scrollLeft;
