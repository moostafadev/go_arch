import type { SocialFormData, SocialLink } from "./types";

export const toFormData = (links: SocialLink[]): SocialFormData => ({
  links: links.map((link) => ({
    platform: link.platform,
    url: link.url,
    label: link.label ?? "",
  })),
});

export const toPayload = (form: SocialFormData): SocialLink[] =>
  form.links.map((link) => ({
    platform: link.platform,
    url: link.url.trim(),
    label: link.platform === "other" ? link.label.trim() : null,
  }));
