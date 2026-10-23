import type { StudentWorkFormData, StudentWorkItem } from "./types";

export const toFormData = (data?: StudentWorkItem): StudentWorkFormData => ({
  title: data?.title ?? "",
  image: data?.image ?? "",
});

export const toPayload = (data: StudentWorkFormData) => ({
  title: data.title.trim(),
  image: data.image.trim(),
});
