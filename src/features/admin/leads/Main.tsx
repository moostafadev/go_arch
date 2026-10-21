"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";

import { useDialog } from "@/components/dialog";
import { useToast } from "@/components/toaster";

import { LeadActions } from "./Actions";
import { DeleteDialog } from "./DeleteDialog";
import { LeadsSkeleton } from "./Skeleton";
import { StatusBadge } from "./StatusBadge";
import { deleteLead, getLeads, updateLeadStatus } from "./api";
import { Lead, LeadStatus } from "./types";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

export const LeadsMain = () => {
  const { openDialog, closeDialog } = useDialog();
  const { toast } = useToast();

  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const reload = async () => {
    try {
      const data = await getLeads();
      setLeads(data);
    } catch {
      toast.error("Failed to refresh leads");
    }
  };

  useEffect(() => {
    let ignore = false;

    const load = async () => {
      try {
        const data = await getLeads();
        if (!ignore) setLeads(data);
      } catch {
        if (!ignore) toast.error("Failed to load leads");
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    load();

    return () => {
      ignore = true;
    };
  }, [toast]);

  const handleStatusChange = async (id: string, status: LeadStatus) => {
    const previous = leads;

    setLeads((prev) =>
      prev.map((lead) => (lead.id === id ? { ...lead, status } : lead)),
    );

    try {
      await updateLeadStatus(id, status);
      toast.success("Status updated");
    } catch (err) {
      setLeads(previous);
      toast.error(
        err instanceof Error ? err.message : "Failed to update status",
      );
    }
  };

  const handleDelete = (id: string) => {
    openDialog({
      title: "Delete Lead",
      size: "md",
      children: (
        <DeleteDialog
          onCancel={closeDialog}
          onConfirm={async () => {
            try {
              await deleteLead(id);
              setLeads((prev) => prev.filter((lead) => lead.id !== id));
              toast.success("Lead deleted successfully");
              closeDialog();
            } catch (err) {
              toast.error(
                err instanceof Error ? err.message : "Failed to delete lead",
              );
            }
          }}
        />
      ),
    });
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between sm:mb-6">
        <div>
          <h1 className="text-xl font-bold text-foreground sm:text-2xl">
            Leads Management
          </h1>
          <p className="text-xs text-foreground-second sm:text-sm">
            {leads.length} {leads.length === 1 ? "lead" : "leads"} captured
          </p>
        </div>
      </div>

      {loading ? (
        <LeadsSkeleton />
      ) : leads.length === 0 ? (
        <div className="border border-border bg-card p-8 text-center text-foreground-second sm:p-12">
          <p className="text-sm">No leads captured yet.</p>
          <p className="mt-1 text-xs">
            New inquiries from the contact form will appear here.
          </p>
        </div>
      ) : (
        <div className="border border-border bg-card overflow-x-auto w-full [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-border hover:[&::-webkit-scrollbar-thumb]:bg-foreground-second">
          <table className="w-full text-left border-collapse min-w-225">
            <thead>
              <tr className="border-b border-border bg-background/50">
                <th className="p-3 text-xs font-bold text-foreground sm:p-4">
                  Name
                </th>
                <th className="p-3 text-xs font-bold text-foreground sm:p-4">
                  Contact
                </th>
                <th className="p-3 text-xs font-bold text-foreground sm:p-4">
                  Course
                </th>
                <th className="p-3 text-xs font-bold text-foreground sm:p-4">
                  Message
                </th>
                <th className="p-3 text-xs font-bold text-foreground sm:p-4">
                  Status
                </th>
                <th className="p-3 text-xs font-bold text-foreground sm:p-4">
                  Date
                </th>
                <th className="p-3 text-xs font-bold text-foreground text-right sm:p-4">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              <AnimatePresence mode="popLayout">
                {leads.map((lead, index) => (
                  <m.tr
                    key={lead.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2, delay: index * 0.03 }}
                    className="border-b border-border/50 hover:bg-card-hover transition-colors"
                  >
                    <td className="p-3 text-sm font-medium text-foreground whitespace-nowrap sm:p-4">
                      {lead.name}
                    </td>

                    <td className="p-3 sm:p-4">
                      <div className="flex flex-col text-xs text-foreground-second">
                        <span className="whitespace-nowrap">{lead.phone}</span>
                        {lead.email && (
                          <span className="max-w-40 truncate">
                            {lead.email}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="p-3 text-xs text-foreground max-w-40 truncate sm:p-4">
                      {lead.course}
                    </td>

                    <td
                      className="p-3 text-xs text-foreground-second max-w-45 truncate sm:p-4"
                      title={lead.message ?? ""}
                    >
                      {lead.message || "—"}
                    </td>

                    <td className="p-3 sm:p-4">
                      <StatusBadge
                        status={lead.status}
                        locked={Boolean(lead.saleId)}
                        onChange={(status) =>
                          handleStatusChange(lead.id, status)
                        }
                      />
                    </td>

                    <td className="p-3 text-xs text-foreground-second whitespace-nowrap sm:p-4">
                      {formatDate(lead.createdAt)}
                    </td>

                    <td className="p-3 sm:p-4">
                      <LeadActions
                        lead={lead}
                        onDelete={() => handleDelete(lead.id)}
                        onConverted={reload}
                      />
                    </td>
                  </m.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
