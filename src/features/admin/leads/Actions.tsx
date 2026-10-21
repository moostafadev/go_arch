"use client";

import {
  Eye,
  Mail,
  MessageCircle,
  Phone,
  Trash2,
  TrendingUp,
} from "lucide-react";

import { Button } from "@/components/button";
import { useDialog } from "@/components/dialog";
import { Tooltip } from "@/components/tooltip";
import { SaleForm } from "@/features/admin/sales";

import { ActionsMenu, type MenuItem } from "./ActionsMenu";
import { LeadDetails } from "./LeadDetails";
import { Lead } from "./types";

interface LeadActionsProps {
  lead: Lead;
  onDelete: () => void;
  onConverted: () => void;
}

const sanitizePhone = (phone: string) => phone.replace(/\D/g, "");

export const LeadActions = ({
  lead,
  onDelete,
  onConverted,
}: LeadActionsProps) => {
  const { openDialog, closeDialog } = useDialog();

  const isLocked = Boolean(lead.saleId);

  const whatsappUrl = `https://wa.me/${sanitizePhone(lead.phone)}?text=${encodeURIComponent(
    `Hello ${lead.name}, thank you for your interest in "${lead.course}". How can we help you?`,
  )}`;

  const handleViewDetails = () => {
    openDialog({
      title: "Lead Details",
      size: "lg",
      children: <LeadDetails lead={lead} onConverted={onConverted} />,
    });
  };

  const handleConvert = () => {
    openDialog({
      title: "Convert Lead to Sale",
      size: "lg",
      children: (
        <SaleForm
          prefillLead={{
            id: lead.id,
            name: lead.name,
            phone: lead.phone,
            email: lead.email ?? "",
            course: lead.course,
          }}
          onSuccess={() => {
            closeDialog();
            onConverted();
          }}
        />
      ),
    });
  };

  const menuItems: MenuItem[] = [
    {
      icon: Phone,
      label: "Call",
      href: `tel:${lead.phone}`,
    },
    ...(lead.email
      ? [
          {
            icon: Mail,
            label: "Send Email",
            href: `mailto:${lead.email}`,
          } as MenuItem,
        ]
      : []),
    ...(!isLocked
      ? [
          {
            icon: TrendingUp,
            label: "Convert to Sale",
            onClick: handleConvert,
          } as MenuItem,
        ]
      : []),
    {
      icon: Trash2,
      label: "Delete Lead",
      onClick: onDelete,
      danger: true,
      disabled: isLocked,
    },
  ];

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

      <ActionsMenu items={menuItems} />
    </div>
  );
};
