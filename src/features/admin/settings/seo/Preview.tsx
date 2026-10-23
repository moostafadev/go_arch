"use client";

import { LoadingImage as Image } from "@/components/loading-image";
import { PLACEHOLDER_IMAGE } from "@/constants/placeholders";
import { SEO_LIMITS } from "@/constants/seo";

interface SeoPreviewProps {
  title: string;
  description: string;
  image: string;
  path: string;
}

const truncate = (value: string, max: number) =>
  value.length > max ? `${value.slice(0, max - 1)}…` : value;

export const SeoPreview = ({
  title,
  description,
  image,
  path,
}: SeoPreviewProps) => {
  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      <div className="border border-border bg-background p-3 sm:p-4">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-foreground-second">
          Search preview
        </p>
        <p className="truncate text-xs text-foreground-second">
          goarch.academy{path === "/" ? "" : ` › ${path.slice(1)}`}
        </p>
        <p className="mt-1 text-base font-medium text-info">
          {truncate(title || "Page title", SEO_LIMITS.title)}
        </p>
        <p className="mt-1 text-xs leading-relaxed text-foreground-second">
          {truncate(description || "Page description", SEO_LIMITS.description)}
        </p>
      </div>

      <div className="border border-border bg-background">
        <p className="p-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-foreground-second sm:px-4 sm:pt-4">
          Social preview
        </p>
        <div className="relative aspect-[1.91/1] w-full overflow-hidden border-y border-border bg-card">
          <Image
            src={image || PLACEHOLDER_IMAGE}
            alt="Social preview"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className="p-3 sm:p-4">
          <p className="text-[10px] uppercase text-foreground-second">
            goarch.academy
          </p>
          <p className="mt-0.5 truncate text-sm font-bold text-foreground">
            {title || "Page title"}
          </p>
          <p className="mt-0.5 line-clamp-2 text-xs text-foreground-second">
            {description || "Page description"}
          </p>
        </div>
      </div>
    </div>
  );
};
