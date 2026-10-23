import type { SocialLink } from "@/constants/social";

export type SocialLinksSize = "sm" | "md";

export interface SocialLinksProps {
  links: SocialLink[];
  size?: SocialLinksSize;
  className?: string;
}
