"use client";

import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";

import { Button } from "@/components/button";
import { SEO_PAGES, type SeoPageKey } from "@/constants/seo";

import { getSeoSettings } from "./api";
import { SeoForm } from "./Form";
import { SeoSkeleton } from "./Skeleton";
import type { SeoSetting } from "./types";

type Status = "loading" | "error" | "ready";

export const SeoMain = () => {
  const [settings, setSettings] = useState<SeoSetting[]>([]);
  const [status, setStatus] = useState<Status>("loading");
  const [attempt, setAttempt] = useState(0);
  const [activeKey, setActiveKey] = useState<SeoPageKey>(SEO_PAGES[0].key);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    let ignore = false;

    const load = async () => {
      try {
        const data = await getSeoSettings();
        if (ignore) return;
        setSettings(data);
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

  const handleSaved = (saved: SeoSetting) => {
    setSettings((prev) =>
      prev.map((item) => (item.pageKey === saved.pageKey ? saved : item)),
    );
    setVersion((prev) => prev + 1);
  };

  const activeSetting = settings.find((item) => item.pageKey === activeKey);

  return (
    <div>
      <div className="mb-4 sm:mb-6">
        <h1 className="text-xl font-bold text-foreground sm:text-2xl">
          SEO Settings
        </h1>
        <p className="text-xs text-foreground-second sm:text-sm">
          Control the title, description, keywords and share image of each page.
        </p>
      </div>

      {status === "loading" ? (
        <SeoSkeleton />
      ) : status === "error" || !activeSetting ? (
        <div className="flex flex-col items-center gap-3 border border-border bg-card p-8 text-center sm:p-12">
          <p className="text-sm text-foreground-second">
            Failed to load SEO settings.
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
        <div className="flex flex-col gap-3 sm:gap-4">
          <div className="flex flex-wrap gap-2">
            {SEO_PAGES.map((page) => (
              <Button
                key={page.key}
                variant={activeKey === page.key ? "solid" : "outline"}
                color={activeKey === page.key ? "MAIN" : "SECONDARY"}
                size="sm"
                onClick={() => setActiveKey(page.key)}
                className={
                  activeKey === page.key
                    ? "bg-accent text-white"
                    : "border-border bg-transparent text-foreground hover:bg-card"
                }
              >
                {page.label}
              </Button>
            ))}
          </div>

          <SeoForm
            key={`${activeKey}-${version}`}
            setting={activeSetting}
            onSaved={handleSaved}
          />
        </div>
      )}
    </div>
  );
};
