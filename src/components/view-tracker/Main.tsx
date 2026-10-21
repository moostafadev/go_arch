"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export const ViewTracker = () => {
  const pathname = usePathname();
  const lastTracked = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname) return;
    if (lastTracked.current === pathname) return;
    if (pathname.startsWith("/admin")) return;

    lastTracked.current = pathname;

    fetch("/api/views", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path: pathname,
        referrer: typeof document !== "undefined" ? document.referrer : "",
      }),
      keepalive: true,
    }).catch(() => {});
  }, [pathname]);

  return null;
};
