import type { ImageSection, SectionImageMap } from "@/constants/images";

export const getSectionImages = async <S extends ImageSection>(
  section: S,
): Promise<SectionImageMap<S>> => {
  const res = await fetch(`/api/images/${section}`);

  if (!res.ok) {
    throw new Error("Failed to fetch images");
  }

  const data = await res.json();
  return data.data as SectionImageMap<S>;
};

export const saveSectionImages = async <S extends ImageSection>(
  section: S,
  images: Record<string, string>,
): Promise<SectionImageMap<S>> => {
  const res = await fetch(`/api/images/${section}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ images }),
  });

  const payload = await res.json().catch(() => null);

  if (!res.ok || !payload?.success) {
    throw new Error(payload?.error ?? "Failed to save images");
  }

  return payload.data as SectionImageMap<S>;
};
