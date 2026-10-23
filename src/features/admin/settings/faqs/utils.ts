import type { Faq, FaqFormData } from "./types";

export const toFormData = (data?: Faq): FaqFormData => ({
  question: data?.question ?? "",
  answer: data?.answer ?? "",
  order: String(data?.order ?? 0),
});

export const toPayload = (data: FaqFormData) => ({
  question: data.question.trim(),
  answer: data.answer.trim(),
  order: Number.parseInt(data.order, 10) || 0,
});
