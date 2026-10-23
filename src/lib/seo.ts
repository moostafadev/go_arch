import { cache } from "react";
import type { Metadata } from "next";

import { PLACEHOLDER_IMAGE } from "@/constants/placeholders";
import {
  SEO_DEFAULTS,
  SEO_PAGES,
  isSeoPageKey,
  type SeoData,
  type SeoPageKey,
} from "@/constants/seo";

import { prisma } from "./prisma";

interface SeoRow {
  pageKey: string;
  title: string;
  description: string;
  keywords: string[];
  image: string | null;
}

export type SeoMap = Record<SeoPageKey, SeoData>;

const CANONICAL_HOST = "https://goarch-kappa.vercel.app";

const getSiteUrl = (): string => {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, "");
  return CANONICAL_HOST;
};

export const absoluteUrl = (path: string): string => {
  if (/^https?:\/\//i.test(path)) return path;
  const base = getSiteUrl();
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `${base}${suffix}`;
};

export const resolveSeoSettings = (rows: SeoRow[]): SeoMap => {
  const map = { ...SEO_DEFAULTS } as SeoMap;

  for (const row of rows) {
    if (!isSeoPageKey(row.pageKey)) continue;

    const fallback = SEO_DEFAULTS[row.pageKey];

    map[row.pageKey] = {
      title: row.title || fallback.title,
      description: row.description || fallback.description,
      keywords: row.keywords,
      image: row.image || null,
    };
  }

  return map;
};

export const fetchSeoSettings = cache(async (): Promise<SeoMap> => {
  try {
    const rows = await prisma.seoSetting.findMany();
    return resolveSeoSettings(rows);
  } catch {
    return SEO_DEFAULTS;
  }
});

export const buildPageMetadata = async (key: SeoPageKey): Promise<Metadata> => {
  const settings = await fetchSeoSettings();
  const seo = settings[key];
  const page = SEO_PAGES.find((item) => item.key === key);
  const image = seo.image ?? PLACEHOLDER_IMAGE;
  const canonical = absoluteUrl(page?.path ?? "/");
  const imageUrl = absoluteUrl(image);

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords.length > 0 ? seo.keywords : undefined,
    alternates: { canonical },
    openGraph: {
      title: seo.title,
      description: seo.description,
      type: "website",
      url: canonical,
      images: [{ url: imageUrl }],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [imageUrl],
    },
  };
};
