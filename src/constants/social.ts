export const SOCIAL_PLATFORMS = [
  {
    key: "instagram",
    label: "Instagram",
    placeholder: "https://instagram.com/goarch",
  },
  { key: "x", label: "X (Twitter)", placeholder: "https://x.com/goarch" },
  {
    key: "telegram",
    label: "Telegram",
    placeholder: "https://t.me/goarch",
  },
  {
    key: "facebook",
    label: "Facebook",
    placeholder: "https://facebook.com/goarch",
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    placeholder: "https://linkedin.com/company/goarch",
  },
  {
    key: "youtube",
    label: "YouTube",
    placeholder: "https://youtube.com/@goarch",
  },
  {
    key: "tiktok",
    label: "TikTok",
    placeholder: "https://tiktok.com/@goarch",
  },
  { key: "other", label: "Other", placeholder: "https://example.com/goarch" },
] as const;

export type SocialPlatform = (typeof SOCIAL_PLATFORMS)[number]["key"];

export interface SocialLink {
  platform: SocialPlatform;
  url: string;
  label: string | null;
}

export const SOCIAL_RULES = {
  maxLinks: 12,
  urlMax: 300,
  labelMax: 30,
} as const;

export const isSocialPlatform = (value: unknown): value is SocialPlatform =>
  SOCIAL_PLATFORMS.some((platform) => platform.key === value);
