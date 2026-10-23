"use client";

import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";

import { Button } from "@/components/button";

import { getSocialLinks } from "./api";
import { SocialSettingsForm } from "./Form";
import { SocialSettingsSkeleton } from "./Skeleton";
import type { SocialLink } from "./types";

type Status = "loading" | "error" | "ready";

export const SocialSettingsMain = () => {
  const [links, setLinks] = useState<SocialLink[]>([]);
  const [status, setStatus] = useState<Status>("loading");
  const [attempt, setAttempt] = useState(0);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    let ignore = false;

    const load = async () => {
      try {
        const data = await getSocialLinks();
        if (ignore) return;
        setLinks(data);
        setStatus("ready");
      } catch {
        if (!ignore) setStatus("error");
      }
    };

    load();

    return () => {
      ignore = true;
    };
  }, [attempt]);

  const handleRetry = () => {
    setStatus("loading");
    setAttempt((prev) => prev + 1);
  };

  const handleSaved = (saved: SocialLink[]) => {
    setLinks(saved);
    setVersion((prev) => prev + 1);
  };

  return (
    <div>
      <div className="mb-4 sm:mb-6">
        <h1 className="text-xl font-bold text-foreground sm:text-2xl">
          Social Media
        </h1>
        <p className="text-xs text-foreground-second sm:text-sm">
          Links shown in the footer and on the contact page.
        </p>
      </div>

      {status === "loading" ? (
        <SocialSettingsSkeleton />
      ) : status === "error" ? (
        <div className="flex flex-col items-center gap-3 border border-border bg-card p-8 text-center sm:p-12">
          <p className="text-sm text-foreground-second">
            Failed to load social links.
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
        <SocialSettingsForm key={version} links={links} onSaved={handleSaved} />
      )}
    </div>
  );
};
