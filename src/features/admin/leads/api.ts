import { Lead, LeadStatus } from "./types";

const readError = async (res: Response, fallback: string) => {
  const payload = await res.json().catch(() => null);
  throw new Error(payload?.error ?? fallback);
};

export const getLeads = async (): Promise<Lead[]> => {
  const res = await fetch("/api/leads");

  if (!res.ok) {
    throw new Error("Failed to fetch leads");
  }

  const data = await res.json();
  return data.data as Lead[];
};

export const deleteLead = async (id: string): Promise<void> => {
  const res = await fetch(`/api/leads/${id}`, { method: "DELETE" });

  if (!res.ok) {
    await readError(res, "Failed to delete lead");
  }
};

export const updateLeadStatus = async (
  id: string,
  status: LeadStatus,
): Promise<void> => {
  const res = await fetch(`/api/leads/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });

  if (!res.ok) {
    await readError(res, "Failed to update lead status");
  }
};
