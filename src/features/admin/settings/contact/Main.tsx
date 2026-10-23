"use client";

import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";

import { Button } from "@/components/button";

import { getContactSettings } from "./api";
import { ContactSettingsForm } from "./Form";
import { ContactSettingsSkeleton } from "./Skeleton";
import type { ContactSettings } from "./types";

type Status = "loading" | "error" | "ready";

export const ContactSettingsMain = () => {
  const [setting, setSetting] = useState<ContactSettings | null>(null);
  const [status, setStatus] = useState<Status>("loading");
  const [attempt, setAttempt] = useState(0);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    let ignore = false;

    const load = async () => {
      try {
        const data = await getContactSettings();
        if (ignore) return;
        setSetting(data);
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

  const handleSaved = (saved: ContactSettings) => {
    setSetting(saved);
    setVersion((prev) => prev + 1);
  };

  return (
    <div>
      <div className="mb-4 sm:mb-6">
        <h1 className="text-xl font-bold text-foreground sm:text-2xl">
          Contact Settings
        </h1>
        <p className="text-xs text-foreground-second sm:text-sm">
          Phone and email shown in the footer, contact page and WhatsApp links.
        </p>
      </div>

      {status === "loading" ? (
        <ContactSettingsSkeleton />
      ) : status === "error" || !setting ? (
        <div className="flex flex-col items-center gap-3 border border-border bg-card p-8 text-center sm:p-12">
          <p className="text-sm text-foreground-second">
            Failed to load contact settings.
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
        <ContactSettingsForm
          key={version}
          setting={setting}
          onSaved={handleSaved}
        />
      )}
    </div>
  );
};
