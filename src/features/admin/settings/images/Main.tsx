"use client";

import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";

import { Button } from "@/components/button";
import type { ImageSection, SectionImageMap } from "@/constants/images";

import { getSectionImages } from "./api";
import { SectionImagesForm } from "./Form";
import { ImagesSkeleton } from "./Skeleton";

type Status = "loading" | "error" | "ready";

interface ImagesMainProps<S extends ImageSection> {
  section: S;
  title: string;
  description: string;
}

export const ImagesMain = <S extends ImageSection>({
  section,
  title,
  description,
}: ImagesMainProps<S>) => {
  const [images, setImages] = useState<SectionImageMap<S> | null>(null);
  const [status, setStatus] = useState<Status>("loading");
  const [attempt, setAttempt] = useState(0);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    let ignore = false;

    const load = async () => {
      try {
        const data = await getSectionImages(section);
        if (ignore) return;
        setImages(data);
        setStatus("ready");
      } catch {
        if (!ignore) setStatus("error");
      }
    };

    load();

    return () => {
      ignore = true;
    };
  }, [section, attempt]);

  const handleRetry = () => {
    setStatus("loading");
    setAttempt((prev) => prev + 1);
  };

  const handleSaved = (saved: SectionImageMap<S>) => {
    setImages(saved);
    setVersion((prev) => prev + 1);
  };

  return (
    <div>
      <div className="mb-4 sm:mb-6">
        <h1 className="text-xl font-bold text-foreground sm:text-2xl">
          {title}
        </h1>
        <p className="text-xs text-foreground-second sm:text-sm">
          {description}
        </p>
      </div>

      {status === "loading" ? (
        <ImagesSkeleton />
      ) : status === "error" || !images ? (
        <div className="flex flex-col items-center gap-3 border border-border bg-card p-8 text-center sm:p-12">
          <p className="text-sm text-foreground-second">
            Failed to load images.
          </p>
          <Button
            onClick={handleRetry}
            variant="outline"
            color="NEUTRAL"
            size="sm"
          >
            <RefreshCw className="mr-2 size-3.5" />
            Try again
          </Button>
        </div>
      ) : (
        <SectionImagesForm<S>
          key={`${section}-${version}`}
          section={section}
          images={images}
          onSaved={handleSaved}
        />
      )}
    </div>
  );
};
