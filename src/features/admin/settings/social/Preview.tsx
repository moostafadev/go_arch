"use client";

import { SocialLinks } from "@/components/social-links";
import { resolveSocialLabel, isHttpUrl } from "@/lib/social";

import type { SocialFormLink } from "./types";
import { toPayload } from "./utils";

interface SocialPreviewProps {
  links: SocialFormLink[];
}

export const SocialPreview = ({ links }: SocialPreviewProps) => {
  const valid = toPayload({
    links: links.filter(
      (link) =>
        isHttpUrl(link.url.trim()) &&
        (link.platform !== "other" || link.label.trim().length > 0),
    ),
  });

  return (
    <div className="flex flex-col gap-3 border border-border bg-card p-3 sm:gap-4 sm:p-4">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-foreground-second">
        Site preview
      </p>

      {valid.length === 0 ? (
        <p className="border border-border bg-background p-3 text-center text-sm text-foreground-second sm:p-4">
          No valid links yet. Social icons are hidden on the site until you add
          one.
        </p>
      ) : (
        <>
          <SocialLinks links={valid} size="md" />

          <ul className="flex flex-col">
            {valid.map((link) => (
              <li
                key={`${link.platform}-${link.url}`}
                className="flex flex-col gap-0.5 border-b border-border/50 py-2 last:border-0"
              >
                <span className="text-xs font-medium text-foreground">
                  {resolveSocialLabel(link)}
                </span>
                <span className="truncate text-[11px] text-foreground-second">
                  {link.url}
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
