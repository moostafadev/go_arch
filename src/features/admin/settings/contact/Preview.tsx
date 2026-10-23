"use client";

import { Mail, MessageCircle, Phone, type LucideIcon } from "lucide-react";

import { CONTACT_RULES } from "@/constants/site";
import {
  formatPhone,
  toDigits,
  toMailHref,
  toTelHref,
  toWhatsAppUrl,
} from "@/lib/contact";

interface ContactPreviewProps {
  phone: string;
  email: string;
}

interface PreviewRowProps {
  icon: LucideIcon;
  label: string;
  value: string;
  href: string | null;
}

const PreviewRow = ({ icon: Icon, label, value, href }: PreviewRowProps) => (
  <div className="flex items-start gap-3 border border-border bg-background p-3 sm:p-4">
    <Icon className="mt-0.5 size-4 shrink-0 text-foreground-second" />
    <div className="flex min-w-0 flex-col gap-0.5">
      <span className="text-[10px] font-semibold uppercase tracking-wider text-foreground-second">
        {label}
      </span>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="truncate text-sm text-foreground transition-colors hover:text-accent"
        >
          {value}
        </a>
      ) : (
        <span className="truncate text-sm text-foreground-second">{value}</span>
      )}
    </div>
  </div>
);

export const ContactPreview = ({ phone, email }: ContactPreviewProps) => {
  const digits = toDigits(phone);
  const phoneValid = CONTACT_RULES.phonePattern.test(digits);
  const emailValid = CONTACT_RULES.emailPattern.test(email.trim());

  return (
    <div className="flex flex-col gap-3 border border-border bg-card p-3 sm:p-4">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-foreground-second">
        Generated links
      </p>

      <PreviewRow
        icon={Phone}
        label="Call"
        value={phoneValid ? formatPhone(digits) : "Enter a valid phone"}
        href={phoneValid ? toTelHref(digits) : null}
      />
      <PreviewRow
        icon={MessageCircle}
        label="WhatsApp"
        value={phoneValid ? toWhatsAppUrl(digits) : "Enter a valid phone"}
        href={phoneValid ? toWhatsAppUrl(digits) : null}
      />
      <PreviewRow
        icon={Mail}
        label="Email"
        value={emailValid ? email.trim() : "Enter a valid email"}
        href={emailValid ? toMailHref(email.trim()) : null}
      />
    </div>
  );
};
