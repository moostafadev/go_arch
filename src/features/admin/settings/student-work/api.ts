import type { StudentWorkFormData, StudentWorkItem } from "./types";
import { toPayload } from "./utils";

export const getStudentWork = async (): Promise<StudentWorkItem[]> => {
  const res = await fetch("/api/student-work");

  if (!res.ok) {
    throw new Error("Failed to fetch student work");
  }

  const data = await res.json();
  return data.data as StudentWorkItem[];
};

export const createStudentWork = async (
  form: StudentWorkFormData,
): Promise<void> => {
  const res = await fetch("/api/student-work", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(toPayload(form)),
  });

  if (!res.ok) {
    const payload = await res.json().catch(() => null);
    throw new Error(payload?.error ?? "Failed to create item");
  }
};

export const updateStudentWork = async (
  id: string,
  form: StudentWorkFormData,
): Promise<void> => {
  const res = await fetch(`/api/student-work/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(toPayload(form)),
  });

  if (!res.ok) {
    const payload = await res.json().catch(() => null);
    throw new Error(payload?.error ?? "Failed to update item");
  }
};

export const deleteStudentWork = async (id: string): Promise<void> => {
  const res = await fetch(`/api/student-work/${id}`, { method: "DELETE" });

  if (!res.ok) {
    const payload = await res.json().catch(() => null);
    throw new Error(payload?.error ?? "Failed to delete item");
  }
};

export const reorderStudentWork = async (
  ids: string[],
): Promise<StudentWorkItem[]> => {
  const res = await fetch("/api/student-work/reorder", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ids }),
  });

  const payload = await res.json().catch(() => null);

  if (!res.ok || !payload?.success) {
    throw new Error(payload?.error ?? "Failed to reorder student work");
  }

  return payload.data as StudentWorkItem[];
};
