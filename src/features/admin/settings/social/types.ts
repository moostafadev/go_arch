import type { SocialLink, SocialPlatform } from "@/constants/social";

export type { SocialLink, SocialPlatform };

export interface SocialFormLink {
  platform: SocialPlatform;
  url: string;
  label: string;
}

export interface SocialFormData {
  links: SocialFormLink[];
}
