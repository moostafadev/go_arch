import type { SeoPageKey } from "@/constants/seo";

import type { SeoFormData, SeoSetting } from "./types";
import { toPayload } from "./utils";

export const getSeoSettings = async (): Promise<SeoSetting[]> => {
  const res = await fetch("/api/settings/seo");

  if (!res.ok) {
    throw new Error("Failed to fetch SEO settings");
  }

  const data = await res.json();
  return data.data as SeoSetting[];
};

export const saveSeoSetting = async (
  pageKey: SeoPageKey,
  form: SeoFormData,
): Promise<SeoSetting> => {
  const res = await fetch("/api/settings/seo", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pageKey, ...toPayload(form) }),
  });

  const payload = await res.json().catch(() => null);

  if (!res.ok || !payload?.success) {
    throw new Error(payload?.error ?? "Failed to save SEO settings");
  }

  return payload.data as SeoSetting;
};
