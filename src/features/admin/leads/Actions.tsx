"use client";

import { Eye, Mail, MessageCircle, Phone, Trash2 } from "lucide-react";

import { Button } from "@/components/button";
import { useDialog } from "@/components/dialog";
import { Tooltip } from "@/components/tooltip";

import { LeadDetails } from "./LeadDetails";
import { Lead } from "./types";

interface LeadActionsProps {
  lead: Lead;
  onDelete: () => void;
}

const sanitizePhone = (phone: string) => phone.replace(/\D/g, "");

export const LeadActions = ({ lead, onDelete }: LeadActionsProps) => {
  const { openDialog } = useDialog();

  const whatsappUrl = `https://wa.me/${sanitizePhone(lead.phone)}?text=${encodeURIComponent(
    `Hello ${lead.name}, thank you for your interest in "${lead.course}". How can we help you?`,
  )}`;

  const handleViewDetails = () => {
    openDialog({
      title: "Lead Details",
      size: "lg",
      children: <LeadDetails lead={lead} />,
    });
  };

  return (
    <div className="flex items-center justify-end gap-1">
      <Tooltip content="View details" focusable={false}>
        <Button
          onClick={handleViewDetails}
          size="icon"
          variant="ghost"
          aria-label="View details"
          className="size-8 text-foreground-second hover:text-accent"
        >
          <Eye className="size-4" />
        </Button>
      </Tooltip>

      <Tooltip content="Message on WhatsApp" focusable={false}>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          className="flex size-8 items-center justify-center text-foreground-second transition-colors hover:text-success"
        >
          <MessageCircle className="size-4" />
        </a>
      </Tooltip>

      <Tooltip content="Call" focusable={false}>
        <a
          href={`tel:${lead.phone}`}
          aria-label="Call"
          className="flex size-8 items-center justify-center text-foreground-second transition-colors hover:text-accent"
        >
          <Phone className="size-4" />
        </a>
      </Tooltip>

      {lead.email && (
        <Tooltip content="Send Email" focusable={false}>
          <a
            href={`mailto:${lead.email}`}
            aria-label="Email"
            className="flex size-8 items-center justify-center text-foreground-second transition-colors hover:text-info"
          >
            <Mail className="size-4" />
          </a>
        </Tooltip>
      )}

      <Tooltip content="Delete Lead" focusable={false}>
        <Button
          onClick={onDelete}
          size="icon"
          variant="ghost"
          aria-label="Delete"
          className="size-8 text-foreground-second hover:text-danger"
        >
          <Trash2 className="size-4" />
        </Button>
      </Tooltip>
    </div>
  );
};
