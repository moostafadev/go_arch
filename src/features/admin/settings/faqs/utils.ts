import type { Faq, FaqFormData } from "./types";

export const toFormData = (data?: Faq): FaqFormData => ({
  question: data?.question ?? "",
  answer: data?.answer ?? "",
});

export const toPayload = (data: FaqFormData) => ({
  question: data.question.trim(),
  answer: data.answer.trim(),
});
