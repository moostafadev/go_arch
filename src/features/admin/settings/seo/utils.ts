import type { SeoData } from "@/constants/seo";

import type { SeoFormData } from "./types";

export const parseKeywords = (value: string): string[] =>
  Array.from(
    new Set(
      value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    ),
  );

export const toFormData = (data: SeoData): SeoFormData => ({
  title: data.title,
  description: data.description,
  keywords: data.keywords.join(", "),
  image: data.image ?? "",
});

export const toPayload = (data: SeoFormData): SeoData => ({
  title: data.title.trim(),
  description: data.description.trim(),
  keywords: parseKeywords(data.keywords),
  image: data.image || null,
});
