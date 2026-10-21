import { ViewsData } from "./types";

export const getViews = async (): Promise<ViewsData> => {
  const res = await fetch("/api/views");

  if (!res.ok) {
    throw new Error("Failed to fetch views");
  }

  const data = await res.json();
  return data.data as ViewsData;
};
