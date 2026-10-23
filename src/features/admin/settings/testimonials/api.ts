import type { Testimonial, TestimonialFormData } from "./types";
import { toPayload } from "./utils";

export const getTestimonials = async (): Promise<Testimonial[]> => {
  const res = await fetch("/api/testimonials");

  if (!res.ok) {
    throw new Error("Failed to fetch testimonials");
  }

  const data = await res.json();
  return data.data as Testimonial[];
};

export const createTestimonial = async (
  form: TestimonialFormData,
): Promise<void> => {
  const res = await fetch("/api/testimonials", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(toPayload(form)),
  });

  if (!res.ok) {
    const payload = await res.json().catch(() => null);
    throw new Error(payload?.error ?? "Failed to create testimonial");
  }
};

export const updateTestimonial = async (
  id: string,
  form: TestimonialFormData,
): Promise<void> => {
  const res = await fetch(`/api/testimonials/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(toPayload(form)),
  });

  if (!res.ok) {
    const payload = await res.json().catch(() => null);
    throw new Error(payload?.error ?? "Failed to update testimonial");
  }
};

export const deleteTestimonial = async (id: string): Promise<void> => {
  const res = await fetch(`/api/testimonials/${id}`, { method: "DELETE" });

  if (!res.ok) {
    const payload = await res.json().catch(() => null);
    throw new Error(payload?.error ?? "Failed to delete testimonial");
  }
};

export const reorderTestimonials = async (
  ids: string[],
): Promise<Testimonial[]> => {
  const res = await fetch("/api/testimonials/reorder", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ids }),
  });

  const payload = await res.json().catch(() => null);

  if (!res.ok || !payload?.success) {
    throw new Error(payload?.error ?? "Failed to reorder testimonials");
  }

  return payload.data as Testimonial[];
};
