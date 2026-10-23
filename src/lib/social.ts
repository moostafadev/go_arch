import {
  SOCIAL_PLATFORMS,
  SOCIAL_RULES,
  isSocialPlatform,
  type SocialLink,
  type SocialPlatform,
} from "@/constants/social";

export type SocialParseResult =
  | { ok: true; links: SocialLink[] }
  | { ok: false; error: string };

export const isHttpUrl = (value: string): boolean => {
  if (!value || value.length > SOCIAL_RULES.urlMax) return false;

  try {
    const { protocol } = new URL(value);
    return protocol === "https:" || protocol === "http:";
  } catch {
    return false;
  }
};

const getHostname = (url: string): string => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "Link";
  }
};

export const resolveSocialLabel = (link: SocialLink): string => {
  if (link.platform === "other") {
    return link.label || getHostname(link.url);
  }

  return (
    SOCIAL_PLATFORMS.find((platform) => platform.key === link.platform)
      ?.label ?? link.platform
  );
};

export const parseSocialLinks = (value: unknown): SocialParseResult => {
  if (!Array.isArray(value)) {
    return { ok: false, error: "Links must be a list" };
  }

  if (value.length > SOCIAL_RULES.maxLinks) {
    return {
      ok: false,
      error: `Use at most ${SOCIAL_RULES.maxLinks} links`,
    };
  }

  const links: SocialLink[] = [];
  const seen = new Set<SocialPlatform>();

  for (const item of value) {
    const raw = (item ?? {}) as Partial<Record<keyof SocialLink, unknown>>;
    const platform = raw.platform;

    if (!isSocialPlatform(platform)) {
      return { ok: false, error: "Invalid platform" };
    }

    const url = String(raw.url ?? "").trim();

    if (!isHttpUrl(url)) {
      return {
        ok: false,
        error: "Every link must be a valid URL starting with https://",
      };
    }

    if (platform === "other") {
      const label = String(raw.label ?? "").trim();

      if (!label || label.length > SOCIAL_RULES.labelMax) {
        return {
          ok: false,
          error: `Custom links need a label up to ${SOCIAL_RULES.labelMax} characters`,
        };
      }

      links.push({ platform, url, label });
      continue;
    }

    if (seen.has(platform)) {
      return { ok: false, error: "Each platform can be added only once" };
    }

    seen.add(platform);
    links.push({ platform, url, label: null });
  }

  return { ok: true, links };
};
