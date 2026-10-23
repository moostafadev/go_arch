import { cache } from "react";

import {
  CONTACT_DEFAULTS,
  SITE_SETTING_KEY,
  type ContactSettings,
} from "@/constants/site";
import { isSocialPlatform, type SocialLink } from "@/constants/social";

import { prisma } from "./prisma";

interface ContactRow {
  phone: string | null;
  email: string | null;
}

interface SocialRow {
  platform: string;
  url: string;
  label: string | null;
}

interface SiteRow extends ContactRow {
  socials: SocialRow[];
}

export const resolveContactSettings = (
  row: ContactRow | null,
): ContactSettings => ({
  phone: row?.phone || CONTACT_DEFAULTS.phone,
  email: row?.email || CONTACT_DEFAULTS.email,
});

export const resolveSocialLinks = (
  rows: SocialRow[] | null | undefined,
): SocialLink[] =>
  (rows ?? []).flatMap((row) =>
    isSocialPlatform(row.platform) && row.url
      ? [{ platform: row.platform, url: row.url, label: row.label }]
      : [],
  );

const fetchSiteRow = cache(async (): Promise<SiteRow | null> => {
  try {
    return await prisma.siteSetting.findUnique({
      where: { key: SITE_SETTING_KEY },
      select: { phone: true, email: true, socials: true },
    });
  } catch {
    return null;
  }
});

export const fetchContactSettings = cache(
  async (): Promise<ContactSettings> =>
    resolveContactSettings(await fetchSiteRow()),
);

export const fetchSocialLinks = cache(
  async (): Promise<SocialLink[]> =>
    resolveSocialLinks((await fetchSiteRow())?.socials),
);
