export const LEAD_STATUSES = ["New", "Contacted", "Cancelled"] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const statusColors: Record<LeadStatus, "INFO" | "WARNING" | "DANGER"> = {
  New: "INFO",
  Contacted: "WARNING",
  Cancelled: "DANGER",
};

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string | null;
  course: string;
  message?: string | null;
  status: LeadStatus;
  createdAt: string;
}
