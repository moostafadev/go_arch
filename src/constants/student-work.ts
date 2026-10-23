import type { ImageRatioRule } from "@/components/image-input";

export const STUDENT_WORK_IMAGE_RATIO: ImageRatioRule = {
  min: 1.2,
  max: 1.5,
  label: "landscape 4:3 · 1200×900+",
};

export const STUDENT_WORK_RULES = {
  titleMax: 80,
  maxItems: 12,
} as const;

export const STUDENT_WORK_PLACEHOLDER_COUNT = 3;
