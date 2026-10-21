"use client";

import {
  BookOpen,
  Mail,
  MessageCircle,
  Phone,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/button";
import { Tag } from "@/components/tag";

import { Lead, statusColors } from "./types";

interface LeadDetailsProps {
  lead: Lead;
}

interface DetailRowProps {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
}

const formatFullDate = (iso: string) =>
  new Date(iso).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const DetailRow = ({ icon: Icon, label, value, href }: DetailRowProps) => (
  <div className="flex items-start gap-2">
    <Icon className="mt-0.5 size-4 shrink-0 text-foreground-second" />
    <div className="flex min-w-0 flex-col gap-0.5">
      <span className="text-[10px] font-medium uppercase tracking-wider text-foreground-second">
        {label}
      </span>
      {href ? (
        <a
          href={href}
          className="truncate text-sm text-foreground transition-colors hover:text-accent"
        >
          {value}
        </a>
      ) : (
        <span className="truncate text-sm text-foreground">{value}</span>
      )}
    </div>
  </div>
);

export const LeadDetails = ({ lead }: LeadDetailsProps) => {
  const whatsappUrl = `https://wa.me/${lead.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
    `Hello ${lead.name}, thank you for your interest in "${lead.course}". How can we help you?`,
  )}`;

  return (
    <div className="flex flex-col gap-4 pt-2">
      <div className="flex items-start justify-between gap-3 border-b border-border pb-4">
        <div className="min-w-0">
          <h3 className="truncate text-lg font-bold text-foreground">
            {lead.name}
          </h3>
          <p className="text-xs text-foreground-second">
            {formatFullDate(lead.createdAt)}
          </p>
        </div>
        <Tag color={statusColors[lead.status]} variant="soft" size="sm">
          {lead.status}
        </Tag>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <DetailRow
          icon={Phone}
          label="Phone"
          value={lead.phone}
          href={`tel:${lead.phone}`}
        />
        <DetailRow
          icon={Mail}
          label="Email"
          value={lead.email || "Not provided"}
          href={lead.email ? `mailto:${lead.email}` : undefined}
        />
      </div>

      <DetailRow icon={BookOpen} label="Course" value={lead.course} />

      <div className="flex flex-col gap-1">
        <span className="text-[10px] font-medium uppercase tracking-wider text-foreground-second">
          Message
        </span>
        <p className="whitespace-pre-wrap border border-border bg-background p-3 text-sm text-foreground">
          {lead.message || "No additional notes provided."}
        </p>
      </div>

      <div className="flex items-center gap-2 border-t border-border pt-4">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1"
        >
          <Button color="SUCCESS" variant="solid" className="w-full">
            <MessageCircle className="mr-2 size-4" />
            WhatsApp
          </Button>
        </a>

        <a href={`tel:${lead.phone}`} className="flex-1">
          <Button color="NEUTRAL" variant="outline" className="w-full">
            <Phone className="mr-2 size-4" />
            Call
          </Button>
        </a>
      </div>
    </div>
  );
};
