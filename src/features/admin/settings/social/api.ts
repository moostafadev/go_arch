import type { SocialFormData, SocialLink } from "./types";
import { toPayload } from "./utils";

export const getSocialLinks = async (): Promise<SocialLink[]> => {
  const res = await fetch("/api/settings/social");

  if (!res.ok) {
    throw new Error("Failed to fetch social links");
  }

  const data = await res.json();
  return data.data as SocialLink[];
};

export const saveSocialLinks = async (
  form: SocialFormData,
): Promise<SocialLink[]> => {
  const res = await fetch("/api/settings/social", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ links: toPayload(form) }),
  });

  const payload = await res.json().catch(() => null);

  if (!res.ok || !payload?.success) {
    throw new Error(payload?.error ?? "Failed to save social links");
  }

  return payload.data as SocialLink[];
};
