import type { Faq, FaqFormData } from "./types";
import { toPayload } from "./utils";

export const getFaqs = async (): Promise<Faq[]> => {
  const res = await fetch("/api/faqs");

  if (!res.ok) {
    throw new Error("Failed to fetch FAQs");
  }

  const data = await res.json();
  return data.data as Faq[];
};

export const createFaq = async (form: FaqFormData): Promise<void> => {
  const res = await fetch("/api/faqs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(toPayload(form)),
  });

  if (!res.ok) {
    const payload = await res.json().catch(() => null);
    throw new Error(payload?.error ?? "Failed to create FAQ");
  }
};

export const updateFaq = async (
  id: string,
  form: FaqFormData,
): Promise<void> => {
  const res = await fetch(`/api/faqs/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(toPayload(form)),
  });

  if (!res.ok) {
    const payload = await res.json().catch(() => null);
    throw new Error(payload?.error ?? "Failed to update FAQ");
  }
};

export const deleteFaq = async (id: string): Promise<void> => {
  const res = await fetch(`/api/faqs/${id}`, { method: "DELETE" });

  if (!res.ok) {
    const payload = await res.json().catch(() => null);
    throw new Error(payload?.error ?? "Failed to delete FAQ");
  }
};

export const reorderFaqs = async (ids: string[]): Promise<Faq[]> => {
  const res = await fetch("/api/faqs/reorder", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ids }),
  });

  const payload = await res.json().catch(() => null);

  if (!res.ok || !payload?.success) {
    throw new Error(payload?.error ?? "Failed to reorder FAQs");
  }

  return payload.data as Faq[];
};
