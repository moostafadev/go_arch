import type { Testimonial, TestimonialFormData } from "./types";

export const toFormData = (data?: Testimonial): TestimonialFormData => ({
  name: data?.name ?? "",
  role: data?.role ?? "",
  text: data?.text ?? "",
  image: data?.image ?? "",
});

export const toPayload = (data: TestimonialFormData) => ({
  name: data.name.trim(),
  role: data.role.trim(),
  text: data.text.trim(),
  image: data.image || null,
});
