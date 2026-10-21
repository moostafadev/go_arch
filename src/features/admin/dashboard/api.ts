import { DashboardData } from "./types";

export const getDashboard = async (): Promise<DashboardData> => {
  const res = await fetch("/api/dashboard");

  if (!res.ok) {
    throw new Error("Failed to load dashboard");
  }

  const data = await res.json();
  return data.data as DashboardData;
};
