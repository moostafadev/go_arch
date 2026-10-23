import type { ContactFormData, ContactSettings } from "./types";

export const getContactSettings = async (): Promise<ContactSettings> => {
  const res = await fetch("/api/settings/contact");

  if (!res.ok) {
    throw new Error("Failed to fetch contact settings");
  }

  const data = await res.json();
  return data.data as ContactSettings;
};

export const saveContactSettings = async (
  form: ContactFormData,
): Promise<ContactSettings> => {
  const res = await fetch("/api/settings/contact", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });

  const payload = await res.json().catch(() => null);

  if (!res.ok || !payload?.success) {
    throw new Error(payload?.error ?? "Failed to save contact settings");
  }

  return payload.data as ContactSettings;
};
