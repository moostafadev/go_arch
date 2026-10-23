import { resolveSocialLabel } from "@/lib/social";

import { SocialIcon } from "../social-icon";
import type { SocialLinksProps, SocialLinksSize } from "./types";

const sizes: Record<
  SocialLinksSize,
  { box: string; icon: string; surface: string }
> = {
  sm: { box: "size-9", icon: "size-4", surface: "bg-background" },
  md: { box: "size-10", icon: "size-5", surface: "bg-card" },
};

const SocialLinks = ({
  links,
  size = "sm",
  className = "",
}: SocialLinksProps) => {
  if (links.length === 0) return null;

  const style = sizes[size];

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {links.map((link) => {
        const label = resolveSocialLabel(link);

        return (
          <a
            key={`${link.platform}-${link.url}`}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer me"
            aria-label={label}
            title={label}
            className={`flex ${style.box} ${style.surface} items-center justify-center border border-border text-foreground-second transition-all hover:border-accent hover:bg-accent hover:text-white`}
          >
            <SocialIcon platform={link.platform} className={style.icon} />
          </a>
        );
      })}
    </div>
  );
};

export default SocialLinks;
