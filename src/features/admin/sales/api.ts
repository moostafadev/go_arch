import { CourseOption, Sale, SaleFormData } from "./types";

export const getSales = async (): Promise<Sale[]> => {
  const res = await fetch("/api/sales");

  if (!res.ok) {
    throw new Error("Failed to fetch sales");
  }

  const data = await res.json();
  return data.data as Sale[];
};

export const getCourseOptions = async (): Promise<CourseOption[]> => {
  const res = await fetch("/api/courses");

  if (!res.ok) {
    throw new Error("Failed to fetch courses");
  }

  const data = await res.json();

  return (
    data.data as {
      id: string;
      title: string;
      price: string;
      discountPrice?: string | null;
    }[]
  ).map((course) => ({
    id: course.id,
    title: course.title,
    price: course.price,
    discountPrice: course.discountPrice ?? null,
  }));
};

export const createSale = async (
  data: SaleFormData,
  leadId?: string,
): Promise<void> => {
  const res = await fetch("/api/sales", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data, leadId }),
  });

  if (!res.ok) {
    const payload = await res.json().catch(() => null);
    throw new Error(payload?.error ?? "Failed to create sale");
  }
};

export const updateSale = async (
  id: string,
  data: SaleFormData,
): Promise<void> => {
  const res = await fetch(`/api/sales/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to update sale");
  }
};

export const deleteSale = async (id: string): Promise<void> => {
  const res = await fetch(`/api/sales/${id}`, { method: "DELETE" });

  if (!res.ok) {
    throw new Error("Failed to delete sale");
  }
};
