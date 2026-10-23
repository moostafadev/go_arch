import type { StudentWorkFormData, StudentWorkItem } from "./types";

export const toFormData = (data?: StudentWorkItem): StudentWorkFormData => ({
  title: data?.title ?? "",
  image: data?.image ?? "",
  order: String(data?.order ?? 0),
});

export const toPayload = (data: StudentWorkFormData) => ({
  title: data.title.trim(),
  image: data.image.trim(),
  order: Number.parseInt(data.order, 10) || 0,
});
