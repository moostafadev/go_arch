import { cache } from "react";

import {
  emptySectionMap,
  getSectionKeys,
  type ImageSection,
  type SectionImageMap,
} from "@/constants/images";

import { prisma } from "./prisma";

export const fetchSectionImages = cache(
  async <S extends ImageSection>(section: S): Promise<SectionImageMap<S>> => {
    const keys = getSectionKeys(section);
    const fallback = emptySectionMap(section);

    try {
      const rows = await prisma.siteImage.findMany({
        where: { key: { in: keys } },
        select: { key: true, url: true },
      });

      const map: Record<string, string | null> = { ...fallback };

      for (const row of rows) {
        if (row.url) map[row.key] = row.url;
      }

      return map as SectionImageMap<S>;
    } catch {
      return fallback;
    }
  },
);
